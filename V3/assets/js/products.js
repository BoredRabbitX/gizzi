/**
 * GRUPPO GIZZI - PRODUCT MANAGER
 * Gestione centralizzata dei prodotti e catalogo
 */

class ProductManager {
    constructor() {
        this.products = [];
        this.categories = [];
        this.featured = [];
        this.isLoading = false;
        this.lastUpdated = null;
        this.cacheExpiry = 30 * 60 * 1000; // 30 minuti
    }

    async init() {
        try {
            this.setLoading(true);
            await this.loadProducts();
            await this.processProducts();
            this.setLoading(false);
            return Promise.resolve();
        } catch (error) {
            this.setLoading(false);
            console.error('ProductManager initialization failed:', error);
            return Promise.reject(error);
        }
    }

    async loadProducts() {
        // Verifica cache
        if (this.isCacheValid()) {
            this.loadFromCache();
            return;
        }

        try {
            const response = await fetch(CONFIG.api.catalog);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const csvText = await response.text();
            this.parseCSV(csvText);
            this.saveToCache();
            
        } catch (error) {
            console.error('Failed to load products:', error);
            throw error;
        }
    }

    parseCSV(csvText) {
        try {
            const rows = csvText.split('\n').filter(row => row.trim() !== '');
            if (rows.length < 2) {
                throw new Error('CSV too short or empty');
            }

            const headers = this.parseCSVRow(rows[0]);
            
            this.products = rows.slice(1)
                .map((row, index) => {
                    const values = this.parseCSVRow(row);
                    const product = {};
                    
                    headers.forEach((header, i) => {
                        product[header.trim()] = values[i] ? values[i].replace(/"/g, '').trim() : '';
                    });
                    
                    // Aggiungi ID se mancante
                    if (!product.ID) {
                        product.ID = `PROD_${index + 1}`;
                    }
                    
                    // Processa stock
                    this.processStock(product);
                    
                    // Processa prezzo
                    this.processPrice(product);
                    
                    // Normalizza disponibilità
                    this.normalizeAvailability(product);
                    
                    return product;
                })
                .filter(product => product.Nome && product.Nome.trim() !== '');
                
        } catch (error) {
            console.error('CSV parsing error:', error);
            throw new Error('Failed to parse product catalog');
        }
    }

    parseCSVRow(row) {
        // Gestisce CSV con virgole dentro i campi quotati
        return row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    }

    processStock(product) {
        const stockFields = ['Stock', 'Quantità', 'stock', 'Disponibilità'];
        let stockValue = 999; // Default
        
        for (const field of stockFields) {
            if (product[field] !== undefined && product[field] !== '') {
                const parsed = parseInt(product[field]);
                if (!isNaN(parsed)) {
                    stockValue = parsed;
                    break;
                }
            }
        }
        
        product.StockNum = stockValue;
        product.InStock = stockValue > 0;
        product.IsLowStock = stockValue > 0 && stockValue < 5;
    }

    processPrice(product) {
        const priceFields = ['Prezzo', 'Prezzo €', 'Price', 'price'];
        let priceValue = 0;
        
        for (const field of priceFields) {
            if (product[field] !== undefined && product[field] !== '') {
                const parsed = parseFloat(product[field].replace(',', '.').replace('€', '').trim());
                if (!isNaN(parsed)) {
                    priceValue = parsed;
                    break;
                }
            }
        }
        
        product.PrezzoNum = priceValue;
        product.PrezzoFormattato = this.formatPrice(priceValue);
    }

    normalizeAvailability(product) {
        const availFields = ['Disponibile', 'disponibile', 'Available', 'available'];
        
        for (const field of availFields) {
            if (product[field] !== undefined) {
                const value = product[field].toString().toUpperCase();
                product.Disponibile = (value === 'SI' || value === 'YES' || value === 'TRUE') ? 'SI' : 'NO';
                break;
            }
        }
        
        if (!product.Disponibile) {
            product.Disponibile = product.InStock ? 'SI' : 'NO';
        }
    }

    processProducts() {
        // Estrae categorie uniche
        this.categories = this.extractCategories();
        
        // Identifica prodotti in evidenza
        this.featured = this.products.filter(product => 
            product.Evidenza === 'SI' && 
            product.Disponibile === 'SI' && 
            product.InStock
        );
        
        // Ordina prodotti
        this.sortProducts();
        
        this.lastUpdated = new Date();
    }

    extractCategories() {
        const categorySet = new Set();
        
        this.products.forEach(product => {
            const lang = window.i18n ? window.i18n.getCurrentLanguage() : 'it';
            const categoryField = lang === 'it' ? 'Categoria' : `Categoria_${lang.toUpperCase()}`;
            
            const category = product[categoryField] || product.Categoria || 'Altro';
            if (category && category.trim() !== '') {
                categorySet.add(category.trim());
            }
        });
        
        return Array.from(categorySet).sort();
    }

    sortProducts() {
        this.products.sort((a, b) => {
            // Prima i prodotti disponibili
            if (a.Disponibile !== b.Disponibile) {
                return a.Disponibile === 'SI' ? -1 : 1;
            }
            
            // Poi per evidenza
            if (a.Evidenza !== b.Evidenza) {
                return a.Evidenza === 'SI' ? -1 : 1;
            }
            
            // Infine per nome
            const nameA = (window.i18n ? window.i18n.getCurrentLanguage() : 'it') === 'it' ? a.Nome : a.Nome_EN || a.Nome;
            const nameB = (window.i18n ? window.i18n.getCurrentLanguage() : 'it') === 'it' ? b.Nome : b.Nome_EN || b.Nome;
            
            return nameA.localeCompare(nameB);
        });
    }

    getProducts(filters = {}) {
        let filtered = [...this.products];
        
        // Filtra per disponibilità
        if (filters.available !== false) {
            filtered = filtered.filter(p => p.Disponibile === 'SI');
        }
        
        // Filtra per categoria
        if (filters.category) {
            const lang = window.i18n ? window.i18n.getCurrentLanguage() : 'it';
            const categoryField = lang === 'it' ? 'Categoria' : `Categoria_${lang.toUpperCase()}`;
            filtered = filtered.filter(p => 
                (p[categoryField] || p.Categoria) === filters.category
            );
        }
        
        // Filtra per evidenza
        if (filters.featured) {
            filtered = filtered.filter(p => p.Evidenza === 'SI');
        }
        
        // Filtra per stock
        if (filters.inStock === true) {
            filtered = filtered.filter(p => p.InStock);
        }
        
        // Ricerca testo
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            const lang = window.i18n ? window.i18n.getCurrentLanguage() : 'it';
            const nameField = lang === 'it' ? 'Nome' : `Nome_${lang.toUpperCase()}`;
            
            filtered = filtered.filter(p => 
                (p[nameField] || p.Nome || '').toLowerCase().includes(searchTerm) ||
                (p.Descrizione || '').toLowerCase().includes(searchTerm)
            );
        }
        
        // Ordina
        if (filters.sort) {
            filtered = this.sortProductsBy(filtered, filters.sort);
        }
        
        return filtered;
    }

