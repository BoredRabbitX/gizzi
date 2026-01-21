/**
 * GRUPPO GIZZI - UI MANAGER
 * Gestione centralizzata dell'interfaccia utente
 */

class UIManager {
    constructor() {
        this.elements = {};
        this.isInitialized = false;
        this.breakpoints = {
            mobile: 768,
            tablet: 1024,
            desktop: 1280
        };
        this.currentBreakpoint = 'desktop';
        this.scrollY = 0;
    }

    async init() {
        try {
            this.cacheElements();
            this.setupEventListeners();
            this.setupScrollEffects();
            this.setupResponsiveHandlers();
            this.initializeAnimations();
            this.isInitialized = true;
            return Promise.resolve();
        } catch (error) {
            console.error('UI Manager initialization failed:', error);
            return Promise.reject(error);
        }
    }

    cacheElements() {
        // Header elements
        this.elements.header = document.querySelector('.header');
        this.elements.logo = document.querySelector('.logo');
        this.elements.langSelector = document.querySelector('.lang-selector');
        this.elements.langSelect = document.querySelector('.lang-select');
        this.elements.themeToggle = document.querySelector('.theme-toggle');
        this.elements.cartButton = document.querySelector('.cart-button');
        this.elements.cartCount = document.querySelector('.cart-count');
        this.elements.categoryMenu = document.querySelector('.category-menu');

        // Hero section
        this.elements.hero = document.querySelector('.hero');
        this.elements.heroContent = document.querySelector('.hero-content');
        this.elements.heroTitle = document.querySelector('.hero h1');
        this.elements.heroSubtitle = document.querySelector('.hero p');

        // Products section
        this.elements.viewControls = document.querySelector('.view-controls');
        this.elements.btnViewAll = document.getElementById('btn-view-all');
        this.elements.btnViewCats = document.getElementById('btn-view-cats');
        this.elements.productsContainer = document.getElementById('products-container');
        this.elements.carouselSection = document.querySelector('.carousel-section');
        this.elements.carouselTrack = document.getElementById('carousel-track');
        this.elements.carouselDots = document.getElementById('carousel-dots');

        // Cart elements
        this.elements.cartPanel = document.querySelector('.cart-panel');
        this.elements.cartOverlay = document.querySelector('.cart-overlay');
        this.elements.cartItems = document.querySelector('.cart-items');
        this.elements.cartTotal = document.querySelector('.cart-total');
        this.elements.cartShipping = document.querySelector('.cart-shipping');
        this.elements.checkoutBtn = document.querySelector('.checkout-btn');
        this.elements.clearCartBtn = document.querySelector('.clear-cart');

        // Modal elements
        this.elements.modal = document.querySelector('.modal');
        this.elements.modalContent = document.querySelector('.modal-content');
        this.elements.modalClose = document.querySelector('.modal-close');
        this.elements.checkoutForm = document.getElementById('checkout-form');

        // Other elements
        this.elements.gdprBanner = document.querySelector('.gdpr-banner');
        this.elements.thanksOverlay = document.querySelector('.thanks-overlay');
        this.elements.footer = document.querySelector('.footer');

        // Loading state
        this.elements.loadingOverlay = document.querySelector('.loading-overlay');
    }

    setupEventListeners() {
        // Theme toggle
        if (this.elements.themeToggle) {
            this.elements.themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Language selector
        if (this.elements.langSelect) {
            this.elements.langSelect.addEventListener('change', (e) => {
                i18n.setLanguage(e.target.value);
            });
        }

        // Cart toggle
        if (this.elements.cartButton) {
            this.elements.cartButton.addEventListener('click', () => this.toggleCart());
        }
        if (this.elements.cartOverlay) {
            this.elements.cartOverlay.addEventListener('click', () => this.closeCart());
        }

        // View controls
        if (this.elements.btnViewAll) {
            this.elements.btnViewAll.addEventListener('click', () => this.switchView('all'));
        }
        if (this.elements.btnViewCats) {
            this.elements.btnViewCats.addEventListener('click', () => this.switchView('categories'));
        }

        // Modal controls
        if (this.elements.modalClose) {
            this.elements.modalClose.addEventListener('click', () => this.closeModal());
        }
        if (this.elements.modal) {
            this.elements.modal.addEventListener('click', (e) => {
                if (e.target === this.elements.modal) {
                    this.closeModal();
                }
            });
        }

        // Checkout form
        if (this.elements.checkoutForm) {
            this.elements.checkoutForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.processCheckout();
            });
        }

