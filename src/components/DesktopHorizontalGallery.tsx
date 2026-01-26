import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import TestimonialBigText from './TestimonialBigText'

interface GalleryItem {
  src: string
  alt: string
  headingAbove?: string
  headingBelow?: string
  size?: 'XS' | 'S' | 'M' | 'L' | 'XL'
  link?: string
}

interface Testimonial {
  quote: string[]
  author: string
  rating: number
  source: string
}

interface DesktopHorizontalGalleryProps {
  images: GalleryItem[]
  testimonial?: Testimonial
}

export default function DesktopHorizontalGallery({
  images,
  testimonial
}: DesktopHorizontalGalleryProps) {
  const [scrollY, setScrollY] = useState(0)

  // Gallery settings
  const galleryStart = 350     // When gallery appears at bottom
  const diagonalEnd = 1100     // When gallery reaches center
  const galleryEnd = 4500      // When horizontal scroll ends

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate progress values
  const diagonalProgress = scrollY <= galleryStart
    ? 0
    : scrollY >= diagonalEnd
      ? 1
      : (scrollY - galleryStart) / (diagonalEnd - galleryStart)

  const horizontalProgress = scrollY <= diagonalEnd
    ? 0
    : scrollY >= galleryEnd
      ? 1
      : (scrollY - diagonalEnd) / (galleryEnd - diagonalEnd)

  // Vertical position: 160% (below screen) -> 60% (center)
  const verticalPosition = 160 - (diagonalProgress * 100)

  // Horizontal movement (in vw units)
  const diagonalLeftMove = diagonalProgress * 26  // vw
  const horizontalOnlyMove = horizontalProgress * 220  // vw
  const totalHorizontalMove = diagonalLeftMove + horizontalOnlyMove  // vw

  // Image sizes (vw = viewport width)
  const getWidth = (size?: 'XS' | 'S' | 'M' | 'L' | 'XL') => {
    switch (size) {
      case 'XS': return '9vw'
      case 'S': return '13vw'
      case 'M': return '17vw'
      case 'L': return '23vw'
      case 'XL': return '30vw'
      default: return '15vw'
    }
  }

  // Scattered vertical offsets (vh = viewport height) - 11 images
  const verticalOffsets = ['0vh', '33vh', '5vh', '0vh', '35vh', '33vh', '0vh', '12vh', '34vh', '18vh', '6vh']

  // Horizontal offsets (vw, negative = closer to previous image) - 11 images
  const horizontalOffsets = ['0vw', '-6vw', '0vw', '0vw', '-10vw', '5vw', '-15vw', '0vw', '-5vw', '0vw', '0vw']

  // Gallery visibility and fade out at end
  const isVisible = scrollY >= galleryStart && scrollY < galleryEnd + 200
  const fadeOutProgress = scrollY > galleryEnd ? Math.min(1, (scrollY - galleryEnd) / 200) : 0
  const galleryOpacity = 1 - fadeOutProgress

  if (!isVisible) return null

  return (
    <div
      className="hidden md:block fixed inset-0 z-[15] pointer-events-none"
      style={{ opacity: galleryOpacity }}
    >
      <div
        className="absolute left-0 flex items-start pointer-events-auto"
        style={{
          top: `${verticalPosition}%`,
          transform: `translate3d(calc(100vw - 10vw - ${totalHorizontalMove}vw), -50%, 0)`,
          willChange: 'transform',
          gap: '3vw'
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0"
            style={{
              width: getWidth(image.size),
              marginTop: verticalOffsets[index % verticalOffsets.length],
              marginLeft: horizontalOffsets[index % horizontalOffsets.length]
            }}
          >
            {image.headingAbove && (
              image.link ? (
                <Link href={image.link}>
                  <h2
                    className="text-sm mb-2"
                    style={{
                      fontFamily: '"Majesti Banner", serif',
                      fontWeight: 300,
                      color: '#1C1C1C',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      lineHeight: 1.1,
                      whiteSpace: 'pre-line'
                    }}
                  >
                    {image.headingAbove}
                  </h2>
                </Link>
              ) : (
                <h2
                  className="text-sm mb-2"
                  style={{
                    fontFamily: '"Majesti Banner", serif',
                    fontWeight: 300,
                    color: '#1C1C1C',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    lineHeight: 1.1,
                    whiteSpace: 'pre-line'
                  }}
                >
                  {image.headingAbove}
                </h2>
              )
            )}
            <Image
              src={image.src}
              alt={image.alt}
              width={800}
              height={1000}
              className="w-full h-auto object-cover rounded-lg"
            />
            {image.headingBelow && (
              <h3
                className="text-xs mt-2"
                style={{
                  fontFamily: '"Hanken Grotesk", sans-serif',
                  fontWeight: 400,
                  color: '#1C1C1C',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                {image.headingBelow}
              </h3>
            )}
          </div>
        ))}

      </div>

      {/* Fixed text at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 text-center pb-4"
        style={{
          fontFamily: '"Hanken Grotesk", sans-serif',
          fontWeight: 300,
          fontSize: '1rem',
          color: '#1C1C1C',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}
      >
        Professional portraits you'll love
      </div>
    </div>
  )
}
