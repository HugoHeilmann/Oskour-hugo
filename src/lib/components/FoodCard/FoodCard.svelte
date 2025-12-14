<script>
    import './FoodCard.css';
    import { ExpertiseMode } from '$lib/stores/appState.js';

    export let code = -1;
    export let name = 'Food Name';
    export let imgSrc = '';
    export let price = 0;

    $: pro = $ExpertiseMode === 'expertMode' ? "true" : "false";
</script>

<div class="food-card" on:click>
    {#if pro === "false"}
        <div class="food-image">
            <img src="{imgSrc}" alt="{name}" />
        </div>
    {:else}
        <div class="food-image empty"></div>
    {/if}
    <div class="food-info">
        {#if pro === "true"}
            <span class="food-code">Code: {code}</span>
        {:else}
            <h3 class="food-name">{name}</h3>
            <span class="food-price">{price.toFixed(2)}€</span>
        {/if}
    </div> 
</div>