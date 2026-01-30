import { useState, useEffect } from 'react'
import ScatteredImageGallery from '../components/ScatteredImageGallery'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

interface TestPageProps {
  frontmatter: {
    mobileGallery: any[]
    ctaHeading: string
  }
}

export default function AccordionTest({ frontmatter }: TestPageProps) {
  const [scrollY, setScrollY] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(800)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    setViewportHeight(window.innerHeight)
    setIsDesktop(window.innerWidth >= 768)

    const handleScroll = () => setScrollY(window.scrollY)
    const handleResize = () => {
      setViewportHeight(window.innerHeight)
      setIsDesktop(window.innerWidth >= 768)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div style={{ height: '500vh', backgroundColor: '#ffffff' }}>
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p style={{ fontFamily: '"Hanken Grotesk", sans-serif', color: '#999' }}>
          Scroll down to see the gallery
        </p>
      </div>
      <ScatteredImageGallery
        images={frontmatter.mobileGallery}
        ctaHeading={frontmatter.ctaHeading}
        scrollY={scrollY}
        viewportHeight={viewportHeight}
        isDesktop={isDesktop}
      />
    </div>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content', 'home.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(fileContents)
  return {
    props: {
      frontmatter: {
        mobileGallery: data.mobileGallery,
        ctaHeading: data.ctaHeading
      }
    }
  }
}
