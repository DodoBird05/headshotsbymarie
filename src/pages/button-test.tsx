import { useState } from 'react'
import Link from 'next/link'

export default function ButtonTest() {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-12 rounded-lg shadow-lg">
        <h1 className="text-3xl mb-8 text-center">Button Gradient Test</h1>

        <div className="flex flex-col gap-8 items-center">
          {/* Test Button */}
          <Link
            href="#"
            className="book-today-btn"
            style={{
              display: 'inline-block',
              backgroundColor: isHovered ? '#1C1C1C' : 'transparent',
              color: isHovered ? '#ffffff' : '#000',
              border: '2px solid #000',
              padding: '12px 32px',
              borderRadius: '4px',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              textAlign: 'center',
              fontFamily: '"Hanken Grotesk", sans-serif'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
          >
            <span
              style={{
                background: isHovered ? `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, #ffffff 0%, #999999 60px)` : 'none',
                WebkitBackgroundClip: isHovered ? 'text' : 'unset',
                WebkitTextFillColor: isHovered ? 'transparent' : 'inherit',
                backgroundClip: isHovered ? 'text' : 'unset'
              }}
            >
              Book Today
            </span>
          </Link>

          {/* Debug Info */}
          <div className="text-sm text-gray-600 text-center">
            <p>Hovered: {isHovered ? 'Yes' : 'No'}</p>
          </div>

        </div>
      </div>
    </div>
  )
}
