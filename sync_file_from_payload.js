const fs = require('fs');
const path = require('path');

console.log('=== PROCESANDO ACTUALIZACIÓN DESDE SHAREPOINT / ONEDRIVE ===');

// 1. Leer el evento de GitHub Actions
let clientPayload = {};
const eventPath = process.env.GITHUB_EVENT_PATH;
if (eventPath && fs.existsSync(eventPath)) {
  try {
    const eventData = JSON.parse(fs.readFileSync(eventPath, 'utf8'));
    clientPayload = eventData.client_payload || {};
    console.log('Evento de GitHub cargado con éxito.');
  } catch (e) {
    console.log('Error al leer GITHUB_EVENT_PATH:', e.message);
  }
}

// Función auxiliar para buscar valores en objetos de Power Automate
function findValue(obj, keys) {
  if (!obj || typeof obj !== 'object') return null;
  for (const k of Object.keys(obj)) {
    if (keys.some(searchKey => k.toLowerCase().includes(searchKey.toLowerCase()))) {
      if (typeof obj[k] === 'string' && obj[k].trim() !== '') return obj[k];
    }
    if (typeof obj[k] === 'object') {
      const nested = findValue(obj[k], keys);
      if (nested) return nested;
    }
  }
  return null;
}

// Extraer campos del payload
let rawFilePath = findValue(clientPayload, ['Path', '{FullPath}', 'path', 'filepath']) || process.env.FILE_PATH || '';
let fileName = findValue(clientPayload, ['Name', '{FilenameWithExtension}', 'filename', 'name']) || process.env.FILE_NAME || '';
let fileUrl = findValue(clientPayload, ['file_url', 'WebUrl', 'Link', '{Link}', 'share_url', 'url', 'webUrl']) || '';
let rawContent = clientPayload.file_content || findValue(clientPayload, ['$content', 'content', 'file_content']) || process.env.FILE_CONTENT_BASE64 || '';

console.log('📁 Ruta en OneDrive:', rawFilePath);
console.log('📄 Nombre de archivo:', fileName);
console.log('🔗 URL compartida de SharePoint:', fileUrl);

// Identificar carpetas de EPS
const epsDir = path.join(__dirname, 'eps');
const epsFolders = fs.readdirSync(epsDir).filter(f => fs.statSync(path.join(epsDir, f)).isDirectory());

function cleanName(str) {
  return (str || '').toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Quitar tildes
    .replace(/^[0-9]+\.\s*/, '')                     // Quitar números iniciales ("24. ")
    .replace(/\b(s\.?a\.?|e\.?p\.?s\.?|empresa)\b/gi, '') // Quitar siglas comunes
    .replace(/[^a-z0-9]/g, '');                      // Solo letras y números
}

// Extraer la carpeta específica de la EPS desde la ruta de OneDrive
let targetFolder = '';
const pathSegments = (rawFilePath || '').split(/[\\/]/).filter(p => p.trim() !== '');

// Si la ruta contiene al menos un archivo y una carpeta padre
if (pathSegments.length >= 2) {
  const folderSegment = pathSegments[pathSegments.length - 2]; // El segmento inmediatamente anterior al archivo
  const cleanSegment = cleanName(folderSegment);
  console.log(`Segmento de carpeta extraído: "${folderSegment}" (limpio: "${cleanSegment}")`);

  // Buscar coincidencia exacta o más larga
  let bestMatch = '';
  let maxScore = 0;

  for (const folder of epsFolders) {
    const cleanFolder = cleanName(folder);
    if (cleanSegment === cleanFolder) {
      bestMatch = folder;
      break;
    }
    if (cleanSegment.includes(cleanFolder) || cleanFolder.includes(cleanSegment)) {
      const matchLen = Math.min(cleanSegment.length, cleanFolder.length);
      if (matchLen > maxScore && matchLen >= 3) {
        maxScore = matchLen;
        bestMatch = folder;
      }
    }
  }
  targetFolder = bestMatch;
}

// Fallback por nombre de archivo si el nombre del archivo contiene la EPS
if (!targetFolder && fileName) {
  const cleanFile = cleanName(fileName);
  for (const folder of epsFolders) {
    const cleanFolder = cleanName(folder);
    if (cleanFolder.length >= 4 && cleanFile.includes(cleanFolder)) {
      targetFolder = folder;
      break;
    }
  }
}

