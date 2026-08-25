import { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { getMobileSrc } from '@/lib/responsiveImage'
import Footer from '@/components/Footer'
import MobileBottomNav from '@/components/MobileBottomNav'
import StickyNavigation from '@/components/StickyNavigation'
import StickyImageWithText from '@/components/StickyImageWithText'
import AnimatedFAQ from '@/components/AnimatedFAQ'
import TestimonialWithParallax from '@/components/TestimonialWithParallax'
import { generateServiceSchema, generatePersonSchema, generateAggregateRating, generateBreadcrumbSchema, seoConfig } from '@/lib/seoConfig'
import useScrollReveal from '@/hooks/useScrollReveal'
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

export interface LocationFrontmatter {
  title: string
  description: string
  heroTitle?: string
  heroImage: string
  heroImageAlt: string
  // 'split' (default) = h1 left / image right on a dark band.
  // 'fullbleed' = homepage-style 100vh image with kicker + h1 overlaid at the bottom.
  heroLayout?: 'split' | 'fullbleed'
  // Small uppercase brand line above the h1 (fullbleed only), e.g. "Headshots by Marie".
  heroKicker?: string
  // One-line positioning statement under the h1 in the full-bleed hero's dark band.
  heroSubtitle?: string
  // Portrait-crop hero used on mobile only (fullbleed only). Falls back to heroImage.
  heroImageMobile?: string
  // Desktop-only gold treatment for the hero h1. Mobile stays white for
  // contrast against the portrait crop.
  // Colour of the kicker above the h1. Defaults to white; set it when the hero
  // image is light enough that white disappears.
  // Set when the hero image is light: the nav logo and menu render dark over it.
  heroLightNav?: boolean
  headerTitle?: string
  headerHeading?: string
  splitTitle?: string
  grid1Title?: string
  grid1?: string[]
  grid2Title?: string
  grid2?: string[]
  grid3Title?: string
  grid3?: string[]
  headerImages: { src: string; alt: string }[]
  introText: string[]
  featureImage?: { src: string; alt: string }
  fullBleedImage?: { src: string; alt: string }
  carouselImages?: { src: string; alt: string }[]
  sections: ContentSection[]
  imageRowPosition: number
  imageRow2Position?: number
  testimonial1Position: number
  testimonial2Position: number
  ctaTitle: string
  ctaText: string[]
  imageRow: { src: string; alt: string }[]
  imageRow2?: { src: string; alt: string }[]
  parallaxImages?: { src: string; alt: string }[]
  testimonials: {
    quote: string
    author: string
    datePublished?: string
    imagePath: string
    imageAlt: string
  }[]
  faq: { question: string; answer: string }[]
  statementSubtitle?: string
  statementQuote?: string
  splitParagraphHeading?: string
}

interface LocationPageProps {
  slug: string
  frontmatter: LocationFrontmatter
}

export default function LocationPageTemplate({ slug, frontmatter }: LocationPageProps) {
  useScrollReveal()
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [expandedImage, setExpandedImage] = useState<{ src: string; alt: string } | null>(null)

  const mobileExpandable = (src: string, alt: string) => ({
    onClick: () => {
      if (window.innerWidth < 768) setExpandedImage({ src, alt })
    },
    style: { cursor: 'pointer' } as React.CSSProperties
  })
  const heading = frontmatter.headerTitle || frontmatter.headerHeading || ''

  // Split hero title into lines for stacked display, preserving HTML tags
  const heroTitle = frontmatter.heroTitle || frontmatter.title
  const heroWords = heroTitle.replace(/<[^>]*>/g, (match) => `\u200B${match}\u200B`).split(' ').reduce((acc: string[], word) => {
    if (word.includes('\u200B')) {
      const last = acc.length > 0 ? acc[acc.length - 1] : ''
      if (last && (last.includes('<em>') && !last.includes('</em>'))) {
        acc[acc.length - 1] = (last + ' ' + word).replace(/\u200B/g, '')
      } else {
        acc.push(word.replace(/\u200B/g, ''))
      }
    } else {
      acc.push(word)
    }
    return acc
  }, [] as string[])

  const isFullBleedHero = frontmatter.heroLayout === 'fullbleed'
  const heroMobileImage = frontmatter.heroImageMobile || frontmatter.heroImage

  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Marie Feutrier" />
        <link rel="canonical" href={`https://headshotsbymarie.com/${slug}/`} />
        {/* Hero is the LCP element on the fullbleed layout — preload the exact file
            each breakpoint renders, so the preload never fetches the wrong variant. */}
        {isFullBleedHero && (
          <>
            <link
              rel="preload"
              href={getMobileSrc(heroMobileImage)}
              as="image"
              type="image/webp"
              media="(max-width: 768px)"
            />
            <link
              rel="preload"
              href={frontmatter.heroImage}
              as="image"
              type="image/webp"
              media="(min-width: 769px)"
            />
          </>
        )}
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description} />
        <meta property="og:image" content={`https://headshotsbymarie.com${frontmatter.heroImage}`} />
        <meta property="og:image:width" content="2400" />
        <meta property="og:image:height" content="1600" />
        <meta property="og:image:alt" content={frontmatter.heroImageAlt} />
        <meta property="og:url" content={`https://headshotsbymarie.com/${slug}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Headshots by Marie" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta name="twitter:description" content={frontmatter.description} />
        <meta name="twitter:image" content={`https://headshotsbymarie.com${frontmatter.heroImage}`} />
        <meta name="twitter:site" content="@headshotsbymarie" />
        <meta name="twitter:creator" content="@headshotsbymarie" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateServiceSchema({ name: `Professional Headshot Photography in ${heading.replace('Professional Headshots for ', '').replace('Professional Headshot Photography Near ', '').replace('Professional Portraits', '')}`, description: frontmatter.description, url: `/${slug}/`, image: frontmatter.heroImage })) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generatePersonSchema()) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'LocalBusiness', '@id': `${seoConfig.siteUrl}/#business`, name: seoConfig.businessName, aggregateRating: generateAggregateRating(), review: frontmatter.testimonials.map(t => ({ '@type': 'Review', reviewBody: t.quote, datePublished: t.datePublished || '2026-01-01', author: { '@type': 'Person', name: t.author }, reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' } })) }) }} />
        {frontmatter.faq?.length > 0 && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: frontmatter.faq.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer.replace(/<[^>]*>/g, '') } })) }) }} />
        )}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema([{ name: heading, url: `/${slug}/` }])) }} />
      </Head>

      <StickyNavigation bookLink="/pricing" lightHero={frontmatter.heroLightNav} />

      {/* ===== 1. HERO ===== */}
      {isFullBleedHero ? (
      <section style={{ backgroundColor: '#F5F0EB' }}>
        {/* Homepage-style hero: the image carries no text at all. Mobile and desktop
            share one <picture>, so the correct file is chosen on first paint with no
            layout swap. */}
        <div className="relative w-full" style={{ height: '100vh' }}>
          <picture>
            <source media="(max-width: 768px)" srcSet={getMobileSrc(heroMobileImage)} />
            <img
              src={frontmatter.heroImage}
              alt={frontmatter.heroImageAlt}
              className="absolute inset-0 w-full h-full object-cover"
              fetchPriority="high"
            />
          </picture>
        </div>
        {/* Kicker and message sit on the warm white band below the image, so the photo
            reads as a clean full bleed. The kicker carries the h1: this hero shows
            no large title, and the page still needs exactly one h1 for SEO. */}
        <div className="relative overflow-hidden px-8 md:px-16 py-16 md:py-20 text-center">
          {/* Gold line, same hairline stroke as the homepage's warm white section.
              Sized for a short band: one horizontal sweep rather than the tall
              serpentine, which would compress into a zigzag at this height. */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1200 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1180 10 C960 130 760 40 540 150 C360 240 200 190 20 300" stroke="#D4A843" strokeWidth="1" fill="none" />
          </svg>
          <div className="relative" style={{ zIndex: 1 }}>
          {frontmatter.heroKicker && (
            <h1
              style={{
                fontFamily: '"Hanken Grotesk", sans-serif',
                fontWeight: 300,
                fontSize: '0.85rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#1C1C1C',
                marginBottom: '2rem'
              }}
            >
              {frontmatter.heroKicker}
            </h1>
          )}
          {frontmatter.heroSubtitle && (
            /* Same treatment as the homepage statement: Majesti Banner, uppercase,
               <em> for the italic accent. Line breaks come from the markdown.
               ss01 is Majesti Banner's contextual swash set for capitals: it adds
               a flourish only where one fits, so it is safe on any hero line. */
            <p
              className="[&_em]:italic"
              style={{
                fontFamily: '"Majesti Banner", serif',
                fontWeight: 300,
                color: '#1C1C1C',
                lineHeight: 1.2,
                fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
                textTransform: 'uppercase',
                letterSpacing: '0.02em',
                fontFeatureSettings: '"ss01" 1',
                margin: 0
              }}
              dangerouslySetInnerHTML={{ __html: frontmatter.heroSubtitle }}
            />
          )}
          </div>
        </div>
      </section>
      ) : (
      <section style={{ backgroundColor: '#1C1C1C', minHeight: '100vh' }}>
        {/* Desktop: h1 left + image right */}
        <div className="hidden md:block relative" style={{ minHeight: '80vh' }}>
          <div className="absolute left-0 top-0 bottom-0 w-[50%] flex items-end justify-center -mb-32" style={{ zIndex: 10 }}>
            <div className="w-min">
              <h1
                data-reveal
                className="whitespace-nowrap"
                style={{
                  fontFamily: '"Majesti Banner", serif',
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  fontWeight: 300,
                  textTransform: 'uppercase',
                  letterSpacing: '0.03em',
                  lineHeight: 1,
                  color: '#F5F0EB'
                }}
              >
                {heroWords.map((word, i) => (
                  <span key={i} className="block" dangerouslySetInnerHTML={{ __html: word }} />
                ))}
              </h1>
              <p
                className="mt-8 text-base"
                data-reveal data-reveal-delay="200"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#999', fontWeight: 300, lineHeight: 1.7 }}
              >
                {frontmatter.introText[0]}
              </p>
            </div>
          </div>
          <div className="absolute left-[50%] right-16 top-[30vh]" style={{ zIndex: 10, marginBottom: '-5vh' }}>
            <div className="relative overflow-hidden" style={{ aspectRatio: '4/5', height: '80vh' }}>
              <img
                src={frontmatter.heroImage}
                alt={frontmatter.heroImageAlt}
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
        {/* Mobile: image first, then heading */}
        <div className="md:hidden">
          <div className="relative min-h-[60vh]">
            <picture>
              <source media="(max-width: 768px)" srcSet={getMobileSrc(frontmatter.heroImage)} />
              <img
                src={frontmatter.heroImage}
                alt={frontmatter.heroImageAlt}
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
            </picture>
          </div>
          <div className="px-8 py-12">
            <p
              className="mb-6"
              style={{
                fontFamily: '"Majesti Banner", serif',
                fontSize: '2.5rem',
                fontWeight: 300,
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
                lineHeight: 1,
                color: '#F5F0EB'
              }}
            >
              {heroWords.map((word, i) => (
                <span key={i} className="block" dangerouslySetInnerHTML={{ __html: word }} />
              ))}
            </p>
            <p
              className="text-base"
              style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#999', fontWeight: 300, lineHeight: 1.7 }}
            >
              {frontmatter.introText[0]}
            </p>
          </div>
        </div>
      </section>
      )}

      {/* ===== 2. SCATTERED EDITORIAL SECTIONS ===== */}
      {(() => {
        const editorialSections = frontmatter.sections
          .filter(s => s.layout !== 'sticky-split' && s.layout !== 'sticky-split-secondary' && s.layout !== 'steps-timeline')
        const firstHalf = editorialSections.slice(0, 4)
        const secondHalf = editorialSections.slice(4)

        const renderEditorialItem = (section: ContentSection, i: number, dark = false) => {
              const textColor = dark ? '#F5F0EB' : '#1C1C1C'
              const subTextColor = dark ? '#999' : '#555'
              const positions: { img: string; text: string; textBefore: boolean; slideDir?: string; sideBySide?: boolean; mt?: string }[] = [
                { img: 'md:w-[40%] md:ml-[5%]', text: 'md:ml-[5%] md:mt-4', textBefore: false, slideDir: 'left' },
                { img: 'md:w-[35%] md:ml-[55%]', text: 'md:ml-[55%] md:max-w-[35%] md:mb-4', textBefore: true, slideDir: 'right' },
                { img: 'md:w-[38%] md:ml-[10%]', text: 'md:ml-[10%] md:mb-4', textBefore: true, slideDir: 'left' },
                { img: 'md:w-[55%] md:ml-[15%]', text: '', textBefore: false, sideBySide: true, slideDir: 'up' },
                { img: 'md:w-[36%] md:ml-[25%]', text: 'md:ml-[25%] md:mt-4', textBefore: false },
                { img: 'md:w-[40%] md:ml-[45%]', text: 'md:ml-[5%] md:mt-[-12%]', textBefore: false }
              ]
              const pos = positions[i % positions.length]

              if (!section.imagePath) {
                return (
                  <div key={i} className={`py-8 md:py-12 ${pos.text} md:max-w-sm`} data-reveal>
                    {section.pullLine && (
                      <blockquote className="text-xl md:text-2xl mb-4 pl-5" style={{ fontFamily: '"Majesti Banner", serif', color: textColor, fontWeight: 300, lineHeight: 1.3, borderLeft: '2px solid #D4A843', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                        {section.pullLine}
                      </blockquote>
                    )}
                    {section.title && !section.pullLine && (
                      <h2 className="text-sm md:text-base mb-3 font-medium" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: textColor, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {section.title}
                      </h2>
                    )}
                    {section.paragraphs.slice(0, 2).map((p, pi) => (
                      <p key={pi} className="text-sm mb-2 last:mb-0 [&_a]:underline" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: subTextColor, fontWeight: 300, lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: p }} />
                    ))}
                  </div>
                )
              }

              const textBlock = (
                  <div className={`${pos.text} md:max-w-xs ${pos.textBefore ? 'md:mb-4' : 'md:mt-4'} mb-4 md:mb-0`}>
                    <h2 className="text-base md:text-lg mb-3" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: textColor, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      {section.title || section.pullLine || `0${i + 1}`}
                    </h2>
                    {section.paragraphs.slice(0, 1).map((p, pi) => (
                      <p key={pi} className="text-sm mb-2 last:mb-0 [&_a]:underline [&_strong]:font-medium" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: subTextColor, fontWeight: 300, lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: p }} />
                    ))}
                  </div>
              )

              if (pos.sideBySide) {
                return (
                  <div key={i} className="py-6 md:py-10 md:flex md:flex-row-reverse md:items-center md:gap-10 md:justify-center">
                    {/* Mobile: text first */}
                    <div className="md:hidden mb-4">
                      <h2 className="text-base mb-3" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: textColor, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        {section.title || section.pullLine || `0${i + 1}`}
                      </h2>
                      {section.paragraphs.slice(0, 1).map((p, pi) => (
                        <p key={pi} className="text-sm mb-2 last:mb-0 [&_a]:underline [&_strong]:font-medium" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: subTextColor, fontWeight: 300, lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: p }} />
                      ))}
                    </div>
                    <div className={`${pos.img} shrink-0`} data-reveal data-reveal-direction={pos.slideDir || 'up'}>
                      <picture>
                        <source media="(max-width: 768px)" srcSet={getMobileSrc(section.imagePath)} />
                        <img src={section.imagePath} alt={section.imageAlt || ''} className="w-full h-auto object-cover" loading="lazy" {...mobileExpandable(section.imagePath!, section.imageAlt || '')} />
                      </picture>
                    </div>
                    <div className="hidden md:block md:max-w-xs mt-4 md:mt-0">
                      <h2 className="text-base md:text-lg mb-3" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: textColor, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        {section.title || section.pullLine || `0${i + 1}`}
                      </h2>
                      {section.paragraphs.slice(0, 1).map((p, pi) => (
                        <p key={pi} className="text-sm mb-2 last:mb-0 [&_a]:underline [&_strong]:font-medium" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: subTextColor, fontWeight: 300, lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: p }} />
                      ))}
                    </div>
                  </div>
                )
              }

              return (
                <div key={i} className={`py-6 md:py-10 ${pos.textBefore ? 'md:mt-[-25%]' : ''}`}>
                  {/* Mobile: always text first. Desktop: controlled by textBefore */}
                  <div className="md:hidden">{textBlock}</div>
                  <div className="hidden md:block">{pos.textBefore && textBlock}</div>
                  <div className={`${pos.img}`} data-reveal data-reveal-direction={pos.slideDir || 'up'}>
                    <picture>
                      <source media="(max-width: 768px)" srcSet={getMobileSrc(section.imagePath)} />
                      <img src={section.imagePath} alt={section.imageAlt || ''} className="w-full h-auto object-cover" loading="lazy" />
                    </picture>
                  </div>
                  <div className="hidden md:block">{!pos.textBefore && textBlock}</div>
                </div>
              )
        }

        return (
          <>
            <section className="relative py-16 md:py-24 overflow-hidden" style={{ backgroundColor: '#F5F0EB' }}>
              {/* Two right-to-left sweeps, same shape as the hero band's line and
                  offset down the section. Both ends sit inside the section, so
                  neither reads as continuing into the sections above or below. */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1200 2000" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1180 260 C960 380 760 290 540 400 C360 490 200 440 20 550" stroke="#D4A843" strokeWidth="1" fill="none" />
                <path d="M1180 1300 C960 1420 760 1330 540 1440 C360 1530 200 1480 20 1590" stroke="#D4A843" strokeWidth="1" fill="none" />
              </svg>
              <div className="max-w-6xl mx-auto px-8 relative" style={{ zIndex: 1 }}>
                {firstHalf.map((s, i) => renderEditorialItem(s, i))}
              </div>
            </section>

            {/* Statement band */}
            <section className="py-20 md:py-28" style={{ backgroundColor: '#1C1C1C' }}>
              <div className="max-w-4xl mx-auto px-8 text-center" data-reveal>
                <h2
                  style={{
                    fontFamily: '"Majesti Banner", serif',
                    fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                    fontWeight: 300,
                    color: '#F5F0EB',
                    lineHeight: 0.9,
                    textTransform: 'uppercase',
                    letterSpacing: '0.03em'
                  }}
                >
                  Headshots
                </h2>
                <p
                  className="mt-4"
                  style={{
                    fontFamily: '"Hanken Grotesk", sans-serif',
                    fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)',
                    fontWeight: 300,
                    color: '#999',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase'
                  }}
                >
                  {frontmatter.statementSubtitle || `unlike other headshots in ${heading.replace(/Professional Headshots? (for|Photography Near|Near) /i, '')}`}
                </p>
              </div>

              {/* 3-Photo Carousel */}
              {(() => {
                const carouselImages = frontmatter.carouselImages || [...frontmatter.headerImages, ...frontmatter.imageRow]

                return (
                  <div className="mt-16 max-w-6xl mx-auto px-8">
                    <div className="flex items-center gap-4 md:gap-6 relative">
                      {/* Left arrow */}
                      <button
                        onClick={() => setCarouselIndex((carouselIndex - 1 + carouselImages.length) % carouselImages.length)}
                        className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full border border-[#444] hover:border-[#D4A843] hover:text-[#D4A843] transition-all duration-200"
                        style={{ zIndex: 5, color: '#F5F0EB', backgroundColor: 'rgba(28,28,28,0.5)' }}
                        aria-label="Previous image"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                      </button>
                      {/* Right arrow */}
                      <button
                        onClick={() => setCarouselIndex((carouselIndex + 1) % carouselImages.length)}
                        className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full border border-[#444] hover:border-[#D4A843] hover:text-[#D4A843] transition-all duration-200"
                        style={{ zIndex: 5, color: '#F5F0EB', backgroundColor: 'rgba(28,28,28,0.5)' }}
                        aria-label="Next image"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                      </button>
                      {[0, 1, 2].map((offset) => {
                        const imgIndex = (carouselIndex + offset) % carouselImages.length
                        const image = carouselImages[imgIndex]
                        const isCenter = offset === 1

                        return (
                          <div
                            key={offset}
                            className="overflow-hidden transition-all duration-500"
                            style={{
                              flex: isCenter ? '1.4' : '1.2',
                              aspectRatio: '4/5'
                            }}
                          >
                            <img
                              src={image.src}
                              alt={image.alt}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        )
                      })}
                    </div>

                    {/* Dot navigation */}
                    <div className="flex justify-center gap-3 mt-8">
                      {carouselImages.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCarouselIndex(i)}
                          aria-label={`Show image ${i + 1}`}
                          className="transition-all duration-300"
                          style={{
                            width: carouselIndex === i ? '10px' : '8px',
                            height: carouselIndex === i ? '10px' : '8px',
                            borderRadius: '50%',
                            backgroundColor: carouselIndex === i ? '#D4A843' : '#555',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )
              })()}
            </section>

            {/* Testimonial with Parallax — wraps all remaining content */}
            {frontmatter.parallaxImages && frontmatter.parallaxImages.length > 0 ? (
              <TestimonialWithParallax
                quote={[frontmatter.testimonials[0].quote]}
                author={frontmatter.testimonials[0].author}
                rating={5}
                source="Google Review"
                textWidth="75vw"
                parallaxImages={frontmatter.parallaxImages}
                theme="dark"
              >
                {/* Sticky Split — Meet Marie */}
                {(() => {
                  const stickySection = frontmatter.sections.find(s => s.layout === 'sticky-split')
                  const secondarySection = frontmatter.sections.find(s => s.layout === 'sticky-split-secondary')
                  if (!stickySection) return null

                  const imageBlocks = [
                    ...(frontmatter.featureImage ? [{
                      src: frontmatter.featureImage.src,
                      alt: frontmatter.featureImage.alt,
                      paragraphs: stickySection.paragraphs.slice(0, 1)
                    }] : []),
                    ...(secondarySection ? [{
                      src: secondarySection.imagePath || '',
                      alt: secondarySection.imageAlt || '',
                      title: secondarySection.title,
                      paragraphs: secondarySection.paragraphs.slice(0, 1),
                      textColor: '#1C1C1C'
                    }] : [])
                  ]

                  if (imageBlocks.length === 0) return null

                  return (
                    <StickyImageWithText
                      background="#F5F0EB"
                      textColor="#1C1C1C"
                      images={imageBlocks}
                      stickyContent={
                        <>
                          {stickySection.title && (
                            <h2 style={{ fontFamily: '"Majesti Banner", serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300, textTransform: 'uppercase' as const, letterSpacing: '0.03em', lineHeight: 1, color: '#1C1C1C', marginBottom: '2.5rem' }} dangerouslySetInnerHTML={{ __html: stickySection.title }} />
                          )}
                          <Link href="/pricing/" className="inline-block text-lg font-medium hover:bg-[#D4A843] hover:text-white hover:border-[#D4A843] transition-all duration-300 px-8 py-3 border rounded-full" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', borderColor: '#1C1C1C' }} onClick={() => trackButtonClick('See the Session', 'location_body_cta', '/pricing')}>
                            See the Session
                          </Link>
                        </>
                      }
                    />
                  )
                })()}

                {/* Image + text with overlapping title */}
                <section className="hidden md:block pt-24" style={{ backgroundColor: '#F5F0EB' }} />
                <section className="hidden md:flex relative" style={{ backgroundColor: '#F5F0EB' }}>
                  {/* Title positioned to overlap the top of the image */}
                  {frontmatter.splitTitle && (
                    <div className="absolute left-16 max-w-[50%]" style={{ zIndex: 5, top: '-2rem' }}>
                      <h2 data-reveal style={{
                        fontFamily: '"Majesti Banner", serif',
                        fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                        fontWeight: 300,
                        color: '#1C1C1C',
                        textTransform: 'uppercase',
                        letterSpacing: '0.03em',
                        lineHeight: 1.1
                      }} dangerouslySetInnerHTML={{ __html: frontmatter.splitTitle }} />
                    </div>
                  )}
                  {/* Image — left edge to 60% */}
                  <div className="w-[60%] shrink-0 overflow-hidden" data-reveal data-reveal-direction="left" style={{ aspectRatio: '5/4' }}>
                    <img src={frontmatter.imageRow[0].src} alt={frontmatter.imageRow[0].alt} className="w-full h-full object-cover" loading="lazy" {...mobileExpandable(frontmatter.imageRow[0].src, frontmatter.imageRow[0].alt)} />
                  </div>
                  {/* Text on the right */}
                  <div className="flex items-center px-16" style={{ width: '40%' }}>
                    <div data-reveal>
                      {frontmatter.splitParagraphHeading && (
                        <h3
                          className="mb-4"
                          style={{
                            fontFamily: '"Majesti Banner", serif',
                            fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                            fontWeight: 300,
                            color: '#1C1C1C',
                            textTransform: 'uppercase',
                            letterSpacing: '0.03em',
                            lineHeight: 1.1
                          }}
                          dangerouslySetInnerHTML={{ __html: frontmatter.splitParagraphHeading }}
                        />
                      )}
                      <p
                        style={{
                          fontFamily: '"Hanken Grotesk", sans-serif',
                          fontSize: '0.9rem',
                          fontWeight: 300,
                          color: '#555',
                          lineHeight: 1.7
                        }}
                      >
                        {frontmatter.introText[1] || frontmatter.introText[0]}
                      </p>
                    </div>
                  </div>
                </section>
                {/* Mobile: simple stack */}
                <section className="md:hidden" style={{ backgroundColor: '#1C1C1C' }}>
                  <div className="grid grid-cols-2 gap-0">
                    {frontmatter.imageRow.slice(0, 4).map((image, index) => (
                      <div key={index} className="relative aspect-square overflow-hidden">
                        <picture>
                          <source media="(max-width: 768px)" srcSet={getMobileSrc(image.src)} />
                          <img src={image.src} alt={image.alt} className="absolute inset-0 w-full h-full object-cover" loading="lazy" {...mobileExpandable(image.src, image.alt)} />
                        </picture>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Grid #1 */}
                {frontmatter.grid1 && (
                  <section className="py-20 md:py-28" style={{ backgroundColor: '#F5F0EB' }}>
                    <div className="max-w-6xl mx-auto px-8">
                      <div className="grid grid-cols-1 md:grid-cols-[35%_1fr] gap-12">
                        <div data-reveal>
                          <h2 style={{ fontFamily: '"Majesti Banner", serif', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 300, color: '#1C1C1C', textTransform: 'uppercase', letterSpacing: '0.03em', lineHeight: 1.1 }}>
                            {frontmatter.grid1Title || heading}
                          </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-reveal data-reveal-delay="200">
                          {frontmatter.grid1.map((p, i) => (
                            <div key={i}>
                              <p className="text-sm" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#555', fontWeight: 300, lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: p }} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* Full-bleed image + small text underneath */}
                {/* Full-bleed + statement + masonry — one dark section with gold line */}
                <section className="relative overflow-hidden" style={{ backgroundColor: '#1C1C1C' }}>
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1200 3000" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M900 0 Q500 300 700 700 Q1000 1100 400 1500 Q100 1800 600 2200 Q1000 2500 500 3000" stroke="#D4A843" strokeWidth="1" fill="none" />
                  </svg>

                  {/* Full-bleed image */}
                  {(() => {
                    const overlapSection = frontmatter.sections.find(s => s.layout === 'overlap-card-inverted')
                    const fullBleedSrc = frontmatter.fullBleedImage?.src || overlapSection?.imagePath
                    const fullBleedAlt = frontmatter.fullBleedImage?.alt || overlapSection?.imageAlt || ''
                    if (!fullBleedSrc) return null
                    return (
                      <>
                        <img
                          src={fullBleedSrc}
                          alt={fullBleedAlt}
                          className="w-full h-auto object-cover relative"
                          style={{ zIndex: 1 }}
                          loading="lazy"
                        />
                        <div className="max-w-6xl mx-auto px-8 py-10 md:py-14 relative" style={{ zIndex: 1 }}>
                          {overlapSection && (
                          <div className="md:max-w-sm" data-reveal>
                            {overlapSection.title && (
                              <h2 className="text-xs mb-3" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#F5F0EB', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                {overlapSection.title}
                              </h2>
                            )}
                            <p className="text-sm" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#999', fontWeight: 300, lineHeight: 1.7, display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }} dangerouslySetInnerHTML={{ __html: overlapSection.paragraphs[0] }} />
                          </div>
                          )}
                          {/* Big statement */}
                          <div className="mt-28 md:mt-36 max-w-4xl mx-auto text-center" data-reveal>
                            <p style={{
                              fontFamily: '"Majesti Banner", serif',
                              fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
                              fontWeight: 300,
                              color: '#F5F0EB',
                              lineHeight: 1.3,
                              letterSpacing: '0.02em',
                              textTransform: 'uppercase'
                            }}>
                              {frontmatter.statementQuote || <>Being Camera-Shy Is Not a Problem. It&rsquo;s My Starting Point.</>}
                            </p>
                          </div>
                          {/* Learn more button */}
                          <div className="mt-10 text-center" data-reveal>
                            <Link href="/about/" className="inline-block px-8 py-3 rounded-full border text-sm hover:bg-[#D4A843] hover:text-white hover:border-[#D4A843] transition-all duration-300" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#F5F0EB', borderColor: '#F5F0EB', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                              Learn More
                            </Link>
                          </div>
                        </div>
                      </>
                    )
                  })()}

                  {/* Masonry grid */}
                  <div className="max-w-6xl mx-auto px-8 py-20 md:py-28 relative" style={{ zIndex: 1 }}>
                    {(() => {
                      const masonrySections = frontmatter.sections
                        .filter(s => s.imagePath && s.layout !== 'sticky-split' && s.layout !== 'sticky-split-secondary' && s.layout !== 'steps-timeline' && s.layout !== 'overlap-card-inverted' && !firstHalf.includes(s))
                        .slice(0, 4)
                      const positions: { img: string; text: string; textBefore: boolean; slideDir?: string; sideBySide?: boolean; mt?: string }[] = [
                        { img: 'md:w-[45%] md:ml-[5%]', text: 'md:ml-[5%]', mt: '', textBefore: false, slideDir: 'left' },
                        { img: 'md:w-[38%] md:ml-[55%]', text: 'md:ml-[55%]', mt: 'md:mt-[-20%]', textBefore: true, slideDir: 'right' },
                        { img: 'md:w-[42%] md:ml-[15%]', text: 'md:ml-[15%]', mt: 'md:mt-[-5%]', textBefore: true, slideDir: 'left' },
                        { img: 'md:w-[40%] md:mx-auto', text: 'md:ml-[5%] md:mt-[-15%]', mt: '', textBefore: false, sideBySide: true, slideDir: 'up' }
                      ]
                      return masonrySections.map((section, i) => {
                        const pos = positions[i]
                        const textEl = (
                          <div className={`${pos.text} md:max-w-xs ${pos.textBefore ? 'mb-4' : 'mt-4'}`}>
                            {section.title && (
                              <h2 className="text-xs mb-2" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#F5F0EB', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                                {section.title}
                              </h2>
                            )}
                            <p className="text-sm [&_a]:underline [&_a]:text-[#F5F0EB]" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#999', fontWeight: 300, lineHeight: 1.7, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }} dangerouslySetInnerHTML={{ __html: section.paragraphs[0] }} />
                          </div>
                        )
                        if (pos.sideBySide) {
                          return (
                            <div key={i} className={`py-6 md:py-8 ${pos.mt} md:flex md:items-center md:gap-10`}>
                              <div className="md:max-w-xs md:w-[25%] shrink-0" data-reveal data-reveal-direction="left">
                                {section.title && (
                                  <h2 className="text-xs mb-2" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#F5F0EB', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                                    {section.title}
                                  </h2>
                                )}
                                <p className="text-sm [&_a]:underline [&_a]:text-[#F5F0EB]" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#999', fontWeight: 300, lineHeight: 1.7, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }} dangerouslySetInnerHTML={{ __html: section.paragraphs[0] }} />
                              </div>
                              <div className="md:w-[45%] md:mx-auto" data-reveal data-reveal-direction="up" data-reveal-delay="200">
                                <picture>
                                  <source media="(max-width: 768px)" srcSet={getMobileSrc(section.imagePath!)} />
                                  <img src={section.imagePath} alt={section.imageAlt || ''} className="w-full h-auto" loading="lazy" {...mobileExpandable(section.imagePath!, section.imageAlt || '')} />
                                </picture>
                              </div>
                            </div>
                          )
                        }
                        return (
                          <div key={i} className={`py-6 md:py-8 ${pos.mt}`}>
                            {pos.textBefore && textEl}
                            <div className={pos.img} data-reveal data-reveal-direction={pos.slideDir || 'up'}>
                              <picture>
                                <source media="(max-width: 768px)" srcSet={getMobileSrc(section.imagePath!)} />
                                <img src={section.imagePath} alt={section.imageAlt || ''} className="w-full h-auto" loading="lazy" />
                              </picture>
                            </div>
                            {!pos.textBefore && textEl}
                          </div>
                        )
                      })
                    })()}
                  </div>
                </section>
                {/* end of dark wrapper */}

                {/* Grid #2 */}
                {frontmatter.grid2 && (
                  <section className="py-20 md:py-28" style={{ backgroundColor: '#F5F0EB' }}>
                    <div className="max-w-6xl mx-auto px-8">
                      <div className="grid grid-cols-1 md:grid-cols-[35%_1fr] gap-12">
                        <div data-reveal>
                          <h2 style={{ fontFamily: '"Majesti Banner", serif', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 300, color: '#1C1C1C', textTransform: 'uppercase', letterSpacing: '0.03em', lineHeight: 1.1 }}>
                            {frontmatter.grid2Title || heading}
                          </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-reveal data-reveal-delay="200">
                          {frontmatter.grid2.map((p, i) => (
                            <div key={i}>
                              <p className="text-sm" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#555', fontWeight: 300, lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: p }} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* Steps Timeline (career categories) */}
                {(() => {
                  const timelineSection = frontmatter.sections.find(s => s.layout === 'steps-timeline')
                  if (!timelineSection) return null

                  const introParagraphs: string[] = []
                  const steps: { heading: string; body: string }[] = []

                  for (const paragraph of timelineSection.paragraphs) {
                    const h3Match = paragraph.match(/<h3>(.*?)<\/h3>([\s\S]*)$/)
                    if (h3Match) {
                      steps.push({ heading: h3Match[1], body: h3Match[2].trim() })
                    } else if (steps.length === 0) {
                      introParagraphs.push(paragraph)
                    }
                  }

                  return (
                    <section className="py-20 md:py-28" style={{ backgroundColor: '#F5F0EB' }}>
                      <div className="max-w-6xl mx-auto px-8">
                        <div className="grid grid-cols-1 md:grid-cols-[35%_1fr] gap-12">
                          <div data-reveal>
                            {timelineSection.title && (
                              <h2 style={{ fontFamily: '"Majesti Banner", serif', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 300, color: '#1C1C1C', textTransform: 'uppercase', letterSpacing: '0.03em', lineHeight: 1.1 }}>
                                {timelineSection.title}
                              </h2>
                            )}
                            {introParagraphs.map((p, i) => (
                              <p key={i} className="text-sm mt-4" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#555', fontWeight: 300, lineHeight: 1.7 }}>{p}</p>
                            ))}
                            {timelineSection.imagePath && (
                              <div className="mt-8">
                                <picture>
                                  <source media="(max-width: 768px)" srcSet={getMobileSrc(timelineSection.imagePath)} />
                                  <img src={timelineSection.imagePath} alt={timelineSection.imageAlt || ''} className="w-full object-cover" loading="lazy" />
                                </picture>
                              </div>
                            )}
                          </div>
                          <div className="relative pl-8" style={{ borderLeft: '2px solid #D4A843' }}>
                            {steps.map((step, i) => (
                              <div key={i} data-reveal data-reveal-delay={String(i * 150)} className={i < steps.length - 1 ? 'mb-8' : ''} style={{ position: 'relative' }}>
                                <div className="absolute w-3 h-3 rounded-full" style={{ backgroundColor: '#D4A843', left: '-1.05rem', top: '0.3rem' }} />
                                <h3 className="text-sm font-medium mb-1" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                  {step.heading}
                                </h3>
                                <p className="text-sm [&_a]:underline" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#555', fontWeight: 300, lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: step.body }} />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </section>
                  )
                })()}

                {/* Two photos + title section */}
                <section className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor: '#F5F0EB' }}>
                  <div className="max-w-6xl mx-auto px-8 relative" style={{ minHeight: '110vh' }}>
                    {/* Text left of top-right photo */}
                    <div className="hidden md:block absolute right-[58%] top-[15%] max-w-sm" style={{ zIndex: 2 }} data-reveal>
                      <p className="text-sm" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#555', fontWeight: 300, lineHeight: 1.7 }}>
                        {frontmatter.ctaText[2] || frontmatter.ctaText[0]}
                      </p>
                    </div>

                    {/* Photo top right */}
                    <div className="hidden md:block absolute right-0 top-0 w-[35%]" data-reveal data-reveal-direction="right">
                      <img
                        src={frontmatter.imageRow[2]?.src || frontmatter.imageRow[0].src}
                        alt={frontmatter.imageRow[2]?.alt || frontmatter.imageRow[0].alt}
                        className="w-full object-cover"
                        style={{ aspectRatio: '4/5' }}
                        loading="lazy"
                      />
                    </div>

                    {/* Big title centered */}
                    <div className="md:pt-[45%] md:max-w-[55%] md:ml-[30%] text-left relative" style={{ zIndex: 5 }} data-reveal data-reveal-delay="200">
                      <h2 style={{
                        fontFamily: '"Majesti Banner", serif',
                        fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                        fontWeight: 300,
                        color: '#1C1C1C',
                        textTransform: 'uppercase',
                        letterSpacing: '0.03em',
                        lineHeight: 1.1
                      }}>
                        {frontmatter.ctaTitle}
                      </h2>
                      <div className="mt-10 max-w-md md:ml-[20%]">
                        {frontmatter.ctaText.slice(0, 2).map((p, i) => (
                          <p key={i} className="text-sm mb-3" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#555', fontWeight: 300, lineHeight: 1.7 }}>{p}</p>
                        ))}
                      </div>
                    </div>

                    {/* Photo bottom left */}
                    <div className="hidden md:block absolute left-0 -bottom-16 w-[35%]" data-reveal data-reveal-direction="left" data-reveal-delay="400">
                      <img
                        src={frontmatter.imageRow[3]?.src || frontmatter.imageRow[1].src}
                        alt={frontmatter.imageRow[3]?.alt || frontmatter.imageRow[1].alt}
                        className="w-full object-cover"
                        style={{ aspectRatio: '4/5' }}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </section>

                {/* CTA — big text + button */}
                <section className="py-24 md:py-32" style={{ backgroundColor: '#F5F0EB' }}>
                  <div className="max-w-4xl mx-auto px-8 text-center" data-reveal>
                    <h2 style={{
                      fontFamily: '"Majesti Banner", serif',
                      fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                      fontWeight: 300,
                      color: '#1C1C1C',
                      textTransform: 'uppercase',
                      letterSpacing: '0.03em',
                      lineHeight: 1.2
                    }}>
                      {frontmatter.ctaTitle}
                    </h2>
                    <div className="mt-10">
                      <Link href="/pricing/" className="inline-block px-10 py-4 rounded-full border text-base hover:bg-[#D4A843] hover:text-white hover:border-[#D4A843] transition-all duration-300" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', borderColor: '#1C1C1C', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase' }} onClick={() => trackButtonClick('View Pricing', 'location_closing_cta', '/pricing')}>
                        View Pricing
                      </Link>
                    </div>
                  </div>
                </section>

                {/* Grid #3 */}
                {frontmatter.grid3 && (
                  <section className="py-20 md:py-28" style={{ backgroundColor: '#F5F0EB' }}>
                    <div className="max-w-6xl mx-auto px-8">
                      <div className="grid grid-cols-1 md:grid-cols-[35%_1fr] gap-12">
                        <div data-reveal>
                          <h2 style={{ fontFamily: '"Majesti Banner", serif', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 300, color: '#1C1C1C', textTransform: 'uppercase', letterSpacing: '0.03em', lineHeight: 1.1 }}>
                            {frontmatter.grid3Title || heading}
                          </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-reveal data-reveal-delay="200">
                          {frontmatter.grid3.map((p, i) => (
                            <div key={i}>
                              <p className="text-sm" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#555', fontWeight: 300, lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: p }} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* FAQ */}
                {frontmatter.faq?.length > 0 && (
                  <section className="py-16 md:py-24" style={{ backgroundColor: '#1C1C1C' }}>
                    <AnimatedFAQ
                      items={frontmatter.faq.map((faq, index) => ({ ...faq, fromLeft: index % 2 === 0 }))}
                      theme="dark"
                      plusColor="#D4A843"
                    />
                  </section>
                )}

                {/* Footer must live INSIDE the parallax wrapper: its children are
                    absolutely positioned and overflow the 200vh container, so
                    anything placed after the wrapper in normal flow gets painted
                    over and is never visible. Same pattern as every other page
                    using TestimonialWithParallax (home, corporate, glamour, …). */}
                <Footer />
                <MobileBottomNav />
              </TestimonialWithParallax>
            ) : (
              <>
                {secondHalf.length > 0 && (
                  <section className="relative py-16 md:py-24 overflow-hidden" style={{ backgroundColor: '#F5F0EB' }}>
                    <div className="max-w-6xl mx-auto px-8 relative" style={{ zIndex: 1 }}>
                      {secondHalf.map((s, i) => renderEditorialItem(s, i + 4))}
                    </div>
                  </section>
                )}
                <Footer />
                <MobileBottomNav />
              </>
            )}
          </>
        )
      })()}




      {/* Mobile image lightbox */}
      {expandedImage && (
        <div
          className="md:hidden fixed inset-0 bg-black/90 flex items-center justify-center"
          style={{ zIndex: 1000 }}
          onClick={() => setExpandedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white p-2"
            onClick={() => setExpandedImage(null)}
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <img
            src={expandedImage.src}
            alt={expandedImage.alt}
            className="max-w-[90vw] max-h-[85vh] object-contain"
          />
        </div>
      )}

    </>
  )
}
