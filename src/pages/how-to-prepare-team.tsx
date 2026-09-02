import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import Head from 'next/head'
import Image from 'next/image'
import Footer from '@/components/Footer'
import MobileBottomNav from '@/components/MobileBottomNav'
import StickyNavigation from '@/components/StickyNavigation'
import ServiceHero from '@/components/ServiceHero'

interface Section {
  title: string
  paragraphs: string[]
  imagePath?: string
  imageAlt?: string
}

type ChecklistItem = string

interface Frontmatter {
  title: string
  description: string
  heroTitle: string
  heroSubtitle: string
  heroImage: string
  heroImageAlt: string
  introText: string[]
  sections: Section[]
  checklist: ChecklistItem[]
  closingText: string
}

interface Props {
  frontmatter: Frontmatter
}

export default function HowToPrepareTeamPage({ frontmatter }: Props) {
  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://headshotsbymarie.com/how-to-prepare-team/" />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description} />
        <meta property="og:url" content="https://headshotsbymarie.com/how-to-prepare-team/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Headshots by Marie" />
      </Head>

      <StickyNavigation bookLink="/pricing" hideFloatingCta />

      <ServiceHero
        heroImage={frontmatter.heroImage}
        heroImageAlt={frontmatter.heroImageAlt}
        pageTitle={frontmatter.heroTitle}
        subtitle={frontmatter.heroSubtitle}
        textColor="light"
      />

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-8 text-center">
          {frontmatter.introText.map((paragraph, index) => (
            <p
              key={index}
              className={`text-xl md:text-2xl [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:opacity-70 [&_a]:transition-opacity ${index < frontmatter.introText.length - 1 ? 'mb-6' : ''}`}
              style={{
                fontFamily: '"Romie", serif',
                color: '#1C1C1C',
                fontWeight: 300,
                lineHeight: 1.5
              }}
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
        </div>
      </section>

      {/* Content Sections */}
      {frontmatter.sections.map((section, index) => {
        const hasImage = section.imagePath && section.imageAlt
        const imageFirst = index % 2 === 0

        return (
          <section key={index} className={`${hasImage ? 'pt-0 pb-12 lg:py-0' : 'py-12'}`} style={{ backgroundColor: index % 2 === 0 ? '#1C1C1C' : '#FFFFFF' }}>
            <div className={`${hasImage ? 'w-full' : 'max-w-3xl mx-auto px-8'}`}>
              {hasImage ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
                  {/* Image Column */}
                  <div className={`${imageFirst ? 'order-1 lg:order-2' : 'order-1 lg:order-1'}`}>
                    <div className="w-full lg:h-full" style={{ position: 'relative', aspectRatio: '3/4' }}>
                      <Image
                        src={section.imagePath!}
                        alt={section.imageAlt!}
                        width={500}
                        height={625}
                        className="object-cover w-full h-auto lg:absolute lg:inset-0 lg:w-full lg:h-full"
                      />
                    </div>
                  </div>
                  {/* Text Column */}
                  <div className={`flex flex-col justify-center px-8 lg:px-12 py-8 lg:py-12 ${imageFirst ? 'order-2 lg:order-1' : 'order-2 lg:order-2'}`}>
                    <h2
                      className="text-3xl md:text-4xl font-light mb-4"
                      style={{
                        fontFamily: '"Romie", serif',
                        color: index % 2 === 0 ? '#FFFFFF' : '#1C1C1C',
                        fontWeight: 300
                      }}
                    >
                      {section.title}
                    </h2>
                    <div className="mb-8" style={{ width: '60px', height: '2px', backgroundColor: '#DFBC49' }} />
                    {section.paragraphs.map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        className="text-lg mb-6 [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:opacity-70 [&_a]:transition-opacity [&_strong]:font-medium"
                        style={{
                          fontFamily: '"Romie", serif',
                          color: index % 2 === 0 ? '#E0E0E0' : '#1C1C1C',
                          fontWeight: 300,
                          lineHeight: 1.7
                        }}
                        dangerouslySetInnerHTML={{ __html: paragraph }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <h2
                    className="text-3xl md:text-4xl font-light mb-4"
                    style={{
                      fontFamily: '"Romie", serif',
                      color: index % 2 === 0 ? '#FFFFFF' : '#1C1C1C',
                      fontWeight: 300
                    }}
                  >
                    {section.title}
                  </h2>
                  <div className="mb-8" style={{ width: '60px', height: '2px', backgroundColor: '#DFBC49' }} />
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-lg mb-6 [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:opacity-70 [&_a]:transition-opacity [&_strong]:font-medium"
                      style={{
                        fontFamily: '"Romie", serif',
                        color: index % 2 === 0 ? '#E0E0E0' : '#1C1C1C',
                        fontWeight: 300,
                        lineHeight: 1.7
                      }}
                      dangerouslySetInnerHTML={{ __html: paragraph }}
                    />
                  ))}
                </>
              )}
            </div>
          </section>
        )
      })}

      {/* Checklist */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-8">
          <h2
            className="text-3xl md:text-4xl font-light mb-4 text-center"
            style={{
              fontFamily: '"Romie", serif',
              color: '#1C1C1C',
              fontWeight: 300
            }}
          >
            quick checklist
          </h2>
          <div className="mx-auto mb-12" style={{ width: '60px', height: '2px', backgroundColor: '#DFBC49' }} />
          <div className="p-8 md:p-10" style={{ backgroundColor: '#F5F5F5', borderRadius: '12px' }}>
            <ul className="space-y-4" style={{ listStyleType: 'none', padding: 0 }}>
              {frontmatter.checklist.map((item, index) => (
                <li
                  key={index}
                  className="text-lg flex items-start gap-3"
                  style={{
                    fontFamily: '"Romie", serif',
                    color: '#1C1C1C',
                    fontWeight: 300
                  }}
                >
                  <span style={{ color: '#DFBC49', flexShrink: 0 }}>&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <p
            className="text-xl md:text-2xl [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:opacity-70 [&_a]:transition-opacity"
            style={{
              fontFamily: '"Romie", serif',
              color: '#1C1C1C',
              fontWeight: 300,
              lineHeight: 1.5
            }}
            dangerouslySetInnerHTML={{ __html: frontmatter.closingText }}
          />
        </div>
      </section>

      <Footer />
      <MobileBottomNav />
    </>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content', 'how-to-prepare-team.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(fileContents)
  return { props: { frontmatter: data } }
}
