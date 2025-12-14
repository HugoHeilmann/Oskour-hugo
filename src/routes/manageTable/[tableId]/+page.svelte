<script>
    import './+page.css';
    import { page } from '$app/stores';
    import Title from '$lib/components/Title/Title.svelte';
	import ToggleButton from '$lib/components/ToggleButton/ToggleButton.svelte';
    import FoodCard from '$lib/components/FoodCard/FoodCard.svelte';
    import FoodNavbar from '$lib/components/FoodNavbar/FoodNavbar.svelte';
	import CommandRecap from '$lib/components/CommandRecap/CommandRecap.svelte';
    import { onMount } from 'svelte';
    import { ExpertiseMode, toggleMode, commands } from '$lib/stores/appState.js';

    const dishes = [
        { id: 1, code: 'b1', name: 'Coca-Cola', imgSrc: '/src/lib/assets/coca.png', type: 'boisson', price: 2.5 },
        { id: 2, code: 'b2', name: 'Sprite', imgSrc: '/src/lib/assets/coca.png', type: 'boisson', price: 2.5 },
        { id: 3, code: 'b3', name: 'Fanta Orange', imgSrc: '/src/lib/assets/coca.png', type: 'boisson', price: 2.5 },
        { id: 4, code: 'b4', name: 'Eau minérale', imgSrc: '/src/lib/assets/coca.png', type: 'boisson', price: 1.5 },
        { id: 5, code: 'b5', name: 'Jus d\'orange', imgSrc: '/src/lib/assets/coca.png', type: 'boisson', price: 2.5 },
        { id: 6, code: 'b6', name: 'Café', imgSrc: '/src/lib/assets/coca.png', type: 'boisson', price: 3.0 },
        { id: 7, code: 'b7', name: 'Thé', imgSrc: '/src/lib/assets/coca.png', type: 'boisson', price: 3.0 },
        { id: 8, code: 'b8', name: 'Vin rouge', imgSrc: '/src/lib/assets/coca.png', type: 'boisson', price: 9.0 },
        { id: 9, code: 'b9', name: 'Bière Blonde', imgSrc: '/src/lib/assets/coca.png', type: 'boisson', price: 7.0 },
        { id: 10, code: 'b10', name: 'Cidre', imgSrc: '/src/lib/assets/coca.png', type: 'boisson', price: 6.0 },
        { id: 11, code: 'b11', name: 'Limonade', imgSrc: '/src/lib/assets/coca.png', type: 'boisson', price: 2.5 },
        { id: 12, code: 'b12', name: 'Champagne', imgSrc: '/src/lib/assets/coca.png', type: 'boisson', price: 15.0 },
        { id: 13, code: 'b13', name: 'Smoothie Fraise', imgSrc: '/src/lib/assets/coca.png', type: 'boisson', price: 7.0 },
        { id: 14, code: 'b14', name: 'Milkshake', imgSrc: '/src/lib/assets/coca.png', type: 'boisson', price: 6.0 },
        { id: 15, code: 'b15', name: 'Cocktail Mojito', imgSrc: '/src/lib/assets/coca.png', type: 'boisson', price: 12.0 },
        { id: 16, code: 'b16', name: 'Eau Pétillante', imgSrc: '/src/lib/assets/coca.png', type: 'boisson', price: 2.0 },
        
        { id: 17, code: 'p1', name: 'Pizza Margherita', imgSrc: '/src/lib/assets/pizza.jpg', type: 'plat', price: 12.0 },
        { id: 18, code: 'p2', name: 'Pizza Pepperoni', imgSrc: '/src/lib/assets/pizza.jpg', type: 'plat', price: 13.0 },
        { id: 19, code: 'p3', name: 'Pâtes Carbonara', imgSrc: '/src/lib/assets/pizza.jpg', type: 'plat', price: 11.0 },
        { id: 20, code: 'p4', name: 'Pâtes Bolognaise', imgSrc: '/src/lib/assets/pizza.jpg', type: 'plat', price: 11.0 },
        { id: 21, code: 'p5', name: 'Poulet Rôti', imgSrc: '/src/lib/assets/pizza.jpg', type: 'plat', price: 14.0 },
        { id: 22, code: 'p6', name: 'Steak Frites', imgSrc: '/src/lib/assets/pizza.jpg', type: 'plat', price: 18.0 },
        { id: 23, code: 'p7', name: 'Salade Niçoise', imgSrc: '/src/lib/assets/pizza.jpg', type: 'plat', price: 9.0 },
        { id: 24, code: 'p8', name: 'Burger Classique', imgSrc: '/src/lib/assets/pizza.jpg', type: 'plat', price: 10.0 },
        { id: 25, code: 'p9', name: 'Pizza BBQ', imgSrc: '/src/lib/assets/pizza.jpg', type: 'plat', price: 13.5 },
        { id: 26, code: 'p10', name: 'Pizza 4 Fromages', imgSrc: '/src/lib/assets/pizza.jpg', type: 'plat', price: 14.0 },
        { id: 27, code: 'p11', name: 'Pâtes Alfredo', imgSrc: '/src/lib/assets/pizza.jpg', type: 'plat', price: 12.0 },
        { id: 28, code: 'p12', name: 'Pâtes à la Sauce Tomate', imgSrc: '/src/lib/assets/pizza.jpg', type: 'plat', price: 10.0 },
        { id: 29, code: 'p13', name: 'Poulet Grillé', imgSrc: '/src/lib/assets/pizza.jpg', type: 'plat', price: 13.0 },
        { id: 30, code: 'p14', name: 'Côte de Boeuf', imgSrc: '/src/lib/assets/pizza.jpg', type: 'plat', price: 20.0 },
        { id: 31, code: 'p15', name: 'Salade Verte', imgSrc: '/src/lib/assets/pizza.jpg', type: 'plat', price: 8.0 },
        { id: 32, code: 'p16', name: 'Burger Bacon', imgSrc: '/src/lib/assets/pizza.jpg', type: 'plat', price: 11.0 },
        { id: 33, code: 'p17', name: 'Pizza Végétarienne', imgSrc: '/src/lib/assets/pizza.jpg', type: 'plat', price: 11.5 },
        { id: 34, code: 'p18', name: 'Pizza Calzone', imgSrc: '/src/lib/assets/pizza.jpg', type: 'plat', price: 12.5 },
        { id: 35, code: 'p19', name: 'Raviolis Maison', imgSrc: '/src/lib/assets/pizza.jpg', type: 'plat', price: 12.0 },
        { id: 36, code: 'p20', name: 'Lasagne Bolognaise', imgSrc: '/src/lib/assets/pizza.jpg', type: 'plat', price: 13.0 },
        { id: 37, code: 'p21', name: 'Escalope Milanaise', imgSrc: '/src/lib/assets/pizza.jpg', type: 'plat', price: 14.5 },
        { id: 38, code: 'p22', name: 'Entrecôte Frites', imgSrc: '/src/lib/assets/pizza.jpg', type: 'plat', price: 19.0 },
        { id: 39, code: 'p23', name: 'Salade Composée', imgSrc: '/src/lib/assets/pizza.jpg', type: 'plat', price: 9.5 },
        { id: 40, code: 'p24', name: 'Double Burger', imgSrc: '/src/lib/assets/pizza.jpg', type: 'plat', price: 13.0 },
        { id: 41, code: 'p25', name: 'Pizza Spicy', imgSrc: '/src/lib/assets/pizza.jpg', type: 'plat', price: 13.5 },
        { id: 42, code: 'p26', name: 'Pizza Fruits de Mer', imgSrc: '/src/lib/assets/pizza.jpg', type: 'plat', price: 15.0 },
        { id: 43, code: 'p27', name: 'Gnocchis à la Truffe', imgSrc: '/src/lib/assets/pizza.jpg', type: 'plat', price: 14.0 },
        { id: 44, code: 'p28', name: 'Fettuccine Asperges', imgSrc: '/src/lib/assets/pizza.jpg', type: 'plat', price: 12.5 },
        { id: 45, code: 'p29', name: 'Poulet aux Champignons', imgSrc: '/src/lib/assets/pizza.jpg', type: 'plat', price: 13.5 },
        { id: 46, code: 'p30', name: 'Filet de Poisson', imgSrc: '/src/lib/assets/pizza.jpg', type: 'plat', price: 16.0 },
        { id: 47, code: 'p31', name: 'Salade Grecque', imgSrc: '/src/lib/assets/pizza.jpg', type: 'plat', price: 9.5 },
        { id: 48, code: 'p32', name: 'Burger Végétal', imgSrc: '/src/lib/assets/pizza.jpg', type: 'plat', price: 10.5 },
        
        { id: 49, code: 'd1', name: 'Tiramisu', imgSrc: '/src/lib/assets/glace.jpg', type: 'dessert', price: 6.5 },
        { id: 50, code: 'd2', name: 'Chocolate Cake', imgSrc: '/src/lib/assets/glace.jpg', type: 'dessert', price: 7.0 },
        { id: 51, code: 'd3', name: 'Panna Cotta', imgSrc: '/src/lib/assets/glace.jpg', type: 'dessert', price: 6.0 },
        { id: 52, code: 'd4', name: 'Crème Brûlée', imgSrc: '/src/lib/assets/glace.jpg', type: 'dessert', price: 6.5 },
        { id: 53, code: 'd5', name: 'Macarons', imgSrc: '/src/lib/assets/glace.jpg', type: 'dessert', price: 5.0 },
        { id: 54, code: 'd6', name: 'Tarte aux Fruits', imgSrc: '/src/lib/assets/glace.jpg', type: 'dessert', price: 7.0 },
        { id: 55, code: 'd7', name: 'Mousse au Chocolat', imgSrc: '/src/lib/assets/glace.jpg', type: 'dessert', price: 6.0 },
        { id: 56, code: 'd8', name: 'Crème Caramel', imgSrc: '/src/lib/assets/glace.jpg', type: 'dessert', price: 6.5 },
        { id: 57, code: 'd9', name: 'Éclair au Café', imgSrc: '/src/lib/assets/glace.jpg', type: 'dessert', price: 5.5 },
        { id: 58, code: 'd10', name: 'Mille-Feuille', imgSrc: '/src/lib/assets/glace.jpg', type: 'dessert', price: 7.5 },
        { id: 59, code: 'd11', name: 'Paris-Brest', imgSrc: '/src/lib/assets/glace.jpg', type: 'dessert', price: 7.0 },
        { id: 60, code: 'd12', name: 'Tarte Tatin', imgSrc: '/src/lib/assets/glace.jpg', type: 'dessert', price: 7.5 },
        { id: 61, code: 'd13', name: 'Brownies', imgSrc: '/src/lib/assets/glace.jpg', type: 'dessert', price: 5.5 },
        { id: 62, code: 'd14', name: 'Cheesecake', imgSrc: '/src/lib/assets/glace.jpg', type: 'dessert', price: 7.5 },
        { id: 63, code: 'd15', name: 'Pavlova Fruits Rouges', imgSrc: '/src/lib/assets/glace.jpg', type: 'dessert', price: 8.0 },
        { id: 64, code: 'd16', name: 'Soufflé au Citron', imgSrc: '/src/lib/assets/glace.jpg', type: 'dessert', price: 7.0 },
        { id: 65, code: 'd17', name: 'Sorbet Fraise', imgSrc: '/src/lib/assets/glace.jpg', type: 'dessert', price: 5.5 },
        { id: 66, code: 'd18', name: 'Glace Vanille', imgSrc: '/src/lib/assets/glace.jpg', type: 'dessert', price: 5.0 },
        { id: 67, code: 'd19', name: 'Fondant Chocolat', imgSrc: '/src/lib/assets/glace.jpg', type: 'dessert', price: 6.5 },
        { id: 68, code: 'd20', name: 'Tarte Citron Meringuée', imgSrc: '/src/lib/assets/glace.jpg', type: 'dessert', price: 7.5 },
        { id: 69, code: 'd21', name: 'Profiteroles', imgSrc: '/src/lib/assets/glace.jpg', type: 'dessert', price: 6.0 },
        { id: 70, code: 'd22', name: 'Bavarois Framboise', imgSrc: '/src/lib/assets/glace.jpg', type: 'dessert', price: 6.5 },
        { id: 71, code: 'd23', name: 'Clafoutis Cerises', imgSrc: '/src/lib/assets/glace.jpg', type: 'dessert', price: 6.0 },
        { id: 72, code: 'd24', name: 'Opéra', imgSrc: '/src/lib/assets/glace.jpg', type: 'dessert', price: 8.0 },
    ];

    /** @type {number} */
    let tableId = -1;
    /** @type {string} */
    let orderState = 'commander';
    /** @type {string} */
    let foodCategory = 'boisson';

    let search = '';
    let windowWidth = 0;

    $: tableId = Number($page.params.tableId ?? -1);
    $: filteredDishes = filterDishes(search, foodCategory);
    $: titleText = windowWidth < 600 ? `Table : ${tableId}` : `Commande de la table : ${tableId}`;

    function filterDishes(searchText, foodCategory) {
        const filteredByType = dishes.filter(d => d.type === foodCategory);
        const query = searchText.trim().toLowerCase();
        if (query === '') return filteredByType;
        return filteredByType.filter(d =>
            d.name.toLowerCase().includes(query) || String(d.id).includes(query)
        )
    }

    /**
     * Ajoute un item à la commande de la table courante
     * @param {Object} dish - Le plat sélectionné
     */
    function addToOrder(dish) {
        commands.update(currentCommands => {
            // Initialiser si undefined
            if (!currentCommands) currentCommands = [];

            // 1. Chercher si une commande existe pour cette table
            let command = currentCommands.find(c => c.tableNumber === tableId);

            if (!command) {
                // 2. Si elle n'existe pas, on la crée
                command = {
                    commandId: Date.now(), // ID unique simple
                    tableNumber: tableId,
                    items: []
                };
                currentCommands.push(command);
            }

            // 3. Chercher si l'item est déjà dans la commande
            const existingItem = command.items.find(item => item.name === dish.name);

            if (existingItem) {
                // Si oui, on incrémente la quantité
                existingItem.quantity += 1;
            } else {
                // Si non, on l'ajoute
                command.items.push({
                    id: dish.id,
                    name: dish.name,
                    quantity: 1,
                    price: dish.price,
                    category: dish.type,
                    note: ""
                });
            }

            return currentCommands;
        });
    }

    onMount(() => {
        const handleResize = () => { windowWidth = window.innerWidth; };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });

    function setModeFromTitle(event) {
        ExpertiseMode.set(event.detail);
    }
