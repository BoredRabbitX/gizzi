// MVP config for V2.1 Walmart-style site
window.CONFIG = {
  catalog: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRIumwZulbMAuesmG69DB8Y1bx2Y-NQXfyG7_m1-rdpZ-SoOxM0JyZtnj0_eV_K4t4drULTwV44nE5Y/pub?gid=0&single=true&output=csv',
  formURL: 'https://docs.google.com/forms/d/e/1FAIpQLSend7KPNCjTNP1d-B3zd-wvhZAVXLS3P7341yN88fm3d7D4Jw/formResponse',
};

// Fallback locale for offline tests
window.LOCAL_PRODUCTS = [
  { id:'p1', name:'Pecorino Cilento', category:'Latte & Formaggi', price:9.99, stockNum:12, image:'' },
  { id:'p2', name:'Salame Cilento', category:'Salumi', price:14.5, stockNum:5, image:'' },
  { id:'p3', name:'Olio d\'oliva', category:'Olio', price:12.0, stockNum:20, image:'' }
];
