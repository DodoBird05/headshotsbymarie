import Layout from '@/components/Layout'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, ChevronUp, MapPin, Star, Lightbulb, Menu } from 'lucide-react'
import { useState } from 'react'
import GalleryGrid6 from '@/components/GalleryGrid6'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface AboutPageProps {
  title: string
  description: string
  heroImage: string
  heroImageAlt: string
  heroLabel: string
  heroName: string
  profileImage: string
  profileImageAlt: string
  profileName: string
  profileTagline: string
  connectTitle: string
  connectButtonText: string
  connectButtonLink: string
  details: {
    location: string
    training: string
    equipment: string
    reviews: string
  }
  ctaTitle: string
  ctaSubtitle: string
  ctaButtonText: string
  ctaButtonLink: string
  // Gallery Grid Props
  petsImage: string
  petsImageAlt: string
  petsLabel: string
  coffeeImage: string
  coffeeImageAlt: string
  coffeeLabel: string
  watercolorImage: string
  watercolorImageAlt: string
  watercolorLabel: string
  hikesImage: string
  hikesImageAlt: string
  hikesLabel: string
  awardImage: string
  awardImageAlt: string
  awardLabel: string
  toastmastersImage: string
  toastmastersImageAlt: string
  toastmastersLabel: string
  petsModalImage1: string
  petsModalImage1Alt: string
  petsModalImage1Text: string
  petsModalImage2: string
  petsModalImage2Alt: string
  petsModalImage2Text: string
  awardModalImage: string
  awardModalImageAlt: string
  toastmastersModalImage: string
  toastmastersModalImageAlt: string
  toastmastersModalText: string
  hikesModalImage1: string
  hikesModalImage1Alt: string
  hikesModalImage2: string
  hikesModalImage2Alt: string
  watercolorModalImage1: string
  watercolorModalImage1Alt: string
  watercolorModalImage2: string
  watercolorModalImage2Alt: string
}

