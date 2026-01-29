/**
 * Entry point principale dell'applicazione
 * Carica tutti i moduli e inizializza l'app
 */

// Moduli caricati in ordine di dipendenza:
// 1. config.js - Configurazione
// 2. translations.js - Traduzioni
// 3. state.js - Stato globale
// 4. utils.js - Utility
// 5. ui.js - Componenti UI (Toast, Confirm, Loader, Theme, GDPR)
// 6. cart.js - Gestione carrello
// 7. products.js - Gestione prodotti
// 8. render.js - Rendering UI
// 9. search.js - Ricerca
// 10. checkout.js - Checkout
// 11. language.js - Internazionalizzazione
// 12. router.js - Navigazione SPA
// 13. app.js - Controller principale

/**
 * Funzioni globali per accesso da HTML
 * Queste funzioni sono necessarie per gli event handler inline
 */

// UI
globalThis.toggleTheme = () => Theme.toggle();
globalThis.toggleCart = () => Cart.toggle();
globalThis.closeConfirm = () => Confirm.close();
globalThis.acceptGDPR = () => GDPR.accept();
globalThis.rejectGDPR = () => GDPR.reject();

// Carousel
globalThis.moveCarousel = (dir) => Carousel.move(dir);

// View
globalThis.switchView = (view) => App.switchView(view);

// Checkout
globalThis.openCheckout = () => Checkout.open();
globalThis.closeCheckout = () => Checkout.close();
globalThis.validateAndSubmit = () => Checkout.submit();

// Search
globalThis.performSearch = () => Search.perform();
globalThis.handleSearch = (e) => Search.onKeyUp(e);

// Language
globalThis.updateLang = (lang) => Language.update(lang);

// Cart
globalThis.confirmEmptyCart = () => Cart.confirmEmpty();
globalThis.confirmRemoveCartItem = (id) => Cart.confirmRemove(id);

// Navigation
globalThis.smoothScrollTo = (id) => Utils.scrollTo(id, 100);
globalThis.scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

// App
globalThis.clearAndReload = () => App.reload();

/**
 * Modal prodotto
 * @param {string} productId - ID del prodotto
 */
globalThis.openProductModal = function(productId) {
    const product = state.products.find(p => p.ID === productId);
    if (!product) return;
    
    const modal = document.getElementById('product-modal');
    const img = document.getElementById('product-modal-img');
    const name = document.getElementById('product-modal-name');
    const price = document.getElementById('product-modal-price');
    const desc = document.getElementById('product-modal-desc');
    
    if (!modal) return;
    
    // Ottieni contenuto localizzato
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
};

/**
 * Chiude il modal prodotto
 */
globalThis.closeProductModal = function() {
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

/**
 * Inizializzazione applicazione al DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

/**
 * Fallback per nascondere il loader
 */
window.addEventListener('load', () => {
    setTimeout(() => {
        if (state.isLoading) Loader.hide();
    }, 1000);
});
 * Entry point principale dell'applicazione
 * Carica tutti i moduli e inizializza l'app
 */

// Moduli caricati in ordine di dipendenza:
// 1. config.js - Configurazione
// 2. translations.js - Traduzioni
// 3. state.js - Stato globale
// 4. utils.js - Utility
// 5. ui.js - Componenti UI (Toast, Confirm, Loader, Theme, GDPR)
// 6. cart.js - Gestione carrello
// 7. products.js - Gestione prodotti
// 8. render.js - Rendering UI
// 9. search.js - Ricerca
// 10. checkout.js - Checkout
// 11. language.js - Internazionalizzazione
// 12. router.js - Navigazione SPA
// 13. app.js - Controller principale

/**
 * Funzioni globali per accesso da HTML
 * Queste funzioni sono necessarie per gli event handler inline
 */

// UI
globalThis.toggleTheme = () => Theme.toggle();
globalThis.toggleCart = () => Cart.toggle();
globalThis.closeConfirm = () => Confirm.close();
globalThis.acceptGDPR = () => GDPR.accept();
globalThis.rejectGDPR = () => GDPR.reject();

// Carousel
globalThis.moveCarousel = (dir) => Carousel.move(dir);

// View
globalThis.switchView = (view) => App.switchView(view);

// Checkout
globalThis.openCheckout = () => Checkout.open();
globalThis.closeCheckout = () => Checkout.close();
globalThis.validateAndSubmit = () => Checkout.submit();

// Search
globalThis.performSearch = () => Search.perform();
globalThis.handleSearch = (e) => Search.onKeyUp(e);

// Language
globalThis.updateLang = (lang) => Language.update(lang);

// Cart
globalThis.confirmEmptyCart = () => Cart.confirmEmpty();
globalThis.confirmRemoveCartItem = (id) => Cart.confirmRemove(id);

// Navigation
globalThis.smoothScrollTo = (id) => Utils.scrollTo(id, 100);
globalThis.scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

// App
globalThis.clearAndReload = () => App.reload();

/**
 * Modal prodotto
 * @param {string} productId - ID del prodotto
 */
globalThis.openProductModal = function(productId) {
    const product = state.products.find(p => p.ID === productId);
    if (!product) return;
    
    const modal = document.getElementById('product-modal');
    const img = document.getElementById('product-modal-img');
    const name = document.getElementById('product-modal-name');
    const price = document.getElementById('product-modal-price');
    const desc = document.getElementById('product-modal-desc');
    
    if (!modal) return;
    
    // Ottieni contenuto localizzato
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
};

/**
 * Chiude il modal prodotto
 */
globalThis.closeProductModal = function() {
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

/**
 * Inizializzazione applicazione al DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

/**
 * Fallback per nascondere il loader
 */
window.addEventListener('load', () => {
    setTimeout(() => {
        if (state.isLoading) Loader.hide();
    }, 1000);
});

