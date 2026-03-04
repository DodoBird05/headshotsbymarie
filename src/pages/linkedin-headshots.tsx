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

interface LinkedInHeadshotsProps {
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
    parallaxImage: {
      src: string
      alt: string
    }
    testimonials: {
      quote: string
      author: string
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

export default function LinkedInHeadshotsPage({ frontmatter, content }: LinkedInHeadshotsProps) {
  useScrollReveal()
  let imageIndex = 0

  // Smooth gradient: white → dark reaching the parallax, then solid dark, then dark → white
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

  const darkLinkClass = (zone: ZoneColors) => zone.isDark ? '[&_a]:text-[#F5F0EB] [&_a]:underline' : ''

  // --- Layout: overlap-card-inverted ---
  const renderOverlapCardInverted = (section: ContentSection, zone: ZoneColors) => (
    <div className="max-w-5xl mx-auto px-8">
      <div className="relative lg:flex lg:justify-end">
        {section.imagePath && (
          <div className="lg:w-[65%]" data-reveal>
            <picture>
              <source media="(max-width: 768px)" srcSet={getMobileSrc(section.imagePath)} />
              <img
                src={section.imagePath}
                alt={section.imageAlt}
                className="w-full object-cover"
                style={{ aspectRatio: '3/4' }}
                loading="lazy"
              />
            </picture>
          </div>
        )}
        <div
          className="mt-6 lg:mt-0 lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:max-w-lg p-6 lg:p-10"
          data-reveal data-reveal-direction="left" data-reveal-delay="300"
          style={{
            backgroundColor: 'rgba(42,42,42,0.95)',
            backdropFilter: 'blur(4px)',
            border: '1px solid #3A3A3A',
            left: '-10%'
          }}
        >
          {section.title && (
            <h2
              className="text-2xl lg:text-3xl font-light mb-6"
              style={{ fontFamily: '"Majesti Banner", serif', color: '#F5F0EB', fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.05em' }}
            >
              {section.title}
            </h2>
          )}
          {section.paragraphs.map((paragraph, pIndex) => (
            <p
              key={pIndex}
              className="text-base mb-4 last:mb-0 [&_a]:text-[#F5F0EB] [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:opacity-70 [&_a]:transition-opacity"
              style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#F5F0EB', fontWeight: 300, lineHeight: 1.7 }}
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
        </div>
      </div>
    </div>
  )

  // --- Layout: pull-quote ---
  const renderPullQuote = (section: ContentSection, zone: ZoneColors) => {
    const pullQuote = section.paragraphs[0]
    const remainingParagraphs = section.paragraphs.slice(1)

    return (
      <div className="max-w-6xl mx-auto px-8">
        {/* Pull quote */}
        <blockquote
          className="text-xl md:text-2xl lg:text-3xl mb-12 max-w-4xl pl-6"
          data-reveal data-reveal-direction="left"
          style={{
            fontFamily: '"Majesti Banner", serif',
            color: zone.text,
            fontWeight: 300,
            lineHeight: 1.3,
            borderLeft: '3px solid #D4A843',
            textTransform: 'uppercase',
            letterSpacing: '0.02em'
          }}
          dangerouslySetInnerHTML={{ __html: pullQuote }}
        />
        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[55%_40%] gap-8 items-start">
          {section.imagePath && (
            <div data-reveal data-reveal-delay="200">
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
          <div className="space-y-6" data-reveal data-reveal-delay="400">
            {section.title && (
              <h2
                className="text-2xl lg:text-3xl font-light"
                style={{ fontFamily: '"Majesti Banner", serif', color: zone.text, fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.05em' }}
              >
                {section.title}
              </h2>
            )}
            {remainingParagraphs.map((paragraph, pIndex) => (
              <p
                key={pIndex}
                className={`text-base lg:text-lg ${darkLinkClass(zone)}`}
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: zone.text, fontWeight: 300, lineHeight: 1.7 }}
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // --- Layout: steps-timeline ---
  const renderStepsTimeline = (section: ContentSection, zone: ZoneColors) => {
    const introParagraphs: string[] = []
    const steps: { heading: string; body: string }[] = []
    const outroParagraphs: string[] = []
    let foundStep = false
    let stepsEnded = false

    for (const paragraph of section.paragraphs) {
      const h3Match = paragraph.match(/<h3>(.*?)<\/h3>([\s\S]*)$/)
      if (h3Match) {
        foundStep = true
        steps.push({ heading: h3Match[1], body: h3Match[2].trim() })
      } else if (!foundStep) {
        introParagraphs.push(paragraph)
      } else {
        stepsEnded = true
        outroParagraphs.push(paragraph)
      }
    }

    return (
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12">
          {/* Image column */}
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
          {/* Steps column */}
          <div>
            {section.title && (
              <h2
                className="text-2xl lg:text-3xl font-light mb-8"
                style={{ fontFamily: '"Majesti Banner", serif', color: zone.text, fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.05em' }}
              >
                {section.title}
              </h2>
            )}
            {introParagraphs.map((paragraph, pIndex) => (
              <p
                key={`intro-${pIndex}`}
                className={`text-lg mb-8 ${darkLinkClass(zone)}`}
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: zone.text, fontWeight: 300, lineHeight: 1.7 }}
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
            {/* Timeline */}
            <div className="relative pl-8" style={{ borderLeft: '2px solid #D4A843' }}>
              {steps.map((step, stepIndex) => (
                <div key={stepIndex} data-reveal data-reveal-delay={String(stepIndex * 150)} className={stepIndex < steps.length - 1 ? 'mb-10' : ''} style={{ position: 'relative' }}>
                  {/* Gold dot */}
                  <div
                    className="absolute w-4 h-4 rounded-full"
                    style={{ backgroundColor: '#D4A843', left: '-1.15rem', top: '0.25rem' }}
                  />
                  <h3
                    className="text-lg lg:text-xl font-medium mb-2"
                    style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: zone.text }}
                  >
                    {step.heading}
                  </h3>
                  <p
                    className={`text-base ${darkLinkClass(zone)}`}
                    style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: zone.text, fontWeight: 300, lineHeight: 1.7 }}
                    dangerouslySetInnerHTML={{ __html: step.body }}
                  />
                </div>
              ))}
            </div>
            {outroParagraphs.map((paragraph, pIndex) => (
              <p
                key={`outro-${pIndex}`}
                className={`text-lg mt-8 ${darkLinkClass(zone)}`}
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: zone.text, fontWeight: 300, lineHeight: 1.7 }}
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // --- Layout: text-emphasis ---
  const renderTextEmphasis = (section: ContentSection, zone: ZoneColors) => (
    <div className="max-w-3xl mx-auto px-8" data-reveal>
      {section.title && (
        <h2
          className="text-3xl font-light mb-8"
          style={{ fontFamily: '"Majesti Banner", serif', color: zone.text, fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.05em' }}
        >
          {section.title}
        </h2>
      )}
      {section.paragraphs.map((paragraph, pIndex) => (
        <p
          key={pIndex}
          className={`${pIndex === 0 ? 'text-2xl md:text-3xl mb-8' : 'text-lg md:text-xl mb-6 last:mb-0'} ${darkLinkClass(zone)}`}
          style={{
            fontFamily: pIndex === 0 ? '"Majesti Banner", serif' : '"Hanken Grotesk", sans-serif',
            color: zone.text,
            fontWeight: 300,
            lineHeight: pIndex === 0 ? 1.3 : 1.8,
            textTransform: pIndex === 0 ? 'uppercase' as const : undefined,
            letterSpacing: pIndex === 0 ? '0.02em' : undefined
          }}
          dangerouslySetInnerHTML={{ __html: paragraph }}
        />
      ))}
    </div>
  )

  // --- Layout: statement-split ---
  const renderStatementSplit = (section: ContentSection, zone: ZoneColors) => {
    const dlc = darkLinkClass(zone)
    return (
      <div className="max-w-6xl mx-auto px-8">
        {/* Pull line as large statement */}
        {section.pullLine && (
          <p
            data-reveal
            className="text-2xl md:text-4xl mb-12 max-w-4xl"
            style={{
              fontFamily: '"Majesti Banner", serif',
              color: zone.text,
              fontWeight: 300,
              lineHeight: 1.2,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.02em'
            }}
          >
            {section.pullLine}
          </p>
        )}
        {/* Image + text side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {section.imagePath && (
            <div data-reveal data-reveal-delay="200">
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
          <div className="space-y-6" data-reveal data-reveal-delay="400">
            {section.title && (
              <h2
                className="text-2xl lg:text-3xl font-light"
                style={{ fontFamily: '"Majesti Banner", serif', color: zone.text, fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.05em' }}
              >
                {section.title}
              </h2>
            )}
            {section.paragraphs.map((paragraph, pIndex) => (
              <p
                key={pIndex}
                className={`text-base lg:text-lg ${dlc}`}
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: zone.text, fontWeight: 300, lineHeight: 1.7 }}
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // --- Layout: standard-alternating ---
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
                  style={{ fontFamily: '"Majesti Banner", serif', color: zone.text, fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.05em' }}
                >
                  {section.title}
                </h2>
              )}
              {section.paragraphs.map((paragraph, pIndex) =>
                paragraph.includes('<h3>') ? (
                  <div
                    key={pIndex}
                    className={`text-lg [&_h3]:text-xl [&_h3]:font-medium [&_h3]:mb-2 ${dlc} ${zone.isDark ? '[&_h3]:!text-[#F5F0EB]' : ''}`}
                    style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: zone.text, fontWeight: 300 }}
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  />
                ) : (
                  <p
                    key={pIndex}
                    className={`text-lg [&_strong]:font-medium ${dlc}`}
                    style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: zone.text, fontWeight: 300 }}
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
            style={{ fontFamily: '"Majesti Banner", serif', color: zone.text, fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.05em' }}
          >
            {section.title}
          </h2>
        )}
        {section.paragraphs.map((paragraph, pIndex) => (
          <p
            key={pIndex}
            className={`text-lg md:text-xl mb-6 last:mb-0 [&_strong]:font-medium ${dlc}`}
            style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: zone.text, fontWeight: 300, lineHeight: 1.8 }}
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        ))}
      </div>
    )
  }

  // --- Section dispatcher ---
  const renderSection = (section: ContentSection, zone: ZoneColors) => {
    const layout = section.layout || 'standard-alternating'
    switch (layout) {
      case 'overlap-card-inverted':
        return renderOverlapCardInverted(section, zone)
      case 'pull-quote':
        return renderPullQuote(section, zone)
      case 'statement-split':
        return renderStatementSplit(section, zone)
      case 'steps-timeline':
        return renderStepsTimeline(section, zone)
      case 'text-emphasis':
        return renderTextEmphasis(section, zone)
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
        <link rel="canonical" href="https://headshotsbymarie.com/linkedin-headshots" />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description} />
        <meta property="og:image" content={`https://headshotsbymarie.com${frontmatter.heroImage}`} />
        <meta property="og:image:width" content="2400" />
        <meta property="og:image:height" content="1600" />
        <meta property="og:image:alt" content={frontmatter.heroImageAlt} />
        <meta property="og:url" content="https://headshotsbymarie.com/linkedin-headshots" />
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
              name: 'LinkedIn Headshot Photography',
              description: frontmatter.description,
              url: '/linkedin-headshots',
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
              aggregateRating: generateAggregateRating('83')
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
              { name: 'LinkedIn Headshots', url: '/linkedin-headshots' }
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
                datePublished: '2025-01-15',
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
                  '@id': `${seoConfig.siteUrl}/#business`,
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
        pageTitle={frontmatter.heroTitle}
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
            <Link href="/personal-branding" className="underline underline-offset-4 hover:text-black transition-colors">
              personal branding
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
              style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 300, lineHeight: 1.75 }}
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

        // Skip sticky-split-secondary — it's combined into the sticky-split block above
        if (section.layout === 'sticky-split-secondary') {
          return null
        }

        if (section.layout === 'sticky-split') {
          // Grab the next section (sticky-split-secondary) to combine into the right column
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
                      fontFamily: '"Majesti Banner", serif',
                      fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                      fontWeight: 300,
                      textTransform: 'uppercase' as const,
                      letterSpacing: '0.03em',
                      lineHeight: 0.95,
                      color: zone.text,
                      marginBottom: '2.5rem'
                    }}>
                      {section.title}
                    </h2>
                  )}
                  <Link
                    href="/pricing"
                    className="inline-block text-white text-lg font-medium hover:opacity-90 transition-all duration-300 px-8 py-3"
                    style={{ fontFamily: '"Hanken Grotesk", sans-serif', backgroundColor: '#D4A843' }}
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

      {/* Testimonial 1 with Parallax — everything after slides up over it */}
      <TestimonialWithParallax
        quote={[frontmatter.testimonials[0].quote]}
        author={frontmatter.testimonials[0].author}
        rating={5}
        source="Google Review"
        textWidth="75vw"
        parallaxImages={[frontmatter.parallaxImage]}
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
        <section className="py-16" style={{ background: 'linear-gradient(180deg, #B8B3AE, #FFFFFF)' }}>
          <div className="max-w-3xl mx-auto px-8 text-center" data-reveal>
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
  const filePath = path.join(process.cwd(), 'content', 'linkedin-headshots.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  return { props: { frontmatter: data, content } }
}
