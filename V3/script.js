// CONFIGURAZIONE MIGLIORATA
const CONFIG = {
    catalog: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRIumwZulbMAuesmG69DB8Y1bx2Y-NQXfyG7_m1-rdpZ-SoOxM0JyZtnj0_eV_K4t4drULTwV44nE5Y/pub?gid=0&single=true&output=csv",
    form: "https://docs.google.com/forms/d/e/1FAIpQLSend7KPNCjTNP1d-B3zd-wvhZAVXLS3P7341yN88fm3d7D4Jw/formResponse",
    emailWebApp: "https://script.google.com/macros/s/AKfycbwv1iqWofz-uaNpOlOD-D6qhPx-heZ8IAp6ZdJ1FdbK7BU8xLmGu9sN3wqnDkQaXbkp/exec",
    wa: "393358060715",
    cacheExpiry: 30 * 60 * 1000 // 30 minuti
};

// TRADUZIONI COMPLETE
const UI = {
    it: { 
        h1: "L'Oro del Cilento, a casa tua.", 
        p: "Eccellenza gastronomica dal cuore del Parco Nazionale.", 
        add: "AGGIUNGI", 
        total: "Totale",
        cart: "Il Tuo Carrello",
        ship: "Spedizione",
        order: "ORDINA ORA",
        clear: "SVUOTA CARRELLO",
        moments: "I Prodotti del Momento",
        all: "Tutti i Prodotti",
        byCat: "Per Categoria",
        maxQty: "Max disponibili",
        out: "Esaurito",
        low: "Ultimi pezzi",
        ok: "Disponibile",
        alertStock: "Hai raggiunto la disponibilità massima.",
        alertEmpty: "Il carrello è vuoto!",
        thanksH: "Grazie!",
        thanksP: "L'ordine è stato inviato correttamente.",
        back: "TORNA AL SITO",
        modH: "Dati Spedizione",
        conf: "CONFERMA E ORDINA",
        shippingFree: "Spedizione gratuita",
        processing: "Elaborazione..."
    },
    en: { 
        h1: "Cilento's Gold at home.", 
        p: "Gastronomic excellence from the heart of the National Park.", 
        add: "ADD", 
        total: "Total",
        cart: "Your Cart",
        ship: "Shipping",
        order: "ORDER NOW",
        clear: "EMPTY CART",
        moments: "Best Sellers",
        all: "All Products",
        byCat: "By Category",
        maxQty: "Max available",
        out: "Out of Stock",
        low: "Last pieces",
        ok: "Available",
        alertStock: "You've reached maximum availability.",
        alertEmpty: "Cart is empty!",
        thanksH: "Thank you!",
        thanksP: "Order sent successfully.",
        back: "BACK TO SITE",
        modH: "Shipping Details",
        conf: "CONFIRM ORDER",
        shippingFree: "Free shipping",
        processing: "Processing..."
    },
    de: { 
        h1: "Cilento Gold für Sie.", 
        p: "Kulinarische Exzellenz aus dem Nationalpark.", 
        add: "ZUFÜGEN", 
        total: "Gesamt",
        cart: "Warenkorb",
        ship: "Versand",
        order: "JETZT BESTELLEN",
        clear: "LEEREN",
        moments: "Highlights",
        all: "Alle Produkte",
        byCat: "Nach Kategorie",
        maxQty: "Maximal",
        out: "Ausverkauft",
        low: "Letzte Stück",
        ok: "Verfügbar",
        alertStock: "Maximale Menge erreicht.",
        alertEmpty: "Warenkorb ist leer!",
        thanksH: "Danke!",
        thanksP: "Bestellung erfolgreich gesendet.",
        back: "ZURÜCK",
        modH: "Versanddetails",
        conf: "BESTÄTIGEN",
        shippingFree: "Kostenloser Versand",
        processing: "Verarbeitung..."
    },
    hu: { 
        h1: "Cilento Aranya otthonában.", 
        p: "Gasztronómiai élmény a Nemzeti Park szívéből.", 
        add: "HOZZÁAD", 
        total: "Összesen",
        cart: "Kosár",
        ship: "Szállítás",
        order: "RENDELÉS",
        clear: "ÜRÍTÉS",
        moments: "Kiemelt termékek",
        all: "Összes termék",
        byCat: "Kategóriák",
        maxQty: "Max. mennyiség",
        out: "Elfogyott",
        low: "Utolsó darabok",
        ok: "Elérhető",
        alertStock: "Elérte a maximális mennyiséget.",
        alertEmpty: "A kosár üres!",
        thanksH: "Köszönjük!",
        thanksP: "Rendelés sikeresen elküldve.",
        back: "VISSZA",
        modH: "Szállítási adatok",
        conf: "RENDELÉS MEGERŐSÍTÉSE",
        shippingFree: "Ingyenes szállítás",
        processing: "Feldolgozás..."
    }
};

