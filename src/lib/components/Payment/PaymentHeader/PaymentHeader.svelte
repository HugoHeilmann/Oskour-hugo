<script>
    import "./PaymentHeader.css"

    export let onBack = () => {};
    export let method = "";
    export let amount = 0;
</script>

<div class="payment-header">
    <button class="back-button" on:click={onBack}>← Retour</button>
    <h2>{method}</h2>
    <div class="amount">Montant à payer: {amount.toFixed(2)}€</div>
</div>