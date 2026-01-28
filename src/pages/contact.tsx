import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import Footer from '@/components/Footer'
import MobileBottomNav from '@/components/MobileBottomNav'
import StickyNavigation from '@/components/StickyNavigation'
import { useState, useEffect } from 'react'

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
    form: {
      title: string
      action: string
      fields: {
        name: {
          label: string
          placeholder: string
        }
        email: {
          label: string
          placeholder: string
        }
        sessionType: {
          label: string
          options: string[]
        }
        message: {
          label: string
          placeholder: string
        }
      }
      submitButton: string
    }
  }
  content: string
}

export default function ContactPage({ frontmatter, content }: ContactProps) {
  const [heroLoaded, setHeroLoaded] = useState(false)

  useEffect(() => {
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
        <link rel="canonical" href="https://headshotsbymarie.com/contact" />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description} />
        <meta property="og:image" content={`https://headshotsbymarie.com${frontmatter.heroImage}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://headshotsbymarie.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Headshots by Marie" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta name="twitter:description" content={frontmatter.description} />
        <meta name="twitter:image" content={`https://headshotsbymarie.com${frontmatter.heroImage}`} />
      </Head>

      {/* Navbar */}
      <StickyNavigation bookLink="/pricing" />

      {/* Hero Section with Sliding Animation */}
      <section className="relative h-screen w-full overflow-hidden">
        <div
          className={`absolute inset-0 w-full h-full transition-transform duration-1000 ease-out ${
            heroLoaded ? 'transform translate-y-0' : 'transform translate-y-full'
          }`}
        >
          <Image
            src={frontmatter.heroImage}
            alt={frontmatter.heroImageAlt}
            fill
            className="object-cover"
            style={{ objectPosition: 'center top', transform: 'scaleX(-1)' }}
            priority
          />
        </div>
      </section>

      {/* Contact Section */}
      <div className="py-20 px-4" style={{ background: 'linear-gradient(to right, #FAFAFA, #F5F5F5)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
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
                    href="/pricing"
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

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3
                className="text-2xl font-bold mb-6"
                style={{ fontFamily: '"Majesti Banner", serif', color: '#1C1C1C' }}
              >
                {frontmatter.form.title}
              </h3>
              <form action={frontmatter.form.action} method="post" encType="text/plain">
                <div className="space-y-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
                    >
                      {frontmatter.form.fields.name.label}
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder={frontmatter.form.fields.name.placeholder}
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
                    >
                      {frontmatter.form.fields.email.label}
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder={frontmatter.form.fields.email.placeholder}
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
                    >
                      {frontmatter.form.fields.sessionType.label}
                    </label>
                    <select
                      name="session-type"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      required
                    >
                      {frontmatter.form.fields.sessionType.options.map((option, index) => (
                        <option key={index}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
                    >
                      {frontmatter.form.fields.message.label}
                    </label>
                    <textarea
                      rows={5}
                      name="message"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder={frontmatter.form.fields.message.placeholder}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors font-bold"
                    style={{ fontFamily: '"Hanken Grotesk", sans-serif' }}
                  >
                    {frontmatter.form.submitButton}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

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