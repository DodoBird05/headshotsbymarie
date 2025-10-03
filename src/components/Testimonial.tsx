import Image from 'next/image'

interface TestimonialProps {
  quote: string
  author: string
  imagePath: string
  imageAlt: string
}

export default function Testimonial({ quote, author, imagePath, imageAlt }: TestimonialProps) {
  return (
    <section className="mt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
        {/* Image Side */}
        <div className="relative">
          <Image
            src={imagePath}
            alt={imageAlt}
            fill
            className="object-cover"
          />
        </div>

        {/* Quote Side */}
        <div
          className="flex items-center justify-center p-8 md:p-12 relative"
          style={{ backgroundColor: '#F5F5F5' }}
        >
          <div className="max-w-md text-center">
            {/* Testimonial Text */}
            <blockquote
              className="text-lg leading-relaxed mb-6"
              style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 400 }}
            >
              "{quote}"
            </blockquote>

            {/* Client Name */}
            <cite
              className="text-base font-medium not-italic"
              style={{ fontFamily: '"Bodoni Moda", serif', color: '#1C1C1C', fontWeight: 'bold' }}
            >
              — {author}
            </cite>
          </div>
        </div>
      </div>
    </section>
  )
}
