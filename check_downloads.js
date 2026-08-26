const fs = require('fs');
const content = fs.readFileSync('sunass-plus---sunassplus/web-pages/página-principal/content-pages/Página-principal.es-ES.webpage.copy.html', 'utf8');

const trackRegex = /trackDownload\('([^']+)'\)/g;
const spanRegex = /id="downloads-([^"]+)"/g;

let tracks = [];
let spans = [];
let m;

while ((m = trackRegex.exec(content)) !== null) tracks.push(m[1]);
while ((m = spanRegex.exec(content)) !== null) spans.push(m[1]);

console.log('Total trackDownload calls:', tracks.length);
console.log('Total span elements for downloads:', spans.length);

const trackSet = new Set(tracks);
const spanSet = new Set(spans);

let missingTracks = spans.filter(s => !trackSet.has(s));
let missingSpans = tracks.filter(t => !spanSet.has(t));

if(missingTracks.length > 0) console.log('Spans without track call:', missingTracks);
if(missingSpans.length > 0) console.log('Tracks without span:', missingSpans);

const hasGlobalLogic = content.includes('function trackDownload');
console.log('Has global logic:', hasGlobalLogic);
