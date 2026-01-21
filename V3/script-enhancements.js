// MESSAGGI POPUP PERSONALIZZATI
function showAlert(message, type = 'info', title = '', buttons = []) {
    // Rimuovi alert esistenti
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
    
    // Icona basata sul tipo
    const icons = {
        'success': '✓',
        'error': '✕',
        'warning': '!',
        'info': 'i'
    };
    
    const titles = {
        'success': title || 'Successo',
        'error': title || 'Errore', 
        'warning': title || 'Attenzione',
        'info': title || 'Informazione'
    };
    
    popup.innerHTML = `
        <div class="alert-icon">${icons[type]}</div>
        <h3 class="alert-title">${titles[type]}</h3>
        <p class="alert-message">${message}</p>
        ${buttons.length > 0 ? `
            <div class="alert-buttons">
                ${buttons.map(btn => `
                    <button class="alert-btn ${btn.type || 'btn-secondary'}" onclick="${btn.action}">
                        ${btn.text}
                    </button>
                `).join('')}
            </div>
        ` : ''}
    `;
    
    // Aggiungi al DOM
    document.body.appendChild(backdrop);
    document.body.appendChild(popup);
    
    // Anima entrata
    setTimeout(() => {
        backdrop.classList.add('show');
        popup.classList.add('show');
    }, 50);
    
    // Auto-chiudi se non ci sono pulsanti
    if (buttons.length === 0) {
        setTimeout(() => closeAlert(), 3000);
    }
    
    // Chiudi su click backdrop
    backdrop.onclick = closeAlert;
}

function closeAlert() {
    const popup = document.querySelector('.alert-popup');
    const backdrop = document.querySelector('.alert-backdrop');
    
    if (popup) popup.classList.remove('show');
    if (backdrop) backdrop.classList.remove('show');
    
    setTimeout(() => {
        if (popup) popup.remove();
        if (backdrop) backdrop.remove();
    }, 300);
}

// CAROUSEL INFINITO MIGLIORATO
function createInfiniteCarousel(products) {
    const carouselTrack = document.getElementById('carousel-track');
    if (!carouselTrack || products.length === 0) return;
    
    // Duplica i prodotti per creare effetto infinito
    const duplicatedProducts = [...products, ...products];
    
    carouselTrack.innerHTML = duplicatedProducts.map((product, index) => {
        const nameKey = lang === 'it' ? 'Nome' : `Nome_${lang.toUpperCase()}`;
        return createCard(product, nameKey);
    }).join('');
    
    // Rimuovi animazione CSS e usa JavaScript per controllo migliore
    carouselTrack.classList.add('infinite');
    
    // Auto-scroll con loop
    let scrollPosition = 0;
    const scrollSpeed = 1; // pixel per frame
    const cardWidth = 324; // 300px card + 24px gap
    
    function scrollCarousel() {
        if (!carouselTrack.matches(':hover')) {
            scrollPosition += scrollSpeed;
            
            // Reset quando arriviamo a metà (seconda copia)
            if (scrollPosition >= cardWidth * products.length) {
                scrollPosition = 0;
            }
            
            carouselTrack.style.transform = `translateX(-${scrollPosition}px)`;
        }
        
        requestAnimationFrame(scrollCarousel);
    }
    
    // Inizia scroll
    requestAnimationFrame(scrollCarousel);
    
    // Pausa al hover
    carouselTrack.addEventListener('mouseenter', () => {
        // Scroll si ferma automaticamente per :hover nel CSS
    });
}

