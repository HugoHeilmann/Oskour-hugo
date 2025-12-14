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

    function updateQuantity(item, change) {
        commands.update(currentCommands => {
            const newCommands = [...currentCommands];
            const cmd = newCommands.find(c => c.tableNumber === tableId);
            
            if (cmd) {
                const targetItemIndex = cmd.items.findIndex(i => i.name === item.name);
                
                if (targetItemIndex !== -1) {
                    const newQty = cmd.items[targetItemIndex].quantity + change;
                    
                    if (newQty <= 0) {
                        cmd.items.splice(targetItemIndex, 1);
                    } else {
                        cmd.items[targetItemIndex].quantity = newQty;
                    }
                }
            }
            return newCommands;
        });
    }
</script>

<div class="command-recap">
    <div class="table-header">
        <h2>Table {tableId}</h2>
    </div>
    
    <div class="items-list">
        <div class="header-row">
            <span class="item-name">Plat</span>
            <span class="item-quantity">Qté</span>
            <span class="item-price">P. Unit.</span>
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
                    <div class="item-quantity-wrapper">
                        <button 
                            class="qty-btn minus" 
                            on:click|stopPropagation={() => updateQuantity(item, -1)}
                        >
                            -
                        </button>
                        
                        <span class="item-quantity">{item.quantity}</span>
                        
                        <button 
                            class="qty-btn plus" 
                            on:click|stopPropagation={() => updateQuantity(item, 1)}
                        >
                            +
                        </button>
                    </div>
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