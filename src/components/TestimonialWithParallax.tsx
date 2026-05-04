import { useEffect, useState, useRef, ReactNode } from 'react'
import Image from 'next/image'

interface ParallaxImage {
  src: string
  alt: string
}

interface TestimonialWithParallaxProps {
  quote: string[]
  author: string
  rating: number
  source: string
  parallaxImages: ParallaxImage[]
  children?: ReactNode
  textWidth?: string
  theme?: 'light' | 'dark'
}

export default function TestimonialWithParallax({
  quote,
  author,
  rating,
  source,
  parallaxImages,
  children,
  textWidth,
  theme = 'light'
}: TestimonialWithParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setScrollProgress(1)
      return
    }

    const handleScroll = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const containerTop = rect.top
      const containerHeight = rect.height
      const viewportHeight = window.innerHeight

      // Progress: 0 when container top is at viewport bottom, 1 when container is fully scrolled
      // Testimonial freezes, parallax slides up over it
      if (containerTop < viewportHeight && containerTop > -containerHeight) {
        const progress = (viewportHeight - containerTop) / (viewportHeight + containerHeight)
        setScrollProgress(Math.max(0, Math.min(1, progress)))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Parallax starts covering testimonial after 40% progress
  const parallaxProgress = Math.max(0, (scrollProgress - 0.4) / 0.6)

  const textColor = theme === 'dark' ? '#F5F0EB' : '#1C1C1C'
  const bgColor = theme === 'dark' ? '#1C1C1C' : undefined

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: '200vh' }}
    >
      {/* Testimonial - sticky */}
      <div
        className="sticky top-0 h-screen flex items-center justify-center"
        style={{ zIndex: 1, backgroundColor: bgColor }}
      >
        <div className="text-center px-4" style={textWidth ? { maxWidth: textWidth, margin: '0 auto' } : undefined}>
          <p
            className="text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-8"
            style={{
              fontFamily: '"Majesti Banner", serif',
              fontWeight: 300,
              color: textColor,
              textTransform: 'uppercase',
              lineHeight: 0.85,
              letterSpacing: '0.02em'
            }}
          >
            {quote.map((line, index) => (
              <span key={index}>
                <span dangerouslySetInnerHTML={{ __html: line }} />
                {index < quote.length - 1 && <br />}
              </span>
            ))}
          </p>
          <p
            className="text-sm mb-1"
            style={{
              fontFamily: '"Hanken Grotesk", sans-serif',
              fontWeight: 500,
              color: textColor,
              letterSpacing: '0.1em'
            }}
          >
            - {author}
          </p>
          <p
            className="text-sm"
            style={{
              fontFamily: '"Hanken Grotesk", sans-serif',
              color: textColor
            }}
            aria-label={`${rating} out of 5 stars`}
            role="img"
          >
            {'★'.repeat(rating)}
          </p>
          <p
            className="text-xs mt-1"
            style={{
              fontFamily: '"Hanken Grotesk", sans-serif',
              color: '#666'
            }}
          >
            {source}
          </p>
        </div>
      </div>

      {/* Parallax Images - slides up over testimonial */}
      <div
        className={`absolute left-0 right-0 ${children ? 'bottom-0' : ''} bg-[#1C1C1C]`}
        style={{
          top: `${100 - (parallaxProgress * 100)}vh`,
          ...(!children && { height: '100vh' }),
          zIndex: 2
        }}
      >
        {/* Mobile: Single image, uncropped */}
        {parallaxImages[0] && (
          <div className="md:hidden w-full">
            <img
              src={parallaxImages[0].src}
              alt={parallaxImages[0].alt}
              width={800}
              height={1000}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Desktop: 3 images grid */}
        <div className="hidden md:flex w-full" style={{ height: '100vh' }}>
          {parallaxImages.map((image) => (
            <div key={image.src} className="relative h-full flex-1">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover object-top"
              />
            </div>
          ))}
        </div>

        {/* Content that follows parallax images */}
        {children}
      </div>
    </div>
  )
}
