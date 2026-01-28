/**
 * Sistema di gestione pagine interne per Gruppo Gizzi
 * Carica contenuti dinamici e gestisce le traduzioni
 */

const PageApp = {
    currentLang: 'it',
    currentPage: '',
    translations: {},

    // Mappa delle pagine alle lingue
    pageLangMap: {
        'contatti': 'it', 'contact': 'en', 'kontakt': 'de', 'kapcsolat': 'hu',
        'spedizioni': 'it', 'shipping': 'en', 'versand': 'de', 'szallitas': 'hu',
        'resi': 'it', 'returns': 'en', 'rueckgabe': 'de', 'visszakuldes': 'hu',
        'faq': 'it', 'faq-en': 'en', 'faq-de': 'de', 'gyik': 'hu'
    },

    // Contenuti delle pagine per lingua
    pageContent: {
        // CONTATTI
        contact: {
            it: {
                hero: { title: 'Contattaci', subtitle: 'Siamo qui per aiutarti. Contattaci per qualsiasi domanda sui nostri prodotti o servizi.' },
                cards: [
                    { icon: 'email', title: 'Email', text: 'Rispondiamo entro 24 ore', link: 'mailto:info@gruppogizzi.it', linkText: 'info@gruppogizzi.it' },
                    { icon: 'phone', title: 'Telefono', text: 'Lun-Ven: 9:00-18:00', link: 'tel:+393331234567', linkText: '+39 333 123 4567' },
                    { icon: 'location', title: 'Indirizzo', text: 'Vieni a trovarci', span: 'Cilento, Campania, Italia' }
                ],
                form: { title: 'Inviaci un Messaggio', name: 'Nome e Cognome', email: 'Email', subject: 'Oggetto', message: 'Messaggio', submit: 'Invia Messaggio' },
                subjects: ['Informazioni Prodotti', 'Stato Ordine', 'Spedizioni', 'Resi e Rimborsi', 'Altro']
            },
            en: {
                hero: { title: 'Contact Us', subtitle: "We're here to help. Contact us for any questions about our products or services." },
                cards: [
                    { icon: 'email', title: 'Email', text: 'We reply within 24 hours', link: 'mailto:info@gruppogizzi.it', linkText: 'info@gruppogizzi.it' },
                    { icon: 'phone', title: 'Phone', text: 'Mon-Fri: 9:00 AM - 6:00 PM', link: 'tel:+393331234567', linkText: '+39 333 123 4567' },
                    { icon: 'location', title: 'Address', text: 'Visit us', span: 'Cilento, Campania, Italy' }
                ],
                form: { title: 'Send us a Message', name: 'Full Name', email: 'Email', subject: 'Subject', message: 'Message', submit: 'Send Message' },
                subjects: ['Product Information', 'Order Status', 'Shipping', 'Returns & Refunds', 'Other']
            },
            de: {
                hero: { title: 'Kontakt', subtitle: 'Wir sind hier, um Ihnen zu helfen.' },
                cards: [
                    { icon: 'email', title: 'E-Mail', text: 'Antwort innerhalb von 24 Stunden', link: 'mailto:info@gruppogizzi.it', linkText: 'info@gruppogizzi.it' },
                    { icon: 'phone', title: 'Telefon', text: 'Mo-Fr: 9:00-18:00', link: 'tel:+393331234567', linkText: '+39 333 123 4567' },
                    { icon: 'location', title: 'Adresse', text: 'Cilento, Kampanien, Italien', span: '' }
                ],
                form: { title: 'Nachricht senden', name: 'Name', email: 'E-Mail', subject: 'Betreff', message: 'Nachricht', submit: 'Nachricht senden' },
                subjects: ['Produktinformationen', 'Bestellstatus', 'Versand', 'Rückgabe', 'Sonstiges']
            },
            hu: {
                hero: { title: 'Kapcsolat', subtitle: 'Segítünk Önnek. Keressen minket bármilyen kérdéssel.' },
                cards: [
                    { icon: 'email', title: 'E-mail', text: '24 órán belül válaszolunk', link: 'mailto:info@gruppogizzi.it', linkText: 'info@gruppogizzi.it' },
                    { icon: 'phone', title: 'Telefon', text: 'H-P: 9:00-18:00', link: 'tel:+393331234567', linkText: '+39 333 123 4567' },
                    { icon: 'location', title: 'Cím', text: 'Látogasson el hozzánk', span: 'Cilento, Campania, Olaszország' }
                ],
                form: { title: 'Üzenet küldése', name: 'Teljes név', email: 'E-mail', subject: 'Tárgy', message: 'Üzenet', submit: 'Üzenet küldése' },
                subjects: ['Termékinformáció', 'Rendelés állapota', 'Szállítás', 'Visszaküldés', 'Egyéb']
            }
        },

        // SPEDIZIONI
        shipping: {
            it: {
                hero: { title: 'Spedizioni', subtitle: 'Informazioni su tempi, costi e modalità di spedizione dei nostri prodotti.' },
                highlight: { title: 'Spedizione Gratuita', text: 'Spedizione GRATUITA per ordini superiori a €120!' },
                table: {
                    headers: ['Destinazione', 'Tempi Stimati', 'Costo'],
                    rows: [
                        ['Italia (Nord)', '2-3 giorni lavorativi', '€8.90 / Gratis oltre €120'],
                        ['Italia (Centro)', '1-2 giorni lavorativi', '€7.90 / Gratis oltre €120'],
                        ['Italia (Sud e Isole)', '2-4 giorni lavorativi', '€9.90 / Gratis oltre €120'],
                        ['Europa (UE)', '5-7 giorni lavorativi', '€15.90']
                    ]
                },
                howItWorks: {
                    title: 'Come Funziona',
                    items: [
                        '<strong>Elaborazione ordine:</strong> Gli ordini vengono elaborati entro 24-48 ore lavorative.',
                        '<strong>Tracking:</strong> Riceverai un\'email con il codice di tracciamento.',
                        '<strong>Corriere:</strong> Utilizziamo corrieri affidabili come GLS, BRT e DHL.',
                        '<strong>Imballaggio:</strong> I prodotti sono accuratamente imballati.'
                    ]
                },
                notes: {
                    title: 'Note Importanti',
                    items: [
                        'Le consegne avvengono dal lunedì al venerdì, esclusi i giorni festivi.',
                        'Per le isole minori potrebbero essere necessari 1-2 giorni aggiuntivi.',
                        'In caso di assenza, il corriere lascerà un avviso.',
                        'Per spedizioni in zone remote, contattaci per informazioni.'
                    ]
                }
            },
            en: {
                hero: { title: 'Shipping', subtitle: 'Information about delivery times, costs, and shipping methods.' },
                highlight: { title: 'Free Shipping', text: 'FREE shipping on orders over €120!' },
                table: {
                    headers: ['Destination', 'Estimated Time', 'Cost'],
                    rows: [
                        ['Italy (North)', '2-3 business days', '€8.90 / Free over €120'],
                        ['Italy (Center)', '1-2 business days', '€7.90 / Free over €120'],
                        ['Italy (South & Islands)', '2-4 business days', '€9.90 / Free over €120'],
                        ['Europe (EU)', '5-7 business days', '€15.90']
                    ]
                },
                howItWorks: {
                    title: 'How It Works',
                    items: [
                        '<strong>Order processing:</strong> Orders are processed within 24-48 business hours.',
                        '<strong>Tracking:</strong> You\'ll receive an email with tracking code.',
                        '<strong>Courier:</strong> We use reliable couriers like GLS, BRT, and DHL.',
                        '<strong>Packaging:</strong> Products are carefully packaged.'
                    ]
                },
                notes: {
                    title: 'Important Notes',
                    items: [
                        'Deliveries occur Monday to Friday, excluding holidays.',
                        'Minor islands may require 1-2 additional days.',
                        'If you\'re not home, the courier will leave a notice.',
                        'For remote areas, please contact us for more information.'
                    ]
                }
            },
            de: {
                hero: { title: 'Versand', subtitle: 'Informationen zu Lieferzeiten, Kosten und Versandmethoden.' },
                highlight: { title: 'Kostenloser Versand', text: 'KOSTENLOSER Versand bei Bestellungen über €120!' },
                table: {
                    headers: ['Ziel', 'Geschätzte Zeit', 'Kosten'],
                    rows: [
                        ['Italien (Norden)', '2-3 Werktage', '€8,90 / Gratis über €120'],
                        ['Italien (Mitte)', '1-2 Werktage', '€7,90 / Gratis über €120'],
                        ['Italien (Süden & Inseln)', '2-4 Werktage', '€9,90 / Gratis über €120'],
                        ['Europa (EU)', '5-7 Werktage', '€15,90']
                    ]
                },
                howItWorks: {
                    title: 'So funktioniert es',
                    items: [
                        '<strong>Bestellverarbeitung:</strong> Bestellungen werden innerhalb von 24-48 Stunden bearbeitet.',
                        '<strong>Tracking:</strong> Sie erhalten eine E-Mail mit Tracking-Code.',
                        '<strong>Kurier:</strong> Wir nutzen zuverlässige Kurierdienste wie GLS, BRT und DHL.',
                        '<strong>Verpackung:</strong> Produkte werden sorgfältig verpackt.'
                    ]
                },
                notes: {
                    title: 'Wichtige Hinweise',
                    items: [
                        'Lieferungen erfolgen Montag bis Freitag, außer an Feiertagen.',
                        'Kleine Inseln benötigen möglicherweise 1-2 zusätzliche Tage.',
                        'Bei Abwesenheit hinterlässt der Kurier eine Benachrichtigung.',
                        'Für entlegene Gebiete kontaktieren Sie uns bitte.'
                    ]
                }
            },
            hu: {
                hero: { title: 'Szállítás', subtitle: 'Információk a szállítási időkről, költségekről és módokról.' },
                highlight: { title: 'Ingyenes Szállítás', text: 'INGYENES szállítás €120 feletti rendelések esetén!' },
                table: {
                    headers: ['Célállomás', 'Becsült Idő', 'Költség'],
                    rows: [
                        ['Olaszország (Észak)', '2-3 munkanap', '€8.90 / Ingyenes €120 felett'],
                        ['Olaszország (Közép)', '1-2 munkanap', '€7.90 / Ingyenes €120 felett'],
                        ['Olaszország (Dél és szigetek)', '2-4 munkanap', '€9.90 / Ingyenes €120 felett'],
                        ['Európa (EU)', '5-7 munkanap', '€15.90']
                    ]
                },
                howItWorks: {
                    title: 'Hogyan működik',
                    items: [
                        '<strong>Rendelés feldolgozása:</strong> A rendeléseket 24-48 órán belül feldolgozzuk.',
                        '<strong>Nyomkövetés:</strong> E-mailben kapja meg a nyomkövetési kódot.',
                        '<strong>Futárszolgálat:</strong> Megbízható futárszolgálatokat használunk.',
                        '<strong>Csomagolás:</strong> A termékeket gondosan csomagoljuk.'
                    ]
                },
                notes: {
                    title: 'Fontos megjegyzések',
                    items: [
                        'A kiszállítás hétfőtől péntekig történik, ünnepnapok kivételével.',
                        'A kisebb szigetekre 1-2 extra nap szükséges lehet.',
                        'Ha nincs otthon, a futár értesítőt hagy.',
                        'Távoli területekre kérjük, vegye fel velünk a kapcsolatot.'
                    ]
                }
            }
        },

        // RESI
        returns: {
            it: {
                hero: { title: 'Resi e Rimborsi', subtitle: 'La tua soddisfazione è la nostra priorità.' },
                policy: {
                    title: 'Politica di Reso',
                    text: 'Hai <strong>14 giorni</strong> dalla data di consegna per richiedere un reso.',
                    items: ['Non aperto e nella confezione originale sigillata', 'In perfette condizioni', 'Accompagnato dalla ricevuta'],
                    warning: 'I prodotti alimentari aperti non possono essere resi.'
                },
                steps: {
                    title: 'Come Richiedere un Reso',
                    items: [
                        '<strong>Contattaci</strong> via email o WhatsApp.',
                        '<strong>Attendi la conferma</strong> con le istruzioni.',
                        '<strong>Imballa il prodotto</strong> nella confezione originale.',
                        '<strong>Spedisci il pacco</strong> all\'indirizzo fornito.'
                    ]
                },
                refunds: {
                    title: 'Rimborsi',
                    text: 'Rimborso entro <strong>7 giorni lavorativi</strong>.',
                    items: [
                        '<strong>Metodo:</strong> Stesso metodo di pagamento',
                        '<strong>Spese reso:</strong> A carico del cliente',
                        '<strong>Prodotti difettosi:</strong> Rimborso completo'
                    ]
                },
                damaged: {
                    title: 'Prodotti Danneggiati',
                    text: 'Se ricevi un prodotto danneggiato:',
                    items: [
                        'Contattaci entro <strong>48 ore</strong>',
                        'Inviaci foto del danno',
                        'Sostituzione o rimborso completo'
                    ]
                }
            },
            en: {
                hero: { title: 'Returns & Refunds', subtitle: 'Your satisfaction is our priority.' },
                policy: {
                    title: 'Return Policy',
                    text: 'You have <strong>14 days</strong> from delivery to request a return.',
                    items: ['Unopened in original sealed packaging', 'In perfect condition', 'Accompanied by receipt'],
                    warning: 'Opened food products cannot be returned.'
                },
                steps: {
                    title: 'How to Request a Return',
                    items: [
                        '<strong>Contact us</strong> via email or WhatsApp.',
                        '<strong>Wait for confirmation</strong> with instructions.',
                        '<strong>Pack the product</strong> in original packaging.',
                        '<strong>Ship the package</strong> to the provided address.'
                    ]
                },
                refunds: {
                    title: 'Refunds',
                    text: 'Refund within <strong>7 business days</strong>.',
                    items: [
                        '<strong>Method:</strong> Same payment method',
                        '<strong>Return shipping:</strong> Paid by customer',
                        '<strong>Defective products:</strong> Full refund'
                    ]
                },
                damaged: {
                    title: 'Damaged Products',
                    text: 'If you receive a damaged product:',
                    items: [
                        'Contact us within <strong>48 hours</strong>',
                        'Send us photos of the damage',
                        'Replacement or full refund'
                    ]
                }
            },
            de: {
                hero: { title: 'Rückgabe & Erstattung', subtitle: 'Ihre Zufriedenheit ist unsere Priorität.' },
                policy: {
                    title: 'Rückgaberecht',
                    text: 'Sie haben <strong>14 Tage</strong> ab Lieferung für eine Rückgabe.',
                    items: ['Ungeöffnet in Originalverpackung', 'In einwandfreiem Zustand', 'Mit Quittung'],
                    warning: 'Geöffnete Lebensmittel können nicht zurückgegeben werden.'
                },
                steps: {
                    title: 'Rückgabe beantragen',
                    items: [
                        '<strong>Kontaktieren Sie uns</strong> per E-Mail oder WhatsApp.',
                        '<strong>Warten Sie auf Bestätigung</strong> mit Anweisungen.',
                        '<strong>Verpacken Sie das Produkt</strong> original.',
                        '<strong>Senden Sie das Paket</strong> an die angegebene Adresse.'
                    ]
                },
                refunds: {
                    title: 'Erstattungen',
                    text: 'Erstattung innerhalb von <strong>7 Werktagen</strong>.',
                    items: [
                        '<strong>Methode:</strong> Gleiche Zahlungsmethode',
                        '<strong>Rücksendekosten:</strong> Vom Kunden getragen',
                        '<strong>Defekte Produkte:</strong> Volle Erstattung'
                    ]
                },
                damaged: {
                    title: 'Beschädigte Produkte',
                    text: 'Wenn Sie ein beschädigtes Produkt erhalten:',
                    items: [
                        'Kontaktieren Sie uns innerhalb von <strong>48 Stunden</strong>',
                        'Senden Sie uns Fotos des Schadens',
                        'Ersatz oder volle Erstattung'
                    ]
                }
            },
            hu: {
                hero: { title: 'Visszaküldés és Visszatérítés', subtitle: 'Az Ön elégedettsége a prioritásunk.' },
                policy: {
                    title: 'Visszaküldési szabályzat',
                    text: '<strong>14 napja</strong> van a kézhezvételtől a visszaküldésre.',
                    items: ['Eredeti, bontatlan csomagolásban', 'Tökéletes állapotban', 'Nyugdíjjal együtt'],
                    warning: 'A megnyitott élelmiszereket nem lehet visszaküldeni.'
                },
                steps: {
                    title: 'Hogyan kérhet visszaküldést',
                    items: [
                        '<strong>Lépjen kapcsolatba velünk</strong> e-mailben vagy WhatsApp-on.',
                        '<strong>Várja meg a megerősítést</strong> az utasításokkal.',
                        '<strong>Csomagolja be a terméket</strong> eredeti csomagolásba.',
                        '<strong>Küldje el a csomagot</strong> a megadott címre.'
                    ]
                },
                refunds: {
                    title: 'Visszatérítések',
                    text: 'Visszatérítés <strong>7 munkanapon belül</strong>.',
                    items: [
                        '<strong>Módszer:</strong> Ugyanaz a fizetési mód',
                        '<strong>Visszaküldési költség:</strong> A vevőt terheli',
                        '<strong>Hibás termékek:</strong> Teljes visszatérítés'
                    ]
                },
                damaged: {
                    title: 'Sérült termékek',
                    text: 'Ha sérült terméket kap:',
                    items: [
                        'Lépjen kapcsolatba velünk <strong>48 órán belül</strong>',
                        'Küldjön fotókat a sérülésről',
                        'Csere vagy teljes visszatérítés'
                    ]
                }
            }
        },

        // FAQ
        faq: {
            it: {
                hero: { title: 'Domande Frequenti', subtitle: 'Trova le risposte alle domande più comuni.' },
                sections: [
                    {
                        title: '🛒 Ordini e Pagamenti',
                        questions: [
                            { q: 'Come posso effettuare un ordine?', a: 'Sfoglia i prodotti, aggiungili al carrello e prosegui al checkout. Ti contatteremo via WhatsApp per confermare.' },
                            { q: 'Quali metodi di pagamento accettate?', a: 'Accettiamo bonifico, PayPal e contrassegno per l\'Italia.' },
                            { q: 'Posso modificare un ordine?', a: 'Sì, entro 24 ore dalla conferma contattandoci.' }
                        ]
                    },
                    {
                        title: '📦 Spedizioni',
                        questions: [
                            { q: 'Quanto costa la spedizione?', a: 'GRATUITA per ordini superiori a €120. Altrimenti €9.90 in Italia, €14.90 Europa.' },
                            { q: 'In quanto tempo ricevo l\'ordine?', a: 'Italia: 2-4 giorni lavorativi. Europa: 5-7 giorni.' },
                            { q: 'Spedite all\'estero?', a: 'Sì, in tutta l\'Unione Europea.' }
                        ]
                    },
                    {
                        title: '🌿 Prodotti',
                        questions: [
                            { q: 'I prodotti sono autentici?', a: 'Assolutamente sì! Provengono direttamente dal Cilento.' },
                            { q: 'Come conservo i prodotti?', a: 'Olio al riparo da luce e calore, conserve in luogo fresco.' }
                        ]
                    }
                ],
                cta: { title: 'Non hai trovato la risposta?', text: 'Il nostro team è pronto ad aiutarti.', link: 'contatti.html', linkText: 'Contattaci' }
            },
            en: {
                hero: { title: 'Frequently Asked Questions', subtitle: 'Find answers to the most common questions.' },
                sections: [
                    {
                        title: '🛒 Orders & Payments',
                        questions: [
                            { q: 'How do I place an order?', a: 'Browse products, add to cart, and proceed to checkout. We\'ll contact you via WhatsApp to confirm.' },
                            { q: 'What payment methods?', a: 'We accept bank transfer, PayPal, and cash on delivery for Italy.' },
                            { q: 'Can I modify an order?', a: 'Yes, within 24 hours of confirmation by contacting us.' }
                        ]
                    },
                    {
                        title: '📦 Shipping',
                        questions: [
                            { q: 'How much is shipping?', a: 'FREE for orders over €120. Otherwise €9.90 Italy, €14.90 Europe.' },
                            { q: 'How long does delivery take?', a: 'Italy: 2-4 business days. Europe: 5-7 days.' },
                            { q: 'Do you ship abroad?', a: 'Yes, throughout the European Union.' }
                        ]
                    },
                    {
                        title: '🌿 Products',
                        questions: [
                            { q: 'Are products authentic?', a: 'Absolutely! They come directly from Cilento.' },
                            { q: 'How should I store products?', a: 'Oil away from light and heat, preserves in a cool place.' }
                        ]
                    }
                ],
                cta: { title: 'Didn\'t find your answer?', text: 'Our team is ready to help.', link: 'contact.html', linkText: 'Contact Us' }
            },
            de: {
                hero: { title: 'Häufige Fragen', subtitle: 'Finden Sie Antworten auf die häufigsten Fragen.' },
                sections: [
                    {
                        title: '🛒 Bestellungen & Zahlung',
                        questions: [
                            { q: 'Wie bestelle ich?', a: 'Produkte durchsuchen, in den Warenkorb legen und zur Kasse gehen. Wir kontaktieren Sie via WhatsApp.' },
                            { q: 'Welche Zahlungsmethoden?', a: 'Banküberweisung, PayPal und Nachnahme für Italien.' },
                            { q: 'Kann ich eine Bestellung ändern?', a: 'Ja, innerhalb von 24 Stunden nach Bestätigung.' }
                        ]
                    },
                    {
                        title: '📦 Versand',
                        questions: [
                            { q: 'Was kostet der Versand?', a: 'KOSTENLOS ab €120. Sonst €9,90 Italien, €14,90 Europa.' },
                            { q: 'Wie lange dauert die Lieferung?', a: 'Italien: 2-4 Werktage. Europa: 5-7 Tage.' },
                            { q: 'Liefern Sie ins Ausland?', a: 'Ja, in die gesamte Europäische Union.' }
                        ]
                    },
                    {
                        title: '🌿 Produkte',
                        questions: [
                            { q: 'Sind die Produkte authentisch?', a: 'Absolut! Sie kommen direkt aus Cilento.' },
                            { q: 'Wie lagere ich Produkte?', a: 'Öl vor Licht und Hitze schützen.' }
                        ]
                    }
                ],
                cta: { title: 'Antwort nicht gefunden?', text: 'Unser Team hilft Ihnen gerne.', link: 'kontakt.html', linkText: 'Kontakt' }
            },
            hu: {
                hero: { title: 'Gyakori Kérdések', subtitle: 'Találja meg a válaszokat a leggyakoribb kérdésekre.' },
                sections: [
                    {
                        title: '🛒 Rendelések és Fizetés',
                        questions: [
                            { q: 'Hogyan rendelhetek?', a: 'Böngésszen a termékek között, tegye a kosárba, és folytassa a pénztárhoz. WhatsApp-on keresztül felvesszük Önnel a kapcsolatot.' },
                            { q: 'Milyen fizetési módok?', a: 'Banki átutalást, PayPal-t és utánvételet fogadunk el.' },
                            { q: 'Módosíthatom a rendelést?', a: 'Igen, a megerősítéstől számított 24 órán belül.' }
                        ]
                    },
                    {
                        title: '📦 Szállítás',
                        questions: [
                            { q: 'Mennyibe kerül a szállítás?', a: 'INGYENES €120 felett. Egyébként €9.90 Olaszország, €14.90 Európa.' },
                            { q: 'Mennyi a szállítási idő?', a: 'Olaszország: 2-4 munkanap. Európa: 5-7 nap.' },
                            { q: 'Küldenek külföldre?', a: 'Igen, az egész Európai Unióba.' }
                        ]
                    },
                    {
                        title: '🌿 Termékek',
                        questions: [
                            { q: 'Autentikusak a termékek?', a: 'Teljesen! Közvetlenül Cilentóból származnak.' },
                            { q: 'Hogyan tároljam a termékeket?', a: 'Olajt fénytől és hőtől védve.' }
                        ]
                    }
                ],
                cta: { title: 'Nem találta a választ?', text: 'Csapatunk készen áll a segítségre.', link: 'kapcsolat.html', linkText: 'Kapcsolat' }
            }
        }
    },

    // Icon SVGs
    icons: {
        email: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>',
        phone: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>',
        location: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>',
        shipping: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>',
        clock: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
        info: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>',
        warning: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
        check: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
        refresh: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>',
        money: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
        broken: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
    },

    init() {
        this.detectLanguage();
        this.loadTheme();
        this.render();
    },

    detectLanguage() {
        const path = window.location.pathname;
        const pageName = path.split('/').pop().replace('.html', '');
        this.currentPage = this.getPageType(pageName);
        this.currentLang = this.pageLangMap[pageName] || localStorage.getItem('gizzi_lang') || 'it';
        document.documentElement.lang = this.currentLang;
    },

    getPageType(pageName) {
        const map = {
            'contatti': 'contact', 'contact': 'contact', 'kontakt': 'contact', 'kapcsolat': 'contact',
            'spedizioni': 'shipping', 'shipping': 'shipping', 'versand': 'shipping', 'szallitas': 'shipping',
            'resi': 'returns', 'returns': 'returns', 'rueckgabe': 'returns', 'visszakuldes': 'returns',
            'faq': 'faq', 'faq-en': 'faq', 'faq-de': 'faq', 'gyik': 'faq'
        };
        return map[pageName] || 'contact';
    },

    loadTheme() {
        const savedTheme = localStorage.getItem('gizzi_theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    },

    getContent() {
        return this.pageContent[this.currentPage]?.[this.currentLang] || this.pageContent.contact.it;
    },

    t(key) {
        const keys = key.split('.');
        let value = this.getContent();
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return key;
            }
        }
        return value;
    },

    render() {
        const content = this.getContent();
        const container = document.getElementById('page-content');
        if (!container) return;

        // Render based on page type
        switch(this.currentPage) {
            case 'contact':
                container.innerHTML = this.renderContact(content);
                break;
            case 'shipping':
                container.innerHTML = this.renderShipping(content);
                break;
            case 'returns':
                container.innerHTML = this.renderReturns(content);
                break;
            case 'faq':
                container.innerHTML = this.renderFaq(content);
                break;
        }

        // Update hero
        const heroTitle = document.querySelector('.page-hero h1');
        const heroSubtitle = document.querySelector('.page-hero p');
        if (heroTitle) heroTitle.textContent = content.hero.title;
        if (heroSubtitle) heroSubtitle.textContent = content.hero.subtitle;

        // Update back link
        const backLink = document.querySelector('.back-link span');
        if (backLink) {
            const backTexts = { it: 'Torna al Negozio', en: 'Back to Shop', de: 'Zurück zum Shop', hu: 'Vissza a boltba' };
            backLink.textContent = backTexts[this.currentLang] || backTexts.it;
        }
    },

    renderContact(content) {
        const cardsHtml = content.cards.map(card => `
            <div class="contact-card">
                ${this.icons[card.icon]}
                <h3>${card.title}</h3>
                <p>${card.text}</p>
                ${card.link ? `<a href="${card.link}">${card.linkText}</a>` : `<span style="color: var(--text);">${card.span}</span>`}
            </div>
        `).join('');

        const subjectsHtml = content.subjects.map((subj, i) => 
            `<option value="${i}">${subj}</option>`
        ).join('');

        return `
            <div class="contact-grid">${cardsHtml}</div>
            <div class="contact-form">
                <h2>${content.form.title}</h2>
                <form onsubmit="event.preventDefault(); alert('Messaggio inviato!');">
                    <div class="form-row">
                        <div class="form-group">
                            <label>${content.form.name} *</label>
                            <input type="text" required>
                        </div>
                        <div class="form-group">
                            <label>${content.form.email} *</label>
                            <input type="email" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>${content.form.subject}</label>
                        <select>${subjectsHtml}</select>
                    </div>
                    <div class="form-group">
                        <label>${content.form.message} *</label>
                        <textarea required></textarea>
                    </div>
                    <button type="submit" class="btn-submit">${content.form.submit}</button>
                </form>
            </div>
        `;
    },

    renderShipping(content) {
        const rowsHtml = content.table.rows.map(row => 
            `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`
        ).join('');

        const howItWorksHtml = content.howItWorks.items.map(item => `<li>${item}</li>`).join('');
        const notesHtml = content.notes.items.map(item => `<li>${item}</li>`).join('');

        return `
            <div class="info-card highlight">
                <h2>${this.icons.shipping}${content.highlight.title}</h2>
                <p><strong>${content.highlight.text}</strong></p>
            </div>
            <div class="info-card">
                <h2>${this.icons.clock}Tempi di Consegna</h2>
                <table class="shipping-table">
                    <thead><tr>${content.table.headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
                    <tbody>${rowsHtml}</tbody>
                </table>
            </div>
            <div class="info-card">
                <h2>${this.icons.info}${content.howItWorks.title}</h2>
                <ul>${howItWorksHtml}</ul>
            </div>
            <div class="info-card">
                <h2>${this.icons.warning}${content.notes.title}</h2>
                <ul>${notesHtml}</ul>
            </div>
        `;
    },

    renderReturns(content) {
        const policyItemsHtml = content.policy.items.map(item => `<li>${item}</li>`).join('');
        const stepsHtml = content.steps.items.map(item => `<li>${item}</li>`).join('');
        const refundItemsHtml = content.refunds.items.map(item => `<li>${item}</li>`).join('');
        const damagedItemsHtml = content.damaged.items.map(item => `<li>${item}</li>`).join('');

        return `
            <div class="info-card">
                <h2>${this.icons.check}${content.policy.title}</h2>
                <p>${content.policy.text}</p>
                <ul>${policyItemsHtml}</ul>
                <div class="highlight-box"><p>⚠️ ${content.policy.warning}</p></div>
            </div>
            <div class="info-card">
                <h2>${this.icons.refresh}${content.steps.title}</h2>
                <ol class="steps-list">${stepsHtml}</ol>
            </div>
            <div class="info-card">
                <h2>${this.icons.money}${content.refunds.title}</h2>
                <p>${content.refunds.text}</p>
                <ul>${refundItemsHtml}</ul>
            </div>
            <div class="info-card">
                <h2>${this.icons.broken}${content.damaged.title}</h2>
                <p>${content.damaged.text}</p>
                <ul>${damagedItemsHtml}</ul>
            </div>
        `;
    },

    renderFaq(content) {
        const sectionsHtml = content.sections.map(section => {
            const questionsHtml = section.questions.map((q, i) => `
                <div class="faq-item">
                    <div class="faq-question" onclick="this.parentElement.classList.toggle('open')">
                        ${q.q}
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                    <div class="faq-answer">
                        <div class="faq-answer-content">${q.a}</div>
                    </div>
                </div>
            `).join('');

            return `
                <div class="faq-section">
                    <h2>${section.title}</h2>
                    ${questionsHtml}
                </div>
            `;
        }).join('');

        return `
            ${sectionsHtml}
            <div class="contact-cta">
                <h3>${content.cta.title}</h3>
                <p>${content.cta.text}</p>
                <a href="${content.cta.link}">${content.cta.linkText}</a>
            </div>
        `;
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    PageApp.init();
});