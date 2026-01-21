const CONFIG = {
    catalog: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRIumwZulbMAuesmG69DB8Y1bx2Y-NQXfyG7_m1-rdpZ-SoOxM0JyZtnj0_eV_K4t4drULTwV44nE5Y/pub?gid=0&single=true&output=csv",
    formURL: "https://docs.google.com/forms/d/e/1FAIpQLSend7KPNCjTNP1d-B3zd-wvhZAVXLS3P7341yN88fm3d7D4Jw/formResponse",
    whatsapp: "393667540018",
    cartKey: 'gizzi_cart',
    themeKey: 'gizzi_theme',
    langKey: 'gizzi_lang'
};

const UI = {
    it: {
        h1: "L'Oro del Cilento, a casa tua.",
        p: "Eccellenza gastronomica dal cuore del Parco Nazionale.",
        cta: "SCOPRI I PRODOTTI",
        add: "AGGIUNGI",
        total: "Totale",
        cart: "Il Tuo Carrello",
        ship: "Spedizione",
        order: "PROSEGUI ALL'ORDINE",
        clear: "SVUOTA CARRELLO",
        moments: "I Prodotti del Momento",
        all: "Tutti i Prodotti",
        byCat: "Per Categoria",
        maxQty: "Quantità massima",
        out: "Esaurito",
        low: "Disponibilità limitata",
        ok: "Disponibile",
        alertStock: "Disponibilità massima raggiunta.",
        alertEmpty: "Il carrello è vuoto!",
        thanksH: "Grazie!",
        thanksP: "L'ordine è stato inviato correttamente.",
        back: "TORNA AL SITO",
        modH: "Dati Spedizione",
        conf: "CONFERMA E ORDINA",
        searchPlaceholder: "Cerca prodotti...",
        noResults: "Nessun prodotto trovato",
        addToCart: "Prodotto aggiunto al carrello",
        removeFromCart: "Prodotto rimosso dal carrello",
        cartCleared: "Carrello svuotato",
        orderSuccess: "Ordine inviato con successo",
        namePlaceholder: "Nome e Cognome *",
        emailPlaceholder: "Email *",
        phonePlaceholder: "Telefono *",
        addressPlaceholder: "Indirizzo Completo (Via, Civico, Città, CAP) *",
        countryLabel: "Paese",
        italy: "Italia",
        europe: "Europa (UE)",
        requiredFields: "Compila tutti i campi obbligatori",
        validEmail: "Inserisci un'email valida",
        validPhone: "Inserisci un numero di telefono valido",
        orderError: "Errore durante l'elaborazione dell'ordine",
        loadingError: "Errore nel caricamento del catalogo",
        cartLabel: "Carrello",
        ariaAdd: "Aggiungi al carrello",
        ariaRemove: "Rimuovi dal carrello",
        ariaIncrease: "Aumenta quantità",
        ariaDecrease: "Diminuisci quantità",
        ariaClose: "Chiudi",
        ariaMenu: "Menu categorie",
        ariaSearch: "Cerca prodotti nel catalogo",
        ariaToggleTheme: "Attiva/Disattiva modalità scura",
        ariaToggleCart: "Apri carrello"
    },
    en: {
        h1: "Cilento's Gold at home.",
        p: "Gastronomic excellence from heart of National Park.",
        cta: "DISCOVER PRODUCTS",
        add: "ADD",
        total: "Total",
        cart: "Your Cart",
        ship: "Shipping",
        order: "PROCEED TO ORDER",
        clear: "EMPTY CART",
        moments: "Best Sellers",
        all: "All Products",
        byCat: "By Category",
        maxQty: "Max quantity",
        out: "Out of Stock",
        low: "Limited availability",
        ok: "Available",
        alertStock: "Maximum availability reached.",
        alertEmpty: "Cart is empty!",
        thanksH: "Thank you!",
        thanksP: "Order sent successfully.",
        back: "BACK TO HOME",
        modH: "Shipping Details",
        conf: "CONFIRM AND ORDER",
        searchPlaceholder: "Search products...",
        noResults: "No products found",
        addToCart: "Product added to cart",
        removeFromCart: "Product removed from cart",
        cartCleared: "Cart cleared",
        orderSuccess: "Order sent successfully",
        namePlaceholder: "Full Name *",
        emailPlaceholder: "Email *",
        phonePlaceholder: "Phone *",
        addressPlaceholder: "Full Address (Street, Number, City, ZIP) *",
        countryLabel: "Country",
        italy: "Italy",
        europe: "Europe (EU)",
        requiredFields: "Please fill all required fields",
        validEmail: "Please enter a valid email",
        validPhone: "Please enter a valid phone number",
        orderError: "Error processing order",
        loadingError: "Error loading catalog",
        cartLabel: "Cart",
        ariaAdd: "Add to cart",
        ariaRemove: "Remove from cart",
        ariaIncrease: "Increase quantity",
        ariaDecrease: "Decrease quantity",
        ariaClose: "Close",
        ariaMenu: "Categories menu",
        ariaSearch: "Search products in catalog",
        ariaToggleTheme: "Toggle dark mode",
        ariaToggleCart: "Open cart"
    },
    de: {
        h1: "Cilento Gold für Sie.",
        p: "Kulinarische Exzellenz aus dem Herzen des Nationalparks.",
        cta: "PRODUKTE ENTDECKEN",
        add: "HINZUFÜGEN",
        total: "Gesamt",
        cart: "Warenkorb",
        ship: "Versand",
        order: "ZUR BESTELLUNG FORTFAHREN",
        clear: "WARENKORB LEEREN",
        moments: "Bestseller",
        all: "Alle Produkte",
        byCat: "Nach Kategorie",
        maxQty: "Maximalmenge",
        out: "Ausverkauft",
        low: "Begrenzte Verfügbarkeit",
        ok: "Verfügbar",
        alertStock: "Maximale verfügbare Menge erreicht.",
        alertEmpty: "Warenkorb ist leer!",
        thanksH: "Danke!",
        thanksP: "Bestellung erfolgreich gesendet.",
        back: "ZURÜCK",
        modH: "Versanddetails",
        conf: "BESTÄTIGEN UND BESTELLEN",
        searchPlaceholder: "Produkte suchen...",
        noResults: "Keine Produkte gefunden",
        addToCart: "Produkt zum Warenkorb hinzugefügt",
        removeFromCart: "Produkt aus Warenkorb entfernt",
        cartCleared: "Warenkorb geleert",
        orderSuccess: "Bestellung erfolgreich gesendet",
        namePlaceholder: "Vollständiger Name *",
        emailPlaceholder: "E-Mail *",
        phonePlaceholder: "Telefon *",
        addressPlaceholder: "Vollständige Adresse (Straße, Hausnummer, Stadt, PLZ) *",
        countryLabel: "Land",
        italy: "Italien",
        europe: "Europa (EU)",
        requiredFields: "Bitte füllen Sie alle Pflichtfelder aus",
        validEmail: "Bitte geben Sie eine gültige E-Mail ein",
        validPhone: "Bitte geben Sie eine gültige Telefonnummer ein",
        orderError: "Fehler bei der Bestellabwicklung",
        loadingError: "Fehler beim Laden des Katalogs",
        cartLabel: "Warenkorb",
        ariaAdd: "Zum Warenkorb hinzufügen",
        ariaRemove: "Aus Warenkorb entfernen",
        ariaIncrease: "Menge erhöhen",
        ariaDecrease: "Menge verringern",
        ariaClose: "Schließen",
        ariaMenu: "Kategorienmenü",
        ariaSearch: "Produkte im Katalog suchen",
        ariaToggleTheme: "Dark Mode umschalten",
        ariaToggleCart: "Warenkorb öffnen"
    },
    hu: {
        h1: "Cilento Aranya otthonában.",
        p: "Gasztronómiai élmény a Nemzeti Park szívéből.",
        cta: "TERMÉKEK FELTÁRÁSA",
        add: "HOZZÁAD",
        total: "Összesen",
        cart: "Kosár",
        ship: "Szállítás",
        order: "RENDELÉSHEZ FOLYTÁS",
        clear: "KOSÁR ÜRÍTÉSE",
        moments: "Népszerű termékek",
        all: "Összes termék",
        byCat: "Kategóriák",
        maxQty: "Max. mennyiség",
        out: "Elfogyott",
        low: "Korlátozott készlet",
        ok: "Elérhető",
        alertStock: "Elérte a maximális készletet.",
        alertEmpty: "A kosár üres!",
        thanksH: "Köszönjük!",
        thanksP: "Rendelés sikeresen elküldve.",
        back: "VISSZA",
        modH: "Szállítási adatok",
        conf: "RENDELÉS MEGERŐSÍTÉSE",
        searchPlaceholder: "Keresés termékek...",
        noResults: "Nincs találat",
        addToCart: "Termék a kosárhoz adva",
        removeFromCart: "Termék eltávolítva a kosárból",
        cartCleared: "Kosár kiürítve",
        orderSuccess: "Rendelés sikeresen elküldve",
        namePlaceholder: "Teljes név *",
        emailPlaceholder: "E-mail *",
        phonePlaceholder: "Telefonszám *",
        addressPlaceholder: "Teljes cím (utca, házszám, város, irányítószám) *",
        countryLabel: "Ország",
        italy: "Olaszország",
        europe: "Európa (EU)",
        requiredFields: "Kérem töltse ki az összes kötelező mezőt",
        validEmail: "Kérem adjon meg érvényes e-mail címet",
        validPhone: "Kérem adjon meg érvényes telefonszámot",
        orderError: "Hiba a rendelés feldolgozása során",
        loadingError: "Hiba a katalógus betöltésekor",
        cartLabel: "Kosár",
        ariaAdd: "Kosárhoz adás",
        ariaRemove: "Törlés a kosárból",
        ariaIncrease: "Mennyiség növelése",
        ariaDecrease: "Mennyiség csökkentése",
        ariaClose: "Bezárás",
        ariaMenu: "Kategóriák menü",
        ariaSearch: "Keresés a katalógusban",
        ariaToggleTheme: "Sötét mód beállítása",
        ariaToggleCart: "Kosár megnyitása"
    }
};

