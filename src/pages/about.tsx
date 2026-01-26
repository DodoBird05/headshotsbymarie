import Layout from '@/components/Layout'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, ChevronUp, MapPin, Star, Lightbulb, Menu, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import FeaturedPostsGrid from '@/components/FeaturedPostsGrid'
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
}

export default function AboutPage(props: AboutPageProps) {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [photoPosition, setPhotoPosition] = useState(50)
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

  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
        <meta property="og:title" content={props.title} />
        <meta property="og:description" content={props.description} />
        <meta property="og:image" content={`https://headshotsbymarie.com${props.heroImage}`} />
        <meta property="og:url" content="https://headshotsbymarie.com/about" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={props.title} />
        <meta name="twitter:description" content={props.description} />
        <meta name="twitter:image" content={`https://headshotsbymarie.com${props.heroImage}`} />
        <style>{`
          @media (min-width: 1200px) {
            .more-button { display: none !important; }
            .dropdown-item { display: none !important; }
          }

          @media (max-width: 1199px) {
            .menu-item-hide-medium { display: none !important; }
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

          {/* Black Left Column (Narrow Sidebar) */}
          <div className="sidebar" style={{
            width: '200px',
            background: '#000000',
            padding: '20px',
            color: 'white',
            flexShrink: 0
          }}>
            <button
              className="sidebar-icon-only"
              onClick={() => setIsMobileMenuOpen(true)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '5px'
              }}
            >
              <Menu className="h-6 w-6" />
            </button>

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
              <Link href="/about" className="sidebar-text" style={{ color: 'white', textDecoration: 'none', fontSize: '13px' }}>About</Link>
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
                    <Link
                      href="/bio"
                      style={{
                        display: 'block',
                        fontSize: '32px',
                        letterSpacing: '1px',
                        color: 'white',
                        textDecoration: 'none',
                        transition: 'opacity 0.2s'
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.opacity = '0.8' }}
                      onMouseOut={(e) => { e.currentTarget.style.opacity = '1' }}
                    >
                      <span style={{ fontWeight: 'bold' }}>{props.heroName}</span>
                      <span style={{ fontFamily: '"Majesti Banner", serif', fontWeight: 300 }}> - Learn More</span>
                    </Link>
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

            {/* Featured Posts Grid - One from each category */}
            <FeaturedPostsGrid
              posts={[
                {
                  category: 'About Marie',
                  title: 'Vivian Maier Photographed My Family',
                  image: '/images/Blog/Madeleine-by-Vivian-Maire.webp',
                  imageAlt: 'Black and white photograph by Vivian Maier of Madeleine with her dog Mirou',
                  link: '/news/vivian-maier-photographed-my-family'
                },
                {
                  category: 'News',
                  title: 'Two Approaches to Editorial Portraits',
                  image: '/images/Blog/editorial-rama-dawaji-cover-szilveszter-mako-the-cut.webp',
                  imageAlt: 'Rama Dawaji photographed by Szilveszter Makó for The Cut',
                  link: '/news/editorial-portraits-art-vs-documentation'
                },
                {
                  category: 'Conceptual Work',
                  title: 'Coming Soon',
                  image: '/images/About Marie/Marie-Feutrier-Arizona-Desert.webp',
                  imageAlt: 'Conceptual photography work coming soon',
                  link: '/conceptual-work'
                },
                {
                  category: 'Studio Life',
                  title: 'How I Get Natural Expressions',
                  image: '/images/blog-marie-guiding-client.webp',
                  imageAlt: 'Marie Feutrier guiding client during headshot session',
                  link: '/news/natural-expressions'
                },
                {
                  category: 'Tips & Guides',
                  title: 'Hair Up or Down for Headshots?',
                  image: '/images/Blog/Actor Headshot with Hair Down.webp',
                  imageAlt: 'Professional actor headshot with natural wavy hair down',
                  link: '/news/hair-up-or-down'
                },
                {
                  category: 'Everybody Loves A List',
                  title: 'My Favorite Photographers',
                  image: '/images/Duchamps-by-Penn.webp',
                  imageAlt: 'Marcel Duchamp photographed by Irving Penn',
                  link: '/my-favorite-photographers',
                  imagePosition: 'top'
                }
              ]}
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
    }
  }
}
