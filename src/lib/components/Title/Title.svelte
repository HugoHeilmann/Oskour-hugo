<script lang="ts">
    import "./Title.css"
    import { page } from '$app/stores';
    import { createEventDispatcher, onMount } from 'svelte';
    
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

    let isBig = false;
    onMount(()=>{
      isBig = window.matchMedia('(min-width: 800px)').matches;
    })
</script>

<div class="title">
    <ReturnButton href="/"/>
    <p>{text}</p>
    {#if isBig}
        <div class="spacer"></div>
    {:else}
        <ModeToggle bind:ExpertiseMode on:change={handleModeChange}/>
    {/if}
</div>