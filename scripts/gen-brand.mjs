/**
 * Generates portable Searchscope logo assets for the product app / login page.
 * The "searchscope" wordmark is OUTLINED to vector paths (Geist Mono 500) via
 * fontTools (scripts/wordmark.py) so the files render identically anywhere,
 * with no font dependency. One <path> per glyph (clean, no merge artifacts).
 *
 * Run: node scripts/gen-brand.mjs   (needs python3 + fonttools + sharp)
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const INK = '#1B1A17'; // near-black, for light backgrounds
const PAPER = '#F4F1EC'; // warm off-white, for dark backgrounds
const ICON_BG = '#121113'; // app-icon tile

const OUT = 'public/brand';
const DL = `${process.env.HOME}/Downloads/searchscope-brand`;
for (const d of [OUT, DL]) fs.mkdirSync(d, { recursive: true });

// ---- 1. Outline the wordmark (clean per-glyph paths from fontTools) ----
const WOFF = 'node_modules/@fontsource/geist-mono/files/geist-mono-latin-500-normal.woff';
const wm = JSON.parse(
  execFileSync('python3', ['scripts/wordmark.py', WOFF, 'searchscope', '120', '-0.04']).toString()
);
const wb = wm.bbox; // {x1,y1,x2,y2}; baseline y=0, ascenders negative
const textH = wb.y2 - wb.y1;
const wordPaths = (fill) => wm.paths.map((d) => `<path d="${d}" fill="${fill}"/>`).join('');

// ---- 2. Lockup geometry (mark left, wordmark vertically centred) ----
const MARK_INK_MIN = 4.15;
const MARK_INK_MAX = 23.85; // 28-grid viewfinder ink bounds incl half-stroke
const markInk = MARK_INK_MAX - MARK_INK_MIN;
const PAD = 8;
const markH = textH; // mark height tracks the wordmark's ascender-to-descender
const s = markH / markInk;
const mx = PAD - MARK_INK_MIN * s;
const my = PAD - MARK_INK_MIN * s;
const markRight = PAD + markH;
const markCenterY = PAD + markH / 2;
const GAP = 34;
const tx = markRight + GAP - wb.x1;
const ty = markCenterY - (wb.y1 + wb.y2) / 2;
const W = Math.ceil(tx + wb.x2 + PAD);
const H = Math.ceil(Math.max(PAD + markH, ty + wb.y2) + PAD);

const markBody = (c) => `<g stroke="${c}" stroke-width="1.7" stroke-linecap="round" fill="none">
      <path d="M5 10 V5 H10"/><path d="M18 5 H23 V10"/><path d="M23 18 V23 H18"/><path d="M10 23 H5 V18"/>
    </g>
    <rect x="15" y="8" width="4.6" height="4.6" fill="${c}"/>
    <rect x="8.6" y="15" width="2.6" height="2.6" fill="${c}" opacity="0.45"/>`;

const lockup = (fill, rootColor) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none"${
    rootColor ? ` color="${rootColor}"` : ''
  } role="img" aria-label="searchscope">
  <g transform="translate(${mx.toFixed(2)} ${my.toFixed(2)}) scale(${s.toFixed(4)})">
    ${markBody(fill)}
  </g>
  <g transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)})">${wordPaths(fill)}</g>
</svg>
`;

const markOnly = (fill, rootColor) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none"${
    rootColor ? ` color="${rootColor}"` : ''
  } role="img" aria-label="searchscope mark">
    ${markBody(fill)}
</svg>
`;

const appicon = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="115" fill="${ICON_BG}"/>
  <g transform="translate(96 96) scale(10)">
    ${markBody(PAPER)}
  </g>
</svg>
`;

// ---- 3. Write the SVG deliverables ----
const files = {
  'searchscope-logo.svg': lockup('currentColor', INK), // recolorable; ink by default
  'searchscope-logo-on-dark.svg': lockup(PAPER), // drop-in for dark backgrounds
  'searchscope-mark.svg': markOnly('currentColor', INK),
  'searchscope-mark-on-dark.svg': markOnly(PAPER),
  'searchscope-appicon.svg': appicon,
};
for (const [name, svg] of Object.entries(files)) {
  for (const dir of [OUT, DL]) fs.writeFileSync(path.join(dir, name), svg);
}

// ---- 4. Rasterize PNGs (transparent), high density for crisp downscale ----
const png = async (svg, file, opts) => {
  const buf = await sharp(Buffer.from(svg), { density: 600 }).resize(opts).png().toBuffer();
  for (const dir of [OUT, DL]) fs.writeFileSync(path.join(dir, file), buf);
};
await png(lockup(INK), 'searchscope-logo.png', { height: 320 });
await png(lockup(PAPER), 'searchscope-logo-on-dark.png', { height: 320 });
await png(markOnly(INK), 'searchscope-mark.png', { height: 512 });
await png(markOnly(PAPER), 'searchscope-mark-on-dark.png', { height: 512 });
await png(appicon, 'searchscope-appicon-512.png', { height: 512 });

// ---- 5. README ----
const readme = `Searchscope — brand / logo assets
===================================

The wordmark is outlined from Geist Mono 500, so these render identically
everywhere with no font installed.

LOCKUP (mark + wordmark)
  searchscope-logo.svg          recolorable (uses currentColor; defaults to ink ${INK}).
                                In the app set CSS \`color\` on it to recolor.
  searchscope-logo.png          ink ${INK}, transparent, 320px tall — for LIGHT backgrounds.
  searchscope-logo-on-dark.svg  off-white ${PAPER} — for DARK backgrounds (login page).
  searchscope-logo-on-dark.png  off-white, transparent, 320px tall.

MARK ONLY (viewfinder, square — favicons, avatars, collapsed nav)
  searchscope-mark.svg / .png            ink (light backgrounds)
  searchscope-mark-on-dark.svg / .png    off-white (dark backgrounds)

APP ICON (mark on a dark rounded tile — PWA / favicon / app launcher)
  searchscope-appicon.svg
  searchscope-appicon-512.png

Tip: prefer the .svg files (infinitely scalable). Use searchscope-logo.svg and
control the colour with CSS \`color\`; use the -on-dark files where you can't.
`;
for (const dir of [OUT, DL]) fs.writeFileSync(path.join(dir, 'README.txt'), readme);

console.log(`lockup viewBox ${W}x${H} · ${wm.paths.length} glyphs · wrote ${Object.keys(files).length} SVG + 5 PNG + README`);
