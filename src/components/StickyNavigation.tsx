import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, Menu } from 'lucide-react'
import { trackNavClick, trackButtonClick, trackEvent } from '@/lib/analytics'

interface StickyNavigationProps {
  bookLink?: string
  lightBackground?: boolean
  ctaLabel?: string
  hideFloatingCta?: boolean
}

export default function StickyNavigation({ bookLink = '/pricing', lightBackground = false, ctaLabel = 'See how it works', hideFloatingCta = false }: StickyNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isOnDarkBackground, setIsOnDarkBackground] = useState(!lightBackground)

  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight / 100
      const heroScrollEnd = 50 * vh
      const progress = Math.min(1, window.scrollY / heroScrollEnd)
      setScrollProgress(progress)

      if (lightBackground) {
        // For light background pages, always use dark text
        setIsOnDarkBackground(false)
      } else {
        // Determine if we're on a dark or light background
        // Hero (0-50vh): dark
        // Reveal + Gallery (50vh to ~350vh): light
        // Dark sections (parallax, FAQ, CTA, footer): dark
        const darkSectionStart = 350 * vh // Approximate start of dark sections
        const onHero = window.scrollY < heroScrollEnd
        const onDarkSections = window.scrollY > darkSectionStart
        setIsOnDarkBackground(onHero || onDarkSections)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lightBackground])

  // Colors change based on background (white on dark, dark on light)
  const textColor = isOnDarkBackground ? '#ffffff' : '#1C1C1C'
  const logoFilter = isOnDarkBackground ? 'none' : 'invert(1)'

  return (
    <>
      {/* Sticky Navigation */}
      <div className="fixed inset-x-0 top-0 z-50 pointer-events-none">
        <div className="relative w-full h-[10vh] pointer-events-auto">
          {/* Mobile: No logo/hamburger — handled by MobileBottomNav top bar */}

          {/* Desktop: Rectangle logo + nav (fades out) */}
          <div
            className="hidden md:flex absolute top-[3vh] right-[3vh] items-start gap-4"
            style={{
              opacity: scrollProgress < 0.3 ? 1 : 0,
              transition: 'opacity 0.3s ease',
              pointerEvents: scrollProgress > 0.3 ? 'none' : 'auto'
            }}
          >
            <Link href="/" aria-label="Headshots by Marie - Go to homepage">
              <Image
                src="/Logo/Headshots-by-Marie-Rectangle-White.svg"
                alt="Headshots by Marie"
                width={200}
                height={80}
                className="h-[10vh] w-auto"
                style={{ filter: logoFilter }}
              />
            </Link>
            <nav
              className="flex flex-col h-[10vh] justify-between"
              style={{
                fontFamily: '"Hanken Grotesk", sans-serif',
                fontWeight: 300,
                fontSize: '14px',
                color: textColor
              }}
            >
              <Link href="/about" className="hover:opacity-70 transition-opacity" onClick={() => trackNavClick('About', '/about', 'desktop_nav')}>About</Link>
              <Link href="/pricing" className="hover:opacity-70 transition-opacity" onClick={() => trackNavClick('Pricing', '/pricing', 'desktop_nav')}>Pricing</Link>
              <Link href="/contact" className="hover:opacity-70 transition-opacity" onClick={() => trackNavClick('Contact', '/contact', 'desktop_nav')}>Contact</Link>
            </nav>
          </div>

          {/* Desktop: Square logo + hamburger (fades in) */}
          <div
            className="hidden md:flex absolute top-[2vh] right-[2vh] items-center gap-2"
            style={{
              opacity: scrollProgress > 0.3 ? 1 : 0,
              transition: 'opacity 0.3s ease',
              pointerEvents: scrollProgress < 0.3 ? 'none' : 'auto'
            }}
          >
            <Link href="/" aria-label="Headshots by Marie - Go to homepage">
              <Image
                src="/Logo/Headshots By Marie-Logo-square-White.svg"
                alt="Headshots by Marie"
                width={48}
                height={48}
                className="h-[5vh] w-auto"
                style={{ filter: logoFilter }}
              />
            </Link>
            <button
              onClick={() => {
                if (!isMobileMenuOpen) trackEvent('menu_open', { location: 'sticky_nav' })
                setIsMobileMenuOpen(!isMobileMenuOpen)
              }}
              className="p-2"
              style={{ color: textColor }}
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className="h-7 w-7" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating CTA — bottom right */}
      {!hideFloatingCta && <Link
        href={bookLink}
        onClick={() => trackButtonClick(ctaLabel, 'floating_cta', bookLink)}
        className="floating-cta"
        style={{
          position: 'fixed',
          right: '24px',
          zIndex: 60,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          textDecoration: 'none',
          transition: 'transform 0.2s ease',
        }}
      >
        <Image
          src="/images/hi-bubble.svg"
          alt="Hi"
          width={70}
          height={58}
          style={{ width: '70px', height: 'auto', filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.15))' }}
        />
        <span
          style={{
            fontFamily: '"Hanken Grotesk", sans-serif',
            fontSize: '11px',
            fontWeight: 500,
            color: isOnDarkBackground ? '#ffffff' : '#1C1C1C',
            textAlign: 'center',
            lineHeight: 1.2,
            maxWidth: '80px',
            textShadow: isOnDarkBackground
              ? '0 1px 3px rgba(0,0,0,0.5)'
              : '0 1px 3px rgba(255,255,255,0.8)',
            transition: 'color 0.3s ease, text-shadow 0.3s ease',
          }}
        >
          {ctaLabel}
        </span>
      </Link>}

      <style jsx global>{`
        .floating-cta {
          bottom: 24px;
        }
        .floating-cta:hover {
          transform: scale(1.08);
        }
        @media (max-width: 768px) {
          .floating-cta {
            bottom: 110px;
            right: 16px;
          }
          .floating-cta img {
            width: 60px !important;
          }
        }
      `}</style>

    </>
  )
}
