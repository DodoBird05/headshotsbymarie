'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'

interface CarouselItem {
  type: 'text' | 'image'
  content: string
  alt?: string
  className?: string
}

interface ScrollHorizontalCarouselProps {
  items: CarouselItem[]
  showArrow?: boolean
  containerHeight?: string
  className?: string
}

export default function ScrollHorizontalCarousel({
  items,
  showArrow = true,
  containerHeight = '100vh',
  className = ''
}: ScrollHorizontalCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { margin: '-10% 0px -10% 0px' })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  // Transform scroll progress to horizontal movement
  // Items move from right (100%) to left (-20%)
  const x = useTransform(scrollYProgress, [0, 1], ['100%', '-20%'])
  
  // Opacity animation for smooth reveal
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8])
  
  // Arrow animation - appears at the end
  const arrowOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1])
  const arrowY = useTransform(scrollYProgress, [0.7, 0.9], [20, 0])

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ height: containerHeight }}
    >
      {/* Horizontal scrolling content */}
      <motion.div
        className="flex items-center h-full whitespace-nowrap"
        style={{
          x,
          opacity
        }}
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            className={`flex-shrink-0 ${item.className || ''}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: 'easeOut'
            }}
          >
            {item.type === 'text' ? (
              <span className="text-4xl md:text-6xl lg:text-8xl font-light px-8">
                {item.content}
              </span>
            ) : (
              <div className="px-8">
                <Image
                  src={item.content}
                  alt={item.alt || ''}
                  width={400}
                  height={300}
                  className="rounded-lg object-cover"
                />
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Arrow indicator */}
      {showArrow && (
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white"
          style={{
            opacity: arrowOpacity,
            y: arrowY
          }}
        >
          <div className="text-sm font-light mb-2">Continue</div>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </motion.div>
      )}

      {/* Gradient overlays for smooth edge transitions */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
    </div>
  )
}

// Preset configurations for common use cases
export const presets = {
  textOnly: (text: string): CarouselItem[] => [
    { type: 'text' as const, content: text, className: 'text-white font-light' }
  ],
  
  textWithImages: (text: string, images: string[]): CarouselItem[] => [
    { type: 'text' as const, content: text.split(' ')[0], className: 'text-white font-light' },
    { type: 'image' as const, content: images[0], alt: 'Portfolio image 1' },
    { type: 'text' as const, content: text.split(' ').slice(1, 4).join(' '), className: 'text-white font-light' },
    { type: 'image' as const, content: images[1], alt: 'Portfolio image 2' },
    { type: 'text' as const, content: text.split(' ').slice(4).join(' '), className: 'text-white font-light' }
  ],

  photographyShowcase: (images: string[]): CarouselItem[] => [
    { type: 'text' as const, content: 'Where', className: 'text-white font-light' },
    { type: 'image' as const, content: images[0], alt: 'Professional headshot' },
    { type: 'text' as const, content: 'artistry', className: 'text-white font-light' },
    { type: 'image' as const, content: images[1], alt: 'Corporate portrait' },
    { type: 'text' as const, content: 'meets', className: 'text-white font-light' },
    { type: 'image' as const, content: images[2], alt: 'Personal branding' },
    { type: 'text' as const, content: 'authenticity', className: 'text-white font-light' }
  ]
}