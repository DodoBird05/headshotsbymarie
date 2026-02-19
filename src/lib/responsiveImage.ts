/**
 * Returns the mobile-variant path for a given image src.
 * e.g. "/images/Foo/bar.webp" → "/images/Foo/bar-mobile.webp"
 */
export function getMobileSrc(src: string): string {
  return src.replace(/(\.\w+)$/, '-mobile$1')
}
