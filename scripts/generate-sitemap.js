/**
 * Refresh <lastmod> in public/sitemap.xml from the real edit date of each page's
 * source files, and flag pages that have drifted out of the sitemap entirely.
 *
 * Why this exists: the URL list, <changefreq> and <priority> are curated by hand
 * and should stay that way. The dates are not a judgement call — they are a fact
 * about the files — and hand-maintained dates go stale silently. Before this
 * script, /personal-branding/ advertised lastmod 2026-02-10 five months after a
 * full rebuild, and a post published 2026-08-17 was missing from the sitemap.
 *
 * Date source: the last COMMIT that touched the page's content. Two deliberate
 * choices there:
 *
 *   - Committed dates only, never working-tree mtime. The deploy workflow commits
 *     to GitHub before running deploy:aws, so the committed date is what ships.
 *     Using mtime would also let an unrelated edit inflate dates before deploy.
 *   - When a page has a content markdown file, that file alone decides the date.
 *     lastmod is a claim that the CONTENT changed. A code-level refactor across
 *     every page (adding analytics handlers, say) must not tell Google that two
 *     dozen pages were rewritten. Pages with no markdown fall back to their
 *     component, because there the component is the content.
 *
 *   node scripts/generate-sitemap.js           # rewrite lastmod in place
 *   node scripts/generate-sitemap.js --check    # report only, exit 1 on drift
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const SITEMAP_PATH = path.join(ROOT, 'public', 'sitemap.xml');
const BLOG_DIR = path.join(ROOT, 'content', 'blog');
const BASE_URL = 'https://headshotsbymarie.com';

const CHECK_ONLY = process.argv.includes('--check');

/**
 * Source files for a site-relative URL, best first. Only the first file that
 * exists is used, so a page's markdown outranks its component: see the header
 * note on why a code refactor must not move content dates.
 */
function sourceCandidates(url) {
  const slug = url.replace(/^\/|\/$/g, '');

  if (slug === '') {
    return ['content/home.md', 'src/pages/index.tsx'];
  }
  // Blog posts render from a shared [slug] page; the markdown is the content.
  const postMatch = slug.match(/^(?:news|tips-guides)\/(.+)$/);
  if (postMatch) {
    return [`content/blog/${postMatch[1]}.md`];
  }
  if (slug === 'news' || slug === 'tips-guides') {
    return [`src/pages/${slug}.tsx`, `src/pages/${slug}/index.tsx`];
  }
  return [`content/${slug}.md`, `src/pages/${slug}.tsx`];
}

function lastCommitDate(file) {
  const out = execFileSync('git', ['log', '-1', '--format=%ad', '--date=short', '--', file], {
    cwd: ROOT,
    encoding: 'utf8',
  }).trim();
  return out || null;
}

/** Last commit date of the URL's best available source file, or null if none exist. */
function lastmodFor(url) {
  for (const rel of sourceCandidates(url)) {
    if (!fs.existsSync(path.join(ROOT, rel))) continue;
    return lastCommitDate(rel);
  }
  return null;
}

/** Blog posts whose slug appears in no sitemap URL. */
function missingPosts(urls) {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const slugs = new Set(urls.map((u) => u.replace(/^\/|\/$/g, '').split('/').pop()));
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
    .filter((slug) => !slugs.has(slug));
}

function main() {
  const original = fs.readFileSync(SITEMAP_PATH, 'utf8');

  const urls = [];
  const changes = [];
  const unresolved = [];

  // Rewrite each <url> block's <lastmod> in place, leaving everything else alone.
  const updated = original.replace(
    /(<loc>\s*)([^<]+?)(\s*<\/loc>\s*<lastmod>)([^<]*)(<\/lastmod>)/g,
    (match, openLoc, loc, midding, currentDate, closeMod) => {
      const url = loc.replace(BASE_URL, '');
      urls.push(url);

      const fresh = lastmodFor(url);
      if (!fresh) {
        unresolved.push(url);
        return match;
      }
      if (fresh !== currentDate) {
        changes.push({ url, from: currentDate, to: fresh });
      }
      return `${openLoc}${loc}${midding}${fresh}${closeMod}`;
    }
  );

  const orphans = missingPosts(urls);

  console.log(`Sitemap: ${urls.length} URLs in public/sitemap.xml`);

  if (changes.length) {
    console.log(`\n${changes.length} lastmod date(s) out of date:`);
    for (const c of changes.sort((a, b) => a.url.localeCompare(b.url))) {
      console.log(`  ${c.url.padEnd(58)} ${c.from} -> ${c.to}`);
    }
  } else {
    console.log('\nAll lastmod dates already current.');
  }

  if (unresolved.length) {
    console.log(`\nWARNING: ${unresolved.length} URL(s) have no source file, so their date was left as-is:`);
    for (const u of unresolved) console.log(`  ${u}`);
  }

  if (orphans.length) {
    console.log(`\nWARNING: ${orphans.length} blog post(s) exist but are not in the sitemap:`);
    for (const slug of orphans) console.log(`  content/blog/${slug}.md`);
  }

  if (CHECK_ONLY) {
    const drifted = changes.length || orphans.length || unresolved.length;
    console.log(drifted ? '\n--check: sitemap is out of date.' : '\n--check: sitemap is current.');
    process.exit(drifted ? 1 : 0);
  }

  if (updated !== original) {
    fs.writeFileSync(SITEMAP_PATH, updated);
    console.log('\npublic/sitemap.xml updated.');
  } else {
    console.log('\nNo changes written.');
  }
}

main();
