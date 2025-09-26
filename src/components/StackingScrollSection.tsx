import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface StackingScrollSectionProps {
  title: string
  images: {
    src: string
    alt: string
  }[]
}

export default function StackingScrollSection({ title, images }: StackingScrollSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const section = sectionRef.current
      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Check if section is visible
      const isInView = rect.top < windowHeight && rect.bottom > 0
      setIsVisible(isInView)

      if (isInView) {
        // Calculate scroll progress within the section
        const sectionHeight = section.offsetHeight
        const scrolled = windowHeight - rect.top
        const progress = Math.max(0, Math.min(1, scrolled / (sectionHeight + windowHeight)))
        setScrollProgress(progress)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen py-20 bg-black overflow-hidden"
      style={{
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always'
      }}
    >
      {/* Title */}
      <div className="relative z-20 text-center mb-16">
        <h2
          className="text-6xl md:text-8xl font-light text-white transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(50px)'
          }}
        >
          {title}
        </h2>
      </div>

      {/* Stacking Images */}
      <div className="relative h-[80vh] max-w-7xl mx-auto px-4">
        {images.map((image, index) => {
          // Calculate stacking effect
          const stackOffset = index * 20
          const scaleProgress = Math.max(0, scrollProgress - (index * 0.2))
          const scale = 0.7 + (scaleProgress * 0.3)
          const opacity = Math.max(0.3, 1 - (scrollProgress * 0.5))
          const yOffset = stackOffset - (scrollProgress * 100 * (index + 1))

          return (
            <div
              key={index}
              className="absolute inset-0 flex justify-center items-center"
              style={{
                transform: `translateY(${yOffset}px) scale(${scale})`,
                opacity: opacity,
                zIndex: images.length - index,
                transition: scrollProgress === 0 ? 'all 0.8s ease-out' : 'none'
              }}
            >
              <div className="relative w-full max-w-4xl h-[70vh]">
                <div
                  className="grid gap-4 h-full"
                  style={{
                    gridTemplateColumns: index % 2 === 0 ? '1fr 1fr 1fr' : '2fr 1fr 2fr'
                  }}
                >
                  {/* Column 1 */}
                  <div className="relative">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover shadow-2xl"
                    />
                  </div>

                  {/* Column 2 */}
                  <div className="relative">
                    <Image
                      src={images[(index + 1) % images.length].src}
                      alt={images[(index + 1) % images.length].alt}
                      fill
                      className="object-cover shadow-2xl"
                    />
                  </div>

                  {/* Column 3 */}
                  <div className="relative">
                    <Image
                      src={images[(index + 2) % images.length].src}
                      alt={images[(index + 2) % images.length].alt}
                      fill
                      className="object-cover shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Gradient overlay for smooth transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10"
        style={{
          opacity: 1 - scrollProgress
        }}
      />
    </div>
  )
}