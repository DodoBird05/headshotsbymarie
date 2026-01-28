import Head from 'next/head'
import Link from 'next/link'
import { seoConfig } from '@/lib/seoConfig'

export default function Custom404() {
  return (
    <>
      <Head>
        <title>{`Page Not Found | ${seoConfig.siteName}`}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div
        className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ backgroundColor: '#f8f8f8' }}
      >
        <div className="text-center max-w-md">
          {/* Logo/Brand */}
          <h1
            className="text-3xl md:text-4xl mb-8 uppercase tracking-wider"
            style={{ fontFamily: '"Majesti Banner", serif', color: '#1C1C1C', fontWeight: 300 }}
          >
            Headshots by Marie
          </h1>

          {/* 404 Message */}
          <p
            className="text-8xl md:text-9xl mb-4"
            style={{ fontFamily: '"Majesti Banner", serif', color: '#DFBC49', fontWeight: 300 }}
          >
            404
          </p>

          <h2
            className="text-xl md:text-2xl mb-4"
            style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#1C1C1C' }}
          >
            Page Not Found
          </h2>

          <p
            className="mb-8 text-gray-600"
            style={{ fontFamily: '"Hanken Grotesk", sans-serif' }}
          >
            The page you're looking for doesn't exist or has been moved.
          </p>

          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 text-sm uppercase tracking-wider transition-colors"
              style={{
                backgroundColor: '#1C1C1C',
                color: '#ffffff',
                fontFamily: '"Hanken Grotesk", sans-serif'
              }}
            >
              Go Home
            </Link>
            <Link
              href="/pricing"
              className="px-6 py-3 text-sm uppercase tracking-wider border transition-colors hover:bg-black hover:text-white"
              style={{
                borderColor: '#1C1C1C',
                color: '#1C1C1C',
                fontFamily: '"Hanken Grotesk", sans-serif'
              }}
            >
              View Services
            </Link>
          </div>

          {/* Contact Info */}
          <p
            className="mt-12 text-sm text-gray-500"
            style={{ fontFamily: '"Hanken Grotesk", sans-serif' }}
          >
            Need help? Contact me at{' '}
            <a
              href={`mailto:${seoConfig.email}`}
              className="underline hover:text-black"
            >
              {seoConfig.email}
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
