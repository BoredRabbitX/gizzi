/**
 * GRUPPO GIZZI - CONFIGURATION MODULE
 * Centralizzata delle configurazioni e costanti
 */

const CONFIG = {
    // API ENDPOINTS
    api: {
        catalog: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRIumwZulbMAuesmG69DB8Y1bx2Y-NQXfyG7_m1-rdpZ-SoOxM0JyZtnj0_eV_K4t4drULTwV44nE5Y/pub?gid=0&single=true&output=csv",
        orderForm: "https://docs.google.com/forms/d/e/1FAIpQLSend7KPNCjTNP1d-B3zd-wvhZAVXLS3P7341yN88fm3d7D4Jw/formResponse",
        emailService: "https://script.google.com/macros/s/AKfycbwv1iqWofz-uaNpOlOD-D6qhPx-heZ8IAp6ZdJ1FdbK7BU8xLmGu9sN3wqnDkQaXbkp/exec"
    },

    // CONTACT
    contact: {
        whatsapp: "393667540018",
        email: "info@gruppogizzi.it"
    },

    // SHIPPING
    shipping: {
        italy: {
            threshold: 120,
            cost: 13
        },
        europe: {
            cost: 50
        }
    },

    // UI SETTINGS
    ui: {
        carousel: {
            autoPlay: 5000,
            animationDuration: 600
        },
        animation: {
            duration: 300,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        },
        breakpoints: {
            mobile: 768,
            tablet: 1024,
            desktop: 1280
        }
    },

    // STORAGE KEYS
    storage: {
        cart: 'gizzi_cart',
        language: 'gizzi_lang',
        theme: 'gizzi_theme',
        gdpr: 'gizzi_gdpr',
        favorites: 'gizzi_favorites'
    },

    // PRODUCT CATEGORIES
    categories: [
        'Oli Extravergini',
        'Conservazione',
        'Pasta e Grani',
        'Dolciaria',
        'Bevande',
        'Salse e Condimenti',
        'Formaggi e Salumi',
        'Erbe Aromatiche'
    ],

    // DEFAULT SETTINGS
    defaults: {
        language: 'it',
        theme: 'light',
        currency: 'EUR',
        itemsPerPage: 12
    }
};

// Export per uso in altri moduli
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    window.CONFIG = CONFIG;
}