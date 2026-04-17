import { useRef } from 'react'
import Link from 'next/link'
import { trackButtonClick, useSectionViewTracking } from '@/lib/analytics'

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
  const sectionRef = useRef<HTMLDivElement>(null)
  useSectionViewTracking(sectionRef, 'cta', 91)
  return (
    <div ref={sectionRef} className="bg-[#1C1C1C] px-6 text-center py-16" style={{ paddingBottom: '20vh' }}>
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
        {buttons.map((button) => {
          const isPrimary = button.style === 'primary'
          const baseBg = isPrimary ? '#ffffff' : 'transparent'
          const baseColor = isPrimary ? '#1C1C1C' : '#ffffff'
          const baseBorder = isPrimary ? 'none' : '1px solid #ffffff'
          return (
            <Link
              key={button.label}
              href={button.href}
              onClick={() => trackButtonClick(button.label, 'cta_section', button.href)}
              className={`py-3 px-8 text-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isPrimary ? 'focus:ring-white' : 'focus:ring-white/50'
              }`}
              style={{
                fontFamily: '"Hanken Grotesk", sans-serif',
                fontWeight: 500,
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                backgroundColor: baseBg,
                color: baseColor,
                border: baseBorder,
                borderRadius: '9999px',
                textDecoration: 'none'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#D4A843'
                e.currentTarget.style.color = '#FFFFFF'
                if (!isPrimary) e.currentTarget.style.border = '1px solid #D4A843'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = baseBg
                e.currentTarget.style.color = baseColor
                e.currentTarget.style.border = baseBorder
              }}
            >
              {button.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
