import Layout from '@/components/Layout'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, ChevronUp, MapPin, Star, Lightbulb, Menu, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

export default function MyFavoriteAlbumsPage() {
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

  const albums = [
    {
      name: 'Alabama Shakes',
      album: 'Sound & Color',
      text: 'Brittany Howard\'s voice could move mountains. This album is raw power mixed with soul, and every track hits different. It\'s the kind of album that makes you want to drive with the windows down and feel every note.',
      image: '/images/album-alabama-shakes.webp'
    },
    {
      name: 'Glass Animals',
      album: 'How To Be A Human Being',
      text: 'Weird, groovy, and deeply human all at once. Every song tells a different character\'s story, and the production is so layered you hear something new every time. "Life Itself" and "Agnes" live rent-free in my head.',
      image: '/images/album-glass-animals.webp'
    },
    {
      name: 'Shaka Ponk',
      album: 'Shaka Ponk (Deluxe)',
      text: 'French electro-rock that just hits. High energy, rebellious, and unapologetically fun. If you don\'t know Shaka Ponk and you like music that makes you move, fix that immediately.',
      image: '/images/album-shaka-ponk.webp'
    },
    {
      name: 'Louise Attaque',
      album: 'À plus tard crocodile',
      text: 'French rock with violins. Poetic, melancholic, beautiful. This album is pure nostalgia for me - it sounds like home.',
      image: '/images/album-louise-attaque.webp'
    },
    {
      name: 'Lana Del Rey',
      album: 'Born To Die',
      text: 'Cinematic, melancholic, glamorous. Lana created her own aesthetic with this album - that vintage Americana sadness mixed with modern production. It\'s moody and beautiful and completely her own thing.',
      image: '/images/album-lana-del-rey.webp'
    },
    {
      name: 'Fleetwood Mac',
      album: 'Rumours',
      text: 'Do I even need to explain this one? It\'s Rumours. The album recorded while the band was falling apart, and somehow that chaos created perfection. "Dreams," "The Chain," "Go Your Own Way" - every track is iconic.',
      image: '/images/album-fleetwood-mac.webp'
    }
  ]

  return (
    <>
      <Head>
        <title>My Favorite Albums - Portraits By Marie</title>
        <meta name="description" content="The music that inspires Marie's photography work" />
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

      <Layout title="My Favorite Albums" description="The music that inspires my photography work">
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
                My Favorite Albums
              </h1>

              {/* Subtitle */}
              <div style={{
                fontSize: '14px',
                color: '#666',
                marginBottom: '40px',
                paddingBottom: '20px',
                borderBottom: '1px solid #ddd'
              }}>
                The music that inspires my photography work
              </div>

              {/* Albums List */}
              {albums.map((item, index) => (
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
                      alt={`${item.album} by ${item.name}`}
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>

                  {/* Artist & Album Name */}
                  <h2 style={{
                    fontSize: '24px',
                    color: '#000',
                    fontFamily: '"Majesti Banner", serif',
                    margin: '0 0 5px 0',
                    lineHeight: '1.2'
                  }}>
                    {item.name}
                  </h2>
                  <h3 style={{
                    fontSize: '18px',
                    color: '#666',
                    fontFamily: '"Majesti Banner", serif',
                    fontWeight: 'normal',
                    fontStyle: 'italic',
                    margin: '0 0 15px 0',
                    lineHeight: '1.2'
                  }}>
                    {item.album}
                  </h3>

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
