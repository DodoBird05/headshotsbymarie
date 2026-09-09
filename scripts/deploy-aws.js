#!/usr/bin/env node

/**
 * AWS S3 + CloudFront Deployment Script
 *
 * Prerequisites:
 * 1. Install AWS CLI: https://aws.amazon.com/cli/
 * 2. Configure AWS credentials: aws configure
 * 3. Set environment variables (or edit this file):
 *    - AWS_S3_BUCKET: Your S3 bucket name
 *    - AWS_CLOUDFRONT_ID: Your CloudFront distribution ID (optional)
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration - UPDATE THESE VALUES
const S3_BUCKET = process.env.AWS_S3_BUCKET || 'headshotsbymarie.com';
const CLOUDFRONT_ID = process.env.AWS_CLOUDFRONT_ID || 'E294PA6BZXYU0R'; // CloudFront distribution ID
const BUILD_DIR = 'out';

// Test pages to exclude from production deployment (keep locally only).
// IMPORTANT: AWS CLI S3 filters need glob wildcards — a bare 'qa/' pattern
// matches only a literal object key named 'qa/', NOT 'qa/index.html'.
// (The old wildcard-less patterns never excluded anything: the test pages
// were live in production until 2026-07.)
// With trailingSlash:true, pages export as '<name>/index.html', so
// '<name>/*' is the pattern that actually matches.
const EXCLUDE_PAGES = [
  'test.html',
  'test/*',
  'button-test.html',
  'button-test/*',
  'sticky-test.html',
  'sticky-test/*',
  'testimonial-demo.html',
  'testimonial-demo/*',
  '3-responsive-images.html',
  '3-responsive-images/*',
  // NOTE: /qa/ was originally listed here as a test page, but it is a real
  // public page (in sitemap.xml, allowed in robots.txt, full SEO meta) —
  // deliberately NOT excluded so updates to it keep deploying.
  'one-photo-left.html',
  'one-photo-left/*',
  'one-photo-right.html',
  'one-photo-right/*',
  'scott.html',
  'scott/*',
];

console.log('🚀 Starting AWS S3 deployment...\n');

// Step 1: Check if AWS CLI is installed
try {
  execSync('aws --version', { stdio: 'ignore' });
  console.log('✅ AWS CLI is installed');
} catch (error) {
  console.error('❌ AWS CLI is not installed!');
  console.error('Install it from: https://aws.amazon.com/cli/');
  process.exit(1);
}

// Step 2: Check configuration
if (S3_BUCKET === 'YOUR_BUCKET_NAME_HERE') {
  console.error('❌ Please configure your S3 bucket name!');
  console.error('Edit scripts/deploy-aws.js or set AWS_S3_BUCKET environment variable');
  process.exit(1);
}

// Step 3: Build the site
console.log('\n📦 Building Next.js site for static export...');
try {
  execSync('pnpm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully');
} catch (error) {
  console.error('❌ Build failed!');
  process.exit(1);
}

// Step 4: Check if build directory exists
if (!fs.existsSync(BUILD_DIR)) {
  console.error(`❌ Build directory '${BUILD_DIR}' not found!`);
  process.exit(1);
}

// Step 5: Upload to S3
console.log(`\n☁️  Uploading to S3 bucket: ${S3_BUCKET}...`);
console.log('📝 Excluding test pages from deployment...\n');

// Build exclude arguments for test pages
const excludeArgs = EXCLUDE_PAGES.map(page => `--exclude "${page}"`).join(' ');

// Snapshot the media already in the bucket BEFORE syncing. This is what lets us
// tell a REPLACED file — same key, different bytes, so edges are serving a stale
// copy — from a brand-new one, which nothing has cached and which therefore needs
// no invalidation. Without the distinction a first deploy would invalidate every
// image on the site for nothing (invalidations are billed past 1,000 paths/month).
// Returns null if the listing fails, meaning "unknown": we then invalidate every
// changed media key, trading cost for correctness.
function snapshotExistingKeys() {
  try {
    const out = execSync(
      `aws s3api list-objects-v2 --bucket "${S3_BUCKET}" --query "Contents[].Key" --output text`,
      { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 }
    );
    return new Set(out.split(/\s+/).filter(Boolean));
  } catch (error) {
    console.warn('⚠️  Could not list existing S3 objects; will invalidate all changed media.');
    return null;
  }
}

// Pull the S3 keys touched out of `aws s3 sync` output. Lines look like
//   upload: out/images/a b.webp to s3://bucket/images/a b.webp
//   delete: s3://bucket/images/old.webp
// The greedy `.+` before " to s3://" is deliberate: filenames contain spaces
// (e.g. "Good Photos/"), so splitting on whitespace would truncate them.
function parseTouchedKeys(syncOutput) {
  const uploaded = [];
  const deleted = [];
  for (const line of syncOutput.split('\n')) {
    const up = line.match(/^upload: .+ to s3:\/\/[^/]+\/(.+)$/);
    if (up) { uploaded.push(up[1].trim()); continue; }
    const del = line.match(/^delete: s3:\/\/[^/]+\/(.+)$/);
    if (del) deleted.push(del[1].trim());
  }
  return { uploaded, deleted };
}

// CloudFront wants URL-encoded absolute paths; encode per segment so the "/"
// separators survive and a space becomes %20.
function toInvalidationPath(key) {
  return '/' + key.split('/').map(encodeURIComponent).join('/');
}

const existingKeys = snapshotExistingKeys();
let changedMediaPaths = [];

try {
  // Pass 1: images/fonts/videos (everything except HTML/XML/TXT and _next).
  // --size-only: `next build` rewrites every file's mtime, so the default
  // size+mtime comparison re-uploaded ~140 MB of unchanged media every
  // deploy. Size-only skips them. (Caveat: replacing a file with a
  // different one of EXACTLY the same byte size won't re-upload — rename
  // the file in that freak case.)
  // Cache: one week + stale-while-revalidate instead of a year+immutable —
  // these filenames are NOT content-hashed, and `immutable` meant a
  // replaced image could stay stale in browsers for a year.
  const mediaSync = execSync(
    `aws s3 sync "${BUILD_DIR}/" "s3://${S3_BUCKET}/" --delete --size-only --cache-control "public,max-age=604800,stale-while-revalidate=86400" --exclude "*.html" --exclude "*.xml" --exclude "*.txt" --exclude "_next/*" --exclude "clients/*" --exclude "assets/*" ${excludeArgs}`,
    // Captured rather than inherited so we can see which keys actually moved.
    // Cost: this pass's progress prints when it finishes instead of streaming.
    { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 }
  );
  process.stdout.write(mediaSync);

  // A media file is stale at the edge when its key already existed and the bytes
  // changed, or when it was deleted and edges still hold it. New keys are skipped.
  const { uploaded, deleted } = parseTouchedKeys(mediaSync);
  const replaced = existingKeys === null ? uploaded : uploaded.filter(k => existingKeys.has(k));
  changedMediaPaths = [...new Set([...replaced, ...deleted])].map(toInvalidationPath);
  if (changedMediaPaths.length > 0) {
    console.log(`\n🖼️  ${replaced.length} replaced and ${deleted.length} deleted media file(s) need edge invalidation.`);
  }

  // Pass 2: _next/* bundles — genuinely content-hashed, so immutable+1y is
  // correct here (new content always means a new filename).
  execSync(
    `aws s3 sync "${BUILD_DIR}/" "s3://${S3_BUCKET}/" --delete --cache-control "public,max-age=31536000,immutable" --exclude "*" --include "_next/*"`,
    { stdio: 'inherit' }
  );

  // Pass 3: HTML/XML/TXT with no-cache semantics (unchanged behavior)
  execSync(
    `aws s3 sync "${BUILD_DIR}/" "s3://${S3_BUCKET}/" --delete --cache-control "public,max-age=0,must-revalidate" --exclude "*" --include "*.html" --include "*.xml" --include "*.txt" --exclude "_next/*" --exclude "clients/*" --exclude "assets/*" ${excludeArgs}`,
    { stdio: 'inherit' }
  );

  console.log('✅ Files uploaded to S3 successfully');
  console.log(`✅ Test pages excluded: ${EXCLUDE_PAGES.length} pages kept local only`);
} catch (error) {
  console.error('❌ S3 upload failed!');
  console.error('Make sure you have configured AWS credentials: aws configure');
  process.exit(1);
}

// Step 6: Invalidate CloudFront cache (if configured)
// Targeted invalidation by EXACT document URL (no wildcards). The old blanket
// "/*" evicted every image from every edge on every deploy, so post-deploy
// visitors pulled all media from origin for days. Wildcards can't be used per
// directory either: CloudFront caps IN-PROGRESS WILDCARD invalidation paths
// at 15 (TooManyInvalidationsInProgress). Exact paths are limited to 3,000 per
// request instead — the site has ~140 documents — so we list each page's real
// request URL. Asset trees (/images, /_next, /fonts) are never listed, so they
// stay cached at the edge.

// Old-WordPress-URL redirect fallbacks (generate-redirects.js) are static
// meta-refresh stubs that never change, and the CloudFront function 301s those
// URLs at the edge before the cache is consulted — invalidating them is waste.
function isRedirectStub(fullPath) {
  const html = fs.readFileSync(fullPath, 'utf8');
  return html.includes('http-equiv="refresh"');
}

// Walk the export and return the exact request URL of every HTML/XML/TXT
// document. A directory's index.html becomes its pretty URL ("/about/");
// other docs keep their literal path ("/sitemap.xml", "/404.html").
function collectInvalidationPaths(buildDir, prefix = '') {
  const paths = [];
  for (const entry of fs.readdirSync(buildDir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (entry.name === '_next' || entry.name === 'clients' || entry.name === 'assets') continue;
      paths.push(...collectInvalidationPaths(path.join(buildDir, entry.name), `${prefix}/${entry.name}`));
    } else if (entry.name === 'index.html') {
      if (isRedirectStub(path.join(buildDir, entry.name))) continue;
      paths.push(prefix === '' ? '/' : `${prefix}/`); // pretty URL for the page
    } else if (/\.(html|xml|txt)$/.test(entry.name)) {
      paths.push(`${prefix}/${entry.name}`); // sitemaps, robots.txt, 404.html, etc.
    }
  }
  return paths;
}

if (CLOUDFRONT_ID) {
  console.log(`\n🔄 Invalidating CloudFront cache: ${CLOUDFRONT_ID}...`);
  try {
    let docPaths = [...new Set(collectInvalidationPaths(BUILD_DIR))];
    // Safety net: full wipe only if document collection failed outright.
    if (docPaths.length === 0) {
      docPaths = ['/*'];
    }

    // Documents plus any media that changed under an existing name. Untouched
    // asset trees are still never listed, so they stay cached at the edge.
    const allPaths = [...new Set([...docPaths, ...changedMediaPaths])];

    // 3,000 exact paths per request is the CloudFront cap; chunk rather than
    // falling back to "/*", which would evict every image from every edge and
    // send post-deploy visitors to the origin for days.
    const CHUNK = 2900;
    const chunks = [];
    for (let i = 0; i < allPaths.length; i += CHUNK) {
      chunks.push(allPaths.slice(i, i + CHUNK));
    }

    chunks.forEach((chunk, i) => {
      const pathArgs = chunk.map(p => `"${p}"`).join(' ');
      execSync(
        `aws cloudfront create-invalidation --distribution-id "${CLOUDFRONT_ID}" --paths ${pathArgs}`,
        { stdio: 'pipe' }
      );
      if (chunks.length > 1) {
        console.log(`   batch ${i + 1}/${chunks.length}: ${chunk.length} paths`);
      }
    });

    console.log(`✅ CloudFront cache invalidated (${docPaths.length} document paths` +
      (changedMediaPaths.length > 0
        ? ` + ${changedMediaPaths.length} changed media path(s); untouched images stay cached at the edge)`
        : `; images stay cached at the edge)`));
  } catch (error) {
    console.error('⚠️  CloudFront invalidation failed:', error.stderr ? error.stderr.toString().trim() : error.message);
  }
} else {
  console.log('\nℹ️  Skipping CloudFront invalidation (not configured)');
  console.log('   Set AWS_CLOUDFRONT_ID to enable cache invalidation');
}

// Step 6: Commit the regenerated sitemaps.
//
// generate-sitemap.js dates each <lastmod> from the last COMMIT that touched
// that page's source, so the correct date cannot exist until after the commit
// is made. The sequence is always: edit -> commit (sitemap still carries the
// previous dates) -> deploy -> build rewrites the dates. That left sitemap.xml
// permanently dirty afterwards, so the repo never matched what was live.
//
// This runs only after a successful upload and invalidation, so a commit here
// means "this is what production is serving". It stages ONLY the two sitemap
// files: never -a, never ".", so unrelated work in progress is untouched.
// Failures are reported and swallowed — the deploy has already succeeded and
// must not be reported as failed over a bookkeeping commit.
const SITEMAP_FILES = ['public/sitemap.xml', 'public/sitemap-images.xml'];

try {
  execSync('git rev-parse --is-inside-work-tree', { stdio: 'pipe' });

  const branch = execSync('git rev-parse --abbrev-ref HEAD', { stdio: 'pipe' })
    .toString().trim();

  if (branch === 'HEAD') {
    console.log('\nℹ️  Detached HEAD — leaving the regenerated sitemaps uncommitted.');
  } else {
    const changed = SITEMAP_FILES.filter(f => {
      try {
        execSync(`git diff --quiet -- "${f}"`, { stdio: 'pipe' });
        return false;           // exit 0 = no change
      } catch {
        return true;            // exit 1 = changed
      }
    });

    if (changed.length === 0) {
      console.log('\n✅ Sitemaps unchanged by the build; nothing to commit.');
    } else {
      execSync(`git add ${changed.map(f => `"${f}"`).join(' ')}`, { stdio: 'pipe' });
      execSync(
        'git commit -m "Update sitemap lastmod dates from deploy build" ' +
        `-- ${changed.map(f => `"${f}"`).join(' ')}`,
        { stdio: 'pipe' }
      );
      const sha = execSync('git rev-parse --short HEAD', { stdio: 'pipe' }).toString().trim();
      console.log(`\n✅ Committed regenerated sitemap(s) as ${sha}: ${changed.join(', ')}`);
      console.log('   Not pushed — run `git push origin ' + branch + '` to sync GitHub.');
    }
  }
} catch (error) {
  console.warn('\n⚠️  Could not commit the regenerated sitemaps:',
    error.stderr ? error.stderr.toString().trim() : error.message);
  console.warn('   The deploy itself succeeded; commit them by hand if you want the repo to match.');
}

console.log('\n🎉 Deployment completed successfully!');
console.log(`\n📍 Your site is now live at: http://${S3_BUCKET}.s3-website-us-east-1.amazonaws.com`);
console.log('   (Or your custom CloudFront domain if configured)\n');
