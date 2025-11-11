import Image from 'next/image'

interface TestimonialProps {
  quote: string
  author: string
  imagePath: string
  imageAlt: string
}

export default function Testimonial({ quote, author, imagePath, imageAlt }: TestimonialProps) {
  return (
    <section className="py-16" style={{ backgroundColor: '#0f0e0d' }}>
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
        {/* Quote Side */}
        <div
          className="flex items-center justify-center p-8 md:p-12 relative"
          style={{ backgroundColor: '#0f0e0d' }}
        >
          <div className="max-w-md text-center">
            {/* Testimonial Text */}
            <blockquote
              className="text-lg leading-relaxed mb-6"
              style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#fafafa', fontWeight: 400 }}
            >
              "{quote}"
            </blockquote>

            {/* Client Name */}
            <cite
              className="text-base font-medium not-italic"
              style={{ fontFamily: '"Majesti Banner", serif', color: '#fafafa', fontWeight: 'bold' }}
            >
              — {author}
            </cite>
          </div>
        </div>

        {/* Image Side */}
        <div className="relative testimonial-image">
          <Image
            src={imagePath}
            alt={imageAlt}
            fill
            className="object-contain md:object-cover"
          />
        </div>
      </div>

      <style jsx>{`
        .testimonial-image {
          min-height: 500px;
        }
        @media (max-width: 768px) {
          .testimonial-image {
            height: 400px;
            min-height: 400px;
          }
        }
      `}</style>
    </section>
  )
}
