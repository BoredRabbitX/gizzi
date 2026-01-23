# Gruppo Gizzi - Sito E-commerce Moderno (Stile Walmart 2026)

## 📋 Panoramica

Sito e-commerce moderno per **Gruppo Gizzi**, dedicato alla vendita di prodotti tipici del Cilento. Il sito è stato completamente ristrutturato seguendo i principi di design di Walmart, con un'interfaccia moderna, responsive e user-friendly.

## 🎯 Caratteristiche Principali

### Design & UI
- ✨ **Stile Walmart 2026**: Design moderno e professionale ispirato al brand Walmart
- 🎨 **Palette Colori Armonizzata**: Sistema completo di colori con sfumature e gradienti coordinati
- 🌙 **Dark Mode Completa**: Supporto completo per tema chiaro/scuro con transizioni fluide
- 📱 **Mobile-First**: Ottimizzato per tutti i dispositivi (desktop, tablet, mobile)
- 🎬 **Animazioni Fluide**: Transizioni CSS moderne con cubic-bezier e micro-interazioni
- ♿ **Accessibilità**: Contrasti WCAG AA, focus states, ARIA labels
- 🎨 **Sistema Design Unificato**: Variabili CSS, scale, e design tokens

### Funzionalità
- 🛒 **Carrello Avanzato**: Panello laterale con gestione quantità, persistenza localStorage
- 🔍 **Ricerca in Tempo Reale**: Filtri istantanei sui prodotti con feedback visivo
- ❤️ **Wishlist**: Salva prodotti preferiti con localStorage
- 🌍 **Multi-lingua Completa**: Italiano, Inglese, Tedesco, Ungherese - 100% tradotto
- 📦 **Gestione Magazzino**: Indicatori di disponibilità con badge colorati
- 💳 **Checkout Semplificato**: Modale moderno con validazione form e feedback
- 🎁 **Codici Promo**: Supporto per codici sconto con validazione
- 🚚 **Spedizione Inteligente**: Gratis sopra €120 in Italia, calcolo automatico
- 🍪 **GDPR Compliant**: Banner cookie con preferenze e persistenza
- 📱 **Toast Notifications**: Sistema notifiche moderno multi-tipo
- 🎯 **Skeleton Loading**: Stati di caricamento visivi

### Performance
- ⚡ **Caricamento Veloce**: CSS/JS modulari e ottimizzati
- 🖼️ **Lazy Loading**: Caricamento immagini on-demand
- 🔧 **Modularità**: Codice separato per facile manutenzione
- 💾 **LocalStorage**: Persistenza carrello, wishlist, tema, lingua

## 🎨 Sistema Colori

### Palette Principale (Walmart-Inspired)
```css
--walmart-blue: #0071dc           /* Blu primario */
--walmart-blue-light: #1e88e5      /* Blu chiaro */
--walmart-dark-blue: #004c91       /* Blu scuro */
--walmart-yellow: #ffc220           /* Giallo primario */
--walmart-orange: #ffad33           /* Arancione */
```

### Sfumature e Variazioni
- **Blu**: 4 variazioni da light a dark
- **Giallo/Arancione**: 4 variazioni con tonalità calde
- **Stato**: Verdi, Arancioni, Rossi per feedback visivo
- **Neutri**: Grigi sfumati per sfondi e testi

### Gradienti
- **Hero**: Gradient blu-giallo sfumato
- **Footer**: Gradient blu scuro
- **Accenti**: Gradient per bottoni e card

## 🌍 Sistema Traduzioni

100% del contenuto tradotto in 4 lingue:

### Lingue Supportate
- 🇮🇹 **Italiano** (IT) - Lingua default
- 🇬🇧 **Inglese** (EN)
- 🇩🇪 **Tedesco** (DE)
- 🇭🇺 **Ungherese** (HU)

### Categorie di Traduzione
- ✅ UI elements (bottini, modali, menu)
- ✅ Contenuto hero e features
- ✅ Carrello e checkout
- ✅ Footer e GDPR
- ✅ Toast notifications
- ✅ Stati di errore e successo
- ✅ Form labels e placeholders

### Aggiungere Nuove Lingue
1. Aggiungi oggetto lingua in `js/config.js` → `TEXT`
2. Aggiungi opzione nel select in `index.html`
3. Aggiungi colonne nel Google Sheet (Nome_{LANG}, Categoria_{LANG})

## 📁 Struttura del Progetto

```
gizziwalmart2/
├── index.html              # Pagina principale HTML5
├── css/
│   ├── variables.css       # Sistema completo variabili CSS
│   ├── base.css            # Stili base, utility, scrollbar
│   ├── header.css          # Header, navigazione, menu mobile
│   ├── hero.css            # Hero section con animazioni
│   ├── products.css        # Product cards, griglie, carousel
│   ├── cart.css            # Panello carrello drawer
│   ├── modal.css           # Modal, checkout, toast, popup
│   └── footer.css          # Footer, links, GDPR banner
├── js/
│   ├── config.js           # CONFIG e TEXT (traduzioni)
│   ├── app.js              # Classe App principale
│   ├── carousel.js         # Classe Carousel automatizzato
│   └── main.js             # Event listeners, inizializzazione
└── README.md               # Documentazione completa
```

