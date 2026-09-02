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
import { generateServiceSchema } from '@/lib/seoConfig'
import { renderMarkdown } from '@/lib/renderMarkdown'
import { trackButtonClick } from '@/lib/analytics'
import { type } from '@/lib/typography'

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
  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="robots" content="noindex, follow" />
        <meta name="description" content={frontmatter.description} />
        <link rel="canonical" href="https://headshotsbymarie.com/pricing/" />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description} />
        <meta property="og:image" content={`https://headshotsbymarie.com${frontmatter.pricing.imagePath}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://headshotsbymarie.com/pricing/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Headshots by Marie" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta name="twitter:description" content={frontmatter.description} />
        <meta name="twitter:image" content={`https://headshotsbymarie.com${frontmatter.pricing.imagePath}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateServiceSchema({
              name: 'Professional Headshot Photography Pricing',
              description: frontmatter.description,
              url: '/pricing/',
              image: frontmatter.pricing.imagePath
            }))
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: frontmatter.faq.map(faq => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer.replace(/<[^>]*>/g, '')
                }
              }))
            })
          }}
        />
      </Head>
      
      {/* Navbar */}
      {/* No lightBackground: the hero is now a dark video, so the nav starts white
          over it and flips dark once the light content below scrolls up. */}
      <StickyNavigation bookLink="/book" ctaLabel="Book your session" />
      
      {/* Hero: the video fills the section, a dark scrim sits over it, and the
          title + intro copy sit on top. The copy is in normal flow inside the
          overlay, so the section grows to fit the text at any width and the
          paragraph can never spill past the video. */}
      <section
        className="relative w-full overflow-hidden flex flex-col justify-end"
        style={{ minHeight: '100vh' }}
      >
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/images/the-experience-poster.webp"
        >
          <source src={frontmatter.heroVideo.webm} type="video/webm" />
          <source src={frontmatter.heroVideo.mp4} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* 0.65 is measured, not picked by eye: the poster's text area peaks at
            0.90 relative luminance, and #F5F0EB over a 0.6 scrim lands at 4.24:1
            against the brightest frame — under the 4.5:1 AA floor for body copy.
            0.65 gives 4.96:1. Lower it and the paragraph stops passing contrast. */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(28, 28, 28, 0.65)' }}
          aria-hidden="true"
        />
        {/* Centred and sitting low, matching the ServiceHero pages: their h1 is
            centred at bottom-[15vh]. Flex justify-end on the section does the
            same job while keeping the copy in normal flow, so a long paragraph
            on a narrow screen pushes the block up instead of overflowing.
            The floating "Book your session" CTA overlaps the last lines of the
            paragraph on mobile. That is deliberate and left alone — Marie's call:
            the overlap is what prompts people to scroll. Don't "fix" it by
            padding this block down; it would break parity with the other heroes. */}
        <div className="relative px-8 pt-48 pb-[15vh] max-w-4xl mx-auto text-center">
          {/* pageTitle carries <span class="swash"> / <span class="swash-lig">
              around the exact letters that get Romie's decorative alternates
              (see globals.css). fontFeatureSettings is reset to 'normal' here:
              the shared h1 role asks for ss05, which is the capital-ligature set,
              and on an all-caps title that would silently join TH, HE and CE too —
              including the T that is meant to stand alone with its swash. */}
          <h1
            className="mb-8"
            style={{ ...type.h1, fontFeatureSettings: 'normal', color: '#F5F0EB' }}
            dangerouslySetInnerHTML={{ __html: frontmatter.pageTitle }}
          />
          <div className="hero-copy max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </section>

      {/* Main Content */}
      <div className="pt-16 px-8 pb-16">
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
                    fontFamily: '"Romie", serif',
                    color: '#1C1C1C',
                    fontWeight: 300
                  }}
                >
                  Photography Studio Sessions
                </h2>
                <p
                  className="text-lg mb-8"
                  style={{
                    fontFamily: '"Romie", serif',
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
                    className="text-2xl mb-4"
                    style={{
                      fontFamily: '"Romie", serif',
                      color: '#1C1C1C',
                      fontWeight: 300
                    }}
                  >
                    {frontmatter.pricing.package.name}
                  </h4>
                  <div 
                    className="text-3xl font-medium mb-4"
                    style={{ 
                      fontFamily: '"Romie", serif', 
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
                          fontFamily: '"Romie", serif', 
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
                      href="/book/"
                      onClick={() => trackButtonClick('Book Today', 'pricing_package', '/book')}
                      className="inline-block text-white text-lg font-medium hover:opacity-90 transition-all duration-300 px-8 py-3"
                      style={{
                        fontFamily: '"Romie", serif',
                        backgroundColor: '#D4A843',
                        textDecoration: 'none',
                      }}
                    >
                      Book Today
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

        {/* Post-FAQ CTA */}
        <section className="mt-16 text-center">
          <p
            className="text-lg mb-6"
            style={{
              fontFamily: '"Romie", serif',
              color: '#666',
              fontWeight: 300,
            }}
          >
            Ready to get started?
          </p>
          <Link
            href="/book/"
            onClick={() => trackButtonClick('Book Your Session', 'post_faq_cta', '/book')}
            className="inline-block text-white text-lg font-medium hover:opacity-90 transition-all duration-300 px-8 py-3"
            style={{
              fontFamily: '"Romie", serif',
              backgroundColor: '#D4A843',
              textDecoration: 'none',
            }}
          >
            Book Your Session
          </Link>
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
                    fontFamily: '"Romie", serif',
                    color: '#1C1C1C',
                    fontWeight: 300,
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
                    fontFamily: '"Romie", serif',
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
  // Convert the markdown body to HTML at build time — injecting the raw
  // markdown left literal [link](/url/) syntax visible on the page.
  return { props: { frontmatter: data, content: renderMarkdown(content) } }
}