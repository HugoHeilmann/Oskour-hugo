<script>
    import PaymentHeader from "../PaymentHeader/PaymentHeader.svelte";
import "./MobilePayment.css";
    
    export let amount = 0;
    export let onBack = () => {};
    export let onSuccess = () => {};
    
    let selectedMethod = '';
    let isProcessing = false;
    let showQRCode = false;
    
    const mobileMethods = [
        { id: 'apple', name: 'Apple Pay', icon: '🍎' },
        { id: 'google', name: 'Google Pay', icon: '🔵' },
        { id: 'samsung', name: 'Samsung Pay', icon: '📱' }
    ];
    
    function selectMethod(methodId) {
        selectedMethod = methodId;
        showQRCode = true;
    }
    
    async function processPayment() {
        isProcessing = true;
        
        // Simulation du traitement
        setTimeout(() => {
            isProcessing = false;
            if (onSuccess) {
                onSuccess();
            }
        }, 3000);
    }
    
    function resetSelection() {
        selectedMethod = '';
        showQRCode = false;
        isProcessing = false;
    }
</script>

<div class="mobile-payment">
    <PaymentHeader {onBack} method={"Paiement mobile"} {amount}  />
    
    {#if !selectedMethod}
        <div class="method-selection">
            <h3>Choisissez votre application</h3>
            <div class="mobile-methods">
                {#each mobileMethods as method}
                    <button 
                        class="method-option"
                        on:click={() => selectMethod(method.id)}
                    >
                        <span class="method-icon">{method.icon}</span>
                        <span class="method-name">{method.name}</span>
                    </button>
                {/each}
            </div>
        </div>
    {:else}
        <div class="payment-process">
            <button class="reset-button" on:click={resetSelection}>
                ← Changer de méthode
            </button>
            
            <div class="selected-method">
                <div class="method-display">
                    <span class="selected-icon">
                        {mobileMethods.find(m => m.id === selectedMethod)?.icon}
                    </span>
                    <span class="selected-name">
                        {mobileMethods.find(m => m.id === selectedMethod)?.name}
                    </span>
                </div>
            </div>
            
            {#if showQRCode && !isProcessing}
                <div class="qr-section">
                    <div class="qr-code">
                        <div class="qr-placeholder">
                            <div class="qr-pattern"></div>
                            <div class="qr-center">QR</div>
                        </div>
                    </div>
                    <p class="qr-instruction">
                        Scannez ce QR code avec votre application ou approchez votre téléphone
                    </p>
                    
                    <button class="simulate-button" on:click={processPayment}>
                        Simuler le paiement
                    </button>
                </div>
            {/if}
            
            {#if isProcessing}
                <div class="processing-section">
                    <div class="processing-animation">
                        <div class="pulse"></div>
                        <span class="processing-icon">📱</span>
                    </div>
                    <h3>Traitement en cours...</h3>
                    <p>Veuillez patienter pendant le traitement du paiement</p>
                </div>
            {/if}
        </div>
    {/if}
</div>