## 🚀 Come Utilizzare

### Setup Rapido

1. **Clona o scarica** il progetto
2. **Apri `index.html`** nel browser
3. Il sito funzionerà immediatamente (nessun server richiesto)

### Configurazione

In `js/config.js` puoi modificare:

```javascript
const CONFIG = {
    catalog: "URL_DEL_TUO_GOOGLE_SHEETS",
    formURL: "URL_DEL_TUO_GOOGLE_FORM",
    wa: "NUMERO_WHATSAPP",
    freeShippingThreshold: 120,
    shippingCostIT: 13,
    shippingCostEU: 50
};
```

### Google Sheets Setup

Il sito si collega automaticamente a un Google Sheet. Assicurati che il foglio abbia queste colonne:

- `ID` - Identificativo unico
- `Nome`, `Nome_EN`, `Nome_DE`, `Nome_HU` - Nomi multi-lingua
- `Descrizione` - Descrizione prodotto
- `Prezzo` - Prezzo
- `Unità` - Unità di misura
- `Immagine` - URL immagine (accessibile pubblicamente)
- `Categoria`, `Categoria_EN`, `Categoria_DE`, `Categoria_HU` - Categorie multi-lingua
- `Disponibile` - "SI" o "NO"
- `Stock` - Quantità disponibile
- `Evidenza` - "SI" per prodotti in evidenza
- `Nuovo` - "SI" per badge "Nuovo"

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px (4 colonne griglia)
- **Tablet**: 768px - 1024px (2-3 colonne)
- **Mobile**: < 768px (1 colonna, menu hamburger)

## 🔧 Funzionalità Avanzate

### Carousel
- Auto-play con pausa on hover
- Navigazione manuale (frecce + dots)
- Touch swipe (mobile)
- Responsive items per view
- Transizioni fluide

### Carrello
- Drawer laterale con overlay
- Gestione quantità (+/-)
- Rimozione item
- Calcolo automatico spedizione
- Codici promo (GIZZI10, CILENTO20)
- Progress bar spedizione gratuita

### Checkout
- Validazione form real-time
- Messaggi errore per campo
- Invio a Google Forms
- Ordine WhatsApp automatico
- Popup successo animato

### Toast Notifications
- Tipi: success, error, warning
- Auto-dismiss (4 secondi)
- Close button manuale
- Traduzioni multi-lingua

## 🍪 GDPR & Privacy

Il sito include:
- Banner cookie GDPR compliant
- Pulsanti Accetta/Rifiuta
- Persistenza preferenze in localStorage
- Cookie funzionali (carrello, tema, lingua)

## 🔐 Suggerimenti per Produzione

1. **HTTPS**: Usa HTTPS per la sicurezza
2. **Immagini Ottimizzate**: Comprimi e ottimizza (WebP)
3. **CDN**: Servi CSS/JS da CDN per velocità
4. **Caching**: Implementa browser caching
5. **Analytics**: Aggiungi Google Analytics 4
6. **SEO**: Ottimizza meta tags, sitemap, robots.txt
7. **Performance**: Minify CSS/JS, lazy load immagini

## 🐛 Troubleshooting

### Prodotti non appaiono
- Verifica l'URL del Google Sheet in `config.js`
- Assicurati che il foglio sia pubblicamente accessibile (Pubblica sul web)
- Controlla la console browser (F12) per errori

### Carrello non persiste
- Verifica che localStorage sia abilitato nel browser
- Controlla console per errori
- Prova in incognito/private

### Immagini non caricano
- Verifica che gli URL delle immagini siano corretti
- Controlla CORS policy (per immagini da domini esterni)
- Assicurati che le immagini siano accessibili pubblicamente

### Traduzioni non aggiornano
- Ricarica la pagina (CTRL+F5)
- Verifica che `lang` sia corretto in localStorage
- Controlla console per errori JS

## 📞 Supporto

Per assistenza o domande:
- 📧 Email: info@gruppogizzi.it
- 📱 WhatsApp: +39 335 806 0715

## 📄 Licenza

© 2026 Gruppo Gizzi. Tutti i diritti riservati.

## 🔄 Changelog

### v2.0 (2026)
- ✨ Complete redesign in stile Walmart
- 🎨 Nuova palette colori con sfumature armonizzate
- 🌍 Sistema traduzioni 100% completo (4 lingue)
- 📱 Mobile-first responsive design
- 🌙 Dark mode completa
- ❤️ Wishlist con localStorage
- 🔍 Ricerca real-time con feedback
- 🎁 Codici promo con validazione
- 🚚 Spedizione gratuita automatica
- 🍪 GDPR compliance completo
- ⚡ Performance ottimizzate
- ♿ Accessibilità WCAG AA migliorata
- 🎬 Animazioni moderne (cubic-bezier)
- 📱 Toast notifications moderne
- 🔧 Modularità codice migliorata
- 🎨 Sistema design unificato

### v1.0
- Versione base originale

---

**Creato con ❤️ per Gruppo Gizzi**