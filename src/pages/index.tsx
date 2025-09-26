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
  const [heroBackground, setHeroBackground] = useState(frontmatter.defaultHeroImage)
  const [hoveredMenuItem, setHoveredMenuItem] = useState<string | null>(null)
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

  const textX = useTransform(scrollYProgress, [0, 1], [100, -100])
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

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
      <section
        className="relative min-h-screen w-full overflow-hidden"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          height: '100vh'
        }}
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-300"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        
        {/* Content Overlay */}
        <div className="relative z-10 min-h-screen flex">
          {/* Header with Logo and Menu */}
          {/* Desktop Header */}
          <div className="hidden md:absolute md:top-8 md:right-8 md:flex md:items-start md:gap-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Image
                src="/Logo/Portraits-by-Marie-Logo-Rectangle-White.svg"
                alt="Portraits by Marie - Professional portrait photography Phoenix Arizona"
                width={300}
                height={120}
                className="h-32 w-auto"
              />
            </div>
            
            {/* Navigation Menu */}
            <nav className="flex flex-col h-32 justify-between">
              <Link 
                href="/about" 
                className="text-white font-light text-lg hover:opacity-80 transition-opacity"
              >
                About
              </Link>
              <Link 
                href="/pricing" 
                className="text-white font-light text-lg hover:opacity-80 transition-opacity"
              >
                Pricing
              </Link>
              <Link 
                href="/contact" 
                className="text-white font-light text-lg hover:opacity-80 transition-opacity"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Mobile Header */}
          <div className="md:hidden absolute top-4 right-4 z-20 flex items-center gap-2">
            {/* Square Logo for Mobile */}
            <Image
              src="/Logo/Portraits By Marie-Logo-square-White.svg"
              alt="Portraits by Marie - Professional portrait photography Phoenix Arizona"
              width={40}
              height={40}
              className="h-8 w-8"
            />
            
            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
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
          
          {/* Main Content - Responsive Layout */}
          <div className="min-h-screen flex items-center justify-center px-4 md:px-8">
            {/* Desktop: 3 Column Layout */}
            <div className="hidden md:grid md:grid-cols-3 md:gap-8 md:min-h-screen md:w-full">
              {/* First Column - Navigation Menu */}
              <div 
                className="text-left space-y-4 flex flex-col justify-center"
                onMouseLeave={() => {
                  setHoveredMenuItem(null)
                  setHeroBackground(frontmatter.defaultHeroImage)
                }}
              >
{frontmatter.services.map((service, index) => (
                  <Link key={index} href={service.href}>
                    <div 
                      className={`text-6xl font-light transition-opacity cursor-pointer ${
                        hoveredMenuItem && hoveredMenuItem !== service.hoverKey ? 'opacity-30' : 'opacity-100 hover:opacity-80'
                      }`}
                      style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#fafafa', fontWeight: 300 }}
                      onMouseEnter={() => {
                        setHeroBackground(service.heroImage)
                        setHoveredMenuItem(service.hoverKey)
                      }}
                    >
                      {service.title}
                    </div>
                  </Link>
                ))}
              </div>
              
              {/* Middle Column - Empty for now */}
              <div></div>
              
              {/* Third Column - H1 and Tagline bottom left */}
              <div className="flex flex-col justify-end items-start pb-16">
                <div className="text-left">
                  <h1 className="text-lg font-light mb-2" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#fafafa', fontWeight: 300 }}>
                    {frontmatter.title}
                  </h1>
                  <div className="text-4xl font-light" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#fafafa', fontWeight: 300 }}>
                    {frontmatter.heroTitle}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile: Centered Stacked Layout */}
            <div className="md:hidden flex flex-col justify-between min-h-screen w-full py-20">
              {/* Mobile Navigation Menu - Left Aligned */}
              <div className="flex-1 flex flex-col justify-center space-y-4 px-8">
{frontmatter.services.map((service, index) => (
                  <Link key={index} href={service.href}>
                    <div className="text-2xl font-light text-white hover:opacity-80 transition-opacity cursor-pointer text-left" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: 'white', fontWeight: 300 }}>
                      {service.title}
                    </div>
                  </Link>
                ))}
              </div>
              
              {/* Mobile H1 and Tagline - At Bottom */}
              <div className="text-center pb-8">
                <h1 className="text-sm font-light mb-2" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#fafafa', fontWeight: 300 }}>
                  {frontmatter.title}
                </h1>
                <div className="text-xl font-light" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#fafafa', fontWeight: 300 }}>
                  {frontmatter.heroTitle}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* White Stacking Section */}
      <section
        ref={textContainerRef}
        className="relative bg-white"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 2,
          height: '100vh'
        }}
      >
        <div className="flex items-center justify-center h-full overflow-hidden">
          <motion.h2
            style={{
              x: textX,
              opacity: textOpacity,
              fontFamily: '"Bodoni Moda", serif',
              fontWeight: 300
            }}
            className="text-6xl md:text-8xl lg:text-9xl font-light text-gray-800 whitespace-nowrap"
          >
            Where artistry meets authenticity
          </motion.h2>
        </div>
      </section>

      {/* Professional Headshots Section */}
      <section className="py-16 bg-white">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Title with slide animation */}
            <div className="flex items-center justify-center overflow-hidden">
              <h2
                ref={headshotTitleRef}
                className={`text-4xl md:text-5xl lg:text-6xl font-light ${
                  isHeadshotTitleVisible ? 'animate-slide-to-center' : ''
                }`}
                style={{
                  fontFamily: '"Bodoni Moda", serif',
                  color: '#1C1C1C',
                  fontWeight: 300,
                  opacity: isHeadshotTitleVisible ? 1 : 1,
                  transform: isHeadshotTitleVisible ? 'none' : 'translateX(-100%)'
                }}
              >
                Professional Headshots
              </h2>
            </div>

            {/* Right Column - Image */}
            <div className="flex justify-center">
              <div
                ref={headshotImageRef}
                className={`relative transition-all duration-2000 ease-out ${
                  isHeadshotImageVisible ? 'scale-100 translate-y-8' : 'scale-50 translate-y-0'
                }`}
              >
                <Image
                  src="/images/Home page Carousel/Professional-Headshots.webp"
                  alt="Professional business headshot example Phoenix Arizona photographer"
                  width={500}
                  height={600}
                  className="object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Scroll Animation */}
      <ImageScrollCarousel
        images={[
          {
            src: '/images/Home page Carousel/Professional-Headshots.webp',
            alt: 'Professional business headshot',
            width: 300,
            height: 400
          },
          {
            src: '/images/Home page Carousel/Personal-Brand-Photography.webp',
            alt: 'Personal branding portrait',
            width: 300,
            height: 400
          },
          {
            src: '/images/Home page Carousel/Acting-headshot.webp',
            alt: 'Actor headshot',
            width: 300,
            height: 400
          },
          {
            src: '/images/Home page Carousel/LinkedIn-Profile.webp',
            alt: 'LinkedIn profile photo',
            width: 300,
            height: 400
          },
          {
            src: '/images/Home page Carousel/Corporate-Headshots.webp',
            alt: 'Corporate headshot',
            width: 300,
            height: 400
          },
          {
            src: '/images/Home page Carousel/Business-Portraits.webp',
            alt: 'Business portrait',
            width: 300,
            height: 400
          },
          {
            src: '/images/Home page Carousel/Team-Photography.webp',
            alt: 'Team photography',
            width: 300,
            height: 400
          },
          {
            src: '/images/Home page Carousel/Website-Photography.webp',
            alt: 'Website photography',
            width: 300,
            height: 400
          }
        ]}
        containerHeight="50vh"
        backgroundColor="bg-white"
        imageHeight="h-80"
        imageWidth="w-64"
        gap="gap-6"
      />
      
      {/* Text Paragraph Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2
            className="text-3xl md:text-4xl font-light mb-8"
            style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
          >
            Professional Headshots Trusted by Phoenix Professionals
          </h2>
          <p
            className="text-lg md:text-xl leading-relaxed text-gray-700 max-w-3xl mx-auto"
            style={{ fontFamily: '"Hanken Grotesk", sans-serif' }}
          >
            Whether you're a freelancer or executive needing professional photos, many people dread the process,
            remembering awkward school pictures. Our unlimited approach - unlimited time, outfits, and backgrounds -
            ensures you're never rushed. The result: clients consistently say the experience was pleasant and they
            love their photos. Check our Google reviews.
          </p>

        </div>
      </section>

      {/* Testimonial Section */}
      <section className="mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
          {/* Image Side */}
          <div className="relative">
            <Image
              src="/images/LinkedIn/Professional-Women-Headshots-Phoenix-Arizona.webp"
              alt="Rachel professional headshot testimonial client Phoenix Arizona photographer"
              fill
              className="object-cover"
            />
          </div>

          {/* Quote Side */}
          <div
            className="flex items-center justify-center p-8 md:p-12 relative"
            style={{ backgroundColor: '#F5F5F5' }}
          >
            <div className="max-w-md text-center">
              {/* Testimonial Text */}
              <blockquote
                className="text-lg leading-relaxed mb-6"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 400 }}
              >
                "This is my second time using Marie and as expected she is a delight to work with and I'm so happy with my headshot!!"
              </blockquote>

              {/* Client Name */}
              <cite
                className="text-base font-medium not-italic"
                style={{ fontFamily: '"Majesti Banner", serif', color: '#1C1C1C', fontWeight: 'bold' }}
              >
                — Rachel S.
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing link with sliding animation */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <div className="mt-12">
            <Link href="/pricing">
              <div className="flex items-center justify-center gap-4 cursor-pointer pricing-link-container">
                <span className="chevron-slide-left text-2xl md:text-3xl" style={{ color: '#1C1C1C' }}>
                  ›
                </span>
                <span
                  className="text-3xl md:text-4xl font-light text-slide-right letter-spacing-hover"
                  style={{
                    fontFamily: '"Hanken Grotesk", sans-serif',
                    color: '#1C1C1C',
                    fontWeight: 300,
                    letterSpacing: '0.02em'
                  }}
                >
                  See Pricing
                </span>
              </div>
            </Link>
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