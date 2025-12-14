<script>
    import { goto } from '$app/navigation';
    import './ReturnButton.css';
    export let href = '/';
    function handleClick() {
        goto(href);
    }
</script>

<button class="return-button" on:click={handleClick}>
    ← Return
</button>