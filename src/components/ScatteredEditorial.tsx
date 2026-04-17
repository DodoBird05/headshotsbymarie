import { useRef } from 'react'
import Link from 'next/link'
import { getMobileSrc } from '@/lib/responsiveImage'
import { trackPhotoClick, usePhotoViewTracking } from '@/lib/analytics'

interface EditorialItem {
  imagePath: string
  imageAlt: string
  title: string
  text?: string
  link?: string
}

interface ScatteredEditorialProps {
  items: EditorialItem[]
  background?: string
  dark?: boolean
  location?: string
}

interface EditorialItemBlockProps {
  item: EditorialItem
  index: number
  positions: Array<{
    img: string
    text: string
    textBefore: boolean
    sideBySide?: boolean
    slideDir: string
  }>
  textColor: string
  subTextColor: string
  location: string
}

function EditorialItemBlock({ item, index, positions, textColor, subTextColor, location }: EditorialItemBlockProps) {
  const imageRef = useRef<HTMLDivElement>(null)
  usePhotoViewTracking(imageRef, item.imagePath, item.imageAlt, location)

  const pos = positions[index % positions.length]

  const imageEl = (
    <picture>
      <source media="(max-width: 768px)" srcSet={getMobileSrc(item.imagePath)} />
      <img src={item.imagePath} alt={item.imageAlt} className="w-full h-auto object-cover" loading="lazy" />
    </picture>
  )

  const wrappedImage = item.link ? (
    <Link href={item.link} onClick={() => trackPhotoClick(item.imagePath, item.imageAlt, location)}>
      {imageEl}
    </Link>
  ) : (
    imageEl
  )

  const textBlock = (
    <div className={`${pos.text} md:max-w-xs ${pos.textBefore ? 'md:mb-4' : 'md:mt-4'} mb-4 md:mb-0`}>
      <h2 className="text-base md:text-lg mb-3" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: textColor, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {item.title}
      </h2>
      {item.text && (
        <p className="text-sm mb-2 last:mb-0" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: subTextColor, fontWeight: 300, lineHeight: 1.7, display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>
          {item.text}
        </p>
      )}
    </div>
  )

  if (pos.sideBySide) {
    return (
      <div className="py-6 md:py-10 md:flex md:flex-row-reverse md:items-center md:gap-4 md:justify-center">
        <div className="md:hidden mb-4">{textBlock}</div>
        <div ref={imageRef} className={`${pos.img} shrink-0`} data-reveal data-reveal-direction={pos.slideDir}>
          {wrappedImage}
        </div>
        <div className="hidden md:block md:max-w-xs mt-4 md:mt-0">
          <h2 className="text-base md:text-lg mb-3" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: textColor, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {item.title}
          </h2>
          {item.text && (
            <p className="text-sm mb-2 last:mb-0" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: subTextColor, fontWeight: 300, lineHeight: 1.7, display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>
              {item.text}
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={`py-6 md:py-10 ${pos.textBefore ? 'md:mt-[-25%]' : ''}`}>
      <div className="md:hidden">{textBlock}</div>
      <div className="hidden md:block">{pos.textBefore && textBlock}</div>
      <div ref={imageRef} className={pos.img} data-reveal data-reveal-direction={pos.slideDir}>
        {wrappedImage}
      </div>
      <div className="hidden md:block">{!pos.textBefore && textBlock}</div>
    </div>
  )
}

export default function ScatteredEditorial({ items, background = '#F5F0EB', dark: darkProp, location = 'home_editorial' }: ScatteredEditorialProps) {
  const dark = darkProp !== undefined ? darkProp : background === '#1C1C1C'
  const textColor = dark ? '#F5F0EB' : '#1C1C1C'
  const subTextColor = dark ? '#999' : '#555'

  const positions = [
    { img: 'md:w-[40%] md:ml-[5%]', text: 'md:ml-[5%] md:mt-4', textBefore: false, slideDir: 'left' },
    { img: 'md:w-[35%] md:ml-[55%]', text: 'md:ml-[55%] md:max-w-[35%] md:mb-4', textBefore: true, slideDir: 'right' },
    { img: 'md:w-[38%] md:ml-[10%]', text: 'md:ml-[10%] md:mb-4', textBefore: true, slideDir: 'left' },
    { img: 'md:w-[55%] md:ml-[15%]', text: '', textBefore: false, sideBySide: true, slideDir: 'up' },
    { img: 'md:w-[36%] md:ml-[25%]', text: 'md:ml-[25%] md:mt-4', textBefore: false, slideDir: 'right' },
    { img: 'md:w-[40%] md:ml-[45%]', text: 'md:ml-[5%] md:mt-[-12%]', textBefore: false, slideDir: 'left' }
  ]

  return (
    <section className="relative py-16 md:py-24 overflow-hidden" style={{ backgroundColor: background }}>
      <div className="max-w-6xl mx-auto px-8 relative" style={{ zIndex: 1 }}>
        {items.map((item, i) => (
          <EditorialItemBlock
            key={i}
            item={item}
            index={i}
            positions={positions}
            textColor={textColor}
            subTextColor={subTextColor}
            location={location}
          />
        ))}
      </div>
    </section>
  )
}
