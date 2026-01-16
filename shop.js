let prodotti = [];
let recensioni = [];
let carrello = [];
let lingua = 'it';

async function avviaNegozio() {
    // Carichiamo tutto in parallelo per velocità
    const [datiProd, datiRec] = await Promise.all([
        fetchCSV(CONFIG.links.catalogo),
        fetchCSV(CONFIG.links.recensioni)
    ]);
    
    prodotti = datiProd;
    recensioni = datiRec;
    render();
}

function render() {
    const grid = document.getElementById('shop-grid');
    grid.innerHTML = prodotti.map(p => {
        const nome = lingua === 'it' ? p.Nome : (p[`Nome_${lingua.toUpperCase()}`] || p.Nome);
        const desc = lingua === 'it' ? p.Descrizione : (p[`Desc_${lingua.toUpperCase()}`] || p.Descrizione);
        
        // Filtriamo le recensioni per questo prodotto
        const pRec = recensioni.filter(r => r.ID_Prodotto == p.ID);

        return `
            <div class="card">
                <img src="${p.Immagine}" alt="${nome}">
                <div class="card-content">
                    <small style="color:var(--accent); font-weight:600; text-transform:uppercase;">${p.Categoria}</small>
                    <h3>${nome}</h3>
                    <p class="card-desc">${desc}</p>
                    <div style="font-size:1.4rem; font-weight:700; color:var(--gizzi-green); margin-bottom:15px;">€ ${p.Prezzo}</div>
                    
                    <div style="display:flex; gap:10px;">
                        <input type="number" id="q-${p.ID}" value="1" min="1" style="width:60px; padding:8px; border:1px solid #ddd;">
                        <button onclick="aggiungiCarrello('${p.ID}')" style="flex-grow:1; background:var(--gizzi-green); color:white; border:none; cursor:pointer; font-weight:600;">ADD TO CART</button>
                    </div>

                    <div class="reviews-area" style="margin-top:20px; border-top:1px dotted #ccc; padding-top:10px;">
                        ${pRec.map(r => `
                            <div class="review-item">
                                <strong>${r.Cliente}</strong> ⭐ ${r.Voto}<br>
                                "${r.Commento}"
                                ${r.Risposta_Gizi ? `<div class="merchant-reply">Gruppo Gizzi: ${r.Risposta_Gizi}</div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>`;
    }).join('');
}

function aggiungiCarrello(id) {
    const p = prodotti.find(item => item.ID == id);
    const qty = parseInt(document.getElementById(`q-${id}`).value);
    
    const esistente = carrello.find(c => c.ID == id);
    if(esistente) esistente.quantita += qty;
    else carrello.push({...p, quantita: qty});
    
    aggiornaCarrelloUI();
    toggleCart(true);
}

function aggiornaCarrelloUI() {
    const list = document.getElementById('cart-items-list');
    let totale = 0;
    
    document.getElementById('cart-count').innerText = carrello.reduce((a,b) => a + b.quantita, 0);
    
    list.innerHTML = carrello.map((item, idx) => {
        const sub = parseFloat(item.Prezzo.replace(',','.')) * item.quantita;
        totale += sub;
        return `
            <div style="display:flex; justify-content:space-between; margin-bottom:15px;">
                <div><strong>${item.Nome}</strong><br><small>${item.quantita} x €${item.Prezzo}</small></div>
                <div>€${sub.toFixed(2)} <button onclick="rimuovi(${idx})" style="border:none; color:red; background:none; cursor:pointer;">&times;</button></div>
            </div>`;
    }).join('');
    
    document.getElementById('cart-total-display').querySelector('span').innerText = `€ ${totale.toFixed(2)}`;
}

function setLang(l) {
    lingua = l;
    render();
}

function toggleCart(open = null) {
    const p = document.getElementById('cart-panel');
    if(open === true) p.classList.add('active');
    else if(open === false) p.classList.remove('active');
    else p.classList.toggle('active');
}

avviaNegozio();
