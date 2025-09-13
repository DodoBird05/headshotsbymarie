'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface DecorativeElement {
  id: string
  content: string | React.ReactNode
  position: { x: string; y: string }
  scale?: number
  rotation?: number
}

interface TruusStyleCarouselProps {
  mainText: string
  decorativeElements?: DecorativeElement[]
  staticText: string
  containerHeight?: string
  backgroundColor?: string
  textColor?: string
  staticTextColor?: string
}

export default function TruusStyleCarousel({
  mainText,
  decorativeElements = [],
  staticText,
  containerHeight = '150vh',
  backgroundColor = 'bg-gray-100',
  textColor = 'text-black',
  staticTextColor = 'text-gray-800'
}: TruusStyleCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%']
  })

  // Main text horizontal movement - slower, more time to see
  const textX = useTransform(scrollYProgress, [0, 0.8], ['100%', '-120%'])
  
  // Text opacity for smooth reveal - longer visible time
  const textOpacity = useTransform(scrollYProgress, [0, 0.1, 0.7, 0.9], [0, 1, 1, 0.8])
  
  // Static text animation - appears earlier, stays longer
  const staticTextOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.8, 1], [0, 1, 1, 1])
  const staticTextY = useTransform(scrollYProgress, [0.2, 0.4], [30, 0])
  
  // Curved arrow animation - appears earlier, stays visible
  const arrowOpacity = useTransform(scrollYProgress, [0.5, 0.7, 0.9, 1], [0, 1, 1, 1])
  const arrowRotation = useTransform(scrollYProgress, [0.5, 0.7], [0, 360])

  // SVG Curved Arrow Component
  const CurvedArrow = () => (
    <svg
      width="120"
      height="80"
      viewBox="0 0 120 80"
      fill="none"
      className="absolute right-12 top-1/2 transform -translate-y-1/2"
    >
      <motion.path
        d="M10 20 Q 60 10, 100 40 L 85 35 M 100 40 L 95 55"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
    </svg>
  )

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${backgroundColor}`}
      style={{ height: containerHeight }}
    >
      {/* Main scrolling text */}
      <div className="relative h-full flex items-center">
        <motion.div
          className="absolute inset-0 flex items-center whitespace-nowrap"
          style={{
            x: textX,
            opacity: textOpacity
          }}
        >
          <h2
            className={`font-bold ${textColor}`}
            style={{
              fontSize: 'clamp(3rem, 12vw, 12rem)',
              fontFamily: '"Hanken Grotesk", sans-serif',
              lineHeight: '0.9'
            }}
          >
            {mainText}
          </h2>
          
          {/* Decorative elements that move with text */}
          {decorativeElements.map((element) => (
            <motion.div
              key={element.id}
              className="absolute"
              style={{
                left: element.position.x,
                top: element.position.y,
                scale: element.scale || 1,
                rotate: element.rotation || 0
              }}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: element.scale || 1, rotate: element.rotation || 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.3,
                type: "spring",
                stiffness: 100 
              }}
            >
              {typeof element.content === 'string' ? (
                <span className="text-4xl">{element.content}</span>
              ) : (
                element.content
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Curved arrow at the end */}
        <motion.div
          className={`absolute right-16 top-1/2 transform -translate-y-1/2 ${textColor}`}
          style={{
            opacity: arrowOpacity,
            rotate: arrowRotation
          }}
        >
          <CurvedArrow />
        </motion.div>
      </div>

      {/* Static descriptive text */}
      <motion.div
        className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 text-center max-w-2xl px-8"
        style={{
          opacity: staticTextOpacity,
          y: staticTextY
        }}
      >
        <p 
          className={`text-lg md:text-xl leading-relaxed ${staticTextColor}`}
          style={{ fontFamily: '"Hanken Grotesk", sans-serif' }}
        >
          {staticText}
        </p>
      </motion.div>
    </div>
  )
}

// Preset decorative elements for photography
export const photographyDecorations: DecorativeElement[] = [
  {
    id: 'camera',
    content: '📸',
    position: { x: '20%', y: '20%' },
    scale: 1.5,
    rotation: 15
  },
  {
    id: 'sparkle',
    content: '✨',
    position: { x: '60%', y: '30%' },
    scale: 1.2,
    rotation: -10
  },
  {
    id: 'heart',
    content: '💖',
    position: { x: '80%', y: '15%' },
    scale: 1.3,
    rotation: 25
  }
]

// Custom SVG decorative elements (more like truus.co style)
export const CustomDecorations = {
  HandDrawnArrow: ({ color = '#6366f1' }: { color?: string }) => (
    <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
      <motion.path
        d="M5 20 Q 30 5, 50 20 L 45 15 M 50 20 L 45 25"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 1 }}
      />
    </svg>
  ),
  
  HandDrawnHeart: ({ color = '#ec4899' }: { color?: string }) => (
    <svg width="50" height="45" viewBox="0 0 50 45" fill="none">
      <motion.path
        d="M25 40 C 15 30, 5 20, 5 15 C 5 8, 12 5, 18 10 C 22 8, 25 10, 25 15 C 25 10, 28 8, 32 10 C 38 5, 45 8, 45 15 C 45 20, 35 30, 25 40 Z"
        stroke={color}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, scale: 0 }}
        animate={{ pathLength: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
      />
    </svg>
  ),

  HandDrawnStar: ({ color = '#f59e0b' }: { color?: string }) => (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none">
      <motion.path
        d="M22.5 5 L 27 17 L 40 17 L 30 25 L 35 37 L 22.5 30 L 10 37 L 15 25 L 5 17 L 18 17 Z"
        stroke={color}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, rotate: -180 }}
        animate={{ pathLength: 1, rotate: 0 }}
        transition={{ duration: 2, delay: 1.2 }}
      />
    </svg>
  )
}