import Image from 'next/image'
import Link from 'next/link'

interface HeadingWithPhotoProps {
  heading: string
  description: string
  image: {
    src: string
    alt: string
    link?: string
  }
}

export default function HeadingWithPhoto({
  heading,
  description,
  image
}: HeadingWithPhotoProps) {
  return (
    <div className="relative bg-[#1C1C1C]" style={{ zIndex: 10 }}>
      {/* Heading and description */}
      <div className="text-center pt-6 pb-16 px-6">
        <h2
          className="text-3xl mb-4"
          style={{
            fontFamily: '"Majesti Banner", serif',
            fontWeight: 300,
            color: '#ffffff',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            lineHeight: 1.1
          }}
        >
          {heading}
        </h2>
        <p
          className="text-lg"
          style={{
            fontFamily: '"Hanken Grotesk", sans-serif',
            fontWeight: 300,
            color: '#cccccc',
            lineHeight: 1.4
          }}
        >
          {description}
        </p>
      </div>

      {/* Desktop: Larger photo */}
      <div className="hidden md:flex justify-center px-8 pb-8" style={{ height: '50vh' }}>
        <div className="relative h-full" style={{ aspectRatio: '1200/796' }}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Mobile: Smaller photo with optional link */}
      <div className="md:hidden pb-8 flex justify-center">
        {image.link ? (
          <Link href={image.link} style={{ width: '50%' }}>
            <Image
              src={image.src}
              alt={image.alt}
              width={1200}
              height={796}
              className="w-full h-auto rounded-lg"
            />
          </Link>
        ) : (
          <div style={{ width: '50%' }}>
            <Image
              src={image.src}
              alt={image.alt}
              width={1200}
              height={796}
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  )
}
