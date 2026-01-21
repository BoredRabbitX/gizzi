/**
 * GRUPPO GIZZI - CART MANAGER
 * Gestione centralizzata del carrello acquisti
 */

class CartManager {
    constructor() {
        this.items = [];
        this.subtotal = 0;
        this.shipping = 0;
        this.total = 0;
        this.shippingCountry = 'Italia';
        this.listeners = [];
        this.isUpdating = false;
    }

    init() {
        this.loadCart();
        this.calculateTotals();
        this.notifyChange();
        return Promise.resolve();
    }

    // Event listeners
    addListener(callback) {
        this.listeners.push(callback);
    }

    removeListener(callback) {
        this.listeners = this.listeners.filter(listener => listener !== callback);
    }

    notifyChange() {
        const cartData = this.getCartData();
        this.listeners.forEach(callback => {
            try {
                callback(cartData);
            } catch (error) {
                console.error('Cart listener error:', error);
            }
        });
        
        // Evento DOM
        const event = new CustomEvent('cartChange', { detail: cartData });
        document.dispatchEvent(event);
    }

    // Caricamento e salvataggio
    loadCart() {
        try {
            const saved = localStorage.getItem(CONFIG.storage.cart);
            if (saved) {
                const data = JSON.parse(saved);
                this.items = data.items || [];
                this.shippingCountry = data.shippingCountry || 'Italia';
            }
        } catch (error) {
            console.error('Failed to load cart:', error);
            this.items = [];
        }
    }

    saveCart() {
        try {
            const data = {
                items: this.items,
                shippingCountry: this.shippingCountry,
                savedAt: Date.now()
            };
            localStorage.setItem(CONFIG.storage.cart, JSON.stringify(data));
        } catch (error) {
            console.error('Failed to save cart:', error);
        }
    }

    // Gestione articoli
    addItem(product, quantity = 1) {
        if (this.isUpdating) return false;
        
        try {
            this.isUpdating = true;
            
            // Verifica disponibilità
            const maxQuantity = product.StockNum || 999;
            if (product.StockNum <= 0) {
                this.showMessage(i18n.translate('alerts.stockReached'), 'error');
                return false;
            }

            // Cerca articolo esistente
            const existingItem = this.items.find(item => item.ID === product.ID);
            
            if (existingItem) {
                // Aggiunge quantità se disponibile
                const newQuantity = existingItem.quantity + quantity;
                if (newQuantity <= maxQuantity) {
                    existingItem.quantity = newQuantity;
                    existingItem.addedAt = Date.now();
                } else {
                    this.showMessage(i18n.translate('alerts.stockReached'), 'warning');
                    return false;
                }
            } else {
                // Nuovo articolo
                this.items.push({
                    ID: product.ID,
                    Nome: product.Nome,
                    Nome_EN: product.Nome_EN,
                    Nome_DE: product.Nome_DE,
                    Nome_HU: product.Nome_HU,
                    Prezzo: product.Prezzo,
                    PrezzoNum: product.PrezzoNum,
                    Immagine: product.Immagine,
                    Unità: product.Unità || 'pz',
                    StockNum: product.StockNum,
                    quantity: Math.min(quantity, maxQuantity),
                    addedAt: Date.now()
                });
            }

            this.calculateTotals();
            this.saveCart();
            this.notifyChange();
            
            // Feedback utente
            this.showMessage(
                i18n.translate('cart.itemAdded'), 
                'success'
            );
            
            // Analytics
            this.trackAddToCart(product, quantity);
            
            return true;
            
        } catch (error) {
            console.error('Add to cart error:', error);
            return false;
        } finally {
            this.isUpdating = false;
        }
    }

    removeItem(productId) {
        if (this.isUpdating) return false;
        
        try {
            this.isUpdating = true;
            
            const itemIndex = this.items.findIndex(item => item.ID === productId);
            if (itemIndex > -1) {
                const removedItem = this.items[itemIndex];
                this.items.splice(itemIndex, 1);
                
                this.calculateTotals();
                this.saveCart();
                this.notifyChange();
                
                this.showMessage(
                    i18n.translate('cart.itemRemoved'), 
                    'info'
                );
                
                // Analytics
                this.trackRemoveFromCart(removedItem);
                
                return true;
            }
            
            return false;
            
        } catch (error) {
            console.error('Remove from cart error:', error);
            return false;
        } finally {
            this.isUpdating = false;
        }
    }

    updateQuantity(productId, delta) {
        if (this.isUpdating) return false;
        
        try {
            this.isUpdating = true;
            
            const item = this.items.find(item => item.ID === productId);
            if (!item) return false;
            
            const newQuantity = item.quantity + delta;
            const maxQuantity = item.StockNum || 999;
            
            if (newQuantity <= 0) {
                // Rimuovi articolo
                return this.removeItem(productId);
            } else if (newQuantity <= maxQuantity) {
                // Aggiorna quantità
                item.quantity = newQuantity;
                item.updatedAt = Date.now();
                
                this.calculateTotals();
                this.saveCart();
                this.notifyChange();
                
                return true;
            } else {
                this.showMessage(i18n.translate('alerts.stockReached'), 'warning');
                return false;
            }
            
        } catch (error) {
            console.error('Update quantity error:', error);
            return false;
        } finally {
            this.isUpdating = false;
        }
    }

    setQuantity(productId, quantity) {
        if (this.isUpdating) return false;
        
        try {
            this.isUpdating = true;
            
            const item = this.items.find(item => item.ID === productId);
            if (!item) return false;
            
            const maxQuantity = item.StockNum || 999;
            
            if (quantity <= 0) {
                return this.removeItem(productId);
            } else if (quantity <= maxQuantity) {
                item.quantity = quantity;
                item.updatedAt = Date.now();
                
                this.calculateTotals();
                this.saveCart();
                this.notifyChange();
                
                return true;
            } else {
                this.showMessage(i18n.translate('alerts.stockReached'), 'warning');
                return false;
            }
            
        } catch (error) {
            console.error('Set quantity error:', error);
            return false;
        } finally {
            this.isUpdating = false;
        }
    }

