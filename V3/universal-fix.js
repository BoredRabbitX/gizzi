// CAROUSEL E CARRELLO UNIVERSALE FUNZIONANTE

let carouselIndex = 0;
let isMobile = false;

// Detection mobile
function detectMobile() {
    isMobile = window.innerWidth <= 768;
}

// Funzione carousel universale
function setupUniversalCarousel(products) {
    const carouselTrack = document.getElementById('carousel-track');
    const carouselViewport = document.querySelector('.carousel-viewport');
    const carouselDots = document.getElementById('carousel-dots');
    
    if (!carouselTrack || products.length === 0) return;
    
    // Rendering base
    const nameKey = lang === 'it' ? 'Nome' : `Nome_${lang.toUpperCase()}`;
    
    if (isMobile) {
        // Mobile: rendering semplice con scroll snap
        carouselTrack.innerHTML = products.map(p => createCard(p, nameKey)).join('');
        carouselTrack.classList.add('mobile-carousel');
        
        // Setup scroll snap
        if (carouselViewport) {
            carouselViewport.style.scrollSnapType = 'x mandatory';
            carouselViewport.style.scrollBehavior = 'smooth';
        }
        
    } else {
        // Desktop: rendering duplicato per infinito
        const duplicatedProducts = [...products, ...products];
        carouselTrack.innerHTML = duplicatedProducts.map((product, index) => {
            const card = createCard(product, nameKey);
            return `<div class="carousel-item" data-index="${index}">${card}</div>`;
        }).join('');
        
        carouselTrack.classList.add('desktop-carousel');
        setupDesktopCarousel();
    }
}

// Carousel desktop (infinito)
function setupDesktopCarousel() {
    const track = document.getElementById('carousel-track');
    if (!track) return;
    
    const items = track.querySelectorAll('.carousel-item');
    if (items.length === 0) return;
    
    const itemWidth = 324; // 300px + 24px gap
    const totalWidth = items.length * itemWidth;
    
    // Auto-scroll infinito
    let scrollPosition = 0;
    
    function autoScroll() {
        if (!track.matches(':hover')) {
            scrollPosition += 1;
            
            // Reset quando arriva a metà
            if (scrollPosition >= totalWidth / 2) {
                scrollPosition = 0;
            }
            
            track.style.transform = `translateX(-${scrollPosition}px)`;
        }
        
        if (isMobile) return;
        requestAnimationFrame(autoScroll);
    }
    
    // Avvia auto-scroll solo su desktop
    if (!isMobile) {
        autoScroll();
    }
}

// Contatore carrello universale
function updateCartCountUniversal() {
    const cartCount = document.getElementById('cart-count');
    if (!cartCount) return;
    
    const totalItems = cart.reduce((a, b) => a + b.qty, 0);
    
    if (totalItems > 0) {
        cartCount.textContent = totalItems > 99 ? '99+' : totalItems.toString();
        cartCount.classList.add('updated');
        setTimeout(() => cartCount.classList.remove('updated'), 400);
    } else {
        cartCount.textContent = '0';
    }
}

// Override funzioni esistenti
function setupUniversalSystem() {
    detectMobile();
    
    // Override createInfiniteCarousel
    window.createInfiniteCarousel = setupUniversalCarousel;
    
    // Override updateCartUI per contatore
    const originalUpdateCartUI = window.updateCartUI;
    window.updateCartUI = function() {
        if (originalUpdateCartUI) originalUpdateCartUI.call(this);
        updateCartCountUniversal();
    };
    
    // Aggiorna su resize
    window.addEventListener('resize', () => {
        const wasMobile = isMobile;
        detectMobile();
        if (wasMobile !== isMobile) {
            // Reload products se cambia device type
            if (products && products.length > 0) {
                const featured = products.filter(p => p.Disponibile === 'SI' && p.Evidenza === 'SI' && p.StockNum > 0);
                setupUniversalCarousel(featured);
            }
        }
        updateCartCountUniversal();
    });
    
    // Inizializzazione
    if (products && products.length > 0) {
        const featured = products.filter(p => p.Disponibile === 'SI' && p.Evidenza === 'SI' && p.StockNum > 0);
        setupUniversalCarousel(featured);
    }
    
    updateCartCountUniversal();
}

// CSS per mobile scroll snap
const mobileCSS = `
    .mobile-carousel {
        transition: none !important;
        animation: none !important;
    }
    
    .mobile-carousel .carousel-item {
        flex: 0 0 280px !important;
        scroll-snap-align: start !important;
    }
    
    @media (max-width: 768px) {
        .mobile-carousel .carousel-item {
            flex: 0 0 260px !important;
        }
    }
    
    .carousel-viewport {
        -webkit-overflow-scrolling: touch;
    }
`;

// Iniezione CSS mobile
const mobileStyle = document.createElement('style');
mobileStyle.textContent = mobileCSS;
document.head.appendChild(mobileStyle);

// Init
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(setupUniversalSystem, 100);
});

// Aggiorna anche dopo caricamento prodotti
window.addEventListener('load', () => {
    setTimeout(setupUniversalSystem, 200);
});