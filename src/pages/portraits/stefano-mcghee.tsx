import Head from 'next/head'
import { useState } from 'react'
import StickyNavigation from '@/components/StickyNavigation'
import Footer from '@/components/Footer'
import MobileBottomNav from '@/components/MobileBottomNav'
import { getMobileSrc } from '@/lib/responsiveImage'

const SITE_URL = 'https://headshotsbymarie.com'
const PAGE_URL = `${SITE_URL}/portraits/stefano-mcghee/`

const HERO_PATH = '/images/Portraits/stefano-mcghee-6-by-marie-feutrier.jpg'
const HERO_DOWNLOAD_URL = `${SITE_URL}${HERO_PATH}`
const HERO_OG_URL = HERO_DOWNLOAD_URL

const HERO_ALT = 'Stefano McGhee, President-Elect of Toastmasters International, photographed by Marie Feutrier'

const altPhotos = [
  { num: 1, alt: 'Stefano McGhee, full-length portrait on an interior staircase' },
  { num: 2, alt: 'Stefano McGhee against a yellow patterned wall, arms crossed' },
  { num: 3, alt: 'Stefano McGhee portrait with relaxed pose' },
  { num: 4, alt: 'Stefano McGhee portrait, candid expression' },
  { num: 5, alt: 'Stefano McGhee on a curved interior staircase' },
]

const TEXT_SNIPPET = 'Photo by Marie Feutrier — [headshotsbymarie.com](https://headshotsbymarie.com)'

function CopyBlock({ label, code }: { label: string; code: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Older browsers or insecure contexts: select the text and let the user copy manually
    }
  }
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span
          className="text-sm font-medium uppercase tracking-wider"
          style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#555', letterSpacing: '0.06em' }}
        >
          {label}
        </span>
        <button
          onClick={handleCopy}
          className="text-sm px-4 py-1.5 border rounded transition hover:bg-black hover:text-white"
          style={{
            borderColor: '#1C1C1C',
            color: copied ? '#fff' : '#1C1C1C',
            backgroundColor: copied ? '#1C1C1C' : 'transparent',
            fontFamily: '"Hanken Grotesk", sans-serif',
          }}
          aria-label={`Copy ${label.toLowerCase()}`}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre
        className="p-4 rounded text-sm overflow-x-auto"
        style={{
          backgroundColor: '#f5f5f5',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          fontFamily: 'Menlo, Monaco, monospace',
          color: '#1C1C1C',
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  )
}

