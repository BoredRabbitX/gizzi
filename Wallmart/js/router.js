// Router per la navigazione tra pagine
class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = null;
        this.init();
    }

    init() {
        // Listen for hash changes
        window.addEventListener('hashchange', () => this.handleRoute());
        
        // Handle initial route
        this.handleRoute();
        
        // Handle navigation links
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const href = e.target.getAttribute('href');
                window.location.hash = href;
            }
        });
    }

    addRoute(path, handler) {
        this.routes[path] = handler;
    }

    handleRoute() {
        const hash = window.location.hash.slice(1) || 'home';
        const route = this.routes[hash];
        
        if (route && typeof route === 'function') {
            route();
        } else {
            // Default to home page
            this.showPage('home');
        }
        
        this.currentRoute = hash;
    }

    showPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page-container').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show selected page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        // Update active states in navigation
        document.querySelectorAll('.nav-link, .category-menu a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${pageId}`) {
                link.classList.add('active');
            }
        });
    }

    navigate(path) {
        window.location.hash = path;
    }
}

// Initialize router
const router = new Router();

// Add basic routes
router.addRoute('home', () => {
    router.showPage('home');
});

router.addRoute('products', () => {
    router.showPage('products');
    if (window.app) {
        window.app.renderProducts();
    }
});

router.addRoute('featured', () => {
    router.showPage('products');
    // Scroll to featured section
    setTimeout(() => {
        const featured = document.querySelector('#featured-carousel');
        if (featured) {
            featured.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
});

// Handle category navigation
document.addEventListener('DOMContentLoaded', () => {
    window.router = router;
    console.log('🧭 Router initialized');
    
    // Wait for app and products to be loaded
    const checkAndAddRoutes = () => {
        if (window.app && window.app.products && window.app.products.length > 0) {
            console.log('📂 Adding category routes...');
            const categories = [...new Set(window.app.products.map(p => p.Categoria))];
            categories.forEach(category => {
                const categoryId = category.replace(/\s+/g, '-').toLowerCase();
                router.addRoute(categoryId, () => {
                    router.showPage('products');
                    window.app.filterByCategory(category);
                });
            });
            console.log(`✅ Added ${categories.length} category routes`);
        } else {
            // Try again after a short delay
            setTimeout(checkAndAddRoutes, 500);
        }
    };
    
    // Start checking after a short delay to allow app to initialize
    setTimeout(checkAndAddRoutes, 1000);
});