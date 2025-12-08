<script>
    import "./CardPayment.css";
    
    export let amount = 0;
    export let onBack = () => {};
    export let onSuccess = () => {};
    
    let cardNumber = '';
    let expiryDate = '';
    let cvv = '';
    let cardName = '';
    let isProcessing = false;
    
    function formatCardNumber(value) {
        return String(value).replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
    }
    
    function formatExpiryDate(value) {
        const cleaned = String(value).replace(/\D/g, '');
        if (cleaned.length >= 2) {
            return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
        }
        return cleaned;
    }
    
    function handleCardNumberInput(event) {
        const input = String(event.target.value).replace(/\D/g, '');
        if (input.length <= 16) {
            cardNumber = formatCardNumber(input);
        }
    }
    
    function handleExpiryInput(event) {
        const input = String(event.target.value);
        expiryDate = formatExpiryDate(input);
    }
    
    function handleCvvInput(event) {
        const input = String(event.target.value).replace(/\D/g, '');
        if (input.length <= 3) {
            cvv = input;
        }
    }
    
    async function processPayment() {
        if (!cardNumber || !expiryDate || !cvv || !cardName) {
            alert('Veuillez remplir tous les champs');
            return;
        }
        
        isProcessing = true;
        
        // Simulation du traitement
        setTimeout(() => {
            isProcessing = false;
            if (onSuccess) {
                onSuccess();
            }
        }, 2000);
    }
</script>

<div class="card-payment">
    <div class="payment-header">
        <button class="back-button" on:click={onBack}>← Retour</button>
        <h2>Paiement par carte</h2>
        <div class="amount">Montant: {amount.toFixed(2)}€</div>
    </div>
    
    <div class="card-form">
        <div class="form-group">
            <label for="cardNumber">Numéro de carte</label>
            <input
                id="cardNumber"
                type="text"
                bind:value={cardNumber}
                on:input={handleCardNumberInput}
                placeholder="1234 5678 9012 3456"
                maxlength="19"
            />
        </div>
        
        <div class="form-row">
            <div class="form-group">
                <label for="expiryDate">Date d'expiration</label>
                <input
                    id="expiryDate"
                    type="text"
                    bind:value={expiryDate}
                    on:input={handleExpiryInput}
                    placeholder="MM/AA"
                    maxlength="5"
                />
            </div>
            
            <div class="form-group">
                <label for="cvv">CVV</label>
                <input
                    id="cvv"
                    type="text"
                    bind:value={cvv}
                    on:input={handleCvvInput}
                    placeholder="123"
                    maxlength="3"
                />
            </div>
        </div>
        
        <div class="form-group">
            <label for="cardName">Nom du porteur</label>
            <input
                id="cardName"
                type="text"
                bind:value={cardName}
                placeholder="Nom comme sur la carte"
            />
        </div>
        
        <button 
            class="process-button" 
            class:processing={isProcessing}
            on:click={processPayment}
            disabled={isProcessing}
        >
            {#if isProcessing}
                <span class="spinner"></span>
                Traitement en cours...
            {:else}
                Payer {amount.toFixed(2)}€
            {/if}
        </button>
    </div>
</div>