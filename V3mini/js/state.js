/**
 * Stato globale dell'applicazione
 */

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

// Esporta per l'uso in altri moduli
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { state };
}
 * Stato globale dell'applicazione
 */

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

// Esporta per l'uso in altri moduli
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { state };
}

