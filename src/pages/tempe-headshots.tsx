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
import StickyImageWithText from '@/components/StickyImageWithText'
import AnimatedFAQ from '@/components/AnimatedFAQ'
import TestimonialWithParallax from '@/components/TestimonialWithParallax'
import { generateServiceSchema, generatePersonSchema, generateAggregateRating, generateBreadcrumbSchema, seoConfig } from '@/lib/seoConfig'
import useScrollReveal from '@/hooks/useScrollReveal'
import TextCardOverImage from '@/components/TextCardOverImage'
import StatementSplit from '@/components/StatementSplit'
import { trackButtonClick } from '@/lib/analytics'

interface ContentSection {
  title?: string
  paragraphs: string[]
  imagePath?: string
  imageAlt?: string
  imagePosition?: 'left' | 'right'
  layout?: string
  pullLine?: string
}

interface ZoneColors {
  bg: string
  text: string
  isDark: boolean
}

interface TempeHeadshotsProps {
  frontmatter: {
    title: string
    description: string
    heroTitle: string
    heroImage: string
    heroImageAlt: string
    headerTitle: string
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
    parallaxImages: {
      src: string
      alt: string
    }[]
    testimonials: {
      quote: string
      author: string
      datePublished?: string
      imagePath: string
      imageAlt: string
    }[]
    faq: {
      question: string
      answer: string
    }[]
  }
  content: string
}

