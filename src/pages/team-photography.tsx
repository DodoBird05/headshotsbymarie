import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Head from 'next/head'
import Footer from '@/components/Footer'
import MobileBottomNav from '@/components/MobileBottomNav'
import StickyNavigation from '@/components/StickyNavigation'
import AnimatedFAQ from '@/components/AnimatedFAQ'
import { getMobileSrc } from '@/lib/responsiveImage'
import { generateServiceSchema, generateBreadcrumbSchema, seoConfig } from '@/lib/seoConfig'

interface TeamPhotographyProps {
  frontmatter: {
    title: string
    description: string
    heroTitle: string
    heroSubtitle: string
    heroImage: string
    heroImageAlt: string
    headerImages: {
      src: string
      alt: string
    }[]
    serviceSection1: {
      title: string
      subtitle: string
      listItems: string[]
      imagePath: string
      imageAlt: string
      buttons: {
        label: string
        href: string
      }[]
    }
    serviceSection2: {
      title: string
      text: string
      imagePath: string
      imageAlt: string
    }
    testimonial: {
      quote: string
      author: string
      imagePath: string
      imageAlt: string
    }
    faqTitle: string
    faq: {
      question: string
      answer: string
    }[]
  }
  content: string
}

export default function TeamPhotographyPage({ frontmatter, content }: TeamPhotographyProps) {
  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
        <link rel="canonical" href="https://headshotsbymarie.com/team-photography" />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description} />
        <meta property="og:image" content={`https://headshotsbymarie.com${frontmatter.heroImage}`} />
        <meta property="og:image:width" content="2400" />
        <meta property="og:image:height" content="1600" />
        <meta property="og:url" content="https://headshotsbymarie.com/team-photography" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Headshots by Marie" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta name="twitter:description" content={frontmatter.description} />
        <meta name="twitter:image" content={`https://headshotsbymarie.com${frontmatter.heroImage}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateServiceSchema({
              name: 'Team Photography',
              description: frontmatter.description,
              url: '/team-photography',
              image: frontmatter.heroImage
            }))
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
            __html: JSON.stringify(generateBreadcrumbSchema([
              { name: 'Team Photography', url: '/team-photography' }
            ]))
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Review',
              reviewBody: frontmatter.testimonial.quote,
              author: {
                '@type': 'Person',
                name: frontmatter.testimonial.author
              },
              reviewRating: {
                '@type': 'Rating',
                ratingValue: '5',
                bestRating: '5'
              },
              itemReviewed: {
                '@type': 'Service',
                name: 'Team Photography',
                provider: {
                  '@type': 'LocalBusiness',
                  name: seoConfig.businessName
                }
              }
            })
          }}
        />
      </Head>

      {/* Navbar */}
      <StickyNavigation bookLink="/pricing" lightBackground />

      {/* Header */}
      <div className="pt-48 px-8">
        <h1
          className="text-6xl font-light mb-8"
          style={{ fontFamily: '"Majesti Banner", serif', color: '#1C1C1C', fontWeight: 300, textTransform: 'uppercase' }}
        >
          Team Photography Phoenix
        </h1>

        {/* 3-Image Grid */}
        <section className="mt-16 -mx-8">
          <div className="grid grid-cols-3 gap-0">
            {frontmatter.headerImages.map((image, index) => (
              <div key={index}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto"
                  loading="eager"
                />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Disambiguation Links */}
      <div className="bg-white px-8 py-6">
        <div className="max-w-6xl mx-auto">
          <p
            className="text-base"
            style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#888', fontWeight: 300 }}
          >
            Looking for{' '}
            <Link href="/corporate-headshots" className="underline underline-offset-4 hover:text-black transition-colors">
              corporate headshots
            </Link>
            {' '}or{' '}
            <Link href="/executive-headshots" className="underline underline-offset-4 hover:text-black transition-colors">
              executive headshots
            </Link>
            ?
          </p>
        </div>
      </div>

      {/* First Service Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Image Column - First on mobile, second on desktop */}
            <div className="flex justify-center items-center h-full order-1 lg:order-2">
              <picture>
                <source media="(max-width: 768px)" srcSet={getMobileSrc(frontmatter.serviceSection1.imagePath)} />
                <img
                  src={frontmatter.serviceSection1.imagePath}
                  alt={frontmatter.serviceSection1.imageAlt}
                  width={500}
                  height={600}
                  className="object-contain max-h-full"
                  loading="lazy"
                />
              </picture>
            </div>
            {/* Text Column - Second on mobile, first on desktop */}
            <div className="space-y-6 flex flex-col justify-center order-2 lg:order-1">
              <h2
                className="text-3xl font-light mb-4"
                style={{ fontFamily: '"Majesti Banner", serif', color: '#1C1C1C', fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.05em' }}
              >
                {frontmatter.serviceSection1.title}
              </h2>

              <p
                className="text-lg font-medium mb-3"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 500 }}
              >
                {frontmatter.serviceSection1.subtitle}
              </p>
              <ul
                className="list-disc pl-6 space-y-2 mb-8 text-lg"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 300 }}
              >
                {frontmatter.serviceSection1.listItems.map((item, index) => (
                  <li key={index} className="[&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-black [&_a]:transition-colors" dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>

              {/* Pricing Buttons */}
              <div className="mt-8 flex gap-4">
                {frontmatter.serviceSection1.buttons.map((button, index) => (
                  <Link
                    key={index}
                    href={button.href}
                    className="inline-block border-2 border-black text-black text-lg font-medium hover:bg-black hover:text-white transition-all duration-300 px-8 py-3"
                    style={{
                      fontFamily: '"Hanken Grotesk", sans-serif'
                    }}
                  >
                    {button.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Second Service Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Left Column - Image */}
            <div className="flex justify-center items-center h-full lg:order-1">
              <picture>
                <source media="(max-width: 768px)" srcSet={getMobileSrc(frontmatter.serviceSection2.imagePath)} />
                <img
                  src={frontmatter.serviceSection2.imagePath}
                  alt={frontmatter.serviceSection2.imageAlt}
                  width={800}
                  height={944}
                  className="object-contain max-h-full"
                  loading="lazy"
                />
              </picture>
            </div>
            {/* Right Column - Text Content */}
            <div className="space-y-6 flex flex-col justify-center lg:order-2">
              <h2
                className="text-3xl font-light mb-4"
                style={{ fontFamily: '"Majesti Banner", serif', color: '#1C1C1C', fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.05em' }}
              >
                {frontmatter.serviceSection2.title}
              </h2>

              <p
                className="text-lg"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 300 }}
              >
                {frontmatter.serviceSection2.text}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 md:min-h-[500px]">
          {/* Image Side */}
          <div className="relative aspect-[4/5] md:aspect-auto">
            <picture>
              <source media="(max-width: 768px)" srcSet={getMobileSrc(frontmatter.testimonial.imagePath)} />
              <img
                src={frontmatter.testimonial.imagePath}
                alt={frontmatter.testimonial.imageAlt}
                className="absolute inset-0 w-full h-full object-cover object-top"
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
              {/* Testimonial Text */}
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
                <span style={{ fontFeatureSettings: '"ss01" on' }}>{frontmatter.testimonial.quote.charAt(0)}</span>{frontmatter.testimonial.quote.slice(1)}
              </blockquote>

              {/* Client Name */}
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
                — {frontmatter.testimonial.author}
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mt-24">
        <AnimatedFAQ
          items={frontmatter.faq.map((faq, index) => ({
            ...faq,
            fromLeft: index % 2 === 0
          }))}
          theme="light"
        />
      </section>

      {/* Footer */}
      <Footer />
      <MobileBottomNav />
    </>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content', 'team-photography.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  return { props: { frontmatter: data, content } }
}
