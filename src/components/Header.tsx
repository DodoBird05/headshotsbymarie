import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollOpacity, setScrollOpacity] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const opacity = Math.min(1, Math.max(0.85, 1 - (scrollY / 300) * 0.15))
      setScrollOpacity(opacity)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Sticky Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 py-4 px-8 bg-white shadow-sm transition-all duration-300"
        style={{ opacity: scrollOpacity }}
      >
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/Logo/Portraits By Marie-Logo-square-White.svg"
                alt="Portraits by Marie"
                width={40}
                height={40}
                className="h-10 w-10 cursor-pointer hover:opacity-80 transition-opacity"
                style={{ filter: 'invert(1)' }}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/about"
              className="text-black font-light hover:opacity-70 transition-opacity"
              style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
            >
              About Marie
            </Link>
            <Link
              href="/pricing"
              className="text-black font-light hover:opacity-70 transition-opacity"
              style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className="text-black font-light hover:opacity-70 transition-opacity"
              style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
            >
              Contact
            </Link>
            <Link
              href="/book"
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
              style={{ fontFamily: '"Hanken Grotesk", sans-serif' }}
            >
              Book Session
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-black p-2"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-black p-2"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex flex-col items-center justify-center flex-1 space-y-8">
            <Link
              href="/about"
              className="text-black font-light text-2xl hover:opacity-80 transition-opacity"
              style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Marie
            </Link>
            <Link
              href="/pricing"
              className="text-black font-light text-2xl hover:opacity-80 transition-opacity"
              style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className="text-black font-light text-2xl hover:opacity-80 transition-opacity"
              style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/book"
              className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors text-2xl"
              style={{ fontFamily: '"Hanken Grotesk", sans-serif' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book Session
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}