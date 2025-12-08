<script>
    import './+page.css';
    import { page } from '$app/stores';
    import mockCommands from '$lib/data/mockCommand.json';

    $: commandId = Number($page.params.commandId) || 1;
    $: commandData = mockCommands.find(cmd => cmd.commandId === commandId) || mockCommands[0];
    $: total = commandData ? commandData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0) : 0;
</script>

<svelte:head>
    <title>Paiement - Commande #{commandId}</title>
</svelte:head>

<main class="payment-page">
    <div class="payment-container">
        <div class="payment-header">
            <h1>💳 Paiement</h1>
            <p class="command-info">Commande #{commandId} - Table {commandData.tableNumber}</p>
        </div>

        <div class="order-summary">
            <h2>Récapitulatif de la commande</h2>
            <div class="summary-items">
                {#each commandData.items as item}
                    <div class="summary-item">
                        <span class="item-name">{item.name}</span>
                        <span class="item-details">
                            {item.quantity}x {item.price.toFixed(2)}€ = {(item.price * item.quantity).toFixed(2)}€
                        </span>
                    </div>
                {/each}
            </div>
            <div class="total-amount">
                <strong>Total à payer : {total.toFixed(2)}€</strong>
            </div>
        </div>

        <div class="payment-methods">
            <h2>Mode de paiement</h2>
            <div class="payment-options">
                <button class="payment-option">
                    <span class="payment-icon">💳</span>
                    <div class="payment-info">
                        <span class="payment-title">Carte bancaire</span>
                        <span class="payment-subtitle">Visa, Mastercard, Amex</span>
                    </div>
                </button>
                
                <button class="payment-option">
                    <span class="payment-icon">💰</span>
                    <div class="payment-info">
                        <span class="payment-title">Espèces</span>
                        <span class="payment-subtitle">Paiement en liquide</span>
                    </div>
                </button>
                
                <button class="payment-option">
                    <span class="payment-icon">📱</span>
                    <div class="payment-info">
                        <span class="payment-title">Paiement mobile</span>
                        <span class="payment-subtitle">Apple Pay, Google Pay</span>
                    </div>
                </button>
            </div>
        </div>

        <div class="payment-actions">
            <button class="cancel-button" on:click={() => history.back()}>
                Retour
            </button>
            <button class="confirm-payment-button">
                Confirmer le paiement
            </button>
        </div>
    </div>
</main>