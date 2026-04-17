import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { motion, useAnimationControls, useMotionValue, animate } from 'framer-motion'
import { Linkedin, Instagram } from 'lucide-react'
import { trackNavClick, trackExternalLink, trackContactAction, useSectionViewTracking } from '@/lib/analytics'

export default function Footer() {
  const [showCopied, setShowCopied] = useState(false)
  const [hoveredElement, setHoveredElement] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeServiceIdx, setActiveServiceIdx] = useState(0)
  const [pathIdxs, setPathIdxs] = useState<Set<number>>(new Set([0]))
  const servicesListRef = useRef<HTMLUListElement>(null)
  const serviceItemRefs = useRef<(HTMLLIElement | null)[]>([])
  const footerRef = useRef<HTMLElement>(null)
  useSectionViewTracking(footerRef, 'footer', 92)
  const prevServiceIdxRef = useRef(0)
  const markerTop = useMotionValue(0)
  const markerRotate = useMotionValue(0)

  const getItemTop = (idx: number): number | null => {
    const item = serviceItemRefs.current[idx]
    const list = servicesListRef.current
    if (!item || !list) return null
    const itemRect = item.getBoundingClientRect()
    const listRect = list.getBoundingClientRect()
    return itemRect.top - listRect.top + itemRect.height / 2
  }

  // Initial placement (no animation) once refs are set
  useEffect(() => {
    const top = getItemTop(0)
    if (top !== null) {
      markerTop.set(top)
      markerRotate.set(0)
    }
    const handleResize = () => {
      const t = getItemTop(activeServiceIdx)
      if (t !== null) markerTop.set(t)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Animate on active index change
  useEffect(() => {
    const prevIdx = prevServiceIdxRef.current
    if (prevIdx === activeServiceIdx) return
    const targetTop = getItemTop(activeServiceIdx)
    if (targetTop === null) return

    // Respect prefers-reduced-motion — skip the choreography, just snap
    const reduceMotion = typeof window !== 'undefined'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      markerTop.set(targetTop)
      markerRotate.set(0)
      setPathIdxs(new Set([activeServiceIdx]))
      prevServiceIdxRef.current = activeServiceIdx
      return
    }

    const distance = Math.abs(activeServiceIdx - prevIdx)
    const direction: 'down' | 'up' = activeServiceIdx > prevIdx ? 'down' : 'up'

    // Keep angular velocity constant — rotation and duration both scale with distance
    const rotationPerLine = 40
    const durationPerLine = 0.6
    const totalRotation = distance * rotationPerLine
    const endRotation = direction === 'down' ? -20 + totalRotation : -20 - totalRotation
    const moveDuration = Math.min(distance * durationPerLine, 2.5)

    // Build ordered travel path (line-by-line in travel direction)
    const step = direction === 'down' ? 1 : -1
    const steps: number[] = []
    let cursor = prevIdx
    while (cursor !== activeServiceIdx) {
      cursor += step
      steps.push(cursor)
    }

    // Precompute target Y for each line in the path
    const lineTargets = steps.map(lineIdx => ({
      idx: lineIdx,
      y: getItemTop(lineIdx),
      triggered: false
    }))

    const run = async () => {
      // Phase 1: wind up (rotate CCW to -20°, no move)
      await animate(markerRotate, -20, { duration: 0.28, ease: 'easeOut' })

      // Phase 2 starts — M leaves prev, prev unshifts
      setPathIdxs(new Set())

      // Animate rotate alongside top
      animate(markerRotate, endRotation, { duration: moveDuration, ease: 'linear' })

      // Animate top + trigger line shifts as M physically approaches each line
      await animate(markerTop, targetTop, {
        duration: moveDuration,
        ease: 'linear',
        onUpdate: (latest) => {
          lineTargets.forEach(target => {
            if (target.triggered || target.y === null) return
            // Shift this line when M is still a bit away (anticipation)
            const anticipation = 90 // px lookahead — enough for padding transition to complete
            const crossed = direction === 'down'
              ? latest >= target.y - anticipation
              : latest <= target.y + anticipation
            if (crossed) {
              target.triggered = true
              setPathIdxs(new Set([target.idx]))
            }
          })
        }
      })

      // Phase 3: settle rotation to 0°; destination remains shifted
      setPathIdxs(new Set([activeServiceIdx]))
      await animate(markerRotate, 0, { duration: 0.35, ease: 'easeOut' })
    }
    run()
    prevServiceIdxRef.current = activeServiceIdx
  }, [activeServiceIdx, markerTop, markerRotate])

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('marie@headshotsbymarie.com')
      setShowCopied(true)
      trackContactAction('copy_email', 'clipboard')
      setTimeout(() => setShowCopied(false), 2000) // Hide message after 2 seconds
    } catch (err) {
      console.error('Failed to copy email: ', err)
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>, elementId: string) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setHoveredElement(elementId)
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  const handleMouseLeave = () => {
    setHoveredElement(null)
  }

  return (
    <footer ref={footerRef}>
      {/* Dark band — 3-column editorial layout */}
      <div className="py-16 md:py-20 px-8" style={{ backgroundColor: '#1C1C1C' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1.2fr] gap-12 md:gap-12 items-start">
          {/* Column 1: Services — Majesti Banner serif, larger type */}
          <div className="relative" onMouseLeave={() => setActiveServiceIdx(0)}>
            {/* M monogram marker — follows hovered service */}
            <motion.div
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: 0,
                top: markerTop,
                rotate: markerRotate,
                width: '1.6rem',
                height: '1.6rem',
                color: '#DFBC49',
                pointerEvents: 'none',
                y: '-50%',
                transformOrigin: 'center center'
              }}
            >
              <svg viewBox="0 0 409.4437 309.9768" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <path d="M67.6374,32.7011l-16.125,236.0644c-2.3528,35.4473,8.5102,38.9335,48.8261,38.9335v2.2778H0v-2.2778c32.2499-.4511,40.2857-9.8246,42.5511-43.4107L59.1272,45.2442C60.9181,21.5045,50.617,4.2574,21.9488,2.4665V0h76.1476l102.5805,261.595L293.4006,0h82.8635v1.9847c-31.7988,0-38.0704,19.0687-36.2795,40.5732l18.8147,223.5212c1.895,43.8977,25.5648,41.0413,50.6443,41.9368v1.9609h-137.0964v-2.5947c30.459-2.2352,43.3441,2.5947,43.0022-39.9631L295.7313,8.6188l-106.3656,301.2976-2.9031.1207L67.6374,32.7011Z" fill="currentColor" />
              </svg>
            </motion.div>
            <ul ref={servicesListRef} className="space-y-2">
              {[
                { name: 'Home', href: '/' },
                { name: 'Executive', href: '/executive-headshots/' },
                { name: 'Corporate', href: '/corporate-headshots/' },
                { name: 'LinkedIn', href: '/linkedin-headshots/' },
                { name: 'Actors', href: '/phoenix-actor-headshots/' },
                { name: 'Personal Branding', href: '/personal-branding/' },
                { name: 'Teams', href: '/team-photography/' }
              ].map((service, idx) => (
                <li
                  key={service.name}
                  ref={el => { serviceItemRefs.current[idx] = el }}
                  onMouseEnter={() => setActiveServiceIdx(idx)}
                >
                  <Link
                    href={service.href}
                    style={{
                      fontFamily: '"Majesti Banner", serif',
                      fontSize: 'clamp(1.4rem, 2vw, 1.8rem)',
                      fontWeight: 300,
                      lineHeight: 1.2,
                      letterSpacing: '0.02em',
                      textTransform: 'uppercase',
                      color: activeServiceIdx === idx ? '#DFBC49' : '#F5F0EB',
                      textDecoration: 'none',
                      display: 'inline-block',
                      paddingLeft: pathIdxs.has(idx) ? '2rem' : '0',
                      transition: 'color 0.2s ease, padding-left 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                  >
                    • {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Serving Phoenix Metro — Hanken Grotesk */}
          <div>
            <h3
              className="mb-6"
              style={{
                fontFamily: '"Hanken Grotesk", sans-serif',
                fontSize: '0.75rem',
                fontWeight: 400,
                color: '#DFBC49',
                textTransform: 'uppercase',
                letterSpacing: '0.2em'
              }}
            >
              Serving Phoenix Metro
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Gilbert', href: '/gilbert-headshot-photographer/' },
                { name: 'Phoenix', href: '/phoenix-headshot-photographer/' },
                { name: 'Scottsdale', href: '/scottsdale-headshots/' },
                { name: 'Chandler', href: '/chandler-headshots/' },
                { name: 'Mesa', href: '/mesa-headshots/' },
                { name: 'Tempe', href: '/tempe-headshots/' }
              ].map((city) => (
                <li key={city.name}>
                  <Link
                    href={city.href}
                    style={{
                      fontFamily: '"Hanken Grotesk", sans-serif',
                      fontSize: '0.9rem',
                      fontWeight: 300,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#F5F0EB',
                      textDecoration: 'none',
                      display: 'inline-block',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#DFBC49' }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#F5F0EB' }}
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Two photos */}
          <div className="grid grid-cols-2 gap-4">
            <Link href="/bio/" className="footer-photo-link">
              <div style={{ aspectRatio: '3/4', overflow: 'hidden' }}>
                <img
                  src="/images/BTS/Marie-Feutrier-Headshots-by-Marie-Photographer-Behind-the-Scenes.webp"
                  alt="Marie Feutrier behind the scenes at her Gilbert studio"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
              </div>
              <div
                className="mt-3"
                style={{
                  fontFamily: '"Hanken Grotesk", sans-serif',
                  fontSize: '0.7rem',
                  fontWeight: 400,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#F5F0EB'
                }}
              >
                About Marie
              </div>
            </Link>
            <Link href="/pricing/" className="footer-photo-link">
              <div style={{ aspectRatio: '3/4', overflow: 'hidden' }}>
                <picture>
                  <source media="(max-width: 768px)" srcSet="/images/BTS/Broncolor-Light-Studio-By-Marie-Feutrier-mobile.webp" />
                  <img
                    src="/images/BTS/Broncolor-Light-Studio-By-Marie-Feutrier.webp"
                    alt="Broncolor studio light — behind the scenes at Headshots by Marie"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                </picture>
              </div>
              <div
                className="mt-3"
                style={{
                  fontFamily: '"Hanken Grotesk", sans-serif',
                  fontSize: '0.7rem',
                  fontWeight: 400,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#F5F0EB'
                }}
              >
                The Experience
              </div>
            </Link>
          </div>
        </div>
        <style jsx>{`
          .footer-serif-link {
            transition: color 0.2s ease;
          }
          .footer-serif-link:hover {
            color: #DFBC49 !important;
          }
          .footer-sans-link {
            transition: color 0.2s ease;
          }
          .footer-sans-link:hover {
            color: #DFBC49 !important;
          }
          .footer-photo-link {
            display: block;
            text-decoration: none;
            transition: opacity 0.2s ease;
          }
          .footer-photo-link:hover {
            opacity: 0.85;
          }
        `}</style>
      </div>

      {/* White footer section */}
      <div className="w-full py-12 px-8" style={{ backgroundColor: '#f8f8f8', color: '#1C1C1C' }}>
        <style jsx>{`
          .footer-link {
            color: #1C1C1C;
            display: inline-block;
            transition: all 0.15s ease;
            position: relative;
          }
          .footer-link.active {
            background: radial-gradient(
              circle at ${mousePosition.x}px ${mousePosition.y}px,
              #ffffff 0%,
              #1C1C1C 50px
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
          }
        `}</style>
        <div className="grid grid-cols-1 md:grid-cols-10 gap-8 md:gap-4">
          {/* Column 1 - Menu (30%) */}
          <div className="col-span-1 md:col-span-3">
            <ul
              className="space-y-3"
              style={{ fontSize: '1.15rem', lineHeight: '1.1' }}
            >
              {[
                { text: 'The STUDIO', href: '/the-studio/', id: 'studio' },
                { text: 'About MARIE', href: '/about/', id: 'about' },
                { text: 'BLOG', href: '/news/', id: 'blog' }
              ].map((item, index) => {
                const parts = item.text.split(' ')
                return (
                  <li key={index}>
                    <Link href={item.href} style={{ textDecoration: 'none' }} onClick={() => trackNavClick(item.text, item.href, 'footer')}>
                      <span
                        className={`footer-link ${hoveredElement === item.id ? 'active' : ''}`}
                        onMouseMove={(e) => handleMouseMove(e, item.id)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {parts.map((word, i) => (
                          <span
                            key={i}
                            style={{
                              fontFamily: '"Hanken Grotesk", sans-serif',
                              fontWeight: 400,
                              textTransform: 'uppercase',
                              letterSpacing: '0.1em'
                            }}
                          >
                            {word}{i < parts.length - 1 ? ' ' : ''}
                          </span>
                        ))}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Column 2 - Contact (70%) */}
          <div className="col-span-1 md:col-span-7 gradient-links-contact flex items-start justify-start">
            <div className="space-y-4">
              <div className="space-y-2" style={{ fontFamily: '"Hanken Grotesk", sans-serif', fontSize: '1.15rem', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                <div className="relative">
                  <span
                    onClick={copyEmailToClipboard}
                    className={`cursor-pointer footer-link ${hoveredElement === 'email' ? 'active' : ''}`}
                    onMouseMove={(e) => handleMouseMove(e, 'email')}
                    onMouseLeave={handleMouseLeave}
                  >
                    marie@headshotsbymarie.com
                  </span>
                  {showCopied && (
                    <div className="absolute -top-8 left-0 bg-black text-white px-2 py-1 rounded text-xs">
                      Copied to clipboard
                    </div>
                  )}
                </div>
                <div>
                  <span
                    className={`footer-link ${hoveredElement === 'phone' ? 'active' : ''}`}
                    onMouseMove={(e) => handleMouseMove(e, 'phone')}
                    onMouseLeave={handleMouseLeave}
                  >
                    (480) 524-0741
                  </span>
                </div>

                {/* Social Media Icons */}
                <div className="flex space-x-4 mt-4">
                  <Link href="https://www.linkedin.com/in/marie-feutrier-mh05/" className="hover:opacity-80 transition-opacity" aria-label="Follow Marie on LinkedIn" onClick={() => trackExternalLink('https://www.linkedin.com/in/marie-feutrier-mh05/', 'LinkedIn', 'linkedin')}>
                    <div className="h-8 w-8 md:h-12 md:w-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#DFBC49' }}>
                      <Linkedin className="h-4 w-4 md:h-6 md:w-6" style={{ color: '#1C1C1C' }} aria-hidden="true" />
                    </div>
                  </Link>
                  <Link href="https://www.instagram.com/marie.feutrier/" className="hover:opacity-80 transition-opacity" aria-label="Follow Marie on Instagram" onClick={() => trackExternalLink('https://www.instagram.com/marie.feutrier/', 'Instagram', 'instagram')}>
                    <div className="h-8 w-8 md:h-12 md:w-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#DFBC49' }}>
                      <Instagram className="h-4 w-4 md:h-6 md:w-6" style={{ color: '#1C1C1C' }} aria-hidden="true" />
                    </div>
                  </Link>
                  <Link href="https://www.pinterest.com/mariefeutrier/" className="hover:opacity-80 transition-opacity" aria-label="Follow Marie on Pinterest" onClick={() => trackExternalLink('https://www.pinterest.com/mariefeutrier/', 'Pinterest', 'pinterest')}>
                    <div className="h-8 w-8 md:h-12 md:w-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#DFBC49', color: '#1C1C1C' }} aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 md:h-6 md:w-6">
                        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.001 24c6.624 0 11.999-5.373 11.999-12C24 5.372 18.626.001 12.001.001z"/>
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Large "Headshots by Marie" text */}
        <div className="mt-20 mb-8 w-full overflow-hidden flex justify-center">
          <Link href="/pricing/" style={{ textDecoration: 'none', cursor: 'pointer' }} onClick={() => trackNavClick('Headshots by Marie (CTA)', '/pricing', 'footer_cta')}>
            <h2
              className={`uppercase text-center footer-link ${hoveredElement === 'title' ? 'active' : ''}`}
              style={{
                fontFamily: '"Majesti Banner", serif',
                color: '#1C1C1C',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                fontSize: 'clamp(2rem, 9vw, 9vw)',
                lineHeight: '0.85'
              }}
              onMouseMove={(e) => handleMouseMove(e, 'title')}
              onMouseLeave={handleMouseLeave}
            >
              Headshots by Marie
            </h2>
          </Link>
        </div>

        <div className="mt-8 flex justify-between items-center">
          <Link
            href="/legal/"
            className="text-sm hover:underline"
            style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#888' }}
          >
            Privacy & Terms
          </Link>
          <p className="text-sm" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}>
            © 2026 Headshots By Marie. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
