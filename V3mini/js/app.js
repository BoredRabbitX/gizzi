/**
 * Controller principale dell'applicazione
 */

const App = {
    /**
     * Inizializza l'applicazione
     */
    async init() {
        Loader.init();
        Toast.init();
        Theme.init();
        Cart.load();
        
        // Carica lingua salvata
        const savedLang = Language.getSaved();
        state.lang = savedLang;
        const langSelect = document.getElementById('lang-sel');
        if (langSelect) langSelect.value = savedLang;
        
        // Setup listener
        this.setupListeners();
        
        // Aggiornamento UI iniziale
        Language.updateAllElements();
        Search.init();
        
        // Carica prodotti
        const success = await Products.load();
        
        if (success) {
            Render.all();
            Cart.updateUI();
            Carousel.autoPlay();
            // Aggiorna footer DOPO caricamento prodotti per avere le categorie
            Language.updateFooter();
        }
        
        Loader.forceHide();
        setTimeout(() => GDPR.check(), 1000);
        
        // Inizializza Router per navigazione SPA
        Router.init();
    },
    
    /**
     * Setup dei listener globali
     */
    setupListeners() {
        // Header scroll effect
        window.addEventListener('scroll', Utils.debounce(() => {
            const header = document.getElementById('main-header');
            if (header) {
                header.classList.toggle('scrolled', window.scrollY > 50);
            }
        }, 10));
        
        // Cart overlay click
        document.getElementById('cart-overlay')?.addEventListener('click', () => Cart.toggle());
        
        // Cart panel click handling
        const cartPanel = document.getElementById('cart-panel');
        if (cartPanel) {
            cartPanel.addEventListener('click', (e) => {
                // Handle remove button clicks
                const removeBtn = e.target.closest('.cart-item-remove');
                if (removeBtn) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
        }
        
        // Tasto Escape per chiudere modali
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                Confirm.close();
                Checkout.close();
                closeProductModal();
                if (document.getElementById('cart-panel')?.classList.contains('active')) {
                    Cart.toggle();
                }
            }
        });
        
        // Search input
        document.getElementById('search-input')?.addEventListener('keyup', (e) => Search.onKeyUp(e));
    },
    
    /**
     * Cambia la vista prodotti (tutti o per categoria)
     * @param {string} view - 'all' o 'cats'
     */
    switchView(view) {
        state.view = view;
        document.getElementById('btn-all')?.classList.toggle('active', view === 'all');
        document.getElementById('btn-cats')?.classList.toggle('active', view === 'cats');
        Render.products();
    },
    
    /**
     * Naviga a una categoria
     * @param {string} catId - ID della categoria
     */
    goToCategory(catId) {
        if (state.view !== 'cats') this.switchView('cats');
        document.querySelectorAll('.cat-link').forEach(a => a.classList.remove('active'));
        event?.target?.classList.add('active');
        setTimeout(() => Utils.scrollTo(`cat-${catId}`, 120), 100);
    },
    
    /**
     * Ricarica la pagina e svuota il carrello
     */
    reload() {
        localStorage.removeItem('gizzi_cart');
        location.reload();
    }
};

// Inizializza l'applicazione quando il DOM è pronto
document.addEventListener('DOMContentLoaded', () => App.init());

// Fallback: forza hide loader dopo timeout (in caso di errori)
window.addEventListener('load', () => {
    setTimeout(() => {
        Loader.forceHide();
    }, 2000);
});

// Esporta per l'uso in altri moduli
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { App };
}
