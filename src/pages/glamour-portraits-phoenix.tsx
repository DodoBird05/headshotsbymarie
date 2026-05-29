import { useState, useEffect } from 'react'
import Link from 'next/link'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import Head from 'next/head'
import Layout from '@/components/Layout'
import StickyNavigation from '@/components/StickyNavigation'
import TestimonialWithParallax from '@/components/TestimonialWithParallax'
import StickyImageWithText from '@/components/StickyImageWithText'
import AnimatedFAQ from '@/components/AnimatedFAQ'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import ScatteredEditorial from '@/components/ScatteredEditorial'
import CardStackCarousel from '@/components/CardStackCarousel'
import { getMobileSrc } from '@/lib/responsiveImage'
import useScrollReveal from '@/hooks/useScrollReveal'
import { generateServiceSchema } from '@/lib/seoConfig'

interface ImageField {
  src: string
  alt: string
}

interface EditorialItem {
  imagePath: string
  imageAlt: string
  title: string
  text?: string
  link?: string
}

interface StickyBlock {
  src: string
  alt: string
  paragraphs: string[]
}

interface FAQItem {
  question: string
  answer: string
  fromLeft: boolean
}

interface GlamourFrontmatter {
  title: string
  description: string
  heroImage: string
  heroImageAlt: string
  heroTitle: string
  heroIntro: string
  editorialItems: EditorialItem[]
  carouselHeading: string
  carouselSubtext: string
  carouselHeroImage: ImageField
  carouselImages: ImageField[]
  parallaxTestimonial: {
    quote: string[]
    author: string
    rating: number
    source: string
  }
  parallaxImages: ImageField[]
  introTitle: string
  introParagraphs: string[]
  stickyHeading: string
  stickyCtaLabel: string
  stickyCtaHref: string
  stickyBlocks: StickyBlock[]
  splitTitleLines: string[]
  splitImage: string
  splitImageAlt: string
  splitText: string
  grid1Title: string
  grid1Paragraphs: string[]
  fullBleedImage: string
  fullBleedImageAlt: string
  darkIntroTitle: string
  darkIntroText: string
  darkCtaLabel: string
  darkCtaHref: string
  closingTitle: string
  closingParagraphs: string[]
  faq: FAQItem[]
  ctaHeading: string
  ctaButtons: {
    label: string
    href: string
    style: 'primary' | 'secondary'
  }[]
}

interface PageProps {
  frontmatter: GlamourFrontmatter
}

