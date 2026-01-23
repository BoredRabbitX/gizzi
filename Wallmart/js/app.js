const TEXT = typeof TEXT !== 'undefined' ? TEXT : {};

class App {
    constructor() {
        this.products = [];
        this.cart = [];
        this.wishlist = [];
        this.lang = localStorage.getItem('gizzi_lang') || 'it';
        this.theme = localStorage.getItem('gizzi_theme') || 'light';
        this.gdprAccepted = localStorage.getItem('gizzi_gdpr') === 'accepted';
        this.currentView = 'all';
        this.init();
    }

    init() {
        this.applyTheme();
        this.loadProducts();
        this.loadCart();
        this.loadWishlist();
        this.setupEventListeners();
        this.checkGDPR();
        this.updateUI();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        const themeIcons = document.querySelectorAll('#theme-icon, #theme-icon-mobile');
        const themeLabel = document.getElementById('theme-label');
        const text = TEXT[this.lang];

        themeIcons.forEach(icon => {
            if (icon) {
                icon.textContent = this.theme === 'dark' ? '☀️' : '🌙';
            }
        });

        if (themeLabel) {
            themeLabel.textContent = this.theme === 'dark' ? text.themeDark : text.themeLight;
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('gizzi_theme', this.theme);
        this.applyTheme();
    }

    changeLang(newLang) {
        this.lang = newLang;
        localStorage.setItem('gizzi_lang', this.lang);
        this.updateUI();
        this.updateProductUI();
        this.updateCartUI();
    }



    async loadProducts() {
        try {
            const response = await fetch(CONFIG.catalog);
            const text = await response.text();
            const rows = text.split('\n').filter(r => r.trim() !== '');
            const headers = rows[0].split(',').map(h => h.trim());

            this.products = rows.slice(1).map(row => {
                const cols = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
                let product = {};
                headers.forEach((h, i) => {
                    product[h] = cols[i]?.replace(/"/g, '').trim();
                });
                
                const stockValue = product.Stock || product.Quantità || product.stock || '';
                product.StockNum = stockValue === '' || stockValue === undefined ? 999 : parseInt(stockValue);
                
                return product;
            });

        this.renderProducts();
        this.renderCategories();
        this.renderFeaturedProducts();
        
        if (window.featuredCarousel) {
            setTimeout(() => window.featuredCarousel.refresh(), 100);
        }
    } catch (error) {
        console.error('Error loading products:', error);
        showToast(TEXT[this.lang].orderError, 'error');
    }
}

    loadCart() {
        const saved = localStorage.getItem('gizzi_cart');
        if (saved) {
            try {
                this.cart = JSON.parse(saved);
            } catch (e) {
                this.cart = [];
            }
        }
    }

    saveCart() {
        localStorage.setItem('gizzi_cart', JSON.stringify(this.cart));
        this.updateCartUI();
    }

    loadWishlist() {
        const saved = localStorage.getItem('gizzi_wishlist');
        if (saved) {
            try {
                this.wishlist = JSON.parse(saved);
            } catch (e) {
                this.wishlist = [];
            }
        }
    }

    saveWishlist() {
        localStorage.setItem('gizzi_wishlist', JSON.stringify(this.wishlist));
    }

    addToCart(productId) {
        const product = this.products.find(p => p.ID == productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.ID == productId);
        const cartItem = existingItem || { ...product, qty: 0 };

        if (cartItem.qty < product.StockNum) {
            cartItem.qty++;
            if (!existingItem) {
                this.cart.push(cartItem);
            }
            this.saveCart();
            showToast(`${product.Nome} ${TEXT[this.lang].addToCart.toLowerCase()}`, 'success');
            this.openCart();
        } else {
            showToast(TEXT[this.lang].stockAlert, 'warning');
        }
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.ID !== productId);
        this.saveCart();
    }

    updateCartQty(productId, delta) {
        const item = this.cart.find(c => c.ID == productId);
        const product = this.products.find(p => p.ID == productId);
        
        if (item && product) {
            const newQty = item.qty + delta;
            if (newQty > 0 && newQty <= product.StockNum) {
                item.qty = newQty;
            } else if (newQty <= 0) {
                this.removeFromCart(productId);
                return;
            } else {
                showToast(TEXT[this.lang].stockAlert, 'warning');
                return;
            }
            this.saveCart();
        }
    }

    clearCart() {
        if (confirm(TEXT[this.lang].clearCartConfirm)) {
            this.cart = [];
            this.saveCart();
        }
    }

    toggleWishlist(productId) {
        const index = this.wishlist.indexOf(productId);
        if (index > -1) {
            this.wishlist.splice(index, 1);
        } else {
            this.wishlist.push(productId);
        }
        this.saveWishlist();
        this.renderProducts();
        this.updateProductUI();
    }

    isWishlisted(productId) {
        return this.wishlist.includes(productId);
    }

    getCartTotal() {
        const subtotal = this.cart.reduce((sum, item) => {
            return sum + (parseFloat(item.Prezzo.replace(',', '.')) * item.qty);
        }, 0);
        
        const country = document.getElementById('f-country')?.value || 'Italia';
        let shipping = 0;
        
        if (this.cart.length > 0) {
            if (country === 'Italia') {
                shipping = subtotal >= CONFIG.freeShippingThreshold ? 0 : CONFIG.shippingCostIT;
            } else {
                shipping = CONFIG.shippingCostEU;
            }
        }
        
        return { subtotal, shipping, total: subtotal + shipping };
    }

    checkGDPR() {
        if (!this.gdprAccepted) {
            setTimeout(() => {
                const banner = document.getElementById('gdpr-banner');
                if (banner) banner.classList.add('active');
            }, 2000);
        }
    }

    acceptGDPR() {
        this.gdprAccepted = true;
        localStorage.setItem('gizzi_gdpr', 'accepted');
        const banner = document.getElementById('gdpr-banner');
        if (banner) banner.classList.remove('active');
    }

    rejectGDPR() {
        localStorage.setItem('gizzi_gdpr', 'declined');
        const banner = document.getElementById('gdpr-banner');
        if (banner) banner.classList.remove('active');
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.updateUI();
        });

        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    handleResize() {
    }

