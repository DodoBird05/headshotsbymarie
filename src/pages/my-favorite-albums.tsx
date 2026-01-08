import Layout from '@/components/Layout'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Star, Lightbulb } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

export default function MyFavoriteAlbumsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = (scrollTop / docHeight) * 100
      setScrollProgress(scrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const albumColumns = [
    [
      {
        name: 'Alabama Shakes',
        album: 'Sound & Color',
        text: 'Brittany Howard\'s voice could move mountains. This album is raw power mixed with soul, and every track hits different. It\'s the kind of album that makes you want to drive with the windows down and feel every note.',
        image: '/images/album-alabama-shakes.webp'
      }
    ],
    [
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
      }
    ],
    [
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
      }
    ],
    [
      {
        name: 'Fleetwood Mac',
        album: 'Rumours',
        text: 'Do I even need to explain this one? It\'s Rumours. The album recorded while the band was falling apart, and somehow that chaos created perfection. "Dreams," "The Chain," "Go Your Own Way" - every track is iconic.',
        image: '/images/album-fleetwood-mac.webp'
      }
    ]
  ]

  return (
    <>
      <Head>
        <title>My Favorite Albums - Portraits By Marie</title>
        <meta name="description" content="The albums that inspire Marie's work" />
        <style>{`
          /* Large screens: show all items in main menu, hide More button and all dropdown items */
          @media (min-width: 1200px) {
            .more-button { display: none !important; }
            .dropdown-everybody,
            .dropdown-portraits,
            .dropdown-studio { display: none !important; }
          }

          /* Medium-large screens: hide Portraits and Studio from main menu, show in dropdown */
          @media (min-width: 900px) and (max-width: 1199px) {
            .menu-item-portraits,
            .menu-item-studio { display: none !important; }
            .dropdown-everybody { display: none !important; }
          }

          /* Medium screens: hide Everybody, Portraits, Studio from main menu, show in dropdown */
          @media (min-width: 700px) and (max-width: 899px) {
            .menu-item-everybody,
            .menu-item-portraits,
            .menu-item-studio { display: none !important; }
          }

          /* Small screens: hide Everybody, Portraits, Studio from main menu, show all in dropdown */
          @media (max-width: 699px) {
            .menu-item-everybody,
            .menu-item-portraits,
            .menu-item-studio { display: none !important; }
          }

          /* Mobile: show sidebar title, hide white column */
          @media (max-width: 768px) {
            .sidebar-title { display: block !important; }
            .horizontal-scroll { display: none !important; }
            .mobile-stack { display: block !important; }
            .white-column { display: none !important; }
          }

          /* Desktop: hide sidebar title, show white column */
          @media (min-width: 769px) {
            .sidebar-title { display: none !important; }
            .horizontal-scroll { display: block !important; }
            .mobile-stack { display: none !important; }
            .white-column { display: block !important; }
          }

          html {
            scroll-behavior: smooth;
          }

          body {
            overflow-x: hidden;
          }
        `}</style>
      </Head>

      <Layout title="My Favorite Albums" description="The albums that inspire my work">
        <div style={{
          display: 'flex',
          minHeight: '100vh'
        }}>

          {/* Black Left Sidebar */}
          <div style={{
            width: '200px',
            background: '#000000',
            padding: '20px',
            color: 'white',
            flexShrink: 0,
            position: 'sticky',
            top: '0',
            height: '100vh',
            overflowY: 'auto'
          }}>
            <div style={{
              marginBottom: '20px',
              display: 'flex',
              justifyContent: 'flex-start'
            }}>
              <Link href="/">
                <Image
                  src="/Logo/Headshots-by-Marie-Rectangle-White.svg"
                  alt="Headshots by Marie"
                  width={120}
                  height={48}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                />
              </Link>
            </div>

            <nav style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px'
            }}>
              <a href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '13px' }}>Home</a>
              <a href="/about" style={{ color: 'white', textDecoration: 'none', fontSize: '13px' }}>About</a>
              <a href="/pricing" style={{ color: 'white', textDecoration: 'none', fontSize: '13px' }}>Pricing</a>
              <a href="/contact" style={{ color: 'white', textDecoration: 'none', fontSize: '13px' }}>Contact</a>
            </nav>

            {/* Mobile Title - Only visible on mobile */}
            <h1 className="sidebar-title" style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#fff',
              fontFamily: '"Majesti Banner", serif',
              marginTop: '30px',
              marginBottom: '30px',
              paddingTop: '20px',
              borderTop: '1px solid #333',
              lineHeight: '1.2'
            }}>
              My Favorite Albums
            </h1>

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

            <div style={{
              marginTop: '30px',
              paddingTop: '20px',
              borderTop: '1px solid #333'
            }}>
              <a
                href="/everybody-loves-a-list"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '13px',
                  display: 'block'
                }}
              >
                ← Back to Lists
              </a>
            </div>
          </div>

          {/* White Column - Desktop only */}
          <div className="white-column" style={{
            width: '250px',
            background: '#ffffff',
            flexShrink: 0,
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-end'
          }}>
            <h1 style={{
              fontSize: '48px',
              fontWeight: 'bold',
              fontFamily: '"Majesti Banner", serif',
              color: '#000',
              margin: 0,
              lineHeight: '1',
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              position: 'absolute',
              right: '10px',
              top: '50px'
            }}>
              My Favorite Albums
            </h1>
          </div>

          {/* Main Content Area */}
          <div style={{
            flex: 1,
            minWidth: 0
          }}>

        {/* Horizontal Scroll Container - Desktop only */}
        <div
          className="horizontal-scroll"
          ref={containerRef}
          style={{
            position: 'relative',
            width: '100%',
            height: `${albumColumns.length * 100}vh`,
            overflow: 'visible',
            background: '#f5f5f5'
          }}
        >
          <div style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'flex',
              height: '100%',
              transform: `translateX(-${scrollProgress * (albumColumns.length - 1)}%)`,
              transition: 'transform 0.1s ease-out',
              gap: '20px',
              paddingTop: '0px',
              paddingLeft: '40px'
            }}>
              {albumColumns.map((column, columnIndex) => (
                <div
                  key={columnIndex}
                  style={{
                    minWidth: '300px',
                    maxWidth: '300px',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0px',
                    padding: '0px',
                    paddingTop: '20px',
                    overflowY: 'auto'
                  }}
                >
                  {column.map((album, albumIndex) => (
                    <div key={albumIndex} style={{ marginBottom: '0px' }}>
                      {/* Album Cover */}
                      <div style={{
                        width: '100%',
                        height: '300px',
                        position: 'relative',
                        marginBottom: '20px',
                        border: '5px solid white',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <Image
                          src={album.image}
                          alt={`${album.album} by ${album.name}`}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>

                      {/* Artist Name */}
                      <h2 style={{
                        fontSize: '18px',
                        color: '#000',
                        fontFamily: '"Majesti Banner", serif',
                        margin: '0 0 5px 0',
                        lineHeight: '1.1',
                        fontWeight: 'bold',
                        textTransform: 'uppercase'
                      }}>
                        {album.name}
                      </h2>

                      {/* Album Title */}
                      <h3 style={{
                        fontSize: '14px',
                        color: '#666',
                        fontFamily: '"Majesti Banner", serif',
                        margin: '0 0 15px 0',
                        lineHeight: '1.1',
                        fontWeight: 'normal',
                        fontStyle: 'italic'
                      }}>
                        {album.album}
                      </h3>

                      {/* Album Text */}
                      <p style={{
                        fontSize: '12px',
                        lineHeight: '1.6',
                        color: '#333',
                        margin: '0 0 20px 0'
                      }}>
                        {album.text}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Stack - Mobile only */}
        <div className="mobile-stack" style={{
          background: '#f5f5f5',
          padding: '20px'
        }}>
          {albumColumns.flat().map((album, index) => (
            <div key={index} style={{ marginBottom: '40px' }}>
              {/* Album Cover */}
              <div style={{
                width: '100%',
                height: '300px',
                position: 'relative',
                marginBottom: '20px',
                border: '5px solid white',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <Image
                  src={album.image}
                  alt={`${album.album} by ${album.name}`}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>

              {/* Artist Name */}
              <h2 style={{
                fontSize: '18px',
                color: '#000',
                fontFamily: '"Majesti Banner", serif',
                margin: '0 0 5px 0',
                lineHeight: '1.1',
                fontWeight: 'bold',
                textTransform: 'uppercase'
              }}>
                {album.name}
              </h2>

              {/* Album Title */}
              <h3 style={{
                fontSize: '14px',
                color: '#666',
                fontFamily: '"Majesti Banner", serif',
                margin: '0 0 15px 0',
                lineHeight: '1.1',
                fontWeight: 'normal',
                fontStyle: 'italic'
              }}>
                {album.album}
              </h3>

              {/* Album Text */}
              <p style={{
                fontSize: '12px',
                lineHeight: '1.6',
                color: '#333',
                margin: '0 0 20px 0'
              }}>
                {album.text}
              </p>
            </div>
          ))}
        </div>
        </div>
        </div>
      </Layout>
    </>
  )
}
