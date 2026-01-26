/* ========================================
   CONFIGURAZIONE
   ======================================== */
const CONFIG = {
    catalog: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRIumwZulbMAuesmG69DB8Y1bx2Y-NQXfyG7_m1-rdpZ-SoOxM0JyZtnj0_eV_K4t4drULTwV44nE5Y/pub?gid=0&single=true&output=csv",
    formURL: "https://docs.google.com/forms/d/e/1FAIpQLSend7KPNCjTNP1d-B3zd-wvhZAVXLS3P7341yN88fm3d7D4Jw/formResponse",
    wa: "393667540018",
    loadingTimeout: 8000 // Max loading time in ms
};

/* ========================================
   TRADUZIONI UI
   ======================================== */
const UI = {
    it: {
        h1: "L'Oro del Cilento,<br>a casa tua.",
        p: "Eccellenza gastronomica dal cuore del Parco Nazionale. Prodotti autentici, tradizione e sapore.",
        badge: "✨ Qualità Cilentana",
        cta: "Scopri i Prodotti",
        add: "Aggiungi",
        added: "Aggiunto!",
        total: "Totale",
        cart: "🛒 Il Tuo Carrello",
        ship: "Spedizione",
        clear: "Svuota Carrello",
        deals: "Offerte del Momento",
        all: "Tutti i Prodotti",
        byCat: "Per Categoria",
        viewAll: "Vedi tutti",
        maxQty: "Max disponibili",
        out: "Esaurito",
        low: "Ultimi pezzi!",
        ok: "Disponibile",
        shipping: "Spedizione GRATUITA per ordini oltre €120",
        theme: "🌙 Tema Scuro",
        themeLight: "☀️ Tema Chiaro",
        loading: "Caricamento...",
        loadingProducts: "Preparando i migliori prodotti del Cilento...",
        // Toast
        toastCartAdd: "Aggiunto al carrello",
        toastCartRemove: "Rimosso dal carrello",
        toastCartEmpty: "Carrello svuotato",
        toastMaxStock: "Quantità massima raggiunta",
        toastMaxStockDesc: "Non puoi aggiungere altri pezzi di questo prodotto",
        toastError: "Errore",
        toastSuccess: "Fatto!",
        toastOrderSent: "Ordine inviato!",
        toastSearchResults: "risultati trovati",
        // Confirm
        confirmEmptyTitle: "Svuotare il carrello?",
        confirmEmptyMsg: "Tutti i prodotti verranno rimossi dal carrello.",
        confirmRemoveTitle: "Rimuovere prodotto?",
        confirmCancel: "Annulla",
        confirmOk: "Conferma",
        confirmDelete: "Rimuovi",
        // Checkout
        checkoutTitle: "Completa l'ordine",
        checkoutSubtitle: "Inserisci i tuoi dati per la spedizione",
        checkoutBtn: "Vai al Checkout",
        confirmBtn: "Invia Ordine",
        // Thanks
        thanksH: "Ordine Ricevuto!",
        thanksP: "Grazie per il tuo ordine.",
        thanksP2: "Ti contatteremo presto via WhatsApp per confermare.",
        thanksBack: "Continua lo Shopping",
        // Errors
        errorEmpty: "Carrello vuoto",
        errorEmptyDesc: "Aggiungi qualche prodotto prima di procedere",
        errorForm: "Compila tutti i campi",
        errorFormDesc: "Alcuni campi obbligatori sono vuoti",
        errorEmail: "Email non valida",
        errorEmailDesc: "Controlla il formato dell'email",
        errorLoad: "Errore di caricamento",
        errorLoadDesc: "Impossibile caricare i prodotti. Ricarica la pagina.",
        cartEmpty: "Il tuo carrello è vuoto",
        cartEmptyDesc: "Esplora i nostri prodotti e trova qualcosa di speciale!",
        freeShipping: "GRATIS",
        // Misc
        searchPlaceholder: "Cerca olio, pasta, vino...",
        noResults: "Nessun prodotto trovato",
        tryAgain: "Prova con altre parole chiave"
    },
    en: {
        h1: "Cilento's Gold,<br>at your home.",
        p: "Gastronomic excellence from the National Park. Authentic products, tradition and flavor.",
        badge: "✨ Cilento Quality",
        cta: "Shop Now",
        add: "Add to Cart",
        added: "Added!",
        total: "Total",
        cart: "🛒 Your Cart",
        ship: "Shipping",
        clear: "Empty Cart",
        deals: "Today's Deals",
        all: "All Products",
        byCat: "By Category",
        viewAll: "View all",
        maxQty: "Max available",
        out: "Out of Stock",
        low: "Last pieces!",
        ok: "In Stock",
        shipping: "FREE Shipping on orders over €120",
        theme: "🌙 Dark Mode",
        themeLight: "☀️ Light Mode",
        loading: "Loading...",
        loadingProducts: "Preparing the best products from Cilento...",
        toastCartAdd: "Added to cart",
        toastCartRemove: "Removed from cart",
        toastCartEmpty: "Cart emptied",
        toastMaxStock: "Maximum quantity reached",
        toastMaxStockDesc: "Cannot add more of this product",
        toastError: "Error",
        toastSuccess: "Done!",
        toastOrderSent: "Order sent!",
        toastSearchResults: "results found",
        confirmEmptyTitle: "Empty cart?",
        confirmEmptyMsg: "All products will be removed from the cart.",
        confirmRemoveTitle: "Remove product?",
        confirmCancel: "Cancel",
        confirmOk: "Confirm",
        confirmDelete: "Remove",
        checkoutTitle: "Complete your order",
        checkoutSubtitle: "Enter your shipping details",
        checkoutBtn: "Go to Checkout",
        confirmBtn: "Send Order",
        thanksH: "Order Received!",
        thanksP: "Thank you for your order.",
        thanksP2: "We'll contact you soon via WhatsApp to confirm.",
        thanksBack: "Continue Shopping",
        errorEmpty: "Empty cart",
        errorEmptyDesc: "Add some products before proceeding",
        errorForm: "Fill all fields",
        errorFormDesc: "Some required fields are empty",
        errorEmail: "Invalid email",
        errorEmailDesc: "Check the email format",
        errorLoad: "Loading error",
        errorLoadDesc: "Unable to load products. Reload the page.",
        cartEmpty: "Your cart is empty",
        cartEmptyDesc: "Explore our products and find something special!",
        freeShipping: "FREE",
        searchPlaceholder: "Search olive oil, pasta, wine...",
        noResults: "No products found",
        tryAgain: "Try different keywords"
    },
    de: {
        h1: "Cilento Gold,<br>zu Ihnen nach Hause.",
        p: "Kulinarische Exzellenz aus dem Nationalpark. Authentische Produkte, Tradition und Geschmack.",
        badge: "✨ Cilento Qualität",
        cta: "Jetzt Kaufen",
        add: "Hinzufügen",
        added: "Hinzugefügt!",
        total: "Gesamt",
        cart: "🛒 Warenkorb",
        ship: "Versand",
        clear: "Leeren",
        deals: "Aktuelle Angebote",
        all: "Alle Produkte",
        byCat: "Nach Kategorie",
        viewAll: "Alle anzeigen",
        maxQty: "Max verfügbar",
        out: "Ausverkauft",
        low: "Letzte Stück!",
        ok: "Verfügbar",
        shipping: "KOSTENLOSER Versand ab €120",
        theme: "🌙 Dunkel",
        themeLight: "☀️ Hell",
        loading: "Laden...",
        loadingProducts: "Die besten Produkte aus Cilento werden vorbereitet...",
        toastCartAdd: "Zum Warenkorb hinzugefügt",
        toastCartRemove: "Aus Warenkorb entfernt",
        toastCartEmpty: "Warenkorb geleert",
        toastMaxStock: "Maximale Menge erreicht",
        toastMaxStockDesc: "Keine weiteren Stücke verfügbar",
        toastError: "Fehler",
        toastSuccess: "Fertig!",
        toastOrderSent: "Bestellung gesendet!",
        toastSearchResults: "Ergebnisse gefunden",
        confirmEmptyTitle: "Warenkorb leeren?",
        confirmEmptyMsg: "Alle Produkte werden entfernt.",
        confirmRemoveTitle: "Produkt entfernen?",
        confirmCancel: "Abbrechen",
        confirmOk: "Bestätigen",
        confirmDelete: "Entfernen",
        checkoutTitle: "Bestellung abschließen",
        checkoutSubtitle: "Geben Sie Ihre Versanddetails ein",
        checkoutBtn: "Zur Kasse",
        confirmBtn: "Bestellung senden",
        thanksH: "Bestellung erhalten!",
        thanksP: "Vielen Dank für Ihre Bestellung.",
        thanksP2: "Wir kontaktieren Sie bald per WhatsApp.",
        thanksBack: "Weiter einkaufen",
        errorEmpty: "Warenkorb leer",
        errorEmptyDesc: "Fügen Sie Produkte hinzu",
        errorForm: "Alle Felder ausfüllen",
        errorFormDesc: "Einige Pflichtfelder sind leer",
        errorEmail: "Ungültige E-Mail",
        errorEmailDesc: "Überprüfen Sie das E-Mail-Format",
        errorLoad: "Ladefehler",
        errorLoadDesc: "Produkte konnten nicht geladen werden.",
        cartEmpty: "Ihr Warenkorb ist leer",
        cartEmptyDesc: "Entdecken Sie unsere Produkte!",
        freeShipping: "KOSTENLOS",
        searchPlaceholder: "Suche...",
        noResults: "Keine Produkte gefunden",
        tryAgain: "Versuchen Sie andere Suchbegriffe"
    },
    hu: {
        h1: "Cilento Aranya,<br>az otthonába.",
        p: "Gasztronómiai élmény a Nemzeti Parkból. Autentikus termékek, hagyomány és íz.",
        badge: "✨ Cilento Minőség",
        cta: "Vásárlás",
        add: "Kosárba",
        added: "Hozzáadva!",
        total: "Összesen",
        cart: "🛒 Kosár",
        ship: "Szállítás",
        clear: "Ürítés",
        deals: "Akciók",
        all: "Összes termék",
        byCat: "Kategóriák",
        viewAll: "Mind",
        maxQty: "Max elérhető",
        out: "Elfogyott",
        low: "Utolsó darabok!",
        ok: "Raktáron",
        shipping: "INGYENES szállítás €120 felett",
        theme: "🌙 Sötét",
        themeLight: "☀️ Világos",
        loading: "Betöltés...",
        loadingProducts: "A legjobb Cilento termékek előkészítése...",
        toastCartAdd: "Kosárba helyezve",
        toastCartRemove: "Eltávolítva a kosárból",
        toastCartEmpty: "Kosár kiürítve",
        toastMaxStock: "Maximális mennyiség elérve",
        toastMaxStockDesc: "Nem adható hozzá több",
        toastError: "Hiba",
        toastSuccess: "Kész!",
        toastOrderSent: "Rendelés elküldve!",
        toastSearchResults: "találat",
        confirmEmptyTitle: "Kosár ürítése?",
        confirmEmptyMsg: "Minden termék törlésre kerül.",
        confirmRemoveTitle: "Termék eltávolítása?",
        confirmCancel: "Mégse",
        confirmOk: "Rendben",
        confirmDelete: "Törlés",
        checkoutTitle: "Rendelés befejezése",
        checkoutSubtitle: "Adja meg szállítási adatait",
        checkoutBtn: "Pénztárhoz",
        confirmBtn: "Rendelés küldése",
        thanksH: "Rendelés megérkezett!",
        thanksP: "Köszönjük rendelését.",
        thanksP2: "Hamarosan felvesszük a kapcsolatot WhatsApp-on.",
        thanksBack: "Tovább vásárolok",
        errorEmpty: "Üres kosár",
        errorEmptyDesc: "Adjon hozzá termékeket",
        errorForm: "Töltse ki az összes mezőt",
        errorFormDesc: "Néhány kötelező mező üres",
        errorEmail: "Érvénytelen email",
        errorEmailDesc: "Ellenőrizze az email formátumot",
        errorLoad: "Betöltési hiba",
        errorLoadDesc: "Nem sikerült betölteni a termékeket.",
        cartEmpty: "A kosár üres",
        cartEmptyDesc: "Fedezze fel termékeinket!",
        freeShipping: "INGYENES",
        searchPlaceholder: "Keresés...",
        noResults: "Nincs találat",
        tryAgain: "Próbáljon más kulcsszavakat"
    }
};

