<script>
    import './RoomSelector.css';
    import { goto } from '$app/navigation';

    const allRooms = [
        { id: 'salle-1', label: 'Salle 1' },
        { id: 'salle-2', label: 'Salle 2' },
        { id: 'salle-3', label: 'Salle 3' },
        { id: 'terrasse', label: 'Terrasse' },
        { id: 'salon-prive', label: 'Salon privé' }
    ];

    let filter = '';

    $: filteredRooms = 
        allRooms.filter(room =>
            room.label.toLowerCase().includes(filter.toLowerCase().trim())
        )

    /**
     * Handles room selection and navigates to the corresponding room page.
	 * @param {{ id: string; label: string }} room
	 */
    function selectRoom(room) {
        goto(`/rooms/${room.id}`);
    }
</script>

<div class=room-selector>
    <h2 class=room-selector-title>Choix de la salle</h2>

    <input
        class="room-filter-input"
        type="text"
        placeholder="Filtrer les salles..."
        bind:value={filter}
    />

    <div class="room-buttons">
        {#if filteredRooms.length === 0}
            <p class="room-empty">Aucune salle trouvée</p>
        {:else}
            {#each filteredRooms as room}
                <button class="room-button"
                    on:click={() => selectRoom(room)}
                >
                    {room.label}
                </button>
            {/each}
        {/if}
    </div>
</div>