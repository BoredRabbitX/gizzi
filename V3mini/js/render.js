/**
 * Rendering della UI
 */

const Render = {
    /**
     * Renderizza tutti i componenti
     */
    all() {
        this.carousel();
        this.categoryNav();
        this.products();
    },
    
    /**
     * Renderizza il carousel delle offerte
     */
    carousel() {
        const featured = Products.getFeatured();
        const track = document.getElementById('carousel-track');
        if (!track) return;
        
        if (featured.length === 0) {
            track.innerHTML = '<p style="padding: 20px; text-align: center;">Nessun prodotto in evidenza</p>';
        } else {
            track.innerHTML = featured.map(p => Products.createCard(p)).join('');
        }
        state.carouselIndex = 0;
    },
    
    /**
     * Renderizza la navigazione per categoria
     */
    categoryNav() {
        const categories = Products.getCategories();
        state.currentCategories = categories;
        
        const nav = document.getElementById('category-nav');
        if (!nav) return;
        
        if (categories.length === 0) {
            nav.innerHTML = '<span style="padding: 10px;">Nessuna categoria</span>';
        } else {
            nav.innerHTML = categories.map(cat =>
                `<a class="cat-link" href="#" onclick="App.goToCategory('${cat.replace(/\s+/g, '')}');return false;">${cat}</a>`
            ).join('');
        }
    },
    
    /**
     * Renderizza la griglia prodotti
     */
    products() {
        const products = Products.getActive();
        const categories = Utils.shuffle(Products.getCategories());
        const catKey = state.lang === 'it' ? 'Categoria' : `Categoria_${state.lang.toUpperCase()}`;
        
        const container = document.getElementById('negozio');
        if (!container) return;
        
        let html = '';
        
        if (products.length === 0) {
            html = `
                <div class="no-results">
                    <div class="no-results-icon">🔍</div>
                    <h3>${t('products.noResults')}</h3>
                    <p>${t('products.tryAgain')}</p>
                </div>
            `;
        } else if (state.view === 'all') {
            html = `<div class="products-grid">${Utils.shuffle(products).map(p => Products.createCard(p)).join('')}</div>`;
        } else {
            html = categories.map(cat => {
                const catProducts = products.filter(p => (p[catKey] || p.Categoria) === cat);
                if (catProducts.length === 0) return '';
                return `
                    <section class="category-section" id="cat-${cat.replace(/\s+/g, '')}">
                        <h2 class="category-title">📦 ${cat}</h2>
                        <div class="products-grid">${catProducts.map(p => Products.createCard(p)).join('')}</div>
                    </section>
                `;
            }).join('');
        }
        
        container.innerHTML = html;
    }
};

/**
 * Gestione Carousel
 */
const Carousel = {
    interval: null,
    
    /**
     * Muove il carousel
     * @param {number} direction - Direzione (+1 o -1)
     */
    move(direction) {
        const track = document.getElementById('carousel-track');
        const cards = track.querySelectorAll('.product-card');
        if (cards.length === 0) return;
        
        const cardWidth = cards[0].offsetWidth + 20;
        const visible = Math.floor(track.parentElement.offsetWidth / cardWidth) || 1;
        const max = Math.max(0, cards.length - visible);
        
        state.carouselIndex = Math.max(0, Math.min(max, state.carouselIndex + direction));
        track.style.transform = `translateX(-${state.carouselIndex * cardWidth}px)`;
    },
    
    /**
     * Avvia l'autoplay del carousel
     */
    autoPlay() {
        this.interval = setInterval(() => {
            const track = document.getElementById('carousel-track');
            const cards = track.querySelectorAll('.product-card');
            if (cards.length === 0) return;
            
            const cardWidth = cards[0].offsetWidth + 20;
            const visible = Math.floor(track.parentElement.offsetWidth / cardWidth) || 1;
            const max = Math.max(0, cards.length - visible);
            
            state.carouselIndex++;
            if (state.carouselIndex > max) state.carouselIndex = 0;
            
            track.style.transform = `translateX(-${state.carouselIndex * cardWidth}px)`;
        }, 5000);
    }
};

// Esporta per l'uso in altri moduli
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Render, Carousel };
}
