<script>
    import './ToggleButton.css';

    import { createEventDispatcher } from 'svelte';

    export let value = 'commander'; // 'commander' | 'payer'
    const dispatch = createEventDispatcher();

    /**
     * Set the toggle button value and dispatch a change event.
     * @param v {'commander' | 'payer'}
     */
    function setValue(v) {
        value = v;
        dispatch('change', { value });
    }
</script>

<div class="toggle-container">
	<button
		class:selected={value === 'commander'}
		on:click={() => setValue('commander')}
	>
		Commander
	</button>

	<button
		class:selected={value === 'payer'}
		on:click={() => setValue('payer')}
	>
		Payer
	</button>
</div>