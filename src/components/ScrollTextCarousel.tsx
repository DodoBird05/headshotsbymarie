'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface ScrollTextCarouselProps {
  text: string
  showArrow?: boolean
  containerHeight?: string
  textClassName?: string
  arrowClassName?: string
  backgroundColor?: string
  textColor?: string
}

export default function ScrollTextCarousel({
  text,
  showArrow = true,
  containerHeight = '100vh',
  textClassName = '',
  arrowClassName = '',
  backgroundColor = 'bg-black',
  textColor = 'text-white'
}: ScrollTextCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { 
    margin: '-20% 0px -20% 0px',
    once: false 
  })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  // Horizontal movement: starts off-screen right, ends off-screen left
  const x = useTransform(scrollYProgress, [0, 1], ['100%', '-100%'])
  
  // Opacity for smooth reveal
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
  
  // Scale effect for added visual interest
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  
  // Arrow animations
  const arrowOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1])
  const arrowY = useTransform(scrollYProgress, [0.6, 0.8], [30, 0])

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden flex items-center justify-center ${backgroundColor}`}
      style={{ height: containerHeight }}
    >
      {/* Main text animation */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          x,
          opacity,
          scale
        }}
      >
        <motion.h2
          className={`font-light text-center whitespace-nowrap ${textColor} ${textClassName}`}
          style={{
            fontSize: 'clamp(2rem, 8vw, 8rem)',
            fontFamily: '"Hanken Grotesk", sans-serif'
          }}
          initial={{ letterSpacing: '0.5em' }}
          animate={isInView ? { letterSpacing: 'normal' } : { letterSpacing: '0.5em' }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {text}
        </motion.h2>
      </motion.div>

      {/* Arrow indicator */}
      {showArrow && (
        <motion.div
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center ${textColor} ${arrowClassName}`}
          style={{
            opacity: arrowOpacity,
            y: arrowY
          }}
        >
          <motion.div 
            className="text-sm font-light mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Continue
          </motion.div>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </motion.div>
      )}

      {/* Subtle gradient overlays */}
      <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
    </div>
  )
}

// Utility function to create word-by-word animations
export function createWordCarousel(text: string, wordDelay: number = 0.2) {
  return text.split(' ').map((word, index) => ({
    word,
    delay: index * wordDelay
  }))
}