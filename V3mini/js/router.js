/**
 * Router per navigazione SPA (Single Page Application)
 * Include contenuti inline per funzionamento offline
 */

const Router = {
    currentPage: 'home',
    
    /**
     * Contenuti delle pagine (inline per funzionamento offline)
     */
    pageContents: {
        it: {
            contatti: `
                <div class="contact-grid">
                    <div class="contact-card">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        <h3>Email</h3>
                        <p>Rispondiamo entro 24 ore</p>
                        <a href="mailto:info@gruppogizzi.it">info@gruppogizzi.it</a>
                    </div>
                    <div class="contact-card">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        <h3>Telefono</h3>
                        <p>Lun-Ven: 9:00-18:00</p>
                        <a href="tel:+393331234567">+39 333 123 4567</a>
                    </div>
                    <div class="contact-card">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        <h3>Indirizzo</h3>
                        <p>Vieni a trovarci</p>
                        <span style="color: var(--text);">Cilento, Campania, Italia</span>
                    </div>
                </div>
                <div class="contact-form">
                    <h2>Inviaci un Messaggio</h2>
                    <form id="contact-form" onsubmit="event.preventDefault(); Toast.success('Messaggio inviato!', 'Ti risponderemo presto.');">
                        <div class="form-row">
                            <div class="form-group">
                                <label> Nome e Cognome *</label>
                                <input type="text" required placeholder="Mario Rossi">
                            </div>
                            <div class="form-group">
                                <label>Email *</label>
                                <input type="email" required placeholder="mario@email.com">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Oggetto</label>
                            <select>
                                <option>Informazioni Prodotti</option>
                                <option>Stato Ordine</option>
                                <option>Spedizioni</option>
                                <option>Resi e Rimborsi</option>
                                <option>Altro</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Messaggio *</label>
                            <textarea required placeholder="Scrivi qui il tuo messaggio..."></textarea>
                        </div>
                        <button type="submit" class="btn-submit">Invia Messaggio</button>
                    </form>
                </div>
            `,
            spedizioni: `
                <div class="info-card highlight">
                    <h2><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>Spedizione Gratuita</h2>
                    <p><strong>Spedizione GratuITA per ordini superiori a €120!</strong> Approfitta di questa offerta per ricevere i migliori prodotti del Cilento direttamente a casa tua senza costi aggiuntivi.</p>
                </div>
                <div class="info-card">
                    <h2><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>Tempi di Consegna</h2>
                    <table class="shipping-table">
                        <thead><tr><th>Destinazione</th><th>Tempi Stimati</th><th>Costo</th></tr></thead>
                        <tbody>
                            <tr><td>Italia (Nord)</td><td>2-3 giorni lavorativi</td><td>€8.90 / Gratis oltre €120</td></tr>
                            <tr><td>Italia (Centro)</td><td>1-2 giorni lavorativi</td><td>€7.90 / Gratis oltre €120</td></tr>
                            <tr><td>Italia (Sud e Isole)</td><td>2-4 giorni lavorativi</td><td>€9.90 / Gratis oltre €120</td></tr>
                            <tr><td>Europa (UE)</td><td>5-7 giorni lavorativi</td><td>€15.90</td></tr>
                        </tbody>
                    </table>
                </div>
                <div class="info-card">
                    <h2><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>Come Funziona</h2>
                    <ul>
                        <li><strong>Elaborazione ordine:</strong> Gli ordini vengono elaborati entro 24-48 ore lavorative.</li>
                        <li><strong>Tracking:</strong> Riceverai un'email con il codice di tracciamento non appena il pacco sarà spedito.</li>
                        <li><strong>Corriere:</strong> Utilizziamo corrieri affidabili come GLS, BRT e DHL per garantire consegne sicure.</li>
                        <li><strong>Imballaggio:</strong> I prodotti sono accuratamente imballati per preservarne la qualità durante il trasporto.</li>
                    </ul>
                </div>
                <div class="info-card">
                    <h2><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>Note Importanti</h2>
                    <ul>
                        <li>Le consegne avvengono dal lunedì al venerdì, esclusi i giorni festivi.</li>
                        <li>Per le isole minori potrebbero essere necessari 1-2 giorni aggiuntivi.</li>
                        <li>In caso di assenza, il corriere lascerà un avviso per un secondo tentativo di consegna.</li>
                        <li>Per spedizioni in zone remote o difficilmente raggiungibili, contattaci per informazioni.</li>
                    </ul>
                </div>
            `,
            resi: `
                <div class="info-card">
                    <h2><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>Politica di Reso</h2>
                    <p>Hai <strong>14 giorni</strong> dalla data di consegna per richiedere un reso. Il prodotto deve essere:</p>
                    <ul>
                        <li>Non aperto e nella confezione originale sigillata</li>
                        <li>In perfette condizioni, come ricevuto</li>
                        <li>Accompagnato dalla ricevuta o conferma d'ordine</li>
                    </ul>
                    <div class="highlight-box"><p>⚠️ I prodotti alimentari aperti o deteriorati non possono essere resi per motivi igienico-sanitari.</p></div>
                </div>
                <div class="info-card">
                    <h2><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>Come Richiedere un Reso</h2>
                    <ol class="steps-list">
                        <li><strong>Contattaci</strong> via email a info@gruppogizzi.it o WhatsApp indicando il numero d'ordine e il motivo del reso.</li>
                        <li><strong>Attendi la conferma</strong> del nostro team con le istruzioni per la spedizione del reso.</li>
                        <li><strong>Imballa il prodotto</strong> con cura nella confezione originale.</li>
                        <li><strong>Spedisci il pacco</strong> all'indirizzo che ti forniremo.</li>
                    </ol>
                </div>
                <div class="info-card">
                    <h2><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>Rimborsi</h2>
                    <p>Una volta ricevuto e verificato il reso, procederemo al rimborso entro <strong>7 giorni lavorativi</strong>.</p>
                    <ul>
                        <li><strong>Metodo di rimborso:</strong> Stesso metodo di pagamento utilizzato per l'ordine</li>
                        <li><strong>Spese di spedizione del reso:</strong> A carico del cliente, salvo prodotti difettosi o errori da parte nostra</li>
                        <li><strong>Prodotti difettosi:</strong> Rimborso completo incluse le spese di spedizione</li>
                    </ul>
                </div>
                <div class="info-card">
                    <h2><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>Prodotti Danneggiati</h2>
                    <p>Se ricevi un prodotto danneggiato durante il trasporto:</p>
                    <ul>
                        <li>Contattaci entro <strong>48 ore</strong> dalla consegna</li>
                        <li>Inviaci foto del prodotto e dell'imballaggio danneggiato</li>
                        <li>Provvederemo alla sostituzione o al rimborso completo senza costi aggiuntivi</li>
                    </ul>
                </div>
            `,
            faq: `
                <div class="faq-section">
                    <h2>🛒 Ordini e Pagamenti</h2>
                    <div class="faq-item">
                        <div class="faq-question" onclick="toggleFaq(this)">Come posso effettuare un ordine?<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div>
                        <div class="faq-answer"><div class="faq-answer-content">Sfoglia i nostri prodotti, aggiungi quelli desiderati al carrello e prosegui al checkout. Inserisci i tuoi dati di spedizione e conferma l'ordine. Ti contatteremo via WhatsApp per confermare e procedere al pagamento.</div></div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question" onclick="toggleFaq(this)">Quali metodi di pagamento accettate?<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div>
                        <div class="faq-answer"><div class="faq-answer-content">Accettiamo bonifico bancario, PayPal e pagamento in contrassegno per l'Italia. I dettagli per il pagamento ti verranno comunicati dopo la conferma dell'ordine.</div></div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question" onclick="toggleFaq(this)">Posso modificare o annullare un ordine?<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div>
                        <div class="faq-answer"><div class="faq-answer-content">Sì, puoi modificare o annullare l'ordine contattandoci entro 24 ore dalla conferma. Dopo la spedizione, non sarà più possibile annullare.</div></div>
                    </div>
                </div>
                <div class="faq-section">
                    <h2>📦 Spedizioni</h2>
                    <div class="faq-item">
                        <div class="faq-question" onclick="toggleFaq(this)">Quanto costa la spedizione?<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div>
                        <div class="faq-answer"><div class="faq-answer-content">La spedizione è Gratuita per ordini superiori a €120. Per ordini inferiori, il costo è di €9.90 in Italia e €14.90 per l'Europa.</div></div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question" onclick="toggleFaq(this)">In quanto tempo ricevo il mio ordine?<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div>
                        <div class="faq-answer"><div class="faq-answer-content">Italia: 2-4 giorni lavorativi. Europa: 5-7 giorni lavorativi. I tempi possono variare durante periodi di alta stagione.</div></div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question" onclick="toggleFaq(this)">Spedite anche all'estero?<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div>
                        <div class="faq-answer"><div class="faq-answer-content">Sì, spediamo in tutta l'Unione Europea. Per spedizioni extra-UE, contattaci per un preventivo personalizzato.</div></div>
                    </div>
                </div>
                <div class="faq-section">
                    <h2>🌿 Prodotti e Qualità</h2>
                    <div class="faq-item">
                        <div class="faq-question" onclick="toggleFaq(this)">I vostri prodotti sono autentici?<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div>
                        <div class="faq-answer"><div class="faq-answer-content">Assolutamente sì! Tutti i nostri prodotti provengono direttamente dal Cilento, selezionati dai migliori produttori locali. Garantiamo autenticità e qualità al 100%.</div></div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question" onclick="toggleFaq(this)">Come conservo i prodotti?<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div>
                        <div class="faq-answer"><div class="faq-answer-content">Ogni prodotto riporta le istruzioni di conservazione sull'etichetta. In generale: l'olio va conservato al riparo dalla luce e dal calore, le conserve in luogo fresco e asciutto, i vini in ambiente fresco.</div></div>
                    </div>
                </div>
                <div class="contact-cta">
                    <h3>Non hai trovato la risposta?</h3>
                    <p>Il nostro team è pronto ad aiutarti per qualsiasi domanda.</p>
                    <a href="#contatti" onclick="Router.navigate('contatti'); return false;">Contattaci</a>
                </div>
            `
        },
        en: {
            contact: `
                <div class="contact-grid">
                    <div class="contact-card">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        <h3>Email</h3>
                        <p>We reply within 24 hours</p>
                        <a href="mailto:info@gruppogizzi.it">info@gruppogizzi.it</a>
                    </div>
                    <div class="contact-card">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        <h3>Phone</h3>
                        <p>Mon-Fri: 9:00 AM - 6:00 PM</p>
                        <a href="tel:+393331234567">+39 333 123 4567</a>
                    </div>
                    <div class="contact-card">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        <h3>Address</h3>
                        <p>Visit us</p>
                        <span style="color: var(--text);">Cilento, Campania, Italy</span>
                    </div>
                </div>
                <div class="contact-form">
                    <h2>Send us a Message</h2>
                    <form id="contact-form" onsubmit="event.preventDefault(); Toast.success('Message sent!', 'We will reply soon.');">
                        <div class="form-row">
                            <div class="form-group">
                                <label>Full Name *</label>
                                <input type="text" required placeholder="John Doe">
                            </div>
                            <div class="form-group">
                                <label>Email *</label>
                                <input type="email" required placeholder="john@email.com">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Subject</label>
                            <select>
                                <option>Product Information</option>
                                <option>Order Status</option>
                                <option>Shipping</option>
                                <option>Returns & Refunds</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Message *</label>
                            <textarea required placeholder="Write your message here..."></textarea>
                        </div>
                        <button type="submit" class="btn-submit">Send Message</button>
                    </form>
                </div>
            `,
            shipping: `
                <div class="info-card highlight">
                    <h2><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>Free Shipping</h2>
                    <p><strong>FREE shipping on orders over €120!</strong> Take advantage of this offer to receive the best Cilento products directly to your home at no extra cost.</p>
                </div>
                <div class="info-card">
                    <h2><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>Delivery Times</h2>
                    <table class="shipping-table">
                        <thead><tr><th>Destination</th><th>Estimated Time</th><th>Cost</th></tr></thead>
                        <tbody>
                            <tr><td>Italy (North)</td><td>2-3 business days</td><td>€8.90 / Free over €120</td></tr>
                            <tr><td>Italy (Center)</td><td>1-2 business days</td><td>€7.90 / Free over €120</td></tr>
                            <tr><td>Italy (South & Islands)</td><td>2-4 business days</td><td>€9.90 / Free over €120</td></tr>
                            <tr><td>Europe (EU)</td><td>5-7 business days</td><td>€15.90</td></tr>
                        </tbody>
                    </table>
                </div>
                <div class="info-card">
                    <h2><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>How It Works</h2>
                    <ul>
                        <li><strong>Order processing:</strong> Orders are processed within 24-48 business hours.</li>
                        <li><strong>Tracking:</strong> You'll receive an email with tracking code once shipped.</li>
                        <li><strong>Courier:</strong> We use reliable couriers like GLS, BRT, and DHL for safe deliveries.</li>
                        <li><strong>Packaging:</strong> Products are carefully packaged to preserve quality during transport.</li>
                    </ul>
                </div>
                <div class="info-card">
                    <h2><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>Important Notes</h2>
                    <ul>
                        <li>Deliveries occur Monday to Friday, excluding holidays.</li>
                        <li>Minor islands may require 1-2 additional days.</li>
                        <li>If you're not home, the courier will leave a notice for a second delivery attempt.</li>
                        <li>For remote areas, please contact us for more information.</li>
                    </ul>
                </div>
            `,
            returns: `
                <div class="info-card">
                    <h2><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>Return Policy</h2>
                    <p>You have <strong>14 days</strong> from the delivery date to request a return. The product must be:</p>
                    <ul>
                        <li>Unopened and in its original sealed packaging</li>
                        <li>In perfect condition, as received</li>
                        <li>Accompanied by the receipt or order confirmation</li>
                    </ul>
                    <div class="highlight-box"><p>⚠️ Opened or spoiled food products cannot be returned for hygiene and safety reasons.</p></div>
                </div>
                <div class="info-card">
                    <h2><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>How to Request a Return</h2>
                    <ol class="steps-list">
                        <li><strong>Contact us</strong> via email at info@gruppogizzi.it or WhatsApp with your order number and reason for return.</li>
                        <li><strong>Wait for confirmation</strong> from our team with shipping instructions for the return.</li>
                        <li><strong>Pack the product</strong> carefully in the original packaging.</li>
                        <li><strong>Ship the package</strong> to the address we provide.</li>
                    </ol>
                </div>
                <div class="info-card">
                    <h2><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>Refunds</h2>
                    <p>Once we receive and verify the return, we will process your refund within <strong>7 business days</strong>.</p>
                    <ul>
                        <li><strong>Refund method:</strong> Same payment method used for the original order</li>
                        <li><strong>Return shipping costs:</strong> Paid by the customer, unless the product is defective or there was an error on our part</li>
                        <li><strong>Defective products:</strong> Full refund including shipping costs</li>
                    </ul>
                </div>
                <div class="info-card">
                    <h2><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>Damaged Products</h2>
                    <p>If you receive a product damaged during shipping:</p>
                    <ul>
                        <li>Contact us within <strong>48 hours</strong> of delivery</li>
                        <li>Send us photos of the product and damaged packaging</li>
                        <li>We will arrange a replacement or full refund at no additional cost</li>
                    </ul>
                </div>
            `,
            'faq-en': `
                <div class="faq-section">
                    <h2>🛒 Orders & Payments</h2>
                    <div class="faq-item">
                        <div class="faq-question" onclick="toggleFaq(this)">How do I place an order?<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div>
                        <div class="faq-answer"><div class="faq-answer-content">Browse our products, add the ones you want to your cart, and proceed to checkout. Enter your shipping details and confirm your order. We'll contact you via WhatsApp to confirm and proceed with payment.</div></div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question" onclick="toggleFaq(this)">What payment methods do you accept?<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div>
                        <div class="faq-answer"><div class="faq-answer-content">We accept bank transfer, PayPal, and cash on delivery for Italy. Payment details will be provided after order confirmation.</div></div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question" onclick="toggleFaq(this)">Can I modify or cancel an order?<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div>
                        <div class="faq-answer"><div class="faq-answer-content">Yes, you can modify or cancel your order by contacting us within 24 hours of confirmation. Once shipped, cancellation is no longer possible.</div></div>
                    </div>
                </div>
                <div class="faq-section">
                    <h2>📦 Shipping</h2>
                    <div class="faq-item">
                        <div class="faq-question" onclick="toggleFaq(this)">How much does shipping cost?<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div>
                        <div class="faq-answer"><div class="faq-answer-content">Shipping is FREE for orders over €120. For smaller orders, shipping costs €9.90 within Italy and €14.90 for Europe.</div></div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question" onclick="toggleFaq(this)">How long does delivery take?<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div>
                        <div class="faq-answer"><div class="faq-answer-content">Italy: 2-4 business days. Europe: 5-7 business days. Times may vary during peak seasons.</div></div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question" onclick="toggleFaq(this)">Do you ship internationally?<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div>
                        <div class="faq-answer"><div class="faq-answer-content">Yes, we ship throughout the European Union. For shipments outside the EU, please contact us for a custom quote.</div></div>
                    </div>
                </div>
                <div class="faq-section">
                    <h2>🌿 Products & Quality</h2>
                    <div class="faq-item">
                        <div class="faq-question" onclick="toggleFaq(this)">Are your products authentic?<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div>
                        <div class="faq-answer"><div class="faq-answer-content">Absolutely! All our products come directly from Cilento, selected from the best local producers. We guarantee 100% authenticity and quality.</div></div>
                    </div>
                    <div class="faq-item">
                        <div class="faq-question" onclick="toggleFaq(this)">How should I store the products?<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div>
                        <div class="faq-answer"><div class="faq-answer-content">Each product has storage instructions on the label. Generally: olive oil should be stored away from light and heat, preserves in a cool, dry place, and wines in a cool environment.</div></div>
                    </div>
                </div>
                <div class="contact-cta">
                    <h3>Didn't find your answer?</h3>
                    <p>Our team is ready to help with any questions.</p>
                    <a href="#contact" onclick="Router.navigate('contact'); return false;">Contact Us</a>
                </div>
            `
        }
    },
    
    /**
     * Configurazione delle pagine
     */
    pages: {
        home: {
            id: 'home',
            showHero: true,
            showPromo: true,
            showHomeContent: true,
            showPageContent: false
        },
        contatti: {
            id: 'contatti',
            showHero: false,
            showPromo: false,
            showHomeContent: false,
            showPageContent: true
        },
        contact: {
            id: 'contact',
            showHero: false,
            showPromo: false,
            showHomeContent: false,
            showPageContent: true
        },
        spedizioni: {
            id: 'spedizioni',
            showHero: false,
            showPromo: false,
            showHomeContent: false,
            showPageContent: true
        },
        shipping: {
            id: 'shipping',
            showHero: false,
            showPromo: false,
            showHomeContent: false,
            showPageContent: true
        },
        resi: {
            id: 'resi',
            showHero: false,
            showPromo: false,
            showHomeContent: false,
            showPageContent: true
        },
        returns: {
            id: 'returns',
            showHero: false,
            showPromo: false,
            showHomeContent: false,
            showPageContent: true
        },
        faq: {
            id: 'faq',
            showHero: false,
            showPromo: false,
            showHomeContent: false,
            showPageContent: true
        },
        'faq-en': {
            id: 'faq-en',
            showHero: false,
            showPromo: false,
            showHomeContent: false,
            showPageContent: true
        }
    },
    
    /**
     * Titoli delle pagine per lingua
     */
    titles: {
        it: {
            home: 'Gruppo Gizzi | Il Tuo Supermercato del Cilento',
            contatti: 'Contattaci | Gruppo Gizzi',
            spedizioni: 'Spedizioni | Gruppo Gizzi',
            resi: 'Resi e Rimborsi | Gruppo Gizzi',
            faq: 'FAQ | Gruppo Gizzi'
        },
        en: {
            home: 'Gruppo Gizzi | Your Cilento Supermarket',
            contact: 'Contact Us | Gruppo Gizzi',
            shipping: 'Shipping | Gruppo Gizzi',
            returns: 'Returns & Refunds | Gruppo Gizzi',
            'faq-en': 'FAQ | Gruppo Gizzi'
        },
        de: {
            home: 'Gruppo Gizzi | Ihr Cilento Supermarkt',
            kontakt: 'Kontakt | Gruppo Gizzi',
            versand: 'Versand | Gruppo Gizzi',
            rueckgabe: 'Rückgabe & Erstattung | Gruppo Gizzi',
            faq: 'FAQ | Gruppo Gizzi'
        },
        hu: {
            home: 'Gruppo Gizzi | Az Ön Cilento Szupermarketje',
            kapcsolat: 'Kapcsolat | Gruppo Gizzi',
            szallitas: 'Szállítás | Gruppo Gizzi',
            visszakuldes: 'Visszaküldés és Visszatérítés | Gruppo Gizzi',
            gyik: 'GYIK | Gruppo Gizzi'
        }
    },
    
    /**
     * Mappa pageId -> contentKey per lingua
     */
    pageToContentKey: {
        it: {
            contatti: 'contatti',
            spedizioni: 'spedizioni',
            resi: 'resi',
            faq: 'faq'
        },
        en: {
            contact: 'contact',
            shipping: 'shipping',
            returns: 'returns',
            'faq-en': 'faq-en'
        }
    },
    
    /**
     * Inizializza il router
     */
    init() {
        // Gestisce i pulsanti back/forward del browser
        window.addEventListener('popstate', (e) => {
            const page = window.location.hash.replace('#', '') || 'home';
            this.loadPage(page, false);
        });
        
        // Carica la pagina iniziale in base all'URL hash
        const initialPage = window.location.hash.replace('#', '') || 'home';
        this.loadPage(initialPage, false);
    },
    
    /**
     * Naviga a una pagina
     * @param {string} pageId - ID della pagina
     */
    navigate(pageId) {
        if (!this.pages[pageId]) {
            console.error(`Page ${pageId} not found`);
            return;
        }
        
        // Aggiorna l'URL hash
        window.location.hash = pageId === 'home' ? '' : pageId;
        
        // Carica la pagina
        this.loadPage(pageId, true);
        
        // Scrolla in cima
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    
    /**
     * Carica una pagina
     * @param {string} pageId - ID della pagina
     * @param {boolean} pushState - Se true, aggiorna lo stato del browser
     */
    async loadPage(pageId, pushState = true) {
        const config = this.pages[pageId];
        if (!config) return;
        
        this.currentPage = pageId;
        
        // Mostra/nascondi sezioni
        this.toggleSection('hero-section', config.showHero);
        this.toggleSection('promo-strip', config.showPromo);
        this.toggleSection('home-content', config.showHomeContent);
        
        const pageContentEl = document.getElementById('page-content');
        const lang = state.lang || 'it';
        
        if (config.showPageContent) {
            // Usa contenuto inline per funzionamento offline
            const contentKey = this.pageToContentKey[lang]?.[pageId];
            const inlineContent = contentKey ? this.pageContents[lang]?.[contentKey] : null;
            
            if (inlineContent) {
                pageContentEl.innerHTML = inlineContent;
                pageContentEl.style.display = 'block';
            } else {
                // Fallback a fetch se il contenuto inline non esiste
                try {
                    const fileMap = {
                        it: {
                            contatti: 'pages/contatti.html',
                            spedizioni: 'pages/spedizioni.html',
                            resi: 'pages/resi.html',
                            faq: 'pages/faq.html'
                        },
                        en: {
                            contact: 'pages/contact.html',
                            shipping: 'pages/shipping.html',
                            returns: 'pages/returns.html',
                            'faq-en': 'pages/faq-en.html'
                        }
                    };
                    
                    const file = fileMap[lang]?.[pageId];
                    if (file) {
                        const response = await fetch(file);
                        if (!response.ok) throw new Error('Page not found');
                        
                        let html = await response.text();
                        const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
                        if (bodyMatch) {
                            html = bodyMatch[1];
                        }
                        
                        pageContentEl.innerHTML = html;
                        pageContentEl.style.display = 'block';
                    } else {
                        throw new Error('Page file not found');
                    }
                } catch (error) {
                    console.error('Error loading page:', error);
                    pageContentEl.innerHTML = `
                        <div class="page-error" style="padding: 40px; text-align: center;">
                            <h2>Errore di caricamento</h2>
                            <p>Impossibile caricare la pagina richiesta.</p>
                            <button onclick="Router.navigate('home')" style="margin-top: 20px; padding: 10px 20px; cursor: pointer; background: var(--gizzi-deep); color: white; border: none; border-radius: 8px;">Torna alla Home</button>
                        </div>
                    `;
                    pageContentEl.style.display = 'block';
                }
            }
            
            this.initPageScripts(pageId);
        } else {
            pageContentEl.style.display = 'none';
            pageContentEl.innerHTML = '';
        }
        
        // Aggiorna stato attivo nella navigazione
        this.updateActiveNav(pageId);
        
        // Aggiorna titolo pagina
        this.updatePageTitle(pageId);
    },
    
    /**
     * Mostra o nasconde una sezione
     * @param {string} id - ID della sezione
     * @param {boolean} show - Se true, mostra la sezione
     */
    toggleSection(id, show) {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = show ? '' : 'none';
        }
    },
    
    /**
     * Aggiorna lo stato attivo nella navigazione
     * @param {string} pageId - ID della pagina
     */
    updateActiveNav(pageId) {
        // Rimuovi classe active da tutti i link
        document.querySelectorAll('.footer-col a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Aggiungi classe active al link corrente
        const activeLink = document.querySelector(`a[href="#${pageId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    },
    
    /**
     * Aggiorna il titolo della pagina
     * @param {string} pageId - ID della pagina
     */
    updatePageTitle(pageId) {
        const lang = state.lang || 'it';
        const title = this.titles[lang]?.[pageId] || this.titles['it'][pageId] || 'Gruppo Gizzi';
        document.title = title;
    },
    
    /**
     * Inizializza script specifici della pagina
     * @param {string} pageId - ID della pagina
     */
    initPageScripts(pageId) {
        if (pageId === 'contatti' || pageId === 'contact') {
            const form = document.getElementById('contact-form');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    Toast.success(
                        pageId === 'contatti' ? 'Messaggio inviato!' : 'Message sent!',
                        pageId === 'contatti' ? 'Ti risponderemo presto.' : 'We will reply soon.'
                    );
                    form.reset();
                });
            }
        }
    }
};

// Funzione globale per toggle FAQ
function toggleFaq(element) {
    const item = element.parentElement;
    item.classList.toggle('open');
}

// Esporta per l'uso in altri moduli
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Router };
}
