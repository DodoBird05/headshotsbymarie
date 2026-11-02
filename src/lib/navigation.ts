// The site's navigation links: one list for every nav (desktop header bar,
// desktop menu after scrolling, phone top bar and phone menu), so they can
// never disagree. Marie's rules: these three only. No services (the funnel
// sends service-page visitors to the homepage/pricing), no Blog (reached via
// About Me), and never change this list without asking her.
export const NAV_LINKS = [
  { text: 'About Me', href: '/about/' },
  { text: 'Pricing', href: '/pricing/' },
  { text: 'Contact', href: '/contact/' },
] as const
