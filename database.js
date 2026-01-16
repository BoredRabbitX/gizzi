async function fetchCSV(url) {
    try {
        const response = await fetch(url);
        const text = await response.text();
        return parseCSV(text);
    } catch (e) {
        console.error("Errore caricamento URL:", url, e);
        return [];
    }
}

function parseCSV(text) {
    const lines = text.split(/\r?\n/).filter(l => l.trim() !== "");
    const separator = lines[0].includes('\t') ? '\t' : ',';
    const headers = lines[0].split(separator).map(h => h.trim());

    return lines.slice(1).map(line => {
        const cols = line.split(separator);
        let obj = {};
        headers.forEach((h, i) => obj[h] = cols[i] ? cols[i].trim() : "");
        return obj;
    });
}
