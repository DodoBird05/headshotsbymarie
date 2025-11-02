import Layout from '@/components/Layout'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import HeroSection from '@/components/HeroSection'
import TypeformGallery from '@/components/TypeformGallery'
import Gallery from '@/components/Gallery'
import ImageScrollCarousel from '@/components/ImageScrollCarousel'
import FabulousText from '@/components/FabulousText'
import StickyTextToPhotos from '@/components/StickyTextToPhotos'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

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
    gallerySection: {
      title: string
      subtitle: string
      frontImages: {
        src: string
        alt: string
      }[]
      backImages: {
        src: string
        alt: string
      }[]
    }
    firstCard: {
      title: string
      text: string
    }
    testimonial: {
      quote: string
      author: string
      imagePath: string
      imageAlt: string
    }
    gridGalleryImages: {
      src: string
      alt: string
    }[]
    fabulousText: {
      title: string
      text: string
    }
    onePhoto: {
      title: string
      subtitle: string
      imagePath: string
      imageAlt: string
    }
    stickyTextToPhotos: {
      text: string
      images: {
        src: string
        alt: string
      }[]
    }
    carouselImages: {
      src: string
      alt: string
    }[]
  }
}

export default function HomePage({ frontmatter }: HomeProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollOpacity, setScrollOpacity] = useState(0.2)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const opacity = Math.min(1, Math.max(0.2, 0.2 + (scrollY / 400) * 0.8))
      setScrollOpacity(opacity)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
                  '@id': 'https://portraitsbymarie.art/#business',
                  name: 'Portraits by Marie',
                  legalName: 'Riemagine Studio LLC',
                  url: 'https://portraitsbymarie.art',
                  logo: 'https://portraitsbymarie.art/Logo/Portraits-by-Marie-Logo-Rectangle-Black.svg',
                  image: 'https://portraitsbymarie.art/Logo/Portraits-by-Marie-Logo-Rectangle-Black.svg',
                  description: 'Professional headshots in Phoenix, Arizona. Specializing in professional portraits, personal branding, and actor headshots.',
                  priceRange: '$$$',
                  telephone: '+1-480-524-0741',
                  email: 'Marie@portraitsbymarie.art',
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
                    '@id': 'https://portraitsbymarie.art/#marie-feutrier',
                    name: 'Marie Feutrier'
                  }
                },
                {
                  '@type': 'Person',
                  '@id': 'https://portraitsbymarie.art/#marie-feutrier',
                  name: 'Marie Feutrier',
                  jobTitle: 'Professional Photographer',
                  url: 'https://portraitsbymarie.art',
                  image: 'https://portraitsbymarie.art/Logo/Portraits-by-Marie-Logo-Rectangle-Black.svg',
                  email: 'Marie@portraitsbymarie.art',
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
                    '@id': 'https://portraitsbymarie.art/#organization'
                  },
                  sameAs: [
                    'https://www.linkedin.com/in/marie-feutrier-mh05/',
                    'https://www.instagram.com/marie.feutrier/',
                    'https://www.pinterest.com/mariefeutrier/'
                  ]
                },
                {
                  '@type': 'Organization',
                  '@id': 'https://portraitsbymarie.art/#organization',
                  name: 'Riemagine Studio LLC',
                  alternateName: 'Portraits by Marie',
                  url: 'https://portraitsbymarie.art',
                  logo: 'https://portraitsbymarie.art/Logo/Portraits-by-Marie-Logo-Rectangle-Black.svg',
                  foundingDate: '2017',
                  founder: {
                    '@type': 'Person',
                    '@id': 'https://portraitsbymarie.art/#marie-feutrier'
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
                    email: 'Marie@portraitsbymarie.art',
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
      {/* Sticky Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollOpacity > 0.5 ? 'py-2 px-8 shadow-md bg-white' : 'py-8 px-8 pointer-events-none'}`}
        style={{ opacity: scrollOpacity }}
      >
        <div className={`flex items-center ${scrollOpacity > 0.5 ? 'justify-end gap-4' : 'justify-end gap-4 md:gap-8'} w-full transition-all duration-300`}>
          {scrollOpacity > 0.5 && (
            <>
              {/* Small Square Logo */}
              <div className="flex-shrink-0">
                <Link href="/">
                  <Image
                    src="/Logo/Portraits By Marie-Logo-square-White.svg"
                    alt="Portraits by Marie"
                    width={32}
                    height={32}
                    className="h-8 w-8 cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ filter: 'invert(1)' }}
                  />
                </Link>
              </div>

              {/* Pricing Button */}
              <Link
                href="/pricing"
                className="px-4 py-2 bg-white border border-black text-black rounded hover:bg-gray-50 transition-colors"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif' }}
              >
                Pricing
              </Link>

              {/* Hamburger Menu */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-black p-2"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col">
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-black p-2"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex flex-col items-center justify-center flex-1 space-y-8">
              <Link
                href="/about"
                className="text-black font-light text-2xl hover:opacity-80 transition-opacity"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/pricing"
                className="text-black font-light text-2xl hover:opacity-80 transition-opacity"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                className="text-black font-light text-2xl hover:opacity-80 transition-opacity"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </nav>

      <HeroSection
        frontmatter={frontmatter}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Sticky Text to Photos Section */}
      <StickyTextToPhotos
        text={frontmatter.stickyTextToPhotos.text}
        images={frontmatter.stickyTextToPhotos.images}
      />

      {/* Card with Placeholder Text */}
      <section style={{ backgroundColor: '#0f0e0d', padding: '80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            backgroundColor: '#1a1918',
            borderRadius: '16px',
            padding: '60px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7)'
          }}>
            <h2
              style={{
                fontFamily: '"Majesti Banner", serif',
                fontSize: '48px',
                color: '#fafafa',
                fontWeight: 300,
                marginBottom: '24px',
                textAlign: 'center'
              }}
            >
              {frontmatter.firstCard.title}
            </h2>
            <p
              style={{
                fontFamily: '"Hanken Grotesk", sans-serif',
                fontSize: '20px',
                color: '#D1D5DB',
                lineHeight: '1.8',
                textAlign: 'center',
                maxWidth: '800px',
                margin: '0 auto'
              }}
            >
              {frontmatter.firstCard.text}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        style={{
          backgroundColor: '#0f0e0d',
          minHeight: '100vh'
        }}
      >
        <Gallery images={frontmatter.gridGalleryImages} />
      </section>

      {/* Fabulous Text Section */}
      <FabulousText
        title={frontmatter.fabulousText.title}
        text={frontmatter.fabulousText.text}
      />

      {/* One Photo Left Section */}
      <section style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 md:h-screen">
          {/* Left Column - Image */}
          <div className="relative h-screen md:h-full w-full">
            <Image
              src={frontmatter.onePhoto.imagePath}
              alt={frontmatter.onePhoto.imageAlt}
              fill
              className="object-cover"
            />
          </div>

          {/* Right Column - Text */}
          <div className="flex flex-col justify-center items-center md:items-start px-8 md:px-16 py-16 md:py-0">
            <h2
              className="text-center md:text-left"
              style={{
                fontFamily: '"Majesti Banner", serif',
                fontSize: '48px',
                fontWeight: 300,
                lineHeight: 1.2,
                color: '#1C1C1C',
                marginBottom: '16px'
              }}
            >
              {frontmatter.onePhoto.title}
            </h2>
            <p
              className="text-center md:text-left"
              style={{
                fontFamily: '"Hanken Grotesk", sans-serif',
                fontSize: '24px',
                fontWeight: 300,
                color: '#4A4A4A',
                lineHeight: '1.6'
              }}
            >
              {frontmatter.onePhoto.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Image Scroll Carousel Section */}
      <section style={{ backgroundColor: '#ffffff', paddingTop: '40px' }}>
        <ImageScrollCarousel
          images={frontmatter.carouselImages}
          containerHeight="60vh"
          backgroundColor="bg-transparent"
          imageHeight="h-80"
          imageWidth="w-64"
          gap="gap-6"
          scrollSpeed={30}
          borderRadius="rounded-lg"
        />
      </section>

    </Layout>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content', 'home.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(fileContents)
  return {
    props: { frontmatter: data },
    revalidate: 1 // Revalidate every 1 second in development
  }
}
