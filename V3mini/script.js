/* ========================================
   CONFIGURAZIONE
   ======================================== */
const CONFIG = {
    catalog: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRIumwZulbMAuesmG69DB8Y1bx2Y-NQXfyG7_m1-rdpZ-SoOxM0JyZtnj0_eV_K4t4drULTwV44nE5Y/pub?gid=0&single=true&output=csv",
    formURL: "https://docs.google.com/forms/d/e/1FAIpQLSend7KPNCjTNP1d-B3zd-wvhZAVXLS3P7341yN88fm3d7D4Jw/formResponse",
    wa: "393667540018",
    loadingTimeout: 8000,
    supportedLanguages: ['it', 'en', 'de', 'hu'],
    defaultLanguage: 'it'
};

/* ========================================
   TRADUZIONI INCORPORATE (Fallback)
   ======================================== */
const TRANSLATIONS = {
    it: {
        meta: { code: "it", name: "Italiano", flag: "🇮🇹" },
        hero: {
            h1: "L'Oro del Cilento,<br>a casa tua.",
            p: "Eccellenza gastronomica dal cuore del Parco Nazionale. Prodotti autentici, tradizione e sapore.",
            badge: "✨ Qualità Cilentana",
            cta: "Scopri i Prodotti"
        },
        nav: {
            shipping: "Spedizione GRATUITA per ordini oltre €120",
            searchPlaceholder: "Cerca olio, pasta, vino..."
        },
        products: {
            deals: "Offerte del Momento",
            all: "Tutti i Prodotti",
            byCat: "Per Categoria",
            viewAll: "Vedi tutti",
            add: "Aggiungi",
            added: "Aggiunto!",
            out: "Esaurito",
            low: "Ultimi pezzi!",
            ok: "Disponibile",
            noResults: "Nessun prodotto trovato",
            tryAgain: "Prova con altre parole chiave"
        },
        cart: {
            title: "🛒 Il Tuo Carrello",
            empty: "Il tuo carrello è vuoto",
            emptyDesc: "Esplora i nostri prodotti e trova qualcosa di speciale!",
            clear: "Svuota Carrello",
            shipping: "Spedizione",
            freeShipping: "GRATIS",
            total: "Totale",
            checkout: "Prosegui all'Ordine"
        },
        checkout: {
            title: "Dati di Spedizione",
            subtitle: "Inserisci i tuoi dati per completare l'ordine",
            name: "Nome e Cognome",
            namePlaceholder: "Mario Rossi",
            email: "Email",
            emailPlaceholder: "mario@email.com",
            phone: "Telefono",
            phonePlaceholder: "+39 333 1234567",
            address: "Indirizzo completo",
            addressPlaceholder: "Via Roma 1, 00100 Roma",
            addressHint: "Via, numero civico, CAP e città",
            destination: "Destinazione",
            italy: "🇮🇹 Italia",
            europe: "🇪🇺 Europa (UE)",
            confirm: "Conferma Ordine"
        },
        thanks: {
            title: "Grazie!",
            message: "Il tuo ordine è stato inviato con successo.",
            contact: "Ti contatteremo presto via WhatsApp.",
            back: "Torna al Sito"
        },
        toast: {
            cartAdd: "Aggiunto al carrello",
            cartRemove: "Rimosso dal carrello",
            cartEmpty: "Carrello svuotato",
            maxStock: "Quantità massima raggiunta",
            maxStockDesc: "Non puoi aggiungere altri pezzi di questo prodotto",
            searchResults: "risultati trovati"
        },
        confirm: {
            emptyTitle: "Svuotare il carrello?",
            emptyMsg: "Tutti i prodotti verranno rimossi dal carrello.",
            removeTitle: "Rimuovere prodotto?",
            cancel: "Annulla",
            ok: "Conferma",
            delete: "Rimuovi"
        },
        errors: {
            empty: "Carrello vuoto",
            emptyDesc: "Aggiungi qualche prodotto prima di procedere",
            form: "Compila tutti i campi",
            formDesc: "Alcuni campi obbligatori sono vuoti",
            email: "Email non valida",
            emailDesc: "Controlla il formato dell'email",
            load: "Errore di caricamento",
            loadDesc: "Impossibile caricare i prodotti. Ricarica la pagina."
        },
        loading: {
            text: "Caricamento...",
            products: "Preparando i migliori prodotti del Cilento..."
        },
        gdpr: {
            title: "Privacy & Cookie Policy",
            message: "Utilizziamo cookie per offrirti la migliore esperienza.",
            accept: "Accetta Tutto",
            decline: "Rifiuta"
        },
        footer: {
            about: "Eccellenze gastronomiche dal Parco Nazionale del Cilento.",
            tradition: "Tradizione dal 1980",
            categories: "Categorie",
            catOil: "Olio d'Oliva",
            catConserves: "Conserve",
            catPasta: "Pasta Artigianale",
            catWine: "Vini Locali",
            support: "Assistenza",
            contact: "Contattaci",
            shippingInfo: "Spedizioni",
            returns: "Resi e Rimborsi",
            faq: "FAQ",
            contactTitle: "Contatti"
        }
    },
    en: {
        meta: { code: "en", name: "English", flag: "🇬🇧" },
        hero: {
            h1: "Cilento's Gold,<br>at your home.",
            p: "Gastronomic excellence from the National Park. Authentic products, tradition and flavor.",
            badge: "✨ Cilento Quality",
            cta: "Shop Now"
        },
        nav: {
            shipping: "FREE Shipping on orders over €120",
            searchPlaceholder: "Search olive oil, pasta, wine..."
        },
        products: {
            deals: "Today's Deals",
            all: "All Products",
            byCat: "By Category",
            viewAll: "View all",
            add: "Add to Cart",
            added: "Added!",
            out: "Out of Stock",
            low: "Last pieces!",
            ok: "In Stock",
            noResults: "No products found",
            tryAgain: "Try different keywords"
        },
        cart: {
            title: "🛒 Your Cart",
            empty: "Your cart is empty",
            emptyDesc: "Explore our products and find something special!",
            clear: "Empty Cart",
            shipping: "Shipping",
            freeShipping: "FREE",
            total: "Total",
            checkout: "Proceed to Checkout"
        },
        checkout: {
            title: "Shipping Details",
            subtitle: "Enter your details to complete the order",
            name: "Full Name",
            namePlaceholder: "John Doe",
            email: "Email",
            emailPlaceholder: "john@email.com",
            phone: "Phone",
            phonePlaceholder: "+39 333 1234567",
            address: "Full Address",
            addressPlaceholder: "123 Main St, 00100 Rome",
            addressHint: "Street, number, ZIP and city",
            destination: "Destination",
            italy: "🇮🇹 Italy",
            europe: "🇪🇺 Europe (EU)",
            confirm: "Confirm Order"
        },
        thanks: {
            title: "Thank You!",
            message: "Your order has been sent successfully.",
            contact: "We'll contact you soon via WhatsApp.",
            back: "Back to Shop"
        },
        toast: {
            cartAdd: "Added to cart",
            cartRemove: "Removed from cart",
            cartEmpty: "Cart emptied",
            maxStock: "Maximum quantity reached",
            maxStockDesc: "Cannot add more of this product",
            searchResults: "results found"
        },
        confirm: {
            emptyTitle: "Empty cart?",
            emptyMsg: "All products will be removed from the cart.",
            removeTitle: "Remove product?",
            cancel: "Cancel",
            ok: "Confirm",
            delete: "Remove"
        },
        errors: {
            empty: "Empty cart",
            emptyDesc: "Add some products before proceeding",
            form: "Fill all fields",
            formDesc: "Some required fields are empty",
            email: "Invalid email",
            emailDesc: "Check the email format",
            load: "Loading error",
            loadDesc: "Unable to load products. Reload the page."
        },
        loading: {
            text: "Loading...",
            products: "Preparing the best products from Cilento..."
        },
        gdpr: {
            title: "Privacy & Cookie Policy",
            message: "We use cookies to offer you the best experience.",
            accept: "Accept All",
            decline: "Decline"
        },
        footer: {
            about: "Gastronomic excellence from Cilento National Park.",
            tradition: "Tradition since 1980",
            categories: "Categories",
            catOil: "Olive Oil",
            catConserves: "Preserves",
            catPasta: "Artisan Pasta",
            catWine: "Local Wines",
            support: "Support",
            contact: "Contact Us",
            shippingInfo: "Shipping",
            returns: "Returns & Refunds",
            faq: "FAQ",
            contactTitle: "Contact"
        }
    },
    de: {
        meta: { code: "de", name: "Deutsch", flag: "🇩🇪" },
        hero: {
            h1: "Cilento Gold,<br>zu Ihnen nach Hause.",
            p: "Kulinarische Exzellenz aus dem Nationalpark. Authentische Produkte, Tradition und Geschmack.",
            badge: "✨ Cilento Qualität",
            cta: "Jetzt Kaufen"
        },
        nav: {
            shipping: "KOSTENLOSER Versand ab €120",
            searchPlaceholder: "Suche Olivenöl, Pasta, Wein..."
        },
        products: {
            deals: "Aktuelle Angebote",
            all: "Alle Produkte",
            byCat: "Nach Kategorie",
            viewAll: "Alle anzeigen",
            add: "In den Warenkorb",
            added: "Hinzugefügt!",
            out: "Ausverkauft",
            low: "Letzte Stücke!",
            ok: "Verfügbar",
            noResults: "Keine Produkte gefunden",
            tryAgain: "Versuchen Sie andere Suchbegriffe"
        },
        cart: {
            title: "🛒 Ihr Warenkorb",
            empty: "Ihr Warenkorb ist leer",
            emptyDesc: "Entdecken Sie unsere Produkte!",
            clear: "Warenkorb leeren",
            shipping: "Versand",
            freeShipping: "KOSTENLOS",
            total: "Gesamt",
            checkout: "Zur Kasse"
        },
        checkout: {
            title: "Versanddetails",
            subtitle: "Geben Sie Ihre Daten ein",
            name: "Vollständiger Name",
            namePlaceholder: "Max Mustermann",
            email: "E-Mail",
            emailPlaceholder: "max@email.com",
            phone: "Telefon",
            phonePlaceholder: "+49 123 4567890",
            address: "Vollständige Adresse",
            addressPlaceholder: "Hauptstraße 1, 10115 Berlin",
            addressHint: "Straße, Hausnummer, PLZ und Stadt",
            destination: "Ziel",
            italy: "🇮🇹 Italien",
            europe: "🇪🇺 Europa (EU)",
            confirm: "Bestellung bestätigen"
        },
        thanks: {
            title: "Vielen Dank!",
            message: "Ihre Bestellung wurde erfolgreich gesendet.",
            contact: "Wir kontaktieren Sie bald per WhatsApp.",
            back: "Zurück zum Shop"
        },
        toast: {
            cartAdd: "Zum Warenkorb hinzugefügt",
            cartRemove: "Aus Warenkorb entfernt",
            cartEmpty: "Warenkorb geleert",
            maxStock: "Maximale Menge erreicht",
            maxStockDesc: "Keine weiteren Stücke verfügbar",
            searchResults: "Ergebnisse gefunden"
        },
        confirm: {
            emptyTitle: "Warenkorb leeren?",
            emptyMsg: "Alle Produkte werden entfernt.",
            removeTitle: "Produkt entfernen?",
            cancel: "Abbrechen",
            ok: "Bestätigen",
            delete: "Entfernen"
        },
        errors: {
            empty: "Warenkorb leer",
            emptyDesc: "Fügen Sie Produkte hinzu",
            form: "Alle Felder ausfüllen",
            formDesc: "Einige Pflichtfelder sind leer",
            email: "Ungültige E-Mail",
            emailDesc: "Überprüfen Sie das E-Mail-Format",
            load: "Ladefehler",
            loadDesc: "Produkte konnten nicht geladen werden."
        },
        loading: {
            text: "Laden...",
            products: "Die besten Produkte werden vorbereitet..."
        },
        gdpr: {
            title: "Datenschutz & Cookie-Richtlinie",
            message: "Wir verwenden Cookies für die beste Erfahrung.",
            accept: "Alle akzeptieren",
            decline: "Ablehnen"
        },
        footer: {
            about: "Kulinarische Exzellenz aus dem Nationalpark Cilento.",
            tradition: "Tradition seit 1980",
            categories: "Kategorien",
            catOil: "Olivenöl",
            catConserves: "Konserven",
            catPasta: "Handgemachte Pasta",
            catWine: "Lokale Weine",
            support: "Hilfe",
            contact: "Kontakt",
            shippingInfo: "Versand",
            returns: "Rückgabe",
            faq: "FAQ",
            contactTitle: "Kontakt"
        }
    },
    hu: {
        meta: { code: "hu", name: "Magyar", flag: "🇭🇺" },
        hero: {
            h1: "Cilento Aranya,<br>az otthonába.",
            p: "Gasztronómiai kiválóság a Nemzeti Parkból. Autentikus termékek, hagyomány és íz.",
            badge: "✨ Cilento Minőség",
            cta: "Vásárlás Most"
        },
        nav: {
            shipping: "INGYENES szállítás €120 felett",
            searchPlaceholder: "Keresés olívaolaj, tészta, bor..."
        },
        products: {
            deals: "Mai Akciók",
            all: "Összes Termék",
            byCat: "Kategóriák",
            viewAll: "Összes",
            add: "Kosárba",
            added: "Hozzáadva!",
            out: "Elfogyott",
            low: "Utolsó darabok!",
            ok: "Raktáron",
            noResults: "Nincs találat",
            tryAgain: "Próbáljon más kulcsszavakat"
        },
        cart: {
            title: "🛒 Az Ön Kosara",
            empty: "A kosár üres",
            emptyDesc: "Fedezze fel termékeinket!",
            clear: "Kosár ürítése",
            shipping: "Szállítás",
            freeShipping: "INGYENES",
            total: "Összesen",
            checkout: "Tovább a fizetéshez"
        },
        checkout: {
            title: "Szállítási adatok",
            subtitle: "Adja meg adatait",
            name: "Teljes név",
            namePlaceholder: "Kovács János",
            email: "E-mail",
            emailPlaceholder: "janos@email.com",
            phone: "Telefon",
            phonePlaceholder: "+36 30 123 4567",
            address: "Teljes cím",
            addressPlaceholder: "Fő utca 1, 1000 Budapest",
            addressHint: "Utca, házszám, irányítószám",
            destination: "Cél",
            italy: "��🇹 Olaszország",
            europe: "🇪🇺 Európa (EU)",
            confirm: "Rendelés megerősítése"
        },
        thanks: {
            title: "Köszönjük!",
            message: "Rendelését sikeresen elküldtük.",
            contact: "Hamarosan felvesszük a kapcsolatot.",
            back: "Vissza a boltba"
        },
        toast: {
            cartAdd: "Kosárba helyezve",
            cartRemove: "Eltávolítva",
            cartEmpty: "Kosár kiürítve",
            maxStock: "Maximális mennyiség",
            maxStockDesc: "Nem adható hozzá több",
            searchResults: "találat"
        },
        confirm: {
            emptyTitle: "Kosár ürítése?",
            emptyMsg: "Minden termék törlésre kerül.",
            removeTitle: "Termék eltávolítása?",
            cancel: "Mégse",
            ok: "Megerősítés",
            delete: "Eltávolítás"
        },
        errors: {
            empty: "Üres kosár",
            emptyDesc: "Adjon hozzá termékeket",
            form: "Töltse ki az összes mezőt",
            formDesc: "Néhány mező üres",
            email: "Érvénytelen e-mail",
            emailDesc: "Ellenőrizze a formátumot",
            load: "Betöltési hiba",
            loadDesc: "Nem sikerült betölteni."
        },
        loading: {
            text: "Betöltés...",
            products: "A legjobb termékek előkészítése..."
        },
        gdpr: {
            title: "Adatvédelem és Cookie",
            message: "Cookie-kat használunk a legjobb élményért.",
            accept: "Elfogadás",
            decline: "Elutasítás"
        },
        footer: {
            about: "Gasztronómiai kiválóság a Cilento Nemzeti Parkból.",
            tradition: "Hagyomány 1980 óta",
            categories: "Kategóriák",
            catOil: "Olívaolaj",
            catConserves: "Konzervek",
            catPasta: "Kézműves tészta",
            catWine: "Helyi borok",
            support: "Támogatás",
            contact: "Kapcsolat",
            shippingInfo: "Szállítás",
            returns: "Visszaküldés",
            faq: "GYIK",
            contactTitle: "Elérhetőség"
        }
    }
};

