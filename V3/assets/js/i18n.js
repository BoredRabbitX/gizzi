/**
 * GRUPPO GIZZI - INTERNATIONALIZATION MODULE
 * Sistema di traduzioni centralizzato
 */

class I18n {
    constructor() {
        this.currentLanguage = CONFIG.defaults.language;
        this.translations = {};
        this.fallbackLanguage = 'it';
    }

    async init() {
        try {
            // Carica le traduzioni dal file JSON
            const response = await fetch('./assets/i18n/translations.json');
            this.translations = await response.json();
            
            // Imposta la lingua salvata o rilevata
            this.setLanguage(this.getSavedLanguage() || this.detectLanguage());
            
            return Promise.resolve();
        } catch (error) {
            console.error('Failed to load translations:', error);
            return Promise.reject(error);
        }
    }

    detectLanguage() {
        // Lingua del browser
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.split('-')[0];
        
        // Verifica se la lingua è supportata
        if (this.isLanguageSupported(langCode)) {
            return langCode;
        }
        
        return CONFIG.defaults.language;
    }

    isLanguageSupported(lang) {
        return Object.keys(this.translations).includes(lang);
    }

    setLanguage(lang) {
        if (this.isLanguageSupported(lang)) {
            this.currentLanguage = lang;
            this.saveLanguage(lang);
            this.updateDocument();
            this.notifyLanguageChange();
            return true;
        }
        return false;
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }

    getSupportedLanguages() {
        return Object.keys(this.translations).map(lang => ({
            code: lang,
            name: this.getLanguageName(lang),
            flag: this.getLanguageFlag(lang)
        }));
    }

    getLanguageName(lang) {
        const names = {
            'it': 'Italiano',
            'en': 'English',
            'de': 'Deutsch',
            'hu': 'Magyar'
        };
        return names[lang] || lang.toUpperCase();
    }

    getLanguageFlag(lang) {
        const flags = {
            'it': '🇮🇹',
            'en': '🇬🇧',
            'de': '🇩🇪',
            'hu': '🇭🇺'
        };
        return flags[lang] || '🌍';
    }

    translate(key, params = {}) {
        try {
            // Prova con la lingua corrente
            let translation = this.getNestedValue(this.translations[this.currentLanguage], key);
            
            // Fallback alla lingua di default
            if (!translation && this.currentLanguage !== this.fallbackLanguage) {
                translation = this.getNestedValue(this.translations[this.fallbackLanguage], key);
            }
            
            // Se ancora non trova, restituisce la chiave
            if (!translation) {
                console.warn(`Translation missing for key: ${key}`);
                return key;
            }
            
            // Sostituisce i parametri
            return this.interpolate(translation, params);
        } catch (error) {
            console.error('Translation error:', error);
            return key;
        }
    }

    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current && current[key], obj);
    }

    interpolate(text, params) {
        if (!params || Object.keys(params).length === 0) {
            return text;
        }
        
        return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            return params[key] !== undefined ? params[key] : match;
        });
    }

    updateDocument() {
        // Aggiorna attributi HTML
        document.documentElement.lang = this.currentLanguage;
        
        // Aggiorna meta tag
        this.updateMetaTags();
        
        // Aggiorna tutti gli elementi con data-i18n
        this.updateElements();
    }

    updateMetaTags() {
        const meta = this.translate('meta');
        
        // Title
        document.title = meta.title || document.title;
        
        // Description
        const descriptionTag = document.querySelector('meta[name="description"]');
        if (descriptionTag) {
            descriptionTag.content = meta.description || '';
        }
        
        // Keywords
        const keywordsTag = document.querySelector('meta[name="keywords"]');
        if (keywordsTag) {
            keywordsTag.content = meta.keywords || '';
        }
    }

    updateElements() {
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translate(key);
            
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (element.type === 'placeholder') {
                    element.placeholder = translation;
                } else {
                    element.value = translation;
                }
            } else {
                element.textContent = translation;
            }
        });
    }

    saveLanguage(lang) {
        localStorage.setItem(CONFIG.storage.language, lang);
    }

    getSavedLanguage() {
        return localStorage.getItem(CONFIG.storage.language);
    }

    notifyLanguageChange() {
        // Evento personalizzato per notificare il cambio lingua
        const event = new CustomEvent('languageChange', {
            detail: { language: this.currentLanguage }
        });
        document.dispatchEvent(event);
    }

    // Formatta valori in base alla lingua
    formatCurrency(amount, currency = CONFIG.defaults.currency) {
        try {
            return new Intl.NumberFormat(this.currentLanguage, {
                style: 'currency',
                currency: currency
            }).format(amount);
        } catch (error) {
            return `€ ${amount.toFixed(2)}`;
        }
    }

    formatDate(date, options = {}) {
        try {
            const defaultOptions = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            return new Intl.DateTimeFormat(this.currentLanguage, { ...defaultOptions, ...options }).format(date);
        } catch (error) {
            return date.toLocaleDateString();
        }
    }

    formatNumber(number, options = {}) {
        try {
            const defaultOptions = {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
            };
            return new Intl.NumberFormat(this.currentLanguage, { ...defaultOptions, ...options }).format(number);
        } catch (error) {
            return number.toString();
        }
    }
}

// Istanza globale
const i18n = new I18n();

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = I18n;
} else {
    window.I18n = I18n;
    window.i18n = i18n;
}