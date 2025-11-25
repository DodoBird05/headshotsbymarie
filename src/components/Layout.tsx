import { ReactNode } from 'react'
import { NextSeo } from 'next-seo'
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
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          description,
          type: 'website',
        }}
      />
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