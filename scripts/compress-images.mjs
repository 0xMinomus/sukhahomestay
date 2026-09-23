import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SRC = "C:/Users/Andika/AppData/Local/Temp/opencode/sukha-extract/img";
const DESTDIR = fileURLToPath(new URL("../src/assets/img/", import.meta.url));
await import("node:fs/promises").then((fs) => fs.mkdir(DESTDIR, { recursive: true }));

const MAP = {
  "2d30acfeff.jpg": "amenities-hero.jpg",
  "ed7bef61b6.jpg": "amenities-poolside.jpg",
  "c5675d2107.jpg": "room-garden-hero.jpg",
  "5409c20d5e.jpg": "room-garden-main.jpg",
  "110c8f2e20.jpg": "room-garden-detail.jpg",
  "cc3b244794.jpg": "room-canopy-hero.jpg",
  "40122af7c5.jpg": "room-canopy-main.jpg",
  "c472832b09.jpg": "room-canopy-detail.jpg",
  "5c25877f34.jpg": "room-courtyard-hero.jpg",
  "965ccc891f.jpg": "room-courtyard-main.jpg",
  "e109b4bae0.jpg": "room-courtyard-detail.jpg",
  "f134ceac34.jpg": "dining-hero.jpg",
  "4b970526a1.jpg": "dining-breakfast.jpg",
  "0542cc799a.jpg": "dining-longtable.jpg",
  "280d912a8a.jpg": "booking-garden.jpg",
  "c01590abc9.jpg": "experiences-hero.jpg",
  "8c119d03c3.jpg": "experiences-rice-terrace.jpg",
  "5514baf455.jpg": "experiences-river.jpg",
  "1109f92913.jpg": "experiences-mountain.jpg",
  "4a7d4ebb53.jpg": "experiences-craft.jpg",
  "489bfccee8.jpg": "stay-hero.jpg",
  "09353002e9.jpg": "stay-ritual.jpg",
  "528f8cafa4.jpg": "stay-terrace.jpg",
  "afd3335504.jpg": "landing-hero.jpg",
  "e1198bf80b.jpg": "landing-garden-suite.jpg",
  "2b1e7e835f.jpg": "landing-village.jpg",
  "8abad37b7d.jpg": "landing-mountain.jpg",
  "a146a461a1.jpg": "landing-water.jpg",
  "ff2c26d5c3.jpg": "landing-table.jpg",
};

let total = 0;
for (const [src, dest] of Object.entries(MAP)) {
  const out = path.join(DESTDIR, dest);
  const info = await sharp(path.join(SRC, src))
    .resize({ width: 1920, withoutEnlargement: true })
    .jpeg({ quality: 72, mozjpeg: true })
    .toFile(out);
  total += info.size;
  console.log(dest, `${info.width}x${info.height}`, `${Math.round(info.size / 1024)}KB`);
}
console.log("TOTAL", `${(total / 1024 / 1024).toFixed(1)}MB`);