/* ========================================
   STATO GLOBALE
   ======================================== */
const state = {
    products: [],
    cart: [],
    lang: CONFIG.defaultLanguage,
    view: 'all',
    carouselIndex: 0,
    searchQuery: '',
    isLoading: true,
    confirmCallback: null,
    currentCategories: []
};

/* ========================================
   SISTEMA TRADUZIONI
   ======================================== */
const i18n = {
    // Ottieni traduzione con chiave annidata (es: "hero.h1")
    t(key, fallback = '') {
        const keys = key.split('.');
        let value = TRANSLATIONS[state.lang];
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                // Fallback alla lingua default
                value = TRANSLATIONS[CONFIG.defaultLanguage];
                for (const k2 of keys) {
                    if (value && typeof value === 'object' && k2 in value) {
                        value = value[k2];
                    } else {
                        return fallback || key;
                    }
                }
                break;
            }
        }
        
        return value || fallback || key;
    }
};

// Shortcut per traduzione
const t = (key, fallback) => i18n.t(key, fallback);

/* ========================================
   UTILITY
   ======================================== */
const Utils = {
    shuffle(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    },
    
    debounce(fn, delay) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), delay);
        };
    },
    
    formatPrice(price) {
        const num = typeof price === 'string' ? parseFloat(price.replace(',', '.')) : price;
        return num.toFixed(2);
    },
    
    scrollTo(id, offset = 0) {
        const el = document.getElementById(id);
        if (el) {
            const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    },
    
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    
    generateOrderId() {
        return 'GZ-' + Date.now().toString().slice(-6);
    }
};

/* ========================================
   TOAST SYSTEM
   ======================================== */
const Toast = {
    container: null,
    
    init() {
        this.container = document.getElementById('toast-container');
    },
    
    show(type, title, message, duration = 4000) {
        if (!this.container) this.init();
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };
        
        toast.innerHTML = `
            <div class="toast-icon">${icons[type] || 'ℹ'}</div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                ${message ? `<div class="toast-message">${message}</div>` : ''}
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()">×</button>
            <div class="toast-progress" style="animation-duration: ${duration}ms"></div>
        `;
        
        this.container.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('show'));
        
        const timer = setTimeout(() => this.remove(toast), duration);
        toast.dataset.timer = timer;
    },
    
    remove(toast) {
        if (!toast || !toast.parentElement) return;
        clearTimeout(toast.dataset.timer);
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 300);
    },
    
    success(title, message) { this.show('success', title, message); },
    error(title, message) { this.show('error', title, message, 5000); },
    warning(title, message) { this.show('warning', title, message); },
    info(title, message) { this.show('info', title, message, 3000); }
};

/* ========================================
   CONFIRM MODAL
   ======================================== */
const Confirm = {
    show(options) {
        const { title, message, onConfirm, type = 'warning', confirmText, cancelText } = options;
        
        const modal = document.getElementById('confirm-modal');
        const iconEl = document.getElementById('confirm-icon');
        const titleEl = document.getElementById('confirm-title');
        const msgEl = document.getElementById('confirm-message');
        const okBtn = document.getElementById('confirm-ok');
        const cancelBtn = document.getElementById('confirm-cancel');
        
        const icons = { warning: '⚠️', danger: '🗑️', success: '✓', info: 'ℹ️', question: '❓' };
        
        iconEl.className = `confirm-icon ${type}`;
        iconEl.textContent = icons[type] || '❓';
        titleEl.textContent = title;
        msgEl.textContent = message;
        
        cancelBtn.textContent = cancelText || t('confirm.cancel');
        okBtn.textContent = confirmText || t('confirm.ok');
        okBtn.className = `confirm-btn confirm ${type === 'danger' ? 'danger' : ''}`;
        
        state.confirmCallback = onConfirm;
        
        okBtn.onclick = () => {
            this.close();
            if (state.confirmCallback) state.confirmCallback();
        };
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        okBtn.focus();
    },
    
    close() {
        document.getElementById('confirm-modal').classList.remove('active');
        document.body.style.overflow = '';
        state.confirmCallback = null;
    }
};

/* ========================================
   LOADER
   ======================================== */
const Loader = {
    element: null,
    textElement: null,
    timeout: null,
    
    init() {
        this.element = document.getElementById('loading-screen');
        this.textElement = document.getElementById('loading-text');
    },
    
    show(text) {
        if (!this.element) this.init();
        if (this.textElement && text) this.textElement.textContent = text;
        this.element.style.display = 'flex';
        this.element.classList.remove('hidden');
        this.timeout = setTimeout(() => this.hide(), CONFIG.loadingTimeout);
    },
    
    hide() {
        if (!this.element) this.init();
        clearTimeout(this.timeout);
        this.element.classList.add('hidden');
        setTimeout(() => {
            if (this.element) this.element.style.display = 'none';
        }, 500);
        state.isLoading = false;
    }
};

