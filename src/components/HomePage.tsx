import { useState, useEffect } from 'react'
import Link from 'next/link'
import ScatteredImageGallery from './ScatteredImageGallery'
import TestimonialWithParallax from './TestimonialWithParallax'
import StickyImageWithText from './StickyImageWithText'
import AnimatedFAQ from './AnimatedFAQ'
import CTASection from './CTASection'
import Footer from './Footer'
import { getMobileSrc } from '@/lib/responsiveImage'
import useScrollReveal from '@/hooks/useScrollReveal'
import TextCardOverImage from './TextCardOverImage'
import StatementSplit from './StatementSplit'

interface ContentSection {
  title: string
  imagePath?: string
  imageAlt?: string
  paragraphs: string[]
}

interface HomePageLayoutProps {
  frontmatter: {
    title: string
    heroTitle: string
    defaultHeroImage: string
    defaultHeroImageAlt: string
    mobileRevealText: string[]
    mobileRevealText2?: string[]
    mobileGallery: {
      src: string
      alt: string
      headingAbove?: string
      headingBelow?: string
      size?: 'XS' | 'S' | 'M' | 'L' | 'XL'
      align?: 'left' | 'center' | 'right'
      offsetLeft?: string
      marginBottom?: string
      link?: string
    }[]
    mobileTestimonial?: {
      quote: string[]
      author: string
      rating: number
      source: string
    }
    mobileParallaxImages?: {
      src: string
      alt: string
    }[]
    mobileFAQ?: {
      question: string
      answer: string
      fromLeft: boolean
    }[]
    portraitSessionsHeading?: string
    homeStatementLine?: string
    homeContentSections?: ContentSection[]
    homeImageRow?: {
      src: string
      alt: string
    }[]
    homeImageRow2?: {
      src: string
      alt: string
    }[]
    testimonials?: {
      text: string
      author: string
      imagePath: string
      imageAlt: string
    }[]
    ctaHeading?: string
    ctaButtons?: {
      label: string
      href: string
      style: 'primary' | 'secondary'
    }[]
  }
}

