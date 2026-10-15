// Build-time-only formatters for the /terminal page. Zero shipped bytes:
// terminal.astro frontmatter calls dump16 for the static xxd block and
// node:crypto for the static sha256 value, and the live engine transcribes
// the same algorithms, with the QA static/live equality check as the drift
// catch. Never hand-type a hex dump or digest into the transcript.

/** Classic three-column dump: 4-hex offset, 16 hex pairs in space-separated
 *  groups, ASCII gutter with dots for unprintables. */
export function dump16(bytes: Uint8Array): string[] {
  const out: string[] = [];
  for (let i = 0; i < bytes.length; i += 16) {
    const chunk = bytes.slice(i, i + 16);
    let hex = '';
    for (let g = 0; g < 8; g++) {
      const a = chunk[2 * g];
      const b = chunk[2 * g + 1];
      hex += (g ? ' ' : '') + (a === undefined ? '  ' : a.toString(16).padStart(2, '0')) + (b === undefined ? '  ' : b.toString(16).padStart(2, '0'));
    }
    let ascii = '';
    for (const byte of chunk) ascii += byte >= 0x20 && byte <= 0x7e ? String.fromCharCode(byte) : '.';
    out.push(i.toString(16).padStart(4, '0') + ': ' + hex + '  ' + ascii);
  }
  return out;
}
