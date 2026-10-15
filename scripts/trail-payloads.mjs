// Single source of trail truth. Every payload derives from FINAL_MESSAGE at
// import time; nothing is hand-typed anywhere else. Imported by trail-check
// and trail-gen. Zero deps.
import { createHash } from 'node:crypto';

export const PASSPHRASE = 'phosphor';
export const PIN = '13be455a';

export const FINAL_MESSAGE = [
  'the word: phosphor',
  '',
  'proof: sha256 phosphor starts with 13be455a',
  '(digests catch typing errors; that is their whole job)',
  '',
  'the drawer answers to:',
  'gpg --passphrase phosphor -d .secrets/reward.gpg',
].join('\n');

export const REWARD = [
  'the word was phosphor, and the screen was always yours.',
  'the prompt is yours until reload: visitor -> operator',
  'the drawer relocks itself and does not mind.',
  'ps: if any of this was fun, cat contact.txt',
].join('\n');

export const rot13 = (s) =>
  s.replace(/[A-Za-z]/g, (ch) => {
    const b = ch <= 'Z' ? 65 : 97;
    return String.fromCharCode((ch.charCodeAt(0) - b + 13) % 26 + b);
  });

export const HEXTOKEN = Buffer.from(FINAL_MESSAGE, 'utf8').toString('hex');
export const STEP3_LINE = 'wrap three is hex, and xxd -r takes it off: ' + HEXTOKEN;
export const STEP2_LINE = rot13(STEP3_LINE);
export const BLOB = Buffer.from(STEP2_LINE, 'utf8').toString('base64');
export const REWARD_B64 = Buffer.from(REWARD, 'utf8').toString('base64');

// The live xxd -r and this module must extract hex the same way: the longest
// run of hex digits over the input, never a trimmed paste.
export const longestHexRun = (s) => {
  const runs = s.match(/[0-9a-fA-F]+/g) || [];
  return runs.reduce((a, b) => (b.length > a.length ? b : a), '');
};

export const replay = (blob) => {
  const step2 = Buffer.from(blob, 'base64').toString('utf8');
  const step3 = rot13(step2);
  return Buffer.from(longestHexRun(step3), 'hex').toString('utf8');
};

export const pinOK = (word) =>
  createHash('sha256').update(word, 'utf8').digest('hex').startsWith(PIN);
