let prodotti = [];
let carrello = [];
let linguaCorrente = 'it';

async function avviaNegozio() {
    prodotti = await fetchCSV(CONFIG.links.catalogo);
    if (prodotti.length > 0) {
        mostraProdotti();
    } else {
        document.getElementById('shop-grid').innerHTML = "Errore: Controlla la pubblicazione del foglio Google.";
    }
}

function mostraProdotti() {
    const grid = document.getElementById('shop-grid');
    grid.innerHTML = prodotti.map(p => {
        const nome = linguaCorrente === 'it' ? p.Nome : p[`Nome_${linguaCorrente.toUpperCase()}`] || p.Nome;
        const desc = linguaCorrente === 'it' ? p.Descrizione : p[`Desc_${linguaCorrente.toUpperCase()}`] || p.Descrizione;
        const txtAggiungi = { it: "Aggiungi", en: "Add", de: "Hinzufügen" }[linguaCorrente];
        
        return `
            <div class="card">
                <img src="${p.Immagine}" alt="${nome}">
                <div class="card-info">
                    <h3>${nome}</h3>
                    <p>${desc}</p>
                    <div class="card-price">€ ${p.Prezzo} <small>/ ${p.Unità || 'cad.'}</small></div>
                    <div style="display:flex; gap:5px; margin-top:10px;">
                        <input type="number" id="qty-${p.ID}" value="1" min="1" style="width:50px; padding:5px; border:1px solid #ddd;">
                        <button class="btn-primary" onclick="aggiungi('${p.ID}')">${txtAggiungi}</button>
                    </div>
                </div>
            </div>`;
    }).join('');
}

// Funzione cambio lingua (deve essere chiamata correttamente dal selettore)
function setLang(nuovaLingua) {
    linguaCorrente = nuovaLingua;
    mostraProdotti();
}

function aggiungi(id) {
    const p = prodotti.find(item => item.ID == id);
    const qtyInput = document.getElementById(`qty-${id}`);
    const qta = parseInt(qtyInput.value);

    // Controlla se il prodotto è già nel carrello
    const esistente = carrello.find(c => c.ID == id);
    if (esistente) {
        esistente.quantita += qta;
    } else {
        carrello.push({ ...p, quantita: qta });
    }

    aggiornaInterfacciaCarrello();
    document.getElementById('cart-panel').classList.add('active');
}

function aggiornaInterfacciaCarrello() {
    const lista = document.getElementById('cart-items-list');
    document.getElementById('cart-count').innerText = carrello.reduce((a, b) => a + b.quantita, 0);
    
    let totale = 0;
    lista.innerHTML = carrello.map((item, index) => {
        const rigaPrezzo = parseFloat(item.Prezzo.replace(',', '.'));
        const subTotale = rigaPrezzo * item.quantita;
        totale += subTotale;
        
        return `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:5px;">
                <div style="font-size:0.85rem;">
                    <strong>${item.Nome}</strong><br>
                    ${item.quantita} x €${item.Prezzo}
                </div>
                <div style="text-align:right;">
                    <div style="font-weight:bold;">€${subTotale.toFixed(2)}</div>
                    <button onclick="rimuovi(${index})" style="background:none; border:none; color:red; cursor:pointer; font-size:0.8rem;">Rimuovi</button>
                </div>
            </div>`;
    }).join('');
    
    document.getElementById('cart-total-value').innerText = `€ ${totale.toFixed(2)}`;
}

function rimuovi(idx) {
    carrello.splice(idx, 1);
    aggiornaInterfacciaCarrello();
}

// Integrazione finale con salvataggio Ordini e Clienti
async function processaOrdineCompleto() {
    const nome = document.getElementById('c-name').value;
    const email = document.getElementById('c-email').value;
    const addr = document.getElementById('c-address').value;
    const tel = document.getElementById('c-phone').value;

    if (!nome || !email || !addr) return alert("Compila i campi obbligatori");

    const totale = carrello.reduce((a, b) => a + (parseFloat(b.Prezzo.replace(',', '.')) * b.quantita), 0).toFixed(2);
    const orderID = "GIZZI-" + Date.now().toString().slice(-6);

    const dati = {
        action: "newOrder",
        orderID: orderID,
        customerName: nome,
        customerEmail: email,
        customerPhone: tel,
        customerAddress: addr,
        total: totale,
        items: carrello.map(c => `${c.quantita}x ${c.Nome}`).join(", ")
    };

    // Salva nei Fogli Google
    fetch(CONFIG.links.script_exec, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(dati)
    });

    // Messaggio WhatsApp riepilogativo
    const waMsg = `*NUOVO ORDINE ${orderID}*\n---\n*Cliente:* ${nome}\n*Totale:* €${totale}\n*Prodotti:* ${dati.items}`;
    window.open(`https://wa.me/${CONFIG.contatti.wa}?text=${encodeURIComponent(waMsg)}`);
}

avviaNegozio();
