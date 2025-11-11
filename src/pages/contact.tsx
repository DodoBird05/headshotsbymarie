import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import Footer from '@/components/Footer'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

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
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [heroLoaded, setHeroLoaded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      </Head>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2 px-4 shadow-md bg-white' : 'py-8 px-8'}`}>
        <div className={`flex items-center ${isScrolled ? 'justify-end gap-4' : 'justify-end gap-4 md:gap-8'} w-full transition-all duration-300`}>
          {isScrolled ? (
            <>
              <div className="flex-shrink-0">
                <Link href="/">
                  <Image
                    src="/Logo/Headshots By Marie-Logo-square-White.svg"
                    alt="Headshots by Marie"
                    width={32}
                    height={32}
                    className="h-8 w-8 cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ filter: 'invert(1)' }}
                  />
                </Link>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-black p-2"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </>
          ) : (
            <>
              <div className="flex-shrink-0">
                <Link href="/">
                  <Image
                    src="/Logo/Headshots By Marie Logo-Square.svg"
                    alt="Headshots by Marie"
                    width={80}
                    height={80}
                    className="h-20 w-20 md:hidden cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </Link>
                <Link href="/">
                  <Image
                    src="/Logo/Headshots-by-Marie-Rectangle.svg"
                    alt="Headshots by Marie"
                    width={240}
                    height={96}
                    className="hidden md:block h-24 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </Link>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-black p-2"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>

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
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-black p-2"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

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
    </>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content', 'contact.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  return { props: { frontmatter: data, content } }
}