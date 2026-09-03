import { useEffect, useRef, ReactNode } from 'react'
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
  const overlayRef = useRef<HTMLDivElement>(null)

  // The overlay's `top` is written straight to the DOM inside a rAF-throttled
  // handler. The old setState-per-scroll version re-rendered this component's
  // children — which on home/location/service pages is the entire lower half
  // of the page — on every scroll event through the 200vh window.
  useEffect(() => {
    const applyProgress = (progress: number) => {
      // Parallax starts covering the testimonial after 40% progress
      const parallaxProgress = Math.max(0, (progress - 0.4) / 0.6)
      if (overlayRef.current) {
        overlayRef.current.style.top = `${100 - parallaxProgress * 100}vh`
      }
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      applyProgress(1)
      return
    }

    let ticking = false
    const update = () => {
      ticking = false
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const containerTop = rect.top
      const containerHeight = rect.height
      const viewportHeight = window.innerHeight

      // Progress: 0 when container top is at viewport bottom, 1 when container is fully scrolled
      // Testimonial freezes, parallax slides up over it
      if (containerTop < viewportHeight && containerTop > -containerHeight) {
        const progress = (viewportHeight - containerTop) / (viewportHeight + containerHeight)
        applyProgress(Math.max(0, Math.min(1, progress)))
      }
    }

    const handleScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    update()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
            className="testimonial-quote text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-8"
            style={{
              fontFamily: '"Romie", serif',
              fontWeight: 300,
              color: textColor,
              textTransform: 'uppercase',
              /* ss12 nests the A inside the C of "CAPTURED". It only fires on a
                 CA pair, so it is safe to set on the whole quote. */
              fontFeatureSettings: '"ss12"',
              lineHeight: 0.9,
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
          <style jsx>{`
            /* The emphasised phrases arrive through dangerouslySetInnerHTML, so
               they never get a styled-jsx scope class — :global() is what reaches
               them. ss01 is the set that gives Romie's swash E and swash T; ss03
               and ss05 do nothing here because these words have no A or R. */
            .testimonial-quote :global(em) {
              font-style: italic;
              text-transform: none;
              font-size: 1.2em;
              line-height: 1;
            }
            /* ss01 swaps capitals for Romie's swash forms. Opt in per phrase (or
               per word, via a span) so plain capitals stay plain. */
            .testimonial-quote :global(.swash) {
              font-feature-settings: 'ss01';
            }
            /* ss14 ligates Q+U into a single glyph. Scoped to the word so the
               swash R it would also apply never comes into play. */
            .testimonial-quote :global(.qu) {
              font-feature-settings: 'ss14';
            }
          `}</style>
          <p
            className="text-sm mb-1"
            style={{
              fontFamily: '"Romie", serif',
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
              fontFamily: '"Romie", serif',
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
              fontFamily: '"Romie", serif',
              color: '#666'
            }}
          >
            {source}
          </p>
        </div>
      </div>

      {/* Parallax Images - slides up over testimonial */}
      <div
        ref={overlayRef}
        className={`absolute left-0 right-0 ${children ? 'bottom-0' : ''} bg-[#1C1C1C]`}
        style={{
          top: '100vh',
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
              loading="lazy"
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
