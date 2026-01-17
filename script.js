const CONFIG = {
    catalog: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRIumwZulbMAuesmG69DB8Y1bx2Y-NQXfyG7_m1-rdpZ-SoOxM0JyZtnj0_eV_K4t4drULTwV44nE5Y/pub?gid=0&single=true&output=csv",
    form: "https://docs.google.com/forms/d/e/1FAIpQLSend7KPNCjTNP1d-B3zd-wvhZAVXLS3P7341yN88fm3d7D4Jw/formResponse",
    wa: "393358060715"
};

const UI = {
    it: { h1: "L'Oro del Cilento, a casa tua.", p: "Eccellenza gastronomica dal cuore del Parco Nazionale.", add: "Aggiungi", total: "Totale", thanksH: "Grazie!", thanksP: "Ordine ricevuto." },
    en: { h1: "Cilento's Gold, at your doorstep.", p: "Gastronomic excellence from the heart of the National Park.", add: "Add", total: "Total", thanksH: "Thank you!", thanksP: "Order received." },
    de: { h1: "Cilento Gold, vor Ihrer Tür.", p: "Kulinarische Exzellenz aus dem Herzen del Nationalparks.", add: "Hinzufügen", total: "Gesamt", thanksH: "Vielen Dank!", thanksP: "Bestellung erhalten." }
};

let products = [], cart = [], lang = 'it';

async function init() {
    const res = await fetch(CONFIG.catalog);
    const text = await res.text();
    const rows = text.split('\n').filter(r => r.trim() !== "");
    const headers = rows[0].split(',').map(h => h.trim());
    products = rows.slice(1).map(row => {
        const cols = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        let o = {};
        headers.forEach((h, i) => o[h] = cols[i]?.replace(/"/g, '').trim());
        return o;
    });
    render();
}

function updateLang(val) {
    lang = val;
    document.getElementById('hero-h1').innerText = UI[lang].h1;
    document.getElementById('hero-p').innerText = UI[lang].p;
    render();
}

function render() {
    const nameKey = lang === 'it' ? 'Nome' : `Nome_${lang.toUpperCase()}`;
    const catKey = lang === 'it' ? 'Categoria' : `Categoria_${lang.toUpperCase()}`;

    // CAROUSEL DATA TEST
    const featured = products.filter(p => p.Evidenza === 'SI');
    document.getElementById('carousel-track').innerHTML = featured.map(p => `
        <div class="carousel-item">
            <img src="${p.Immagine}">
            <h4>${p[nameKey] || p.Nome}</h4>
            <p>€ ${p.Prezzo}</p>
            <button onclick="add('${p.ID}')">${UI[lang].add}</button>
        </div>`).join('');

    // SHOP DATA
    const cats = [...new Set(products.map(p => p[catKey] || p.Categoria))];
    document.getElementById('negozio').innerHTML = cats.map(c => `
        <div id="cat-${c.replace(/\s+/g, '')}" style="margin-top:60px;">
            <h2 style="font-family:Fraunces; border-bottom:2px solid var(--gizzi-gold); display:inline-block;">${c}</h2>
            <div class="grid">${products.filter(p => (p[catKey] || p.Categoria) === c).map(p => `
                <div class="card">
                    <img src="${p.Immagine}">
                    <div class="card-body">
                        <h3>${p[nameKey] || p.Nome}</h3>
                        <p>€ ${p.Prezzo}</p>
                        <button onclick="add('${p.ID}')">${UI[lang].add}</button>
                    </div>
                </div>`).join('')}</div>
        </div>`).join('');
    
    // Inizializza carousel dopo il render
    if(window.initCarousel) window.initCarousel();
}

function add(id) {
    const p = products.find(x => x.ID == id);
    const ex = cart.find(c => c.ID == id);
    if(ex) ex.qty++; else cart.push({...p, qty:1});
    updateCart();
    document.getElementById('cart-panel').classList.add('active');
}

function updateCart() {
    let tot = 0;
    document.getElementById('cart-count').innerText = cart.reduce((a,b) => a+b.qty, 0);
    document.getElementById('cart-items').innerHTML = cart.map((c,i) => {
        const s = (parseFloat(c.Prezzo.replace(',','.')) * c.qty).toFixed(2);
        tot += parseFloat(s);
        return `<div style="display:flex; justify-content:space-between; margin-bottom:10px; font-size:0.9rem;">
            <span>${c.qty}x ${c.Nome}</span>
            <span>€ ${s} <button onclick="cart.splice(${i},1); updateCart();" style="color:red; background:none; border:none;">✕</button></span>
        </div>`;
    }).join('');
    document.getElementById('cart-total').innerText = `Total: € ${tot.toFixed(2)}`;
}

function toggleCart() { document.getElementById('cart-panel').classList.toggle('active'); }
function openCheckout() { document.getElementById('modal-checkout').style.display = 'flex'; }
function closeCheckout() { document.getElementById('modal-checkout').style.display = 'none'; }

async function processOrder() {
    // Logica invio identica a prima....
    document.getElementById('thanks-popup').style.display = 'flex';
}

init();