// STATO GLOBALE MIGLIORATO
let products = [], cart = [], lang = 'it', currentView = 'all', carouselIndex = 0;
let carouselInterval;
let isLoading = false;

// CACHE MANAGEMENT
function isCacheValid() {
    const cached = localStorage.getItem('gizzi_products_cache');
    if (!cached) return false;
    
    const { timestamp, data } = JSON.parse(cached);
    const now = Date.now();
    
    return (now - timestamp) < CONFIG.cacheExpiry;
}

function saveToCache(data) {
    try {
        const cacheData = {
            timestamp: Date.now(),
            data: data
        };
        localStorage.setItem('gizzi_products_cache', JSON.stringify(cacheData));
    } catch (error) {
        console.warn('Cache save failed:', error);
    }
}

function loadFromCache() {
    try {
        const cached = localStorage.getItem('gizzi_products_cache');
        if (cached) {
            const { data } = JSON.parse(cached);
            return data;
        }
    } catch (error) {
        console.warn('Cache load failed:', error);
    }
    return null;
}

// CARICAMENTO MIGLIORATO CON CACHE
async function load() {
    // Carica tema salvato
    initTheme();
    
    // Controlla GDPR
    checkGDPR();
    
    // Tenta di caricare dalla cache
    if (isCacheValid()) {
        const cachedData = loadFromCache();
        if (cachedData) {
            products = cachedData;
            render();
            startCarousel();
            updateCartUI();
            return;
        }
    }
    
    // Altrimenti carica da network
    try {
        isLoading = true;
        showLoading(true);
        
        const res = await fetch(CONFIG.catalog);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        
        const text = await res.text();
        const rows = text.split('\n').filter(r => r.trim() !== "");
        const headers = rows[0].split(',').map(h => h.trim());

        products = rows.slice(1).map(row => {
            const cols = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            let o = {};
            headers.forEach((h, i) => o[h] = cols[i]?.replace(/"/g, '').trim());
            
            // Processa stock
            let sVal = o.Stock || o.Quantità || o.stock;
            o.StockNum = (sVal === "" || sVal === undefined) ? 999 : parseInt(sVal);
            
            // Processa prezzo
            o.PrezzoNum = parseFloat(o.Prezzo?.replace(',', '.') || '0');
            
            return o;
        });

        // Salva in cache
        saveToCache(products);
        
    } catch (error) {
        console.error('Load error:', error);
        showError('Errore nel caricamento prodotti. Riprova più tardi.');
    } finally {
        isLoading = false;
        showLoading(false);
    }

    render();
    startCarousel();
    updateCartUI();
}

// CARICA CARRELLO SALVATO
function loadCart() {
    const saved = localStorage.getItem('gizzi_cart');
    if (saved) { 
        try {
            cart = JSON.parse(saved);
        } catch (error) {
            console.warn('Cart load failed:', error);
            cart = [];
        }
        updateCartUI(); 
    }
}

// FUNZIONI TEMA MIGLIORATE
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('gizzi_theme', theme);
    updateThemeIcon(theme);
}

function initTheme() {
    const savedTheme = localStorage.getItem('gizzi_theme') || 'light';
    setTheme(savedTheme);
}

function updateThemeIcon(theme) {
    const icon = document.getElementById('theme-icon');
    if (icon) {
        icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// GDPR MIGLIORATO
function acceptGDPR() {
    localStorage.setItem('gizzi_gdpr', 'accepted');
    document.getElementById('gdpr-banner').classList.remove('active');
}

function rejectGDPR() {
    localStorage.setItem('gizzi_gdpr', 'declined');
    document.getElementById('gdpr-banner').classList.remove('active');
}

function checkGDPR() {
    const gdpr = localStorage.getItem('gizzi_gdpr');
    if (!gdpr) {
        setTimeout(() => {
            const banner = document.getElementById('gdpr-banner');
            if (banner) banner.classList.add('active');
        }, 2000);
    }
}

// LINGUA MIGLIORATA
function updateLang(v) {
    lang = v;
    
    // Aggiorna testi statici
    const elements = {
        'hero-h1': UI[lang].h1,
        'hero-p': UI[lang].p,
        'carousel-title': UI[lang].moments,
        'btn-view-all': UI[lang].all,
        'btn-view-cats': UI[lang].byCat,
        'cart-label': UI[lang].cart,
        'modal-header': UI[lang].modH,
        'thanks-h': UI[lang].thanksH,
        'thanks-p': UI[lang].thanksP
    };
    
    Object.entries(elements).forEach(([id, text]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = text;
    });
    
    // Ri-renderizza i prodotti
    render();
    updateCartUI();
}

// CREAZIONE CARD MIGLIORATA
function createCard(p, nameKey) {
    const isOut = p.StockNum <= 0;
    const isLow = p.StockNum > 0 && p.StockNum < 5;
    
    let stockLabel = isOut ? UI[lang].out : (isLow ? UI[lang].low : UI[lang].ok);
    let stockClass = isOut || isLow ? 'stock-low' : 'stock-ok';
    let stockBgClass = isOut ? 'badge-danger' : (isLow ? 'badge-warning' : 'badge-success');
    
    const productName = p[nameKey] || p.Nome || 'Prodotto senza nome';
    
    return `
        <div class="card ${isOut ? 'out-of-stock' : ''}" data-product-id="${p.ID}">
            <div class="card-image-wrapper">
                <img src="${p.Immagine}" 
                     loading="lazy" 
                     alt="${productName}"
                     onerror="this.src='https://via.placeholder.com/300x200/e8e4de/666?text=Immagine+non+disponibile'">
                <div class="stock-badge ${stockClass}">${stockLabel}</div>
            </div>
            <div class="card-body">
                <div>
                    <h3>${productName}</h3>
                </div>
                <div>
                    <div class="price">€ ${p.Prezzo} <small>/ ${p.Unità || 'pz'}</small></div>
                    <button class="btn-add" 
                            ${isOut ? 'disabled' : ''} 
                            onclick="addToCart('${p.ID}')"
                            data-product-id="${p.ID}">
                        ${isOut ? UI[lang].out : UI[lang].add}
                    </button>
                </div>
            </div>
        </div>
    `;
}

// RENDER MIGLIORATO
function render() {
    const nameKey = lang === 'it' ? 'Nome' : `Nome_${lang.toUpperCase()}`;
    
    // Prodotti disponibili
    const activeProds = products.filter(p => p.Disponibile === 'SI');
    
    // Carousel - prodotti in evidenza
    const featured = shuffleArray(activeProds.filter(p => p.Evidenza === 'SI' && p.StockNum > 0));
    const carouselTrack = document.getElementById('carousel-track');
    if (carouselTrack) {
        carouselTrack.innerHTML = featured.slice(0, 8).map(p => createCard(p, nameKey)).join('');
        updateCarouselDots(Math.min(featured.length, 8));
    }
    
    // Menu categorie
    const catKey = lang === 'it' ? 'Categoria' : `Categoria_${lang.toUpperCase()}`;
    const uniqueCats = [...new Set(activeProds.map(p => p[catKey] || p.Categoria))].filter(Boolean);
    const shuffledCats = shuffleArray(uniqueCats);
    
    const anchorMenu = document.getElementById('anchor-menu');
    if (anchorMenu) {
        anchorMenu.innerHTML = shuffledCats.map(c =>
            `<a onclick="handleCategoryClick('cat-${c.replace(/\s+/g, '')}')" class="category-link">${c}</a>`
        ).join('');
    }
    
    // Prodotti principali
    const negozio = document.getElementById('negozio');
    if (negozio) {
        let html = "";
        
        if (currentView === 'all') {
            html = `<div class="grid">${shuffleArray(activeProds).map(p => createCard(p, nameKey)).join('')}</div>`;
        } else {
            html = shuffledCats.map(c => {
                const catProducts = activeProds.filter(p => (p[catKey] === c || p.Categoria === c));
                if (catProducts.length === 0) return '';
                
                return `
                    <div id="cat-${c.replace(/\s+/g, '')}" class="category-section">
                        <h2 class="section-title">${c}</h2>
                        <div class="grid">${catProducts.map(p => createCard(p, nameKey)).join('')}</div>
                    </div>
                `;
            }).filter(Boolean).join('');
        }
        
        negozio.innerHTML = html;
        
        // Aggiungi animazioni di entrata
        setTimeout(() => {
            document.querySelectorAll('.card').forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.05}s forwards`;
                }, 10);
            });
        }, 100);
    }
}

// FUNZIONE SHUFFLE MIGLIORATA
function shuffleArray(array) {
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// CAROUSEL MIGLIORATO
function updateCarouselDots(count) {
    const dotsContainer = document.getElementById('carousel-dots');
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => goToCarouselSlide(i);
        dotsContainer.appendChild(dot);
    }
}

function goToCarouselSlide(index) {
    const track = document.getElementById('carousel-track');
    if (!track) return;
    
    const cards = track.querySelectorAll('.card');
    if (cards.length === 0) return;

    const cardWidth = cards[0].offsetWidth + 24; // width + gap
    carouselIndex = Math.max(0, Math.min(index, cards.length - 1));
    track.style.transform = `translateX(-${carouselIndex * cardWidth}px)`;

    document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === carouselIndex);
    });
}

function startCarousel() {
    const track = document.getElementById('carousel-track');
    if (!track || track.children.length <= 1) return;

    // Clear existing interval
    if (carouselInterval) {
        clearInterval(carouselInterval);
    }

    carouselInterval = setInterval(() => {
        const cards = track.querySelectorAll('.card');
        if (cards.length === 0) return;

        const nextIndex = carouselIndex + 1;
        goToCarouselSlide(nextIndex >= cards.length ? 0 : nextIndex);
    }, 5000);
}

// CARRELLO MIGLIORATO
function addToCart(id) {
    const p = products.find(x => x.ID == id);
    if (!p) return;
    
    const ex = cart.find(c => c.ID == id);
    if (ex) {
        if (ex.qty < p.StockNum) {
            ex.qty++;
        } else {
            showToast(UI[lang].alertStock, 'warning');
            return;
        }
    } else {
        if (p.StockNum > 0) {
            cart.push({...p, qty: 1});
            // Aggiungi animazione al pulsante
            animateAddToCart(id);
        }
    }
    
    saveCartUI();
    
    // Apri carrello se è il primo prodotto
    if (cart.length === 1) {
        setTimeout(() => toggleCart(), 500);
    }
}

function animateAddToCart(productId) {
    const button = document.querySelector(`[data-product-id="${productId}"]`);
    if (button) {
        button.classList.add('success-animation');
        setTimeout(() => {
            button.classList.remove('success-animation');
        }, 600);
    }
}

function removeProduct(id) {
    cart = cart.filter(c => c.ID !== id);
    saveCartUI();
    showToast('Prodotto rimosso dal carrello', 'info');
}

function emptyCart() {
    if (confirm(UI[lang].clear + "?")) {
        cart = [];
        saveCartUI();
        showToast('Carrello svuotato', 'info');
    }
}

function updateCartQty(id, delta) {
    const it = cart.find(c => c.ID == id);
    const p = products.find(x => x.ID == id);
    if (!it || !p) return;
    
    const newQty = it.qty + delta;
    if (newQty <= 0) {
        removeProduct(id);
    } else if (newQty <= p.StockNum) {
        it.qty = newQty;
    } else {
        showToast(UI[lang].alertStock, 'warning');
        return;
    }
    
    saveCartUI();
}

function updateCartUI() {
    const nameKey = lang === 'it' ? 'Nome' : `Nome_${lang.toUpperCase()}`;
    let subtotal = 0;

    const cartItems = document.getElementById('cart-items');
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
                    <div style="font-size: 3rem; margin-bottom: 16px;">🛒</div>
                    <div>${UI[lang].alertEmpty}</div>
                </div>
            `;
        } else {
            cartItems.innerHTML = cart.map(c => {
                const p = products.find(x => x.ID == c.ID);
                if (!p) return '';
                
                const itemTotal = parseFloat(c.Prezzo.replace(',', '.')) * c.qty;
                subtotal += itemTotal;

                return `
                    <div class="cart-item">
                        <div class="cart-item-info">
                            <div class="cart-item-name">${c[nameKey] || c.Nome}</div>
                            <div class="cart-item-stock">${UI[lang].maxQty}: ${p.StockNum}</div>
                        </div>
                        <div class="qty-controls">
                            <button class="qty-btn" onclick="updateCartQty('${c.ID}', -1)">−</button>
                            <span class="qty-value">${c.qty}</span>
                            <button class="qty-btn" onclick="updateCartQty('${c.ID}', 1)">+</button>
                        </div>
                        <div class="cart-item-price">€ ${itemTotal.toFixed(2)}</div>
                        <button class="cart-remove" onclick="removeProduct('${c.ID}')">🗑️</button>
                    </div>
                `;
            }).join('');
        }
    }

    // Calcola spedizione e totale
    const country = document.getElementById('f-country')?.value || 'Italia';
    let shipping = (cart.length === 0) ? 0 : (country === "Italia" ? (subtotal >= 120 ? 0 : 13) : 50);

    // Aggiorna totali
    const shippingInfo = document.getElementById('shipping-info');
    if (shippingInfo) {
        const shippingText = subtotal >= 120 && country === "Italia" ? UI[lang].shippingFree : `${UI[lang].ship}: € ${shipping.toFixed(2)}`;
        shippingInfo.textContent = shippingText;
    }

    const cartTotal = document.getElementById('cart-total-display');
    if (cartTotal) {
        cartTotal.textContent = `${UI[lang].total}: € ${(subtotal + shipping).toFixed(2)}`;
    }

    // Aggiorna contatore
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((a, b) => a + b.qty, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function saveCartUI() {
    localStorage.setItem('gizzi_cart', JSON.stringify(cart));
    updateCartUI();
}

// UI MANAGEMENT MIGLIORATO
function toggleCart() {
    const panel = document.getElementById('cart-panel');
    const overlay = document.getElementById('cart-overlay');
    
    if (panel && overlay) {
        const isOpen = panel.classList.contains('active');
        
        panel.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = isOpen ? '' : 'hidden';
    }
}

function switchView(v) {
    currentView = v;
    
    // Aggiorna pulsanti
    const btnViewAll = document.getElementById('btn-view-all');
    const btnViewCats = document.getElementById('btn-view-cats');
    
    if (btnViewAll) btnViewAll.classList.toggle('active', v === 'all');
    if (btnViewCats) btnViewCats.classList.toggle('active', v === 'cats');
    
    render();
    window.scrollTo({top: 0, behavior: 'smooth'});
}

function handleCategoryClick(id) {
    if (currentView !== 'cats') switchView('cats');
    
    // Rimuovi active da tutte le categorie
    document.querySelectorAll('.category-link').forEach(a => a.classList.remove('active'));
    
    // Aggiungi active alla categoria cliccata
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    // Scroll alla categoria
    setTimeout(() => {
        const target = document.getElementById(id);
        if (target) {
            target.scrollIntoView({ 
                top: 120, 
                behavior: 'smooth' 
            });
        }
    }, 100);
}

// CHECKOUT MIGLIORATO
function openCheckout() {
    if (cart.length === 0) {
        showToast(UI[lang].alertEmpty, 'error');
        return;
    }
    
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCheckout() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

async function processOrder() {
    const name = document.getElementById('f-name')?.value;
    const email = document.getElementById('f-email')?.value;
    const phone = document.getElementById('f-phone')?.value;
    const addr = document.getElementById('f-addr')?.value;

    if (!name || !email || !phone || !addr) {
        showToast('Compila tutti i campi obbligatori', 'error');
        return;
    }

    // Disabilita pulsante
    const submitBtn = document.querySelector('#modal button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = UI[lang].processing;
    }

    try {
        const fT = document.getElementById('cart-total-display')?.innerText.split('€')[1]?.trim();
        const oID = "GZ-" + Date.now().toString().slice(-6);

        const detailRows = cart.map(c =>
            `${c.qty}x ${c.Nome} (€ ${c.Prezzo}) = € ${(parseFloat(c.Prezzo.replace(',', '.')) * c.qty).toFixed(2)}`
        );

        // Invia a Google Forms
        await fetch(CONFIG.form, {
            method: 'POST',
            mode: 'no-cors',
            body: new URLSearchParams({
                'entry.442927045': oID,
                'entry.333212320': name,
                'entry.1385104048': email,
                'entry.844983788': phone,
                'entry.334440207': addr,
                'entry.1856379113': detailRows.join(" | "),
                'entry.146792905': fT
            })
        });

        // Chiudi modale
        closeCheckout();

        // Mostra thanks popup
        const thanksPopup = document.getElementById('thanks-popup');
        if (thanksPopup) {
            thanksPopup.classList.add('active');
        }

        // Apri WhatsApp
        const whatsappMessage = formatWhatsAppMessage(oID, name, email, phone, addr, detailRows, fT);
        window.open(`https://wa.me/${CONFIG.wa}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');

        // Svuota carrello
        cart = [];
        saveCartUI();

    } catch (error) {
        console.error('Order error:', error);
        showToast('Errore durante l\'invio dell\'ordine. Riprova.', 'error');
    } finally {
        // Riabilita pulsante
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = UI[lang].conf;
        }
    }
}

function formatWhatsAppMessage(orderId, name, email, phone, addr, details, total) {
    return `*ORDINE ${orderId}*\n\n*CLIENTE:* ${name}\n*EMAIL:* ${email}\n*TEL:* ${phone}\n*INDIRIZZO:* ${addr}\n\n*PRODOTTI:*\n${details.join("\n")}\n\n*TOTALE:* € ${total}`;
}

// UTILITIES MIGLIORATE
function clearAndReload() {
    localStorage.removeItem('gizzi_cart');
    location.reload();
}

function showLoading(show) {
    const body = document.body;
    const overlay = document.querySelector('.loading-overlay');
    
    if (body) {
        body.classList.toggle('loading', show);
    }
    
    if (overlay) {
        overlay.style.display = show ? 'flex' : 'none';
    }
}

function showToast(message, type = 'info', duration = 3000) {
    // Rimuovi toast esistenti
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Crea nuovo toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Anima entrata
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Rimuovi dopo duration
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

function showError(message) {
    showToast(message, 'error', 5000);
}

function showSuccess(message) {
    showToast(message, 'success', 3000);
}

// INIT MIGLIORATO
document.addEventListener('DOMContentLoaded', () => {
    // Carica carrello salvato
    loadCart();
    
    // Carica prodotti
    load();
    
    // Setup keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Esc per chiudere modali
        if (e.key === 'Escape') {
            closeCheckout();
            const panel = document.getElementById('cart-panel');
            const overlay = document.getElementById('cart-overlay');
            if (panel && overlay) {
                panel.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
        
        // Ctrl+C per aprire carrello
        if (e.ctrlKey && e.key === 'c') {
            e.preventDefault();
            toggleCart();
        }
    });
    
    // Setup scroll effects
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            const currentScroll = window.scrollY;
            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            lastScroll = currentScroll;
        }
    }, { passive: true });
});

// Cleanup intervalli
window.addEventListener('beforeunload', () => {
    if (carouselInterval) {
        clearInterval(carouselInterval);
    }
});