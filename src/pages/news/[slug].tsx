import Layout from '@/components/Layout'
import Head from 'next/head'
import Image from 'next/image'
import { ChevronDown, ChevronUp, MapPin, Star, Lightbulb, Camera, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface BlogPostProps {
  title: string
  date: string
  content: string
  excerpt: string
  image: string
  imageAlt: string
  imageCredit?: string
}

export default function BlogPost({ title, date, content, excerpt, image, imageAlt, imageCredit }: BlogPostProps) {
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

  // Generate canonical URL
  const slug = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() : ''
  const canonicalUrl = `https://headshotsbymarie.com/news/${slug}`
  const fullImageUrl = `https://headshotsbymarie.com${image}`

  // Calculate word count
  const wordCount = content.split(/\s+/).length

  // Article Schema with comprehensive SEO fields
  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      // BlogPosting Schema
      {
        "@type": "BlogPosting",
        "@id": `${canonicalUrl}#article`,
        "url": canonicalUrl,
        "headline": title,
        "description": excerpt,
        "image": {
          "@type": "ImageObject",
          "url": fullImageUrl,
          "width": 1200,
          "height": 630
        },
        "datePublished": new Date(date).toISOString(),
        "dateModified": new Date(date).toISOString(),
        "author": {
          "@type": "Person",
          "@id": "https://headshotsbymarie.com/#marie-feutrier",
          "name": "Marie Feutrier",
          "url": "https://headshotsbymarie.com/about",
          "image": {
            "@type": "ImageObject",
            "url": "https://headshotsbymarie.com/images/marie-profile.jpg"
          }
        },
        "publisher": {
          "@type": "Organization",
          "@id": "https://headshotsbymarie.com/#organization",
          "name": "Headshots By Marie",
          "url": "https://headshotsbymarie.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://headshotsbymarie.com/Logo/Headshots-by-Marie-Rectangle-White.svg",
            "width": 600,
            "height": 60
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": canonicalUrl
        },
        "articleSection": "Photography",
        "inLanguage": "en-US",
        "wordCount": wordCount,
        "isPartOf": {
          "@type": "Blog",
          "@id": "https://headshotsbymarie.com/news#blog"
        }
      },
      // BreadcrumbList Schema
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://headshotsbymarie.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "News",
            "item": "https://headshotsbymarie.com/news"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": title,
            "item": canonicalUrl
          }
        ]
      },
      // WebPage Schema
      {
        "@type": "WebPage",
        "@id": canonicalUrl,
        "url": canonicalUrl,
        "name": title,
        "description": excerpt,
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://headshotsbymarie.com/#website"
        },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": fullImageUrl
        },
        "datePublished": new Date(date).toISOString(),
        "dateModified": new Date(date).toISOString()
      }
    ]
  }

  // Convert markdown to HTML (simple approach - just handle the basics)
  const renderContent = (markdown: string) => {
    let html = markdown

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 style="font-size: 24px; font-weight: bold; margin-top: 30px; margin-bottom: 15px; color: #000; font-family: \'Majesti Banner\', serif;">$1</h3>')
    html = html.replace(/^## (.*$)/gim, '<h2 style="font-size: 32px; font-weight: bold; margin-top: 40px; margin-bottom: 20px; color: #000; font-family: \'Majesti Banner\', serif;">$1</h2>')
    html = html.replace(/^# (.*$)/gim, '<h1 style="font-size: 42px; font-weight: bold; margin-bottom: 25px; color: #000; font-family: \'Majesti Banner\', serif;">$1</h1>')

    // Bold and italic
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')

    // Line breaks and paragraphs
    html = html.split('\n\n').map(paragraph => {
      if (paragraph.startsWith('<h') || paragraph.startsWith('<ul') || paragraph.startsWith('<ol')) {
        return paragraph
      }
      return `<p style="font-size: 16px; line-height: 1.8; color: #333; margin-bottom: 20px;">${paragraph}</p>`
    }).join('\n')

    return html
  }

  return (
    <>
      <Head>
        <title>{title} - Headshots By Marie</title>
        <meta name="description" content={excerpt} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={excerpt} />
        <meta property="og:image" content={fullImageUrl} />
        <meta property="og:site_name" content="Headshots By Marie" />
        <meta property="article:published_time" content={new Date(date).toISOString()} />
        <meta property="article:author" content="Marie Feutrier" />
        <meta property="article:section" content="Photography" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={excerpt} />
        <meta name="twitter:image" content={fullImageUrl} />
        <meta name="twitter:creator" content="@marie.feutrier" />

        {/* Additional Meta */}
        <meta name="author" content="Marie Feutrier" />
        <meta name="publish_date" property="og:publish_date" content={new Date(date).toISOString()} />

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      </Head>

      <Layout title={title} description={excerpt}>
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

        {/* Contemporary MySpace Layout */}
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

          {/* Desktop Black Left Column (Full Sidebar) */}
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
              <a href="/about-marie" style={{ fontFamily: '"Majesti Banner", serif', fontSize: '16px', fontWeight: 300, color: '#333', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>About Marie</a>
              <a href="/news" style={{ fontFamily: '"Majesti Banner", serif', fontSize: '16px', fontWeight: 300, color: '#333', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>News</a>
              <a href="/conceptual-work" className="menu-item-hide-medium" style={{ fontFamily: '"Majesti Banner", serif', fontSize: '16px', fontWeight: 300, color: '#333', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>Conceptual Work</a>
              <a href="/studio-life" className="menu-item-hide-medium" style={{ fontFamily: '"Majesti Banner", serif', fontSize: '16px', fontWeight: 300, color: '#333', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>Studio Life</a>
              <a href="/tips-guides" className="menu-item-hide-medium" style={{ fontFamily: '"Majesti Banner", serif', fontSize: '16px', fontWeight: 300, color: '#333', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>Tips & Guides</a>
              <a href="/everybody-loves-a-list" className="menu-item-hide-medium" style={{ fontFamily: '"Majesti Banner", serif', fontSize: '16px', fontWeight: 300, color: '#333', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>Everybody Loves A List</a>

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
                    <a href="/conceptual-work" className="dropdown-item" style={{ display: 'block', fontFamily: '"Majesti Banner", serif', fontSize: '16px', fontWeight: 300, color: '#333', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '10px 20px' }}>Conceptual Work</a>
                    <a href="/studio-life" className="dropdown-item" style={{ display: 'block', fontFamily: '"Majesti Banner", serif', fontSize: '16px', fontWeight: 300, color: '#333', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '10px 20px' }}>Studio Life</a>
                    <a href="/tips-guides" className="dropdown-item" style={{ display: 'block', fontFamily: '"Majesti Banner", serif', fontSize: '16px', fontWeight: 300, color: '#333', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '10px 20px' }}>Tips & Guides</a>
                    <a href="/everybody-loves-a-list" className="dropdown-item" style={{ display: 'block', fontFamily: '"Majesti Banner", serif', fontSize: '16px', fontWeight: 300, color: '#333', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '10px 20px' }}>Everybody Loves A List</a>
                  </div>
                )}
              </div>
            </div>

            {/* Blog Post Content */}
            <div style={{
              marginLeft: '2%',
              marginRight: '2%',
              marginTop: '30px',
              maxWidth: '800px',
              margin: '0 auto',
              padding: '40px 20px'
            }}>
              {/* Back to News Link */}
              <a
                href="/news"
                style={{
                  display: 'inline-block',
                  fontSize: '14px',
                  color: '#666',
                  textDecoration: 'none',
                  marginBottom: '30px',
                  transition: 'color 0.2s'
                }}
                onMouseOver={(e) => { e.currentTarget.style.color = '#000' }}
                onMouseOut={(e) => { e.currentTarget.style.color = '#666' }}
              >
                ← Back to News
              </a>

              {/* Post Title */}
              <h1 style={{
                fontSize: '42px',
                fontWeight: 'bold',
                color: '#000',
                fontFamily: '"Majesti Banner", serif',
                marginBottom: '15px',
                lineHeight: '1.2'
              }}>
                {title}
              </h1>

              {/* Post Meta */}
              <div style={{
                fontSize: '14px',
                color: '#666',
                marginBottom: '40px',
                paddingBottom: '20px',
                borderBottom: '1px solid #ddd'
              }}>
                By Marie Feutrier • {date}
              </div>

              {/* Featured Image */}
              <figure style={{ margin: 0, marginBottom: '40px' }}>
                <div style={{
                  width: '100%',
                  height: '400px',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '4px',
                  background: '#e5e5e5'
                }}>
                  <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                {imageCredit && (
                  <figcaption style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '4px',
                    fontSize: '12px',
                    color: '#666',
                    marginTop: '8px',
                    fontStyle: 'italic'
                  }}>
                    <Camera size={12} /> Credit: {imageCredit}
                  </figcaption>
                )}
              </figure>

              {/* Post Content */}
              <div
                style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  color: '#333'
                }}
                dangerouslySetInnerHTML={{ __html: renderContent(content) }}
              />

              {/* Back to News Link (bottom) */}
              <div style={{
                marginTop: '60px',
                paddingTop: '30px',
                borderTop: '1px solid #ddd'
              }}>
                <a
                  href="/news"
                  style={{
                    display: 'inline-block',
                    fontSize: '14px',
                    color: '#666',
                    textDecoration: 'none',
                    transition: 'color 0.2s'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.color = '#000' }}
                  onMouseOut={(e) => { e.currentTarget.style.color = '#666' }}
                >
                  ← Back to News
                </a>
              </div>
            </div>

          </div>

        </div>
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  const blogDirectory = path.join(process.cwd(), 'content/blog')

  if (!fs.existsSync(blogDirectory)) {
    return {
      paths: [],
      fallback: false
    }
  }

  const filenames = fs.readdirSync(blogDirectory)

  const paths = filenames
    .filter(filename => filename.endsWith('.md'))
    .map((filename) => ({
      params: {
        slug: filename.replace('.md', '')
      }
    }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const blogDirectory = path.join(process.cwd(), 'content/blog')
  const filePath = path.join(blogDirectory, `${params.slug}.md`)

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    props: {
      title: data.title || 'Untitled',
      date: data.date || 'No date',
      excerpt: data.excerpt || '',
      image: data.image || '/images/blog-placeholder-1.jpg',
      imageAlt: data.imageAlt || data.title || 'Blog post image',
      imageCredit: data.imageCredit || null,
      content
    }
  }
}
