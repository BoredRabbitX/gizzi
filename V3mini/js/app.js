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

// ========================================
// PRODUCT MODAL
// ========================================
function openProductModal(productId) {
    const product = state.products.find(p => p.ID === productId);
    if (!product) return;
    
    const modal = document.getElementById('product-modal');
    const img = document.getElementById('product-modal-img');
    const name = document.getElementById('product-modal-name');
    const price = document.getElementById('product-modal-price');
    const desc = document.getElementById('product-modal-desc');
    
    if (!modal) return;
    
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

// ========================================
// GLOBAL FUNCTIONS
// ========================================
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
function updateCartUI() { Cart.updateUI(); }

// ========================================
// INIT
// ========================================
document.addEventListener('DOMContentLoaded', () => App.init());

// Fallback: forza hide loader dopo timeout (in caso di errori)
window.addEventListener('load', () => {
    setTimeout(() => {
        if (state.isLoading) Loader.forceHide();
    }, 1000);
});

// Esporta per l'uso in altri moduli
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { App };
}