/* ========================================
   THEME
   ======================================== */
const Theme = {
    init() {
        const saved = localStorage.getItem('gizzi_theme') || 'light';
        document.documentElement.setAttribute('data-theme', saved);
    },
    
    toggle() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('gizzi_theme', next);
        Toast.info(next === 'dark' ? '🌙' : '☀️', next === 'dark' ? 'Tema scuro' : 'Tema chiaro');
    }
};

/* ========================================
   GDPR
   ======================================== */
const GDPR = {
    check() {
        if (!localStorage.getItem('gizzi_gdpr')) {
            setTimeout(() => {
                document.getElementById('gdpr-banner')?.classList.add('active');
            }, 2500);
        }
    },
    
    accept() {
        localStorage.setItem('gizzi_gdpr', 'accepted');
        document.getElementById('gdpr-banner')?.classList.remove('active');
        Toast.success('✓', 'Preferenze salvate');
    },
    
    reject() {
        localStorage.setItem('gizzi_gdpr', 'declined');
        document.getElementById('gdpr-banner')?.classList.remove('active');
    }
};

/* ========================================
   CART
   ======================================== */
const Cart = {
    load() {
        try {
            const saved = localStorage.getItem('gizzi_cart');
            if (saved) state.cart = JSON.parse(saved);
        } catch (e) {
            state.cart = [];
        }
    },
    
    save() {
        localStorage.setItem('gizzi_cart', JSON.stringify(state.cart));
    },
    
    add(productId) {
        const product = state.products.find(p => p.ID === productId);
        if (!product) return;
        
        const existing = state.cart.find(c => c.ID === productId);
        const nameKey = state.lang === 'it' ? 'Nome' : `Nome_${state.lang.toUpperCase()}`;
        const productName = product[nameKey] || product.Nome;
        
        if (existing) {
            if (existing.qty < product.StockNum) {
                existing.qty++;
                Toast.success(t('toast.cartAdd'), `${productName} (${existing.qty}x)`);
            } else {
                Toast.warning(t('toast.maxStock'), t('toast.maxStockDesc'));
                return;
            }
        } else {
            if (product.StockNum > 0) {
                state.cart.push({ ...product, qty: 1 });
                Toast.success(t('toast.cartAdd'), productName);
            }
        }
        
        this.animateButton(productId);
        this.save();
        this.updateUI();
        
        const panel = document.getElementById('cart-panel');
        if (!panel.classList.contains('active')) {
            this.toggle();
        }
    },
    
    animateButton(productId) {
        const btn = document.getElementById(`btn-add-${productId}`);
        if (!btn) return;
        
        btn.classList.add('added');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg><span>${t('products.added')}</span>`;
        
        setTimeout(() => {
            btn.classList.remove('added');
            btn.innerHTML = originalHTML;
        }, 1500);
    },
    
    remove(productId) {
        const item = state.cart.find(c => c.ID === productId);
        if (!item) return;
        
        const nameKey = state.lang === 'it' ? 'Nome' : `Nome_${state.lang.toUpperCase()}`;
        const productName = item[nameKey] || item.Nome;
        
        state.cart = state.cart.filter(c => c.ID !== productId);
        this.save();
        this.updateUI();
        
        Toast.info(t('toast.cartRemove'), productName);
    },
    
    confirmRemove(productId) {
        const item = state.cart.find(c => c.ID === productId);
        if (!item) return;
        
        const nameKey = state.lang === 'it' ? 'Nome' : `Nome_${state.lang.toUpperCase()}`;
        const productName = item[nameKey] || item.Nome;
        
        Confirm.show({
            title: t('confirm.removeTitle'),
            message: `"${productName}"`,
            type: 'danger',
            confirmText: t('confirm.delete'),
            onConfirm: () => this.removeByZeroQty(productId)
        });
    },
    
    removeByZeroQty(productId) {
        // Porta la quantità a 0 per rimuovere il prodotto (come il tasto -)
        const item = state.cart.find(c => c.ID === productId);
        if (!item) return;
        
        item.qty = 0;
        state.cart = state.cart.filter(c => c.qty > 0);
        this.save();
        this.updateUI();
        
        const nameKey = state.lang === 'it' ? 'Nome' : `Nome_${state.lang.toUpperCase()}`;
        const productName = item[nameKey] || item.Nome;
        Toast.info(t('toast.cartRemove'), productName);
    },
    
    updateQty(productId, delta) {
        const item = state.cart.find(c => c.ID === productId);
        const product = state.products.find(p => p.ID === productId);
        
        if (!item || !product) return;
        
        if (delta > 0 && item.qty >= product.StockNum) {
            Toast.warning(t('toast.maxStock'), t('toast.maxStockDesc'));
            return;
        }
        
        item.qty += delta;
        
        if (item.qty <= 0) {
            state.cart = state.cart.filter(c => c.ID !== productId);
        }
        
        this.save();
        this.updateUI();
    },
    
    confirmEmpty() {
        if (state.cart.length === 0) return;
        
        Confirm.show({
            title: t('confirm.emptyTitle'),
            message: t('confirm.emptyMsg'),
            type: 'danger',
            confirmText: t('cart.clear'),
            onConfirm: () => this.emptyByZeroQty()
        });
    },
    
    emptyByZeroQty() {
        // Porta tutte le quantità a 0 per rimuovere tutti i prodotti
        state.cart.forEach(item => {
            item.qty = 0;
        });
        // Filtra via tutti i prodotti con quantità 0
        state.cart = state.cart.filter(c => c.qty > 0);
        this.save();
        this.updateUI();
        Toast.info(t('toast.cartEmpty'));
    },
    
    empty() {
        state.cart = [];
        this.save();
        this.updateUI();
        Toast.info(t('toast.cartEmpty'));
    },
    
    toggle() {
        const panel = document.getElementById('cart-panel');
        const overlay = document.getElementById('cart-overlay');
        
        const isOpen = panel.classList.toggle('active');
        overlay.style.display = isOpen ? 'block' : 'none';
        document.body.style.overflow = isOpen ? 'hidden' : '';
    },
    
    getTotal() {
        return state.cart.reduce((sum, item) => {
            return sum + (parseFloat(item.Prezzo.replace(',', '.')) * item.qty);
        }, 0);
    },
    
    getShipping(subtotal) {
        const country = document.getElementById('f-country')?.value || 'Italia';
        if (state.cart.length === 0) return 0;
        return country === 'Italia' ? (subtotal >= 120 ? 0 : 13) : 50;
    },
    
    updateUI() {
        const nameKey = state.lang === 'it' ? 'Nome' : `Nome_${state.lang.toUpperCase()}`;
        const cartItems = document.getElementById('cart-items');
        const checkoutBtn = document.getElementById('btn-checkout');
        const countEl = document.getElementById('cart-count');
        
        if (state.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="cart-empty">
                    <div class="cart-empty-icon">🛒</div>
                    <p class="cart-empty-title">${t('cart.empty')}</p>
                    <p class="cart-empty-desc">${t('cart.emptyDesc')}</p>
                </div>
            `;
            checkoutBtn.disabled = true;
        } else {
            cartItems.innerHTML = state.cart.map(item => {
                const product = state.products.find(p => p.ID === item.ID);
                const itemTotal = parseFloat(item.Prezzo.replace(',', '.')) * item.qty;
                const productName = item[nameKey] || item.Nome;
                
                return `
                    <div class="cart-item" data-id="${item.ID}">
                        <img class="cart-item-img" src="${item.Immagine}" alt="${productName}" 
                             onerror="this.src='https://via.placeholder.com/60x60?text=📦'">
                        <div class="cart-item-info">
                            <div class="cart-item-name">${productName}</div>
                            <div class="cart-item-meta">€${item.Prezzo} × ${item.qty}</div>
                        </div>
                        <div class="qty-controls">
                            <button class="qty-btn qty-minus" onclick="Cart.updateQty('${item.ID}', -1)">−</button>
                            <span class="qty-value">${item.qty}</span>
                            <button class="qty-btn qty-plus" onclick="Cart.updateQty('${item.ID}', 1)" ${item.qty >= product?.StockNum ? 'disabled' : ''}>+</button>
                        </div>
                        <div class="cart-item-price">€${Utils.formatPrice(itemTotal)}</div>
                        <a href="javascript:void(0)" class="cart-item-remove" onclick="confirmRemoveCartItem('${item.ID}'); return false;" title="${t('confirm.delete')}">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </a>
                    </div>
                `;
            }).join('');
            checkoutBtn.disabled = false;
        }
        
        const subtotal = this.getTotal();
        const shipping = this.getShipping(subtotal);
        const isFreeShipping = shipping === 0 && state.cart.length > 0;
        
        document.getElementById('shipping-label').textContent = t('cart.shipping');
        const shippingValue = document.getElementById('shipping-value');
        shippingValue.textContent = isFreeShipping ? t('cart.freeShipping') : `€${Utils.formatPrice(shipping)}`;
        shippingValue.className = isFreeShipping ? 'free-shipping' : '';
        
        document.getElementById('total-label').textContent = t('cart.total');
        document.getElementById('total-value').textContent = `€${Utils.formatPrice(subtotal + shipping)}`;
        
        const newCount = state.cart.reduce((a, b) => a + b.qty, 0);
        if (parseInt(countEl.textContent) !== newCount) {
            countEl.textContent = newCount;
            countEl.classList.add('bump');
            setTimeout(() => countEl.classList.remove('bump'), 300);
        }
    }
};

/* ========================================
   PRODUCTS
   ======================================== */
