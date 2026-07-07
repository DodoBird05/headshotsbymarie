import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Footer from '@/components/Footer'
import MobileBottomNav from '@/components/MobileBottomNav'
import StickyNavigation from '@/components/StickyNavigation'
import AnimatedFAQ from '@/components/AnimatedFAQ'
import { getMobileSrc } from '@/lib/responsiveImage'
import { generateServiceSchema, generateBreadcrumbSchema, generateAggregateRating, seoConfig } from '@/lib/seoConfig'

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

interface TeamPhotographyProps {
  frontmatter: {
    title: string
    description: string
    heroTitle: string
    heroSubtitle: string
    heroImage: string
    heroImageAlt: string
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

const revealStyle: React.CSSProperties = {
  opacity: 0,
  transform: 'translateY(40px)',
  transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
}

export default function TeamPhotographyPage({ frontmatter }: TeamPhotographyProps) {
  const section1Ref = useScrollReveal()
  const section2Ref = useScrollReveal()
  const testimonialRef = useScrollReveal()
  const kaekoRef = useScrollReveal()
  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
        <link rel="canonical" href="https://headshotsbymarie.com/team-photography/" />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description} />
        <meta property="og:image" content={`https://headshotsbymarie.com${frontmatter.heroImage}`} />
        <meta property="og:image:width" content="760" />
        <meta property="og:image:height" content="760" />
        <meta property="og:url" content="https://headshotsbymarie.com/team-photography/" />
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
              url: '/team-photography/',
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
              { name: 'Team Photography', url: '/team-photography/' }
            ]))
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
              aggregateRating: generateAggregateRating('83'),
              review: [{
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
                }
              }]
            })
          }}
        />
      </Head>

      {/* Navbar */}
      <StickyNavigation bookLink="/pricing" lightBackground />

      {/* Hero — Split Layout */}
      <div className="pt-32 md:pt-40">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[60vh] md:min-h-[80vh]">
          {/* Left — Portrait Photo */}
          <div className="flex items-center justify-center">
            <picture>
              <source media="(max-width: 768px)" srcSet={getMobileSrc('/images/Corporate/Kedia-Law-Team-Photo-Art-Museum-Phoenix-By-Marie-Feutrier.webp')} />
              <img
                src="/images/Corporate/Kedia-Law-Team-Photo-Art-Museum-Phoenix-By-Marie-Feutrier.webp"
                alt="Kedia Law team portrait at the art museum Phoenix Arizona on-location team photography session by Marie Feutrier"
                className="w-full h-auto"
                loading="eager"
              />
            </picture>
          </div>

          {/* Right — Title */}
          <div
            className="flex flex-col justify-center px-8 md:px-16 py-12 md:py-0"
            style={{ backgroundColor: '#F5F5F5' }}
          >
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-light"
              style={{ fontFamily: '"Majesti Banner", serif', color: '#1C1C1C', fontWeight: 300, textTransform: 'uppercase', lineHeight: 1.1 }}
            >
              Team Photos<br />& Office<br />Headshots<br />Phoenix
            </h1>
            <p
              className="mt-6 text-lg"
              style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#666', fontWeight: 300 }}
            >
              On-location across Phoenix metro
            </p>
          </div>
        </div>
      </div>

      {/* Disambiguation Links */}
      <div className="bg-white px-8 py-6">
        <div className="max-w-6xl mx-auto">
          <p
            className="text-base"
            style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#888', fontWeight: 300 }}
          >
            Looking for{' '}
            <Link href="/corporate-headshots/" className="underline underline-offset-4 hover:text-black transition-colors">
              corporate headshots
            </Link>
            {' '}or{' '}
            <Link href="/executive-headshots/" className="underline underline-offset-4 hover:text-black transition-colors">
              executive headshots
            </Link>
            ?
          </p>
        </div>
      </div>

      {/* First Service Section */}
      <section ref={section1Ref} style={revealStyle} className="py-16 bg-white">
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
      <section ref={section2Ref} style={revealStyle} className="py-16 bg-white">
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
      <section ref={testimonialRef} style={revealStyle} className="mt-24">
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

      {/* Kaeko Team Section */}
      <section ref={kaekoRef} style={revealStyle} className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image — first on mobile, second on desktop */}
            <div className="flex justify-center order-1 lg:order-2">
              <picture>
                <source media="(max-width: 768px)" srcSet={getMobileSrc('/images/Corporate/Corporate-Headshot-of-Kaeko-By-Marie-Feutrier.webp')} />
                <img
                  src="/images/Corporate/Corporate-Headshot-of-Kaeko-By-Marie-Feutrier.webp"
                  alt="Kaeko team of 30 employees individual corporate headshots consistent backdrop and lighting Phoenix Arizona by Marie Feutrier"
                  width={800}
                  height={800}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </picture>
            </div>
            {/* Text — second on mobile, first on desktop */}
            <div className="space-y-6 flex flex-col justify-center order-2 lg:order-1">
              <h2
                className="text-3xl font-light mb-4"
                style={{ fontFamily: '"Majesti Banner", serif', color: '#1C1C1C', fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.05em' }}
              >
                Every Team Member, Same Standard
              </h2>
              <p
                className="text-lg"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 300, lineHeight: 1.8 }}
              >
                I come to your office and photograph every team member individually. Same lighting, same backdrop, same level of attention. Whether your team has 5 people or 50, each person gets hands-on coaching for a natural, confident expression. The result is a cohesive set of portraits that looks polished across your website, LinkedIn, and marketing materials.
              </p>
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
