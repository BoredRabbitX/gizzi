/**
 * Gestione internazionalizzazione (i18n) e lingua
 */

/**
 * Sistema di traduzione
 */
const i18n = {
    /**
     * Ottiene una traduzione tramite chiave annidata (es: "hero.h1")
     * @param {string} key - Chiave della traduzione
     * @param {string} fallback - Valore di fallback
     * @returns {string}
     */
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

/**
 * Shortcut per la traduzione
 * @param {string} key - Chiave della traduzione
 * @param {string} fallback - Valore di fallback
 * @returns {string}
 */
const t = (key, fallback) => i18n.t(key, fallback);

/**
 * Gestione lingua
 */
const Language = {
    /**
     * Aggiorna la lingua dell'applicazione
     * @param {string} lang - Codice lingua (it, en, de, hu)
     */
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
        
        // Aggiorna il titolo della pagina se su una pagina
        if (typeof Router !== 'undefined') {
            Router.updatePageTitle(Router.currentPage);
        }
        
        Toast.info(t('meta.flag'), t('meta.name'));
    },
    
    /**
     * Aggiorna tutti gli elementi UI con le traduzioni
     */
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
    
    /**
     * Aggiorna le label del form
     */
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
    
    /**
     * Mappa delle pagine per lingua
     */
    pageMappings: {
        it: { contact: 'contatti', shipping: 'spedizioni', returns: 'resi', faq: 'faq' },
        en: { contact: 'contact', shipping: 'shipping', returns: 'returns', faq: 'faq-en' },
        de: { contact: 'kontakt', shipping: 'versand', returns: 'rueckgabe', faq: 'faq' },
        hu: { contact: 'kapcsolat', shipping: 'szallitas', returns: 'visszakuldes', faq: 'gyik' }
    },
    
    /**
     * Ottiene l'ID della pagina nella lingua corrente
     * @param {string} pageType - Tipo di pagina (contact, shipping, returns, faq)
     * @returns {string} - ID della pagina
     */
    getPageId(pageType) {
        return this.pageMappings[state.lang]?.[pageType] || this.pageMappings['it'][pageType];
    },
    
    /**
     * Aggiorna il footer
     */
    updateFooter() {
        const footerCols = document.querySelectorAll('.footer-col');
        if (footerCols.length < 4) return;
        
        const aboutP = footerCols[0].querySelectorAll('p');
        if (aboutP[0]) aboutP[0].textContent = t('footer.about');
        if (aboutP[1]) aboutP[1].textContent = t('footer.tradition');
        
        const catH4 = footerCols[1].querySelector('h4');
        if (catH4) catH4.textContent = t('footer.categories');
        
        // Genera categorie dinamiche - usa Products.getCategories() per ottenere categorie nella lingua corrente
        const catCol = footerCols[1];
        const oldCatLinks = catCol.querySelectorAll('a');
        oldCatLinks.forEach(link => link.remove());
        
        // Usa Products.getCategories() che restituisce categorie nella lingua corrente
        const categories = Products.getCategories();
        categories.forEach(cat => {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = cat;
            link.onclick = (e) => {
                e.preventDefault();
                if (typeof Router !== 'undefined') {
                    Router.navigate('home');
                }
                setTimeout(() => App.goToCategory(cat.replace(/\s+/g, '')), 100);
            };
            catCol.appendChild(link);
        });
        
        const supportH4 = footerCols[2].querySelector('h4');
        const supportLinks = footerCols[2].querySelectorAll('a');
        if (supportH4) supportH4.textContent = t('footer.support');
        if (supportLinks[0]) {
            supportLinks[0].textContent = t('footer.contact');
            supportLinks[0].href = '#' + this.getPageId('contact');
            supportLinks[0].onclick = (e) => { 
                e.preventDefault(); 
                if (typeof Router !== 'undefined') {
                    Router.navigate(this.getPageId('contact'));
                }
            };
        }
        if (supportLinks[1]) {
            supportLinks[1].textContent = t('footer.shippingInfo');
            supportLinks[1].href = '#' + this.getPageId('shipping');
            supportLinks[1].onclick = (e) => { 
                e.preventDefault(); 
                if (typeof Router !== 'undefined') {
                    Router.navigate(this.getPageId('shipping'));
                }
            };
        }
        if (supportLinks[2]) {
            supportLinks[2].textContent = t('footer.returns');
            supportLinks[2].href = '#' + this.getPageId('returns');
            supportLinks[2].onclick = (e) => { 
                e.preventDefault(); 
                if (typeof Router !== 'undefined') {
                    Router.navigate(this.getPageId('returns'));
                }
            };
        }
        if (supportLinks[3]) {
            supportLinks[3].textContent = t('footer.faq');
            supportLinks[3].href = '#' + this.getPageId('faq');
            supportLinks[3].onclick = (e) => { 
                e.preventDefault(); 
                if (typeof Router !== 'undefined') {
                    Router.navigate(this.getPageId('faq'));
                }
            };
        }
        
        const contactH4 = footerCols[3].querySelector('h4');
        if (contactH4) contactH4.textContent = t('footer.contactTitle');
    },
    
    /**
     * Ottiene la lingua salvata
     * @returns {string}
     */
    getSaved() {
        return localStorage.getItem('gizzi_lang') || CONFIG.defaultLanguage;
    }
};

// Esporta per l'uso in altri moduli
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { i18n, t, Language };
}