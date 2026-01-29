/**
 * Gestione prodotti e caricamento dal catalogo
 */

const Products = {
    /**
     * Carica i prodotti dal catalogo Google Sheets
     * @returns {Promise<boolean>}
     */
    async load() {
        Loader.show(t('loading.products'));
        
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), CONFIG.loadingTimeout - 1000);
            
            const res = await fetch(CONFIG.catalog, { signal: controller.signal });
            clearTimeout(timeoutId);
            
            const text = await res.text();
            const rows = text.split('\n').filter(r => r.trim());
            
            if (rows.length === 0) {
                throw new Error('CSV vuoto');
            }
            
            const headers = rows[0].split(',').map(h => h.trim());
            
            state.products = rows.slice(1).map((row) => {
                const cols = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
                const obj = {};
                headers.forEach((h, i) => obj[h] = cols[i]?.replace(/"/g, '').trim());
                const stockVal = obj.Stock || obj.Quantità || obj.stock;
                obj.StockNum = stockVal === '' || stockVal === undefined ? 999 : parseInt(stockVal);
                return obj;
            });
            
            return true;
        } catch (error) {
            console.error('Error loading products:', error);
            Toast.error(t('errors.load'), t('errors.loadDesc'));
            return false;
        }
    },
    
    /**
     * Ottiene i prodotti attivi (disponibili)
     * @returns {Array}
     */
    getActive() {
        let products = state.products.filter(p => p.Disponibile === 'SI');
        
        if (state.searchQuery) {
            const q = state.searchQuery.toLowerCase();
            const nameKey = state.lang === 'it' ? 'Nome' : `Nome_${state.lang.toUpperCase()}`;
            const catKey = state.lang === 'it' ? 'Categoria' : `Categoria_${state.lang.toUpperCase()}`;
            
            products = products.filter(p =>
                (p[nameKey] || p.Nome).toLowerCase().includes(q) ||
                (p[catKey] || p.Categoria).toLowerCase().includes(q)
            );
        }
        
        return products;
    },
    
    /**
     * Ottiene i prodotti in evidenza
     * @returns {Array}
     */
    getFeatured() {
        const active = this.getActive();
        const featured = active.filter(p => p.Evidenza === 'SI' && p.StockNum > 0);
        return Utils.shuffle(featured);
    },
    
    /**
     * Ottiene le categorie disponibili
     * @returns {Array}
     */
    getCategories() {
        const active = this.getActive();
        const catKey = state.lang === 'it' ? 'Categoria' : `Categoria_${state.lang.toUpperCase()}`;
        const categories = [...new Set(active.map(p => p[catKey] || p.Categoria))].filter(Boolean);
        return categories;
    },
    
    /**
     * Crea la card HTML di un prodotto
     * @param {Object} product - Oggetto prodotto
     * @returns {string} - HTML della card
     */
    createCard(product) {
        const nameKey = state.lang === 'it' ? 'Nome' : `Nome_${state.lang.toUpperCase()}`;
        const productName = product[nameKey] || product.Nome;
        const isOut = product.StockNum <= 0;
        const isLow = product.StockNum > 0 && product.StockNum < 5;
        
        let badge = '';
        if (!isOut) {
            if (product.Evidenza === 'SI') {
                badge = `<div class="product-badge rollback">⭐ Top</div>`;
            } else if (isLow) {
                badge = `<div class="product-badge danger">🔥 ${t('products.low')}</div>`;
            }
        }
        
        return `
            <article class="product-card" data-id="${product.ID}">
                ${badge}
                <div class="product-img-wrapper" onclick="openProductModal('${product.ID}')" style="cursor: pointer;">
                    <img class="product-img" 
                         src="${product.Immagine}" 
                         alt="${productName}" 
                         loading="lazy"
                         style="${isOut ? 'filter:grayscale(1);opacity:0.5;' : ''}"
                         onerror="this.src='https://via.placeholder.com/200x160?text=📦'">
                    <div class="product-overlay">
                        <span class="product-info-btn">ℹ️ Info</span>
                    </div>
                </div>
                <h3 class="product-name" onclick="openProductModal('${product.ID}')" style="cursor: pointer;">${productName}</h3>
                <div class="product-price">
                    <span class="price-current">€${product.Prezzo}</span>
                    <span class="price-unit">/ ${product.Unità || 'pz'}</span>
                </div>
                <div class="product-stock ${isOut || isLow ? 'stock-low' : 'stock-ok'}">
                    <span class="stock-dot"></span>
                    ${isOut ? t('products.out') : (isLow ? t('products.low') : t('products.ok'))}
                </div>
                <button class="btn-add" id="btn-add-${product.ID}" ${isOut ? 'disabled' : ''} onclick="Cart.add('${product.ID}')">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    <span>${isOut ? t('products.out') : t('products.add')}</span>
                </button>
            </article>
        `;
    }
};

