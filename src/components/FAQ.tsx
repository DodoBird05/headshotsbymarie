import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: 'Should I wear a tie?',
    answer: "We're not in the 80s anymore—skip the tie unless it's something you regularly wear for important meetings at work. Dress authentically for your professional context."
  },
  {
    question: 'Do you provide hair and makeup services?',
    answer: "No, but I work with professional makeup artists who can come to the studio. If you'd like to book a makeup artist, let me know and I'll coordinate the timing for your session."
  },
  {
    question: 'Do I need a makeup artist?',
    answer: "I value authenticity over perfection. While makeup artists are excellent for hair styling, they often apply more makeup than necessary for professional headshots. You should look like yourself in your photos—polished, but recognizable. Most clients do their own makeup and are happy with the results."
  },
  {
    question: 'What should I wear?',
    answer: "Dress as you would for an important business meeting in your industry. Bring options if you're unsure—we'll work together to choose what photographs best."
  },
  {
    question: 'How many outfits should I bring?',
    answer: "Bring at least three looks: something formal you'd wear to a work ceremony, business attire for an important meeting, and something more relaxed like you'd wear meeting a friend for coffee—but still professional enough to be photographed in."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section style={{ backgroundColor: '#ffffff', padding: '80px 20px 40px 20px' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          style={{
            fontFamily: '"Majesti Banner", serif',
            fontSize: '48px',
            color: '#1C1C1C',
            fontWeight: 300,
            marginBottom: '48px',
            textAlign: 'center'
          }}
        >
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#f8f8f8',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid #e5e5e5'
              }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                style={{
                  width: '100%',
                  padding: '20px 24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span
                  style={{
                    fontFamily: '"Hanken Grotesk", sans-serif',
                    fontSize: '18px',
                    fontWeight: '500',
                    color: '#1C1C1C'
                  }}
                >
                  {faq.question}
                </span>
                <ChevronDown
                  className={`transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                  style={{ color: '#1C1C1C', flexShrink: 0, marginLeft: '16px' }}
                />
              </button>

              <div
                style={{
                  maxHeight: openIndex === index ? '500px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease-in-out'
                }}
              >
                <div style={{ padding: '0 24px 20px 24px' }}>
                  <p
                    style={{
                      fontFamily: '"Hanken Grotesk", sans-serif',
                      fontSize: '16px',
                      color: '#4B5563',
                      lineHeight: '1.6'
                    }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
