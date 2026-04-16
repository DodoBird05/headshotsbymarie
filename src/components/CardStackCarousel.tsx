'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

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
}

// ─── MOBILE ────────────────────────────────────────────────────
function MobileCardStack({ heading, subtext, heroImage, carouselImages, lightBg = '#F5F0EB', darkBg = '#1C1C1C', lightText = '#F5F0EB', darkText = '#1C1C1C' }: CardStackCarouselProps) {
  const allImages = [heroImage, ...carouselImages]
  const [currentIndex, setCurrentIndex] = useState(0)
  const touchStartX = useRef(0)

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
            fontFamily: '"Majesti Banner", serif',
            fontWeight: 300,
            fontSize: '1.8rem',
            textTransform: 'uppercase',
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
            fontFamily: '"Hanken Grotesk", sans-serif',
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
              onClick={() => setCurrentIndex(i)}
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
  darkText = '#1C1C1C'
}: CardStackCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Card reveal: vertical band → full image
  const clipLeft = useTransform(scrollYProgress, [0.55, 0.7], [49, 0])
  const clipRight = useTransform(scrollYProgress, [0.55, 0.7], [49, 0])
  const cardOpacity = useTransform(scrollYProgress, [0.55, 0.6], [0, 1])

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
              fontFamily: '"Majesti Banner", serif',
              fontWeight: 300,
              fontSize: 'clamp(2rem, 3vw, 3.2rem)',
              textTransform: 'uppercase',
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
              clipPath: useTransform([clipLeft, clipRight], ([l, r]) => `inset(0 ${r}% 0 ${l}% round 6px)`)
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
          onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
          aria-label="Previous image"
          style={{
            position: 'absolute',
            left: `calc(50% - ${imageWidth / 2}px + 12px)`,
            top: '50vh',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            opacity: cardOpacity,
            zIndex: 10
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={lightText} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </motion.button>

        {/* Right chevron */}
        <motion.button
          onClick={() => setActiveIndex(Math.min(carouselImages.length - 1, activeIndex + 1))}
          aria-label="Next image"
          style={{
            position: 'fixed',
            right: '2vw',
            top: '50vh',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            opacity: cardOpacity,
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
            fontFamily: '"Hanken Grotesk", sans-serif',
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
