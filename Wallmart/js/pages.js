class PageRenderer {
    constructor() {
        this.init();
    }

    init() {
        // Check which page we're on and render accordingly
        const pathname = window.location.pathname;
        const filename = pathname.split('/').pop().toLowerCase();
        
        if (filename.includes('about')) {
            this.renderAboutPage();
        } else if (filename.includes('contact')) {
            this.renderContactPage();
        } else if (filename.includes('shipping')) {
            this.renderShippingPage();
        } else if (filename.includes('returns')) {
            this.renderReturnsPage();
        }
    }

    renderAboutPage() {
        const container = document.getElementById('about-content');
        if (!container) return;

        const content = `
            <div class="page-section">
                <h3>La Nostra Storia</h3>
                <p>Il Gruppo Gizzi nasce dalla passione per le tradizioni culinarie del Cilento, una terra incontaminata dove la natura regna sovrana. Da oltre tre generazioni, la nostra famiglia si dedica alla selezione dei migliori prodotti tipici della zona, portando sulle tavole di migliaia di famiglie l'autenticità dei sapori del Mediterraneo.</p>
                <p>Crediamo che il cibo non sia solo nutrizione, ma cultura, memoria e identità. Ogni prodotto che selezioniamo racconta una storia, quella degli agricoltori che con amore e dedizione lavorano la terra secondo i ritmi della natura.</p>
            </div>

            <div class="page-section">
                <h3>La Nostra Missione</h3>
                <p>La nostra missione è diffondere l'eccellenza gastronomica cilentana nel mondo, valorizzando i produttori locali e preservando le tecniche tradizionali di lavorazione. Vogliamo far conoscere al mondo la ricchezza enogastronomica di un territorio unico, tra terra e mare, tra tradizione e innovazione.</p>
                <ul>
                    <li>Selezioniamo solo prodotti di altissima qualità</li>
                    <li>Sosteniamo gli agricoltori locali</li>
                    <li>Garantiamo la tracciabilità di ogni prodotto</li>
                    <li>Rispettiamo l'ambiente e la biodiversità</li>
                    <li>Promuoviamo la cultura del cibo di qualità</li>
                </ul>
            </div>

            <div class="info-grid">
                <div class="info-card">
                    <div class="info-card-icon">🏆</div>
                    <h4>Qualità Certificata</h4>
                    <p>Tutti i nostri prodotti sono selezionati e certificati secondo i più alti standard di qualità.</p>
                </div>
                <div class="info-card">
                    <div class="info-card-icon">🌍</div>
                    <h4>Sostenibilità</h4>
                    <p>Lavoriamo per ridurre l'impatto ambientale e supportare pratiche agricole sostenibili.</p>
                </div>
                <div class="info-card">
                    <div class="info-card-icon">🤝</div>
                    <h4>Fair Trade</h4>
                    <p>Garantiamo un equo compenso ai nostri produttori e fornitori locali.</p>
                </div>
            </div>
        `;

        container.innerHTML = content;
    }

    renderContactPage() {
        const container = document.getElementById('contact-content');
        if (!container) return;

        const content = `
            <div class="info-grid">
                <div class="info-card">
                    <div class="info-card-icon">📞</div>
                    <h4>Telefono</h4>
                    <p>+39 335 806 0715</p>
                </div>
                <div class="info-card">
                    <div class="info-card-icon">✉️</div>
                    <h4>Email</h4>
                    <p>info@gruppogizzi.it</p>
                </div>
                <div class="info-card">
                    <div class="info-card-icon">📍</div>
                    <h4>Indirizzo</h4>
                    <p>Cilento, Italia</p>
                </div>
            </div>

            <form id="contact-form" class="contact-form">
                <div class="form-group">
                    <label class="form-label" for="contact-name">
                        Nome e Cognome
                        <span class="required">*</span>
                    </label>
                    <input type="text" id="contact-name" class="form-input" placeholder="Mario Rossi" required>
                </div>
                <div class="form-group">
                    <label class="form-label" for="contact-email">
                        Email
                        <span class="required">*</span>
                    </label>
                    <input type="email" id="contact-email" class="form-input" placeholder="mario@email.com" required>
                </div>
                <div class="form-group">
                    <label class="form-label" for="contact-phone">
                        Telefono
                    </label>
                    <input type="tel" id="contact-phone" class="form-input" placeholder="+39 123 456 7890">
                </div>
                <div class="form-group">
                    <label class="form-label" for="contact-subject">
                        Oggetto
                        <span class="required">*</span>
                    </label>
                    <select id="contact-subject" class="form-select" required>
                        <option value="">Seleziona un oggetto</option>
                        <option value="ordine">Informazioni Ordine</option>
                        <option value="prodotti">Informazioni Prodotti</option>
                        <option value="spedizione">Informazioni Spedizione</option>
                        <option value="altro">Altro</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label" for="contact-message">
                        Messaggio
                        <span class="required">*</span>
                    </label>
                    <textarea id="contact-message" class="form-textarea" rows="5" placeholder="Scrivi il tuo messaggio..." required></textarea>
                </div>
                <button type="submit" class="form-submit">
                    <span>📧</span>
                    <span>Invia Messaggio</span>
                </button>
            </form>
        `;

        container.innerHTML = content;
    }

    renderShippingPage() {
        const container = document.getElementById('shipping-content');
        if (!container) return;

        const content = `
            <div class="page-section">
                <h3>Modalità di Spedizione</h3>
                <p>Predisponiamo diverse modalità di spedizione per soddisfare le tue esigenze. Tutti i nostri ordini vengono preparati con la massima cura e imballati in modo sicuro.</p>
                
                <div class="shipping-options">
                    <div class="shipping-option">
                        <h4>🚚 Spedizione Standard Italia</h4>
                        <div class="shipping-price">€ 13,00</div>
                        <div class="shipping-details">
                            <p><strong>Tempi di consegna:</strong> 2-4 giorni lavorativi</p>
                            <p><strong>Gratuita sopra €120</strong></p>
                        </div>
                    </div>
                    <div class="shipping-option">
                        <h4>📦 Spedizione Europa UE</h4>
                        <div class="shipping-price">€ 50,00</div>
                        <div class="shipping-details">
                            <p><strong>Tempi di consegna:</strong> 5-7 giorni lavorativi</p>
                            <p><strong>Copertura:</strong> Tutta l'Unione Europea</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="page-section">
                <h3>Tempi di Consegna</h3>
                <ul>
                    <li>Ordini ricevuti entro le 12:00 vengono spediti lo stesso giorno</li>
                    <li>Ordini ricevuti dopo le 12:00 vengono spediti il giorno lavorativo successivo</li>
                    <li>Gli ordini non vengono spediti il sabato, la domenica e i festivi</li>
                </ul>
            </div>

            <div class="page-section">
                <h3>Tracking dell'Ordine</h3>
                <p>Tutte le nostre spedizioni sono tracciabili. Riceverai un codice di tracciamento non appena il tuo ordine verrà spedito, potrai così monitorare in tempo reale lo stato della consegna.</p>
            </div>
        `;

        container.innerHTML = content;
    }

    renderReturnsPage() {
        const container = document.getElementById('returns-content');
        if (!container) return;

        const content = `
            <div class="page-section">
                <h3>Diritto di Recesso</h3>
                <p>Secondo le normative vigenti, hai diritto di recedere dall'acquisto senza penalità e senza necessità di dare alcuna spiegazione entro 14 giorni dalla data di ricezione dei prodotti.</p>
            </div>

            <div class="page-section">
                <h3>Modalità di Reso</h3>
                <div class="returns-steps">
                    <div class="returns-step">
                        <h4>1. Comunica l'intenzione di recedere</h4>
                        <p>Invia una comunicazione scritta (via email o WhatsApp) indicando la tua volontà di esercitare il diritto di recesso.</p>
                    </div>
                    <div class="returns-step">
                        <h4>2. Prepara il pacco</h4>
                        <p>Imballa adeguatamente i prodotti per proteggerli durante il trasporto. È preferibile utilizzare l'imballo originale.</p>
                    </div>
                    <div class="returns-step">
                        <h4>3. Spedisci il reso</h4>
                        <p>Invia il pacco al nostro indirizzo specificato nella comunicazione di recesso. Le spese di spedizione per il reso sono a tuo carico.</p>
                    </div>
                    <div class="returns-step">
                        <h4>4. Ricevi il rimborso</h4>
                        <p>Provvederemo al rimborso dell'importo pagato entro 14 giorni dalla ricezione dei prodotti resi, utilizzando la stessa modalità di pagamento utilizzata per l'acquisto.</p>
                    </div>
                </div>
            </div>

            <div class="page-section">
                <h3>Eccezioni</h3>
                <ul>
                    <li>Prodotti alimentari aperti o danneggiati dal cliente</li>
                    <li>Prodotti a scadenza ravvicinata (meno di 7 giorni)</li>
                    <li>Prodotti freschi e deperibili</li>
                </ul>
            </div>
        `;

        container.innerHTML = content;
    }
}

let pageRenderer;
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 Initializing page renderer...');
    pageRenderer = new PageRenderer();
    console.log('✅ Page renderer initialized');
});
