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
}

export default function TestimonialWithParallax({
  quote,
  author,
  rating,
  source,
  parallaxImages,
  children
}: TestimonialWithParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
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

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: '200vh' }}
    >
      {/* Testimonial - sticky */}
      <div
        className="sticky top-0 h-screen flex items-center justify-center"
        style={{ zIndex: 1 }}
      >
        <div className="text-center px-4">
          <p
            className="text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-8"
            style={{
              fontFamily: '"Majesti Banner", serif',
              fontWeight: 300,
              color: '#1C1C1C',
              textTransform: 'uppercase',
              lineHeight: 0.85,
              letterSpacing: '0.02em'
            }}
          >
            {quote.map((line, index) => (
              <span key={index}>
                {index === 0 ? (
                  <>
                    <span style={{ fontFeatureSettings: '"ss01" on' }}>{line.charAt(0)}</span>
                    {line.slice(1)}
                  </>
                ) : (
                  line
                )}
                {index < quote.length - 1 && <br />}
              </span>
            ))}
          </p>
          <p
            className="text-sm mb-1"
            style={{
              fontFamily: '"Hanken Grotesk", sans-serif',
              fontWeight: 500,
              color: '#1C1C1C',
              letterSpacing: '0.1em'
            }}
          >
            - {author}
          </p>
          <p
            className="text-sm"
            style={{
              fontFamily: '"Hanken Grotesk", sans-serif',
              color: '#1C1C1C'
            }}
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
        className="absolute left-0 right-0 bottom-0 bg-[#1C1C1C]"
        style={{
          top: `${100 - (parallaxProgress * 100)}vh`,
          zIndex: 2
        }}
      >
        {/* Mobile: Single image */}
        <div className="md:hidden relative w-full" style={{ height: '100vh' }}>
          <Image
            src={parallaxImages[0]?.src || ''}
            alt={parallaxImages[0]?.alt || ''}
            fill
            className="object-cover"
          />
        </div>

        {/* Desktop: 3 images grid */}
        <div className="hidden md:flex w-full" style={{ height: '100vh' }}>
          {parallaxImages.map((image, index) => (
            <div key={index} className="relative h-full flex-1">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
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