/* ========================================
   STATO GLOBALE
   ======================================== */
const state = {
    products: [],
    cart: [],
    lang: 'it',
    view: 'all',
    carouselIndex: 0,
    searchQuery: '',
    isLoading: true,
    confirmCallback: null
};

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
        
        // Animate in
        requestAnimationFrame(() => toast.classList.add('show'));
        
        // Auto remove
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
        
        cancelBtn.textContent = cancelText || UI[state.lang].confirmCancel;
        okBtn.textContent = confirmText || UI[state.lang].confirmOk;
        okBtn.className = `confirm-btn confirm ${type === 'danger' ? 'danger' : ''}`;
        
        state.confirmCallback = onConfirm;
        
        okBtn.onclick = () => {
            this.close();
            if (state.confirmCallback) state.confirmCallback();
        };
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus trap
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
        
        // Safety timeout - hide loader after max time
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
    },
    
    setText(text) {
        if (this.textElement) this.textElement.textContent = text;
    }
};

/* ========================================
   THEME
   ======================================== */
const Theme = {
    init() {
        const saved = localStorage.getItem('gizzi_theme') || 'light';
        document.documentElement.setAttribute('data-theme', saved);
        this.updateUI();
    },
    
    toggle() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('gizzi_theme', next);
        this.updateUI();
        Toast.info(next === 'dark' ? '🌙' : '☀️', next === 'dark' ? 'Tema scuro' : 'Tema chiaro');
    },
    
    updateUI() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const link = document.getElementById('theme-link');
        if (link) link.textContent = isDark ? UI[state.lang].themeLight : UI[state.lang].theme;
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
                Toast.success(UI[state.lang].toastCartAdd, `${productName} (${existing.qty}x)`);
            } else {
                Toast.warning(UI[state.lang].toastMaxStock, UI[state.lang].toastMaxStockDesc);
                return;
            }
        } else {
            if (product.StockNum > 0) {
                state.cart.push({ ...product, qty: 1 });
                Toast.success(UI[state.lang].toastCartAdd, productName);
            }
        }
        
        this.animateButton(productId);
        this.save();
        this.updateUI();
        
        // Open cart if not visible
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
        btn.innerHTML = `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg><span>${UI[state.lang].added}</span>`;
        
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
        
        Toast.info(UI[state.lang].toastCartRemove, productName);
    },
    
    confirmRemove(productId) {
        const item = state.cart.find(c => c.ID === productId);
        if (!item) return;
        
        const nameKey = state.lang === 'it' ? 'Nome' : `Nome_${state.lang.toUpperCase()}`;
        const productName = item[nameKey] || item.Nome;
        
        Confirm.show({
            title: UI[state.lang].confirmRemoveTitle,
            message: `"${productName}"`,
            type: 'danger',
            confirmText: UI[state.lang].confirmDelete,
            onConfirm: () => this.remove(productId)
        });
    },
    
    updateQty(productId, delta) {
        const item = state.cart.find(c => c.ID === productId);
        const product = state.products.find(p => p.ID === productId);
        
        if (!item || !product) return;
        
        if (delta > 0 && item.qty >= product.StockNum) {
            Toast.warning(UI[state.lang].toastMaxStock, UI[state.lang].toastMaxStockDesc);
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
            title: UI[state.lang].confirmEmptyTitle,
            message: UI[state.lang].confirmEmptyMsg,
            type: 'danger',
            confirmText: UI[state.lang].clear,
            onConfirm: () => this.empty()
        });
    },
    
    empty() {
        state.cart = [];
        this.save();
        this.updateUI();
        Toast.info(UI[state.lang].toastCartEmpty);
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
                    <p class="cart-empty-title">${UI[state.lang].cartEmpty}</p>
                    <p class="cart-empty-desc">${UI[state.lang].cartEmptyDesc}</p>
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
                            <button class="qty-btn" onclick="Cart.updateQty('${item.ID}', -1)" ${item.qty <= 1 ? 'data-warning' : ''}>−</button>
                            <span class="qty-value">${item.qty}</span>
                            <button class="qty-btn" onclick="Cart.updateQty('${item.ID}', 1)" ${item.qty >= product?.StockNum ? 'disabled' : ''}>+</button>
                        </div>
                        <div class="cart-item-price">€${Utils.formatPrice(itemTotal)}</div>
                        <button class="cart-item-remove" onclick="Cart.confirmRemove('${item.ID}')" title="Rimuovi">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                    </div>
                `;
}).join('');
            checkoutBtn.disabled = false;
        }
        
        // Update totals
        const subtotal = this.getTotal();
        const shipping = this.getShipping(subtotal);
        const isFreeShipping = shipping === 0 && state.cart.length > 0;
        
        document.getElementById('shipping-label').textContent = UI[state.lang].ship;
        const shippingValue = document.getElementById('shipping-value');
        shippingValue.textContent = isFreeShipping ? UI[state.lang].freeShipping : `€${Utils.formatPrice(shipping)}`;
        shippingValue.className = isFreeShipping ? 'free-shipping' : '';
        
        document.getElementById('total-label').textContent = UI[state.lang].total;
        document.getElementById('total-value').textContent = `€${Utils.formatPrice(subtotal + shipping)}`;
        
        // Update count with animation
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
        Loader.show(UI[state.lang].loadingProducts);
        
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), CONFIG.loadingTimeout - 1000);
            
            const res = await fetch(CONFIG.catalog, { signal: controller.signal });
            clearTimeout(timeoutId);
            
            const text = await res.text();
            const rows = text.split('\n').filter(r => r.trim());
            const headers = rows[0].split(',').map(h => h.trim());
            
            state.products = rows.slice(1).map(row => {
                const cols = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
                const obj = {};
                headers.forEach((h, i) => obj[h] = cols[i]?.replace(/"/g, '').trim());
                const stockVal = obj.Stock || obj.Quantità || obj.stock;
                obj.StockNum = stockVal === '' || stockVal === undefined ? 999 : parseInt(stockVal);
                return obj;
            });
            
            return true;
        } catch (error) {
            console.error('Error loading products:', error);
            Toast.error(UI[state.lang].errorLoad, UI[state.lang].errorLoadDesc);
            return false;
        }
    },
    
    getActive() {
        let products = state.products.filter(p => p.Disponibile === 'SI');
        
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
        return Utils.shuffle(this.getActive().filter(p => p.Evidenza === 'SI' && p.StockNum > 0));
    },
    
    getCategories() {
        const catKey = state.lang === 'it' ? 'Categoria' : `Categoria_${state.lang.toUpperCase()}`;
        return [...new Set(this.getActive().map(p => p[catKey] || p.Categoria))];
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
                badge = `<div class="product-badge danger">🔥 ${UI[state.lang].low}</div>`;
            }
        }
        
        return `
            <article class="product-card" data-id="${product.ID}">
                ${badge}
                <div class="product-img-wrapper">
                    <img class="product-img" 
                         src="${product.Immagine}" 
                         alt="${productName}" 
                         loading="lazy"
                         style="${isOut ? 'filter:grayscale(1);opacity:0.5;' : ''}"
                         onerror="this.src='https://via.placeholder.com/200x160?text=📦'">
                    <div class="product-overlay"></div>
                </div>
                <h3 class="product-name">${productName}</h3>
                <div class="product-price">
                    <span class="price-current">€${product.Prezzo}</span>
                    <span class="price-unit">/ ${product.Unità || 'pz'}</span>
                </div>
                <div class="product-stock ${isOut || isLow ? 'stock-low' : 'stock-ok'}">
                    <span class="stock-dot"></span>
                    ${isOut ? UI[state.lang].out : (isLow ? UI[state.lang].low : UI[state.lang].ok)}
                </div>
                <button class="btn-add" id="btn-add-${product.ID}" ${isOut ? 'disabled' : ''} onclick="Cart.add('${product.ID}')">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    <span>${isOut ? UI[state.lang].out : UI[state.lang].add}</span>
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
        this.carousel();
        this.categoryNav();
        this.products();
    },
    
    carousel() {
        const featured = Products.getFeatured();
        const track = document.getElementById('carousel-track');
        track.innerHTML = featured.map(p => Products.createCard(p)).join('');
        state.carouselIndex = 0;
    },
    
    categoryNav() {
        const categories = Utils.shuffle(Products.getCategories());
        document.getElementById('category-nav').innerHTML = categories.map(cat =>
            `<a class="cat-link" href="#" onclick="App.goToCategory('${cat.replace(/\s+/g, '')}');return false;">${cat}</a>`
        ).join('');
    },
    
    products() {
        const products = Products.getActive();
        const categories = Utils.shuffle(Products.getCategories());
        const catKey = state.lang === 'it' ? 'Categoria' : `Categoria_${state.lang.toUpperCase()}`;
        
        let html = '';
        
        if (products.length === 0) {
            html = `
                <div class="no-results">
                    <div class="no-results-icon">🔍</div>
                    <h3>${UI[state.lang].noResults}</h3>
                    <p>${UI[state.lang].tryAgain}</p>
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
        
        document.getElementById('negozio').innerHTML = html;
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
    },
    
    stop() {
        if (this.interval) clearInterval(this.interval);
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
            input.placeholder = UI[state.lang].searchPlaceholder;
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
            Toast.info('🔍', `${count} ${UI[state.lang].toastSearchResults}`);
        }
    },
    
    clear() {
        const input = document.getElementById('search-input');
        if (input) input.value = '';
        state.searchQuery = '';
        Render.products();
    }
};

/* ========================================
   CHECKOUT
   ======================================== */
const Checkout = {
    open() {
        if (state.cart.length === 0) {
            Toast.error(UI[state.lang].errorEmpty, UI[state.lang].errorEmptyDesc);
            return;
        }
        
        Cart.toggle(); // Close cart
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
        
        // Reset errors
        Object.values(fields).forEach(el => el?.classList.remove('error'));
        
        let hasError = false;
        
        if (!fields.name?.value.trim()) {
            fields.name?.classList.add('error');
            hasError = true;
        }
        
        if (!fields.email?.value.trim() || !Utils.isValidEmail(fields.email.value)) {
            fields.email?.classList.add('error');
            if (fields.email?.value.trim() && !Utils.isValidEmail(fields.email.value)) {
                Toast.error(UI[state.lang].errorEmail, UI[state.lang].errorEmailDesc);
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
            Toast.error(UI[state.lang].errorForm, UI[state.lang].errorFormDesc);
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
        
        // Send to Google Forms
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
        
        // Show thanks
        document.getElementById('thanks-order-id').textContent = `#${orderId}`;
        document.getElementById('modal').classList.remove('active');
        document.getElementById('thanks-popup').classList.add('active');
        
        // Open WhatsApp
        const waMsg = `*🛒 ORDINE ${orderId}*

*👤 Cliente:* ${name}
*📧 Email:* ${email}
*📱 Tel:* ${phone}
*📍 Indirizzo:* ${addr}
*🌍 Destinazione:* ${country}

*📦 Prodotti:*
${details.join('\n')}

*🚚 Spedizione:* €${Utils.formatPrice(shipping)}
*💰 TOTALE:* €${total}`;
        
        window.open(`https://wa.me/${CONFIG.wa}?text=${encodeURIComponent(waMsg)}`);
        
        // Clear cart
        state.cart = [];
        Cart.save();
    }
};

