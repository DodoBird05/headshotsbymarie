import Layout from '@/components/Layout'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Star, Lightbulb } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

export default function MyFavoritePhotographersPage() {
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

  const photographerColumns = [
    [
      {
        name: 'Irving Penn',
        text: 'The black and white work, the expressions - this guy didn\'t take himself too seriously even though each frame cost a fortune back then. Letting models bring their personality? Bold choice. Super modern. And that "portraits in a corner" series? Genius. It forces your eye to the subject like nothing else in the world matters except them and how they react to that moment. Some people (Marcel Duchamp, Salvador Dalí) are clearly enjoying the attention. Others (Georgia O\'Keeffe) look like they\'d rather be anywhere else. The honesty of that is what gets me.',
        image: '/images/Duchamps-by-Penn.webp'
      }
    ],
    [
      {
        name: 'Dan Winters',
        text: 'Of course. The table portraits are iconic, and he\'s one of my main inspirations. What else is there to say?',
        image: '/images/photographer-winters.webp'
      },
      {
        name: 'Robert Doisneau',
        text: 'L\'information scolaire - that photo of the young boy lost in thought. That\'s everything I want to capture - the moment someone forgets the camera exists.',
        image: '/images/photographer-doisneau.webp'
      }
    ],
    [
      {
        name: 'Platon',
        text: 'In. Your. Face. Every portrait hits you immediately. There\'s no hiding, no softness. Just impact.',
        image: '/images/photographer-platon.webp'
      },
      {
        name: 'Richard Avedon',
        text: 'The American West series. Raw, unflinching, human. These aren\'t pretty portraits - they\'re honest ones.',
        image: '/images/Dovima-by-Avedon.webp'
      }
    ],
    [
      {
        name: 'Vivian Maier',
        text: 'The secret street photographer whose work wasn\'t discovered until after she died. And here\'s the wild part: she photographed my grandmother and her dog Mirou in Saint-Bonnet-En-Champsaur, the tiny village in the French Alps where my family is from. What are the chances? I love her eye for capturing ordinary moments that turn out to be extraordinary.',
        image: '/images/photographer-maier.webp',
        link: '/news/vivian-maier-photographed-my-family',
        linkText: 'Read the full story'
      }
    ]
  ]

  return (
    <>
      <Head>
        <title>My Favorite Photographers - Portraits By Marie</title>
        <meta name="description" content="The photographers who inspire Marie's work" />
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

      <Layout title="My Favorite Photographers" description="The photographers who inspire my work">
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
              My Favorite Photographers
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
              My Favorite Photographers
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
            height: `${photographerColumns.length * 100}vh`,
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
              transform: `translateX(-${scrollProgress * (photographerColumns.length - 1)}%)`,
              transition: 'transform 0.1s ease-out',
              gap: '20px',
              paddingTop: '0px',
              paddingLeft: '40px'
            }}>
              {photographerColumns.map((column, columnIndex) => (
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
                  {column.map((photographer, photographerIndex) => (
                    <div key={photographerIndex} style={{ marginBottom: '0px' }}>
                      {/* Photographer Image */}
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
                          src={photographer.image}
                          alt={`Photo by ${photographer.name}`}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>

                      {/* Photographer Name */}
                      <h2 style={{
                        fontSize: '18px',
                        color: '#000',
                        fontFamily: '"Majesti Banner", serif',
                        margin: '0 0 15px 0',
                        lineHeight: '1.1'
                      }}>
                        {photographer.name === 'Platon' ? (
                          <span style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Platon</span>
                        ) : (
                          <>
                            <span style={{ fontWeight: 'normal', textTransform: 'capitalize' }}>
                              {photographer.name.split(' ')[0].toLowerCase()}
                            </span>
                            {' '}
                            <span style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                              {photographer.name.split(' ')[1]}
                            </span>
                          </>
                        )}
                      </h2>

                      {/* Photographer Text */}
                      <p style={{
                        fontSize: '12px',
                        lineHeight: '1.6',
                        color: '#333',
                        margin: '0 0 20px 0'
                      }}>
                        {photographer.text}
                        {photographer.link && (
                          <>
                            {' '}
                            <a
                              href={photographer.link}
                              style={{
                                color: '#000',
                                textDecoration: 'underline',
                                fontWeight: 'bold'
                              }}
                            >
                              {photographer.linkText}
                            </a>
                          </>
                        )}
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
          {photographerColumns.flat().map((photographer, index) => (
            <div key={index} style={{ marginBottom: '40px' }}>
              {/* Photographer Image */}
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
                  src={photographer.image}
                  alt={`Photo by ${photographer.name}`}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>

              {/* Photographer Name */}
              <h2 style={{
                fontSize: '18px',
                color: '#000',
                fontFamily: '"Majesti Banner", serif',
                margin: '0 0 15px 0',
                lineHeight: '1.1'
              }}>
                {photographer.name === 'Platon' ? (
                  <span style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Platon</span>
                ) : (
                  <>
                    <span style={{ fontWeight: 'normal', textTransform: 'capitalize' }}>
                      {photographer.name.split(' ')[0].toLowerCase()}
                    </span>
                    {' '}
                    <span style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                      {photographer.name.split(' ')[1]}
                    </span>
                  </>
                )}
              </h2>

              {/* Photographer Text */}
              <p style={{
                fontSize: '12px',
                lineHeight: '1.6',
                color: '#333',
                margin: '0 0 20px 0'
              }}>
                {photographer.text}
                {photographer.link && (
                  <>
                    {' '}
                    <a
                      href={photographer.link}
                      style={{
                        color: '#000',
                        textDecoration: 'underline',
                        fontWeight: 'bold'
                      }}
                    >
                      {photographer.linkText}
                    </a>
                  </>
                )}
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
