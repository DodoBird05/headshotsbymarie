// Centralised Romie type system.
//
// These roles are lifted verbatim from the homepage (src/components/HomePage.tsx),
// which is the reference implementation Marie signed off on. Every other page is
// expected to use these rather than restating font properties inline, so the site
// reads as one typographic system and a future change lands in one place.
//
// Each role carries TYPE properties only — family, weight, style, size, tracking,
// leading, casing, OpenType features. Colour, margin and layout stay with the call
// site, because those legitimately differ per section (dark sections, warm-white
// sections, and so on). Spread the role, then add what the section needs:
//
//   <h2 style={{ ...type.h2, color: '#F5F0EB', marginBottom: '2rem' }}>
//
// Romie ships three weights (400/500/700) mapped in _document.tsx onto the
// requested 100-449 / 450-649 / 650-900 ranges. Weight 300 is the site's default
// text weight and renders as Romie Regular.

import type { CSSProperties } from 'react'

/** The only family on the site. Code blocks are the sole exception (see `mono`). */
export const FONT_STACK = '"Romie", serif'

/**
 * Swash A (ss03) and swash R (ss05) — the Romie italic display treatment used on
 * the homepage H1. Only for display headings set in italic; it does nothing
 * useful on body copy.
 */
export const DISPLAY_FEATURES = '"ss03", "ss05"'

/**
 * Monospace, for rendering code only. Not part of the brand type system — it is
 * here so the one place that needs it does not invent its own stack.
 */
export const MONO_STACK = 'Menlo, Monaco, monospace'

export const type = {
  /**
   * Small wide-tracked label sitting above a hero H1 ("Headshots by Marie",
   * "Headshot Photographer"). Title Case as authored — never transformed.
   */
  kicker: {
    fontFamily: FONT_STACK,
    fontWeight: 400,
    fontSize: '0.9rem',
    letterSpacing: '0.3em',
  } as CSSProperties,

  /** Kicker on a light background: one step lighter and slightly tighter. */
  kickerLight: {
    fontFamily: FONT_STACK,
    fontWeight: 300,
    fontSize: '0.85rem',
    letterSpacing: '0.25em',
  } as CSSProperties,

  /**
   * Hero H1. Italic with the display swashes, and deliberately NOT blanket
   * uppercase — the homepage applies casing per span so mixed-case phrases
   * survive. Call sites that want caps wrap the relevant span themselves.
   *
   * On size: the homepage hand-splits its hero into two hard-coded steps, a
   * mobile block at clamp(2.2rem, 9vw, 3.5rem) and a desktop block at
   * clamp(2.5rem, 5vw, 4.5rem), because it renders each separately. Everywhere
   * else renders one element for both, so this merges them — the homepage's
   * mobile floor with the homepage's desktop growth and cap. That matters
   * because service and location titles run far longer than the homepage's
   * four hand-broken words, and a 2.5rem floor overflows them on a phone.
   */
  h1: {
    fontFamily: FONT_STACK,
    fontWeight: 300,
    fontStyle: 'italic',
    fontFeatureSettings: DISPLAY_FEATURES,
    fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
    letterSpacing: '0.04em',
    lineHeight: 0.95,
  } as CSSProperties,

  /** Large section H2, the widest of the heading steps. */
  h2Large: {
    fontFamily: FONT_STACK,
    fontWeight: 300,
    fontSize: 'clamp(2rem, 5vw, 4rem)',
    letterSpacing: '0.04em',
    lineHeight: 1.05,
  } as CSSProperties,

  /** Default section H2. */
  h2: {
    fontFamily: FONT_STACK,
    fontWeight: 300,
    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
    letterSpacing: '0.03em',
    lineHeight: 1.1,
  } as CSSProperties,

  /** H3, and H2s that sit inside a column rather than spanning the page. */
  h3: {
    fontFamily: FONT_STACK,
    fontWeight: 300,
    fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
    letterSpacing: '0.03em',
    lineHeight: 1.1,
  } as CSSProperties,

  /**
   * The small heading that opens a text column — homepage intro paragraph
   * pattern. Body-sized, but tracked wider so it still reads as a heading.
   */
  h4: {
    fontFamily: FONT_STACK,
    fontWeight: 300,
    fontSize: '1.1rem',
    letterSpacing: '0.05em',
  } as CSSProperties,

  /** Running body copy. */
  body: {
    fontFamily: FONT_STACK,
    fontWeight: 300,
    fontSize: '1rem',
    lineHeight: 1.75,
  } as CSSProperties,

  /** Body copy in a narrow column, one step down. */
  bodySmall: {
    fontFamily: FONT_STACK,
    fontWeight: 300,
    fontSize: '0.95rem',
    lineHeight: 1.7,
  } as CSSProperties,

  /** Pull quote / testimonial. */
  quote: {
    fontFamily: FONT_STACK,
    fontWeight: 300,
    fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
    lineHeight: 1.3,
  } as CSSProperties,

  /**
   * Attribution and metadata under a quote, and any similar small caps label.
   * This is the one role that is uppercase by design.
   */
  meta: {
    fontFamily: FONT_STACK,
    fontWeight: 400,
    fontSize: '0.75rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
  } as CSSProperties,

  /** Buttons and pill links. Title Case, medium weight. */
  button: {
    fontFamily: FONT_STACK,
    fontWeight: 500,
    fontSize: '1.125rem',
  } as CSSProperties,

  /** Navigation items. */
  nav: {
    fontFamily: FONT_STACK,
    fontWeight: 400,
    letterSpacing: '0.05em',
  } as CSSProperties,
} as const

/**
 * Emphasis inside a heading or quote. The homepage sets key phrases in Romie
 * italic at the same size; use this rather than a bare <em> so the browser's
 * default italic synthesis is never relied on.
 */
export const emphasis: CSSProperties = { fontStyle: 'italic' }
