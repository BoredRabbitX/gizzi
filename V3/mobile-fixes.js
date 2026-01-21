// MOBILE CAROUSEL FIXES
let isMobile = window.innerWidth <= 768;
let touchStartX = 0;
let touchEndX = 0;

// Funzione per disabilitare carousel infinito su mobile
function setupMobileCarousel() {
    const carouselTrack = document.getElementById('carousel-track');
    if (!carouselTrack) return;

    if (isMobile) {
        // Disabilita animazione infinita su mobile
        carouselTrack.classList.add('mobile');
        
        // Setup touch events per swipe
        setupTouchEvents(carouselTrack);
        
        // Usa scroll snap invece di animazione
        setupScrollSnap(carouselTrack);
    } else {
        // Riabilita animazione infinita su desktop
        carouselTrack.classList.remove('mobile');
    }
}

// Touch events per swipe
function setupTouchEvents(track) {
    track.addEventListener('touchstart', handleTouchStart, { passive: true });
    track.addEventListener('touchend', handleTouchEnd, { passive: true });
}

function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
}

function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
}

function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    const minSwipeDistance = 50;
    
    if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance > 0) {
            // Swipe left - vai al precedente
            previousSlide();
        } else {
            // Swipe right - vai al successivo
            nextSlide();
        }
    }
}

// Scroll snap setup
function setupScrollSnap(track) {
    const viewport = track.parentElement;
    if (viewport) {
        viewport.style.scrollSnapType = 'x mandatory';
        viewport.style.scrollBehavior = 'smooth';
    }
}

// Funzioni di navigazione
function previousSlide() {
    const viewport = document.querySelector('.carousel-viewport');
    if (viewport) {
        const scrollLeft = viewport.scrollLeft;
        const itemWidth = window.innerWidth > 480 ? 320 : 280;
        const gap = isMobile ? 16 : 24;
        const newPosition = Math.max(0, scrollLeft - itemWidth - gap);
        
        viewport.scrollTo({
            left: newPosition,
            behavior: 'smooth'
        });
    }
}

function nextSlide() {
    const viewport = document.querySelector('.carousel-viewport');
    const track = document.getElementById('carousel-track');
    
    if (viewport && track) {
        const scrollLeft = viewport.scrollLeft;
        const itemWidth = window.innerWidth > 480 ? 320 : 280;
        const gap = isMobile ? 16 : 24;
        const maxScroll = track.scrollWidth - viewport.clientWidth;
        const newPosition = Math.min(maxScroll, scrollLeft + itemWidth + gap);
        
        viewport.scrollTo({
            left: newPosition,
            behavior: 'smooth'
        });
    }
}

// Aggiorna isMobile quando la finestra viene ridimensionata
function updateMobileStatus() {
    isMobile = window.innerWidth <= 768;
    setupMobileCarousel();
}

// Aggiorna funzione createInfiniteCarousel per mobile
function createMobileCarousel(products) {
    const carouselTrack = document.getElementById('carousel-track');
    if (!carouselTrack || products.length === 0) return;

    // Su mobile, non duplicare i prodotti
    const nameKey = lang === 'it' ? 'Nome' : `Nome_${lang.toUpperCase()}`;
    
    carouselTrack.innerHTML = products.map(product => createCard(product, nameKey)).join('');
    
    // Aggiungi classe mobile per CSS
    carouselTrack.classList.add('mobile');
    
    // Setup scroll snap
    setupScrollSnap(carouselTrack);
}

// Aggiorna funzione render per mobile
function setupMobileView() {
    const nameKey = lang === 'it' ? 'Nome' : `Nome_${lang.toUpperCase()}`;
    const activeProds = products.filter(p => p.Disponibile === 'SI');
    const featured = activeProds.filter(p => p.Evidenza === 'SI' && p.StockNum > 0);
    
    if (featured.length > 0) {
        if (isMobile) {
            createMobileCarousel(featured);
        } else {
            createInfiniteCarousel(featured);
        }
    }
}

// Fix per updateCartUI su mobile
function updateCartUIMobile() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((a, b) => a + b.qty, 0);
    
    if (cartCount) {
        if (totalItems > 0) {
            cartCount.textContent = totalItems > 99 ? '99+' : totalItems.toString();
            cartCount.classList.add('show');
            cartCount.style.display = 'flex';
            cartCount.style.visibility = 'visible';
        } else {
            cartCount.textContent = '0';
            cartCount.classList.remove('show');
            cartCount.style.display = 'none';
        }
    }
}

// Event listeners
window.addEventListener('resize', () => {
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(updateMobileStatus, 250);
});

window.addEventListener('orientationchange', () => {
    setTimeout(updateMobileStatus, 500);
});

// Override funzioni esistenti
document.addEventListener('DOMContentLoaded', () => {
    // Setup mobile detection
    updateMobileStatus();
    
    // Override updateCartUI
    const originalUpdateCartUI = window.updateCartUI;
    window.updateCartUI = function() {
        if (originalUpdateCartUI) originalUpdateCartUI.call(this);
        updateCartUIMobile();
    };
    
    // Aggiorna subito
    updateCartUIMobile();
});