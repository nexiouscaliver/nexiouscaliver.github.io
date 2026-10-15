// Weight gate for /terminal: uncompressed inline JS plus inline CSS in
// dist/terminal/index.html must stay under the budget. Counts every
// inline <script> body without src (ld+json excluded, the term-data
// application/json island INCLUDED) plus every <style> body. Zero deps.
// Budget raised 40960 -> 43008 with the grep/copy/selection round: the
// toolbelt has grown by operator commission (36 commands, then grep, copy,
// and cursor selection), and the page still ships about 11 KB gzipped.
import { readFile } from 'node:fs/promises';

const FILE = new URL('../dist/terminal/index.html', import.meta.url).pathname;
const BUDGET = 43008;
const DESIGN_TARGET = 41000;

const html = await readFile(FILE, 'utf8');

const parts = { 'theme-init script': 0, 'terminal engine': 0, 'term-data island': 0, 'inline CSS': 0 };
let engineCount = 0;

for (const [, attrs, body] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
  if (/\bsrc=/.test(attrs)) continue;
  if (/ld\+json/.test(attrs)) continue;
  const bytes = Buffer.byteLength(body);
  if (/application\/json/.test(attrs)) parts['term-data island'] += bytes;
  else if (body.includes('sk-theme')) parts['theme-init script'] += bytes;
  else {
    parts['terminal engine'] += bytes;
    engineCount++;
  }
}

for (const [, body] of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g)) {
  parts['inline CSS'] += Buffer.byteLength(body);
}

const total = Object.values(parts).reduce((a, b) => a + b, 0);
const headroom = BUDGET - total;

for (const [name, bytes] of Object.entries(parts)) {
  console.log(String(bytes).padStart(6) + ' B  ' + name);
}
console.log('------');
console.log(String(total).padStart(6) + ' B  total (budget ' + BUDGET + ' B)');
console.log(String(headroom).padStart(6) + ' B  headroom under budget');

if (total >= DESIGN_TARGET) {
  console.log('warn  total is over the ' + DESIGN_TARGET + ' B design target; the reserve cuts apply');
}

const errors = [];
if (!html.includes('term-data')) errors.push('dist/terminal/index.html has no term-data island; build first');
if (engineCount !== 1) errors.push('expected exactly 1 engine script, found ' + engineCount);
if (total >= BUDGET) errors.push('total ' + total + ' B is at or over the hard budget ' + BUDGET + ' B');

for (const e of errors) console.log('ERROR weight-check: ' + e);
console.log('\nweight-check: ' + (errors.length ? 'FAIL' : 'ok') + ' (' + total + ' B / ' + BUDGET + ' B)');
process.exit(errors.length ? 1 : 0);