    // Calcoli
    calculateTotals() {
        this.subtotal = this.items.reduce((total, item) => {
            return total + (item.PrezzoNum * item.quantity);
        }, 0);

        this.shipping = this.calculateShipping();
        this.total = this.subtotal + this.shipping;
    }

    calculateShipping() {
        if (this.items.length === 0) return 0;
        
        const country = this.shippingCountry;
        
        if (country === 'Italia') {
            return this.subtotal >= CONFIG.shipping.italy.threshold ? 0 : CONFIG.shipping.italy.cost;
        } else if (country === 'Europa') {
            return CONFIG.shipping.europe.cost;
        }
        
        return 0;
    }

    setShippingCountry(country) {
        this.shippingCountry = country;
        this.calculateTotals();
        this.saveCart();
        this.notifyChange();
    }

    // Getters
    getCartData() {
        return {
            items: [...this.items],
            itemCount: this.getItemCount(),
            subtotal: this.subtotal,
            shipping: this.shipping,
            total: this.total,
            shippingCountry: this.shippingCountry,
            isEmpty: this.isEmpty()
        };
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    isEmpty() {
        return this.items.length === 0;
    }

    getItem(productId) {
        return this.items.find(item => item.ID === productId);
    }

    getAllItems() {
        return [...this.items];
    }

    // Operazioni bulk
    clearCart() {
        if (this.isUpdating) return false;
        
        try {
            this.isUpdating = true;
            
            const clearedItems = [...this.items];
            this.items = [];
            this.calculateTotals();
            this.saveCart();
            this.notifyChange();
            
            this.showMessage(i18n.translate('cart.itemRemoved'), 'info');
            
            // Analytics
            this.trackClearCart(clearedItems);
            
            return true;
            
        } catch (error) {
            console.error('Clear cart error:', error);
            return false;
        } finally {
            this.isUpdating = false;
        }
    }

    // Validazione checkout
    canCheckout() {
        return !this.isEmpty() && this.items.every(item => item.StockNum > 0);
    }

    // Formattazione valori
    formatPrice(amount) {
        if (window.i18n) {
            return window.i18n.formatCurrency(amount);
        }
        return `€ ${amount.toFixed(2)}`;
    }

    getFormattedSubtotal() {
        return this.formatPrice(this.subtotal);
    }

    getFormattedShipping() {
        return this.formatPrice(this.shipping);
    }

    getFormattedTotal() {
        return this.formatPrice(this.total);
    }

    // Utils
    getProductQuantity(productId) {
        const item = this.getItem(productId);
        return item ? item.quantity : 0;
    }

    isProductInCart(productId) {
        return this.items.some(item => item.ID === productId);
    }

    // Analytics tracking
    trackAddToCart(product, quantity) {
        try {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'add_to_cart', {
                    currency: 'EUR',
                    value: product.PrezzoNum * quantity,
                    items: [{
                        item_id: product.ID,
                        item_name: productManager.getProductName(product),
                        category: product.Categoria,
                        quantity: quantity,
                        price: product.PrezzoNum
                    }]
                });
            }
        } catch (error) {
            console.warn('Analytics tracking error:', error);
        }
    }

    trackRemoveFromCart(item) {
        try {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'remove_from_cart', {
                    currency: 'EUR',
                    value: item.PrezzoNum * item.quantity,
                    items: [{
                        item_id: item.ID,
                        item_name: item.Nome,
                        quantity: item.quantity,
                        price: item.PrezzoNum
                    }]
                });
            }
        } catch (error) {
            console.warn('Analytics tracking error:', error);
        }
    }

    trackClearCart(items) {
        try {
            if (typeof gtag !== 'undefined') {
                items.forEach(item => {
                    gtag('event', 'remove_from_cart', {
                        currency: 'EUR',
                        value: item.PrezzoNum * item.quantity,
                        items: [{
                            item_id: item.ID,
                            item_name: item.Nome,
                            quantity: item.quantity,
                            price: item.PrezzoNum
                        }]
                    });
                });
            }
        } catch (error) {
            console.warn('Analytics tracking error:', error);
        }
    }

    // Messaggi utente
    showMessage(message, type = 'info') {
        // Dispatch evento per UI
        const event = new CustomEvent('cartMessage', {
            detail: { message, type }
        });
        document.dispatchEvent(event);
    }

    // Validazione stock prima del checkout
    validateStock() {
        const issues = [];
        
        this.items.forEach(item => {
            const product = productManager.getProductById(item.ID);
            if (!product || product.StockNum < item.quantity) {
                issues.push({
                    item: item,
                    available: product ? product.StockNum : 0,
                    requested: item.quantity
                });
            }
        });
        
        return {
            isValid: issues.length === 0,
            issues: issues
        };
    }

    // Stima tempi di spedizione
    getShippingEstimate() {
        if (this.shippingCountry === 'Italia') {
            return {
                minDays: 2,
                maxDays: 4,
                description: '2-4 giorni lavorativi'
            };
        } else if (this.shippingCountry === 'Europa') {
            return {
                minDays: 5,
                maxDays: 8,
                description: '5-8 giorni lavorativi'
            };
        }
        
        return {
            minDays: 3,
            maxDays: 6,
            description: '3-6 giorni lavorativi'
        };
    }
}

// Istanza globale
const cartManager = new CartManager();

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CartManager;
} else {
    window.CartManager = CartManager;
    window.cartManager = cartManager;
}