// Esporta per l'uso in altri moduli
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Products };
}
 * Gestione prodotti e caricamento dal catalogo
 */

const Products = {
    /**
     * Carica i prodotti dal catalogo Google Sheets
     * @returns {Promise<boolean>}
     */
    async load() {
        Loader.show(t('loading.products'));
        
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), CONFIG.loadingTimeout - 1000);
            
            const res = await fetch(CONFIG.catalog, { signal: controller.signal });
            clearTimeout(timeoutId);
            
            const text = await res.text();
            const rows = text.split('\n').filter(r => r.trim());
            
            if (rows.length === 0) {
                throw new Error('CSV vuoto');
            }
            
            const headers = rows[0].split(',').map(h => h.trim());
            
            state.products = rows.slice(1).map((row) => {
                const cols = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
                const obj = {};
                headers.forEach((h, i) => obj[h] = cols[i]?.replace(/"/g, '').trim());
                const stockVal = obj.Stock || obj.Quantità || obj.stock;
                obj.StockNum = stockVal === '' || stockVal === undefined ? 999 : parseInt(stockVal);
                return obj;
            });
            
            return true;
        } catch (error) {
            console.error('Error loading products:', error);
            Toast.error(t('errors.load'), t('errors.loadDesc'));
            return false;
        }
    },
    
    /**
     * Ottiene i prodotti attivi (disponibili)
     * @returns {Array}
     */
    getActive() {
        let products = state.products.filter(p => p.Disponibile === 'SI');
        
        if (state.searchQuery) {
            const q = state.searchQuery.toLowerCase();
            const nameKey = state.lang === 'it' ? 'Nome' : `Nome_${state.lang.toUpperCase()}`;
            const catKey = state.lang === 'it' ? 'Categoria' : `Categoria_${state.lang.toUpperCase()}`;
            
            products = products.filter(p =>
                (p[nameKey] || p.Nome).toLowerCase().includes(q) ||
                (p[catKey] || p.Categoria).toLowerCase().includes(q)
            );
        }
        
        return products;
    },
    
    /**
     * Ottiene i prodotti in evidenza
     * @returns {Array}
     */
    getFeatured() {
        const active = this.getActive();
        const featured = active.filter(p => p.Evidenza === 'SI' && p.StockNum > 0);
        return Utils.shuffle(featured);
    },
    
    /**
     * Ottiene le categorie disponibili
     * @returns {Array}
     */
    getCategories() {
        const active = this.getActive();
        const catKey = state.lang === 'it' ? 'Categoria' : `Categoria_${state.lang.toUpperCase()}`;
        const categories = [...new Set(active.map(p => p[catKey] || p.Categoria))].filter(Boolean);
        return categories;
    },
    
    /**
     * Crea la card HTML di un prodotto
     * @param {Object} product - Oggetto prodotto
     * @returns {string} - HTML della card
     */
    createCard(product) {
        const nameKey = state.lang === 'it' ? 'Nome' : `Nome_${state.lang.toUpperCase()}`;
        const productName = product[nameKey] || product.Nome;
        const isOut = product.StockNum <= 0;
        const isLow = product.StockNum > 0 && product.StockNum < 5;
        
        let badge = '';
        if (!isOut) {
            if (product.Evidenza === 'SI') {
                badge = `<div class="product-badge rollback">⭐ Top</div>`;
            } else if (isLow) {
                badge = `<div class="product-badge danger">🔥 ${t('products.low')}</div>`;
            }
        }
        
        return `
            <article class="product-card" data-id="${product.ID}">
                ${badge}
                <div class="product-img-wrapper" onclick="openProductModal('${product.ID}')" style="cursor: pointer;">
                    <img class="product-img" 
                         src="${product.Immagine}" 
                         alt="${productName}" 
                         loading="lazy"
                         style="${isOut ? 'filter:grayscale(1);opacity:0.5;' : ''}"
                         onerror="this.src='https://via.placeholder.com/200x160?text=📦'">
                    <div class="product-overlay">
                        <span class="product-info-btn">ℹ️ Info</span>
                    </div>
                </div>
                <h3 class="product-name" onclick="openProductModal('${product.ID}')" style="cursor: pointer;">${productName}</h3>
                <div class="product-price">
                    <span class="price-current">€${product.Prezzo}</span>
                    <span class="price-unit">/ ${product.Unità || 'pz'}</span>
                </div>
                <div class="product-stock ${isOut || isLow ? 'stock-low' : 'stock-ok'}">
                    <span class="stock-dot"></span>
                    ${isOut ? t('products.out') : (isLow ? t('products.low') : t('products.ok'))}
                </div>
                <button class="btn-add" id="btn-add-${product.ID}" ${isOut ? 'disabled' : ''} onclick="Cart.add('${product.ID}')">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    <span>${isOut ? t('products.out') : t('products.add')}</span>
                </button>
            </article>
        `;
    }
};

// Esporta per l'uso in altri moduli
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Products };
}

