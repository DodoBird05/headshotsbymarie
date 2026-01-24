import Image from 'next/image'

interface GalleryItem {
  src: string
  alt: string
  headingAbove?: string
  headingBelow?: string
  size?: 'S' | 'M' | 'L'
  align?: 'left' | 'center' | 'right'
}

interface ScatteredImageGalleryProps {
  images: GalleryItem[]
  topOffset?: string
}

export default function ScatteredImageGallery({
  images,
  topOffset = '750px'
}: ScatteredImageGalleryProps) {
  // Size widths: S=33%, M=50%, L=90%
  const getWidth = (size?: 'S' | 'M' | 'L') => {
    switch (size) {
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
        <div key={index} className={`mb-8 flex ${getJustify(image.align)}`}>
          <div style={{ width: getWidth(image.size) }}>
            {image.headingAbove && (
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
            )}
            <Image
              src={image.src}
              alt={image.alt}
              width={400}
              height={500}
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
