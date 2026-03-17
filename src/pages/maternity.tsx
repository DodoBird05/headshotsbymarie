import Head from 'next/head'
import Link from 'next/link'
import StickyNavigation from '@/components/StickyNavigation'
import Footer from '@/components/Footer'
import MobileBottomNav from '@/components/MobileBottomNav'
import { getMobileSrc } from '@/lib/responsiveImage'

const galleryItems = [
  {
    image: '/images/Maternity/maternity-chair-white.webp',
    alt: 'Maternity portrait of a woman seated confidently on a chair, open white shirt, light backdrop',
    caption: 'The confidence you didn\u2019t know you had.',
  },
  {
    image: '/images/Maternity/maternity-red-dress.webp',
    alt: 'Maternity portrait in a flowing red dress against a dark background, profile view',
    caption: 'She knew exactly who she was.',
  },
  {
    image: '/images/Maternity/maternity-bw-silhouette.webp',
    alt: 'Black and white maternity silhouette in a lace dress against a dark background',
    caption: 'Timeless enough to hang anywhere.',
  },
  {
    image: '/images/Maternity/maternity-painterly-profile.webp',
    alt: 'Painterly maternity profile portrait wrapped in sage fabric against a warm brown backdrop',
    caption: 'Your grandchildren will know this woman.',
  },
]

const imageRow = [
  { src: '/images/Maternity/maternity-carousel-01.webp', alt: 'Maternity portrait in beige fabric wrap against gray backdrop' },
  { src: '/images/Maternity/maternity-carousel-08.webp', alt: 'Maternity portrait in red dress against dark background, facing camera' },
  { src: '/images/Maternity/maternity-carousel-09.webp', alt: 'Black and white maternity portrait in flowing white gown' },
  { src: '/images/Maternity/maternity-carousel-03.webp', alt: 'Maternity portrait in white shirt, smiling, white backdrop' },
  { src: '/images/Maternity/maternity-carousel-05.webp', alt: 'Black and white maternity profile against dark background' },
]

