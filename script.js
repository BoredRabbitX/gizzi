function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  if (data.action === "newOrder") {
    var sheet = ss.getSheetByName("Ordini");
    sheet.appendRow([
      data.orderID, 
      new Date(), 
      data.customerName, 
      data.customerEmail, 
      data.customerPhone, 
      data.customerAddress, 
      data.items, 
      data.total, 
      data.paymentMethod, 
      "Ricevuto"
    ]);
    
    // Salva anche nel database clienti se non esiste
    var clientSheet = ss.getSheetByName("Clienti");
    clientSheet.appendRow([
      "CL-" + Math.floor(Math.random()*1000), 
      data.customerName, 
      data.customerEmail, 
      data.customerPhone, 
      data.customerAddress, 
      new Date(), 
      data.notes
    ]);
  }
  
  return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
}
