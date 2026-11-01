import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { trackNavClick, trackEvent } from '@/lib/analytics'

// The phone top bar. At the top of the page it shows the links; once the
// visitor scrolls down they fold into a ☰ that opens the same links full
// screen (mirrors StickyNavigation on desktop). Services are deliberately not
// listed here: the site funnels service-page visitors to the homepage/pricing.
// Same three links as the desktop nav. No Blog link: the blog is reached from
// About Me (/about/ links to the blog categories).
const NAV_LINKS = [
  { text: 'About Me', href: '/about/' },
  { text: 'Pricing', href: '/pricing/' },
  { text: 'Contact', href: '/contact/' }
]

// Same threshold as the desktop nav: 30% of the 50vh hero scroll = 15vh.
const COLLAPSE_AT_VH = 15

// Typography matches the desktop nav exactly (StickyNavigation): the bar links
// mirror the desktop header links, the menu links mirror the desktop menu.
const barLinkStyle = {
  color: '#1C1C1C',
  textDecoration: 'none',
  fontSize: '14px',
  fontFamily: '"Romie", serif',
  fontWeight: 300
}

const menuLinkStyle = {
  color: '#1C1C1C',
  textDecoration: 'none',
  fontSize: '18px',
  fontFamily: '"Romie", serif',
  fontWeight: 300,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em'
}

export default function MobileBottomNav() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  // Fold the links into the ☰ once the visitor has scrolled down.
  // setState with an unchanged boolean is a no-op, so this doesn't re-render
  // on every scroll event.
  useEffect(() => {
    const onScroll = () => setIsCollapsed(window.scrollY > (window.innerHeight * COLLAPSE_AT_VH) / 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // While the menu is open: lock body scroll, close on Escape,
  // move focus to the close button.
  useEffect(() => {
    if (!isMenuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isMenuOpen])

  return (
    <>
      {/* Top Navigation Bar */}
      <div
        className="mobile-top-nav"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          background: 'white',
          borderBottom: '1px solid #e5e5e5',
          zIndex: 997,
          display: 'none'
        }}
      >
        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 16px'
          }}
        >
          {/* Logo */}
          <Link href="/" aria-label="Headshots by Marie - Go to homepage">
            <Image
              src="/Logo/Headshots By Marie-Logo-square-White.svg"
              alt="Headshots by Marie"
              width={32}
              height={32}
              className="h-7 w-7"
              style={{ filter: 'invert(1)' }}
            />
          </Link>

          {/* Nav Links (top of page) */}
          <nav
            aria-hidden={isCollapsed}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              opacity: isCollapsed ? 0 : 1,
              pointerEvents: isCollapsed ? 'none' : 'auto',
              transition: 'opacity 0.3s ease'
            }}
          >
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                tabIndex={isCollapsed ? -1 : undefined}
                onClick={() => trackNavClick(item.text, item.href, 'mobile_top_nav')}
                style={barLinkStyle}
              >
                {item.text}
              </Link>
            ))}
          </nav>

          {/* Menu button (after scrolling down) */}
          <button
            onClick={() => {
              trackEvent('menu_open', { location: 'mobile_top_nav' })
              setIsMenuOpen(true)
            }}
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            aria-hidden={!isCollapsed}
            tabIndex={isCollapsed ? undefined : -1}
            style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#1C1C1C',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              opacity: isCollapsed ? 1 : 0,
              pointerEvents: isCollapsed ? 'auto' : 'none',
              transition: 'opacity 0.3s ease'
            }}
          >
            <Menu className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Full-screen menu. Portalled to <body>: the bar lives inside a stacking
          context that sits below the floating CTA (z 60), so a high zIndex here
          alone would still leave the CTA painted on top of the open menu. */}
      {isMenuOpen && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
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
              ref={closeRef}
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
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
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => { trackNavClick(item.text, item.href, 'mobile_menu'); setIsMenuOpen(false) }}
                style={menuLinkStyle}
              >
                {item.text}
              </Link>
            ))}
          </nav>
        </div>,
        document.body
      )}

      {/* CSS for mobile-only display */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .mobile-top-nav {
            display: block !important;
          }
        }
      `}</style>
    </>
  )
}
