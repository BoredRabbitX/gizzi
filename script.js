const WA_NUMBER = "393358060715";
const ADMIN_EMAIL = "torre.michele@gmail.com";
const CATALOGO_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR0aLcG9mPmNexSlEt-5MaNlpIPUF7LPvdlsJwDhoa_1PZfsvFbw9eQu4uBpsrqwTng9TrkqvxcoQRm/pub?gid=118341302&single=true&output=csv";

let cart = [];
let products = [];
let lang = 'it';

// Inizializza EmailJS (devi registrarti su emailjs.com e mettere il tuo ID)
(function() { emailjs.init("IL_TUO_USER_ID_EMAILJS"); })();

async function loadProducts() {
    const res = await fetch(CATALOGO_URL);
    const data = await res.text();
    products = parseCSV(data);
    renderProducts();
}

function parseCSV(text) {
    const rows = text.split('\n');
    const headers = rows[0].includes('\t') ? rows[0].split('\t') : rows[0].split(',');
    return rows.slice(1).map(row => {
        const cols = row.includes('\t') ? row.split('\t') : row.split(',');
        let obj = {};
        headers.forEach((h, i) => obj[h.trim()] = cols[i]?.trim());
        return obj;
    });
}

function renderProducts() {
    const grid = document.getElementById('shop-grid');
    grid.innerHTML = products.map(p => {
        const name = p[`Nome_${lang.toUpperCase()}`] || p.Nome;
        return `
            <div class="card">
                <img src="${p.Immagine}" alt="${name}">
                <h3>${name}</h3>
                <p style="padding: 0 15px;">€ ${p.Prezzo}</p>
                <button class="btn-add" onclick="addToCart('${p.ID}')">Add to Cart</button>
            </div>
        `;
    }).join('');
}

function addToCart(id) {
    const p = products.find(x => x.ID === id);
    cart.push(p);
    updateCart();
}

function updateCart() {
    document.getElementById('cart-count').innerText = cart.length;
    let total = 0;
    document.getElementById('cart-items').innerHTML = cart.map(item => {
        total += parseFloat(item.Prezzo);
        return `<div class="cart-item">${item.Nome} - € ${item.Prezzo}</div>`;
    }).join('');
    document.getElementById('cart-total').innerText = `Total: € ${total.toFixed(2)}`;
}

function toggleCart() { document.getElementById('cart-panel').classList.toggle('active'); }
function openCheckout() { document.getElementById('checkout-modal').style.display = 'flex'; }
function closeCheckout() { document.getElementById('checkout-modal').style.display = 'none'; }

async function processOrder(method) {
    const orderID = "GIZZI-" + Math.floor(Math.random() * 1000000);
    const total = cart.reduce((acc, curr) => acc + parseFloat(curr.Prezzo), 0).toFixed(2);
    const customer = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        phone: document.getElementById('phone').value,
        items: cart.map(i => i.Nome).join(", ")
    };

    if(!customer.name || !customer.email) return alert("Please fill details");

    // Invia Email a Michele Torre
    const templateParams = {
        order_id: orderID,
        to_email: ADMIN_EMAIL,
        from_name: customer.name,
        customer_email: customer.email,
        total: total,
        message: `Ordine da: ${customer.name}\nIndirizzo: ${customer.address}\nProdotti: ${customer.items}`
    };

    // Logica WhatsApp o Redirect Pagamento
    if(method === 'WhatsApp') {
        let msg = `Ordine ${orderID}\nTotale: € ${total}\nCliente: ${customer.name}\nProdotti: ${customer.items}`;
        window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`);
    } else {
        alert("Redirect to PayPal order " + orderID);
    }

    // Nota: Dovresti configurare EmailJS per attivare l'invio mail reale
    console.log("Ordine Inviato a Michele:", templateParams);
}

loadProducts();
