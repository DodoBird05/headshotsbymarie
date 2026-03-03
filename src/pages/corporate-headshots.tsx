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
import AnimatedFAQ from '@/components/AnimatedFAQ'
import TestimonialWithParallax from '@/components/TestimonialWithParallax'
import { generateServiceSchema, generateBreadcrumbSchema, seoConfig } from '@/lib/seoConfig'

interface ContentSection {
  title?: string
  paragraphs: string[]
  imagePath?: string
  imageAlt?: string
  imagePosition?: 'left' | 'right'
}

interface CorporateHeadshotsProps {
  frontmatter: {
    title: string
    description: string
    heroTitle: string
    heroImage: string
    heroImageAlt: string
    headerImages: {
      src: string
      alt: string
    }[]
    introText: string[]
    featureImage: {
      src: string
      alt: string
    }
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
    faqTitle: string
    faq: {
      question: string
      answer: string
    }[]
  }
  content: string
}

export default function CorporateHeadshotsPage({ frontmatter, content }: CorporateHeadshotsProps) {
  let imageIndex = 0

  // Smooth gradient: white → dark reaching the parallax, then solid dark, then dark → white
  const getZoneColors = (sectionIndex: number) => {
    // Gradient zone: smooth chained gradients from white to dark, ending at parallax
    if (sectionIndex < frontmatter.testimonial1Position) {
      const bgs = [
        'linear-gradient(180deg, #FFFFFF, #6B6560)',
        'linear-gradient(180deg, #6B6560, #1C1C1C)'
      ]
      const texts = ['#1C1C1C', '#F5F0EB']
      const darks = [false, true]
      return {
        bg: bgs[sectionIndex] ?? bgs[bgs.length - 1],
        text: texts[sectionIndex] ?? texts[texts.length - 1],
        isDark: darks[sectionIndex] ?? true
      }
    }
    // Dark zone
    if (sectionIndex < frontmatter.testimonial2Position) {
      return { bg: '#1C1C1C', text: '#F5F0EB', isDark: true }
    }
    // Reverse gradient zone: dark → white after testimonial 2
    const reverseIndex = sectionIndex - frontmatter.testimonial2Position
    const reverseBgs = [
      'linear-gradient(180deg, #1C1C1C, #6B6560)',
      'linear-gradient(180deg, #6B6560, #B8B3AE)'
    ]
    const reverseTexts = ['#F5F0EB', '#1C1C1C']
    const reverseDarks = [true, false]
    return {
      bg: reverseBgs[reverseIndex] ?? reverseBgs[reverseBgs.length - 1],
      text: reverseTexts[reverseIndex] ?? reverseTexts[reverseTexts.length - 1],
      isDark: reverseDarks[reverseIndex] ?? false
    }
  }

  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
        <link rel="canonical" href="https://headshotsbymarie.com/corporate-headshots" />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description} />
        <meta property="og:image" content={`https://headshotsbymarie.com${frontmatter.heroImage}`} />
        <meta property="og:image:width" content="2400" />
        <meta property="og:image:height" content="1600" />
        <meta property="og:url" content="https://headshotsbymarie.com/corporate-headshots" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Headshots by Marie" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta name="twitter:description" content={frontmatter.description} />
        <meta name="twitter:image" content={`https://headshotsbymarie.com${frontmatter.heroImage}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateServiceSchema({
              name: 'Corporate Headshot Photography',
              description: frontmatter.description,
              url: '/corporate-headshots',
              image: frontmatter.heroImage
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateBreadcrumbSchema([
              { name: 'Corporate Headshots', url: '/corporate-headshots' }
            ]))
          }}
        />
        {frontmatter.testimonials.map((testimonial, index) => (
          <script
            key={`review-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
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
                },
                itemReviewed: {
                  '@type': 'LocalBusiness',
                  name: seoConfig.businessName
                }
              })
            }}
          />
        ))}
      </Head>

      {/* Navbar */}
      <StickyNavigation bookLink="/pricing" />

      {/* Hero Section */}
      <ServiceHero
        heroImage={frontmatter.heroImage}
        heroImageAlt={frontmatter.heroImageAlt}
        pageTitle="CORPORATE HEADSHOTS PHOENIX"
        textColor="light"
        textAlign="left"
      />

      {/* Disambiguation Links */}
      <div className="bg-white px-8 py-6">
        <div className="max-w-6xl mx-auto">
          <p
            className="text-base"
            style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#888', fontWeight: 300 }}
          >
            Looking for{' '}
            <Link href="/team-photography" className="underline underline-offset-4 hover:text-black transition-colors">
              team photography
            </Link>
            {' '}or{' '}
            <Link href="/executive-headshots" className="underline underline-offset-4 hover:text-black transition-colors">
              executive headshots
            </Link>
            ?
          </p>
        </div>
      </div>

      {/* 3-Image Header Grid */}
      <section>
        <h2
          className="text-3xl font-light text-center py-12"
          style={{ fontFamily: '"Majesti Banner", serif', color: '#1C1C1C', fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.05em' }}
        >
          Business Portraits & Professional Headshots
        </h2>
        <div className="w-1/2 mx-auto">
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
        </div>
      </section>

      {/* Intro Text */}
      <section className="py-16 bg-white">
        <div className="w-1/2 mx-auto">
          {frontmatter.introText.map((paragraph, index) => (
            <p
              key={index}
              className="text-lg md:text-xl mb-6 last:mb-0"
              style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 300, lineHeight: 1.8 }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Feature Image with Heading */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Heading Left */}
            <div>
              <h2
                className="text-3xl font-light"
                style={{ fontFamily: '"Majesti Banner", serif', color: '#1C1C1C', fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.05em' }}
              >
                Business Portraits for Every Professional
              </h2>
              <div className="mt-8">
                <Link
                  href="/pricing"
                  className="inline-block text-white text-lg font-medium hover:opacity-90 transition-all duration-300 px-8 py-3"
                  style={{ fontFamily: '"Hanken Grotesk", sans-serif', backgroundColor: '#D4A843' }}
                >
                  Book Today
                </Link>
              </div>
            </div>
            {/* Image Right */}
            <div className="flex justify-center">
              <picture>
                <source media="(max-width: 768px)" srcSet={getMobileSrc(frontmatter.featureImage.src)} />
                <img
                  src={frontmatter.featureImage.src}
                  alt={frontmatter.featureImage.alt}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </picture>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections before testimonial 1 */}
      {frontmatter.sections.slice(0, frontmatter.testimonial1Position).map((section, sectionIndex) => {
        const zone = getZoneColors(sectionIndex)
        const hasImage = !!section.imagePath
        const imageFirst = hasImage
          ? section.imagePosition
            ? section.imagePosition === 'left'
            : imageIndex++ % 2 === 0
          : false
        const darkLinkClass = zone.isDark ? '[&_a]:text-[#F5F0EB] [&_a]:underline' : ''

        return (
          <section key={sectionIndex} className="py-16" style={{ background: zone.bg }}>
            <div className={`${hasImage ? 'max-w-6xl' : 'max-w-3xl'} mx-auto px-8`}>
              {hasImage ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
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
                  <div className={`space-y-6 flex flex-col justify-center ${imageFirst ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}`}>
                    {section.title && (
                      <h2
                        className="text-3xl font-light"
                        style={{ fontFamily: '"Majesti Banner", serif', color: zone.text, fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.05em' }}
                      >
                        {section.title}
                      </h2>
                    )}
                    {section.paragraphs.map((paragraph, pIndex) =>
                      paragraph.includes('<h3>') ? (
                        <div
                          key={pIndex}
                          className={`text-lg [&_h3]:text-xl [&_h3]:font-medium [&_h3]:mb-2 ${darkLinkClass} ${zone.isDark ? '[&_h3]:!text-[#F5F0EB]' : ''}`}
                          style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: zone.text, fontWeight: 300 }}
                          dangerouslySetInnerHTML={{ __html: paragraph }}
                        />
                      ) : (
                        <p
                          key={pIndex}
                          className={`text-lg [&_strong]:font-medium ${darkLinkClass}`}
                          style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: zone.text, fontWeight: 300 }}
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
                      style={{ fontFamily: '"Majesti Banner", serif', color: zone.text, fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.05em' }}
                    >
                      {section.title}
                    </h2>
                  )}
                  {section.paragraphs.map((paragraph, pIndex) =>
                    paragraph.includes('<h3>') ? (
                      <div
                        key={pIndex}
                        className={`text-lg md:text-xl mb-6 last:mb-0 [&_h3]:text-xl [&_h3]:font-medium [&_h3]:mb-2 ${darkLinkClass} ${zone.isDark ? '[&_h3]:!text-[#F5F0EB]' : ''}`}
                        style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: zone.text, fontWeight: 300, lineHeight: 1.8 }}
                        dangerouslySetInnerHTML={{ __html: paragraph }}
                      />
                    ) : (
                      <p
                        key={pIndex}
                        className={`text-lg md:text-xl mb-6 last:mb-0 [&_strong]:font-medium ${darkLinkClass}`}
                        style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: zone.text, fontWeight: 300, lineHeight: 1.8 }}
                        dangerouslySetInnerHTML={{ __html: paragraph }}
                      />
                    )
                  )}
                </>
              )}
            </div>
          </section>
        )
      })}

      {/* Testimonial 1 with Parallax — everything after slides up over it */}
      <TestimonialWithParallax
        quote={[frontmatter.testimonials[0].quote]}
        author={frontmatter.testimonials[0].author}
        rating={5}
        source="Google Review"
        textWidth="75vw"
        parallaxImages={[{
          src: '/images/Corporate/Photo-Session-Behind-The-Scenes-Corporate-Headshots-By-Marie-Feutrier.webp',
          alt: 'Behind the scenes corporate headshot photo session Phoenix Arizona'
        }]}
      >
        {/* Remaining sections from testimonial1Position onward */}
        {frontmatter.sections.slice(frontmatter.testimonial1Position).map((section, i) => {
          const sectionIndex = i + frontmatter.testimonial1Position
          const zone = getZoneColors(sectionIndex)
          const hasImage = !!section.imagePath
          const sectionImageIndex = imageIndex
          if (hasImage && !section.imagePosition) imageIndex++
          const imageFirst = hasImage
            ? section.imagePosition
              ? section.imagePosition === 'left'
              : sectionImageIndex % 2 === 0
            : false
          const darkLinkClass = zone.isDark ? '[&_a]:text-[#F5F0EB] [&_a]:underline' : ''

          return (
            <div key={sectionIndex}>
              {/* Insert Testimonial 2 */}
              {sectionIndex === frontmatter.testimonial2Position && (
                <section style={{ backgroundColor: '#F5F5F5', borderTop: '4px solid #D4A843' }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 md:min-h-[500px]">
                    <div className="flex items-center justify-center p-8 md:p-12">
                      <picture>
                        <source media="(max-width: 768px)" srcSet={getMobileSrc(frontmatter.testimonials[1].imagePath)} />
                        <img
                          src={frontmatter.testimonials[1].imagePath}
                          alt={frontmatter.testimonials[1].imageAlt}
                          className="rounded-lg object-cover"
                          style={{ maxHeight: '75%', height: '75vh', maxWidth: '100%' }}
                          loading="lazy"
                        />
                      </picture>
                    </div>
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
                  </div>
                </section>
              )}

              {/* Insert 5-Image Row */}
              {sectionIndex === frontmatter.imageRowPosition && (
                <section className="py-8" style={{ backgroundColor: '#1C1C1C' }}>
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

              <section className="py-16" style={{ background: zone.bg }}>
                <div className={`${hasImage ? 'max-w-6xl' : 'max-w-3xl'} mx-auto px-8`}>
                  {hasImage ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
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
                      <div className={`space-y-6 flex flex-col justify-center ${imageFirst ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}`}>
                        {section.title && (
                          <h2
                            className="text-3xl font-light"
                            style={{ fontFamily: '"Majesti Banner", serif', color: zone.text, fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.05em' }}
                          >
                            {section.title}
                          </h2>
                        )}
                        {section.paragraphs.map((paragraph, pIndex) =>
                          paragraph.includes('<h3>') ? (
                            <div
                              key={pIndex}
                              className={`text-lg [&_h3]:text-xl [&_h3]:font-medium [&_h3]:mb-2 ${darkLinkClass} ${zone.isDark ? '[&_h3]:!text-[#F5F0EB]' : ''}`}
                              style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: zone.text, fontWeight: 300 }}
                              dangerouslySetInnerHTML={{ __html: paragraph }}
                            />
                          ) : (
                            <p
                              key={pIndex}
                              className={`text-lg [&_strong]:font-medium ${darkLinkClass}`}
                              style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: zone.text, fontWeight: 300 }}
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
                          style={{ fontFamily: '"Majesti Banner", serif', color: zone.text, fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.05em' }}
                        >
                          {section.title}
                        </h2>
                      )}
                      {section.paragraphs.map((paragraph, pIndex) =>
                        paragraph.includes('<h3>') ? (
                          <div
                            key={pIndex}
                            className={`text-lg md:text-xl mb-6 last:mb-0 [&_h3]:text-xl [&_h3]:font-medium [&_h3]:mb-2 ${darkLinkClass} ${zone.isDark ? '[&_h3]:!text-[#F5F0EB]' : ''}`}
                            style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: zone.text, fontWeight: 300, lineHeight: 1.8 }}
                            dangerouslySetInnerHTML={{ __html: paragraph }}
                          />
                        ) : (
                          <p
                            key={pIndex}
                            className={`text-lg md:text-xl mb-6 last:mb-0 [&_strong]:font-medium ${darkLinkClass}`}
                            style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: zone.text, fontWeight: 300, lineHeight: 1.8 }}
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
        <section className="py-16" style={{ background: 'linear-gradient(180deg, #B8B3AE, #FFFFFF)' }}>
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
                href="/pricing"
                className="inline-block text-white text-lg font-medium hover:opacity-90 transition-all duration-300 px-8 py-3"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', backgroundColor: '#D4A843' }}
              >
                Book Your Session
              </Link>
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
            plusColor="#D4A843"
          />
        </section>

        {/* Footer */}
        <Footer />
        <MobileBottomNav />
      </TestimonialWithParallax>
    </>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content', 'corporate-headshots.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  return { props: { frontmatter: data, content } }
}
