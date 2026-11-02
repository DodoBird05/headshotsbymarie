'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { usePhotoViewTracking } from '@/lib/analytics'

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
  usePhotoViewTracking(containerRef, images[0]?.src || '', images[0]?.alt || 'carousel', 'carousel')


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
