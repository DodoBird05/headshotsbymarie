import Head from 'next/head'
import Link from 'next/link'
import { seoConfig } from '@/lib/seoConfig'
import { trackButtonClick } from '@/lib/analytics'

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
            style={{ fontFamily: '"Romie", serif', color: '#1C1C1C', fontWeight: 300 }}
          >
            Headshots by Marie
          </h1>

          {/* 404 Message */}
          <p
            className="text-8xl md:text-9xl mb-4"
            style={{ fontFamily: '"Romie", serif', color: '#DFBC49', fontWeight: 300 }}
          >
            404
          </p>

          <h2
            className="text-xl md:text-2xl mb-4"
            style={{ fontFamily: '"Romie", serif', color: '#1C1C1C' }}
          >
            oups. page not found
          </h2>

          <p
            className="mb-8 text-gray-600"
            style={{ fontFamily: '"Romie", serif' }}
          >
            This page doesn't exist, or it has moved. Let's get you back to something worth looking at.
          </p>

          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 text-sm uppercase tracking-wider transition-colors"
              style={{
                backgroundColor: '#1C1C1C',
                color: '#ffffff',
                fontFamily: '"Romie", serif'
              }}
            >
              Go Home
            </Link>
            <Link
              href="/pricing/"
              className="px-6 py-3 text-sm uppercase tracking-wider border transition-colors hover:bg-black hover:text-white"
              style={{
                borderColor: '#1C1C1C',
                color: '#1C1C1C',
                fontFamily: '"Romie", serif'
              }}
              onClick={() => trackButtonClick('See Pricing', 'error_page_cta', '/pricing')}
            >
              See Pricing
            </Link>
          </div>

          {/* Contact Info */}
          <p
            className="mt-12 text-sm text-gray-500"
            style={{ fontFamily: '"Romie", serif' }}
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
