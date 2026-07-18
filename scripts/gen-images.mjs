// Rasterise brand SVGs → PNG using sharp (bundled with Astro).
// Run: node scripts/gen-images.mjs
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pub = resolve(__dirname, '../public');

const og = readFileSync(resolve(pub, 'og/searchscope-og.svg'));
const mark = readFileSync(resolve(pub, 'favicon.svg'));

await sharp(og).png().toFile(resolve(pub, 'og/searchscope-og.png'));
console.log('✓ og/searchscope-og.png (1200×630)');

await sharp(mark, { density: 384 }).resize(180, 180).png().toFile(resolve(pub, 'apple-touch-icon.png'));
console.log('✓ apple-touch-icon.png (180×180)');

await sharp(mark, { density: 384 }).resize(32, 32).png().toFile(resolve(pub, 'favicon-32.png'));
console.log('✓ favicon-32.png (32×32)');
