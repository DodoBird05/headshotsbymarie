import Layout from '@/components/Layout'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ScrollTextCarousel from '@/components/ScrollTextCarousel'
import ScrollHorizontalCarousel, { presets } from '@/components/ScrollHorizontalCarousel'
import TruusStyleCarousel, { CustomDecorations } from '@/components/TruusStyleCarousel'
import ImageScrollCarousel, { carouselPresets, mergeCarouselProps } from '@/components/ImageScrollCarousel'
import Testimonial from '@/components/Testimonial'
import HeroSection from '@/components/HeroSection'
import Cards from '@/components/Cards'

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
  content: string
}

export default function HomePage({ frontmatter, content }: HomeProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isHeadshotTitleVisible, setIsHeadshotTitleVisible] = useState(false)
  const [isHeadshotImageVisible, setIsHeadshotImageVisible] = useState(false)
  const headshotTitleRef = useRef<HTMLHeadingElement>(null)
  const headshotImageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      const carousel = carouselRef.current
      if (!carousel) return

      const rect = carousel.getBoundingClientRect()
      const mouseY = e.clientY
      
      // Check if mouse is over the carousel area
      const isMouseOverCarousel = mouseY >= rect.top && mouseY <= rect.bottom && rect.top < window.innerHeight && rect.bottom > 0

      if (isMouseOverCarousel) {
        e.preventDefault()
        
        // Calculate maximum scroll distance
        // We want the last image to be positioned at 2/3 of the viewport width from the left
        const viewportWidth = window.innerWidth
        const targetPosition = viewportWidth * (2/3) // 2/3 from left edge
        const imageWidth = 256 + 32 // image width + gap (w-64 = 256px + gap-8 = 32px)
        const totalImagesWidth = imageWidth * 10 // Total width of all 10 images
        const paddingLeft = 32 // px-8 = 32px padding
        
        // Calculate where the last image should stop (at 2/3 of viewport)
        const maxScrollLeft = totalImagesWidth + paddingLeft - targetPosition
        
        const newScrollLeft = Math.min(carousel.scrollLeft + e.deltaY * 2, maxScrollLeft)
        const minScrollLeft = Math.max(0, newScrollLeft)
        
        carousel.scrollLeft = minScrollLeft
      }
    }

    window.addEventListener('wheel', handleScroll, { passive: false })
    return () => window.removeEventListener('wheel', handleScroll)
  }, [])

  const [scrollOpacity, setScrollOpacity] = useState(0.2)
  const textContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      // Gradually increase opacity from 0.2 to 1.0 over 400px of scrolling
      const opacity = Math.min(1, Math.max(0.2, 0.2 + (scrollY / 400) * 0.8))
      setScrollOpacity(opacity)


      // Check if headshot title is in view
      if (headshotTitleRef.current && !isHeadshotTitleVisible) {
        const rect = headshotTitleRef.current.getBoundingClientRect()
        const isInView = rect.top < window.innerHeight && rect.bottom > 0
        if (isInView) {
          setIsHeadshotTitleVisible(true)
          // Start image animation 1 second after title starts
          setTimeout(() => {
            setIsHeadshotImageVisible(true)
          }, 1000)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    // Also check on initial load
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHeadshotTitleVisible, isHeadshotImageVisible])

  // Framer Motion scroll hooks for the text animation
  const { scrollYProgress } = useScroll({
    target: textContainerRef,
    offset: ["start center", "end center"]
  })

  // No animations - just static content

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
                    alt="Portraits by Marie - Professional portrait photography Phoenix Arizona"
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
            {/* Close button at the top */}
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-black p-2"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* Navigation Menu */}
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

      {/* Hero Section */}
      <HeroSection
        frontmatter={frontmatter}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* White Stacking Scroll Section */}
      <section
        ref={textContainerRef}
        className="relative bg-white overflow-hidden"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 2,
          height: '100vh'
        }}
      >
        <div className="flex items-center justify-center h-full">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-800 text-center"
            style={{
              fontFamily: '"Bodoni Moda", serif',
              fontWeight: 300,
              lineHeight: 1.2
            }}
          >
            Where artistry<br />
            meets authenticity
          </h2>
        </div>
      </section>

      {/* Black Section */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundColor: '#0f0e0d',
          position: 'sticky',
          top: 0,
          zIndex: 3,
          minHeight: '300vh'
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 md:h-screen">
          {/* Left Column - Image */}
          <div className="relative h-screen md:h-full w-full">
            <Image
              src="/images/good photos/Dave.webp"
              alt="One Photo"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Column - Text */}
          <div className="flex flex-col justify-center md:justify-end items-start px-8 md:px-16 py-16 md:pb-16 md:py-0">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-light mb-6"
              style={{
                fontFamily: '"Hanken Grotesk", sans-serif',
                fontWeight: 300,
                lineHeight: 1.2,
                color: '#D1D5DB'
              }}
            >
              Personalized Photo Sessions
            </h2>
            <p
              className="text-lg md:text-xl"
              style={{
                fontFamily: '"Hanken Grotesk", sans-serif',
                fontWeight: 300,
                color: '#D1D5DB'
              }}
            >
              Unrushed, Thoughtful, and Entirely You
            </p>
          </div>
        </div>

        {/* Cards Section inside black section */}
        <div className="mt-screen">
          <Cards />
        </div>

      </section>

      {/* White Overlay Section */}
      <section
        className="relative bg-white overflow-hidden"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 4,
          height: '100vh'
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 md:h-screen">
          {/* Left Column - Text */}
          <div className="flex flex-col justify-center md:justify-end items-start px-8 md:px-16 py-16 md:pb-16 md:py-0">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-light mb-6"
              style={{
                fontFamily: '"Hanken Grotesk", sans-serif',
                fontWeight: 300,
                lineHeight: 1.2,
                color: '#1C1C1C'
              }}
            >
              Serving Phoenix, Gilbert, Mesa, and Chandler with polished headshots and portraits
            </h2>
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

    </Layout>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content', 'home.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  return { props: { frontmatter: data, content } }
}