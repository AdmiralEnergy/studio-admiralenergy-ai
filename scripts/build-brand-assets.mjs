import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const root = process.cwd();
const sourcePath = path.join(root, "assets", "brand", "studio-admiral-brand-board.png");
const publicPath = path.join(root, "public");
const brandPath = path.join(publicPath, "brand");

const colors = {
  navy: "#0D1B2A",
  gold: "#C6A15B",
  ivory: "#F7F3EF",
};

await mkdir(brandPath, { recursive: true });

const markCrop = await sharp(sourcePath)
  .extract({ left: 214, top: 55, width: 346, height: 260 })
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const isolated = Buffer.alloc(markCrop.info.width * markCrop.info.height * 4);
for (let index = 0; index < markCrop.data.length; index += 3) {
  const red = markCrop.data[index];
  const green = markCrop.data[index + 1];
  const blue = markCrop.data[index + 2];
  const sourceIndex = index / 3;
  const targetIndex = sourceIndex * 4;
  const warmth = Math.min(red, green) - blue;
  const brightness = (red + green + blue) / 3;
  const alpha = Math.max(0, Math.min(255, Math.round((warmth - 3) * 7))) *
    Math.max(0, Math.min(1, (brightness - 30) / 70));

  isolated[targetIndex] = red;
  isolated[targetIndex + 1] = green;
  isolated[targetIndex + 2] = blue;
  isolated[targetIndex + 3] = Math.round(alpha);
}

const trimmedMark = await sharp(isolated, {
  raw: {
    width: markCrop.info.width,
    height: markCrop.info.height,
    channels: 4,
  },
})
  .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 5 })
  .png()
  .toBuffer();

const markPng = await sharp({
  create: {
    width: 1024,
    height: 1024,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  },
})
  .composite([
    {
      input: await sharp(trimmedMark).resize({ width: 760, height: 760, fit: "inside" }).png().toBuffer(),
      gravity: "center",
    },
  ])
  .png({ compressionLevel: 9 })
  .toBuffer();

await writeFile(path.join(brandPath, "mark.png"), markPng);

const alpha = await sharp(markPng)
  .resize(128, 128, { fit: "contain" })
  .ensureAlpha()
  .extractChannel("alpha")
  .threshold(72)
  .raw()
  .toBuffer();

let tracedPath = "";
for (let y = 0; y < 128; y += 1) {
  let x = 0;
  while (x < 128) {
    while (x < 128 && alpha[y * 128 + x] === 0) x += 1;
    const start = x;
    while (x < 128 && alpha[y * 128 + x] !== 0) x += 1;
    if (x > start) tracedPath += `M${start} ${y}h${x - start}v1h-${x - start}z`;
  }
}

const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-labelledby="title"><title id="title">Studio Admiral SA monogram</title><path fill="${colors.gold}" d="${tracedPath}"/></svg>\n`;
const maskSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path d="${tracedPath}"/></svg>\n`;
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-labelledby="title"><title id="title">Studio Admiral</title><rect width="128" height="128" rx="22" fill="${colors.navy}"/><path fill="${colors.gold}" d="${tracedPath}"/></svg>\n`;

await Promise.all([
  writeFile(path.join(brandPath, "mark.svg"), markSvg),
  writeFile(path.join(brandPath, "mask-icon.svg"), maskSvg),
  writeFile(path.join(publicPath, "favicon.svg"), faviconSvg),
]);

async function makeSquareIcon(size) {
  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: colors.navy,
    },
  })
    .composite([
      {
        input: await sharp(markPng)
          .resize(Math.round(size * 0.72), Math.round(size * 0.72), { fit: "contain" })
          .png()
          .toBuffer(),
        gravity: "center",
      },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

const iconSizes = [16, 32, 48, 192, 512];
const iconBuffers = new Map();
for (const size of iconSizes) {
  const buffer = await makeSquareIcon(size);
  iconBuffers.set(size, buffer);
  await writeFile(path.join(publicPath, `icon-${size}.png`), buffer);
}
await writeFile(path.join(publicPath, "apple-touch-icon.png"), await makeSquareIcon(180));

function createIco(images) {
  const header = Buffer.alloc(6 + images.length * 16);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, buffer }, index) => {
    const entry = 6 + index * 16;
    header.writeUInt8(size === 256 ? 0 : size, entry);
    header.writeUInt8(size === 256 ? 0 : size, entry + 1);
    header.writeUInt8(0, entry + 2);
    header.writeUInt8(0, entry + 3);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(buffer.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += buffer.length;
  });
  return Buffer.concat([header, ...images.map(({ buffer }) => buffer)]);
}

await writeFile(
  path.join(publicPath, "favicon.ico"),
  createIco([16, 32, 48].map((size) => ({ size, buffer: iconBuffers.get(size) }))),
);

await sharp(sourcePath)
  .extract({ left: 0, top: 0, width: 784, height: 498 })
  .png({ compressionLevel: 9 })
  .toFile(path.join(brandPath, "logo-primary.png"));

await sharp({
  create: {
    width: 1080,
    height: 1080,
    channels: 4,
    background: colors.navy,
  },
})
  .composite([
    {
      input: await sharp(markPng).resize(690, 690, { fit: "contain" }).png().toBuffer(),
      gravity: "center",
    },
  ])
  .png({ compressionLevel: 9 })
  .toFile(path.join(brandPath, "social-square.png"));

const markDataUrl = `data:image/png;base64,${markPng.toString("base64")}`;
const ogSvg = Buffer.from(`
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="${colors.navy}"/>
    <rect x="48" y="48" width="1104" height="534" rx="24" fill="none" stroke="${colors.gold}" stroke-opacity=".5"/>
    <image href="${markDataUrl}" x="92" y="94" width="410" height="410" preserveAspectRatio="xMidYMid meet"/>
    <line x1="544" y1="126" x2="544" y2="504" stroke="${colors.gold}" stroke-opacity=".5"/>
    <text x="600" y="205" fill="${colors.ivory}" font-family="Georgia, serif" font-size="50" letter-spacing="3">STUDIO ADMIRAL</text>
    <text x="600" y="270" fill="${colors.gold}" font-family="Arial, sans-serif" font-size="25" font-weight="700" letter-spacing="7">WEBSITES &amp; GROWTH</text>
    <text x="600" y="352" fill="${colors.ivory}" font-family="Arial, sans-serif" font-size="38" font-weight="600">for small businesses</text>
    <text x="600" y="432" fill="${colors.ivory}" fill-opacity=".72" font-family="Arial, sans-serif" font-size="19" letter-spacing="6">BUILD  |  LAUNCH  |  GROW</text>
  </svg>
`);

const ogBuffer = await sharp(ogSvg).png({ compressionLevel: 9 }).toBuffer();
await Promise.all([
  writeFile(path.join(brandPath, "og-default.png"), ogBuffer),
  writeFile(path.join(publicPath, "og.png"), ogBuffer),
]);

const source = await readFile(sourcePath);
console.log(`Built Studio Admiral brand assets from ${source.length.toLocaleString()} source bytes.`);
