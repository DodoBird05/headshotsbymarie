import { ReactNode, useRef } from 'react'
import { getMobileSrc } from '@/lib/responsiveImage'
import { usePhotoViewTracking } from '@/lib/analytics'

interface ImageBlock {
  src: string
  alt: string
  title?: string
  paragraphs: string[]
  textColor?: string
}

interface StickyImageWithTextProps {
  stickyContent: ReactNode
  images: ImageBlock[]
  background?: string
  textColor?: string
  location?: string
}

interface ImageBlockItemProps {
  block: ImageBlock
  index: number
  totalCount: number
  defaultTextColor: string
  location: string
  mobile: boolean
}

function ImageBlockItem({ block, index, totalCount, defaultTextColor, location, mobile }: ImageBlockItemProps) {
  const imageRef = useRef<HTMLDivElement>(null)
  usePhotoViewTracking(imageRef, block.src, block.alt, location)

  const color = block.textColor || defaultTextColor
  const wrapperMargin = mobile
    ? (index < totalCount - 1 ? '2.5rem' : undefined)
    : (index < totalCount - 1 ? '3rem' : undefined)

  return (
    <div style={{ marginBottom: wrapperMargin }}>
      <div ref={imageRef}>
        <picture>
          <source media="(max-width: 768px)" srcSet={getMobileSrc(block.src)} />
          <img
            src={block.src}
            alt={block.alt}
            width={800}
            height={1000}
            className="w-full"
            style={{ objectFit: 'cover' }}
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        </picture>
      </div>
      <div style={{ marginTop: '1.5rem' }}>
        {block.title && (
          <h3 style={{
            fontFamily: "'Romie', serif",
            fontSize: '1.1rem',
            fontWeight: 500,
            
            letterSpacing: '0.08em',
            color,
            marginBottom: '1rem'
          }}>
            {block.title}
          </h3>
        )}
        {block.paragraphs.map((paragraph, pIndex) => (
          <p
            key={pIndex}
            className="[&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:opacity-70 [&_a]:transition-opacity"
            style={{
              fontFamily: "'Romie', serif",
              fontSize: '0.9rem',
              fontWeight: 300,
              lineHeight: 1.7,
              color,
              marginBottom: pIndex < block.paragraphs.length - 1 ? '1rem' : undefined
            }}
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        ))}
      </div>
    </div>
  )
}

export default function StickyImageWithText({
  stickyContent,
  images,
  background = '#FFFFFF',
  textColor = '#1C1C1C',
  location = 'home_sticky'
}: StickyImageWithTextProps) {
  return (
    <section style={{ background }}>
      {/* Desktop: sticky heading left, images+text scroll right */}
      <div className="hidden lg:block max-w-6xl mx-auto px-8">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '55% 40%',
          gap: '5%',
          alignItems: 'start'
        }}>
          <div style={{
            position: 'sticky',
            top: '15vh',
            paddingTop: '4rem',
            paddingBottom: '4rem'
          }}>
            {stickyContent}
          </div>

          <div style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
            {images.map((block, index) => (
              <ImageBlockItem
                key={index}
                block={block}
                index={index}
                totalCount={images.length}
                defaultTextColor={textColor}
                location={location}
                mobile={false}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: heading+button → image → text → image → text */}
      <div className="lg:hidden px-6 py-10">
        <div className="text-center" style={{ marginBottom: '1.5rem' }}>
          {stickyContent}
        </div>
        {images.map((block, index) => (
          <ImageBlockItem
            key={index}
            block={block}
            index={index}
            totalCount={images.length}
            defaultTextColor={textColor}
            location={location}
            mobile={true}
          />
        ))}
      </div>
    </section>
  )
}
