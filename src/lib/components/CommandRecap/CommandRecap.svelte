<script>
    import "./CommandRecap.css"
    import PaymentButton from "../PaymentButton/PaymentButton.svelte"
    import { toggleMode, commands } from "$lib/stores/appState.js"

    export let tableId = -1;
    
    $: commandData = ($commands || []).find(cmd => cmd.tableNumber === tableId);
    $: items = commandData?.items || [];
    $: total = items.reduce((sum, item) => {
        const itemPrice = item.price || 0;
        const itemQty = item.quantity || 0;
        return sum + (itemPrice * itemQty);
    }, 0);
</script>

<div class="command-recap">
    <div class="table-header">
        <h2>Table {tableId}</h2>
    </div>
    
    <div class="items-list">
        <div class="header-row">
            <span class="item-name">Plat</span>
            <span class="item-quantity">Qté</span>
            <span class="item-price">Prix unit.</span>
            <span class="item-total">Total</span>
        </div>
        
        {#if items.length === 0}
            <div class="item-row">
                <span class="item-name" style="width:100%; text-align:center; font-style:italic;">Aucune commande en cours</span>
            </div>
        {:else}
            {#each items as item}
                <div class="item-row">
                    <div class="item-info">
                        <span class="item-name">{item.name}</span>
                        <span class="item-category category-{item.category}">{item.category}</span>
                    </div>
                    <span class="item-quantity">{item.quantity}</span>
                    <span class="item-price">{(item.price || 0).toFixed(2)}€</span>
                    <span class="item-total">{((item.price || 0) * (item.quantity || 0)).toFixed(2)}€</span>
                </div>
            {/each}
        {/if}
    </div>
    
    <div class="total-section">
        <div class="total-row">
            <span class="total-label">Total :</span>
            <span class="total-amount">{(total || 0).toFixed(2)}€</span>
        </div>
    </div>
    
    {#if $toggleMode === 'payer' && commandData}
        <PaymentButton commandId={commandData.commandId} />
    {/if}
</div>