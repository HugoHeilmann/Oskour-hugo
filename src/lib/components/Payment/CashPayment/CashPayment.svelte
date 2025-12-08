<script>
    import PaymentHeader from "../PaymentHeader/PaymentHeader.svelte";
import "./CashPayment.css";
    
    export let amount = 0;
    export let onBack = () => {};
    export let onSuccess = () => {};
    
    let receivedAmount = '';
    let change = 0;
    
    $: {
        const received = parseFloat(receivedAmount) || 0;
        change = received - amount;
    }
    
    function handleAmountInput(event) {
        const value = String(event.target.value);
        // Permet seulement les chiffres et un point décimal
        if (/^\d*\.?\d*$/.test(value)) {
            receivedAmount = value;
        }
    }
    
    function setExactAmount() {
        receivedAmount = amount.toFixed(2);
    }
    
    function addAmount(value) {
        const current = parseFloat(receivedAmount) || 0;
        receivedAmount = (current + Number(value)).toFixed(2);
    }
    
    function confirmPayment() {
        if (parseFloat(receivedAmount) < amount) {
            alert('Le montant reçu est insuffisant');
            return;
        }
        
        if (onSuccess) {
            onSuccess();
        }
    }
</script>

<div class="cash-payment">
    <PaymentHeader {onBack} method={"Paiement en especes"} {amount}  />
    
    <div class="cash-form">
        <div class="amount-input-section">
            <label for="receivedAmount">Montant reçu</label>
            <div class="input-with-button">
                <input
                    id="receivedAmount"
                    type="text"
                    bind:value={receivedAmount}
                    on:input={handleAmountInput}
                    placeholder="0.00"
                />
                <button class="exact-button" on:click={setExactAmount}>
                    Montant exact
                </button>
            </div>
        </div>
        
        <div class="quick-amounts">
            <h3>Montants rapides</h3>
            <div class="amount-buttons">
                <button on:click={() => addAmount(5)}>+5€</button>
                <button on:click={() => addAmount(10)}>+10€</button>
                <button on:click={() => addAmount(20)}>+20€</button>
                <button on:click={() => addAmount(50)}>+50€</button>
            </div>
        </div>
        
        {#if receivedAmount && parseFloat(receivedAmount) >= amount}
            <div class="change-section" class:positive={change > 0}>
                <div class="change-label">
                    {change > 0 ? 'Monnaie à rendre:' : 'Montant exact'}
                </div>
                <div class="change-amount">
                    {change > 0 ? `${change.toFixed(2)}€` : '✓'}
                </div>
            </div>
        {/if}
        
        <button 
            class="confirm-button"
            class:disabled={!receivedAmount || parseFloat(receivedAmount) < amount}
            on:click={confirmPayment}
            disabled={!receivedAmount || parseFloat(receivedAmount) < amount}
        >
            Confirmer le paiement
        </button>
    </div>
</div>