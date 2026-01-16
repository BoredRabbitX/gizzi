// Funzione per generare un ID Ordine unico
function generaID() {
    return "GIZZI-" + Math.random().toString(36).substr(2, 6).toUpperCase();
}

async function processaAzioneOrdine(metodo) {
    // 1. Recupero dati dai campi input
    const orderID = generaID();
    const nome = document.getElementById('cust-name').value;
    const email = document.getElementById('cust-email').value;
    const phone = document.getElementById('cust-phone').value;
    const address = document.getElementById('cust-address').value;
    const city = document.getElementById('cust-city').value;
    const cap = document.getElementById('cust-cap').value;
    const country = document.getElementById('cust-country').value;

    // Controllo validità
    if (!nome || !address || !phone) {
        alert("Per favore, inserisci Nome, Indirizzo e Telefono per la consegna.");
        return;
    }

    const totale = cart.reduce((a, b) => a + (parseFloat(b.Prezzo.replace(',', '.')) * b.qty), 0).toFixed(2);
    const listaProdotti = cart.map(c => `${c.qty}x ${c.Nome}`).join(", ");
    const indirizzoCompleto = `${address}, ${cap} ${city} (${country})`;

    // 2. Costruzione Dati per Google Sheets
    const payload = {
        action: "newOrder",
        orderID: orderID,
        customerName: nome,
        customerEmail: email,
        customerPhone: phone,
        customerAddress: indirizzoCompleto,
        items: listaProdotti,
        total: totale,
        date: new Date().toLocaleString()
    };

    // 3. INVIO AL FOGLIO GOOGLE (Fondamentale per caricare i dati)
    try {
        await fetch(CONFIG.links.script_exec, {
            method: 'POST',
            mode: 'no-cors', // Necessario per Google Apps Script
            cache: 'no-cache',
            body: JSON.stringify(payload)
        });
        console.log("Dati inviati al foglio con successo");
    } catch (error) {
        console.error("Errore invio foglio:", error);
    }

    // 4. AZIONE IN BASE AL PULSANTE PREMUTO
    if (metodo === 'WhatsApp') {
        const waMsg = `*NUOVO ORDINE ${orderID}*\n\n` +
                      `*CLIENTE:* ${nome}\n` +
                      `*TEL:* ${phone}\n` +
                      `*INDIRIZZO:* ${indirizzoCompleto}\n\n` +
                      `*PRODOTTI:* ${listaProdotti}\n\n` +
                      `*TOTALE:* € ${totale}\n\n` +
                      `_Si prega di confermare la ricezione._`;
        
        window.open(`https://wa.me/${CONFIG.contatti.wa}?text=${encodeURIComponent(waMsg)}`);
    } 
    
    if (metodo === 'Paypal') {
        // Apre il pagamento con l'ID ordine come riferimento
        const paypalURL = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${CONFIG.contatti.email_admin}&item_name=Ordine_${orderID}&amount=${totale}&currency_code=EUR`;
        window.open(paypalURL);
    }
}