const Products = {
    async load() {
        Loader.show(t('loading.products'));
        
        console.log('[DEBUG] Products.load() - Inizio caricamento');
        console.log('[DEBUG] Config catalog URL:', CONFIG.catalog);
        
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), CONFIG.loadingTimeout - 1000);
            
            console.log('[DEBUG] Fetching catalog...');
            const res = await fetch(CONFIG.catalog, { signal: controller.signal });
            clearTimeout(timeoutId);
            
            console.log('[DEBUG] Response status:', res.status, res.ok);
            
            const text = await res.text();
            console.log('[DEBUG] Response text length:', text.length);
            console.log('[DEBUG] First 200 chars:', text.substring(0, 200));
            
            const rows = text.split('\n').filter(r => r.trim());
            console.log('[DEBUG] Total rows:', rows.length);
            
            if (rows.length === 0) {
                console.error('[DEBUG] ERROR: No rows found in CSV');
                throw new Error('CSV vuoto');
            }
            
            const headers = rows[0].split(',').map(h => h.trim());
            console.log('[DEBUG] Headers:', headers);
            
            state.products = rows.slice(1).map((row, index) => {
                const cols = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
                const obj = {};
                headers.forEach((h, i) => obj[h] = cols[i]?.replace(/"/g, '').trim());
                const stockVal = obj.Stock || obj.Quantità || obj.stock;
                obj.StockNum = stockVal === '' || stockVal === undefined ? 999 : parseInt(stockVal);
                
                if (index < 3) {
                    console.log(`[DEBUG] Product ${index}:`, obj);
                }
                
                return obj;
            });
            
            console.log('[DEBUG] Total products parsed:', state.products.length);
            console.log('[DEBUG] Sample product:', state.products[0]);
            
            return true;
        } catch (error) {
            console.error('[DEBUG] Error loading products:', error);
            console.error('[DEBUG] Error name:', error.name);
            console.error('[DEBUG] Error message:', error.message);
            Toast.error(t('errors.load'), t('errors.loadDesc'));
            return false;
        }
    },
    
    getActive() {
        console.log('[DEBUG] Products.getActive() - Total products:', state.products.length);
        
        let products = state.products.filter(p => {
            const isAvailable = p.Disponibile === 'SI';
            if (!isAvailable && state.products.length < 5) {
                console.log('[DEBUG] Product filtered out (not available):', p.Nome, 'Disponibile:', p.Disponibile);
            }
            return isAvailable;
        });
        
        console.log('[DEBUG] Products.getActive() - Available products:', products.length);
        
        if (state.searchQuery) {
            const q = state.searchQuery.toLowerCase();
            const nameKey = state.lang === 'it' ? 'Nome' : `Nome_${state.lang.toUpperCase()}`;
            const catKey = state.lang === 'it' ? 'Categoria' : `Categoria_${state.lang.toUpperCase()}`;
            
            products = products.filter(p =>
                (p[nameKey] || p.Nome).toLowerCase().includes(q) ||
                (p[catKey] || p.Categoria).toLowerCase().includes(q)
            );
        }
        
        return products;
    },
    
    getFeatured() {
        const active = this.getActive();
        const featured = active.filter(p => p.Evidenza === 'SI' && p.StockNum > 0);
        console.log('[DEBUG] Products.getFeatured() - Featured count:', featured.length, 'of', active.length);
        return Utils.shuffle(featured);
    },
    
    getCategories() {
        const active = this.getActive();
        const catKey = state.lang === 'it' ? 'Categoria' : `Categoria_${state.lang.toUpperCase()}`;
        const categories = [...new Set(active.map(p => p[catKey] || p.Categoria))].filter(Boolean);
        console.log('[DEBUG] Products.getCategories() - Categories:', categories);
        return categories;
    },
    
    createCard(product) {
        const nameKey = state.lang === 'it' ? 'Nome' : `Nome_${state.lang.toUpperCase()}`;
        const productName = product[nameKey] || product.Nome;
        const isOut = product.StockNum <= 0;
        const isLow = product.StockNum > 0 && product.StockNum < 5;
        
        let badge = '';
        if (!isOut) {
            if (product.Evidenza === 'SI') {
                badge = `<div class="product-badge rollback">⭐ Top</div>`;
            } else if (isLow) {
                badge = `<div class="product-badge danger">🔥 ${t('products.low')}</div>`;
            }
        }
        
        return `
            <article class="product-card" data-id="${product.ID}">
                ${badge}
                <div class="product-img-wrapper" onclick="openProductModal('${product.ID}')" style="cursor: pointer;">
                    <img class="product-img" 
                         src="${product.Immagine}" 
                         alt="${productName}" 
                         loading="lazy"
                         style="${isOut ? 'filter:grayscale(1);opacity:0.5;' : ''}"
                         onerror="this.src='https://via.placeholder.com/200x160?text=📦'">
                    <div class="product-overlay">
                        <span class="product-info-btn">ℹ️ Info</span>
                    </div>
                </div>
                <h3 class="product-name" onclick="openProductModal('${product.ID}')" style="cursor: pointer;">${productName}</h3>
                <div class="product-price">
                    <span class="price-current">€${product.Prezzo}</span>
                    <span class="price-unit">/ ${product.Unità || 'pz'}</span>
                </div>
                <div class="product-stock ${isOut || isLow ? 'stock-low' : 'stock-ok'}">
                    <span class="stock-dot"></span>
                    ${isOut ? t('products.out') : (isLow ? t('products.low') : t('products.ok'))}
                </div>
                <button class="btn-add" id="btn-add-${product.ID}" ${isOut ? 'disabled' : ''} onclick="Cart.add('${product.ID}')">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    <span>${isOut ? t('products.out') : t('products.add')}</span>
                </button>
            </article>
        `;
    }
};

/* ========================================
   RENDER
   ======================================== */
const Render = {
    all() {
        console.log('[DEBUG] Render.all() - Inizio rendering');
        console.log('[DEBUG] Products in state:', state.products.length);
        
        this.carousel();
        this.categoryNav();
        this.products();
        
        console.log('[DEBUG] Render.all() - Fine rendering');
    },
    
    carousel() {
        const featured = Products.getFeatured();
        console.log('[DEBUG] Render.carousel() - Featured products:', featured.length);
        
        const track = document.getElementById('carousel-track');
        if (!track) {
            console.error('[DEBUG] ERROR: carousel-track element not found!');
            return;
        }
        
        if (featured.length === 0) {
            console.warn('[DEBUG] WARNING: No featured products to display');
            track.innerHTML = '<p style="padding: 20px; text-align: center;">Nessun prodotto in evidenza</p>';
        } else {
            track.innerHTML = featured.map(p => Products.createCard(p)).join('');
        }
        state.carouselIndex = 0;
    },
    
    categoryNav() {
        const categories = Products.getCategories();
        console.log('[DEBUG] Render.categoryNav() - Categories:', categories);
        
        // Salva le categorie nello state per riutilizzarle nel footer
        state.currentCategories = categories;
        
        const nav = document.getElementById('category-nav');
        if (!nav) {
            console.error('[DEBUG] ERROR: category-nav element not found!');
            return;
        }
        
        if (categories.length === 0) {
            console.warn('[DEBUG] WARNING: No categories found');
            nav.innerHTML = '<span style="padding: 10px;">Nessuna categoria</span>';
        } else {
            nav.innerHTML = categories.map(cat =>
                `<a class="cat-link" href="#" onclick="App.goToCategory('${cat.replace(/\s+/g, '')}');return false;">${cat}</a>`
            ).join('');
        }
    },
    
    products() {
        const products = Products.getActive();
        console.log('[DEBUG] Render.products() - Active products:', products.length);
        
        const categories = Utils.shuffle(Products.getCategories());
        const catKey = state.lang === 'it' ? 'Categoria' : `Categoria_${state.lang.toUpperCase()}`;
        
        const container = document.getElementById('negozio');
        if (!container) {
            console.error('[DEBUG] ERROR: negozio element not found!');
            return;
        }
        
        let html = '';
        
        if (products.length === 0) {
            console.warn('[DEBUG] WARNING: No active products found');
            html = `
                <div class="no-results">
                    <div class="no-results-icon">🔍</div>
                    <h3>${t('products.noResults')}</h3>
                    <p>${t('products.tryAgain')}</p>
                </div>
            `;
        } else if (state.view === 'all') {
            html = `<div class="products-grid">${Utils.shuffle(products).map(p => Products.createCard(p)).join('')}</div>`;
        } else {
            html = categories.map(cat => {
                const catProducts = products.filter(p => (p[catKey] || p.Categoria) === cat);
                if (catProducts.length === 0) return '';
                return `
                    <section class="category-section" id="cat-${cat.replace(/\s+/g, '')}">
                        <h2 class="category-title">📦 ${cat}</h2>
                        <div class="products-grid">${catProducts.map(p => Products.createCard(p)).join('')}</div>
                    </section>
                `;
            }).join('');
        }
        
        container.innerHTML = html;
        console.log('[DEBUG] Render.products() - HTML injected, length:', html.length);
    }
};

/* ========================================
   CAROUSEL
   ======================================== */
const Carousel = {
    interval: null,
    
    move(direction) {
        const track = document.getElementById('carousel-track');
        const cards = track.querySelectorAll('.product-card');
        if (cards.length === 0) return;
        
        const cardWidth = cards[0].offsetWidth + 20;
        const visible = Math.floor(track.parentElement.offsetWidth / cardWidth) || 1;
        const max = Math.max(0, cards.length - visible);
        
        state.carouselIndex = Math.max(0, Math.min(max, state.carouselIndex + direction));
        track.style.transform = `translateX(-${state.carouselIndex * cardWidth}px)`;
    },
    
    autoPlay() {
        this.interval = setInterval(() => {
            const track = document.getElementById('carousel-track');
            const cards = track.querySelectorAll('.product-card');
            if (cards.length === 0) return;
            
            const cardWidth = cards[0].offsetWidth + 20;
            const visible = Math.floor(track.parentElement.offsetWidth / cardWidth) || 1;
            const max = Math.max(0, cards.length - visible);
            
            state.carouselIndex++;
            if (state.carouselIndex > max) state.carouselIndex = 0;
            
            track.style.transform = `translateX(-${state.carouselIndex * cardWidth}px)`;
        }, 5000);
    }
};

/* ========================================
   SEARCH
   ======================================== */
const Search = {
    handler: null,
    
    init() {
        const input = document.getElementById('search-input');
        if (input) {
            input.placeholder = t('nav.searchPlaceholder');
            this.handler = Utils.debounce(() => this.perform(), 300);
        }
    },
    
    onKeyUp(e) {
        if (e.key === 'Enter') {
            this.perform();
        } else if (this.handler) {
            this.handler();
        }
    },
    
    perform() {
        const input = document.getElementById('search-input');
        state.searchQuery = input?.value.trim() || '';
        Render.products();
        
        if (state.searchQuery) {
            const count = document.querySelectorAll('.product-card').length;
            Toast.info('🔍', `${count} ${t('toast.searchResults')}`);
        }
    }
};

/* ========================================
   CHECKOUT
   ======================================== */