let products = [];
let cart = [];
let lang = 'it';
let currentView = 'all';
let carouselIndex = 0;
let originalFeatCount = 0;
let searchQuery = '';

class ToastManager {
    static show(message, type = 'success', duration = 3000) {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <span class="toast-message">${message}</span>
        `;
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
}

class StorageManager {
    static set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn('LocalStorage not available:', e);
        }
    }
    
    static get(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.warn('LocalStorage error:', e);
            return null;
        }
    }
    
    static remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.warn('LocalStorage error:', e);
        }
    }
}

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

async function load() {
    try {
        hideLoading();
        
        const res = await fetch(CONFIG.catalog);
        if (!res.ok) throw new Error('Failed to load catalog');
        
        const text = await res.text();
        const rows = text.split('\n').filter(r => r.trim() !== "");
        const headers = rows[0].split(',').map(h => h.trim());
        
        products = rows.slice(1).map(row => {
            const cols = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            let obj = {};
            headers.forEach((h, i) => obj[h] = cols[i]?.replace(/"/g, '').trim());
            
            const stockVal = obj.Stock || obj.Quantità || obj.stock || '';
            obj.StockNum = (stockVal === "" || stockVal === undefined) ? 999 : parseInt(stockVal);
            
            // Add random rating for demo purposes
            obj.Rating = Math.floor(Math.random() * 5) + 1;
            obj.Views = Math.floor(Math.random() * 100) + 10;
            
            return obj;
        });
        
        loadPreferences();
        loadWishlist();
        render();
        startCarousel();
        
        setTimeout(() => {
            document.querySelectorAll('.card').forEach(el => el.classList.add('visible'));
        }, 200);
        
        // Check for GDPR compliance
        checkGDPR();
        
    } catch (error) {
        console.error('Error loading catalog:', error);
        ToastManager.show(UI[lang].loadingError, 'error');
    }
}

function loadPreferences() {
    const savedTheme = StorageManager.get(CONFIG.themeKey);
    if (savedTheme) {
        document.body.classList.remove('light-mode', 'dark-mode');
        document.body.classList.add(`${savedTheme}-mode`);
    }
    
    const savedLang = StorageManager.get(CONFIG.langKey);
    if (savedLang) {
        lang = savedLang;
        document.getElementById('lang-sel').value = lang;
    }
    
    const savedCart = StorageManager.get(CONFIG.cartKey);
    if (savedCart) {
        cart = savedCart;
        updateCartUI();
    }
}

function savePreferences() {
    const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    StorageManager.set(CONFIG.themeKey, theme);
    StorageManager.set(CONFIG.langKey, lang);
}

function updateLang(value) {
    lang = value;
    savePreferences();
    
    document.getElementById('hero-title').textContent = UI[lang].h1;
    document.getElementById('hero-subtitle').textContent = UI[lang].p;
    document.querySelector('.btn-cta').textContent = UI[lang].cta;
    document.getElementById('featured-title').textContent = UI[lang].moments;
    document.getElementById('btn-view-all').textContent = UI[lang].all;
    document.getElementById('btn-view-cats').textContent = UI[lang].byCat;
    document.getElementById('cart-title').textContent = UI[lang].cart;
    document.getElementById('btn-clear').textContent = UI[lang].clear;
    document.getElementById('btn-checkout').textContent = UI[lang].order;
    document.getElementById('modal-title').textContent = UI[lang].modH;
    document.querySelector('.btn-submit').textContent = UI[lang].conf;
    document.getElementById('thanks-title').textContent = UI[lang].thanksH;
    document.getElementById('thanks-message').textContent = UI[lang].thanksP;
    document.getElementById('thanks-btn').textContent = UI[lang].back;
    document.getElementById('search-input').placeholder = UI[lang].searchPlaceholder;
    document.getElementById('f-name').placeholder = UI[lang].namePlaceholder;
    document.getElementById('f-email').placeholder = UI[lang].emailPlaceholder;
    document.getElementById('f-phone').placeholder = UI[lang].phonePlaceholder;
    document.getElementById('f-addr').placeholder = UI[lang].addressPlaceholder;
    document.querySelector('#f-country').previousElementSibling.textContent = UI[lang].countryLabel;
    
    const countrySelect = document.getElementById('f-country');
    countrySelect.innerHTML = `
        <option value="Italia">${UI[lang].italy}</option>
        <option value="Europa">${UI[lang].europe}</option>
    `;
    
    render();
    updateCartUI();
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
    
    const icon = document.querySelector('.theme-icon');
    icon.setAttribute('src', document.body.classList.contains('dark-mode') ? 
        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Y2lyY2xlIGN4PSI4IiBjeT0iOCIgcj0iNSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiPjwvY2lyY2xlPjxwYXRoIGQ9Ik04IDJWNGgxMXYxIiBzdHJva2U9ImN1cnJlbnRDb2xvciI+PC9wYXRoPjwvc3ZnPg==' : 
        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMjEgMTIuNzlBNSA1IDAgMCAwIDE2YTBhNSA1IDAgMCAwIDB6bS01IC43OWEuNzUuNzUgMCAwIDEgLjUgMCAxIC41LjUgMCAwIDEgLjUtLjV6bTEuNyAzLjU1YS44IC44IDAgMCAwLS4yNiAwbC0xLjQ2LS44YS44IC44IDAgMCAwLS4yNiAwbC0uNTQtM2EuNzUuNzUgMCAwIDAtLjUgMCAxIC41LjUgMCAwIDEgLjUuNXoiPjwvcGF0aD48L3N2Zz4=');
    
    savePreferences();
}

function createCard(product, nameKey) {
    const isOut = product.StockNum <= 0;
    const isLow = product.StockNum > 0 && product.StockNum < 5;
    const stockLabel = isOut ? UI[lang].out : (isLow ? UI[lang].low : UI[lang].ok);
    const stockClass = isLow || isOut ? 'stock-low' : 'stock-ok';
    const productName = product[nameKey] || product.Nome;
    const isInWishlist = wishlist.includes(product.ID);
    
    return `
        <article class="card visible" role="article">
            <button 
                class="wishlist-btn ${isInWishlist ? 'active' : ''}" 
                onclick="toggleWishlist('${product.ID}')"
                aria-label="${isInWishlist ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}"
            >
                ${isInWishlist ? '❤️' : '🤍'}
            </button>
            <img 
                src="${product.Immagine}" 
                alt="${productName}"
                loading="lazy"
                style="${isOut ? 'filter: grayscale(1); opacity: 0.6;' : ''}"
            >
            <div class="card-body">
                <div class="stock-badge ${stockClass}" role="status">
                    ${stockLabel}
                </div>
                <h3>${productName}</h3>
                <div class="price">€ ${product.Prezzo} <small>/ ${product.Unità}</small></div>
                ${product.Rating ? `
                    <div class="review-stars">
                        ${generateStars(product.Rating)}
                        <span class="review-text">(${product.Reviews || 0} recensioni)</span>
                    </div>
                ` : ''}
                <button 
                    class="btn-add" 
                    ${isOut ? `disabled aria-label="${UI[lang].out} - ${productName}"` : `aria-label="${UI[lang].ariaAdd} - ${productName}"`}
                    onclick="addToCart('${product.ID}')"
                >
                    ${isOut ? UI[lang].out : UI[lang].add}
                </button>
            </div>
        </article>
    `;
}

function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += `<span class="star ${i <= rating ? 'filled' : ''}">★</span>`;
    }
    return stars;
}

let wishlist = [];
const wishlistKey = 'gizzi_wishlist';

function loadWishlist() {
    const saved = StorageManager.get(wishlistKey);
    if (saved) {
        wishlist = saved;
    }
}

function saveWishlist() {
    StorageManager.set(wishlistKey, wishlist);
}

function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    if (index > -1) {
        wishlist.splice(index, 1);
        ToastManager.show('Rimosso dai preferiti', 'info');
    } else {
        wishlist.push(productId);
        ToastManager.show('Aggiunto ai preferiti', 'success');
    }
    saveWishlist();
    render();
}

function applyFilters() {
    // Implementazione filtri avanzati
    const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
    const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;
    const inStock = document.getElementById('in-stock').checked;
    const inSale = document.getElementById('in-sale').checked;
    const rating4 = document.getElementById('rating-4').checked;
    
    // Applica filtri e renderizza prodotti
    console.log('Applying filters:', { minPrice, maxPrice, inStock, inSale, rating4 });
    ToastManager.show('Filtri applicati', 'success');
}

function resetFilters() {
    document.getElementById('min-price').value = '';
    document.getElementById('max-price').value = '';
    document.getElementById('in-stock').checked = true;
    document.getElementById('in-sale').checked = false;
    document.getElementById('rating-4').checked = false;
    ToastManager.show('Filtri resettati', 'info');
}

function subscribeNewsletter() {
    const email = event.target.querySelector('input[type="email"]').value;
    if (validateEmail(email)) {
        // Implementa logica newsletter
        ToastManager.show('Iscrizione alla newsletter completata!', 'success');
        event.target.reset();
    } else {
        ToastManager.show('Email non valida', 'error');
    }
}

function render() {
    const nameKey = lang === 'it' ? 'Nome' : `Nome_${lang.toUpperCase()}`;
    const categoryKey = lang === 'it' ? 'Categoria' : `Categoria_${lang.toUpperCase()}`;
    
    const activeProds = products.filter(p => p.Disponibile === 'SI' && !p.Disponibile?.includes('NO'));
    
    let filteredProducts = activeProds;
    
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredProducts = activeProds.filter(p => {
            const name = (p[nameKey] || p.Nome || '').toLowerCase();
            const category = (p[categoryKey] || p.Categoria || '').toLowerCase();
            const description = (p.Descrizione || '').toLowerCase();
            return name.includes(query) || category.includes(query) || description.includes(query);
        });
    }
    
    const featuredProducts = shuffleArray(filteredProducts.filter(p => p.Evidenza === 'SI' && p.StockNum > 0));
    originalFeatCount = featuredProducts.length;
    const fullFeatured = [...featuredProducts, ...featuredProducts.slice(0, 4)];
    
    const carouselTrack = document.getElementById('carousel-track');
    carouselTrack.innerHTML = fullFeatured.map(p => createCard(p, nameKey)).join('');
    
    updateCarouselButtons();
    
    const uniqueCategories = [...new Set(filteredProducts.map(p => p[categoryKey] || p.Categoria))];
    const shuffledCategories = shuffleArray(uniqueCategories);
    
    const categoryMenu = document.getElementById('category-menu');
    categoryMenu.innerHTML = shuffledCategories.map(cat => 
        `<a onclick="handleCategoryClick('cat-${cat.replace(/\s+/g, '')}')" role="menuitem">${cat}</a>`
    ).join('');
    
    const productsContainer = document.getElementById('negozio');
    
    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; grid-column: 1 / -1;">
                <h3 style="color: var(--text-primary);">${UI[lang].noResults}</h3>
            </div>
        `;
        return;
    }
    
