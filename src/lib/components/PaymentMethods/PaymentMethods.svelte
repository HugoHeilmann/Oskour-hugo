<script>
    import "./PaymentMethods.css";
    
    export let onPaymentSelect = null;
    
    const paymentMethods = [
        {
            id: 'card',
            icon: '💳',
            title: 'Carte bancaire',
            subtitle: 'Visa, Mastercard, Amex'
        },
        {
            id: 'cash',
            icon: '💰',
            title: 'Espèces',
            subtitle: 'Paiement en liquide'
        },
        {
            id: 'mobile',
            icon: '📱',
            title: 'Paiement mobile',
            subtitle: 'Apple Pay, Google Pay'
        }
    ];
    
    function handlePaymentSelect(methodId) {
        onPaymentSelect && onPaymentSelect(String(methodId));
    }
</script>

<div class="payment-methods">
    <div class="payment-options">
        {#each paymentMethods as method}
            <button 
                class="payment-option" 
                on:click={() => handlePaymentSelect(method.id)}
            >
                <span class="payment-icon">{method.icon}</span>
                <div class="payment-info">
                    <span class="payment-title">{method.title}</span>
                    <span class="payment-subtitle">{method.subtitle}</span>
                </div>
                <span class="arrow">→</span>
            </button>
        {/each}
    </div>
</div>