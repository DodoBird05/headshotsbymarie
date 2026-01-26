import Image from 'next/image'

interface ParallaxImage {
  src: string
  alt: string
}

interface ParallaxImagesProps {
  images: ParallaxImage[]
}

export default function ParallaxImages({ images }: ParallaxImagesProps) {
  if (!images || images.length === 0) return null

  return (
    <div className="w-full bg-[#1C1C1C]">
      {/* Mobile: Single image (first one) */}
      <div className="md:hidden relative w-full" style={{ height: '80vh' }}>
        <Image
          src={images[0].src}
          alt={images[0].alt}
          fill
          className="object-cover"
        />
      </div>

      {/* Desktop: 3 images grid - full width, no gaps */}
      <div className="hidden md:flex w-full" style={{ height: '80vh' }}>
        {images.map((image, index) => (
          <div key={index} className="relative h-full flex-1">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
