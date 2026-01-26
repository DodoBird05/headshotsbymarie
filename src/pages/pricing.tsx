import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Footer from '@/components/Footer'
import MobileBottomNav from '@/components/MobileBottomNav'
import StickyTextToPhotos from '@/components/StickyTextToPhotos'
import AnimatedFAQ from '@/components/AnimatedFAQ'
import StickyNavigation from '@/components/StickyNavigation'
import { useState } from 'react'

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
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
      </Head>
      
      {/* Navbar */}
      <StickyNavigation bookLink="/book" lightBackground />
      
      {/* Main Content */}
      <div className="pt-48 px-8 pb-16">
        <h1
          className="text-6xl font-light mb-8"
          style={{ fontFamily: '"Majesti Banner", serif', color: '#1C1C1C', fontWeight: 300, textTransform: 'uppercase' }}
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
              preload="auto"
              poster="/images/the-experience-poster.jpg"
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
                  className="text-3xl md:text-4xl font-light mb-2"
                  style={{
                    fontFamily: '"Majesti Banner", serif',
                    color: '#1C1C1C',
                    fontWeight: 300,
                    textTransform: 'uppercase'
                  }}
                >
                  Photography Studio Sessions
                </h2>
                <p
                  className="text-lg mb-8"
                  style={{
                    fontFamily: '"Hanken Grotesk", sans-serif',
                    color: '#1C1C1C',
                    fontWeight: 300,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}
                >
                  Pricing Per Person
                </p>
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
                      fontWeight: 300,
                      textTransform: 'uppercase'
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
          <AnimatedFAQ
            items={frontmatter.faq.map((faq, index) => ({
              ...faq,
              fromLeft: index % 2 === 0
            }))}
            theme="light"
          />
        </section>

        {/* Testimonials Section */}
        <section className="mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 md:min-h-[500px]">
            {/* Image Side */}
            <div className="relative aspect-[4/5] md:aspect-auto">
              <Image
                src={frontmatter.testimonial.imagePath}
                alt={frontmatter.testimonial.imageAlt}
                fill
                className="object-cover object-top"
              />
            </div>
            
            {/* Quote Side */}
            <div
              className="flex items-center justify-center p-8 md:p-12 relative"
              style={{ backgroundColor: '#F5F5F5' }}
            >
              <div className="max-w-lg text-center">
                {/* Testimonial Text */}
                <blockquote
                  className="text-2xl md:text-3xl mb-8"
                  style={{
                    fontFamily: '"Majesti Banner", serif',
                    color: '#1C1C1C',
                    fontWeight: 300,
                    textTransform: 'uppercase',
                    letterSpacing: '0.02em',
                    lineHeight: 1.3
                  }}
                >
                  "{frontmatter.testimonial.quote}"
                </blockquote>

                {/* Client Name */}
                <cite
                  className="text-sm not-italic"
                  style={{
                    fontFamily: '"Hanken Grotesk", sans-serif',
                    color: '#666',
                    fontWeight: 400,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}
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
      <MobileBottomNav />
    </>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content', 'pricing.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  return { props: { frontmatter: data, content } }
}