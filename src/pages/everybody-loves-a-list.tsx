import Layout from '@/components/Layout'
import Head from 'next/head'
import Image from 'next/image'
import { ChevronDown, ChevronUp, MapPin, Star, Lightbulb } from 'lucide-react'
import { useState } from 'react'

export default function EverybodyLovesAListPage() {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)

  const listItems = [
    {
      id: 1,
      title: 'My Favorite Photographers',
      description: 'Irving Penn, Dan Winters, Robert Doisneau, Platon, Richard Avedon - the photographers who inspire my work and why they matter.',
      image: '/images/list-placeholder-1.jpg',
      link: '/my-favorite-photographers',
      status: 'live'
    },
    {
      id: 2,
      title: 'My Favorite Music',
      description: 'The songs and artists that set the tone in my studio and inspire my creative process.',
      image: '/images/list-placeholder-2.jpg',
      link: '#',
      status: 'coming-soon'
    },
    {
      id: 3,
      title: 'My Favorite Inspiration',
      description: 'Books, art, moments, and ideas that fuel my photography and creative vision.',
      image: '/images/list-placeholder-3.jpg',
      link: '#',
      status: 'coming-soon'
    },
    {
      id: 4,
      title: 'Series That Inspired My Photos',
      description: 'The photo series and projects that changed how I see portraits and influenced my own work.',
      image: '/images/list-placeholder-4.jpg',
      link: '#',
      status: 'coming-soon'
    }
  ]

  return (
    <>
      <Head>
        <title>Everybody Loves A List - Portraits By Marie</title>
        <meta name="description" content="Curated lists of photography tips, advice, and insights from Marie" />
      </Head>

      <Layout title="Everybody Loves A List" description="Curated Lists & Tips">
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
        `}</style>

        {/* Contemporary MySpace Layout */}
        <div style={{
          display: 'flex',
          minHeight: '100vh',
          background: '#ffffff',
          padding: '1%',
          fontFamily: 'Verdana, Arial, sans-serif'
        }}>

          {/* Black Left Column (Narrow Sidebar) */}
          <div style={{
            width: '200px',
            background: '#000000',
            padding: '20px',
            color: 'white',
            flexShrink: 0
          }}>
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
              <a href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '13px' }}>Home</a>
              <a href="/about" style={{ color: 'white', textDecoration: 'none', fontSize: '13px' }}>Profile</a>
              <a href="/pricing" style={{ color: 'white', textDecoration: 'none', fontSize: '13px' }}>Pricing</a>
              <a href="/contact" style={{ color: 'white', textDecoration: 'none', fontSize: '13px' }}>Contact</a>
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
            <div style={{
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
            }}>
              <a
                href="/news"
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
              </a>

              <a
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
              </a>

              <a
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
                Portraits
              </a>

              <a
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
              </a>

              {/* More Dropdown */}
              <div className="more-button" style={{ position: 'relative' }}>
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
                    <a
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
                      onMouseOver={(e) => { e.currentTarget.style.background = '#f5f5f5' }}
                      onMouseOut={(e) => { e.currentTarget.style.background = 'transparent' }}
                    >
                      Everybody Loves A List
                    </a>
                    <a
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
                      onMouseOver={(e) => { e.currentTarget.style.background = '#f5f5f5' }}
                      onMouseOut={(e) => { e.currentTarget.style.background = 'transparent' }}
                    >
                      Portraits
                    </a>
                    <a
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
                      onMouseOver={(e) => { e.currentTarget.style.background = '#f5f5f5' }}
                      onMouseOut={(e) => { e.currentTarget.style.background = 'transparent' }}
                    >
                      The Studio
                    </a>
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
                Everybody Loves A List
              </h1>
            </div>

            {/* Featured List Item */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '30px',
              marginLeft: '2%',
              marginRight: '2%',
              marginTop: '30px',
              marginBottom: '40px'
            }}>
              {/* Featured Image */}
              <div style={{
                width: '100%',
                height: '400px',
                background: '#ddd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999',
                fontSize: '18px',
                borderRadius: '4px'
              }}>
                Featured Image
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
                  {listItems[0].title}
                </h2>
                <div style={{
                  fontSize: '14px',
                  color: '#666',
                  marginBottom: '20px',
                  fontStyle: 'italic'
                }}>
                  By Marie Feutrier
                </div>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.7',
                  color: '#333',
                  marginBottom: '20px'
                }}>
                  {listItems[0].description}
                </p>
                <a
                  href={listItems[0].link}
                  style={{
                    fontSize: '14px',
                    color: '#000',
                    textDecoration: 'underline',
                    fontWeight: 'bold'
                  }}
                >
                  Read Full List →
                </a>
              </div>
            </div>

            {/* List Items Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px',
              marginLeft: '2%',
              marginRight: '2%',
              padding: '20px 0'
            }}>
              {listItems.slice(1).map((item) => (
                <article
                  key={item.id}
                  style={{
                    background: '#f5f5f5',
                    borderRadius: '4px',
                    padding: '25px',
                    transition: 'transform 0.2s',
                    cursor: item.status === 'coming-soon' ? 'default' : 'pointer',
                    position: 'relative',
                    opacity: item.status === 'coming-soon' ? 0.7 : 1
                  }}
                  onMouseOver={(e) => {
                    if (item.status !== 'coming-soon') {
                      e.currentTarget.style.transform = 'translateY(-4px)'
                    }
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  {item.status === 'coming-soon' && (
                    <div style={{
                      position: 'absolute',
                      top: '15px',
                      right: '15px',
                      background: '#000',
                      color: '#fff',
                      fontSize: '10px',
                      padding: '4px 10px',
                      borderRadius: '3px',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Coming Soon
                    </div>
                  )}
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    marginBottom: '15px',
                    color: '#000',
                    fontFamily: '"Majesti Banner", serif'
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    lineHeight: '1.6',
                    color: '#666',
                    marginBottom: '15px'
                  }}>
                    {item.description}
                  </p>
                  {item.status === 'live' ? (
                    <a
                      href={item.link}
                      style={{
                        fontSize: '13px',
                        color: '#000',
                        textDecoration: 'underline',
                        fontWeight: 'bold'
                      }}
                    >
                      Read More →
                    </a>
                  ) : (
                    <div style={{
                      fontSize: '13px',
                      color: '#999',
                      fontStyle: 'italic'
                    }}>
                      Check back soon...
                    </div>
                  )}
                </article>
              ))}
            </div>

            {/* CTA Section */}
            <div style={{
              background: '#000000',
              padding: '30px',
              borderRadius: '4px',
              textAlign: 'center',
              color: 'white',
              marginLeft: '2%',
              marginRight: '2%',
              marginTop: '20px'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '10px'
              }}>
                Ready for Professional Portraits?
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#ccc',
                marginBottom: '15px'
              }}>
                Let's create headshots you will actually want to use.
              </p>
              <a
                href="/pricing"
                style={{
                  display: 'inline-block',
                  background: 'white',
                  color: '#000',
                  padding: '12px 30px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  transition: 'all 0.2s'
                }}
              >
                View Pricing
              </a>
            </div>

          </div>

        </div>
      </Layout>
    </>
  )
}
