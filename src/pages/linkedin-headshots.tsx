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
import StickyTextToPhotos from '@/components/StickyTextToPhotos'
import AnimatedFAQ from '@/components/AnimatedFAQ'

interface ProfessionalHeadshotsProps {
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

export default function ProfessionalHeadshotsPage({ frontmatter, content }: ProfessionalHeadshotsProps) {
  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
        <link rel="canonical" href="https://headshotsbymarie.com/linkedin-headshots" />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description} />
        <meta property="og:image" content={`https://headshotsbymarie.com${frontmatter.heroImage}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://headshotsbymarie.com/linkedin-headshots" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Headshots by Marie" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta name="twitter:description" content={frontmatter.description} />
        <meta name="twitter:image" content={`https://headshotsbymarie.com${frontmatter.heroImage}`} />
      </Head>
      
      {/* Navbar */}
      <StickyNavigation bookLink="/pricing" />
      
      {/* Hero Section */}
      <ServiceHero
        heroImage={frontmatter.heroImage}
        heroImageAlt={frontmatter.heroImageAlt}
        pageTitle="LINKEDIN PROFILE PHOTOGRAPHY"
        subtitle="Phoenix Professional Headshots"
        textColor="light"
      />

      {/* Sticky Text to Photos Section */}
      <StickyTextToPhotos
        text={frontmatter.stickyTextToPhotos.text}
        images={frontmatter.stickyTextToPhotos.images}
      />

      {/* Custom styles for square photos on this page only */}
      <style jsx global>{`
        .sticky-photo.square-photo {
          aspect-ratio: 1 / 1 !important;
        }
      `}</style>

      {/* First Service Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Image Column - First on mobile, second on desktop */}
            <div className="flex justify-center items-center h-full order-1 lg:order-2">
              <Image
                src={frontmatter.serviceSection1.imagePath}
                alt={frontmatter.serviceSection1.imageAlt}
                width={500}
                height={600}
                className="object-contain max-h-full"
              />
            </div>
            {/* Text Column - Second on mobile, first on desktop */}
            <div className="space-y-6 flex flex-col justify-center order-2 lg:order-1">
              <div>
                <h2
                  className="text-3xl md:text-4xl font-light mb-8"
                  style={{
                    fontFamily: '"Majesti Banner", serif',
                    color: '#1C1C1C',
                    fontWeight: 300
                  }}
                >
{frontmatter.serviceSection1.title}
                </h2>
              </div>
{frontmatter.serviceSection1.services.map((service, index) => (
                <div key={index} className={index < frontmatter.serviceSection1.services.length - 1 ? "mb-6" : ""}>
                  <h3
                    className="text-2xl font-light mb-4"
                    style={{ fontFamily: '"Majesti Banner", serif', color: '#1C1C1C', fontWeight: 300 }}
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

              {/* Book Today Button */}
              <div className="mt-8">
                <Link
                  href="/pricing"
                  className="inline-block border-2 border-black text-black text-lg font-medium hover:bg-black hover:text-white transition-all duration-300 px-8 py-3"
                  style={{
                    fontFamily: '"Hanken Grotesk", sans-serif'
                  }}
                >
                  Book Today
                </Link>
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
              <Image
                src={frontmatter.serviceSection2.imagePath}
                alt={frontmatter.serviceSection2.imageAlt}
                width={500}
                height={600}
                className="object-contain max-h-full"
              />
            </div>
            {/* Right Column - Text Content */}
            <div className="space-y-6 flex flex-col justify-center lg:order-2">
{frontmatter.serviceSection2.services.map((service, index) => (
                <div key={index} className={index < frontmatter.serviceSection2.services.length - 1 ? "mb-6" : ""}>
                  <h3 
                    className="text-2xl font-light mb-4"
                    style={{ fontFamily: '"Majesti Banner", serif', color: '#1C1C1C', fontWeight: 300 }}
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
              
              {/* Book Today Button */}
              <div className="mt-8">
                <Link 
                  href="/pricing"
                  className="inline-block border-2 border-black text-black text-lg font-medium hover:bg-black hover:text-white transition-all duration-300 px-8 py-3"
                  style={{ 
                    fontFamily: '"Hanken Grotesk", sans-serif'
                  }}
                >
                  Book Today
                </Link>
              </div>
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
  const filePath = path.join(process.cwd(), 'content', 'linkedin-headshots.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  return { props: { frontmatter: data, content } }
}