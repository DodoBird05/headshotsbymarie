import Layout from '@/components/Layout'
import AnimatedFAQ from '@/components/AnimatedFAQ'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Where is the headshot studio in Gilbert?",
      "acceptedAnswer": { "@type": "Answer", "text": "The studio is at 880 W Kroll Ave, Gilbert, AZ (near Copper and Guadalupe). On-location sessions are also available anywhere across the Phoenix metro area." }
    },
    {
      "@type": "Question",
      "name": "Are there pets in the photography studio?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, two dogs live in the house. Let the photographer know ahead of time if you have allergies." }
    },
    {
      "@type": "Question",
      "name": "Where do I park for my headshot session?",
      "acceptedAnswer": { "@type": "Answer", "text": "Easy street parking right in front of the studio. No meters, no time limits." }
    },
    {
      "@type": "Question",
      "name": "How long is a headshot session?",
      "acceptedAnswer": { "@type": "Answer", "text": "Sessions average about 60 minutes. If you're short on time, let the photographer know and she will have everything ready." }
    },
    {
      "@type": "Question",
      "name": "What is the cancellation policy for headshot sessions?",
      "acceptedAnswer": { "@type": "Answer", "text": "Cancellation: $50. Rescheduling is free as long as you give at least 24 hours notice." }
    }
  ]
}

export default function BookPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Load Acuity Scheduling script
    const script = document.createElement('script')
    script.src = 'https://embed.acuityscheduling.com/js/embed.js'
    script.type = 'text/javascript'
    document.head.appendChild(script)

    return () => {
      // Cleanup script when component unmounts
      document.head.removeChild(script)
    }
  }, [])

  return (
    <Layout title="Book Your Headshot Session | Gilbert & Phoenix Metro" description="Schedule your professional headshot session. Studio in Gilbert, AZ or on-location across the Phoenix metro area." canonicalPath="/book" ogImage="/images/Hero/Professional-Portraits-Phoenix-Hero-By-Marie-Feutrier.webp">
      <Head>
        <meta name="robots" content="noindex, follow" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${isScrolled ? 'py-2 px-8 shadow-md' : 'py-8 px-8'}`}>
        <div className={`flex items-center ${isScrolled ? 'justify-end gap-4' : 'justify-end gap-4 md:gap-8'} w-full transition-all duration-300`}>
          {isScrolled ? (
            <>
              {/* Small Square Logo */}
              <div className="flex-shrink-0">
                <Link href="/">
                  <Image
                    src="/Logo/Headshots By Marie-Logo-square-White.svg"
                    alt="Headshots by Marie - Professional headshot photography Phoenix Arizona"
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
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
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
                    src="/Logo/Headshots By Marie Logo-Square.svg"
                    alt="Headshots by Marie - Professional headshot photography Phoenix Arizona"
                    width={80}
                    height={80}
                    className="h-20 w-20 md:hidden cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </Link>
                <Link href="/">
                  <Image
                    src="/Logo/Headshots-by-Marie-Rectangle.svg"
                    alt="Headshots by Marie - Professional headshot photography Phoenix Arizona"
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
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              
              {/* Desktop Navigation Menu */}
              <nav className="hidden md:flex md:flex-col md:space-y-2">
                <Link 
                  href="/about/" 
                  className="text-black font-light text-lg hover:opacity-80 transition-opacity"
                  style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
                >
                  About
                </Link>
                <Link 
                  href="/pricing/" 
                  className="text-black font-light text-lg hover:opacity-80 transition-opacity"
                  style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
                >
                  Pricing
                </Link>
                <Link 
                  href="/contact/" 
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
                aria-label="Close menu"
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
                href="/about/" 
                className="text-black font-light text-2xl hover:opacity-80 transition-opacity"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/pricing/" 
                className="text-black font-light text-2xl hover:opacity-80 transition-opacity"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="/contact/" 
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
      
      {/* Main Content */}
      <div className="pt-48 px-8 pb-16">
          <h1 
            className="text-6xl font-light mb-8 text-left"
            style={{ fontFamily: '"Majesti Banner", serif', color: '#1C1C1C', fontWeight: 300 }}
          >
            Book Your Session
          </h1>
          
          <p 
            className="text-xl font-light mb-8 text-left max-w-2xl"
            style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#666', fontWeight: 300 }}
          >
            Pick your session type below to see my calendar and choose a date.<br />
            I only take a few sessions a day, so each one gets my full attention.
          </p>
          
          {/* Design Line */}
          <div className="max-w-2xl w-full h-px bg-gray-400 mb-12"></div>
          
          {/* Acuity Scheduler Embed */}
          <div className="w-full">
            <iframe 
              src="https://app.acuityscheduling.com/schedule.php?owner=20441074" 
              title="Schedule Appointment" 
              width="100%" 
              height="800" 
              frameBorder="0"
              className="border-0"
            ></iframe>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 max-w-3xl">
            <h2
              className="text-4xl font-light mb-8 text-left"
              style={{ fontFamily: '"Majesti Banner", serif', color: '#1C1C1C', fontWeight: 300 }}
            >
              Before You Visit
            </h2>
          </div>
          <AnimatedFAQ
            items={[
              {
                question: "Where is the studio?",
                answer: "The studio is at 880 W Kroll Ave, Gilbert, AZ (near Copper and Guadalupe). I also shoot on-location anywhere across the Phoenix metro area.",
                fromLeft: true
              },
              {
                question: "Are there pets in the studio?",
                answer: "Two dogs live in the house but they stay upstairs during sessions, so you won't see them. That said, there may be some pet hair around that I can't 100% eliminate. If you have severe allergies, just let me know when you book.",
                fromLeft: false
              },
              {
                question: "Where do I park?",
                answer: "Easy street parking right in front of the studio. No meters, no time limits.",
                fromLeft: true
              },
              {
                question: "What should I wear?",
                answer: "I'll send you a preparation guide before your session, including wardrobe tips for men and women. The short version: solid colors, layers, and bring options.",
                fromLeft: false
              },
              {
                question: "How long is a session?",
                answer: "Sessions average about 60 minutes. If you're short on time, let me know when you book and I'll have everything ready so we can make the most of it.",
                fromLeft: true
              },
              {
                question: "The available time doesn't work for me. Can you adjust?",
                answer: "I only book three sessions per day, so I have flexibility. If you need a time about an hour before or after what's showing, send me a message and I'll adjust the schedule for you.",
                fromLeft: false
              },
              {
                question: "What time should I arrive?",
                answer: "Right on time is perfect. I'll have the studio set up and ready for you.",
                fromLeft: true
              },
              {
                question: "What is the cancellation policy?",
                answer: "Cancellation: $50. Rescheduling is free as long as you let me know at least 24 hours in advance.",
                fromLeft: false
              }
            ]}
            theme="light"
          />

      </div>
    </Layout>
  )
}