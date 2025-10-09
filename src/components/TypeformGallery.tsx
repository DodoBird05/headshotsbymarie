'use client'

import Image from 'next/image'

export default function TypeformGallery() {
  const frontImages = [
    '/images/Good Photos/Dave.webp',
    '/images/Good Photos/DeShawn.webp',
    '/images/Good Photos/Erich.webp',
    '/images/Good Photos/Guacy.webp',
    '/images/Good Photos/Jaime-800.webp',
    '/images/Good Photos/Janelle.webp',
    '/images/Good Photos/Janine.webp',
    '/images/Good Photos/Johnny.webp',
    '/images/Good Photos/Kasia.webp',
  ]

  const backImages = [
    '/images/Good Photos/Kristen-actor-headshot.webp',
    '/images/Good Photos/Kyle Wright 05 For Web Use.webp',
    '/images/Good Photos/Laura Hanish 02 For Web Use.webp',
    '/images/Good Photos/Mallory.webp',
    '/images/Good Photos/Martha.webp',
    '/images/Good Photos/Natalie .webp',
    '/images/Good Photos/Natalie.webp',
    '/images/Good Photos/Russell-800.webp',
    '/images/Good Photos/Shannon.webp',
  ]

  // Images on edges: 0,1,2,3,5,6,7,8 (excluding center image 4)
  const shouldFlip = (index: number) => index !== 4
  const shouldFade = (index: number) => index !== 4

  return (
    <div style={{ padding: '40px', display: 'flex', gap: '20px', justifyContent: 'center', height: '800px' }}>
      <div style={{ display: 'flex', gap: '20px', overflow: 'hidden', borderRadius: '12px' }}>
      {/* Column 1 - Slides Down */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'slideDownOnce 1.5s ease-out forwards', zIndex: 1 }}>
        {frontImages.slice(0, 3).map((img, i) => (
          <div
            key={i}
            style={{
              width: '300px',
              height: '240px',
              perspective: '1000px',
              flexShrink: 0
            }}
          >
            <div style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              transformStyle: 'preserve-3d',
              animation: shouldFlip(i)
                ? 'flipCard 0.8s ease-in-out 2s forwards, fadeOut 0.5s ease-in-out 3s forwards'
                : 'fadeOut 0.5s ease-in-out 3s forwards'
            }}>
              {/* Front */}
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                borderRadius: '12px',
                overflow: 'hidden'
              }}>
                <Image src={img} alt={`Front ${i}`} fill style={{ objectFit: 'cover' }} />
              </div>
              {/* Back */}
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                borderRadius: '12px',
                overflow: 'hidden'
              }}>
                <Image src={backImages[i]} alt={`Back ${i}`} fill style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Column 2 - Slides Up */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'slideUpOnce 1.5s ease-out forwards', zIndex: 2, position: 'relative' }}>
        {frontImages.slice(3, 6).map((img, i) => {
          const actualIndex = i + 3
          return (
            <div
              key={i}
              style={{
                width: '300px',
                height: '240px',
                perspective: '1000px',
                flexShrink: 0,
                zIndex: actualIndex === 5 ? 1 : 'auto'
              }}
            >
              <div style={{
                width: '100%',
                height: '100%',
                position: actualIndex === 4 ? 'absolute' : 'relative',
                transformStyle: 'preserve-3d',
                animation: shouldFlip(actualIndex)
                  ? 'flipCard 0.8s ease-in-out 2s forwards, fadeOut 0.5s ease-in-out 3s forwards'
                  : actualIndex === 4
                    ? 'expandCenter 1s ease-in-out 3s forwards'
                    : 'fadeOut 0.5s ease-in-out 3s forwards',
                zIndex: actualIndex === 4 ? 5 : actualIndex === 8 ? 1 : 'auto'
              }}>
                {/* Front */}
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}>
                  <Image src={img} alt={`Front ${actualIndex}`} fill style={{ objectFit: 'cover' }} />
                </div>
                {/* Back */}
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}>
                  <Image src={backImages[actualIndex]} alt={`Back ${actualIndex}`} fill style={{ objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Column 3 - Slides Down */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'slideDownOnce 1.5s ease-out forwards', zIndex: 1 }}>
        {frontImages.slice(6, 9).map((img, i) => {
          const actualIndex = i + 6
          return (
            <div
              key={i}
              style={{
                width: '300px',
                height: '240px',
                perspective: '1000px',
                flexShrink: 0,
                zIndex: actualIndex === 8 ? 1 : 'auto'
              }}
            >
              <div style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                transformStyle: 'preserve-3d',
                animation: shouldFlip(actualIndex)
                  ? 'flipCard 0.8s ease-in-out 2s forwards, fadeOut 0.5s ease-in-out 3s forwards'
                  : 'fadeOut 0.5s ease-in-out 3s forwards'
              }}>
                {/* Front */}
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}>
                  <Image src={img} alt={`Front ${actualIndex}`} fill style={{ objectFit: 'cover' }} />
                </div>
                {/* Back */}
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}>
                  <Image src={backImages[actualIndex]} alt={`Back ${actualIndex}`} fill style={{ objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          )
        })}
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

        @keyframes flipCard {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(180deg);
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
      `}</style>
    </div>
  )
}
