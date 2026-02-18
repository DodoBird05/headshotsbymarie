const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const THUMB_MAX_WIDTH = 480
const THUMB_QUALITY = 80
const THUMB_SUFFIX = '-thumb'

const IMAGE_DIRS = [
  'public/images/Good Photos',
  'public/images/Corporate',
  'public/images/BTS'
]

async function generateThumbnails() {
  const root = path.resolve(__dirname, '..')
  let generated = 0
  let skipped = 0

  for (const dir of IMAGE_DIRS) {
    const fullDir = path.join(root, dir)

    if (!fs.existsSync(fullDir)) {
      console.log(`Directory not found, skipping: ${dir}`)
      continue
    }

    const files = fs.readdirSync(fullDir).filter(
      f => f.endsWith('.webp') && !f.includes(THUMB_SUFFIX)
    )

    for (const file of files) {
      const inputPath = path.join(fullDir, file)
      const outputName = file.replace(/\.webp$/, `${THUMB_SUFFIX}.webp`)
      const outputPath = path.join(fullDir, outputName)

      // Get image metadata to check width
      const metadata = await sharp(inputPath).metadata()

      if (metadata.width && metadata.width <= THUMB_MAX_WIDTH) {
        // Copy the original so the -thumb.webp path always resolves
        if (!fs.existsSync(outputPath)) {
          fs.copyFileSync(inputPath, outputPath)
          console.log(`${file} → ${outputName} (copied, already ≤${THUMB_MAX_WIDTH}px)`)
        }
        skipped++
        continue
      }

      await sharp(inputPath)
        .resize({ width: THUMB_MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: THUMB_QUALITY })
        .toFile(outputPath)

      const inputSize = fs.statSync(inputPath).size
      const outputSize = fs.statSync(outputPath).size
      const savings = ((1 - outputSize / inputSize) * 100).toFixed(0)

      console.log(
        `${file} → ${outputName} (${(inputSize / 1024).toFixed(0)} KB → ${(outputSize / 1024).toFixed(0)} KB, -${savings}%)`
      )
      generated++
    }
  }

  console.log(`\nDone: ${generated} thumbnails generated, ${skipped} skipped (already ≤${THUMB_MAX_WIDTH}px)`)
}

generateThumbnails().catch(err => {
  console.error('Thumbnail generation failed:', err)
  process.exit(1)
})
