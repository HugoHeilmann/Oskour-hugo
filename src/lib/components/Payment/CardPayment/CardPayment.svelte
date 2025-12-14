<script>
    import PaymentHeader from "../PaymentHeader/PaymentHeader.svelte";
    import Keypad from '$lib/components/Keypad/Keypad.svelte';
    import mockCommands from '$lib/data/mockCommand.json';
    import { goto } from '$app/navigation';
    import "./CardPayment.css";
    
    export let onBack = () => {};
    export let onSuccess = () => {};
    export let tableNumber = "";
    
    let commandId = 1;
    let selectedItems = new Map(); // Items sélectionnés avec quantités : Map(itemId -> quantitéSélectionnée)
    let paidQuantities = new Map(); // Quantités déjà payées par item : Map(itemId -> quantitéPayée)
    let isProcessing = false;
    let commandData;
    let isDividing = false; // Mode division activé
    let divisorNumber = ""; // Nombre de parts pour la division
    let partialPayments = 0; // Paiements partiels effectués
    let initialDivisionAmount = 0; // Montant initial à diviser
    let paymentCompleted = false; // Paiement terminé
    
    // Trouve la commande correspondante
    $: {
        const tableNum = parseInt(tableNumber);
        commandData = mockCommands.find(cmd => cmd.tableNumber === tableNum) || mockCommands[0];
        // Assurer qu'on a toujours une commande par défaut
        if (!commandData && mockCommands.length > 0) {
            commandData = mockCommands[0];
        }
    }
    console.log('Command Data:', commandData, tableNumber);
    
    // Calcul du total de la commande
    $: totalCommand = commandData ? commandData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0) : 0;
    
    // Calcul du montant sélectionné pour paiement
    $: selectedAmount = commandData ? commandData.items.reduce((sum, item) => {
        const selectedQuantity = selectedItems.get(item.id) || 0;
        if (selectedQuantity > 0) {
            return sum + (item.price * selectedQuantity);
        }
        return sum;
    }, 0) : 0;
    
    // Calcul du montant déjà payé
    $: paidAmount = commandData ? commandData.items.reduce((sum, item) => {
        const paidQuantity = paidQuantities.get(item.id) || 0;
        return sum + (item.price * paidQuantity);
    }, 0) : 0;
    
    // Calcul du reste à payer (incluant les paiements partiels)
    $: remainingAmount = totalCommand - paidAmount - partialPayments;
    
    // Calcul du montant par personne si division activée
    $: amountPerPerson = isDividing && divisorNumber && parseInt(divisorNumber) > 0 
        ? initialDivisionAmount / parseInt(divisorNumber) 
        : (selectedAmount > 0 ? selectedAmount : remainingAmount);
    
    /**
     * Handle a key press from the numeric keypad.
     * @param {string} key - The key that was pressed on the keypad.
     */
    function pressKey(key) {
        if (key === 'C') {
            clearInputs();
            return;
        }
        if (key === '←') {
            backspace();
            return;
        }
        
        // Si on est en mode division, on modifie le divisorNumber
        if (isDividing) {
            if (divisorNumber.length < 2) {
                divisorNumber += key;
            }
            return;
        }
        
        // Sinon, on tape un chiffre pour le numéro de table
        if (tableNumber.length < 3) {
            tableNumber += key;
        }
        
        // Mise à jour de commandId basé sur le numéro de table
        if (tableNumber.length > 0) {
            const tableNum = parseInt(tableNumber) || 1;
            const foundCommand = mockCommands.find(cmd => cmd.tableNumber === tableNum);
            if (foundCommand) {
                commandId = foundCommand.commandId;
            }
        }
    }
    
    function backspace() {
        if (isDividing) {
            if (divisorNumber.length > 0) {
                divisorNumber = divisorNumber.slice(0, -1);
            }
        } else if (tableNumber.length > 0) {
            tableNumber = tableNumber.slice(0, -1);
        }
    }
    
    function clearInputs() {
        tableNumber = '';
        selectedItems.clear();
        selectedItems = selectedItems; // Trigger reactivity
        isDividing = false;
        divisorNumber = '';
        partialPayments = 0; // Réinitialiser les paiements partiels
        initialDivisionAmount = 0; // Réinitialiser le montant de division initial
        paidQuantities.clear(); // Réinitialiser les quantités payées
        paidQuantities = paidQuantities; // Trigger reactivity
    }
    
    function toggleDivision() {
        if (!isDividing) {
            // Activation de la division : stocker le montant initial
            initialDivisionAmount = selectedAmount > 0 ? selectedAmount : remainingAmount;
        }
        isDividing = !isDividing;
        divisorNumber = '';
    }
    
    /**
     * @param {number} itemId
     */
    function toggleItemSelection(itemId) {
        // Trouver l'item pour connaître sa quantité totale et payée
        const item = commandData.items.find(i => i.id === itemId);
        if (!item) return;
        
        const paidQuantity = paidQuantities.get(itemId) || 0;
        const remainingQuantity = item.quantity - paidQuantity;
        
        // Ne pas permettre de sélectionner si tout est déjà payé
        if (remainingQuantity <= 0) return;
        
        const currentSelected = selectedItems.get(itemId) || 0;
        
        if (currentSelected < remainingQuantity) {
            // Augmenter la quantité sélectionnée
            selectedItems.set(itemId, currentSelected + 1);
        } else {
            // Si on a atteint le maximum disponible, désélectionner complètement
            selectedItems.delete(itemId);
        }
        
        selectedItems = selectedItems; // Trigger reactivity
    }
    
    async function processPayment() {
        // Vérifier qu'on a soit des items sélectionnés, soit un mode division valide
        const hasSelectedItems = Array.from(selectedItems.values()).some(qty => qty > 0);
        if (!hasSelectedItems && (!isDividing || !divisorNumber || parseInt(divisorNumber) <= 0)) {
            alert('Veuillez sélectionner au moins un item à payer ou activer la division');
            return;
        }
        
        isProcessing = true;
        
        // Simulation du traitement
        setTimeout(() => {
            const hasSelectedItems = Array.from(selectedItems.values()).some(qty => qty > 0);
            if (hasSelectedItems) {
                // Mode classique : ajouter les quantités payées
                selectedItems.forEach((quantity, itemId) => {
                    if (quantity > 0) {
                        const currentPaid = paidQuantities.get(itemId) || 0;
                        paidQuantities.set(itemId, currentPaid + quantity);
                    }
                });
                paidQuantities = paidQuantities; // Trigger reactivity
                selectedItems.clear();
                selectedItems = selectedItems; // Trigger reactivity
            } else if (isDividing && divisorNumber && parseInt(divisorNumber) > 0) {
                // Mode division : ajouter le paiement partiel
                partialPayments += amountPerPerson;
                // Rester en mode division pour permettre d'autres paiements
                // isDividing reste true, divisorNumber reste inchangé
            }
            
            isProcessing = false;
            
            // Vérifier si le paiement est complet après ce paiement
            const newRemainingAmount = totalCommand - paidAmount - partialPayments;
            if (newRemainingAmount <= 0.01) { // Petite tolérance pour les arrondis
                paymentCompleted = true;
                // Redirection après 3 secondes
                setTimeout(() => {
                    goto('/selectTable');
                }, 3000);
            }
        }, 2000);
    }
