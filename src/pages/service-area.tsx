import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Head from 'next/head'
import Footer from '@/components/Footer'
import MobileBottomNav from '@/components/MobileBottomNav'
import StickyNavigation from '@/components/StickyNavigation'
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/seoConfig'
import { getMobileSrc } from '@/lib/responsiveImage'

interface ServiceAreaFrontmatter {
  title: string
  description: string
  pageTitle: string
  ogImage: string
  intro: string
  sections: {
    heading: string
    paragraphs: string[]
    image?: string
    imageAlt?: string
  }[]
  onLocationTitle: string
  onLocationIntro: string
  valleyCities: {
    name: string
    distance: string
    text: string
    image?: string
    imageAlt?: string
  }[]
  faq: {
    question: string
    answer: string
  }[]
  ctaTitle: string
  ctaText: string
  ctaButtons: {
    label: string
    href: string
  }[]
}

interface ServiceAreaProps {
  frontmatter: ServiceAreaFrontmatter
}

export default function ServiceAreaPage({ frontmatter }: ServiceAreaProps) {
  const faqSchema = {
    '@context': 'https://schema.org',
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

  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
        <link rel="canonical" href="https://headshotsbymarie.com/service-area" />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description} />
        <meta property="og:url" content="https://headshotsbymarie.com/service-area" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Headshots by Marie" />
        <meta property="og:image" content={`https://headshotsbymarie.com${frontmatter.ogImage}`} />
        <meta property="og:image:width" content="900" />
        <meta property="og:image:height" content="600" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta name="twitter:description" content={frontmatter.description} />
        <meta name="twitter:image" content={`https://headshotsbymarie.com${frontmatter.ogImage}`} />
        {/* Service JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateServiceSchema({
              name: 'Professional Headshot Photography, Phoenix Metro Area',
              description: frontmatter.description,
              url: '/service-area',
              image: frontmatter.ogImage
            }))
          }}
        />
        {/* FAQPage JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema)
          }}
        />
        {/* Breadcrumb JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateBreadcrumbSchema([
              { name: 'Service Area', url: '/service-area' }
            ]))
          }}
        />
      </Head>

      <StickyNavigation bookLink="/pricing" />

      {/* Page Header */}
      <div className="pt-48 pb-16 px-8">
        <div className="max-w-3xl mx-auto">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-light mb-8"
            style={{
              fontFamily: '"Majesti Banner", serif',
              color: '#1C1C1C',
              fontWeight: 300
            }}
          >
            {frontmatter.pageTitle}
          </h1>
          <p
            className="text-lg md:text-xl"
            style={{
              fontFamily: '"Hanken Grotesk", sans-serif',
              color: '#1C1C1C',
              fontWeight: 300,
              lineHeight: 1.7
            }}
          >
            {frontmatter.intro}
          </p>
        </div>
      </div>

      {/* City Sections */}
      {frontmatter.sections.map((section, index) => {
        const hasImage = !!section.image
        const imageOnLeft = index % 2 === 0

        return (
          <section key={index} className="py-16 bg-white">
            <div className={`${hasImage ? 'max-w-6xl' : 'max-w-3xl'} mx-auto px-8`}>
              {hasImage ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                  {/* Image */}
                  <div className={`${imageOnLeft ? 'order-1' : 'order-1 lg:order-2'}`}>
                    <picture>
                      <source
                        media="(max-width: 768px)"
                        srcSet={getMobileSrc(section.image!)}
                      />
                      <img
                        src={section.image!}
                        alt={section.imageAlt || ''}
                        loading="lazy"
                        className="w-full h-auto object-cover"
                      />
                    </picture>
                  </div>
                  {/* Text */}
                  <div className={`${imageOnLeft ? 'order-2' : 'order-2 lg:order-1'}`}>
                    <h2
                      className="text-3xl md:text-4xl font-light mb-8"
                      style={{
                        fontFamily: '"Majesti Banner", serif',
                        color: '#1C1C1C',
                        fontWeight: 300
                      }}
                    >
                      {section.heading}
                    </h2>
                    {section.paragraphs.map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        className={`text-lg [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:opacity-70 [&_a]:transition-opacity ${pIndex < section.paragraphs.length - 1 ? 'mb-6' : ''}`}
                        style={{
                          fontFamily: '"Hanken Grotesk", sans-serif',
                          color: '#1C1C1C',
                          fontWeight: 300,
                          lineHeight: 1.7
                        }}
                        dangerouslySetInnerHTML={{ __html: paragraph }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <h2
                    className="text-3xl md:text-4xl font-light mb-8"
                    style={{
                      fontFamily: '"Majesti Banner", serif',
                      color: '#1C1C1C',
                      fontWeight: 300
                    }}
                  >
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className={`text-lg [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:opacity-70 [&_a]:transition-opacity ${pIndex < section.paragraphs.length - 1 ? 'mb-6' : ''}`}
                      style={{
                        fontFamily: '"Hanken Grotesk", sans-serif',
                        color: '#1C1C1C',
                        fontWeight: 300,
                        lineHeight: 1.7
                      }}
                      dangerouslySetInnerHTML={{ __html: paragraph }}
                    />
                  ))}
                </>
              )}
            </div>
          </section>
        )
      })}

      {/* On-Location Section */}
      <section className="py-20 bg-white" style={{ borderTop: '1px solid #E5E5E5' }}>
        <div className="max-w-3xl mx-auto px-8">
          <h2
            className="text-3xl md:text-4xl font-light mb-4"
            style={{
              fontFamily: '"Majesti Banner", serif',
              color: '#1C1C1C',
              fontWeight: 300
            }}
          >
            {frontmatter.onLocationTitle}
          </h2>
          <p
            className="text-lg mb-12"
            style={{
              fontFamily: '"Hanken Grotesk", sans-serif',
              color: '#1C1C1C',
              fontWeight: 300,
              lineHeight: 1.7
            }}
          >
            {frontmatter.onLocationIntro}
          </p>

          {/* Valley Cities */}
          <div className="space-y-10">
            {frontmatter.valleyCities.map((city, index) => (
              <div key={index}>
                <h3
                  className="text-2xl font-light mb-1"
                  style={{
                    fontFamily: '"Majesti Banner", serif',
                    color: '#1C1C1C',
                    fontWeight: 300
                  }}
                >
                  {city.name}
                </h3>
                <p
                  className="text-sm mb-3"
                  style={{
                    fontFamily: '"Hanken Grotesk", sans-serif',
                    color: '#666',
                    fontWeight: 400,
                    letterSpacing: '0.05em'
                  }}
                >
                  {city.distance}
                </p>
                {city.image && (
                  <div className="mb-4">
                    <picture>
                      <source
                        media="(max-width: 768px)"
                        srcSet={getMobileSrc(city.image)}
                      />
                      <img
                        src={city.image}
                        alt={city.imageAlt || ''}
                        loading="lazy"
                        className="w-full h-auto object-cover"
                      />
                    </picture>
                  </div>
                )}
                <p
                  className="text-lg"
                  style={{
                    fontFamily: '"Hanken Grotesk", sans-serif',
                    color: '#1C1C1C',
                    fontWeight: 300,
                    lineHeight: 1.7
                  }}
                >
                  {city.text}
                </p>
              </div>
            ))}
          </div>

          <p
            className="text-lg mt-12"
            style={{
              fontFamily: '"Hanken Grotesk", sans-serif',
              color: '#1C1C1C',
              fontWeight: 300,
              fontStyle: 'italic'
            }}
          >
            If you're in the Valley and need headshots, I can probably get to you.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white" style={{ borderTop: '1px solid #E5E5E5' }}>
        <div className="max-w-3xl mx-auto px-8">
          <h2
            className="text-3xl md:text-4xl font-light mb-12"
            style={{
              fontFamily: '"Majesti Banner", serif',
              color: '#1C1C1C',
              fontWeight: 300
            }}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-10">
            {frontmatter.faq.map((item, index) => (
              <div key={index}>
                <h3
                  className="text-xl font-light mb-3"
                  style={{
                    fontFamily: '"Majesti Banner", serif',
                    color: '#1C1C1C',
                    fontWeight: 300
                  }}
                >
                  {item.question}
                </h3>
                <p
                  className="text-lg [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:opacity-70 [&_a]:transition-opacity"
                  style={{
                    fontFamily: '"Hanken Grotesk", sans-serif',
                    color: '#666',
                    fontWeight: 300,
                    lineHeight: 1.7
                  }}
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2
            className="text-3xl md:text-4xl font-light mb-6"
            style={{
              fontFamily: '"Majesti Banner", serif',
              color: '#1C1C1C',
              fontWeight: 300
            }}
          >
            {frontmatter.ctaTitle}
          </h2>
          <p
            className="text-lg mb-10"
            style={{
              fontFamily: '"Hanken Grotesk", sans-serif',
              color: '#1C1C1C',
              fontWeight: 300,
              lineHeight: 1.7
            }}
          >
            {frontmatter.ctaText}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {frontmatter.ctaButtons.map((button, index) => (
              <Link
                key={index}
                href={button.href}
                className="inline-block px-8 py-3 text-base transition-colors duration-200"
                style={{
                  fontFamily: '"Hanken Grotesk", sans-serif',
                  fontWeight: 500,
                  border: '2px solid #1C1C1C',
                  color: index === 0 ? '#fff' : '#1C1C1C',
                  backgroundColor: index === 0 ? '#1C1C1C' : 'transparent',
                  borderRadius: '4px'
                }}
              >
                {button.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <MobileBottomNav />
    </>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content', 'service-area.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(fileContents)
  return { props: { frontmatter: data } }
}
