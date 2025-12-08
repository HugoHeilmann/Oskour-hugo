<script>
    import './+page.css';
    import { goto } from '$app/navigation';

    import Title from '$lib/components/Title/Title.svelte';
    import Keypad from '$lib/components/Keypad/Keypad.svelte';
    import RoomSelector from '$lib/components/RoomSelector/RoomSelector.svelte';

    import { mode } from '$lib/stores/appState.js';

    let tableNumber = '';

    
    /**
     * Toggle between expert mode (numeric keypad) and novice mode (table map).
     */
    function toggleMode() {
        mode.set($mode === 'expert' ? 'novice' : 'expert');
        tableNumber = '';
    }

    /**
     * Handle a key press from the numeric keypad.
	 * @param {string} key - The key that was pressed on the keypad.
	 */
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
            tableNumber += key
        }
    }

    /**
     * Remove the last character from the current table number.
     */
    function backspace() {
        tableNumber = tableNumber.slice(0, -1);
    }

    /**
     * Clear the current table number.
     */
    function clearTable() {
        tableNumber = '';
    }

    // TODO GERER LE CHANGEMENT DE PAGE AVEC LE NUMERO DE TABLE
    // LORSQUE LE BOUTON CONFIRMER EST CLIQUE

    $: displayTable = tableNumber.padStart(3, '0');
</script>

<main class="app">
  <Title/>

  <section class="content">
    {#if $mode === 'expert'}
      <!-- MODE EXPERT : Clavier numérique -->
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
      <!-- MODE NOVICE : demande de la salle puis map pour choisir la table -->
      <div class="novice-first-step">
        <RoomSelector />
      </div>
    {/if}
  </section>

  <!-- Bouton toggle qui sert à switcher de mode -->
  <button class="bottom-toggle" on:click={toggleMode}>
    {#if $mode === 'expert'}
      Carte de la salle
    {:else}
      Sélection par numéro
    {/if}
  </button>
</main>
