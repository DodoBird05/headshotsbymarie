import { getMobileSrc } from '@/lib/responsiveImage'

interface PhotoGridWithHeadingProps {
  heading: string
  images: {
    src: string
    alt: string
  }[]
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
            <div key={index} className="relative aspect-[4/5] overflow-hidden">
              <picture>
                <source media="(max-width: 768px)" srcSet={getMobileSrc(image.src)} />
                <img
                  src={image.src}
                  alt={image.alt}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </picture>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
