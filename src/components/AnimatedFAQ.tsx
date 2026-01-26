import { useState, useEffect, useRef } from 'react'

interface FAQItem {
  question: string
  answer: string
  fromLeft: boolean
}

interface AnimatedFAQProps {
  items: FAQItem[]
  scrollProgress?: number
  theme?: 'dark' | 'light'
}

export default function AnimatedFAQ({ items, theme = 'dark' }: AnimatedFAQProps) {
  const colors = theme === 'light'
    ? { question: '#1C1C1C', answer: '#666666', plus: '#1C1C1C' }
    : { question: '#ffffff', answer: '#cccccc', plus: '#ffffff' }
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(items.length).fill(false))
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    itemRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleItems(prev => {
                const newState = [...prev]
                newState[index] = true
                return newState
              })
            }
          },
          { threshold: 0.2 }
        )
        observer.observe(ref)
        observers.push(observer)
      }
    })

    return () => observers.forEach(obs => obs.disconnect())
  }, [items.length])

  return (
    <div className="py-16 px-6">
      <div className="space-y-4">
        {items.map((item, index) => {
          const isVisible = visibleItems[index]

          const translateX = item.fromLeft
            ? (isVisible ? 0 : -40)
            : (isVisible ? 0 : 40)

          const answerId = `faq-answer-${index}`

          return (
            <div
              key={item.question}
              ref={el => { itemRefs.current[index] = el }}
              className="text-center"
              style={{
                transform: `translateX(${translateX}vw)`,
                opacity: isVisible ? 1 : 0,
                transition: 'transform 0.8s ease-out, opacity 0.8s ease-out',
                transitionDelay: `${index * 0.15}s`
              }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="text-xl w-full md:hover:scale-110 transition-transform duration-300 flex items-center justify-center gap-3"
                aria-expanded={openIndex === index}
                aria-controls={answerId}
                style={{
                  fontFamily: '"Majesti Banner", serif',
                  fontWeight: 300,
                  color: colors.question,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  lineHeight: 1.2,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {item.question}
                <span
                  style={{
                    fontFamily: '"Hanken Grotesk", sans-serif',
                    fontWeight: 200,
                    fontSize: '1.5rem',
                    color: colors.plus,
                    transition: 'transform 0.3s ease',
                    transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                    display: 'inline-block'
                  }}
                >
                  +
                </span>
              </button>

              {/* Answer */}
              <div
                id={answerId}
                role="region"
                aria-hidden={openIndex !== index}
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
                    color: colors.answer,
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