export default function HomePageLayout({
  frontmatter
}: HomePageLayoutProps) {
  const [scrollY, setScrollY] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(800)
  const [isDesktop, setIsDesktop] = useState(false)

  useScrollReveal()

  useEffect(() => {
    setViewportHeight(window.innerHeight)
    setIsDesktop(window.innerWidth >= 768)

    const handleScroll = () => setScrollY(window.scrollY)
    const handleResize = () => {
      setViewportHeight(window.innerHeight)
      setIsDesktop(window.innerWidth >= 768)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // All measurements in vh (converted to px for calculations)
  const vh = viewportHeight / 100

  // Hero animation: 0 - 50vh of scroll
  const heroScrollEnd = 50 * vh
  const heroProgress = Math.min(1, scrollY / heroScrollEnd)

  // Gallery section: 50vh - 350vh of scroll (desktop)
  const galleryScrollStart = 50 * vh
  const galleryScrollEnd = 350 * vh

  // Content after gallery starts at 350vh
  const contentStart = 350 * vh

  // Hero animation values
  const heroScale = 1 - (heroProgress * 0.75)
  // Both mobile and desktop: stay visible until 70% progress, then snap to hidden
  const heroOpacity = heroProgress < 0.7 ? 1 : 0

  // After hero animation completes, scroll the reveal content up
  const revealScrollOffset = scrollY > heroScrollEnd
    ? Math.min(scrollY - heroScrollEnd, 150 * vh)
    : 0

  // No crossfade needed — text 2 is positioned below text 1 on the scrolling layer

  // Total scroll height: hero + gallery + content sections
  // Desktop: calculated to stop at footer
  // Mobile: content flows naturally after gallery
  const maxDesktopScroll = 300 * vh
  const totalScrollHeight = isDesktop ? `${maxDesktopScroll}px` : 'auto'

  // Use smaller mobile variant for hero (52KB vs 216KB)
  const heroImageUrl = isDesktop ? frontmatter.defaultHeroImage : getMobileSrc(frontmatter.defaultHeroImage)

  const sections = frontmatter.homeContentSections || []
  const imageRow = frontmatter.homeImageRow || []
  const imageRow2 = frontmatter.homeImageRow2 || []

  return (
    <>
      {/* ==================== MOBILE: Static hero + reveal text ==================== */}
      {!isDesktop && (
        <div style={{ overflow: 'hidden' }}>
          {/* Static hero image with H1 */}
          <div className="relative w-full" style={{ height: '100vh' }}>
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${heroImageUrl})` }}
            />
            <img
              src={frontmatter.defaultHeroImage}
              alt={frontmatter.defaultHeroImageAlt}
              className="sr-only"
              width={1}
              height={1}
            />
            <h1
              className="absolute bottom-[25vh] left-0 right-0 text-center"
              style={{
                fontFamily: '"Majesti Banner", serif',
                fontWeight: 300,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: '#ffffff',
                lineHeight: 0.95,
                fontSize: 'clamp(2.2rem, 9vw, 3.5rem)'
              }}
            >
              A Different
              <br />
              Kind of
              <br />
              <em style={{ fontStyle: 'italic' }}>Headshot Experience</em>
            </h1>
          </div>

          {/* Reveal text — static section */}
          <div className="bg-white text-center px-8 pt-16 pb-16">
            <div
              style={{
                fontFamily: '"Hanken Grotesk", sans-serif',
                fontWeight: 300,
                fontSize: '2.2vw',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#1C1C1C',
                marginBottom: '1.5rem'
              }}
            >
              Portrait Photography
            </div>
            <div
              style={{
                fontFamily: '"Majesti Banner", serif',
                fontWeight: 300,
                color: '#1C1C1C',
                lineHeight: 1.3,
                fontSize: '5vw'
              }}
            >
              {frontmatter.mobileRevealText.map((line, index) => (
                <span key={index}>
                  {line}
                  {index < frontmatter.mobileRevealText.length - 1 && <br />}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================== DESKTOP: Scroll animation ==================== */}
      <div style={{ minHeight: totalScrollHeight, display: isDesktop ? undefined : 'none' }}>

        {/* ==================== FIXED VIEWPORT ==================== */}
        <div className="fixed inset-0 w-full h-screen overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>

          {/* === LAYER 1: White background + small image + reveal text === */}
          <div
            className="absolute inset-0 bg-white"
            style={{
              transform: `translateY(-${revealScrollOffset}px)`,
              willChange: 'transform'
            }}
          >
            {/* Small centered image */}
            <div
              className="absolute left-1/2 bg-cover bg-center bg-no-repeat rounded-lg"
              style={{
                top: '15vh',
                width: '30vw',
                height: '35vh',
                transform: 'translateX(-50%)',
                backgroundImage: `url(${heroImageUrl})`
              }}
            />

            {/* Reveal text */}
            <div
              className="absolute left-[10%] right-[10%] text-center"
              style={{
                top: '55vh',
                fontFamily: '"Majesti Banner", serif',
                fontWeight: 300,
                color: '#1C1C1C',
                lineHeight: 1.2,
                fontSize: '3.5vw'
              }}
            >
              {frontmatter.mobileRevealText.map((line, index) => (
                <span key={index}>
                  {line}
                  {index < frontmatter.mobileRevealText.length - 1 && <br />}
                </span>
              ))}
            </div>
          </div>

          {/* === LAYER 2: Full screen hero image (shrinks on scroll) === */}
          <div
            className="absolute inset-0"
            style={{
              opacity: heroOpacity,
              visibility: heroProgress >= 0.7 ? 'hidden' : 'visible',
              zIndex: 10
            }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${heroImageUrl})`,
                transform: `scale(${heroScale})`,
                transformOrigin: 'center 15%',
                willChange: 'transform'
              }}
            />
            <img
              src={frontmatter.defaultHeroImage}
              alt={frontmatter.defaultHeroImageAlt}
              className="sr-only"
              width={1}
              height={1}
            />
            <h1
              className="absolute bottom-[25vh] left-0 right-0 text-center"
              style={{
                fontFamily: '"Majesti Banner", serif',
                fontWeight: 300,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: '#ffffff',
                lineHeight: 0.95,
                fontSize: 'clamp(1.8rem, 3.5vw, 3rem)'
              }}
            >
              A Different Kind of
              <br />
              <em style={{ fontStyle: 'italic' }}>Headshot Experience</em>
            </h1>
          </div>
        </div>

      </div>

      {/* ==================== GALLERY (Desktop: fixed, Mobile: in flow) ==================== */}
      <ScatteredImageGallery
        images={frontmatter.mobileGallery}
        ctaHeading={frontmatter.ctaHeading}
        scrollY={scrollY}
        viewportHeight={viewportHeight}
        isDesktop={isDesktop}
      />

      {/* ==================== CONTENT SECTIONS (after gallery) ==================== */}
      <div
        style={{
          position: 'relative',
          zIndex: 20,
          marginTop: isDesktop ? '350vh' : '-25vh'
        }}
      >
          {/* Testimonial with Parallax */}
          {frontmatter.mobileTestimonial && frontmatter.mobileParallaxImages && (
            <TestimonialWithParallax
              quote={frontmatter.mobileTestimonial.quote}
              author={frontmatter.mobileTestimonial.author}
              rating={frontmatter.mobileTestimonial.rating}
              source={frontmatter.mobileTestimonial.source}
              parallaxImages={frontmatter.mobileParallaxImages}
            >
              {/* ===== Intro paragraph — top left, corporate-page style ===== */}
              {sections.length >= 1 && (
                <section className="pt-16 pb-1 bg-[#1C1C1C]">
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
                          color: '#F5F0EB'
                        }}
                      >
                        {sections[0].title}
                      </h2>
                      {sections[0].paragraphs.slice(0, 2).map((paragraph, index) => (
                        <p
                          key={index}
                          className="text-base lg:text-[0.95rem] last:mb-0"
                          style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#F5F0EB', fontWeight: 300, lineHeight: 1.75 }}
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* ===== A: StickyImageWithText — Sections 1 & 2 ===== */}
              {sections.length >= 2 && (
                <StickyImageWithText
                  background="#1C1C1C"
                  textColor="#F5F0EB"
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
                          color: '#F5F0EB',
                          marginBottom: '2.5rem'
                        }}
                      >
                        {frontmatter.portraitSessionsHeading || 'Portrait sessions without limits'}
                      </h2>
                      <Link
                        href="/pricing/"
                        className="inline-block text-white text-lg font-medium hover:opacity-90 transition-all duration-300 px-8 py-3"
                        style={{ fontFamily: '"Hanken Grotesk", sans-serif', backgroundColor: '#D4A843' }}
                      >
                        Start Here
                      </Link>
                    </>
                  }
                  images={[
                    {
                      src: sections[0].imagePath || '',
                      alt: sections[0].imageAlt || '',
                      paragraphs: sections[0].paragraphs.slice(2),
                      textColor: '#F5F0EB'
                    },
                    {
                      src: sections[1].imagePath || '',
                      alt: sections[1].imageAlt || '',
                      paragraphs: [sections[1].paragraphs[0]],
                      textColor: '#F5F0EB'
                    }
                  ]}
                />
              )}

              {/* ===== E: 5-Image Row ===== */}
              {imageRow.length > 0 && (
                <section className="bg-[#1C1C1C]">
                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-0">
                    {imageRow.map((img, i) => (
                      <div
                        key={i}
                        className={i === 2 ? 'hidden lg:block' : undefined}
                        data-reveal
                        data-reveal-delay={String(i * 100)}
                        data-reveal-direction="none"
                      >
                        <picture>
                          <source media="(max-width: 768px)" srcSet={getMobileSrc(img.src)} />
                          <img
                            src={img.src}
                            alt={img.alt}
                            width={600}
                            height={800}
                            className="w-full h-full"
                            style={{ objectFit: 'cover', aspectRatio: '3/4' }}
                            loading="lazy"
                          />
                        </picture>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ===== C: Image-left + text-right — Section 3 ===== */}
              {sections.length >= 3 && (
                <section className="bg-[#1C1C1C] py-10 lg:py-16">
                  <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                      <div data-reveal>
                        <picture>
                          <source media="(max-width: 768px)" srcSet={getMobileSrc(sections[2].imagePath || '')} />
                          <img
                            src={sections[2].imagePath}
                            alt={sections[2].imageAlt}
                            width={800}
                            height={1000}
                            className="w-full"
                            style={{ objectFit: 'cover' }}
                            loading="lazy"
                          />
                        </picture>
                      </div>
                      <div data-reveal data-reveal-delay="150">
                        <h2 style={{
                          fontFamily: "'Majesti Banner', serif",
                          fontSize: '1.1rem',
                          fontWeight: 300,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          color: '#F5F0EB',
                          marginBottom: '1.5rem'
                        }}>
                          {sections[2].title}
                        </h2>
                        {sections[2].paragraphs.map((p, i) => (
                          <p key={i} style={{
                            fontFamily: "'Hanken Grotesk', sans-serif",
                            fontSize: '0.9rem',
                            fontWeight: 300,
                            lineHeight: 1.7,
                            color: '#F5F0EB',
                            marginBottom: i < sections[2].paragraphs.length - 1 ? '1rem' : undefined
                          }}>
                            {p}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* ===== B: Statement Line ===== */}
              {frontmatter.homeStatementLine && (
                <div className="bg-[#1C1C1C] py-16 lg:py-24">
                  <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <blockquote
                      data-reveal
                      data-reveal-direction="left"
                      style={{
                        borderLeft: '3px solid #D4A843',
                        paddingLeft: '1.5rem',
                        fontFamily: "'Majesti Banner', serif",
                        fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                        fontWeight: 300,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        lineHeight: 1.3,
                        color: '#F5F0EB'
                      }}
                    >
                      {frontmatter.homeStatementLine}
                    </blockquote>
                  </div>
                </div>
              )}

              {/* ===== D: Image-left + text-right — Section 4 ===== */}
              {sections.length >= 4 && (
                <section className="bg-[#1C1C1C] py-10 lg:py-16">
                  <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                      <div data-reveal>
                        <picture>
                          <source media="(max-width: 768px)" srcSet={getMobileSrc(sections[3].imagePath || '')} />
                          <img
                            src={sections[3].imagePath}
                            alt={sections[3].imageAlt}
                            width={800}
                            height={1000}
                            className="w-full"
                            style={{ objectFit: 'cover' }}
                            loading="lazy"
                          />
                        </picture>
                      </div>
                      <div data-reveal data-reveal-delay="150">
                        {sections[3].title && (
                          <h2 style={{
                            fontFamily: "'Majesti Banner', serif",
                            fontSize: '1.1rem',
                            fontWeight: 300,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            color: '#F5F0EB',
                            marginBottom: '1.5rem'
                          }}>
                            {sections[3].title}
                          </h2>
                        )}
                        {sections[3].paragraphs.map((p, i) => (
                          <p key={i} style={{
                            fontFamily: "'Hanken Grotesk', sans-serif",
                            fontSize: '0.9rem',
                            fontWeight: 300,
                            lineHeight: 1.7,
                            color: '#F5F0EB',
                            marginBottom: i < sections[3].paragraphs.length - 1 ? '1rem' : undefined
                          }}>
                            {p}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* ===== Google Review — Ali H ===== */}
              {frontmatter.testimonials && frontmatter.testimonials[2] && (
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
                          <span style={{ fontFeatureSettings: '"ss01" on' }}>{frontmatter.testimonials[2].text.charAt(0)}</span>{frontmatter.testimonials[2].text.slice(1)}
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
                          — {frontmatter.testimonials[2].author}
                        </cite>
                      </div>
                    </div>
                    {frontmatter.testimonials[2].imagePath && (
                      <div className="flex items-center justify-center p-8 md:p-12">
                        <picture>
                          <source media="(max-width: 768px)" srcSet={getMobileSrc(frontmatter.testimonials[2].imagePath)} />
                          <img
                            src={frontmatter.testimonials[2].imagePath}
                            alt={frontmatter.testimonials[2].imageAlt}
                            width={800}
                            height={1000}
                            className="rounded-lg object-cover w-full md:w-auto"
                            style={{ maxHeight: '75vh', maxWidth: '100%' }}
                            loading="lazy"
                          />
                        </picture>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* ===== Designed for People Who Hate Being Photographed ===== */}
              {sections.length >= 6 && sections[5].imagePath && (
                <section className="bg-[#1C1C1C] py-10 lg:py-16">
                  <TextCardOverImage
                    title={sections[5].title}
                    paragraphs={sections[5].paragraphs.slice(0, 3)}
                    imagePath={sections[5].imagePath}
                    imageAlt={sections[5].imageAlt || ''}
                  />
                </section>
              )}

              {/* ===== Session guidance — StatementSplit ===== */}
              {sections.length >= 6 && sections[5].paragraphs.length > 3 && (
                <section className="bg-[#1C1C1C] py-10 lg:py-16">
                  <StatementSplit
                    pullLine="I Guide You Through Every Moment of the Session"
                    paragraphs={sections[5].paragraphs.slice(3)}
                    imagePath="/images/Corporate/Professional-Headshot-Margot-Portrait-Phoenix-Arizona-By-Marie-Feutrier.webp"
                    imageAlt="Professional headshot of Margot looking relaxed and confident during her portrait session"
                  />
                </section>
              )}

              {/* ===== 5-Image Row 2 ===== */}
              {imageRow2.length > 0 && (
                <section className="bg-[#1C1C1C]">
                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-0">
                    {imageRow2.map((img, i) => (
                      <div
                        key={i}
                        className={i === 2 ? 'hidden lg:block' : undefined}
                        data-reveal
                        data-reveal-delay={String(i * 100)}
                        data-reveal-direction="none"
                      >
                        <picture>
                          <source media="(max-width: 768px)" srcSet={getMobileSrc(img.src)} />
                          <img
                            src={img.src}
                            alt={img.alt}
                            width={600}
                            height={800}
                            className="w-full h-full"
                            style={{ objectFit: 'cover', aspectRatio: '3/4' }}
                            loading="lazy"
                          />
                        </picture>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ===== Gradient: dark to white ===== */}
              <div style={{ background: 'linear-gradient(180deg, #1C1C1C 0%, #FFFFFF 100%)' }}>

                {/* ===== The Transformation — Section 7 ===== */}
                {sections.length >= 7 && sections[6].imagePath && (
                  <section className="py-10 lg:py-16">
                    <div className="max-w-6xl mx-auto px-6 lg:px-8">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                        <div data-reveal>
                          <picture>
                            <source media="(max-width: 768px)" srcSet={getMobileSrc(sections[6].imagePath || '')} />
                            <img
                              src={sections[6].imagePath}
                              alt={sections[6].imageAlt}
                              width={800}
                              height={1000}
                              className="w-full"
                              style={{ objectFit: 'cover' }}
                              loading="lazy"
                            />
                          </picture>
                        </div>
                        <div data-reveal data-reveal-delay="150">
                          <h2 style={{
                            fontFamily: "'Majesti Banner', serif",
                            fontSize: '1.1rem',
                            fontWeight: 300,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            color: '#F5F0EB',
                            marginBottom: '1.5rem'
                          }}>
                            {sections[6].title}
                          </h2>
                          {sections[6].paragraphs.map((p, i) => (
                            <p key={i} style={{
                              fontFamily: "'Hanken Grotesk', sans-serif",
                              fontSize: '0.9rem',
                              fontWeight: 300,
                              lineHeight: 1.7,
                              color: '#F5F0EB',
                              marginBottom: i < sections[6].paragraphs.length - 1 ? '1rem' : undefined
                            }}>
                              {p}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* ===== F: Text Emphasis — Section 5 ===== */}
                {sections.length >= 5 && (
                  <section className="py-16 lg:py-24">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8" data-reveal>
                      <h2 style={{
                        fontFamily: "'Majesti Banner', serif",
                        fontSize: '1.1rem',
                        fontWeight: 300,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: '#1C1C1C',
                        marginBottom: '1.5rem'
                      }}>
                        {sections[4].title}
                      </h2>
                      {sections[4].paragraphs.map((p, i) => (
                        <p key={i} style={{
                          fontFamily: i === 0 ? "'Majesti Banner', serif" : "'Hanken Grotesk', sans-serif",
                          fontSize: i === 0 ? 'clamp(1.1rem, 1.5vw, 1.3rem)' : '0.9rem',
                          fontWeight: 300,
                          lineHeight: i === 0 ? 1.5 : 1.7,
                          color: '#1C1C1C',
                          marginBottom: i < sections[4].paragraphs.length - 1 ? '1rem' : undefined
                        }}>
                          {p}
                        </p>
                      ))}
                    </div>
                  </section>
                )}

              </div>

              {/* Animated FAQ */}
              {frontmatter.mobileFAQ && frontmatter.mobileFAQ.length > 0 && (
                <div className="bg-white">
                  <AnimatedFAQ
                    items={frontmatter.mobileFAQ}
                    scrollProgress={1}
                    theme="light"
                  />
                </div>
              )}

              {/* CTA Section */}
              {frontmatter.ctaButtons && (
                <CTASection buttons={frontmatter.ctaButtons} />
              )}

              {/* Footer */}
              <Footer />
            </TestimonialWithParallax>
          )}
        </div>
    </>
  )
}
