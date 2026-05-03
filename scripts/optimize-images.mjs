/**
 * Image optimization script for /public/tours/
 * Converts all tour images to WebP at max 1400px width, quality 82.
 * Deletes originals after successful conversion.
 *
 * Run once: node scripts/optimize-images.mjs
 */

import sharp from '../node_modules/sharp/lib/index.js';
import { readdir, unlink, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TOURS_DIR = join(__dirname, '..', 'public', 'tours');
const MAX_WIDTH = 1400;
const QUALITY = 82;

const images = [
  { input: 'sendero-tigre.png',   output: 'sendero-tigre.webp' },
  { input: 'sendero_cafe.jpg',    output: 'sendero_cafe.webp' },
  { input: 'sendero_agua.jpg',    output: 'sendero_agua.webp' },
  { input: 'sendero_cacao.jpg',   output: 'sendero_cacao.webp' },
  { input: 'sendero_volcan.jpeg', output: 'sendero_volcan.webp' },
  { input: 'sendero_paramo.jpg',  output: 'sendero_paramo.webp' },
  { input: 'sendero_guadua.webp', output: 'sendero_guadua.webp' },
  { input: 'sendero_oro.png',     output: 'sendero_oro.webp' },
  { input: 'sendero_luminoso.png',output: 'sendero_luminoso.webp' },
];

async function fileSize(path) {
  const s = await stat(path);
  return (s.size / 1024).toFixed(1) + ' KB';
}

async function main() {
  let totalBefore = 0;
  let totalAfter = 0;

  for (const { input, output } of images) {
    const inputPath  = join(TOURS_DIR, input);
    const outputPath = join(TOURS_DIR, output);
    const isSameFile = input === output;

    let beforeBytes;
    try {
      beforeBytes = (await stat(inputPath)).size;
    } catch {
      console.warn(`  SKIP — not found: ${input}`);
      continue;
    }

    // Write to a temp file first so we never corrupt the source
    const tempPath = outputPath + '.tmp';

    await sharp(inputPath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true, fit: 'inside' })
      .webp({ quality: QUALITY })
      .toFile(tempPath);

    const afterBytes = (await stat(tempPath)).size;
    const saved = (((beforeBytes - afterBytes) / beforeBytes) * 100).toFixed(1);

    // Replace original (or rename temp → output)
    if (!isSameFile) {
      await unlink(inputPath);
    }
    // Atomically rename temp → final output
    const { rename } = await import('fs/promises');
    await rename(tempPath, outputPath);

    totalBefore += beforeBytes;
    totalAfter  += afterBytes;

    console.log(
      `  ✓ ${input.padEnd(25)} → ${output.padEnd(25)} ` +
      `${(beforeBytes/1024).toFixed(0).padStart(6)} KB → ${(afterBytes/1024).toFixed(0).padStart(6)} KB  (${saved}% smaller)`
    );
  }

  console.log('');
  console.log(`  Total before: ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  Total after:  ${(totalAfter  / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  Saved:        ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(2)} MB  (${(((totalBefore - totalAfter)/totalBefore)*100).toFixed(1)}%)`);
}

main().catch((err) => { console.error(err); process.exit(1); });