const Checkout = {
    open() {
        if (state.cart.length === 0) {
            Toast.error(t('errors.empty'), t('errors.emptyDesc'));
            return;
        }
        
        Cart.toggle();
        setTimeout(() => {
            document.getElementById('modal').classList.add('active');
            document.body.style.overflow = 'hidden';
            document.getElementById('f-name')?.focus();
        }, 300);
    },
    
    close() {
        document.getElementById('modal').classList.remove('active');
        document.body.style.overflow = '';
    },
    
    validate() {
        const fields = {
            name: document.getElementById('f-name'),
            email: document.getElementById('f-email'),
            phone: document.getElementById('f-phone'),
            addr: document.getElementById('f-addr')
        };
        
        Object.values(fields).forEach(el => el?.classList.remove('error'));
        
        let hasError = false;
        
        if (!fields.name?.value.trim()) {
            fields.name?.classList.add('error');
            hasError = true;
        }
        
        if (!fields.email?.value.trim() || !Utils.isValidEmail(fields.email.value)) {
            fields.email?.classList.add('error');
            if (fields.email?.value.trim() && !Utils.isValidEmail(fields.email.value)) {
                Toast.error(t('errors.email'), t('errors.emailDesc'));
            }
            hasError = true;
        }
        
        if (!fields.phone?.value.trim()) {
            fields.phone?.classList.add('error');
            hasError = true;
        }
        
        if (!fields.addr?.value.trim()) {
            fields.addr?.classList.add('error');
            hasError = true;
        }
        
        if (hasError) {
            Toast.error(t('errors.form'), t('errors.formDesc'));
            return false;
        }
        
        return true;
    },
    
    async submit() {
        if (!this.validate()) return;
        
        const name = document.getElementById('f-name').value;
        const email = document.getElementById('f-email').value;
        const phone = document.getElementById('f-phone').value;
        const addr = document.getElementById('f-addr').value;
        const country = document.getElementById('f-country').value;
        
        const subtotal = Cart.getTotal();
        const shipping = Cart.getShipping(subtotal);
        const total = Utils.formatPrice(subtotal + shipping);
        const orderId = Utils.generateOrderId();
        
        const details = state.cart.map(item =>
            `${item.qty}x ${item.Nome} (€${item.Prezzo}) = €${Utils.formatPrice(parseFloat(item.Prezzo.replace(',', '.')) * item.qty)}`
        );
        
        try {
            await fetch(CONFIG.formURL, {
                method: 'POST',
                mode: 'no-cors',
                body: new URLSearchParams({
                    'entry.442927045': orderId,
                    'entry.333212320': name,
                    'entry.1385104048': email,
                    'entry.844983788': phone,
                    'entry.334440207': addr,
                    'entry.1856379113': details.join(' | '),
                    'entry.146792905': total
                })
            });
        } catch (e) {
            console.error('Form submission error:', e);
        }
        
        document.getElementById('thanks-order-id').textContent = `#${orderId}`;
        document.getElementById('modal').classList.remove('active');
        document.getElementById('thanks-popup').classList.add('active');
        
        const waMsg = `*🛒 ORDINE ${orderId}*\n\n*👤 Cliente:* ${name}\n*📧 Email:* ${email}\n*📱 Tel:* ${phone}\n*📍 Indirizzo:* ${addr}\n*🌍 Destinazione:* ${country}\n\n*📦 Prodotti:*\n${details.join('\n')}\n\n*🚚 Spedizione:* €${Utils.formatPrice(shipping)}\n*💰 TOTALE:* €${total}`;
        
        window.open(`https://wa.me/${CONFIG.wa}?text=${encodeURIComponent(waMsg)}`);
        
        state.cart = [];
        Cart.save();
    }
};

/* ========================================
   LANGUAGE
   ======================================== */
const Language = {
    update(lang) {
        if (!CONFIG.supportedLanguages.includes(lang)) {
            lang = CONFIG.defaultLanguage;
        }
        
        state.lang = lang;
        localStorage.setItem('gizzi_lang', lang);
        
        // Aggiorna tutti gli elementi dell'UI
        this.updateAllElements();
        
        // Re-render prodotti
        Search.init();
        Render.all();
        Cart.updateUI();
        
        Toast.info(t('meta.flag'), t('meta.name'));
    },
    
    updateAllElements() {
        // Hero
        const heroH1 = document.getElementById('hero-h1');
        if (heroH1) heroH1.innerHTML = t('hero.h1');
        
        const heroP = document.getElementById('hero-p');
        if (heroP) heroP.textContent = t('hero.p');
        
        const heroBadge = document.getElementById('hero-badge');
        if (heroBadge) heroBadge.textContent = t('hero.badge');
        
        const heroCta = document.getElementById('hero-cta');
        if (heroCta) {
            heroCta.innerHTML = `${t('hero.cta')} <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>`;
        }
        
        // Navigation
        const topBarShipping = document.getElementById('top-bar-shipping');
        if (topBarShipping) topBarShipping.textContent = t('nav.shipping');
        
        const dealsTitle = document.getElementById('deals-title');
        if (dealsTitle) dealsTitle.textContent = t('products.deals');
        
        const viewAllLink = document.getElementById('view-all-link');
        if (viewAllLink) {
            viewAllLink.innerHTML = `${t('products.viewAll')} <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>`;
        }
        
        // Buttons
        const btnAll = document.getElementById('btn-all');
        if (btnAll) btnAll.textContent = t('products.all');
        
        const btnCats = document.getElementById('btn-cats');
        if (btnCats) btnCats.textContent = t('products.byCat');
        
        // Cart
        const cartLabel = document.getElementById('cart-label');
        if (cartLabel) cartLabel.textContent = t('cart.title');
        
        const btnClearText = document.getElementById('btn-clear-text');
        if (btnClearText) btnClearText.textContent = t('cart.clear');
        
        const btnCheckoutText = document.getElementById('btn-checkout-text');
        if (btnCheckoutText) btnCheckoutText.textContent = t('cart.checkout');
        
        // Checkout Modal
        const modalTitle = document.getElementById('modal-title');
        if (modalTitle) modalTitle.textContent = t('checkout.title');
        
        const modalSubtitle = document.getElementById('modal-subtitle');
        if (modalSubtitle) modalSubtitle.textContent = t('checkout.subtitle');
        
        const btnConfirmText = document.getElementById('btn-confirm-text');
        if (btnConfirmText) btnConfirmText.textContent = t('checkout.confirm');
        
        // Form
        this.updateFormLabels();
        
        // Thanks
        const thanksH = document.getElementById('thanks-h');
        if (thanksH) thanksH.textContent = t('thanks.title');
        
        const thanksP = document.getElementById('thanks-p');
        if (thanksP) thanksP.textContent = t('thanks.message');
        
        const thanksP2 = document.getElementById('thanks-p2');
        if (thanksP2) thanksP2.textContent = t('thanks.contact');
        
        const btnBack = document.getElementById('btn-back');
        if (btnBack) btnBack.textContent = t('thanks.back');
        
        // GDPR
        const gdprTitle = document.querySelector('.gdpr-text h4');
        const gdprMessage = document.querySelector('.gdpr-text p');
        const gdprAccept = document.querySelector('.btn-accept');
        const gdprDecline = document.querySelector('.btn-decline');
        
        if (gdprTitle) gdprTitle.textContent = t('gdpr.title');
        if (gdprMessage) gdprMessage.textContent = t('gdpr.message');
        if (gdprAccept) gdprAccept.textContent = t('gdpr.accept');
        if (gdprDecline) gdprDecline.textContent = t('gdpr.decline');
        
        // Footer
        this.updateFooter();
    },
    
    updateFormLabels() {
        const labels = {
            'f-name': { label: 'checkout.name', placeholder: 'checkout.namePlaceholder' },
            'f-email': { label: 'checkout.email', placeholder: 'checkout.emailPlaceholder' },
            'f-phone': { label: 'checkout.phone', placeholder: 'checkout.phonePlaceholder' },
            'f-addr': { label: 'checkout.address', placeholder: 'checkout.addressPlaceholder' }
        };
        
        for (const [id, keys] of Object.entries(labels)) {
            const input = document.getElementById(id);
            if (input) {
                input.placeholder = t(keys.placeholder);
                const label = input.previousElementSibling;
                if (label && label.tagName === 'LABEL') {
                    label.innerHTML = `${t(keys.label)} *`;
                }
            }
        }
        
        const hint = document.querySelector('.form-hint');
        if (hint) hint.textContent = t('checkout.addressHint');
        
        const countryLabel = document.querySelector('label[for="f-country"]');
        if (countryLabel) countryLabel.textContent = t('checkout.destination');
        
        const countrySelect = document.getElementById('f-country');
        if (countrySelect) {
            countrySelect.innerHTML = `
                <option value="Italia">${t('checkout.italy')}</option>
                <option value="Europa">${t('checkout.europe')}</option>
            `;
        }
    },
    
    updateFooter() {
        const footerCols = document.querySelectorAll('.footer-col');
        if (footerCols.length < 4) return;
        
        const aboutP = footerCols[0].querySelectorAll('p');
        if (aboutP[0]) aboutP[0].textContent = t('footer.about');
        if (aboutP[1]) aboutP[1].textContent = t('footer.tradition');
        
        const catH4 = footerCols[1].querySelector('h4');
        if (catH4) catH4.textContent = t('footer.categories');
        
        // Genera categorie dinamiche come nell'header
        const catCol = footerCols[1];
        const oldCatLinks = catCol.querySelectorAll('a');
        oldCatLinks.forEach(link => link.remove());
        
        // Usa le stesse categorie dell'header (salvate in state.currentCategories)
        const categories = state.currentCategories || Products.getCategories();
        categories.forEach(cat => {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = cat;
            link.onclick = (e) => {
                e.preventDefault();
                App.goToCategory(cat.replace(/\s+/g, ''));
            };
            catCol.appendChild(link);
        });
        
        const supportH4 = footerCols[2].querySelector('h4');
        const supportLinks = footerCols[2].querySelectorAll('a');
        if (supportH4) supportH4.textContent = t('footer.support');
        if (supportLinks[0]) {
            supportLinks[0].textContent = t('footer.contact');
            supportLinks[0].href = '#';
            supportLinks[0].onclick = (e) => { e.preventDefault(); openPageModal('contact'); };
        }
        if (supportLinks[1]) {
            supportLinks[1].textContent = t('footer.shippingInfo');
            supportLinks[1].href = '#';
            supportLinks[1].onclick = (e) => { e.preventDefault(); openPageModal('shipping'); };
        }
        if (supportLinks[2]) {
            supportLinks[2].textContent = t('footer.returns');
            supportLinks[2].href = '#';
            supportLinks[2].onclick = (e) => { e.preventDefault(); openPageModal('returns'); };
        }
        if (supportLinks[3]) {
            supportLinks[3].textContent = t('footer.faq');
            supportLinks[3].href = '#';
            supportLinks[3].onclick = (e) => { e.preventDefault(); openPageModal('faq'); };
        }
        
        const contactH4 = footerCols[3].querySelector('h4');
        if (contactH4) contactH4.textContent = t('footer.contactTitle');
    },
    
    getPageLink(page) {
        const pages = {
            contact: { it: 'contatti', en: 'contact', de: 'kontakt', hu: 'kapcsolat' },
            shipping: { it: 'spedizioni', en: 'shipping', de: 'versand', hu: 'szallitas' },
            returns: { it: 'resi', en: 'returns', de: 'rueckgabe', hu: 'visszakuldes' },
            faq: { it: 'faq', en: 'faq-en', de: 'faq-de', hu: 'gyik' }
        };
        return `pages/${pages[page][state.lang]}.html`;
    },
    
    getSaved() {
        return localStorage.getItem('gizzi_lang') || CONFIG.defaultLanguage;
    }
};

