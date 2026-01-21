// CAROUSEL INFINITO E CONTATORE

let carouselInterval;
let isMobile = window.innerWidth <= 768;

// Detection mobile
function detectMobile() {
    isMobile = window.innerWidth <= 768;
    return isMobile;
}

// Carousel infinito con tutte le card
function setupInfiniteCarousel(products) {
    const carouselTrack = document.getElementById('carousel-track');
    const carouselViewport = document.querySelector('.carousel-viewport');
    const carouselDots = document.getElementById('carousel-dots');
    
    if (!carouselTrack || products.length === 0) return;
    
    const nameKey = lang === 'it' ? 'Nome' : `Nome_${lang.toUpperCase()}`;
    
    // Duplica le card per creare loop infinito
    const duplicatedProducts = [...products, ...products, ...products]; // Triplo per loop lento
    const carouselHTML = duplicatedProducts.map((product, index) => {
        const card = createCard(product, nameKey);
        return `<div class="carousel-item" data-index="${index}">${card}</div>`;
    }).join('');
    
    carouselTrack.innerHTML = carouselHTML;
    
    if (!isMobile) {
        // Desktop: setup dots e auto-scroll
        setupCarouselDots(carouselDots, products.length);
        startAutoScroll(carouselTrack);
    } else {
        // Mobile: setup scroll snap e nascondi dots
        setupMobileScroll(carouselTrack, carouselViewport);
        if (carouselDots) {
            carouselDots.style.display = 'none';
        }
    }
}

// Setup dots navigation
function setupCarouselDots(dotsContainer, productCount) {
    if (!dotsContainer) return;
    
    const dotsToShow = Math.min(productCount, 4);
    dotsContainer.innerHTML = '';
    
    for (let i = 0; i < dotsToShow; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    }
}

// Auto-scroll desktop
function startAutoScroll(track) {
    if (!isMobile && track) {
        let position = 0;
        const itemWidth = 300; // 280px + 20px gap
        
        carouselInterval = setInterval(() => {
            if (!track.matches(':hover')) {
                position += 1;
                
                // Loop quando arriva a terzo terzo (prima duplicazione)
                if (position >= products.length) {
                    position = 0;
                }
                
                track.style.transform = `translateX(-${position * itemWidth}px)`;
                
                // Aggiorna dots
                const dotIndex = position % 4;
                updateDots(dotIndex);
            }
        }, 5000);
    }
}

// Vai a slide specifica
function goToSlide(index) {
    const track = document.getElementById('carousel-track');
    if (!track) return;
    
    const itemWidth = 300;
    const clampedIndex = Math.max(0, Math.min(index, products.length - 1));
    
    track.style.transform = `translateX(-${clampedIndex * itemWidth}px)`;
    updateDots(clampedIndex);
}

// Aggiorna dots attivi
function updateDots(activeIndex) {
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
    });
}

// Mobile scroll setup
function setupMobileScroll(track, viewport) {
    if (!track || !viewport) return;
    
    // Imposta scroll snap
    viewport.style.scrollSnapType = 'x mandatory';
    viewport.style.scrollBehavior = 'smooth';
    viewport.style.overflowX = 'auto';
    viewport.style.overflowY = 'hidden';
    
    // Rimuovi animazione desktop
    track.style.transition = 'none';
    
    // No dots su mobile
    const dots = document.getElementById('carousel-dots');
    if (dots) {
        dots.style.display = ' Ripristina icona del carrello con hardcoded */
    }
}

