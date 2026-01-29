/**
 * Gestione del carrello
 * Include il fix "zero quantity" per la rimozione degli articoli
 */

const Cart = {
    /**
     * Carica il carrello dal localStorage
     */
    load() {
        try {
            const saved = localStorage.getItem('gizzi_cart');
            if (saved) state.cart = JSON.parse(saved);
        } catch (e) {
            state.cart = [];
        }
    },
    
    /**
     * Salva il carrello nel localStorage
     */
    save() {
        localStorage.setItem('gizzi_cart', JSON.stringify(state.cart));
    },
    
    /**
     * Aggiunge un prodotto al carrello
     * @param {string} productId - ID del prodotto
     */
    add(productId) {
        const product = state.products.find(p => p.ID === productId);
        if (!product) return;
        
        const existing = state.cart.find(c => c.ID === productId);
        const nameKey = state.lang === 'it' ? 'Nome' : `Nome_${state.lang.toUpperCase()}`;
        const productName = product[nameKey] || product.Nome;
        
        if (existing) {
            if (existing.qty < product.StockNum) {
                existing.qty++;
                Toast.success(t('toast.cartAdd'), `${productName} (${existing.qty}x)`);
            } else {
                Toast.warning(t('toast.maxStock'), t('toast.maxStockDesc'));
                return;
            }
        } else {
            if (product.StockNum > 0) {
                state.cart.push({ ...product, qty: 1 });
                Toast.success(t('toast.cartAdd'), productName);
            }
        }
        
        this.animateButton(productId);
        this.save();
        this.updateUI();
        
        const panel = document.getElementById('cart-panel');
        if (!panel.classList.contains('active')) {
            this.toggle();
        }
    },
    
    /**
     * Anima il pulsante "Aggiungi" dopo l'aggiunta
     * @param {string} productId - ID del prodotto
     */
    animateButton(productId) {
        const btn = document.getElementById(`btn-add-${productId}`);
        if (!btn) return;
        
        btn.classList.add('added');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg><span>${t('products.added')}</span>`;
        
        setTimeout(() => {
            btn.classList.remove('added');
            btn.innerHTML = originalHTML;
        }, 1500);
    },
    
    /**
     * Rimuove un articolo impostando la quantità a 0 (approccio "zero quantity")
     * Questo replica il comportamento del pulsante "-" quando raggiunge 0
     * @param {string} productId - ID del prodotto
     */
    removeByZeroQty(productId) {
        const item = state.cart.find(c => c.ID === productId);
        if (!item) return;
        
        // Imposta la quantità a 0 per rimuovere (come il tasto - che arriva a 0)
        item.qty = 0;
        state.cart = state.cart.filter(c => c.qty > 0);
        this.save();
        this.updateUI();
        
        const nameKey = state.lang === 'it' ? 'Nome' : `Nome_${state.lang.toUpperCase()}`;
        const productName = item[nameKey] || item.Nome;
        Toast.info(t('toast.cartRemove'), productName);
    },
    
    /**
     * Svuota il carrello impostando tutte le quantità a 0 (approccio "zero quantity")
     */
    emptyByZeroQty() {
        // Imposta tutte le quantità a 0
        state.cart.forEach(item => {
            item.qty = 0;
        });
        // Filtra via tutti gli articoli con quantità 0
        state.cart = state.cart.filter(c => c.qty > 0);
        this.save();
        this.updateUI();
        Toast.info(t('toast.cartEmpty'));
    },
    
    /**
     * Aggiorna la quantità di un articolo
     * @param {string} productId - ID del prodotto
     * @param {number} delta - Variazione (+1 o -1)
     */
    updateQty(productId, delta) {
        const item = state.cart.find(c => c.ID === productId);
        const product = state.products.find(p => p.ID === productId);
        
        if (!item || !product) return;
        
        if (delta > 0 && item.qty >= product.StockNum) {
            Toast.warning(t('toast.maxStock'), t('toast.maxStockDesc'));
            return;
        }
        
        item.qty += delta;
        
        if (item.qty <= 0) {
            state.cart = state.cart.filter(c => c.ID !== productId);
        }
        
        this.save();
        this.updateUI();
    },
    
    /**
     * Mostra il modal di conferma per rimuovere un articolo
     * @param {string} productId - ID del prodotto
     */
    confirmRemove(productId) {
        const item = state.cart.find(c => c.ID === productId);
        if (!item) return;
        
        const nameKey = state.lang === 'it' ? 'Nome' : `Nome_${state.lang.toUpperCase()}`;
        const productName = item[nameKey] || item.Nome;
        
        Confirm.show({
            title: t('confirm.removeTitle'),
            message: `"${productName}"`,
            type: 'danger',
            confirmText: t('confirm.delete'),
            onConfirm: () => this.removeByZeroQty(productId)
        });
    },
    
    /**
     * Mostra il modal di conferma per svuotare il carrello
     */
    confirmEmpty() {
        if (state.cart.length === 0) return;
        
        Confirm.show({
            title: t('confirm.emptyTitle'),
            message: t('confirm.emptyMsg'),
            type: 'danger',
            confirmText: t('cart.clear'),
            onConfirm: () => this.emptyByZeroQty()
        });
    },
    
    /**
     * Apre/chiude il pannello del carrello
     */
    toggle() {
        const panel = document.getElementById('cart-panel');
        const overlay = document.getElementById('cart-overlay');
        
        const isOpen = panel.classList.toggle('active');
        overlay.style.display = isOpen ? 'block' : 'none';
        document.body.style.overflow = isOpen ? 'hidden' : '';
    },
    
    /**
     * Calcola il totale del carrello
     * @returns {number}
     */
    getTotal() {
        return state.cart.reduce((sum, item) => {
            return sum + (parseFloat(item.Prezzo.replace(',', '.')) * item.qty);
        }, 0);
    },
    
    /**
     * Calcola le spese di spedizione
     * @param {number} subtotal - Subtotale
     * @returns {number}
     */
    getShipping(subtotal) {
        const country = document.getElementById('f-country')?.value || 'Italia';
        if (state.cart.length === 0) return 0;
        return country === 'Italia' ? (subtotal >= 120 ? 0 : 13) : 50;
    },
    
    /**
     * Aggiorna l'interfaccia del carrello
     */
    updateUI() {
        const nameKey = state.lang === 'it' ? 'Nome' : `Nome_${state.lang.toUpperCase()}`;
        const cartItems = document.getElementById('cart-items');
        const checkoutBtn = document.getElementById('btn-checkout');
        const countEl = document.getElementById('cart-count');
        
        if (state.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="cart-empty">
                    <div class="cart-empty-icon">🛒</div>
                    <p class="cart-empty-title">${t('cart.empty')}</p>
                    <p class="cart-empty-desc">${t('cart.emptyDesc')}</p>
                </div>
            `;
            checkoutBtn.disabled = true;
        } else {
            cartItems.innerHTML = state.cart.map(item => {
                const product = state.products.find(p => p.ID === item.ID);
                const itemTotal = parseFloat(item.Prezzo.replace(',', '.')) * item.qty;
                const productName = item[nameKey] || item.Nome;
                
                return `
                    <div class="cart-item" data-id="${item.ID}">
                        <img class="cart-item-img" src="${item.Immagine}" alt="${productName}" 
                             onerror="this.src='https://via.placeholder.com/60x60?text=📦'">
                        <div class="cart-item-info">
                            <div class="cart-item-name">${productName}</div>
                            <div class="cart-item-meta">€${item.Prezzo} × ${item.qty}</div>
                        </div>
                        <div class="qty-controls">
                            <button class="qty-btn qty-minus" onclick="Cart.updateQty('${item.ID}', -1)">−</button>
                            <span class="qty-value">${item.qty}</span>
                            <button class="qty-btn qty-plus" onclick="Cart.updateQty('${item.ID}', 1)" ${item.qty >= product?.StockNum ? 'disabled' : ''}>+</button>
                        </div>
                        <div class="cart-item-price">€${Utils.formatPrice(itemTotal)}</div>
                        <a href="javascript:void(0)" class="cart-item-remove" onclick="Cart.confirmRemove('${item.ID}'); return false;" title="${t('confirm.delete')}">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </a>
                    </div>
                `;
            }).join('');
            checkoutBtn.disabled = false;
        }
        
        const subtotal = this.getTotal();
        const shipping = this.getShipping(subtotal);
        const isFreeShipping = shipping === 0 && state.cart.length > 0;
        
        document.getElementById('shipping-label').textContent = t('cart.shipping');
        const shippingValue = document.getElementById('shipping-value');
        shippingValue.textContent = isFreeShipping ? t('cart.freeShipping') : `€${Utils.formatPrice(shipping)}`;
        shippingValue.className = isFreeShipping ? 'free-shipping' : '';
        
        document.getElementById('total-label').textContent = t('cart.total');
        document.getElementById('total-value').textContent = `€${Utils.formatPrice(subtotal + shipping)}`;
        
        const newCount = state.cart.reduce((a, b) => a + b.qty, 0);
        if (parseInt(countEl.textContent) !== newCount) {
            countEl.textContent = newCount;
            countEl.classList.add('bump');
            setTimeout(() => countEl.classList.remove('bump'), 300);
        }
    }
};

