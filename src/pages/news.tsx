import Layout from '@/components/Layout'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, ChevronUp, MapPin, Star, Lightbulb } from 'lucide-react'
import { useState } from 'react'
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

interface NewsPageProps {
  blogPosts: BlogPost[]
}

export default function NewsPage({ blogPosts }: NewsPageProps) {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredPostId, setHoveredPostId] = useState<string | null>(null)
  const featuredPost = blogPosts.find(post => post.featured) || blogPosts[0]

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>, postId: string) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setHoveredPostId(postId)
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  // Schema markup for blog hub page
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      // WebSite Schema
      {
        "@type": "WebSite",
        "@id": "https://headshotsbymarie.com/#website",
        "url": "https://headshotsbymarie.com",
        "name": "Headshots by Marie",
        "publisher": {
          "@id": "https://headshotsbymarie.com/#organization"
        }
      },
      // Organization Schema (reference to homepage schema)
      {
        "@type": "Organization",
        "@id": "https://headshotsbymarie.com/#organization",
        "name": "Riemagine Studio LLC",
        "alternateName": "Headshots by Marie",
        "url": "https://headshotsbymarie.com",
        "logo": "https://headshotsbymarie.com/Logo/Headshots-by-Marie-Rectangle.svg"
      },
      // CollectionPage Schema
      {
        "@type": "CollectionPage",
        "@id": "https://headshotsbymarie.com/news#webpage",
        "url": "https://headshotsbymarie.com/news",
        "name": "News & Blog - Portraits By Marie",
        "description": "Latest news, tips, and stories from Marie's photography journey",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://headshotsbymarie.com/#website"
        },
        "about": {
          "@type": "Thing",
          "name": "Photography Blog"
        },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": featuredPost?.image ? `https://headshotsbymarie.com${featuredPost.image}` : "https://headshotsbymarie.com/images/blog-placeholder-1.jpg"
        }
      },
      // BreadcrumbList Schema
      {
        "@type": "BreadcrumbList",
        "@id": "https://headshotsbymarie.com/news#breadcrumb",
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
          }
        ]
      },
      // ItemList Schema for blog posts
      {
        "@type": "ItemList",
        "@id": "https://headshotsbymarie.com/news#itemlist",
        "itemListElement": blogPosts.map((post, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "url": `https://headshotsbymarie.com/news/${post.id}`,
          "name": post.title
        }))
      }
    ]
  }

  return (
    <>
      <Head>
        <title>News & Blog - Portraits By Marie</title>
        <meta name="description" content="Latest news, tips, and stories from Marie's photography journey" />
        <link rel="canonical" href="https://headshotsbymarie.com/news" />

        {/* JSON-LD Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </Head>

      <Layout title="News" description="Latest Updates & Stories">
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
            text-fill-color: transparent;
          }

          /* Large screens: show all items in main menu, hide More button and all dropdown items */
          @media (min-width: 1200px) {
            .more-button { display: none !important; }
            .dropdown-news,
            .dropdown-everybody,
            .dropdown-portraits,
            .dropdown-studio { display: none !important; }
          }

          /* Medium-large screens: hide Portraits and Studio from main menu, show in dropdown */
          @media (min-width: 900px) and (max-width: 1199px) {
            .menu-item-portraits,
            .menu-item-studio { display: none !important; }
            .dropdown-news,
            .dropdown-everybody { display: none !important; }
          }

          /* Medium screens: hide Everybody, Portraits, Studio from main menu, show in dropdown */
          @media (min-width: 700px) and (max-width: 899px) {
            .menu-item-everybody,
            .menu-item-portraits,
            .menu-item-studio { display: none !important; }
            .dropdown-news { display: none !important; }
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
              <Link href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '13px' }}>Home</Link>
              <Link href="/about" style={{ color: 'white', textDecoration: 'none', fontSize: '13px' }}>Profile</Link>
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
                      onClick={() => setIsMoreMenuOpen(false)}
                      onMouseOver={(e) => { e.currentTarget.style.background = '#f5f5f5' }}
                      onMouseOut={(e) => { e.currentTarget.style.background = 'transparent' }}
                    >
                      News
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
                      onClick={() => setIsMoreMenuOpen(false)}
                      onMouseOver={(e) => { e.currentTarget.style.background = '#f5f5f5' }}
                      onMouseOut={(e) => { e.currentTarget.style.background = 'transparent' }}
                    >
                      Everybody Loves A List
                    </Link>
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
                      onClick={() => setIsMoreMenuOpen(false)}
                      onMouseOver={(e) => { e.currentTarget.style.background = '#f5f5f5' }}
                      onMouseOut={(e) => { e.currentTarget.style.background = 'transparent' }}
                    >
                      Conceptual Work
                    </Link>
                    <Link
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
                      onClick={() => setIsMoreMenuOpen(false)}
                      onMouseOver={(e) => { e.currentTarget.style.background = '#f5f5f5' }}
                      onMouseOut={(e) => { e.currentTarget.style.background = 'transparent' }}
                    >
                      The Studio
                    </Link>
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
                From the Studio
              </h1>
            </div>

            {/* Featured Post */}
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
                overflow: 'hidden',
                borderRadius: '4px'
              }}>
                <Image
                  src={featuredPost.image}
                  alt="Professional photographer Marie Feutrier guiding client during headshot photography session to capture natural expressions"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>

              {/* Featured Content */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <a
                  href={`/news/${featuredPost.id}`}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    cursor: 'pointer'
                  }}
                >
                  <h2
                    className={`gradient-title ${hoveredPostId === `featured-${featuredPost.id}` ? 'active' : ''}`}
                    style={{
                      fontSize: '32px',
                      fontWeight: 'bold',
                      color: '#000',
                      fontFamily: '"Majesti Banner", serif',
                      marginBottom: '15px',
                      lineHeight: '1.2'
                    }}
                    onMouseMove={(e) => handleMouseMove(e, `featured-${featuredPost.id}`)}
                    onMouseLeave={() => setHoveredPostId(null)}
                  >
                    {featuredPost.title}
                  </h2>
                </a>
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
                  {featuredPost.excerpt}
                </p>
                <a
                  href={`/news/${featuredPost.id}`}
                  style={{
                    fontSize: '14px',
                    color: '#000',
                    textDecoration: 'underline',
                    fontWeight: 'bold'
                  }}
                >
                  Read Full Article →
                </a>
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px',
              marginLeft: '2%',
              marginRight: '2%',
              padding: '20px 0'
            }}>
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  style={{
                    background: '#f5f5f5',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'transform 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  {/* Blog Post Image */}
                  <div style={{
                    width: '100%',
                    height: '200px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>

                  {/* Blog Post Content */}
                  <div style={{ padding: '20px' }}>
                    <div style={{
                      fontSize: '11px',
                      color: '#999',
                      marginBottom: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {post.date}
                    </div>
                    <a
                      href={`/news/${post.id}`}
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        cursor: 'pointer'
                      }}
                    >
                      <h2
                        className={`gradient-title ${hoveredPostId === post.id ? 'active' : ''}`}
                        style={{
                          fontSize: '20px',
                          fontWeight: 'bold',
                          marginBottom: '10px',
                          color: '#000',
                          fontFamily: '"Majesti Banner", serif'
                        }}
                        onMouseMove={(e) => handleMouseMove(e, post.id)}
                        onMouseLeave={() => setHoveredPostId(null)}
                      >
                        {post.title}
                      </h2>
                    </a>
                    <p style={{
                      fontSize: '14px',
                      lineHeight: '1.6',
                      color: '#666',
                      marginBottom: '15px'
                    }}>
                      {post.excerpt}
                    </p>
                    <a
                      href={`/news/${post.id}`}
                      style={{
                        fontSize: '13px',
                        color: '#000',
                        textDecoration: 'underline',
                        fontWeight: 'bold'
                      }}
                    >
                      Read More →
                    </a>
                  </div>
                </article>
              ))}
            </div>

            {/* Coming Soon Section */}
            <div style={{
              background: '#f5f5f5',
              padding: '30px',
              borderRadius: '4px',
              textAlign: 'center',
              marginLeft: '2%',
              marginRight: '2%',
              marginTop: '20px'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                marginBottom: '10px',
                color: '#000'
              }}>
                More Stories Coming Soon
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#666'
              }}>
                Check back regularly for new photography tips, behind-the-scenes stories, and client features.
              </p>
            </div>

          </div>

        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const blogDirectory = path.join(process.cwd(), 'content/blog')

  // Check if blog directory exists
  if (!fs.existsSync(blogDirectory)) {
    return {
      props: {
        blogPosts: []
      }
    }
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
        featured: data.featured || false
      }
    })
    // Sort by date (newest first)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return {
    props: {
      blogPosts
    }
  }
}
