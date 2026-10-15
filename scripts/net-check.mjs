// Net gate for /terminal: the shipped page must carry no network-capable
// call and must carry the frozen CSP meta, so the no-socket guarantee is
// structural (connect-src 'none') instead of conventional. Zero deps.
import { readFile } from 'node:fs/promises';

const FILE = new URL('../dist/terminal/index.html', import.meta.url).pathname;
const CSP =
  "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline' 'self'; " +
  "connect-src 'none'; img-src 'none'; form-action 'none'; base-uri 'none'";

const html = await readFile(FILE, 'utf8');

const FORBIDDEN = ['fetch(', 'XMLHttpRequest', 'WebSocket', 'EventSource', 'sendBeacon', '<img', 'import('];

const errors = [];
for (const needle of FORBIDDEN) {
  if (html.includes(needle)) {
    const i = html.indexOf(needle);
    const at = html.slice(0, i).split('\n').length;
    errors.push(`dist/terminal/index.html:${at}: contains "${needle}"`);
  }
}

const meta = `<meta http-equiv="Content-Security-Policy" content="${CSP}">`;
if (!html.includes(meta)) {
  errors.push(`dist/terminal/index.html: missing the exact frozen CSP meta (style-src 'self' is mandatory: the page loads its stylesheet as an external same-origin sheet)`);
}

for (const e of errors) console.log('ERROR net-check: ' + e);
console.log(`\nnet-check: ${errors.length ? 'FAIL' : 'ok'} (${FORBIDDEN.length} needles, csp ${html.includes(meta) ? 'present' : 'absent'})`);
process.exit(errors.length ? 1 : 0);
