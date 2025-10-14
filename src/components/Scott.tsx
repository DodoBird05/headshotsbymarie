'use client'

import { useState } from 'react'

export default function Scott() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/)
    if (match) {
      return [match[1], match[2], match[3]].filter(Boolean).join('-')
    }
    return value
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setPhoneNumber(formatted)
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Illustration */}
          <div className="flex justify-center">
            <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="galloping-zebra">
              {/* Zebra body */}
              <ellipse cx="150" cy="180" rx="80" ry="50" fill="white" stroke="#1C1C1C" strokeWidth="2"/>
              {/* Zebra stripes */}
              <path d="M80 160 Q80 180 85 200" stroke="#1C1C1C" strokeWidth="8"/>
              <path d="M100 155 Q100 180 105 205" stroke="#1C1C1C" strokeWidth="8"/>
              <path d="M120 155 Q120 180 125 210" stroke="#1C1C1C" strokeWidth="8"/>
              <path d="M140 155 Q140 185 145 215" stroke="#1C1C1C" strokeWidth="8"/>
              <path d="M160 155 Q160 185 165 215" stroke="#1C1C1C" strokeWidth="8"/>
              <path d="M180 155 Q180 180 185 210" stroke="#1C1C1C" strokeWidth="8"/>
              <path d="M200 155 Q200 180 205 205" stroke="#1C1C1C" strokeWidth="8"/>
              <path d="M220 160 Q220 180 215 200" stroke="#1C1C1C" strokeWidth="8"/>

              {/* Zebra head */}
              <circle cx="230" cy="150" r="25" fill="white" stroke="#1C1C1C" strokeWidth="2"/>
              <path d="M210 140 Q215 145 220 150" stroke="#1C1C1C" strokeWidth="6"/>
              <path d="M225 135 Q230 140 235 145" stroke="#1C1C1C" strokeWidth="6"/>

              {/* Zebra legs - animated */}
              <rect x="120" y="220" width="8" height="60" fill="white" stroke="#1C1C1C" strokeWidth="2" className="leg-1"/>
              <rect x="145" y="220" width="8" height="60" fill="white" stroke="#1C1C1C" strokeWidth="2" className="leg-2"/>
              <rect x="170" y="220" width="8" height="60" fill="white" stroke="#1C1C1C" strokeWidth="2" className="leg-3"/>
              <rect x="195" y="220" width="8" height="60" fill="white" stroke="#1C1C1C" strokeWidth="2" className="leg-4"/>

              {/* Zebra tail */}
              <path d="M70 170 Q50 180 60 200" stroke="#1C1C1C" strokeWidth="4" fill="none"/>

              {/* Man riding */}
              <circle cx="150" cy="120" r="20" fill="#B85450" stroke="#1C1C1C" strokeWidth="2"/>
              {/* Man's body */}
              <rect x="140" y="140" width="20" height="40" fill="#1C1C1C"/>
              {/* Man's arms */}
              <path d="M140 150 L110 160" stroke="#1C1C1C" strokeWidth="6"/>
              <path d="M160 150 L220 140" stroke="#1C1C1C" strokeWidth="6"/>
              {/* Man's legs */}
              <path d="M145 180 L135 210" stroke="#1C1C1C" strokeWidth="6"/>
              <path d="M155 180 L165 210" stroke="#1C1C1C" strokeWidth="6"/>

              {/* Eyes */}
              <circle cx="145" cy="115" r="3" fill="#1C1C1C"/>
              <circle cx="155" cy="115" r="3" fill="#1C1C1C"/>
              {/* Smile */}
              <path d="M142 125 Q150 130 158 125" stroke="#1C1C1C" strokeWidth="2" fill="none"/>
            </svg>
          </div>

          {/* Right side - Form */}
          <div>
            <h1 className="text-5xl font-bold mb-6" style={{ fontFamily: '"Majesti Banner", serif', color: '#1C1C1C' }}>
              Ride with Scott!
            </h1>
            <p className="text-lg mb-8" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
              Join the zebra adventure! Enter your phone number below.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-2"
                  style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="480-524-0741"
                  maxLength={12}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#B85450] transition-colors"
                  style={{ fontFamily: '"Hanken Grotesk", sans-serif' }}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-lg font-medium transition-all hover:opacity-90"
                style={{
                  backgroundColor: '#B85450',
                  color: 'white',
                  fontFamily: '"Hanken Grotesk", sans-serif'
                }}
              >
                Submit
              </button>

              {submitted && (
                <div className="text-center p-3 bg-green-100 rounded-lg">
                  <p style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
                    Thanks! Your number {phoneNumber} has been submitted! 🦓
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gallop {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-15px) rotate(-2deg);
          }
          50% {
            transform: translateY(-5px) rotate(0deg);
          }
          75% {
            transform: translateY(-15px) rotate(2deg);
          }
        }

        @keyframes leg-1 {
          0%, 100% {
            transform: rotate(0deg);
            transform-origin: 124px 220px;
          }
          50% {
            transform: rotate(-15deg);
            transform-origin: 124px 220px;
          }
        }

        @keyframes leg-2 {
          0%, 100% {
            transform: rotate(0deg);
            transform-origin: 149px 220px;
          }
          50% {
            transform: rotate(15deg);
            transform-origin: 149px 220px;
          }
        }

        @keyframes leg-3 {
          0%, 100% {
            transform: rotate(0deg);
            transform-origin: 174px 220px;
          }
          50% {
            transform: rotate(15deg);
            transform-origin: 174px 220px;
          }
        }

        @keyframes leg-4 {
          0%, 100% {
            transform: rotate(0deg);
            transform-origin: 199px 220px;
          }
          50% {
            transform: rotate(-15deg);
            transform-origin: 199px 220px;
          }
        }

        .galloping-zebra {
          animation: gallop 0.8s ease-in-out infinite;
        }

        .galloping-zebra :global(.leg-1) {
          animation: leg-1 0.4s ease-in-out infinite;
        }

        .galloping-zebra :global(.leg-2) {
          animation: leg-2 0.4s ease-in-out infinite;
          animation-delay: 0.2s;
        }

        .galloping-zebra :global(.leg-3) {
          animation: leg-3 0.4s ease-in-out infinite;
          animation-delay: 0.2s;
        }

        .galloping-zebra :global(.leg-4) {
          animation: leg-4 0.4s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