export default function TempeHeadshotsPage({ frontmatter }: TempeHeadshotsProps) {
  useScrollReveal()
  let imageIndex = 0

  const getZoneColors = (sectionIndex: number): ZoneColors => {
    if (sectionIndex < frontmatter.testimonial1Position) {
      return {
        bg: 'linear-gradient(180deg, #FFFFFF 30%, #1C1C1C)',
        text: '#1C1C1C',
        isDark: false
      }
    }
    if (sectionIndex < frontmatter.testimonial2Position) {
      return { bg: '#1C1C1C', text: '#F5F0EB', isDark: true }
    }
    const reverseIndex = sectionIndex - frontmatter.testimonial2Position
    const reverseBgs = [
      '#1C1C1C',
      '#1C1C1C',
      'linear-gradient(180deg, #1C1C1C, #7A7570)',
      '#1C1C1C',
      '#1C1C1C',
      'linear-gradient(180deg, #1C1C1C, #F5F0EB)'
    ]
    const reverseTexts = ['#F5F0EB', '#F5F0EB', '#F5F0EB', '#F5F0EB', '#F5F0EB', '#1C1C1C']
    const reverseDarks = [true, true, true, true, true, false]
    return {
      bg: reverseBgs[reverseIndex] ?? reverseBgs[reverseBgs.length - 1],
      text: reverseTexts[reverseIndex] ?? reverseTexts[reverseTexts.length - 1],
      isDark: reverseDarks[reverseIndex] ?? false
    }
  }

  const darkLinkClass = (zone: ZoneColors) => zone.isDark ? '[&_a]:text-[#F5F0EB] [&_a]:underline' : ''

  const renderOverlapCardInverted = (section: ContentSection) => (
    <TextCardOverImage
      title={section.title}
      paragraphs={section.paragraphs}
      imagePath={section.imagePath || ''}
      imageAlt={section.imageAlt || ''}
    />
  )

  const renderStepsTimeline = (section: ContentSection, zone: ZoneColors) => {
    const introParagraphs: string[] = []
    const steps: { heading: string; body: string }[] = []
    const outroParagraphs: string[] = []
    let foundStep = false

    for (const paragraph of section.paragraphs) {
      const h3Match = paragraph.match(/<h3>(.*?)<\/h3>([\s\S]*)$/)
      if (h3Match) {
        foundStep = true
        steps.push({ heading: h3Match[1], body: h3Match[2].trim() })
      } else if (!foundStep) {
        introParagraphs.push(paragraph)
      } else {
        outroParagraphs.push(paragraph)
      }
    }

    return (
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12">
          {section.imagePath && (
            <div className="lg:self-start" data-reveal>
              <picture>
                <source media="(max-width: 768px)" srcSet={getMobileSrc(section.imagePath)} />
                <img
                  src={section.imagePath}
                  alt={section.imageAlt}
                  className="w-full object-cover"
                  loading="lazy"
                />
              </picture>
            </div>
          )}
          <div>
            {section.title && (
              <h2
                className="text-2xl lg:text-3xl font-light mb-8"
                style={{ fontFamily: '"Romie", serif', color: zone.text, fontWeight: 300,  letterSpacing: '0.05em' }}
              >
                {section.title}
              </h2>
            )}
            {introParagraphs.map((paragraph, pIndex) => (
              <p
                key={`intro-${pIndex}`}
                className={`text-lg mb-8 ${darkLinkClass(zone)}`}
                style={{ fontFamily: '"Romie", serif', color: zone.text, fontWeight: 300, lineHeight: 1.7 }}
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
            <div className="relative pl-8" style={{ borderLeft: '2px solid #D4A843' }}>
              {steps.map((step, stepIndex) => (
                <div key={stepIndex} data-reveal data-reveal-delay={String(stepIndex * 150)} className={stepIndex < steps.length - 1 ? 'mb-10' : ''} style={{ position: 'relative' }}>
                  <div
                    className="absolute w-4 h-4 rounded-full"
                    style={{ backgroundColor: '#D4A843', left: '-1.15rem', top: '0.25rem' }}
                  />
                  <h3
                    className="text-lg lg:text-xl font-medium mb-2"
                    style={{ fontFamily: '"Romie", serif', color: zone.text }}
                  >
                    {step.heading}
                  </h3>
                  <p
                    className={`text-base ${darkLinkClass(zone)}`}
                    style={{ fontFamily: '"Romie", serif', color: zone.text, fontWeight: 300, lineHeight: 1.7 }}
                    dangerouslySetInnerHTML={{ __html: step.body }}
                  />
                </div>
              ))}
            </div>
            {outroParagraphs.map((paragraph, pIndex) => (
              <p
                key={`outro-${pIndex}`}
                className={`text-lg mt-8 ${darkLinkClass(zone)}`}
                style={{ fontFamily: '"Romie", serif', color: zone.text, fontWeight: 300, lineHeight: 1.7 }}
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderStatementSplit = (section: ContentSection, zone: ZoneColors) => (
    <StatementSplit
      pullLine={section.pullLine}
      title={section.title}
      paragraphs={section.paragraphs}
      imagePath={section.imagePath}
      imageAlt={section.imageAlt}
      textColor={zone.text}
      isDark={zone.isDark}
    />
  )

  const renderStandardAlternating = (section: ContentSection, zone: ZoneColors, imageFirst: boolean) => {
    const hasImage = !!section.imagePath
    const dlc = darkLinkClass(zone)

    if (hasImage) {
      return (
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            <div data-reveal data-reveal-delay="100" className={`flex justify-center items-center h-full ${imageFirst ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}>
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
            <div data-reveal data-reveal-delay="300" className={`space-y-6 flex flex-col justify-center ${imageFirst ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}`}>
              {section.title && (
                <h2
                  className="text-3xl font-light"
                  style={{ fontFamily: '"Romie", serif', color: zone.text, fontWeight: 300,  letterSpacing: '0.05em' }}
                >
                  {section.title}
                </h2>
              )}
              {section.paragraphs.map((paragraph, pIndex) =>
                paragraph.includes('<h3>') ? (
                  <div
                    key={pIndex}
                    className={`text-lg [&_h3]:text-xl [&_h3]:font-medium [&_h3]:mb-2 ${dlc} ${zone.isDark ? '[&_h3]:!text-[#F5F0EB]' : ''}`}
                    style={{ fontFamily: '"Romie", serif', color: zone.text, fontWeight: 300 }}
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  />
                ) : (
                  <p
                    key={pIndex}
                    className={`text-lg [&_strong]:font-medium ${dlc}`}
                    style={{ fontFamily: '"Romie", serif', color: zone.text, fontWeight: 300 }}
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  />
                )
              )}
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="max-w-3xl mx-auto px-8">
        {section.title && (
          <h2
            className="text-3xl font-light mb-8"
            style={{ fontFamily: '"Romie", serif', color: zone.text, fontWeight: 300,  letterSpacing: '0.05em' }}
          >
            {section.title}
          </h2>
        )}
        {section.paragraphs.map((paragraph, pIndex) => (
          <p
            key={pIndex}
            className={`text-lg md:text-xl mb-6 last:mb-0 [&_strong]:font-medium ${dlc}`}
            style={{ fontFamily: '"Romie", serif', color: zone.text, fontWeight: 300, lineHeight: 1.8 }}
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        ))}
      </div>
    )
  }

  const renderSection = (section: ContentSection, zone: ZoneColors) => {
    const layout = section.layout || 'standard-alternating'
    switch (layout) {
      case 'overlap-card-inverted':
        return renderOverlapCardInverted(section)
      case 'statement-split':
        return renderStatementSplit(section, zone)
      case 'steps-timeline':
        return renderStepsTimeline(section, zone)
      default: {
        const hasImage = !!section.imagePath
        const imageFirst = hasImage
          ? section.imagePosition
            ? section.imagePosition === 'left'
            : imageIndex++ % 2 === 0
          : false
        return renderStandardAlternating(section, zone, imageFirst)
      }
    }
  }

  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Marie Feutrier" />
        <link rel="canonical" href="https://headshotsbymarie.com/tempe-headshots/" />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description} />
        <meta property="og:image" content={`https://headshotsbymarie.com${frontmatter.heroImage}`} />
        <meta property="og:image:width" content="2400" />
        <meta property="og:image:height" content="1600" />
        <meta property="og:image:alt" content={frontmatter.heroImageAlt} />
        <meta property="og:url" content="https://headshotsbymarie.com/tempe-headshots/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Headshots by Marie" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta name="twitter:description" content={frontmatter.description} />
        <meta name="twitter:image" content={`https://headshotsbymarie.com${frontmatter.heroImage}`} />
        <meta name="twitter:site" content="@headshotsbymarie" />
        <meta name="twitter:creator" content="@headshotsbymarie" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateServiceSchema({
              name: 'Professional Headshot Photography in Tempe',
              description: frontmatter.description,
              url: '/tempe-headshots/',
              image: frontmatter.heroImage
            }))
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
              aggregateRating: generateAggregateRating(),
              review: frontmatter.testimonials.map(testimonial => ({
                '@type': 'Review',
                reviewBody: testimonial.quote,
                datePublished: testimonial.datePublished || '2026-01-01',
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
              { name: 'Tempe Headshots', url: '/tempe-headshots/' }
            ]))
          }}
        />
      </Head>

      <StickyNavigation bookLink="/pricing" />

      <ServiceHero
        heroImage={frontmatter.heroImage}
        heroImageAlt={frontmatter.heroImageAlt}
        pageTitle={frontmatter.heroTitle}
        textColor="light"
        textAlign="left"
      />

      {/* Disambiguation Links */}
      <div className="bg-white px-8 py-6">
        <div className="max-w-6xl mx-auto">
          <p
            className="text-base"
            style={{ fontFamily: '"Romie", serif', color: '#888', fontWeight: 300 }}
          >
            Looking for{' '}
            <Link href="/corporate-headshots/" className="underline underline-offset-4 hover:text-black transition-colors">
              corporate headshots in Phoenix
            </Link>
            {' '}or{' '}
            <Link href="/team-photography/" className="underline underline-offset-4 hover:text-black transition-colors">
              team headshots
            </Link>
            ?
          </p>
        </div>
      </div>

      {/* 3-Image Header Grid */}
      <section>
        <h2
          className="text-3xl font-light text-center py-12"
          style={{ fontFamily: '"Romie", serif', color: '#1C1C1C', fontWeight: 300,  letterSpacing: '0.05em' }}
        >
          {frontmatter.headerTitle}
        </h2>
        <div className="w-full md:w-[75%] mx-auto">
          <div className="grid grid-cols-3 gap-0">
            {frontmatter.headerImages.map((image, index) => (
              <div key={index} data-reveal data-reveal-direction="none" data-reveal-delay={String(index * 200)}>
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
      <section className="pt-16 pb-1 bg-white">
        <div className="w-full px-6 lg:px-0">
          <div className="lg:w-[40%] lg:ml-[2vh]" data-reveal>
          {frontmatter.introText.map((paragraph, index) => (
            <p
              key={index}
              className="text-base lg:text-[0.95rem] last:mb-0"
              style={{ fontFamily: '"Romie", serif', color: '#1C1C1C', fontWeight: 300, lineHeight: 1.75 }}
            >
              {paragraph}
            </p>
          ))}
          </div>
        </div>
      </section>

      {/* Content Sections before testimonial 1 */}
      {frontmatter.sections.slice(0, frontmatter.testimonial1Position).map((section, sectionIndex) => {
        const zone = getZoneColors(sectionIndex)

        if (section.layout === 'sticky-split-secondary') {
          return null
        }

        if (section.layout === 'sticky-split') {
          const nextSection = frontmatter.sections[sectionIndex + 1]
          const imageBlocks = [
            {
              src: frontmatter.featureImage.src,
              alt: frontmatter.featureImage.alt,
              paragraphs: section.paragraphs
            },
            ...(nextSection ? [{
              src: nextSection.imagePath || '',
              alt: nextSection.imageAlt || '',
              title: nextSection.title,
              paragraphs: nextSection.paragraphs,
              textColor: '#F5F0EB'
            }] : [])
          ]

          return (
            <StickyImageWithText
              key={sectionIndex}
              background={zone.bg}
              textColor={zone.text}
              images={imageBlocks}
              stickyContent={
                <>
                  {section.title && (
                    <h2 style={{
                      fontFamily: '"Romie", serif',
                      fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                      fontWeight: 300,
                      
                      letterSpacing: '0.03em',
                      lineHeight: 0.95,
                      color: zone.text,
                      marginBottom: '2.5rem'
                    }}>
                      {section.title}
                    </h2>
                  )}
                  <Link
                    href="/pricing/"
                    className="inline-block text-white text-lg font-medium hover:opacity-90 transition-all duration-300 px-8 py-3"
                    style={{ fontFamily: '"Romie", serif', backgroundColor: '#D4A843' }}
                    onClick={() => trackButtonClick('Book Today', 'service_body_cta', '/pricing')}
                  >
                    Book Today
                  </Link>
                </>
              }
            />
          )
        }

        return (
          <section key={sectionIndex} className="py-10" style={{ background: zone.bg }}>
            {renderSection(section, zone)}
          </section>
        )
      })}

      {/* Testimonial 1 with Parallax */}
      <TestimonialWithParallax
        quote={[frontmatter.testimonials[0].quote]}
        author={frontmatter.testimonials[0].author}
        rating={5}
        source="Google Review"
        textWidth="75vw"
        parallaxImages={frontmatter.parallaxImages}
      >
        {/* Remaining sections from testimonial1Position onward */}
        {frontmatter.sections.slice(frontmatter.testimonial1Position).map((section, i) => {
          const sectionIndex = i + frontmatter.testimonial1Position
          const zone = getZoneColors(sectionIndex)

          return (
            <div key={sectionIndex}>
              {/* Insert Testimonial 2 */}
              {sectionIndex === frontmatter.testimonial2Position && (
                <section style={{ backgroundColor: '#F5F5F5', borderTop: '4px solid #D4A843' }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 md:min-h-[500px]">
                    <div className="flex items-center justify-center p-8 md:p-12 relative">
                      <div className="max-w-lg text-center">
                        <blockquote
                          className="text-2xl md:text-3xl mb-8"
                          style={{
                            fontFamily: '"Romie", serif',
                            color: '#1C1C1C',
                            fontWeight: 300,
                            textTransform: 'uppercase',
                            letterSpacing: '0.02em',
                            lineHeight: 1.3
                          }}
                        >
                          {frontmatter.testimonials[1].quote}
                        </blockquote>
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
                          — {frontmatter.testimonials[1].author}
                        </cite>
                      </div>
                    </div>
                    {frontmatter.testimonials[1].imagePath && (
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
                    )}
                  </div>
                </section>
              )}

              {/* Insert 5-Image Row */}
              {sectionIndex === frontmatter.imageRowPosition && (
                <section className="py-8" style={{ backgroundColor: '#1C1C1C' }}>
                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-0">
                    {frontmatter.imageRow.map((image, index) => (
                      <div key={index} data-reveal data-reveal-direction="none" data-reveal-delay={String(index * 150)} className={`relative aspect-square lg:aspect-[4/5] overflow-hidden ${index === 2 ? 'hidden lg:block' : ''}`}>
                        <picture>
                          <source media="(max-width: 768px)" srcSet={getMobileSrc(image.src)} />
                          <img
                            src={image.src}
                            alt={image.alt}
                            className={`absolute inset-0 w-full h-full object-cover ${index === 1 || index === 3 ? 'object-bottom' : 'object-top'}`}
                            loading="lazy"
                          />
                        </picture>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section className="py-10" style={{ background: zone.bg }}>
                {renderSection(section, zone)}
              </section>
            </div>
          )
        })}

        {/* CTA Section */}
        <section className="py-16" style={{ background: 'linear-gradient(180deg, #F5F0EB, #FFFFFF)' }}>
          <div className="max-w-3xl mx-auto px-8 text-center" data-reveal>
            <h2
              className="text-3xl font-light mb-8"
              style={{ fontFamily: '"Romie", serif', color: '#1C1C1C', fontWeight: 300,  letterSpacing: '0.05em' }}
            >
              {frontmatter.ctaTitle}
            </h2>
            {frontmatter.ctaText.map((paragraph, index) => (
              <p
                key={index}
                className="text-lg md:text-xl mb-6"
                style={{ fontFamily: '"Romie", serif', color: '#1C1C1C', fontWeight: 300, lineHeight: 1.8 }}
              >
                {paragraph}
              </p>
            ))}
            <div className="mt-8">
              <Link
                href="/pricing/"
                className="inline-block text-white text-lg font-medium hover:opacity-90 transition-all duration-300 px-8 py-3"
                style={{ fontFamily: '"Romie", serif', backgroundColor: '#D4A843' }}
                onClick={() => trackButtonClick('Book Your Session', 'service_closing_cta', '/pricing')}
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

        <Footer />
        <MobileBottomNav />
      </TestimonialWithParallax>
    </>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content', 'tempe-headshots.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  return { props: { frontmatter: data, content } }
}
