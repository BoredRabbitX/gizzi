/**
 * Componenti UI: Toast, Confirm Modal, Loader, Theme, GDPR
 */

/**
 * Sistema di notifiche Toast
 */
const Toast = {
    container: null,
    
    init() {
        this.container = document.getElementById('toast-container');
    },
    
    show(type, title, message, duration = 4000) {
        if (!this.container) this.init();
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };
        
        toast.innerHTML = `
            <div class="toast-icon">${icons[type] || 'ℹ'}</div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                ${message ? `<div class="toast-message">${message}</div>` : ''}
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()">×</button>
            <div class="toast-progress" style="animation-duration: ${duration}ms"></div>
        `;
        
        this.container.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('show'));
        
        const timer = setTimeout(() => this.remove(toast), duration);
        toast.dataset.timer = timer;
    },
    
    remove(toast) {
        if (!toast || !toast.parentElement) return;
        clearTimeout(toast.dataset.timer);
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 300);
    },
    
    success(title, message) { this.show('success', title, message); },
    error(title, message) { this.show('error', title, message, 5000); },
    warning(title, message) { this.show('warning', title, message); },
    info(title, message) { this.show('info', title, message, 3000); }
};

/**
 * Modal di conferma
 */
const Confirm = {
    show(options) {
        const { title, message, onConfirm, type = 'warning', confirmText, cancelText } = options;
        
        const modal = document.getElementById('confirm-modal');
        const iconEl = document.getElementById('confirm-icon');
        const titleEl = document.getElementById('confirm-title');
        const msgEl = document.getElementById('confirm-message');
        const okBtn = document.getElementById('confirm-ok');
        const cancelBtn = document.getElementById('confirm-cancel');
        
        const icons = { warning: '⚠️', danger: '🗑️', success: '✓', info: 'ℹ️', question: '❓' };
        
        iconEl.className = `confirm-icon ${type}`;
        iconEl.textContent = icons[type] || '❓';
        titleEl.textContent = title;
        msgEl.textContent = message;
        
        cancelBtn.textContent = cancelText || (typeof t !== 'undefined' ? t('confirm.cancel') : 'Annulla');
        okBtn.textContent = confirmText || (typeof t !== 'undefined' ? t('confirm.ok') : 'Conferma');
        okBtn.className = `confirm-btn confirm ${type === 'danger' ? 'danger' : ''}`;
        
        state.confirmCallback = onConfirm;
        
        okBtn.onclick = () => {
            this.close();
            if (state.confirmCallback) state.confirmCallback();
        };
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        okBtn.focus();
    },
    
    close() {
        document.getElementById('confirm-modal').classList.remove('active');
        document.body.style.overflow = '';
        state.confirmCallback = null;
    }
};

/**
 * Loader/Schermata di caricamento
 */
const Loader = {
    element: null,
    textElement: null,
    timeout: null,
    
    init() {
        this.element = document.getElementById('loading-screen');
        this.textElement = document.getElementById('loading-text');
    },
    
    show(text) {
        if (!this.element) this.init();
        if (this.textElement && text) this.textElement.textContent = text;
        this.element.style.display = 'flex';
        this.element.classList.remove('hidden');
        this.timeout = setTimeout(() => this.hide(), CONFIG.loadingTimeout);
    },
    
    hide() {
        if (!this.element) this.init();
        clearTimeout(this.timeout);
        this.element.classList.add('hidden');
        setTimeout(() => {
            if (this.element) this.element.style.display = 'none';
        }, 500);
        state.isLoading = false;
    }
};

/**
 * Gestione tema (dark/light mode)
 */
const Theme = {
    init() {
        const saved = localStorage.getItem('gizzi_theme') || 'light';
        document.documentElement.setAttribute('data-theme', saved);
    },
    
    toggle() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('gizzi_theme', next);
        Toast.info(next === 'dark' ? '🌙' : '☀️', next === 'dark' ? 'Tema scuro' : 'Tema chiaro');
    }
};

/**
 * Banner GDPR
 */
const GDPR = {
    check() {
        if (!localStorage.getItem('gizzi_gdpr')) {
            setTimeout(() => {
                document.getElementById('gdpr-banner')?.classList.add('active');
            }, 2500);
        }
    },
    
    accept() {
        localStorage.setItem('gizzi_gdpr', 'accepted');
        document.getElementById('gdpr-banner')?.classList.remove('active');
        Toast.success('✓', 'Preferenze salvate');
    },
    
    reject() {
        localStorage.setItem('gizzi_gdpr', 'declined');
        document.getElementById('gdpr-banner')?.classList.remove('active');
    }
};

