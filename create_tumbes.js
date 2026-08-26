const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const baseDir = "c:\\Users\\Usuario Legal\\Documents\\carpetas de escritorio\\Proyectos Software de sunass para continuar y programar y probar localmente\\sunass-portal\\sunass-plus---sunassplus\\web-pages";
const srcDir = path.join(baseDir, "eps-maranon");
const destDir = path.join(baseDir, "unidad-002-tumbes");
const destContentDir = path.join(destDir, "content-pages");

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}
if (!fs.existsSync(destContentDir)) {
    fs.mkdirSync(destContentDir, { recursive: true });
}

function copyFolderSync(from, to) {
    fs.readdirSync(from).forEach(element => {
        const stat = fs.lstatSync(path.join(from, element));
        if (stat.isFile()) {
            const newName = element.replace("Eps-Maranon", "Unidad-002-Tumbes");
            fs.copyFileSync(path.join(from, element), path.join(to, newName));
        } else if (stat.isDirectory()) {
            // Already created content-pages manually above
            copyFolderSync(path.join(from, element), path.join(to, element));
        }
    });
}

copyFolderSync(srcDir, destDir);
// The recursive part will copy content-pages files correctly too

const newRootId = crypto.randomUUID();
const newContentId = crypto.randomUUID();

// Update root yml
const rootYml = path.join(destDir, "Unidad-002-Tumbes.webpage.yml");
if (fs.existsSync(rootYml)) {
    let content = fs.readFileSync(rootYml, "utf8");
    content = content.replace(/adx_name: .*/, "adx_name: Unidad 002 Tumbes");
    content = content.replace(/adx_partialurl: .*/, "adx_partialurl: unidad-002-tumbes");
    content = content.replace(/adx_title: .*/, "adx_title: Unidad 002 Tumbes");
    content = content.replace(/adx_webpageid: .*/, "adx_webpageid: " + newRootId);
    fs.writeFileSync(rootYml, content, "utf8");
}

// Update content yml
const contentYml = path.join(destContentDir, "Unidad-002-Tumbes.es-ES.webpage.yml");
if (fs.existsSync(contentYml)) {
    let content = fs.readFileSync(contentYml, "utf8");
    content = content.replace(/adx_name: .*/, "adx_name: Unidad 002 Tumbes");
    content = content.replace(/adx_title: .*/, "adx_title: Unidad 002 Tumbes");
    content = content.replace(/adx_rootwebpageid: .*/, "adx_rootwebpageid: " + newRootId);
    content = content.replace(/adx_webpageid: .*/, "adx_webpageid: " + newContentId);
    fs.writeFileSync(contentYml, content, "utf8");
}

// Update html
const contentHtml = path.join(destContentDir, "Unidad-002-Tumbes.es-ES.webpage.copy.html");
if (fs.existsSync(contentHtml)) {
    let content = fs.readFileSync(contentHtml, "utf8");
    content = content.replace(/EPS MARAÑÓN S\.A\./g, "Unidad 002 Tumbes");
    content = content.replace(/EPS Marañón S\.A\./g, "Unidad 002 Tumbes");
    content = content.replace(/Marañón/g, "Tumbes");
    fs.writeFileSync(contentHtml, content, "utf8");
}

console.log("Created unidad-002-tumbes files");
