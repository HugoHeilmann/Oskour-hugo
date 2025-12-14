<script>
    import './+page.css';

    import { page } from '$app/stores';
    import Title from '$lib/components/Title/Title.svelte';
	import ToggleButton from '$lib/components/ToggleButton/ToggleButton.svelte';
    import FoodCard from '$lib/components/FoodCard/FoodCard.svelte';
    import FoodNavbar from '$lib/components/FoodNavbar/FoodNavbar.svelte';
	import CommandRecap from '$lib/components/CommandRecap/CommandRecap.svelte';

    const dishes = [
        { id: 1, name: 'Coca-Cola', imgSrc: '', type: 'boisson' },
        { id: 1, name: 'Coca-Cola', imgSrc: '', type: 'boisson' },
        { id: 1, name: 'Coca-Cola', imgSrc: '', type: 'boisson' },
        { id: 1, name: 'Coca-Cola', imgSrc: '', type: 'boisson' },
        { id: 1, name: 'Coca-Cola', imgSrc: '', type: 'boisson' },
        { id: 1, name: 'Coca-Cola', imgSrc: '', type: 'boisson' },
        { id: 4, name: 'Vomis', imgSrc: '', type: 'boisson' },
        { id: 2, name: 'Pizza Margherita', imgSrc: '', type: 'plat' },
        { id: 3, name: 'Tiramisu', imgSrc: '', type: 'dessert' }    
    ]

    /** @type {number} */
    let tableId = -1;

    /** @type {string} */
    let mode = 'commander';

    /** @type {string} */
    let foodCategory = 'boisson';

    let search = '';

    $: tableId = Number($page.params.tableId ?? -1);
    $: filteredDishes = filterDishes(search, foodCategory);

    /**
     * Filter dishes by search text and food category.
     * @param {string} searchText 
     * @param {string} foodCategory
     */
    function filterDishes(searchText, foodCategory) {
        const filteredByType = dishes.filter(d => d.type === foodCategory);
        const query = searchText.trim().toLowerCase();

        if (query === '') return filteredByType;

        return filteredByType.filter(d =>
            d.name.toLowerCase().includes(query)
            || String(d.id).includes(query)
        )
    }
</script>

<main class="app">
    <Title text={'Commande de la table : ' + tableId} />

    <ToggleButton bind:value={mode}
        on:change={(e) => mode = e.detail.value}
    />

    <div class="content">
        {#if mode === 'commander'}
            <div class="dishes">
                {#each filteredDishes as dish}
                    <FoodCard pro='false' code={dish.id} name={dish.name} imgSrc={dish.imgSrc}/>
                {/each}
            </div>

            <div class="bottom-area">
                <input 
                    class="code-input" 
                    type="text" 
                    placeholder="Taper le code..."
                    bind:value={search}    
                />

                <FoodNavbar bind:foodType={foodCategory}
                    on:select={(e) => foodCategory = e.detail.foodType}
                />
            </div>
        {:else if mode === 'payer'}
            <CommandRecap commandId={tableId} />
        {/if}
    </div>
</main>