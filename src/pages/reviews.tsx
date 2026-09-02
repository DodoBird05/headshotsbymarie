import Layout from '@/components/Layout'
import StickyNavigation from '@/components/StickyNavigation'
import Head from 'next/head'
import Link from 'next/link'

import { section1Reviews, section2Reviews, section3Reviews, allReviews, REVIEW_COUNT, REVIEW_COUNT_ROUNDED, type Review } from '@/lib/reviews'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'ProfessionalService'],
      '@id': 'https://headshotsbymarie.com/#business',
      name: 'Headshots by Marie',
      url: 'https://headshotsbymarie.com',
      telephone: '+1-480-524-0741',
      email: 'marie@headshotsbymarie.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '880 W Kroll Ave',
        addressLocality: 'Gilbert',
        addressRegion: 'AZ',
        postalCode: '85233',
        addressCountry: 'US'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: REVIEW_COUNT,
        bestRating: '5',
        worstRating: '1'
      },
      review: allReviews.map(r => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: r.author },
        reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
        reviewBody: r.text
      }))
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://headshotsbymarie.com' },
        { '@type': 'ListItem', position: 2, name: 'Reviews', item: 'https://headshotsbymarie.com/reviews/' }
      ]
    }
  ]
}

function ReviewBlock({ review }: { review: Review }) {
  const label = review.source === 'LinkedIn'
    ? ' (LinkedIn)'
    : review.note
      ? ` (${review.note})`
      : ''
  return (
    <blockquote style={{ margin: '0 0 28px 0', padding: '0 0 0 20px', borderLeft: '3px solid #e5e5e5' }}>
      <p style={{ fontWeight: 600, marginBottom: 4 }}>
        {review.author} {'⭐'.repeat(review.rating)}{label}
      </p>
      <p style={{ color: '#333', margin: 0 }}>{review.text}</p>
    </blockquote>
  )
}

export default function ReviewsPage() {
  return (
    <Layout
      title="Client Reviews | Headshots by Marie, Gilbert, Arizona"
      description={`${REVIEW_COUNT_ROUNDED} five-star reviews from real clients. See why professionals across Phoenix, Gilbert, Mesa, Chandler, Scottsdale, and Tempe trust Marie Feutrier for headshots, corporate photography, actor headshots, personal branding, and executive portraits.`}
      canonicalPath="/reviews"
      ogImage="/images/Hero/Professional-Portraits-Phoenix-Hero-By-Marie-Feutrier.webp"
    >
      <StickyNavigation lightBackground />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <article
        style={{
          maxWidth: 760,
          margin: '0 auto',
          padding: '120px 24px 80px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          color: '#1a1a1a',
          lineHeight: 1.7,
          backgroundColor: '#fff'
        }}
      >
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 16, lineHeight: 1.3 }}>
          Client Reviews: Headshots by Marie, Gilbert, Arizona
        </h1>

        <p style={{ fontSize: '1.05rem', marginBottom: 40, color: '#333' }}>
          Marie Feutrier is a portrait and headshot photographer based in Gilbert, Arizona, serving professionals across the Phoenix metro area including Mesa, Chandler, Scottsdale, and Tempe. With {REVIEW_COUNT_ROUNDED} five-star reviews and a 100% satisfaction rating, she specializes in professional headshots, corporate photography, actor headshots, personal branding, executive portraits, and team photography. Trained by Peter Hurley, Chris Buck, and Ivan Weiss, Marie works with Broncolor lighting and hand-painted canvas backdrops in her private Gilbert studio. Every session includes expression coaching, unlimited time, multiple outfit changes, and a relaxed, welcoming atmosphere.
        </p>

        <hr style={{ border: 'none', borderTop: '1px solid #e5e5e5', margin: '40px 0' }} />

        <section>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: 12 }}>
            professional headshots and branding
          </h2>
          <p style={{ marginBottom: 32, color: '#333' }}>
            Clients looking for professional headshots and personal branding photography consistently highlight Marie's expertise in lighting, positioning, and composition. Reviewers frequently describe her as consultative, noting that she takes time to understand each client's goals, brand vision, and desired outcome before the session begins. A recurring theme is that her attention to detail and technical knowledge produce results that exceed expectations, with multiple clients mentioning they plan to return for future sessions.
          </p>
          {section1Reviews.map((r, i) => <ReviewBlock key={`s1-${i}`} review={r} />)}
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid #e5e5e5', margin: '40px 0' }} />

        <section>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: 12 }}>
            camera-shy? you're in good hands
          </h2>
          <p style={{ marginBottom: 32, color: '#333' }}>
            Many of Marie's clients arrive nervous or uncomfortable in front of the camera. Some describe themselves as "running from cameras" or never having liked a photo of themselves. Across these reviews, a clear pattern emerges: clients who dreaded the experience leave saying it was actually fun. Reviewers credit Marie's warm personality, patient direction, and relaxed pace for helping them feel at ease. Several clients who have had studio sessions with other photographers over the years say Marie's results are the first they've ever been truly happy with.
          </p>
          {section2Reviews.map((r, i) => <ReviewBlock key={`s2-${i}`} review={r} />)}
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid #e5e5e5', margin: '40px 0' }} />

        <section>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: 12 }}>
            the session experience
          </h2>
          <p style={{ marginBottom: 32, color: '#333' }}>
            Beyond the final photos, clients consistently comment on the session itself. Common themes include feeling welcomed from the moment they arrive, never feeling rushed, and leaving with a new appreciation for the photography process. Several reviewers mention that time flew by during their session. Others highlight Marie's responsiveness and willingness to go above and beyond to ensure complete satisfaction, including accommodating additional requests after the session. First-time clients and returning clients alike note how easy and enjoyable the process was.
          </p>
          {section3Reviews.map((r, i) => <ReviewBlock key={`s3-${i}`} review={r} />)}
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid #e5e5e5', margin: '40px 0' }} />

        <section>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: 12 }}>
            about headshots by Marie
          </h2>
          <p style={{ marginBottom: 16, color: '#333' }}>
            Marie Feutrier is a professional headshot and portrait photographer serving Gilbert, Mesa, Chandler, Phoenix, Scottsdale, Tempe, and the greater Arizona metro area. Her private Gilbert studio offers Broncolor professional lighting, hand-painted canvas backdrops, and a relaxed atmosphere designed to bring out the best in every client. Sessions include expression coaching, wardrobe guidance, unlimited time, and multiple background and outfit options. Marie serves corporate professionals, executives, actors, entrepreneurs, real estate agents, doctors, lawyers, financial advisors, and anyone who wants a headshot that captures their authentic personality.
          </p>
          <p style={{ marginBottom: 16, color: '#333' }}>
            To book a session or learn more, visit{' '}
            <Link href="/" style={{ color: '#1a1a1a', textDecoration: 'underline' }}>
              headshotsbymarie.com
            </Link>.
          </p>
          <p style={{ color: '#333' }}>
            Read more reviews on{' '}
            <a
              href="https://www.google.com/maps/place/Headshots+by+Marie"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1a1a1a', textDecoration: 'underline' }}
            >
              Google
            </a>.
          </p>
        </section>
      </article>
    </Layout>
  )
}
