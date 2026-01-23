import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { trackNavClick, trackServiceInterest } from '@/lib/analytics'

interface HeroSectionProps {
  frontmatter: {
    title: string
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
  }
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (open: boolean) => void
}

export default function HeroSection({
  frontmatter,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}: HeroSectionProps) {
  const [heroBackground, setHeroBackground] = useState(frontmatter.defaultHeroImage)
  const [hoveredMenuItem, setHoveredMenuItem] = useState<string | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Scroll animation for mobile
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const scrollThreshold = 400 // px to complete animation
      const progress = Math.min(1, scrollY / scrollThreshold)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate mobile animation values based on scroll
  const layer2Opacity = 1 - scrollProgress // Layer 2 fades out

  // Small image dimensions (Layer 3) - target for shrink animation
  const smallImageWidth = 180 // px
  const smallImageHeight = 280 // px
  const smallImageTop = 120 // px from top

  // Calculate Layer 2 image transform to shrink toward Layer 3 position
  // Start: full screen, End: match Layer 3 size/position
  const layer2Scale = 1 - (scrollProgress * 0.75) // shrinks to ~25%

  return (
    <>
      {/* Mobile Layout with Scroll Animation */}
      <div className="md:hidden">
        {/* Full height container for scroll space */}
        <div style={{ height: '200vh' }}>
          {/* Fixed viewport */}
          <div className="fixed inset-0 w-full h-screen overflow-hidden">

            {/* ========== LAYER 3 (Bottom): White bg + small image + big text ========== */}
            <div className="absolute inset-0 z-0 bg-white">
              {/* Small centered image */}
              <div
                className="absolute left-1/2 bg-cover bg-center bg-no-repeat"
                style={{
                  width: `${smallImageWidth}px`,
                  height: `${smallImageHeight}px`,
                  top: `${smallImageTop}px`,
                  transform: 'translateX(-50%)',
                  backgroundImage: `url(${heroBackground})`
                }}
              />
              {/* Big text below image */}
              <div
                className="absolute text-center text-5xl"
                style={{
                  top: '450px',
                  left: '10%',
                  right: '10%',
                  fontFamily: '"Majesti Banner", serif',
                  fontWeight: 300,
                  color: '#1C1C1C',
                  textTransform: 'uppercase',
                  lineHeight: 0.75
                }}
              >
                WHERE<br />
                ARTISTRY<br />
                MEETS<br />
                AUTHENTI<br />
                CITY
              </div>
            </div>

            {/* ========== LAYER 2 (Middle): Full screen hero + h1 - fades out ========== */}
            <div
              className="absolute inset-0 z-10"
              style={{
                opacity: layer2Opacity,
                transition: 'opacity 0.1s ease-out',
                pointerEvents: scrollProgress > 0.9 ? 'none' : 'auto'
              }}
            >
              {/* Full screen hero image that shrinks */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${heroBackground})`,
                  transform: `scale(${layer2Scale})`,
                  transformOrigin: 'center 25%',
                  transition: 'transform 0.1s ease-out'
                }}
              />
              {/* H1 at bottom */}
              <div
                className="absolute left-0 right-0 text-center px-4"
                style={{ bottom: '33%' }}
              >
                <h1
                  className="text-sm font-light mb-2"
                  style={{
                    fontFamily: '"Hanken Grotesk", sans-serif',
                    color: '#fafafa',
                    fontWeight: 300,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}
                >
                  {frontmatter.title.includes('|') ? (
                    <>
                      {frontmatter.title.split('|')[0].trim()}<br />
                      {frontmatter.title.split('|')[1].trim()}
                    </>
                  ) : frontmatter.title}
                </h1>
                <div
                  className="text-4xl font-light leading-tight"
                  style={{
                    fontFamily: '"Romie", serif',
                    color: '#fafafa',
                    fontWeight: 300
                  }}
                >
                  {frontmatter.heroTitle}
                </div>
              </div>
            </div>

            {/* ========== LAYER 1 (Top): BOOK button + Logo + hamburger - always visible ========== */}
            {/* BOOK Button - Top Left */}
            <Link
              href="/pricing"
              className="absolute top-4 left-4 z-50 px-4 py-2 text-sm font-medium tracking-wider"
              style={{
                fontFamily: '"Hanken Grotesk", sans-serif',
                backgroundColor: '#ffffff',
                color: '#1C1C1C',
                border: '1px solid #1C1C1C'
              }}
              onClick={() => trackNavClick('Book', '/pricing', 'mobile_header')}
            >
              BOOK
            </Link>

            {/* Logo + Menu - Top Right */}
            <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
              <Image
                src="/Logo/Headshots By Marie-Logo-square-White.svg"
                alt="Headshots by Marie"
                width={40}
                height={40}
                className="h-8 w-8"
                style={{ filter: scrollProgress > 0.5 ? 'invert(1)' : 'none' }}
              />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2"
                style={{ color: scrollProgress > 0.5 ? '#1C1C1C' : '#fafafa' }}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Menu */}
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
                onClick={() => { trackNavClick('About', '/about', 'mobile_menu'); setIsMobileMenuOpen(false) }}
              >
                About
              </Link>
              <Link
                href="/pricing"
                className="text-black font-light text-2xl hover:opacity-80 transition-opacity"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
                onClick={() => { trackNavClick('Pricing', '/pricing', 'mobile_menu'); setIsMobileMenuOpen(false) }}
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                className="text-black font-light text-2xl hover:opacity-80 transition-opacity"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
                onClick={() => { trackNavClick('Contact', '/contact', 'mobile_menu'); setIsMobileMenuOpen(false) }}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>

      {/* Desktop Layout - Keep existing */}
      <section
        className="hidden md:block relative min-h-screen w-full overflow-hidden"
        style={{ height: '100vh' }}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-300"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />

        {/* Content Overlay */}
        <div className="relative z-10 min-h-screen flex">
          {/* Desktop Header */}
          <div className="absolute top-8 right-8 flex items-start gap-8">
            <div className="flex-shrink-0">
              <Image
                src="/Logo/Headshots-by-Marie-Rectangle-White.svg"
                alt="Headshots by Marie - Professional headshot photography Phoenix Arizona"
                width={300}
                height={120}
                className="h-32 w-auto"
              />
            </div>
            <nav className="flex flex-col h-32 justify-between">
              <Link
                href="/about"
                className="text-white font-light text-lg hover:opacity-80 transition-opacity"
                onClick={() => trackNavClick('About', '/about', 'header')}
              >
                About
              </Link>
              <Link
                href="/pricing"
                className="text-white font-light text-lg hover:opacity-80 transition-opacity"
                onClick={() => trackNavClick('Pricing', '/pricing', 'header')}
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                className="text-white font-light text-lg hover:opacity-80 transition-opacity"
                onClick={() => trackNavClick('Contact', '/contact', 'header')}
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Main Content */}
          <div className="min-h-screen flex items-center justify-center px-8">
            <div className="grid grid-cols-3 gap-8 min-h-screen w-full">
              {/* First Column - Navigation Menu */}
              <div
                className="text-left space-y-6 flex flex-col justify-center"
                onMouseLeave={() => {
                  setHoveredMenuItem(null)
                  setHeroBackground(frontmatter.defaultHeroImage)
                }}
              >
                {frontmatter.services.map((service, index) => {
                  const parts = service.title.split(' ')
                  return (
                    <Link key={index} href={service.href} onClick={() => trackNavClick(service.title, service.href, 'hero_services')}>
                      <div
                        className={`text-2xl transition-opacity cursor-pointer ${
                          hoveredMenuItem && hoveredMenuItem !== service.hoverKey ? 'opacity-30' : 'opacity-100 hover:opacity-80'
                        }`}
                        style={{ color: '#fafafa' }}
                        onMouseEnter={() => {
                          setHeroBackground(service.heroImage)
                          setHoveredMenuItem(service.hoverKey)
                          trackServiceInterest(service.title, 'hover')
                        }}
                      >
                        {parts.map((word, i) => (
                          <span
                            key={i}
                            style={{
                              fontFamily: '"Hanken Grotesk", sans-serif',
                              fontWeight: 700,
                              textTransform: 'uppercase' as const,
                              letterSpacing: '0.1em'
                            }}
                          >
                            {word}{i < parts.length - 1 ? ' ' : ''}
                          </span>
                        ))}
                      </div>
                    </Link>
                  )
                })}
              </div>

              {/* Middle Column - Empty */}
              <div></div>

              {/* Third Column - H1 and Tagline */}
              <div className="flex flex-col justify-end items-start pb-16">
                <div className="text-left">
                  <h1 className="text-2xl font-light mb-2" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#fafafa', fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {frontmatter.title}
                  </h1>
                  <div className="text-7xl font-light max-w-4xl" style={{ fontFamily: '"Romie", serif', color: '#fafafa', fontWeight: 300, lineHeight: '1.1' }}>
                    {frontmatter.heroTitle}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
