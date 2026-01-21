// CAROUSEL MOBILE FIX DEFINITIVO
function setupMobileCarousel() {
    const isMobile = window.innerWidth <= 768;
    const carouselTrack = document.getElementById('carousel-track');
    const carouselViewport = document.querySelector('.carousel-viewport');
    
    if (!carouselTrack || !carouselViewport) return;
    
    if (isMobile) {
        // Disabilita animazione infinita su mobile
        carouselTrack.classList.remove('infinite');
        carouselTrack.classList.add('mobile-carousel');
        
        // Setup swipe indicators
        setupSwipeIndicators(carouselTrack, carouselViewport);
        
        // Setup scroll events
        setupScrollEvents(carouselViewport);
    } else {
        // Riabilita animazione infinita su desktop
        carouselTrack.classList.add('infinite');
        carouselTrack.classList.remove('mobile-carousel');
    }
}

// Indicatore swipe per mobile
function setupSwipeIndicators(track, viewport) {
    // Rimuovi indicatori esistenti
    const existingIndicators = document.querySelector('.carousel-swipe-indicators');
    if (existingIndicators) {
        existingIndicators.remove();
    }
    
    // Calcola numero di prodotti visibili
    const items = track.querySelectorAll('.carousel-item');
    if (items.length === 0) return;
    
    // Crea indicatori
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'carousel-swipe-indicators';
    
    // Aggiungi indicatori basati sui prodotti
    for (let i = 0; i < items.length; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'swipe-indicator';
        if (i === 0) indicator.classList.add('active');
        indicatorsContainer.appendChild(indicator);
    }
    
    // Inserisci dopo il carousel
    viewport.parentNode.insertBefore(indicatorsContainer, viewport.nextSibling);
    
    // Aggiorna indicatori allo scroll
    updateIndicatorsOnScroll(viewport, indicatorsContainer);
}

// Update indicators
function updateIndicatorsOnScroll(viewport, indicatorsContainer) {
    const indicators = indicatorsContainer.querySelectorAll('.swipe-indicator');
    const itemWidth = 280 + 16; // card width + gap
    const scrollLeft = viewport.scrollLeft;
    
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', 
            Math.abs(scrollLeft - (index * itemWidth)) < itemWidth / 2
        );
    });
}

// Scroll events
function setupScrollEvents(viewport) {
    let scrollTimeout;
    
    viewport.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        
        // Aggiorna indicatori con debounce
        const indicatorsContainer = document.querySelector('.carousel-swipe-indicators');
        if (indicatorsContainer) {
            scrollTimeout = setTimeout(() => {
                updateIndicatorsOnScroll(viewport, indicatorsContainer);
            }, 50);
        }
    });
}

// CONTATORE CARRELLO FIX
function updateCartCountFixed() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((a, b) => a + b.qty, 0);
    
    if (!cartCount) return;
    
    // Calcola dimensioni responsive
    const isMobile = window.innerWidth <= 768;
    
    // Rimuovi tutte le classi
    cartCount.className = 'cart-count';
    
    if (totalItems > 0) {
        // Imposta testo
        cartCount.textContent = totalItems > 99 ? '99+' : totalItems.toString();
        
        // Imposta dimensioni
        if (isMobile) {
            cartCount.style.minWidth = '16px';
            cartCount.style.minHeight = '16px';
            cartCount.style.fontSize = '0.65rem';
            cartCount.style.top = '-2px';
            cartCount.style.right = '-2px';
            cartCount.style.borderWidth = '1.5px';
        } else {
            cartCount.style.minWidth = '20px';
            cartCount.style.minHeight = '20px';
            cartCount.style.fontSize = '0.75rem';
            cartCount.style.top = '-6px';
            cartCount.style.right = '-6px';
            cartCount.style.borderWidth = '2px';
        }
        
        // Assicura che sia visibile
        cartCount.style.display = 'flex';
        cartCount.style.visibility = 'visible';
        cartCount.style.opacity = '1';
        cartCount.style.zIndex = '10000';
        
        // Aggiungi animazione se è cambiato il valore
        if (cartCount.dataset.count !== totalItems.toString()) {
            cartCount.classList.add('animate');
            setTimeout(() => cartCount.classList.remove('animate'), 300);
        }
        
        cartCount.dataset.count = totalItems.toString();
        
    } else {
        // Nascondi se vuoto
        cartCount.style.display = 'none';
        cartCount.dataset.count = '';
    }
}

// Override funzione updateCartUI originale
function setupCartCountFix() {
    // Salva funzione originale se esiste
    const originalUpdateCartUI = window.updateCartUI;
    
    window.updateCartUI = function() {
        // Chiama funzione originale
        if (originalUpdateCartUI) {
            originalUpdateCartUI.call(this);
        }
        
        // Aggiungi nostro fix
        updateCartCountFixed();
    };
    
    // Chiudi subito
    updateCartCountFixed();
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    // Setup carousel
    setupMobileCarousel();
    
    // Setup contatore carrello
    setupCartCountFix();
    
    // Aggiorna su resize
    window.addEventListener('resize', () => {
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(() => {
            setupMobileCarousel();
            updateCartCountFixed();
        }, 250);
    });
    
    // Aggiorna su orientation change
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            setupMobileCarousel();
            updateCartCountFixed();
        }, 500);
    });
});

// Aggiungi anche dopo caricamento prodotti
window.addEventListener('load', () => {
    setTimeout(() => {
        setupMobileCarousel();
        updateCartCountFixed();
    }, 100);
});