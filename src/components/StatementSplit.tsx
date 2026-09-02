import { getMobileSrc } from '@/lib/responsiveImage'

interface StatementSplitProps {
  pullLine?: string
  title?: string
  paragraphs: string[]
  imagePath?: string
  imageAlt?: string
  textColor?: string
  isDark?: boolean
}

export default function StatementSplit({
  pullLine,
  title,
  paragraphs,
  imagePath,
  imageAlt = '',
  textColor = '#F5F0EB',
  isDark = true
}: StatementSplitProps) {
  const linkClass = isDark
    ? '[&_a]:text-[#F5F0EB] [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:opacity-70 [&_a]:transition-opacity'
    : '[&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:opacity-70 [&_a]:transition-opacity'

  return (
    <div className="max-w-6xl mx-auto px-8">
      {/* Pull line as large statement */}
      {pullLine && (
        <p
          data-reveal
          className="text-3xl md:text-5xl mb-12"
          style={{
            fontFamily: '"Romie", serif',
            color: textColor,
            fontWeight: 300,
            lineHeight: 1.15,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.04em'
          }}
        >
          {pullLine}
        </p>
      )}
      {/* Image + text side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {imagePath && (
          <div data-reveal data-reveal-delay="200">
            <picture>
              <source media="(max-width: 768px)" srcSet={getMobileSrc(imagePath)} />
              <img
                src={imagePath}
                alt={imageAlt}
                width={800}
                height={1000}
                className="w-full object-cover"
                loading="lazy"
              />
            </picture>
          </div>
        )}
        <div className="space-y-6" data-reveal data-reveal-delay="400">
          {title && (
            <h2
              className="text-2xl lg:text-3xl font-light"
              style={{ fontFamily: '"Romie", serif', color: textColor, fontWeight: 300,  letterSpacing: '0.1em' }}
            >
              {title}
            </h2>
          )}
          {paragraphs.map((paragraph, pIndex) => (
            <p
              key={pIndex}
              className={`text-base lg:text-lg ${linkClass}`}
              style={{ fontFamily: '"Romie", serif', color: textColor, fontWeight: 300, lineHeight: 1.7 }}
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
