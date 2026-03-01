import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Head from 'next/head'
import { getMobileSrc } from '@/lib/responsiveImage'
import Footer from '@/components/Footer'
import MobileBottomNav from '@/components/MobileBottomNav'
import StickyNavigation from '@/components/StickyNavigation'
import ServiceHero from '@/components/ServiceHero'
import AnimatedFAQ from '@/components/AnimatedFAQ'
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/seoConfig'

interface HubSection {
  title: string
  description: string
  imagePath: string
  imageAlt: string
  linkText: string
  linkHref: string
}

interface CorporateHeadshotsProps {
  frontmatter: {
    title: string
    description: string
    heroTitle: string
    heroSubtitle: string
    heroImage: string
    heroImageAlt: string
    photoGrid: {
      images: {
        src: string
        alt: string
        caption: string
        href: string
      }[]
    }
    hubSection1: HubSection
    hubSection2: HubSection
    hubSection3: HubSection
    imageRow: {
      src: string
      alt: string
    }[]
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
    closingSections: {
      title: string
      paragraphs: string[]
      imagePath: string
      imageAlt: string
    }[]
  }
  content: string
}

function HubCard({ section, imageFirst }: { section: HubSection; imageFirst: boolean }) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Image Column */}
          <div className={`flex justify-center items-center h-full ${imageFirst ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}>
            <picture>
              <source media="(max-width: 768px)" srcSet={getMobileSrc(section.imagePath)} />
              <img
                src={section.imagePath}
                alt={section.imageAlt}
                width={500}
                height={600}
                className="object-contain max-h-full"
                loading="lazy"
              />
            </picture>
          </div>
          {/* Text Column */}
          <div className={`space-y-6 flex flex-col justify-center ${imageFirst ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}`}>
            <h2
              className="text-3xl md:text-4xl font-light"
              style={{
                fontFamily: '"Majesti Banner", serif',
                color: '#1C1C1C',
                fontWeight: 300
              }}
            >
              {section.title}
            </h2>
            <p
              className="text-lg"
              style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 300 }}
            >
              {section.description}
            </p>
            <div className="mt-4">
              <Link
                href={section.linkHref}
                className="inline-block border-2 border-black text-black text-lg font-medium hover:bg-black hover:text-white transition-all duration-300 px-8 py-3"
                style={{
                  fontFamily: '"Hanken Grotesk", sans-serif'
                }}
              >
                {section.linkText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function CorporateHeadshotsPage({ frontmatter, content }: CorporateHeadshotsProps) {
  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
        <link rel="canonical" href="https://headshotsbymarie.com/corporate-headshots" />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description} />
        <meta property="og:image" content={`https://headshotsbymarie.com${frontmatter.heroImage}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://headshotsbymarie.com/corporate-headshots" />
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
              name: 'Corporate Headshot Photography',
              description: frontmatter.description,
              url: '/corporate-headshots',
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
              { name: 'Corporate Headshots', url: '/corporate-headshots' }
            ]))
          }}
        />
      </Head>

      {/* Navbar */}
      <StickyNavigation bookLink="/pricing" />

      {/* Hero Section */}
      <ServiceHero
        heroImage={frontmatter.heroImage}
        heroImageAlt={frontmatter.heroImageAlt}
        pageTitle="CORPORATE HEADSHOTS PHOENIX"
        subtitle="Executive Portraits, Team Sessions & Event Coverage"
        textColor="light"
        textAlign="left"
      />

      {/* Intro Paragraph */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <p
            className="text-lg md:text-xl"
            style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 300, lineHeight: 1.8 }}
          >
            Whether you're an HR director updating your team's website photos, a marketing manager coordinating consistent headshots across departments, or an event planner adding a headshot station to your next conference, I bring studio-quality lighting and results to your location anywhere in the Phoenix metro area.
          </p>
        </div>
      </section>

      {/* Photo Grid with Keyword Captions */}
      <section className="pb-16 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {frontmatter.photoGrid.images.map((image, index) => (
              <Link key={index} href={image.href} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <picture>
                    <source media="(max-width: 768px)" srcSet={getMobileSrc(image.src)} />
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  </picture>
                </div>
                <h2
                  className="mt-4 text-lg md:text-xl text-center group-hover:opacity-70 transition-opacity"
                  style={{
                    fontFamily: '"Majesti Banner", serif',
                    color: '#1C1C1C',
                    fontWeight: 300,
                    letterSpacing: '0.02em'
                  }}
                >
                  {image.caption}
                </h2>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hub Section 1 — Executive Headshots (image left, text right) */}
      <HubCard section={frontmatter.hubSection1} imageFirst={true} />

      {/* 5-Image Row */}
      <section className="py-8 bg-white">
        <div className="grid grid-cols-5 gap-0">
          {frontmatter.imageRow.map((image, index) => (
            <div key={index} className="relative aspect-[4/5] overflow-hidden">
              <picture>
                <source media="(max-width: 768px)" srcSet={getMobileSrc(image.src)} />
                <img
                  src={image.src}
                  alt={image.alt}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </picture>
            </div>
          ))}
        </div>
      </section>

      {/* Hub Section 2 — Team Photography (text left, image right) */}
      <HubCard section={frontmatter.hubSection2} imageFirst={false} />

      {/* Hub Section 3 — Conference & Event Coverage (image left, text right) */}
      <HubCard section={frontmatter.hubSection3} imageFirst={true} />

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
                "{frontmatter.testimonial.quote}"
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
                - {frontmatter.testimonial.author}
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

      {/* Closing Content Sections */}
      {frontmatter.closingSections.map((section, index) => {
        const imageFirst = index % 2 === 0
        return (
          <section key={index} className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Image */}
                <div className={`flex justify-center items-center ${imageFirst ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}>
                  <picture>
                    <source media="(max-width: 768px)" srcSet={getMobileSrc(section.imagePath)} />
                    <img
                      src={section.imagePath}
                      alt={section.imageAlt}
                      width={500}
                      height={600}
                      className="object-contain max-h-full"
                      loading="lazy"
                    />
                  </picture>
                </div>
                {/* Text */}
                <div className={`space-y-6 flex flex-col justify-center ${imageFirst ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}`}>
                  <h2
                    className="text-3xl md:text-4xl font-light"
                    style={{
                      fontFamily: '"Majesti Banner", serif',
                      color: '#1C1C1C',
                      fontWeight: 300
                    }}
                  >
                    {section.title}
                  </h2>
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-lg"
                      style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 300 }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* Footer */}
      <Footer />
      <MobileBottomNav />
    </>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content', 'corporate-headshots.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  return { props: { frontmatter: data, content } }
}
