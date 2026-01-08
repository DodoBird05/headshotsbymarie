import Layout from '@/components/Layout'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, ChevronUp, MapPin, Star, Lightbulb, Menu, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

export default function TheStudioPage() {
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

  // Studio gallery images and videos
  const galleryImages = [
    { id: 1, src: '/images/studio-img_4442.webp', alt: 'Professional photography studio setup featuring large silver parabolic umbrella modifier, white backdrop, and camera equipment', height: 500, type: 'image' },
    { id: 2, src: '/images/studio-img-4753.webp', alt: 'Professional headshot photography studio in Gilbert Arizona', height: 480, type: 'image' },
    { id: 3, src: '/images/studio-img-4759.webp', alt: 'Professional studio lighting setup for headshots in Arizona', height: 500, type: 'image' },
    { id: 4, src: '/images/studio-screenshot-1.webp', alt: 'Photographer directing client during headshot session on gray backdrop with professional studio lighting', height: 360, type: 'image' },
    { id: 5, src: '/images/studio-screenshot-2.webp', alt: 'Client and photographer reviewing and selecting headshot photos together on computer screen', height: 340, type: 'image' },
    { id: 6, src: '/images/studio-session.mov', alt: 'Behind the scenes video of a professional headshot photography session', height: 420, type: 'video' }
  ]

  return (
    <>
      <Head>
        <title>The Studio - Portraits By Marie</title>
        <meta name="description" content="Professional photography studio in Gilbert, Arizona - Behind the scenes and studio equipment" />
      </Head>

      <Layout title="The Studio" description="Behind The Scenes">
        <style>{`
          /* Large screens: show all items in main menu, hide More button and all dropdown items */
          @media (min-width: 1200px) {
            .more-button { display: none !important; }
            .dropdown-news,
            .dropdown-everybody,
            .dropdown-portraits,
            .dropdown-studio { display: none !important; }
          }

          /* Medium-large screens: hide Portraits and Studio from main menu, show in dropdown */
          @media (min-width: 900px) and (max-width: 1199px) {
            .menu-item-portraits,
            .menu-item-studio { display: none !important; }
            .dropdown-news,
            .dropdown-everybody { display: none !important; }
          }

          /* Medium screens: hide Everybody, Portraits, Studio from main menu, show in dropdown */
          @media (min-width: 700px) and (max-width: 899px) {
            .menu-item-everybody,
            .menu-item-portraits,
            .menu-item-studio { display: none !important; }
            .dropdown-news { display: none !important; }
          }

          /* Small screens: hide Everybody, Portraits, Studio from main menu, show all in dropdown */
          @media (max-width: 699px) {
            .menu-item-everybody,
            .menu-item-portraits,
            .menu-item-studio { display: none !important; }
          }

          /* Mobile: hide full sidebar, show narrow column */
          @media (max-width: 768px) {
            .desktop-sidebar { display: none !important; }
            .mobile-sidebar { display: flex !important; }
            .horizontal-nav { display: none !important; }
            .featured-grid {
              grid-template-columns: 1fr !important;
            }
            .featured-video {
              height: 250px !important;
            }
          }

          /* Desktop: show full sidebar, hide narrow column */
          @media (min-width: 769px) {
            .desktop-sidebar { display: block !important; }
            .mobile-sidebar { display: none !important; }
          }

          /* Masonry Gallery */
          .masonry-gallery {
            column-count: 3;
            column-gap: 15px;
            margin-left: 2%;
            margin-right: 2%;
          }

          @media (max-width: 900px) {
            .masonry-gallery {
              column-count: 2;
            }
          }

          @media (max-width: 600px) {
            .masonry-gallery {
              column-count: 1;
            }
          }

          .masonry-item {
            break-inside: avoid;
            margin-bottom: 15px;
            background: #ddd;
            display: block;
            border-radius: 4px;
            overflow: hidden;
            transition: transform 0.2s;
          }

          .masonry-item:hover {
            transform: translateY(-4px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          }
        `}</style>

        {/* Contemporary MySpace Layout */}
        <div style={{
          display: 'flex',
          minHeight: '100vh',
          background: '#ffffff',
          padding: '1%',
          fontFamily: 'Verdana, Arial, sans-serif'
        }}>

          {/* Mobile Narrow Black Column with Hamburger */}
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
              {/* Close button */}
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

              {/* Navigation Menu */}
              <nav style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                gap: '32px'
              }}>
                <Link
                  href="/"
                  style={{
                    color: '#1C1C1C',
                    textDecoration: 'none',
                    fontSize: '24px',
                    fontFamily: '"Hanken Grotesk", sans-serif',
                    fontWeight: 300
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  style={{
                    color: '#1C1C1C',
                    textDecoration: 'none',
                    fontSize: '24px',
                    fontFamily: '"Hanken Grotesk", sans-serif',
                    fontWeight: 300
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/pricing"
                  style={{
                    color: '#1C1C1C',
                    textDecoration: 'none',
                    fontSize: '24px',
                    fontFamily: '"Hanken Grotesk", sans-serif',
                    fontWeight: 300
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="/contact"
                  style={{
                    color: '#1C1C1C',
                    textDecoration: 'none',
                    fontSize: '24px',
                    fontFamily: '"Hanken Grotesk", sans-serif',
                    fontWeight: 300
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>
            </div>
          )}

          {/* Desktop Black Left Column (Full Sidebar) */}
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
              <Link
                href="/news"
                className="menu-item-news"
                style={{
                  fontFamily: '"Majesti Banner", serif',
                  fontSize: '16px',
                  fontWeight: 300,
                  color: '#333',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                  whiteSpace: 'nowrap'
                }}
                onMouseOver={(e) => { e.currentTarget.style.color = '#666' }}
                onMouseOut={(e) => { e.currentTarget.style.color = '#333' }}
              >
                News
              </Link>

              <Link
                href="/everybody-loves-a-list"
                className="menu-item-everybody"
                style={{
                  fontFamily: '"Majesti Banner", serif',
                  fontSize: '16px',
                  fontWeight: 300,
                  color: '#333',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                  whiteSpace: 'nowrap'
                }}
                onMouseOver={(e) => { e.currentTarget.style.color = '#666' }}
                onMouseOut={(e) => { e.currentTarget.style.color = '#333' }}
              >
                Everybody Loves A List
              </Link>

              <Link
                href="/portraits"
                className="menu-item-portraits"
                style={{
                  fontFamily: '"Majesti Banner", serif',
                  fontSize: '16px',
                  fontWeight: 300,
                  color: '#333',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                  whiteSpace: 'nowrap'
                }}
                onMouseOver={(e) => { e.currentTarget.style.color = '#666' }}
                onMouseOut={(e) => { e.currentTarget.style.color = '#333' }}
              >
                Conceptual Work
              </Link>

              <Link
                href="/the-studio"
                className="menu-item-studio"
                style={{
                  fontFamily: '"Majesti Banner", serif',
                  fontSize: '16px',
                  fontWeight: 300,
                  color: '#333',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                  whiteSpace: 'nowrap'
                }}
                onMouseOver={(e) => { e.currentTarget.style.color = '#666' }}
                onMouseOut={(e) => { e.currentTarget.style.color = '#333' }}
              >
                The Studio
              </Link>

              {/* More Dropdown */}
              <div ref={moreMenuRef} className="more-button" style={{ position: 'relative' }}>
                <button
                  onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                  style={{
                    fontFamily: '"Majesti Banner", serif',
                    fontSize: '16px',
                    fontWeight: 300,
                    color: '#333',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    cursor: 'pointer',
                    transition: 'color 0.2s',
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: 0
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.color = '#666' }}
                  onMouseOut={(e) => { e.currentTarget.style.color = '#333' }}
                >
                  More
                  {isMoreMenuOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>

                {/* Dropdown Menu */}
                {isMoreMenuOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '12px',
                    background: '#ffffff',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    padding: '10px 0',
                    minWidth: '200px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    zIndex: 1000
                  }}>
                    <Link
                      href="/news"
                      className="dropdown-news"
                      style={{
                        display: 'block',
                        fontFamily: '"Majesti Banner", serif',
                        fontSize: '16px',
                        fontWeight: 300,
                        color: '#333',
                        textDecoration: 'none',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        padding: '10px 20px',
                        transition: 'background 0.2s'
                      }}
                      onClick={() => setIsMoreMenuOpen(false)}
                      onMouseOver={(e) => { e.currentTarget.style.background = '#f5f5f5' }}
                      onMouseOut={(e) => { e.currentTarget.style.background = 'transparent' }}
                    >
                      News
                    </Link>
                    <Link
                      href="/everybody-loves-a-list"
                      className="dropdown-everybody"
                      style={{
                        display: 'block',
                        fontFamily: '"Majesti Banner", serif',
                        fontSize: '16px',
                        fontWeight: 300,
                        color: '#333',
                        textDecoration: 'none',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        padding: '10px 20px',
                        transition: 'background 0.2s'
                      }}
                      onClick={() => setIsMoreMenuOpen(false)}
                      onMouseOver={(e) => { e.currentTarget.style.background = '#f5f5f5' }}
                      onMouseOut={(e) => { e.currentTarget.style.background = 'transparent' }}
                    >
                      Everybody Loves A List
                    </Link>
                    <Link
                      href="/portraits"
                      className="dropdown-portraits"
                      style={{
                        display: 'block',
                        fontFamily: '"Majesti Banner", serif',
                        fontSize: '16px',
                        fontWeight: 300,
                        color: '#333',
                        textDecoration: 'none',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        padding: '10px 20px',
                        transition: 'background 0.2s'
                      }}
                      onClick={() => setIsMoreMenuOpen(false)}
                      onMouseOver={(e) => { e.currentTarget.style.background = '#f5f5f5' }}
                      onMouseOut={(e) => { e.currentTarget.style.background = 'transparent' }}
                    >
                      Conceptual Work
                    </Link>
                    <Link
                      href="/the-studio"
                      className="dropdown-studio"
                      style={{
                        display: 'block',
                        fontFamily: '"Majesti Banner", serif',
                        fontSize: '16px',
                        fontWeight: 300,
                        color: '#333',
                        textDecoration: 'none',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        padding: '10px 20px',
                        transition: 'background 0.2s'
                      }}
                      onClick={() => setIsMoreMenuOpen(false)}
                      onMouseOver={(e) => { e.currentTarget.style.background = '#f5f5f5' }}
                      onMouseOut={(e) => { e.currentTarget.style.background = 'transparent' }}
                    >
                      The Studio
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Page Title */}
            <div style={{
              marginLeft: '2%',
              marginRight: '2%',
              marginTop: '20px'
            }}>
              <h1 style={{
                fontSize: '36px',
                fontWeight: 'bold',
                color: '#000',
                fontFamily: '"Majesti Banner", serif',
                margin: 0
              }}>
                The Studio
              </h1>
            </div>

            {/* Featured Section */}
            <div
              className="featured-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '30px',
                marginLeft: '2%',
                marginRight: '2%',
                marginTop: '30px',
                marginBottom: '40px'
              }}
            >
              {/* Featured Video */}
              <div
                className="featured-video"
                style={{
                  width: '100%',
                  height: '400px',
                  position: 'relative',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  background: '#000'
                }}
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                >
                  <source src="/images/photoshoot-timelapse.mov" type="video/quicktime" />
                  <source src="/images/photoshoot-timelapse.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Featured Content */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <h2 style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#000',
                  fontFamily: '"Majesti Banner", serif',
                  marginBottom: '15px',
                  lineHeight: '1.2'
                }}>
                  Behind The Scenes
                </h2>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.7',
                  color: '#333',
                  marginBottom: '15px'
                }}>
                  My studio in Gilbert, Arizona is equipped with professional Broncolor lighting systems and a collection of hand-painted backdrops that I have gathered over years of dedicated work.
                </p>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.7',
                  color: '#333',
                  marginBottom: '20px'
                }}>
                  I have trained with world-class portrait photographers including Chris Buck, Peter Hurley, and Ivan Weiss. This is not a hobby—this is my craft, and I take it seriously so you get results that matter.
                </p>
                <Link
                  href="/contact"
                  style={{
                    display: 'inline-block',
                    background: '#000',
                    color: 'white',
                    padding: '12px 30px',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    transition: 'all 0.2s',
                    width: 'fit-content'
                  }}
                >
                  Get In Touch
                </Link>
              </div>
            </div>

            {/* Masonry Gallery */}
            <div className="masonry-gallery" style={{ paddingBottom: '40px' }}>
              {galleryImages.map((item) => (
                <div
                  key={item.id}
                  className="masonry-item"
                  style={{
                    height: `${item.height}px`,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {item.type === 'video' ? (
                    <video
                      loop
                      muted
                      playsInline
                      controls
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    >
                      <source src={item.src} type="video/quicktime" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  )}
                </div>
              ))}
            </div>

          </div>

        </div>
      </Layout>
    </>
  )
}
