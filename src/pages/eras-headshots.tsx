import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Head from 'next/head'
import Footer from '@/components/Footer'
import MobileBottomNav from '@/components/MobileBottomNav'
import StickyNavigation from '@/components/StickyNavigation'
import ServiceHero from '@/components/ServiceHero'
import PhotoGridWithHeading from '@/components/PhotoGridWithHeading'
import AnimatedFAQ from '@/components/AnimatedFAQ'
import { generateServiceSchema } from '@/lib/seoConfig'
import { getMobileSrc } from '@/lib/responsiveImage'

interface ErasHeadshotsProps {
  frontmatter: {
    title: string
    description: string
    heroImage: string
    heroImageAlt: string
    photoGrid: {
      heading: string
      images: {
        src: string
        alt: string
      }[]
    }
    introText: string
    whatsIncluded: {
      title: string
      items: string[]
      imagePath: string
      imageAlt: string
    }
    erasRequirements: {
      title: string
      subtitle: string
      rows: {
        requirement: string
        specification: string
      }[]
      footnote: string
      imagePath: string
      imageAlt: string
    }
    whatToWear: {
      title: string
      doItems: string[]
      dontItems: string[]
      footnote: string
      imagePath: string
      imageAlt: string
    }
    whatToExpect: {
      title: string
      subtitle: string
      steps: string[]
      footnote: string
      imagePath: string
      imageAlt: string
    }
    whyChooseMe: {
      title: string
      items: string[]
      imagePath: string
      imageAlt: string
    }
    servingStudents: {
      title: string
      text: string
      cta: string
      imagePath: string
      imageAlt: string
    }
    faq: {
      question: string
      answer: string
    }[]
  }
  content: string
}

