/**
 * Shared markdown → HTML renderer for content bodies (blog posts, pricing).
 *
 * Single source of truth: this was previously copy-pasted into
 * news/[slug].tsx and tips-guides/[slug].tsx and the two copies had already
 * diverged (the news copy was missing the image rule, so a body image in a
 * News post would have rendered as literal `![...](...)` text).
 *
 * Handles the subset of markdown used in /content: headers, images, links,
 * bold/italic, bullet lists, paragraphs. Raw HTML blocks (e.g. <figure>)
 * pass through untouched.
 */
export function renderMarkdown(markdown: string): string {
  let html = markdown

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3 style="font-size: 24px; font-weight: bold; margin-top: 30px; margin-bottom: 15px; color: #000; font-family: \'Majesti Banner\', serif;">$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2 style="font-size: 32px; font-weight: bold; margin-top: 40px; margin-bottom: 20px; color: #000; font-family: \'Majesti Banner\', serif;">$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1 style="font-size: 42px; font-weight: bold; margin-bottom: 25px; color: #000; font-family: \'Majesti Banner\', serif;">$1</h1>')

  // Images (before paragraph wrapping and before links, so ![...](...) is consumed first)
  html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<figure style="margin: 30px 0; text-align: center;"><img src="$2" alt="$1" style="max-width: 100%; height: auto; border-radius: 4px;" loading="lazy" /><figcaption style="font-size: 13px; color: #666; margin-top: 8px; font-style: italic;">$1</figcaption></figure>')

  // Inline links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" style="color: #333; text-decoration: underline;">$1</a>')

  // Bold and italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')

  // Line breaks and paragraphs
  html = html.split('\n\n').map(paragraph => {
    if (paragraph.startsWith('<h') || paragraph.startsWith('<ul') || paragraph.startsWith('<ol') || paragraph.startsWith('<figure') || paragraph.startsWith('<div')) {
      return paragraph
    }
    // Convert bullet lists to proper <ul><li> markup
    const lines = paragraph.split('\n')
    if (lines.every(line => line.startsWith('- '))) {
      const items = lines.map(line => `<li style="margin-bottom: 8px;">${line.slice(2)}</li>`).join('')
      return `<ul style="font-size: 16px; line-height: 1.8; color: #333; margin-bottom: 20px; padding-left: 24px; list-style-type: disc;">${items}</ul>`
    }
    return `<p style="font-size: 16px; line-height: 1.8; color: #333; margin-bottom: 20px;">${paragraph}</p>`
  }).join('\n')

  return html
}
