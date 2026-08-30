/**
 * CBT Online - Google Sheets Backend
 * Paste code ini di Extensions > Apps Script
 * Deploy as Web App: Execute as Me, Anyone can access
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Validasi
    if (!data.nis || !data.ujianId) {
      return ContentService.createTextOutput(JSON.stringify({result:"error", message:"nis/ujianId required"}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    var durasiMenit = Math.round((new Date(data.waktuSelesai) - new Date(data.waktuMulai)) / 60000);
    
    // Urutan kolom harus sama dengan header Sheet
    sheet.appendRow([
      data.id || Utilities.getUuid(),
      data.ujianId,
      data.ujianNama || data.ujianId,
      data.nis,
      data.nama,
      data.kelas,
      data.mapel,
      data.nilaiPG || 0,
      data.nilaiEssay || 0,
      data.total || 0,
      data.status || 'selesai',
      data.waktuMulai,
      data.waktuSelesai,
      durasiMenit,
      JSON.stringify(data.jawaban || {}),
      new Date().toISOString() // timestamp server
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({result:"success", message:"Hasil tersimpan"}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({result:"error", error: err.toString(), stack: err.stack}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var rows = sheet.getDataRange().getValues();
    if (rows.length <= 1) return ContentService.createTextOutput(JSON.stringify([])).setMimeType(ContentService.MimeType.JSON);
    
    var headers = rows[0];
    var result = [];
    for (var i = 1; i < rows.length; i++) {
      var obj = {};
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = rows[i][j];
      }
      result.push(obj);
    }
    // Filter by ujianId if ?ujianId=xxx provided
    if (e.parameter.ujianId) {
      result = result.filter(function(r){ return r.ujianId == e.parameter.ujianId; });
    }
    if (e.parameter.nis) {
      result = result.filter(function(r){ return r.nis == e.parameter.nis; });
    }
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({result:"error", error: err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function - jalankan dari editor untuk test sheet
function testAdd() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow(["test-id","ujian-1","UTS Matematika","20241001","Test Siswa","XII IPA 1","Matematika",80,0,80,"selesai",new Date().toISOString(),new Date().toISOString(),60,"{}",new Date().toISOString()]);
}
