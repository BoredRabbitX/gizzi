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
        console.log('🔧 Initializing app...');
        this.applyTheme();
        this.loadCart();
        this.loadWishlist();
        this.checkGDPR();
        this.setupEventListeners();
        this.loadProducts();
        this.updateUI();
        console.log('✅ App initialization complete');
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
        console.log(`🌐 Changing language to: ${newLang}`);
        this.lang = newLang;
        localStorage.setItem('gizzi_lang', this.lang);
        this.updateUI();
        this.updateProductUI();
        this.updateCartUI();
        console.log('✅ Language changed successfully');
    }



    async loadProducts() {
        console.log('📦 Loading products...');
        try {
            const response = await fetch(CONFIG.catalog);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
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

            console.log(`✅ Loaded ${this.products.length} products`);
            
            // Wait for DOM to be ready
            setTimeout(() => {
                this.renderCategories();
                this.renderFeaturedProducts();
                this.renderProducts();
                
                setTimeout(() => {
                    if (window.featuredCarousel) {
                        window.featuredCarousel.refresh();
                        console.log('🎠 Carousel refreshed after products load');
                    }
                }, 100);
            }, 100);
            
        } catch (error) {
            console.error('❌ Error loading products:', error);
            if (typeof showToast !== 'undefined') {
                showToast(TEXT[this.lang]?.orderError || 'Errore caricamento prodotti', 'error');
            }
        }
    }
        } catch (error) {
            console.error('Error loading products:', error);
            if (typeof showToast !== 'undefined') {
                showToast(TEXT[this.lang].orderError, 'error');
            } else {
                console.warn('Toast not available');
    }

    updateCartUI() {
        console.log('🛒 Updating cart UI');
        console.log('Current cart items:', this.cart.length);
        
        const cartItems = document.getElementById('cart-items');
        const cartEmpty = document.getElementById('cart-empty');
        const cartFooter = document.getElementById('cart-footer');
        const cartLabel = document.getElementById('cart-title');

        if (!cartItems || !cartEmpty || !cartFooter) {
            console.warn('❌ Cart UI elements not found');
            return;
        }

        const totalItems = this.cart.reduce((a, b) => a + b.qty, 0);
        
        if (this.cart.length === 0) {
            cartItems.style.display = 'none';
            cartEmpty.style.display = 'block';
            cartFooter.style.display = 'none';
            if (cartLabel) cartLabel.innerHTML = `${TEXT[this.lang]?.cartTitle || 'Il Tuo Carrello'} <span class="cart-count">0</span>`;
            // Update header cart count
            const headerCartCount = document.getElementById('cart-count');
            if (headerCartCount) headerCartCount.textContent = '0';
        } else {
            cartItems.innerHTML = this.cart.map(item => this.renderCartItem(item)).join('');
            cartItems.style.display = 'block';
            cartEmpty.style.display = 'none';
            cartFooter.style.display = 'flex';
            if (cartLabel) cartLabel.innerHTML = `${TEXT[this.lang]?.cartTitle || 'Il Tuo Carrello'} <span class="cart-count">${totalItems}</span>`;
            // Update header cart count
            const headerCartCount = document.getElementById('cart-count');
            if (headerCartCount) headerCartCount.textContent = totalItems;
        }

        const { subtotal, shipping, total } = this.getCartTotal();
        
        const subtotalEl = document.getElementById('cart-subtotal');
        const shippingEl = document.getElementById('cart-shipping');
        const totalEl = document.getElementById('cart-total');
        
        if (subtotalEl) subtotalEl.textContent = `€ ${subtotal.toFixed(2)}`;
        if (shippingEl) shippingEl.textContent = `€ ${shipping.toFixed(2)}`;
        if (totalEl) totalEl.textContent = `€ ${total.toFixed(2)}`;

        const freeShippingInfo = document.getElementById('free-shipping-info');
        if (freeShippingInfo && shipping === 0 && subtotal < CONFIG.freeShippingThreshold) {
            const remaining = CONFIG.freeShippingThreshold - subtotal;
            freeShippingInfo.innerHTML = `<span class="cart-shipping-info-icon">🚚</span> Aggiungi ancora € ${remaining.toFixed(2)} per la spedizione gratuita`;
        } else if (freeShippingInfo && shipping === 0) {
            freeShippingInfo.innerHTML = `<span class="cart-shipping-info-icon">✅</span> Spedizione gratuita`;
        } else if (freeShippingInfo) {
            freeShippingInfo.innerHTML = '';
        }
        
        console.log(`✅ Cart UI updated - Items: ${this.cart.length}, Total: €${total.toFixed(2)}`);
    }
}

    loadCart() {
        const saved = localStorage.getItem('gizzi_cart');
        if (saved) {
            try {
                this.cart = JSON.parse(saved);
            } catch (e) {
                console.warn('Error loading cart:', e);
                this.cart = [];
            }
        } else {
            this.cart = [];
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
                console.warn('Error loading wishlist:', e);
                this.wishlist = [];
            }
        } else {
            this.wishlist = [];
        }
    }

    saveWishlist() {
        localStorage.setItem('gizzi_wishlist', JSON.stringify(this.wishlist));
    }

    addToCart(productId) {
        console.log(`🛒 Adding product to cart: ${productId}`);
        const product = this.products.find(p => p.ID == productId);
        if (!product) {
            console.warn('❌ Product not found:', productId);
            return;
        }

        const existingItem = this.cart.find(item => item.ID == productId);
        const cartItem = existingItem || { ...product, qty: 0 };

        if (cartItem.qty < product.StockNum) {
            cartItem.qty++;
            if (!existingItem) {
                this.cart.push(cartItem);
            }
            this.saveCart();
            const productName = product.Nome || product.Nome_EN || product.Nome_DE || product.Nome_HU || 'Prodotto';
            if (typeof showToast !== 'undefined') {
                showToast(`${productName} ${TEXT[this.lang]?.addToCart?.toLowerCase() || 'aggiunto'}`, 'success');
            }
            this.openCart();
            console.log('✅ Product added to cart');
        } else {
            if (typeof showToast !== 'undefined') {
                showToast(TEXT[this.lang]?.stockAlert || 'Disponibilità massima raggiunta', 'warning');
            }
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
                if (typeof showToast !== 'undefined') {
                    showToast(TEXT[this.lang].stockAlert, 'warning');
                }
                return;
            }
            this.saveCart();
        }
    }

    clearCart() {
        if (confirm(TEXT[this.lang].clearCartConfirm)) {
            this.cart = [];
            this.saveCart();
            this.updateCartUI();
            console.log('🗑️ Cart cleared');
        }
    }
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
            }, 1500);
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
        if (!text) {
            console.warn(`❌ No text found for language: ${this.lang}`);
            return;
        }

        console.log(`🌐 Updating text for language: ${this.lang}`);

        // Safety check for missing elements
        const safeUpdate = (id, key, isHtml = false) => {
            const el = document.getElementById(id);
            if (el && text[key]) {
                if (isHtml) {
                    el.innerHTML = text[key];
                } else {
                    el.textContent = text[key];
                }
            }
        };

        // Hero section
        safeUpdate('hero-title', 'heroTitle');
        safeUpdate('hero-subtitle', 'heroSubtitle');
        safeUpdate('hero-tag', 'heroTag');
        safeUpdate('hero-cta', 'heroCta');
        safeUpdate('hero-feature-1', 'heroFeature1');
        safeUpdate('hero-feature-2', 'heroFeature2');
        safeUpdate('hero-feature-3', 'heroFeature3');
        if (document.getElementById('hero-badge') && text.heroBadge) {
            document.getElementById('hero-badge').innerHTML = `<span class="hero-badge-icon">🚚</span><span>${text.heroBadge}</span>`;
        }


        // Featured section
        safeUpdate('featured-title', 'featured');
        safeUpdate('featured-subtitle', 'featuredSubtitle');
        const viewAllFeatured = document.getElementById('view-all-featured');
        if (viewAllFeatured) viewAllFeatured.innerHTML = `${text.viewAll}<span>→</span>`;

        // Products section
        safeUpdate('all-products-title', 'allProducts');
        safeUpdate('all-products-subtitle', 'allProductsSubtitle');
        safeUpdate('btn-all-categories', 'categoryAll');

        // Search
        const searchInput = document.getElementById('search-input');
        if (searchInput && text.searchPlaceholder) {
            searchInput.placeholder = text.searchPlaceholder;
        }

        // Cart
        safeUpdate('cart-label', 'cartTitle');
        safeUpdate('cart-empty-title', 'cartEmpty');
        safeUpdate('cart-empty-msg', 'cartEmptyMsg');
        safeUpdate('start-shopping', 'startShopping');
        safeUpdate('cart-subtotal-label', 'subtotal');
        safeUpdate('cart-shipping-label', 'shipping');
        safeUpdate('cart-total-label', 'total');

        // Checkout form
        const fName = document.getElementById('f-name');
        if (fName && text.fullName) fName.placeholder = text.fullName;
        const fEmail = document.getElementById('f-email');
        if (fEmail && text.email) fEmail.placeholder = text.email;
        const fPhone = document.getElementById('f-phone');
        if (fPhone && text.phone) fPhone.placeholder = text.phone;
        const fAddr = document.getElementById('f-addr');
        if (fAddr && text.addressPlaceholder) fAddr.placeholder = text.addressPlaceholder;
        const fNotes = document.getElementById('f-notes');
        if (fNotes && text.notesPlaceholder) fNotes.placeholder = text.notesPlaceholder;
        safeUpdate('checkout-title', 'checkoutTitle');
        safeUpdate('modal-cancel', 'cancel');

        // Footer
        safeUpdate('footer-tagline', 'footerTagline');
        const footerShop = document.getElementById('footer-shop');
        if (footerShop) footerShop.textContent = text.footerShop;
        const footerCompany = document.getElementById('footer-company');
        if (footerCompany) footerCompany.textContent = text.footerCompany;
        const footerSupport = document.getElementById('footer-support');
        if (footerSupport) footerSupport.textContent = text.footerSupport;
        const footerAbout = document.getElementById('footer-about');
        if (footerAbout) footerAbout.textContent = text.footerAbout;
        const footerContact = document.getElementById('footer-contact');
        if (footerContact) footerContact.textContent = text.footerContact;
        const footerShipping = document.getElementById('footer-shipping');
        if (footerShipping) footerShipping.textContent = text.footerShipping;
        const footerReturns = document.getElementById('footer-returns');
        if (footerReturns) footerReturns.textContent = text.footerReturns;
        const footerPhone = document.getElementById('footer-phone');
        if (footerPhone) footerPhone.textContent = text.footerPhone;
        const footerEmail = document.getElementById('footer-email');
        if (footerEmail) footerEmail.textContent = text.footerEmail;
        const footerAddress = document.getElementById('footer-address');
        if (footerAddress) footerAddress.textContent = text.footerAddress;
        const footerCopyright = document.getElementById('footer-copyright');
        if (footerCopyright) footerCopyright.textContent = text.footerCopyright;

        // Section features
        const sectionFeature1Title = document.getElementById('section-feature1-title');
        if (sectionFeature1Title) sectionFeature1Title.textContent = text.sectionFeature1Title;
        const sectionFeature1Desc = document.getElementById('section-feature1-desc');
        if (sectionFeature1Desc) sectionFeature1Desc.textContent = text.sectionFeature1Desc;
        const sectionFeature2Title = document.getElementById('section-feature2-title');
        if (sectionFeature2Title) sectionFeature2Title.textContent = text.sectionFeature2Title;
        const sectionFeature2Desc = document.getElementById('section-feature2-desc');
        if (sectionFeature2Desc) sectionFeature2Desc.textContent = text.sectionFeature2Desc;
        const sectionFeature3Title = document.getElementById('section-feature3-title');
        if (sectionFeature3Title) sectionFeature3Title.textContent = text.sectionFeature3Title;
        const sectionFeature3Desc = document.getElementById('section-feature3-desc');
        if (sectionFeature3Desc) sectionFeature3Desc.textContent = text.sectionFeature3Desc;

        // GDPR
        safeUpdate('gdpr-title', 'gdprTitle');
        safeUpdate('gdpr-text', 'gdprText');
        safeUpdate('gdpr-accept', 'accept');
        safeUpdate('gdpr-reject', 'reject');
        
        console.log('✅ Text update complete');
    }

    updateCartUI() {
        const cartItems = document.getElementById('cart-items');
        const cartEmpty = document.getElementById('cart-empty');
        const cartFooter = document.getElementById('cart-footer');
        const totalElement = document.getElementById('total-amount');
        const subtotalElement = document.getElementById('subtotal-amount');
        const shippingElement = document.getElementById('shipping-amount');
        const cartLabel = document.getElementById('cart-label');

        if (this.cart && cartItems && cartEmpty && cartFooter && cartLabel) {
            if (this.cart.length === 0) {
                cartItems.style.display = 'none';
                cartEmpty.style.display = 'block';
                cartFooter.style.display = 'none';
                if (cartLabel) cartLabel.textContent = TEXT[this.lang]?.cart || TEXT.it.cart;
            } else {
                cartItems.style.display = 'block';
                cartEmpty.style.display = 'none';
                cartFooter.style.display = 'flex';
                if (cartLabel) cartLabel.textContent = TEXT[this.lang]?.cart || TEXT.it.cart;
            }
        }

        const totalElement = document.getElementById('total-amount');
        const subtotalElement = document.getElementById('subtotal-amount');
        const shippingElement = document.getElementById('shipping-amount');

        if (totalElement && subtotalElement && shippingElement && TEXT[this.lang]) {
            const { total, subtotal, shipping } = this.getCartTotal();
            totalElement.textContent = `€${total.toFixed(2)}`;
            subtotalElement.textContent = `€${subtotal.toFixed(2)}`;
            shippingElement.textContent = shipping === 0 ? TEXT[this.lang].freeShipping : `€${shipping.toFixed(2)}`;
        }
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
        console.log('🛒 Rendering cart item:', item.ID);
        const product = this.products.find(p => p.ID == item.ID);
        if (!product) {
            console.warn('❌ Product not found for cart item:', item.ID);
            return '';
        }

        const text = TEXT[this.lang];
        const itemTotal = parseFloat(product.Prezzo.replace(',', '.')) * item.qty;
        const nameKey = this.lang === 'it' ? 'Nome' : `Nome_${this.lang.toUpperCase()}`;
        const name = item[nameKey] || item.Nome || product.Nome || 'Prodotto';

        return `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${product.Immagine}" alt="${name}" loading="lazy">
                </div>
                <div class="cart-item-content">
                    <div>
                        <div class="cart-item-header">
                            <span class="cart-item-name">${name}</span>
                            <button class="cart-item-remove" onclick="window.app.removeFromCart('${item.ID}')">✕</button>
                        </div>
                        <span class="cart-item-price">€ ${itemTotal.toFixed(2)}</span>
                    </div>
                    <div>
                        <div class="cart-item-qty">
                            <button class="qty-btn" onclick="window.app.updateCartQty('${item.ID}', -1)">−</button>
                            <span class="qty-value">${item.qty}</span>
                            <button class="qty-btn" onclick="window.app.updateCartQty('${item.ID}', 1)">+</button>
                        </div>
                        <span class="cart-item-stock ${product.StockNum < 5 ? 'warning' : ''}">${text?.maxQty || 'Max'}: ${product.StockNum}</span>
                    </div>
                </div>
            </div>
        `;
    }

    renderProducts() {
        console.log('🛍 Rendering products...');
        const container = document.getElementById('products-grid');
        if (!container) {
            console.warn('❌ Products grid container not found');
            return;
        }

        const nameKey = this.lang === 'it' ? 'Nome' : `Nome_${this.lang.toUpperCase()}`;
        const text = TEXT[this.lang];
        
        if (!this.products || this.products.length === 0) {
            console.warn('❌ No products available');
            container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px;">Nessun prodotto disponibile</div>';
            return;
        }

        const activeProducts = this.products.filter(p => p.Disponibile === 'SI');
        console.log(`📊 Found ${activeProducts.length} active products`);
        
        if (this.currentCategory) {
            const filteredProducts = activeProducts.filter(p => {
                const category = p.Categoria || p[`Categoria_${this.lang.toUpperCase()}`];
                return category === this.currentCategory;
            });
            console.log(`🔍 Filtered ${filteredProducts.length} products for category: ${this.currentCategory}`);
            container.innerHTML = filteredProducts.map(p => this.renderProductCard(p, nameKey)).join('');
        } else {
            container.innerHTML = activeProducts.map(p => this.renderProductCard(p, nameKey)).join('');
        }
        
        console.log('✅ Products rendered successfully');
    }

    renderProductCard(product, nameKey) {
        const text = TEXT[this.lang];
        const name = product[nameKey] || product.Nome;
        const isOutOfStock = product.StockNum <= 0;
        const isLowStock = product.StockNum > 0 && product.StockNum < 5;
        const isWishlisted = this.isWishlisted(product.ID);

        let badge = '';
        if (isOutOfStock) {
            badge = `<span class="product-badge out-of-stock">${text?.outOfStock || 'Esaurito'}</span>`;
        } else if (isLowStock) {
            badge = `<span class="product-badge low-stock">${text?.lowStock || 'Ultimi pezzi'}</span>`;
        } else if (product.Nuovo === 'SI') {
            badge = `<span class="product-badge product-badge-new">${text?.newBadge || 'Nuovo'}</span>`;
        }

        return `
            <div class="product-card" data-product-id="${product.ID}">
                ${badge}
                <button class="product-wishlist ${isWishlisted ? 'active' : ''}" onclick="window.app.toggleWishlist('${product.ID}')">♡</button>
                <div class="product-image-wrapper">
                    <img class="product-image" src="${product.Immagine}" alt="${name}" loading="lazy">
                    <button class="product-quick-view" onclick="window.app.showQuickView('${product.ID}')">${text?.quickView || 'Veloce'}</button>
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
                        <span class="product-price-unit">${text?.pricePer || 'al'} ${product.Unità || 'pz'}</span>
                    </div>
                    <span class="product-availability ${isOutOfStock ? 'out' : isLowStock ? 'limited' : ''}">
                        ${isOutOfStock ? (text?.outOfStock || 'Esaurito') : isLowStock ? (text?.lowStock || 'Ultimi pezzi') : (text?.inStock || 'Disponibile')}
                    </span>
                    <button class="product-add-btn" ${isOutOfStock ? 'disabled' : ''} onclick="window.app.addToCart('${product.ID}')">
                        ${isOutOfStock ? (text?.outOfStock || 'Esaurito') : `<span>🛒</span> ${text?.addToCart || 'Aggiungi'}`}
                    </button>
                </div>
            </div>
        `;
    }

    renderCategories() {
        console.log('📂 Rendering categories...');
        const container = document.getElementById('category-menu');
        if (!container) {
            console.warn('❌ Category menu container not found');
            return;
        }

        const catKey = this.lang === 'it' ? 'Categoria' : `Categoria_${this.lang.toUpperCase()}`;
        const activeProducts = this.products.filter(p => p.Disponibile === 'SI');
        const categories = [...new Set(activeProducts.map(p => p[catKey] || p.Categoria))];
        
        console.log(`📊 Found ${categories.length} categories`);

        const categoryLinks = categories.map(cat => 
            `<li><a href="#products" data-category="${cat}" onclick="window.app.filterByCategory('${cat}'); return false;">${cat}</a></li>`
        ).join('');
        
        container.innerHTML = categoryLinks;
        console.log('✅ Categories rendered successfully');
    }

    renderFeaturedProducts() {
        console.log('⭐ Rendering featured products...');
        const container = document.getElementById('featured-track');
        if (!container) {
            console.warn('❌ Featured track container not found');
            return;
        }

        const nameKey = this.lang === 'it' ? 'Nome' : `Nome_${this.lang.toUpperCase()}`;
        const featuredProducts = this.products
            .filter(p => p.Evidenza === 'SI' && p.Disponibile === 'SI' && p.StockNum > 0)
            .slice(0, 8);

        console.log(`⭐ Found ${featuredProducts.length} featured products`);
        
        container.innerHTML = featuredProducts.map(p => this.renderProductCard(p, nameKey)).join('');
        
        // Initialize carousel after rendering
        setTimeout(() => {
            if (window.featuredCarousel) {
                window.featuredCarousel.refresh();
            }
        }, 100);
        
        console.log('✅ Featured products rendered successfully');
    }

    filterByCategory(category) {
        console.log(`🏷️ Filtering by category: ${category}`);
        this.currentCategory = this.currentCategory === category ? null : category;
        this.renderProducts();
        this.updateCategoryUI();
        console.log(`✅ Category filter applied: ${this.currentCategory}`);
    }

    updateCategoryUI() {
        if (this.currentCategory) {
            const links = document.querySelectorAll('#category-menu a');
            if (links.length > 0) {
                links.forEach(link => {
                    const isActive = this.currentCategory === link.dataset.category;
                    link.classList.toggle('active', isActive);
                });
                console.log(`🏷️ Updated category UI for: ${this.currentCategory}`);
            }
        }
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
            if (typeof showToast !== 'undefined') {
                showToast(TEXT[this.lang].cartEmptyAlert, 'warning');
            }
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
        console.log('🎉 Showing success popup:', orderId);
        const popup = document.getElementById('success-popup');
        if (popup) {
            const orderIdEl = document.getElementById('success-order-id');
            if (orderIdEl) orderIdEl.textContent = orderId;
            popup.classList.add('active');
        }
    }

    hideSuccess() {
        console.log('🚪 Hiding success popup');
        const popup = document.getElementById('success-popup');
        if (popup) {
            popup.classList.remove('active');
            popup.style.display = '';
        }
        // Clear cart
        this.cart = [];
        this.saveCart();
        console.log('✅ Cart cleared after order');
    }
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

// Initialize app globally
let app;

// Make app global for HTML onclick handlers
window.app = null;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new App();
        window.app = app;
        console.log('🚀 App initialized successfully');
    });
} else {
    app = new App();
    window.app = app;
    console.log('🚀 App initialized immediately');
}
