<script>
    import "./CommandRecap.css"
    import mockCommands from "../../data/mockCommand.json"
    import PaymentButton from "../PaymentButton/PaymentButton.svelte"

    export let commandId = 1; // ID de la commande à afficher
    
    // Trouve la commande correspondante ou utilise la première par défaut
    $: commandData = mockCommands.find(cmd => cmd.commandId === commandId) || mockCommands[0];
    
    // Calcul du total
    $: total = commandData ? commandData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0) : 0;
</script>

<div class="command-recap">
    <div class="table-header">
        <h2>Table {commandData.tableNumber}</h2>
    </div>
    
    <div class="items-list">
        <div class="header-row">
            <span class="item-name">Plat</span>
            <span class="item-quantity">Qté</span>
            <span class="item-price">Prix unit.</span>
            <span class="item-total">Total</span>
        </div>
        
        {#each commandData.items as item}
            <div class="item-row">
                <div class="item-info">
                    <span class="item-name">{item.name}</span>
                    <span class="item-category category-{item.category}">{item.category}</span>
                    {#if item.note}
                        <span class="item-note">({item.note})</span>
                    {/if}
                </div>
                <span class="item-quantity">{item.quantity}</span>
                <span class="item-price">{item.price.toFixed(2)}€</span>
                <span class="item-total">{(item.price * item.quantity).toFixed(2)}€</span>
            </div>
        {/each}
    </div>
    
    <div class="total-section">
        <div class="total-row">
            <span class="total-label">Total :</span>
            <span class="total-amount">{total.toFixed(2)}€</span>
        </div>
    </div>
    
    <PaymentButton commandId={commandId} />
</div>