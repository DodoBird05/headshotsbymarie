import { useCallback, useState } from 'react'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import Image from 'next/image'
import Head from 'next/head'
import Footer from '@/components/Footer'
import MobileBottomNav from '@/components/MobileBottomNav'
import StickyNavigation from '@/components/StickyNavigation'
import Link from 'next/link'
import Section from '@/components/Section'
import AnimatedFAQ from '@/components/AnimatedFAQ'
import ExampleGallery, { GalleryPhoto } from '@/components/ExampleGallery'
import { absoluteImageUrl } from '@/lib/seoConfig'
import { trackButtonClick } from '@/lib/analytics'

// Client portal: the page booked clients get from Marie (Acuity confirmation, email).
// It replaces the old WordPress portal: photo styles, backgrounds, and the two guides.
// Hidden from search (noindex) and left out of the nav, the sitemap and llms.txt.

interface PhotoOption {
  name: string
  description?: string
  imagePath: string
  imageAlt: string
  // More photos shown in a gallery when the card is clicked (optional)
  examples?: GalleryPhoto[]
}

interface Guide {
  title: string
  description: string
  file: string
  buttonText: string
}

interface ClientPortalFrontmatter {
  title: string
  description: string
  ogImage: string
  noindex: boolean
  kicker: string
  heroTitle: string
  introText: string
  stylesTitle: string
  stylesIntro: string
  styles: PhotoOption[]
  backgroundsTitle: string
  backgroundsIntro: string
  backgrounds: PhotoOption[]
  studioTitle: string
  studioIntro: string
  studioLinkText: string
  studioPhotos: (GalleryPhoto & { width: number; height: number })[]
  gettingHereTitle: string
  gettingHereAddress: string
  gettingHereText: string[]
  houseImagePath: string
  houseImageAlt: string
  directionsButtonText: string
  directionsUrl: string
  mapEmbedUrl: string
  mapTitle: string
  faqTitle: string
  faq: { question: string; answer: string }[]
  guidesTitle: string
  guidesIntro: string
  guides: Guide[]
}

const romie = { fontFamily: '"Romie", serif' }
const GOLD = '#D4A843'

function SectionHeading({ title, intro, dark = false }: { title: string; intro: string; dark?: boolean }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      <h2
        className="text-3xl md:text-5xl mb-5 [&_em]:italic"
        style={{ ...romie, fontWeight: 300, color: dark ? '#FFFFFF' : '#1C1C1C' }}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <div className="mx-auto mb-6" style={{ width: '60px', height: '2px', backgroundColor: GOLD }} />
      <p className="text-lg md:text-xl" style={{ ...romie, fontWeight: 300, lineHeight: 1.5, color: dark ? '#E0E0E0' : '#1C1C1C' }}>
        {intro}
      </p>
    </div>
  )
}

