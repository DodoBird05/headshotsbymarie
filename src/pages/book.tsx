import Layout from '@/components/Layout'
import AnimatedFAQ from '@/components/AnimatedFAQ'
import StickyNavigation from '@/components/StickyNavigation'
import Head from 'next/head'
import { useEffect } from 'react'
import Link from 'next/link'

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

// Page surface for /book/.
//
// This value is COUPLED TO AN EXTERNAL SETTING: the Acuity scheduler is a
// cross-origin iframe, so its background is set inside Acuity's own appearance
// settings and no CSS here can reach it. Marie has set that to #F5F0EB, the
// site's warm white, so this must stay in step or the widget renders as a
// mismatched panel floating on the page. Changing this means changing Acuity too.
const BOOKING_BG = '#F5F0EB'

export default function BookPage() {
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