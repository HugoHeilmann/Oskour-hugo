<script>
    import { goto } from '$app/navigation';
    import "./PaymentButton.css";
    import mockCommands from "../../data/mockCommand.json";

    export let commandId = 1; // ID de la commande
    export let tableNumber = null; // Numéro de table alternatif
    
    // Trouve la commande par ID ou par numéro de table
    $: targetCommand = commandId 
        ? mockCommands.find(cmd => cmd.commandId === commandId)
        : tableNumber 
        ? mockCommands.find(cmd => cmd.tableNumber === tableNumber)
        : null;
    
    // Utilise l'ID de la commande trouvée ou le commandId fourni
    $: finalCommandId = targetCommand ? targetCommand.commandId : commandId || 1;
    
    function handlePayment() {
        goto(`/paiement/${finalCommandId}`);
    }
</script>

<button class="payment-button" on:click={handlePayment}>
    <span class="payment-icon">💳</span>
    <span class="payment-text">Procéder au paiement</span>
</button>