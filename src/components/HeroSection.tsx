import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X } from 'lucide-react'
import { trackNavClick } from '@/lib/analytics'
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
  const [heroBackground] = useState(frontmatter.defaultHeroImage)

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
    </>
  )
}
