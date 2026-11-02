// Builds every favicon / home-screen icon from one source file.
//
//   node scripts/generate-favicons.js      (or: pnpm generate-favicons)
//
// Source: media-originals/favicon-source.png, Marie's Romie Italic "M"
// (black on transparent, any square size >= 512). The letter shape is taken
// from the source's transparency and recoloured, so the source can stay black.
//
// Output (public/):
//   favicon.ico            16, 32, 48 px (browser tabs, bookmarks)
//   icon-192.png           192 px (Safari, Google search results)
//   apple-touch-icon.png   180 px (iPhone/iPad home screen)
//   icon-512.png           512 px (Android home screen, web manifest)
//
// Run it again whenever the source artwork changes. It is not part of the build.

const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const SOURCE = path.join(ROOT, 'media-originals/favicon-source.png')
const OUT = path.join(ROOT, 'public')

// Site colours: --dark-color in src/styles/globals.css, and the warm cream
// used for light sections across the site.
const LETTER = '#1C1C1C'
const CREAM = '#F5F0EB'
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 }

// Browser icons (tabs, Safari favourites bar, Google results): transparent,
// letter as wide as the icon. Marie's choice 2026-11-02, matching the old icon.
// Home-screen icons get rounded corners from the phone, so the letter keeps a
// margin there. iOS fills transparency with black, so its icon is on cream.
const BROWSER = { fill: 1, background: TRANSPARENT }
const HOME_SCREEN = { fill: 0.72 }

const PNG_ICONS = [
  { file: 'icon-192.png', size: 192, ...BROWSER },
  { file: 'apple-touch-icon.png', size: 180, ...HOME_SCREEN, background: CREAM },
  { file: 'icon-512.png', size: 512, ...HOME_SCREEN, background: TRANSPARENT },
]
const ICO_SIZES = [16, 32, 48]

// The letter as a coloured, tightly trimmed RGBA image.
async function loadLetter() {
  const trimmed = await sharp(SOURCE).ensureAlpha().trim({ threshold: 1 }).toBuffer()
  const alpha = await sharp(trimmed).extractChannel('alpha').toBuffer()
  const { width, height } = await sharp(trimmed).metadata()
  const letter = await sharp({
    create: { width, height, channels: 3, background: LETTER },
  })
    .joinChannel(alpha)
    .png()
    .toBuffer()
  return { letter, width, height }
}

async function renderIcon({ letter }, size, fill, background) {
  const box = Math.round(size * fill)
  const scaled = await sharp(letter)
    .resize(box, box, { fit: 'inside', kernel: 'lanczos3' })
    .toBuffer({ resolveWithObject: true })
  const left = Math.round((size - scaled.info.width) / 2)
  const top = Math.round((size - scaled.info.height) / 2)
  return sharp({
    create: { width: size, height: size, channels: 4, background },
  })
    .composite([{ input: scaled.data, left, top }])
    .png({ compressionLevel: 9 })
    .toBuffer()
}

// An .ico file is a small directory followed by the images; modern browsers
// accept PNG data inside it.
function buildIco(pngs) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(pngs.length, 4)
  const entries = []
  let offset = 6 + 16 * pngs.length
  for (const { size, data } of pngs) {
    const entry = Buffer.alloc(16)
    entry.writeUInt8(size >= 256 ? 0 : size, 0)
    entry.writeUInt8(size >= 256 ? 0 : size, 1)
    entry.writeUInt8(0, 2)
    entry.writeUInt8(0, 3)
    entry.writeUInt16LE(1, 4)
    entry.writeUInt16LE(32, 6)
    entry.writeUInt32LE(data.length, 8)
    entry.writeUInt32LE(offset, 12)
    entries.push(entry)
    offset += data.length
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)])
}

async function main() {
  if (!fs.existsSync(SOURCE)) {
    throw new Error(`Favicon source not found: ${path.relative(ROOT, SOURCE)}`)
  }
  const meta = await sharp(SOURCE).metadata()
  if (meta.width !== meta.height || meta.width < 512) {
    throw new Error(`Favicon source must be square and at least 512 px (got ${meta.width}x${meta.height})`)
  }
  const letter = await loadLetter()

  for (const { file, size, fill, background } of PNG_ICONS) {
    fs.writeFileSync(path.join(OUT, file), await renderIcon(letter, size, fill, background))
    console.log(`  ${file} (${size}x${size})`)
  }

  const icoImages = []
  for (const size of ICO_SIZES) {
    icoImages.push({ size, data: await renderIcon(letter, size, BROWSER.fill, BROWSER.background) })
  }
  fs.writeFileSync(path.join(OUT, 'favicon.ico'), buildIco(icoImages))
  console.log(`  favicon.ico (${ICO_SIZES.join(', ')})`)
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
