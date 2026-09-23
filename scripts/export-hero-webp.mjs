import sharp from "sharp";
import { fileURLToPath } from "node:url";

const SRC = "C:/Users/Andika/AppData/Local/Temp/opencode/sukha-extract/img";
const DESTDIR = fileURLToPath(new URL("../src/assets/img/", import.meta.url));

// original md5-named exports -> hero webp (quality 82 = visually near-lossless)
const HEROS = {
  "2d30acfeff.jpg": "amenities-hero.webp",
  "c5675d2107.jpg": "room-garden-hero.webp",
  "cc3b244794.jpg": "room-canopy-hero.webp",
  "5c25877f34.jpg": "room-courtyard-hero.webp",
  "f134ceac34.jpg": "dining-hero.webp",
  "c01590abc9.jpg": "experiences-hero.webp",
  "489bfccee8.jpg": "stay-hero.webp",
  "afd3335504.jpg": "landing-hero.webp",
};

let total = 0;
for (const [src, dest] of Object.entries(HEROS)) {
  const info = await sharp(`${SRC}/${src}`)
    .webp({ quality: 82 })
    .toFile(`${DESTDIR}/${dest}`);
  total += info.size;
  console.log(dest, `${info.width}x${info.height}`, `${Math.round(info.size / 1024)}KB`);
}
console.log("TOTAL", `${(total / 1024 / 1024).toFixed(1)}MB`);
