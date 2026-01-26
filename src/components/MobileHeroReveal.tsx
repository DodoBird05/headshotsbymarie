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
  parallaxImages?: {
    src: string
    alt: string
  }[]
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
  parallaxImages,
  faqItems
}: MobileHeroRevealProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [layer3Scroll, setLayer3Scroll] = useState(0)
  const [parallaxScroll, setParallaxScroll] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)
  const [viewportHeight, setViewportHeight] = useState(900)

  // Freeze point - based on viewport height so it scales consistently
  // 500vh testimonial position - ~50vh offset = 450vh worth of scroll
  const freezePoint = viewportHeight * 4.5

  // Scroll animation
  useEffect(() => {
    // Check if desktop and get viewport height
    setIsDesktop(window.innerWidth >= 768)
    setViewportHeight(window.innerHeight)

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768)
      setViewportHeight(window.innerHeight)
    }

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
    window.addEventListener('resize', handleResize)
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Calculate animation values based on scroll
  // Mobile: gradual fade out. Desktop: stay visible until overlap, then snap to hidden
  const layer2Opacity = isDesktop
    ? (scrollProgress < 0.7 ? 1 : 0) // Desktop: visible until 70%, then instantly hidden
    : Math.max(0, 1 - (scrollProgress * 2.5)) // Mobile: fades out (gone by 40% scroll)
  const layer2Scale = 1 - (scrollProgress * 0.75) // shrinks to ~25%

  // Small image dimensions (Layer 3) - will be overridden by CSS for desktop
  const smallImageWidth = 180 // px (mobile)
  const smallImageHeight = 280 // px (mobile)
  const smallImageTop = 120 // px from top

  return (
    <div>
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
            {/* Small centered image - landscape on desktop */}
            <div
              className="absolute left-1/2 bg-cover bg-center bg-no-repeat rounded-lg w-[180px] h-[280px] md:w-[30vw] md:h-[30vh] lg:w-[35vw] lg:h-[35vh]"
              style={{
                top: isDesktop ? '8vh' : `${smallImageTop}px`,
                transform: 'translateX(-50%)',
                backgroundImage: `url(${heroImage})`
              }}
            />
            {/* Big text below image - scales up on desktop */}
            <div
              className="absolute text-center text-5xl md:text-7xl lg:text-8xl top-[450px] md:top-[47vh] lg:top-[50vh]"
              style={{
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

            {/* Desktop: Testimonial section after gallery */}
            <div
              className="hidden md:block absolute left-0 right-0 text-center px-8"
              style={{ top: '500vh' }}
            >
              <div
                style={{
                  fontFamily: '"Majesti Banner", serif',
                  fontWeight: 300,
                  fontSize: '3rem',
                  color: '#1C1C1C',
                  textTransform: 'uppercase',
                  lineHeight: 1.1,
                  marginBottom: '1.5rem'
                }}
              >
                <span style={{ fontFeatureSettings: '"ss01" on' }}>M</span>ARIE IS<br />
                EXCEPTIONAL<br />
                AND THE PHOTOS<br />
                ARE QUITE POSSIBLY<br />
                THE BEST<br />
                THAT HAVE EVER<br />
                BEEN CAPTURED<br />
                OF ME.
              </div>
              <div
                style={{
                  fontFamily: '"Hanken Grotesk", sans-serif',
                  fontWeight: 400,
                  fontSize: '1rem',
                  color: '#1C1C1C'
                }}
              >
                - ALETA W<br />
                ★★★★★
              </div>
            </div>
          </div>

          {/* ========== PARALLAX IMAGES (separate layer, moves independently) ========== */}
          {/* Desktop: Only show after gallery ends (scrollY > 4500) */}
          {parallaxImages && parallaxImages.length > 0 && (
            <div
              className="absolute left-0 right-0 w-full z-[5]"
              style={{
                backgroundColor: '#1C1C1C',
                top: '100vh',
                minHeight: '300vh',
                transform: `translate3d(0, -${Math.round(Math.max(0, parallaxScroll - freezePoint) * 0.5)}px, 0)`,
                willChange: 'transform',
                opacity: 1,
                backfaceVisibility: 'hidden'
              }}
            >
              {/* Mobile: Single image (first one - Dave) */}
              <div className="md:hidden relative w-full" style={{ height: '80vh' }}>
                <Image
                  src={parallaxImages[0].src}
                  alt={parallaxImages[0].alt}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Desktop: 3 images grid - full width, no gaps */}
              <div className="hidden md:flex w-full" style={{ height: '80vh' }}>
                {parallaxImages.map((image, index) => (
                  <div key={index} className="relative h-full flex-1">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
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

              {/* Desktop only: BTS image after unrestricted */}
              <div className="hidden md:flex justify-center px-8 pb-8" style={{ height: '50vh' }}>
                <div className="relative h-full" style={{ aspectRatio: '1200/796' }}>
                  <Image
                    src="/images/BTS/Studio-Portrait-Session-By-Marie-Feutrier.webp"
                    alt="Female photographer capturing personal branding photos of client in bright minimalist studio setting"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>

              {/* Mobile only: Studio portrait session image */}
              <div className="md:hidden pb-8 flex justify-center">
                <Link href="https://headshotsbymarie.com/pricing/" style={{ width: '50%' }}>
                  <Image
                    src="/images/BTS/Studio-Portrait-Session-By-Marie-Feutrier.webp"
                    alt="Female photographer capturing personal branding photos of client in bright minimalist studio setting"
                    width={1200}
                    height={796}
                    className="w-full h-auto rounded-lg"
                  />
                </Link>
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
              opacity: isDesktop ? 1 : layer2Opacity,
              visibility: isDesktop && scrollProgress >= 0.7 ? 'hidden' : 'visible',
              transition: isDesktop ? 'none' : 'opacity 0.1s ease-out',
              pointerEvents: scrollProgress > 0.9 ? 'none' : 'auto'
            }}
          >
            {/* Full screen hero image that shrinks */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat origin-[center_25%] md:origin-[center_15%]"
              style={{
                backgroundImage: `url(${heroImage})`,
                transform: `scale3d(${layer2Scale}, ${layer2Scale}, 1)`,
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

          {/* H1 for SEO - visible at bottom left, fades out */}
          <h1
            className="absolute bottom-8 left-4 z-50 text-sm tracking-wider text-left"
            style={{
              fontFamily: '"Hanken Grotesk", sans-serif',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#ffffff',
              opacity: layer2Opacity,
              transition: 'opacity 0.1s ease-out'
            }}
          >
            Professional Headshots Photographer | Phoenix, Arizona
          </h1>

          {/* Mobile: Small logo + hamburger */}
          <div className="absolute top-4 right-4 z-50 flex items-center gap-2 md:hidden">
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

          {/* Desktop: Rectangle logo + stacked nav (fades out on scroll) */}
          <div
            className="hidden md:flex absolute top-6 right-6 z-50 items-start gap-4"
            style={{
              opacity: scrollProgress < 0.3 ? 1 : 0,
              transition: 'opacity 0.3s ease',
              pointerEvents: scrollProgress > 0.3 ? 'none' : 'auto'
            }}
          >
            <Image
              src="/Logo/Headshots-by-Marie-Rectangle-White.svg"
              alt="Headshots by Marie"
              width={200}
              height={80}
              className="h-20 w-auto"
            />
            <nav
              className="flex flex-col h-20 justify-between"
              style={{
                fontFamily: '"Hanken Grotesk", sans-serif',
                fontWeight: 300,
                fontSize: '14px',
                color: '#ffffff'
              }}
            >
              <Link href="/about" className="hover:opacity-70 transition-opacity">About</Link>
              <Link href="/pricing" className="hover:opacity-70 transition-opacity">Pricing</Link>
              <Link href="/contact" className="hover:opacity-70 transition-opacity">Contact</Link>
            </nav>
          </div>

          {/* Desktop: Square logo + hamburger (fades in on scroll) */}
          <div
            className="hidden md:flex absolute top-4 right-4 z-50 items-center gap-2"
            style={{
              opacity: scrollProgress > 0.3 ? 1 : 0,
              transition: 'opacity 0.3s ease',
              pointerEvents: scrollProgress < 0.3 ? 'none' : 'auto'
            }}
          >
            <Image
              src="/Logo/Headshots By Marie-Logo-square-White.svg"
              alt="Headshots by Marie"
              width={48}
              height={48}
              className="h-10 w-10"
              style={{ filter: scrollProgress > 0.5 ? 'invert(1)' : 'none', transition: 'filter 0.3s ease' }}
            />
            <button
              onClick={onMenuClick}
              className="p-2"
              style={{ color: scrollProgress > 0.5 ? '#1C1C1C' : '#fafafa', transition: 'color 0.3s ease' }}
            >
              <Menu className="h-7 w-7" />
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
