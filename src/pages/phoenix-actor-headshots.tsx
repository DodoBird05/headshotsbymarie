import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Footer from '@/components/Footer'
import MobileBottomNav from '@/components/MobileBottomNav'
import StickyNavigation from '@/components/StickyNavigation'
import ServiceHero from '@/components/ServiceHero'
import AnimatedFAQ from '@/components/AnimatedFAQ'
import PhotoGridWithHeading from '@/components/PhotoGridWithHeading'
import { generateServiceSchema, generatePersonSchema, generateAggregateRating, generateBreadcrumbSchema, seoConfig } from '@/lib/seoConfig'
import { getMobileSrc } from '@/lib/responsiveImage'
import { trackButtonClick } from '@/lib/analytics'

const ImageScrollCarousel = dynamic(() => import('@/components/ImageScrollCarousel'), {
  ssr: false,
  loading: () => <div style={{ height: '50vh' }} />
})

interface ContentSection {
  title: string
  paragraphs: string[]
  imagePath: string
  imageAlt: string
}

interface Testimonial {
  quote: string
  author: string
  imagePath: string
  imageAlt: string
}

interface ActorHeadshotsProps {
  frontmatter: {
    title: string
    description: string
    heroTitle: string
    heroSubtitle: string
    heroImage: string
    heroImageAlt: string
    photoGrid: {
      heading: string
      images: {
        src: string
        alt: string
      }[]
    }
    contentSection1: ContentSection
    carouselImages: {
      src: string
      alt: string
      width: number
      height: number
    }[]
    services: {
      title: string
      types: {
        title: string
        description: string
      }[]
      imagePath: string
      imageAlt: string
    }
    contentSection2: ContentSection
    testimonials: Testimonial[]
    faqTitle: string
    faq: {
      question: string
      answer: string
    }[]
  }
  content: string
}

// Warm beige for this page's content sections. Written as a literal Tailwind
// class (not an inline style) because ImageScrollCarousel takes a class name for
// its background, so one value can serve both.
//
// Applied to every page surface here, including the testimonial and FAQ sections
// that previously declared no background at all and simply inherited the white
// body. The testimonial panels run dark instead (see DARK_PANEL), which also
// retires the cool #F5F5F5 that clashed with the warm beige.
const BEIGE_BG = 'bg-[#F1E9DD]'

// The testimonial panels invert against the beige. Text on them has to invert
// with the panel: #F5F0EB for the quote (15:1 contrast) and #B8B3AE for the
// attribution (8.2:1), both comfortably past AA. Leaving the old #1C1C1C quote
// colour here would have made the text invisible.
const DARK_PANEL = '#1C1C1C'

