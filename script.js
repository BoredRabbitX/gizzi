const CONFIG = {
    catalogo: "https://docs.google.com/spreadsheets/d/e/2PACX-1vR0aLcG9mPmNexSlEt-5MaNlpIPUF7LPvdlsJwDhoa_1PZfsvFbw9eQu4uBpsrqwTng9TrkqvxcoQRm/pub?gid=118341302&single=true&output=csv",
    recensioni: "https://docs.google.com/spreadsheets/d/e/2PACX-1vR0aLcG9mPmNexSlEt-5MaNlpIPUF7LPvdlsJwDhoa_1PZfsvFbw9eQu4uBpsrqwTng9TrkqvxcoQRm/pub?gid=534419137&single=true&output=csv",
    script_url: "https://script.google.com/macros/s/AKfycbxRRpm4b5KVsAGIrcZulzqgmAGuU3cG8r-5p1DoCdrM87w4kCLCeDsNZD1WSAq5TdrA/exec",
    wa: "393358060715"
};

let db = [], reviews = [], cart = [], lang = 'it';

async function init() {
    try {
        const res = await fetch(CONFIG.catalogo);
        const text = await res.text();
        db = parseCSV(text);
        
        try {
            const resR = await fetch(CONFIG.recensioni);
            const textR = await resR.text();
            reviews = parseCSV(textR);
        } catch(e) { console.warn("Recensioni non caricate"); }

        render();
    } catch (err) {
        document.getElementById('shop-grid').innerHTML = "Errore connessione Google Sheets.";
        console.error(err);
    }
}

function parseCSV(text) {
    const lines = text.split(/\r?\n/).filter(l => l.trim() !== "");
    const sep = lines[0].includes('\t') ? '\t' : ',';
    const headers = lines[0].split(sep).map(h => h.trim());

    return lines.slice(1).map(line => {
        const cols = line.split(sep);
        let obj = {};
        headers.forEach((h, i) => obj[h] = cols[i] ? cols[i].trim() : "");
        return obj;
    });
}

function setLang(l) {
    lang = l;
    render();
}

function render() {
    const grid = document.getElementById('shop-grid');
    if(db.length === 0) { grid.innerHTML = "Nessun prodotto trovato."; return; }

    grid.innerHTML = db.map(p => {
        const n = p[lang === 'it' ? 'Nome' : 'Nome_' + lang.toUpperCase()] || p.Nome;
        const d = p[lang === 'it' ? 'Descrizione' : 'Desc_' + lang.toUpperCase()] || p.Descrizione;
        
        return `
            <div class="card">
                <img src="${p.Immagine}" alt="${n}">
                <div class="card-info">
                    <h3 style="margin:0; font-family:'Fraunces'">${n}</h3>
                    <p style="font-size:0.8rem; color:#666; flex-grow:1;">${d}</p>
                    <div class="card-price">€ ${p.Prezzo}</div>
                    <button class="btn-primary" onclick="addToCart('${p.ID}')">Aggiungi</button>
                </div>
            </div>`;
    }).join('');
}

function toggleCart() { document.getElementById('cart-panel').classList.toggle('active'); }
function openCheckout() { document.getElementById('checkout-modal').style.display = 'flex'; }
function closeCheckout() { document.getElementById('checkout-modal').style.display = 'none'; }

function addToCart(id) {
    const item = db.find(p => p.ID === id);
    if(item) {
        cart.push(item);
        updateUI();
        document.getElementById('cart-panel').classList.add('active');
    }
}

function updateUI() {
    document.getElementById('cart-count').innerText = cart.length;
    let tot = 0;
    document.getElementById('cart-items-list').innerHTML = cart.map((i, idx) => {
        tot += parseFloat(i.Prezzo.replace(',', '.'));
        return `<div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                    <span>${i.Nome}</span>
                    <span>€ ${i.Prezzo} <button onclick="remove(${idx})" style="border:none; background:none; cursor:pointer;">🗑️</button></span>
                </div>`;
    }).join('');
    document.getElementById('cart-total-value').innerText = `€ ${tot.toFixed(2)}`;
}

function remove(idx) { cart.splice(idx, 1); updateUI(); }

async function processOrder(method) {
    const name = document.getElementById('c-name').value;
    const addr = document.getElementById('c-address').value;
    if(!name || !addr) return alert("Inserisci Nome e Indirizzo");

    const orderID = "GIZZI-" + Date.now().toString().slice(-6);
    const total = cart.reduce((a, b) => a + parseFloat(b.Prezzo.replace(',', '.')), 0).toFixed(2);

    const payload = {
        action: "newOrder",
        orderID: orderID,
        customerName: name,
        customerAddress: addr,
        total: total,
        items: cart.map(i => i.Nome).join(", ")
    };

    // Invio dati al foglio Google
    fetch(CONFIG.script_url, { method: 'POST', mode: 'no-cors', body: JSON.stringify(payload) });

    // Messaggio WhatsApp
    let msg = `Ordine: ${orderID}\nTotale: €${total}\nCliente: ${name}\nProdotti: ${payload.items}`;
    window.open(`https://wa.me/${CONFIG.wa}?text=${encodeURIComponent(msg)}`);
}

init();
