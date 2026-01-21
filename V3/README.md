# Gruppo Gizzi - E-commerce Platform

Piattaforma e-commerce professionale per Gruppo Gizzi, specializzata nell'eccellenza gastronomica del Cilento.

## 🚀 Caratteristiche Principali

### 🎨 Design System Professionale
- **Architettura modulare**: CSS organizzato in componenti riutilizzabili
- **Design system completo**: Colori, tipografia e spaziature coerenti
- **Dark/Light theme**: Tema personalizzabile con persistenza
- **Responsive design**: Ottimizzato per tutti i dispositivi
- **Micro-interazioni**: Animazioni professionali e transizioni fluide

### 🌍 Internazionalizzazione Avanzata
- **4 lingue supportate**: Italiano, Inglese, Tedesco, Ungherese
- **Sistema centralizzato**: Gestione delle traduzioni tramite JSON
- **Formattazione locale**: Valute, date e numeri secondo la lingua
- **SEO multilingua**: Ottimizzazione per ogni lingua supportata

### 🛒 E-commerce Moderno
- **Catalogo prodotti dinamico**: Integrazione Google Sheets
- **Gestione carrello avanzata**: Validazione stock in tempo reale
- **Checkout ottimizzato**: Processo d'acquisto semplificato
- **Notifiche WhatsApp**: Conferme ordini immediate
- **Sistema di categorie**: Navigazione intuitiva dei prodotti

### ⚡ Performance & SEO
- **Lazy loading**: Caricamento ottimizzato delle immagini
- **CSS Critical**: Ottimizzazione del rendering
- **Struttura semantica**: HTML5 accessibile e SEO-friendly
- **Meta tag dinamici**: Ottimizzazione per social media
- **Performance monitoring**: Indicatori di carico

## 📁 Struttura del Progetto

```
gizziv3/
├── index.html                 # Pagina principale
├── assets/
│   ├── css/
│   │   ├── design-system.css  # Sistema di design e variabili
│   │   ├── components.css     # Componenti UI specifici
│   │   ├── animations.css     # Animazioni e micro-interazioni
│   │   └── seo-performance.css # Ottimizzazioni SEO e performance
│   ├── js/
│   │   ├── config.js          # Configurazione centralizzata
│   │   ├── i18n.js            # Sistema di internazionalizzazione
│   │   ├── products.js        # Gestione prodotti e catalogo
│   │   ├── cart.js            # Gestione carrello acquisti
│   │   └── ui.js              # Gestione interfaccia utente
│   ├── i18n/
│   │   └── translations.json  # File di traduzioni
│   ├── components/            # Componenti HTML futuri
│   └── img/                  # Immagini ottimizzate
└── README.md                  # Documentazione
```

## 🛠️ Stack Tecnologico

### Frontend
- **HTML5 Semantico**: Struttura accessibile e SEO-friendly
- **CSS3 Moderno**: Grid, Flexbox, Custom Properties
- **Vanilla JavaScript ES6+**: Modulare e performante
- **Responsive Design**: Mobile-first approach

### Integrations
- **Google Sheets**: Backend per catalogo prodotti
- **Google Forms**: Gestione ordini
- **WhatsApp API**: Notifiche automatiche
- **Google Fonts**: Tipografia ottimizzata

## 🚀 Avvio Rapido

### Prerequisiti
- Server web locale (es. Live Server, Apache, Nginx)
- Browser moderno (Chrome, Firefox, Safari, Edge)

### Installazione
1. Clona il repository
2. Avvia un server web locale nella root del progetto
3. Apri `http://localhost:8000` nel browser

### Configurazione
Modifica `assets/js/config.js` per personalizzare:
- Endpoint API Google Sheets
- Configurazione WhatsApp
- Costi e soglie spedizione
- Impostazioni UI

## 📊 Gestione Prodotti

### Catalogo Google Sheets
Il catalogo prodotti viene gestito tramite Google Sheets. Le colonne richieste sono:

| Colonna | Descrizione | Obbligatoria |
|---------|-------------|--------------|
| ID | Identificativo unico prodotto | ✅ |
| Nome | Nome in italiano | ✅ |
| Nome_EN | Nome in inglese | ❌ |
| Nome_DE | Nome in tedesco | ❌ |
| Nome_HU | Nome in ungherese | ❌ |
| Categoria | Categoria principale | ✅ |
| Prezzo | Prezzo in euro | ✅ |
| Immagine | URL immagine prodotto | ✅ |
| Stock | Quantità disponibile | ❌ |
| Disponibile | SI/NO | ✅ |
| Evidenza | SI/NO per prodotti in evidenza | ❌ |
| Unità | Unità di misura (pz, gr, ml) | ❌ |
| Descrizione | Descrizione prodotto | ❌ |

