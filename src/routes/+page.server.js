import { redirect } from '@sveltejs/kit';
    
// Code HTTP 302 : Ressource deplacee de maniere permanente
export function load() {
    throw redirect(302, '/selectTable');
}