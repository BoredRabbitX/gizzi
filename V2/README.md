# Gruppo Gizzi - V2 Professional

Versione completamente ridisegnata del sito e-commerce con design professionale e sobrio.

## 📁 Struttura Cartelle

```
V2/
├── index.html              # HTML principale con SEO e accessibilità
├── assets/
│   ├── css/
│   │   └── style.css       # CSS professionale con design system
│   ├── js/
│   │   └── script.js       # JavaScript modulare e ottimizzato
│   └── img/                # Immagini del sito
├── package.json            # Configurazione progetto
├── .gitignore             # Git ignore
└── README.md              # Documentazione
```

## 🎨 Design System

### Palette Colori
- **Primary**: #0f2d1f - Verde foresta profondo
- **Secondary**: #8b7355 - Bronzo elegante
- **Accent**: #c9a876 - Oro naturale
- **Success**: #1e5631 - Verde conferma
- **Warning**: #d4a574 - Sabbia avviso
- **Danger**: #8b3a3a - Rosso sobrio
- **Background**: #fafafa - Bianco caldo
- **Text**: #2d2d2d - Grigio scuro

### Dark Mode
Palette adattata per leggibilità ottimale in modalità scura.

### Tipografia
- **Display**: Fraunces (serif)
- **Body**: Montserrat (sans-serif)

### Spacing System
- xs: 8px, sm: 16px, md: 24px, lg: 32px, xl: 48px, 2xl: 64px

### Border Radius
- sm: 4px, md: 6px, lg: 8px

## ✨ Caratteristiche Professionali

### Design Minimalista
- Animazioni sottili e ridotte
- Transizioni fluide (0.2-0.3s)
- Ombreggiature eleganti e non invasive
- Bordi sottili e discreti
- Spaziature generose

### UI/UX
- Card prodotti pulite e leggibili
- Navigazione intuitiva
- Feedback visivo immediato
- Form con validazione elegante
- Toast notifications professionali
- Loading spinner minimalista

### Responsive Design
- Mobile-first approach
- Breakpoint intelligenti
- Ottimizzato per touch
- Adattamento seamless

## 🌍 Multilingua

Lingue supportate con traduzioni complete:
- 🇮🇹 Italiano (default)
- 🇬🇧 English
- 🇩🇪 Deutsch
- 🇭🇺 Magyar

## 🔧 Configurazione

### Variabili Environment
```javascript
const CONFIG = {
    catalog: "URL_TUO_SPREADSHEET",
    formURL: "URL_TUO_GOOGLE_FORM",
    whatsapp: "NUMERO_WHATSAPP",
    cartKey: 'gizzi_cart',
    themeKey: 'gizzi_theme',
    langKey: 'gizzi_lang'
};
```

### Personalizzazione CSS
Modifica le variabili in `assets/css/style.css`:
```css
:root {
    --color-primary: #0f2d1f;
    --color-secondary: #8b7355;
    --color-accent: #c9a876;
    /* ... altre variabili */
}
```

## 📝 Modifiche Implementate

### Design Overhaul
- [x] Palette colori elegante e professionale
- [x] Rimozione elementi giocosi
- [x] Animazioni ridotte al minimo
- [x] Card minimaliste e clean
- [x] Header e footer professionali
- [x] Typography raffinata

### UX Migliorata
- [x] Toast notifications senza emoji
- [x] Loading spinner professionale
- [x] Feedback visivo elegante
- [x] Navigazione fluida
- [x] Form con validazione chiara

### Accessibilità
- [x] ARIA labels completi
- [x] Navigazione tastiera
- [x] Contrast ratios WCAG AA
- [x] Supporto screen reader
- [x] Focus indicators

### SEO
- [x] Meta tag completi
- [x] Schema.org markup
- [x] Open Graph tags
- [x] Semantic HTML
- [x] Optimized images

### Performance
- [x] CSS ottimizzato
- [x] JavaScript modulare
- [x] Lazy loading immagini
- [x] Transizioni GPU accelerated
- [x] Minimal external dependencies

## 🚀 Deploy

### Semplice
Carica i file nella root del tuo hosting.

### Con Build Tool
```bash
npm install
npm start
```

## 📊 Performance Targets

- Lighthouse Performance: 95+
- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- Cumulative Layout Shift: < 0.1

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## ♿ Accessibilità

Conformità WCAG 2.1 Level AA:
- Contrast ratio 4.5:1
- Keyboard navigation
- Screen reader friendly
- Reduced motion support
- Focus visible

## 🐛 Troubleshooting

### Caricamento lento
- Verifica connessione catalogo CSV
- Ottimizza dimensioni immagini
- Considera CDN per assets

### Dark mode non funziona
- Verifica localStorage abilitato
- Controlla browser settings

### Traduzioni mancanti
- Verifica oggetto UI in script.js
- Assicurati che le chiavi corrispondano

## 📞 Supporto

Per assistenza tecnica o domande:
- Consulta la documentazione
- Apri issue su repository
- Contatta il team di sviluppo

## 📄 Licenza

© 2026 Gruppo Gizzi. Tutti i diritti riservati.

## 🔄 Roadmap

### Futuro
- [ ] Pagina prodotto dettagliata
- [ ] Filtri avanzati
- [ ] Wishlist/Favorites
- [ ] Recensioni prodotti
- [ ] Blog sezione
- [ ] Newsletter signup
- [ ] Integrazione pagamento online

---

**Versione**: 2.0.0  
**Ultimo aggiornamento**: Gennaio 2026  
**Status**: Production Ready