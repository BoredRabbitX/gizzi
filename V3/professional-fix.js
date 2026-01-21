// CAROUSEL BILANCIATO E CARRELLO PROFESSIONALE

let isMobile = window.innerWidth <= 768;
let carouselInterval;

// Detection mobile
function detectMobile() {
    isMobile = window.innerWidth <= 768;
    return isMobile;
}

// Carousel bilanciato
function setupBalancedCarousel(products) {
    const carouselTrack = document.getElementById('carousel-track');
    const carouselViewport = document.querySelector('.carousel-viewport');
    const carouselDots = document.getElementById('carousel-dots');
    
    if (!carouselTrack || products.length === 0) return;
    
    const nameKey = lang === 'it' ? 'Nome' : `Nome_${lang.toUpperCase()}`;
    
    if (isMobile) {
        // Mobile: semplice con scroll snap
        const mobileHTML = products.slice(0, 6).map(product => 
            createCard(product, nameKey)
        ).join('');
        
        carouselTrack.innerHTML = mobileHTML;
        carouselTrack.classList.add('mobile-carousel');
        
        // Setup scroll snap
        if (carouselViewport) {
            carouselViewport.style.scrollSnapType = 'x mandatory';
            carouselViewport.style.scrollBehavior = 'smooth';
            carouselViewport.style.overflowX = 'auto';
            carouselViewport.style.overflowY = 'hidden';
        }
        
        // Nascondi dots su mobile
        if (carouselDots) {
            carouselDots.style.display = 'none';
        }
        
    } else {
        // Desktop: infinito con controllo
        const duplicatedProducts = [...products.slice(0, 4), ...products.slice(0, 4)];
        const desktopHTML = duplicatedProducts.map((product, index) => {
            const card = createCard(product, nameKey);
            return `<div class="carousel-item" data-index="${index}">${card}</div>`;
        }).join('');
        
        carouselTrack.innerHTML = desktopHTML;
        carouselTrack.classList.add('desktop-carousel');
        
        // Mostra dots su desktop
        if (carouselDots) {
            carouselDots.style.display = 'flex';
            updateCarouselDots(4);
        }
        
        // Avvia auto-scroll desktop
        startDesktopCarousel();
    }
}

// Carousel desktop
function startDesktopCarousel() {
    const track = document.getElementById('carousel-track');
    const items = track?.querySelectorAll('.carousel-item');
    if (!track || items.length === 0) return;
    
    const itemWidth = 300; // 280px + 20px gap
    let position = 0;
    
    // Pulsa interval esistente
    if (carouselInterval) {
        clearInterval(carouselInterval);
    }
    
    carouselInterval = setInterval(() => {
        if (!track.matches(':hover')) {
            position += 1;
            
            // Loop quando arriva a metà
            if (position >= 4) {
                position = 0;
            }
            
            track.style.transform = `translateX(-${position * itemWidth}px)`;
            
            // Aggiorna dots
            updateCarouselDotsActive(position);
        }
    }, 5000);
}

// Update dots
function updateCarouselDots(count) {
    const dotsContainer = document.getElementById('carousel-dots');
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = '';
    for (let i = 0; i < Math.min(count, 4); i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    }
}

function updateCarouselDotsActive(index) {
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function goToSlide(index) {
    const track = document.getElementById('carousel-track');
    const items = track?.querySelectorAll('.carousel-item');
    if (!track || items.length === 0) return;
    
    const itemWidth = 300;
    track.style.transform = `translateX(-${index * itemWidth}px)`;
    updateCarouselDotsActive(index);
}

// Contatore carrello professionale
function updateCartCountProfessional() {
    const cartCount = document.getElementById('cart-count');
    if (!cartCount) return;
    
    const totalItems = cart.reduce((a, b) => a + b.qty, 0);
    
    if (totalItems > 0) {
        const displayText = totalItems > 99 ? '99+' : totalItems.toString();
        
        // Anima solo se cambia il valore
        if (cartCount.dataset.count !== displayText) {
            cartCount.classList.add('updated');
            setTimeout(() => cartCount.classList.remove('updated'), 400);
        }
        
        cartCount.textContent = displayText;
        cartCount.dataset.count = displayText;
        cartCount.style.display = 'flex';
        cartCount.style.visibility = 'visible';
        
    } else {
        cartCount.textContent = '0';
        cartCount.dataset.count = '0';
        cartCount.style.display = 'none';
    }
}

// Override funzioni esistenti
function setupProfessionalSystem() {
    detectMobile();
    
    // Override createInfiniteCarousel
    window.createInfiniteCarousel = setupBalancedCarousel;
    
    // Override updateCartUI per contatore
    const originalUpdateCartUI = window.updateCartUI;
    window.updateCartUI = function() {
        if (originalUpdateCartUI) {
            originalUpdateCartUI.call(this);
        }
        updateCartCountProfessional();
    };
    
    // Aggiorna su resize
    window.addEventListener('resize', () => {
        const wasMobile = isMobile;
        detectMobile();
        if (wasMobile !== isMobile && products.length > 0) {
            const featured = products.filter(p => p.Disponibile === 'SI' && p.Evidenza === 'SI' && p.StockNum > 0);
            setupBalancedCarousel(featured);
        }
        updateCartCountProfessional();
    });
    
    // Cleanup interval su unload
    window.addEventListener('beforeunload', () => {
        if (carouselInterval) {
            clearInterval(carouselInterval);
        }
    });
}

// Inizializzazione
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(setupProfessionalSystem, 100);
});

// Aggiorna anche dopo caricamento prodotti
window.addEventListener('load', () => {
    setTimeout(() => {
        if (products && products.length > 0) {
            const featured = products.filter(p => p.Disponibile === 'SI' && p.Evidenza === 'SI' && p.StockNum > 0);
            setupBalancedCarousel(featured);
        }
        updateCartCountProfessional();
    }, 200);
});