import { useRef } from 'react'
import { getMobileSrc } from '@/lib/responsiveImage'
import { usePhotoViewTracking } from '@/lib/analytics'

interface PhotoGridWithHeadingProps {
  heading: string
  images: {
    src: string
    alt: string
  }[]
}

function TrackedGridImage({ image }: { image: { src: string; alt: string } }) {
  const imgRef = useRef<HTMLDivElement>(null)
  usePhotoViewTracking(imgRef, image.src, image.alt, 'photo_grid')

  return (
    <div ref={imgRef} className="relative aspect-[4/5] overflow-hidden">
      <picture>
        <source media="(max-width: 768px)" srcSet={getMobileSrc(image.src)} />
        <img
          src={image.src}
          alt={image.alt}
          width={800}
          height={1000}
          className="absolute inset-0 w-full h-full object-cover object-top"
          loading="lazy"
        />
      </picture>
    </div>
  )
}

export default function PhotoGridWithHeading({ heading, images }: PhotoGridWithHeadingProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-8">
        <h2
          className="text-3xl md:text-4xl font-light text-center mb-12"
          style={{
            fontFamily: '"Majesti Banner", serif',
            color: '#1C1C1C',
            fontWeight: 300,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          {heading}
        </h2>
        <div className="grid grid-cols-3 gap-4 md:gap-6">
          {images.map((image, index) => (
            <TrackedGridImage key={index} image={image} />
          ))}
        </div>
      </div>
    </section>
  )
}
