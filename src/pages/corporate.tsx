import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Footer from '@/components/Footer'
import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react'
import ImageScrollCarousel from '@/components/ImageScrollCarousel'

interface CorporateProps {
  frontmatter: {
    title: string
    description: string
  }
  content: string
}

export default function CorporatePage({ frontmatter, content }: CorporateProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [heroLoaded, setHeroLoaded] = useState(false)
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqData = [
    {
      question: "What's included in a corporate photography session?",
      answer: "Our corporate sessions include team photos, individual executive portraits, environmental shots around your office, and various groupings to meet all your company's needs. We work efficiently to minimize disruption to your business day."
    },
    {
      question: "How long does a corporate photography session take?",
      answer: "Sessions typically range from 2-4 hours depending on the number of employees and types of shots needed. We plan everything in advance to maximize efficiency and ensure we capture all required images."
    },
    {
      question: "Can you photograph at our office location?",
      answer: "Absolutely! We bring professional lighting equipment to your location and can work in conference rooms, offices, or outdoor areas around your building to create variety in your corporate image library."
    },
    {
      question: "What should our team wear for corporate photos?",
      answer: "We recommend business attire that aligns with your company culture. Solid colors work best, and we suggest avoiding busy patterns. We'll provide a detailed preparation guide once you book to ensure everyone looks their best."
    },
    {
      question: "How do we coordinate a large team photo session?",
      answer: "We handle all the logistics! We'll work with your team to create a schedule, set up a efficient workflow, and ensure every employee gets the photos they need with minimal time away from work."
    }
  ]

  const carouselImages = [
    {
      src: "/images/Corporate/Corporate-Headshot-Northrim-Horizon-Team-By-Marie-Feutrier.webp",
      alt: "NorthrimHorizon corporate team photography Phoenix Arizona business professionals",
      width: 400,
      height: 600
    },
    {
      src: "/images/Corporate/Corporate-Headshot-of-Kaeko-By-Marie-Feutrier.webp",
      alt: "Kaeko corporate headshots Phoenix Arizona professional business portraits",
      width: 400,
      height: 600
    },
    {
      src: "/images/Corporate/Corporate-Headshot-Old-Castle-Team-Member-By-Marie-Feutrier.webp",
      alt: "OldCastle corporate headshots Phoenix Arizona professional business team",
      width: 400,
      height: 600
    },
    {
      src: "/images/Corporate/Corporate-Headshot-8G-Solutions-Team-Member-By-Marie-Feutrier.webp",
      alt: "8G Solutions corporate team photography Phoenix Arizona business professionals",
      width: 400,
      height: 600
    },
    {
      src: "/images/Corporate/Corporate-Team-Photography-Wyatt-Aerospace-Executives-By-Marie-Feutrier.webp",
      alt: "Wyatt Aerospace executive team corporate photography Phoenix Arizona business professionals",
      width: 400,
      height: 600
    },
    {
      src: "/images/Corporate/Corporate-Headshot-Republic-Services-Team-By-Marie-Feutrier.webp",
      alt: "Republic Services corporate photography business team Phoenix Arizona",
      width: 400,
      height: 600
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Trigger hero animation after component mounts
    const timer = setTimeout(() => {
      setHeroLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500&family=Gilda+Display&display=swap" rel="stylesheet" />
      </Head>
      
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2 px-8 shadow-md bg-white' : 'py-8 px-8'}`}>
        <div className={`flex items-center ${isScrolled ? 'justify-end gap-4' : 'justify-end gap-4 md:gap-8'} w-full transition-all duration-300`}>
          {isScrolled ? (
            <>
              {/* Small Square Logo */}
              <div className="flex-shrink-0">
                <Link href="/">
                  <Image
                    src="/Logo/Portraits By Marie-Logo-square-White.svg"
                    alt="Portraits by Marie - Professional portrait photography Phoenix Arizona"
                    width={32}
                    height={32}
                    className="h-8 w-8 cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ filter: 'invert(1)' }}
                  />
                </Link>
              </div>
              
              {/* Hamburger Menu */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-black p-2"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </>
          ) : (
            <>
              {/* Logo - Square for mobile, Rectangle for desktop */}
              <div className="flex-shrink-0">
                <Link href="/">
                  <Image
                    src="/Logo/Portraits By Marie Logo-Square.svg"
                    alt="Portraits by Marie - Professional portrait photography Phoenix Arizona"
                    width={80}
                    height={80}
                    className="h-20 w-20 md:hidden cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </Link>
                <Link href="/">
                  <Image
                    src="/Logo/Portraits-by-Marie-Logo-Rectangle-Black.svg"
                    alt="Portraits by Marie - Professional portrait photography Phoenix Arizona"
                    width={240}
                    height={96}
                    className="hidden md:block h-24 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </Link>
              </div>
              
              {/* Mobile Hamburger Menu */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-black p-2"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              
              {/* Desktop Navigation Menu */}
              <nav className="hidden md:flex md:flex-col md:space-y-2">
                <Link 
                  href="/pricing" 
                  className="text-black font-light text-lg hover:opacity-80 transition-opacity"
                  style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
                >
                  Pricing
                </Link>
                <Link 
                  href="/about" 
                  className="text-black font-light text-lg hover:opacity-80 transition-opacity"
                  style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
                >
                  About
                </Link>
                <Link 
                  href="/contact" 
                  className="text-black font-light text-lg hover:opacity-80 transition-opacity"
                  style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
                >
                  Contact
                </Link>
              </nav>
            </>
          )}
        </div>
        
        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col">
            {/* Close button at the top */}
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-black p-2"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* Navigation Menu */}
            <nav className="flex flex-col items-center justify-center flex-1 space-y-8">
              <Link 
                href="/" 
                className="text-black font-light text-2xl hover:opacity-80 transition-opacity"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="text-black font-light text-2xl hover:opacity-80 transition-opacity"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/pricing" 
                className="text-black font-light text-2xl hover:opacity-80 transition-opacity"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="/contact" 
                className="text-black font-light text-2xl hover:opacity-80 transition-opacity"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </nav>
      
      {/* Hero Section with Sliding Animation */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Hero Image with Sliding Animation */}
        <div 
          className={`absolute inset-0 w-full h-full transition-transform duration-1000 ease-out ${
            heroLoaded ? 'transform translate-y-0' : 'transform translate-y-full'
          }`}
        >
          <Image
            src="/images/Hero/Corporate-Team-Photography-Phoenix-Hero-By-Marie-Feutrier.webp"
            alt="Corporate team photography Phoenix Arizona business professionals group photo"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Content Overlay - Left Aligned like Home Page */}
        <div className="relative z-10 h-full flex">
          {/* Desktop: 3 Column Layout matching home page */}
          <div className="hidden md:grid md:grid-cols-3 md:gap-8 md:min-h-screen md:w-full px-8">
            {/* First Column - Title */}
            <div className="text-left space-y-4 flex flex-col justify-center">
              <div 
                className="text-6xl font-light text-white" 
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: 'white', fontWeight: 300 }}
              >
                Corporate Teams
              </div>
            </div>
            
            {/* Middle Column - Empty */}
            <div></div>
            
            {/* Third Column - Tagline bottom left */}
            <div className="flex flex-col justify-end items-start pb-16">
              <div className="text-left">
                <h1 className="text-lg font-light text-white mb-2" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: 'white', fontWeight: 300 }}>
                  Corporate Team Photography | Phoenix, Arizona
                </h1>
                <div className="text-4xl font-light text-white" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: 'white', fontWeight: 300 }}>
                  Professional imagery that builds trust
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: Centered Stacked Layout */}
          <div className="md:hidden flex flex-col justify-between min-h-screen w-full py-20 px-8">
            {/* Mobile Title - Left Aligned */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="text-4xl font-light text-white text-left mb-4" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: 'white', fontWeight: 300 }}>
                Corporate Teams
              </div>
            </div>
            
            {/* Mobile Tagline - At Bottom */}
            <div className="text-left pb-8">
              <h1 className="text-sm font-light text-white mb-2" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: 'white', fontWeight: 300 }}>
                Corporate Team Photography | Phoenix, Arizona
              </h1>
              <div className="text-xl font-light text-white" style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: 'white', fontWeight: 300 }}>
                Professional imagery that builds trust
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Image Scroll Carousel Section */}
      <ImageScrollCarousel
        images={carouselImages}
        containerHeight="50vh"
        backgroundColor="bg-white"
        imageHeight="h-96"
        imageWidth="w-96"
        gap="gap-8"
        scrollSpeed={30}
        animationDirection="left"
        shadow="shadow-lg"
        borderRadius="rounded-none"
        enableImageHover={true}
        hoverScale={1.05}
      />

      {/* First Service Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Left Column - Text Content */}
            <div className="space-y-6 flex flex-col justify-center">
              <div>
                <h2 
                  className="text-3xl md:text-4xl font-light mb-8"
                  style={{ 
                    fontFamily: '"Majesti Banner", serif', 
                    color: '#1C1C1C', 
                    fontWeight: 300 
                  }}
                >
                  Strengthen Your Company's Professional Image
                </h2>
              </div>
              <h3 
                className="text-2xl font-light mb-4"
                style={{ fontFamily: '"Majesti Banner", serif', color: '#1C1C1C', fontWeight: 300 }}
              >
                Team & Group Photography
              </h3>
              <p
                className="text-lg mb-6"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 300 }}
              >
                Looking for high-quality corporate headshots that reflect your company's professionalism? I provide stress-free, on-site business photography for teams of all sizes across the Phoenix Valley.
              </p>

              {/* Pricing Buttons */}
              <div className="mt-8 flex gap-4">
                <Link
                  href="/pricing"
                  className="inline-block border-2 border-black text-black text-lg font-medium hover:bg-black hover:text-white transition-all duration-300 px-8 py-3"
                  style={{
                    fontFamily: '"Hanken Grotesk", sans-serif'
                  }}
                >
                  Individual Price
                </Link>
                <Link
                  href="/contact"
                  className="inline-block border-2 border-black text-black text-lg font-medium hover:bg-black hover:text-white transition-all duration-300 px-8 py-3"
                  style={{
                    fontFamily: '"Hanken Grotesk", sans-serif'
                  }}
                >
                  Group Price
                </Link>
              </div>
            </div>
            {/* Right Column - Image */}
            <div className="flex justify-center items-center h-full">
              <Image
                src="/images/Home page Carousel/Corporate-Team-Photography-Phoenix-By-Marie-Feutrier.webp"
                alt="Corporate team photography group business professionals Phoenix Arizona studio"
                width={500}
                height={600}
                className="object-contain max-h-full"
              />
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
                src="/images/Corporate/LinkedIn-Profile-Headshot-of-Rupesh-By-Marie-Feutrier.png"
                alt="LinkedIn profile banner with professional headshot"
                width={600}
                height={200}
                className="object-contain w-full shadow-lg"
              />
            </div>
            {/* Right Column - Text Content */}
            <div className="space-y-6 flex flex-col justify-center lg:order-2">
              <h3
                className="text-2xl font-light mb-4"
                style={{ fontFamily: '"Majesti Banner", serif', color: '#1C1C1C', fontWeight: 300 }}
              >
                Company-Wide Photography Sessions
              </h3>

              <p
                className="text-lg font-medium mb-3"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 500 }}
              >
                Perfect for:
              </p>
              <ul
                className="list-disc pl-6 space-y-2 mb-8 text-lg"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C', fontWeight: 300 }}
              >
                <li>LinkedIn Profile Picture</li>
                <li>LinkedIn Banners</li>
                <li>Company websites</li>
                <li>Email signatures</li>
                <li>PR materials</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
          {/* Image Side */}
          <div className="relative">
            <Image
              src="/images/Corporate/Corporate-Headshot-of-Gina-By-Marie-Feutrier.webp"
              alt="Gina corporate client testimonial professional headshot Phoenix Arizona photographer"
              fill
              className="object-cover"
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
                "I have been going to the studio for the past two years for all my employee headshots. She makes everyone feel very welcome and comfortable."
              </blockquote>

              {/* Client Name */}
              <cite
                className="text-base font-medium not-italic"
                style={{ fontFamily: '"Majesti Banner", serif', color: '#1C1C1C', fontWeight: 'bold' }}
              >
                — Gina
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mt-24 px-8">
        <h2 className="text-4xl font-light mb-12 text-center" style={{ fontFamily: '"Majesti Banner", serif', color: '#1C1C1C', fontWeight: 300 }}>
          Frequently Asked Questions
        </h2>
        
        <div className="max-w-4xl mx-auto w-2/3">
          {/* Top divider line */}
          <div 
            className="w-full h-px mb-4"
            style={{ backgroundColor: '#E5E5E5' }}
          />
          
          {faqData.map((faq, index) => (
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
    </>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content', 'corporate.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  return { props: { frontmatter: data, content } }
}