    updateUI() {
        this.updateText();
        this.updateCartUI();
    }

    updateText() {
        const text = TEXT[this.lang];

        // Hero section
        document.getElementById('hero-title') && (document.getElementById('hero-title').textContent = text.heroTitle);
        document.getElementById('hero-subtitle') && (document.getElementById('hero-subtitle').textContent = text.heroSubtitle);
        document.getElementById('hero-cta') && (document.getElementById('hero-cta').textContent = text.heroCta);
        document.getElementById('hero-secondary') && (document.getElementById('hero-secondary').textContent = text.heroSecondary);
        document.getElementById('hero-tag') && (document.getElementById('hero-tag').textContent = text.heroTag);
        document.getElementById('hero-feature-1') && (document.getElementById('hero-feature-1').textContent = text.heroFeature1);
        document.getElementById('hero-feature-2') && (document.getElementById('hero-feature-2').textContent = text.heroFeature2);
        document.getElementById('hero-feature-3') && (document.getElementById('hero-feature-3').textContent = text.heroFeature3);
        document.getElementById('hero-badge') && (document.getElementById('hero-badge').innerHTML = `<span class="hero-badge-icon">🚚</span><span>${text.heroBadge}</span>`);

        // Featured section
        document.getElementById('featured-title') && (document.getElementById('featured-title').textContent = text.featured);
        document.getElementById('featured-subtitle') && (document.getElementById('featured-subtitle').textContent = text.featuredSubtitle);
        document.getElementById('view-all-featured') && (document.getElementById('view-all-featured').innerHTML = `${text.viewAll}<span>→</span>`);

        // Products section
        document.getElementById('all-products-title') && (document.getElementById('all-products-title').textContent = text.allProducts);
        document.getElementById('all-products-subtitle') && (document.getElementById('all-products-subtitle').textContent = text.allProductsSubtitle);
        document.getElementById('btn-all-categories') && (document.getElementById('btn-all-categories').textContent = text.categoryAll);

        // Search
        document.getElementById('search-input') && (document.getElementById('search-input').placeholder = text.searchPlaceholder);

        // Cart
        document.getElementById('cart-label') && (document.getElementById('cart-label').textContent = text.cart);
        document.getElementById('cart-empty-title') && (document.getElementById('cart-empty-title').textContent = text.cartEmpty);
        document.getElementById('cart-empty-msg') && (document.getElementById('cart-empty-msg').textContent = text.cartEmptyMsg);
        document.getElementById('start-shopping') && (document.getElementById('start-shopping').textContent = text.startShopping);
        document.getElementById('cart-subtotal-label') && (document.getElementById('cart-subtotal-label').textContent = text.subtotal);
        document.getElementById('cart-shipping-label') && (document.getElementById('cart-shipping-label').textContent = text.shipping);
        document.getElementById('cart-total-label') && (document.getElementById('cart-total-label').textContent = text.total);

        // Checkout form
        document.getElementById('f-name') && (document.getElementById('f-name').placeholder = text.fullName);
        document.getElementById('f-email') && (document.getElementById('f-email').placeholder = text.email);
        document.getElementById('f-phone') && (document.getElementById('f-phone').placeholder = text.phone);
        document.getElementById('f-addr') && (document.getElementById('f-addr').placeholder = text.addressPlaceholder);
        document.getElementById('f-notes') && (document.getElementById('f-notes').placeholder = text.notesPlaceholder);
        document.getElementById('checkout-title') && (document.getElementById('checkout-title').textContent = text.checkoutTitle);
        document.getElementById('modal-cancel') && (document.getElementById('modal-cancel').textContent = text.cancel);

        // Footer
        document.getElementById('footer-tagline') && (document.getElementById('footer-tagline').textContent = text.footerTagline);
        document.getElementById('footer-shop') && (document.getElementById('footer-shop').textContent = text.footerShop);
        document.getElementById('footer-company') && (document.getElementById('footer-company').textContent = text.footerCompany);
        document.getElementById('footer-support') && (document.getElementById('footer-support').textContent = text.footerSupport);
        document.getElementById('footer-about') && (document.getElementById('footer-about').textContent = text.footerAbout);
        document.getElementById('footer-contact') && (document.getElementById('footer-contact').textContent = text.footerContact);
        document.getElementById('footer-shipping') && (document.getElementById('footer-shipping').textContent = text.footerShipping);
        document.getElementById('footer-returns') && (document.getElementById('footer-returns').textContent = text.footerReturns);
        document.getElementById('footer-phone') && (document.getElementById('footer-phone').textContent = text.footerPhone);
        document.getElementById('footer-email') && (document.getElementById('footer-email').textContent = text.footerEmail);
        document.getElementById('footer-address') && (document.getElementById('footer-address').textContent = text.footerAddress);
        document.getElementById('footer-copyright') && (document.getElementById('footer-copyright').textContent = text.footerCopyright);

        // Section features
        document.getElementById('section-feature1-title') && (document.getElementById('section-feature1-title').textContent = text.sectionFeature1Title);
        document.getElementById('section-feature1-desc') && (document.getElementById('section-feature1-desc').textContent = text.sectionFeature1Desc);
        document.getElementById('section-feature2-title') && (document.getElementById('section-feature2-title').textContent = text.sectionFeature2Title);
        document.getElementById('section-feature2-desc') && (document.getElementById('section-feature2-desc').textContent = text.sectionFeature2Desc);
        document.getElementById('section-feature3-title') && (document.getElementById('section-feature3-title').textContent = text.sectionFeature3Title);
        document.getElementById('section-feature3-desc') && (document.getElementById('section-feature3-desc').textContent = text.sectionFeature3Desc);

        // GDPR
        document.getElementById('gdpr-title') && (document.getElementById('gdpr-title').textContent = text.gdprTitle);
        document.getElementById('gdpr-text') && (document.getElementById('gdpr-text').textContent = text.gdprText);
        document.getElementById('gdpr-accept') && (document.getElementById('gdpr-accept').textContent = text.accept);
        document.getElementById('gdpr-reject') && (document.getElementById('gdpr-reject').textContent = text.reject);

        // Features section
        document.getElementById('section-feature1-title') && (document.getElementById('section-feature1-title').textContent = text.sectionFeature1Title);
        document.getElementById('section-feature1-desc') && (document.getElementById('section-feature1-desc').textContent = text.sectionFeature1Desc);
        document.getElementById('section-feature2-title') && (document.getElementById('section-feature2-title').textContent = text.sectionFeature2Title);
        document.getElementById('section-feature2-desc') && (document.getElementById('section-feature2-desc').textContent = text.sectionFeature2Desc);
        document.getElementById('section-feature3-title') && (document.getElementById('section-feature3-title').textContent = text.sectionFeature3Title);
        document.getElementById('section-feature3-desc') && (document.getElementById('section-feature3-desc').textContent = text.sectionFeature3Desc);
    }

