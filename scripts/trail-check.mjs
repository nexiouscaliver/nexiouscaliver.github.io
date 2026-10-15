// CI gate for the /terminal trail. Scoped assertions, not a whole-file ban:
// the passphrase is allowed in exactly two pinned spots (the uname
// representative line in terminal.ts, the uname engine constant in
// terminal.astro) and nowhere else: not in the island, not in any comparison
// literal, not in the gpg path (which compares the sha256 pin). Also replays
// the payload chain against trail-payloads and scans the built island.
// Zero deps.
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import {
  PASSPHRASE,
  PIN,
  FINAL_MESSAGE,
  REWARD_B64,
  STEP2_LINE,
  rot13,
  longestHexRun,
  pinOK,
} from './trail-payloads.mjs';

const ROOT = new URL('..', import.meta.url).pathname;
const TS = ROOT + 'src/data/terminal.ts';
const ASTRO = ROOT + 'src/pages/terminal.astro';
const DIST = ROOT + 'dist/terminal/index.html';
const UNAME_LINE = 'phosphor shahilkadia 1.0 READ-ONLY arm64';

const errors = [];
const ok = (m) => console.log('ok    ' + m);
const bad = (m) => {
  errors.push(m);
  console.log('ERROR trail-check: ' + m);
};

const ts = await readFile(TS, 'utf8');
const astro = await readFile(ASTRO, 'utf8');

// (a) terminal.ts: every passphrase occurrence sits inside the exact frozen
// uname representative line, which occurs exactly once.
{
  const tsLines = ts.split('\n');
  const withWord = tsLines.filter((l) => l.includes(PASSPHRASE));
  if (withWord.length !== 1 || !withWord[0].includes(UNAME_LINE)) {
    bad(
      `(a) terminal.ts: expected exactly one passphrase occurrence inside the frozen uname line, found ${withWord.length}` +
        (withWord.length ? ` first at: ${withWord[0].trim().slice(0, 60)}` : '')
    );
  } else {
    ok(`(a) terminal.ts: passphrase only inside the uname representative line (line ${tsLines.indexOf(withWord[0]) + 1})`);
  }
  const unameCount = ts.split(UNAME_LINE).length - 1;
  if (unameCount !== 1) bad(`(a) terminal.ts: uname line occurs ${unameCount} times, expected 1`);
}

// (b) terminal.astro: exactly one passphrase occurrence (the uname engine
// constant), the pin present, and therefore no quoted-literal comparison.
{
  const astroLines = astro.split('\n');
  const withWord = astroLines.filter((l) => l.includes(PASSPHRASE));
  if (withWord.length !== 1 || !/UNAME/.test(withWord[0])) {
    bad(
      `(b) terminal.astro: expected exactly one passphrase occurrence on the UNAME engine constant line, found ${withWord.length}` +
        (withWord.length ? ` first at: ${withWord[0].trim().slice(0, 60)}` : '')
    );
  } else {
    ok(`(b) terminal.astro: passphrase only inside the uname engine constant (line ${astroLines.indexOf(withWord[0]) + 1})`);
  }
  if (!astro.includes(PIN)) bad(`(b) terminal.astro: pin constant '${PIN}' missing (the gpg path compares the pin, never the string)`);
  else ok(`(b) terminal.astro: pin '${PIN}' present`);
}

