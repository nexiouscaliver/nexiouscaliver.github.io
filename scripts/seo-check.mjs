// Post-build SEO gate over dist/. Structural breakage fails CI. Per-page
// essentials (unique title, meta description, og:title, og:image, og:url) are
// errors too: a page without them does not ship.
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(p)));
    else if (entry.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const errors = [];
const warnings = [];
const files = await htmlFiles(DIST);
const titles = new Map();

for (const file of files) {
  const page = relative(DIST, file);
  const html = await readFile(file, 'utf8');
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1]?.trim();
  if (!title) errors.push(`${page}: missing <title>`);
  else if (titles.has(title)) {
    errors.push(`${page}: duplicate title "${title}", also on ${titles.get(title)}`);
  } else {
    titles.set(title, page);
  }
  if (!/<link rel="canonical" href="https:\/\/[^"]+"/.test(html)) errors.push(`${page}: missing absolute canonical`);
  const h1s = html.match(/<h1[\s>]/g)?.length ?? 0;
  if (h1s !== 1) errors.push(`${page}: expected 1 <h1>, found ${h1s}`);

  if (!/<meta name="description" content="[^"]+"/.test(html)) errors.push(`${page}: missing meta description`);
  if (!/<meta property="og:title" content="[^"]+"/.test(html)) errors.push(`${page}: missing og:title`);
  if (!/<meta property="og:image" content="https:\/\/[^"]+"/.test(html)) {
    errors.push(`${page}: missing og:image (absolute https URL)`);
  }
  if (!/<meta property="og:url" content="https:\/\/[^"]+"/.test(html)) errors.push(`${page}: missing og:url (absolute https URL)`);

  for (const [, body] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const node = JSON.parse(body);
      if (!node['@context'] || !node['@type']) errors.push(`${page}: JSON-LD node missing @context/@type`);
    } catch {
      errors.push(`${page}: JSON-LD does not parse`);
    }
  }

  if (title && title.length > 60) warnings.push(`${page}: title is ${title.length} chars (> 60)`);
}

for (const w of warnings) console.log(`warn  ${w}`);
for (const e of errors) console.log(`ERROR ${e}`);
console.log(`\nseo-check: ${files.length} pages, ${errors.length} errors, ${warnings.length} warnings`);
process.exit(errors.length ? 1 : 0);