export default function AboutPage(props: AboutPageProps) {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)
  const [photoPosition, setPhotoPosition] = useState(50)

  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
        <style>{`
          /* Large screens: show all items in main menu, hide More button and all dropdown items */
          @media (min-width: 1200px) {
            .more-button { display: none !important; }
            .dropdown-portraits,
            .dropdown-everybody,
            .dropdown-news { display: none !important; }
          }

          /* Medium-large screens: hide Portraits and News from main menu, show in dropdown */
          @media (min-width: 900px) and (max-width: 1199px) {
            .menu-item-portraits,
            .menu-item-news { display: none !important; }
            .dropdown-everybody { display: none !important; }
          }

          /* Medium screens: hide Everybody, Portraits, News from main menu, show in dropdown */
          @media (min-width: 700px) and (max-width: 899px) {
            .menu-item-everybody,
            .menu-item-portraits,
            .menu-item-news { display: none !important; }
          }

          /* Small screens: hide Everybody, Portraits, News from main menu, show all in dropdown */
          @media (max-width: 699px) {
            .menu-item-everybody,
            .menu-item-portraits,
            .menu-item-news { display: none !important; }
          }

          /* Add gap between photos on mobile devices */
          @media (max-width: 768px) {
            .photo-column {
              gap: 8px !important;
            }

            .about-grid {
              grid-template-columns: 1fr !important;
              height: auto !important;
            }

            .connect-box {
              min-height: 180px !important;
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
              <Link href="/" className="sidebar-text" style={{ color: 'white', textDecoration: 'none', fontSize: '13px' }}>Home</Link>
              <Link href="/about" className="sidebar-text" style={{ color: 'white', textDecoration: 'none', fontSize: '13px' }}>Profile</Link>
              <Link href="/pricing" className="sidebar-text" style={{ color: 'white', textDecoration: 'none', fontSize: '13px' }}>Pricing</Link>
              <Link href="/contact" className="sidebar-text" style={{ color: 'white', textDecoration: 'none', fontSize: '13px' }}>Contact</Link>
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
                    src={props.heroImage}
                    alt={props.heroImageAlt}
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
                      {props.heroLabel}
                    </div>
                    <div style={{
                      fontSize: '32px',
                      fontWeight: 'bold',
                      letterSpacing: '1px'
                    }}>
                      {props.heroName}
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
                      overflow: 'hidden',
                      aspectRatio: '1 / 1',
                      flexShrink: 0
                    }}>
                      <Image
                        src={props.profileImage}
                        alt={props.profileImageAlt}
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                      />
                    </div>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      marginBottom: '8px',
                      color: '#000',
                      textAlign: 'center'
                    }}>
                      {props.profileName}
                    </h3>
                    <p style={{
                      fontSize: '12px',
                      color: '#666',
                      textAlign: 'center',
                      fontStyle: 'italic'
                    }}>
                      "{props.profileTagline}"
                    </p>
                  </div>

                  {/* Bottom Small Image - Connect Section */}
                  <div className="connect-box" style={{
                    position: 'relative',
                    width: '100%',
                    flex: '1',
                    minHeight: '150px',
                    overflow: 'visible',
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
                      {props.connectTitle}
                    </h4>
                    <Link
                      href={props.connectButtonLink}
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
                      {props.connectButtonText}
                    </Link>
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
                      onMouseOver={(e) => { e.currentTarget.style.background = '#f5f5f5' }}
                      onMouseOut={(e) => { e.currentTarget.style.background = 'transparent' }}
                    >
                      Conceptual Work
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
                      onMouseOver={(e) => { e.currentTarget.style.background = '#f5f5f5' }}
                      onMouseOut={(e) => { e.currentTarget.style.background = 'transparent' }}
                    >
                      Everybody Loves A List
                    </Link>
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
                      onMouseOver={(e) => { e.currentTarget.style.background = '#f5f5f5' }}
                      onMouseOut={(e) => { e.currentTarget.style.background = 'transparent' }}
                    >
                      News
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Gallery Grid 6 Component */}
            <GalleryGrid6
              petsImage={props.petsImage}
              petsImageAlt={props.petsImageAlt}
              petsLabel={props.petsLabel}
              coffeeImage={props.coffeeImage}
              coffeeImageAlt={props.coffeeImageAlt}
              coffeeLabel={props.coffeeLabel}
              watercolorImage={props.watercolorImage}
              watercolorImageAlt={props.watercolorImageAlt}
              watercolorLabel={props.watercolorLabel}
              hikesImage={props.hikesImage}
              hikesImageAlt={props.hikesImageAlt}
              hikesLabel={props.hikesLabel}
              awardImage={props.awardImage}
              awardImageAlt={props.awardImageAlt}
              awardLabel={props.awardLabel}
              toastmastersImage={props.toastmastersImage}
              toastmastersImageAlt={props.toastmastersImageAlt}
              toastmastersLabel={props.toastmastersLabel}
              petsModalImage1={props.petsModalImage1}
              petsModalImage1Alt={props.petsModalImage1Alt}
              petsModalImage1Text={props.petsModalImage1Text}
              petsModalImage2={props.petsModalImage2}
              petsModalImage2Alt={props.petsModalImage2Alt}
              petsModalImage2Text={props.petsModalImage2Text}
              awardModalImage={props.awardModalImage}
              awardModalImageAlt={props.awardModalImageAlt}
              toastmastersModalImage={props.toastmastersModalImage}
              toastmastersModalImageAlt={props.toastmastersModalImageAlt}
              toastmastersModalText={props.toastmastersModalText}
              hikesModalImage1={props.hikesModalImage1}
              hikesModalImage1Alt={props.hikesModalImage1Alt}
              hikesModalImage2={props.hikesModalImage2}
              hikesModalImage2Alt={props.hikesModalImage2Alt}
              watercolorModalImage1={props.watercolorModalImage1}
              watercolorModalImage1Alt={props.watercolorModalImage1Alt}
              watercolorModalImage2={props.watercolorModalImage2}
              watercolorModalImage2Alt={props.watercolorModalImage2Alt}
            />

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
                  <strong>Location:</strong> {props.details.location}
                </div>
                <div>
                  <strong>Training:</strong> {props.details.training}
                </div>
                <div>
                  <strong>Equipment:</strong> {props.details.equipment}
                </div>
                <div>
                  <strong>Reviews:</strong> {props.details.reviews}
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
                fontWeight: 'bold',
                color: '#FFFFFF'
              }}>
                {props.ctaTitle}
              </h2>
              <p style={{
                fontSize: '14px',
                marginBottom: '20px',
                color: '#ccc'
              }}>
                {props.ctaSubtitle}
              </p>
              <Link
                href={props.ctaButtonLink}
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
                {props.ctaButtonText}
              </Link>
            </div>

          </div>

        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const contentDirectory = path.join(process.cwd(), 'content')
  const filePath = path.join(contentDirectory, 'about.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(fileContents)

  return {
    props: {
      title: data.title,
      description: data.description,
      heroImage: data.heroImage,
      heroImageAlt: data.heroImageAlt,
      heroLabel: data.heroLabel,
      heroName: data.heroName,
      profileImage: data.profileImage,
      profileImageAlt: data.profileImageAlt,
      profileName: data.profileName,
      profileTagline: data.profileTagline,
      connectTitle: data.connectTitle,
      connectButtonText: data.connectButtonText,
      connectButtonLink: data.connectButtonLink,
      details: data.details,
      ctaTitle: data.ctaTitle,
      ctaSubtitle: data.ctaSubtitle,
      ctaButtonText: data.ctaButtonText,
      ctaButtonLink: data.ctaButtonLink,
      // Gallery Grid Props
      petsImage: data.petsImage,
      petsImageAlt: data.petsImageAlt,
      petsLabel: data.petsLabel,
      coffeeImage: data.coffeeImage,
      coffeeImageAlt: data.coffeeImageAlt,
      coffeeLabel: data.coffeeLabel,
      watercolorImage: data.watercolorImage,
      watercolorImageAlt: data.watercolorImageAlt,
      watercolorLabel: data.watercolorLabel,
      hikesImage: data.hikesImage,
      hikesImageAlt: data.hikesImageAlt,
      hikesLabel: data.hikesLabel,
      awardImage: data.awardImage,
      awardImageAlt: data.awardImageAlt,
      awardLabel: data.awardLabel,
      toastmastersImage: data.toastmastersImage,
      toastmastersImageAlt: data.toastmastersImageAlt,
      toastmastersLabel: data.toastmastersLabel,
      petsModalImage1: data.petsModalImage1,
      petsModalImage1Alt: data.petsModalImage1Alt,
      petsModalImage1Text: data.petsModalImage1Text,
      petsModalImage2: data.petsModalImage2,
      petsModalImage2Alt: data.petsModalImage2Alt,
      petsModalImage2Text: data.petsModalImage2Text,
      awardModalImage: data.awardModalImage,
      awardModalImageAlt: data.awardModalImageAlt,
      toastmastersModalImage: data.toastmastersModalImage,
      toastmastersModalImageAlt: data.toastmastersModalImageAlt,
      toastmastersModalText: data.toastmastersModalText,
      hikesModalImage1: data.hikesModalImage1,
      hikesModalImage1Alt: data.hikesModalImage1Alt,
      hikesModalImage2: data.hikesModalImage2,
      hikesModalImage2Alt: data.hikesModalImage2Alt,
      watercolorModalImage1: data.watercolorModalImage1,
      watercolorModalImage1Alt: data.watercolorModalImage1Alt,
      watercolorModalImage2: data.watercolorModalImage2,
      watercolorModalImage2Alt: data.watercolorModalImage2Alt,
    }
  }
}
