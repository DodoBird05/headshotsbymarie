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
  const freezePoint = 4200

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

              {/* FAQ Section */}
              {faqItems && faqItems.length > 0 && (
                <MobileFAQ
                  items={faqItems}
                  scrollProgress={Math.max(0, (parallaxScroll - freezePoint - 1500) / 3000)}
                />
              )}
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
              className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-lg"
              style={{
                backgroundImage: `url(${heroImage})`,
                transform: `scale(${layer2Scale})`,
                transformOrigin: 'center 25%',
                transition: 'transform 0.1s ease-out'
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
              backgroundColor: '#ffffff',
              color: '#1C1C1C',
              border: '1px solid #1C1C1C'
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
