import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import Image from 'next/image'
import Head from 'next/head'
import Footer from '@/components/Footer'
import MobileBottomNav from '@/components/MobileBottomNav'
import StickyNavigation from '@/components/StickyNavigation'
import ServiceHero from '@/components/ServiceHero'
import StickyTextToPhotos from '@/components/StickyTextToPhotos'
import AnimatedFAQ from '@/components/AnimatedFAQ'
import { generateServiceSchema } from '@/lib/seoConfig'

interface PersonalBrandingProps {
  frontmatter: {
    title: string
    description: string
    heroTitle: string
    heroSubtitle: string
    heroImage: string
    heroImageAlt: string
    stickyTextToPhotos: {
      text: string
      images: {
        src: string
        alt: string
        className?: string
      }[]
    }
    serviceSection1: {
      title: string
      services: {
        title: string
        description: string
      }[]
      imagePath: string
      imageAlt: string
    }
    serviceSection2: {
      services: {
        title: string
        description: string
      }[]
      imagePath: string
      imageAlt: string
    }
    testimonial: {
      text: string
      quote: string
      author: string
      imagePath: string
      imageAlt: string
    }
    usageSplit?: {
      title: string
      image: string
      imageAlt: string
      paragraph: string
    }
    prepGrid?: {
      title: string
      paragraphs: string[]
    }
    locationStory?: {
      title: string
      image: string
      imageAlt: string
      paragraph: string
    }
    faqTitle: string
    faq: {
      question: string
      answer: string
    }[]
  }
  content: string
}