    updateCartUI() {
        const cartItems = document.getElementById('cart-items');
        const cartEmpty = document.getElementById('cart-empty');
        const cartFooter = document.getElementById('cart-footer');

        if (this.cart.length === 0) {
            cartItems.classList.add('hidden');
            cartEmpty.classList.remove('hidden');
            cartFooter.classList.add('hidden');
        } else {
            cartItems.classList.remove('hidden');
            cartEmpty.classList.add('hidden');
            cartFooter.classList.remove('hidden');

            cartItems.innerHTML = this.cart.map(item => this.renderCartItem(item)).join('');
        }

        const { subtotal, shipping, total } = this.getCartTotal();
        
        document.getElementById('cart-subtotal') && (document.getElementById('cart-subtotal').textContent = `€ ${subtotal.toFixed(2)}`);
        document.getElementById('cart-shipping') && (document.getElementById('cart-shipping').textContent = `€ ${shipping.toFixed(2)}`);
        document.getElementById('cart-total') && (document.getElementById('cart-total').textContent = `€ ${total.toFixed(2)}`);

        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = this.cart.reduce((a, b) => a + b.qty, 0);
        }

        const freeShippingInfo = document.getElementById('free-shipping-info');
        if (freeShippingInfo && shipping === 0 && subtotal < CONFIG.freeShippingThreshold) {
            const remaining = CONFIG.freeShippingThreshold - subtotal;
            freeShippingInfo.innerHTML = `<span class="cart-shipping-info-icon">🚚</span> ${TEXT[this.lang].freeShippingProgress.replace('{amount}', `€ ${remaining.toFixed(2)}`)}`;
        } else if (freeShippingInfo && shipping === 0) {
            freeShippingInfo.innerHTML = `<span class="cart-shipping-info-icon">✅</span> ${TEXT[this.lang].freeShipping}`;
        } else if (freeShippingInfo) {
            freeShippingInfo.innerHTML = '';
        }

