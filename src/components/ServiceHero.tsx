import { useRef } from 'react'
import Head from 'next/head'
import { getMobileSrc } from '@/lib/responsiveImage'
import { usePhotoViewTracking, useSectionViewTracking } from '@/lib/analytics'

interface ServiceHeroProps {
  heroImage: string
  heroImageAlt: string
  pageTitle: string
  subtitle?: string
  textColor?: 'light' | 'dark'
  textAlign?: 'center' | 'left'
}

export default function ServiceHero({
  heroImage,
  heroImageAlt,
  pageTitle,
  subtitle,
  textColor = 'light',
  textAlign = 'center'
}: ServiceHeroProps) {
  const color = textColor === 'light' ? '#ffffff' : '#1C1C1C'
  const heroRef = useRef<HTMLElement>(null)
  usePhotoViewTracking(heroRef, heroImage, heroImageAlt, 'service_hero')
  useSectionViewTracking(heroRef, 'hero', 0)

  return (
    <>
      <Head>
        {/* Two media-split preloads matching the <picture> selection below.
            (The old single preload used a malformed srcset — a 768w entry
            mixed with a descriptor-less one — so browsers could preload a
            different file than the one rendered: a wasted LCP download.) */}
        <link
          rel="preload"
          href={getMobileSrc(heroImage)}
          as="image"
          type="image/webp"
          media="(max-width: 768px)"
        />
        <link
          rel="preload"
          href={heroImage}
          as="image"
          type="image/webp"
          media="(min-width: 769px)"
        />
      </Head>
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
        {/* Hero Image */}
      <div className="absolute inset-0 w-full h-full">
        <picture>
          <source media="(max-width: 768px)" srcSet={getMobileSrc(heroImage)} />
          <img
            src={heroImage}
            alt={heroImageAlt}
            width={1400}
            height={900}
            className="absolute inset-0 w-full h-full object-cover"
            fetchPriority="high"
          />
        </picture>
      </div>

      {/* H1 at bottom */}
      <h1
        className={`absolute bottom-[15vh] left-0 right-0 text-2xl md:text-4xl z-10 ${textAlign === 'left' ? 'text-left px-8 md:px-16' : 'text-center'}`}
        style={{
          fontFamily: '"Romie", serif',
          fontWeight: 400,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color,
          lineHeight: 1.1
        }}
      >
        {pageTitle}
        {subtitle && (
          <>
            <br />
            <span
              className="text-lg md:text-2xl"
              style={{
                fontFamily: '"Romie", serif',
                fontWeight: 400,
                letterSpacing: '0.1em'
              }}
            >
              {subtitle}
            </span>
          </>
        )}
      </h1>
      </section>
    </>
  )
}