export default function MaternityPage() {
  return (
    <>
      <Head>
        <title>Maternity Photography | Headshots by Marie</title>
        <meta name="description" content="Maternity photography sessions in Gilbert, AZ. Beautifully lit, powerfully posed, fully seen." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://headshotsbymarie.com/maternity/" />
        <meta property="og:title" content="Maternity Photography | Headshots by Marie" />
        <meta property="og:description" content="Maternity photography sessions in Gilbert, AZ. Beautifully lit, powerfully posed, fully seen." />
        <meta property="og:image" content="https://headshotsbymarie.com/images/Maternity/maternity-hero.webp" />
        <meta property="og:url" content="https://headshotsbymarie.com/maternity/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Headshots by Marie" />
      </Head>

      <StickyNavigation bookLink="/contact" hideFloatingCta />

      {/* Hero */}
      <section
        className="relative flex items-end justify-center"
        style={{ height: '100vh', backgroundColor: '#0a0a0a' }}
      >
        <picture>
          <source media="(max-width: 768px)" srcSet="/images/Maternity/maternity-hero-mobile.webp" />
          <img
            src="/images/Maternity/maternity-hero.webp"
            alt="Black and white maternity silhouette portrait with sheer fabric draped over shoulders"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center',
              opacity: 0.85,
            }}
          />
        </picture>
        <h1
          className="relative z-10 px-8 text-center"
          style={{
            fontFamily: '"Majesti Banner", serif',
            fontSize: 'clamp(1.8rem, 5vw, 3.2rem)',
            fontWeight: 300,
            color: '#F5F0EB',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            lineHeight: 1.3,
            maxWidth: '700px',
            paddingBottom: '8vh',
          }}
        >
          You will never look like this again.
        </h1>
      </section>

      {/* Gallery — first two items */}
      {galleryItems.slice(0, 2).map((item, index) => {
        const imageOnLeft = index % 2 === 0

        return (
          <section key={index} style={{ backgroundColor: '#fff' }}>
            {index > 0 && (
              <div
                className="mx-auto"
                style={{ maxWidth: '80px', height: '1px', backgroundColor: '#d4d0cb' }}
              />
            )}
            <div
              className="mx-auto px-8 py-12 md:py-20"
              style={{ maxWidth: '1200px' }}
            >
              <div
                className={`flex flex-col ${imageOnLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16`}
              >
                <div className="w-full md:w-3/5 flex justify-center">
                  <picture>
                    <source media="(max-width: 768px)" srcSet={getMobileSrc(item.image)} />
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading="lazy"
                      style={{
                        maxHeight: '75vh',
                        width: 'auto',
                        maxWidth: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  </picture>
                </div>
                <div className="w-full md:w-2/5 flex items-center justify-center px-4">
                  <p
                    style={{
                      fontFamily: '"Majesti Banner", serif',
                      fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                      fontWeight: 300,
                      color: '#1C1C1C',
                      lineHeight: 1.5,
                      textAlign: 'center',
                      fontStyle: 'italic',
                    }}
                  >
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* 5-Image Row */}
      <section className="py-8" style={{ backgroundColor: '#1C1C1C' }}>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-0">
          {imageRow.map((image, index) => (
            <div
              key={index}
              className={`relative aspect-square lg:aspect-[4/5] overflow-hidden ${index === 2 ? 'hidden lg:block' : ''}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={`absolute inset-0 w-full h-full object-cover ${index === 1 || index === 3 ? 'object-bottom' : 'object-top'}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Gallery — last two items */}
      {galleryItems.slice(2).map((item, index) => {
        const imageOnLeft = index % 2 === 0

        return (
          <section key={index + 2} style={{ backgroundColor: '#fff' }}>
            <div
              className="mx-auto px-8 py-12 md:py-20"
              style={{ maxWidth: '1200px' }}
            >
              <div
                className={`flex flex-col ${imageOnLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16`}
              >
                <div className="w-full md:w-3/5 flex justify-center">
                  <picture>
                    <source media="(max-width: 768px)" srcSet={getMobileSrc(item.image)} />
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading="lazy"
                      style={{
                        maxHeight: '75vh',
                        width: 'auto',
                        maxWidth: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  </picture>
                </div>
                <div className="w-full md:w-2/5 flex items-center justify-center px-4">
                  <p
                    style={{
                      fontFamily: '"Majesti Banner", serif',
                      fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                      fontWeight: 300,
                      color: '#1C1C1C',
                      lineHeight: 1.5,
                      textAlign: 'center',
                      fontStyle: 'italic',
                    }}
                  >
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* Your Session — photo left, text right */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#1C1C1C' }}>
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Photo */}
            <div className="flex justify-center items-center h-full order-1 lg:order-1">
              <img
                src="/images/Maternity/maternity-carousel-01.webp"
                alt="Maternity portrait in beige fabric wrap against gray backdrop"
                className="object-contain max-h-full"
                style={{ maxHeight: '70vh' }}
                loading="lazy"
              />
            </div>
            {/* Text */}
            <div className="space-y-6 flex flex-col justify-center order-2 lg:order-2">
              <h2
                className="text-3xl font-light"
                style={{
                  fontFamily: '"Majesti Banner", serif',
                  color: '#F5F0EB',
                  fontWeight: 300,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Your Session
              </h2>
              <p
                className="text-lg"
                style={{
                  fontFamily: '"Hanken Grotesk", sans-serif',
                  color: '#d4d0cb',
                  fontWeight: 300,
                  lineHeight: 1.8,
                }}
              >
                Before specializing in corporate portraits, Marie spent years photographing women the way great magazines do: beautifully lit, powerfully posed, fully seen. Maternity photography is the work she has missed most, and it shows in every image.
              </p>
              <p
                className="text-lg"
                style={{
                  fontFamily: '"Hanken Grotesk", sans-serif',
                  color: '#d4d0cb',
                  fontWeight: 300,
                  lineHeight: 1.8,
                }}
              >
                Your session is a celebration. From the moment you walk in, you will be guided by someone who has done this many times and genuinely loves it. There is no rushing, no list of poses to memorize, no stress. Just you, at one of the most remarkable moments of your life, in a studio built to make you look extraordinary.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pull-quote — when to book */}
      <section className="py-16" style={{ backgroundColor: '#1C1C1C' }}>
        <div className="max-w-6xl mx-auto px-8">
          <blockquote
            className="text-xl md:text-2xl lg:text-3xl mb-12 max-w-4xl pl-6"
            style={{
              fontFamily: '"Majesti Banner", serif',
              color: '#F5F0EB',
              fontWeight: 300,
              lineHeight: 1.3,
              borderLeft: '3px solid #D4A843',
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
            }}
          >
            The best time to book is around your seventh month, when your belly is beautifully round and you are still comfortable moving and posing.
          </blockquote>
          <div className="grid grid-cols-1 lg:grid-cols-[55%_40%] gap-8 items-start">
            <div>
              <img
                src="/images/Maternity/maternity-carousel-10.webp"
                alt="Black and white maternity couple portrait, smiling"
                className="w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="space-y-6">
              <p
                className="text-base lg:text-lg"
                style={{
                  fontFamily: '"Hanken Grotesk", sans-serif',
                  color: '#d4d0cb',
                  fontWeight: 300,
                  lineHeight: 1.7,
                }}
              >
                If your partner would like to join for a few frames, they are more than welcome.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What to Bring */}
      <section style={{ backgroundColor: '#fff', padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <h2
            className="text-center"
            style={{
              fontFamily: '"Majesti Banner", serif',
              fontSize: 'clamp(1.6rem, 4vw, 2.5rem)',
              fontWeight: 300,
              color: '#1C1C1C',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '3rem',
            }}
          >
            What to Bring
          </h2>

          {/* Your clothes */}
          <h3
            style={{
              fontFamily: '"Majesti Banner", serif',
              fontSize: '1.5rem',
              fontWeight: 300,
              color: '#1C1C1C',
              marginBottom: '1.25rem',
            }}
          >
            Your clothes
          </h3>
          <p
            style={{
              fontFamily: '"Hanken Grotesk", sans-serif',
              fontSize: '1.125rem',
              fontWeight: 300,
              color: '#1C1C1C',
              lineHeight: 1.8,
              marginBottom: '1.5rem',
            }}
          >
            Bring a pair of jeans from before your pregnancy. Not maternity jeans: your regular ones. Leave them unbuttoned and let them sit below your bump. It photographs beautifully. Pair them with a white button-up shirt, also from before. The fit matters more than the size.
          </p>
          <p
            style={{
              fontFamily: '"Hanken Grotesk", sans-serif',
              fontSize: '1.125rem',
              fontWeight: 300,
              color: '#1C1C1C',
              lineHeight: 1.8,
              marginBottom: '1.5rem',
            }}
          >
            Marie has a white gown and a black lace dress available at the studio, so you already have two complete looks waiting for you.
          </p>
          <p
            style={{
              fontFamily: '"Hanken Grotesk", sans-serif',
              fontSize: '1.125rem',
              fontWeight: 300,
              color: '#1C1C1C',
              lineHeight: 1.8,
              marginBottom: '2.5rem',
            }}
          >
            If your partner is joining for a few frames, ask them to wear something simple and solid in a neutral tone, at the same level of formality as your outfit.
          </p>

          {/* Your underwear */}
          <h3
            style={{
              fontFamily: '"Majesti Banner", serif',
              fontSize: '1.5rem',
              fontWeight: 300,
              color: '#1C1C1C',
              marginBottom: '1.25rem',
            }}
          >
            Your underwear
          </h3>
          <p
            style={{
              fontFamily: '"Hanken Grotesk", sans-serif',
              fontSize: '1.125rem',
              fontWeight: 300,
              color: '#1C1C1C',
              lineHeight: 1.8,
              marginBottom: '1.5rem',
            }}
          >
            Bring four options: a white set, a black set, a nude set, and a sports bra. Each works differently depending on the look, the light, and how much of the belly we want to feature. Having all four means we can choose in the moment rather than work around what you brought.
          </p>
          <p
            style={{
              fontFamily: '"Hanken Grotesk", sans-serif',
              fontSize: '1.125rem',
              fontWeight: 300,
              color: '#1C1C1C',
              lineHeight: 1.8,
            }}
          >
            Avoid anything with tight elastic that leaves marks on your skin. Give yourself a little time before your session to change out of your everyday bra.
          </p>
        </div>
      </section>

      {/* Closing */}
      <section style={{ backgroundColor: '#f8f6f3', padding: '6rem 2rem' }}>
        <div className="text-center" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <p
            style={{
              fontFamily: '"Majesti Banner", serif',
              fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
              fontWeight: 300,
              color: '#1C1C1C',
              lineHeight: 1.4,
              marginBottom: '2.5rem',
            }}
          >
            You deserve images you will keep forever.
          </p>
          <Link
            href="/contact"
            style={{
              display: 'inline-block',
              fontFamily: '"Hanken Grotesk", sans-serif',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: '#1C1C1C',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              padding: '1rem 2.5rem',
              border: '1px solid #1C1C1C',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1C1C1C'
              e.currentTarget.style.color = '#F5F0EB'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#1C1C1C'
            }}
          >
            Book Your Session
          </Link>
        </div>
      </section>

      <Footer />
      <MobileBottomNav />
    </>
  )
}
