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
const EXCLUDE_PAGES = require('./deploy-excluded-pages')

// True for pages the deploy leaves out (their images never ship, so a broken
// one there must not block the build). Mirrors the sync globs: 'name/*'
// covers a folder, anything else is an exact file.
function isExcludedFromDeploy(relPath) {
  return EXCLUDE_PAGES.some((pattern) =>
    pattern.endsWith('/*') ? relPath.startsWith(pattern.slice(0, -1)) : relPath === pattern
  )
}

// Match /images/<anything>.<known asset extension> inside HTML attributes/CSS.
// Folder and file names may contain spaces ("Good Photos/", "About Marie/"), so
// the path may too: match lazily up to the first known extension that is
// followed by the end of the reference (quote, whitespace, comma, paren, '?',
// '&', a backslash, as in the escaped \" of JSON-embedded HTML, or end of
// text). The old pattern stopped at the first space and silently
// skipped every image in a spaced folder.
const IMAGE_REF_PATTERN = /\/images\/[^"'<>()]+?\.(?:webp|jpe?g|png|gif|svg|avif|mp4|webm|mov)(?=["'\s,)?&\\]|$)/gi

// Guard the pattern itself, so a future edit can't quietly stop checking paths.
function selfTest() {
  const cases = [
    ['<img src="/images/Good Photos/Dave-thumb.webp" alt="">', ['/images/Good Photos/Dave-thumb.webp']],
    ['srcset="/images/About Marie/a-480.webp 480w, /images/About Marie/a.webp 800w"', ['/images/About Marie/a-480.webp', '/images/About Marie/a.webp']],
    ['<source srcSet="/images/Hero/x-mobile.webp"/>', ['/images/Hero/x-mobile.webp']],
    ["background:url(/images/Corporate/b.jpg)", ['/images/Corporate/b.jpg']],
    ['<img src="/images/Good%20Photos/c.png?v=2">', ['/images/Good%20Photos/c.png']],
    ['"html":"\\u003cimg src=\\"/images/Blog/d.webp\\" alt=\\"x\\"', ['/images/Blog/d.webp']],
  ]
  for (const [html, expected] of cases) {
    const got = html.match(IMAGE_REF_PATTERN) || []
    if (JSON.stringify(got) !== JSON.stringify(expected)) {
      console.error(`❌ verify-image-references self-test failed on ${html}\n   expected ${JSON.stringify(expected)}\n   got      ${JSON.stringify(got)}`)
      process.exit(1)
    }
  }
}

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
  selfTest()
  if (!fs.existsSync(BUILD_DIR)) {
    console.error(`❌ Build directory not found: ${BUILD_DIR} — run the build first.`)
    process.exit(1)
  }

  const htmlFiles = collectHtmlFiles(BUILD_DIR).filter(
    (f) => !isExcludedFromDeploy(path.relative(BUILD_DIR, f).split(path.sep).join('/'))
  )
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
