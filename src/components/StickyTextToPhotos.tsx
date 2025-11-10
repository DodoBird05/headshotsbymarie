import { useState, useEffect } from 'react'
import Image from 'next/image'

interface StickyTextToPhotosProps {
  text: string
  images: {
    src: string
    alt: string
    className?: string
  }[]
  scrollDuration?: number
}

export default function StickyTextToPhotos({
  text,
  images,
  scrollDuration = 100 // percentage of viewport height
}: StickyTextToPhotosProps) {
  const [textOpacity, setTextOpacity] = useState(1)
  const [photosOpacity, setPhotosOpacity] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY

      // Calculate the position of the sticky section
      // This assumes the section starts after previous content
      // You may need to adjust this based on your layout
      const sectionTop = document.getElementById('sticky-text-photos')?.offsetTop || 0
      const heroHeight = window.innerHeight
      const stickyStart = sectionTop
      const stickyDuration = heroHeight * (scrollDuration / 100)

      // Calculate progress through the sticky section
      if (scrollY < stickyStart) {
        // Before the sticky section
        setTextOpacity(1)
        setPhotosOpacity(0)
      } else if (scrollY >= stickyStart + stickyDuration) {
        // After the sticky section
        setTextOpacity(0)
        setPhotosOpacity(1)
      } else {
        // During the sticky section - fade from text to photos
        const progress = (scrollY - stickyStart) / stickyDuration
        setTextOpacity(1 - progress)
        setPhotosOpacity(progress)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollDuration])

  return (
    <>
      {/* Sticky Section Wrapper - creates scroll space */}
      <div id="sticky-text-photos" style={{ height: '200vh', position: 'relative' }}>
        {/* Sticky Content */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            backgroundColor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 40px'
          }}
        >
          {/* Text */}
          <h2
            className="sticky-hero-text"
            style={{
              fontFamily: '"Majesti Banner", serif',
              fontWeight: 300,
              color: '#1C1C1C',
              textAlign: 'center',
              lineHeight: '1.2',
              opacity: textOpacity,
              transition: 'opacity 0.1s ease-out',
              position: 'absolute',
              zIndex: 2
            }}
          >
            {text}
          </h2>

          {/* Photos */}
          <div
            className="sticky-hero-photos"
            style={{
              opacity: photosOpacity,
              transition: 'opacity 0.1s ease-out',
              position: 'absolute',
              zIndex: 1
            }}
          >
            {images.map((image, idx) => (
              <div
                key={idx}
                className={`sticky-photo ${image.className || ''}`}
                style={{ position: 'relative', width: '30%', aspectRatio: '2/3' }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  style={{ objectFit: 'cover', borderRadius: '8px' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Component-specific styles */}
      <style jsx>{`
        .sticky-hero-text {
          font-size: 72px;
          padding: 0 10%;
        }
        .sticky-hero-photos {
          display: flex;
          gap: 40px;
          max-width: 1400px;
          width: 100%;
          justify-content: center;
          align-items: center;
          padding: 0 40px;
        }
        .photo-erich {
          display: block;
        }
        @media (max-width: 768px) {
          .sticky-hero-text {
            font-size: 48px;
            padding: 0 10%;
          }
          .sticky-hero-photos {
            flex-direction: column;
            gap: 12px;
            padding: 0 15px;
            max-width: 100%;
            width: 100%;
            align-items: center;
          }
          .sticky-photo {
            width: auto !important;
            max-height: 25vh !important;
            height: 25vh !important;
            aspect-ratio: 4/5 !important;
          }
          .photo-erich {
            display: block;
          }
        }
        @media (max-width: 480px) {
          .sticky-hero-text {
            font-size: 36px;
            padding: 0 10%;
          }
          .sticky-hero-photos {
            flex-direction: column;
            gap: 8px;
            padding: 0 12px;
            max-width: 100%;
            width: 100%;
            align-items: center;
          }
          .sticky-photo {
            width: auto !important;
            max-height: 25vh !important;
            height: 25vh !important;
            aspect-ratio: 4/5 !important;
          }
          .photo-erich {
            display: block;
          }
        }
      `}</style>
    </>
  )
}