    let html = '';
    
    if (currentView === 'all') {
        const shuffledProducts = shuffleArray(filteredProducts);
        html = `<div class="products-grid">${shuffledProducts.map(p => createCard(p, nameKey)).join('')}</div>`;
    } else {
        html = shuffledCategories.map(cat => {
            const categoryProducts = filteredProducts.filter(p => 
                (p[categoryKey] === cat || p.Categoria === cat)
            );
            if (categoryProducts.length === 0) return '';
            
            return `
                <div id="cat-${cat.replace(/\s+/g, '')}" style="margin-top: 40px; width: 100%;">
                    <h2 style="color: var(--color-primary); border-bottom: 2px solid var(--color-secondary); 
                                display: inline-block; font-size: 1.6rem; margin-bottom: 20px; padding-bottom: 10px;">
                        ${cat}
                    </h2>
                    <div class="category-products-grid">
                        ${categoryProducts.map(p => createCard(p, nameKey)).join('')}
                    </div>
                </div>
            `;
        }).join('');
    }
    
    productsContainer.innerHTML = html;
}

function updateCartUI() {
    const nameKey = lang === 'it' ? 'Nome' : `Nome_${lang.toUpperCase()}`;
    let subtotal = 0;
    
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = cart.map(item => {
        const product = products.find(p => p.ID == item.ID);
        if (!product) return '';
        
        const productName = item[nameKey] || item.Nome;
        const rowTotal = (parseFloat(item.Prezzo.replace(',', '.')) * item.qty).toFixed(2);
        subtotal += parseFloat(rowTotal);
        
        return `
            <div class="cart-item" role="listitem">
                <div class="cart-item-main">
                    <div class="cart-item-details">
                        <strong>${productName}</strong>
                        <small style="color: var(--text-secondary);">${UI[lang].maxQty}: ${product.StockNum}</small>
                    </div>
                    <div class="cart-item-actions">
                        <div class="qty-controls">
                            <button onclick="updateCartQty('${item.ID}', -1)" aria-label="${UI[lang].ariaDecrease} - ${productName}">-</button>
                            <span>${item.qty}</span>
                            <button onclick="updateCartQty('${item.ID}', 1)" aria-label="${UI[lang].ariaIncrease} - ${productName}">+</button>
                        </div>
                        <div class="cart-item-total">€ ${rowTotal}</div>
                    </div>
                </div>
                <button onclick="removeProduct('${item.ID}')" class="remove-btn" aria-label="${UI[lang].ariaRemove} - ${productName}">
                    <img src="assets/img/close-icon.svg" alt="Remove">
                </button>
            </div>
        `;
    }).join('');
    
    const country = document.getElementById('f-country').value;
    let shipping = 0;
    
    if (cart.length > 0) {
        shipping = country === "Italia" ? (subtotal >= 120 ? 0 : 13) : 50;
    }
    
    const total = (subtotal + shipping).toFixed(2);
    
    document.getElementById('shipping-info').textContent = `${UI[lang].ship} (${country}): € ${shipping.toFixed(2)}`;
    document.getElementById('cart-total-display').textContent = `${UI[lang].total}: € ${total}`;
    document.getElementById('cart-count').textContent = cart.reduce((sum, item) => sum + item.qty, 0);
}

