import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X } from 'lucide-react'
import { trackNavClick, trackServiceInterest } from '@/lib/analytics'
import MobileHeroReveal from './MobileHeroReveal'
import ScatteredImageGallery from './ScatteredImageGallery'

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
    mobileTestimonial?: {
      quote: string[]
      author: string
      rating: number
      source: string
    }
    mobileParallaxImage?: {
      src: string
      alt: string
    }
    mobileFAQ?: {
      question: string
      answer: string
      fromLeft: boolean
    }[]
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

  return (
    <>
      {/* Mobile Layout with Scroll Animation */}
      <MobileHeroReveal
        heroImage={heroBackground}
        revealText={frontmatter.mobileRevealText}
        onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        scrollHeight="1200vh"
        parallaxImage={frontmatter.mobileParallaxImage}
        faqItems={frontmatter.mobileFAQ}
      >
        <ScatteredImageGallery
          images={frontmatter.mobileGallery}
          testimonial={frontmatter.mobileTestimonial}
        />
      </MobileHeroReveal>

      {/* Mobile Navigation Menu */}
      <div className="md:hidden">
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
