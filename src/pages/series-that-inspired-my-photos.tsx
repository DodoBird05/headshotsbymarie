import Layout from '@/components/Layout'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, ChevronUp, MapPin, Star, Lightbulb, Menu, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

export default function SeriesThatInspiredMyPhotosPage() {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const moreMenuRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setIsMoreMenuOpen(false)
      }
    }
    if (isMoreMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMoreMenuOpen])

  // Auto-collapse dropdown after 10 seconds
  useEffect(() => {
    if (isMoreMenuOpen) {
      const timer = setTimeout(() => {
        setIsMoreMenuOpen(false)
      }, 10000)
      return () => clearTimeout(timer)
    }
  }, [isMoreMenuOpen])

  const series = [
    {
      name: 'The Morning Show',
      text: 'Each location has a specific color scheme, and it\'s spectacular. Cold tones on the TV set, warm tones in the hotel rooms. The color work is so intentional that sometimes I pause just to study how they\'re using it to tell the story. The cinematography does as much emotional heavy lifting as the dialogue.',
      image: '/images/tv-morning-show.webp'
    },
    {
      name: 'Foundation',
      text: 'Visually stunning doesn\'t even cover it. The scale, the compositions, the way they use light and color to create entire worlds - it\'s breathtaking. Every frame feels like it could be a painting.',
      image: '/images/tv-foundation.webp'
    },
    {
      name: 'Westworld',
      text: 'The desert landscapes, the contrast between the park and the real world, the way they play with time and perspective visually. It\'s a masterclass in using environment to build atmosphere.',
      image: '/images/tv-westworld.webp'
    },
    {
      name: 'The Crown',
      text: 'The attention to detail in recreating period-specific photography is incredible. They didn\'t just match the costumes and sets - they matched the look of how things were photographed in each era. The way they shoot the 1950s versus the 1980s changes completely, and it\'s so well done.',
      image: '/images/tv-the-crown.webp'
    },
    {
      name: 'Mad Men',
      text: 'That mid-century aesthetic, perfectly lit and composed. Every shot looks like it could be a vintage advertisement, which is exactly the point. The visual storytelling is as tight as the writing.',
      image: '/images/tv-mad-men.webp'
    },
    {
      name: 'The Outsider',
      text: 'Cold and green. The color palette creates this unsettling, isolating atmosphere that never lets you relax. It\'s bleak and beautiful and exactly right for the story they\'re telling.',
      image: '/images/tv-the-outsider.webp'
    }
  ]

  return (
    <>
      <Head>
        <title>Series That Inspired My Photos - Portraits By Marie</title>
        <meta name="description" content="The TV shows that inspire Marie's photography" />
        <style>{`
          @media (min-width: 1200px) {
            .more-button { display: none !important; }
            .dropdown-item { display: none !important; }
          }

          @media (max-width: 1199px) {
            .menu-item-hide-medium { display: none !important; }
          }

          @media (max-width: 768px) {
            .desktop-sidebar { display: none !important; }
            .mobile-sidebar { display: flex !important; }
            .horizontal-nav { display: none !important; }
          }

          @media (min-width: 769px) {
            .desktop-sidebar { display: block !important; }
            .mobile-sidebar { display: none !important; }
          }
        `}</style>
      </Head>

      <Layout title="Series That Inspired My Photos" description="The TV shows that inspire my photography">
        <div style={{
          display: 'flex',
          minHeight: '100vh',
          background: '#ffffff',
          padding: '1%',
          fontFamily: 'Verdana, Arial, sans-serif'
        }}>

          {/* Mobile Narrow Sidebar with Hamburger */}
          <div
            className="mobile-sidebar"
            style={{
              width: '50px',
              background: '#000000',
              padding: '15px 10px',
              color: 'white',
              flexShrink: 0,
              display: 'none',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '5px'
              }}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div
              style={{
                position: 'fixed',
                inset: 0,
                background: 'white',
                zIndex: 50,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px' }}>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#1C1C1C',
                    cursor: 'pointer',
                    padding: '8px'
                  }}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                gap: '32px'
              }}>
                <Link href="/" style={{ color: '#1C1C1C', textDecoration: 'none', fontSize: '24px', fontFamily: '"Hanken Grotesk", sans-serif', fontWeight: 300 }} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                <Link href="/about" style={{ color: '#1C1C1C', textDecoration: 'none', fontSize: '24px', fontFamily: '"Hanken Grotesk", sans-serif', fontWeight: 300 }} onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                <Link href="/pricing" style={{ color: '#1C1C1C', textDecoration: 'none', fontSize: '24px', fontFamily: '"Hanken Grotesk", sans-serif', fontWeight: 300 }} onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
                <Link href="/contact" style={{ color: '#1C1C1C', textDecoration: 'none', fontSize: '24px', fontFamily: '"Hanken Grotesk", sans-serif', fontWeight: 300 }} onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
              </nav>
            </div>
          )}

          {/* Desktop Black Left Column */}
          <div
            className="desktop-sidebar"
            style={{
              width: '200px',
              background: '#000000',
              padding: '20px',
              color: 'white',
              flexShrink: 0
            }}
          >
            <h3 style={{
              fontSize: '16px',
              marginBottom: '20px',
              fontWeight: 'bold'
            }}>
              Marie
            </h3>

            <nav style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px'
            }}>
              <Link href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '13px' }}>Home</Link>
              <Link href="/about" style={{ color: 'white', textDecoration: 'none', fontSize: '13px' }}>About</Link>
              <Link href="/pricing" style={{ color: 'white', textDecoration: 'none', fontSize: '13px' }}>Pricing</Link>
              <Link href="/contact" style={{ color: 'white', textDecoration: 'none', fontSize: '13px' }}>Contact</Link>
            </nav>

            <div style={{
              marginTop: '40px',
              paddingTop: '20px',
              borderTop: '1px solid #333',
              fontSize: '11px',
              color: '#999'
            }}>
              <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin className="h-4 w-4" style={{ color: '#fff' }} />
                Gilbert, AZ
              </div>
              <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Star className="h-4 w-4" style={{ color: '#fff' }} />
                80+ Five Stars
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Lightbulb className="h-4 w-4" style={{ color: '#fff' }} />
                Inspired
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            minWidth: 0,
            overflow: 'hidden'
          }}>

            {/* Horizontal Navigation Menu */}
            <div
              className="horizontal-nav"
              style={{
                background: '#ffffff',
                borderTop: '1px solid #ddd',
                borderBottom: '1px solid #ddd',
                padding: '12px 20px',
                display: 'flex',
                gap: '30px',
                justifyContent: 'center',
                flexWrap: 'nowrap',
                marginLeft: '2%',
                marginRight: '2%',
                position: 'relative'
              }}
            >
              <Link href="/about-marie" style={{ fontFamily: '"Majesti Banner", serif', fontSize: '16px', fontWeight: 300, color: '#333', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>About Marie</Link>
              <Link href="/news" style={{ fontFamily: '"Majesti Banner", serif', fontSize: '16px', fontWeight: 300, color: '#333', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>News</Link>
              <Link href="/conceptual-work" className="menu-item-hide-medium" style={{ fontFamily: '"Majesti Banner", serif', fontSize: '16px', fontWeight: 300, color: '#333', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>Conceptual Work</Link>
              <Link href="/studio-life" className="menu-item-hide-medium" style={{ fontFamily: '"Majesti Banner", serif', fontSize: '16px', fontWeight: 300, color: '#333', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>Studio Life</Link>
              <Link href="/tips-guides" className="menu-item-hide-medium" style={{ fontFamily: '"Majesti Banner", serif', fontSize: '16px', fontWeight: 300, color: '#333', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>Tips & Guides</Link>
              <Link href="/everybody-loves-a-list" className="menu-item-hide-medium" style={{ fontFamily: '"Majesti Banner", serif', fontSize: '16px', fontWeight: 300, color: '#333', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>Everybody Loves A List</Link>

              {/* More Dropdown */}
              <div ref={moreMenuRef} className="more-button" style={{ position: 'relative' }}>
                <button
                  onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                  style={{ fontFamily: '"Majesti Banner", serif', fontSize: '16px', fontWeight: 300, color: '#333', textTransform: 'uppercase', letterSpacing: '0.5px', cursor: 'pointer', background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '5px', padding: 0 }}
                >
                  More {isMoreMenuOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {isMoreMenuOpen && (
                  <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '12px', background: '#ffffff', border: '1px solid #ddd', borderRadius: '4px', padding: '10px 0', minWidth: '200px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 1000 }}>
                    <Link href="/conceptual-work" className="dropdown-item" style={{ display: 'block', fontFamily: '"Majesti Banner", serif', fontSize: '16px', fontWeight: 300, color: '#333', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '10px 20px' }} onClick={() => setIsMoreMenuOpen(false)}>Conceptual Work</Link>
                    <Link href="/studio-life" className="dropdown-item" style={{ display: 'block', fontFamily: '"Majesti Banner", serif', fontSize: '16px', fontWeight: 300, color: '#333', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '10px 20px' }} onClick={() => setIsMoreMenuOpen(false)}>Studio Life</Link>
                    <Link href="/tips-guides" className="dropdown-item" style={{ display: 'block', fontFamily: '"Majesti Banner", serif', fontSize: '16px', fontWeight: 300, color: '#333', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '10px 20px' }} onClick={() => setIsMoreMenuOpen(false)}>Tips & Guides</Link>
                    <Link href="/everybody-loves-a-list" className="dropdown-item" style={{ display: 'block', fontFamily: '"Majesti Banner", serif', fontSize: '16px', fontWeight: 300, color: '#333', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '10px 20px' }} onClick={() => setIsMoreMenuOpen(false)}>Everybody Loves A List</Link>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div style={{
              maxWidth: '800px',
              margin: '0 auto',
              padding: '40px 20px'
            }}>
              {/* Back to Lists Link */}
              <Link
                href="/everybody-loves-a-list"
                style={{
                  display: 'inline-block',
                  fontSize: '14px',
                  color: '#666',
                  textDecoration: 'none',
                  marginBottom: '30px'
                }}
              >
                ← Back to Lists
              </Link>

              {/* Title */}
              <h1 style={{
                fontSize: '42px',
                fontWeight: 'bold',
                color: '#000',
                fontFamily: '"Majesti Banner", serif',
                marginBottom: '15px',
                lineHeight: '1.2'
              }}>
                Series That Inspired My Photos
              </h1>

              {/* Subtitle */}
              <div style={{
                fontSize: '14px',
                color: '#666',
                marginBottom: '40px',
                paddingBottom: '20px',
                borderBottom: '1px solid #ddd'
              }}>
                The TV shows that inspire my photography
              </div>

              {/* Series List */}
              {series.map((item, index) => (
                <div key={index} style={{ marginBottom: '60px' }}>
                  {/* Image */}
                  <div style={{
                    width: '100%',
                    height: '400px',
                    position: 'relative',
                    marginBottom: '20px',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    background: '#f5f5f5'
                  }}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>

                  {/* Name */}
                  <h2 style={{
                    fontSize: '24px',
                    color: '#000',
                    fontFamily: '"Majesti Banner", serif',
                    margin: '0 0 15px 0',
                    lineHeight: '1.2',
                    fontWeight: 'bold'
                  }}>
                    {item.name}
                  </h2>

                  {/* Text */}
                  <p style={{
                    fontSize: '16px',
                    lineHeight: '1.8',
                    color: '#333',
                    margin: 0
                  }}>
                    {item.text}
                  </p>
                </div>
              ))}

              {/* Back to Lists Link (bottom) */}
              <div style={{
                marginTop: '60px',
                paddingTop: '30px',
                borderTop: '1px solid #ddd'
              }}>
                <Link
                  href="/everybody-loves-a-list"
                  style={{
                    display: 'inline-block',
                    fontSize: '14px',
                    color: '#666',
                    textDecoration: 'none'
                  }}
                >
                  ← Back to Lists
                </Link>
              </div>
            </div>

          </div>

        </div>
      </Layout>
    </>
  )
}