// (c) payload chain: extract blob + reward wrapper from terminal.ts, replay
// base64-decode -> rot13 -> longest-hex-extract -> hex-decode, compare with
// FINAL_MESSAGE; assert printable single-line strings and the sha256 pin.
{
  const blob = ts.match(/const TRAIL_BLOB = '([^']+)';/)?.[1];
  const reward = ts.match(/const TRAIL_REWARD_B64 = '([^']+)';/)?.[1];
  if (!blob) bad('(c) terminal.ts: TRAIL_BLOB constant not found');
  if (!reward) bad('(c) terminal.ts: TRAIL_REWARD_B64 constant not found');
  if (blob && reward) {
    const step2 = Buffer.from(blob, 'base64').toString('utf8');
    const step3 = rot13(step2);
    const decoded = Buffer.from(longestHexRun(step3), 'hex').toString('utf8');
    if (decoded !== FINAL_MESSAGE) bad('(c) replay of TRAIL_BLOB does not equal FINAL_MESSAGE');
    else ok('(c) replay: base64-decode -> rot13 -> longest-hex -> hex-decode is byte-equal to FINAL_MESSAGE');
    if (step2 !== STEP2_LINE) bad('(c) decoded blob does not equal STEP2_LINE from trail-payloads');
    if (!/^[\x20-\x7e]+$/.test(blob)) bad('(c) blob is not single-line printable ASCII');
    else ok('(c) blob is single-line printable ASCII');
    if (!/^[\x20-\x7e]+$/.test(step2)) bad('(c) step-2 line is not single-line printable ASCII');
    else ok('(c) step-2 line is single-line printable ASCII');
    if (reward !== REWARD_B64) bad('(c) TRAIL_REWARD_B64 drifted from trail-payloads');
    else ok('(c) TRAIL_REWARD_B64 matches trail-payloads');
  }
  const digest = createHash('sha256').update(PASSPHRASE, 'utf8').digest('hex');
  if (!digest.startsWith(PIN)) bad(`(c) sha256('${PASSPHRASE}') does not start with the pin`);
  else ok(`(c) sha256('${PASSPHRASE}') starts with '${PIN}'`);
  if (!pinOK(PASSPHRASE) || pinOK('hunter2')) bad('(c) pinOK sanity failed (hunter2 must fail)');
}

// (d) island scan over the built page: no passphrase, hex token, or
// FINAL_MESSAGE line inside the island; blob and reward wrapper exactly
// once, inside the island; static region carries the passphrase only in
// the uname output line.
{
  let html;
  try {
    html = await readFile(DIST, 'utf8');
  } catch {
    bad('(d) dist/terminal/index.html missing; run the build before trail-check');
  }
  if (html) {
    const island = html.match(
      /<script[^>]*type="application\/json"[^>]*id="term-data"[^>]*>([\s\S]*?)<\/script>/
    )?.[1];
    if (!island) bad('(d) term-data island not found in dist/terminal/index.html');
    else {
      if (island.includes(PASSPHRASE)) bad('(d) island contains the passphrase');
      else ok('(d) island: zero passphrase occurrences');
      if (island.includes(longestHexRun(rot13(Buffer.from(
        ts.match(/const TRAIL_BLOB = '([^']+)';/)?.[1] ?? '', 'base64').toString('utf8'
      ))))) bad('(d) island contains the hex token');
      else ok('(d) island: zero hex-token occurrences');
      const leak = FINAL_MESSAGE.split('\n').filter((l) => l && island.includes(l));
      if (leak.length) bad(`(d) island contains FINAL_MESSAGE line: "${leak[0]}"`);
      else ok('(d) island: zero FINAL_MESSAGE lines');
      const blob = ts.match(/const TRAIL_BLOB = '([^']+)';/)?.[1] ?? 'x';
      const iCount = island.split(blob).length - 1;
      const fCount = html.split(blob).length - 1;
      if (iCount !== 1 || fCount !== 1) bad(`(d) blob count island:${iCount} file:${fCount}, expected 1 and 1`);
      else ok('(d) blob: exactly one occurrence, inside the island');
      const reward = ts.match(/const TRAIL_REWARD_B64 = '([^']+)';/)?.[1] ?? 'x';
      const rCount = island.split(reward).length - 1;
      const rfCount = html.split(reward).length - 1;
      if (rCount !== 1 || rfCount !== 1) bad(`(d) reward wrapper count island:${rCount} file:${rfCount}, expected 1 and 1`);
      else ok('(d) reward wrapper: exactly one occurrence, inside the island');
    }
    const staticRegion = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
    const sLines = staticRegion.split('\n').filter((l) => l.includes(PASSPHRASE));
    if (sLines.length !== 1 || !sLines[0].includes('READ-ONLY arm64')) {
      bad(`(d) static region: expected the passphrase only inside the uname output line, found ${sLines.length}`);
    } else ok('(d) static region: passphrase only inside the uname output line');
  }
}

console.log(`\ntrail-check: ${errors.length ? 'FAIL' : 'ok'} (${errors.length} errors)`);
process.exit(errors.length ? 1 : 0);