/* ========================================
   APP CONTROLLER
   ======================================== */
const App = {
    async init() {
        console.log('[DEBUG] App.init() - Inizio inizializzazione');
        
        Loader.init();
        Toast.init();
        Theme.init();
        Cart.load();
        
        console.log('[DEBUG] Cart loaded, items:', state.cart.length);
        
        // Load saved language
        const savedLang = Language.getSaved();
        console.log('[DEBUG] Saved language:', savedLang);
        state.lang = savedLang;
        const langSelect = document.getElementById('lang-sel');
        if (langSelect) langSelect.value = savedLang;
        
        // Setup listeners
        this.setupListeners();
        
        // Initial UI update
        Language.updateAllElements();
        Search.init();
        
        // Load products
        console.log('[DEBUG] Starting product load...');
        const success = await Products.load();
        console.log('[DEBUG] Products.load() returned:', success);
        
        if (success) {
            console.log('[DEBUG] Rendering products...');
            Render.all();
            Cart.updateUI();
            Carousel.autoPlay();
            // Aggiorna footer DOPO caricamento prodotti per avere le categorie
            Language.updateFooter();
        } else {
            console.error('[DEBUG] Product loading failed, skipping render');
        }
        
        Loader.hide();
        setTimeout(() => GDPR.check(), 1000);
        
        // Initialize Router for SPA navigation
        Router.init();
        
        console.log('[DEBUG] App.init() - Fine inizializzazione');
    },
    
    setupListeners() {
        window.addEventListener('scroll', Utils.debounce(() => {
            const header = document.getElementById('main-header');
            if (header) {
                header.classList.toggle('scrolled', window.scrollY > 50);
            }
        }, 10));
        
        document.getElementById('cart-overlay')?.addEventListener('click', () => Cart.toggle());
        
        // Event delegation per tutto il pannello carrello
        const cartPanel = document.getElementById('cart-panel');
        if (cartPanel) {
            cartPanel.addEventListener('click', (e) => {
                // Pulsante svuota carrello
                const clearBtn = e.target.closest('#btn-clear') || e.target.closest('.btn-clear');
                if (clearBtn) {
                    e.preventDefault();
                    e.stopPropagation();
                    Cart.confirmEmpty();
                    return;
                }
            });
        }
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                Confirm.close();
                Checkout.close();
                closePageModal();
                if (document.getElementById('cart-panel')?.classList.contains('active')) {
                    Cart.toggle();
                }
            }
        });
        
        document.getElementById('search-input')?.addEventListener('keyup', (e) => Search.onKeyUp(e));
    },
    
    switchView(view) {
        state.view = view;
        document.getElementById('btn-all')?.classList.toggle('active', view === 'all');
        document.getElementById('btn-cats')?.classList.toggle('active', view === 'cats');
        Render.products();
    },
    
    goToCategory(catId) {
        if (state.view !== 'cats') this.switchView('cats');
        document.querySelectorAll('.cat-link').forEach(a => a.classList.remove('active'));
        event?.target?.classList.add('active');
        setTimeout(() => Utils.scrollTo(`cat-${catId}`, 120), 100);
    },
    
    reload() {
        localStorage.removeItem('gizzi_cart');
        location.reload();
    }
};

/* ========================================
   GLOBAL FUNCTIONS
   ======================================== */
function toggleTheme() { Theme.toggle(); }
function toggleCart() { Cart.toggle(); }
function moveCarousel(dir) { Carousel.move(dir); }
function switchView(view) { App.switchView(view); }
function openCheckout() { Checkout.open(); }
function closeCheckout() { Checkout.close(); }
function closeConfirm() { Confirm.close(); }
function updateLang(lang) { Language.update(lang); }
function acceptGDPR() { GDPR.accept(); }
function rejectGDPR() { GDPR.reject(); }
function confirmEmptyCart() { Cart.confirmEmpty(); }
function confirmRemoveCartItem(id) { Cart.confirmRemove(id); }
function validateAndSubmit() { Checkout.submit(); }
function clearAndReload() { App.reload(); }
function performSearch() { Search.perform(); }
function handleSearch(e) { Search.onKeyUp(e); }
function smoothScrollTo(id) { Utils.scrollTo(id, 100); }
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

/* ========================================
   ROUTER - SPA NAVIGATION
   ======================================== */
