'use client'

import { useRef, useState, useEffect, useMemo } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { trackPhotoView, trackPhotoClick, usePhotoViewTracking } from '@/lib/analytics'

interface CarouselImage {
  src: string
  alt: string
}

interface CardStackCarouselProps {
  heading: React.ReactNode
  subtext: string
  heroImage: CarouselImage
  carouselImages: CarouselImage[]
  imageWidth?: number
  imageGap?: number
  lightBg?: string
  darkBg?: string
  lightText?: string
  darkText?: string
  /* Desktop renders the heading uppercase by default. Opt out to keep the
     heading's own casing (mobile has never uppercased it). */
  uppercaseHeading?: boolean
}

const MOBILE_LOCATION = 'home_carousel_mobile'
const DESKTOP_HERO_LOCATION = 'home_carousel_hero'
const DESKTOP_CARD_LOCATION = 'home_carousel_card'

// ─── MOBILE ────────────────────────────────────────────────────
function MobileCardStack({ heading, subtext, heroImage, carouselImages, lightBg = '#F5F0EB', darkBg = '#1C1C1C', darkText = '#1C1C1C' }: CardStackCarouselProps) {
  const allImages = useMemo(() => [heroImage, ...carouselImages], [heroImage, carouselImages])
  const [currentIndex, setCurrentIndex] = useState(0)
  const touchStartX = useRef(0)
  const viewedRef = useRef<Set<number>>(new Set())

  useEffect(() => {
    if (!viewedRef.current.has(currentIndex)) {
      viewedRef.current.add(currentIndex)
      const img = allImages[currentIndex]
      trackPhotoView(img.src, img.alt, MOBILE_LOCATION)
    }
  }, [currentIndex, allImages])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < allImages.length - 1) setCurrentIndex(currentIndex + 1)
      else if (diff < 0 && currentIndex > 0) setCurrentIndex(currentIndex - 1)
    }
  }

  const handleDotClick = (i: number) => {
    setCurrentIndex(i)
    const img = allImages[i]
    trackPhotoClick(img.src, img.alt, MOBILE_LOCATION)
  }

  return (
    <section>
      {/* Light section: heading + text + gold line */}
      <div style={{ backgroundColor: lightBg, padding: '3rem 1.5rem 0', position: 'relative' }}>
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 400 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ zIndex: 0 }}
        >
          <path d="M200 0 C150 200 100 400 200 600" stroke="#D4A843" strokeWidth="1" fill="none" />
        </svg>
        <h2
          style={{
            fontFamily: '"Romie", serif',
            fontWeight: 300,
            fontSize: '1.8rem',
            
            letterSpacing: '0.03em',
            lineHeight: 1.1,
            color: darkText,
            marginBottom: '1.5rem',
            position: 'relative',
            zIndex: 1
          }}
        >
          {heading}
        </h2>
        <p
          style={{
            fontFamily: '"Romie", serif',
            fontWeight: 300,
            fontSize: '0.95rem',
            lineHeight: 1.7,
            color: darkText,
            opacity: 0.8,
            marginBottom: '0',
            paddingBottom: '1.5rem',
            position: 'relative',
            zIndex: 1
          }}
        >
          {subtext}
        </p>
      </div>

      {/* Full-width image — no padding */}
      <div
        style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/5' }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          style={{
            display: 'flex',
            transition: 'transform 0.4s ease',
            transform: `translateX(-${currentIndex * 100}%)`,
            height: '100%'
          }}
        >
          {allImages.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.alt}
              style={{
                minWidth: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top'
              }}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          ))}
        </div>
      </div>

      {/* Dark section: dots */}
      <div style={{ backgroundColor: darkBg, padding: '1.5rem 1.5rem 3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
          {allImages.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              aria-label={`Show image ${i + 1}`}
              style={{
                width: currentIndex === i ? '10px' : '8px',
                height: currentIndex === i ? '10px' : '8px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: currentIndex === i ? '#D4A843' : '#555',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── DESKTOP ───────────────────────────────────────────────────
function DesktopCardStack({
  heading,
  subtext,
  heroImage,
  carouselImages,
  imageWidth = 380,
  imageGap = 20,
  lightBg = '#F5F0EB',
  darkBg = '#1C1C1C',
  lightText = '#F5F0EB',
  darkText = '#1C1C1C',
  uppercaseHeading = true
}: CardStackCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroImageRef = useRef<HTMLImageElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const viewedRef = useRef<Set<number>>(new Set())
  const cardsRevealedRef = useRef(false)

  usePhotoViewTracking(heroImageRef, heroImage.src, heroImage.alt, DESKTOP_HERO_LOCATION)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Fire a view event for the first carousel card when the reveal threshold is crossed
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!cardsRevealedRef.current && v >= 0.6 && carouselImages[0]) {
      cardsRevealedRef.current = true
      viewedRef.current.add(0)
      trackPhotoView(carouselImages[0].src, carouselImages[0].alt, DESKTOP_CARD_LOCATION)
    }
  })

  useEffect(() => {
    if (!cardsRevealedRef.current) return
    if (!viewedRef.current.has(activeIndex) && carouselImages[activeIndex]) {
      viewedRef.current.add(activeIndex)
      trackPhotoView(carouselImages[activeIndex].src, carouselImages[activeIndex].alt, DESKTOP_CARD_LOCATION)
    }
  }, [activeIndex, carouselImages])

  // Card reveal: vertical band → full image
  const clipLeft = useTransform(scrollYProgress, [0.55, 0.7], [49, 0])
  const clipRight = useTransform(scrollYProgress, [0.55, 0.7], [49, 0])
  const cardOpacity = useTransform(scrollYProgress, [0.55, 0.6], [0, 1])
  // Hoisted out of the cards .map() — calling a hook inside a loop violates
  // the Rules of Hooks (crashes if the array length ever changes between
  // renders), and the transform is identical for every card anyway.
  const cardClipPath = useTransform([clipLeft, clipRight], ([l, r]: number[]) => `inset(0 ${r}% 0 ${l}% round 6px)`)
  // Invisible controls must not steal clicks: opacity 0 keeps hit-testing on.
  const controlPointerEvents = useTransform(cardOpacity, v => (v > 0.1 ? 'auto' : 'none'))

  // Second image slides left to cover first
  const carouselX = useTransform(
    scrollYProgress,
    [0.7, 0.92],
    [0, -(imageWidth + imageGap)]
  )

  // Gold line fades out as bg darkens
  const goldLineOpacity = useTransform(scrollYProgress, [0, 0.45, 0.6], [1, 1, 0])

  // Background: light → dark
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.5, 0.6],
    [lightBg, lightBg, darkBg]
  )

  const textColor = useTransform(
    scrollYProgress,
    [0, 0.5, 0.6],
    [darkText, darkText, lightText]
  )

  const handlePrev = () => {
    const newIndex = Math.max(0, activeIndex - 1)
    if (newIndex !== activeIndex && carouselImages[newIndex]) {
      trackPhotoClick(carouselImages[newIndex].src, carouselImages[newIndex].alt, DESKTOP_CARD_LOCATION)
    }
    setActiveIndex(newIndex)
  }

  const handleNext = () => {
    const newIndex = Math.min(carouselImages.length - 1, activeIndex + 1)
    if (newIndex !== activeIndex && carouselImages[newIndex]) {
      trackPhotoClick(carouselImages[newIndex].src, carouselImages[newIndex].alt, DESKTOP_CARD_LOCATION)
    }
    setActiveIndex(newIndex)
  }

  return (
    <motion.div
      ref={containerRef}
      style={{
        backgroundColor: bgColor,
        display: 'flex',
        alignItems: 'flex-start',
        padding: '0 4vw',
        minHeight: '350vh',
        overflowX: 'clip',
        position: 'relative'
      }}
    >
      {/* Gold SVG line — visible on light background */}
      <motion.svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 1200 4000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: goldLineOpacity, zIndex: 0 }}
      >
        <path d="M600 0 C400 300 200 600 400 900 C600 1200 800 1400 600 1700 C400 2000 200 2200 400 2500 C600 2800 800 3000 600 3300 C400 3600 200 3800 400 4000" stroke="#D4A843" strokeWidth="1" fill="none" />
      </motion.svg>

      {/* Left — Heading (scrolls up, then sticks at image center) */}
      <div style={{ width: '33%', paddingRight: '3vw', minHeight: '250vh' }}>
        <div style={{ height: '78vh' }} />
        <div style={{ position: 'sticky', top: '35vh' }}>
          <motion.h2
            style={{
              fontFamily: '"Romie", serif',
              fontWeight: 300,
              fontSize: 'clamp(2rem, 3vw, 3.2rem)',
              textTransform: uppercaseHeading ? 'uppercase' : 'none',
              letterSpacing: '0.03em',
              lineHeight: 1.1,
              color: textColor
            }}
          >
            {heading}
          </motion.h2>
        </div>
      </div>

      {/* Center — Image (sticky, stays pinned) */}
      <div
        style={{
          width: '33%',
          position: 'sticky',
          top: '5vh',
          paddingTop: '5vh',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <img
          ref={heroImageRef}
          src={heroImage.src}
          alt={heroImage.alt}
          style={{
            width: `${imageWidth}px`,
            aspectRatio: '4/5',
            objectFit: 'cover',
            objectPosition: 'center top',
            borderRadius: '6px'
          }}
        />

        {/* Carousel cards — fixed size, more visible on wider screens */}
        {carouselImages.map((img, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              left: `calc(50% + ${imageWidth / 2 + imageGap + i * (imageWidth + imageGap) - (i > 0 ? Math.min(activeIndex, i) * (imageWidth + imageGap) : 0)}px)`,
              top: '5vh',
              width: `${imageWidth}px`,
              aspectRatio: '4/5',
              borderRadius: '6px',
              overflow: 'hidden',
              opacity: cardOpacity,
              x: carouselX,
              transition: 'left 0.6s ease',
              clipPath: cardClipPath
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top'
              }}
              loading="lazy"
            />
          </motion.div>
        ))}

        {/* Left chevron */}
        <motion.button
          onClick={handlePrev}
          aria-label="Previous image"
          style={{
            position: 'absolute',
            left: `calc(50% - ${imageWidth / 2}px + 12px)`,
            top: '50vh',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            opacity: cardOpacity,
            pointerEvents: controlPointerEvents,
            zIndex: 10
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={lightText} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </motion.button>

        {/* Right chevron — absolute (was position:fixed, which floated over
            unrelated sections after scrolling past the carousel and stole
            clicks while invisible before it) */}
        <motion.button
          onClick={handleNext}
          aria-label="Next image"
          style={{
            position: 'absolute',
            right: '2vw',
            top: '50vh',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            opacity: cardOpacity,
            pointerEvents: controlPointerEvents,
            zIndex: 10
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={lightText} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </motion.button>
      </div>

      {/* Right — Text (scrolls with page) */}
      <div style={{ width: '33%', paddingTop: '78vh', paddingLeft: '3vw' }}>
        <motion.p
          style={{
            fontFamily: '"Romie", serif',
            fontWeight: 300,
            fontSize: '1rem',
            lineHeight: 1.7,
            color: textColor
          }}
        >
          {subtext}
        </motion.p>
      </div>
    </motion.div>
  )
}

// ─── Main export ───────────────────────────────────────────────
export default function CardStackCarousel(props: CardStackCarouselProps) {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return isDesktop ? <DesktopCardStack {...props} /> : <MobileCardStack {...props} />
}
