import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import Footer from '@/components/Footer'
import MobileBottomNav from '@/components/MobileBottomNav'
import StickyNavigation from '@/components/StickyNavigation'
import { generateServiceSchema } from '@/lib/seoConfig'

interface ContactProps {
  frontmatter: {
    title: string
    description: string
    heroImage: string
    heroImageAlt: string
    contactInfo: {
      email: string
      phone: string
    }
  }
  content: string
}

export default function ContactPage({ frontmatter, content }: ContactProps) {
  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="robots" content="noindex, follow" />
        <meta name="description" content={frontmatter.description} />
        <link rel="canonical" href="https://headshotsbymarie.com/contact/" />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description} />
        <meta property="og:image" content={`https://headshotsbymarie.com${frontmatter.heroImage}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://headshotsbymarie.com/contact/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Headshots by Marie" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta name="twitter:description" content={frontmatter.description} />
        <meta name="twitter:image" content={`https://headshotsbymarie.com${frontmatter.heroImage}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateServiceSchema({
              name: 'Contact Headshots by Marie',
              description: frontmatter.description,
              url: '/contact/',
              image: frontmatter.heroImage
            }))
          }}
        />
      </Head>

      {/* Navbar */}
      <StickyNavigation bookLink="/pricing" />

      <section className="relative h-screen w-full overflow-hidden">
        <Image
          src={frontmatter.heroImage}
          alt={frontmatter.heroImageAlt}
          fill
          className="object-cover"
          style={{ objectPosition: 'center top', transform: 'scaleX(-1)' }}
          priority
        />
      </section>

      {/* Contact Section */}
      <div className="py-20 px-4" style={{ background: 'linear-gradient(to right, #FAFAFA, #F5F5F5)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="space-y-8">
            <div>
              <h3
                className="text-xl font-semibold mb-3"
                style={{ fontFamily: '"Majesti Banner", serif', color: '#1C1C1C' }}
              >
                Email
              </h3>
              <p
                className="text-3xl font-bold"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
              >
                {frontmatter.contactInfo.email}
              </p>
            </div>
            <div>
              <h3
                className="text-xl font-semibold mb-3"
                style={{ fontFamily: '"Majesti Banner", serif', color: '#1C1C1C' }}
              >
                Phone
              </h3>
              <p
                className="text-3xl font-bold"
                style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
              >
                {frontmatter.contactInfo.phone}
              </p>
            </div>
            <div className="mt-12">
              <Link
                href="/pricing/"
                className="inline-block px-8 py-3 border-2 border-black rounded transition-all duration-200 hover:bg-black hover:text-white"
                style={{
                  fontFamily: '"Hanken Grotesk", sans-serif',
                  fontWeight: 700,
                  color: '#000',
                  textDecoration: 'none'
                }}
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Google Maps Embed */}
      <section className="py-20 px-4" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-light mb-4"
            style={{
              fontFamily: '"Majesti Banner", serif',
              color: '#1C1C1C',
              fontWeight: 300
            }}
          >
            Studio Location
          </h2>
          <p
            className="text-lg mb-8"
            style={{
              fontFamily: '"Hanken Grotesk", sans-serif',
              color: '#1C1C1C',
              fontWeight: 300,
              lineHeight: 1.7
            }}
          >
            880 W Kroll Ave, Gilbert, AZ — near Copper and Guadalupe, with free parking right outside.
          </p>
          <div style={{ borderRadius: '4px', overflow: 'hidden' }}>
            <iframe
              src="https://www.google.com/maps?q=Headshots+by+Marie,+880+W+Kroll+Ave,+Gilbert,+AZ&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Headshots by Marie studio location in Gilbert Arizona"
            />
          </div>
        </div>
      </section>

      <Footer />
      <MobileBottomNav />
    </>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content', 'contact.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  return { props: { frontmatter: data, content } }
}