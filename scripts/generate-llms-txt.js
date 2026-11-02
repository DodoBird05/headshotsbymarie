/**
 * Rebuild the Tips & Guides list in public/llms.txt from content/blog.
 *
 * Why this exists: llms.txt is what AI assistants (ChatGPT, Claude, Perplexity,
 * Google) read for a summary of the site. The rest of the file is curated by
 * hand, but the guide list is a fact about content/blog, and a hand-kept copy
 * drifted until it listed none of the 17 guides (review item V-8, 2026-11-01).
 *
 * Only the block between the tips-guides:start and tips-guides:end markers is
 * rewritten. Each line is the post's title and its seoDescription (the short
 * Google description) or, failing that, its excerpt. Newest first.
 *
 *   node scripts/generate-llms-txt.js           # rewrite the block in place
 *   node scripts/generate-llms-txt.js --check    # report only, exit 1 if stale
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const ROOT = path.join(__dirname, '..');
const LLMS_PATH = path.join(ROOT, 'public', 'llms.txt');
const BLOG_DIR = path.join(ROOT, 'content', 'blog');
const BASE_URL = 'https://headshotsbymarie.com';
const CATEGORY = 'Tips & Guides';
const START = /<!-- tips-guides:start[^>]*-->/;
const END = '<!-- tips-guides:end -->';

const CHECK_ONLY = process.argv.includes('--check');

function oneLine(text) {
  return String(text || '').replace(/\s+/g, ' ').trim();
}

function guideLines() {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => ({ slug: f.replace(/\.md$/, ''), data: matter(fs.readFileSync(path.join(BLOG_DIR, f), 'utf8')).data }))
    .filter(({ data }) => data.category === CATEGORY)
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime() || a.slug.localeCompare(b.slug))
    .map(({ slug, data }) => {
      const summary = oneLine(data.seoDescription || data.excerpt);
      const title = oneLine(data.title) || slug;
      return `- [${title}](${BASE_URL}/tips-guides/${slug}/)${summary ? `: ${summary}` : ''}`;
    });
}

function main() {
  const original = fs.readFileSync(LLMS_PATH, 'utf8');
  const startMatch = original.match(START);
  const endIndex = original.indexOf(END);
  if (!startMatch || endIndex === -1 || endIndex < startMatch.index) {
    console.error('generate-llms-txt: tips-guides markers missing or out of order in public/llms.txt');
    process.exit(1);
  }

  const lines = guideLines();
  const before = original.slice(0, startMatch.index + startMatch[0].length);
  const after = original.slice(endIndex);
  const updated = `${before}\n${lines.join('\n')}\n${after}`;

  console.log(`llms.txt: ${lines.length} Tips & Guides post(s) listed`);

  if (CHECK_ONLY) {
    const stale = updated !== original;
    console.log(stale ? '--check: llms.txt is out of date.' : '--check: llms.txt is current.');
    process.exit(stale ? 1 : 0);
  }

  if (updated !== original) {
    fs.writeFileSync(LLMS_PATH, updated);
    console.log('public/llms.txt updated.');
  } else {
    console.log('No changes written.');
  }
}

main();