// Sostituiamo la funzione render per usare il carousel infinito
function render() {
    const nameKey = lang === 'it' ? 'Nome' : `Nome_${lang.toUpperCase()}`;
    
    // Prodotti disponibili
    const activeProds = products.filter(p => p.Disponibile === 'SI');
    
    // Carousel infinito con prodotti in evidenza
    const featured = activeProds.filter(p => p.Evidenza === 'SI' && p.StockNum > 0);
    if (featured.length > 0) {
        createInfiniteCarousel(featured);
    }
    
    // Menu categorie
    const catKey = lang === 'it' ? 'Categoria' : `Categoria_${lang.toUpperCase()}`;
    const uniqueCats = [...new Set(activeProds.map(p => p[catKey] || p.Categoria))].filter(Boolean);
    const shuffledCats = shuffleArray(uniqueCats);
    
    const anchorMenu = document.getElementById('anchor-menu');
    if (anchorMenu) {
        anchorMenu.innerHTML = shuffledCats.map(c =>
            `<a onclick="handleCategoryClick('cat-${c.replace(/\s+/g, '')}')" class="category-link">${c}</a>`
        ).join('');
    }
    
    // Prodotti principali
    const negozio = document.getElementById('negozio');
    if (negozio) {
        let html = "";
        
        if (currentView === 'all') {
            html = `<div class="grid">${shuffleArray(activeProds).map(p => createCard(p, nameKey)).join('')}</div>`;
        } else {
            html = shuffledCats.map(c => {
                const catProducts = activeProds.filter(p => (p[catKey] === c || p.Categoria === c));
                if (catProducts.length === 0) return '';
                
                return `
                    <div id="cat-${c.replace(/\s+/g, '')}" class="category-section">
                        <h2 class="section-title">${c}</h2>
                        <div class="grid">${catProducts.map(p => createCard(p, nameKey)).join('')}</div>
                    </div>
                `;
            }).filter(Boolean).join('');
        }
        
        negozio.innerHTML = html;
        
        // Aggiungi animazioni di entrata
        setTimeout(() => {
            document.querySelectorAll('.card').forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.05}s forwards`;
                }, 10);
            });
        }, 100);
    }
}

// Sostituiamo showToast con showAlert per messaggi personalizzati
function showToast(message, type = 'info', duration = 3000) {
    showAlert(message, type);
}

// WHATSAPP MESSAGE MIGLIORATO
function formatWhatsAppMessage(orderId, name, email, phone, addr, details, total) {
    let message = `*🛒 ORDINE ${orderId}*\n\n`;
    message += `👤 *CLIENTE*\n`;
    message += `Nome: ${name}\n`;
    message += `📧 Email: ${email}\n`;
    message += `📱 Telefono: ${phone}\n`;
    message += `📍 Indirizzo: ${addr}\n\n`;
    
    message += `📦 *PRODOTTI*\n`;
    details.forEach(detail => {
        message += `▪️ ${detail}\n`;
    });
    
    message += `\n💰 *TOTALE: € ${total}*\n\n`;
    message += `✅ *Ordine confermato*`;
    
    return message;
}

// Funzione per mostrare anteprima WhatsApp nel checkout
function showWhatsAppPreview(orderData) {
    const preview = document.createElement('div');
    preview.className = 'whatsapp-preview';
    preview.innerHTML = `📱 Il tuo ordine verrà inviato via WhatsApp`;
    
    const modal = document.querySelector('.modal-content');
    if (modal) {
        modal.appendChild(preview);
    }
}

// Sostituiamo processOrder per usare i nuovi alert migliorati
async function processOrder() {
    const name = document.getElementById('f-name')?.value;
    const email = document.getElementById('f-email')?.value;
    const phone = document.getElementById('f-phone')?.value;
    const addr = document.getElementById('f-addr')?.value;

    if (!name || !email || !phone || !addr) {
        showAlert('Compila tutti i campi obbligatori', 'error', 'Campi mancanti');
        return;
    }

    // Mostra anteprima ordine
    const orderSummary = cart.map(c => {
        const p = products.find(x => x.ID == c.ID);
        const itemTotal = parseFloat(c.Prezzo.replace(',', '.')) * c.qty;
        return {
            name: c.Nome,
            quantity: c.qty,
            price: c.Prezzo,
            total: itemTotal.toFixed(2)
        };
    });

    const country = document.getElementById('f-country')?.value || 'Italia';
    let subtotal = orderSummary.reduce((sum, item) => sum + parseFloat(item.total), 0);
    let shipping = (cart.length === 0) ? 0 : (country === "Italia" ? (subtotal >= 120 ? 0 : 13) : 50);
    let total = subtotal + shipping;

    // Mostra riassunto ordine con conferma
    showAlert(
        `Stai per inviare un ordine di ${cart.length} prodotti per un totale di € ${total.toFixed(2)}. Vuoi procedere?`,
        'info',
        'Conferma Ordine',
        [
            {
                text: 'Annulla',
                type: 'btn-secondary',
                action: 'closeAlert()'
            },
            {
                text: 'Conferma',
                type: 'btn-primary',
                action: `confirmOrder('${name}', '${email}', '${phone}', '${addr}', '${country}', ${JSON.stringify(orderSummary)}, '${total.toFixed(2)}')`
            }
        ]
    );
}

async function confirmOrder(name, email, phone, addr, country, orderSummary, total) {
    // Chiudi alert
    closeAlert();

    // Disabilita pulsante
    const submitBtn = document.querySelector('#modal button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = UI[lang].processing;
    }

    try {
        const oID = "GZ-" + Date.now().toString().slice(-6);

        const detailRows = orderSummary.map(item =>
            `${item.quantity}x ${item.name} (€ ${item.price}) = € ${item.total}`
        );

        // Invia a Google Forms
        await fetch(CONFIG.form, {
            method: 'POST',
            mode: 'no-cors',
            body: new URLSearchParams({
                'entry.442927045': oID,
                'entry.333212320': name,
                'entry.1385104048': email,
                'entry.844983788': phone,
                'entry.334440207': addr,
                'entry.1856379113': detailRows.join(" | "),
                'entry.146792905': total
            })
        });

        // Chiudi modale
        closeCheckout();

        // Mostra thanks popup
        const thanksPopup = document.getElementById('thanks-popup');
        if (thanksPopup) {
            thanksPopup.classList.add('active');
        }

        // Apri WhatsApp con messaggio migliorato
        const whatsappMessage = formatWhatsAppMessage(oID, name, email, phone, addr, detailRows, total);
        window.open(`https://wa.me/${CONFIG.wa}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');

        // Svuota carrello
        cart = [];
        saveCartUI();

        // Mostra conferma successo
        showAlert('Ordine inviato con successo! Riceverai presto una conferma via WhatsApp.', 'success', 'Ordine Confermato');

    } catch (error) {
        console.error('Order error:', error);
        showAlert('Errore durante l\'invio dell\'ordine. Riprova più tardi.', 'error', 'Errore di Sistema');
    } finally {
        // Riabilita pulsante
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = UI[lang].conf;
        }
    }
}

