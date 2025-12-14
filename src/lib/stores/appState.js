import { writable } from 'svelte/store';
import mockCommands from '../data/mockCommand.json';

export const ExpertiseMode = writable("noviceMode");
export const mode = writable("novice");
export const toggleMode = writable("commander"); 
export const commands = writable(mockCommands);
