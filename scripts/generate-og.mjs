// Renders scripts/og-card.html to public/og/card.png at exactly 1200x630
// with headless Chromium. Dev-time tool only, never runs in CI; this repo
// carries no Playwright dependency. Playwright is resolved from the local
// handy-dictation checkout, the same rig the design pass used.
//
// Usage: node scripts/generate-og.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HANDY = '/Users/shahil/work/regenai-repo/mission-control/handy-dictation/package.json';

const requireFromHandy = createRequire(HANDY);
const pwModule = await import(pathToFileURL(requireFromHandy.resolve('playwright')).href);
const pw = pwModule.default ?? pwModule;

const browser = await pw.chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
  colorScheme: 'dark',
});
const page = await context.newPage();
await page.goto(pathToFileURL(path.join(__dirname, 'og-card.html')).href);
await page.waitForTimeout(300);

const out = path.resolve(__dirname, '../public/og/card.png');
fs.mkdirSync(path.dirname(out), { recursive: true });
await page.screenshot({ path: out });
await browser.close();
console.log(`og card written: ${out}`);
