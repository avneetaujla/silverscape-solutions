// Builds responsive JPEG variants for every image in media-src/ and writes
// src/content/media-manifest.json (dimensions + generated widths per id).
//
// To swap in a real photo: drop `<id>.jpg` into media-src/ (replacing the
// temporary file), update its entry in src/content/mediaCatalog.ts
// (isPlaceholder: false, source: "silverscape"), then run `npm run media`.
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "media-src");
const OUT = path.join(ROOT, "src/assets/media");
const MANIFEST = path.join(ROOT, "src/content/media-manifest.json");

const WIDTHS = [640, 1024, 1600, 2400];
const QUALITY = 78;

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const files = (await readdir(SRC))
  .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
  .sort();
const manifest = {};

for (const file of files) {
  const id = file.replace(/\.[^.]+$/, "");
  const input = sharp(path.join(SRC, file)).rotate();
  const { width, height } = await input.metadata();
  // Never upscale: only emit widths the source can actually support.
  const widths = WIDTHS.filter((w) => w < width);
  widths.push(Math.min(width, WIDTHS.at(-1)));

  for (const w of widths) {
    await input
      .clone()
      .resize({ width: w, withoutEnlargement: true })
      .jpeg({ quality: QUALITY, mozjpeg: true, progressive: true })
      .toFile(path.join(OUT, `${id}-${w}.jpg`));
  }

  const top = widths.at(-1);
  manifest[id] = {
    width: top,
    height: Math.round((height / width) * top),
    widths,
  };
  console.log(`${id.padEnd(28)} ${width}x${height} -> ${widths.join(", ")}`);
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`\n${files.length} images -> ${path.relative(ROOT, OUT)}`);
