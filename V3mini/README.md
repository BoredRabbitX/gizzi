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
├── README.md               # This file
├── LICENSE                 # MIT License
├── js/
│   ├── config.js           # Configuration settings
│   ├── state.js            # Global state management
│   ├── translations.js     # UI translations
│   ├── utils.js            # Utility functions
│   ├── products.js         # Product catalog management
│   ├── cart.js             # Shopping cart functionality
│   ├── language.js         # Language/i18n management
│   ├── ui.js               # UI components (Toast, Loader, Theme, etc.)
│   ├── router.js           # SPA router
│   ├── render.js           # DOM rendering utilities
│   ├── search.js           # Product search functionality
│   ├── app.js              # Main application controller
│   └── checkout.js         # Checkout process
├── locales/
│   ├── it.json             # Italian translations
│   ├── en.json             # English translations
│   ├── de.json             # German translations
│   └── hu.json             # Hungarian translations
├── pages/                  # HTML page templates
│   ├── contatti.html       # Italian contact page
│   ├── contact.html        # English contact page
│   ├── spedizioni.html     # Italian shipping page
│   ├── shipping.html       # English shipping page
│   ├── resi.html           # Italian returns page
│   ├── returns.html        # English returns page
│   ├── faq.html            # Italian FAQ page
│   └── faq-en.html         # English FAQ page
└── web3/                   # Web3 integration (future)
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
