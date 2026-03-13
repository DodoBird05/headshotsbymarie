import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import { useState } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import Footer from '@/components/Footer'
import MobileBottomNav from '@/components/MobileBottomNav'
import StickyNavigation from '@/components/StickyNavigation'
import ServiceHero from '@/components/ServiceHero'
import AnimatedFAQ from '@/components/AnimatedFAQ'
import { generateServiceSchema } from '@/lib/seoConfig'

interface Section {
  title: string
  items: {
    title?: string
    description: string
  }[]
  hiddenText?: {
    title: string
    text: string
  }
  imagePath: string
  imageAlt: string
}

interface HowToPrepareFrontmatter {
  title: string
  description: string
  heroTitle: string
  heroSubtitle: string
  ogImage: string
  heroImage: string
  heroImageAlt: string
  introText: string[]
  sections: Section[]
  closingTitle: string
  closingText: string[]
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

interface HowToPrepareProps {
  frontmatter: HowToPrepareFrontmatter
  content: string
}

export default function HowToPreparePage({ frontmatter, content }: HowToPrepareProps) {
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({})

  const toggleSection = (index: number) => {
    setOpenSections(prev => ({ ...prev, [index]: !prev[index] }))
  }
  // HowTo JSON-LD schema for step-by-step rich results
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: frontmatter.title.split(' | ')[0],
    description: frontmatter.description,
    image: `https://headshotsbymarie.com${frontmatter.heroImage}`,
    step: frontmatter.sections.map((section, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: section.title,
      text: section.items.map(item => item.description.replace(/<[^>]*>/g, '')).join(' '),
      image: `https://headshotsbymarie.com${section.imagePath}`
    }))
  }

  // FAQPage JSON-LD schema for "People Also Ask" rich results
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
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://headshotsbymarie.com/how-to-prepare/" />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description} />
        <meta property="og:image" content={`https://headshotsbymarie.com${frontmatter.ogImage}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://headshotsbymarie.com/how-to-prepare/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Headshots by Marie" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta name="twitter:description" content={frontmatter.description} />
        <meta name="twitter:image" content={`https://headshotsbymarie.com${frontmatter.ogImage}`} />
        {/* Service JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateServiceSchema({
              name: 'Headshot Session Preparation Guide',
              description: frontmatter.description,
              url: '/how-to-prepare',
              image: frontmatter.heroImage
            }))
          }}
        />
        {/* HowTo JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(howToSchema)
          }}
        />
        {/* FAQPage JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema)
          }}
        />
      </Head>

      {/* Navbar */}
      <StickyNavigation bookLink="/pricing" hideFloatingCta />

      {/* Hero Section */}
      <ServiceHero
        heroImage={frontmatter.heroImage}
        heroImageAlt={frontmatter.heroImageAlt}
        pageTitle={frontmatter.heroTitle}
        subtitle={frontmatter.heroSubtitle}
        textColor="light"
      />

      {/* Intro Text */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-8 text-center">
          {frontmatter.introText.map((paragraph, index) => (
            <p
              key={index}
              className={`text-xl md:text-2xl ${index < frontmatter.introText.length - 1 ? 'mb-6' : ''}`}
              style={{
                fontFamily: '"Majesti Banner", serif',
                color: '#1C1C1C',
                fontWeight: 300,
                lineHeight: 1.5
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Content Sections — alternating image/text layout */}
      {frontmatter.sections.map((section, index) => {
        const imageFirst = index % 2 === 0

        return (
          <section key={index} className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                {/* Image Column */}
                <div className={`flex justify-center items-center h-full ${imageFirst ? 'order-1 lg:order-2' : 'order-1 lg:order-1'}`}>
                  <Image
                    src={section.imagePath}
                    alt={section.imageAlt}
                    width={500}
                    height={600}
                    className="object-contain max-h-full"
                  />
                </div>
                {/* Text Column */}
                <div className={`space-y-6 flex flex-col justify-center ${imageFirst ? 'order-2 lg:order-1' : 'order-2 lg:order-2'}`}>
                  <div>
                    <h2
                      className="text-3xl md:text-4xl font-light mb-8"
                      style={{
                        fontFamily: '"Majesti Banner", serif',
                        color: '#1C1C1C',
                        fontWeight: 300
                      }}
                    >
                      {section.title}
                    </h2>
                  </div>
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className={itemIndex < section.items.length - 1 ? "mb-6" : ""}>
                      {item.title && (
                        <h3
                          className="text-2xl font-light mb-4"
                          style={{ fontFamily: '"Majesti Banner", serif', color: '#1C1C1C', fontWeight: 300 }}
                        >
                          {item.title}
                        </h3>
                      )}
                      <p
                        className="text-lg [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:opacity-70 [&_a]:transition-opacity"
                        style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 300 }}
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
                    </div>
                  ))}

                  {/* Hidden text — always in DOM for SEO, visually revealed on click */}
                  {section.hiddenText && (
                    <>
                      <button
                        onClick={() => toggleSection(index)}
                        className="text-sm mt-4 underline underline-offset-4"
                        style={{
                          fontFamily: '"Hanken Grotesk", sans-serif',
                          color: '#888',
                          fontWeight: 400,
                          cursor: 'pointer',
                          background: 'none',
                          border: 'none',
                          padding: 0
                        }}
                      >
                        {openSections[index] ? 'Read less' : 'Read more'}
                      </button>
                      <div
                        style={{
                          maxHeight: openSections[index] ? '2000px' : '0',
                          overflow: 'hidden',
                          opacity: openSections[index] ? 1 : 0,
                          transition: 'max-height 500ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms ease'
                        }}
                      >
                        <h4
                          className="text-xl font-light mt-6 mb-4"
                          style={{ fontFamily: '"Majesti Banner", serif', color: '#1C1C1C', fontWeight: 300 }}
                        >
                          {section.hiddenText.title}
                        </h4>
                        <p
                          className="text-base"
                          style={{
                            fontFamily: '"Hanken Grotesk", sans-serif',
                            color: '#444',
                            fontWeight: 300,
                            lineHeight: 1.7
                          }}
                        >
                          <span dangerouslySetInnerHTML={{ __html: section.hiddenText.text }} />
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* Closing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2
            className="text-3xl md:text-4xl font-light mb-8"
            style={{
              fontFamily: '"Majesti Banner", serif',
              color: '#1C1C1C',
              fontWeight: 300
            }}
          >
            {frontmatter.closingTitle}
          </h2>
          {frontmatter.closingText.map((paragraph, index) => (
            <p
              key={index}
              className={`text-xl md:text-2xl [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:opacity-70 [&_a]:transition-opacity ${index < frontmatter.closingText.length - 1 ? 'mb-6' : ''}`}
              style={{
                fontFamily: '"Majesti Banner", serif',
                color: '#1C1C1C',
                fontWeight: 300,
                lineHeight: 1.5
              }}
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="mt-24" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="flex flex-col md:flex-row items-center md:items-stretch">
          {/* Image Side — auto width based on image */}
          <div className="w-full md:w-auto md:flex-shrink-0 md:ml-[3vw]">
            <Image
              src={frontmatter.testimonial.imagePath}
              alt={frontmatter.testimonial.imageAlt}
              width={400}
              height={500}
              className="w-full md:w-auto md:max-h-[800px] object-contain"
            />
          </div>

          {/* Quote Side — fills remaining space, text centered within */}
          <div
            className="flex-1 flex items-center justify-center p-8 md:p-12"
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
                &ldquo;{frontmatter.testimonial.quote}&rdquo;
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
                &mdash; {frontmatter.testimonial.author}
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
  const filePath = path.join(process.cwd(), 'content', 'how-to-prepare.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  return { props: { frontmatter: data, content } }
}
