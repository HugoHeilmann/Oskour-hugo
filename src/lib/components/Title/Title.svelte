<script lang="ts">
    import "./Title.css"
    import { page } from '$app/stores';
    import { createEventDispatcher } from 'svelte';
    
    export let text = "Au secours Hugo";
    export let mode: 'novice' | 'expert' = 'novice'; 

    import ModeToggle from '../ModeToggle/ModeToggle.svelte';
    import ReturnButton from "../ReturnButton/ReturnButton.svelte"; 

    const dispatch = createEventDispatcher();

    function handleModeChange(event: CustomEvent<'novice' | 'expert'>) {
        mode = event.detail;
        dispatch('change', mode);
        console.log("Nouveau mode :", mode);
    }

    $: void $page.url;
</script>

<div class="title">
    <ReturnButton href="/"/>
    <p>{text}</p>
    <ModeToggle {mode} on:change={handleModeChange} />
</div>