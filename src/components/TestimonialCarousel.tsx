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

  // Mobile scroll-based carousel
  const [scrollProgress, setScrollProgress] = useState(0)
  const mobileSectionRef = useRef<HTMLDivElement>(null)

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

  // Mobile scroll-based fade effect
  useEffect(() => {
    const handleScroll = () => {
      if (!mobileSectionRef.current) return

      const sectionTop = mobileSectionRef.current.offsetTop
      const sectionHeight = mobileSectionRef.current.offsetHeight
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight

      // Calculate progress through the section (0 to 1)
      const scrollStart = sectionTop - viewportHeight / 2
      const scrollEnd = sectionTop + sectionHeight - viewportHeight / 2
      const progress = Math.max(0, Math.min(1, (scrollY - scrollStart) / (scrollEnd - scrollStart)))

      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Mobile Carousel with Scroll-based Fade */}
      <div
        ref={mobileSectionRef}
        className="md:hidden"
        style={{
          height: '300vh',
          position: 'relative',
          backgroundColor: '#ffffff'
        }}
      >
        <div style={{
          position: 'sticky',
          top: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'flex-start',
          padding: '40px 32px'
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative', width: '100%' }}>
            {/* First Testimonial (Rachel) - Fades out as scroll progresses */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              opacity: scrollProgress < 0.3 ? 1 : scrollProgress > 0.7 ? 0 : 1 - ((scrollProgress - 0.3) / 0.4),
              transition: 'opacity 0.3s ease-out',
              pointerEvents: scrollProgress > 0.5 ? 'none' : 'auto'
            }}>
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '5/4',
                marginBottom: '48px'
              }}>
                <Image
                  src={first.imagePath}
                  alt={first.imageAlt}
                  fill
                  className="object-cover"
                  style={{ borderRadius: '8px' }}
                />
              </div>
              <div style={{ marginBottom: '40px' }}>
                <p style={{
                  fontFamily: '"Hanken Grotesk", sans-serif',
                  fontSize: '32px',
                  color: '#1C1C1C',
                  fontWeight: 300,
                  lineHeight: '1.5',
                  marginBottom: '24px'
                }}>
                  {first.text}
                </p>
                <p style={{
                  fontFamily: '"Majesti Banner", serif',
                  fontSize: '16px',
                  color: '#4A4A4A',
                  fontWeight: 400,
                  marginBottom: '8px',
                  textTransform: 'uppercase'
                }}>
                  - {first.author}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ color: '#000', fontSize: '18px' }}>★★★★★</div>
                  <p style={{
                    fontFamily: '"Hanken Grotesk", sans-serif',
                    fontSize: '14px',
                    color: '#4A4A4A',
                    fontWeight: 400
                  }}>
                    Google review
                  </p>
                </div>
              </div>
            </div>

            {/* Second Testimonial (Aleta) - Fades in as scroll progresses */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              opacity: scrollProgress < 0.3 ? 0 : scrollProgress > 0.7 ? 1 : (scrollProgress - 0.3) / 0.4,
              transition: 'opacity 0.3s ease-out',
              pointerEvents: scrollProgress < 0.5 ? 'none' : 'auto'
            }}>
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '5/4',
                marginBottom: '48px'
              }}>
                <Image
                  src={second.imagePath}
                  alt={second.imageAlt}
                  fill
                  className="object-cover"
                  style={{ borderRadius: '8px' }}
                />
              </div>
              <div style={{ marginBottom: '40px' }}>
                <p style={{
                  fontFamily: '"Hanken Grotesk", sans-serif',
                  fontSize: '32px',
                  color: '#1C1C1C',
                  fontWeight: 300,
                  lineHeight: '1.5',
                  marginBottom: '24px'
                }}>
                  {second.text}
                </p>
                <p style={{
                  fontFamily: '"Majesti Banner", serif',
                  fontSize: '16px',
                  color: '#4A4A4A',
                  fontWeight: 400,
                  marginBottom: '8px',
                  textTransform: 'uppercase'
                }}>
                  - {second.author}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ color: '#000', fontSize: '18px' }}>★★★★★</div>
                  <p style={{
                    fontFamily: '"Hanken Grotesk", sans-serif',
                    fontSize: '14px',
                    color: '#4A4A4A',
                    fontWeight: 400
                  }}>
                    Google review
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Animation */}
      <div className="hidden md:block" style={{ height: '300vh', position: 'relative', backgroundColor: '#ffffff' }}>
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
        {/* Rachel's Photo - fades in center, slides left, then fades out */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            width: '500px',
            aspectRatio: '5/4',
            maxWidth: '100%',
            transform: `translateX(${hasSlid ? 'calc(-50% - 300px)' : '-50%'})`,
            opacity: fadeOut ? 0 : (isVisible ? 1 : 0),
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

        {/* Rachel's Testimonial Text - slides in from right, then fades out */}
        <div
          style={{
            position: 'absolute',
            left: 'calc(50% + 50px)',
            width: '400px',
            maxWidth: '40%',
            transform: showText ? 'translateX(0)' : 'translateX(500px)',
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
              fontFamily: '"Majesti Banner", serif',
              fontSize: '18px',
              color: '#4A4A4A',
              fontWeight: 400,
              marginBottom: '8px',
              textTransform: 'uppercase'
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

        {/* Aleta's Photo - fades in at same position as Rachel's photo (left) */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            width: '500px',
            aspectRatio: '5/4',
            maxWidth: '100%',
            transform: 'translateX(calc(-50% - 300px))',
            opacity: growText ? 0 : (showAleta ? 1 : 0),
            transition: 'opacity 1.5s ease-out'
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
              fontFamily: '"Majesti Banner", serif',
              fontSize: '18px',
              color: '#4A4A4A',
              fontWeight: 400,
              marginBottom: '8px',
              textTransform: 'uppercase'
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
    </>
  )
}
