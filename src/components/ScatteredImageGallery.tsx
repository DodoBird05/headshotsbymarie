import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef, useCallback, useEffect } from 'react'

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
  expandDirection?: 'left' | 'center' | 'right' // direction image grows toward when tapped
  tooltip?: {
    title: string
    text: string
  }
}

interface ScatteredImageGalleryProps {
  images: GalleryItem[]
  ctaHeading?: string
  scrollY: number
  viewportHeight: number
  isDesktop: boolean
}

interface ImageRect {
  index: number
  top: number
  bottom: number
  height: number
  originalTop: number
}

export default function ScatteredImageGallery({
  images,
  ctaHeading = "Professional portraits you'll love",
  scrollY,
  viewportHeight,
  isDesktop
}: ScatteredImageGalleryProps) {
  const vh = viewportHeight / 100

  // Mobile touch/expand state
  const [isExpanded, setIsExpanded] = useState(false)
  const [imageOffsets, setImageOffsets] = useState<number[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  // Desktop click/expand state
  const [expandedDesktopIndex, setExpandedDesktopIndex] = useState<number | null>(null)
  const [desktopOffsets, setDesktopOffsets] = useState<number[]>([])
  const desktopImageRefs = useRef<(HTMLDivElement | null)[]>([])

  // Desktop hover tooltip state
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const SCALE_FACTOR = 1.3
  const DESKTOP_SCALE_FACTOR = 1.5
  const ANIMATION_DURATION = 300 // ms

  // Calculate repulsion offsets to prevent overlap
  const calculateRepulsion = useCallback(() => {
    if (!containerRef.current) return []

    const rects: ImageRect[] = []

    // Get current positions of all images (find the actual img element inside)
    imageRefs.current.forEach((ref, index) => {
      if (ref) {
        // Find the actual image element inside the ref
        const imgElement = ref.querySelector('img')
        if (imgElement) {
          const imgRect = imgElement.getBoundingClientRect()
          const containerRect = containerRef.current!.getBoundingClientRect()
          const relativeTop = imgRect.top - containerRect.top

          // Calculate scaled height (image only, not text)
          const scaledHeight = imgRect.height * SCALE_FACTOR
          const heightIncrease = (scaledHeight - imgRect.height) / 2

          rects.push({
            index,
            top: relativeTop - heightIncrease,
            bottom: relativeTop + imgRect.height + heightIncrease,
            height: scaledHeight,
            originalTop: relativeTop
          })
        }
      }
    })

    // Sort by top position
    rects.sort((a, b) => a.top - b.top)

    // Calculate offsets to prevent overlap
    const offsets: number[] = new Array(images.length).fill(0)

    // Move first image up to account for its expansion
    if (rects.length > 0) {
      const firstImage = rects.find(r => r.index === 0)
      if (firstImage) {
        const heightIncrease = firstImage.height - (firstImage.height / SCALE_FACTOR)
        offsets[0] = -heightIncrease * 1 // Move up by 100% of the height increase
      }
    }

    // Images that should stay in place (by index)
    const lockedImages = [3] // Image 4 (index 3) stays in place

    // Iterative physics simulation
    const iterations = 5
    for (let iter = 0; iter < iterations; iter++) {
      for (let i = 1; i < rects.length; i++) {
        const current = rects[i]
        const previous = rects[i - 1]

        // Skip if current image is locked
        if (lockedImages.includes(current.index)) continue

        // Check for overlap with previous image
        const currentTop = current.originalTop + offsets[current.index]
        const previousBottom = previous.originalTop + previous.height + offsets[previous.index]

        const overlap = previousBottom - currentTop // actual overlap only, no buffer

        if (overlap > 10) { // only push if overlap is significant (more than 10px)
          // Push current image down
          offsets[current.index] += overlap * 0.6
          // Push previous image up slightly (unless locked)
          if (!lockedImages.includes(previous.index)) {
            offsets[previous.index] -= overlap * 0.4
          }
        }
      }
    }

    return offsets
  }, [images.length])

  // Handle touch start
  const handleTouchStart = useCallback(() => {
    const newOffsets = calculateRepulsion()
    setImageOffsets(newOffsets)
    setIsExpanded(true)
  }, [calculateRepulsion])

  // Handle touch end
  const handleTouchEnd = useCallback(() => {
    setIsExpanded(false)
    // Reset offsets after animation
    setTimeout(() => {
      setImageOffsets([])
    }, ANIMATION_DURATION)
  }, [])

  // Initialize refs array
  useEffect(() => {
    imageRefs.current = imageRefs.current.slice(0, images.length)
    desktopImageRefs.current = desktopImageRefs.current.slice(0, images.length)
  }, [images.length])

  // Calculate desktop horizontal offsets when an image is clicked
  const calculateDesktopOffsets = useCallback((clickedIndex: number) => {
    const offsets: number[] = new Array(images.length).fill(0)

    // Get the clicked image's width increase
    const clickedRef = desktopImageRefs.current[clickedIndex]
    if (!clickedRef) return offsets

    const clickedImg = clickedRef.querySelector('img')
    if (!clickedImg) return offsets

    const clickedWidth = clickedImg.getBoundingClientRect().width
    const widthIncrease = (clickedWidth * DESKTOP_SCALE_FACTOR - clickedWidth) / 2

    // Push images to the left of clicked image further left
    // Push images to the right of clicked image further right
    for (let i = 0; i < images.length; i++) {
      if (i < clickedIndex) {
        // Images to the left: push left
        offsets[i] = -widthIncrease * 1.2
      } else if (i > clickedIndex) {
        // Images to the right: push right
        offsets[i] = widthIncrease * 1.2
      }
    }

    return offsets
  }, [images.length])

  // Handle desktop image click
  const handleDesktopImageClick = useCallback((index: number) => {
    if (expandedDesktopIndex === index) {
      // Clicking same image: collapse
      setExpandedDesktopIndex(null)
      setDesktopOffsets([])
    } else {
      // Clicking new image: expand it
      setExpandedDesktopIndex(index)
      const newOffsets = calculateDesktopOffsets(index)
      setDesktopOffsets(newOffsets)
    }
  }, [expandedDesktopIndex, calculateDesktopOffsets])

  // Close expanded image when clicking outside
  const handleDesktopBackgroundClick = useCallback(() => {
    if (expandedDesktopIndex !== null) {
      setExpandedDesktopIndex(null)
      setDesktopOffsets([])
    }
  }, [expandedDesktopIndex])

  // Gallery timing (all in vh)
  const galleryStart = 40 * vh      // Gallery appears at 40vh scroll
  const diagonalEnd = 120 * vh      // Gallery reaches center at 120vh
  const galleryEnd = 320 * vh       // Horizontal scroll ends at 320vh (shortened)
  const exitStart = 280 * vh        // Gallery starts exiting upward

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

  // Exit progress: starts at exitStart, completes at galleryEnd
  const exitProgress = scrollY <= exitStart
    ? 0
    : scrollY >= galleryEnd
      ? 1
      : (scrollY - exitStart) / (galleryEnd - exitStart)

  // Vertical position: 160% (below) -> 50% (center) -> -50% (exit up)
  const baseVerticalPosition = 160 - (diagonalProgress * 110)
  const exitVerticalMove = exitProgress * 100 // Move up 100% during exit
  const verticalPosition = baseVerticalPosition - exitVerticalMove

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
  const verticalOffsets = ['12vh', '38vh', '5vh', '0vh', '35vh', '33vh', '0vh', '12vh', '34vh', '18vh', '6vh']
  const horizontalOffsets = ['0vw', '-6vw', '0vw', '0vw', '-10vw', '5vw', '-15vw', '0vw', '-5vw', '0vw', '0vw']

  // Desktop gallery visibility
  const isDesktopVisible = scrollY >= galleryStart && scrollY < galleryEnd + (20 * vh)
  const fadeOutProgress = scrollY > galleryEnd ? Math.min(1, (scrollY - galleryEnd) / (20 * vh)) : 0
  const galleryOpacity = 1 - fadeOutProgress

  // Get capped scale for large images (prevent overflow)
  const getCappedScale = (size?: 'XS' | 'S' | 'M' | 'L' | 'XL') => {
    const widthPercent = {
      'XS': 25,
      'S': 33,
      'M': 50,
      'L': 90,
      'XL': 95
    }[size || 'M']

    const maxWidth = 95 // max 95% of screen
    const maxScale = maxWidth / widthPercent
    return Math.min(SCALE_FACTOR, maxScale)
  }

  // Mobile: positioned after hero reveal
  if (!isDesktop) {
    return (
      <div
        ref={containerRef}
        className="relative px-4"
        style={{
          marginTop: '150vh',
          zIndex: 5,
          backgroundColor: '#ffffff'
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
      >
        {images.map((image, index) => {
          const scale = isExpanded ? getCappedScale(image.size) : 1
          const offset = imageOffsets[index] || 0

          return (
            <div
              key={image.src}
              ref={(el) => { imageRefs.current[index] = el }}
              className={`flex ${image.offsetLeft ? '' : getJustify(image.align)}`}
              style={{
                marginBottom: index === images.length - 1 ? '0' : (image.marginBottom ?? '2rem'),
                ...(image.offsetLeft ? { paddingLeft: image.offsetLeft } : {}),
                ...(image.offsetRight ? { paddingRight: image.offsetRight } : {}),
                transform: `translateY(${offset}px)`,
                transition: `transform ${ANIMATION_DURATION}ms cubic-bezier(0.34, 1.56, 0.64, 1)`
              }}
            >
              <div style={{ width: getMobileWidth(image.size) }}>
                {image.headingAbove && (
                  image.link ? (
                    <Link href={image.link}>
                      <h3
                        className="text-lg mb-2"
                        style={{
                          fontFamily: '"Majesti Banner", serif',
                          fontWeight: 300,
                          color: '#1C1C1C',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          lineHeight: 0.9,
                          opacity: isExpanded ? 0 : 1,
                          transition: `opacity ${ANIMATION_DURATION}ms ease-out`
                        }}
                      >
                        {image.headingAbove}
                      </h3>
                    </Link>
                  ) : (
                    <h3
                      className="text-lg mb-2"
                      style={{
                        fontFamily: '"Majesti Banner", serif',
                        fontWeight: 300,
                        color: '#1C1C1C',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        lineHeight: 0.9,
                        opacity: isExpanded ? 0 : 1,
                        transition: `opacity ${ANIMATION_DURATION}ms ease-out`
                      }}
                    >
                      {image.headingAbove}
                    </h3>
                  )
                )}
                <div
                  style={{
                    transform: `scale(${scale})`,
                    transformOrigin: (() => {
                      // If expandDirection is set, use it (expand TOWARD that direction, so origin is opposite)
                      if (image.expandDirection === 'left') return 'right center'
                      if (image.expandDirection === 'right') return 'left center'
                      if (image.expandDirection === 'center') return 'center center'
                      // Default: expand outward based on alignment
                      if (image.align === 'right') return 'left center'
                      if (image.align === 'center') return 'center center'
                      return 'right center' // left-aligned expands left
                    })(),
                    transition: `transform ${ANIMATION_DURATION}ms cubic-bezier(0.34, 1.56, 0.64, 1)`
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={800}
                    height={1000}
                    className="w-full h-auto object-cover rounded-lg"
                    draggable={false}
                  />
                </div>
                {image.headingBelow && (
                  <h4
                    className="text-sm mt-2"
                    style={{
                      fontFamily: '"Hanken Grotesk", sans-serif',
                      fontWeight: 400,
                      color: '#1C1C1C',
                      lineHeight: 0.9,
                      opacity: isExpanded ? 0 : 1,
                      transition: `opacity ${ANIMATION_DURATION}ms ease-out`
                    }}
                  >
                    {image.headingBelow}
                  </h4>
                )}
                {/* Quote below BTS image - mobile */}
                {index === 5 && (
                  <div
                    className="mt-3"
                    style={{
                      opacity: isExpanded ? 0 : 1,
                      transition: `opacity ${ANIMATION_DURATION}ms ease-out`
                    }}
                  >
                    <p
                      style={{
                        fontFamily: '"Majesti Banner", serif',
                        fontWeight: 300,
                        fontSize: '0.85rem',
                        color: '#1C1C1C',
                        lineHeight: 1.4,
                        marginBottom: '0.25rem'
                      }}
                    >
                      "I want to create images you'll actually want to post."
                    </p>
                    <p
                      style={{
                        fontFamily: '"lindsey-signature", cursive',
                        fontWeight: 400,
                        fontSize: '1rem',
                        color: '#1C1C1C'
                      }}
                    >
                      Marie Feutrier
                    </p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
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
      {/* Background text layer - only visible when gallery images are on screen */}
      <div
        className="absolute inset-0 overflow-hidden flex flex-col items-center justify-center"
        style={{
          zIndex: 0,
          opacity: horizontalProgress < 0.5 ? horizontalProgress * 2 : Math.max(0, 1 - (horizontalProgress - 0.5) * 3),
          visibility: horizontalProgress > 0 && horizontalProgress < 0.85 ? 'visible' : 'hidden',
          transform: 'translateY(-10vh)'
        }}
      >
        {/* HEADSHOTS BY MARIE - centered */}
        <div
          className="whitespace-nowrap"
          style={{
            fontFamily: '"Majesti Banner", serif',
            fontWeight: 300,
            fontSize: '9vw',
            color: 'rgba(0, 0, 0, 0.08)',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            lineHeight: 0.85
          }}
        >
          HEADSHOTS BY MARIE
        </div>
        {/* PORTRAITS */}
        <div
          className="whitespace-nowrap"
          style={{
            fontFamily: '"Majesti Banner", serif',
            fontWeight: 300,
            fontSize: '12vw',
            color: 'rgba(0, 0, 0, 0.08)',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            lineHeight: 0.85,
            marginTop: '-5vh',
            marginLeft: '-20vw'
          }}
        >
          PORTRAITS
        </div>
      </div>

      <div
        className="absolute left-0 flex items-start pointer-events-auto"
        style={{
          top: `${verticalPosition}%`,
          transform: `translate3d(calc(100vw - 10vw - ${totalHorizontalMove}vw), -50%, 0)`,
          willChange: 'transform',
          gap: '3vw',
          zIndex: 1
        }}
        onClick={handleDesktopBackgroundClick}
      >
        {images.map((image, index) => {
          const isThisExpanded = expandedDesktopIndex === index
          const desktopScale = isThisExpanded ? DESKTOP_SCALE_FACTOR : 1
          const horizontalOffset = desktopOffsets[index] || 0

          return (
          <div
            key={image.src}
            ref={(el) => { desktopImageRefs.current[index] = el }}
            className="flex-shrink-0"
            style={{
              width: getDesktopWidth(image.size),
              marginTop: verticalOffsets[index % verticalOffsets.length],
              marginLeft: horizontalOffsets[index % horizontalOffsets.length],
              transform: `translateX(${horizontalOffset}px)`,
              transition: `transform ${ANIMATION_DURATION}ms cubic-bezier(0.34, 1.56, 0.64, 1)`,
              zIndex: isThisExpanded ? 10 : 1
            }}
          >
            {image.headingAbove && (
              image.link ? (
                <Link href={image.link}>
                  <h3
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
                  </h3>
                </Link>
              ) : (
                <h3
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
                </h3>
              )
            )}
            <div
              style={{
                transform: `scale(${desktopScale})`,
                transformOrigin: 'center center',
                transition: `transform ${ANIMATION_DURATION}ms cubic-bezier(0.34, 1.56, 0.64, 1)`,
                cursor: 'pointer',
                position: 'relative'
              }}
              onClick={(e) => {
                e.stopPropagation()
                handleDesktopImageClick(index)
              }}
              onMouseEnter={() => {
                if (image.tooltip) {
                  setHoveredIndex(index)
                }
              }}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={800}
                height={1000}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            {image.headingBelow && (
              <h4
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
              </h4>
            )}
            {/* Quote below BTS image */}
            {index === 5 && (
              <div className="mt-3" style={{ maxWidth: '100%' }}>
                <p
                  style={{
                    fontFamily: '"Majesti Banner", serif',
                    fontWeight: 300,
                    fontSize: '0.75rem',
                    color: '#1C1C1C',
                    lineHeight: 1.4,
                    marginBottom: '0.25rem'
                  }}
                >
                  "I want to create images you'll actually want to post."
                </p>
                <p
                  style={{
                    fontFamily: '"lindsey-signature", cursive',
                    fontWeight: 400,
                    fontSize: '0.9rem',
                    color: '#1C1C1C'
                  }}
                >
                  Marie Feutrier
                </p>
              </div>
            )}
          </div>
          )
        })}
      </div>

      {/* Fixed text at bottom - hidden when tooltip is shown */}
      <div
        className="absolute bottom-[4vh] left-0 right-0 text-center"
        style={{
          fontFamily: '"Hanken Grotesk", sans-serif',
          fontWeight: 300,
          fontSize: '1rem',
          color: '#1C1C1C',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          opacity: hoveredIndex !== null && images[hoveredIndex]?.tooltip ? 0 : 1,
          transition: 'opacity 200ms ease-out'
        }}
      >
        {ctaHeading}
      </div>

      {/* Tooltip at bottom - replaces CTA text on hover */}
      {hoveredIndex !== null && images[hoveredIndex]?.tooltip && (
        <div
          className="absolute bottom-[4vh] left-0 right-0 flex justify-center"
          style={{ pointerEvents: 'none' }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '16px 24px',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
              maxWidth: '600px',
              width: '90%',
              textAlign: 'center'
            }}
          >
            <h4
              style={{
                fontFamily: '"Majesti Banner", serif',
                fontWeight: 400,
                fontSize: '1.1rem',
                color: '#1C1C1C',
                marginBottom: '8px'
              }}
            >
              {images[hoveredIndex].tooltip!.title}
            </h4>
            <p
              style={{
                fontFamily: '"Hanken Grotesk", sans-serif',
                fontWeight: 300,
                fontSize: '0.9rem',
                color: '#444',
                lineHeight: 1.5
              }}
            >
              {images[hoveredIndex].tooltip!.text}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
