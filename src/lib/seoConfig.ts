// Centralized SEO and business configuration
// Update these values in one place to change across the entire site

import { REVIEW_COUNT } from './reviews'

export const seoConfig = {
  // Domain
  siteUrl: 'https://headshotsbymarie.com',
  siteName: 'Headshots by Marie',

  // Business Info
  businessName: 'Headshots by Marie',
  ownerName: 'Marie Feutrier',
  email: 'marie@headshotsbymarie.com',
  phone: '(480) 524-0741',

  // Location
  city: 'Gilbert',
  state: 'Arizona',
  stateAbbr: 'AZ',
  country: 'USA',

  // Social Media
  social: {
    linkedin: 'https://www.linkedin.com/in/marie-feutrier-mh05/',
    instagram: 'https://www.instagram.com/marie.feutrier/',
    pinterest: 'https://www.pinterest.com/mariefeutrier/',
  },

  // Default SEO
  defaultTitle: 'Headshots by Marie | Private Portrait Studio in Gilbert, Arizona',
  defaultDescription: 'Private headshot studio in Gilbert, Arizona, led by French photographer Marie Feutrier. Unhurried sessions with coaching, and portraits worth sharing.',
  defaultOgImage: '/images/Hero/Professional-Portraits-Phoenix-Hero-By-Marie-Feutrier.webp',

  // Locale
  locale: 'en_US',

  // Schema.org ID
  schemaId: 'https://headshotsbymarie.com/#marie-feutrier',
}

// Helper to build full URLs
export const getFullUrl = (path: string) => `${seoConfig.siteUrl}${path}`

// Helper to build canonical URL
export const getCanonicalUrl = (path: string) => `${seoConfig.siteUrl}${path}`

// Helper to build full image URL
export const getFullImageUrl = (imagePath: string) => `${seoConfig.siteUrl}${imagePath}`

// Service schema generator for service pages
interface ServiceSchemaOptions {
  name: string
  description: string
  url: string
  image?: string
}

export const generateServiceSchema = ({ name, description, url, image }: ServiceSchemaOptions) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${seoConfig.siteUrl}${url}#service`,
  name,
  description,
  serviceType: name,
  url: `${seoConfig.siteUrl}${url}`,
  image: image ? `${seoConfig.siteUrl}${image}` : undefined,
  priceRange: '$$',
  provider: {
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${seoConfig.siteUrl}/#business`,
    name: seoConfig.businessName,
    url: seoConfig.siteUrl,
    telephone: '+1-480-524-0741',
    email: seoConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '880 W Kroll Ave',
      addressLocality: seoConfig.city,
      addressRegion: seoConfig.stateAbbr,
      postalCode: '85233',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 33.3528,
      longitude: -111.7910
    },
    sameAs: [
      seoConfig.social.linkedin,
      seoConfig.social.instagram,
      seoConfig.social.pinterest
    ]
  },
  areaServed: [
    { '@type': 'City', name: 'Phoenix' },
    { '@type': 'City', name: 'Gilbert' },
    { '@type': 'City', name: 'Scottsdale' },
    { '@type': 'City', name: 'Tempe' },
    { '@type': 'City', name: 'Mesa' },
    { '@type': 'City', name: 'Chandler' },
    { '@type': 'City', name: 'Queen Creek' },
    { '@type': 'City', name: 'Apache Junction' },
    { '@type': 'City', name: 'Ahwatukee' }
  ]
})

// Person schema generator for E-E-A-T signals
export const generatePersonSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': seoConfig.schemaId,
  name: seoConfig.ownerName,
  jobTitle: 'Professional Headshot Photographer',
  url: seoConfig.siteUrl,
  image: `${seoConfig.siteUrl}/images/Marie-Feutrier-Headshot-Photographer-Phoenix-Arizona.webp`,
  email: seoConfig.email,
  telephone: '+1-480-524-0741',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '880 W Kroll Ave',
    addressLocality: seoConfig.city,
    addressRegion: seoConfig.stateAbbr,
    postalCode: '85233',
    addressCountry: 'US'
  },
  worksFor: {
    '@type': 'Organization',
    '@id': `${seoConfig.siteUrl}/#organization`,
    name: 'Riemagine Studio LLC'
  },
  memberOf: [
    { '@type': 'Organization', name: 'Professional Photographers of America (PPA)' },
    { '@type': 'Organization', name: 'Peter Hurley\'s Headshot Crew' },
    { '@type': 'Organization', name: 'Clicking Focus' }
  ],
  award: [
    'Portraitist Award - Headshot Crew',
    'Headshot of the Week - Headshot Crew',
    'Bronze Ribbons - The Portrait Masters'
  ],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Université Pierre Mendès France',
    address: { '@type': 'PostalAddress', addressLocality: 'Grenoble', addressCountry: 'FR' }
  },
  knowsAbout: [
    'Headshot Photography',
    'Actor Headshots',
    'Corporate Headshots',
    'Portrait Photography',
    'Personal Branding Photography',
    'Studio Lighting'
  ],
  subjectOf: [
    {
      '@type': 'Article',
      name: 'Meet Jen Revak',
      url: 'https://boldjourney.com/meet-jen-revak/',
      publisher: { '@type': 'Organization', name: 'Bold Journey Magazine' },
      description: 'Photography by Marie Feutrier featured in Bold Journey Magazine'
    },
    {
      '@type': 'ProfilePage',
      name: 'MariazInteriors LLC - AD PRO Directory',
      url: 'https://www.architecturaldigest.com/adpro/directory/profile/mariazinteriors',
      publisher: { '@type': 'Organization', name: 'Architectural Digest', url: 'https://www.architecturaldigest.com' },
      description: 'Photography by Marie Feutrier featured in Architectural Digest AD PRO'
    }
  ],
  sameAs: [
    seoConfig.social.linkedin,
    seoConfig.social.instagram,
    seoConfig.social.pinterest
  ]
})

// AggregateRating schema generator
// Defaults to the live count derived from src/lib/reviews.ts — do not pass a literal.
export const generateAggregateRating = (reviewCount: string = REVIEW_COUNT) => ({
  '@type': 'AggregateRating',
  ratingValue: '5.0',
  reviewCount,
  bestRating: '5',
  worstRating: '1'
})

// Breadcrumb schema generator for nested pages
interface BreadcrumbItem {
  name: string
  url: string
}

export const generateBreadcrumbSchema = (items: BreadcrumbItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${seoConfig.siteUrl}/`
    },
    ...items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 2,
      name: item.name,
      item: `${seoConfig.siteUrl}${item.url}`
    }))
  ]
})
