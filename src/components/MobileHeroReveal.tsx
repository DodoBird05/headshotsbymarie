import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu } from 'lucide-react'
import MobileFAQ from './MobileFAQ'

interface MobileHeroRevealProps {
  heroImage: string
  revealText: string[]
  onMenuClick: () => void
  children?: React.ReactNode
  scrollHeight?: string
  parallaxImage?: {
    src: string
    alt: string
  }
  faqItems?: {
    question: string
    answer: string
    fromLeft: boolean
  }[]
}

export default function MobileHeroReveal({
  heroImage,
  revealText,
  onMenuClick,
  children,
  scrollHeight = '200vh',
  parallaxImage,
  faqItems
}: MobileHeroRevealProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [layer3Scroll, setLayer3Scroll] = useState(0)
  const [parallaxScroll, setParallaxScroll] = useState(0)

  // Freeze point - layer stops scrolling here, parallax continues
  // Adjusted so testimonial text is centered on screen when frozen
  const freezePoint = 4500

  // Scroll animation
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const scrollThreshold = 400 // px to complete hero animation
      const progress = Math.min(1, scrollY / scrollThreshold)
      setScrollProgress(progress)

      // After hero animation completes, track additional scroll for Layer 3
      if (scrollY > scrollThreshold) {
        const rawScroll = scrollY - scrollThreshold
        // Cap layer3Scroll at freeze point for main content
        setLayer3Scroll(Math.min(rawScroll, freezePoint))
        // Keep tracking full scroll for parallax image
        setParallaxScroll(rawScroll)
      } else {
        setLayer3Scroll(0)
        setParallaxScroll(0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate animation values based on scroll
  const layer2Opacity = 1 - scrollProgress // Layer 2 fades out
  const layer2Scale = 1 - (scrollProgress * 0.75) // shrinks to ~25%

  // Small image dimensions (Layer 3)
  const smallImageWidth = 180 // px
  const smallImageHeight = 280 // px
  const smallImageTop = 120 // px from top

  return (
    <div className="md:hidden">
      {/* Full height container for scroll space */}
      <div style={{ height: scrollHeight }}>
        {/* Fixed viewport */}
        <div className="fixed inset-0 w-full h-screen overflow-hidden">

          {/* ========== LAYER 3 (Bottom): White bg + small image + big text ========== */}
          <div
            className="absolute inset-0 z-0 bg-white"
            style={{
              transform: `translate3d(0, -${Math.round(layer3Scroll)}px, 0)`,
              willChange: 'transform',
              backfaceVisibility: 'hidden'
            }}
          >
            {/* Small centered image */}
            <div
              className="absolute left-1/2 bg-cover bg-center bg-no-repeat rounded-lg"
              style={{
                width: `${smallImageWidth}px`,
                height: `${smallImageHeight}px`,
                top: `${smallImageTop}px`,
                transform: 'translateX(-50%)',
                backgroundImage: `url(${heroImage})`
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
              {revealText.map((line, index) => (
                <span key={index}>
                  {line}
                  {index < revealText.length - 1 && <br />}
                </span>
              ))}
            </div>

            {/* Children content (gallery, etc.) */}
            {children}
          </div>

          {/* ========== PARALLAX IMAGE (separate layer, moves independently) ========== */}
          {parallaxImage && (
            <div
              className="absolute left-0 right-0 w-full z-[5]"
              style={{
                backgroundColor: '#1C1C1C',
                top: '100vh',
                minHeight: '300vh',
                transform: `translate3d(0, -${Math.round(Math.max(0, parallaxScroll - freezePoint) * 0.5)}px, 0)`,
                willChange: 'transform',
                backfaceVisibility: 'hidden'
              }}
            >
              <div className="relative w-full" style={{ height: '80vh' }}>
                <Image
                  src={parallaxImage.src}
                  alt={parallaxImage.alt}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Lead text before FAQ */}
              <div className="text-center py-16 px-6">
                <h2
                  className="text-3xl mb-4"
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
                  className="text-lg"
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

              {/* FAQ Section */}
              {faqItems && faqItems.length > 0 && (
                <MobileFAQ
                  items={faqItems}
                  scrollProgress={Math.max(0, (parallaxScroll - freezePoint - 1500) / 3000)}
                />
              )}

              {/* Professional portraits section with buttons */}
              <div className="px-6 text-center py-16">
                <h2
                  className="text-2xl mb-8"
                  style={{
                    fontFamily: '"Majesti Banner", serif',
                    fontWeight: 300,
                    color: '#ffffff',
                    lineHeight: 1.2,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  Professional portraits you'll love
                </h2>
                <div className="flex flex-col gap-4">
                  <a
                    href="/pricing"
                    className="py-3 px-8 text-center"
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
                  </a>
                  <a
                    href="/corporate"
                    className="py-3 px-8 text-center"
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
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ========== LAYER 2 (Middle): Full screen hero - fades out ========== */}
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
                backgroundImage: `url(${heroImage})`,
                transform: `scale3d(${layer2Scale}, ${layer2Scale}, 1)`,
                transformOrigin: 'center 25%',
                willChange: 'transform',
                backfaceVisibility: 'hidden'
              }}
            />
          </div>

          {/* ========== LAYER 1 (Top): BOOK button + Logo + hamburger ========== */}
          {/* BOOK Button - Top Left */}
          <Link
            href="/pricing"
            className="absolute top-4 left-4 z-50 px-4 py-2 text-sm font-medium tracking-wider"
            style={{
              fontFamily: '"Hanken Grotesk", sans-serif',
              backgroundColor: '#DFBC49',
              color: '#1C1C1C',
              border: 'none'
            }}
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
              onClick={onMenuClick}
              className="p-2"
              style={{ color: scrollProgress > 0.5 ? '#1C1C1C' : '#fafafa' }}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
