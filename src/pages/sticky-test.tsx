import Head from 'next/head'
import Link from 'next/link'
import StickyImageWithText from '../components/StickyImageWithText'

export default function StickyTestPage() {
  return (
    <>
      <Head>
        <title>Sticky Split Test</title>
        <meta name="robots" content="noindex, nofollow" key="robots" />
      </Head>

      <StickyImageWithText
        background="#FFFFFF"
        textColor="#1C1C1C"
        images={[
          {
            src: '/images/Corporate/Business-Portrait-Tyler-Professional-Headshot-Phoenix-Arizona-By-Marie-Feutrier.webp',
            alt: 'Business portrait of professional man Phoenix Arizona corporate headshots',
            paragraphs: [
              "Your headshot is often the first thing a client, colleague, or recruiter sees: on LinkedIn, your company website, email signatures, speaker bios, and proposals. Whether you're an attorney, a financial advisor, a healthcare administrator, a tech founder, a real estate agent, or a consultant, a polished business portrait signals competence and credibility before you say a word.",
              "A session with professional studio lighting, multiple backdrops, and guided posing. Bring two to three outfits and we'll work through different looks so you leave with options for every platform. Every final image includes professional retouching: natural and polished, never airbrushed."
            ]
          },
          {
            src: '/images/Corporate/Business-Headshot-Gerod-Corporate-Portrait-Phoenix-Arizona-By-Marie-Feutrier.webp',
            alt: 'Business headshot of professional man polished corporate portrait Phoenix Arizona',
            title: 'Professional Headshots for the Phoenix Metro Area',
            paragraphs: [
              "I work with professionals across the Phoenix metro, from Gilbert and Chandler to Scottsdale, Tempe, and Phoenix itself. People drive to my studio because they want more than a quick photo. They want to work with someone who will guide them through every decision: what to wear, which background fits their brand, how to stand, where to look, what to do with their hands.",
              "You don't need to know any of that before you arrive. That's my job."
            ]
          }
        ]}
        stickyContent={
          <>
            <h2 style={{
              fontFamily: '"Majesti Banner", serif',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 300,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.03em',
              lineHeight: 0.95,
              color: '#1C1C1C',
              marginBottom: '2.5rem'
            }}>
              Business Portraits for Every Professional
            </h2>
            <Link
              href="/pricing"
              className="inline-block text-white text-lg font-medium hover:opacity-90 transition-all duration-300 px-8 py-3"
              style={{ fontFamily: '"Hanken Grotesk", sans-serif', backgroundColor: '#D4A843' }}
            >
              Book Today
            </Link>
          </>
        }
      />

      <div style={{ height: '100vh', background: '#1C1C1C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: '"Hanken Grotesk", sans-serif', fontSize: '1.5rem', color: '#666' }}>Content below</p>
      </div>
    </>
  )
}
