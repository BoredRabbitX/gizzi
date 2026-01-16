const CONFIG = {
    catalogo: "https://docs.google.com/spreadsheets/d/e/2PACX-1vR0aLcG9mPmNexSlEt-5MaNlpIPUF7LPvdlsJwDhoa_1PZfsvFbw9eQu4uBpsrqwTng9TrkqvxcoQRm/pub?gid=118341302&single=true&output=csv",
    recensioni: "https://docs.google.com/spreadsheets/d/e/2PACX-1vR0aLcG9mPmNexSlEt-5MaNlpIPUF7LPvdlsJwDhoa_1PZfsvFbw9eQu4uBpsrqwTng9TrkqvxcoQRm/pub?gid=534419137&single=true&output=csv",
    ordini: "https://docs.google.com/spreadsheets/d/e/2PACX-1vR0aLcG9mPmNexSlEt-5MaNlpIPUF7LPvdlsJwDhoa_1PZfsvFbw9eQu4uBpsrqwTng9TrkqvxcoQRm/pub?gid=1618872676&single=true&output=csv",
    clienti: "https://docs.google.com/spreadsheets/d/e/2PACX-1vR0aLcG9mPmNexSlEt-5MaNlpIPUF7LPvdlsJwDhoa_1PZfsvFbw9eQu4uBpsrqwTng9TrkqvxcoQRm/pub?gid=1159642077&single=true&output=csv",
    script_url: "https://script.google.com/macros/s/AKfycbxRRpm4b5KVsAGIrcZulzqgmAGuU3cG8r-5p1DoCdrM87w4kCLCeDsNZD1WSAq5TdrA/exec",
    wa_number: "393358060715",
    admin_email: "torre.michele@gmail.com"
};

// Logica per salvare l'ordine e il cliente contemporaneamente
async function finalizeCheckout(orderData) {
    try {
        const response = await fetch(CONFIG.script_url, {
            method: 'POST',
            mode: 'no-cors', // Importante per gli script Google
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        
        console.log("Dati inviati ai fogli Ordini e Clienti");
        return true;
    } catch (error) {
        console.error("Errore nell'invio ai fogli:", error);
        return false;
    }
}
