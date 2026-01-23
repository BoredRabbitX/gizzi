// SPA Page Navigation
class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = 'home';
        this.init();
    }

    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('DOMContentLoaded', () => {
            this.handleRoute();
        });
        
        // Intercept all navigation links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const href = link.getAttribute('href');
                window.location.hash = href;
            }
        });
    }

    navigate(route) {
        window.location.hash = route;
    }

    handleRoute() {
        const hash = window.location.hash.substring(1) || 'home';
        this.currentRoute = hash;
        this.updateUI();
    }

    updateUI() {
        // Hide all pages
        document.querySelectorAll('.page-container').forEach(page => {
            page.classList.remove('active');
        page.style.display = 'none';
        });
        
        // Show current page
        const targetPage = document.getElementById(this.currentRoute);
        if (targetPage) {
            targetPage.classList.add('active');
            targetPage.style.display = 'block';
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Default to home if route doesn't exist
            this.navigate('home');
        }

        // Update footer active state
        this.updateFooterLinks();
        
        // Update header category menu visibility
        this.updateHeaderVisibility();
    }

    updateFooterLinks() {
        document.querySelectorAll('.footer-nav-link').forEach(link => {
            const href = link.getAttribute('href').substring(1);
            if (href === this.currentRoute) {
                link.style.color = 'var(--natural-gold)';
            } else {
                link.style.color = '';
            }
        });
    }

    updateHeaderVisibility() {
        const productsSection = document.getElementById('products');
        const navContainer = document.querySelector('.nav-container');
        
        if (this.currentRoute === 'home') {
            if (navContainer) {
                navContainer.style.display = 'flex';
            }
        } else {
            if (navContainer) {
                navContainer.style.display = 'none';
            }
        }
    }

    register(path, callback) {
        this.routes[path] = callback;
    }
}

// Modal Management
class ModalManager {
    constructor() {
        this.activeModal = null;
        this.init();
    }

    init() {
        // Close modal on outside click
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.close(modal.id);
                }
            });
        });

        // Close modal on ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeModal) {
                this.close(this.activeModal);
            }
        });

        // Close mobile menu on route change
        window.addEventListener('hashchange', () => {
            const mobileMenu = document.querySelector('.header-bottom');
            if (mobileMenu) {
                mobileMenu.classList.remove('mobile-open');
                document.body.style.overflow = '';
            }
        });
    }

    open(modalId) {
        this.close(); // Close any open modal
        
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            this.activeModal = modalId;
        }
    }

    close(modalId = null) {
        if (modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.remove('active');
                modal.style.display = '';
                if (modalId === this.activeModal) {
                    this.activeModal = null;
                }
            }
        } else if (this.activeModal) {
            const modal = document.getElementById(this.activeModal);
            if (modal) {
                modal.classList.remove('active');
                modal.style.display = '';
                this.activeModal = null;
            }
        }
        document.body.style.overflow = '';
    }

    closeAll() {
        this.close();
    }
}

// Form Management
class FormManager {
    constructor() {
        this.init();
    }

    init() {
        // Form validation
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', this.handleSubmit.bind(this));
        });

        // Input validation on blur
        document.querySelectorAll('.form-input, .form-select').forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => {
                input.classList.remove('has-error');
                const error = input.parentElement.querySelector('.form-group-error');
                if (error) error.style.display = 'none';
            });
        });
    }

    validateField(field) {
        const error = field.parentElement.querySelector('.form-group-error');
        let isValid = true;
        let errorMessage = '';

        if (field.required && !field.value.trim()) {
            isValid = false;
            errorMessage = app?.lang ? TEXT[app.lang].fieldRequired || 'Campo obbligatorio' : 'Campo obbligatorio';
        } else if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                errorMessage = app?.lang ? TEXT[app.lang].emailInvalid || 'Email non valida' : 'Email non valida';
            }
        } else if (field.type === 'tel' && field.value) {
            const phoneRegex = /^[\+]?[(]{0,9}\s\-\(\)]{0,9}\s]*$/;
            if (!phoneRegex.test(field.value)) {
                isValid = false;
                errorMessage = app?.lang ? TEXT[app.lang].phoneInvalid || 'Telefono non valido' : 'Telefono non valido';
            }
        }

        if (!isValid) {
            field.classList.add('has-error');
            if (error) {
                error.textContent = errorMessage;
                error.style.display = 'block';
            }
        } else {
            field.classList.remove('has-error');
            if (error) {
                error.style.display = 'none';
            }
        }

        return isValid;
    }

    handleSubmit(event) {
        event.preventDefault();
        
        const form = event.target;
        const inputs = form.querySelectorAll('.form-input, .form-select, .form-textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            this.submitForm(form);
        }
    }

    submitForm(form) {
        const formData = new FormData(form);
        
        // Convert FormData to object
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Show success message
        const formId = form.id || 'form';
        if (formId === 'contact-form') {
            showToast('Messaggio inviato con successo!', 'success');
            form.reset();
        }
    }
}

// Scroll Management
class ScrollManager {
    constructor() {
        this.headerThreshold = 50;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        const header = document.querySelector('.site-header');
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > this.headerThreshold);
        }
    }

    scrollToElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

// Animation Observer
class AnimationObserver {
    constructor() {
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, { threshold: 0.1 });

        // Observe cards and sections
        document.querySelectorAll('.product-card, .info-card, .team-card, .shipping-option-card').forEach(el => {
            observer.observe(el);
        });
    }
}

// Initialize all managers
let router;
let modalManager;
let formManager;
let scrollManager;
let animationObserver;

window.addEventListener('DOMContentLoaded', () => {
    router = new Router();
    modalManager = new ModalManager();
    formManager = new FormManager();
    scrollManager = new ScrollManager();
    animationObserver = new AnimationObserver();
});

// Global functions for HTML onclick handlers
window.openModal = function(modalId) {
    modalManager.open(modalId);
};

window.closeModal = function(modalId) {
    modalManager.close(modalId);
};