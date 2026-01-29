/**
 * Configurazione globale dell'applicazione
 */

const CONFIG = {
    catalog: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRIumwZulbMAuesmG69DB8Y1bx2Y-NQXfyG7_m1-rdpZ-SoOxM0JyZtnj0_eV_K4t4drULTwV44nE5Y/pub?gid=0&single=true&output=csv",
    formURL: "https://docs.google.com/forms/d/e/1FAIpQLSend7KPNCjTNP1d-B3zd-wvhZAVXLS3P7341yN88fm3d7D4Jw/formResponse",
    wa: "393667540018",
    loadingTimeout: 8000,
    supportedLanguages: ['it', 'en', 'de', 'hu'],
    defaultLanguage: 'it'
};

// Esporta per l'uso in altri moduli
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG };
}
