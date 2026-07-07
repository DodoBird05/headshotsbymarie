const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const THUMB_MAX_WIDTH = 480
const THUMB_QUALITY = 80
const THUMB_SUFFIX = '-thumb'
const MOBILE_SUFFIX = '-mobile'
const SM_MAX_WIDTH = 320
const SM_SUFFIX = '-sm'

const IMAGE_DIRS = [
  'public/images/Good Photos',
  'public/images/Corporate',
  'public/images/BTS'
]

// Mobile variants are generated for EVERY .webp under public/images (recursive),
// so any image passed through getMobileSrc() always has its -mobile file.
// (The old per-directory whitelist left 404s on pages outside the list.)
// Per-directory overrides (keyed by top-level folder under public/images);
// everything else uses MOBILE_DEFAULT.
const MOBILE_ROOT = 'public/images'
const MOBILE_DEFAULT = { width: 768, quality: 80 }
const MOBILE_OVERRIDES = {
  Executive: { width: 400, quality: 80 },
  Hero: { width: 1400, quality: 85 },
  'Service-Area': { width: 500, quality: 80 },
  Corporate: { width: 480, quality: 80 },
  LinkedIn: { width: 480, quality: 80 },
  testimonials: { width: 480, quality: 80 },
  BTS: { width: 480, quality: 80 }
}

// Recursively collect .webp files under a directory, skipping generated
// variants and any _originals keep-folders.
function collectWebpFiles(dir) {
  const results = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === '_originals') continue
      results.push(...collectWebpFiles(fullPath))
    } else if (
      entry.name.endsWith('.webp') &&
      !entry.name.includes(THUMB_SUFFIX) &&
      !entry.name.includes(MOBILE_SUFFIX) &&
      !entry.name.includes(SM_SUFFIX)
    ) {
      results.push(fullPath)
    }
  }
  return results
}

async function resizeImage({ inputPath, outputPath, file, outputName, maxWidth, quality }) {
  // Up-to-date check: skip if the variant already exists and the source
  // hasn't changed since it was generated. Keeps builds fast and avoids
  // refreshing mtimes (which would make `aws s3 sync` re-upload everything).
  if (
    fs.existsSync(outputPath) &&
    fs.statSync(outputPath).mtimeMs >= fs.statSync(inputPath).mtimeMs
  ) {
    return 'skipped'
  }

  const metadata = await sharp(inputPath).metadata()

  if (metadata.width && metadata.width <= maxWidth) {
    fs.copyFileSync(inputPath, outputPath)
    console.log(`${file} → ${outputName} (copied, already ≤${maxWidth}px)`)
    return 'skipped'
  }

  await sharp(inputPath)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality })
    .toFile(outputPath)

  const inputSize = fs.statSync(inputPath).size
  const outputSize = fs.statSync(outputPath).size
  const savings = ((1 - outputSize / inputSize) * 100).toFixed(0)

  console.log(
    `${file} → ${outputName} (${(inputSize / 1024).toFixed(0)} KB → ${(outputSize / 1024).toFixed(0)} KB, -${savings}%)`
  )
  return 'generated'
}

async function generateThumbnails() {
  const root = path.resolve(__dirname, '..')
  let generated = 0
  let skipped = 0

  // --- Thumbnail generation (existing) ---
  for (const dir of IMAGE_DIRS) {
    const fullDir = path.join(root, dir)

    if (!fs.existsSync(fullDir)) {
      console.log(`Directory not found, skipping: ${dir}`)
      continue
    }

    const files = fs.readdirSync(fullDir).filter(
      f => f.endsWith('.webp') && !f.includes(THUMB_SUFFIX) && !f.includes(MOBILE_SUFFIX) && !f.includes(SM_SUFFIX)
    )

    for (const file of files) {
      const inputPath = path.join(fullDir, file)
      const outputName = file.replace(/\.webp$/, `${THUMB_SUFFIX}.webp`)
      const outputPath = path.join(fullDir, outputName)

      const result = await resizeImage({
        inputPath, outputPath, file, outputName,
        maxWidth: THUMB_MAX_WIDTH, quality: THUMB_QUALITY
      })
      if (result === 'generated') generated++
      else skipped++
    }
  }

  console.log(`\nThumbnails: ${generated} generated, ${skipped} skipped`)

  // --- Mobile variant generation (all of public/images, recursive) ---
  let mobileGenerated = 0
  let mobileSkipped = 0

  const mobileRoot = path.join(root, MOBILE_ROOT)
  if (!fs.existsSync(mobileRoot)) {
    console.log(`Directory not found, skipping: ${MOBILE_ROOT}`)
  } else {
    for (const inputPath of collectWebpFiles(mobileRoot)) {
      // Pick config by top-level folder under public/images
      const relative = path.relative(mobileRoot, inputPath)
      const topDir = relative.split(path.sep)[0]
      const { width, quality } = MOBILE_OVERRIDES[topDir] || MOBILE_DEFAULT

      const file = path.basename(inputPath)
      const outputName = file.replace(/\.webp$/, `${MOBILE_SUFFIX}.webp`)
      const outputPath = path.join(path.dirname(inputPath), outputName)

      const result = await resizeImage({
        inputPath, outputPath, file, outputName,
        maxWidth: width, quality
      })
      if (result === 'generated') mobileGenerated++
      else mobileSkipped++
    }
  }

  console.log(`Mobile variants: ${mobileGenerated} generated, ${mobileSkipped} skipped`)

  // --- Small mobile gallery variant generation ---
  let smGenerated = 0
  let smSkipped = 0

  for (const dir of IMAGE_DIRS) {
    const fullDir = path.join(root, dir)

    if (!fs.existsSync(fullDir)) {
      console.log(`Directory not found, skipping: ${dir}`)
      continue
    }

    const files = fs.readdirSync(fullDir).filter(
      f => f.endsWith('.webp') && !f.includes(THUMB_SUFFIX) && !f.includes(MOBILE_SUFFIX) && !f.includes(SM_SUFFIX)
    )

    for (const file of files) {
      const inputPath = path.join(fullDir, file)
      const outputName = file.replace(/\.webp$/, `${SM_SUFFIX}.webp`)
      const outputPath = path.join(fullDir, outputName)

      const result = await resizeImage({
        inputPath, outputPath, file, outputName,
        maxWidth: SM_MAX_WIDTH, quality: THUMB_QUALITY
      })
      if (result === 'generated') smGenerated++
      else smSkipped++
    }
  }

  console.log(`Small variants: ${smGenerated} generated, ${smSkipped} skipped`)
  console.log(`\nDone.`)
}

generateThumbnails().catch(err => {
  console.error('Thumbnail generation failed:', err)
  process.exit(1)
})
