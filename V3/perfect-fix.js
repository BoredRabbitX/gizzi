// CAROUSEL INFINITO E CONTATORE PROFESSIONALE

// Variabili globali
let carouselInterval;
let isMobile = false;

// Detection mobile
function detectMobile() {
    isMobile = window.innerWidth <= 768;
    return isMobile;
}

// Setup carousel infinito senza loop
function setupPerfectCarousel(products) {
    const carouselTrack = document.getElementById('carousel-track');
    const carouselViewport = document.querySelector('.carousel-viewport');
    const carouselDots = document.getElementById('carousel-dots');
    
    if (!carouselTrack || products.length === 0) return;
    
    const nameKey = lang === 'it' ? 'Nome' : `Nome_${lang.toUpperCase()}`;
    
    // Usa solo i prodotti (senza duplicare)
    const displayProducts = products.slice(0, 4);
    
    carouselTrack.innerHTML = displayProducts.map(product => 
        createCard(product, nameKey)
    ).join('');
    
    // Se desktop, avvia auto-scroll
    if (!isMobile) {
        setupDesktopAutoScroll(carouselTrack, displayProducts.length);
        setupDots(carouselDots, displayProducts.length);
    } else {
        // Mobile: setup scroll snap
        setupMobileScroll(carouselTrack, carouselViewport, carouselDots);
    }
}

// Auto-scroll desktop
function setupDesktopAutoScroll(track, itemCount) {
    if (carouselInterval) {
        clearInterval(carouselInterval);
    }
    
    let currentIndex = 0;
    const itemWidth = 300; // 280px + 20px gap
    
    carouselInterval = setInterval(() => {
        if (!track.matches(':hover')) {
            currentIndex = (currentIndex + 1) % itemCount;
            const offset = currentIndex * itemWidth;
            track.style.transform = `translateX(-${offset}px)`;
            
            // Aggiorna dots
            updateDots(currentIndex, itemCount);
        }
    }, 6000);
}

// Setup dots
function setupDots(dotsContainer, count) {
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => goToSlide(i, count);
        dotsContainer.appendChild(dot);
    }
}

// Aggiorna dots
function updateDots(activeIndex, count) {
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
    });
}

// Vai a slide specifica
function goToSlide(index, count) {
    const track = document.getElementById('carousel-track');
    if (!track) return;
    
    const itemWidth = 300;
    const clampedIndex = Math.max(0, Math.min(index, count - 1));
    
    track.style.transform = `translateX(-${clampedIndex * itemWidth}px)`;
    updateDots(clampedIndex, count);
}

// Mobile scroll snap
function setupMobileScroll(track, viewport, dotsContainer) {
    // Mostra meno prodotti su mobile
    const cards = track.querySelectorAll('.carousel-item');
    cards.forEach(card => {
        card.style.flex = '0 0 200px'; /* Più stretti su mobile */
    });
    
    // Setup scroll snap
    if (viewport) {
        viewport.style.scrollSnapType = 'x mandatory';
        viewport.style.scrollBehavior = 'smooth';
        viewport.style.overflowX = 'auto';
        viewport.style.overflowY = 'hidden';
        viewport.style.webkitOverflowScrolling = 'touch';
    }
    
    // Nascondi dots su mobile
    if (dotsContainer) {
        dotsContainer.style.display = 'none';
    }
}

// Contatore carrello sempre visibile
function updateCartCountPerfect() {
    const cartCount = document.getElementById('cart-count');
    if (!cartCount) return;
    
    const totalItems = cart.reduce((a, b) => a + b.qty, 0);
    
    if (totalItems > 0) {
        // Usa sempre stesse dimensioni su tutti i dispositivi
        cartCount.style.width = '22px';
        cartCount.style.height = '22px';
        cartCount.style.fontSize = '0.75rem';
        cartCount.style.minWidth = '22px';
        cartCount.style.minHeight = '22px';
        cartCount.style.top = '-5px';
        cartCount.style.right = '-5px';
        cartCount.style.padding = '3px';
        
        const displayText = totalItems > 99 ? '99+' : totalItems.toString();
        cartCount.textContent = displayText;
        cartCount.style.display = 'flex';
        cartCount.style.visibility = 'visible';
        cartCount.style.opacity = '1';
        
        // Animazione solo quando cambia valore
        if (cartCount.dataset.count !== displayText) {
            cartCount.classList.add('cart-pulse');
            setTimeout(() => cartCount.classList.remove('cart-pulse'), 500);
        }
        cartCount.dataset.count = displayText;
        
    } else {
        cartCount.style.display = 'none';
        cartCount.dataset.count = '';
    }
}

// Aggiungi animazione per contatore
const style = document.createElement('style');
style.textContent = `
    .cart-pulse {
        animation: cartPulse 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    
    @keyframes cartPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.15); }
        100% { transform: scale(1); }
    }
    
    .cart-count {
        position: absolute !important;
        top: -5px !important;
        right: -5px !important;
        background: var(--gizzi-gold) !important;
        border: 2px solid var(--gizzi-white) !important;
        z-index: 99999 !important;
        font-weight: 700 !important;
        text-align: center !important;
        line-height: 1 !important;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15) !important;
        transition: all 0.2s ease !important;
    }
    
    /* Desktop adjustments */
    @media (min-width: 769px) {
        .cart-count {
            width: 24px !important;
            height: 24px !important;
            font-size: 0.8rem !important;
            top: -6px !important;
            right: -6px !important;
            padding: 3px 4px !important;
        }
    }
`;
document.head.appendChild(style);

// Override funzioni esistenti
function setupPerfectSystem() {
    detectMobile();
    
    // Override createInfiniteCarousel
    window.createInfiniteCarousel = setupPerfectCarousel;
    
    // Override updateCartUI per contatore
    const originalUpdateCartUI = window.updateCartUI;
    window.updateCartUI = function() {
        if (originalUpdateCartUI) {
            originalUpdateCartUI.call(this);
        }
        updateCartCountPerfect();
    };
    
    // Gestione resize
    window.addEventListener('resize', () => {
        const wasMobile = isMobile;
        detectMobile();
        
        if (wasMobile !== isMobile && products.length > 0) {
            const featured = products.filter(p => p.Disponibile === 'SI' && p.Evidenza === 'SI' && p.StockNum > 0);
            setupPerfectCarousel(featured);
        }
        
        updateCartCountPerfect();
    });
    
    // Cleanup interval
    window.addEventListener('beforeunload', () => {
        if (carouselInterval) {
            clearInterval(carouselInterval);
        }
    });
}

// Inizializzazione
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(setupPerfectSystem, 100);
});

// Aggiorna anche dopo caricamento prodotti
window.addEventListener('load', () => {
    setTimeout(() => {
        if (products && products.length > 0) {
            const featured = products.filter(p => p.Disponibile === 'SI' && p.Evidenza === 'SI' && p.StockNum > 0);
            setupPerfectCarousel(featured);
        }
        updateCartCountPerfect();
    }, 200);
});