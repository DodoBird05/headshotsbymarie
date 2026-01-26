import Image from 'next/image'
import Link from 'next/link'
import TestimonialBigText from './TestimonialBigText'

interface GalleryItem {
  src: string
  alt: string
  headingAbove?: string
  headingBelow?: string
  size?: 'XS' | 'S' | 'M' | 'L' | 'XL'
  align?: 'left' | 'center' | 'right'
  offsetLeft?: string
  marginBottom?: string
  link?: string
}

interface Testimonial {
  quote: string[]
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
  // Size widths for mobile
  const getWidth = (size?: 'XS' | 'S' | 'M' | 'L' | 'XL') => {
    switch (size) {
      case 'XS': return '25%'
      case 'S': return '33%'
      case 'M': return '50%'
      case 'L': return '90%'
      case 'XL': return '95%'
      default: return '50%'
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
    <>
      {/* Mobile only - desktop uses DesktopHorizontalGallery */}
      <div className="md:hidden absolute left-0 right-0 px-4 top-[750px]">
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
                width={800}
                height={1000}
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

        {/* Mobile Testimonial */}
        {testimonial && (
          <TestimonialBigText
            quote={testimonial.quote}
            author={testimonial.author}
            rating={testimonial.rating}
            source={testimonial.source}
          />
        )}
      </div>
    </>
  )
}
