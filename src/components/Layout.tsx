import { ReactNode } from 'react'
import Head from 'next/head'
import Footer from './Footer'
import MobileBottomNav from './MobileBottomNav'

interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
}

export default function Layout({ children, title = 'Photography Studio', description = 'Professional photography services' }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <MobileBottomNav />
      </div>
    </>
  )
}