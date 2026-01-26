import { ReactNode } from 'react'
import Head from 'next/head'
import Footer from './Footer'
import MobileBottomNav from './MobileBottomNav'

interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
  hideFooter?: boolean
  ogImage?: string
  canonicalPath?: string
}

export default function Layout({ children, title = 'Photography Studio', description = 'Professional photography services', hideFooter = false, ogImage, canonicalPath }: LayoutProps) {
  const siteUrl = 'https://headshotsbymarie.com'
  const fullImageUrl = ogImage ? `${siteUrl}${ogImage}` : undefined
  const canonicalUrl = canonicalPath ? `${siteUrl}${canonicalPath}` : undefined

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Headshots by Marie" />
        <meta property="og:locale" content="en_US" />
        {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
        {fullImageUrl && (
          <>
            <meta property="og:image" content={fullImageUrl} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image" content={fullImageUrl} />
          </>
        )}
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          {children}
        </main>
        {!hideFooter && <Footer />}
        <MobileBottomNav />
      </div>
    </>
  )
}