const CONFIG = {
    catalog: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRIumwZulbMAuesmG69DB8Y1bx2Y-NQXfyG7_m1-rdpZ-SoOxM0JyZtnj0_eV_K4t4drULTwV44nE5Y/pub?gid=0&single=true&output=csv",
    form: "https://docs.google.com/forms/d/e/1FAIpQLSend7KPNCjTNP1d-B3zd-wvhZAVXLS3P7341yN88fm3d7D4Jw/formResponse",
    emailWebApp: "https://script.google.com/macros/s/AKfycbwv1iqWofz-uaNpOlOD-D6qhPx-heZ8IAp6ZdJ1FdbK7BU8xLmGu9sN3wqnDkQaXbkp/exec",
    wa: "393358060715"
};

const UI = {
    it: { h1: "L'Oro del Cilento, a casa tua.", p: "Dalle terre incontaminate del Parco Nazionale, selezioniamo l'eccellenza gastronomica.", add: "Aggiungi", total: "Totale", thanksH: "Grazie!", thanksP: "Ordine ricevuto correttamente." },
    en: { h1: "Cilento's Gold, at your doorstep.", p: "Gastronomic excellence from the heart of the National Park.", add: "Add", total: "Total", thanksH: "Thank you!", thanksP: "Order received successfully." },
    de: { h1: "Cilento Gold, vor Ihrer Tür.", p: "Kulinarische Exzellenz aus dem Herzen del Nationalparks.", add: "Hinzufügen", total: "Gesamt", thanksH: "Vielen Dank!", thanksP: "Bestellung erfolgreich erhalten." }
};

let products = [], cart = [], lang = 'it', carouselIndex = 0;

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
    startAutoPlay(); // Attiva scorrimento automatico
}

function render() {
    const nameKey = lang === 'it' ? 'Nome' : `Nome_${lang.toUpperCase()}`;
    const featured = products.filter(p => p.Evidenza === 'SI');
    document.getElementById('carousel-track').innerHTML = featured.map(p => `
        <div class="carousel-item">
            <img src="${p.Immagine}">
            <h4>${p[nameKey] || p.Nome}</h4>
            <p>€ ${p.Prezzo}</p>
            <button onclick="add('${p.ID}')" style="background:var(--gizzi-deep); color:white; border:none; padding:8px 15px; border-radius:5px; cursor:pointer;">${UI[lang].add}</button>
        </div>`).join('');
    // Altro render del negozio qui...
}

// LOGICA CAROUSEL AUTO-PLAY E MOVIMENTO FORSE FUNZIONA
function moveCarousel(direction) {
    const track = document.getElementById('carousel-track');
    const items = document.querySelectorAll('.carousel-item');
    if (items.length === 0) return;
    const width = 300; // larghezza item + gap
    const visible = Math.floor(document.querySelector('.carousel-container').offsetWidth / width);
    const max = items.length - (visible || 1);
    
    carouselIndex += direction;
    if (carouselIndex < 0) carouselIndex = max;
    if (carouselIndex > max) carouselIndex = 0;
    
    track.style.transform = `translateX(-${carouselIndex * width}px)`;
}

function startAutoPlay() {
    setInterval(() => moveCarousel(1), 5000); // Scorri ogni 5 secondi
}

// Altre funzioni (add, updateCart, processOrder) rimangono identiche...