function addToCart(id) {
    const product = products.find(p => p.ID == id);
    if (!product) return;
    
    const existingItem = cart.find(item => item.ID == id);
    
    if (existingItem) {
        if (existingItem.qty < product.StockNum) {
            existingItem.qty++;
            ToastManager.show(UI[lang].addToCart, 'success');
        } else {
            ToastManager.show(UI[lang].alertStock, 'warning');
            return;
        }
    } else {
        if (product.StockNum > 0) {
            cart.push({ ...product, qty: 1 });
            ToastManager.show(UI[lang].addToCart, 'success');
        }
    }
    
    saveCartUI();
    
    if (!document.getElementById('cart-panel').classList.contains('active')) {
        toggleCart();
    }
}

function removeProduct(id) {
    cart = cart.filter(item => item.ID !== id);
    ToastManager.show(UI[lang].removeFromCart, 'info');
    saveCartUI();
}

function emptyCart() {
    if (confirm(`${UI[lang].clear}?`)) {
        cart = [];
        ToastManager.show(UI[lang].cartCleared, 'info');
        saveCartUI();
    }
}

function updateCartQty(id, delta) {
    const item = cart.find(c => c.ID == id);
    const product = products.find(p => p.ID == id);
    
    if (item && product) {
        if (delta > 0 && item.qty >= product.StockNum) {
            ToastManager.show(UI[lang].alertStock, 'warning');
            return;
        }
        
        item.qty += delta;
        
        if (item.qty <= 0) {
            cart = cart.filter(c => c.ID !== id);
            ToastManager.show(UI[lang].removeFromCart, 'info');
        }
    }
    
    saveCartUI();
}