</script>

<main class="app" id="app-layout" class:has-expert-rights={$ExpertiseMode === 'expertMode'}>
    <Title text={titleText} ExpertiseMode={$ExpertiseMode} on:change={setModeFromTitle} />

    <ToggleButton bind:value={orderState}
        on:change={(e) => {
            orderState = e.detail.value;
            toggleMode.set(e.detail.value);
        }}
    />

    <div class="content">
        {#if orderState === 'commander'}
        <div class="dishes-container">
            <div class="dishes">
                {#each filteredDishes as dish}
                    <FoodCard 
                        code={dish.code} 
                        name={dish.name} 
                        imgSrc={dish.imgSrc} 
                        price={dish.price} 
                        on:click={() => addToOrder(dish)}
                    />
                {/each}
            </div>
            <CommandRecap tableId={tableId} />
        </div>
            <div class="bottom-area">
                {#if $ExpertiseMode === 'expertMode'}
                    <input 
                        class="code-input" 
                        type="text" 
                        placeholder="Taper le code..."
                        bind:value={search}    
                    />
                {/if}

                <FoodNavbar bind:foodType={foodCategory}
                    on:select={(e) => foodCategory = e.detail.foodType}
                />
            </div>
        {:else if orderState === 'payer'}
            <CommandRecap tableId={tableId} />
        {/if}
    </div>
</main>