        // GDPR controls
        const gdprAccept = document.querySelector('.gdpr-accept');
        const gdprDecline = document.querySelector('.gdpr-decline');
        if (gdprAccept) {
            gdprAccept.addEventListener('click', () => this.acceptGDPR());
        }
        if (gdprDecline) {
            gdprDecline.addEventListener('click', () => this.declineGDPR());
        }

        // Cart event listeners
        document.addEventListener('cartChange', (e) => this.updateCartUI(e.detail));
        document.addEventListener('cartMessage', (e) => this.showToast(e.detail.message, e.detail.type));

        // Language change event
        document.addEventListener('languageChange', (e) => this.onLanguageChange(e.detail.language));

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));

        // Prevent context menu on images
        document.addEventListener('contextmenu', (e) => {
            if (e.target.tagName === 'IMG') {
                e.preventDefault();
            }
        });
    }

    setupScrollEffects() {
        let ticking = false;

        const updateScrollEffects = () => {
            this.scrollY = window.scrollY;

            // Header effects
            if (this.elements.header) {
                if (this.scrollY > 100) {
                    this.elements.header.classList.add('scrolled');
                } else {
                    this.elements.header.classList.remove('scrolled');
                }
            }

            // Parallax effects
            this.updateParallaxEffects();

            // Lazy loading
            this.updateLazyLoading();

            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick, { passive: true });
    }

    updateParallaxEffects() {
        if (this.elements.hero) {
            const speed = 0.5;
            const yPos = -(this.scrollY * speed);
            this.elements.hero.style.backgroundPositionY = `${yPos}px`;
        }
    }

    updateLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]:not(.loaded)');
        
        lazyImages.forEach(img => {
            const rect = img.getBoundingClientRect();
            const isInViewport = rect.top < window.innerHeight + 200 && rect.bottom > -200;
            
            if (isInViewport) {
                img.src = img.dataset.src;
                img.classList.add('loaded');
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                });
            }
        });
    }

    setupResponsiveHandlers() {
        const updateBreakpoint = () => {
            const width = window.innerWidth;
            
            if (width < this.breakpoints.mobile) {
                this.currentBreakpoint = 'mobile';
            } else if (width < this.breakpoints.tablet) {
                this.currentBreakpoint = 'tablet';
            } else {
                this.currentBreakpoint = 'desktop';
            }

            document.body.setAttribute('data-breakpoint', this.currentBreakpoint);
        };

        updateBreakpoint();
        window.addEventListener('resize', updateBreakpoint);
    }

    initializeAnimations() {
        // Intersection Observer per le animazioni
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Osserva gli elementi animabili
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    // Theme management
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem(CONFIG.storage.theme, newTheme);
        
        this.updateThemeIcon(newTheme);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(CONFIG.storage.theme, theme);
        this.updateThemeIcon(theme);
    }

    updateThemeIcon(theme) {
        const icon = this.elements.themeToggle?.querySelector('.theme-icon');
        if (icon) {
            icon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem(CONFIG.storage.theme) || CONFIG.defaults.theme;
        this.setTheme(savedTheme);
    }

    // Cart UI
    toggleCart() {
        if (this.elements.cartPanel) {
            this.elements.cartPanel.classList.toggle('active');
            this.elements.cartOverlay?.classList.toggle('active');
            document.body.style.overflow = this.elements.cartPanel.classList.contains('active') ? 'hidden' : '';
        }
    }

    openCart() {
        if (this.elements.cartPanel) {
            this.elements.cartPanel.classList.add('active');
            this.elements.cartOverlay?.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeCart() {
        if (this.elements.cartPanel) {
            this.elements.cartPanel.classList.remove('active');
            this.elements.cartOverlay?.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    updateCartUI(cartData) {
        if (!cartData) return;

        // Update cart count
        if (this.elements.cartCount) {
            this.elements.cartCount.textContent = cartData.itemCount;
            this.elements.cartCount.style.display = cartData.itemCount > 0 ? 'flex' : 'none';
        }

        // Update cart items
        if (this.elements.cartItems) {
            this.renderCartItems(cartData.items);
        }

        // Update totals
        if (this.elements.cartShipping) {
            this.elements.cartShipping.textContent = `${i18n.translate('cart.shipping')}: ${cartManager.getFormattedShipping()}`;
        }
        
        if (this.elements.cartTotal) {
            this.elements.cartTotal.innerHTML = `
                <span>${i18n.translate('cart.total')}:</span>
                <span>${cartManager.getFormattedTotal()}</span>
            `;
        }
    }

    renderCartItems(items) {
        if (!this.elements.cartItems) return;

        if (items.length === 0) {
            this.elements.cartItems.innerHTML = `
                <div class="cart-empty">
                    <p>${i18n.translate('cart.empty')}</p>
                </div>
            `;
            return;
        }

        this.elements.cartItems.innerHTML = items.map(item => this.renderCartItem(item)).join('');
    }

    renderCartItem(item) {
        const productName = productManager.getProductName(item);
        const stockStatus = productManager.getStockStatus(item);
        const itemTotal = item.PrezzoNum * item.quantity;

        return `
            <div class="cart-item" data-product-id="${item.ID}">
                <div class="cart-item-info">
                    <div class="cart-item-name">${productName}</div>
                    <div class="cart-item-stock">${i18n.translate('products.maxQty')}: ${item.StockNum}</div>
                </div>
                
                <div class="cart-item-quantity">
                    <button class="qty-btn" onclick="cartManager.updateQuantity('${item.ID}', -1)">−</button>
                    <span class="qty-value">${item.quantity}</span>
                    <button class="qty-btn" onclick="cartManager.updateQuantity('${item.ID}', 1)">+</button>
                </div>
                
                <div class="cart-item-price">
                    ${cartManager.formatPrice(itemTotal)}
                </div>
                
                <button class="cart-item-remove" onclick="cartManager.removeItem('${item.ID}')">
                    🗑️
                </button>
            </div>
        `;
    }

    // Modal management
    openModal() {
        if (this.elements.modal) {
            this.elements.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        if (this.elements.modal) {
            this.elements.modal.classList.remove('active');
            document.body.style.overflow = '';
            this.resetCheckoutForm();
        }
    }

    resetCheckoutForm() {
        if (this.elements.checkoutForm) {
            this.elements.checkoutForm.reset();
        }
    }

    // View management
    switchView(view) {
        this.currentView = view;
        
        if (this.elements.btnViewAll && this.elements.btnViewCats) {
            this.elements.btnViewAll.classList.toggle('active', view === 'all');
            this.elements.btnViewCats.classList.toggle('active', view === 'categories');
        }

        this.renderProducts(view);
        
        // Scroll to top of products section
        const productsSection = document.querySelector('.products-section');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    renderProducts(view = 'all') {
        if (!this.elements.productsContainer) return;

        const products = view === 'all' 
            ? productManager.getProducts({ available: true })
            : this.renderCategories();

        this.elements.productsContainer.innerHTML = products;
        
        // Riattiva le animazioni
        this.initializeAnimations();
    }

    renderCategories() {
        const categories = productManager.getCategories();
        
        return categories.map(category => {
            const categoryProducts = productManager.getProductsByCategory(category);
            
            return `
                <div class="category-section" id="category-${this.slugify(category)}">
                    <h2 class="section-title">${category}</h2>
                    <div class="products-grid">
                        ${categoryProducts.map(product => this.renderProductCard(product)).join('')}
                    </div>
                </div>
            `;
        }).join('');
    }

    renderProductCard(product) {
        const stockStatus = productManager.getStockStatus(product);
        const productName = productManager.getProductName(product);
        const isInCart = cartManager.isProductInCart(product.ID);
        
        return `
            <div class="product-card ${!product.InStock ? 'out-of-stock' : ''}" data-product-id="${product.ID}">
                <div class="product-image-wrapper">
                    <img src="${product.Immagine}" alt="${productName}" class="product-image" loading="lazy">
                    <div class="stock-badge-overlay ${stockStatus.class}">
                        ${i18n.translate(`products.${stockStatus.status}`)}
                    </div>
                </div>
                
                <div class="product-content">
                    <h3 class="product-title">${productName}</h3>
                    
                    <div class="product-meta">
                        <div class="product-price">
                            ${product.PrezzoFormattato}
                            <small>/ ${product.Unità || 'pz'}</small>
                        </div>
                    </div>
                    
                    <div class="product-actions">
                        <button class="add-to-cart" 
                                onclick="cartManager.addItem(productManager.getProductById('${product.ID}'))"
                                ${!product.InStock ? 'disabled' : ''}>
                            ${!product.InStock ? i18n.translate('products.outOfStock') : i18n.translate('products.add')}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderCarousel(products) {
        if (!this.elements.carouselTrack) return;

        const carouselProducts = products.slice(0, 8);
        
        this.elements.carouselTrack.innerHTML = carouselProducts.map((product, index) => `
            <div class="carousel-item" style="animation-delay: ${index * 0.1}s">
                ${this.renderProductCard(product)}
            </div>
        `).join('');

        this.updateCarouselDots(carouselProducts.length);
        this.startCarousel();
    }

    updateCarouselDots(count) {
        if (!this.elements.carouselDots) return;

        this.elements.carouselDots.innerHTML = Array.from({ length: Math.min(count, 8) }, (_, i) => `
            <button class="carousel-dot ${i === 0 ? 'active' : ''}" 
                    onclick="uiManager.goToCarouselSlide(${i})">
            </button>
        `).join('');
    }

    startCarousel() {
        // Implementazione carousel auto-play
        let currentIndex = 0;
        
        setInterval(() => {
            const items = this.elements.carouselTrack?.querySelectorAll('.carousel-item');
            if (!items || items.length === 0) return;
            
            currentIndex = (currentIndex + 1) % items.length;
            this.goToCarouselSlide(currentIndex);
        }, CONFIG.ui.carousel.autoPlay);
    }

    goToCarouselSlide(index) {
        const track = this.elements.carouselTrack;
        const items = track?.querySelectorAll('.carousel-item');
        
        if (!items || items.length === 0) return;
        
        const itemWidth = items[0].offsetWidth + 24; // width + gap
        track.style.transform = `translateX(-${index * itemWidth}px)`;
        
        // Update dots
        document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Category menu
    renderCategoryMenu() {
        if (!this.elements.categoryMenu) return;

        const categories = productManager.getCategories();
        
        this.elements.categoryMenu.innerHTML = categories.map(category => `
            <a href="#category-${this.slugify(category)}" 
               class="category-link" 
               onclick="uiManager.scrollToCategory('${category}')">
                ${category}
            </a>
        `).join('');
    }

    scrollToCategory(category) {
        const categoryId = `category-${this.slugify(category)}`;
        const element = document.getElementById(categoryId);
        
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start',
                inline: 'nearest'
            });
            
            // Update active category
            document.querySelectorAll('.category-link').forEach(link => {
                link.classList.remove('active');
            });
            event.target.classList.add('active');
        }
    }

    // Checkout
    processCheckout() {
        if (!cartManager.canCheckout()) {
            this.showToast(i18n.translate('alerts.cartEmpty'), 'error');
            return;
        }

        const formData = new FormData(this.elements.checkoutForm);
        const orderData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            country: formData.get('country'),
            cart: cartManager.getCartData()
        };

        // Validate form
        if (!this.validateCheckoutForm(orderData)) {
            return;
        }

        // Process order
        this.submitOrder(orderData);
    }

    validateCheckoutForm(data) {
        let isValid = true;
        let firstInvalidField = null;

        // Basic validation
        const requiredFields = ['name', 'email', 'phone', 'address'];
        
        requiredFields.forEach(field => {
            const input = this.elements.checkoutForm.querySelector(`[name="${field}"]`);
            const value = data[field];
            
            if (!value || value.trim() === '') {
                isValid = false;
                input?.classList.add('invalid');
                if (!firstInvalidField) firstInvalidField = input;
            } else {
                input?.classList.remove('invalid');
            }
        });

        // Email validation
        if (data.email && !this.isValidEmail(data.email)) {
            isValid = false;
            const emailInput = this.elements.checkoutForm.querySelector('[name="email"]');
            emailInput?.classList.add('invalid');
            if (!firstInvalidField) firstInvalidField = emailInput;
        }

        if (!isValid && firstInvalidField) {
            firstInvalidField.focus();
            this.showToast(i18n.translate('alerts.requiredField'), 'error');
        }

        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async submitOrder(orderData) {
        const submitBtn = this.elements.checkoutForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        try {
            submitBtn.textContent = i18n.translate('checkout.processing');
            submitBtn.disabled = true;

            // Send to Google Forms
            const formData = new URLSearchParams({
                'entry.333212320': orderData.name,
                'entry.1385104048': orderData.email,
                'entry.844983788': orderData.phone,
                'entry.334440207': orderData.address,
                'entry.146792905': orderData.cart.total.toString()
            });

            await fetch(CONFIG.api.orderForm, {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            });

            // Send WhatsApp message
            const orderId = `GZ-${Date.now().toString().slice(-6)}`;
            const whatsappMessage = this.formatWhatsAppMessage(orderId, orderData);
            
            window.open(`https://wa.me/${CONFIG.contact.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`);

            // Show success
            this.showOrderSuccess();
            cartManager.clearCart();

        } catch (error) {
            console.error('Order submission error:', error);
            this.showToast(i18n.translate('alerts.orderError'), 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    formatWhatsAppMessage(orderId, orderData) {
        const { cart } = orderData;
        const itemsText = cart.items.map(item => 
            `${item.quantity}x ${item.Nome} = ${cartManager.formatPrice(item.PrezzoNum * item.quantity)}`
        ).join('\n');

        return `*ORDINE ${orderId}*\n\n` +
               `*CLIENTE:* ${orderData.name}\n` +
               `*EMAIL:* ${orderData.email}\n` +
               `*TEL:* ${orderData.phone}\n` +
               `*INDIRIZZO:* ${orderData.address}\n` +
               `*PAESE:* ${orderData.country}\n\n` +
               `*PRODOTTI:*\n${itemsText}\n\n` +
               `*TOTALE:* ${cartManager.formatPrice(cart.total)}`;
    }

    showOrderSuccess() {
        this.closeModal();
        if (this.elements.thanksOverlay) {
            this.elements.thanksOverlay.classList.add('active');
        }
    }

    // GDPR
    acceptGDPR() {
        localStorage.setItem(CONFIG.storage.gdpr, 'accepted');
        if (this.elements.gdprBanner) {
            this.elements.gdprBanner.classList.remove('active');
        }
    }

    declineGDPR() {
        localStorage.setItem(CONFIG.storage.gdpr, 'declined');
        if (this.elements.gdprBanner) {
            this.elements.gdprBanner.classList.remove('active');
        }
    }

    checkGDPR() {
        const gdprStatus = localStorage.getItem(CONFIG.storage.gdpr);
        if (!gdprStatus && this.elements.gdprBanner) {
            setTimeout(() => {
                this.elements.gdprBanner.classList.add('active');
            }, 2000);
        }
    }

    // Event handlers
    onLanguageChange(language) {
        if (this.elements.langSelect) {
            this.elements.langSelect.value = language;
        }
        this.renderProducts(this.currentView);
        this.renderCategoryMenu();
        this.updateCartUI(cartManager.getCartData());
    }

    handleKeyboardShortcuts(e) {
        // Cart shortcuts
        if (e.key === 'c' && e.ctrlKey) {
            e.preventDefault();
            this.toggleCart();
        }
        
        // Theme shortcuts
        if (e.key === 'd' && e.ctrlKey && e.shiftKey) {
            e.preventDefault();
            this.toggleTheme();
        }
        
        // Escape to close modals
        if (e.key === 'Escape') {
            if (this.elements.modal?.classList.contains('active')) {
                this.closeModal();
            }
            if (this.elements.cartPanel?.classList.contains('active')) {
                this.closeCart();
            }
        }
    }

    // Utility functions
    showToast(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Remove after duration
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    showLoading(show = true) {
        if (this.elements.loadingOverlay) {
            this.elements.loadingOverlay.style.display = show ? 'flex' : 'none';
        }
        document.body.classList.toggle('loading', show);
    }

    slugify(text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')        // Replace spaces with -
            .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
            .replace(/\-\-+/g, '-')      // Replace multiple - with single -
            .replace(/^-+/, '')          // Trim - from start of text
            .replace(/-+$/, '');         // Trim - from end of text
    }
}

// Istanza globale
const uiManager = new UIManager();

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIManager;
} else {
    window.UIManager = UIManager;
    window.uiManager = uiManager;
}