// Esporta per l'uso in altri moduli
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Cart };
}
 * Gestione del carrello
 * Include il fix "zero quantity" per la rimozione degli articoli
 */

const Cart = {
    /**
     * Carica il carrello dal localStorage
     */
    load() {
        try {
            const saved = localStorage.getItem('gizzi_cart');
            if (saved) state.cart = JSON.parse(saved);
        } catch (e) {
            state.cart = [];
        }
    },
    
    /**
     * Salva il carrello nel localStorage
     */
    save() {
        localStorage.setItem('gizzi_cart', JSON.stringify(state.cart));
    },
    
    /**
     * Aggiunge un prodotto al carrello
     * @param {string} productId - ID del prodotto
     */
    add(productId) {
        const product = state.products.find(p => p.ID === productId);
        if (!product) return;
        
        const existing = state.cart.find(c => c.ID === productId);
        const nameKey = state.lang === 'it' ? 'Nome' : `Nome_${state.lang.toUpperCase()}`;
        const productName = product[nameKey] || product.Nome;
        
        if (existing) {
            if (existing.qty < product.StockNum) {
                existing.qty++;
                Toast.success(t('toast.cartAdd'), `${productName} (${existing.qty}x)`);
            } else {
                Toast.warning(t('toast.maxStock'), t('toast.maxStockDesc'));
                return;
            }
        } else {
            if (product.StockNum > 0) {
                state.cart.push({ ...product, qty: 1 });
                Toast.success(t('toast.cartAdd'), productName);
            }
        }
        
        this.animateButton(productId);
        this.save();
        this.updateUI();
        
        const panel = document.getElementById('cart-panel');
        if (!panel.classList.contains('active')) {
            this.toggle();
        }
    },
    
    /**
     * Anima il pulsante "Aggiungi" dopo l'aggiunta
     * @param {string} productId - ID del prodotto
     */
    animateButton(productId) {
        const btn = document.getElementById(`btn-add-${productId}`);
        if (!btn) return;
        
        btn.classList.add('added');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg><span>${t('products.added')}</span>`;
        
        setTimeout(() => {
            btn.classList.remove('added');
            btn.innerHTML = originalHTML;
        }, 1500);
    },
    
    /**
     * Rimuove un articolo impostando la quantità a 0 (approccio "zero quantity")
     * Questo replica il comportamento del pulsante "-" quando raggiunge 0
     * @param {string} productId - ID del prodotto
     */
    removeByZeroQty(productId) {
        const item = state.cart.find(c => c.ID === productId);
        if (!item) return;
        
        // Imposta la quantità a 0 per rimuovere (come il tasto - che arriva a 0)
        item.qty = 0;
        state.cart = state.cart.filter(c => c.qty > 0);
        this.save();
        this.updateUI();
        
        const nameKey = state.lang === 'it' ? 'Nome' : `Nome_${state.lang.toUpperCase()}`;
        const productName = item[nameKey] || item.Nome;
        Toast.info(t('toast.cartRemove'), productName);
    },
    
    /**
     * Svuota il carrello impostando tutte le quantità a 0 (approccio "zero quantity")
     */
    emptyByZeroQty() {
        // Imposta tutte le quantità a 0
        state.cart.forEach(item => {
            item.qty = 0;
        });
        // Filtra via tutti gli articoli con quantità 0
        state.cart = state.cart.filter(c => c.qty > 0);
        this.save();
        this.updateUI();
        Toast.info(t('toast.cartEmpty'));
    },
    
    /**
     * Aggiorna la quantità di un articolo
     * @param {string} productId - ID del prodotto
     * @param {number} delta - Variazione (+1 o -1)
     */
    updateQty(productId, delta) {
        const item = state.cart.find(c => c.ID === productId);
        const product = state.products.find(p => p.ID === productId);
        
        if (!item || !product) return;
        
        if (delta > 0 && item.qty >= product.StockNum) {
            Toast.warning(t('toast.maxStock'), t('toast.maxStockDesc'));
            return;
        }
        
        item.qty += delta;
        
        if (item.qty <= 0) {
            state.cart = state.cart.filter(c => c.ID !== productId);
        }
        
        this.save();
        this.updateUI();
    },
    
    /**
     * Mostra il modal di conferma per rimuovere un articolo
     * @param {string} productId - ID del prodotto
     */
    confirmRemove(productId) {
        const item = state.cart.find(c => c.ID === productId);
        if (!item) return;
        
        const nameKey = state.lang === 'it' ? 'Nome' : `Nome_${state.lang.toUpperCase()}`;
        const productName = item[nameKey] || item.Nome;
        
        Confirm.show({
            title: t('confirm.removeTitle'),
            message: `"${productName}"`,
            type: 'danger',
            confirmText: t('confirm.delete'),
            onConfirm: () => this.removeByZeroQty(productId)
        });
    },
    
    /**
     * Mostra il modal di conferma per svuotare il carrello
     */
    confirmEmpty() {
        if (state.cart.length === 0) return;
        
        Confirm.show({
            title: t('confirm.emptyTitle'),
            message: t('confirm.emptyMsg'),
            type: 'danger',
            confirmText: t('cart.clear'),
            onConfirm: () => this.emptyByZeroQty()
        });
    },
    
    /**
     * Apre/chiude il pannello del carrello
     */
    toggle() {
        const panel = document.getElementById('cart-panel');
        const overlay = document.getElementById('cart-overlay');
        
        const isOpen = panel.classList.toggle('active');
        overlay.style.display = isOpen ? 'block' : 'none';
        document.body.style.overflow = isOpen ? 'hidden' : '';
    },
    
    /**
     * Calcola il totale del carrello
     * @returns {number}
     */
    getTotal() {
        return state.cart.reduce((sum, item) => {
            return sum + (parseFloat(item.Prezzo.replace(',', '.')) * item.qty);
        }, 0);
    },
    
    /**
     * Calcola le spese di spedizione
     * @param {number} subtotal - Subtotale
     * @returns {number}
     */
    getShipping(subtotal) {
        const country = document.getElementById('f-country')?.value || 'Italia';
        if (state.cart.length === 0) return 0;
        return country === 'Italia' ? (subtotal >= 120 ? 0 : 13) : 50;
    },
    
    /**
     * Aggiorna l'interfaccia del carrello
     */
    updateUI() {
        const nameKey = state.lang === 'it' ? 'Nome' : `Nome_${state.lang.toUpperCase()}`;
        const cartItems = document.getElementById('cart-items');
        const checkoutBtn = document.getElementById('btn-checkout');
        const countEl = document.getElementById('cart-count');
        
        if (state.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="cart-empty">
                    <div class="cart-empty-icon">🛒</div>
                    <p class="cart-empty-title">${t('cart.empty')}</p>
                    <p class="cart-empty-desc">${t('cart.emptyDesc')}</p>
                </div>
            `;
            checkoutBtn.disabled = true;
        } else {
            cartItems.innerHTML = state.cart.map(item => {
                const product = state.products.find(p => p.ID === item.ID);
                const itemTotal = parseFloat(item.Prezzo.replace(',', '.')) * item.qty;
                const productName = item[nameKey] || item.Nome;
                
                return `
                    <div class="cart-item" data-id="${item.ID}">
                        <img class="cart-item-img" src="${item.Immagine}" alt="${productName}" 
                             onerror="this.src='https://via.placeholder.com/60x60?text=📦'">
                        <div class="cart-item-info">
                            <div class="cart-item-name">${productName}</div>
                            <div class="cart-item-meta">€${item.Prezzo} × ${item.qty}</div>
                        </div>
                        <div class="qty-controls">
                            <button class="qty-btn qty-minus" onclick="Cart.updateQty('${item.ID}', -1)">−</button>
                            <span class="qty-value">${item.qty}</span>
                            <button class="qty-btn qty-plus" onclick="Cart.updateQty('${item.ID}', 1)" ${item.qty >= product?.StockNum ? 'disabled' : ''}>+</button>
                        </div>
                        <div class="cart-item-price">€${Utils.formatPrice(itemTotal)}</div>
                        <a href="javascript:void(0)" class="cart-item-remove" onclick="Cart.confirmRemove('${item.ID}'); return false;" title="${t('confirm.delete')}">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </a>
                    </div>
                `;
            }).join('');
            checkoutBtn.disabled = false;
        }
        
        const subtotal = this.getTotal();
        const shipping = this.getShipping(subtotal);
        const isFreeShipping = shipping === 0 && state.cart.length > 0;
        
        document.getElementById('shipping-label').textContent = t('cart.shipping');
        const shippingValue = document.getElementById('shipping-value');
        shippingValue.textContent = isFreeShipping ? t('cart.freeShipping') : `€${Utils.formatPrice(shipping)}`;
        shippingValue.className = isFreeShipping ? 'free-shipping' : '';
        
        document.getElementById('total-label').textContent = t('cart.total');
        document.getElementById('total-value').textContent = `€${Utils.formatPrice(subtotal + shipping)}`;
        
        const newCount = state.cart.reduce((a, b) => a + b.qty, 0);
        if (parseInt(countEl.textContent) !== newCount) {
            countEl.textContent = newCount;
            countEl.classList.add('bump');
            setTimeout(() => countEl.classList.remove('bump'), 300);
        }
    }
};

// Esporta per l'uso in altri moduli
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Cart };
}

