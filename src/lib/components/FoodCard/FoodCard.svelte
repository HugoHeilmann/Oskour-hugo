<script>
    import './FoodCard.css';

    export let pro = "false";
    export let code = -1;
    export let name = 'Food Name';
    export let imgSrc = '';
</script>

<div class="food-card">
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
        {/if}
    </div> 
</div>