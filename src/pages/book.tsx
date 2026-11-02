import Layout from '@/components/Layout'
import AnimatedFAQ from '@/components/AnimatedFAQ'
import StickyNavigation from '@/components/StickyNavigation'
import Head from 'next/head'
import { useEffect } from 'react'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'


// Page surface for /book/.
//
// This value is COUPLED TO AN EXTERNAL SETTING: the Acuity scheduler is a
// cross-origin iframe, so its background is set inside Acuity's own appearance
// settings and no CSS here can reach it. Marie has set that to #F5F0EB, the
// site's warm white, so this must stay in step or the widget renders as a
// mismatched panel floating on the page. Changing this means changing Acuity too.
const BOOKING_BG = '#F5F0EB'

type FaqItem = { question: string; answer: string }

export default function BookPage({ faq }: { faq: FaqItem[] }) {
  // Built from the same list as the visible FAQ, so Google never reads
  // different answers from the ones visitors see.
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer }
    }))
  }

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
      {/* Same navigation as every other page (phone top bar + desktop nav).
          /book/ used to carry its own older copy with its own menu. The floating
          "See how it works" CTA is hidden here: it points back to /pricing/. */}
      <StickyNavigation lightBackground hideFloatingCta />

      {/* Main Content
          BOOKING_BG is applied to the page surface so it matches the Acuity
          widget's own background. min-h-screen keeps the
          colour behind short content instead of letting the white body show. */}
      <div className="pt-24 md:pt-48 px-8 pb-16 min-h-screen" style={{ backgroundColor: BOOKING_BG }}>
          <h1 
            className="text-6xl font-light mb-8 text-left"
            style={{ fontFamily: '"Romie", serif', color: '#1C1C1C', fontWeight: 300 }}
          >
            Book Your Session
          </h1>
          
          <p 
            className="text-xl font-light mb-4 text-left max-w-2xl"
            style={{ fontFamily: '"Romie", serif', color: '#555', fontWeight: 300 }}
          >
            I only take a few sessions a day, so each one gets my full attention.<br />
            Choose a session type to see my calendar.
          </p>

          {/* On-location is not bookable through Acuity, so it needs a route out
              of this page. It used to be mentioned inside the scheduler's own
              description, where it read as an offer with no way to accept it. */}
          <p
            className="text-base font-light mb-8 text-left max-w-2xl"
            style={{ fontFamily: '"Romie", serif', color: '#555', fontWeight: 300 }}
          >
            On-location sessions aren&apos;t booked here.{' '}
            <Link href="/contact/" className="underline hover:opacity-70 transition-opacity" style={{ textUnderlineOffset: '3px' }}>
              Get in touch
            </Link>{' '}
            and we&apos;ll plan it together.
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
              style={{ fontFamily: '"Romie", serif', color: '#1C1C1C', fontWeight: 300 }}
            >
              Before You Visit
            </h2>
          </div>
          <AnimatedFAQ
            items={faq.map((item, i) => ({ ...item, fromLeft: i % 2 === 0 }))}
            theme="light"
          />

      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const fileContents = fs.readFileSync(path.join(process.cwd(), 'content', 'book.md'), 'utf8')
  const { data } = matter(fileContents)
  return { props: { faq: data.faq as FaqItem[] } }
}
