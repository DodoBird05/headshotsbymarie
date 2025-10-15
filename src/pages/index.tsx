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
      hoverKey: string
    }[]
    defaultHeroImage: string
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

      {/* Dark Card Section */}
      <section
        style={{
          backgroundColor: '#0f0e0d',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 80px'
        }}
      >
        <div style={{ flex: '0 0 auto', marginRight: '80px' }}>
          <TypeformGallery />
        </div>
        <div style={{ flex: '1', color: '#D1D5DB' }}>
          <h2 style={{
            fontSize: '48px',
            fontFamily: '"Majesti Banner", serif',
            fontWeight: 300,
            color: '#fafafa',
            marginBottom: '16px',
            lineHeight: '1.2'
          }}>
            Professional portraits that work
          </h2>
          <p style={{
            fontSize: '24px',
            fontFamily: '"Hanken Grotesk", sans-serif',
            color: '#D1D5DB',
            lineHeight: '1.6'
          }}>
            Versatile, polished, and capturing authentic expression
          </p>
        </div>
      </section>

      {/* Card with Placeholder Text */}
      <section style={{ backgroundColor: '#0f0e0d', padding: '80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            backgroundColor: '#1a1918',
            borderRadius: '16px',
            padding: '60px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
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
              Portrait sessions without limits
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
              Time, outfits, and backgrounds—all unrestricted. Sessions typically run 1-2 hours, but we focus on results, not the clock. Get what you need without feeling rushed.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <Testimonial
        quote="This is my second time using Marie and as expected she is a delight to work with and I'm so happy with my headshot!!"
        author="Rachel S. — ⭐⭐⭐⭐⭐ Google Review"
        imagePath="/images/testimonials/Professional-Women-Headshots-Phoenix-Arizona.webp"
        imageAlt="Rachel S. Professional Headshot"
      />

      {/* Gallery Section */}
      <section
        style={{
          backgroundColor: '#0f0e0d',
          minHeight: '100vh'
        }}
      >
        <Gallery />
      </section>

      {/* Fabulous Text Section */}
      <FabulousText
        title="Corporate headshots to creative portraits"
        text="From boardrooms to casting rooms. Professional photography that serves your specific needs—whether that's polished corporate headshots, dynamic personal branding images, or casting-ready actor portraits. Consistent quality across every style."
      />

      {/* One Photo Right Section */}
      <section className="h-screen" style={{ backgroundColor: '#ffffff' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
          {/* Left Column - Text */}
          <div className="flex flex-col justify-center items-start px-8 md:px-16 py-16 md:py-0">
            <h2
              style={{
                fontFamily: '"Majesti Banner", serif',
                fontSize: '48px',
                fontWeight: 300,
                lineHeight: 1.2,
                color: '#1C1C1C',
                marginBottom: '16px'
              }}
            >
              Professional portraits you'll love
            </h2>
            <p
              style={{
                fontFamily: '"Hanken Grotesk", sans-serif',
                fontSize: '24px',
                fontWeight: 300,
                color: '#4A4A4A',
                lineHeight: '1.6'
              }}
            >
              Images you'll actually want to use / Not just admire, but display
            </p>
          </div>

          {/* Right Column - Image */}
          <div className="relative h-screen md:h-full w-full">
            <Image
              src="/images/good photos/Dave.webp"
              alt="One Photo"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Image Scroll Carousel Section */}
      <section style={{ backgroundColor: '#ffffff' }}>
        <ImageScrollCarousel
          images={[
            { src: '/images/good photos/Dave.webp', alt: 'Portfolio image 1' },
            { src: '/images/good photos/DeShawn.webp', alt: 'Portfolio image 2' },
            { src: '/images/good photos/Erich.webp', alt: 'Portfolio image 3' },
            { src: '/images/good photos/Guacy.webp', alt: 'Portfolio image 4' },
            { src: '/images/good photos/Janelle.webp', alt: 'Portfolio image 5' },
            { src: '/images/good photos/Johnny.webp', alt: 'Portfolio image 6' },
          ]}
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
  const { data, content } = matter(fileContents)
  return { props: { frontmatter: data, content } }
}
