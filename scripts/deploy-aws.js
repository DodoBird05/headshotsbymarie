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
  execSync(
    `aws s3 sync "${BUILD_DIR}/" "s3://${S3_BUCKET}/" --delete --size-only --cache-control "public,max-age=604800,stale-while-revalidate=86400" --exclude "*.html" --exclude "*.xml" --exclude "*.txt" --exclude "_next/*" --exclude "clients/*" --exclude "assets/*" ${excludeArgs}`,
    { stdio: 'inherit' }
  );

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
// Targeted invalidation: the old blanket "/*" evicted every image from every
// edge on every deploy, so post-deploy visitors pulled all media from origin
// for days. Instead: one wildcard per top-level directory that contains HTML
// (pages), plus root documents. Asset trees (/images, /_next, /fonts, …)
// never appear, so they stay cached at the edge. Kept to ~45 paths because
// CloudFront bills per path after 1,000/month.
function dirContainsHtml(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith('.html')) return true;
    if (entry.isDirectory() && dirContainsHtml(path.join(dir, entry.name))) return true;
  }
  return false;
}

// Old-WordPress-URL redirect fallbacks (generated by generate-redirects.js)
// are static meta-refresh stubs that never change, and the CloudFront
// function 301s those URLs at the edge before the cache is even consulted —
// invalidating them is pure waste (they were ~60 of the paths).
function isRedirectStubDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  if (entries.length !== 1 || entries[0].name !== 'index.html') return false;
  const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
  return html.includes('http-equiv="refresh"');
}

function collectInvalidationPaths(buildDir) {
  const paths = ['/']; // the root document
  for (const entry of fs.readdirSync(buildDir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (entry.name === '_next' || entry.name === 'clients' || entry.name === 'assets') continue;
      const full = path.join(buildDir, entry.name);
      if (isRedirectStubDir(full)) continue;
      if (dirContainsHtml(full)) {
        paths.push(`/${entry.name}/*`); // covers /dir/, /dir/index.html, and nested pages
      }
    } else if (/\.(html|xml|txt)$/.test(entry.name)) {
      paths.push(`/${entry.name}`); // root-level docs: index.html, sitemaps, robots.txt
    }
  }
  return paths;
}

if (CLOUDFRONT_ID) {
  console.log(`\n🔄 Invalidating CloudFront cache: ${CLOUDFRONT_ID}...`);
  try {
    let docPaths = collectInvalidationPaths(BUILD_DIR);
    // Safety net: fall back to a full wipe if collection failed or the list
    // somehow exploded (CloudFront caps one invalidation at 3,000 paths).
    if (docPaths.length <= 1 || docPaths.length > 2900) {
      docPaths = ['/*'];
    }
    const pathArgs = docPaths.map(p => `"${p}"`).join(' ');
    execSync(
      `aws cloudfront create-invalidation --distribution-id "${CLOUDFRONT_ID}" --paths ${pathArgs}`,
      { stdio: 'pipe' }
    );
    console.log(`✅ CloudFront cache invalidated (${docPaths.length} document paths; images stay cached at the edge)`);
  } catch (error) {
    console.error('⚠️  CloudFront invalidation failed (this is optional)');
  }
} else {
  console.log('\nℹ️  Skipping CloudFront invalidation (not configured)');
  console.log('   Set AWS_CLOUDFRONT_ID to enable cache invalidation');
}

console.log('\n🎉 Deployment completed successfully!');
console.log(`\n📍 Your site is now live at: http://${S3_BUCKET}.s3-website-us-east-1.amazonaws.com`);
console.log('   (Or your custom CloudFront domain if configured)\n');
