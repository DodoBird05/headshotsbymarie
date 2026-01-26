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
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import ImageScrollCarousel from '@/components/ImageScrollCarousel'
import StickyTextToPhotos from '@/components/StickyTextToPhotos'

interface ActorHeadshotsProps {
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
      }[]
    }
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

export default function ActorHeadshotsPage({ frontmatter, content }: ActorHeadshotsProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
      </Head>
      
      {/* Navbar */}
      <StickyNavigation bookLink="/pricing" lightBackground />
      
      {/* Hero Section */}
      <ServiceHero
        heroImage={frontmatter.heroImage}
        heroImageAlt={frontmatter.heroImageAlt}
        heroTitle={frontmatter.heroTitle}
        heroSubtitle={frontmatter.heroSubtitle}
        pageTitle={frontmatter.title}
        textColor="dark"
      />

      {/* Sticky Text to Photos Section */}
      <StickyTextToPhotos
        text={frontmatter.stickyTextToPhotos.text}
        images={frontmatter.stickyTextToPhotos.images}
      />

      {/* Actor Headshots Pricing Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Column - First on mobile, second on desktop */}
            <div className="flex justify-center order-1 lg:order-2">
              <Image
                src={frontmatter.services.imagePath}
                alt={frontmatter.services.imageAlt}
                width={500}
                height={600}
                className="object-cover"
              />
            </div>
            {/* Text Column - Second on mobile, first on desktop */}
            <div className="space-y-6 order-2 lg:order-1">
              <div>
                <h2
                  className="text-3xl md:text-4xl font-light mb-8"
                  style={{
                    fontFamily: '"Majesti Banner", serif',
                    color: '#1C1C1C',
                    fontWeight: 300
                  }}
                >
{frontmatter.services.title}
                </h2>
              </div>
{frontmatter.services.types.map((service, index) => (
                <div key={index} className={index < frontmatter.services.types.length - 1 ? "mb-6" : ""}>
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
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 md:min-h-[500px]">
          {/* Image Side */}
          <div className="relative h-[400px] md:h-auto">
            <Image
              src={frontmatter.testimonial.imagePath}
              alt={frontmatter.testimonial.imageAlt}
              fill
              className="object-contain md:object-cover"
            />
          </div>
          
          {/* Quote Side */}
          <div 
            className="flex items-center justify-center p-8 md:p-12 relative"
            style={{ backgroundColor: '#F5F5F5' }}
          >
            <div className="max-w-md text-center">
              {/* Testimonial Text */}
              <blockquote 
                className="text-lg leading-relaxed mb-6"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 400 }}
              >
"{frontmatter.testimonial.quote}"
              </blockquote>
              
              {/* Client Name */}
              <cite 
                className="text-base font-medium not-italic"
                style={{ fontFamily: '"Majesti Banner", serif', color: '#1C1C1C', fontWeight: 'bold' }}
              >
— {frontmatter.testimonial.author}
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mt-24 px-8">
        <h2 className="text-4xl font-light mb-12 text-center" style={{ fontFamily: '"Majesti Banner", serif', color: '#1C1C1C', fontWeight: 300 }}>
{frontmatter.faqTitle}
        </h2>
        
        <div className="max-w-4xl mx-auto w-2/3">
          {/* Top divider line */}
          <div 
            className="w-full h-px mb-4"
            style={{ backgroundColor: '#E5E5E5' }}
          />
          
          {frontmatter.faq.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left transition-all duration-200"
                style={{ 
                  backgroundColor: openFAQ === index ? '#1C1C1C' : '#F5F5F5',
                  color: openFAQ === index ? 'white' : '#1C1C1C'
                }}
              >
                <span className="text-lg font-normal" style={{ fontFamily: '"Hanken Grotesk", sans-serif' }}>
                  {faq.question}
                </span>
                {openFAQ === index ? (
                  <ChevronUp className="h-5 w-5 flex-shrink-0 ml-4" />
                ) : (
                  <ChevronDown className="h-5 w-5 flex-shrink-0 ml-4" />
                )}
              </button>
              
              {openFAQ === index && (
                <div 
                  className="p-6 border-l-4 transition-all duration-300"
                  style={{ backgroundColor: '#FAFAFA', borderColor: '#1C1C1C' }}
                >
                  <div 
                    className="text-base leading-relaxed whitespace-pre-line"
                    style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 300 }}
                  >
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Book Today Button - Center */}
        <div className="text-center mt-12 mb-16">
          <Link 
            href="/pricing"
            className="inline-block px-8 py-3 border-2 text-lg font-medium hover:bg-black hover:text-white transition-all duration-300"
            style={{ 
              fontFamily: '"Hanken Grotesk", sans-serif', 
              color: '#1C1C1C', 
              borderColor: '#1C1C1C' 
            }}
          >
            Book Today
          </Link>
        </div>
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
  const filePath = path.join(process.cwd(), 'content', 'actor-headshots.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  return { props: { frontmatter: data, content } }
}