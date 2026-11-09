// Marie's Romie logos (2026-11-09). Her masters: ~/Documents/Riemagine/Logo/HBM/2026/
// ("Headshots-Marie Feutrier-Logo.svg", "HeadshotsByMarie-SquareLogo.svg").
// The white files are recoloured copies of those: the navigation shows them as
// is on dark photos and darkens them with CSS `invert(1)` on light pages.
// New file names, never overwriting old ones: a new key needs no CloudFront
// invalidation, and the old files stay for anything still pointing at them.
export const LOGOS = {
  /** "HEADSHOTS / Marie Feutrier", black: schema.org logo, light backgrounds */
  wide: '/Logo/headshots-marie-feutrier-logo.svg',
  /** Same, white */
  wideWhite: '/Logo/headshots-marie-feutrier-logo-white.svg',
  /** Romie "M", dark (#1c1c1c): "Home" link on the about/blog pages */
  square: '/Logo/marie-feutrier-square-logo.svg',
  /** Romie "M", white: compact logo once the page has scrolled, phone top bar */
  squareWhite: '/Logo/marie-feutrier-square-logo-white.svg',
}

export const LOGO_ALT = 'Headshots by Marie Feutrier'
