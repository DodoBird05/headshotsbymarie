import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
  fromLeft: boolean
}

interface MobileFAQProps {
  items: FAQItem[]
  scrollProgress: number
}

export default function MobileFAQ({ items, scrollProgress }: MobileFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="py-16 px-6">
      <div className="space-y-4">
        {items.map((item, index) => {
          // All items animate together - starts after scrollProgress reaches 0.25
          const itemProgress = Math.max(0, Math.min(1, (scrollProgress - 0.25) * 10))

          const translateX = item.fromLeft
            ? (-40 + itemProgress * 40)
            : (40 - itemProgress * 40)

          return (
            <div
              key={index}
              className="text-center"
              style={{
                transform: `translateX(${translateX}vw)`,
                opacity: itemProgress
              }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="text-xl w-full"
                style={{
                  fontFamily: '"Majesti Banner", serif',
                  fontWeight: 300,
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  lineHeight: 1.2,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {item.question}
              </button>

              {/* Answer */}
              <div
                style={{
                  maxHeight: openIndex === index ? '300px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease-in-out'
                }}
              >
                <p
                  className="text-base mt-4 px-4"
                  style={{
                    fontFamily: '"Hanken Grotesk", sans-serif',
                    fontWeight: 300,
                    color: '#cccccc',
                    lineHeight: 1.6,
                    textAlign: 'center'
                  }}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
