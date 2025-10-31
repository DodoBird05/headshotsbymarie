import Layout from '@/components/Layout'
import Head from 'next/head'
import Image from 'next/image'
import { ChevronDown, ChevronUp, MapPin, Star, Lightbulb } from 'lucide-react'
import { useState } from 'react'

export default function PortraitsPage() {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)

  // Gallery images from Good Photos folder
  const galleryImages = [
    { id: 1, src: '/images/Good Photos/Professional-Headshot-of-Tommy-By-Marie-Feutrier.webp', alt: 'Professional man Tommy in business casual with relaxed demeanor' },
    { id: 2, src: '/images/Good Photos/Acting-Headshot-of-DeShawn-By-Marie-Feutrier.webp', alt: 'Actor DeShawn in professional button-down with authentic theatrical expression' },
    { id: 3, src: '/images/Good Photos/Professional-Headshot-of-Carissa-By-Marie-Feutrier.webp', alt: 'Professional woman Carissa with genuine smile against neutral backdrop' },
    { id: 4, src: '/images/Good Photos/Executive-Portrait-of-Mark-By-Marie-Feutrier.webp', alt: 'Business executive Mark in suit with professional confidence and warm demeanor' },
    { id: 5, src: '/images/Good Photos/Personal-Branding-Photography-of-Jaime-By-Marie-Feutrier.webp', alt: 'Professional Jaime in business attire with confident personal brand image' },
    { id: 6, src: '/images/Good Photos/Personal-Branding-Photography-of-Janine-By-Marie-Feutrier.webp', alt: 'Professional woman Janine with authentic smile for personal branding' },
    { id: 7, src: '/images/Good Photos/Professional-Headshot-of-Wade-By-Marie-Feutrier.webp', alt: 'Professional man Wade with confident smile in business attire' },
    { id: 8, src: '/images/Good Photos/Actor-Portrait-of-Johnny-By-Marie-Feutrier.webp', alt: 'Actor Johnny with casual smile in approachable commercial headshot' },
    { id: 9, src: '/images/Good Photos/Professional-Headshot-of-Kasia-By-Marie-Feutrier.webp', alt: 'Professional woman Kasia with genuine expression in business portrait' },
    { id: 10, src: '/images/Good Photos/Theatrical-Headshot-of-Kristen-By-Marie-Feutrier.webp', alt: 'Actress Kristen with elegant styling in sophisticated theatrical headshot' },
    { id: 11, src: '/images/Good Photos/Executive-Portrait-of-Kyle-Wright-By-Marie-Feutrier.webp', alt: 'Executive Kyle Wright in professional attire with confident leadership presence' },
    { id: 12, src: '/images/Good Photos/Professional-Headshot-of-Laura-Hanish-By-Marie-Feutrier.webp', alt: 'Professional woman Laura Hanish in business attire with warm demeanor' },
    { id: 13, src: '/images/Good Photos/Commercial-Headshot-Young-Actress-By-Marie-Feutrier.webp', alt: 'Young actress with bright smile and colorful top for commercial casting' },
    { id: 14, src: '/images/Good Photos/Acting-Headshot-of-Martha-By-Marie-Feutrier.webp', alt: 'Actress Martha with warm expression and professional styling for casting directors' },
    { id: 15, src: '/images/Good Photos/Professional-Headshot-of-Natalie-By-Marie-Feutrier.webp', alt: 'Professional woman Natalie with confident smile in business blazer' },
    { id: 16, src: '/images/Good Photos/Executive-Portrait-of-Russell-By-Marie-Feutrier.webp', alt: 'Executive Russell in dark blazer with distinguished professional presence' },
    { id: 17, src: '/images/Good Photos/Acting-Headshot-of-Shannon-By-Marie-Feutrier.webp', alt: 'Actress Shannon in elegant attire with sophisticated theatrical presence' },
    { id: 18, src: '/images/Good Photos/Actor-Portrait-of-Sien-By-Marie-Feutrier.webp', alt: 'Actor Sien in black attire with intense dramatic expression' },
    { id: 19, src: '/images/Good Photos/Professional-Headshot-of-Suzanne-By-Marie-Feutrier.webp', alt: 'Professional woman Suzanne with genuine smile in business portrait' },
    { id: 20, src: '/images/Good Photos/Personal-Branding-Photography-of-Kasia-By-Marie-Feutrier.webp', alt: 'Professional Kasia in elegant styling for personal brand photography' },
    { id: 21, src: '/images/Good Photos/Personal-Branding-Photography-of-Renee-By-Marie-Feutrier.webp', alt: 'Professional Renee with warm expression in personal branding portrait' },
    { id: 22, src: '/images/Good Photos/Professional-Headshot-of-Sarah-By-Marie-Feutrier.webp', alt: 'Professional woman Sarah with warm smile in elegant business attire' },
    { id: 23, src: '/images/Good Photos/Personal-Branding-Photography-of-Anne-By-Marie-Feutrier.webp', alt: 'Professional woman Anne in elegant blazer for personal branding photography' },
    { id: 24, src: '/images/Good Photos/Professional-Headshot-of-Erich-By-Marie-Feutrier.webp', alt: 'Professional man Erich in suit with confident business presence' },
    { id: 25, src: '/images/Good Photos/Professional-Headshot-of-Jackson-By-Marie-Feutrier.webp', alt: 'Professional man Jackson with warm smile in business attire' },
    { id: 26, src: '/images/Good Photos/Professional-Headshot-of-Jane-By-Marie-Feutrier.webp', alt: 'Professional woman Jane in elegant blazer with confident smile' },
    { id: 27, src: '/images/Good Photos/Professional-Headshot-of-Alegna-By-Marie-Feutrier.webp', alt: 'Professional woman Alegna in business attire with confident smile' },
    { id: 28, src: '/images/Good Photos/Professional-Headshot-of-Scott-By-Marie-Feutrier.webp', alt: 'Professional man Scott in suit with confident business presence' },
    { id: 29, src: '/images/Good Photos/Professional-Headshot-of-Elena-By-Marie-Feutrier.webp', alt: 'Professional woman Elena with elegant styling and confident expression' },
    { id: 30, src: '/images/Good Photos/Professional-Headshot-of-Dave-By-Marie-Feutrier.webp', alt: 'Professional man Dave in business casual with approachable demeanor' },
    { id: 31, src: '/images/Good Photos/Professional-Headshot-of-Peter-By-Marie-Feutrier.webp', alt: 'Professional man Peter in business casual with friendly expression' },
    { id: 32, src: '/images/Good Photos/Professional-Headshot-of-Pierina-By-Marie-Feutrier.webp', alt: 'Professional woman Pierina with vibrant personality in business portrait' },
    { id: 33, src: '/images/Good Photos/Actor-Portrait-of-Trevor-By-Marie-Feutrier.webp', alt: 'Young actor Trevor with genuine smile in commercial headshot' },
    { id: 34, src: '/images/Good Photos/Personal-Branding-Photography-of-Guacy-By-Marie-Feutrier.webp', alt: 'Professional Guacy with warm smile in personal branding portrait' }
  ]

  return (
    <>
      <Head>
        <title>Portraits - Portraits By Marie</title>
        <meta name="description" content="Professional portrait photography by Marie - Gilbert, Arizona" />
      </Head>

      <Layout title="Portraits" description="Professional Portrait Photography">
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
            display: block;
            border-radius: 4px;
            overflow: hidden;
            transition: transform 0.2s;
          }

          .masonry-item img {
            width: 100%;
            height: auto;
            display: block;
            border-radius: 4px;
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
                Portraits
              </h1>
            </div>

            {/* Featured Section */}
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
                position: 'relative',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <Image
                  src="/images/Good Photos/Professional-Headshot-of-Jackson-By-Marie-Feutrier.webp"
                  alt="Professional man Jackson with warm smile in business attire"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
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
                  Professional Portrait Photography
                </h2>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.7',
                  color: '#333',
                  marginBottom: '15px'
                }}>
                  Every portrait tells a story. Whether you need professional headshots for your career, personal branding images, or portraits that capture your authentic self, I create images that reflect who you truly are.
                </p>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.7',
                  color: '#333',
                  marginBottom: '20px'
                }}>
                  Working with professional Broncolor lighting and hand-painted backdrops, we will take the time needed to create portraits you will actually want to use.
                </p>
                <a
                  href="/pricing"
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
                  View Pricing
                </a>
              </div>
            </div>

            {/* Masonry Gallery */}
            <div className="masonry-gallery" style={{ paddingBottom: '40px' }}>
              {galleryImages.map((image) => (
                <div key={image.id} className="masonry-item">
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

          </div>

        </div>
      </Layout>
    </>
  )
}
