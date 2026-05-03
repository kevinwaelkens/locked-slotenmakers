import sharp from "sharp";

const input = "public/locked_logo.svg";

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const OG_BG = "#042B8D";

const logoWebp = await sharp(input)
  .resize({ width: 800, height: 400, fit: "inside", withoutEnlargement: true })
  .webp({ quality: 90 })
  .toBuffer();

await sharp(logoWebp).toFile("public/logo.webp");
console.log("Wrote public/logo.webp");

const logoForOg = await sharp(input)
  .resize({ width: 1000, height: 520, fit: "inside" })
  .ensureAlpha()
  .toBuffer();

await sharp({
  create: {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    channels: 4,
    background: OG_BG,
  },
})
  .composite([{ input: logoForOg, gravity: "centre" }])
  .webp({ quality: 88 })
  .toFile("public/og-image.webp");

console.log(`Wrote public/og-image.webp (${OG_WIDTH}×${OG_HEIGHT})`);