/* ========================================
   LANGUAGE
   ======================================== */
const Language = {
    update(lang) {
        state.lang = lang;
        const u = UI[lang];
        
        // Update all UI elements
        const updates = {
            'hero-h1': { prop: 'innerHTML', value: u.h1 },
            'hero-p': { prop: 'textContent', value: u.p },
            'hero-badge': { prop: 'textContent', value: u.badge },
            'deals-title': { prop: 'textContent', value: u.deals },
            'btn-all': { prop: 'textContent', value: u.all },
            'btn-cats': { prop: 'textContent', value: u.byCat },
            'cart-label': { prop: 'textContent', value: u.cart },
            'btn-clear-text': { prop: 'textContent', value: u.clear },
            'btn-checkout-text': { prop: 'textContent', value: u.checkoutBtn },
            'modal-title': { prop: 'textContent', value: u.checkoutTitle },
            'modal-subtitle': { prop: 'textContent', value: u.checkoutSubtitle },
            'btn-confirm-text': { prop: 'textContent', value: u.confirmBtn },
            'thanks-h': { prop: 'textContent', value: u.thanksH },
            'thanks-p': { prop: 'textContent', value: u.thanksP },
            'thanks-p2': { prop: 'textContent', value: u.thanksP2 },
            'btn-back': { prop: 'textContent', value: u.thanksBack },
            'top-bar-shipping': { prop: 'textContent', value: u.shipping }
        };
        
        for (const [id, { prop, value }] of Object.entries(updates)) {
            const el = document.getElementById(id);
            if (el) el[prop] = value;
        }
        
        // Update CTA button
        const ctaBtn = document.getElementById('hero-cta');
        if (ctaBtn) {
            ctaBtn.innerHTML = `${u.cta} <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>`;
        }
        
        // Update view all link
        const viewAll = document.getElementById('view-all-link');
        if (viewAll) {
            viewAll.innerHTML = `${u.viewAll} <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>`;
        }
        
        Theme.updateUI();
        Search.init();
        Render.all();
        Cart.updateUI();
        
        Toast.info('🌐', `Lingua: ${lang.toUpperCase()}`);
    }
};

