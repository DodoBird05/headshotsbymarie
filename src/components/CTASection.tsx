import Link from 'next/link'

interface CTAButton {
  label: string
  href: string
  style: 'primary' | 'secondary'
}

interface CTASectionProps {
  heading?: string
  buttons: CTAButton[]
}

export default function CTASection({
  heading = "Professional portraits you'll love",
  buttons
}: CTASectionProps) {
  return (
    <div className="bg-[#1C1C1C] px-6 text-center py-16" style={{ paddingBottom: '20vh' }}>
      {heading && (
        <h2
          className="text-2xl mb-8"
          style={{
            fontFamily: '"Majesti Banner", serif',
            fontWeight: 300,
            color: '#ffffff',
            lineHeight: 1.2,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          {heading}
        </h2>
      )}

      {/* Buttons: stacked on mobile, side by side on desktop */}
      <div className="flex flex-col md:flex-row md:justify-center gap-4 md:gap-6">
        {buttons.map((button, index) => (
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
              backgroundColor: button.style === 'primary' ? '#ffffff' : 'transparent',
              color: button.style === 'primary' ? '#1C1C1C' : '#ffffff',
              border: button.style === 'secondary' ? '1px solid #ffffff' : 'none',
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
