/**
 * Gestione checkout e ordini
 */

const Checkout = {
    /**
     * Apre il modal di checkout
     */
    open() {
        if (state.cart.length === 0) {
            Toast.error(t('errors.empty'), t('errors.emptyDesc'));
            return;
        }
        
        Cart.toggle();
        setTimeout(() => {
            document.getElementById('modal').classList.add('active');
            document.body.style.overflow = 'hidden';
            document.getElementById('f-name')?.focus();
        }, 300);
    },
    
    /**
     * Chiude il modal di checkout
     */
    close() {
        document.getElementById('modal').classList.remove('active');
        document.body.style.overflow = '';
    },
    
    /**
     * Valida il form di checkout
     * @returns {boolean}
     */
    validate() {
        const fields = {
            name: document.getElementById('f-name'),
            email: document.getElementById('f-email'),
            phone: document.getElementById('f-phone'),
            addr: document.getElementById('f-addr')
        };
        
        Object.values(fields).forEach(el => el?.classList.remove('error'));
        
        let hasError = false;
        
        if (!fields.name?.value.trim()) {
            fields.name?.classList.add('error');
            hasError = true;
        }
        
        if (!fields.email?.value.trim() || !Utils.isValidEmail(fields.email.value)) {
            fields.email?.classList.add('error');
            if (fields.email?.value.trim() && !Utils.isValidEmail(fields.email.value)) {
                Toast.error(t('errors.email'), t('errors.emailDesc'));
            }
            hasError = true;
        }
        
        if (!fields.phone?.value.trim()) {
            fields.phone?.classList.add('error');
            hasError = true;
        }
        
        if (!fields.addr?.value.trim()) {
            fields.addr?.classList.add('error');
            hasError = true;
        }
        
        if (hasError) {
            Toast.error(t('errors.form'), t('errors.formDesc'));
            return false;
        }
        
        return true;
    },
    
    /**
     * Invia l'ordine
     */
    async submit() {
        if (!this.validate()) return;
        
        const name = document.getElementById('f-name').value;
        const email = document.getElementById('f-email').value;
        const phone = document.getElementById('f-phone').value;
        const addr = document.getElementById('f-addr').value;
        const country = document.getElementById('f-country').value;
        
        const subtotal = Cart.getTotal();
        const shipping = Cart.getShipping(subtotal);
        const total = Utils.formatPrice(subtotal + shipping);
        const orderId = Utils.generateOrderId();
        
        const details = state.cart.map(item =>
            `${item.qty}x ${item.Nome} (€${item.Prezzo}) = €${Utils.formatPrice(parseFloat(item.Prezzo.replace(',', '.')) * item.qty)}`
        );
        
        try {
            await fetch(CONFIG.formURL, {
                method: 'POST',
                mode: 'no-cors',
                body: new URLSearchParams({
                    'entry.442927045': orderId,
                    'entry.333212320': name,
                    'entry.1385104048': email,
                    'entry.844983788': phone,
                    'entry.334440207': addr,
                    'entry.1856379113': details.join(' | '),
                    'entry.146792905': total
                })
            });
        } catch (e) {
            console.error('Form submission error:', e);
        }
        
        document.getElementById('thanks-order-id').textContent = `#${orderId}`;
        document.getElementById('modal').classList.remove('active');
        document.getElementById('thanks-popup').classList.add('active');
        
        const waMsg = `*🛒 ORDINE ${orderId}*\n\n*👤 Cliente:* ${name}\n*📧 Email:* ${email}\n*📱 Tel:* ${phone}\n*📍 Indirizzo:* ${addr}\n*🌍 Destinazione:* ${country}\n\n*📦 Prodotti:*\n${details.join('\n')}\n\n*🚚 Spedizione:* €${Utils.formatPrice(shipping)}\n*💰 TOTALE:* €${total}`;
        
        window.open(`https://wa.me/${CONFIG.wa}?text=${encodeURIComponent(waMsg)}`);
        
        state.cart = [];
        Cart.save();
    }
};

// Esporta per l'uso in altri moduli
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Checkout };
}
