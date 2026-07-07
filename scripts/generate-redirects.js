#!/usr/bin/env node

/**
 * Generate redirect HTML files for old WordPress URLs.
 *
 * Each old URL (e.g. /old-slug/) gets a public/old-slug/index.html that performs
 * an instant meta-refresh redirect to the matching new page.  Google treats a
 * 0-second meta-refresh the same as a 301 redirect for ranking purposes.
 *
 * Run:  node scripts/generate-redirects.js
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://headshotsbymarie.com';

// ── URL mapping ────────────────────────────────────────────────────────────
const redirects = [
  // /portraits/ retired as duplicate of /conceptual-work/ (2026-07-06);
  // points at the notable-person page until the real Portraits hub is built
  { from: '/portraits/', to: '/portraits/stefano-mcghee/' },
  // Old blog posts → best matching new page
  { from: '/hair-up-or-down-for-headshots/', to: '/tips-guides/hair-up-or-down/' },
  { from: '/news/hair-up-or-down/', to: '/tips-guides/hair-up-or-down/' },
  { from: '/the-power-of-a-personalized-email-profile-picture/', to: '/tips-guides/best-headshot-for-linkedin-and-email/' },
  { from: '/how-to-look-thinner-in-your-headshot-5-top-tips-from-the-pros/', to: '/tips-guides/how-to-look-your-best-in-your-headshot/' },
  { from: '/modeling-polaroids-guide-in-phoenix-and-beyond/', to: '/phoenix-actor-headshots/' },
  { from: '/my-journey-into-the-world-of-professional-headshot-photography/', to: '/about-marie/' },
  { from: '/what-does-your-headshot-smile-says-about-you/', to: '/tips-guides/should-you-smile-in-headshot/' },
  { from: '/dos-and-donts-for-business-headshots-and-profile-pictures/', to: '/how-to-prepare/' },
  { from: '/corporate-vs-dating-headshots/', to: '/executive-headshots/' },
  { from: '/understanding-copyrights-of-a-profile-picture/', to: '/tips-guides/understanding-copyrights-of-a-profile-picture/' },
  { from: '/best-colors-for-headshots-matching-skin-tones-and-personal-branding/', to: '/tips-guides/blending-authority-approachability-wardrobe/' },
  { from: '/do-you-need-makeup-for-your-headshot/', to: '/tips-guides/best-makeup-for-headshots/' },
  { from: '/evolution_of_professional_headshots/', to: '/news/' },
  { from: '/how-to-style-your-personal-branding-photoshoot-like-a-wes-anderson-character/', to: '/personal-branding/' },
  { from: '/what-men-should-wear-for-professional-headshots-and-business-portraits/', to: '/tips-guides/what-men-should-wear-for-professional-headshots/' },
  { from: '/what-men-should-wear-for-professional-headshots/', to: '/tips-guides/what-men-should-wear-for-professional-headshots/' },
  { from: '/can-your-headshot-be-a-selfie-unveiling-the-art-of-professional-profile-pictures/', to: '/tips-guides/' },
  { from: '/is-a-selfie-suitable-for-a-professional-headshot/', to: '/tips-guides/' },
  { from: '/open-shade/', to: '/tips-guides/best-locations-outdoor-headshots-phoenix/' },
  { from: '/a-weekend-to-remember-my-portrait-photography-workshop-with-michael-schacht-in-chicago/', to: '/about-marie/' },
  { from: '/eras-photo-and-social-media-profile/', to: '/eras-headshots/' },
  { from: '/how-to-prepare-for-your-photoshoot/', to: '/how-to-prepare/' },
  { from: '/what-happens-when-you-are-late-to-your-photo-session/', to: '/how-to-prepare/' },
  { from: '/blending-authority-and-approachability-in-your-wardrobe/', to: '/tips-guides/blending-authority-approachability-wardrobe/' },
  { from: '/portrait-photography-with-chris-buck/', to: '/about-marie/' },
  { from: '/personal-branding-lessons-from-heinz-you-are-the-brand/', to: '/personal-branding/' },
  { from: '/from-workbook-to-workshop-how-my-brand-styling-guide-took-shape/', to: '/personal-branding/' },
  { from: '/what-to-wear-for-a-headshot/', to: '/tips-guides/blending-authority-approachability-wardrobe/' },
  { from: '/i-won-the-portraitist-award/', to: '/about-marie/' },

  // Old pages → new equivalents
  { from: '/about-marie-feutrier/', to: '/about-marie/' },
  { from: '/corporate-headshots-photographer-phoenix/', to: '/corporate-headshots/' },
  { from: '/corporate/', to: '/corporate-headshots/' },
  { from: '/linkedin-headshots-phoenix/', to: '/linkedin-headshots/' },
  { from: '/category/photography-advice/', to: '/tips-guides/' },
  { from: '/blog/', to: '/news/' },

  // WordPress tag pages
  { from: '/tag/high-school-portraits/', to: '/portraits/' },
  { from: '/tag/professional-photographer/', to: '/tips-guides/' },
  { from: '/tag/professional-portrait-photographer/', to: '/tips-guides/' },
  { from: '/tag/acting-headshots/', to: '/phoenix-actor-headshots/' },
  { from: '/tag/magazine-style-photography/', to: '/news/' },
  { from: '/tag/visual-communication/', to: '/tips-guides/' },
  { from: '/tag/photography-workshop/', to: '/about-marie/' },
  { from: '/tag/lighting/', to: '/tips-guides/' },
  { from: '/tag/headshot-trends/', to: '/news/' },
  { from: '/tag/photography-award/', to: '/about-marie/' },
  { from: '/tag/family-portrait/', to: '/portraits/' },
  { from: '/tag/email-profile-pictures/', to: '/tips-guides/' },
  { from: '/tag/photoshoot-makeup/', to: '/tips-guides/best-makeup-for-headshots/' },

  // Old blog posts missing redirects
  { from: '/linkedin-headshots-audit-phoenix/', to: '/linkedin-headshots/' },
  { from: '/three-mistakes-professionals-make-before-a-photoshoot/', to: '/how-to-prepare/' },
  { from: '/building-trust-likeability-and-connection-with-your-profile-picture/', to: '/tips-guides/' },
  { from: '/enhance-your-digital-identity-across-platforms-by-tailoring-profile-photos/', to: '/tips-guides/' },
  { from: '/capturing-the-magic-of-senior-memories-a-high-school-tradition-turned-glam-photoshoot/', to: '/portraits/' },
  { from: '/why-great-speakers-invest-in-great-headshots/', to: '/tips-guides/' },

  // Preemptive redirects (found via GSC referring pages)
  { from: '/tag/cinematic-photography/', to: '/news/' },
  { from: '/to-smile-or-not-to-smile-the-great-headshot-dilemma/', to: '/tips-guides/should-you-smile-in-headshot/' },

  // Misc/broken WordPress URLs
  { from: '/envira/alec-fav/', to: '/portraits/' },
  { from: '/acting-hedashots-in-phoenix/', to: '/phoenix-actor-headshots/' },
  { from: '/actor-headshots/', to: '/phoenix-actor-headshots/' },
  { from: '/Blog/', to: '/news/' },
  { from: '/c/', to: '/' },
];

// ── HTML template ──────────────────────────────────────────────────────────
function buildHTML(absoluteTo) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="refresh" content="0;url=${absoluteTo}">
<link rel="canonical" href="${absoluteTo}">
<title>Redirecting…</title>
</head>
<body>
<p>This page has moved. If you are not redirected automatically, <a href="${absoluteTo}">click here</a>.</p>
<script>window.location.replace("${absoluteTo}");</script>
</body>
</html>
`;
}

// ── Generate files ─────────────────────────────────────────────────────────
const publicDir = path.join(__dirname, '..', 'public');
let created = 0;

for (const { from, to } of redirects) {
  // from is like "/old-slug/" → directory "public/old-slug", file "index.html"
  const slug = from.replace(/^\/|\/$/g, ''); // strip leading/trailing slashes
  const dir = path.join(publicDir, ...slug.split('/'));
  const file = path.join(dir, 'index.html');

  // Skip if the directory already contains non-redirect content
  if (fs.existsSync(file)) {
    const existing = fs.readFileSync(file, 'utf8');
    if (!existing.includes('meta http-equiv="refresh"')) {
      console.log(`  SKIP  ${from}  (existing non-redirect file)`);
      continue;
    }
  }

  fs.mkdirSync(dir, { recursive: true });
  const absoluteTo = BASE_URL + to;
  fs.writeFileSync(file, buildHTML(absoluteTo), 'utf8');
  created++;
  console.log(`  OK    ${from}  →  ${to}`);
}

console.log(`\nDone. Created ${created} redirect file(s) in public/.`);