/* ========================================
   APP CONTROLLER
   ======================================== */
const App = {
    async init() {
        // Initialize components
        Loader.init();
        Toast.init();
        Theme.init();
        Cart.load();
        Search.init();
        
        // Setup event listeners
        this.setupListeners();
        
        // Load products
        const success = await Products.load();
        
        if (success) {
            Render.all();
            Cart.updateUI();
            Carousel.autoPlay();
        }
        
        // Hide loader (with safety)
        Loader.hide();
        
        // Check GDPR
        setTimeout(() => GDPR.check(), 1000);
    },
    
    setupListeners() {
        // Header scroll effect
        window.addEventListener('scroll', Utils.debounce(() => {
            const header = document.getElementById('main-header');
            if (header) {
                header.classList.toggle('scrolled', window.scrollY > 50);
            }
        }, 10));
        
        // Cart overlay
        document.getElementById('cart-overlay')?.addEventListener('click', () => Cart.toggle());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                Confirm.close();
                Checkout.close();
                if (document.getElementById('cart-panel')?.classList.contains('active')) {
                    Cart.toggle();
                }
            }
        });
        
        // Search input
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
    
    scrollToProducts() {
        Utils.scrollTo('negozio', 100);
    },
    
    reload() {
        localStorage.removeItem('gizzi_cart');
        location.reload();
    }
};

/* ========================================
   GLOBAL FUNCTIONS (for HTML onclick)
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
function validateAndSubmit() { Checkout.submit(); }
function clearAndReload() { App.reload(); }
function performSearch() { Search.perform(); }
function handleSearch(e) { Search.onKeyUp(e); }
function smoothScrollTo(id) { Utils.scrollTo(id, 100); }
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

/* ========================================
   INIT
   ======================================== */
document.addEventListener('DOMContentLoaded', () => App.init());

// Fallback: hide loader if still visible after timeout
window.addEventListener('load', () => {
    setTimeout(() => {
        if (state.isLoading) {
            Loader.hide();
        }
    }, 1000);
});
