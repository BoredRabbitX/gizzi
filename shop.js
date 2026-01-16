let prodotti = [];
let carrello = [];
let linguaCorrente = 'it';

async function avviaNegozio() {
    prodotti = await fetchCSV(CONFIG.links.catalogo);
    if (prodotti.length > 0) {
        mostraProdotti();
    } else {
        document.getElementById('shop-grid').innerHTML = "Impossibile caricare i prodotti. Controlla il foglio Google.";
    }
}

function mostraProdotti() {
    const grid = document.getElementById('shop-grid');
    grid.innerHTML = prodotti.map(p => {
        const nome = linguaCorrente === 'it' ? p.Nome : p[`Nome_${linguaCorrente.toUpperCase()}`] || p.Nome;
        const desc = linguaCorrente === 'it' ? p.Descrizione : p[`Desc_${linguaCorrente.toUpperCase()}`] || p.Descrizione;
        
        return `
            <div class="card">
                <img src="${p.Immagine}" alt="${nome}">
                <div class="card-info">
                    <h3>${nome}</h3>
                    <p>${desc}</p>
                    <div class="card-price">€ ${p.Prezzo}</div>
                    <button class="btn-primary" onclick="aggiungi(${p.ID})">Aggiungi</button>
                </div>
            </div>`;
    }).join('');
}

async function processaOrdineCompleto() {
    const datiOrdine = {
        action: "newOrder",
        orderID: "GIZZI-" + Date.now().toString().slice(-6),
        customerName: document.getElementById('c-name').value,
        customerEmail: document.getElementById('c-email').value,
        customerAddress: document.getElementById('c-address').value,
        customerPhone: document.getElementById('c-phone').value,
        total: calcolaTotale(),
        items: carrello.map(i => i.Nome).join(", ")
    };

    // Invia al tuo script per popolare i fogli Ordini e Clienti
    fetch(CONFIG.links.script_exec, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(datiOrdine)
    });

    // Invia WhatsApp
    const msg = `Nuovo Ordine ${datiOrdine.orderID}\nTotale: €${datiOrdine.total}\nCliente: ${datiOrdine.customerName}`;
    window.open(`https://wa.me/${CONFIG.contatti.wa}?text=${encodeURIComponent(msg)}`);
}

function aggiungi(id) {
    const p = prodotti.find(item => item.ID == id);
    carrello.push(p);
    aggiornaInterfacciaCarrello();
}

function calcolaTotale() {
    return carrello.reduce((a, b) => a + parseFloat(b.Prezzo.replace(',', '.')), 0).toFixed(2);
}

function aggiornaInterfacciaCarrello() {
    document.getElementById('cart-count').innerText = carrello.length;
    document.getElementById('cart-total-value').innerText = "€ " + calcolaTotale();
}

function cambiaLingua(nuovaLingua) {
    linguaCorrente = nuovaLingua;
    mostraProdotti();
}

avviaNegozio();
