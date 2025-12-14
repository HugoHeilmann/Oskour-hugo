<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import './ModeToggle.css';

    type ToggleMode = 'noviceMode' | 'expertMode';
    export let ExpertiseMode: ToggleMode = 'noviceMode'; 
    const dispatch = createEventDispatcher();
    function setMode(selectedMode: ToggleMode) {
        if (ExpertiseMode !== selectedMode) {
        ExpertiseMode = selectedMode;
        dispatch('change', ExpertiseMode);
        }
    }

    function toggle() {
        setMode(ExpertiseMode === 'noviceMode' ? 'expertMode' : 'noviceMode');
    }
</script>

<div class="toggle-wrapper">
    <div 
        class="toggle-container" 
        class:expert-mode={ExpertiseMode === 'expertMode'}
        role="switch" 
        aria-checked={ExpertiseMode === 'expertMode'} 
        on:click={toggle}
        on:keydown={(e) => e.key === 'Enter' && toggle()}
        tabindex="0"
    >
        
        <div class="slider-bg"></div>

        <button 
        class="toggle-option" 
        class:active={ExpertiseMode === 'noviceMode'}
        on:click|stopPropagation={() => setMode('noviceMode')}
        >
        <span class="toggle-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 22s5-4 12-10c0 0 4-4 0-8s-8 0-8 0C6 4 2 12 2 22z"></path>
            <path d="M2 22c5-3 8-7 8-7"></path>
            </svg>
        </span>
        <span id="label-mode">Novice</span>
        </button>

        <button 
        class="toggle-option" 
        class:active={ExpertiseMode === 'expertMode'}
        on:click|stopPropagation={() => setMode('expertMode')}
        >
        <span id="label-mode">Expert</span>
        <span class="toggle-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
        </span>
        </button>
    </div>
</div>