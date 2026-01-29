/**
 * Router per navigazione SPA (Single Page Application)
 */

const Router = {
    currentPage: 'home',
    
    /**
     * Configurazione delle pagine
     */
    pages: {
        home: {
            id: 'home',
            showHero: true,
            showPromo: true,
            showHomeContent: true,
            showPageContent: false
        },
        contatti: {
            id: 'contatti',
            file: 'pages/contatti.html',
            showHero: false,
            showPromo: false,
            showHomeContent: false,
            showPageContent: true
        },
        spedizioni: {
            id: 'spedizioni',
            file: 'pages/spedizioni.html',
            showHero: false,
            showPromo: false,
            showHomeContent: false,
            showPageContent: true
        },
        resi: {
            id: 'resi',
            file: 'pages/resi.html',
            showHero: false,
            showPromo: false,
            showHomeContent: false,
            showPageContent: true
        },
        faq: {
            id: 'faq',
            file: 'pages/faq.html',
            showHero: false,
            showPromo: false,
            showHomeContent: false,
            showPageContent: true
        }
    },
    
    /**
     * Titoli delle pagine per lingua
     */
    titles: {
        it: {
            home: 'Gruppo Gizzi | Il Tuo Supermercato del Cilento',
            contatti: 'Contattaci | Gruppo Gizzi',
            spedizioni: 'Spedizioni | Gruppo Gizzi',
            resi: 'Resi e Rimborsi | Gruppo Gizzi',
            faq: 'FAQ | Gruppo Gizzi'
        },
        en: {
            home: 'Gruppo Gizzi | Your Cilento Supermarket',
            contatti: 'Contact Us | Gruppo Gizzi',
            spedizioni: 'Shipping | Gruppo Gizzi',
            resi: 'Returns & Refunds | Gruppo Gizzi',
            faq: 'FAQ | Gruppo Gizzi'
        },
        de: {
            home: 'Gruppo Gizzi | Ihr Cilento Supermarkt',
            contatti: 'Kontakt | Gruppo Gizzi',
            spedizioni: 'Versand | Gruppo Gizzi',
            resi: 'Rückgabe & Erstattung | Gruppo Gizzi',
            faq: 'FAQ | Gruppo Gizzi'
        },
        hu: {
            home: 'Gruppo Gizzi | Az Ön Cilento Szupermarketje',
            contatti: 'Kapcsolat | Gruppo Gizzi',
            spedizioni: 'Szállítás | Gruppo Gizzi',
            resi: 'Visszaküldés és Visszatérítés | Gruppo Gizzi',
            faq: 'GYIK | Gruppo Gizzi'
        }
    },
    
    /**
     * Inizializza il router
     */
    init() {
        // Gestisce i pulsanti back/forward del browser
        window.addEventListener('popstate', (e) => {
            const page = window.location.hash.replace('#', '') || 'home';
            this.loadPage(page, false);
        });
        
        // Carica la pagina iniziale in base all'URL hash
        const initialPage = window.location.hash.replace('#', '') || 'home';
        this.loadPage(initialPage, false);
    },
    
    /**
     * Naviga a una pagina
     * @param {string} pageId - ID della pagina
     */
    navigate(pageId) {
        if (!this.pages[pageId]) {
            console.error(`Page ${pageId} not found`);
            return;
        }
        
        // Aggiorna l'URL hash
        window.location.hash = pageId === 'home' ? '' : pageId;
        
        // Carica la pagina
        this.loadPage(pageId, true);
        
        // Scrolla in cima
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    
    /**
     * Carica una pagina
     * @param {string} pageId - ID della pagina
     * @param {boolean} pushState - Se true, aggiorna lo stato del browser
     */
    async loadPage(pageId, pushState = true) {
        const config = this.pages[pageId];
        if (!config) return;
        
        this.currentPage = pageId;
        
        // Mostra/nascondi sezioni
        this.toggleSection('hero-section', config.showHero);
        this.toggleSection('promo-strip', config.showPromo);
        this.toggleSection('home-content', config.showHomeContent);
        
        const pageContentEl = document.getElementById('page-content');
        
        if (config.showPageContent && config.file) {
            // Carica contenuto pagina dinamicamente
            try {
                const response = await fetch(config.file);
                if (!response.ok) throw new Error('Page not found');
                
                let html = await response.text();
                
                // Estrai il contenuto body se è una pagina HTML completa
                const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
                if (bodyMatch) {
                    html = bodyMatch[1];
                }
                
                // Aggiorna contenuto pagina
                pageContentEl.innerHTML = html;
                pageContentEl.style.display = 'block';
                
                // Inizializza script specifici della pagina
                this.initPageScripts(pageId);
                
            } catch (error) {
                console.error('Error loading page:', error);
                pageContentEl.innerHTML = `
                    <div class="page-error" style="padding: 40px; text-align: center;">
                        <h2>Errore di caricamento</h2>
                        <p>Impossibile caricare la pagina richiesta.</p>
                        <button onclick="Router.navigate('home')" style="margin-top: 20px; padding: 10px 20px; cursor: pointer;">Torna alla Home</button>
                    </div>
                `;
                pageContentEl.style.display = 'block';
            }
        } else {
            pageContentEl.style.display = 'none';
            pageContentEl.innerHTML = '';
        }
        
        // Aggiorna stato attivo nella navigazione
        this.updateActiveNav(pageId);
        
        // Aggiorna titolo pagina
        this.updatePageTitle(pageId);
    },
    
    /**
     * Mostra o nasconde una sezione
     * @param {string} id - ID della sezione
     * @param {boolean} show - Se true, mostra la sezione
     */
    toggleSection(id, show) {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = show ? '' : 'none';
        }
    },
    
    /**
     * Aggiorna lo stato attivo nella navigazione
     * @param {string} pageId - ID della pagina
     */
    updateActiveNav(pageId) {
        // Rimuovi classe active da tutti i link
        document.querySelectorAll('.footer-col a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Aggiungi classe active al link corrente
        const activeLink = document.querySelector(`a[href="#${pageId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    },
    
    /**
     * Aggiorna il titolo della pagina
     * @param {string} pageId - ID della pagina
     */
    updatePageTitle(pageId) {
        const lang = state.lang || 'it';
        const title = this.titles[lang]?.[pageId] || this.titles['it'][pageId];
        document.title = title;
    },
    
    /**
     * Inizializza script specifici della pagina
     * @param {string} pageId - ID della pagina
     */
    initPageScripts(pageId) {
        if (pageId === 'contatti') {
            const form = document.getElementById('contact-form');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    Toast.success('Messaggio inviato!', 'Ti contatteremo presto.');
                });
            }
        }
    }
};

// Esporta per l'uso in altri moduli
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Router };
}
 * Router per navigazione SPA (Single Page Application)
 */

const Router = {
    currentPage: 'home',
    
    /**
     * Configurazione delle pagine
     */
    pages: {
        home: {
            id: 'home',
            showHero: true,
            showPromo: true,
            showHomeContent: true,
            showPageContent: false
        },
        contatti: {
            id: 'contatti',
            file: 'pages/contatti.html',
            showHero: false,
            showPromo: false,
            showHomeContent: false,
            showPageContent: true
        },
        spedizioni: {
            id: 'spedizioni',
            file: 'pages/spedizioni.html',
            showHero: false,
            showPromo: false,
            showHomeContent: false,
            showPageContent: true
        },
        resi: {
            id: 'resi',
            file: 'pages/resi.html',
            showHero: false,
            showPromo: false,
            showHomeContent: false,
            showPageContent: true
        },
        faq: {
            id: 'faq',
            file: 'pages/faq.html',
            showHero: false,
            showPromo: false,
            showHomeContent: false,
            showPageContent: true
        }
    },
    
    /**
     * Titoli delle pagine per lingua
     */
    titles: {
        it: {
            home: 'Gruppo Gizzi | Il Tuo Supermercato del Cilento',
            contatti: 'Contattaci | Gruppo Gizzi',
            spedizioni: 'Spedizioni | Gruppo Gizzi',
            resi: 'Resi e Rimborsi | Gruppo Gizzi',
            faq: 'FAQ | Gruppo Gizzi'
        },
        en: {
            home: 'Gruppo Gizzi | Your Cilento Supermarket',
            contatti: 'Contact Us | Gruppo Gizzi',
            spedizioni: 'Shipping | Gruppo Gizzi',
            resi: 'Returns & Refunds | Gruppo Gizzi',
            faq: 'FAQ | Gruppo Gizzi'
        },
        de: {
            home: 'Gruppo Gizzi | Ihr Cilento Supermarkt',
            contatti: 'Kontakt | Gruppo Gizzi',
            spedizioni: 'Versand | Gruppo Gizzi',
            resi: 'Rückgabe & Erstattung | Gruppo Gizzi',
            faq: 'FAQ | Gruppo Gizzi'
        },
        hu: {
            home: 'Gruppo Gizzi | Az Ön Cilento Szupermarketje',
            contatti: 'Kapcsolat | Gruppo Gizzi',
            spedizioni: 'Szállítás | Gruppo Gizzi',
            resi: 'Visszaküldés és Visszatérítés | Gruppo Gizzi',
            faq: 'GYIK | Gruppo Gizzi'
        }
    },
    
    /**
     * Inizializza il router
     */
    init() {
        // Gestisce i pulsanti back/forward del browser
        window.addEventListener('popstate', (e) => {
            const page = window.location.hash.replace('#', '') || 'home';
            this.loadPage(page, false);
        });
        
        // Carica la pagina iniziale in base all'URL hash
        const initialPage = window.location.hash.replace('#', '') || 'home';
        this.loadPage(initialPage, false);
    },
    
    /**
     * Naviga a una pagina
     * @param {string} pageId - ID della pagina
     */
    navigate(pageId) {
        if (!this.pages[pageId]) {
            console.error(`Page ${pageId} not found`);
            return;
        }
        
        // Aggiorna l'URL hash
        window.location.hash = pageId === 'home' ? '' : pageId;
        
        // Carica la pagina
        this.loadPage(pageId, true);
        
        // Scrolla in cima
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    
    /**
     * Carica una pagina
     * @param {string} pageId - ID della pagina
     * @param {boolean} pushState - Se true, aggiorna lo stato del browser
     */
    async loadPage(pageId, pushState = true) {
        const config = this.pages[pageId];
        if (!config) return;
        
        this.currentPage = pageId;
        
        // Mostra/nascondi sezioni
        this.toggleSection('hero-section', config.showHero);
        this.toggleSection('promo-strip', config.showPromo);
        this.toggleSection('home-content', config.showHomeContent);
        
        const pageContentEl = document.getElementById('page-content');
        
        if (config.showPageContent && config.file) {
            // Carica contenuto pagina dinamicamente
            try {
                const response = await fetch(config.file);
                if (!response.ok) throw new Error('Page not found');
                
                let html = await response.text();
                
                // Estrai il contenuto body se è una pagina HTML completa
                const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
                if (bodyMatch) {
                    html = bodyMatch[1];
                }
                
                // Aggiorna contenuto pagina
                pageContentEl.innerHTML = html;
                pageContentEl.style.display = 'block';
                
                // Inizializza script specifici della pagina
                this.initPageScripts(pageId);
                
            } catch (error) {
                console.error('Error loading page:', error);
                pageContentEl.innerHTML = `
                    <div class="page-error" style="padding: 40px; text-align: center;">
                        <h2>Errore di caricamento</h2>
                        <p>Impossibile caricare la pagina richiesta.</p>
                        <button onclick="Router.navigate('home')" style="margin-top: 20px; padding: 10px 20px; cursor: pointer;">Torna alla Home</button>
                    </div>
                `;
                pageContentEl.style.display = 'block';
            }
        } else {
            pageContentEl.style.display = 'none';
            pageContentEl.innerHTML = '';
        }
        
        // Aggiorna stato attivo nella navigazione
        this.updateActiveNav(pageId);
        
        // Aggiorna titolo pagina
        this.updatePageTitle(pageId);
    },
    
    /**
     * Mostra o nasconde una sezione
     * @param {string} id - ID della sezione
     * @param {boolean} show - Se true, mostra la sezione
     */
    toggleSection(id, show) {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = show ? '' : 'none';
        }
    },
    
    /**
     * Aggiorna lo stato attivo nella navigazione
     * @param {string} pageId - ID della pagina
     */
    updateActiveNav(pageId) {
        // Rimuovi classe active da tutti i link
        document.querySelectorAll('.footer-col a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Aggiungi classe active al link corrente
        const activeLink = document.querySelector(`a[href="#${pageId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    },
    
    /**
     * Aggiorna il titolo della pagina
     * @param {string} pageId - ID della pagina
     */
    updatePageTitle(pageId) {
        const lang = state.lang || 'it';
        const title = this.titles[lang]?.[pageId] || this.titles['it'][pageId];
        document.title = title;
    },
    
    /**
     * Inizializza script specifici della pagina
     * @param {string} pageId - ID della pagina
     */
    initPageScripts(pageId) {
        if (pageId === 'contatti') {
            const form = document.getElementById('contact-form');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    Toast.success('Messaggio inviato!', 'Ti contatteremo presto.');
                });
            }
        }
    }
};

// Esporta per l'uso in altri moduli
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Router };
}

