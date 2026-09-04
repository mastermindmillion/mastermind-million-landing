/**
 * Google Apps Script — webhook receptor para /aplica (Mastermind Million).
 *
 * Instalación:
 * 1. Crea un Google Sheet (ej. "Aplicaciones Mastermind Million").
 * 2. Extensiones → Apps Script, borra el código de ejemplo y pega este archivo.
 * 3. Implementar → Nueva implementación → tipo "Aplicación web".
 *    - Ejecutar como: Yo (tu cuenta)
 *    - Quién tiene acceso: Cualquier usuario
 * 4. Copia la URL de la aplicación web y ponla en la variable de entorno
 *    APPLY_SHEETS_WEBHOOK_URL (local y en Vercel).
 *
 * Cada aplicación llega como un objeto JSON plano (mismas claves siempre,
 * ver src/app/api/apply/route.ts). La primera fila del Sheet se usa como
 * encabezados; si el Sheet está vacío, este script los crea a partir de
 * la primera aplicación recibida.
 */
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(Object.keys(data));
  }

  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var row = headers.map(function (header) {
    return data[header] !== undefined ? data[header] : "";
  });
  sheet.appendRow(row);

  return ContentService.createTextOutput(
    JSON.stringify({ ok: true })
  ).setMimeType(ContentService.MimeType.JSON);
}
