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
import StickyTextToPhotos from '@/components/StickyTextToPhotos'
import TestimonialCarousel from '@/components/TestimonialCarousel'
import FAQ from '@/components/FAQ'
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
    testimonials: {
      text: string
      author: string
      imagePath: string
      imageAlt: string
    }[]
  }
}

export default function HomePage({ frontmatter }: HomeProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollOpacity, setScrollOpacity] = useState(0.2)
  const [individualHovered, setIndividualHovered] = useState(false)
  const [individualMousePos, setIndividualMousePos] = useState({ x: 0, y: 0 })
  const [teamHovered, setTeamHovered] = useState(false)
  const [teamMousePos, setTeamMousePos] = useState({ x: 0, y: 0 })

  const handleIndividualMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setIndividualMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  const handleTeamMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setTeamMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

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
                    src="/Logo/Headshots By Marie-Logo-square-White.svg"
                    alt="Headshots by Marie"
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

      {/* Portrait Sessions Section */}
      <section style={{ backgroundColor: '#0f0e0d', padding: '80px 20px', textAlign: 'center' }}>
        <h2
          style={{
            fontFamily: '"Majesti Banner", serif',
            fontSize: '48px',
            color: '#fafafa',
            fontWeight: 300,
            marginBottom: '24px'
          }}
        >
          Portrait sessions without limits
        </h2>
        <p
          style={{
            fontFamily: '"Hanken Grotesk", sans-serif',
            fontSize: '20px',
            color: '#D1D5DB',
            lineHeight: '1.8'
          }}
        >
          Time, outfits, and backgrounds—all unrestricted
        </p>
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

      {/* Testimonial Carousel */}
      <TestimonialCarousel
        testimonials={frontmatter.testimonials as [any, any]}
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
          <div className="flex flex-col justify-center items-center md:items-start px-8 md:px-16 py-16 md:py-0" style={{ backgroundColor: '#f8f8f8' }}>
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

            {/* Buttons */}
            <div className="flex gap-4 mt-8">
              {/* Individual Button */}
              <Link
                href="/pricing"
                className="book-today-btn"
                style={{
                  display: 'inline-block',
                  backgroundColor: individualHovered ? '#1C1C1C' : 'transparent',
                  border: '2px solid #000',
                  padding: '12px 32px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  textAlign: 'center',
                  fontFamily: '"Hanken Grotesk", sans-serif',
                  minWidth: '140px'
                }}
                onMouseEnter={() => setIndividualHovered(true)}
                onMouseLeave={() => setIndividualHovered(false)}
                onMouseMove={handleIndividualMouseMove}
              >
                <span
                  style={{
                    background: individualHovered ? `radial-gradient(circle at ${individualMousePos.x}px ${individualMousePos.y}px, #ffffff 0%, #999999 60px)` : 'none',
                    WebkitBackgroundClip: individualHovered ? 'text' : 'unset',
                    WebkitTextFillColor: individualHovered ? 'transparent' : '#1C1C1C',
                    backgroundClip: individualHovered ? 'text' : 'unset',
                    color: individualHovered ? 'transparent' : '#1C1C1C'
                  }}
                >
                  Individual
                </span>
              </Link>

              {/* Team Button */}
              <Link
                href="/corporate"
                className="book-today-btn"
                style={{
                  display: 'inline-block',
                  backgroundColor: '#1C1C1C',
                  border: '2px solid #000',
                  padding: '12px 32px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  textAlign: 'center',
                  fontFamily: '"Hanken Grotesk", sans-serif',
                  minWidth: '140px'
                }}
                onMouseEnter={() => setTeamHovered(true)}
                onMouseLeave={() => setTeamHovered(false)}
                onMouseMove={handleTeamMouseMove}
              >
                <span
                  style={{
                    background: teamHovered ? `radial-gradient(circle at ${teamMousePos.x}px ${teamMousePos.y}px, #ffffff 0%, #999999 60px)` : 'none',
                    WebkitBackgroundClip: teamHovered ? 'text' : 'unset',
                    WebkitTextFillColor: teamHovered ? 'transparent' : '#ffffff',
                    backgroundClip: teamHovered ? 'text' : 'unset',
                    color: teamHovered ? 'transparent' : '#ffffff'
                  }}
                >
                  Team
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Image Scroll Carousel Section */}
      <section style={{ backgroundColor: '#ffffff' }}>
        <div className="h-[60vh] md:h-[120vh]">
          <ImageScrollCarousel
            images={frontmatter.carouselImages}
            containerHeight="100%"
            backgroundColor="bg-transparent"
            imageHeight="h-80 md:h-[640px]"
            imageWidth="w-64 md:w-[512px]"
            gap="gap-6"
            scrollSpeed={30}
            borderRadius="rounded-lg"
          />
        </div>
      </section>

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
