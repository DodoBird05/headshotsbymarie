'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

interface TypeformGalleryProps {
  frontImages: { src: string; alt: string }[]
  backImages: { src: string; alt: string }[]
}

export default function TypeformGallery({
  frontImages,
  backImages
}: TypeformGalleryProps) {
  const [animationKey, setAnimationKey] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start the animation sequence
            setAnimationKey(prev => prev + 1)
          }
        })
      },
      { threshold: 0.6 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (animationKey > 0) {
      // After the full sequence, restart
      const timer = setTimeout(() => {
        setAnimationKey(prev => prev + 1)
      }, 6000)
      return () => clearTimeout(timer)
    }
  }, [animationKey])

  // Images on edges: 0,1,2,3,5,6,7,8 (excluding center image 4)
  const shouldFlip = (index: number) => index !== 4

  return (
    <div ref={containerRef} style={{ padding: '30px', display: 'flex', gap: '15px', justifyContent: 'center', height: '650px' }}>
      <div style={{
        border: 'none',
        borderRadius: '10px',
        overflow: 'hidden',
        position: 'relative',
        width: '800px',
        height: '650px'
      }}>
        <div key={animationKey} style={{
          display: 'flex',
          gap: '15px',
          borderRadius: '10px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
      {/* Column 1 - Slides Down */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', animation: animationKey > 0 ? 'slideDownOnce 1.5s ease-out forwards' : 'none', zIndex: 1 }}>
        {frontImages.slice(0, 3).map((img, i) => (
          <div
            key={i}
            style={{
              width: '245px',
              height: '195px',
              flexShrink: 0,
              position: 'relative'
            }}
          >
            <div style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              animation: shouldFlip(i)
                ? 'rotateCard 0.8s ease-in-out 2s forwards, fadeOut 1s ease-in-out 3.8s forwards'
                : 'fadeOut 1s ease-in-out 3.8s forwards'
            }}>
              {/* Bottom Image (Back) */}
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                zIndex: 1
              }}>
                <Image src={backImages[i].src} alt={backImages[i].alt} fill style={{ objectFit: 'cover' }} />
              </div>
              {/* Top Image (Front) - Fades out */}
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                zIndex: 2,
                animation: shouldFlip(i)
                  ? 'fadeOutTop 0.8s ease-in-out 2s forwards'
                  : 'none'
              }}>
                <Image src={img.src} alt={img.alt} fill style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Column 2 - Slides Up */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', animation: animationKey > 0 ? 'slideUpOnce 1.5s ease-out forwards' : 'none', zIndex: 2, position: 'relative' }}>
        {frontImages.slice(3, 6).map((img, i) => {
          const actualIndex = i + 3
          return (
            <div
              key={i}
              style={{
                width: '245px',
                height: '195px',
                flexShrink: 0,
                position: 'relative',
                zIndex: actualIndex === 5 ? 1 : 'auto'
              }}
            >
              <div style={{
                width: '100%',
                height: '100%',
                position: actualIndex === 4 ? 'absolute' : 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                animation: actualIndex === 4
                  ? 'expandCenter 1s ease-in-out 3.8s forwards, slideOutRight 1s ease-in-out 4.8s forwards'
                  : shouldFlip(actualIndex)
                  ? 'rotateCard 0.8s ease-in-out 2s forwards, fadeOut 1s ease-in-out 3.8s forwards'
                  : 'fadeOut 1s ease-in-out 3.8s forwards',
                zIndex: actualIndex === 4 ? 5 : actualIndex === 8 ? 1 : 'auto'
              }}>
                {/* Bottom Image (Back) */}
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  zIndex: 1
                }}>
                  <Image src={backImages[actualIndex].src} alt={backImages[actualIndex].alt} fill style={{ objectFit: 'cover' }} />
                </div>
                {/* Top Image (Front) - Fades out */}
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  zIndex: 2,
                  animation: shouldFlip(actualIndex)
                    ? 'fadeOutTop 0.8s ease-in-out 2s forwards'
                    : 'none'
                }}>
                  <Image src={img.src} alt={img.alt} fill style={{ objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Column 3 - Slides Down */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', animation: animationKey > 0 ? 'slideDownOnce 1.5s ease-out forwards' : 'none', zIndex: 1 }}>
        {frontImages.slice(6, 9).map((img, i) => {
          const actualIndex = i + 6
          return (
            <div
              key={i}
              style={{
                width: '245px',
                height: '195px',
                flexShrink: 0,
                position: 'relative',
                zIndex: actualIndex === 8 ? 1 : 'auto'
              }}
            >
              <div style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                animation: shouldFlip(actualIndex)
                  ? 'rotateCard 0.8s ease-in-out 2s forwards, fadeOut 1s ease-in-out 3.8s forwards'
                  : 'fadeOut 1s ease-in-out 3.8s forwards'
              }}>
                {/* Bottom Image (Back) */}
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  zIndex: 1
                }}>
                  <Image src={backImages[actualIndex].src} alt={backImages[actualIndex].alt} fill style={{ objectFit: 'cover' }} />
                </div>
                {/* Top Image (Front) - Fades out */}
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  zIndex: 2,
                  animation: shouldFlip(actualIndex)
                    ? 'fadeOutTop 0.8s ease-in-out 2s forwards'
                    : 'none'
                }}>
                  <Image src={img.src} alt={img.alt} fill style={{ objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
      </div>
      </div>

      <style jsx>{`
        @keyframes slideDownOnce {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(0);
          }
        }

        @keyframes slideUpOnce {
          0% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(0);
          }
        }

        @keyframes rotateCard {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(180deg);
          }
        }

        @keyframes fadeOutTop {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes expandCenter {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(3.2);
            z-index: 100;
          }
        }

        @keyframes fadeOut {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes slideOutRight {
          0% {
            transform: scale(3.2) translateX(0);
            opacity: 1;
          }
          100% {
            transform: scale(3.2) translateX(100%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
