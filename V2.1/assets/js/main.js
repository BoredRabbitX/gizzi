(function(){
  // MVP baseline: data from LOCAL_PRODUCTS, remote catalog will override via fetch in Patch B
  const texts = { it: { heroTitle: "L'Oro del Cilento" , heroSubtitle: "Sapori autentici" }, en: { heroTitle: "Cilento Gold" , heroSubtitle: "Authentic flavors" } };
  const $ = (s)=> document.querySelector(s);
  let products = (window.LOCAL_PRODUCTS || []).slice();
  let cart = [];

  function renderProducts(){
    const grid = document.getElementById('products-grid');
    if(!grid) return;
    grid.innerHTML = products.map(p => `
      <div class="card">
        <div class="card-image image" style="height:120px;background:#ddd"></div>
        <div class="card-body">
          <div class="card-title">${p.name}</div>
          <div class="card-price">€ ${p.price}</div>
          <button class="btn" onclick="window.__patch__addToCart__('${p.id}')">Aggiungi</button>
        </div>
      </div>`
    ).join('');
  }

  // Extremely simple cart for MVP: global to keep quick testable
  window.__patch__addToCart__ = function(id){
    const p = products.find(x=>x.id===id);
    if(!p) return;
    const exists = cart.find(c=>c.id===id);
    if(exists) exists.qty += 1; else cart.push({ id, name: p.name, price: p.price, qty: 1 });
    renderCart();
  };

  function renderCart(){
    let items = '';
    cart.forEach(c => { items += `<div>${c.name} x${c.qty} - €${(c.qty*c.price).toFixed(2)}</div>`});
    $('#cart-items')?.innerHTML = items || '<div style="padding:12px;color:#666">Il carrello è vuoto</div>';
    const subtotal = cart.reduce((s,i)=>s+i.qty*i.price,0);
    $('#cart-total')?.innerHTML = `Totale: €${subtotal.toFixed(2)}`;
    $('#cart-count')?.textContent = cart.reduce((a,b)=>a+b.qty,0);
  }

  function checkGDPR(){ if(!localStorage.getItem('gizzi_gdpr')) $('#gdpr-banner')?.style && ($('#gdpr-banner').style.display='flex'); }
  document.addEventListener('DOMContentLoaded', ()=>{ renderProducts(); renderCart(); checkGDPR(); });

  // GDPR actions placeholder
  $('#gdpr-accept')?.addEventListener('click', ()=>{ localStorage.setItem('gizzi_gdpr','accepted'); $('#gdpr-banner')?.style && $('#gdpr-banner').style.display='none'; });
  $('#gdpr-reject')?.addEventListener('click', ()=>{ localStorage.setItem('gizzi_gdpr','declined'); $('#gdpr-banner')?.style && $('#gdpr-banner').style.display='none'; });
})();
