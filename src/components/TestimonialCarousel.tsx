import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface Testimonial {
  text: string
  author: string
  imagePath: string
  imageAlt: string
}

interface TestimonialCarouselProps {
  testimonials: [Testimonial, Testimonial]
}

export default function TestimonialCarousel({
  testimonials
}: TestimonialCarouselProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasSlid, setHasSlid] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const [first, second] = testimonials

  // Intersection Observer for scroll-triggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      {
        threshold: 0.2
      }
    )

    const currentRef = sectionRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  // Trigger slide after photo has grown
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setHasSlid(true)
      }, 1700) // Wait for grow animation to complete + pause
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  // Trigger text slide after photo has slid
  const [showText, setShowText] = useState(false)
  useEffect(() => {
    if (hasSlid) {
      const timer = setTimeout(() => {
        setShowText(true)
      }, 200) // Small delay after photo slides
      return () => clearTimeout(timer)
    }
  }, [hasSlid])

  // Trigger fade out after text has appeared
  const [fadeOut, setFadeOut] = useState(false)
  useEffect(() => {
    if (showText) {
      const timer = setTimeout(() => {
        setFadeOut(true)
      }, 2000) // Wait for text to settle
      return () => clearTimeout(timer)
    }
  }, [showText])

  // Trigger Aleta's photo after fade out
  const [showAleta, setShowAleta] = useState(false)
  useEffect(() => {
    if (fadeOut) {
      const timer = setTimeout(() => {
        setShowAleta(true)
      }, 500) // Small delay after fade out
      return () => clearTimeout(timer)
    }
  }, [fadeOut])

  // Trigger Aleta's text after photo arrives
  const [showAletaText, setShowAletaText] = useState(false)
  useEffect(() => {
    if (showAleta) {
      const timer = setTimeout(() => {
        setShowAletaText(true)
      }, 1500) // Wait for photo to arrive
      return () => clearTimeout(timer)
    }
  }, [showAleta])

  // Trigger Aleta's photo fade out and text grow
  const [growText, setGrowText] = useState(false)
  useEffect(() => {
    if (showAletaText) {
      const timer = setTimeout(() => {
        setGrowText(true)
      }, 2000) // Wait for text to settle
      return () => clearTimeout(timer)
    }
  }, [showAletaText])

  return (
    <div style={{ height: '300vh', position: 'relative', backgroundColor: '#ffffff' }}>
      <section
        ref={sectionRef}
        style={{
          position: 'sticky',
          top: 0,
          backgroundColor: '#ffffff',
          padding: '80px 20px',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
      <div
        style={{
          maxWidth: '1400px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          position: 'relative',
          gap: '60px'
        }}
      >
        {/* Photo - starts small in center, grows, pauses, then slides to left, then fades out */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            width: '500px',
            aspectRatio: '5/4',
            maxWidth: '100%',
            transform: `translateX(${hasSlid ? 'calc(-50% - 300px)' : '-50%'}) scale(${isVisible ? 1 : 0.5})`,
            opacity: fadeOut ? 0 : 1,
            transition: 'transform 1.5s ease-out, opacity 1s ease-out'
          }}
        >
          <Image
            src={first.imagePath}
            alt={first.imageAlt}
            fill
            className="object-cover"
          />
        </div>

        {/* Testimonial Text - slides in from right, then slides all the way out left while fading */}
        <div
          style={{
            position: 'absolute',
            left: 'calc(50% + 50px)',
            width: '400px',
            maxWidth: '40%',
            transform: fadeOut ? 'translateX(-800px)' : (showText ? 'translateX(0)' : 'translateX(500px)'),
            opacity: fadeOut ? 0 : (showText ? 1 : 0),
            transition: 'transform 1.2s ease-out, opacity 1.2s ease-out'
          }}
        >
          <p
            style={{
              fontFamily: '"Hanken Grotesk", sans-serif',
              fontSize: '32px',
              color: '#1C1C1C',
              fontWeight: 300,
              lineHeight: '1.6',
              marginBottom: '16px'
            }}
          >
            {first.text}
          </p>
          <p
            style={{
              fontFamily: '"Hanken Grotesk", sans-serif',
              fontSize: '18px',
              color: '#4A4A4A',
              fontWeight: 400,
              marginBottom: '8px'
            }}
          >
            - {first.author}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ color: '#000', fontSize: '20px' }}>★★★★★</div>
            <p
              style={{
                fontFamily: '"Hanken Grotesk", sans-serif',
                fontSize: '14px',
                color: '#4A4A4A',
                fontWeight: 400
              }}
            >
              Google review
            </p>
          </div>
        </div>

        {/* Aleta's Photo - slides from right to left where Rachel was, then fades out */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            width: '500px',
            aspectRatio: '5/4',
            maxWidth: '100%',
            transform: showAleta ? 'translateX(calc(-50% - 300px))' : 'translateX(calc(50vw + 50%))',
            opacity: growText ? 0 : (showAleta ? 1 : 0),
            transition: 'transform 1.5s ease-out, opacity 1.5s ease-out'
          }}
        >
          <Image
            src={second.imagePath}
            alt={second.imageAlt}
            fill
            className="object-cover"
          />
        </div>

        {/* Aleta's Testimonial Text - fades in next to photo, then slides to center and grows */}
        <div
          style={{
            position: 'absolute',
            left: growText ? '50%' : 'calc(50% + 50px)',
            width: '400px',
            maxWidth: '40%',
            opacity: showAletaText ? 1 : 0,
            transform: growText ? 'translateX(-50%) scale(1.5)' : 'translateX(0) scale(1)',
            transformOrigin: 'center',
            transition: 'opacity 1.2s ease-out, transform 1.5s ease-out, left 1.5s ease-out'
          }}
        >
          <p
            style={{
              fontFamily: '"Hanken Grotesk", sans-serif',
              fontSize: '32px',
              color: '#1C1C1C',
              fontWeight: 300,
              lineHeight: '1.6',
              marginBottom: '16px'
            }}
          >
            {second.text}
          </p>
          <p
            style={{
              fontFamily: '"Hanken Grotesk", sans-serif',
              fontSize: '18px',
              color: '#4A4A4A',
              fontWeight: 400,
              marginBottom: '8px'
            }}
          >
            - {second.author}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: growText ? 0 : 1, transition: 'opacity 0.5s ease-out' }}>
            <div style={{ color: '#000', fontSize: '20px' }}>★★★★★</div>
            <p
              style={{
                fontFamily: '"Hanken Grotesk", sans-serif',
                fontSize: '14px',
                color: '#4A4A4A',
                fontWeight: 400
              }}
            >
              Google review
            </p>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}
