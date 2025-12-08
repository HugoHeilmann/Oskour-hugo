<script>
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<style>
:root {
        --bg-main: rgb(22, 27, 34);
        --bg-card: rgb(33, 40, 48);
        
        --accent-gold: rgb(197, 160, 101);
        --accent-gold-dim: rgba(197, 160, 101, 0.2);
        
        --text-main: rgb(240, 240, 240);
        --text-muted: rgb(160, 170, 180);
    }

    :global(html, body) {
        background-color: var(--bg-main);
        color: var(--text-main);
    }
</style>