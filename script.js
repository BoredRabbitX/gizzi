const CONFIG = {
    catalogo: "https://docs.google.com/spreadsheets/d/e/2PACX-1vR0aLcG9mPmNexSlEt-5MaNlpIPUF7LPvdlsJwDhoa_1PZfsvFbw9eQu4uBpsrqwTng9TrkqvxcoQRm/pub?gid=118341302&single=true&output=csv",
    recensioni: "https://docs.google.com/spreadsheets/d/e/2PACX-1vR0aLcG9mPmNexSlEt-5MaNlpIPUF7LPvdlsJwDhoa_1PZfsvFbw9eQu4uBpsrqwTng9TrkqvxcoQRm/pub?gid=534419137&single=true&output=csv",
    script_url: "https://script.google.com/macros/s/AKfycbxRRpm4b5KVsAGIrcZulzqgmAGuU3cG8r-5p1DoCdrM87w4kCLCeDsNZD1WSAq5TdrA/exec",
    wa_number: "393358060715"
};

let db = []; 
let reviews = []; 
let cart = []; 
let currentLang = 'it';

// 1. Caricamento Dati
async function init() {
    try {
        console.log("Inizio caricamento prodotti...");
        const resP = await fetch(CONFIG.catalogo);
        const csvP = await resP.text();
        db = parseCSV(csvP);
        
        console.log("Prodotti caricati:", db.length);

        const resR = await fetch(CONFIG.recensioni);
        const csvR = await resR.text();
        reviews = parseCSV(csvR);

        render();
    } catch (error) {
        console.error("Errore critico:", error);
        document.getElementById('shop-grid').innerHTML = "Errore nel caricamento dei prodotti. Verifica la connessione o il link Google Sheets.";
    }
}

// 2. Parser CSV Robusto (gestisce virgole e tabulazioni)
function parseCSV(text) {
    const lines = text.split(/\r?\n/).filter(line => line.trim() !== "");
    if (lines.length === 0) return [];

    // Rileva se il separatore è tab (\t) o virgola (,)
    const separator = lines[0].includes('\t') ? '\t' : ',';
    const headers = lines[0].split(separator).map(h => h.trim());

    return lines.slice(1).map(line => {
        const columns = line.split(separator);
        let obj = {};
        headers.forEach((h, i) => {
            obj[h] = columns[i] ? columns[i].trim() : "";
        });
        return obj;
    });
}

// 3. Cambio Lingua (Fixato)
function setLang(lang) {
    console.log("Cambio lingua a:", lang);
    currentLang = lang;
    render();
}

// 4. Renderizzazione Vetrina
function render() {
    const grid = document.getElementById('shop-grid');
    if (!grid) return;

    grid.innerHTML = db.map(p => {
        // Prende Nome_EN o Nome_DE se esistono, altrimenti usa Nome (italiano)
        const nameKey = currentLang === 'it' ? 'Nome' : `Nome_${currentLang.toUpperCase()}`;
        const descKey = currentLang === 'it' ? 'Descrizione' : `Desc_${currentLang.toUpperCase()}`;
        
        const nomeDisplay = p[nameKey] || p['Nome'] || "Prodotto";
        const descDisplay = p[descKey] || p['Descrizione'] || "";
        const btnText = { it: "Aggiungi", en: "Add", de: "Hinzufügen" }[currentLang];

        const pReviews = reviews.filter(r => r.ID_Prodotto === p.ID);

        return `
            <div class="card">
                <img src="${p.Immagine}" alt="${nomeDisplay}" onerror="this.src='https://via.placeholder.com/300x200?text=Immagine+Non+Disponibile'">
                <div class="card-info">
                    <small style="color:var(--accent)">${p.Categoria}</small>
                    <h3 class="card-title">${nomeDisplay}</h3>
                    <p style="font-size:0.85rem; color:#666">${descDisplay}</p>
                    <div class="card-price">€ ${p.Prezzo} <small>/ ${p.Unità}</small></div>
                    <button class="btn-primary" onclick="addToCart('${p.ID}')">${btnText}</button>
                    
                    <div class="reviews-section" style="margin-top:10px; border-top:1px solid #eee; padding-top:10px;">
                        ${pReviews.map(r => `
                            <div style="font-size:0.8rem; margin-bottom:5px;">
                                <strong>${r.Cliente}:</strong> ⭐ ${r.Voto}<br>
                                "${r.Commento}"
                                ${r.Risposta_Gizi ? `<div style="background:#f0f7ef; padding:5px; margin-top:3px; border-left:2px solid var(--gizzi-green)"><strong>Gruppo Gizzi:</strong> ${r.Risposta_Gizi}</div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// 5. Funzioni Carrello
function addToCart(id) {
    const item = db.find(p => p.ID === id);
    cart.push(item);
    updateCartUI();
    toggleCart(true); // Apre il carrello automaticamente
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const list = document.getElementById('cart-items-list');
    let total = 0;
    
    list.innerHTML = cart.map((item, index) => {
        total += parseFloat(item.Prezzo);
        return `
            <div style="display:flex; justify-content:space-between; margin-bottom:10px; font-size:0.9rem;">
                <span>${item.Nome}</span>
                <span>€ ${item.Prezzo} <button onclick="removeFromCart(${index})" style="border:none; background:none; cursor:pointer;">🗑️</button></span>
            </div>
        `;
    }).join('');
    
    document.getElementById('cart-total-value').innerText = `€ ${total.toFixed(2)}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function toggleCart(forceOpen = false) {
    const panel = document.getElementById('cart-panel');
    if (forceOpen) panel.classList.add('active');
    else panel.classList.toggle('active');
}

function openCheckout() { document.getElementById('checkout-modal').style.display = 'flex'; }
function closeCheckout() { document.getElementById('checkout-modal').style.display = 'none'; }

// Avvio
init();
