/**
 * Funzionalità di ricerca
 */

const Search = {
    handler: null,
    
    /**
     * Inizializza la ricerca
     */
    init() {
        const input = document.getElementById('search-input');
        if (input) {
            input.placeholder = t('nav.searchPlaceholder');
            this.handler = Utils.debounce(() => this.perform(), 300);
        }
    },
    
    /**
     * Gestisce l'evento keyup
     * @param {KeyboardEvent} e
     */
    onKeyUp(e) {
        if (e.key === 'Enter') {
            this.perform();
        } else if (this.handler) {
            this.handler();
        }
    },
    
    /**
     * Esegue la ricerca
     */
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

// Esporta per l'uso in altri moduli
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Search };
}