        document.getElementById('cart-count') && (document.getElementById('cart-count').textContent = this.cart.reduce((a, b) => a + b.qty, 0));
    }

    renderCartItem(item) {
        const product = this.products.find(p => p.ID == item.ID);
        if (!product) return '';

        const text = TEXT[this.lang];
        const itemTotal = parseFloat(product.Prezzo.replace(',', '.')) * item.qty;
        const nameKey = this.lang === 'it' ? 'Nome' : `Nome_${this.lang.toUpperCase()}`;
        const name = item[nameKey] || item.Nome || product.Nome;

        return `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${product.Immagine}" alt="${name}" loading="lazy">
                </div>
                <div class="cart-item-content">
                    <div>
                        <div class="cart-item-header">
                            <span class="cart-item-name">${name}</span>
                            <button class="cart-item-remove" onclick="app.removeFromCart('${item.ID}')">✕</button>
                        </div>
                        <span class="cart-item-price">€ ${itemTotal.toFixed(2)}</span>
                    </div>
                    <div>
                        <div class="cart-item-qty">
                            <button class="qty-btn" onclick="app.updateCartQty('${item.ID}', -1)">−</button>
                            <span class="qty-value">${item.qty}</span>
                            <button class="qty-btn" onclick="app.updateCartQty('${item.ID}', 1)">+</button>
                        </div>
                        <span class="cart-item-stock ${product.StockNum < 5 ? 'warning' : ''}">${text.maxQty}: ${product.StockNum}</span>
                    </div>
                </div>
            </div>
        `;
    }

    renderProducts() {
        const container = document.getElementById('products-grid');
        if (!container) return;

        const nameKey = this.lang === 'it' ? 'Nome' : `Nome_${this.lang.toUpperCase()}`;
        const catKey = this.lang === 'it' ? 'Categoria' : `Categoria_${this.lang.toUpperCase()}`;
        const activeProducts = this.products.filter(p => p.Disponibile === 'SI');

        let filteredProducts = activeProducts;

        if (this.currentCategory) {
            filteredProducts = activeProducts.filter(p => (p[catKey] === this.currentCategory || p.Categoria === this.currentCategory));
        }

        container.innerHTML = filteredProducts.map(p => this.renderProductCard(p, nameKey)).join('');
    }

    renderProductCard(product, nameKey) {
        const text = TEXT[this.lang];
        const name = product[nameKey] || product.Nome;
        const isOutOfStock = product.StockNum <= 0;
        const isLowStock = product.StockNum > 0 && product.StockNum < 5;
        const isWishlisted = this.isWishlisted(product.ID);

        let badge = '';
        if (isOutOfStock) {
            badge = `<span class="product-badge out-of-stock">${text.outOfStock}</span>`;
        } else if (isLowStock) {
            badge = `<span class="product-badge low-stock">${text.lowStock}</span>`;
        } else if (product.Nuovo === 'SI') {
            badge = `<span class="product-badge product-badge-new">${text.newBadge}</span>`;
        }

        return `
            <div class="product-card" data-product-id="${product.ID}">
                ${badge}
                <button class="product-wishlist ${isWishlisted ? 'active' : ''}" onclick="app.toggleWishlist('${product.ID}')">♡</button>
                <div class="product-image-wrapper">
                    <img class="product-image" src="${product.Immagine}" alt="${name}" loading="lazy">
                    <button class="product-quick-view" onclick="app.showQuickView('${product.ID}')">${text.quickView}</button>
                </div>
                <div class="product-content">
                    <span class="product-brand">${product.Categoria}</span>
                    <h3 class="product-name">${name}</h3>
                    <div class="product-rating">
                        <span class="product-rating-stars">★★★★★</span>
                        <span class="product-rating-count">(${Math.floor(Math.random() * 50) + 10})</span>
                    </div>
                    <div class="product-price-row">
                        <span class="product-price">€ ${product.Prezzo}</span>
                        <span class="product-price-unit">${text.pricePer} ${product.Unità || 'pz'}</span>
                    </div>
                    <span class="product-availability ${isOutOfStock ? 'out' : isLowStock ? 'limited' : ''}">
                        ${isOutOfStock ? text.outOfStock : isLowStock ? text.lowStock : text.inStock}
                    </span>
                    <button class="product-add-btn" ${isOutOfStock ? 'disabled' : ''} onclick="app.addToCart('${product.ID}')">
                        ${isOutOfStock ? text.outOfStock : `<span>🛒</span> ${text.addToCart}`}
                    </button>
                </div>
            </div>
        `;
    }

    renderCategories() {
        const container = document.getElementById('category-menu');
        if (!container) return;

        const catKey = this.lang === 'it' ? 'Categoria' : `Categoria_${this.lang.toUpperCase()}`;
        const activeProducts = this.products.filter(p => p.Disponibile === 'SI');
        const categories = [...new Set(activeProducts.map(p => p[catKey] || p.Categoria))];

        container.innerHTML = categories.map(cat => `
            <li><a href="#" data-category="${cat}" onclick="app.filterByCategory('${cat}'); return false;">${cat}</a></li>
        `).join('');
    }

    renderFeaturedProducts() {
        const container = document.getElementById('featured-track');
        if (!container) return;

        const nameKey = this.lang === 'it' ? 'Nome' : `Nome_${this.lang.toUpperCase()}`;
        const featuredProducts = this.products
            .filter(p => p.Evidenza === 'SI' && p.Disponibile === 'SI' && p.StockNum > 0)
            .slice(0, 8);

        container.innerHTML = featuredProducts.map(p => this.renderProductCard(p, nameKey)).join('');
    }

    filterByCategory(category) {
        this.currentCategory = this.currentCategory === category ? null : category;
        this.renderProducts();
        this.updateCategoryUI();
    }

    updateCategoryUI() {
        document.querySelectorAll('#category-menu a').forEach(link => {
            const isActive = this.currentCategory === link.dataset.category;
            link.classList.toggle('active', isActive);
        });
    }

    updateProductUI() {
        this.renderProducts();
        this.renderFeaturedProducts();
    }

    openCart() {
        const panel = document.getElementById('cart-panel');
        const overlay = document.getElementById('cart-overlay');
        if (panel) {
            panel.classList.add('active');
            panel.style.right = '0';
        }
        if (overlay) overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeCart() {
        const panel = document.getElementById('cart-panel');
        const overlay = document.getElementById('cart-overlay');
        if (panel) {
            panel.classList.remove('active');
            panel.style.right = '-100%';
        }
        if (overlay) overlay.style.display = 'none';
        document.body.style.overflow = '';
    }

    openCheckout() {
        if (this.cart.length === 0) {
            showToast(TEXT[this.lang].cartEmptyAlert, 'warning');
            return;
        }
        this.closeCart();
        const modal = document.getElementById('checkout-modal');
        if (modal) modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeCheckout() {
        const modal = document.getElementById('checkout-modal');
        if (modal) modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    async processOrder() {
        const name = document.getElementById('f-name')?.value;
        const email = document.getElementById('f-email')?.value;
        const phone = document.getElementById('f-phone')?.value;
        const address = document.getElementById('f-addr')?.value;

        if (!name || !email || !phone || !address) {
            showToast(TEXT[this.lang].orderError, 'error');
            return;
        }

        const orderId = "GZ-" + Date.now().toString().slice(-6);
        const { total } = this.getCartTotal();

        const detailRows = this.cart.map(c => {
            const price = parseFloat(c.Prezzo.replace(',', '.'));
            return `${c.qty}x ${c.Nome} (€ ${c.Prezzo}) = € ${(price * c.qty).toFixed(2)}`;
        });

        try {
            await fetch(CONFIG.formURL, {
                method: 'POST',
                mode: 'no-cors',
                body: new URLSearchParams({
                    'entry.442927045': orderId,
                    'entry.333212320': name,
                    'entry.1385104048': email,
                    'entry.844983788': phone,
                    'entry.334440207': address,
                    'entry.1856379113': detailRows.join(' | '),
                    'entry.146792905': `€ ${total.toFixed(2)}`
                })
            });

            this.closeCheckout();
            this.showSuccess(orderId);

            window.open(`https://wa.me/${CONFIG.wa}?text=${encodeURIComponent(`*ORDINE ${orderId}*\n\n*CLIENTE:* ${name}\n*EMAIL:* ${email}\n*TEL:* ${phone}\n*IND:* ${address}\n\n${detailRows.join('\n')}\n\n*TOTALE:* € ${total.toFixed(2)}`)}`, '_blank');

            this.cart = [];
            this.saveCart();
            this.updateCartUI();

        } catch (error) {
            console.error('Order error:', error);
            showToast(TEXT[this.lang].orderError, 'error');
        }
    }

    showSuccess(orderId) {
        const popup = document.getElementById('success-popup');
        if (popup) {
            document.getElementById('success-order-id').textContent = orderId;
            popup.classList.add('active');
        }
    }

    hideSuccess() {
        const popup = document.getElementById('success-popup');
        if (popup) popup.classList.remove('active');
        location.reload();
    }

    showQuickView(productId) {
    }

    toggleMobileMenu() {
        const menu = document.getElementById('mobile-menu');
        if (menu) menu.classList.toggle('active');
    }
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;

    const lang = app?.lang || 'it';
    const text = TEXT[lang];
    const titles = {
        success: text.toastSuccess,
        error: text.toastError,
        warning: text.toastWarning
    };
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠'
    };

    toast.className = `toast ${type} active`;
    toast.innerHTML = `
        <span class="toast-icon">${icons[type] || 'ℹ'}</span>
        <div class="toast-content">
            <div class="toast-title">${titles[type] || text.toastSuccess}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="hideToast()">✕</button>
    `;

    setTimeout(hideToast, 4000);
}

function hideToast() {
    const toast = document.getElementById('toast');
    if (toast) toast.classList.remove('active');
}

let app;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new App();
    });
} else {
    app = new App();
}
