// Centralized SEO and business configuration
// Update these values in one place to change across the entire site

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
  defaultTitle: 'Headshots by Marie | Professional Portrait Photography in Gilbert, AZ',
  defaultDescription: 'Professional headshot and portrait photography services in Gilbert, Arizona. Corporate headshots, LinkedIn photos, actor headshots, and personal branding photography.',
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
  url: `${seoConfig.siteUrl}${url}`,
  image: image ? `${seoConfig.siteUrl}${image}` : undefined,
  provider: {
    '@type': 'LocalBusiness',
    '@id': `${seoConfig.siteUrl}/#business`,
    name: seoConfig.businessName,
    telephone: '+1-480-524-0741',
    email: seoConfig.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: seoConfig.city,
      addressRegion: seoConfig.stateAbbr,
      addressCountry: 'US'
    }
  },
  areaServed: {
    '@type': 'State',
    name: seoConfig.state
  }
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
      item: seoConfig.siteUrl
    },
    ...items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 2,
      name: item.name,
      item: `${seoConfig.siteUrl}${item.url}`
    }))
  ]
})
