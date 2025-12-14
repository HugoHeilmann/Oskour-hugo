<script>
    import './+page.css';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    
    // Modification 1 : On importe le store 'commands' au lieu du fichier JSON
    import { commands } from '$lib/stores/appState.js';

    import PaymentMethods from '$lib/components/PaymentMethods/PaymentMethods.svelte';
    import CardPayment from '$lib/components/Payment/CardPayment/CardPayment.svelte';
    import CashPayment from '$lib/components/Payment/CashPayment/CashPayment.svelte';
    import MobilePayment from '$lib/components/Payment/MobilePayment/MobilePayment.svelte';
    import Title from '$lib/components/Title/Title.svelte';

    $: commandId = Number($page.params.commandId) || 0;
    
    // Modification 1 (suite) : On cherche la commande dans le store réactif
    $: commandData = ($commands || []).find(cmd => cmd.commandId === commandId);

    // Sécurisation : Si la commande n'existe plus (ou pas encore chargée), on gère les valeurs par défaut
    $: total = commandData ? commandData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0) : 0;

    // Calcul du nombre d'items par catégorie
    $: categorySummary = commandData ? {
        plat: commandData.items.filter(item => item.category === 'plat').reduce((sum, item) => sum + item.quantity, 0),
        boisson: commandData.items.filter(item => item.category === 'boisson').reduce((sum, item) => sum + item.quantity, 0),
        dessert: commandData.items.filter(item => item.category === 'dessert').reduce((sum, item) => sum + item.quantity, 0)
    } : { plat: 0, boisson: 0, dessert: 0 };

    let selectedPaymentMethod = '';
    let paymentCompleted = false;
    
    function handlePaymentSelect(methodId) {
        selectedPaymentMethod = String(methodId || '');
    }
    
    function handleBack() {
        selectedPaymentMethod = '';
    }
    
    function handlePaymentSuccess() {
        paymentCompleted = true;
        
        // Modification 2 : Suppression de la commande dans le store
        commands.update(currentCommands => {
            // On garde toutes les commandes SAUF celle qui vient d'être payée
            return currentCommands.filter(cmd => cmd.commandId !== commandId);
        });

        setTimeout(() => {
            goto('/selectTable');
        }, 3000);
    }
</script>

<svelte:head>
    <title>Paiement - Commande #{commandId}</title>
</svelte:head>

<main class="app">
    <Title text="Paiement - Table #{commandData.tableNumber}"></Title>
    <div class="payment-page">
        {#if paymentCompleted}
            <div class="success-container">
                <div class="success-content">
                    <div class="success-icon">✓</div>
                    <h1>Paiement réussi !</h1>
                    <p>Merci pour votre commande #{commandId}</p>
                    <p class="redirect-info">Redirection en cours...</p>
                </div>
            </div>
        {:else}
            <div class="payment-container">
                {#if selectedPaymentMethod === ''}
                    <div class="order-summary">
                        <h2>Résumé de la commande</h2>
                        <div class="category-summary">
                            {#if categorySummary.plat > 0}
                                <div class="category-item">
                                    <span class="category-icon">🍽️</span>
                                    <span class="category-text">{categorySummary.plat} plat{categorySummary.plat > 1 ? 's' : ''}</span>
                                </div>
                            {/if}
                            {#if categorySummary.boisson > 0}
                                <div class="category-item">
                                    <span class="category-icon">🥤</span>
                                    <span class="category-text">{categorySummary.boisson} boisson{categorySummary.boisson > 1 ? 's' : ''}</span>
                                </div>
                            {/if}
                            {#if categorySummary.dessert > 0}
                                <div class="category-item">
                                    <span class="category-icon">🍰</span>
                                    <span class="category-text">{categorySummary.dessert} dessert{categorySummary.dessert > 1 ? 's' : ''}</span>
                                </div>
                            {/if}
                        </div>
                        <div class="summary-total">
                            <strong>Total : {total.toFixed(2)}€</strong>
                        </div>
                        
                        <PaymentMethods onPaymentSelect={handlePaymentSelect} />
                    {:else if selectedPaymentMethod === 'card'}
                        <CardPayment 
                            amount={total} 
                            onBack={handleBack} 
                            onSuccess={handlePaymentSuccess} 
                        />
                    {:else if selectedPaymentMethod === 'cash'}
                        <CashPayment 
                            amount={total} 
                            onBack={handleBack} 
                            onSuccess={handlePaymentSuccess} 
                        />
                    {:else if selectedPaymentMethod === 'mobile'}
                        <MobilePayment 
                            amount={total} 
                            onBack={handleBack} 
                            onSuccess={handlePaymentSuccess} 
                        />
                    {/if}
                {:else}
                    <div class="error-message" style="padding: 20px; text-align: center;">
                        <p>Commande introuvable ou déjà payée.</p>
                        <button on:click={() => goto('/selectTable')} style="padding: 10px; cursor: pointer;">Retour à l'accueil</button>
                    </div>
                    
                    <PaymentMethods onPaymentSelect={handlePaymentSelect} />
                {:else if selectedPaymentMethod === 'card'}
                    <CardPayment 
                        amount={total} 
                        onBack={handleBack} 
                        onSuccess={handlePaymentSuccess} 
                        tableNumber={commandData.tableNumber}
                    />
                {:else if selectedPaymentMethod === 'cash'}
                    <CashPayment 
                        amount={total} 
                        onBack={handleBack} 
                        onSuccess={handlePaymentSuccess} 
                    />
                {:else if selectedPaymentMethod === 'mobile'}
                    <MobilePayment 
                        amount={total} 
                        onBack={handleBack} 
                        onSuccess={handlePaymentSuccess} 
                    />
                {/if}
            </div>
        {/if}
    </div>
</main>