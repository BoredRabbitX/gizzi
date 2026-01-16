let db = [], reviews = [], cart = [], curLang = 'it';

const texts = {
    it: { h1: "Sapori Autentici", p: "Dal Cilento direttamente a casa tua.", cart: "Carrello", add: "Aggiungi", total: "Totale", buy: "Acquista" },
    en: { h1: "Authentic Flavors", p: "From Cilento directly to your home.", cart: "Cart", add: "Add to Cart", total: "Total", buy: "Buy Now" },
    de: { h1: "Echte Aromen", p: "Vom Cilento direkt zu Ihnen nach Hause.", cart: "Warenkorb", add: "In den Warenkorb", total: "Gesamt", buy: "Jetzt Kaufen" }
};

async function init() {
    db = await fetchCSV(CONFIG.links.catalogo);
    try { reviews = await fetchCSV(CONFIG.links.recensioni); } catch(e){}
    render();
}

function changeLang(l) {
    curLang = l;
    document.getElementById('hero-h1').innerText = texts[l].h1;
    document.getElementById('hero-p').innerText = texts[l].p;
    render();
}

function render() {
    const grid = document.getElementById('shop-grid');
    grid.innerHTML = db.map(p => {
        const name = curLang === 'it' ? p.Nome : p[`Nome_${curLang.toUpperCase()}`] || p.Nome;
        const desc = curLang === 'it' ? p.Descrizione : p[`Desc_${curLang.toUpperCase()}`] || p.Descrizione;
        const prodReviews = reviews.filter(r => r.ID_Prodotto == p.ID);

        return `
            <div class="card">
                <img src="${p.Immagine}" alt="${name}">
                <div class="card-content">
                    <h3>${name}</h3>
                    <p style="font-size:0.9rem; color:#555; height:50px; overflow:hidden;">${desc}</p>
                    <div style="font-weight:700; font-size:1.4rem; color:var(--gizzi-green); margin:15px 0;">€ ${p.Prezzo}</div>
                    <div style="display:flex; gap:10px;">
                        <input type="number" id="q-${p.ID}" value="1" min="1" style="width:60px; border-radius:5px; border:1px solid #ddd; padding:5px;">
                        <button class="btn-add" onclick="addToCart('${p.ID}')">${texts[curLang].add}</button>
                    </div>
                    <div style="margin-top:15px; font-size:0.8rem; background:#f9f9f9; padding:10px; border-radius:5px;">
                        ${prodReviews.map(r => `<div><strong>${r.Cliente}</strong>: ${r.Commento} ${r.Risposta_Gizi ? `<br><em style="color:green">Gizzi: ${r.Risposta_Gizi}</em>` : ''}</div>`).join('')}
                    </div>
                </div>
            </div>`;
    }).join('');
}

function toggleCart() {
    document.getElementById('cart-panel').classList.toggle('active');
}

function addToCart(id) {
    const p = db.find(i => i.ID == id);
    const qty = parseInt(document.getElementById(`q-${id}`).value);
    const exists = cart.find(c => c.ID == id);
    if(exists) exists.qty += qty;
    else cart.push({...p, qty: qty});
    
    updateCartUI();
    document.getElementById('cart-panel').classList.add('active'); // Apre SEMPRE il carrello
}

function updateCartUI() {
    const list = document.getElementById('cart-items');
    let total = 0;
    document.getElementById('cart-count').innerText = cart.reduce((a,b) => a + b.qty, 0);
    
    list.innerHTML = cart.map((c, i) => {
        const sub = parseFloat(c.Prezzo.replace(',','.')) * c.qty;
        total += sub;
        return `<div style="display:flex; justify-content:space-between; margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:10px;">
                    <div><strong>${c.Nome}</strong><br>${c.qty} x €${c.Prezzo}</div>
                    <div style="text-align:right;">€${sub.toFixed(2)} <br> <button onclick="remove(${i})" style="color:red; background:none; border:none; cursor:pointer;">&times;</button></div>
                </div>`;
    }).join('');
    document.getElementById('total-price').querySelector('span').innerText = `€ ${total.toFixed(2)}`;
}

function remove(i) { cart.splice(i,1); updateCartUI(); }
function openCheckout() { document.getElementById('checkout-modal').style.display = 'flex'; }

async function sendOrder() {
    const n = document.getElementById('name').value;
    const a = document.getElementById('address').value;
    const t = document.getElementById('total-price').innerText;
    if(!n || !a) return alert("Inserisci i dati!");

    const payload = {
        action: "newOrder",
        customerName: n,
        address: a,
        phone: document.getElementById('phone').value,
        items: cart.map(c => `${c.qty}x ${c.Nome}`).join(", "),
        total: t
    };

    // Salvataggio nei fogli (Ordini e Clienti) tramite il tuo script_url
    fetch(CONFIG.links.script_exec, { method: 'POST', mode: 'no-cors', body: JSON.stringify(payload) });

    // WhatsApp
    window.open(`https://wa.me/${CONFIG.contatti.wa}?text=${encodeURIComponent("Nuovo Ordine Gruppo Gizzi:\n" + payload.items + "\n" + t)}`);
}

init();