function saveCartUI() {
    StorageManager.set(CONFIG.cartKey, cart);
    updateCartUI();
}

function toggleCart() {
    const panel = document.getElementById('cart-panel');
    const overlay = document.getElementById('cart-overlay');
    
    panel.classList.toggle('active');
    overlay.classList.toggle('active');
    
    overlay.style.display = overlay.classList.contains('active') ? 'block' : 'none';
}

function switchView(view) {
    currentView = view;
    document.getElementById('btn-view-all').classList.toggle('active', view === 'all');
    document.getElementById('btn-view-cats').classList.toggle('active', view === 'cats');
    render();
}

function handleCategoryClick(id) {
    if (currentView !== 'cats') {
        switchView('cats');
    }
    
    setTimeout(() => {
        const target = document.getElementById(id);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.scrollBy(0, -120);
        }
    }, 100);
}

function scrollToProducts() {
    const productsSection = document.querySelector('.carousel-section');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function handleSearch(query) {
    searchQuery = query;
    render();
}

function moveCarousel(direction) {
    const track = document.getElementById('carousel-track');
    if (!track || track.children.length <= 1) return;
    
    const itemWidth = track.children[0].offsetWidth + 32;
    const visibleItems = Math.floor(track.parentElement.offsetWidth / itemWidth);
    const maxIndex = track.children.length - visibleItems;
    
    carouselIndex += direction;
    
    if (carouselIndex < 0) carouselIndex = 0;
    if (carouselIndex > maxIndex) carouselIndex = maxIndex;
    
    track.style.transform = `translateX(-${carouselIndex * itemWidth}px)`;
    updateCarouselButtons();
}

function updateCarouselButtons() {
    const track = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    const itemWidth = track.children[0].offsetWidth + 32;
    const visibleItems = Math.floor(track.parentElement.offsetWidth / itemWidth);
    const maxIndex = track.children.length - visibleItems;
    
    prevBtn.classList.toggle('disabled', carouselIndex === 0);
    nextBtn.classList.toggle('disabled', carouselIndex >= maxIndex);
}

function startCarousel() {
    setInterval(() => {
        const track = document.getElementById('carousel-track');
        if (!track || track.children.length <= 1) return;
        
        const itemWidth = track.children[0].offsetWidth + 32;
        const visibleItems = Math.floor(track.parentElement.offsetWidth / itemWidth);
        const maxIndex = track.children.length - visibleItems;
        
        carouselIndex++;
        if (carouselIndex > maxIndex) carouselIndex = 0;
        
        track.style.transform = `translateX(-${carouselIndex * itemWidth}px)`;
        updateCarouselButtons();
    }, 4000);
}

function openCheckout() {
    if (cart.length === 0) {
        ToastManager.show(UI[lang].alertEmpty, 'error');
        return;
    }
    
    const modal = document.getElementById('modal');
    modal.style.display = 'flex';
    modal.classList.add('active');
    
    document.getElementById('f-name').focus();
}

function closeCheckout() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    modal.classList.remove('active');
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(phone);
}

