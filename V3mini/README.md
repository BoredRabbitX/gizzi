# Gruppo Gizzi - E-commerce Platform

A modern, multi-language e-commerce website for Gruppo Gizzi, featuring products from the Cilento region of Italy including olive oil, artisan pasta, local wines, and typical products.

## Features

- 🛒 Full e-commerce functionality with shopping cart
- 🌐 Multi-language support (Italian, English, German, Hungarian)
- 📱 Responsive design for mobile and desktop
- 🔍 Product search and category filtering
- 🏷️ Dynamic product pricing and availability
- 🚚 Shipping and returns information pages
- 💬 Contact form with form validation
- 🎨 Custom theming (light/dark mode)
- 📦 Offline-capable page content

## Tech Stack

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Architecture**: Single Page Application (SPA) with hash-based routing
- **Data Source**: Google Sheets CSV (products catalog)
- **Storage**: localStorage for cart persistence

## Project Structure

```
V3mini/
├── index.html              # Main entry point
├── style.css               # Main stylesheet
├── script.js               # Unified script (for compatibility)
├── README.md               # This file
├── LICENSE                 # MIT License
├── js/                     # Modular JavaScript files
│   ├── app.js              # Main application controller and global functions
│   ├── config.js           # Configuration settings (catalog URL, WhatsApp, etc.)
│   ├── state.js            # Global state management (products, cart, language, etc.)
│   ├── translations.js     # UI translations (4 languages: IT, EN, DE, HU)
│   ├── utils.js            # Utility functions (shuffle, debounce, formatPrice, etc.)
│   ├── products.js         # Product catalog management (loading, filtering, cards)
│   ├── cart.js             # Shopping cart functionality (add, remove, update, save)
│   ├── language.js         # Language/i18n management and UI updates
│   ├── ui.js               # UI components (Toast, Confirm, Loader, Theme, GDPR)
│   ├── router.js           # SPA router with hash-based navigation
│   ├── render.js           # DOM rendering (products grid, carousel, categories)
│   ├── search.js           # Product search functionality
│   └── checkout.js         # Checkout process and form validation
├── locales/                # JSON translation files
│   ├── it.json             # Italian translations
│   ├── en.json             # English translations
│   ├── de.json             # German translations
│   └── hu.json             # Hungarian translations
└── pages/                  # HTML page templates (legacy, inline content preferred)
```

## JavaScript Architecture

### Module Structure

The JavaScript code is organized into modular files following a dependency order:

1. **Config & Data** → 2. **State & Utils** → 3. **Translations** → 4. **Core Modules** → 5. **UI Components** → 6. **Business Logic** → 7. **App Controller**

### Dependency Order (as loaded in index.html)

```html
<script src="js/config.js"></script>       <!-- CONFIG: app settings -->
<script src="js/state.js"></script>         <!-- state: global state -->
<script src="js/translations.js"></script>  <!-- TRANSLATIONS: i18n data -->
<script src="js/utils.js"></script>         <!-- Utils: helper functions -->
<script src="js/products.js"></script>      <!-- Products: catalog logic -->
<script src="js/cart.js"></script>          <!-- Cart: shopping cart -->
<script src="js/language.js"></script>      <!-- Language: i18n system -->
<script src="js/ui.js"></script>            <!-- UI: components -->
<script src="js/router.js"></script>        <!-- Router: SPA navigation -->
<script src="js/render.js"></script>        <!-- Render: DOM rendering -->
<script src="js/search.js"></script>        <!-- Search: search functionality -->
<script src="js/app.js"></script>           <!-- App: main controller + init -->
<script src="js/checkout.js"></script>      <!-- Checkout: order processing -->
```

### Global State Pattern

The application uses a global `state` object for centralized data management:

```javascript
// js/state.js
const state = {
    products: [],          // Loaded product catalog
    cart: [],              // Shopping cart items
    lang: 'it',            // Current language
    view: 'all',           // Current view mode
    carouselIndex: 0,      // Carousel position
    searchQuery: '',       // Active search term
    isLoading: true,       // Loading state
    confirmCallback: null, // Modal callback
    currentCategories: []  // Filtered categories
};
```

### Translation System

Translations use a nested key system with fallback:

```javascript
// Access translations via t() function
t('hero.h1')           // Returns: "L'Oro del Cilento,<br>a casa tua."
t('cart.empty')        // Returns: "Il tuo carrello è vuoto"
t('products.deals')    // Returns: "Offerte del Momento"

// Fallback handling: missing keys return the key itself or fallback value
t('missing.key', 'Fallback text')
```

### Adding New Modules

When adding new JavaScript modules, follow these conventions:

1. **Define the module object** at the top level
2. **Include JSDoc comments** for all methods
3. **Use dependencies correctly** (order matters!)
4. **Export for Node.js** if needed:

```javascript
// js/new-module.js

const NewModule = {
    /**
     * Method description
     * @param {string} param - Parameter description
     * @returns {string} - Return value description
     */
    methodName(param) {
        // Method implementation
        return result;
    }
};

// Export for Node.js (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NewModule };
}
```

### Global Functions

Some functions are exposed globally for HTML onclick handlers:

```javascript
// Defined in js/app.js
function toggleTheme() { Theme.toggle(); }
function toggleCart() { Cart.toggle(); }
function updateLang(lang) { Language.update(lang); }
function openCheckout() { Checkout.open(); }
// ... and more in js/app.js
```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (recommended) or open `index.html` directly

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/gizzi.git
cd gizzi/V3mini
```

2. For best results, use a local web server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js with http-server
npx http-server

# Using PHP
php -S localhost:8000
```

3. Open your browser and navigate to `http://localhost:8000`

### Configuration

Edit `js/config.js` to configure:
- Google Sheets CSV URL for products
- Supported languages
- Default language
- Currency settings

## Usage

### Browsing Products

- Use the category navigation to filter products
- Search products using the search bar
- Click on products to view details

### Shopping Cart

- Add products to cart by clicking the cart icon
- Adjust quantities in the cart panel
- Remove items individually
- Proceed to checkout

### Language Selection

- Use the language selector in the header
- Supported languages: Italian, English, German, Hungarian

### Pages

- **Home**: Featured products and deals
- **Contact**: Contact form and information
- **Shipping**: Shipping rates and delivery times
- **Returns**: Returns policy and procedures
- **FAQ**: Frequently asked questions

## Customization

### Adding New Products

1. Update the Google Sheets CSV with new products
2. Ensure columns: ID, Nome, Nome_EN, Descrizione, Descrizione_EN, Prezzo, Categoria, Categoria_EN, Immagine, StockNum, Unità, Evidenza

### Adding New Languages

1. Add the language to `CONFIG.supportedLanguages` in `js/config.js`
2. Create a new translation file in `locales/` (e.g., `fr.json`)
3. Add page content mappings in `js/router.js`

### Theming

Edit CSS custom properties in `style.css`:
```css
:root {
    --gizzi-deep: #1a3a2f;
    --gizzi-gold: #b08d55;
    --light-green: #e8f0e8;
}
```

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Google Sheets](https://www.google.com/sheets) - Product data management
- [Font Awesome](https://fontawesome.com) - Icons
- [Google Fonts](https://fonts.google.com) - Inter font
