let db = [], cart = [], lang = 'it';

const ui = {
    it: { title: "Cilento, Pura Terra.", sub: "Consegna in 48 ore in tutta Europa.", add: "Aggiungi", pay: "Paga Ora" },
    en: { title: "Cilento, Pure Land.", sub: "Fast delivery across Europe.", add: "Add to Cart", pay: "Pay Now" },
    de: { title: "Cilento, Reines Land.", sub: "Schnelle Lieferung in ganz Europa.", add: "In den Warenkorb", pay: "Jetzt Zahlen" }
};

async function init() {
    db = await fetchCSV(CONFIG.links.catalogo);
    render();
}

function setLang(l) {
    lang = l;
    document.getElementById('hero-title').innerText = ui[lang].title;
    document.getElementById('hero-sub').innerText = ui[lang].sub;
    render();
}

function render() {
    const grid = document.getElementById('shop-grid');
    grid.innerHTML = db.map(p => {
        const nome = lang === 'it' ? p.Nome : p[`Nome_${lang.toUpperCase()}`] || p.Nome;
        return `
            <div class="card">
                <img src="${p.Immagine}">
                <div class="card-content">
                    <small style="color:var(--gizzi-green); font-weight:600;">${p.Categoria}</small>
                    <h3>${nome}</h3>
                    <div style="font-size:1.5rem; font-weight:700; margin:15px 0;">€ ${p.Prezzo}</div>
                    <div style="display:flex; gap:10px;">
                        <input type="number" id="q-${p.ID}" value="1" min="1" style="width:60px; margin:0;">
                        <button class="btn-main" style="margin:0;" onclick="addToCart('${p.ID}')">${ui[lang].add}</button>
                    </div>
                </div>
            </div>`;
    }).join('');
}

function addToCart(id) {
    const p = db.find(i => i.ID == id);
    const q = parseInt(document.getElementById(`q-${id}`).value);
    cart.push({...p, qty: q});
    document.getElementById('cart-count').innerText = cart.length;
    openModal();
}

function openModal() { document.getElementById('checkout-modal').style.display = 'flex'; }
function closeModal() { document.getElementById('checkout-modal').style.display = 'none'; }

async function finalize(method) {
    const customer = {
        name: document.getElementById('cust-name').value,
        email: document.getElementById('cust-email').value,
        phone: document.getElementById('cust-phone').value,
        address: `${document.getElementById('cust-address').value}, ${document.getElementById('cust-city').value} (${document.getElementById('cust-cap').value}), ${document.getElementById('cust-country').value}`,
        items: cart.map(c => `${c.qty}x ${c.Nome}`).join(", "),
        total: cart.reduce((a,b) => a + (parseFloat(b.Prezzo.replace(',','.'))*b.qty), 0).toFixed(2)
    };

    if(!customer.name || !customer.address) return alert("Inserisci i dati di spedizione!");

    const orderID = "GIZZI-" + Date.now().toString().slice(-6);

    // 1. REGISTRA ORDINE E CLIENTE (Google Sheets)
    const payload = {
        action: "newOrder",
        orderID: orderID,
        ...customer
    };
    
    fetch(CONFIG.links.script_exec, { method: 'POST', mode: 'no-cors', body: JSON.stringify(payload) });

    // 2. AZIONE FINALE
    if(method === 'WhatsApp') {
        const msg = `*ORDINE ${orderID}*\n---\n*Cliente:* ${customer.name}\n*Indirizzo:* ${customer.address}\n*Prodotti:* ${customer.items}\n*TOTALE:* € ${customer.total}`;
        window.open(`https://wa.me/${CONFIG.contatti.wa}?text=${encodeURIComponent(msg)}`);
    } else {
        // Redirect a PayPal (Semplificato)
        window.open(`https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${CONFIG.contatti.email_admin}&item_name=Ordine_${orderID}&amount=${customer.total}&currency_code=EUR`);
    }
}

init();
