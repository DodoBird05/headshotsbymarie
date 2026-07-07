import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Head from 'next/head'
import { getMobileSrc } from '@/lib/responsiveImage'
import Footer from '@/components/Footer'
import MobileBottomNav from '@/components/MobileBottomNav'
import StickyNavigation from '@/components/StickyNavigation'
import ServiceHero from '@/components/ServiceHero'
import { generateServiceSchema, generatePersonSchema, generateAggregateRating, generateBreadcrumbSchema, seoConfig } from '@/lib/seoConfig'

interface ContentSection {
  title?: string
  paragraphs: string[]
  imagePath?: string
  imageAlt?: string
}

interface PhoenixHeadshotPhotographerProps {
  frontmatter: {
    title: string
    description: string
    heroImage: string
    heroImageAlt: string
    headerHeading: string
    headerImages: {
      src: string
      alt: string
    }[]
    introText: string[]
    sections: ContentSection[]
    imageRowPosition: number
    testimonial1Position: number
    testimonial2Position: number
    ctaTitle: string
    ctaText: string[]
    imageRow: {
      src: string
      alt: string
    }[]
    testimonials: {
      quote: string
      author: string
      imagePath: string
      imageAlt: string
    }[]
  }
  content: string
}

export default function PhoenixHeadshotPhotographerPage({ frontmatter, content }: PhoenixHeadshotPhotographerProps) {
  let imageIndex = 1

  const serviceSchema = generateServiceSchema({
    name: 'Professional Headshot Photography in Phoenix',
    description: frontmatter.description,
    url: '/phoenix-headshot-photographer/',
    image: frontmatter.heroImage
  })

  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
        <link rel="canonical" href="https://headshotsbymarie.com/phoenix-headshot-photographer/" />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description} />
        <meta property="og:image" content="https://headshotsbymarie.com/images/Phoenix/Phoenix-Headshot-Photographer-OG-Anna-By-Marie-Feutrier.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://headshotsbymarie.com/phoenix-headshot-photographer/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Headshots by Marie" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta name="twitter:description" content={frontmatter.description} />
        <meta name="twitter:image" content="https://headshotsbymarie.com/images/Phoenix/Phoenix-Headshot-Photographer-OG-Anna-By-Marie-Feutrier.webp" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generatePersonSchema())
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              '@id': `${seoConfig.siteUrl}/#business`,
              name: seoConfig.businessName,
              aggregateRating: generateAggregateRating('83'),
              review: frontmatter.testimonials.map(testimonial => ({
                '@type': 'Review',
                reviewBody: testimonial.quote,
                author: {
                  '@type': 'Person',
                  name: testimonial.author
                },
                reviewRating: {
                  '@type': 'Rating',
                  ratingValue: '5',
                  bestRating: '5'
                }
              }))
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateBreadcrumbSchema([
              { name: 'Phoenix Headshot Photographer', url: '/phoenix-headshot-photographer/' }
            ]))
          }}
        />
      </Head>

      {/* Navbar */}
      <StickyNavigation bookLink="/pricing" />

      {/* Hero Section */}
      <ServiceHero
        heroImage={frontmatter.heroImage}
        heroImageAlt={frontmatter.heroImageAlt}
        pageTitle="PROFESSIONAL HEADSHOT PHOTOGRAPHER & BUSINESS PORTRAITS IN PHOENIX, AZ"
        textColor="light"
        textAlign="left"
      />

      {/* 3-Image Header Grid */}
      <section>
        <h2
          className="text-3xl font-light text-center py-12"
          style={{ fontFamily: '"Majesti Banner", serif', color: '#1C1C1C', fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.05em' }}
        >
          {frontmatter.headerHeading}
        </h2>
        <div className="grid grid-cols-3 gap-0">
          {frontmatter.headerImages.map((image, index) => (
            <div key={index}>
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto"
                loading="eager"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Intro Text */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-8">
          {frontmatter.introText.map((paragraph, index) => (
            <p
              key={index}
              className="text-lg md:text-xl mb-6 last:mb-0"
              style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 300, lineHeight: 1.8 }}
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
        </div>
      </section>

      {/* Content Sections with Image Row and Testimonial inserted at positions */}
      {frontmatter.sections.map((section, sectionIndex) => {
        const hasImage = !!section.imagePath
        const pastTestimonial2 = sectionIndex >= frontmatter.testimonial2Position
        const imageFirst = hasImage ? (imageIndex++ + (pastTestimonial2 ? 1 : 0)) % 2 === 0 : false

        return (
          <div key={sectionIndex}>
            {/* Insert Testimonial 1 (image left, quote right) */}
            {sectionIndex === frontmatter.testimonial1Position && (
              <section style={{ backgroundColor: '#F5F5F5' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 md:min-h-[500px]">
                  {/* Image Side */}
                  <div className="relative aspect-[4/5] md:aspect-auto">
                    <picture>
                      <source media="(max-width: 768px)" srcSet={getMobileSrc(frontmatter.testimonials[0].imagePath)} />
                      <img
                        src={frontmatter.testimonials[0].imagePath}
                        alt={frontmatter.testimonials[0].imageAlt}
                        className="absolute inset-0 w-full h-full object-cover md:object-contain object-top"
                        loading="lazy"
                      />
                    </picture>
                  </div>
                  {/* Quote Side */}
                  <div className="flex items-center justify-center p-8 md:p-12 relative">
                    <div className="max-w-lg text-center">
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
                        <span style={{ fontFeatureSettings: '"ss01" on' }}>{frontmatter.testimonials[0].quote.charAt(0)}</span>{frontmatter.testimonials[0].quote.slice(1)}
                      </blockquote>
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
                        — {frontmatter.testimonials[0].author}
                      </cite>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Insert Testimonial 2 (quote left, image right) */}
            {sectionIndex === frontmatter.testimonial2Position && (
              <section style={{ backgroundColor: '#F5F5F5' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 md:min-h-[500px]">
                  {/* Quote Side */}
                  <div className="flex items-center justify-center p-8 md:p-12 relative order-2 md:order-1">
                    <div className="max-w-lg text-center">
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
                        <span style={{ fontFeatureSettings: '"ss01" on' }}>{frontmatter.testimonials[1].quote.charAt(0)}</span>{frontmatter.testimonials[1].quote.slice(1)}
                      </blockquote>
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
                        — {frontmatter.testimonials[1].author}
                      </cite>
                    </div>
                  </div>
                  {/* Image Side */}
                  <div className="relative aspect-[4/5] md:aspect-auto order-1 md:order-2">
                    <picture>
                      <source media="(max-width: 768px)" srcSet={getMobileSrc(frontmatter.testimonials[1].imagePath)} />
                      <img
                        src={frontmatter.testimonials[1].imagePath}
                        alt={frontmatter.testimonials[1].imageAlt}
                        className="absolute inset-0 w-full h-full object-cover md:object-contain object-top"
                        loading="lazy"
                      />
                    </picture>
                  </div>
                </div>
              </section>
            )}

            {/* Insert 5-Image Row before the specified section */}
            {sectionIndex === frontmatter.imageRowPosition && (
              <section className="py-8 bg-white">
                <div className="grid grid-cols-5 gap-0">
                  {frontmatter.imageRow.map((image, index) => (
                    <div key={index} className="relative aspect-[4/5] overflow-hidden">
                      <picture>
                        <source media="(max-width: 768px)" srcSet={getMobileSrc(image.src)} />
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="absolute inset-0 w-full h-full object-cover object-top"
                          loading="lazy"
                        />
                      </picture>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="py-16 bg-white">
              <div className={`${hasImage ? 'max-w-6xl' : 'max-w-3xl'} mx-auto px-8`}>
                {hasImage ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                    {/* Image */}
                    <div className={`flex justify-center items-center h-full ${imageFirst ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}>
                      <picture>
                        <source media="(max-width: 768px)" srcSet={getMobileSrc(section.imagePath!)} />
                        <img
                          src={section.imagePath}
                          alt={section.imageAlt}
                          width={500}
                          height={600}
                          className="object-contain max-h-full"
                          loading="lazy"
                        />
                      </picture>
                    </div>
                    {/* Text */}
                    <div className={`space-y-6 flex flex-col justify-center ${imageFirst ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}`}>
                      {section.title && (
                        <h2
                          className="text-3xl font-light"
                          style={{ fontFamily: '"Majesti Banner", serif', color: '#1C1C1C', fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.05em' }}
                        >
                          {section.title}
                        </h2>
                      )}
                      {section.paragraphs.map((paragraph, pIndex) =>
                        paragraph.includes('<h3>') ? (
                          <div
                            key={pIndex}
                            className="text-lg [&_h3]:text-xl [&_h3]:font-medium [&_h3]:mb-2"
                            style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 300 }}
                            dangerouslySetInnerHTML={{ __html: paragraph }}
                          />
                        ) : (
                          <p
                            key={pIndex}
                            className="text-lg [&_strong]:font-medium"
                            style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 300 }}
                            dangerouslySetInnerHTML={{ __html: paragraph }}
                          />
                        )
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    {section.title && (
                      <h2
                        className="text-3xl font-light mb-8"
                        style={{ fontFamily: '"Majesti Banner", serif', color: '#1C1C1C', fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.05em' }}
                      >
                        {section.title}
                      </h2>
                    )}
                    {section.paragraphs.map((paragraph, pIndex) =>
                      paragraph.includes('<h3>') ? (
                        <div
                          key={pIndex}
                          className="text-lg md:text-xl mb-6 last:mb-0 [&_h3]:text-xl [&_h3]:font-medium [&_h3]:mb-2"
                          style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 300, lineHeight: 1.8 }}
                          dangerouslySetInnerHTML={{ __html: paragraph }}
                        />
                      ) : (
                        <p
                          key={pIndex}
                          className="text-lg md:text-xl mb-6 last:mb-0 [&_strong]:font-medium"
                          style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 300, lineHeight: 1.8 }}
                          dangerouslySetInnerHTML={{ __html: paragraph }}
                        />
                      )
                    )}
                  </>
                )}
              </div>
            </section>
          </div>
        )
      })}

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2
            className="text-3xl font-light mb-8"
            style={{ fontFamily: '"Majesti Banner", serif', color: '#1C1C1C', fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.05em' }}
          >
            {frontmatter.ctaTitle}
          </h2>
          {frontmatter.ctaText.map((paragraph, index) => (
            <p
              key={index}
              className="text-lg md:text-xl mb-6"
              style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 300, lineHeight: 1.8 }}
            >
              {paragraph}
            </p>
          ))}
          <div className="mt-8">
            <Link
              href="/pricing/"
              className="inline-block border-2 border-black text-black text-lg font-medium hover:bg-black hover:text-white transition-all duration-300 px-8 py-3"
              style={{ fontFamily: '"Hanken Grotesk", sans-serif' }}
            >
              Book Your Session
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      <MobileBottomNav />
    </>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content', 'phoenix-headshot-photographer.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  return { props: { frontmatter: data, content } }
}
