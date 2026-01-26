import { useState, useEffect } from 'react'
import Image from 'next/image'

// Real gallery images from homepage
const testImages = [
  { src: '/images/LinkedIn/Professional-Corporate-Portraits-Phoenix-Arizona-By-Marie-Feutrier.webp', alt: 'Professional corporate portrait', headingAbove: 'LinkedIn Profile', size: 'M' as const },
  { src: '/images/Corporate/Professional-Law-Firm-Partner-Headshots-Phoenix-Arizona-By-Marie-Feutrier.webp', alt: 'Law firm partners', headingAbove: 'Team Photo', size: 'M' as const },
  { src: '/images/Good Photos/Professional-Speaker-Branding-Photography-Phoenix-Arizona-By-Marie-Feutrier.webp', alt: 'Speaker branding', headingAbove: 'Personal Branding\nPhotography', size: 'L' as const },
  { src: '/images/Good Photos/Professional-Influencer-Headshot-Phoenix-Arizona-By-Marie-Feutrier.webp', alt: 'Influencer headshot', headingAbove: 'Headshots for\nCreatives', size: 'S' as const },
  { src: '/images/Good Photos/Professional-Business-Casual-Portrait-Phoenix-Arizona-By-Marie-Feutrier.webp', alt: 'Business casual portrait', headingAbove: 'Business Portraits', size: 'S' as const },
  { src: '/images/BTS/Professional-Headshot-Photography-Session-Behind-the-Scenes-Gilbert-Arizona.webp', alt: 'Behind the scenes', size: 'XL' as const },
  { src: '/images/Good Photos/Professional-Acting-Headshot-Phoenix-Arizona-By-Marie-Feutrier.webp', alt: 'Acting headshot', headingAbove: 'Actor Headshots', size: 'S' as const },
  { src: '/images/Good Photos/Professional-Executive-Headshot-Phoenix-Arizona-By-Marie-Feutrier.webp', alt: 'Executive headshot', headingAbove: 'Office Headshots', size: 'XS' as const },
  { src: '/images/Corporate/Oil-Rig-Team-Photography-Arizona-By-Marie-Feutrier.webp', alt: 'Oil rig team', headingAbove: 'Industrial Team', size: 'S' as const },
  { src: '/images/Good Photos/Medical-Doctor-Portrait-Phoenix-Arizona-By-Marie-Feutrier.webp', alt: 'Medical doctor portrait', headingAbove: 'Physician Portrait', size: 'XS' as const },
  { src: '/images/Good Photos/Professional-Executive-Portrait-Phoenix-Arizona-By-Marie-Feutrier.webp', alt: 'Executive portrait', headingAbove: 'Executive Portrait', size: 'L' as const },
]

export default function GalleryTest() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Gallery settings
  const galleryStart = 100     // When gallery appears at bottom
  const diagonalEnd = 900      // When gallery reaches center
  const galleryEnd = 6000      // When horizontal scroll ends

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

  // Vertical position: 110% (below screen) -> 50% (center)
  const verticalPosition = 110 - (diagonalProgress * 60)

  // Horizontal movement (in vw units)
  // Total gallery width: ~173vw images + ~30vw gaps = ~203vw
  // Start position is at 90vw, need to move ~220vw to show all images
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
  const verticalOffsets = ['0vh', '33vh', '5vh', '0vh', '35vh', '33vh', '0vh', '12vh', '35vh', '18vh', '6vh']

  // Horizontal offsets (vw, negative = closer to previous image) - 11 images
  const horizontalOffsets = ['0vw', '-6vw', '0vw', '0vw', '-10vw', '5vw', '-15vw', '0vw', '-5vw', '0vw', '0vw']

  const isVisible = scrollY >= galleryStart

  return (
    <div style={{ height: '900vh', background: '#f5f5f5' }}>
      {/* Debug info */}
      <div
        className="fixed top-4 left-4 z-50 bg-black text-white p-4 text-sm font-mono"
        style={{ fontSize: '12px' }}
      >
        <div>scrollY: {Math.round(scrollY)}</div>
        <div>diagonalProgress: {diagonalProgress.toFixed(2)}</div>
        <div>horizontalProgress: {horizontalProgress.toFixed(2)}</div>
        <div>verticalPosition: {verticalPosition.toFixed(1)}%</div>
        <div>totalHorizontalMove: {totalHorizontalMove.toFixed(1)}vw</div>
        <div>isVisible: {isVisible ? 'yes' : 'no'}</div>
      </div>

      {/* Gallery */}
      {isVisible && (
        <div
          className="fixed inset-0 z-20 pointer-events-none"
          style={{ background: 'white' }}
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
            {testImages.map((image, index) => (
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
                  <h2
                    className="text-sm mb-2"
                    style={{
                      fontFamily: '"Majesti Banner", serif',
                      fontWeight: 300,
                      color: '#1C1C1C',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      whiteSpace: 'pre-line'
                    }}
                  >
                    {image.headingAbove}
                  </h2>
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
        </div>
      )}

      {/* Scroll indicator */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 text-sm text-gray-500 z-50">
        Scroll down to test gallery
      </div>
    </div>
  )
}
