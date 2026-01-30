import Image from 'next/image'
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
  const [desktopOffsets, setDesktopOffsets] = useState<number[]>([])
  const desktopImageRefs = useRef<(HTMLDivElement | null)[]>([])

  // Accordion state: which image has its text card open
  const [accordionIndex, setAccordionIndex] = useState<number | null>(null)

  // Expanded image state: which image is enlarged in-flow
  const [expandedImageIndex, setExpandedImageIndex] = useState<number | null>(null)


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

  // Collapse expanded image on scroll
  useEffect(() => {
    if (expandedImageIndex !== null) {
      setExpandedImageIndex(null)
    }
  }, [scrollY])

  // Calculate desktop offsets when an image is expanded in-flow
  const calculateDesktopOffsets = useCallback((clickedIndex: number) => {
    const offsets: number[] = new Array(images.length).fill(0)

    const clickedRef = desktopImageRefs.current[clickedIndex]
    if (!clickedRef) return offsets

    const clickedRect = clickedRef.getBoundingClientRect()
    const currentWidth = clickedRect.width
    const targetWidth = window.innerWidth * 0.3
    const widthIncrease = targetWidth - currentWidth
    if (widthIncrease <= 0) return offsets

    // Expanded bounds of the clicked image
    const expandedLeft = clickedRect.left - widthIncrease / 2
    const expandedRight = clickedRect.right + widthIncrease / 2

    // Check every other image for overlap with expanded bounds (vertically overlapping)
    for (let i = 0; i < images.length; i++) {
      if (i === clickedIndex) continue
      const ref = desktopImageRefs.current[i]
      if (!ref) continue

      const rect = ref.getBoundingClientRect()

      // Check if they overlap vertically (images at different heights won't collide)
      const verticalOverlap = rect.top < clickedRect.bottom && rect.bottom > clickedRect.top
      if (!verticalOverlap) continue

      // Check horizontal overlap with expanded bounds
      const horizontalOverlap = rect.left < expandedRight && rect.right > expandedLeft
      if (!horizontalOverlap) continue

      // Calculate how much to push
      const center = (clickedRect.left + clickedRect.right) / 2
      const neighborCenter = (rect.left + rect.right) / 2

      if (neighborCenter < center) {
        // Neighbor is to the left: push left
        const overlap = expandedLeft - rect.left
        offsets[i] = -(Math.abs(overlap) + 20)
      } else {
        // Neighbor is to the right: push right
        const overlap = rect.right - expandedRight
        offsets[i] = Math.abs(overlap) + 20
      }
    }

    return offsets
  }, [images.length])

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
      case 'XS': return '33%'
      case 'S': return '40%'
      case 'M': return '50%'
      case 'L': return '90%'
      case 'XL': return '95%'
      default: return '50%'
    }
  }

  // Desktop size widths (vw)
  const getDesktopWidth = (size?: 'XS' | 'S' | 'M' | 'L' | 'XL') => {
    switch (size) {
      case 'XS': return '12vw'
      case 'S': return '16vw'
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
  const verticalOffsets = ['12vh', '41vh', '5vh', '0vh', '35vh', '35vh', '0vh', '7vh', '35vh', '18vh', '6vh']
  const horizontalOffsets = ['0vw', '-6vw', '0vw', '0vw', '-12vw', '5vw', '-25vw', '0vw', '-5vw', '0vw', '0vw']

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
      >
        {images.map((image, index) => {
          const isAccordionOpen = accordionIndex === index
          const isImageExpanded = expandedImageIndex === index
          const expandedWidth = '85%'

          return (
            <div
              key={image.src}
              ref={(el) => { imageRefs.current[index] = el }}
              style={{
                marginBottom: index === images.length - 1 ? '0' : ((isAccordionOpen || isImageExpanded) ? '2rem' : (image.marginBottom ?? '2rem'))
              }}
            >
              {/* Image row with alignment */}
              <div
                className={`flex ${isImageExpanded ? 'justify-center' : (image.offsetLeft ? '' : getJustify(image.align))}`}
                style={{
                  ...(isImageExpanded ? {} : {
                    ...(image.offsetLeft ? { paddingLeft: image.offsetLeft } : {}),
                    ...(image.offsetRight ? { paddingRight: image.offsetRight } : {})
                  }),
                  transition: 'padding 400ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <div
                  style={{
                    width: isImageExpanded ? expandedWidth : getMobileWidth(image.size),
                    transition: 'width 400ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  {/* Heading band - clickable */}
                  {image.headingAbove && (
                    <h3
                      className="text-xs mb-2"
                      onClick={(e) => {
                        if (image.tooltip) {
                          e.stopPropagation()
                          setAccordionIndex(isAccordionOpen ? null : index)
                        }
                      }}
                      style={{
                        fontFamily: '"Majesti Banner", serif',
                        fontWeight: 300,
                        color: '#1C1C1C',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        lineHeight: 0.9,
                        cursor: image.tooltip ? 'pointer' : 'default'
                      }}
                    >
                      {image.headingAbove}
                    </h3>
                  )}

                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={800}
                    height={1000}
                    className="w-full h-auto object-cover rounded-lg"
                    style={{ cursor: 'pointer' }}
                    draggable={false}
                    onClick={() => {
                      setExpandedImageIndex(isImageExpanded ? null : index)
                    }}
                  />

                  {image.headingBelow && (
                    <h4
                      className="text-sm mt-2"
                      style={{
                        fontFamily: '"Hanken Grotesk", sans-serif',
                        fontWeight: 400,
                        color: '#1C1C1C',
                        lineHeight: 0.9
                      }}
                    >
                      {image.headingBelow}
                    </h4>
                  )}
                  {/* Quote below BTS image - mobile (clickable to open accordion) */}
                  {index === 5 && (
                    <div
                      className="mt-3"
                      onClick={(e) => {
                        if (image.tooltip) {
                          e.stopPropagation()
                          setAccordionIndex(isAccordionOpen ? null : index)
                        }
                      }}
                      style={{ cursor: image.tooltip ? 'pointer' : 'default' }}
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
                      <img
                        src="/images/signature.svg"
                        alt="Marie Feutrier"
                        style={{
                          height: '1.5rem',
                          width: 'auto'
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Text card - always in DOM for SEO, visually hidden when collapsed */}
              {image.tooltip && (
                <div
                  style={{
                    width: '80vw',
                    padding: isAccordionOpen ? '1rem 0 1.5rem' : '0',
                    marginBottom: isAccordionOpen ? '0.5rem' : '0',
                    maxHeight: isAccordionOpen ? '500px' : '0',
                    overflow: 'hidden',
                    opacity: isAccordionOpen ? 1 : 0,
                    transition: 'max-height 400ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms ease, padding 400ms ease, margin-bottom 400ms ease'
                  }}
                >
                    <h4
                      style={{
                        fontFamily: '"Majesti Banner", serif',
                        fontWeight: 400,
                        fontSize: '1.1rem',
                        color: '#1C1C1C',
                        marginBottom: '0.75rem',
                        lineHeight: 1.2
                      }}
                    >
                      {image.tooltip.title}
                    </h4>
                    <p
                      style={{
                        fontFamily: '"Hanken Grotesk", sans-serif',
                        fontWeight: 300,
                        fontSize: '0.85rem',
                        color: '#444',
                        lineHeight: 1.5
                      }}
                    >
                      {image.tooltip.text}
                    </p>
                  </div>
                )}
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
      >
        {(() => {
          // Desktop order: swap Industrial Team (index 6) and Office Headshots (index 8)
          const desktopImages = [...images]
          const temp = desktopImages[6]
          desktopImages[6] = desktopImages[8]
          desktopImages[8] = temp
          return desktopImages
        })().map((image, index) => {
          const isDesktopAccordionOpen = accordionIndex === index
          const vOffset = parseFloat(verticalOffsets[index % verticalOffsets.length])
          const showTextAbove = vOffset < 20 // top images: text goes above

          const belowCardWidth = index === 5 ? '30vw' : '40vw'
          const textCard = image.tooltip ? (
            <div
              style={{
                width: belowCardWidth,
                minWidth: belowCardWidth,
                padding: isDesktopAccordionOpen ? '0.75rem 0 1rem' : '0',
                maxHeight: isDesktopAccordionOpen ? '500px' : '0',
                overflow: 'hidden',
                opacity: isDesktopAccordionOpen ? 1 : 0,
                transition: 'max-height 400ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms ease, padding 400ms ease'
              }}
            >
              <h4
                style={{
                  fontFamily: '"Majesti Banner", serif',
                  fontWeight: 400,
                  fontSize: '0.85rem',
                  color: '#1C1C1C',
                  marginBottom: '0.5rem',
                  lineHeight: 1.2
                }}
              >
                {image.tooltip.title}
              </h4>
              <p
                style={{
                  fontFamily: '"Hanken Grotesk", sans-serif',
                  fontWeight: 300,
                  fontSize: '0.7rem',
                  color: '#444',
                  lineHeight: 1.5
                }}
              >
                {image.tooltip.text}
              </p>
            </div>
          ) : null

          return (
          <div
            key={image.src}
            ref={(el) => { desktopImageRefs.current[index] = el }}
            className="flex-shrink-0"
            style={{
              position: 'relative',
              width: getDesktopWidth(image.size),
              marginTop: verticalOffsets[index % verticalOffsets.length],
              marginLeft: horizontalOffsets[index % horizontalOffsets.length],
              opacity: expandedImageIndex !== null && expandedImageIndex !== index ? 0.4 : 1,
              transition: 'opacity 400ms ease'
            }}
          >
            {/* Text card ABOVE image for top-positioned images - absolute so image stays put */}
            {showTextAbove && image.tooltip && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '100%',
                  left: 0,
                  width: (image.headingAbove === 'Office Headshots' || image.headingAbove === 'Headshots for\nCreatives') ? '40vw' : image.headingAbove === 'Physician Portrait' ? getDesktopWidth(image.size) : '20vw',
                  minWidth: (image.headingAbove === 'Office Headshots' || image.headingAbove === 'Headshots for\nCreatives') ? '40vw' : image.headingAbove === 'Physician Portrait' ? getDesktopWidth(image.size) : '20vw',
                  padding: isDesktopAccordionOpen ? '0.75rem 0 1rem' : '0',
                  maxHeight: isDesktopAccordionOpen ? '500px' : '0',
                  overflow: 'hidden',
                  opacity: isDesktopAccordionOpen ? 1 : 0,
                  transition: 'max-height 400ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms ease, padding 400ms ease'
                }}
              >
                <h4
                  style={{
                    fontFamily: '"Majesti Banner", serif',
                    fontWeight: 400,
                    fontSize: '0.85rem',
                    color: '#1C1C1C',
                    marginBottom: '0.5rem',
                    lineHeight: 1.2
                  }}
                >
                  {image.tooltip.title}
                </h4>
                <p
                  style={{
                    fontFamily: '"Hanken Grotesk", sans-serif',
                    fontWeight: 300,
                    fontSize: '0.7rem',
                    color: '#444',
                    lineHeight: 1.5
                  }}
                >
                  {image.tooltip.text}
                </p>
              </div>
            )}

            {image.headingAbove && (
              <h3
                className="text-xs mb-2"
                onClick={(e) => {
                  if (image.tooltip) {
                    e.stopPropagation()
                    setAccordionIndex(isDesktopAccordionOpen ? null : index)
                  }
                }}
                style={{
                  fontFamily: '"Majesti Banner", serif',
                  fontWeight: 300,
                  color: '#1C1C1C',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  lineHeight: 1.1,
                  whiteSpace: 'pre-line',
                  cursor: image.tooltip ? 'pointer' : 'default'
                }}
              >
                {image.headingAbove}
              </h3>
            )}
            <Image
              src={image.src}
              alt={image.alt}
              width={800}
              height={1000}
              className="w-full h-auto object-cover rounded-lg"
              style={{
                cursor: 'pointer',
                transform: expandedImageIndex === index ? 'scale(1.8)' : 'scale(1)',
                transformOrigin: `${image.expandDirection === 'right' ? 'right' : image.expandDirection === 'center' ? 'center' : 'left'} center`,
                transition: 'transform 400ms cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: expandedImageIndex === index ? 10 : 1,
                position: 'relative'
              }}
              onClick={() => {
                setExpandedImageIndex(expandedImageIndex === index ? null : index)
              }}
            />
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
            {/* Quote below BTS image - clickable to open accordion */}
            {index === 5 && (
              <div
                className="mt-3"
                style={{ maxWidth: '100%', cursor: image.tooltip ? 'pointer' : 'default' }}
                onClick={(e) => {
                  if (image.tooltip) {
                    e.stopPropagation()
                    setAccordionIndex(isDesktopAccordionOpen ? null : index)
                  }
                }}
              >
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
                <img
                  src="/images/signature.svg"
                  alt="Marie Feutrier"
                  style={{
                    height: '1.25rem',
                    width: 'auto'
                  }}
                />
              </div>
            )}

            {/* Text card BELOW image for bottom-positioned images */}
            {!showTextAbove && textCard}
          </div>
          )
        })}
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