// Popup hardcoded
function showPopup(title, message, type = 'info', buttons = []) {
    // Rimuovi popup esistenti
    const existingPopup = document.querySelector('.alert-popup');
    const existingBackdrop = document.querySelector('.alert-backdrop');
    if (existingPopup) existingPopup.remove();
    if (existingBackdrop) existingBackdrop.remove();

    // Crea backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'alert-backdrop';
    
    // Crea popup
    const popup = document.createElement('div');
    popup.className = `alert-popup alert-${type}`;
    
    // Icone basate sul tipo
    const icons = {
        'success': '✓',
        'error': '✕',
        'warning': '!',
        'info': 'ℹ️'
    };
    
    popup.innerHTML = `
        <div style="font-size: 2rem; margin-bottom: 16px;">${icons[type]}</div>
        <h3 style="margin: 0 0 16px; color: var(--gizzi-deep);">${title}</h3>
        <p style="margin: 0 0 24px; line-height: 1.5;">${message}</p>
        ${buttons.length > 0 ? `
            <div style="display: flex; gap: 12px; justify-content: center; margin-top: 24px;">
                ${buttons.map(btn => `
                    <button onclick="${btn.action}" style="
                        background: ${btn.primary ? 'var(--gizzi-deep)' : 'transparent'}; 
                        color: ${btn.primary ? 'white' : 'var(--gizzi-deep)'}; 
                        border: 1px solid ${btn.primary ? 'var(--gizzi-deep)' : 'var(--border)'}; 
                        padding: 12px 24px; 
                        border-radius: 8px; 
                        cursor: pointer; 
                        font-weight: 600; 
                        font-size: 0.9rem;
                        transition: all 0.3s ease;
                        flex: 1;
                    ">${btn.text}</button>
                `).join('')}
            </div>
        ` : ''}
    `;
    
    // Aggiungi al DOM
    document.body.appendChild(backdrop);
    document.body.appendChild(popup);
    
    // Mostra animazione
    setTimeout(() => {
        backdrop.style.opacity = '1';
        popup.style.opacity = '1';
        popup.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 50);
    
    // Chiudi su click backdrop
    backdrop.onclick = () => closePopup();
    
    // Chiudi con escape
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closePopup();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    
    document.addEventListener('keydown', handleEscape);
}

// Chiudi popup
function closePopup() {
    const popup = document.querySelector('.alert-popup');
    const backdrop = document.querySelector('.alert-backdrop');
    
    if (popup && backdrop) {
        popup.style.opacity = '0';
        popup.style.transform = 'translate(-50%, -50%) scale(0.9)';
        backdrop.style.opacity = '0';
        
        setTimeout(() => {
            popup.remove();
            backdrop.remove();
        }, 300);
    }
}

// Contatore carrello fisso e visibile
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (!cartCount) return;
    
    const totalItems = cart.reduce((a, b) => a + b.qty, 0);
    
    if (totalItems > 0) {
        const displayText = totalItems > 99 ? '99+' : totalItems.toString();
        
        // Animazione solo se cambia valore
        if (cartCount.dataset.count !== displayText) {
            cartCount.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartCount.style.transform = 'scale(1)';
            }, 200);
        }
        
        cartCount.textContent = displayText;
        cartCount.dataset.count = displayText;
        cartCount.style.display = 'flex';
        cartCount.style.visibility = 'visible';
    } else {
        cartCount.style.display = 'none';
        cartCount.dataset.count = '';
    }
}

// Override funzioni esistenti
function setupInfiniteSystem() {
    detectMobile();
    
    // Override createInfiniteCarousel
    window.createInfiniteCarousel = setupInfiniteCarousel;
    
    // Override updateCartUI per contatore fisso
    const originalUpdateCartUI = window.updateCartUI;
    window.updateCartUI = function() {
        if (originalUpdateCartUI) {
            originalUpdateCartUI.call(this);
        }
        updateCartCount();
    };
    
    // Override funzioni che usano alert con popup
    window.showAlert = showPopup;
    window.showToast = function(message, type) {
        showPopup(type === 'error' ? 'Attenzione' : 'Info', message, type);
    };
    
    // Aggiorna su resize
    window.addEventListener('resize', () => {
        const wasMobile = isMobile;
        detectMobile();
        
        if (wasMobile !== isMobile && products.length > 0) {
            const featured = products.filter(p => p.Disponibile === 'SI' && p.Evidenza === 'SI' && p.StockNum > 0);
            setupInfiniteCarousel(featured);
        }
    });
    
    // Cleanup su unload
    window.addEventListener('beforeunload', () => {
        if (carouselInterval) {
            clearInterval(carouselInterval);
        }
    });
    
    // Update subito
    updateCartCount();
}

// Inizializzazione
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(setupInfiniteSystem, 100);
});

// Aggiorna dopo caricamento prodotti
window.addEventListener('load', () => {
    setTimeout(() => {
        if (products && products.length > 0) {
            const featured = products.filter(p => p.Disponibile === 'SI' && p.Evidenza === 'SI' && p.StockNum > 0);
            setupInfiniteCarousel(featured);
        }
        updateCartCount();
    }, 300);
});