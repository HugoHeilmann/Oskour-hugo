<script lang="ts">
    import "./Title.css"
    import { page } from '$app/stores';
    import { createEventDispatcher } from 'svelte';
    
    export let text = "Au secours Hugo";
    export let ExpertiseMode: 'noviceMode' | 'expertMode' = 'noviceMode';

    import ModeToggle from '../ModeToggle/ModeToggle.svelte';
    import ReturnButton from "../ReturnButton/ReturnButton.svelte"; 

    const dispatch = createEventDispatcher();

    function handleModeChange(event: CustomEvent<'noviceMode' | 'expertMode'>) {
        ExpertiseMode = event.detail;
        dispatch('change', ExpertiseMode);
        console.log("Nouveau mode :", ExpertiseMode);
    }

    $: void $page.url;
</script>

<div class="title">
    <ReturnButton href="/"/>
    <p>{text}</p>
    <ModeToggle {ExpertiseMode} on:change={handleModeChange} />
</div>