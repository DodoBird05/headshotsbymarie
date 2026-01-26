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

interface CorporateProps {
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

export default function CorporatePage({ frontmatter, content }: CorporateProps) {
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
      <StickyNavigation bookLink="/pricing" />
      
      {/* Hero Section */}
      <ServiceHero
        heroImage={frontmatter.heroImage}
        heroImageAlt={frontmatter.heroImageAlt}
        heroTitle={frontmatter.heroTitle}
        heroSubtitle={frontmatter.heroSubtitle}
        pageTitle={frontmatter.title}
        textColor="light"
      />

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
              <h3
                className="text-2xl font-light mb-4"
                style={{ fontFamily: '"Majesti Banner", serif', color: '#1C1C1C', fontWeight: 300 }}
              >
                {frontmatter.serviceSection1.title}
              </h3>

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
                  <li key={index}>{item}</li>
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
              <Image
                src={frontmatter.serviceSection2.imagePath}
                alt={frontmatter.serviceSection2.imageAlt}
                width={800}
                height={944}
                className="object-contain max-h-full"
              />
            </div>
            {/* Right Column - Text Content */}
            <div className="space-y-6 flex flex-col justify-center lg:order-2">
              <h3
                className="text-2xl font-light mb-4"
                style={{ fontFamily: '"Majesti Banner", serif', color: '#1C1C1C', fontWeight: 300 }}
              >
                {frontmatter.serviceSection2.title}
              </h3>

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
        
        {/* Pricing Buttons - Center */}
        <div className="text-center mt-12 mb-16 flex justify-center gap-4">
          <Link
            href="/pricing"
            className="inline-block px-8 py-3 border-2 text-lg font-medium hover:bg-black hover:text-white transition-all duration-300"
            style={{
              fontFamily: '"Hanken Grotesk", sans-serif',
              color: '#1C1C1C',
              borderColor: '#1C1C1C'
            }}
          >
            Individual Price
          </Link>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 border-2 text-lg font-medium hover:bg-black hover:text-white transition-all duration-300"
            style={{
              fontFamily: '"Hanken Grotesk", sans-serif',
              color: '#1C1C1C',
              borderColor: '#1C1C1C'
            }}
          >
            Group Price
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
      <MobileBottomNav />
    </>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content', 'corporate.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  return { props: { frontmatter: data, content } }
}