// fit="contain" shows the whole collage, centred on the section colour, so nothing is cropped.
function PhotoCard({ option, aspectRatio, dark = false, fit = 'cover', onOpen }: { option: PhotoOption; aspectRatio: string; dark?: boolean; fit?: 'cover' | 'contain'; onOpen: (option: PhotoOption) => void }) {
  const hasExamples = Boolean(option.examples?.length)
  const card = (
    <figure>
      <div className="relative w-full overflow-hidden" style={{ aspectRatio }}>
        <Image
          src={option.imagePath}
          alt={option.imageAlt}
          width={800}
          height={600}
          className={`absolute inset-0 w-full h-full ${fit === 'contain' ? 'object-contain' : 'object-cover object-[50%_25%]'}`}
        />
      </div>
      <figcaption className="mt-4 text-center">
        <span
          className="block text-sm"
          style={{ ...romie, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', color: dark ? '#FFFFFF' : '#1C1C1C' }}
        >
          {option.name}
        </span>
        {option.description && (
          <span className="block mt-2 text-base" style={{ ...romie, fontWeight: 300, lineHeight: 1.5, color: dark ? '#CCCCCC' : '#6B6560' }}>
            {option.description}
          </span>
        )}
        {hasExamples && (
          <span
            className="inline-block mt-3 text-xs underline underline-offset-4 group-hover:text-[#D4A843] transition-colors"
            style={{ ...romie, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', color: dark ? '#FFFFFF' : '#1C1C1C' }}
          >
            See more examples
          </span>
        )}
      </figcaption>
    </figure>
  )
  if (!hasExamples) return card
  return (
    <button type="button" onClick={() => onOpen(option)} className="group block w-full text-left cursor-pointer">
      {card}
    </button>
  )
}

export default function ClientPortalPage({ frontmatter }: { frontmatter: ClientPortalFrontmatter }) {
  const [gallery, setGallery] = useState<PhotoOption | null>(null)
  const openGallery = useCallback((option: PhotoOption) => {
    trackButtonClick(`See more: ${option.name}`, 'client_portal_examples', 'gallery')
    setGallery(option)
  }, [])
  const closeGallery = useCallback(() => setGallery(null), [])

  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
        <meta name="robots" content={frontmatter.noindex ? 'noindex, follow' : 'index, follow'} />
        <link rel="canonical" href="https://headshotsbymarie.com/client-portal/" />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description} />
        <meta property="og:image" content={absoluteImageUrl(frontmatter.ogImage)} />
        <meta property="og:url" content="https://headshotsbymarie.com/client-portal/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Headshots by Marie" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <StickyNavigation bookLink="/pricing" hideFloatingCta />

      {/* Welcome */}
      <Section name="portal_welcome" index={0} as="section" className="bg-[#1C1C1C] px-8 pt-40 pb-24 text-center">
        <p className="text-xs mb-6" style={{ ...romie, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.3em', color: '#AAAAAA' }}>
          {frontmatter.kicker}
        </p>
        <h1
          className="text-5xl md:text-7xl [&_em]:italic"
          style={{ ...romie, fontWeight: 300, color: '#FFFFFF', lineHeight: 1.05 }}
          dangerouslySetInnerHTML={{ __html: frontmatter.heroTitle }}
        />
        <div className="mx-auto my-8" style={{ width: '60px', height: '2px', backgroundColor: GOLD }} />
        <p className="max-w-xl mx-auto text-lg md:text-2xl" style={{ ...romie, fontWeight: 300, color: '#E0E0E0', lineHeight: 1.5 }}>
          {frontmatter.introText}
        </p>
      </Section>

      {/* Photo styles */}
      <Section name="portal_styles" index={1} as="section" className="py-24 px-8" style={{ backgroundColor: '#F5F0EB' }}>
        <SectionHeading title={frontmatter.stylesTitle} intro={frontmatter.stylesIntro} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {frontmatter.styles.map((style) => (
            <PhotoCard key={style.name} option={style} aspectRatio="4 / 5" onOpen={openGallery} />
          ))}
        </div>
      </Section>

      {/* Backgrounds */}
      <Section name="portal_backgrounds" index={2} as="section" className="py-24 px-8 bg-[#1C1C1C]">
        <SectionHeading title={frontmatter.backgroundsTitle} intro={frontmatter.backgroundsIntro} dark />
        {/* Flex rather than grid so a short last row stays centred */}
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
          {frontmatter.backgrounds.map((background) => (
            <div key={background.name} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)]">
              <PhotoCard option={background} aspectRatio="1300 / 795" dark fit="contain" onOpen={openGallery} />
            </div>
          ))}
        </div>
      </Section>

      {/* The studio: photos shown whole (masonry), plus a link to the full Studio page */}
      <Section name="portal_studio" index={3} as="section" className="py-24 px-8 bg-[#1C1C1C]">
        <SectionHeading title={frontmatter.studioTitle} intro={frontmatter.studioIntro} dark />
        {/* One even row on wider screens: each photo's width follows its shape, so all share one height and none is cropped */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-6xl mx-auto">
          {frontmatter.studioPhotos.map((photo) => (
            <div key={photo.imagePath} style={{ flex: `${photo.width / photo.height} 1 0%`, aspectRatio: `${photo.width} / ${photo.height}` }}>
              <Image src={photo.imagePath} alt={photo.imageAlt} width={photo.width} height={photo.height} className="w-full h-full" />
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/the-studio/"
            onClick={() => trackButtonClick(frontmatter.studioLinkText, 'client_portal_studio', '/the-studio/')}
            className="inline-block rounded-full py-3 px-8 border border-white text-white hover:bg-[#D4A843] hover:border-[#D4A843] hover:text-[#1C1C1C] transition-colors duration-300"
            style={{ ...romie, fontWeight: 500, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
          >
            {frontmatter.studioLinkText}
          </Link>
        </div>
      </Section>

      {/* Getting here: address, Marie's French-flag landmark, the dogs note, and a map */}
      <Section name="portal_getting_here" index={4} as="section" className="py-24 px-8" style={{ backgroundColor: '#F5F0EB' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h2
              className="text-3xl md:text-5xl mb-5 [&_em]:italic"
              style={{ ...romie, fontWeight: 300, color: '#1C1C1C' }}
              dangerouslySetInnerHTML={{ __html: frontmatter.gettingHereTitle }}
            />
            <div className="mx-auto md:mx-0 mb-6" style={{ width: '60px', height: '2px', backgroundColor: GOLD }} />
            <p className="text-xl md:text-2xl mb-6" style={{ ...romie, fontWeight: 400, color: '#1C1C1C' }}>
              {frontmatter.gettingHereAddress}
            </p>
            {frontmatter.gettingHereText.map((paragraph) => (
              <p key={paragraph} className="text-lg mb-4" style={{ ...romie, fontWeight: 300, lineHeight: 1.5, color: '#1C1C1C' }}>
                {paragraph}
              </p>
            ))}
            <a
              href={frontmatter.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackButtonClick(frontmatter.directionsButtonText, 'client_portal_getting_here', 'google_maps')}
              className="inline-block mt-4 rounded-full py-3 px-8 bg-[#1C1C1C] text-white hover:bg-[#D4A843] hover:text-[#1C1C1C] transition-colors duration-300"
              style={{ ...romie, fontWeight: 500, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
            >
              {frontmatter.directionsButtonText}
            </a>
          </div>
          <Image
            src={frontmatter.houseImagePath}
            alt={frontmatter.houseImageAlt}
            width={1400}
            height={1050}
            className="w-full h-auto"
          />
        </div>
        <div className="max-w-6xl mx-auto mt-12 w-full h-[320px] md:h-[380px]">
          <iframe
            src={frontmatter.mapEmbedUrl}
            title={frontmatter.mapTitle}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full border-0"
          />
        </div>
      </Section>

      {/* Guides */}
      <Section name="portal_guides" index={5} as="section" className="py-24 px-8" style={{ backgroundColor: '#F5F0EB' }}>
        <SectionHeading title={frontmatter.guidesTitle} intro={frontmatter.guidesIntro} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {frontmatter.guides.map((guide) => (
            <div key={guide.file} className="bg-white px-8 py-10 text-center flex flex-col items-center">
              <h3 className="text-2xl mb-3" style={{ ...romie, fontWeight: 300, color: '#1C1C1C' }}>
                {guide.title}
              </h3>
              <p className="text-base mb-8 flex-1" style={{ ...romie, fontWeight: 400, color: '#6B6560', lineHeight: 1.6 }}>
                {guide.description}
              </p>
              <a
                href={guide.file}
                download
                onClick={() => trackButtonClick(guide.buttonText, 'client_portal_guides', guide.file)}
                className="inline-block rounded-full py-3 px-8 bg-[#1C1C1C] text-white hover:bg-[#D4A843] hover:text-[#1C1C1C] transition-colors duration-300"
                style={{ ...romie, fontWeight: 500, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
              >
                {guide.buttonText}
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ (moved here from /how-to-prepare/) */}
      <Section name="portal_faq" index={6} as="section" className="pt-24">
        <h2
          className="text-center text-3xl md:text-5xl mb-5 px-8"
          style={{ ...romie, fontWeight: 300, color: '#1C1C1C' }}
        >
          {frontmatter.faqTitle}
        </h2>
        <div className="mx-auto mb-4" style={{ width: '60px', height: '2px', backgroundColor: GOLD }} />
        <AnimatedFAQ
          items={frontmatter.faq.map((item, index) => ({ ...item, fromLeft: index % 2 === 0 }))}
          theme="light"
        />
      </Section>

      {gallery?.examples && (
        <ExampleGallery title={gallery.name} photos={gallery.examples} onClose={closeGallery} />
      )}

      <Footer />
      <MobileBottomNav />
    </>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content', 'client-portal.md')
  const { data } = matter(fs.readFileSync(filePath, 'utf8'))
  return { props: { frontmatter: data } }
}