export default function StefanoMcGheePortrait() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: HERO_DOWNLOAD_URL,
    thumbnailUrl: HERO_OG_URL,
    creator: {
      '@type': 'Person',
      name: 'Marie Feutrier',
      url: SITE_URL,
    },
    creditText: 'Marie Feutrier',
    copyrightNotice: '© Marie Feutrier — Headshots by Marie',
    license: PAGE_URL,
    acquireLicensePage: PAGE_URL,
    name: 'Stefano McGhee, President-Elect of Toastmasters International',
    caption:
      'Stefano McGhee, International President-Elect of Toastmasters International, photographed by Marie Feutrier in Phoenix, AZ.',
    subjectOf: {
      '@type': 'Person',
      name: 'Stefano McGhee',
      jobTitle: 'International President-Elect',
      worksFor: { '@type': 'Organization', name: 'Toastmasters International' },
    },
  }

  return (
    <>
      <Head>
        <title>Stefano McGhee — President-Elect, Toastmasters International | Press Photo</title>
        <meta
          name="description"
          content="Editorial-use portrait of Stefano McGhee, International President-Elect of Toastmasters International. Photo by Marie Feutrier — free for editorial use with credit."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content="Stefano McGhee — President-Elect, Toastmasters International" />
        <meta
          property="og:description"
          content="Editorial-use portrait of Stefano McGhee, International President-Elect of Toastmasters International. Photo by Marie Feutrier."
        />
        <meta property="og:image" content={HERO_OG_URL} />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Headshots by Marie" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Stefano McGhee — President-Elect, Toastmasters International" />
        <meta
          name="twitter:description"
          content="Editorial-use portrait of Stefano McGhee. Photo by Marie Feutrier."
        />
        <meta name="twitter:image" content={HERO_OG_URL} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <StickyNavigation lightBackground />

      <div className="min-h-screen" style={{ backgroundColor: '#fafafa' }}>
        <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
          {/* Hero photo */}
          <div className="mb-10 md:mb-14 rounded overflow-hidden" style={{ backgroundColor: '#1C1C1C' }}>
            <picture>
              <source media="(max-width: 768px)" srcSet={getMobileSrc(HERO_PATH)} />
              <img
                src={HERO_PATH}
                alt={HERO_ALT}
                className="w-full h-auto block"
                style={{ maxHeight: '75vh', objectFit: 'cover', objectPosition: 'center' }}
              />
            </picture>
          </div>

          {/* Title */}
          <h1
            className="text-4xl md:text-6xl mb-3"
            style={{
              fontFamily: '"Majesti Banner", serif',
              fontWeight: 300,
              color: '#1C1C1C',
              letterSpacing: '-0.02em',
            }}
          >
            STEFANO MCGHEE
          </h1>
          <p
            className="text-lg md:text-xl mb-6"
            style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#555' }}
          >
            International President-Elect, Toastmasters International
          </p>
          <p
            className="text-sm uppercase tracking-wider mb-12"
            style={{
              fontFamily: '"Hanken Grotesk", sans-serif',
              color: '#888',
              letterSpacing: '0.08em',
            }}
          >
            Photographed by Marie Feutrier · April 2026 · Phoenix, AZ
          </p>

          {/* About */}
          <section
            className="mb-16"
            style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#333' }}
          >
            <p className="text-base md:text-lg leading-relaxed mb-4">
              Stefano S. McGhee, DTM, is the International President-Elect of Toastmasters
              International and Senior Director of Technology Operations at Harvard Business
              Publishing. He has served Toastmasters for more than 20 years and is a graduate of the
              United States Air Force Academy.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              He sat for this portrait in April 2026 ahead of his appearance on the Speak Arizona
              Podcast, where he discussed leadership, volunteer culture, and the future of
              Toastmasters. The full episode is available at{' '}
              <a
                href="https://speakarizona.com/news/leading-toastmasters-next-chapter-stefano-mcghee/"
                className="underline"
                style={{ color: '#1C1C1C' }}
              >
                speakarizona.com
              </a>
              .
            </p>
          </section>

          {/* Editorial Use */}
          <section className="mb-16">
            <h2
              className="text-3xl md:text-4xl mb-4"
              style={{
                fontFamily: '"Majesti Banner", serif',
                fontWeight: 300,
                color: '#1C1C1C',
                letterSpacing: '-0.02em',
              }}
            >
              Press &amp; Editorial Use
            </h2>
            <p
              className="text-base md:text-lg leading-relaxed mb-8"
              style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#333' }}
            >
              These photographs may be used free of charge for editorial purposes — news articles,
              blog posts, biographical profiles, podcast episode pages, and conference programs —
              provided every use includes credit to <strong>Marie Feutrier</strong> with a link to{' '}
              <a href="https://headshotsbymarie.com" className="underline" style={{ color: '#1C1C1C' }}>
                headshotsbymarie.com
              </a>
              . Commercial use, advertising, or modification beyond standard cropping requires
              written permission.
            </p>

            <CopyBlock label="Markdown credit (with link)" code={TEXT_SNIPPET} />
          </section>

          {/* Additional poses */}
          <section className="mb-16">
            <h2
              className="text-3xl md:text-4xl mb-3"
              style={{
                fontFamily: '"Majesti Banner", serif',
                fontWeight: 300,
                color: '#1C1C1C',
                letterSpacing: '-0.02em',
              }}
            >
              Additional Poses
            </h2>
            <p
              className="text-base mb-8"
              style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#555' }}
            >
              Click any image to download the high-resolution JPG. Same editorial-use license
              applies.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {altPhotos.map((p) => {
                const jpg = `/images/Portraits/stefano-mcghee-${p.num}-by-marie-feutrier.jpg`
                return (
                  <a
                    key={p.num}
                    href={jpg}
                    download
                    className="block rounded overflow-hidden transition hover:opacity-95"
                    style={{ backgroundColor: '#eee', aspectRatio: '4 / 5' }}
                  >
                    <picture>
                      <source media="(max-width: 768px)" srcSet={getMobileSrc(jpg)} />
                      <img
                        src={jpg}
                        alt={p.alt}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </picture>
                  </a>
                )
              })}
            </div>
          </section>

          {/* Photographer credit */}
          <section className="border-t pt-8" style={{ borderColor: '#e5e5e5' }}>
            <p
              className="text-sm leading-relaxed"
              style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#555' }}
            >
              Marie Feutrier is a portrait and headshot photographer based in Gilbert, Arizona. She
              photographs leaders, executives, actors, and creators across the Phoenix metro area.{' '}
              <a href="https://headshotsbymarie.com" className="underline" style={{ color: '#1C1C1C' }}>
                headshotsbymarie.com
              </a>
            </p>
          </section>
        </div>
      </div>

      <Footer />
      <MobileBottomNav />
    </>
  )
}
