import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X } from 'lucide-react'
import { trackNavClick, trackServiceInterest } from '@/lib/analytics'
import MobileHeroReveal from './MobileHeroReveal'
import ScatteredImageGallery from './ScatteredImageGallery'
import DesktopHorizontalGallery from './DesktopHorizontalGallery'

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
      size?: 'XS' | 'S' | 'M' | 'L' | 'XL'
      align?: 'left' | 'center' | 'right'
      offsetLeft?: string
      marginBottom?: string
      link?: string
    }[]
    mobileTestimonial?: {
      quote: string[]
      author: string
      rating: number
      source: string
    }
    mobileParallaxImages?: {
      src: string
      alt: string
    }[]
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
        parallaxImages={frontmatter.mobileParallaxImages}
        faqItems={frontmatter.mobileFAQ}
      >
        <ScatteredImageGallery
          images={frontmatter.mobileGallery}
          testimonial={frontmatter.mobileTestimonial}
        />
      </MobileHeroReveal>

      {/* Desktop Horizontal Gallery - Fixed position, outside of scrolling layer */}
      <DesktopHorizontalGallery
        images={frontmatter.mobileGallery}
        testimonial={frontmatter.mobileTestimonial}
      />

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

      {/* Old Desktop Layout - Hidden, using unified scroll experience now */}
      <section
        className="hidden relative min-h-screen w-full overflow-hidden"
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

      {/* Old Desktop Content Below Hero - Hidden */}
      <div className="hidden bg-white">
        {/* Reveal Text Section */}
        <div className="text-center py-24 px-8">
          <div
            className="text-6xl lg:text-7xl"
            style={{
              fontFamily: '"Majesti Banner", serif',
              fontWeight: 300,
              color: '#1C1C1C',
              textTransform: 'uppercase',
              lineHeight: 0.85
            }}
          >
            {frontmatter.mobileRevealText.map((line, index) => (
              <span key={index}>
                {line}
                {index < frontmatter.mobileRevealText.length - 1 && <br />}
              </span>
            ))}
          </div>
        </div>

        {/* Desktop Gallery */}
        <div className="px-8 lg:px-16 max-w-7xl mx-auto">
          <ScatteredImageGallery
            images={frontmatter.mobileGallery}
            topOffset="0"
            testimonial={frontmatter.mobileTestimonial}
          />
        </div>

        {/* Parallax Image Section */}
        {frontmatter.mobileParallaxImages && frontmatter.mobileParallaxImages.length > 0 && (
          <div className="mt-24 bg-[#1C1C1C]">
            <div className="relative w-full" style={{ height: '70vh' }}>
              <Image
                src={frontmatter.mobileParallaxImages[0].src}
                alt={frontmatter.mobileParallaxImages[0].alt}
                fill
                className="object-cover"
              />
            </div>

            {/* Lead text */}
            <div className="text-center py-16 px-8">
              <h2
                className="text-4xl lg:text-5xl mb-4"
                style={{
                  fontFamily: '"Majesti Banner", serif',
                  fontWeight: 300,
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  lineHeight: 1.1
                }}
              >
                Portrait sessions without limits
              </h2>
              <p
                className="text-xl"
                style={{
                  fontFamily: '"Hanken Grotesk", sans-serif',
                  fontWeight: 300,
                  color: '#cccccc',
                  lineHeight: 1.4
                }}
              >
                Time, outfits, and backgrounds—all unrestricted
              </p>
            </div>

            {/* Desktop FAQ */}
            {frontmatter.mobileFAQ && frontmatter.mobileFAQ.length > 0 && (
              <div className="max-w-4xl mx-auto px-8 py-16">
                {frontmatter.mobileFAQ.map((faq, index) => (
                  <div
                    key={index}
                    className={`mb-8 ${faq.fromLeft ? 'text-left' : 'text-right'}`}
                  >
                    <h3
                      className="text-2xl mb-3"
                      style={{
                        fontFamily: '"Majesti Banner", serif',
                        fontWeight: 300,
                        color: '#ffffff',
                        textTransform: 'uppercase'
                      }}
                    >
                      {faq.question}
                    </h3>
                    <p
                      className="text-base max-w-xl"
                      style={{
                        fontFamily: '"Hanken Grotesk", sans-serif',
                        fontWeight: 300,
                        color: '#cccccc',
                        display: 'inline-block'
                      }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Buttons */}
            <div className="text-center pb-24 px-8">
              <h2
                className="text-3xl mb-8"
                style={{
                  fontFamily: '"Majesti Banner", serif',
                  fontWeight: 300,
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                Professional portraits you'll love
              </h2>
              <div className="flex justify-center gap-6">
                <Link
                  href="/pricing"
                  className="py-3 px-12 text-center"
                  style={{
                    fontFamily: '"Hanken Grotesk", sans-serif',
                    fontWeight: 500,
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    backgroundColor: '#ffffff',
                    color: '#1C1C1C',
                    textDecoration: 'none'
                  }}
                >
                  Individuals
                </Link>
                <Link
                  href="/corporate"
                  className="py-3 px-12 text-center"
                  style={{
                    fontFamily: '"Hanken Grotesk", sans-serif',
                    fontWeight: 500,
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    backgroundColor: 'transparent',
                    color: '#ffffff',
                    border: '1px solid #ffffff',
                    textDecoration: 'none'
                  }}
                >
                  Teams
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
