import Layout from '@/components/Layout'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import Head from 'next/head'
import HeroSection from '@/components/HeroSection'
import { useState } from 'react'

interface HomeProps {
  frontmatter: {
    title: string
    description: string
    heroTitle: string
    services: {
      title: string
      href: string
      heroImage: string
      heroImageAlt: string
      hoverKey: string
    }[]
    defaultHeroImage: string
    defaultHeroImageAlt: string
    mobileRevealText: string[]
    mobileGallery: {
      src: string
      alt: string
      headingAbove?: string
      headingBelow?: string
      size?: 'XS' | 'S' | 'M' | 'L'
      align?: 'left' | 'center' | 'right'
      offsetLeft?: string
      marginBottom?: string
    }[]
  }
}

export default function HomePage({ frontmatter }: HomeProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <Layout title={frontmatter.title} description={frontmatter.description}>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': ['LocalBusiness', 'ProfessionalService', 'PhotographyStore'],
                  '@id': 'https://headshotsbymarie.com/#business',
                  name: 'Headshots by Marie',
                  legalName: 'Riemagine Studio LLC',
                  url: 'https://headshotsbymarie.com',
                  logo: 'https://headshotsbymarie.com/Logo/Headshots-by-Marie-Rectangle.svg',
                  image: 'https://headshotsbymarie.com/Logo/Headshots-by-Marie-Rectangle.svg',
                  description: 'Professional headshots in Phoenix, Arizona. Specializing in professional portraits, personal branding, and actor headshots.',
                  priceRange: '$$$',
                  telephone: '+1-480-524-0741',
                  email: 'marie@headshotsbymarie.com',
                  foundingDate: '2017',
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: '880 W Kroll Ave',
                    addressLocality: 'Gilbert',
                    addressRegion: 'AZ',
                    postalCode: '85233',
                    addressCountry: 'US'
                  },
                  geo: {
                    '@type': 'GeoCoordinates',
                    latitude: 33.3528,
                    longitude: -111.7910
                  },
                  areaServed: [
                    {
                      '@type': 'City',
                      name: 'Phoenix',
                      '@id': 'https://en.wikipedia.org/wiki/Phoenix,_Arizona'
                    },
                    {
                      '@type': 'City',
                      name: 'Gilbert'
                    },
                    {
                      '@type': 'City',
                      name: 'Scottsdale'
                    },
                    {
                      '@type': 'City',
                      name: 'Tempe'
                    },
                    {
                      '@type': 'City',
                      name: 'Mesa'
                    },
                    {
                      '@type': 'City',
                      name: 'Chandler'
                    }
                  ],
                  hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Photography Services',
                    itemListElement: [
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Professional Headshots',
                          description: 'LinkedIn profile pictures and professional portraits'
                        }
                      },
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Personal Branding Photography',
                          description: 'Business portraits and personal brand photography'
                        }
                      },
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Corporate Team Photography',
                          description: 'Corporate headshots and group photography'
                        }
                      },
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Actor Headshots',
                          description: 'Professional actor headshots and casting photos'
                        }
                      }
                    ]
                  },
                  openingHoursSpecification: {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                    opens: '00:00',
                    closes: '23:59',
                    description: 'By appointment only'
                  },
                  sameAs: [
                    'https://www.linkedin.com/in/marie-feutrier-mh05/',
                    'https://www.instagram.com/marie.feutrier/',
                    'https://www.pinterest.com/mariefeutrier/'
                  ],
                  aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: '5.0',
                    reviewCount: '76',
                    bestRating: '5',
                    worstRating: '1'
                  },
                  founder: {
                    '@type': 'Person',
                    '@id': 'https://headshotsbymarie.com/#marie-feutrier',
                    name: 'Marie Feutrier'
                  }
                },
                {
                  '@type': 'Person',
                  '@id': 'https://headshotsbymarie.com/#marie-feutrier',
                  name: 'Marie Feutrier',
                  jobTitle: 'Professional Photographer',
                  url: 'https://headshotsbymarie.com',
                  image: 'https://headshotsbymarie.com/Logo/Headshots-by-Marie-Rectangle.svg',
                  email: 'marie@headshotsbymarie.com',
                  telephone: '+1-480-524-0741',
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: '880 W Kroll Ave',
                    addressLocality: 'Gilbert',
                    addressRegion: 'AZ',
                    postalCode: '85233',
                    addressCountry: 'US'
                  },
                  worksFor: {
                    '@type': 'Organization',
                    '@id': 'https://headshotsbymarie.com/#organization'
                  },
                  sameAs: [
                    'https://www.linkedin.com/in/marie-feutrier-mh05/',
                    'https://www.instagram.com/marie.feutrier/',
                    'https://www.pinterest.com/mariefeutrier/'
                  ]
                },
                {
                  '@type': 'Organization',
                  '@id': 'https://headshotsbymarie.com/#organization',
                  name: 'Riemagine Studio LLC',
                  alternateName: 'Headshots by Marie',
                  url: 'https://headshotsbymarie.com',
                  logo: 'https://headshotsbymarie.com/Logo/Headshots-by-Marie-Rectangle.svg',
                  foundingDate: '2017',
                  founder: {
                    '@type': 'Person',
                    '@id': 'https://headshotsbymarie.com/#marie-feutrier'
                  },
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: '880 W Kroll Ave',
                    addressLocality: 'Gilbert',
                    addressRegion: 'AZ',
                    postalCode: '85233',
                    addressCountry: 'US'
                  },
                  contactPoint: {
                    '@type': 'ContactPoint',
                    telephone: '+1-480-524-0741',
                    email: 'marie@headshotsbymarie.com',
                    contactType: 'Customer Service',
                    areaServed: 'US',
                    availableLanguage: ['English']
                  },
                  sameAs: [
                    'https://www.linkedin.com/in/marie-feutrier-mh05/',
                    'https://www.instagram.com/marie.feutrier/',
                    'https://www.pinterest.com/mariefeutrier/'
                  ]
                }
              ]
            })
          }}
        />
      </Head>

      <HeroSection
        frontmatter={frontmatter}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

    </Layout>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content', 'home.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(fileContents)
  return {
    props: { frontmatter: data }
  }
}