// Sostituiamo le altre funzioni che usano alert con showAlert
function addToCart(id) {
    const p = products.find(x => x.ID == id);
    if (!p) return;
    
    const ex = cart.find(c => c.ID == id);
    if (ex) {
        if (ex.qty < p.StockNum) {
            ex.qty++;
        } else {
            showAlert(UI[lang].alertStock, 'warning');
            return;
        }
    } else {
        if (p.StockNum > 0) {
            cart.push({...p, qty: 1});
            animateAddToCart(id);
        }
    }
    
    saveCartUI();
    
    if (cart.length === 1) {
        setTimeout(() => toggleCart(), 500);
    }
}

function updateCartQty(id, delta) {
    const it = cart.find(c => c.ID == id);
    const p = products.find(x => x.ID == id);
    if (!it || !p) return;
    
    const newQty = it.qty + delta;
    if (newQty <= 0) {
        removeProduct(id);
    } else if (newQty <= p.StockNum) {
        it.qty = newQty;
    } else {
        showAlert(UI[lang].alertStock, 'warning');
        return;
    }
    
    saveCartUI();
}

function removeProduct(id) {
    cart = cart.filter(c => c.ID !== id);
    saveCartUI();
    showAlert('Prodotto rimosso dal carrello', 'info');
}

function emptyCart() {
    showAlert(
        `Sei sicuro di voler svuotare il carrello? Saranno rimossi ${cart.length} prodotti.`,
        'warning',
        'Svuota Carrello',
        [
            {
                text: 'Annulla',
                type: 'btn-secondary',
                action: 'closeAlert()'
            },
            {
                text: 'Svuota',
                type: 'btn-primary',
                action: 'confirmEmptyCart()'
            }
        ]
    );
}

function confirmEmptyCart() {
    cart = [];
    saveCartUI();
    closeAlert();
    showAlert('Carrello svuotato con successo', 'success');
}