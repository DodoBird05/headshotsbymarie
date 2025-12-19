import { useState } from 'react'
import Link from 'next/link'
import { Home, User, ShoppingBag, FileText, X, Mail, Phone } from 'lucide-react'
import { trackNavClick, trackContactAction } from '@/lib/analytics'

export default function MobileBottomNav() {
  const [activeMenu, setActiveMenu] = useState<'about' | 'pricing' | null>(null)

  const closeMenu = () => setActiveMenu(null)

  return (
    <>
      {/* Menu Overlays */}
      {activeMenu && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.3)',
            zIndex: 998
          }}
          onClick={closeMenu}
        />
      )}

      {/* About Menu */}
      {activeMenu === 'about' && (
        <div
          style={{
            position: 'fixed',
            bottom: '90px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            zIndex: 999,
            minWidth: '220px',
            overflow: 'hidden'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px 12px 0' }}>
            <button
              onClick={closeMenu}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <X className="h-5 w-5" style={{ color: '#666' }} />
            </button>
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', padding: '0 0 12px' }}>
            <Link
              href="/about"
              onClick={() => { trackNavClick('About Marie', '/about', 'mobile_bottom_nav'); closeMenu() }}
              style={{
                padding: '12px 20px',
                color: '#1C1C1C',
                textDecoration: 'none',
                fontSize: '16px',
                fontFamily: '"Hanken Grotesk", sans-serif',
                fontWeight: 400
              }}
            >
              About Marie
            </Link>
            <Link
              href="/news"
              onClick={() => { trackNavClick('News', '/news', 'mobile_bottom_nav'); closeMenu() }}
              style={{
                padding: '12px 20px',
                color: '#1C1C1C',
                textDecoration: 'none',
                fontSize: '16px',
                fontFamily: '"Hanken Grotesk", sans-serif',
                fontWeight: 400
              }}
            >
              News
            </Link>
            <Link
              href="/everybody-loves-a-list"
              onClick={() => { trackNavClick('Everybody Loves A List', '/everybody-loves-a-list', 'mobile_bottom_nav'); closeMenu() }}
              style={{
                padding: '12px 20px',
                color: '#1C1C1C',
                textDecoration: 'none',
                fontSize: '16px',
                fontFamily: '"Hanken Grotesk", sans-serif',
                fontWeight: 400
              }}
            >
              Everybody Loves A List
            </Link>
            <Link
              href="/portraits"
              onClick={() => { trackNavClick('Conceptual Work', '/portraits', 'mobile_bottom_nav'); closeMenu() }}
              style={{
                padding: '12px 20px',
                color: '#1C1C1C',
                textDecoration: 'none',
                fontSize: '16px',
                fontFamily: '"Hanken Grotesk", sans-serif',
                fontWeight: 400
              }}
            >
              Conceptual Work
            </Link>
            <Link
              href="/the-studio"
              onClick={() => { trackNavClick('The Studio', '/the-studio', 'mobile_bottom_nav'); closeMenu() }}
              style={{
                padding: '12px 20px',
                color: '#1C1C1C',
                textDecoration: 'none',
                fontSize: '16px',
                fontFamily: '"Hanken Grotesk", sans-serif',
                fontWeight: 400
              }}
            >
              The Studio
            </Link>
          </nav>
        </div>
      )}

      {/* Pricing Menu */}
      {activeMenu === 'pricing' && (
        <div
          style={{
            position: 'fixed',
            bottom: '90px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            zIndex: 999,
            minWidth: '180px',
            overflow: 'hidden'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px 12px 0' }}>
            <button
              onClick={closeMenu}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <X className="h-5 w-5" style={{ color: '#666' }} />
            </button>
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', padding: '0 0 12px' }}>
            <Link
              href="/pricing"
              onClick={() => { trackNavClick('Pricing', '/pricing', 'mobile_bottom_nav'); closeMenu() }}
              style={{
                padding: '12px 20px',
                color: '#1C1C1C',
                textDecoration: 'none',
                fontSize: '16px',
                fontFamily: '"Hanken Grotesk", sans-serif',
                fontWeight: 400
              }}
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              onClick={() => { trackNavClick('Booking', '/contact', 'mobile_bottom_nav'); closeMenu() }}
              style={{
                padding: '12px 20px',
                color: '#1C1C1C',
                textDecoration: 'none',
                fontSize: '16px',
                fontFamily: '"Hanken Grotesk", sans-serif',
                fontWeight: 400
              }}
            >
              Booking
            </Link>
          </nav>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <div
        className="mobile-bottom-nav"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'white',
          borderTop: '1px solid #e5e5e5',
          zIndex: 997,
          display: 'none'
        }}
      >
        {/* Icon Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '10px 0 6px'
          }}
        >
          {/* Home */}
          <Link
            href="/"
            onClick={() => trackNavClick('Home', '/', 'mobile_bottom_nav')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              color: '#1C1C1C',
              gap: '4px'
            }}
          >
            <Home className="h-6 w-6" strokeWidth={1.5} />
            <span style={{ fontSize: '11px', fontFamily: '"Hanken Grotesk", sans-serif' }}>Home</span>
          </Link>

          {/* About */}
          <button
            onClick={() => setActiveMenu(activeMenu === 'about' ? null : 'about')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#1C1C1C',
              gap: '4px',
              padding: 0
            }}
          >
            <User className="h-6 w-6" strokeWidth={1.5} />
            <span style={{ fontSize: '11px', fontFamily: '"Hanken Grotesk", sans-serif' }}>About</span>
          </button>

          {/* Pricing */}
          <button
            onClick={() => setActiveMenu(activeMenu === 'pricing' ? null : 'pricing')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#1C1C1C',
              gap: '4px',
              padding: 0
            }}
          >
            <ShoppingBag className="h-6 w-6" strokeWidth={1.5} />
            <span style={{ fontSize: '11px', fontFamily: '"Hanken Grotesk", sans-serif' }}>Pricing</span>
          </button>

          {/* Blog */}
          <Link
            href="/news"
            onClick={() => trackNavClick('Blog', '/news', 'mobile_bottom_nav')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              color: '#1C1C1C',
              gap: '4px'
            }}
          >
            <FileText className="h-6 w-6" strokeWidth={1.5} />
            <span style={{ fontSize: '11px', fontFamily: '"Hanken Grotesk", sans-serif' }}>Blog</span>
          </Link>
        </div>

        {/* Contact Strip */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '24px',
            padding: '8px 0 12px',
            borderTop: '1px solid #f0f0f0',
            background: '#fafafa'
          }}
        >
          <a
            href="mailto:marie@headshotsbymarie.com"
            onClick={() => trackContactAction('email_click', 'mobile_nav')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#666',
              textDecoration: 'none',
              fontSize: '12px',
              fontFamily: '"Hanken Grotesk", sans-serif'
            }}
          >
            <Mail className="h-4 w-4" strokeWidth={1.5} />
            Email
          </a>
          <a
            href="tel:+14805240741"
            onClick={() => trackContactAction('call_click', 'mobile_nav')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#666',
              textDecoration: 'none',
              fontSize: '12px',
              fontFamily: '"Hanken Grotesk", sans-serif'
            }}
          >
            <Phone className="h-4 w-4" strokeWidth={1.5} />
            Call
          </a>
        </div>
      </div>

      {/* CSS for mobile-only display */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .mobile-bottom-nav {
            display: block !important;
          }
          /* Add padding to body so content doesn't get hidden behind nav */
          body {
            padding-bottom: 90px;
          }
        }
      `}</style>
    </>
  )
}
