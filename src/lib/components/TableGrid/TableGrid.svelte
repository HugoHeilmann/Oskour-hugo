<script>
    import './TableGrid.css';
  import { goto } from '$app/navigation';

  export let roomId = '';
  export let roomLabel = roomId;
  export let cols = 4;
  export let rows = 6;

  $: tables = generateLayout(roomId);

  // --- Hash déterministe pour random ---
  function stringToSeed(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
    }
    return hash || 1;
  }

  function createRng(seed) {
    let s = seed;
    return () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 2 ** 32;
    };
  }

  // --- Génération du plan de tables ---
  function generateLayout(roomId) {
    const seed = stringToSeed(roomId);
    const rand = createRng(seed);

    const tableCount = 6 + Math.floor(rand() * 5); // 6–10 tables
    const placements = [];

    const grid = Array.from({ length: rows }, () => Array(cols).fill(false));

    function canPlace(col, row, width, height) {
      if (col + width > cols || row + height > rows) return false;
      for (let r = row; r < row + height; r++)
        for (let c = col; c < col + width; c++)
          if (grid[r][c]) return false;
      return true;
    }

    function occupy(col, row, width, height) {
      for (let r = row; r < row + height; r++)
        for (let c = col; c < col + width; c++)
          grid[r][c] = true;
    }

    for (let i = 0; i < tableCount; i++) {
      let placed = false;
      for (let attempt = 0; attempt < 30 && !placed; attempt++) {
        const vertical = rand() < 0.45;
        const width = vertical ? 1 : rand() < 0.7 ? 2 : 3;
        const height = vertical ? (rand() < 0.7 ? 2 : 3) : 1;

        const maxColStart = cols - width;
        const maxRowStart = rows - height - 1;
        const colStart = Math.floor(rand() * (maxColStart + 1));
        const rowStart = 1 + Math.floor(rand() * (maxRowStart + 1));

        if (canPlace(colStart, rowStart, width, height)) {
          occupy(colStart, rowStart, width, height);
          placements.push({
            colStart: colStart + 1,
            rowStart: rowStart + 1,
            width,
            height
          });
          placed = true;
        }
      }
    }

    // Numérotation logique (haut → bas, gauche → droite)
    placements.sort((a, b) =>
      a.rowStart === b.rowStart ? a.colStart - b.colStart : a.rowStart - b.rowStart
    );

    return placements.map((p, i) => ({ id: i + 1, ...p }));
  }
</script>

<div class="room-plan-wrapper">
  <div class="room-chip">{roomLabel}</div>

  <div
    class="room-grid"
    style={`grid-template-columns: repeat(${cols}, minmax(0, 1fr));`}
  >
    {#each tables as table}
      <button
        class="room-table"
        style={`grid-column: ${table.colStart} / span ${table.width};
                grid-row: ${table.rowStart} / span ${table.height};`}
        on:click={() => goto(`/manageTable/${table.id}`)}
      >
        {table.id}
      </button>
    {/each}
  </div>
</div>
