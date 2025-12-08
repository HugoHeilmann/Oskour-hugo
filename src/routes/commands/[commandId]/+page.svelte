<script>
    import './+page.css';
    import CommandRecap from '$lib/components/CommandRecap/CommandRecap.svelte';
    import { page } from '$app/stores';

    $: commandId = Number($page.params.commandId) || 0;

</script>

<main class="app">
    <h1>Command Recap Page</h1>
    <p>Commande #{commandId}</p>
    <CommandRecap commandId={commandId} />
</main>