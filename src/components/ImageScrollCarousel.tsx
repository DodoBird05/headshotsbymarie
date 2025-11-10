'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

interface ImageItem {
  src: string
  alt: string
  width?: number
  height?: number
}

interface ImageScrollCarouselProps {
  images: ImageItem[]
  containerHeight?: string
  backgroundColor?: string
  imageHeight?: string
  imageWidth?: string
  gap?: string
  // Animation controls
  scrollSpeed?: number
  animationDirection?: 'left' | 'right'
  scrollOffset?: [string, string]
  opacityRange?: [number, number, number, number]
  // Layout controls
  alignment?: 'start' | 'center' | 'end'
  padding?: string
  borderRadius?: string
  shadow?: string
  // Advanced customization
  className?: string
  imageClassName?: string
  enableImageHover?: boolean
  hoverScale?: number
}

export default function ImageScrollCarousel({
  images,
  containerHeight = '50vh',
  backgroundColor = 'bg-white',
  imageHeight = 'h-64',
  imageWidth = 'w-48',
  gap = 'gap-8',
  // Animation controls
  scrollSpeed = 30,
  animationDirection = 'left',
  scrollOffset = ['start 80%', 'end 20%'],
  opacityRange = [0, 1, 1, 0.8],
  // Layout controls
  alignment = 'center',
  padding = 'pl-0 pr-8',
  borderRadius = '',
  shadow = 'shadow-lg',
  // Advanced customization
  className = '',
  imageClassName = '',
  enableImageHover = true,
  hoverScale = 1.05
}: ImageScrollCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: scrollOffset as any
  })

  // Images horizontal movement - configurable direction and speed
  const scrollRange = animationDirection === 'left' ? ['0%', `-${scrollSpeed}%`] : [`${scrollSpeed}%`, '0%']
  const imagesX = useTransform(scrollYProgress, [0, 1], scrollRange)

  // Images opacity for smooth reveal
  const imagesOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], opacityRange)

  // Get alignment classes
  const alignmentClass = alignment === 'start' ? 'justify-start' : alignment === 'end' ? 'justify-end' : 'justify-center'

  return (
    <div
      ref={containerRef}
      className={`relative overflow-x-auto overflow-y-hidden ${backgroundColor} ${className}`}
      style={{ height: containerHeight }}
    >
      {/* Scrolling images */}
      <div className={`h-full flex items-center ${alignmentClass} ${gap} ${padding}`}>
        {images.map((image, index) => (
          <motion.div
            key={index}
            className={`flex-shrink-0 ${imageWidth} ${imageHeight} overflow-hidden ${shadow} ${borderRadius} ${imageClassName}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={enableImageHover ? { scale: hoverScale } : {}}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: 'easeOut'
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width || 300}
              height={image.height || 400}
              className="w-full h-full object-cover transition-transform duration-300"
            />
          </motion.div>
        ))}
      </div>

    </div>
  )
}

// Predefined presets for common use cases
export const carouselPresets = {
  hero: {
    containerHeight: '60vh',
    backgroundColor: 'bg-gradient-to-b from-gray-50 to-white',
    imageHeight: 'h-96',
    imageWidth: 'w-72',
    gap: 'gap-8',
    scrollSpeed: 25,
    shadow: 'shadow-2xl',
    borderRadius: 'rounded-none',
    enableImageHover: true,
    hoverScale: 1.08
  },
  gallery: {
    containerHeight: '40vh',
    backgroundColor: 'bg-white',
    imageHeight: 'h-64',
    imageWidth: 'w-48',
    gap: 'gap-6',
    scrollSpeed: 35,
    shadow: 'shadow-lg',
    borderRadius: 'rounded-none',
    enableImageHover: true,
    hoverScale: 1.05
  },
  testimonial: {
    containerHeight: '30vh',
    backgroundColor: 'bg-gray-100',
    imageHeight: 'h-48',
    imageWidth: 'w-36',
    gap: 'gap-4',
    scrollSpeed: 20,
    shadow: 'shadow-md',
    borderRadius: 'rounded-none',
    enableImageHover: false
  },
  portfolio: {
    containerHeight: '50vh',
    backgroundColor: 'bg-black',
    imageHeight: 'h-80',
    imageWidth: 'w-64',
    gap: 'gap-6',
    scrollSpeed: 30,
    shadow: 'shadow-xl',
    borderRadius: 'rounded-none',
    enableImageHover: true,
    hoverScale: 1.1,
    opacityRange: [0, 1, 1, 0.9] as [number, number, number, number]
  }
}

// Helper function to merge preset with custom props
export function mergeCarouselProps<T extends keyof typeof carouselPresets>(
  preset: T,
  customProps: Partial<ImageScrollCarouselProps> = {}
): ImageScrollCarouselProps {
  return {
    ...carouselPresets[preset],
    ...customProps,
    images: customProps.images || []
  }
}