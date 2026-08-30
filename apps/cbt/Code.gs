function doPost(e){
  var data;
  if(e.postData && e.postData.contents) data = JSON.parse(e.postData.contents);
  else if(e.parameter.data) data = JSON.parse(e.parameter.data);
  else return ContentService.createTextOutput(JSON.stringify({result:"error", message:"No data"})).setMimeType(ContentService.MimeType.JSON);

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var durasi = Math.round((new Date(data.waktuSelesai)-new Date(data.waktuMulai))/60000);

  sheet.appendRow([data.id, data.ujianId, data.ujianNama, data.nis, data.nama, data.kelas, data.mapel, data.nilaiPG, data.nilaiEssay, data.total, data.status, data.waktuMulai, data.waktuSelesai, durasi, JSON.stringify(data.jawaban), new Date().toISOString(), data.tokenUjian||"", data.jumlahSoal||0]);

  return ContentService.createTextOutput(JSON.stringify({result:"success", kelas:data.kelas, mapel:data.mapel})).setMimeType(ContentService.MimeType.JSON);
}
function doGet(e){
  if(e.parameter.action==='add' && e.parameter.data){
    return doPost(e);
  }
  var rows = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getDataRange().getValues();
  var out=[]; for(var i=1;i<rows.length;i++){var o={}; for(var j=0;j<rows[0].length;j++) o[rows[0][j]]=rows[i][j]; out.push(o);}
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}