export default function GlamourPortraitsPage({ frontmatter }: PageProps) {
  const [isDesktop, setIsDesktop] = useState(false)
  useScrollReveal()

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768)
    const handleResize = () => setIsDesktop(window.innerWidth >= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Split heroTitle into word-per-line, preserving inline HTML tags (for <em>)
  const heroWords = frontmatter.heroTitle
    .replace(/<[^>]*>/g, (match) => `​${match}​`)
    .split(' ')
    .reduce((acc: string[], word) => {
      if (word.includes('​')) {
        const last = acc.length > 0 ? acc[acc.length - 1] : ''
        if (last && last.includes('<em>') && !last.includes('</em>')) {
          acc[acc.length - 1] = (last + ' ' + word).replace(/​/g, '')
        } else {
          acc.push(word.replace(/​/g, ''))
        }
      } else {
        acc.push(word)
      }
      return acc
    }, [])

  return (
    <Layout
      title={frontmatter.title}
      description={frontmatter.description}
      hideFooter
      ogImage={frontmatter.heroImage}
      canonicalPath="/glamour-portraits-phoenix/"
    >
      <StickyNavigation />

      <Head>
        <link
          rel="preload"
          href={getMobileSrc(frontmatter.heroImage)}
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              generateServiceSchema({
                name: 'Glamour Portrait Photography',
                description: frontmatter.description,
                url: '/glamour-portraits-phoenix/',
                image: frontmatter.heroImage
              })
            )
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: frontmatter.faq.map(f => ({
                '@type': 'Question',
                name: f.question,
                acceptedAnswer: { '@type': 'Answer', text: f.answer }
              }))
            })
          }}
        />
      </Head>

      {/* ==================== HERO — split: H1 + intro left, image right ==================== */}
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
                data-reveal
                data-reveal-delay="200"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#999', fontWeight: 300, lineHeight: 1.7 }}
              >
                {frontmatter.heroIntro}
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
            <h1
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
            </h1>
            <p
              className="text-base"
              style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#999', fontWeight: 300, lineHeight: 1.7 }}
            >
              {frontmatter.heroIntro}
            </p>
          </div>
        </div>
      </section>

      {/* ==================== SCATTERED EDITORIAL GALLERY (3 category items) ==================== */}
      <div className="relative" style={{ backgroundColor: '#F5F0EB' }}>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1200 4000" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M900 0 C700 300 800 600 600 900 C400 1200 200 1400 400 1700 C600 2000 900 2200 700 2500 C500 2800 200 3000 400 3300 C600 3600 800 3800 600 4000" stroke="#D4A843" strokeWidth="1" fill="none" />
        </svg>
        <ScatteredEditorial
          background="transparent"
          items={frontmatter.editorialItems}
          location="glamour_editorial"
        />
      </div>

      {/* ==================== CARD STACK CAROUSEL ==================== */}
      <CardStackCarousel
        heading={<span dangerouslySetInnerHTML={{ __html: frontmatter.carouselHeading }} />}
        subtext={frontmatter.carouselSubtext}
        heroImage={frontmatter.carouselHeroImage}
        carouselImages={frontmatter.carouselImages}
      />

      {/* ==================== PARALLAX WRAPPER ==================== */}
      <div style={{ position: 'relative', zIndex: 20, backgroundColor: '#1C1C1C' }}>
        <TestimonialWithParallax
          quote={frontmatter.parallaxTestimonial.quote}
          author={frontmatter.parallaxTestimonial.author}
          rating={frontmatter.parallaxTestimonial.rating}
          source={frontmatter.parallaxTestimonial.source}
          parallaxImages={frontmatter.parallaxImages}
          theme="dark"
        >
          {/* ===== Intro paragraph — top left ===== */}
          <section className="pt-16 pb-1" style={{ backgroundColor: '#F5F0EB' }}>
            <div className="w-full px-6 lg:px-0">
              <div className="lg:w-[40%] lg:ml-[2vh]" data-reveal>
                <h2
                  className="mb-6"
                  style={{
                    fontFamily: "'Majesti Banner', serif",
                    fontSize: '1.1rem',
                    fontWeight: 300,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#1C1C1C'
                  }}
                >
                  {frontmatter.introTitle}
                </h2>
                {frontmatter.introParagraphs.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-base lg:text-[0.95rem] last:mb-0"
                    style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 300, lineHeight: 1.75 }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </section>

          {/* ===== Sticky image with text ===== */}
          <StickyImageWithText
            background="#F5F0EB"
            textColor="#1C1C1C"
            location="glamour_sticky"
            stickyContent={
              <>
                <h2
                  data-reveal
                  style={{
                    fontFamily: "'Majesti Banner', serif",
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                    fontWeight: 300,
                    textTransform: 'uppercase',
                    letterSpacing: '0.03em',
                    lineHeight: 0.95,
                    color: '#1C1C1C',
                    marginBottom: '2.5rem'
                  }}
                  dangerouslySetInnerHTML={{ __html: frontmatter.stickyHeading }}
                />
                <Link
                  href={frontmatter.stickyCtaHref}
                  className="inline-block text-lg font-medium transition-all duration-300 px-8 py-3"
                  style={{
                    fontFamily: '"Hanken Grotesk", sans-serif',
                    backgroundColor: 'transparent',
                    color: '#1C1C1C',
                    border: '1px solid #1C1C1C',
                    borderRadius: '9999px'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#D4A843'; e.currentTarget.style.borderColor = '#D4A843'; e.currentTarget.style.color = '#FFFFFF' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = '#1C1C1C'; e.currentTarget.style.color = '#1C1C1C' }}
                >
                  {frontmatter.stickyCtaLabel}
                </Link>
              </>
            }
            images={frontmatter.stickyBlocks.map(block => ({
              src: block.src,
              alt: block.alt,
              paragraphs: block.paragraphs,
              textColor: '#1C1C1C'
            }))}
          />

          {/* ===== Split title + 60% image ===== */}
          <section style={{ backgroundColor: '#F5F0EB' }}>
            <h2
              data-reveal
              className="px-6 pt-12 pb-6 md:px-[4vw] md:pt-12 md:pb-0 md:-mb-8"
              style={{
                fontFamily: '"Majesti Banner", serif',
                fontWeight: 300,
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                lineHeight: 1.05,
                color: '#1C1C1C',
                position: 'relative',
                zIndex: 2
              }}
            >
              {frontmatter.splitTitleLines.map((line, i) => (
                <span key={i}>
                  <span dangerouslySetInnerHTML={{ __html: line }} />
                  {i < frontmatter.splitTitleLines.length - 1 && <br />}
                </span>
              ))}
            </h2>

            <div className="flex flex-col md:flex-row md:items-start">
              <div className="w-full md:w-[60%] md:flex-shrink-0" data-reveal data-reveal-delay="200">
                <picture>
                  <source media="(max-width: 768px)" srcSet={getMobileSrc(frontmatter.splitImage)} />
                  <img
                    src={frontmatter.splitImage}
                    alt={frontmatter.splitImageAlt}
                    width={1200}
                    height={1500}
                    style={{ width: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                </picture>
              </div>
              <div
                className="w-full md:w-[40%] px-6 pt-8 pb-12 md:pt-[15vh] md:pr-[4vw] md:pb-12 md:pl-[3vw] md:px-0"
                data-reveal
                data-reveal-delay="400"
              >
                <p
                  style={{
                    fontFamily: '"Hanken Grotesk", sans-serif',
                    fontWeight: 300,
                    fontSize: '0.95rem',
                    lineHeight: 1.7,
                    color: '#1C1C1C'
                  }}
                >
                  {frontmatter.splitText}
                </p>
              </div>
            </div>
          </section>

          {/* ===== Grid 1 — 35% / 1fr ===== */}
          <section className="py-20 md:py-28" style={{ backgroundColor: '#F5F0EB' }}>
            <div className="max-w-6xl mx-auto px-8">
              <div className="grid grid-cols-1 md:grid-cols-[35%_1fr] gap-12">
                <div data-reveal>
                  <h2 style={{ fontFamily: '"Majesti Banner", serif', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 300, color: '#1C1C1C', textTransform: 'uppercase', letterSpacing: '0.03em', lineHeight: 1.1 }}>
                    {frontmatter.grid1Title}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-reveal data-reveal-delay="200">
                  {frontmatter.grid1Paragraphs.map((p, i) => (
                    <div key={i}>
                      <p className="text-sm" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#555', fontWeight: 300, lineHeight: 1.7 }}>{p}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ===== Full-bleed transition image ===== */}
          <section style={{ backgroundColor: '#1C1C1C' }}>
            <picture>
              <source media="(max-width: 768px)" srcSet={getMobileSrc(frontmatter.fullBleedImage)} />
              <img
                src={frontmatter.fullBleedImage}
                alt={frontmatter.fullBleedImageAlt}
                style={{ width: '100%', display: 'block', objectFit: 'cover' }}
                loading="lazy"
              />
            </picture>
          </section>

          {/* ===== Dark wrapper with gold line ===== */}
          <div style={{ position: 'relative', backgroundColor: '#1C1C1C' }}>
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="none"
              viewBox="0 0 1200 4000"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ zIndex: 0 }}
            >
              <path d="M400 0 C600 400 300 800 500 1200 C700 1600 400 2000 600 2400 C800 2800 500 3200 700 3600 C800 3800 600 4000 700 4000" stroke="#D4A843" strokeWidth="1" fill="none" />
            </svg>

            {/* Dark intro + CTA (text only) */}
            <section style={{ backgroundColor: 'transparent', position: 'relative', zIndex: 1 }} className="py-20 md:py-28">
              <div className="max-w-3xl mx-auto px-8 text-center" data-reveal>
                <h2
                  style={{
                    fontFamily: '"Majesti Banner", serif',
                    fontWeight: 300,
                    fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    lineHeight: 1.1,
                    color: '#F5F0EB',
                    marginBottom: '2rem'
                  }}
                >
                  {frontmatter.darkIntroTitle}
                </h2>
                <p
                  style={{
                    fontFamily: '"Hanken Grotesk", sans-serif',
                    fontWeight: 300,
                    fontSize: '1rem',
                    lineHeight: 1.8,
                    color: '#F5F0EB',
                    opacity: 0.85,
                    marginBottom: '2.5rem'
                  }}
                >
                  {frontmatter.darkIntroText}
                </p>
                <Link
                  href={frontmatter.darkCtaHref}
                  className="inline-block text-lg font-medium transition-all duration-300 px-8 py-3"
                  style={{
                    fontFamily: '"Hanken Grotesk", sans-serif',
                    backgroundColor: 'transparent',
                    color: '#F5F0EB',
                    border: '1px solid #F5F0EB',
                    borderRadius: '9999px'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#D4A843'; e.currentTarget.style.borderColor = '#D4A843'; e.currentTarget.style.color = '#FFFFFF' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = '#F5F0EB'; e.currentTarget.style.color = '#F5F0EB' }}
                >
                  {frontmatter.darkCtaLabel}
                </Link>
              </div>
            </section>

            {/* Closing grid */}
            <section className="py-20 md:py-28" style={{ backgroundColor: 'transparent', position: 'relative', zIndex: 1 }}>
              <div className="max-w-6xl mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-[35%_1fr] gap-12">
                  <div data-reveal>
                    <h2 style={{ fontFamily: '"Majesti Banner", serif', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 300, color: '#F5F0EB', textTransform: 'uppercase', letterSpacing: '0.03em', lineHeight: 1.1 }}>
                      {frontmatter.closingTitle}
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-reveal data-reveal-delay="200">
                    {frontmatter.closingParagraphs.map((p, i) => (
                      <div key={i}>
                        <p className="text-sm" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#CCCCCC', fontWeight: 300, lineHeight: 1.7 }}>{p}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* ===== FAQ ===== */}
          {frontmatter.faq && frontmatter.faq.length > 0 && (
            <div style={{ backgroundColor: '#1C1C1C' }}>
              <AnimatedFAQ items={frontmatter.faq} scrollProgress={1} theme="dark" />
            </div>
          )}

          {/* ===== CTA ===== */}
          <CTASection heading={frontmatter.ctaHeading} buttons={frontmatter.ctaButtons} />

          <Footer />
        </TestimonialWithParallax>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content', 'glamour-portraits-phoenix.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(fileContents)
  return {
    props: { frontmatter: data }
  }
}