const Router = {
    currentPage: 'home',
    
    // Page configurations with multilingual support
    pages: {
        home: {
            id: 'home',
            showHero: true,
            showPromo: true,
            showHomeContent: true,
            showPageContent: false
        },
        contatti: {
            id: 'contatti',
            file: 'pages/contatti.html',
            showHero: false,
            showPromo: false,
            showHomeContent: false,
            showPageContent: true
        },
        spedizioni: {
            id: 'spedizioni',
            file: 'pages/spedizioni.html',
            showHero: false,
            showPromo: false,
            showHomeContent: false,
            showPageContent: true
        },
        resi: {
            id: 'resi',
            file: 'pages/resi.html',
            showHero: false,
            showPromo: false,
            showHomeContent: false,
            showPageContent: true
        },
        faq: {
            id: 'faq',
            file: 'pages/faq.html',
            showHero: false,
            showPromo: false,
            showHomeContent: false,
            showPageContent: true
        }
    },
    
    init() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            const page = window.location.hash.replace('#', '') || 'home';
            this.loadPage(page, false);
        });
        
        // Load initial page based on URL hash
        const initialPage = window.location.hash.replace('#', '') || 'home';
        this.loadPage(initialPage, false);
    },
    
    navigate(pageId) {
        if (!this.pages[pageId]) {
            console.error(`Page ${pageId} not found`);
            return;
        }
        
        // Update URL hash
        window.location.hash = pageId === 'home' ? '' : pageId;
        
        // Load the page
        this.loadPage(pageId, true);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    
    async loadPage(pageId, pushState = true) {
        const config = this.pages[pageId];
        if (!config) return;
        
        this.currentPage = pageId;
        
        // Toggle visibility of sections
        this.toggleSection('hero-section', config.showHero);
        this.toggleSection('promo-strip', config.showPromo);
        this.toggleSection('home-content', config.showHomeContent);
        
        const pageContentEl = document.getElementById('page-content');
        
        if (config.showPageContent && config.file) {
            // Load page content dynamically
            try {
                const response = await fetch(config.file);
                if (!response.ok) throw new Error('Page not found');
                
                let html = await response.text();
                
                // Extract body content if it's a full HTML page
                const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
                if (bodyMatch) {
                    html = bodyMatch[1];
                }
                
                // Update page content
                pageContentEl.innerHTML = html;
                pageContentEl.style.display = 'block';
                
                // Initialize page-specific scripts
                this.initPageScripts(pageId);
                
            } catch (error) {
                console.error('Error loading page:', error);
                pageContentEl.innerHTML = `
                    <div class="page-error">
                        <h2>Errore di caricamento</h2>
                        <p>Impossibile caricare la pagina richiesta.</p>
                        <button onclick="Router.navigate('home')">Torna alla Home</button>
                    </div>
                `;
                pageContentEl.style.display = 'block';
            }
        } else {
            pageContentEl.style.display = 'none';
            pageContentEl.innerHTML = '';
        }
        
        // Update active state in navigation
        this.updateActiveNav(pageId);
        
        // Update page title based on language
        this.updatePageTitle(pageId);
    },
    
    toggleSection(id, show) {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = show ? '' : 'none';
        }
    },
    
    updateActiveNav(pageId) {
        // Remove active class from all nav links
        document.querySelectorAll('.footer-col a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current page link
        const activeLink = document.querySelector(`a[href="#${pageId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    },
    
    updatePageTitle(pageId) {
        const titles = {
            it: {
                home: 'Gruppo Gizzi | Il Tuo Supermercato del Cilento',
                contatti: 'Contattaci | Gruppo Gizzi',
                spedizioni: 'Spedizioni | Gruppo Gizzi',
                resi: 'Resi e Rimborsi | Gruppo Gizzi',
                faq: 'FAQ | Gruppo Gizzi'
            },
            en: {
                home: 'Gruppo Gizzi | Your Cilento Supermarket',
                contatti: 'Contact Us | Gruppo Gizzi',
                spedizioni: 'Shipping | Gruppo Gizzi',
                resi: 'Returns & Refunds | Gruppo Gizzi',
                faq: 'FAQ | Gruppo Gizzi'
            },
            de: {
                home: 'Gruppo Gizzi | Ihr Cilento Supermarkt',
                contatti: 'Kontakt | Gruppo Gizzi',
                spedizioni: 'Versand | Gruppo Gizzi',
                resi: 'Rückgabe & Erstattung | Gruppo Gizzi',
                faq: 'FAQ | Gruppo Gizzi'
            },
            hu: {
                home: 'Gruppo Gizzi | Az Ön Cilento Szupermarketje',
                contatti: 'Kapcsolat | Gruppo Gizzi',
                spedizioni: 'Szállítás | Gruppo Gizzi',
                resi: 'Visszaküldés és Visszatérítés | Gruppo Gizzi',
                faq: 'GYIK | Gruppo Gizzi'
            }
        };
        
        const lang = state.lang || 'it';
        const title = titles[lang]?.[pageId] || titles['it'][pageId];
        document.title = title;
    },
    
    initPageScripts(pageId) {
        // Re-initialize any scripts needed for the loaded page
        if (pageId === 'contatti' || pageId === 'contact' || pageId === 'kontakt' || pageId === 'kapcsolat') {
            // Initialize contact form if present
            const form = document.getElementById('contact-form');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    // Handle form submission
                    Toast.success('Messaggio inviato!', 'Ti contatteremo presto.');
                });
            }
        }
    }
};

/* ========================================
   PRODUCT MODAL FUNCTIONS
   ======================================== */
function openProductModal(productId) {
    const product = state.products.find(p => p.ID === productId);
    if (!product) return;
    
    const modal = document.getElementById('product-modal');
    const img = document.getElementById('product-modal-img');
    const name = document.getElementById('product-modal-name');
    const price = document.getElementById('product-modal-price');
    const desc = document.getElementById('product-modal-desc');
    
    if (!modal) return;
    
    // Get localized content
    const nameKey = state.lang === 'it' ? 'Nome' : `Nome_${state.lang.toUpperCase()}`;
    const descKey = state.lang === 'it' ? 'Descrizione' : `Descrizione_${state.lang.toUpperCase()}`;
    
    const productName = product[nameKey] || product.Nome;
    const productDesc = product[descKey] || product.Descrizione || 'Nessuna descrizione disponibile.';
    
    if (img) {
        img.src = product.Immagine;
        img.alt = productName;
    }
    if (name) name.textContent = productName;
    if (price) price.innerHTML = `€${product.Prezzo} <span style="font-size: 0.9rem; color: var(--text-light); font-weight: 400;">/ ${product.Unità || 'pz'}</span>`;
    if (desc) desc.innerHTML = `<p class="description">${productDesc}</p>`;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Footer links - navigate to pages instead of modal
function openPageModal(page) {
    const pages = {
        contact: { it: 'pages/contatti.html', en: 'pages/contact.html', de: 'pages/kontakt.html', hu: 'pages/kapcsolat.html' },
        shipping: { it: 'pages/spedizioni.html', en: 'pages/shipping.html', de: 'pages/versand.html', hu: 'pages/szallitas.html' },
        returns: { it: 'pages/resi.html', en: 'pages/returns.html', de: 'pages/rueckgabe.html', hu: 'pages/visszakuldes.html' },
        faq: { it: 'pages/faq.html', en: 'pages/faq-en.html', de: 'pages/faq-de.html', hu: 'pages/gyik.html' }
    };
    
    const url = pages[page]?.[state.lang] || pages[page]?.it;
    if (url) {
        window.location.href = url;
    }
}

/* ========================================
   INIT
   ======================================== */
document.addEventListener('DOMContentLoaded', () => App.init());

window.addEventListener('load', () => {
    setTimeout(() => {
        if (state.isLoading) Loader.hide();
    }, 1000);
});
    },
    
    async loadPage(pageId, pushState = true) {
        const config = this.pages[pageId];
        if (!config) return;
        
        this.currentPage = pageId;
        
        // Toggle visibility of sections
        this.toggleSection('hero-section', config.showHero);
        this.toggleSection('promo-strip', config.showPromo);
        this.toggleSection('home-content', config.showHomeContent);
        
        const pageContentEl = document.getElementById('page-content');
        
        if (config.showPageContent && config.file) {
            // Load page content dynamically
            try {
                const response = await fetch(config.file);
                if (!response.ok) throw new Error('Page not found');
                
                let html = await response.text();
                
                // Extract body content if it's a full HTML page
                const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
                if (bodyMatch) {
                    html = bodyMatch[1];
                }
                
                // Update page content
                pageContentEl.innerHTML = html;
                pageContentEl.style.display = 'block';
                
                // Initialize page-specific scripts
                this.initPageScripts(pageId);
                
            } catch (error) {
                console.error('Error loading page:', error);
                pageContentEl.innerHTML = `
                    <div class="page-error">
                        <h2>Errore di caricamento</h2>
                        <p>Impossibile caricare la pagina richiesta.</p>
                        <button onclick="Router.navigate('home')">Torna alla Home</button>
                    </div>
                `;
                pageContentEl.style.display = 'block';
            }
        } else {
            pageContentEl.style.display = 'none';
            pageContentEl.innerHTML = '';
        }
        
        // Update active state in navigation
        this.updateActiveNav(pageId);
        
        // Update page title based on language
        this.updatePageTitle(pageId);
    },
    
    toggleSection(id, show) {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = show ? '' : 'none';
        }
    },
    
    updateActiveNav(pageId) {
        // Remove active class from all nav links
        document.querySelectorAll('.footer-col a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current page link
        const activeLink = document.querySelector(`a[href="#${pageId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    },
    
    updatePageTitle(pageId) {
        const titles = {
            it: {
                home: 'Gruppo Gizzi | Il Tuo Supermercato del Cilento',
                contatti: 'Contattaci | Gruppo Gizzi',
                spedizioni: 'Spedizioni | Gruppo Gizzi',
                resi: 'Resi e Rimborsi | Gruppo Gizzi',
                faq: 'FAQ | Gruppo Gizzi'
            },
            en: {
                home: 'Gruppo Gizzi | Your Cilento Supermarket',
                contatti: 'Contact Us | Gruppo Gizzi',
                spedizioni: 'Shipping | Gruppo Gizzi',
                resi: 'Returns & Refunds | Gruppo Gizzi',
                faq: 'FAQ | Gruppo Gizzi'
            },
            de: {
                home: 'Gruppo Gizzi | Ihr Cilento Supermarkt',
                contatti: 'Kontakt | Gruppo Gizzi',
                spedizioni: 'Versand | Gruppo Gizzi',
                resi: 'Rückgabe & Erstattung | Gruppo Gizzi',
                faq: 'FAQ | Gruppo Gizzi'
            },
            hu: {
                home: 'Gruppo Gizzi | Az Ön Cilento Szupermarketje',
                contatti: 'Kapcsolat | Gruppo Gizzi',
                spedizioni: 'Szállítás | Gruppo Gizzi',
                resi: 'Visszaküldés és Visszatérítés | Gruppo Gizzi',
                faq: 'GYIK | Gruppo Gizzi'
            }
        };
        
        const lang = state.lang || 'it';
        const title = titles[lang]?.[pageId] || titles['it'][pageId];
        document.title = title;
    },
    
    initPageScripts(pageId) {
        // Re-initialize any scripts needed for the loaded page
        if (pageId === 'contatti' || pageId === 'contact' || pageId === 'kontakt' || pageId === 'kapcsolat') {
            // Initialize contact form if present
            const form = document.getElementById('contact-form');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    // Handle form submission
                    Toast.success('Messaggio inviato!', 'Ti contatteremo presto.');
                });
            }
        }
    }
};

/* ========================================
   PRODUCT MODAL FUNCTIONS
   ======================================== */
