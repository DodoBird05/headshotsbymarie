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
  const canonicalUrl = canonicalPath
    ? `${seoConfig.siteUrl}${canonicalPath}${canonicalPath.endsWith('/') ? '' : '/'}`
    : undefined

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        <meta key="og:title" property="og:title" content={title} />
        <meta key="og:description" property="og:description" content={description} />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:site_name" property="og:site_name" content={seoConfig.siteName} />
        <meta property="og:locale" content={seoConfig.locale} />
        {canonicalUrl && <meta key="og:url" property="og:url" content={canonicalUrl} />}
        {fullImageUrl && (
          <>
            <meta key="og:image" property="og:image" content={fullImageUrl} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
            <meta key="twitter:image" name="twitter:image" content={fullImageUrl} />
          </>
        )}
        <meta key="twitter:title" name="twitter:title" content={title} />
        <meta key="twitter:description" name="twitter:description" content={description} />
      </Head>
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow">
          {children}
        </div>
        {!hideFooter && <Footer />}
        <MobileBottomNav />
      </div>
    </>
  )
}