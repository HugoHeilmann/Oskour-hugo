<script>
    import './+page.css';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import mockCommands from '$lib/data/mockCommand.json';
    import PaymentMethods from '$lib/components/PaymentMethods/PaymentMethods.svelte';
    import CardPayment from '$lib/components/Payment/CardPayment/CardPayment.svelte';
    import CashPayment from '$lib/components/Payment/CashPayment/CashPayment.svelte';
    import MobilePayment from '$lib/components/Payment/MobilePayment/MobilePayment.svelte';
	import Title from '$lib/components/Title/Title.svelte';

    $: commandId = Number($page.params.commandId) || 1;
    $: commandData = mockCommands.find(cmd => cmd.commandId === commandId) || mockCommands[0];
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
        setTimeout(() => {
            goto('/selectTable');
        }, 3000);
    }
</script>

<svelte:head>
    <title>Paiement - Commande #{commandId}</title>
</svelte:head>

<main class="app">
    <Title text="Au secours Hugo"></Title>
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
                <div class="payment-header">
                    <h1>💳 Paiement</h1>
                    <p class="command-info">Commande #{commandId} - Table {commandData.tableNumber}</p>
                </div>

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
            </div>
        {/if}
    </div>
</main>