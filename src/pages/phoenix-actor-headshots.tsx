import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Footer from '@/components/Footer'
import MobileBottomNav from '@/components/MobileBottomNav'
import StickyNavigation from '@/components/StickyNavigation'
import ServiceHero from '@/components/ServiceHero'
import AnimatedFAQ from '@/components/AnimatedFAQ'
import ImageScrollCarousel from '@/components/ImageScrollCarousel'
import PhotoGridWithHeading from '@/components/PhotoGridWithHeading'
import { generateServiceSchema, generatePersonSchema, generateAggregateRating, generateBreadcrumbSchema, seoConfig } from '@/lib/seoConfig'
import { getMobileSrc } from '@/lib/responsiveImage'

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

export default function ActorHeadshotsPage({ frontmatter, content }: ActorHeadshotsProps) {
  const serviceSchema = generateServiceSchema({
    name: 'Actor Headshot Photography',
    description: frontmatter.description,
    url: '/phoenix-actor-headshots',
    image: frontmatter.heroImage
  })

  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
        <link rel="canonical" href="https://headshotsbymarie.com/phoenix-actor-headshots" />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description} />
        <meta property="og:image" content={`https://headshotsbymarie.com${frontmatter.heroImage}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://headshotsbymarie.com/phoenix-actor-headshots" />
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
              aggregateRating: generateAggregateRating('83')
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
              { name: 'Actor Headshots', url: '/phoenix-actor-headshots' }
            ]))
          }}
        />
      </Head>

      {/* Navbar */}
      <StickyNavigation bookLink="/pricing" lightBackground />

      {/* Hero Section */}
      <ServiceHero
        heroImage={frontmatter.heroImage}
        heroImageAlt={frontmatter.heroImageAlt}
        pageTitle="ACTOR HEADSHOTS PHOTOGRAPHY"
        subtitle="Phoenix Professional Headshots"
        textColor="dark"
      />

      {/* Photo Grid Section */}
      <PhotoGridWithHeading
        heading={frontmatter.photoGrid.heading}
        images={frontmatter.photoGrid.images}
      />

      {/* Content Section 1: Why Actor Headshots Are Different */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Column */}
            <div className="space-y-6 order-2 lg:order-1">
              <h2
                className="text-3xl md:text-4xl font-light mb-8"
                style={{
                  fontFamily: '"Majesti Banner", serif',
                  color: '#1C1C1C',
                  fontWeight: 300,
                  textTransform: 'uppercase'
                }}
              >
                {frontmatter.contentSection1.title}
              </h2>
              {frontmatter.contentSection1.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-lg"
                  style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 300 }}
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
              <div className="mt-8">
                <Link
                  href="/pricing"
                  className="inline-block border-2 border-black text-black text-lg font-medium hover:bg-black hover:text-white transition-all duration-300 px-8 py-3"
                  style={{ fontFamily: '"Hanken Grotesk", sans-serif' }}
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
      <section className="py-16 bg-white">
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
                    fontFamily: '"Majesti Banner", serif',
                    color: '#1C1C1C',
                    fontWeight: 300,
                    textTransform: 'uppercase'
                  }}
                >
{frontmatter.services.title}
                </h2>
              </div>
{frontmatter.services.types.map((service, index) => (
                <div key={index} className={index < frontmatter.services.types.length - 1 ? "mb-6" : ""}>
                  <h3
                    className="text-2xl font-light mb-4"
                    style={{ fontFamily: '"Majesti Banner", serif', color: '#1C1C1C', fontWeight: 300, textTransform: 'uppercase' }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-lg"
                    style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 300 }}
                  >
                    {service.description}
                  </p>
                </div>
              ))}
              <div className="mt-8">
                <Link
                  href="/pricing"
                  className="inline-block border-2 border-black text-black text-lg font-medium hover:bg-black hover:text-white transition-all duration-300 px-8 py-3"
                  style={{ fontFamily: '"Hanken Grotesk", sans-serif' }}
                >
                  Book Today
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial 1 */}
      <section className="mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 md:min-h-[500px]">
          {/* Image Side */}
          <div className="relative aspect-[4/5] md:aspect-auto" style={{ backgroundColor: '#F5F5F5' }}>
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
            style={{ backgroundColor: '#F5F5F5' }}
          >
            <div className="max-w-lg text-center">
              <blockquote
                className="text-2xl md:text-3xl mb-8"
                style={{
                  fontFamily: '"Majesti Banner", serif',
                  color: '#1C1C1C',
                  fontWeight: 300,
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em',
                  lineHeight: 1.3
                }}
              >
                &ldquo;{frontmatter.testimonials[0].quote}&rdquo;
              </blockquote>

              <cite
                className="text-sm not-italic"
                style={{
                  fontFamily: '"Hanken Grotesk", sans-serif',
                  color: '#666',
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
      <section className="py-16 bg-white">
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
                  fontFamily: '"Majesti Banner", serif',
                  color: '#1C1C1C',
                  fontWeight: 300,
                  textTransform: 'uppercase'
                }}
              >
                {frontmatter.contentSection2.title}
              </h2>
              {frontmatter.contentSection2.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-lg"
                  style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 300 }}
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial 2 */}
      <section className="mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 md:min-h-[500px]">
          {/* Quote Side - flipped layout (quote left, image right) */}
          <div
            className="flex items-center justify-center p-8 md:p-12 relative order-2 md:order-1"
            style={{ backgroundColor: '#F5F5F5' }}
          >
            <div className="max-w-lg text-center">
              <blockquote
                className="text-2xl md:text-3xl mb-8"
                style={{
                  fontFamily: '"Majesti Banner", serif',
                  color: '#1C1C1C',
                  fontWeight: 300,
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em',
                  lineHeight: 1.3
                }}
              >
                &ldquo;{frontmatter.testimonials[1].quote}&rdquo;
              </blockquote>

              <cite
                className="text-sm not-italic"
                style={{
                  fontFamily: '"Hanken Grotesk", sans-serif',
                  color: '#666',
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
          <div className="relative aspect-[4/5] md:aspect-auto order-1 md:order-2" style={{ backgroundColor: '#F5F5F5' }}>
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
      <section className="mt-24">
        <h2
          className="text-3xl md:text-4xl font-light text-center mb-12 px-8"
          style={{
            fontFamily: '"Majesti Banner", serif',
            color: '#1C1C1C',
            fontWeight: 300,
            textTransform: 'uppercase'
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
        backgroundColor="bg-white"
        imageHeight="h-96"
        imageWidth="w-80"
        gap="gap-8"
        scrollSpeed={30}
        animationDirection="left"
        shadow="shadow-lg"
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