function openProductModal(productId) {
    const product = state.products.find(p => p.ID === productId);
    if (!product) return;
    
    const modal = document.getElementById('product-modal');
    const img = document.getElementById('product-modal-img');
    const name = document.getElementById('product-modal-name');
    const price = document.getElementById('product-modal-price');
    const desc = document.getElementById('product-modal-desc');
    
    if (!modal) return;
    
    // Get localized content
    const nameKey = state.lang === 'it' ? 'Nome' : `Nome_${state.lang.toUpperCase()}`;
    const descKey = state.lang === 'it' ? 'Descrizione' : `Descrizione_${state.lang.toUpperCase()}`;
    
    const productName = product[nameKey] || product.Nome;
    const productDesc = product[descKey] || product.Descrizione || 'Nessuna descrizione disponibile.';
    
    if (img) {
        img.src = product.Immagine;
        img.alt = productName;
    }
    if (name) name.textContent = productName;
    if (price) price.innerHTML = `€${product.Prezzo} <span style="font-size: 0.9rem; color: var(--text-light); font-weight: 400;">/ ${product.Unità || 'pz'}</span>`;
    if (desc) desc.innerHTML = `<p class="description">${productDesc}</p>`;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Footer links - navigate to pages instead of modal
function openPageModal(page) {
    const pages = {
        contact: { it: 'pages/contatti.html', en: 'pages/contact.html', de: 'pages/kontakt.html', hu: 'pages/kapcsolat.html' },
        shipping: { it: 'pages/spedizioni.html', en: 'pages/shipping.html', de: 'pages/versand.html', hu: 'pages/szallitas.html' },
        returns: { it: 'pages/resi.html', en: 'pages/returns.html', de: 'pages/rueckgabe.html', hu: 'pages/visszakuldes.html' },
        faq: { it: 'pages/faq.html', en: 'pages/faq-en.html', de: 'pages/faq-de.html', hu: 'pages/gyik.html' }
    };
    
    const url = pages[page]?.[state.lang] || pages[page]?.it;
    if (url) {
        window.location.href = url;
    }
}

/* ========================================
   INIT
   ======================================== */
document.addEventListener('DOMContentLoaded', () => App.init());

window.addEventListener('load', () => {
    setTimeout(() => {
        if (state.isLoading) Loader.hide();
    }, 1000);
});

        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    
    async loadPage(pageId, pushState = true) {
        const config = this.pages[pageId];
        if (!config) return;
        
        this.currentPage = pageId;
        
        // Toggle visibility of sections
        this.toggleSection('hero-section', config.showHero);
        this.toggleSection('promo-strip', config.showPromo);
        this.toggleSection('home-content', config.showHomeContent);
        
        const pageContentEl = document.getElementById('page-content');
        
        if (config.showPageContent && config.file) {
            // Load page content dynamically
            try {
                const response = await fetch(config.file);
                if (!response.ok) throw new Error('Page not found');
                
                let html = await response.text();
                
                // Extract body content if it's a full HTML page
                const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
                if (bodyMatch) {
                    html = bodyMatch[1];
                }
                
                // Update page content
                pageContentEl.innerHTML = html;
                pageContentEl.style.display = 'block';
                
                // Initialize page-specific scripts
                this.initPageScripts(pageId);
                
            } catch (error) {
                console.error('Error loading page:', error);
                pageContentEl.innerHTML = `
                    <div class="page-error">
                        <h2>Errore di caricamento</h2>
                        <p>Impossibile caricare la pagina richiesta.</p>
                        <button onclick="Router.navigate('home')">Torna alla Home</button>
                    </div>
                `;
                pageContentEl.style.display = 'block';
            }
        } else {
            pageContentEl.style.display = 'none';
            pageContentEl.innerHTML = '';
        }
        
        // Update active state in navigation
        this.updateActiveNav(pageId);
        
        // Update page title based on language
        this.updatePageTitle(pageId);
    },
    
    toggleSection(id, show) {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = show ? '' : 'none';
        }
    },
    
    updateActiveNav(pageId) {
        // Remove active class from all nav links
        document.querySelectorAll('.footer-col a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current page link
        const activeLink = document.querySelector(`a[href="#${pageId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    },
    
    updatePageTitle(pageId) {
        const titles = {
            it: {
                home: 'Gruppo Gizzi | Il Tuo Supermercato del Cilento',
                contatti: 'Contattaci | Gruppo Gizzi',
                spedizioni: 'Spedizioni | Gruppo Gizzi',
                resi: 'Resi e Rimborsi | Gruppo Gizzi',
                faq: 'FAQ | Gruppo Gizzi'
            },
            en: {
                home: 'Gruppo Gizzi | Your Cilento Supermarket',
                contatti: 'Contact Us | Gruppo Gizzi',
                spedizioni: 'Shipping | Gruppo Gizzi',
                resi: 'Returns & Refunds | Gruppo Gizzi',
                faq: 'FAQ | Gruppo Gizzi'
            },
            de: {
                home: 'Gruppo Gizzi | Ihr Cilento Supermarkt',
                contatti: 'Kontakt | Gruppo Gizzi',
                spedizioni: 'Versand | Gruppo Gizzi',
                resi: 'Rückgabe & Erstattung | Gruppo Gizzi',
                faq: 'FAQ | Gruppo Gizzi'
            },
            hu: {
                home: 'Gruppo Gizzi | Az Ön Cilento Szupermarketje',
                contatti: 'Kapcsolat | Gruppo Gizzi',
                spedizioni: 'Szállítás | Gruppo Gizzi',
                resi: 'Visszaküldés és Visszatérítés | Gruppo Gizzi',
                faq: 'GYIK | Gruppo Gizzi'
            }
        };
        
        const lang = state.lang || 'it';
        const title = titles[lang]?.[pageId] || titles['it'][pageId];
        document.title = title;
    },
    
    initPageScripts(pageId) {
        // Re-initialize any scripts needed for the loaded page
        if (pageId === 'contatti' || pageId === 'contact' || pageId === 'kontakt' || pageId === 'kapcsolat') {
            // Initialize contact form if present
            const form = document.getElementById('contact-form');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    // Handle form submission
                    Toast.success('Messaggio inviato!', 'Ti contatteremo presto.');
                });
            }
        }
    }
};

/* ========================================
   PRODUCT MODAL FUNCTIONS
   ======================================== */
function openProductModal(productId) {
    const product = state.products.find(p => p.ID === productId);
    if (!product) return;
    
    const modal = document.getElementById('product-modal');
    const img = document.getElementById('product-modal-img');
    const name = document.getElementById('product-modal-name');
    const price = document.getElementById('product-modal-price');
    const desc = document.getElementById('product-modal-desc');
    
    if (!modal) return;
    
    // Get localized content
    const nameKey = state.lang === 'it' ? 'Nome' : `Nome_${state.lang.toUpperCase()}`;
    const descKey = state.lang === 'it' ? 'Descrizione' : `Descrizione_${state.lang.toUpperCase()}`;
    
    const productName = product[nameKey] || product.Nome;
    const productDesc = product[descKey] || product.Descrizione || 'Nessuna descrizione disponibile.';
    
    if (img) {
        img.src = product.Immagine;
        img.alt = productName;
    }
    if (name) name.textContent = productName;
    if (price) price.innerHTML = `€${product.Prezzo} <span style="font-size: 0.9rem; color: var(--text-light); font-weight: 400;">/ ${product.Unità || 'pz'}</span>`;
    if (desc) desc.innerHTML = `<p class="description">${productDesc}</p>`;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Footer links - navigate to pages instead of modal
function openPageModal(page) {
    const pages = {
        contact: { it: 'pages/contatti.html', en: 'pages/contact.html', de: 'pages/kontakt.html', hu: 'pages/kapcsolat.html' },
        shipping: { it: 'pages/spedizioni.html', en: 'pages/shipping.html', de: 'pages/versand.html', hu: 'pages/szallitas.html' },
        returns: { it: 'pages/resi.html', en: 'pages/returns.html', de: 'pages/rueckgabe.html', hu: 'pages/visszakuldes.html' },
        faq: { it: 'pages/faq.html', en: 'pages/faq-en.html', de: 'pages/faq-de.html', hu: 'pages/gyik.html' }
    };
    
    const url = pages[page]?.[state.lang] || pages[page]?.it;
    if (url) {
        window.location.href = url;
    }
}

/* ========================================
   INIT
   ======================================== */
document.addEventListener('DOMContentLoaded', () => App.init());

window.addEventListener('load', () => {
    setTimeout(() => {
        if (state.isLoading) Loader.hide();
    }, 1000);
});
    },
    
    async loadPage(pageId, pushState = true) {
        const config = this.pages[pageId];
        if (!config) return;
        
        this.currentPage = pageId;
        
        // Toggle visibility of sections
        this.toggleSection('hero-section', config.showHero);
        this.toggleSection('promo-strip', config.showPromo);
        this.toggleSection('home-content', config.showHomeContent);
        
        const pageContentEl = document.getElementById('page-content');
        
        if (config.showPageContent && config.file) {
            // Load page content dynamically
            try {
                const response = await fetch(config.file);
                if (!response.ok) throw new Error('Page not found');
                
                let html = await response.text();
                
                // Extract body content if it's a full HTML page
                const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
                if (bodyMatch) {
                    html = bodyMatch[1];
                }
                
                // Update page content
                pageContentEl.innerHTML = html;
                pageContentEl.style.display = 'block';
                
                // Initialize page-specific scripts
                this.initPageScripts(pageId);
                
            } catch (error) {
                console.error('Error loading page:', error);
                pageContentEl.innerHTML = `
                    <div class="page-error">
                        <h2>Errore di caricamento</h2>
                        <p>Impossibile caricare la pagina richiesta.</p>
                        <button onclick="Router.navigate('home')">Torna alla Home</button>
                    </div>
                `;
                pageContentEl.style.display = 'block';
            }
        } else {
            pageContentEl.style.display = 'none';
            pageContentEl.innerHTML = '';
        }
        
        // Update active state in navigation
        this.updateActiveNav(pageId);
        
        // Update page title based on language
        this.updatePageTitle(pageId);
    },
    
    toggleSection(id, show) {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = show ? '' : 'none';
        }
    },
    
    updateActiveNav(pageId) {
        // Remove active class from all nav links
        document.querySelectorAll('.footer-col a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current page link
        const activeLink = document.querySelector(`a[href="#${pageId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    },
    
    updatePageTitle(pageId) {
        const titles = {
            it: {
                home: 'Gruppo Gizzi | Il Tuo Supermercato del Cilento',
                contatti: 'Contattaci | Gruppo Gizzi',
                spedizioni: 'Spedizioni | Gruppo Gizzi',
                resi: 'Resi e Rimborsi | Gruppo Gizzi',
                faq: 'FAQ | Gruppo Gizzi'
            },
            en: {
                home: 'Gruppo Gizzi | Your Cilento Supermarket',
                contatti: 'Contact Us | Gruppo Gizzi',
                spedizioni: 'Shipping | Gruppo Gizzi',
                resi: 'Returns & Refunds | Gruppo Gizzi',
                faq: 'FAQ | Gruppo Gizzi'
            },
            de: {
                home: 'Gruppo Gizzi | Ihr Cilento Supermarkt',
                contatti: 'Kontakt | Gruppo Gizzi',
                spedizioni: 'Versand | Gruppo Gizzi',
                resi: 'Rückgabe & Erstattung | Gruppo Gizzi',
                faq: 'FAQ | Gruppo Gizzi'
            },
            hu: {
                home: 'Gruppo Gizzi | Az Ön Cilento Szupermarketje',
                contatti: 'Kapcsolat | Gruppo Gizzi',
                spedizioni: 'Szállítás | Gruppo Gizzi',
                resi: 'Visszaküldés és Visszatérítés | Gruppo Gizzi',
                faq: 'GYIK | Gruppo Gizzi'
            }
        };
        
        const lang = state.lang || 'it';
        const title = titles[lang]?.[pageId] || titles['it'][pageId];
        document.title = title;
    },
    
    initPageScripts(pageId) {
        // Re-initialize any scripts needed for the loaded page
        if (pageId === 'contatti' || pageId === 'contact' || pageId === 'kontakt' || pageId === 'kapcsolat') {
            // Initialize contact form if present
            const form = document.getElementById('contact-form');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    // Handle form submission
                    Toast.success('Messaggio inviato!', 'Ti contatteremo presto.');
                });
            }
        }
    }
};

/* ========================================
   PRODUCT MODAL FUNCTIONS
   ======================================== */
function openProductModal(productId) {
    const product = state.products.find(p => p.ID === productId);
    if (!product) return;
    
    const modal = document.getElementById('product-modal');
    const img = document.getElementById('product-modal-img');
    const name = document.getElementById('product-modal-name');
    const price = document.getElementById('product-modal-price');
    const desc = document.getElementById('product-modal-desc');
    
    if (!modal) return;
    
    // Get localized content
    const nameKey = state.lang === 'it' ? 'Nome' : `Nome_${state.lang.toUpperCase()}`;
    const descKey = state.lang === 'it' ? 'Descrizione' : `Descrizione_${state.lang.toUpperCase()}`;
    
    const productName = product[nameKey] || product.Nome;
    const productDesc = product[descKey] || product.Descrizione || 'Nessuna descrizione disponibile.';
    
    if (img) {
        img.src = product.Immagine;
        img.alt = productName;
    }
    if (name) name.textContent = productName;
    if (price) price.innerHTML = `€${product.Prezzo} <span style="font-size: 0.9rem; color: var(--text-light); font-weight: 400;">/ ${product.Unità || 'pz'}</span>`;
    if (desc) desc.innerHTML = `<p class="description">${productDesc}</p>`;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Footer links - navigate to pages instead of modal
function openPageModal(page) {
    const pages = {
        contact: { it: 'pages/contatti.html', en: 'pages/contact.html', de: 'pages/kontakt.html', hu: 'pages/kapcsolat.html' },
        shipping: { it: 'pages/spedizioni.html', en: 'pages/shipping.html', de: 'pages/versand.html', hu: 'pages/szallitas.html' },
        returns: { it: 'pages/resi.html', en: 'pages/returns.html', de: 'pages/rueckgabe.html', hu: 'pages/visszakuldes.html' },
        faq: { it: 'pages/faq.html', en: 'pages/faq-en.html', de: 'pages/faq-de.html', hu: 'pages/gyik.html' }
    };
    
    const url = pages[page]?.[state.lang] || pages[page]?.it;
    if (url) {
        window.location.href = url;
    }
}

/* ========================================
   INIT
   ======================================== */
document.addEventListener('DOMContentLoaded', () => App.init());

window.addEventListener('load', () => {
    setTimeout(() => {
        if (state.isLoading) Loader.hide();
    }, 1000);
});


