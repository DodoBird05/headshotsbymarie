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
    faqTitle: string
    faq: {
      question: string
      answer: string
    }[]
  }
  content: string
}

export default function PersonalBrandingPage({ frontmatter, content }: PersonalBrandingProps) {
  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
        <link rel="canonical" href="https://headshotsbymarie.com/personal-branding" />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description} />
        <meta property="og:image" content={`https://headshotsbymarie.com${frontmatter.heroImage}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://headshotsbymarie.com/personal-branding" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Headshots by Marie" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta name="twitter:description" content={frontmatter.description} />
        <meta name="twitter:image" content={`https://headshotsbymarie.com${frontmatter.heroImage}`} />
      </Head>
      
      {/* Navbar */}
      <StickyNavigation bookLink="/pricing" lightBackground />
      
      {/* Hero Section */}
      <ServiceHero
        heroImage={frontmatter.heroImage}
        heroImageAlt={frontmatter.heroImageAlt}
        pageTitle="PERSONAL BRANDING PHOTOGRAPHY"
        subtitle="Phoenix Professional Headshots"
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