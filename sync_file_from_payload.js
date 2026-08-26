const fs = require('fs');
const path = require('path');

// Leer variables de entorno enviadas por el payload de GitHub Actions
const rawFilePath = process.env.FILE_PATH || '';
const fileName = process.env.FILE_NAME || '';
const base64Content = process.env.FILE_CONTENT_BASE64 || '';

console.log('=== PROCESANDO ARCHIVO DESDE SHAREPOINT / ONEDRIVE ===');
console.log('Ruta OneDrive:', rawFilePath);
console.log('Nombre Archivo:', fileName);

if (!base64Content) {
  console.log('⚠️ No se recibió contenido en base64 en este evento. Recompilando catálogo existente...');
  process.exit(0);
}

// Decodificar el contenido
const fileBuffer = Buffer.from(base64Content, 'base64');

// Mapeo de carpetas de OneDrive (ej. "24. EMAPA HUARAL SA") a las carpetas en eps/
const epsDir = path.join(__dirname, 'eps');
const epsFolders = fs.readdirSync(epsDir).filter(f => fs.statSync(path.join(epsDir, f)).isDirectory());

// Normalizar texto para comparación
function normalize(str) {
  return str.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

// Extraer el nombre de la carpeta de la EPS de la ruta de OneDrive
// Ejemplo de ruta: "/11 Sunass+ Catalogo Estudios Tarifarios/24. EMAPA HUARAL SA/info.json"
const parts = rawFilePath.split('/').filter(p => p.trim() !== '');
let oneDriveFolderName = '';
if (parts.length >= 2) {
  oneDriveFolderName = parts[parts.length - 2]; // La penúltima parte es el nombre de la carpeta de la EPS
}

console.log('Carpeta detectada en OneDrive:', oneDriveFolderName);

// Buscar la carpeta correspondiente en eps/
let targetFolder = '';
const normOneDrive = normalize(oneDriveFolderName);

for (const folder of epsFolders) {
  const normFolder = normalize(folder);
  if (normOneDrive.includes(normFolder) || normFolder.includes(normOneDrive)) {
    targetFolder = folder;
    break;
  }
}

// Búsqueda por coincidencia parcial si no se encontró directa
if (!targetFolder && oneDriveFolderName) {
  for (const folder of epsFolders) {
    const cleanOneDrive = oneDriveFolderName.replace(/^[0-9]+\.\s*/, ''); // quitar número ej "24. "
    if (normalize(cleanOneDrive).includes(normalize(folder)) || normalize(folder).includes(normalize(cleanOneDrive))) {
      targetFolder = folder;
      break;
    }
  }
}

if (targetFolder) {
  const destPath = path.join(epsDir, targetFolder, fileName);
  fs.writeFileSync(destPath, fileBuffer);
  console.log(`✅ Archivo guardado con éxito en: eps/${targetFolder}/${fileName} (${fileBuffer.length} bytes)`);
} else {
  console.log(`⚠️ No se pudo asociar la carpeta "${oneDriveFolderName}" a una EPS local.`);
}
