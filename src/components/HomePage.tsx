import { useState, useEffect } from 'react'
import ScatteredImageGallery from './ScatteredImageGallery'
import TestimonialWithParallax from './TestimonialWithParallax'
import HeadingWithPhoto from './HeadingWithPhoto'
import AnimatedFAQ from './AnimatedFAQ'
import CTASection from './CTASection'
import Footer from './Footer'

interface HomePageLayoutProps {
  frontmatter: {
    title: string
    heroTitle: string
    defaultHeroImage: string
    defaultHeroImageAlt: string
    mobileRevealText: string[]
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
    portraitSessionsDescription?: string
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

  // Gallery section: 50vh - 500vh of scroll (desktop)
  const galleryScrollStart = 50 * vh
  const galleryScrollEnd = 500 * vh

  // Content after gallery starts at 500vh
  const contentStart = 500 * vh

  // Hero animation values
  const heroScale = 1 - (heroProgress * 0.75)
  // Both mobile and desktop: stay visible until 70% progress, then snap to hidden
  const heroOpacity = heroProgress < 0.7 ? 1 : 0

  // After hero animation completes, scroll the reveal content up
  const revealScrollOffset = scrollY > heroScrollEnd
    ? Math.min(scrollY - heroScrollEnd, 150 * vh)
    : 0

  // Total scroll height: hero + gallery + content sections
  // Desktop: calculated to stop at footer
  // Mobile: content flows naturally after gallery
  const maxDesktopScroll = 400 * vh
  const totalScrollHeight = isDesktop ? `${maxDesktopScroll}px` : 'auto'

  return (
    <>
      {/* ==================== SCROLL CONTAINER ==================== */}
      <div style={{ minHeight: totalScrollHeight }}>

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
                width: isDesktop ? '30vw' : '35vw',
                height: isDesktop ? '35vh' : '30vh',
                transform: 'translateX(-50%)',
                backgroundImage: `url(${frontmatter.defaultHeroImage})`
              }}
            />

            {/* Reveal text */}
            <div
              className="absolute left-[10%] right-[10%] text-center"
              style={{
                top: isDesktop ? '55vh' : '50vh',
                fontFamily: '"Majesti Banner", serif',
                fontWeight: 300,
                color: '#1C1C1C',
                textTransform: 'uppercase',
                lineHeight: 0.75,
                fontSize: isDesktop ? '6vw' : '12vw'
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
                backgroundImage: `url(${frontmatter.defaultHeroImage})`,
                transform: `scale(${heroScale})`,
                transformOrigin: isDesktop ? 'center 15%' : 'center 25%',
                willChange: 'transform'
              }}
            />
            {/* H1 for SEO */}
            <h1
              className="absolute bottom-[4vh] left-[2vh] text-sm tracking-wider"
              style={{
                fontFamily: '"Hanken Grotesk", sans-serif',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#ffffff'
              }}
            >
              Professional Headshots Photographer | Phoenix, Arizona
            </h1>
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
            marginTop: isDesktop ? '500vh' : '-25vh'
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
              {/* Heading With Photo */}
              <HeadingWithPhoto
                heading={frontmatter.portraitSessionsHeading || 'Portrait sessions without limits'}
                description={frontmatter.portraitSessionsDescription || 'Time, outfits, and backgrounds—all unrestricted'}
                image={{
                  src: '/images/BTS/Studio-Portrait-Session-By-Marie-Feutrier.webp',
                  alt: 'Behind the scenes studio portrait session',
                  link: '/pricing'
                }}
              />

              {/* Animated FAQ */}
              {frontmatter.mobileFAQ && frontmatter.mobileFAQ.length > 0 && (
                <div className="bg-[#1C1C1C]">
                  <AnimatedFAQ
                    items={frontmatter.mobileFAQ}
                    scrollProgress={1}
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
      </div>
    </>
  )
}
