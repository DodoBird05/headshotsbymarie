import Image from 'next/image'
import Link from 'next/link'

interface GalleryItem {
  src: string
  alt: string
  headingAbove?: string
  headingBelow?: string
  size?: 'XS' | 'S' | 'M' | 'L' | 'XL'
  align?: 'left' | 'center' | 'right'
  offsetLeft?: string
  offsetRight?: string
  marginBottom?: string
  link?: string
}

interface ScatteredImageGalleryProps {
  images: GalleryItem[]
  ctaHeading?: string
  scrollY: number
  viewportHeight: number
  isDesktop: boolean
}

export default function ScatteredImageGallery({
  images,
  ctaHeading = "Professional portraits you'll love",
  scrollY,
  viewportHeight,
  isDesktop
}: ScatteredImageGalleryProps) {
  const vh = viewportHeight / 100

  // Gallery timing (all in vh)
  const galleryStart = 40 * vh      // Gallery appears at 40vh scroll
  const diagonalEnd = 120 * vh      // Gallery reaches center at 120vh
  const galleryEnd = 450 * vh       // Horizontal scroll ends at 450vh

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

  // Vertical position: 160% (below screen) -> 50% (center-ish)
  const verticalPosition = 160 - (diagonalProgress * 110)

  // Horizontal movement (in vw units)
  const diagonalLeftMove = diagonalProgress * 26
  const horizontalOnlyMove = horizontalProgress * 220
  const totalHorizontalMove = diagonalLeftMove + horizontalOnlyMove

  // Mobile size widths
  const getMobileWidth = (size?: 'XS' | 'S' | 'M' | 'L' | 'XL') => {
    switch (size) {
      case 'XS': return '25%'
      case 'S': return '33%'
      case 'M': return '50%'
      case 'L': return '90%'
      case 'XL': return '95%'
      default: return '50%'
    }
  }

  // Desktop size widths (vw)
  const getDesktopWidth = (size?: 'XS' | 'S' | 'M' | 'L' | 'XL') => {
    switch (size) {
      case 'XS': return '9vw'
      case 'S': return '13vw'
      case 'M': return '17vw'
      case 'L': return '23vw'
      case 'XL': return '30vw'
      default: return '15vw'
    }
  }

  // Mobile alignment
  const getJustify = (align?: 'left' | 'center' | 'right') => {
    switch (align) {
      case 'left': return 'justify-start'
      case 'center': return 'justify-center'
      case 'right': return 'justify-end'
      default: return 'justify-start'
    }
  }

  // Desktop scattered offsets (11 images)
  const verticalOffsets = ['0vh', '33vh', '5vh', '0vh', '35vh', '33vh', '0vh', '12vh', '34vh', '18vh', '6vh']
  const horizontalOffsets = ['0vw', '-6vw', '0vw', '0vw', '-10vw', '5vw', '-15vw', '0vw', '-5vw', '0vw', '0vw']

  // Desktop gallery visibility
  const isDesktopVisible = scrollY >= galleryStart && scrollY < galleryEnd + (20 * vh)
  const fadeOutProgress = scrollY > galleryEnd ? Math.min(1, (scrollY - galleryEnd) / (20 * vh)) : 0
  const galleryOpacity = 1 - fadeOutProgress

  // Mobile: positioned after hero reveal
  if (!isDesktop) {
    return (
      <div
        className="relative px-4"
        style={{
          marginTop: '150vh',
          zIndex: 5,
          backgroundColor: '#ffffff'
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`flex ${image.offsetLeft ? '' : getJustify(image.align)}`}
            style={{
              marginBottom: index === images.length - 1 ? '0' : (image.marginBottom ?? '2rem'),
              ...(image.offsetLeft ? { paddingLeft: image.offsetLeft } : {}),
              ...(image.offsetRight ? { paddingRight: image.offsetRight } : {})
            }}
          >
            <div style={{ width: getMobileWidth(image.size) }}>
              {image.headingAbove && (
                image.link ? (
                  <Link href={image.link}>
                    <h2
                      className="text-lg mb-2"
                      style={{
                        fontFamily: '"Majesti Banner", serif',
                        fontWeight: 300,
                        color: '#1C1C1C',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        lineHeight: 0.9
                      }}
                    >
                      {image.headingAbove}
                    </h2>
                  </Link>
                ) : (
                  <h2
                    className="text-lg mb-2"
                    style={{
                      fontFamily: '"Majesti Banner", serif',
                      fontWeight: 300,
                      color: '#1C1C1C',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      lineHeight: 0.9
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
                  className="text-sm mt-2"
                  style={{
                    fontFamily: '"Hanken Grotesk", sans-serif',
                    fontWeight: 400,
                    color: '#1C1C1C',
                    lineHeight: 0.9
                  }}
                >
                  {image.headingBelow}
                </h3>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Desktop: fixed horizontal scroll
  if (!isDesktopVisible) return null

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        opacity: galleryOpacity,
        zIndex: 15
      }}
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
              width: getDesktopWidth(image.size),
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
        className="absolute bottom-[4vh] left-0 right-0 text-center"
        style={{
          fontFamily: '"Hanken Grotesk", sans-serif',
          fontWeight: 300,
          fontSize: '1rem',
          color: '#1C1C1C',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}
      >
        {ctaHeading}
      </div>
    </div>
  )
}
