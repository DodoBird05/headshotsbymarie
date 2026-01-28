import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

export default function DownloadPage() {
  const router = useRouter()
  const { slug } = router.query

  // Convert slug to readable name (john-smith -> John Smith)
  const clientName = typeof slug === 'string'
    ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'there'

  // The download URL - files stored in S3
  const downloadUrl = typeof slug === 'string'
    ? `https://headshotsbymarie.com/clients/${slug}/photos.zip`
    : '#'

  // Preview image URL
  const previewImageUrl = typeof slug === 'string'
    ? `https://headshotsbymarie.com/clients/${slug}/preview.jpg`
    : ''

  // Show loading state while router is loading
  if (!slug) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Download Your Photos | Headshots by Marie</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-white flex flex-col lg:flex-row">
        {/* Left Side - Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-8 py-12 lg:px-16">
          {/* Logo */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl tracking-wider text-center mb-8" style={{ fontFamily: '"Majesti Banner", Georgia, serif' }}>
            HEADSHOTS BY MARIE
          </h1>

          {/* Greeting */}
          <div className="max-w-md text-center mb-8">
            <h2 className="text-xl md:text-2xl lg:text-3xl mb-4" style={{ fontFamily: '"Majesti Banner", Georgia, serif' }}>
              Hi {clientName}!
            </h2>
            <p className="text-gray-600 text-lg">
              Your photos are ready to download.
            </p>
          </div>

          {/* Mobile Only - Preview Image */}
          <div className="lg:hidden max-w-xs mb-8">
            <img
              src={previewImageUrl}
              alt={`${clientName}'s headshot preview`}
              className="w-full shadow-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
          </div>

          {/* Download Button */}
          <a
            href={downloadUrl}
            className="bg-black text-white px-8 py-4 text-lg tracking-wide hover:bg-gray-800 transition-colors mb-12"
          >
            Download Your Photos
          </a>

          {/* Divider */}
          <div className="w-24 h-px bg-gray-300 mb-12"></div>

          {/* Call to Actions */}
          <div className="text-center mb-12">
            <p className="text-gray-600 mb-4">
              Love your photos? I'd be so grateful for a quick review!
            </p>
            <a
              href="https://g.page/r/Cb8CPA6xJb-UEAg/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-black px-6 py-3 text-sm tracking-wide hover:bg-black hover:text-white transition-colors"
            >
              Leave a Review
            </a>
          </div>

          {/* Additional Links */}
          <div className="flex flex-wrap justify-center gap-4 lg:gap-6 text-sm text-gray-500">
            <Link href="/book/" className="hover:text-black transition-colors">
              Book Another Session
            </Link>
            <span className="text-gray-300">|</span>
            <a
              href="https://www.instagram.com/marie.feutrier/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors"
            >
              Follow on Instagram
            </a>
            <span className="text-gray-300">|</span>
            <a
              href="https://www.linkedin.com/in/marie-feutrier-mh05/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors"
            >
              Connect on LinkedIn
            </a>
          </div>

          {/* Footer */}
          <div className="mt-12 lg:mt-16 text-center text-gray-400 text-xs">
            <p>Questions? Email me at marie@headshotsbymarie.com</p>
            <p className="mt-2">Thank you for choosing Headshots by Marie!</p>
          </div>
        </div>

        {/* Right Side - Full Height Photo Background (Desktop Only) */}
        <div
          className="hidden lg:block w-1/2 min-h-screen bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${previewImageUrl}')`,
          }}
        >
          {/* Fallback gradient if image fails to load */}
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 -z-10" />
        </div>
      </div>
    </>
  )
}
