import Layout from '@/components/Layout'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Image from 'next/image'
import HeroSection from '@/components/HeroSection'
import TypeformGallery from '@/components/TypeformGallery'
import Gallery from '@/components/Gallery'
import Testimonial from '@/components/Testimonial'
import ImageScrollCarousel from '@/components/ImageScrollCarousel'
import FabulousText from '@/components/FabulousText'
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
    carouselImages: {
      src: string
      alt: string
    }[]
  }
}

export default function HomePage({ frontmatter }: HomeProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollOpacity, setScrollOpacity] = useState(0.2)
  const [textOpacity, setTextOpacity] = useState(1)
  const [photosOpacity, setPhotosOpacity] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const opacity = Math.min(1, Math.max(0.2, 0.2 + (scrollY / 400) * 0.8))
      setScrollOpacity(opacity)

      // Sticky section animation
      // The section starts after the hero (100vh)
      const heroHeight = window.innerHeight
      const stickyStart = heroHeight
      const stickyDuration = heroHeight // How long to scroll through the sticky section

      // Calculate progress through the sticky section
      if (scrollY < stickyStart) {
        // Before the sticky section
        setTextOpacity(1)
        setPhotosOpacity(0)
      } else if (scrollY >= stickyStart + stickyDuration) {
        // After the sticky section
        setTextOpacity(0)
        setPhotosOpacity(1)
      } else {
        // During the sticky section - fade from text to photos
        const progress = (scrollY - stickyStart) / stickyDuration
        setTextOpacity(1 - progress)
        setPhotosOpacity(progress)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Layout title={frontmatter.title} description={frontmatter.description}>
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

      {/* Sticky Section Wrapper - creates scroll space */}
      <div style={{ height: '200vh', position: 'relative' }}>
        {/* Sticky Content */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            backgroundColor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 40px'
          }}
        >
          {/* Text */}
          <h2
            className="sticky-hero-text"
            style={{
              fontFamily: '"Majesti Banner", serif',
              fontWeight: 300,
              color: '#1C1C1C',
              textAlign: 'center',
              lineHeight: '1.2',
              opacity: textOpacity,
              transition: 'opacity 0.1s ease-out',
              position: 'absolute',
              zIndex: 2
            }}
          >
            Where artistry meets authenticity
          </h2>

          {/* Three Photos */}
          <div
            className="sticky-hero-photos"
            style={{
              opacity: photosOpacity,
              transition: 'opacity 0.1s ease-out',
              position: 'absolute',
              zIndex: 1
            }}
          >
            {/* James */}
            <div style={{ position: 'relative', width: '30%', aspectRatio: '2/3' }}>
              <Image
                src="/images/Home page Gallery/James.jpg"
                alt="Professional headshot James"
                fill
                style={{ objectFit: 'cover', borderRadius: '8px' }}
              />
            </div>

            {/* Guacy */}
            <div style={{ position: 'relative', width: '30%', aspectRatio: '2/3' }}>
              <Image
                src="/images/Good Photos/Guacy.webp"
                alt="Professional headshot Guacy"
                fill
                style={{ objectFit: 'cover', borderRadius: '8px' }}
              />
            </div>

            {/* Erich */}
            <div className="photo-erich" style={{ position: 'relative', width: '30%', aspectRatio: '2/3' }}>
              <Image
                src="/images/Good Photos/Erich.webp"
                alt="Professional headshot Erich"
                fill
                style={{ objectFit: 'cover', borderRadius: '8px' }}
              />
            </div>
          </div>

          <style jsx>{`
            .sticky-hero-text {
              font-size: 72px;
              padding: 0 10%;
            }
            .sticky-hero-photos {
              display: flex;
              gap: 40px;
              max-width: 1400px;
              width: 100%;
              justify-content: center;
              align-items: center;
              padding: 0 40px;
            }
            .photo-erich {
              display: block;
            }
            @media (max-width: 768px) {
              .sticky-hero-text {
                font-size: 48px;
                padding: 0 10%;
              }
              .sticky-hero-photos {
                flex-direction: column;
                gap: 30px;
                padding: 0 15%;
                max-width: 600px;
              }
              .photo-erich {
                display: none;
              }
            }
            @media (max-width: 480px) {
              .sticky-hero-text {
                font-size: 36px;
                padding: 0 10%;
              }
              .sticky-hero-photos {
                flex-direction: column;
                gap: 30px;
                padding: 0 10%;
                max-width: 500px;
              }
              .photo-erich {
                display: none;
              }
            }
          `}</style>
        </div>
      </div>

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

      {/* Testimonial Section */}
      <Testimonial
        quote={frontmatter.testimonial.quote}
        author={frontmatter.testimonial.author}
        imagePath={frontmatter.testimonial.imagePath}
        imageAlt={frontmatter.testimonial.imageAlt}
      />

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
