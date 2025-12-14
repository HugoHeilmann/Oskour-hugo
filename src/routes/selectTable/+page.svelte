<script>
    import './+page.css';
    import { goto } from '$app/navigation';

    import Title from '$lib/components/Title/Title.svelte';
    import Keypad from '$lib/components/Keypad/Keypad.svelte';
    import RoomSelector from '$lib/components/RoomSelector/RoomSelector.svelte';

    import { ExpertiseMode } from '$lib/stores/appState.js';
    import { mode } from '$lib/stores/appState.js';

    let tableNumber = '';

    function toggleMode() {
        mode.set($mode === 'expert' ? 'novice' : 'expert');
        tableNumber = '';
    }

    function setModeFromTitle(event) {
        ExpertiseMode.set(event.detail);
        tableNumber = '';
    }

    function pressKey(key) {
        if (key === 'C') {
            clearTable();
            return;
        }
        if (key === '←') {
            backspace();
            return;
        }
        if (tableNumber.length < 3) {
            tableNumber += key;
        }
    }

    function backspace() {
        tableNumber = tableNumber.slice(0, -1);
    }

    function clearTable() {
        tableNumber = '';
    }

    $: displayTable = tableNumber.padStart(3, '0');
        $: {
        if ($ExpertiseMode === 'expertMode') {
            mode.set('expert');
        } else if ($ExpertiseMode === 'noviceMode') {
            mode.set('novice');
        }
    }

</script>

<main class="app" class:expert-mode={$mode === 'expert'} class:novice-mode={$mode === 'novice'} class:has-expert-rights={$ExpertiseMode === 'expertMode'}>
  <Title text="Sélectionner une table" ExpertiseMode={$ExpertiseMode} on:change={setModeFromTitle} />
  
  <section class="selection-content">
    {#if $mode === 'expert'}
      <div class="expert-container">
        <div class="table-display">
          <span>Table n° {displayTable}</span>
        </div>

        <Keypad {pressKey} />

        <button type="submit" class="confirm-button" disabled={tableNumber.length === 0}
            on:click={() => goto(`/manageTable/${tableNumber}`)}
        >
          Confirmer
        </button>
      </div>

    {:else}
      <div class="novice-first-step">
        <RoomSelector />
      </div>
    {/if}
  </section>

  <button class="bottom-toggle" on:click={toggleMode}>
    {#if $mode === 'expert'}
      Carte de la salle
    {:else}
      Sélection par numéro
    {/if}
  </button>
</main>