export default function ActorHeadshotsPage({ frontmatter }: ActorHeadshotsProps) {
  const serviceSchema = generateServiceSchema({
    name: 'Actor Headshot Photography',
    description: frontmatter.description,
    url: '/phoenix-actor-headshots/',
    image: frontmatter.heroImage
  })

  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
        <link rel="canonical" href="https://headshotsbymarie.com/phoenix-actor-headshots/" />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description} />
        <meta property="og:image" content={`https://headshotsbymarie.com${frontmatter.heroImage}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://headshotsbymarie.com/phoenix-actor-headshots/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Headshots by Marie" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta name="twitter:description" content={frontmatter.description} />
        <meta name="twitter:image" content={`https://headshotsbymarie.com${frontmatter.heroImage}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              '@id': `${seoConfig.siteUrl}/#business`,
              name: seoConfig.businessName,
              aggregateRating: generateAggregateRating()
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: frontmatter.faq.map(faq => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer.replace(/<[^>]*>/g, '')
                }
              }))
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generatePersonSchema())
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateBreadcrumbSchema([
              { name: 'Actor Headshots', url: '/phoenix-actor-headshots/' }
            ]))
          }}
        />
      </Head>

      {/* Navbar */}
      <StickyNavigation bookLink="/pricing" lightBackground />

      {/* Hero Section */}
      {/* "photographer" not "photography": across 180 days of GSC, actor queries
          containing "photographer" drew 776 impressions against 11 for
          "photography". "actor headshot photographer" alone is 313 impressions at
          position 23.9 — the biggest actor query and the weakest ranking. The
          subtitle carries the commercial/theatrical intent the page actually
          sells, rather than the business-headshot phrasing other pages own.

          The mixed case is deliberate, from Marie's mockup: it is what triggers
          Romie's capital ligatures. "OR" joins into one glyph and the swash A
          comes from ss03, both already enabled on the shared h1 role. Retyping
          this in plain Title Case silently removes the ligatures. Google reads
          the text case-insensitively, so the styling costs nothing in search.

          titleFeatures adds ss06 on top, Romie's lowercase ligature set, which
          joins the "ct" of ActOR. It also joins the "ot" of Photographer, which
          is expected. Scoped to this page rather than the shared h1 role, since
          site-wide it would add that "ot" join to every "Photographer" hero. */}
      <ServiceHero
        heroImage={frontmatter.heroImage}
        heroImageAlt={frontmatter.heroImageAlt}
        pageTitle="ActOR HEADSHOT Photographer"
        titleFeatures={'"ss03", "ss05", "ss06"'}
        subtitle="Commercial & Theatrical Headshots in Phoenix"
        textColor="dark"
      />

      {/* Photo Grid Section */}
      <PhotoGridWithHeading
        heading={frontmatter.photoGrid.heading}
        images={frontmatter.photoGrid.images}
        background={BEIGE_BG}
      />

      {/* Content Section 1: Why Actor Headshots Are Different */}
      <section className={`py-16 ${BEIGE_BG}`}>
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Column */}
            <div className="space-y-6 order-2 lg:order-1">
              <h2
                className="text-3xl md:text-4xl font-light mb-8"
                style={{
                  fontFamily: '"Romie", serif',
                  color: '#1C1C1C',
                  fontWeight: 300
                }}
              >
                {frontmatter.contentSection1.title}
              </h2>
              {frontmatter.contentSection1.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-lg"
                  style={{ fontFamily: '"Romie", serif', color: '#1C1C1C', fontWeight: 300 }}
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
              <div className="mt-8">
                <Link
                  href="/pricing/"
                  className="inline-block border-2 border-black text-black text-lg font-medium hover:bg-black hover:text-white transition-all duration-300 px-8 py-3"
                  style={{ fontFamily: '"Romie", serif' }}
                  onClick={() => trackButtonClick('Book Today', 'service_body_cta', '/pricing')}
                >
                  Book Today
                </Link>
              </div>
            </div>
            {/* Image Column */}
            <div className="flex justify-center order-1 lg:order-2">
              <picture>
                <source media="(max-width: 768px)" srcSet={getMobileSrc(frontmatter.contentSection1.imagePath)} />
                <img
                  src={frontmatter.contentSection1.imagePath}
                  alt={frontmatter.contentSection1.imageAlt}
                  width={500}
                  height={625}
                  className="object-cover"
                  loading="lazy"
                />
              </picture>
            </div>
          </div>
        </div>
      </section>

      {/* Actor Headshots Services Section */}
      <section className={`py-16 ${BEIGE_BG}`}>
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Column - First on mobile, second on desktop */}
            <div className="flex justify-center order-1 lg:order-1">
              <picture>
                <source media="(max-width: 768px)" srcSet={getMobileSrc(frontmatter.services.imagePath)} />
                <img
                  src={frontmatter.services.imagePath}
                  alt={frontmatter.services.imageAlt}
                  width={500}
                  height={600}
                  className="object-cover"
                  loading="lazy"
                />
              </picture>
            </div>
            {/* Text Column - Second on mobile, second on desktop */}
            <div className="space-y-6 order-2 lg:order-2">
              <div>
                <h2
                  className="text-3xl md:text-4xl font-light mb-8"
                  style={{
                    fontFamily: '"Romie", serif',
                    color: '#1C1C1C',
                    fontWeight: 300
                  }}
                >
{frontmatter.services.title}
                </h2>
              </div>
{frontmatter.services.types.map((service, index) => (
                <div key={index} className={index < frontmatter.services.types.length - 1 ? "mb-6" : ""}>
                  <h3
                    className="text-2xl font-light mb-4"
                    style={{ fontFamily: '"Romie", serif', color: '#1C1C1C', fontWeight: 300 }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-lg"
                    style={{ fontFamily: '"Romie", serif', color: '#1C1C1C', fontWeight: 300 }}
                  >
                    {service.description}
                  </p>
                </div>
              ))}
              <div className="mt-8">
                <Link
                  href="/pricing/"
                  className="inline-block border-2 border-black text-black text-lg font-medium hover:bg-black hover:text-white transition-all duration-300 px-8 py-3"
                  style={{ fontFamily: '"Romie", serif' }}
                  onClick={() => trackButtonClick('Book Today', 'service_services_cta', '/pricing')}
                >
                  Book Today
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial 1 */}
      <section className={`pt-24 ${BEIGE_BG}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 md:min-h-[500px]">
          {/* Image Side */}
          <div className="relative aspect-[4/5] md:aspect-auto" style={{ backgroundColor: DARK_PANEL }}>
            <picture>
              <source media="(max-width: 768px)" srcSet={getMobileSrc(frontmatter.testimonials[0].imagePath)} />
              <img
                src={frontmatter.testimonials[0].imagePath}
                alt={frontmatter.testimonials[0].imageAlt}
                className="absolute inset-0 w-full h-full object-cover md:object-contain object-top"
                loading="lazy"
              />
            </picture>
          </div>

          {/* Quote Side */}
          <div
            className="flex items-center justify-center p-8 md:p-12 relative"
            style={{ backgroundColor: DARK_PANEL }}
          >
            <div className="max-w-lg text-center">
              <blockquote
                className="text-2xl md:text-3xl mb-8"
                style={{
                  fontFamily: '"Romie", serif',
                  color: '#F5F0EB',
                  fontWeight: 300,
                  letterSpacing: '0.02em',
                  lineHeight: 1.3
                }}
              >
                &ldquo;{frontmatter.testimonials[0].quote}&rdquo;
              </blockquote>

              <cite
                className="text-sm not-italic"
                style={{
                  fontFamily: '"Romie", serif',
                  color: '#B8B3AE',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}
              >
                — {frontmatter.testimonials[0].author}
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section 2: What to Expect */}
      <section className={`py-16 ${BEIGE_BG}`}>
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Column */}
            <div className="flex justify-center order-1 lg:order-2">
              <picture>
                <source media="(max-width: 768px)" srcSet={getMobileSrc(frontmatter.contentSection2.imagePath)} />
                <img
                  src={frontmatter.contentSection2.imagePath}
                  alt={frontmatter.contentSection2.imageAlt}
                  width={500}
                  height={625}
                  className="object-cover"
                  loading="lazy"
                />
              </picture>
            </div>
            {/* Text Column */}
            <div className="space-y-6 order-2 lg:order-1">
              <h2
                className="text-3xl md:text-4xl font-light mb-8"
                style={{
                  fontFamily: '"Romie", serif',
                  color: '#1C1C1C',
                  fontWeight: 300
                }}
              >
                {frontmatter.contentSection2.title}
              </h2>
              {frontmatter.contentSection2.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-lg"
                  style={{ fontFamily: '"Romie", serif', color: '#1C1C1C', fontWeight: 300 }}
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial 2 */}
      <section className={`pt-24 ${BEIGE_BG}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 md:min-h-[500px]">
          {/* Quote Side - flipped layout (quote left, image right) */}
          <div
            className="flex items-center justify-center p-8 md:p-12 relative order-2 md:order-1"
            style={{ backgroundColor: DARK_PANEL }}
          >
            <div className="max-w-lg text-center">
              <blockquote
                className="text-2xl md:text-3xl mb-8"
                style={{
                  fontFamily: '"Romie", serif',
                  color: '#F5F0EB',
                  fontWeight: 300,
                  letterSpacing: '0.02em',
                  lineHeight: 1.3
                }}
              >
                &ldquo;{frontmatter.testimonials[1].quote}&rdquo;
              </blockquote>

              <cite
                className="text-sm not-italic"
                style={{
                  fontFamily: '"Romie", serif',
                  color: '#B8B3AE',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}
              >
                — {frontmatter.testimonials[1].author}
              </cite>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative aspect-[4/5] md:aspect-auto order-1 md:order-2" style={{ backgroundColor: DARK_PANEL }}>
            <picture>
              <source media="(max-width: 768px)" srcSet={getMobileSrc(frontmatter.testimonials[1].imagePath)} />
              <img
                src={frontmatter.testimonials[1].imagePath}
                alt={frontmatter.testimonials[1].imageAlt}
                className="absolute inset-0 w-full h-full object-cover md:object-contain object-top"
                loading="lazy"
              />
            </picture>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`pt-24 ${BEIGE_BG}`}>
        <h2
          className="text-3xl md:text-4xl font-light text-center mb-12 px-8"
          style={{
            fontFamily: '"Romie", serif',
            color: '#1C1C1C',
            fontWeight: 300
          }}
        >
          {frontmatter.faqTitle}
        </h2>
        <AnimatedFAQ
          items={frontmatter.faq.map((faq, index) => ({
            ...faq,
            fromLeft: index % 2 === 0
          }))}
          theme="light"
        />
      </section>

      {/* Image Scroll Carousel Section */}
      <ImageScrollCarousel
        images={frontmatter.carouselImages}
        containerHeight="50vh"
        backgroundColor={BEIGE_BG}
        imageHeight="h-96"
        imageWidth="w-80"
        gap="gap-8"        shadow="shadow-lg"
        borderRadius="rounded-none"
        enableImageHover={true}
        hoverScale={1.05}
      />

      {/* Footer */}
      <Footer />
      <MobileBottomNav />
    </>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content', 'phoenix-actor-headshots.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  return { props: { frontmatter: data, content } }
}
