import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Linkedin, Instagram } from 'lucide-react'
import { trackNavClick, trackExternalLink, trackContactAction } from '@/lib/analytics'

export default function Footer() {
  const [showCopied, setShowCopied] = useState(false)
  const [hoveredElement, setHoveredElement] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('marie@headshotsbymarie.com')
      setShowCopied(true)
      trackContactAction('copy_email', 'clipboard')
      setTimeout(() => setShowCopied(false), 2000) // Hide message after 2 seconds
    } catch (err) {
      console.error('Failed to copy email: ', err)
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>, elementId: string) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setHoveredElement(elementId)
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  const handleMouseLeave = () => {
    setHoveredElement(null)
  }

  return (
    <footer className="hidden md:block" style={{ backgroundColor: '#f8f8f8', color: '#1C1C1C' }}>
      <div className="w-full py-12 px-8">
        <style jsx>{`
          .footer-link {
            color: #1C1C1C;
            display: inline-block;
            transition: all 0.15s ease;
            position: relative;
          }
          .footer-link.active {
            background: radial-gradient(
              circle at ${mousePosition.x}px ${mousePosition.y}px,
              #ffffff 0%,
              #1C1C1C 50px
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
          }
        `}</style>
        <div className="grid grid-cols-1 md:grid-cols-10 gap-8 md:gap-4">
          {/* Column 1 - Menu (30%) */}
          <div className="col-span-1 md:col-span-3">
            <ul
              className="space-y-3"
              style={{ fontSize: '1.5rem', lineHeight: '1.1' }}
            >
              {[
                { text: 'OFFICE headshots', href: '/corporate', id: 'corporate' },
                { text: 'ACTORS headshots', href: '/actor-headshots', id: 'actor' },
                { text: 'LinkedIn PROFILE pictures', href: '/linkedin-headshots', id: 'linkedin' },
                { text: 'Personal BRANDING photography', href: '/personal-branding', id: 'branding' },
                { text: 'About MARIE', href: '/about', id: 'about' },
                { text: 'BLOG', href: '/news', id: 'blog' }
              ].map((item, index) => {
                const parts = item.text.split(' ')
                return (
                  <li key={index}>
                    <Link href={item.href} style={{ textDecoration: 'none' }} onClick={() => trackNavClick(item.text, item.href, 'footer')}>
                      <span
                        className={`footer-link ${hoveredElement === item.id ? 'active' : ''}`}
                        onMouseMove={(e) => handleMouseMove(e, item.id)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {parts.map((word, i) => (
                          <span
                            key={i}
                            style={{
                              fontFamily: '"Hanken Grotesk", sans-serif',
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              letterSpacing: '0.1em'
                            }}
                          >
                            {word}{i < parts.length - 1 ? ' ' : ''}
                          </span>
                        ))}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Column 2 - Contact (70%) */}
          <div className="col-span-1 md:col-span-7 gradient-links-contact flex items-start justify-start">
            <div className="space-y-4">
              <div className="space-y-2" style={{ fontFamily: '"Hanken Grotesk", sans-serif', fontSize: '1.5rem' }}>
                <div className="relative">
                  <span
                    onClick={copyEmailToClipboard}
                    className={`cursor-pointer footer-link ${hoveredElement === 'email' ? 'active' : ''}`}
                    onMouseMove={(e) => handleMouseMove(e, 'email')}
                    onMouseLeave={handleMouseLeave}
                  >
                    marie@headshotsbymarie.com
                  </span>
                  {showCopied && (
                    <div className="absolute -top-8 left-0 bg-black text-white px-2 py-1 rounded text-xs">
                      Copied to clipboard
                    </div>
                  )}
                </div>
                <div>
                  <span
                    className={`footer-link ${hoveredElement === 'phone' ? 'active' : ''}`}
                    onMouseMove={(e) => handleMouseMove(e, 'phone')}
                    onMouseLeave={handleMouseLeave}
                  >
                    (480) 524-0741
                  </span>
                </div>

                {/* Social Media Icons */}
                <div className="flex space-x-4 mt-4">
                  <Link href="https://www.linkedin.com/in/marie-feutrier-mh05/" className="hover:opacity-80 transition-opacity" aria-label="Follow Marie on LinkedIn" onClick={() => trackExternalLink('https://www.linkedin.com/in/marie-feutrier-mh05/', 'LinkedIn', 'linkedin')}>
                    <Linkedin className="h-5 w-5 md:h-8 md:w-8" style={{ color: '#1C1C1C' }} aria-hidden="true" />
                  </Link>
                  <Link href="https://www.instagram.com/marie.feutrier/" className="hover:opacity-80 transition-opacity" aria-label="Follow Marie on Instagram" onClick={() => trackExternalLink('https://www.instagram.com/marie.feutrier/', 'Instagram', 'instagram')}>
                    <Instagram className="h-5 w-5 md:h-8 md:w-8" style={{ color: '#1C1C1C' }} aria-hidden="true" />
                  </Link>
                  <Link href="https://www.pinterest.com/mariefeutrier/" className="hover:opacity-80 transition-opacity" aria-label="Follow Marie on Pinterest" onClick={() => trackExternalLink('https://www.pinterest.com/mariefeutrier/', 'Pinterest', 'pinterest')}>
                    <div className="h-5 w-5 md:h-8 md:w-8 flex items-center justify-center" style={{ color: '#1C1C1C' }} aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 md:h-8 md:w-8">
                        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.001 24c6.624 0 11.999-5.373 11.999-12C24 5.372 18.626.001 12.001.001z"/>
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Large "Headshots by Marie" text */}
        <div className="mt-20 mb-8 w-full overflow-hidden flex justify-center">
          <Link href="/pricing" style={{ textDecoration: 'none', cursor: 'pointer' }} onClick={() => trackNavClick('Headshots by Marie (CTA)', '/pricing', 'footer_cta')}>
            <h2
              className={`uppercase text-center footer-link ${hoveredElement === 'title' ? 'active' : ''}`}
              style={{
                fontFamily: '"Majesti Banner", serif',
                color: '#1C1C1C',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                fontSize: '9vw',
                lineHeight: '0.85'
              }}
              onMouseMove={(e) => handleMouseMove(e, 'title')}
              onMouseLeave={handleMouseLeave}
            >
              Headshots by Marie
            </h2>
          </Link>
        </div>

        <div className="mt-8">
          <p className="text-right text-sm opacity-60" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
            © 2026 Headshots By Marie. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}