/**
 * Traduzioni multilingua (IT, EN, DE, HU)
 */

const TRANSLATIONS = {
    it: {
        meta: { code: "it", name: "Italiano", flag: "🇮🇹" },
        hero: {
            h1: "L'Oro del Cilento,<br>a casa tua.",
            p: "Eccellenza gastronomica dal cuore del Parco Nazionale. Prodotti autentici, tradizione e sapore.",
            badge: "✨ Qualità Cilentana",
            cta: "Scopri i Prodotti"
        },
        nav: {
            shipping: "Spedizione Gratuita per ordini oltre €120",
            searchPlaceholder: "Cerca olio, pasta, vino..."
        },
        products: {
            deals: "Offerte del Momento",
            all: "Tutti i Prodotti",
            byCat: "Per Categoria",
            viewAll: "Vedi tutti",
            add: "Aggiungi",
            added: "Aggiunto!",
            out: "Esaurito",
            low: "Ultimi pezzi!",
            ok: "Disponibile",
            noResults: "Nessun prodotto trovato",
            tryAgain: "Prova con altre parole chiave"
        },
        cart: {
            title: "🛒 Il Tuo Carrello",
            empty: "Il tuo carrello è vuoto",
            emptyDesc: "Esplora i nostri prodotti e trova qualcosa di speciale!",
            clear: "Svuota Carrello",
            shipping: "Spedizione",
            freeShipping: "GRATIS",
            total: "Totale",
            checkout: "Prosegui all'Ordine"
        },
        checkout: {
            title: "Dati di Spedizione",
            subtitle: "Inserisci i tuoi dati per completare l'ordine",
            name: "Nome e Cognome",
            namePlaceholder: "Mario Rossi",
            email: "Email",
            emailPlaceholder: "mario@email.com",
            phone: "Telefono",
            phonePlaceholder: "+39 333 1234567",
            address: "Indirizzo completo",
            addressPlaceholder: "Via Roma 1, 00100 Roma",
            addressHint: "Via, numero civico, CAP e città",
            destination: "Destinazione",
            italy: "🇮🇹 Italia",
            europe: "🇪🇺 Europa (UE)",
            confirm: "Conferma Ordine"
        },
        thanks: {
            title: "Grazie!",
            message: "Il tuo ordine è stato inviato con successo.",
            contact: "Ti contatteremo presto via WhatsApp.",
            back: "Torna al Sito"
        },
        toast: {
            cartAdd: "Aggiunto al carrello",
            cartRemove: "Rimosso dal carrello",
            cartEmpty: "Carrello svuotato",
            maxStock: "Quantità massima raggiunta",
            maxStockDesc: "Non puoi aggiungere altri pezzi di questo prodotto",
            searchResults: "risultati trovati"
        },
        confirm: {
            emptyTitle: "Svuotare il carrello?",
            emptyMsg: "Tutti i prodotti verranno rimossi dal carrello.",
            removeTitle: "Rimuovere prodotto?",
            cancel: "Annulla",
            ok: "Conferma",
            delete: "Rimuovi"
        },
        errors: {
            empty: "Carrello vuoto",
            emptyDesc: "Aggiungi qualche prodotto prima di procedere",
            form: "Compila tutti i campi",
            formDesc: "Alcuni campi obbligatori sono vuoti",
            email: "Email non valida",
            emailDesc: "Controlla il formato dell'email",
            load: "Errore di caricamento",
            loadDesc: "Impossibile caricare i prodotti. Ricarica la pagina."
        },
        loading: {
            text: "Caricamento...",
            products: "Preparando i migliori prodotti del Cilento..."
        },
        gdpr: {
            title: "Privacy & Cookie Policy",
            message: "Utilizziamo cookie per offrirti la migliore esperienza.",
            accept: "Accetta Tutto",
            decline: "Rifiuta"
        },
        footer: {
            about: "Eccellenze gastronomiche dal Parco Nazionale del Cilento.",
            tradition: "Tradizione dal 1980",
            categories: "Categorie",
            catOil: "Olio d'Oliva",
            catConserves: "Conserve",
            catPasta: "Pasta Artigianale",
            catWine: "Vini Locali",
            support: "Assistenza",
            contact: "Contattaci",
            shippingInfo: "Spedizioni",
            returns: "Resi e Rimborsi",
            faq: "FAQ",
            contactTitle: "Contatti"
        }
    },
    en: {
        meta: { code: "en", name: "English", flag: "🇬🇧" },
        hero: {
            h1: "Cilento's Gold,<br>at your home.",
            p: "Gastronomic excellence from the National Park. Authentic products, tradition and flavor.",
            badge: "✨ Cilento Quality",
            cta: "Shop Now"
        },
        nav: {
            shipping: "FREE Shipping on orders over €120",
            searchPlaceholder: "Search olive oil, pasta, wine..."
        },
        products: {
            deals: "Today's Deals",
            all: "All Products",
            byCat: "By Category",
            viewAll: "View all",
            add: "Add to Cart",
            added: "Added!",
            out: "Out of Stock",
            low: "Last pieces!",
            ok: "In Stock",
            noResults: "No products found",
            tryAgain: "Try different keywords"
        },
        cart: {
            title: "🛒 Your Cart",
            empty: "Your cart is empty",
            emptyDesc: "Explore our products and find something special!",
            clear: "Empty Cart",
            shipping: "Shipping",
            freeShipping: "FREE",
            total: "Total",
            checkout: "Proceed to Checkout"
        },
        checkout: {
            title: "Shipping Details",
            subtitle: "Enter your details to complete the order",
            name: "Full Name",
            namePlaceholder: "John Doe",
            email: "Email",
            emailPlaceholder: "john@email.com",
            phone: "Phone",
            phonePlaceholder: "+39 333 1234567",
            address: "Full Address",
            addressPlaceholder: "123 Main St, 00100 Rome",
            addressHint: "Street, number, ZIP and city",
            destination: "Destination",
            italy: "🇮🇹 Italy",
            europe: "🇪🇺 Europe (EU)",
            confirm: "Confirm Order"
        },
        thanks: {
            title: "Thank You!",
            message: "Your order has been sent successfully.",
            contact: "We'll contact you soon via WhatsApp.",
            back: "Back to Shop"
        },
        toast: {
            cartAdd: "Added to cart",
            cartRemove: "Removed from cart",
            cartEmpty: "Cart emptied",
            maxStock: "Maximum quantity reached",
            maxStockDesc: "Cannot add more of this product",
            searchResults: "results found"
        },
        confirm: {
            emptyTitle: "Empty cart?",
            emptyMsg: "All products will be removed from the cart.",
            removeTitle: "Remove product?",
            cancel: "Cancel",
            ok: "Confirm",
            delete: "Remove"
        },
        errors: {
            empty: "Empty cart",
            emptyDesc: "Add some products before proceeding",
            form: "Fill all fields",
            formDesc: "Some required fields are empty",
            email: "Invalid email",
            emailDesc: "Check the email format",
            load: "Loading error",
            loadDesc: "Unable to load products. Reload the page."
        },
        loading: {
            text: "Loading...",
            products: "Preparing the best products from Cilento..."
        },
        gdpr: {
            title: "Privacy & Cookie Policy",
            message: "We use cookies to offer you the best experience.",
            accept: "Accept All",
            decline: "Decline"
        },
        footer: {
            about: "Gastronomic excellence from Cilento National Park.",
            tradition: "Tradition since 1980",
            categories: "Categories",
            catOil: "Olive Oil",
            catConserves: "Preserves",
            catPasta: "Artisan Pasta",
            catWine: "Local Wines",
            support: "Support",
            contact: "Contact Us",
            shippingInfo: "Shipping",
            returns: "Returns & Refunds",
            faq: "FAQ",
            contactTitle: "Contact"
        }
    },
    de: {
        meta: { code: "de", name: "Deutsch", flag: "🇩🇪" },
        hero: {
            h1: "Cilento Gold,<br>zu Ihnen nach Hause.",
            p: "Kulinarische Exzellenz aus dem Nationalpark. Authentische Produkte, Tradition und Geschmack.",
            badge: "✨ Cilento Qualität",
            cta: "Jetzt Kaufen"
        },
        nav: {
            shipping: "KOSTENLOSER Versand ab €120",
            searchPlaceholder: "Suche Olivenöl, Pasta, Wein..."
        },
        products: {
            deals: "Aktuelle Angebote",
            all: "Alle Produkte",
            byCat: "Nach Kategorie",
            viewAll: "Alle anzeigen",
            add: "In den Warenkorb",
            added: "Hinzugefügt!",
            out: "Ausverkauft",
            low: "Letzte Stücke!",
            ok: "Verfügbar",
            noResults: "Keine Produkte gefunden",
            tryAgain: "Versuchen Sie andere Suchbegriffe"
        },
        cart: {
            title: "🛒 Ihr Warenkorb",
            empty: "Ihr Warenkorb ist leer",
            emptyDesc: "Entdecken Sie unsere Produkte!",
            clear: "Warenkorb leeren",
            shipping: "Versand",
            freeShipping: "KOSTENLOS",
            total: "Gesamt",
            checkout: "Zur Kasse"
        },
        checkout: {
            title: "Versanddetails",
            subtitle: "Geben Sie Ihre Daten ein",
            name: "Vollständiger Name",
            namePlaceholder: "Max Mustermann",
            email: "E-Mail",
            emailPlaceholder: "max@email.com",
            phone: "Telefon",
            phonePlaceholder: "+49 123 4567890",
            address: "Vollständige Adresse",
            addressPlaceholder: "Hauptstraße 1, 10115 Berlin",
            addressHint: "Straße, Hausnummer, PLZ und Stadt",
            destination: "Ziel",
            italy: "🇮🇹 Italien",
            europe: "🇪🇺 Europa (EU)",
            confirm: "Bestellung bestätigen"
        },
        thanks: {
            title: "Vielen Dank!",
            message: "Ihre Bestellung wurde erfolgreich gesendet.",
            contact: "Wir kontaktieren Sie bald per WhatsApp.",
            back: "Zurück zum Shop"
        },
        toast: {
            cartAdd: "Zum Warenkorb hinzugefügt",
            cartRemove: "Aus Warenkorb entfernt",
            cartEmpty: "Warenkorb geleert",
            maxStock: "Maximale Menge erreicht",
            maxStockDesc: "Keine weiteren Stücke verfügbar",
            searchResults: "Ergebnisse gefunden"
        },
        confirm: {
            emptyTitle: "Warenkorb leeren?",
            emptyMsg: "Alle Produkte werden entfernt.",
            removeTitle: "Produkt entfernen?",
            cancel: "Abbrechen",
            ok: "Bestätigen",
            delete: "Entfernen"
        },
        errors: {
            empty: "Warenkorb leer",
            emptyDesc: "Fügen Sie Produkte hinzu",
            form: "Alle Felder ausfüllen",
            formDesc: "Einige Pflichtfelder sind leer",
            email: "Ungültige E-Mail",
            emailDesc: "Überprüfen Sie das E-Mail-Format",
            load: "Ladefehler",
            loadDesc: "Produkte konnten nicht geladen werden."
        },
        loading: {
            text: "Laden...",
            products: "Die besten Produkte werden vorbereitet..."
        },
        gdpr: {
            title: "Datenschutz & Cookie-Richtlinie",
            message: "Wir verwenden Cookies für die beste Erfahrung.",
            accept: "Alle akzeptieren",
            decline: "Ablehnen"
        },
        footer: {
            about: "Kulinarische Exzellenz aus dem Nationalpark Cilento.",
            tradition: "Tradition seit 1980",
            categories: "Kategorien",
            catOil: "Olivenöl",
            catConserves: "Konserven",
            catPasta: "Handgemachte Pasta",
            catWine: "Lokale Weine",
            support: "Hilfe",
            contact: "Kontakt",
            shippingInfo: "Versand",
            returns: "Rückgabe",
            faq: "FAQ",
            contactTitle: "Kontakt"
        }
    },
    hu: {
        meta: { code: "hu", name: "Magyar", flag: "🇭🇺" },
        hero: {
            h1: "Cilento Aranya,<br>az otthonába.",
            p: "Gasztronómiai kiválóság a Nemzeti Parkból. Autentikus termékek, hagyomány és íz.",
            badge: "✨ Cilento Minőség",
            cta: "Vásárlás Most"
        },
        nav: {
            shipping: "INGYENES szállítás €120 felett",
            searchPlaceholder: "Keresés olívaolaj, tészta, bor..."
        },
        products: {
            deals: "Mai Akciók",
            all: "Összes Termék",
            byCat: "Kategóriák",
            viewAll: "Összes",
            add: "Kosárba",
            added: "Hozzáadva!",
            out: "Elfogyott",
            low: "Utolsó darabok!",
            ok: "Raktáron",
            noResults: "Nincs találat",
            tryAgain: "Próbáljon más kulcsszavakat"
        },
        cart: {
            title: "🛒 Az Ön Kosara",
            empty: "A kosár üres",
            emptyDesc: "Fedezze fel termékeinket!",
            clear: "Kosár ürítése",
            shipping: "Szállítás",
            freeShipping: "INGYENES",
            total: "Összesen",
            checkout: "Tovább a fizetéshez"
        },
        checkout: {
            title: "Szállítási adatok",
            subtitle: "Adja meg adatait",
            name: "Teljes név",
            namePlaceholder: "Kovács János",
            email: "E-mail",
            emailPlaceholder: "janos@email.com",
            phone: "Telefon",
            phonePlaceholder: "+36 30 123 4567",
            address: "Teljes cím",
            addressPlaceholder: "Fő utca 1, 1000 Budapest",
            addressHint: "Utca, házszám, irányítószám",
            destination: "Cél",
            italy: "🇮🇹 Olaszország",
            europe: "🇪🇺 Európa (EU)",
            confirm: "Rendelés megerősítése"
        },
        thanks: {
            title: "Köszönjük!",
            message: "Rendelését sikeresen elküldtük.",
            contact: "Hamarosan felvesszük a kapcsolatot.",
            back: "Vissza a boltba"
        },
        toast: {
            cartAdd: "Kosárba helyezve",
            cartRemove: "Eltávolítva",
            cartEmpty: "Kosár kiürítve",
            maxStock: "Maximális mennyiség",
            maxStockDesc: "Nem adható hozzá több",
            searchResults: "találat"
        },
        confirm: {
            emptyTitle: "Kosár ürítése?",
            emptyMsg: "Minden termék törlésre kerül.",
            removeTitle: "Termék eltávolítása?",
            cancel: "Mégse",
            ok: "Megerősítés",
            delete: "Eltávolítás"
        },
        errors: {
            empty: "Üres kosár",
            emptyDesc: "Adjon hozzá termékeket",
            form: "Töltse ki az összes mezőt",
            formDesc: "Néhány mező üres",
            email: "Érvénytelen e-mail",
            emailDesc: "Ellenőrizze a formátumot",
            load: "Betöltési hiba",
            loadDesc: "Nem sikerült betölteni."
        },
        loading: {
            text: "Betöltés...",
            products: "A legjobb termékek előkészítése..."
        },
        gdpr: {
            title: "Adatvédelem és Cookie",
            message: "Cookie-kat használunk a legjobb élményért.",
            accept: "Elfogadás",
            decline: "Elutasítás"
        },
        footer: {
            about: "Gasztronómiai kiválóság a Cilento Nemzeti Parkból.",
            tradition: "Hagyomány 1980 óta",
            categories: "Kategóriák",
            catOil: "Olívaolaj",
            catConserves: "Konzervek",
            catPasta: "Kézműves tészta",
            catWine: "Helyi borok",
            support: "Támogatás",
            contact: "Kapcsolat",
            shippingInfo: "Szállítás",
            returns: "Visszaküldés",
            faq: "GYIK",
            contactTitle: "Elérhetőség"
        }
    }
};

// Esporta per l'uso in altri moduli
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TRANSLATIONS };
}