if (!targetFolder) {
  console.log('⚠️ No se pudo asociar la ruta a una carpeta de EPS local con precisión.');
  process.exit(0);
}

console.log(`🎯 EPS identificada con precisión: "${targetFolder}"`);

const targetDir = path.join(epsDir, targetFolder);
const infoJsonPath = path.join(targetDir, 'info.json');

// Cargar info.json existente
let existingJson = {};
if (fs.existsSync(infoJsonPath)) {
  try {
    existingJson = JSON.parse(fs.readFileSync(infoJsonPath, 'utf8'));
  } catch (e) {}
}

const isImage = /\.(png|jpe?g|webp|svg|gif)$/i.test(fileName || rawFilePath);
const isAudio = /\.(m4a|mp3|wav|ogg)$/i.test(fileName || rawFilePath);
const isPdf = /\.pdf$/i.test(fileName || rawFilePath);
const isHtml = /\.html$/i.test(fileName || rawFilePath);
const isJson = /\.json$/i.test(fileName || rawFilePath);

// CASO 1: Es un Logo / Imagen -> Actualizar logo_url con el link de SharePoint
if (isImage && fileUrl) {
  let finalImageUrl = fileUrl;
  if (!finalImageUrl.includes('&download=1') && !finalImageUrl.includes('?download=1')) {
    finalImageUrl += (finalImageUrl.includes('?') ? '&' : '?') + 'download=1';
  }
  existingJson.logo_url = finalImageUrl;
  fs.writeFileSync(infoJsonPath, JSON.stringify(existingJson, null, 2), 'utf8');
  console.log(`🎉 ¡ÉXITO! Logo de ${targetFolder} actualizado con URL: ${finalImageUrl}`);
}

// CASO 2: Es un Audio -> Actualizar audio_url con el link de SharePoint
else if (isAudio && fileUrl) {
  existingJson.audio_url = fileUrl;
  fs.writeFileSync(infoJsonPath, JSON.stringify(existingJson, null, 2), 'utf8');
  console.log(`🎉 ¡ÉXITO! Audio de ${targetFolder} actualizado con URL: ${fileUrl}`);
}

// CASO 3: Es un PDF -> Actualizar pdf_url con el link de SharePoint
else if (isPdf && fileUrl) {
  let finalPdfUrl = fileUrl;
  if (!finalPdfUrl.includes('&download=1') && !finalPdfUrl.includes('?download=1')) {
    finalPdfUrl += (finalPdfUrl.includes('?') ? '&' : '?') + 'download=1';
  }
  existingJson.pdf_url = finalPdfUrl;
  fs.writeFileSync(infoJsonPath, JSON.stringify(existingJson, null, 2), 'utf8');
  console.log(`🎉 ¡ÉXITO! PDF de ${targetFolder} actualizado con URL: ${finalPdfUrl}`);
}

// CASO 4: Es info.json o HTML -> Procesar contenido
else if (rawContent) {
  let fileBuffer = null;
  let contentString = '';
  try {
    const decoded = Buffer.from(rawContent, 'base64');
    contentString = decoded.toString('utf8');
    fileBuffer = decoded;
  } catch (e) {
    contentString = String(rawContent);
    fileBuffer = Buffer.from(contentString, 'utf8');
  }

  if (isJson || contentString.trim().startsWith('{')) {
    try {
      const incomingJson = JSON.parse(contentString);
      const mergedJson = {
        ...existingJson,
        ...incomingJson
      };
      fs.writeFileSync(infoJsonPath, JSON.stringify(mergedJson, null, 2), 'utf8');
      console.log(`🎉 ¡ÉXITO! info.json actualizado para ${targetFolder}`);
    } catch (e) {
      console.log('Error al fusionar JSON:', e.message);
    }
  } else if (isHtml || contentString.includes('<div') || contentString.includes('<!DOCTYPE')) {
    const destHtml = path.join(targetDir, fileName || `${targetFolder}.html`);
    fs.writeFileSync(destHtml, fileBuffer);
    console.log(`🎉 ¡ÉXITO! HTML actualizado para ${targetFolder} en ${destHtml}`);
  }
}
