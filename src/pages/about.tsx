import Layout from '@/components/Layout'
import Head from 'next/head'
import Image from 'next/image'
import { ChevronDown, ChevronUp, MapPin, Star, Lightbulb, Menu } from 'lucide-react'
import { useState } from 'react'
import GalleryGrid6 from '@/components/GalleryGrid6'

export default function AboutPage() {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)
  const [photoPosition, setPhotoPosition] = useState(50)

  return (
    <>
      <Head>
        <title>Marie's Profile - Portraits By Marie</title>
        <meta name="description" content="About Marie - Phoenix Portrait Photographer" />
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

          /* Add gap between photos on mobile devices */
          @media (max-width: 768px) {
            .photo-column {
              gap: 8px !important;
            }

            .about-grid {
              grid-template-columns: 1fr !important;
            }

            .sidebar {
              width: 60px !important;
              padding: 15px 10px !important;
            }

            .sidebar-text {
              display: none !important;
            }

            .sidebar-icon-only {
              display: flex !important;
              justify-content: center;
              margin-bottom: 20px;
            }

            .sidebar h3 {
              display: none !important;
            }

            .sidebar nav {
              align-items: center !important;
            }

            .sidebar nav a {
              text-align: center !important;
            }

            .sidebar-info {
              display: none !important;
            }
          }
        `}</style>
      </Head>

      <Layout title="About Marie" description="Phoenix Portrait Photographer">
        {/* Contemporary MySpace Layout */}
        <div style={{
          display: 'flex',
          minHeight: '100vh',
          background: '#ffffff',
          padding: '1%',
          fontFamily: 'Verdana, Arial, sans-serif'
        }}>

          {/* Black Left Column (Narrow Sidebar) */}
          <div className="sidebar" style={{
            width: '200px',
            background: '#000000',
            padding: '20px',
            color: 'white',
            flexShrink: 0
          }}>
            <div className="sidebar-icon-only" style={{ display: 'none' }}>
              <Menu className="h-6 w-6" />
            </div>

            <h3 style={{
              fontSize: '16px',
              marginBottom: '20px',
              fontWeight: 'bold',
              color: '#ccc'
            }}>
              About Marie
            </h3>

            <nav style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px'
            }}>
              <a href="/" className="sidebar-text" style={{ color: 'white', textDecoration: 'none', fontSize: '13px' }}>Home</a>
              <a href="/about" className="sidebar-text" style={{ color: 'white', textDecoration: 'none', fontSize: '13px' }}>Profile</a>
              <a href="/pricing" className="sidebar-text" style={{ color: 'white', textDecoration: 'none', fontSize: '13px' }}>Pricing</a>
              <a href="/contact" className="sidebar-text" style={{ color: 'white', textDecoration: 'none', fontSize: '13px' }}>Contact</a>
            </nav>

            <div className="sidebar-info" style={{
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

            {/* Top Row - 3 Responsive Images Component */}
            <div className="about-grid" style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: '8px',
              marginBottom: '8px',
              width: '100%',
              height: 'clamp(300px, 40vw, 600px)'
            }}>
                {/* Large Image - Left */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                  borderRadius: '4px'
                }}>
                  <Image
                    src="/images/About Marie/About Marie.webp"
                    alt="About Marie - Phoenix Portrait Photographer"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  {/* Text Overlay */}
                  <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    color: 'white'
                  }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: 'normal',
                      marginBottom: '5px',
                      letterSpacing: '1px'
                    }}>
                      Photographer
                    </div>
                    <div style={{
                      fontSize: '32px',
                      fontWeight: 'bold',
                      letterSpacing: '1px'
                    }}>
                      Marie Feutrier
                    </div>
                  </div>
                </div>

                {/* Two Small Images - Right Column */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  height: '100%'
                }}>
                  {/* Top Small Image - Profile Card */}
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    flex: '1',
                    overflow: 'hidden',
                    borderRadius: '4px',
                    background: '#f5f5f5',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                  }}>
                    <div style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '4px',
                      marginBottom: '15px',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <Image
                        src="/images/Marie-Feutrier-Photographer-Portrait-By-Cindy.webp"
                        alt="Marie - Phoenix Portrait Photographer"
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      marginBottom: '8px',
                      color: '#000',
                      textAlign: 'center'
                    }}>
                      Marie Feutrier
                    </h3>
                    <p style={{
                      fontSize: '12px',
                      color: '#666',
                      textAlign: 'center',
                      fontStyle: 'italic'
                    }}>
                      "Where artistry meets authenticity"
                    </p>
                  </div>

                  {/* Bottom Small Image - Connect Section */}
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    flex: '1',
                    overflow: 'hidden',
                    borderRadius: '4px',
                    background: '#f5f5f5',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                  }}>
                    <h4 style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      marginBottom: '15px',
                      color: '#000'
                    }}>
                      Connect with me
                    </h4>
                    <a
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
                        cursor: 'pointer'
                      }}
                    >
                      Send Message
                    </a>
                  </div>
                </div>

            </div>

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

            {/* Gallery Grid 6 Component */}
            <GalleryGrid6 />

            {/* Additional Content Sections */}
            <div style={{
              background: '#f5f5f5',
              padding: '30px',
              borderRadius: '4px',
              marginLeft: '2%',
              marginRight: '2%'
            }}>
              <h2 style={{
                fontSize: '20px',
                marginBottom: '15px',
                fontWeight: 'bold',
                color: '#000'
              }}>
                Details
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                fontSize: '13px',
                color: '#333'
              }}>
                <div>
                  <strong>Location:</strong> Gilbert, Arizona
                </div>
                <div>
                  <strong>Training:</strong> Chris Buck, Peter Hurley, Ivan Weiss
                </div>
                <div>
                  <strong>Equipment:</strong> Professional Broncolor Lighting
                </div>
                <div>
                  <strong>Reviews:</strong> 80+ Five-Star Google Reviews
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div style={{
              background: '#000000',
              padding: '30px',
              borderRadius: '4px',
              textAlign: 'center',
              color: 'white',
              marginLeft: '2%',
              marginRight: '2%'
            }}>
              <h2 style={{
                fontSize: '20px',
                marginBottom: '15px',
                fontWeight: 'bold'
              }}>
                Let's Create Something Amazing
              </h2>
              <p style={{
                fontSize: '14px',
                marginBottom: '20px',
                color: '#ccc'
              }}>
                Ready for professional portraits that actually look like you?
              </p>
              <a
                href="/book"
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
                Book Your Session
              </a>
            </div>

          </div>

        </div>
      </Layout>
    </>
  )
}