### Aggiornamento Catalogo
1. Modifica il file Google Sheets
2. Il sito si aggiorna automaticamente
3. Cache di 30 minuti per performance

## 🌐 Internazionalizzazione

### Aggiungere Nuove Lingue
1. Aggiungi traduzioni in `assets/i18n/translations.json`
2. Aggiungi opzione nel selettore lingua HTML
3. Aggiorna bandiere e nomi lingua in `assets/js/i18n.js`

### Traduzioni Dynamic
Usa l'attributo `data-i18n` negli elementi HTML:

```html
<h1 data-i18n="hero.title">Titolo di default</h1>
```

Nel JavaScript:
```javascript
const title = i18n.translate('hero.title');
```

## 🎨 Personalizzazione Design

### Colori Brand
Modifica le variabili CSS in `design-system.css`:

```css
:root {
    --gizzi-deep: #1b4332;      // Verde principale
    --gizzi-gold: #b08d57;      // Oro accent
    // ... altre variabili
}
```

### Tipografia
La piattaforma utilizza:
- **Fraunces**: Display serif per titoli
- **Montserrat**: Sans-serif per body text

### Tema Personalizzato
Aggiungi un nuovo tema modificando le variabili dark theme:

```css
[data-theme="custom"] {
    --bg-primary: #your-color;
    // ... altre variabili
}
```

## 📈 Performance Optimization

### Lazy Loading
Le immagini vengono caricate solo quando diventano visibili:

```html
<img src="placeholder.jpg" data-src="real-image.jpg" 
     loading="lazy" class="lazy-load">
```

### CSS Critical
Stili above-the-fold inline per rendering rapido.

### Cache Strategy
- **Prodotti**: 30 minuti
- **Tema/Lingua**: Persistenza localStorage
- **Carrello**: Persistenza localStorage

## 🔒 Sicurezza & Privacy

### GDPR Compliance
- Banner cookie personalizzabile
- Consenso esplicito richiesto
- Gestione preferenze privacy

### Best Practices
- Sanitizzazione input form
- Validazione lato client
- HTTPS obbligatorio in produzione
- Headers security ottimizzati

## 📱 Responsive Breakpoints

```css
--breakpoint-sm: 640px;   // Mobile
--breakpoint-md: 768px;   // Tablet
--breakpoint-lg: 1024px;  // Desktop
--breakpoint-xl: 1280px;  // Large Desktop
```

## 🛠️ Sviluppo

### Moduli JavaScript
Ogni modulo è indipendente e riutilizzabile:

1. **Config.js**: Variabili globali e API endpoints
2. **I18n.js**: Sistema di traduzioni
3. **Products.js**: Gestione catalogo prodotti
4. **Cart.js**: Logica carrello e checkout
5. **UI.js**: Gestione interfaccia utente

### Event System
I moduli comunicano tramite eventi personalizzati:

```javascript
// Cart change event
document.addEventListener('cartChange', (e) => {
    // Handle cart update
});

// Language change event  
document.addEventListener('languageChange', (e) => {
    // Handle language update
});
```

## 📊 Analytics & Monitoring

### Google Analytics Integration
```javascript
// Track events
gtag('event', 'add_to_cart', {
    // Event data
});
```

### Performance Metrics
- Page load time monitoring
- Interaction tracking
- Error logging

## 🚀 Deployment

### Preparazione Produzione
1. Minifica CSS e JavaScript
2. Ottimizza immagini (WebP, AVIF)
3. Abilita Gzip compression
4. Configura CDN
5. Imposta HTTPS

### Checklist SEO
- [ ] Meta tag compilati
- [ ] Sitemap.xml generato
- [ ] Robots.txt configurato
- [ ] Schema markup implementato
- [ ] Open Graph ottimizzato
- [ ] Test velocità superato

## 🔧 Troubleshooting

### Problemi Comuni

**Catalogo non carica**
- Verifica URL Google Sheets
- Controlla permessi condivisione
- Svuota cache browser

**Traduzioni mancanti**
- Controlla sintassi JSON
- Verifica attributi data-i18n
- Ricarica pagina

**Carrello non persiste**
- Controlla localStorage permissions
- Verifica browser settings
- Pulisci storage dati

## 📞 Supporto

Per supporto tecnico o richieste:
- Email: info@gruppogizzi.it
- WhatsApp: +39 366 754 0018

## 📄 Licenza

© 2026 Gruppo Gizzi. Tutti i diritti riservati.

---

*Piattaforma sviluppata con ❤️ per l'eccellenza del Cilento*