import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, Mail, Phone, Menu } from 'lucide-react'
import { trackNavClick, trackContactAction } from '@/lib/analytics'

export default function MobileBottomNav() {
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false)

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

          {/* Nav Links */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px'
            }}
          >
            <Link
              href="/about/"
              onClick={() => trackNavClick('About Me', '/about', 'mobile_top_nav')}
              style={{
                color: '#1C1C1C',
                textDecoration: 'none',
                fontSize: '12px',
                fontFamily: '"Hanken Grotesk", sans-serif',
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              About Me
            </Link>
            <Link
              href="/pricing/"
              onClick={() => trackNavClick('Pricing', '/pricing', 'mobile_top_nav')}
              style={{
                color: '#1C1C1C',
                textDecoration: 'none',
                fontSize: '12px',
                fontFamily: '"Hanken Grotesk", sans-serif',
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              Pricing
            </Link>
            <Link
              href="/contact/"
              onClick={() => trackNavClick('Contact', '/contact', 'mobile_top_nav')}
              style={{
                color: '#1C1C1C',
                textDecoration: 'none',
                fontSize: '12px',
                fontFamily: '"Hanken Grotesk", sans-serif',
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              Contact
            </Link>
            <Link
              href="/news/"
              onClick={() => trackNavClick('Blog', '/news', 'mobile_top_nav')}
              style={{
                color: '#1C1C1C',
                textDecoration: 'none',
                fontSize: '12px',
                fontFamily: '"Hanken Grotesk", sans-serif',
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              Blog
            </Link>
            <button
              onClick={() => setIsFullMenuOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#1C1C1C',
                padding: 0,
                display: 'flex',
                alignItems: 'center'
              }}
              aria-label="Open full menu"
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </nav>
        </div>

      </div>

      {/* Full Menu Overlay */}
      {isFullMenuOpen && (
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
              onClick={() => setIsFullMenuOpen(false)}
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
              { text: 'Executive Headshots', href: '/executive-headshots/' },
              { text: 'Corporate Headshots', href: '/corporate-headshots/' },
              { text: 'Team Photography', href: '/team-photography/' },
              { text: 'Actors Headshots', href: '/phoenix-actor-headshots/' },
              { text: 'LinkedIn Profile Pictures', href: '/linkedin-headshots/' },
              { text: 'Personal Branding Photography', href: '/personal-branding/' },
              { text: 'About Me', href: '/about/' },
              { text: 'Blog', href: '/news/' }
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => { trackNavClick(item.text, item.href, 'mobile_full_menu'); setIsFullMenuOpen(false) }}
                style={{
                  color: '#1C1C1C',
                  textDecoration: 'none',
                  fontSize: '18px',
                  fontFamily: '"Hanken Grotesk", sans-serif',
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
