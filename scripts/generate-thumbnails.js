const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const THUMB_MAX_WIDTH = 480
const THUMB_QUALITY = 80
const THUMB_SUFFIX = '-thumb'
const MOBILE_SUFFIX = '-mobile'

const IMAGE_DIRS = [
  'public/images/Good Photos',
  'public/images/Corporate',
  'public/images/BTS'
]

// Mobile variant configs: { dir, width, quality }
const MOBILE_DIRS = [
  { dir: 'public/images/Executive', width: 400, quality: 80 },
  { dir: 'public/images/Hero', width: 1400, quality: 85 },
  { dir: 'public/images/Service-Area', width: 500, quality: 80 }
]

async function resizeImage({ inputPath, outputPath, file, outputName, maxWidth, quality }) {
  const metadata = await sharp(inputPath).metadata()

  if (metadata.width && metadata.width <= maxWidth) {
    if (!fs.existsSync(outputPath)) {
      fs.copyFileSync(inputPath, outputPath)
      console.log(`${file} → ${outputName} (copied, already ≤${maxWidth}px)`)
    }
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
      f => f.endsWith('.webp') && !f.includes(THUMB_SUFFIX) && !f.includes(MOBILE_SUFFIX)
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

  // --- Mobile variant generation ---
  let mobileGenerated = 0
  let mobileSkipped = 0

  for (const { dir, width, quality } of MOBILE_DIRS) {
    const fullDir = path.join(root, dir)

    if (!fs.existsSync(fullDir)) {
      console.log(`Directory not found, skipping: ${dir}`)
      continue
    }

    const files = fs.readdirSync(fullDir).filter(
      f => f.endsWith('.webp') && !f.includes(MOBILE_SUFFIX) && !f.includes(THUMB_SUFFIX)
    )

    for (const file of files) {
      const inputPath = path.join(fullDir, file)
      const outputName = file.replace(/\.webp$/, `${MOBILE_SUFFIX}.webp`)
      const outputPath = path.join(fullDir, outputName)

      const result = await resizeImage({
        inputPath, outputPath, file, outputName,
        maxWidth: width, quality
      })
      if (result === 'generated') mobileGenerated++
      else mobileSkipped++
    }
  }

  console.log(`Mobile variants: ${mobileGenerated} generated, ${mobileSkipped} skipped`)
  console.log(`\nDone.`)
}

generateThumbnails().catch(err => {
  console.error('Thumbnail generation failed:', err)
  process.exit(1)
})
