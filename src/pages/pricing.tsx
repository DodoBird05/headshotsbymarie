import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Footer from '@/components/Footer'
import StickyTextToPhotos from '@/components/StickyTextToPhotos'
import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react'

interface ExperienceProps {
  frontmatter: {
    title: string
    description: string
    pageTitle: string
    heroVideo: {
      webm: string
      mp4: string
    }
    stickyTextToPhotos: {
      text: string
      images: {
        src: string
        alt: string
      }[]
    }
    pricing: {
      title: string
      package: {
        name: string
        price: string
        features: string[]
      }
      imagePath: string
      imageAlt: string
    }
    sessionGallery: {
      src: string
      alt: string
    }[]
    testimonial: {
      quote: string
      author: string
      imagePath: string
      imageAlt: string
    }
    faqTitle: string
    faq: {
      question: string
      answer: string
    }[]
  }
  content: string
}

export default function ExperiencePage({ frontmatter, content }: ExperienceProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500&family=Gilda+Display&family=Bodoni+Moda:wght@400;500;600&display=swap" rel="stylesheet" />
      </Head>
      
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${isScrolled ? 'py-2 px-8 shadow-md' : 'py-8 px-8'}`}>
        <div className={`flex items-center ${isScrolled ? 'justify-end gap-4' : 'justify-end gap-4 md:gap-8'} w-full transition-all duration-300`}>
          {isScrolled ? (
            <>
              {/* Small Square Logo */}
              <div className="flex-shrink-0">
                <Link href="/">
                  <Image
                    src="/Logo/Headshots By Marie-Logo-square-White.svg"
                    alt="Headshots by Marie - Professional headshot photography Phoenix Arizona"
                    width={32}
                    height={32}
                    className="h-8 w-8 cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ filter: 'invert(1)' }}
                  />
                </Link>
              </div>
              
              {/* Hamburger Menu */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-black p-2"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </>
          ) : (
            <>
              {/* Logo - Square for mobile, Rectangle for desktop */}
              <div className="flex-shrink-0">
                <Link href="/">
                  <Image
                    src="/Logo/Headshots By Marie Logo-Square.svg"
                    alt="Headshots by Marie - Professional headshot photography Phoenix Arizona"
                    width={80}
                    height={80}
                    className="h-20 w-20 md:hidden cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </Link>
                <Link href="/">
                  <Image
                    src="/Logo/Headshots-by-Marie-Rectangle.svg"
                    alt="Headshots by Marie - Professional headshot photography Phoenix Arizona"
                    width={240}
                    height={96}
                    className="hidden md:block h-24 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </Link>
              </div>
              
              {/* Mobile Hamburger Menu */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-black p-2"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              
              {/* Desktop Navigation Menu */}
              <nav className="hidden md:flex md:flex-col md:space-y-2">
                <Link
                  href="/about"
                  className="text-black font-light text-lg hover:opacity-80 transition-opacity"
                  style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
                >
                  About
                </Link>
                <Link
                  href="/pricing"
                  className="text-black font-light text-lg hover:opacity-80 transition-opacity"
                  style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
                >
                  Pricing
                </Link>
                <Link
                  href="/contact"
                  className="text-black font-light text-lg hover:opacity-80 transition-opacity"
                  style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
                >
                  Contact
                </Link>
              </nav>
            </>
          )}
        </div>
        
        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col">
            {/* Close button at the top */}
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-black p-2"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* Navigation Menu */}
            <nav className="flex flex-col items-center justify-center flex-1 space-y-8">
              <Link
                href="/about"
                className="text-black font-light text-2xl hover:opacity-80 transition-opacity"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/pricing"
                className="text-black font-light text-2xl hover:opacity-80 transition-opacity"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                className="text-black font-light text-2xl hover:opacity-80 transition-opacity"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </nav>
      
      {/* Main Content */}
      <div className="pt-48 px-8 pb-16">
        <h1
          className="text-6xl font-light mb-8"
          style={{ fontFamily: '"Majesti Banner", serif', color: '#1C1C1C', fontWeight: 300 }}
        >
          {frontmatter.pageTitle}
        </h1>
        <div
          className="md:max-w-md lg:max-w-lg"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Hero Video Section */}
        <section className="mt-16 -mx-8">
          <div className="relative w-full" style={{ maxHeight: '70vh' }}>
            <video
              className="w-full h-auto"
              style={{ maxHeight: '70vh', objectFit: 'cover' }}
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={frontmatter.heroVideo.webm} type="video/webm" />
              <source src={frontmatter.heroVideo.mp4} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        {/* Sticky Text to Photos Section */}
        <div style={{ marginLeft: '-32px', marginRight: '-32px' }}>
          <StickyTextToPhotos
            text={frontmatter.stickyTextToPhotos.text}
            images={frontmatter.stickyTextToPhotos.images}
          />
        </div>

        {/* Animated Pricing Section */}
        <section className="mt-24 px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Centered Image */}
            <div className="flex justify-center items-center">
              <div className="relative">
                <Image
                  src={frontmatter.pricing.imagePath}
                  alt={frontmatter.pricing.imageAlt}
                  width={500}
                  height={600}
                  className="object-cover mx-auto"
                />
              </div>
            </div>

            {/* Right Column - Animated Text */}
            <div className="space-y-8">
              {/* Pricing header */}
              <div>
                <h2 
                  className="text-3xl md:text-4xl font-light mb-8"
                  style={{ 
                    fontFamily: '"Majesti Banner", serif', 
                    color: '#1C1C1C', 
                    fontWeight: 300 
                  }}
                >
                  {frontmatter.pricing.title}
                </h2>
              </div>

              {/* Package details */}
              <div>
                <div 
                  className="bg-gray-50 p-6"
                  style={{ border: '1px solid #E5E5E5' }}
                >
                  <h4 
                    className="text-2xl font-light mb-4"
                    style={{ 
                      fontFamily: '"Majesti Banner", serif', 
                      color: '#1C1C1C', 
                      fontWeight: 300 
                    }}
                  >
                    {frontmatter.pricing.package.name}
                  </h4>
                  <div 
                    className="text-3xl font-medium mb-4"
                    style={{ 
                      fontFamily: '"Hanken Grotesk", sans-serif', 
                      color: '#1C1C1C', 
                      fontWeight: 500 
                    }}
                  >
                    {frontmatter.pricing.package.price}
                  </div>
                  <ul className="space-y-2">
                    {frontmatter.pricing.package.features.map((feature, index) => (
                      <li 
                        key={index}
                        className="text-lg"
                        style={{ 
                          fontFamily: '"Hanken Grotesk", sans-serif', 
                          color: '#666', 
                          fontWeight: 300 
                        }}
                      >
                        - {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Book Today Button */}
                  <div className="mt-6">
                    <Link
                      href="/book"
                      className="book-today-btn"
                      style={{
                        display: 'inline-block',
                        backgroundColor: isHovered ? '#1C1C1C' : 'transparent',
                        border: '2px solid #000',
                        padding: '12px 32px',
                        borderRadius: '4px',
                        textDecoration: 'none',
                        fontSize: '16px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        textAlign: 'center',
                        fontFamily: '"Hanken Grotesk", sans-serif'
                      }}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      onMouseMove={handleMouseMove}
                    >
                      <span
                        style={{
                          background: isHovered ? `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, #ffffff 0%, #999999 60px)` : 'none',
                          WebkitBackgroundClip: isHovered ? 'text' : 'unset',
                          WebkitTextFillColor: isHovered ? 'transparent' : 'inherit',
                          backgroundClip: isHovered ? 'text' : 'unset'
                        }}
                      >
                        Book Today
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* FAQ Section */}
        <section className="mt-24">
          <h2 className="text-4xl font-light mb-12 text-center" style={{ fontFamily: '"Majesti Banner", serif', color: '#1C1C1C', fontWeight: 300 }}>
            {frontmatter.faqTitle}
          </h2>
          
          <div className="max-w-4xl mx-auto w-2/3">
            {/* Top divider line */}
            <div 
              className="w-full h-px mb-4"
              style={{ backgroundColor: '#E5E5E5' }}
            />
            
            {frontmatter.faq.map((faq, index) => (
              <div key={index} className="mb-4">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left transition-all duration-200"
                  style={{ 
                    backgroundColor: openFAQ === index ? '#1C1C1C' : '#F5F5F5',
                    color: openFAQ === index ? 'white' : '#1C1C1C'
                  }}
                >
                  <span className="text-lg font-normal" style={{ fontFamily: '"Hanken Grotesk", sans-serif' }}>
                    {faq.question}
                  </span>
                  {openFAQ === index ? (
                    <ChevronUp className="h-5 w-5 flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="h-5 w-5 flex-shrink-0 ml-4" />
                  )}
                </button>
                
                {openFAQ === index && (
                  <div 
                    className="p-6 border-l-4 transition-all duration-300"
                    style={{ backgroundColor: '#FAFAFA', borderColor: '#1C1C1C' }}
                  >
                    <div 
                      className="text-base leading-relaxed whitespace-pre-line"
                      style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 300 }}
                    >
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
            {/* Image Side */}
            <div className="relative">
              <Image
                src={frontmatter.testimonial.imagePath}
                alt={frontmatter.testimonial.imageAlt}
                fill
                className="object-cover"
              />
            </div>
            
            {/* Quote Side */}
            <div 
              className="flex items-center justify-center p-8 md:p-12 relative"
              style={{ backgroundColor: '#F5F5F5' }}
            >
              <div className="max-w-md text-center">
                {/* Testimonial Text */}
                <blockquote 
                  className="text-lg leading-relaxed mb-6"
                  style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 400 }}
                >
                  "{frontmatter.testimonial.quote}"
                </blockquote>
                
                {/* Client Name */}
                <cite 
                  className="text-base font-medium not-italic"
                  style={{ fontFamily: '"Majesti Banner", serif', color: '#1C1C1C', fontWeight: 'bold' }}
                >
                  — {frontmatter.testimonial.author}
                </cite>
              </div>
            </div>
          </div>
        </section>

        {/* Auto-Scrolling Sessions Carousel */}
        <section className="mt-24">
          <div className="w-full overflow-hidden">
            <div className="scroll-container">
              <div className="scroll-content">
                {/* First set of images */}
                {frontmatter.sessionGallery.map((image, index) => (
                  <div key={`gallery-1-${index}`} className="flex-shrink-0">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={400}
                      height={600}
                      className="h-96 w-auto object-contain"
                    />
                  </div>
                ))}

                {/* Duplicate set for infinite loop */}
                {frontmatter.sessionGallery.map((image, index) => (
                  <div key={`gallery-2-${index}`} className="flex-shrink-0">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={400}
                      height={600}
                      className="h-96 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <style jsx>{`
          .scroll-container {
            overflow-x: auto;
            position: relative;
            cursor: grab;
            padding-bottom: 16px;
          }

          .scroll-container:active {
            cursor: grabbing;
          }

          .scroll-content {
            display: flex;
            gap: 32px;
          }

          /* Show scrollbar */
          .scroll-container::-webkit-scrollbar {
            height: 12px;
          }

          .scroll-container::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 6px;
          }

          .scroll-container::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 6px;
          }

          .scroll-container::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        `}</style>
      </div>

      {/* Footer */}
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content', 'pricing.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  return { props: { frontmatter: data, content } }
}