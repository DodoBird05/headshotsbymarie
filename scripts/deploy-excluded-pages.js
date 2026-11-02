// Pages that exist in the build but are never deployed (test/demo pages,
// kept locally only). Single source for:
//   - scripts/deploy-aws.js           (passed to `aws s3 sync --exclude`)
//   - scripts/verify-image-references.js (skipped: their images never ship)
// Patterns are AWS CLI sync globs relative to out/.
//
// Test pages to exclude from production deployment (keep locally only).
// IMPORTANT: AWS CLI S3 filters need glob wildcards — a bare 'qa/' pattern
// matches only a literal object key named 'qa/', NOT 'qa/index.html'.
// (The old wildcard-less patterns never excluded anything: the test pages
// were live in production until 2026-07.)
// With trailingSlash:true, pages export as '<name>/index.html', so
// '<name>/*' is the pattern that actually matches.
module.exports = [
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