export default function ErasHeadshotsPage({ frontmatter }: ErasHeadshotsProps) {
  const serviceSchema = generateServiceSchema({
    name: 'ERAS Headshot Photography',
    description: frontmatter.description,
    url: '/eras-headshots',
    image: frontmatter.heroImage
  })
  // Remove nested @context from service schema since @graph wrapper provides it
  const { '@context': _ctx, ...serviceSchemaWithoutContext } = serviceSchema

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      serviceSchemaWithoutContext,
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://headshotsbymarie.com'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'ERAS Headshots',
            item: 'https://headshotsbymarie.com/eras-headshots'
          }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: frontmatter.faq.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer.replace(/<[^>]*>/g, '')
          }
        }))
      }
    ]
  }

  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
        <link rel="canonical" href="https://headshotsbymarie.com/eras-headshots/" />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description} />
        <meta property="og:image" content="https://headshotsbymarie.com/images/ERAS/ERAS-Headshots-Phoenix-OG.webp/" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://headshotsbymarie.com/eras-headshots/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Headshots by Marie" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta name="twitter:description" content={frontmatter.description} />
        <meta name="twitter:image" content="https://headshotsbymarie.com/images/ERAS/ERAS-Headshots-Phoenix-OG.webp/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd)
          }}
        />
      </Head>

      {/* Navbar */}
      <StickyNavigation bookLink="/pricing" />

      {/* Hero Section - crop higher to show face */}
      <style jsx global>{`
        .eras-hero img {
          object-position: center 20% !important;
        }
      `}</style>
      <div className="eras-hero">
        <ServiceHero
          heroImage={frontmatter.heroImage}
          heroImageAlt={frontmatter.heroImageAlt}
          pageTitle="ERAS HEADSHOTS"
          subtitle="Medical Residency Application Photos in Phoenix"
          textColor="light"
        />
      </div>

      {/* Photo Grid Section */}
      <PhotoGridWithHeading
        heading={frontmatter.photoGrid.heading}
        images={frontmatter.photoGrid.images}
      />

      {/* Intro Paragraph */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2 className="sr-only">ERAS Headshot Photography for Medical Students in Phoenix</h2>
          <p
            className="text-lg leading-relaxed"
            style={{
              fontFamily: '"Hanken Grotesk", sans-serif',
              color: '#1C1C1C',
              fontWeight: 300
            }}
          >
            {frontmatter.introText}
          </p>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Image Column - First on mobile, second on desktop */}
            <div className="flex justify-center items-center h-full order-1 lg:order-2">
              <div className="relative w-full aspect-square overflow-hidden">
                <picture>
                  <source media="(max-width: 768px)" srcSet={getMobileSrc(frontmatter.whatsIncluded.imagePath)} />
                  <img
                    src={frontmatter.whatsIncluded.imagePath}
                    alt={frontmatter.whatsIncluded.imageAlt}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </picture>
              </div>
            </div>
            {/* Text Column - Second on mobile, first on desktop */}
            <div className="space-y-6 flex flex-col justify-center order-2 lg:order-1">
              <h2
                className="text-3xl md:text-4xl font-light mb-4"
                style={{
                  fontFamily: '"Majesti Banner", serif',
                  color: '#1C1C1C',
                  fontWeight: 300
                }}
              >
                {frontmatter.whatsIncluded.title}
              </h2>
              <ul
                className="list-disc pl-6 space-y-2 text-lg"
                style={{
                  fontFamily: '"Hanken Grotesk", sans-serif',
                  color: '#1C1C1C',
                  fontWeight: 300
                }}
              >
                {frontmatter.whatsIncluded.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
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

      {/* ERAS Requirements Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Left Column - Image */}
            <div className="flex justify-center items-center h-full lg:order-1">
              <div className="relative w-full aspect-square overflow-hidden">
                <picture>
                  <source media="(max-width: 768px)" srcSet={getMobileSrc(frontmatter.erasRequirements.imagePath)} />
                  <img
                    src={frontmatter.erasRequirements.imagePath}
                    alt={frontmatter.erasRequirements.imageAlt}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </picture>
              </div>
            </div>
            {/* Right Column - Requirements Table */}
            <div className="space-y-6 flex flex-col justify-center lg:order-2">
              <h2
                className="text-3xl md:text-4xl font-light mb-4"
                style={{
                  fontFamily: '"Majesti Banner", serif',
                  color: '#1C1C1C',
                  fontWeight: 300
                }}
              >
                {frontmatter.erasRequirements.title}
              </h2>
              <p
                className="text-lg mb-6"
                style={{
                  fontFamily: '"Hanken Grotesk", sans-serif',
                  color: '#1C1C1C',
                  fontWeight: 300
                }}
              >
                {frontmatter.erasRequirements.subtitle}
              </p>
              <div className="overflow-hidden border border-gray-200 rounded-lg">
                <table className="w-full">
                  <thead>
                    <tr style={{ backgroundColor: '#F5F5F5' }}>
                      <th
                        className="text-left px-4 py-3 text-sm uppercase tracking-wider"
                        style={{
                          fontFamily: '"Hanken Grotesk", sans-serif',
                          color: '#1C1C1C',
                          fontWeight: 500
                        }}
                      >
                        Requirement
                      </th>
                      <th
                        className="text-left px-4 py-3 text-sm uppercase tracking-wider"
                        style={{
                          fontFamily: '"Hanken Grotesk", sans-serif',
                          color: '#1C1C1C',
                          fontWeight: 500
                        }}
                      >
                        Specification
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {frontmatter.erasRequirements.rows.map((row, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? 'bg-white' : ''}
                        style={index % 2 !== 0 ? { backgroundColor: '#FAFAFA' } : {}}
                      >
                        <td
                          className="px-4 py-3 text-base"
                          style={{
                            fontFamily: '"Hanken Grotesk", sans-serif',
                            color: '#1C1C1C',
                            fontWeight: 400
                          }}
                        >
                          {row.requirement}
                        </td>
                        <td
                          className="px-4 py-3 text-base"
                          style={{
                            fontFamily: '"Hanken Grotesk", sans-serif',
                            color: '#1C1C1C',
                            fontWeight: 300
                          }}
                        >
                          {row.specification}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p
                className="text-base mt-4"
                style={{
                  fontFamily: '"Hanken Grotesk", sans-serif',
                  color: '#666',
                  fontWeight: 300,
                  fontStyle: 'italic'
                }}
              >
                {frontmatter.erasRequirements.footnote}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What to Wear Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Image Column - First on mobile, second on desktop */}
            <div className="flex justify-center items-center h-full order-1 lg:order-2">
              <div className="relative w-full aspect-square overflow-hidden">
                <picture>
                  <source media="(max-width: 768px)" srcSet={getMobileSrc(frontmatter.whatToWear.imagePath)} />
                  <img
                    src={frontmatter.whatToWear.imagePath}
                    alt={frontmatter.whatToWear.imageAlt}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </picture>
              </div>
            </div>
            {/* Text Column */}
            <div className="space-y-6 flex flex-col justify-center order-2 lg:order-1">
              <h2
                className="text-3xl md:text-4xl font-light mb-4"
                style={{
                  fontFamily: '"Majesti Banner", serif',
                  color: '#1C1C1C',
                  fontWeight: 300
                }}
              >
                {frontmatter.whatToWear.title}
              </h2>

              {/* Do List */}
              <div>
                <p
                  className="text-lg font-medium mb-3"
                  style={{
                    fontFamily: '"Hanken Grotesk", sans-serif',
                    color: '#1C1C1C',
                    fontWeight: 500
                  }}
                >
                  Do:
                </p>
                <ul
                  className="list-disc pl-6 space-y-2 text-lg"
                  style={{
                    fontFamily: '"Hanken Grotesk", sans-serif',
                    color: '#1C1C1C',
                    fontWeight: 300
                  }}
                >
                  {frontmatter.whatToWear.doItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Don't List */}
              <div>
                <p
                  className="text-lg font-medium mb-3"
                  style={{
                    fontFamily: '"Hanken Grotesk", sans-serif',
                    color: '#1C1C1C',
                    fontWeight: 500
                  }}
                >
                  Don&apos;t:
                </p>
                <ul
                  className="list-disc pl-6 space-y-2 text-lg"
                  style={{
                    fontFamily: '"Hanken Grotesk", sans-serif',
                    color: '#1C1C1C',
                    fontWeight: 300
                  }}
                >
                  {frontmatter.whatToWear.dontItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <p
                className="text-base mt-4"
                style={{
                  fontFamily: '"Hanken Grotesk", sans-serif',
                  color: '#666',
                  fontWeight: 300,
                  fontStyle: 'italic'
                }}
              >
                {frontmatter.whatToWear.footnote}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Left Column - Image */}
            <div className="flex justify-center items-center h-full lg:order-1">
              <div className="relative w-full aspect-square overflow-hidden">
                <picture>
                  <source media="(max-width: 768px)" srcSet={getMobileSrc(frontmatter.whatToExpect.imagePath)} />
                  <img
                    src={frontmatter.whatToExpect.imagePath}
                    alt={frontmatter.whatToExpect.imageAlt}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </picture>
              </div>
            </div>
            {/* Right Column - Steps */}
            <div className="space-y-6 flex flex-col justify-center lg:order-2">
              <h2
                className="text-3xl md:text-4xl font-light mb-4"
                style={{
                  fontFamily: '"Majesti Banner", serif',
                  color: '#1C1C1C',
                  fontWeight: 300
                }}
              >
                {frontmatter.whatToExpect.title}
              </h2>
              <p
                className="text-lg mb-6"
                style={{
                  fontFamily: '"Hanken Grotesk", sans-serif',
                  color: '#1C1C1C',
                  fontWeight: 300
                }}
              >
                {frontmatter.whatToExpect.subtitle}
              </p>
              <ol
                className="list-decimal pl-6 space-y-3 text-lg"
                style={{
                  fontFamily: '"Hanken Grotesk", sans-serif',
                  color: '#1C1C1C',
                  fontWeight: 300
                }}
              >
                {frontmatter.whatToExpect.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
              <p
                className="text-base mt-4"
                style={{
                  fontFamily: '"Hanken Grotesk", sans-serif',
                  color: '#666',
                  fontWeight: 300,
                  fontStyle: 'italic'
                }}
              >
                {frontmatter.whatToExpect.footnote}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Students Choose Me Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Image Column - First on mobile, second on desktop */}
            <div className="flex justify-center items-center h-full order-1 lg:order-2">
              <div className="relative w-full aspect-square overflow-hidden">
                <picture>
                  <source media="(max-width: 768px)" srcSet={getMobileSrc(frontmatter.whyChooseMe.imagePath)} />
                  <img
                    src={frontmatter.whyChooseMe.imagePath}
                    alt={frontmatter.whyChooseMe.imageAlt}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </picture>
              </div>
            </div>
            {/* Text Column */}
            <div className="space-y-6 flex flex-col justify-center order-2 lg:order-1">
              <h2
                className="text-3xl md:text-4xl font-light mb-4"
                style={{
                  fontFamily: '"Majesti Banner", serif',
                  color: '#1C1C1C',
                  fontWeight: 300
                }}
              >
                {frontmatter.whyChooseMe.title}
              </h2>
              <ul
                className="list-disc pl-6 space-y-2 text-lg"
                style={{
                  fontFamily: '"Hanken Grotesk", sans-serif',
                  color: '#1C1C1C',
                  fontWeight: 300
                }}
              >
                {frontmatter.whyChooseMe.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Serving Medical Students Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Left Column - Image */}
            <div className="flex justify-center items-center h-full lg:order-1">
              <div className="relative w-full aspect-square overflow-hidden">
                <picture>
                  <source media="(max-width: 768px)" srcSet={getMobileSrc(frontmatter.servingStudents.imagePath)} />
                  <img
                    src={frontmatter.servingStudents.imagePath}
                    alt={frontmatter.servingStudents.imageAlt}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </picture>
              </div>
            </div>
            {/* Right Column - Text */}
            <div className="space-y-6 flex flex-col justify-center lg:order-2">
              <h2
                className="text-3xl md:text-4xl font-light mb-4"
                style={{
                  fontFamily: '"Majesti Banner", serif',
                  color: '#1C1C1C',
                  fontWeight: 300
                }}
              >
                {frontmatter.servingStudents.title}
              </h2>
              <p
                className="text-lg"
                style={{
                  fontFamily: '"Hanken Grotesk", sans-serif',
                  color: '#1C1C1C',
                  fontWeight: 300
                }}
              >
                {frontmatter.servingStudents.text}
              </p>
              <p
                className="text-lg"
                style={{
                  fontFamily: '"Hanken Grotesk", sans-serif',
                  color: '#1C1C1C',
                  fontWeight: 400
                }}
              >
                {frontmatter.servingStudents.cta}
              </p>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-block border-2 border-black text-black text-lg font-medium hover:bg-black hover:text-white transition-all duration-300 px-8 py-3"
                  style={{ fontFamily: '"Hanken Grotesk", sans-serif' }}
                >
                  Get in Touch
                </Link>
              </div>
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
  const filePath = path.join(process.cwd(), 'content', 'eras-headshots.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  return { props: { frontmatter: data, content } }
}
