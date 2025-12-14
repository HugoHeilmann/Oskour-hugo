<script>
    import './+page.css';
    import Title from '$lib/components/Title/Title.svelte';
    import { ExpertiseMode } from '$lib/stores/appState.js';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';

    const GRID_COLS = 4;
    const GRID_ROWS = 8;

    /** @type {Record<string, { label: string, number: number }>} */
    const map = {
        'salle-1': { label: 'Salle 1', number: 1 },
        'salle-2': { label: 'Salle 2', number: 2 },
        'salle-3': { label: 'Salle 3', number: 3 },
        'terrasse': { label: 'Terrasse', number: 4 },
        'salon-prive': { label: 'Salon privé', number: 5 }
    };

    /** @type {string} */
    let roomId = '';

    $: roomId = $page.params.roomId ?? '';
    $: roomLabel = getRoomLabel(roomId);
    $: tables = generateLayout(roomId);

    /**
     * @param {string} id
     */
    function getRoomLabel(id) {
        return map[id].label ?? id;
    }

    /**
     * @param {string} id
     */
    function getRoomNumber(id) {
        return map[id].number ?? id;
    }

    // Petit hash déterministe
    /**
     * @param {string} str
     */
    function stringToSeed(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
        }
        return hash || 1;
    }

    /**
     * @param {number} seed
     */
    function createRng(seed) {
        let s = seed;
        return () => {
            s = (s * 1664525 + 1013904223) >>> 0;
            return s / 2 ** 32;
        };
    }

    /**
     * Génère un plan avec 6–10 tables, mélange vertical/horizontal,
     * numérotation logique (du haut vers le bas, puis gauche vers la droite).
     *
     * @param {string} roomId
     */
    function generateLayout(roomId) {
        const seed = stringToSeed(roomId);
        const rand = createRng(seed);

        const tableCount = 6 + Math.floor(rand() * 5); // 6–10 tables

        /** @type {{colStart:number,rowStart:number,width:number,height:number}[]} */
        const placements = [];

        // grille d’occupation
        const grid = Array.from({ length: GRID_ROWS }, () =>
            Array(GRID_COLS).fill(false)
        );

        /**
         * @param {number} col
         * @param {number} row
         * @param {number} width
         * @param {number} height
         */
        function canPlace(col, row, width, height) {
            if (col + width > GRID_COLS || row + height > GRID_ROWS) return false;
            for (let r = row; r < row + height; r++) {
                for (let c = col; c < col + width; c++) {
                    if (grid[r][c]) return false;
                }
            }
            return true;
        }

        /**
         * @param {number} col
         * @param {number} row
         * @param {number} width
         * @param {number} height
         */
        function occupy(col, row, width, height) {
            for (let r = row; r < row + height; r++) {
                for (let c = col; c < col + width; c++) {
                    grid[r][c] = true;
                }
            }
        }

        for (let i = 0; i < tableCount; i++) {
            let placed = false;

            // plusieurs tentatives pour éviter les collisions
            for (let attempt = 0; attempt < 30 && !placed; attempt++) {
                const vertical = rand() < 0.45;

                let width = 1;
                let height = 1;

                if (vertical) {
                    width = 1;
                    height = rand() < 0.7 ? 2 : 3;
                } else {
                    width = rand() < 0.7 ? 2 : 3;
                    height = 1;
                }

                // on laisse plus de place pour la circulation :
                // on évite la première et la dernière ligne, ça fait des "allées"
                const maxColStart = GRID_COLS - width;
                const maxRowStart = GRID_ROWS - height - 1;

                const colStart = Math.floor(rand() * (maxColStart + 1));
                const rowStart = 1 + Math.floor(rand() * (maxRowStart + 1));

                if (canPlace(colStart, rowStart, width, height)) {
                    occupy(colStart, rowStart, width, height);
                    placements.push({
                        colStart: colStart + 1, // CSS grid commence à 1
                        rowStart: rowStart + 1,
                        width,
                        height
                    });
                    placed = true;
                }
            }
        }

        // 🔢 Numérotation logique : on trie du haut vers le bas, puis gauche → droite
        placements.sort((a, b) => {
            if (a.rowStart === b.rowStart) {
                return a.colStart - b.colStart;
            }
            return a.rowStart - b.rowStart;
        });

        return placements.map((p, index) => ({
            id: index + 1,
            ...p
        }));
    }

</script>

<main class="app">
  <Title text={roomLabel} ExpertiseMode={$ExpertiseMode}/>

  <section class="content">
    <div class="room-plan-wrapper">
      <div class="room-chip">{roomLabel}</div>

      <div class="room-grid">
        {#each tables as table}
          <button
            class="room-table"
            style={`grid-column: ${table.colStart} / span ${table.width}; grid-row: ${table.rowStart} / span ${table.height};`}
            on:click={() => goto(`/manageTable/${table.id}`)}
          >
            {table.id}
          </button>
        {/each}
      </div>
    </div>
  </section>
</main>
