import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Linkedin, Instagram } from 'lucide-react'

export default function Footer() {
  const [showCopied, setShowCopied] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('Marie@portraitsbymarie.art')
      setShowCopied(true)
      setTimeout(() => setShowCopied(false), 2000) // Hide message after 2 seconds
    } catch (err) {
      console.error('Failed to copy email: ', err)
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  return (
    <footer style={{ backgroundColor: '#f8f8f8', color: '#1C1C1C' }}>
      <div className="w-full py-12 px-8" onMouseMove={handleMouseMove}>
        <style jsx>{`
          .footer-link {
            background: linear-gradient(
              90deg,
              #1C1C1C 0%,
              #1C1C1C calc(${mousePosition.x}px - 150px),
              #ffffff ${mousePosition.x}px,
              #1C1C1C calc(${mousePosition.x}px + 150px),
              #1C1C1C 100%
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            transition: background 0.15s ease;
            display: inline-block;
          }
        `}</style>
        <div className="grid grid-cols-5 gap-8">
          {/* Column 1 - Menu */}
          <div>
            <ul
              className="space-y-3"
              style={{ fontFamily: '"Hanken Grotesk", sans-serif' }}
            >
              <li>
                <Link href="/corporate" className="footer-link">
                  Office Headshots
                </Link>
              </li>
              <li>
                <Link href="/actor-headshots" className="footer-link">
                  Actors Headshots
                </Link>
              </li>
              <li>
                <Link href="/linkedin-headshots" className="footer-link">
                  LinkedIn Headshots
                </Link>
              </li>
              <li>
                <Link href="/personal-branding" className="footer-link">
                  Personal Branding Photography
                </Link>
              </li>
              <li>
                <Link href="/about" className="footer-link">
                  About Marie
                </Link>
              </li>
              <li>
                <Link href="/blog" className="footer-link">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 - Contact */}
          <div className="gradient-links-contact">
            <div className="space-y-4">
              <div className="space-y-2" style={{ fontFamily: '"Hanken Grotesk", sans-serif' }}>
                <div className="relative">
                  <span
                    onClick={copyEmailToClipboard}
                    className="cursor-pointer footer-link"
                  >
                    Marie@portraitsbymarie.art
                  </span>
                  {showCopied && (
                    <div className="absolute -top-8 left-0 bg-black text-white px-2 py-1 rounded text-xs">
                      Copied to clipboard
                    </div>
                  )}
                </div>
                <div>
                  <span className="footer-link">(480) 524-0741</span>
                </div>

                {/* Social Media Icons */}
                <div className="flex space-x-4 mt-4">
                  <Link href="https://www.linkedin.com/in/marie-feutrier-mh05/" className="hover:opacity-80 transition-opacity">
                    <Linkedin className="h-5 w-5" style={{ color: '#1C1C1C' }} />
                  </Link>
                  <Link href="https://www.instagram.com/marie.feutrier/" className="hover:opacity-80 transition-opacity">
                    <Instagram className="h-5 w-5" style={{ color: '#1C1C1C' }} />
                  </Link>
                  <Link href="https://www.pinterest.com/mariefeutrier/" className="hover:opacity-80 transition-opacity">
                    <div className="h-5 w-5 flex items-center justify-center" style={{ color: '#1C1C1C' }}>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.001 24c6.624 0 11.999-5.373 11.999-12C24 5.372 18.626.001 12.001.001z"/>
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3 - Empty for now */}
          <div></div>

          {/* Columns 4 & 5 - Merged larger column */}
          <div className="col-span-2">
            {/* This is the larger merged column - empty for now */}
          </div>
        </div>

        {/* Large "Portraits by Marie" text */}
        <div className="mt-20 mb-8 w-full overflow-hidden flex justify-center">
          <h2
            className="uppercase text-center"
            style={{
              fontFamily: '"Majesti Banner", serif',
              color: '#1C1C1C',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              fontSize: '9vw',
              lineHeight: '0.85'
            }}
          >
            Portraits by Marie
          </h2>
        </div>

        <div className="mt-8">
          <p className="text-right text-sm opacity-60" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
            © 2025 Portraits By Marie. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}