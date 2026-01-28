import { ReactNode } from 'react'
import Head from 'next/head'
import Footer from './Footer'
import MobileBottomNav from './MobileBottomNav'
import { seoConfig } from '@/lib/seoConfig'

interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
  hideFooter?: boolean
  ogImage?: string
  canonicalPath?: string
}

export default function Layout({ children, title = seoConfig.defaultTitle, description = seoConfig.defaultDescription, hideFooter = false, ogImage, canonicalPath }: LayoutProps) {
  const fullImageUrl = ogImage ? `${seoConfig.siteUrl}${ogImage}` : undefined
  const canonicalUrl = canonicalPath ? `${seoConfig.siteUrl}${canonicalPath}` : undefined

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={seoConfig.siteName} />
        <meta property="og:locale" content={seoConfig.locale} />
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