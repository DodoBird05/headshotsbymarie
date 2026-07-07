#!/usr/bin/env node

/**
 * Post-build image reference verification.
 *
 * Scans every HTML file in the static export (out/) for /images/... asset
 * references (src, srcSet, preload hrefs, inline background-image URLs) and
 * fails the build if any referenced file does not exist in the export.
 *
 * This exists because a <picture><source> that 404s does NOT fall back to
 * the <img> — a missing -mobile variant means a broken image for mobile
 * visitors. Run after `next build` (wired into the package.json build script).
 */

const fs = require('fs')
const path = require('path')

const BUILD_DIR = path.resolve(__dirname, '..', 'out')

// Match /images/<anything>.<known asset extension> inside HTML attributes/CSS.
// Stops at quotes, whitespace, parens, commas (srcset separators) and '?'.
const IMAGE_REF_PATTERN = /\/images\/[^"'()\s,?]+\.(?:webp|jpe?g|png|gif|svg|avif|mp4|webm|mov)/gi

function collectHtmlFiles(dir) {
  const results = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...collectHtmlFiles(fullPath))
    } else if (entry.name.endsWith('.html')) {
      results.push(fullPath)
    }
  }
  return results
}

function main() {
  if (!fs.existsSync(BUILD_DIR)) {
    console.error(`❌ Build directory not found: ${BUILD_DIR} — run the build first.`)
    process.exit(1)
  }

  const htmlFiles = collectHtmlFiles(BUILD_DIR)
  const missing = new Map() // ref -> Set of referencing pages
  let refCount = 0

  for (const htmlFile of htmlFiles) {
    const html = fs.readFileSync(htmlFile, 'utf8')
    const refs = html.match(IMAGE_REF_PATTERN) || []

    for (const rawRef of refs) {
      refCount++
      const ref = decodeURIComponent(rawRef)
      const assetPath = path.join(BUILD_DIR, ref)
      if (!fs.existsSync(assetPath)) {
        const page = '/' + path.relative(BUILD_DIR, htmlFile).replace(/index\.html$/, '')
        if (!missing.has(ref)) missing.set(ref, new Set())
        missing.get(ref).add(page)
      }
    }
  }

  console.log(`Checked ${refCount} image references across ${htmlFiles.length} HTML files.`)

  if (missing.size > 0) {
    console.error(`\n❌ ${missing.size} referenced image(s) missing from the export:\n`)
    for (const [ref, pages] of [...missing.entries()].sort()) {
      console.error(`  ${ref}`)
      for (const page of [...pages].sort()) {
        console.error(`    referenced by ${page}`)
      }
    }
    console.error('\nBuild blocked: deploying would ship broken images.')
    console.error('If these are -mobile variants, run: node scripts/generate-thumbnails.js')
    process.exit(1)
  }

  console.log('✅ All referenced images exist in the export.')
}

main()
