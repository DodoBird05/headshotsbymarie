import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

interface HeroSectionProps {
  frontmatter: {
    title: string
    heroTitle: string
    services: {
      title: string
      href: string
      heroImage: string
      hoverKey: string
    }[]
    defaultHeroImage: string
  }
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (open: boolean) => void
}

export default function HeroSection({
  frontmatter,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}: HeroSectionProps) {
  const [heroBackground, setHeroBackground] = useState(frontmatter.defaultHeroImage)
  const [hoveredMenuItem, setHoveredMenuItem] = useState<string | null>(null)

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        height: '100vh'
      }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-300"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex">
        {/* Header with Logo and Menu */}
        {/* Desktop Header */}
        <div className="hidden md:absolute md:top-8 md:right-8 md:flex md:items-start md:gap-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/Logo/Portraits-by-Marie-Logo-Rectangle-White.svg"
              alt="Portraits by Marie - Professional portrait photography Phoenix Arizona"
              width={300}
              height={120}
              className="h-32 w-auto"
            />
          </div>

          {/* Navigation Menu */}
          <nav className="flex flex-col h-32 justify-between">
            <Link
              href="/about"
              className="text-white font-light text-lg hover:opacity-80 transition-opacity"
            >
              About
            </Link>
            <Link
              href="/pricing"
              className="text-white font-light text-lg hover:opacity-80 transition-opacity"
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className="text-white font-light text-lg hover:opacity-80 transition-opacity"
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden absolute top-4 right-4 z-20 flex items-center gap-2">
          {/* Square Logo for Mobile */}
          <Image
            src="/Logo/Portraits By Marie-Logo-square-White.svg"
            alt="Portraits by Marie - Professional portrait photography Phoenix Arizona"
            width={40}
            height={40}
            className="h-8 w-8"
          />

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-2"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col">
            {/* Close button at the top */}
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-black p-2"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation Menu */}
            <nav className="flex flex-col items-center justify-center flex-1 space-y-8">
              <Link
                href="/about"
                className="text-black font-light text-2xl hover:opacity-80 transition-opacity"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
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
            </nav>
          </div>
        )}

        {/* Main Content - Responsive Layout */}
        <div className="min-h-screen flex items-center justify-center px-4 md:px-8">
          {/* Desktop: 3 Column Layout */}
          <div className="hidden md:grid md:grid-cols-3 md:gap-8 md:min-h-screen md:w-full">
            {/* First Column - Navigation Menu */}
            <div
              className="text-left space-y-4 flex flex-col justify-center"
              onMouseLeave={() => {
                setHoveredMenuItem(null)
                setHeroBackground(frontmatter.defaultHeroImage)
              }}
            >
              {frontmatter.services.map((service, index) => (
                <Link key={index} href={service.href}>
                  <div
                    className={`text-6xl font-light transition-opacity cursor-pointer ${
                      hoveredMenuItem && hoveredMenuItem !== service.hoverKey ? 'opacity-30' : 'opacity-100 hover:opacity-80'
                    }`}
                    style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#fafafa', fontWeight: 300 }}
                    onMouseEnter={() => {
                      setHeroBackground(service.heroImage)
                      setHoveredMenuItem(service.hoverKey)
                    }}
                  >
                    {service.title}
                  </div>
                </Link>
              ))}
            </div>

            {/* Middle Column - Empty for now */}
            <div></div>

            {/* Third Column - H1 and Tagline bottom left */}
            <div className="flex flex-col justify-end items-start pb-16">
              <div className="text-left">
                <h1 className="text-lg font-light mb-2" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#fafafa', fontWeight: 300 }}>
                  {frontmatter.title}
                </h1>
                <div className="text-4xl font-light" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#fafafa', fontWeight: 300 }}>
                  {frontmatter.heroTitle}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: Centered Stacked Layout */}
          <div className="md:hidden flex flex-col justify-between min-h-screen w-full py-20">
            {/* Mobile Navigation Menu - Left Aligned */}
            <div className="flex-1 flex flex-col justify-center space-y-4 px-8">
              {frontmatter.services.map((service, index) => (
                <Link key={index} href={service.href}>
                  <div className="text-2xl font-light text-white hover:opacity-80 transition-opacity cursor-pointer text-left" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: 'white', fontWeight: 300 }}>
                    {service.title}
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile H1 and Tagline - At Bottom */}
            <div className="text-center pb-8">
              <h1 className="text-sm font-light mb-2" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#fafafa', fontWeight: 300 }}>
                {frontmatter.title}
              </h1>
              <div className="text-xl font-light" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#fafafa', fontWeight: 300 }}>
                {frontmatter.heroTitle}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
