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
}

export default function ImageScrollCarousel({
  images,
  containerHeight = '50vh',
  backgroundColor = 'bg-white',
  imageHeight = 'h-64',
  imageWidth = 'w-48',
  gap = 'gap-8'
}: ImageScrollCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%']
  })

  // Images horizontal movement - slower, starts more left-aligned
  const imagesX = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])
  
  // Images opacity for smooth reveal
  const imagesOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0.8])

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${backgroundColor}`}
      style={{ height: containerHeight }}
    >
      {/* Scrolling images */}
      <div className="relative h-full flex items-center">
        <motion.div
          className={`absolute inset-0 flex items-center ${gap} whitespace-nowrap pl-0 pr-8`}
          style={{
            x: imagesX,
            opacity: imagesOpacity
          }}
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              className={`flex-shrink-0 ${imageWidth} ${imageHeight} overflow-hidden shadow-lg`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
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
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

    </div>
  )
}