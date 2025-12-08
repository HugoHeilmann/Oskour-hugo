<script>
    import "./Keypad.css"

    export let pressKey;

    const keypadKeys = [
        '1', '2', '3',
        '4', '5', '6',
        '7', '8', '9',
        'C', '0', '←'
    ];
</script>

<div class="keypad">
    {#each keypadKeys as key}
    <button class="key" on:click={() => 
        pressKey(key)
    }>
        {key}
    </button>
    {/each}
</div>