async function processOrder() {
    const name = document.getElementById('f-name').value.trim();
    const email = document.getElementById('f-email').value.trim();
    const phone = document.getElementById('f-phone').value.trim();
    const address = document.getElementById('f-addr').value.trim();
    
    if (!name || !email || !phone || !address) {
        ToastManager.show(UI[lang].requiredFields, 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        ToastManager.show(UI[lang].validEmail, 'error');
        return;
    }
    
    if (!validatePhone(phone)) {
        ToastManager.show(UI[lang].validPhone, 'error');
        return;
    }
    
    const totalDisplay = document.getElementById('cart-total-display').textContent.split('€')[1].trim();
    const orderId = "GZ-" + Date.now().toString().slice(-6);
    
    const detailRows = cart.map(item => 
        `${item.qty}x ${item.Nome} (€ ${item.Prezzo}) = € ${(parseFloat(item.Prezzo.replace(',', '.')) * item.qty).toFixed(2)}`
    );
    
    try {
        const formData = new URLSearchParams({
            'entry.442927045': orderId,
            'entry.333212320': name,
            'entry.1385104048': email,
            'entry.844983788': phone,
            'entry.334440207': address,
            'entry.1856379113': detailRows.join(" | "),
            'entry.146792905': totalDisplay
        });
        
        await fetch(CONFIG.formURL, {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        });
        
        closeCheckout();
        
        const thanksPopup = document.getElementById('thanks-popup');
        thanksPopup.style.display = 'flex';
        thanksPopup.classList.add('active');
        
        const whatsappMessage = `*ORDINE ${orderId}*\n\n*CLIENTE:* ${name}\n*EMAIL:* ${email}\n*TEL:* ${phone}\n*INDIRIZZO:* ${address}\n\n${detailRows.join("\n")}\n\n*TOTALE:* € ${totalDisplay}`;
        
        window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
        
    } catch (error) {
        console.error('Error processing order:', error);
        ToastManager.show(UI[lang].orderError, 'error');
    }
}

function clearAndReload() {
    StorageManager.remove(CONFIG.cartKey);
    location.reload();
}

function hideLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
        setTimeout(() => loadingOverlay.style.display = 'none', 500);
    }
}

