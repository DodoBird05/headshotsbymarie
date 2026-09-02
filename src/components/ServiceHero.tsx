import { useRef } from 'react'
import Head from 'next/head'
import { getMobileSrc } from '@/lib/responsiveImage'
import { usePhotoViewTracking, useSectionViewTracking } from '@/lib/analytics'
import { type } from '@/lib/typography'

interface ServiceHeroProps {
  heroImage: string
  heroImageAlt: string
  pageTitle: string
  subtitle?: string
  textColor?: 'light' | 'dark'
  textAlign?: 'center' | 'left'
  /* Override the OpenType features on the h1. The shared role already carries
     ss03 (swash A) and ss05 (capital ligatures); pass this to add a set for one
     page without changing every other hero. Adding ss06, for instance, turns on
     Romie's lowercase ct / st / sp / ot ligatures. */
  titleFeatures?: string
}

export default function ServiceHero({
  heroImage,
  heroImageAlt,
  pageTitle,
  subtitle,
  textColor = 'light',
  textAlign = 'center',
  titleFeatures
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

      {/* H1 at bottom.
          Set in the homepage hero treatment: Romie italic with the display
          swashes, at the homepage's own clamp scale. The blanket uppercase this
          used to carry is gone — titles are now stored in Title Case in the
          content files and are rendered as authored, the same way the casing
          pass handled the FAQ questions and the footer. */}
      <h1
        className={`absolute bottom-[15vh] left-0 right-0 z-10 ${textAlign === 'left' ? 'text-left px-8 md:px-16' : 'text-center'}`}
        style={{ ...type.h1, color, ...(titleFeatures ? { fontFeatureSettings: titleFeatures } : {}) }}
      >
        {pageTitle}
        {subtitle && (
          <>
            <br />
            <span style={{ ...type.kicker, fontStyle: 'normal', fontFeatureSettings: 'normal' }}>
              {subtitle}
            </span>
          </>
        )}
      </h1>
      </section>
    </>
  )
}
