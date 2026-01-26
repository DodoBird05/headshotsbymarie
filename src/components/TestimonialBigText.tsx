import Link from 'next/link'

interface CTAButton {
  label: string
  href: string
  style: 'primary' | 'secondary'
}

interface TestimonialBigTextProps {
  quote: string[]  // Array of lines for the quote
  author: string
  rating: number
  source: string
  ctaButtons?: CTAButton[]
}

export default function TestimonialBigText({
  quote,
  author,
  rating,
  source,
  ctaButtons = [
    { label: 'Individuals', href: '/pricing', style: 'primary' },
    { label: 'Teams', href: '/corporate', style: 'secondary' }
  ]
}: TestimonialBigTextProps) {
  return (
    <div className="text-center mt-12 px-2">
      <p
        className="text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-8"
        style={{
          fontFamily: '"Majesti Banner", serif',
          fontWeight: 300,
          color: '#1C1C1C',
          textTransform: 'uppercase',
          lineHeight: 0.85,
          letterSpacing: '0.02em'
        }}
      >
        {quote.map((line, index) => (
          <span key={index}>
            {index === 0 ? (
              <>
                <span style={{ fontFeatureSettings: '"ss01" on' }}>{line.charAt(0)}</span>
                {line.slice(1)}
              </>
            ) : (
              line
            )}
            {index < quote.length - 1 && <br />}
          </span>
        ))}
      </p>
      <p
        className="text-sm mb-1"
        style={{
          fontFamily: '"Hanken Grotesk", sans-serif',
          fontWeight: 500,
          color: '#1C1C1C',
          letterSpacing: '0.1em'
        }}
      >
        - {author}
      </p>
      <p
        className="text-sm"
        style={{
          fontFamily: '"Hanken Grotesk", sans-serif',
          color: '#1C1C1C'
        }}
      >
        {'★'.repeat(rating)}
      </p>
      <p
        className="text-xs mt-1"
        style={{
          fontFamily: '"Hanken Grotesk", sans-serif',
          color: '#666'
        }}
      >
        {source}
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col md:flex-row md:justify-center gap-3 md:gap-6 mt-8 md:mt-12 px-4">
        {ctaButtons.map((button, index) => (
          <Link
            key={index}
            href={button.href}
            className="py-3 px-8 text-center"
            style={{
              fontFamily: '"Hanken Grotesk", sans-serif',
              fontWeight: 500,
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              backgroundColor: button.style === 'primary' ? '#1C1C1C' : 'transparent',
              color: button.style === 'primary' ? '#ffffff' : '#1C1C1C',
              border: button.style === 'secondary' ? '1px solid #1C1C1C' : 'none',
              textDecoration: 'none'
            }}
          >
            {button.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
