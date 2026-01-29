/**
 * Funzioni utility
 */

const Utils = {
    /**
     * Mescola un array (Fisher-Yates shuffle)
     * @param {Array} arr - Array da mescolare
     * @returns {Array} - Array mescolato
     */
    shuffle(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    },
    
    /**
     * Debounce function
     * @param {Function} fn - Funzione da eseguire
     * @param {number} delay - Ritardo in millisecondi
     * @returns {Function}
     */
    debounce(fn, delay) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), delay);
        };
    },
    
    /**
     * Formatta un prezzo
     * @param {string|number} price - Prezzo da formattare
     * @returns {string} - Prezzo formattato con 2 decimali
     */
    formatPrice(price) {
        const num = typeof price === 'string' ? parseFloat(price.replace(',', '.')) : price;
        return num.toFixed(2);
    },
    
    /**
     * Scrolla a un elemento
     * @param {string} id - ID dell'elemento
     * @param {number} offset - Offset in pixel
     */
    scrollTo(id, offset = 0) {
        const el = document.getElementById(id);
        if (el) {
            const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    },
    
    /**
     * Valida un indirizzo email
     * @param {string} email - Email da validare
     * @returns {boolean}
     */
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    
    /**
     * Genera un ID ordine univoco
     * @returns {string}
     */
    generateOrderId() {
        return 'GZ-' + Date.now().toString().slice(-6);
    }
};

// Esporta per l'uso in altri moduli
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Utils };
}
