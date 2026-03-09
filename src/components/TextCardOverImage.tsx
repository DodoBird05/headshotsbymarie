import { getMobileSrc } from '@/lib/responsiveImage'

interface TextCardOverImageProps {
  title?: string
  paragraphs: string[]
  imagePath: string
  imageAlt: string
}

export default function TextCardOverImage({
  title,
  paragraphs,
  imagePath,
  imageAlt
}: TextCardOverImageProps) {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <div className="relative lg:flex lg:justify-end">
        <div className="lg:w-[65%]" data-reveal>
          <picture>
            <source media="(max-width: 768px)" srcSet={getMobileSrc(imagePath)} />
            <img
              src={imagePath}
              alt={imageAlt}
              width={800}
              height={1067}
              className="w-full object-cover"
              style={{ aspectRatio: '3/4' }}
              loading="lazy"
            />
          </picture>
        </div>
        <div
          className="mt-6 lg:mt-0 lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:max-w-lg p-6 lg:p-10"
          data-reveal data-reveal-direction="left" data-reveal-delay="300"
          style={{
            backgroundColor: 'rgba(42,42,42,0.95)',
            backdropFilter: 'blur(4px)',
            border: '1px solid #3A3A3A',
            left: '-10%'
          }}
        >
          {title && (
            <h2
              className="text-2xl lg:text-3xl font-light mb-6"
              style={{ fontFamily: '"Majesti Banner", serif', color: '#F5F0EB', fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.05em' }}
            >
              {title}
            </h2>
          )}
          {paragraphs.map((paragraph, pIndex) => (
            <p
              key={pIndex}
              className="text-base mb-4 last:mb-0 [&_a]:text-[#F5F0EB] [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:opacity-70 [&_a]:transition-opacity"
              style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#F5F0EB', fontWeight: 300, lineHeight: 1.7 }}
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