document.addEventListener('DOMContentLoaded', load);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCheckout();
        if (document.getElementById('cart-panel').classList.contains('active')) {
            toggleCart();
        }
    }
});

// Funzione per mostrare GDPR banner (da implementare in futuro)
function showGDPRBanner() {
    const gdprBanner = document.createElement('div');
    gdprBanner.id = 'gdpr-banner';
    gdprBanner.innerHTML = `
        <div class="gdpr-content">
            <p>Questo sito utilizza cookie per migliorare la tua esperienza. Continuando a navigare accetti la nostra politica sui cookie.</p>
            <div class="gdpr-buttons">
                <button onclick="acceptCookies()" class="btn-gdpr">Accetta</button>
                <button onclick="showCookiePolicy()" class="btn-gdpr-secondary">Informazioni</button>
            </div>
        </div>
    `;
    document.body.appendChild(gdprBanner);
}

function acceptCookies() {
    StorageManager.set('gdpr_accepted', true);
    document.getElementById('gdpr-banner').style.display = 'none';
}

function showCookiePolicy() {
    // Mostra policy dettagliata in un modal
}

// Controlla se il banner GDPR deve essere mostrato
function checkGDPR() {
    const gdprAccepted = StorageManager.get('gdpr_accepted');
    if (!gdprAccepted) {
        setTimeout(() => showGDPRBanner(), 2000);
    }
}