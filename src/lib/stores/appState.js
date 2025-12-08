import { writable } from 'svelte/store';

export const mode = writable("expert"); 
// valeurs possibles : "expert" ou "novice"