</script>

<div class="card-payment">
    {#if paymentCompleted}
        <div class="payment-completed">
            <div class="completed-icon">✅</div>
            <h2>Paiement effectué</h2>
            <p>Redirection en cours...</p>
        </div>
    {:else}
    <!-- Header avec totaux -->
    <div class="payment-header">
        <button class="back-button" on:click={onBack}>← Retour</button>
        <div class="total-info">
            <span class="label">Total:</span>
            <span class="amount">{totalCommand.toFixed(2)}€</span>
        </div>
        <div class="remaining-info">
            <span class="label">Reste à payer:</span>
            <span class="amount">{remainingAmount.toFixed(2)}€</span>
        </div>
    </div>
    
    <!-- Sélection table -->
    <div class="selection-area">
        <div class="input-group">
            <label for="table-input">Table:</label>
            <input 
                id="table-input" 
                type="text" 
                bind:value={tableNumber} 
                placeholder="000" 
                maxlength="3" 
                readonly 
            />
        </div>
    </div>
    
    <!-- Récapitulatif de commande -->
    {#if tableNumber && commandData && commandData.tableNumber === parseInt(tableNumber) && !isDividing}
        <div class="command-recap">
            <h3>Commande Table {commandData.tableNumber}</h3>
            <div class="items-list">
                <div class="header-row">
                    <span class="item-name">Plat</span>
                    <span class="item-quantity">Qté</span>
                    <span class="item-price">Prix</span>
                    <span class="item-total">Total</span>
                </div>
                
                {#each commandData.items.filter(item => (item.quantity - (paidQuantities.get(item.id) || 0)) > 0) as item}
                    <button 
                        class="item-row"
                        class:selected={selectedItems.has(item.id) && selectedItems.get(item.id) > 0}
                        on:click={() => toggleItemSelection(item.id)}
                    >
                        <div class="item-info">
                            <span class="item-name">{item.name}</span>
                            <span class="item-category category-{item.category}">{item.category}</span>
                        </div>
                        <span class="item-quantity">
                            {#if selectedItems.has(item.id) && selectedItems.get(item.id) > 0}
                                {selectedItems.get(item.id)}/{item.quantity - (paidQuantities.get(item.id) || 0)}
                            {:else}
                                {item.quantity - (paidQuantities.get(item.id) || 0)}
                            {/if}
                        </span>
                        <span class="item-price">{item.price.toFixed(2)}€</span>
                        <span class="item-total">{(item.price * (item.quantity - (paidQuantities.get(item.id) || 0))).toFixed(2)}€</span>
                    </button>
                {/each}
            </div>
        </div>
    {:else if !isDividing}
        <div class="no-command">
            <p>Saisissez un numéro de table pour afficher la commande</p>
        </div>
    {/if}
    
    <!-- Zone de paiement -->
    <div class="payment-section">
        <!-- Keypad à gauche -->
        <div class="keypad-area">
            <Keypad {pressKey} />
        </div>
        
        <!-- Zone division et paiement à droite -->
        <div class="amount-area">
            {#if isDividing}
                <div class="division-info">
                    <span class="division-label">Diviser en :</span>
                    <span class="division-number">{divisorNumber || "_"} parts</span>
                    <div class="division-base">
                        Montant à diviser: {initialDivisionAmount.toFixed(2)}€
                    </div>
                    {#if divisorNumber && parseInt(divisorNumber) > 0}
                        <span class="part-amount">{amountPerPerson.toFixed(2)}€ par personne</span>
                    {/if}
                </div>
            {/if}
            
            <button 
                class="divide-button"
                class:active={isDividing}
                on:click={toggleDivision}
            >
                Diviser
            </button>
            
            <button 
                class="pay-button" 
                class:processing={isProcessing}
                on:click={processPayment}
                disabled={isProcessing || (!Array.from(selectedItems.values()).some(qty => qty > 0) && (!isDividing || !divisorNumber || parseInt(divisorNumber) <= 0))}
            >
                {#if isProcessing}
                    <span class="spinner"></span>
                    Traitement...
                {:else if isDividing && divisorNumber && parseInt(divisorNumber) > 0}
                    Payer {amountPerPerson.toFixed(2)}€
                {:else}
                    Payer {selectedAmount.toFixed(2)}€
                {/if}
            </button>
        </div>
    </div>
    {/if}
</div>