export default function PersonalBrandingPage({ frontmatter }: PersonalBrandingProps) {
  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
        <link rel="canonical" href="https://headshotsbymarie.com/personal-branding/" />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description} />
        <meta property="og:image" content={`https://headshotsbymarie.com${frontmatter.heroImage}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://headshotsbymarie.com/personal-branding/" />
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
              name: 'Personal Branding Photography',
              description: frontmatter.description,
              url: '/personal-branding/',
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
      </Head>
      
      {/* Navbar */}
      <StickyNavigation bookLink="/pricing" lightBackground />
      
      {/* Hero Section */}
      <ServiceHero
        heroImage={frontmatter.heroImage}
        heroImageAlt={frontmatter.heroImageAlt}
        pageTitle="PERSONAL BRANDING PHOTOGRAPHY"
        subtitle="Studio and On-Location, Phoenix Metro"
        textColor="dark"
      />

      {/* Sticky Text to Photos Section */}
      <StickyTextToPhotos
        text={frontmatter.stickyTextToPhotos.text}
        images={frontmatter.stickyTextToPhotos.images}
      />

      {/* First Service Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-center">
            <div className="flex justify-center order-1 lg:order-1">
              <Image
                src={frontmatter.serviceSection1.imagePath}
                alt={frontmatter.serviceSection1.imageAlt}
                width={600}
                height={900}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="space-y-6 order-2 lg:order-2">
              <h2
                className="text-3xl md:text-4xl font-light mb-8"
                style={{
                  fontFamily: '"Majesti Banner", serif',
                  color: '#1C1C1C',
                  fontWeight: 300,
                  textTransform: 'uppercase'
                }}
              >
                {frontmatter.serviceSection1.title}
              </h2>

              <div className="space-y-8">
                {frontmatter.serviceSection1.services.map((service, index) => (
                  <div key={index}>
                    <h3
                      className="text-xl font-medium mb-3"
                      style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 500, textTransform: 'uppercase' }}
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Second Service Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <div className="space-y-8">
                {frontmatter.serviceSection2.services.map((service, index) => (
                  <div key={index}>
                    <h3
                      className="text-xl font-medium mb-3"
                      style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 500, textTransform: 'uppercase' }}
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
              </div>
            </div>
            <div className="flex justify-center order-1 lg:order-2">
              <Image
                src={frontmatter.serviceSection2.imagePath}
                alt={frontmatter.serviceSection2.imageAlt}
                width={600}
                height={900}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 md:min-h-[500px]">
          {/* Image Side */}
          <div className="relative aspect-[4/5] md:aspect-auto">
            <Image
              src={frontmatter.testimonial.imagePath}
              alt={frontmatter.testimonial.imageAlt}
              fill
              className="object-cover object-top"
            />
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
                "{frontmatter.testimonial.quote}"
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

      {/* Prep Grid Section: title on left, four paragraphs on the right */}
      {frontmatter.prepGrid && (
        <section className="py-20 md:py-28" style={{ backgroundColor: '#F5F0EB' }}>
          <div className="max-w-6xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-[35%_1fr] gap-12">
              <div data-reveal>
                <h2 style={{ fontFamily: '"Majesti Banner", serif', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 300, color: '#1C1C1C', textTransform: 'uppercase', letterSpacing: '0.03em', lineHeight: 1.1 }}>
                  {frontmatter.prepGrid.title}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-reveal data-reveal-delay="200">
                {frontmatter.prepGrid.paragraphs.map((p, i) => (
                  <div key={i}>
                    <p className="text-sm" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#555', fontWeight: 300, lineHeight: 1.7 }}>{p}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Usage Split Section: heading overlaps 60% image, short paragraph on the right */}
      {frontmatter.usageSplit && (
        <>
          {/* Desktop */}
          <section className="hidden md:block pt-24" style={{ backgroundColor: '#F5F0EB' }} />
          <section className="hidden md:flex relative" style={{ backgroundColor: '#F5F0EB' }}>
            <div className="absolute left-16 max-w-[50%]" style={{ zIndex: 5, top: '-2rem' }}>
              <h2 data-reveal style={{
                fontFamily: '"Majesti Banner", serif',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 300,
                color: '#1C1C1C',
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
                lineHeight: 1.1
              }}>
                {frontmatter.usageSplit.title}
              </h2>
            </div>
            <div className="w-[60%] shrink-0 overflow-hidden" data-reveal data-reveal-direction="left" style={{ aspectRatio: '16/10' }}>
              <img src={frontmatter.usageSplit.image} alt={frontmatter.usageSplit.imageAlt} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="flex items-center px-16" style={{ width: '40%' }}>
              <p data-reveal style={{
                fontFamily: '"Hanken Grotesk", sans-serif',
                fontSize: '0.9rem',
                fontWeight: 300,
                color: '#555',
                lineHeight: 1.7
              }}>
                {frontmatter.usageSplit.paragraph}
              </p>
            </div>
          </section>
          {/* Mobile: stacked */}
          <section className="md:hidden py-16 px-8" style={{ backgroundColor: '#F5F0EB' }}>
            <h2 className="mb-6" style={{
              fontFamily: '"Majesti Banner", serif',
              fontSize: 'clamp(1.8rem, 8vw, 2.5rem)',
              fontWeight: 300,
              color: '#1C1C1C',
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
              lineHeight: 1.1
            }}>
              {frontmatter.usageSplit.title}
            </h2>
            <picture>
              <source media="(max-width: 768px)" srcSet={frontmatter.usageSplit.image.replace(/\.webp$/, '-mobile.webp')} />
              <img src={frontmatter.usageSplit.image} alt={frontmatter.usageSplit.imageAlt} loading="lazy" className="w-full h-auto mb-6" style={{ borderRadius: '4px' }} />
            </picture>
            <p style={{ fontFamily: '"Hanken Grotesk", sans-serif', fontSize: '1rem', fontWeight: 300, color: '#555', lineHeight: 1.7 }}>
              {frontmatter.usageSplit.paragraph}
            </p>
          </section>
        </>
      )}

      {/* Location Story Section: studio + outdoor, before FAQ */}
      {frontmatter.locationStory && (
        <section className="py-20 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-8">
            <h2
              className="text-3xl md:text-4xl font-light mb-10 text-center"
              style={{
                fontFamily: '"Majesti Banner", serif',
                color: '#1C1C1C',
                fontWeight: 300,
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
                lineHeight: 1.1
              }}
            >
              {frontmatter.locationStory.title}
            </h2>
            <picture>
              <source media="(max-width: 768px)" srcSet={frontmatter.locationStory.image.replace(/\.webp$/, '-mobile.webp')} />
              <img
                src={frontmatter.locationStory.image}
                alt={frontmatter.locationStory.imageAlt}
                loading="lazy"
                className="w-full h-auto mb-10"
                style={{ borderRadius: '4px' }}
              />
            </picture>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#555', fontWeight: 300, lineHeight: 1.7 }}
            >
              {frontmatter.locationStory.paragraph}
            </p>
          </div>
        </section>
      )}

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
  const filePath = path.join(process.cwd(), 'content', 'personal-branding.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  return { props: { frontmatter: data, content } }
}