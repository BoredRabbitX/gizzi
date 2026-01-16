let prodotti = [];
let carrello = [];
let lingua = 'it';

async function avviaNegozio() {
    prodotti = await fetchCSV(CONFIG.links.catalogo);
    mostraProdotti();
}

function mostraProdotti() {
    const grid = document.getElementById('shop-grid');
    grid.innerHTML = prodotti.map(p => {
        const nome = lingua === 'it' ? p.Nome : (p[`Nome_${lingua.toUpperCase()}`] || p.Nome);
        const desc = lingua === 'it' ? p.Descrizione : (p[`Desc_${lingua.toUpperCase()}`] || p.Descrizione);
        
        return `
            <div class="card">
                <img src="${p.Immagine}" alt="${nome}">
                <div class="card-body">
                    <h3>${nome}</h3>
                    <p style="font-size:0.85rem; color:#666; height:60px; overflow:hidden;">${desc}</p>
                    <div style="font-size:1.3rem; font-weight:700; color:var(--gizzi-green); margin:15px 0;">€ ${p.Prezzo}</div>
                    <div style="display:flex; gap:10px;">
                        <input type="number" id="qty-${p.ID}" value="1" min="1" style="width:60px; padding:8px;">
                        <button class="btn-buy" onclick="aggiungiCarrello('${p.ID}')">AGGIUNGI</button>
                    </div>
                </div>
            </div>`;
    }).join('');
}

function apriCarrello() { document.getElementById('cart-panel').classList.add('active'); }
function chiudiCarrello() { document.getElementById('cart-panel').classList.remove('active'); }
function mostraCheckout() { document.getElementById('checkout-modal').style.display = 'flex'; }
function chiudiCheckout() { document.getElementById('checkout-modal').style.display = 'none'; }

function aggiungiCarrello(id) {
    const p = prodotti.find(item => item.ID == id);
    const qty = parseInt(document.getElementById(`qty-${id}`).value);
    
    const esistente = carrello.find(c => c.ID == id);
    if(esistente) esistente.qty += qty;
    else carrello.push({...p, qty: qty});
    
    aggiornaUI();
    apriCarrello(); // Apre il carrello automaticamente quando aggiungi
}

function aggiornaUI() {
    const list = document.getElementById('cart-items');
    let totale = 0;
    document.getElementById('cart-count').innerText = carrello.reduce((a,b) => a + b.qty, 0);
    
    list.innerHTML = carrello.map((item, idx) => {
        const sub = parseFloat(item.Prezzo.replace(',','.')) * item.qty;
        totale += sub;
        return `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:10px;">
                <div><strong>${item.Nome}</strong><br><small>${item.qty} x €${item.Prezzo}</small></div>
                <div style="text-align:right;">
                    <div>€${sub.toFixed(2)}</div>
                    <button onclick="rimuovi(${idx})" style="border:none; color:red; background:none; cursor:pointer; font-size:0.8rem;">Rimuovi</button>
                </div>
            </div>`;
    }).join('');
    
    document.getElementById('cart-total').querySelector('span').innerText = `€ ${totale.toFixed(2)}`;
}

function rimuovi(idx) {
    carrello.splice(idx, 1);
    aggiornaUI();
}

function cambiaLingua(l) {
    lingua = l;
    mostraProdotti();
}

async function inviaOrdine() {
    const nome = document.getElementById('cust-name').value;
    const addr = document.getElementById('cust-address').value;
    if(!nome || !addr) return alert("Inserisci nome e indirizzo!");

    const totale = carrello.reduce((a,b) => a + (parseFloat(b.Prezzo.replace(',','.')) * b.qty), 0).toFixed(2);
    const orderID = "GIZZI-" + Math.floor(Math.random() * 100000);

    const payload = {
        action: "newOrder",
        orderID: orderID,
        customerName: nome,
        customerEmail: document.getElementById('cust-email').value,
        customerPhone: document.getElementById('cust-phone').value,
        customerAddress: addr,
        total: totale,
        items: carrello.map(c => `${c.qty}x ${c.Nome}`).join(", ")
    };

    // Invio al foglio Google (Ordini e Clienti)
    fetch(CONFIG.links.script_exec, { method: 'POST', mode: 'no-cors', body: JSON.stringify(payload) });

    // Messaggio WhatsApp
    const msg = `Nuovo Ordine ${orderID}\nTotale: €${totale}\nCliente: ${nome}\nProdotti: ${payload.items}`;
    window.open(`https://wa.me/${CONFIG.contatti.wa}?text=${encodeURIComponent(msg)}`);
}

avviaNegozio();
