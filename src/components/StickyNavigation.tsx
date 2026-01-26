import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, Menu } from 'lucide-react'
import { trackNavClick } from '@/lib/analytics'

export default function StickyNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isOnDarkBackground, setIsOnDarkBackground] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight / 100
      const heroScrollEnd = 50 * vh
      const progress = Math.min(1, window.scrollY / heroScrollEnd)
      setScrollProgress(progress)

      // Determine if we're on a dark or light background
      // Hero (0-50vh): dark
      // Reveal + Gallery (50vh to ~350vh): light
      // Dark sections (parallax, FAQ, CTA, footer): dark
      const darkSectionStart = 350 * vh // Approximate start of dark sections
      const onHero = window.scrollY < heroScrollEnd * 0.5
      const onDarkSections = window.scrollY > darkSectionStart
      setIsOnDarkBackground(onHero || onDarkSections)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Colors change based on background (white on dark, dark on light)
  const textColor = isOnDarkBackground ? '#ffffff' : '#1C1C1C'
  const logoFilter = isOnDarkBackground ? 'none' : 'invert(1)'

  return (
    <>
      {/* Sticky Navigation */}
      <div className="fixed inset-x-0 top-0 z-50 pointer-events-none">
        <div className="relative w-full h-[10vh] pointer-events-auto">
          {/* BOOK Button */}
          <Link
            href="/pricing"
            className="absolute top-[2vh] left-[2vh] px-4 py-2 text-sm font-medium tracking-wider"
            style={{
              fontFamily: '"Hanken Grotesk", sans-serif',
              backgroundColor: '#DFBC49',
              color: '#1C1C1C'
            }}
          >
            BOOK
          </Link>

          {/* Mobile: Logo + hamburger */}
          <div className="absolute top-[2vh] right-[2vh] flex items-center gap-2 md:hidden">
            <Image
              src="/Logo/Headshots By Marie-Logo-square-White.svg"
              alt="Headshots by Marie"
              width={40}
              height={40}
              className="h-8 w-8"
              style={{ filter: logoFilter }}
            />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
              style={{ color: textColor }}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Desktop: Rectangle logo + nav (fades out) */}
          <div
            className="hidden md:flex absolute top-[3vh] right-[3vh] items-start gap-4"
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
              className="h-[10vh] w-auto"
            />
            <nav
              className="flex flex-col h-[10vh] justify-between"
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

          {/* Desktop: Square logo + hamburger (fades in) */}
          <div
            className="hidden md:flex absolute top-[2vh] right-[2vh] items-center gap-2"
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
              className="h-[5vh] w-auto"
              style={{ filter: logoFilter }}
            />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
              style={{ color: textColor }}
            >
              <Menu className="h-7 w-7" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-[100] flex flex-col">
          <div className="flex justify-end p-4">
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-black p-2">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center flex-1 space-y-8">
            <Link
              href="/about"
              className="text-black font-light text-2xl"
              style={{ fontFamily: '"Hanken Grotesk", sans-serif' }}
              onClick={() => { trackNavClick('About', '/about', 'mobile_menu'); setIsMobileMenuOpen(false) }}
            >
              About
            </Link>
            <Link
              href="/pricing"
              className="text-black font-light text-2xl"
              style={{ fontFamily: '"Hanken Grotesk", sans-serif' }}
              onClick={() => { trackNavClick('Pricing', '/pricing', 'mobile_menu'); setIsMobileMenuOpen(false) }}
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className="text-black font-light text-2xl"
              style={{ fontFamily: '"Hanken Grotesk", sans-serif' }}
              onClick={() => { trackNavClick('Contact', '/contact', 'mobile_menu'); setIsMobileMenuOpen(false) }}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}