    getProductById(id) {
        return this.products.find(p => p.ID === id || p.id === id);
    }

    getFeaturedProducts(limit = 8) {
        return this.featured.slice(0, limit);
    }

    getCategories() {
        return this.categories;
    }

    getProductsByCategory(category) {
        return this.getProducts({ category });
    }

    searchProducts(query) {
        return this.getProducts({ search: query });
    }

    sortProductsBy(products, sortBy) {
        const sorted = [...products];
        
        switch (sortBy) {
            case 'name':
                const lang = window.i18n ? window.i18n.getCurrentLanguage() : 'it';
                const nameField = lang === 'it' ? 'Nome' : `Nome_${lang.toUpperCase()}`;
                sorted.sort((a, b) => (a[nameField] || a.Nome || '').localeCompare(b[nameField] || b.Nome || ''));
                break;
                
            case 'price-low':
                sorted.sort((a, b) => a.PrezzoNum - b.PrezzoNum);
                break;
                
            case 'price-high':
                sorted.sort((a, b) => b.PrezzoNum - a.PrezzoNum);
                break;
                
            case 'stock':
                sorted.sort((a, b) => b.StockNum - a.StockNum);
                break;
                
            case 'featured':
                sorted.sort((a, b) => {
                    if (a.Evidenza === 'SI' && b.Evidenza !== 'SI') return -1;
                    if (a.Evidenza !== 'SI' && b.Evidenza === 'SI') return 1;
                    return 0;
                });
                break;
                
            default:
                break;
        }
        
        return sorted;
    }

    formatPrice(price) {
        if (window.i18n) {
            return window.i18n.formatCurrency(price);
        }
        return `€ ${price.toFixed(2)}`;
    }

    getStockStatus(product) {
        if (product.StockNum <= 0) {
            return { status: 'out', text: 'Esaurito', class: 'badge-danger' };
        }
        if (product.StockNum < 5) {
            return { status: 'low', text: 'Ultimi pezzi', class: 'badge-warning' };
        }
        return { status: 'available', text: 'Disponibile', class: 'badge-success' };
    }

    getProductName(product) {
        const lang = window.i18n ? window.i18n.getCurrentLanguage() : 'it';
        const nameField = lang === 'it' ? 'Nome' : `Nome_${lang.toUpperCase()}`;
        return product[nameField] || product.Nome || 'Prodotto senza nome';
    }

    getProductDescription(product) {
        const lang = window.i18n ? window.i18n.getCurrentLanguage() : 'it';
        const descField = lang === 'it' ? 'Descrizione' : `Descrizione_${lang.toUpperCase()}`;
        return product[descField] || product.Descrizione || '';
    }

    setLoading(loading) {
        this.isLoading = loading;
        document.body.classList.toggle('loading', loading);
    }

    // Cache management
    isCacheValid() {
        const cached = localStorage.getItem('gizzi_products_cache');
        if (!cached) return false;
        
        const { timestamp, products } = JSON.parse(cached);
        const now = Date.now();
        
        return (now - timestamp) < this.cacheExpiry && products && products.length > 0;
    }

    saveToCache() {
        const cacheData = {
            timestamp: Date.now(),
            products: this.products,
            categories: this.categories
        };
        
        try {
            localStorage.setItem('gizzi_products_cache', JSON.stringify(cacheData));
        } catch (error) {
            console.warn('Failed to save products to cache:', error);
        }
    }

    loadFromCache() {
        try {
            const cached = localStorage.getItem('gizzi_products_cache');
            if (cached) {
                const { products, categories } = JSON.parse(cached);
                this.products = products;
                this.categories = categories;
                this.processProducts();
            }
        } catch (error) {
            console.warn('Failed to load products from cache:', error);
        }
    }

    clearCache() {
        localStorage.removeItem('gizzi_products_cache');
    }

    refreshProducts() {
        this.clearCache();
        return this.init();
    }
}

// Istanza globale
const productManager = new ProductManager();

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductManager;
} else {
    window.ProductManager = ProductManager;
    window.productManager = productManager;
}