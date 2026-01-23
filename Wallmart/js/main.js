document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const themeToggles = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');
    const cartBtn = document.getElementById('cart-btn');
    const langSelect = document.getElementById('lang-select');
    const checkoutForm = document.getElementById('checkout-form');
    const contactForm = document.getElementById('contact-form');
    const modalCancel = document.getElementById('modal-cancel');
    const successPopup = document.getElementById('success-popup');
    const backToSiteBtn = document.getElementById('back-to-site');
    const clearCartBtn = document.getElementById('clear-cart-btn');
    const continueShoppingBtn = document.getElementById('continue-shopping');
    const gdprAccept = document.getElementById('gdpr-accept');
    const gdprReject = document.getElementById('gdpr-reject');
    const searchInput = document.getElementById('search-input');
    const promoApplyBtn = document.getElementById('promo-apply');
    const promoInput = document.getElementById('promo-code');

    // Toast notification functions
    window.showToast = function(message, type = 'success') {
        if (!message && message.trim() === '') return;
        const toast = document.getElementById('toast');
        if (toast) {
            const toastTitle = toast.querySelector('.toast-title');
            const toastMessage = toast.querySelector('.toast-message');
            const toastIcon = toast.querySelector('.toast-icon');

            if (toastTitle) toastTitle.textContent = type === 'success' ? 'Successo' : type === 'error' ? 'Errore' : 'Attenzione';
            if (toastMessage) toastMessage.textContent = message;
            if (toastIcon) toastIcon.textContent = type === 'success' ? '✓' : type === 'error' ? '✕' : '⚠️';

        isWishlisted(productId) {
        return this.wishlist.includes(productId);
    }

    toggleWishlist(productId) {
        if (this.isWishlisted(productId)) {
            this.wishlist = this.wishlist.filter(id => id !== productId);
        } else {
            this.wishlist.push(productId);
        }
        this.saveWishlist();
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

    updateProductUI() {
        this.renderProducts();
        this.renderFeaturedProducts();
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
            if (typeof showToast !== 'undefined') {
                showToast(TEXT[this.lang].orderError, 'error');
            }
        }
    }
    };

window.hideToast = function() {
        const toast = document.getElementById('toast');
        if (toast) toast.classList.remove('active');
    }
    };

    // Mobile Menu Toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const headerBottom = document.querySelector('.header-bottom');
            if (headerBottom) {
                headerBottom.classList.toggle('mobile-open');
                document.body.style.overflow = headerBottom.classList.contains('mobile-open') ? 'hidden' : '';
            }
        });
    }

    // Theme Toggle
    themeToggles.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
            if (window.app) {
                window.app.toggleTheme();
            } else {
                console.warn('Theme toggle not available');
            }
        });
        }
    });

    // Cart Toggle
    if (cartBtn) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (app) {
                window.app.openCart();
            }
        });
    }

    // Language Selector
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
        if (window.app) {
            window.app.changeLang(e.target.value);
            } else {
                console.warn('App not available for language change');
                // Fallback to reload page with new language
                const newLang = e.target.value;
                localStorage.setItem('gizzi_lang', newLang);
                console.log('Language changed, please refresh page');
            }
        });
    }

    // Checkout Modal
    if (modalCancel) {
        modalCancel.addEventListener('click', () => {
            if (app) {
                window.app.closeCheckout();
            }
        });
    }

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (window.app) {
                window.app.updateUI();
                window.app.updateProductUI();
                window.app.updateCartUI();
            } else {
                console.warn('App UI update not available');
        }
    }
}

    // Contact Form
    if (window.contactForm) {
        window.contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (typeof showToast !== 'undefined') {
                window.showToast('Messaggio inviato con successo!', 'success');
            }
            contactForm.reset();
        });
    }
        });
    }

    if (backToSiteBtn) {
        backToSiteBtn.addEventListener('click', () => {
            if (app) {
                window.app.hideSuccess();
            }
        });
    }

    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            if (app) {
                window.app.clearCart();
            }
        });
    }

    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', () => {
            if (app) {
                window.app.closeCart();
            }
        });
    }

    // GDPR Banner
    if (gdprAccept) {
        gdprAccept.addEventListener('click', () => {
            if (app) {
                window.app.acceptGDPR();
            }
        });
    }

    if (gdprReject) {
        gdprReject.addEventListener('click', () => {
            if (app) {
                window.app.rejectGDPR();
            }
        });
    }

    // Mobile Menu Toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const headerBottom = document.querySelector('.header-bottom');
            if (headerBottom) {
                headerBottom.classList.toggle('mobile-open');
                document.body.style.overflow = headerBottom.classList.contains('mobile-open') ? 'hidden' : '';
            }
        });
    }

    // Search Input
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const container = document.getElementById('products-grid');

            if (!container || !app) return;

            const filteredProducts = window.app.products.filter(p => {
                const nameKey = window.app.lang === 'it' ? 'Nome' : `Nome_${window.app.lang.toUpperCase()}`;
                const name = p[nameKey] || p.Nome || '';
                const category = p.Categoria || '';
                const desc = p.Descrizione || '';

                return (
                    name.toLowerCase().includes(query) ||
                    category.toLowerCase().includes(query) ||
                    desc.toLowerCase().includes(query)
                ) && p.Disponibile === 'SI';
            });

            const nameKey = window.app.lang === 'it' ? 'Nome' : `Nome_${window.app.lang.toUpperCase()}`;
            const text = TEXT[window.app.lang];
            container.innerHTML = filteredProducts.map(p => window.app.renderProductCard(p, nameKey)).join('');

            if (filteredProducts.length ===0) {
                container.innerHTML = `
                    <div style="grid-column:1 / -1; text-align: center; padding: 60px 20px;">
                        <div style="font-size: 4rem; margin-bottom: 20px; opacity: 0.3;">🔍</div>
                        <h3 style="font-size: 1.3rem; margin-bottom: 8px;">${text.searchEmpty}</h3>
                        <p style="color: var(--text-secondary);">${text.searchEmptySub}</p>
                    </div>
                `;
            }
        });
    }

    // Promo Code
    if (promoApplyBtn && promoInput) {
        promoApplyBtn.addEventListener('click', () => {
            const code = promoInput.value.trim().toUpperCase();
            const text = window.app?.lang ? TEXT[window.app.lang] : TEXT['it']; 

            if (code === 'GIZZI10' || code === 'CILENTO20') {
                if (typeof showToast !== 'undefined') {
                    showToast(TEXT[window.app?.lang || 'it'].orderSuccess, 'success');
                }
                promoInput.disabled = true;
                promoApplyBtn.disabled = true;
                promoApplyBtn.textContent = TEXT[window.app?.lang || 'it'].promoApplied;
            } else {
                if (typeof showToast !== 'undefined') {
                    showToast(TEXT[window.app?.lang || 'it'].promoInvalid, 'error');
                }
            }
        });
    }
        });
    }

    // Close mobile menu when clicking links on mobile
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href]');
        if (link && window.innerWidth <= 768) {
            const headerBottom = document.querySelector('.header-bottom');
            if (headerBottom && headerBottom.classList.contains('mobile-open')) {
                headerBottom.classList.remove('mobile-open');
                document.body.style.overflow = '';
            }
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close mobile menu
            const headerBottom = document.querySelector('.header-bottom');
            if (headerBottom && headerBottom.classList.contains('mobile-open')) {
                headerBottom.classList.remove('mobile-open');
                document.body.style.overflow = '';
            }

            if (window.app) {
                window.app.closeCart();
                window.app.closeCheckout();
            }
            const toast = document.getElementById('toast');
            if (toast) toast.classList.remove('active');
        }
    });

    // Close modal on outside click
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.product-card').forEach(card => {
        observer.observe(card);
    });

});