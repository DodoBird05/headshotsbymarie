import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, Menu } from 'lucide-react'
import { trackNavClick, trackButtonClick, trackEvent } from '@/lib/analytics'

interface StickyNavigationProps {
  bookLink?: string
  lightBackground?: boolean
  ctaLabel?: string
  hideFloatingCta?: boolean
  // Set when the hero is a light image: the logo, nav links and hamburger go
  // dark over the hero instead of white. Sections further down keep their own
  // light/dark handling, so the nav still flips to white on the dark bands.
  lightHero?: boolean
}

export default function StickyNavigation({ bookLink = '/pricing', lightBackground = false, ctaLabel = 'See how it works', hideFloatingCta = false, lightHero = false }: StickyNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const menuCloseRef = useRef<HTMLButtonElement>(null)

  // While the overlay is open: lock body scroll, close on Escape, move focus
  // to the close button (and restore it on close via the browser default).
  useEffect(() => {
    if (!isMobileMenuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    menuCloseRef.current?.focus()
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isMobileMenuOpen])
  // Page loads at scrollY 0, i.e. on the hero — so a light hero starts dark
  // too. Getting this right on the first paint avoids a white-to-black flash
  // when the scroll handler runs after hydration.
  const [isOnDarkBackground, setIsOnDarkBackground] = useState(!lightBackground && !lightHero)

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
        // Hero (0-50vh): dark, unless lightHero says the hero image is light
        // Reveal + Gallery (50vh to ~350vh): light
        // Dark sections (parallax, FAQ, CTA, footer): dark
        const darkSectionStart = 350 * vh // Approximate start of dark sections
        const onHero = window.scrollY < heroScrollEnd
        const onDarkSections = window.scrollY > darkSectionStart
        setIsOnDarkBackground((onHero && !lightHero) || onDarkSections)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lightBackground, lightHero])

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
                className="h-[10vh] w-auto logo-hover"
                style={{ filter: logoFilter, transition: 'filter 0.3s ease' }}
              />
            </Link>
            <nav
              className="flex flex-col h-[10vh] justify-between"
              style={{
                fontFamily: '"Romie", serif',
                fontWeight: 300,
                fontSize: '14px',
                color: textColor
              }}
            >
              <Link href="/about/" className="hover:opacity-70 transition-opacity" onClick={() => trackNavClick('About Me', '/about', 'desktop_nav')}>About Me</Link>
              <Link href="/pricing/" className="hover:opacity-70 transition-opacity" onClick={() => trackNavClick('Pricing', '/pricing', 'desktop_nav')}>Pricing</Link>
              <Link href="/contact/" className="hover:opacity-70 transition-opacity" onClick={() => trackNavClick('Contact', '/contact', 'desktop_nav')}>Contact</Link>
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
                className="h-[5vh] w-auto logo-hover"
                style={{ filter: logoFilter, transition: 'filter 0.3s ease' }}
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

      {/* Desktop menu overlay — same links as the nav that fades out on scroll */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'white',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px' }}>
            <button
              ref={menuCloseRef}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px'
              }}
            >
              <X className="h-6 w-6" style={{ color: '#1C1C1C' }} aria-hidden="true" />
            </button>
          </div>
          <nav
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              gap: '24px'
            }}
          >
            {[
              { text: 'About Me', href: '/about/' },
              { text: 'Pricing', href: '/pricing/' },
              { text: 'Contact', href: '/contact/' }
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => { trackNavClick(item.text, item.href, 'sticky_nav_menu'); setIsMobileMenuOpen(false) }}
                style={{
                  color: '#1C1C1C',
                  textDecoration: 'none',
                  fontSize: '18px',
                  fontFamily: '"Romie", serif',
                  fontWeight: 300,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                {item.text}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Floating CTA — bottom right */}
      {!hideFloatingCta && <Link
        href={bookLink}
        onClick={() => trackButtonClick(ctaLabel, 'floating_cta', bookLink)}
        className="floating-cta"
        style={{
          position: 'fixed',
          right: '16px',
          zIndex: 60,
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          transition: 'transform 0.2s ease',
          backgroundColor: '#D4A843',
          padding: '8px 14px',
          borderRadius: '8px',
          maxWidth: 'calc(100vw - 32px)',
        }}
      >
        <span
          style={{
            fontFamily: '"Romie", serif',
            fontSize: '12px',
            fontWeight: 500,
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 1.2,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          {ctaLabel.split(' ').slice(0, 2).join(' ')}
          <br />
          {ctaLabel.split(' ').slice(2).join(' ')}
        </span>
      </Link>}

      <style jsx global>{`
        .logo-hover:hover {
          filter: brightness(0) saturate(100%) invert(76%) sepia(30%) saturate(700%) hue-rotate(5deg) brightness(95%) contrast(90%) !important;
        }
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
