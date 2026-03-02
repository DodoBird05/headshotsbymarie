const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_DIR = path.join(__dirname, '..', 'content');
const BLOG_DIR = path.join(CONTENT_DIR, 'blog');
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'sitemap-images.xml');
const BASE_URL = 'https://headshotsbymarie.com';
const GEO_LOCATION = 'Gilbert, Arizona, USA';

const IMAGE_EXTENSIONS = /\.(webp|jpg|jpeg|png)$/i;
const SKIP_VARIANTS = /-(thumb|sm|mobile)\./i;
const SKIP_OG_PATH = /-OG-/i;

// Recursively extract image paths and their alt text from a frontmatter object
function extractImages(obj, parentKey) {
  const images = [];

  if (obj === null || obj === undefined) return images;

  if (Array.isArray(obj)) {
    for (const item of obj) {
      images.push(...extractImages(item, parentKey));
    }
    return images;
  }

  if (typeof obj === 'object') {
    const keys = Object.keys(obj);
    for (const key of keys) {
      const value = obj[key];

      // Skip the ogImage field entirely
      if (key === 'ogImage') continue;

      if (typeof value === 'string' && value.startsWith('/images/') && IMAGE_EXTENSIONS.test(value)) {
        // Found an image path — look for a sibling alt text key
        let alt = '';
        const altCandidates = keys.filter(k =>
          k !== key && k.toLowerCase().includes('alt')
        );
        for (const altKey of altCandidates) {
          if (typeof obj[altKey] === 'string' && obj[altKey].length > 0) {
            alt = obj[altKey];
            break;
          }
        }
        images.push({ path: value, alt });
      } else {
        images.push(...extractImages(value, key));
      }
    }
    return images;
  }

  return images;
}

// Map content file path to page URL
function getPageUrl(filePath, frontmatter) {
  const relative = path.relative(CONTENT_DIR, filePath);
  const parsed = path.parse(relative);

  // Blog posts
  if (relative.startsWith('blog/')) {
    const slug = parsed.name;
    const category = frontmatter.category || '';

    if (category === 'Tips & Guides') {
      return `${BASE_URL}/tips-guides/${slug}`;
    }
    // All other categories (News, Studio Life, Conceptual Work, About Marie) go to /news/
    return `${BASE_URL}/news/${slug}`;
  }

  // Home page
  if (parsed.name === 'home') {
    return `${BASE_URL}/`;
  }

  // Regular pages
  return `${BASE_URL}/${parsed.name}`;
}

// Filter out variant images and OG images
function filterImages(images) {
  return images.filter(img => {
    if (SKIP_VARIANTS.test(img.path)) return false;
    if (SKIP_OG_PATH.test(img.path)) return false;
    return true;
  });
}

// Deduplicate images by path within a single page
function deduplicateImages(images) {
  const seen = new Set();
  return images.filter(img => {
    if (seen.has(img.path)) return false;
    seen.add(img.path);
    return true;
  });
}

// Escape XML special characters
function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Encode URL path segments (handle spaces and special characters)
function encodeImageUrl(imagePath) {
  const segments = imagePath.split('/');
  return segments.map(seg => encodeURIComponent(seg)).join('/');
}

function generateSitemap() {
  const pages = [];

  // Gather all content files
  const contentFiles = fs.readdirSync(CONTENT_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => path.join(CONTENT_DIR, f));

  const blogFiles = fs.existsSync(BLOG_DIR)
    ? fs.readdirSync(BLOG_DIR)
        .filter(f => f.endsWith('.md'))
        .map(f => path.join(BLOG_DIR, f))
    : [];

  const allFiles = [...contentFiles, ...blogFiles];

  for (const filePath of allFiles) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(content);

    const rawImages = extractImages(data, null);
    const filtered = filterImages(rawImages);
    const unique = deduplicateImages(filtered);

    if (unique.length === 0) continue;

    const pageUrl = getPageUrl(filePath, data);
    pages.push({ url: pageUrl, images: unique });
  }

  // Sort pages alphabetically by URL for consistent output
  pages.sort((a, b) => a.url.localeCompare(b.url));

  // Build XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

  let totalImages = 0;

  for (const page of pages) {
    xml += '  <url>\n';
    xml += `    <loc>${escapeXml(page.url)}</loc>\n`;

    for (const img of page.images) {
      const imageUrl = `${BASE_URL}${encodeImageUrl(img.path)}`;
      xml += '    <image:image>\n';
      xml += `      <image:loc>${escapeXml(imageUrl)}</image:loc>\n`;
      if (img.alt) {
        xml += `      <image:title>${escapeXml(img.alt)}</image:title>\n`;
      }
      xml += `      <image:geo_location>${GEO_LOCATION}</image:geo_location>\n`;
      xml += '    </image:image>\n';
      totalImages++;
    }

    xml += '  </url>\n';
  }

  xml += '</urlset>\n';

  fs.writeFileSync(OUTPUT_PATH, xml, 'utf-8');

  console.log(`Image sitemap generated: ${OUTPUT_PATH}`);
  console.log(`${totalImages} images across ${pages.length} pages`);
}

generateSitemap();
