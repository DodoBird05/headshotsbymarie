import Layout from '@/components/Layout'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Star, Lightbulb } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

export default function SeriesThatInspiredMyPhotosPage() {
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

  const seriesColumns = [
    [
      {
        name: 'The Morning Show',
        text: 'Each location has a specific color scheme, and it\'s spectacular. Cold tones on the TV set, warm tones in the hotel rooms. The color work is so intentional that sometimes I pause just to study how they\'re using it to tell the story. The cinematography does as much emotional heavy lifting as the dialogue.',
        image: '/images/tv-morning-show.webp'
      }
    ],
    [
      {
        name: 'Foundation',
        text: 'Visually stunning doesn\'t even cover it. The scale, the compositions, the way they use light and color to create entire worlds - it\'s breathtaking. Every frame feels like it could be a painting.',
        image: '/images/tv-foundation.webp'
      },
      {
        name: 'Westworld',
        text: 'The desert landscapes, the contrast between the park and the real world, the way they play with time and perspective visually. It\'s a masterclass in using environment to build atmosphere.',
        image: '/images/tv-westworld.webp'
      }
    ],
    [
      {
        name: 'The Crown',
        text: 'The attention to detail in recreating period-specific photography is incredible. They didn\'t just match the costumes and sets - they matched the look of how things were photographed in each era. The way they shoot the 1950s versus the 1980s changes completely, and it\'s so well done.',
        image: '/images/tv-the-crown.webp'
      },
      {
        name: 'Mad Men',
        text: 'That mid-century aesthetic, perfectly lit and composed. Every shot looks like it could be a vintage advertisement, which is exactly the point. The visual storytelling is as tight as the writing.',
        image: '/images/tv-mad-men.webp'
      }
    ],
    [
      {
        name: 'The Outsider',
        text: 'Cold and green. The color palette creates this unsettling, isolating atmosphere that never lets you relax. It\'s bleak and beautiful and exactly right for the story they\'re telling.',
        image: '/images/tv-the-outsider.webp'
      }
    ]
  ]

  return (
    <>
      <Head>
        <title>Series That Inspired My Photos - Portraits By Marie</title>
        <meta name="description" content="The TV shows that inspire Marie's photography" />
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

      <Layout title="Series That Inspired My Photos" description="TV shows with beautiful photography">
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
              Series That Inspired My Photos
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
              Series That Inspired My Photos
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
            height: `${seriesColumns.length * 100}vh`,
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
              transform: `translateX(-${scrollProgress * (seriesColumns.length - 1)}%)`,
              transition: 'transform 0.1s ease-out',
              gap: '20px',
              paddingTop: '0px',
              paddingLeft: '40px'
            }}>
              {seriesColumns.map((column, columnIndex) => (
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
                  {column.map((series, seriesIndex) => (
                    <div key={seriesIndex} style={{ marginBottom: '0px' }}>
                      {/* Series Image */}
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
                          src={series.image}
                          alt={series.name}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>

                      {/* Series Name */}
                      <h2 style={{
                        fontSize: '18px',
                        color: '#000',
                        fontFamily: '"Majesti Banner", serif',
                        margin: '0 0 15px 0',
                        lineHeight: '1.1',
                        fontWeight: 'bold',
                        textTransform: 'uppercase'
                      }}>
                        {series.name}
                      </h2>

                      {/* Series Text */}
                      <p style={{
                        fontSize: '12px',
                        lineHeight: '1.6',
                        color: '#333',
                        margin: '0 0 20px 0'
                      }}>
                        {series.text}
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
          {seriesColumns.flat().map((series, index) => (
            <div key={index} style={{ marginBottom: '40px' }}>
              {/* Series Image */}
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
                  src={series.image}
                  alt={series.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>

              {/* Series Name */}
              <h2 style={{
                fontSize: '18px',
                color: '#000',
                fontFamily: '"Majesti Banner", serif',
                margin: '0 0 15px 0',
                lineHeight: '1.1',
                fontWeight: 'bold',
                textTransform: 'uppercase'
              }}>
                {series.name}
              </h2>

              {/* Series Text */}
              <p style={{
                fontSize: '12px',
                lineHeight: '1.6',
                color: '#333',
                margin: '0 0 20px 0'
              }}>
                {series.text}
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
