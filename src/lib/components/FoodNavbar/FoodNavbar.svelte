<script>
    import './FoodNavbar.css';
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    // 'boisson' | 'plat | 'dessert'
    export let foodType = 'boisson';

    const items = [
		{ id: 'boisson', label: 'Boisson', icon: '🥤' },
		{ id: 'plat', label: 'Plat', icon: '🍽️' },
		{ id: 'dessert', label: 'Dessert', icon: '🍦' }
	];

    /**
     * Select a food type and dispatch a select event.
     * @param {string} id 
     */
    function select(id) {
        foodType = id;
        dispatch('select', { foodType });
    }
</script>

<nav class="navbar">
	{#each items as item}
		<button
			type="button"
			class:selected={foodType === item.id}
			on:click={() => select(item.id)}
		>
			<span class="icon">{item.icon}</span>
			<span class="label">{item.label}</span>
		</button>
	{/each}
</nav>