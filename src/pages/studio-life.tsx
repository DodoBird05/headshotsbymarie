import Layout from '@/components/Layout'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, ChevronUp, MapPin, Star, Lightbulb, Menu, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface BlogPost {
  id: string
  title: string
  date: string
  excerpt: string
  image: string
  featured?: boolean
}

interface CategoryPageProps {
  blogPosts: BlogPost[]
}

export default function StudioLifePage({ blogPosts }: CategoryPageProps) {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredPostId, setHoveredPostId] = useState<string | null>(null)
  const featuredPost = blogPosts[0]
  const moreMenuRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>, postId: string) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setHoveredPostId(postId)
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

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
        <title>Studio Life - Headshots By Marie</title>
        <meta name="description" content="Behind the scenes, process insights, and daily studio activities from Marie's photography studio" />
        <link rel="canonical" href="https://headshotsbymarie.com/studio-life" />
      </Head>

      <Layout title="Studio Life" description="Behind The Scenes">
        <style>{`
          .gradient-title {
            transition: all 0.15s ease;
            position: relative;
          }
          .gradient-title.active {
            background: radial-gradient(
              circle at ${mousePosition.x}px ${mousePosition.y}px,
              #ffffff 0%,
              #000000 80px
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

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
            .featured-grid {
              grid-template-columns: 1fr !important;
            }
            .featured-image {
              height: 250px !important;
            }
          }

          @media (min-width: 769px) {
            .desktop-sidebar { display: block !important; }
            .mobile-sidebar { display: none !important; }
          }
        `}</style>

        <div style={{
          display: 'flex',
          minHeight: '100vh',
          background: '#ffffff',
          padding: '1%',
          fontFamily: 'Verdana, Arial, sans-serif'
        }}>

          {/* Mobile Sidebar */}
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

          {/* Desktop Sidebar */}
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
            <h3 style={{ fontSize: '16px', marginBottom: '20px', fontWeight: 'bold' }}>Marie</h3>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <Link href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '13px' }}>Home</Link>
              <Link href="/about" style={{ color: 'white', textDecoration: 'none', fontSize: '13px' }}>About</Link>
              <Link href="/pricing" style={{ color: 'white', textDecoration: 'none', fontSize: '13px' }}>Pricing</Link>
              <Link href="/contact" style={{ color: 'white', textDecoration: 'none', fontSize: '13px' }}>Contact</Link>
            </nav>
            <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #333', fontSize: '11px', color: '#999' }}>
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

          {/* Main Content */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', minWidth: 0, overflow: 'hidden' }}>

            {/* Horizontal Nav */}
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

            {/* Page Title */}
            <div style={{ marginLeft: '2%', marginRight: '2%', marginTop: '20px' }}>
              <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#000', fontFamily: '"Majesti Banner", serif', margin: 0 }}>
                Studio Life
              </h1>
            </div>

            {/* Studio Gallery Link */}
            <div style={{ marginLeft: '2%', marginRight: '2%', marginTop: '20px', marginBottom: '20px' }}>
              <Link
                href="/the-studio"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: '#000',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                View Studio Gallery →
              </Link>
            </div>

            {blogPosts.length > 0 ? (
              <>
                {/* Featured Post */}
                <div
                  className="featured-grid"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '30px',
                    marginLeft: '2%',
                    marginRight: '2%',
                    marginTop: '10px',
                    marginBottom: '40px'
                  }}
                >
                  <Link href={`/news/${featuredPost.id}`} style={{ display: 'block' }}>
                    <div
                      className="featured-image"
                      style={{
                        width: '100%',
                        height: '400px',
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        background: '#e5e5e5'
                      }}
                    >
                      <Image src={featuredPost.image} alt={featuredPost.title} fill style={{ objectFit: 'contain' }} />
                    </div>
                  </Link>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Link href={`/news/${featuredPost.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <h2
                        className={`gradient-title ${hoveredPostId === `featured-${featuredPost.id}` ? 'active' : ''}`}
                        style={{ fontSize: '32px', fontWeight: 'normal', color: '#000', fontFamily: '"Majesti Banner", serif', marginBottom: '15px', lineHeight: '1.2' }}
                        onMouseMove={(e) => handleMouseMove(e, `featured-${featuredPost.id}`)}
                        onMouseLeave={() => setHoveredPostId(null)}
                      >
                        {featuredPost.title}
                      </h2>
                    </Link>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '20px', fontStyle: 'italic' }}>By Marie Feutrier</div>
                    <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#333', marginBottom: '20px' }}>{featuredPost.excerpt}</p>
                    <Link href={`/news/${featuredPost.id}`} style={{ fontSize: '14px', color: '#000', textDecoration: 'underline', fontWeight: 'bold' }}>Read Full Article →</Link>
                  </div>
                </div>

                {/* Posts Grid */}
                {blogPosts.length > 1 && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginLeft: '2%', marginRight: '2%', padding: '20px 0' }}>
                    {blogPosts.slice(1).map((post) => (
                      <article key={post.id} style={{ background: '#f5f5f5', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s' }}>
                        <Link href={`/news/${post.id}`} style={{ display: 'block' }}>
                          <div style={{ width: '100%', height: '200px', position: 'relative', overflow: 'hidden', background: '#e5e5e5' }}>
                            <Image src={post.image} alt={post.title} fill style={{ objectFit: 'contain' }} />
                          </div>
                        </Link>
                        <div style={{ padding: '20px' }}>
                          <div style={{ fontSize: '11px', color: '#999', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{post.date}</div>
                          <Link href={`/news/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <h2
                              className={`gradient-title ${hoveredPostId === post.id ? 'active' : ''}`}
                              style={{ fontSize: '20px', fontWeight: 'normal', marginBottom: '10px', color: '#000', fontFamily: '"Majesti Banner", serif' }}
                              onMouseMove={(e) => handleMouseMove(e, post.id)}
                              onMouseLeave={() => setHoveredPostId(null)}
                            >
                              {post.title}
                            </h2>
                          </Link>
                          <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#666', marginBottom: '15px' }}>{post.excerpt}</p>
                          <Link href={`/news/${post.id}`} style={{ fontSize: '13px', color: '#000', textDecoration: 'underline', fontWeight: 'bold' }}>Read More →</Link>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div style={{ background: '#f5f5f5', padding: '60px 30px', borderRadius: '4px', textAlign: 'center', marginLeft: '2%', marginRight: '2%', marginTop: '30px' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px', color: '#000', fontFamily: '"Majesti Banner", serif' }}>Coming Soon</h3>
                <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6' }}>More behind-the-scenes content is on the way. In the meantime, explore the studio gallery above.</p>
              </div>
            )}

          </div>
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const blogDirectory = path.join(process.cwd(), 'content/blog')

  if (!fs.existsSync(blogDirectory)) {
    return { props: { blogPosts: [] } }
  }

  const filenames = fs.readdirSync(blogDirectory)

  const blogPosts = filenames
    .filter(filename => filename.endsWith('.md'))
    .map((filename) => {
      const filePath = path.join(blogDirectory, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)

      return {
        id: filename.replace('.md', ''),
        title: data.title || 'Untitled',
        date: data.date || 'No date',
        excerpt: data.excerpt || '',
        image: data.image || '/images/blog-placeholder-1.jpg',
        featured: data.featured || false,
        category: data.category || ''
      }
    })
    .filter(post => post.category === 'Studio Life')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return { props: { blogPosts } }
}
