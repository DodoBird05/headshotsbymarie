import Image from 'next/image'
import Link from 'next/link'
import TestimonialBigText from './TestimonialBigText'

interface GalleryItem {
  src: string
  alt: string
  headingAbove?: string
  headingBelow?: string
  size?: 'XS' | 'S' | 'M' | 'L'
  align?: 'left' | 'center' | 'right'
  offsetLeft?: string // e.g. '25%' to position from left edge
  marginBottom?: string // e.g. '0' to remove margin
  link?: string // optional link URL
}

interface Testimonial {
  quote: string[]  // Array of lines for the quote
  author: string
  rating: number
  source: string
}

interface ScatteredImageGalleryProps {
  images: GalleryItem[]
  topOffset?: string
  testimonial?: Testimonial
}

export default function ScatteredImageGallery({
  images,
  topOffset = '750px',
  testimonial
}: ScatteredImageGalleryProps) {
  // Size widths: XS=25%, S=33%, M=50%, L=90%
  const getWidth = (size?: 'XS' | 'S' | 'M' | 'L') => {
    switch (size) {
      case 'XS': return '25%'
      case 'S': return '33%'
      case 'M': return '50%'
      case 'L': return '90%'
      default: return '50%' // default to M
    }
  }

  // Alignment
  const getJustify = (align?: 'left' | 'center' | 'right') => {
    switch (align) {
      case 'left': return 'justify-start'
      case 'center': return 'justify-center'
      case 'right': return 'justify-end'
      default: return 'justify-start'
    }
  }

  return (
    <div
      className="absolute left-0 right-0 px-4"
      style={{ top: topOffset }}
    >
      {images.map((image, index) => (
        <div
          key={index}
          className={`flex ${image.offsetLeft ? '' : getJustify(image.align)}`}
          style={{
            marginBottom: image.marginBottom ?? '2rem',
            ...(image.offsetLeft ? { paddingLeft: image.offsetLeft } : {})
          }}
        >
          <div style={{ width: getWidth(image.size) }}>
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
              width={400}
              height={500}
              className="w-full h-auto object-cover rounded-lg transition-transform duration-200 active:scale-[1.2]"
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

      {/* Testimonial */}
      {testimonial && (
        <TestimonialBigText
          quote={testimonial.quote}
          author={testimonial.author}
          rating={testimonial.rating}
          source={testimonial.source}
        />
      )}
    </div>
  )
}