// Esporta per l'uso in altri moduli
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Toast, Confirm, Loader, Theme, GDPR };
}
 * Componenti UI: Toast, Confirm Modal, Loader, Theme, GDPR
 */

/**
 * Sistema di notifiche Toast
 */
const Toast = {
    container: null,
    
    init() {
        this.container = document.getElementById('toast-container');
    },
    
    show(type, title, message, duration = 4000) {
        if (!this.container) this.init();
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };
        
        toast.innerHTML = `
            <div class="toast-icon">${icons[type] || 'ℹ'}</div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                ${message ? `<div class="toast-message">${message}</div>` : ''}
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()">×</button>
            <div class="toast-progress" style="animation-duration: ${duration}ms"></div>
        `;
        
        this.container.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('show'));
        
        const timer = setTimeout(() => this.remove(toast), duration);
        toast.dataset.timer = timer;
    },
    
    remove(toast) {
        if (!toast || !toast.parentElement) return;
        clearTimeout(toast.dataset.timer);
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 300);
    },
    
    success(title, message) { this.show('success', title, message); },
    error(title, message) { this.show('error', title, message, 5000); },
    warning(title, message) { this.show('warning', title, message); },
    info(title, message) { this.show('info', title, message, 3000); }
};

/**
 * Modal di conferma
 */
const Confirm = {
    show(options) {
        const { title, message, onConfirm, type = 'warning', confirmText, cancelText } = options;
        
        const modal = document.getElementById('confirm-modal');
        const iconEl = document.getElementById('confirm-icon');
        const titleEl = document.getElementById('confirm-title');
        const msgEl = document.getElementById('confirm-message');
        const okBtn = document.getElementById('confirm-ok');
        const cancelBtn = document.getElementById('confirm-cancel');
        
        const icons = { warning: '⚠️', danger: '🗑️', success: '✓', info: 'ℹ️', question: '❓' };
        
        iconEl.className = `confirm-icon ${type}`;
        iconEl.textContent = icons[type] || '❓';
        titleEl.textContent = title;
        msgEl.textContent = message;
        
        cancelBtn.textContent = cancelText || (typeof t !== 'undefined' ? t('confirm.cancel') : 'Annulla');
        okBtn.textContent = confirmText || (typeof t !== 'undefined' ? t('confirm.ok') : 'Conferma');
        okBtn.className = `confirm-btn confirm ${type === 'danger' ? 'danger' : ''}`;
        
        state.confirmCallback = onConfirm;
        
        okBtn.onclick = () => {
            this.close();
            if (state.confirmCallback) state.confirmCallback();
        };
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        okBtn.focus();
    },
    
    close() {
        document.getElementById('confirm-modal').classList.remove('active');
        document.body.style.overflow = '';
        state.confirmCallback = null;
    }
};

/**
 * Loader/Schermata di caricamento
 */
const Loader = {
    element: null,
    textElement: null,
    timeout: null,
    
    init() {
        this.element = document.getElementById('loading-screen');
        this.textElement = document.getElementById('loading-text');
    },
    
    show(text) {
        if (!this.element) this.init();
        if (this.textElement && text) this.textElement.textContent = text;
        this.element.style.display = 'flex';
        this.element.classList.remove('hidden');
        this.timeout = setTimeout(() => this.hide(), CONFIG.loadingTimeout);
    },
    
    hide() {
        if (!this.element) this.init();
        clearTimeout(this.timeout);
        this.element.classList.add('hidden');
        setTimeout(() => {
            if (this.element) this.element.style.display = 'none';
        }, 500);
        state.isLoading = false;
    }
};

/**
 * Gestione tema (dark/light mode)
 */
const Theme = {
    init() {
        const saved = localStorage.getItem('gizzi_theme') || 'light';
        document.documentElement.setAttribute('data-theme', saved);
    },
    
    toggle() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('gizzi_theme', next);
        Toast.info(next === 'dark' ? '🌙' : '☀️', next === 'dark' ? 'Tema scuro' : 'Tema chiaro');
    }
};

/**
 * Banner GDPR
 */
const GDPR = {
    check() {
        if (!localStorage.getItem('gizzi_gdpr')) {
            setTimeout(() => {
                document.getElementById('gdpr-banner')?.classList.add('active');
            }, 2500);
        }
    },
    
    accept() {
        localStorage.setItem('gizzi_gdpr', 'accepted');
        document.getElementById('gdpr-banner')?.classList.remove('active');
        Toast.success('✓', 'Preferenze salvate');
    },
    
    reject() {
        localStorage.setItem('gizzi_gdpr', 'declined');
        document.getElementById('gdpr-banner')?.classList.remove('active');
    }
};

// Esporta per l'uso in altri moduli
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Toast, Confirm, Loader, Theme, GDPR };
}

