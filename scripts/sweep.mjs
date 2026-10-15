// SC-7 gate over dist/: shipped text must carry no em dashes and no AI-voice
// stock phrases. Em dashes fail the build; the phrase list warns.
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;

async function textFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await textFiles(p)));
    else if (/\.(html|txt|xml|svg|json|css)$/.test(entry.name)) out.push(p);
  }
  return out;
}

const PHRASES = [
  'delve into',
  'tapestry',
  'in the realm of',
  'seamlessly integrate',
  'unleash',
  'elevate your',
  'game-changer',
  'game changer',
  'cutting-edge',
  "it's not just",
  'buckle up',
  'in today\'s fast-paced',
];

const errors = [];
const warnings = [];
const files = await textFiles(DIST);

for (const file of files) {
  const page = relative(DIST, file);
  const text = await readFile(file, 'utf8');
  const lines = text.split('\n');

  lines.forEach((line, i) => {
    if (line.includes('\u2014')) errors.push(`${page}:${i + 1}: em dash (U+2014) in shipped text`);
    if (line.includes('\u2013')) errors.push(`${page}:${i + 1}: en dash (U+2013) in shipped text`);
    const lower = line.toLowerCase();
    for (const phrase of PHRASES) {
      if (lower.includes(phrase)) warnings.push(`${page}:${i + 1}: AI-voice phrase "${phrase}"`);
    }
  });
}

for (const w of warnings) console.log(`warn  ${w}`);
for (const e of errors) console.log(`ERROR ${e}`);
console.log(`\nsweep: ${files.length} files, ${errors.length} errors, ${warnings.length} warnings`);
process.exit(errors.length ? 1 : 0);
