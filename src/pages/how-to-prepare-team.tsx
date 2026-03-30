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

interface ChecklistGroup {
  heading: string
  items: string[]
}

interface Frontmatter {
  title: string
  description: string
  heroTitle: string
  heroSubtitle: string
  heroImage: string
  heroImageAlt: string
  introText: string[]
  sections: Section[]
  checklist: ChecklistGroup[]
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
        <meta name="robots" content="noindex, nofollow" />
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
                fontFamily: '"Majesti Banner", serif',
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
          <section key={index} className="py-12 bg-white">
            <div className={`mx-auto px-8 ${hasImage ? 'max-w-6xl' : 'max-w-3xl'}`}>
              {hasImage ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                  {/* Image Column */}
                  <div className={`flex justify-center items-center h-full ${imageFirst ? 'order-1 lg:order-2' : 'order-1 lg:order-1'}`}>
                    <Image
                      src={section.imagePath!}
                      alt={section.imageAlt!}
                      width={500}
                      height={600}
                      className="object-contain max-h-full"
                    />
                  </div>
                  {/* Text Column */}
                  <div className={`flex flex-col justify-center ${imageFirst ? 'order-2 lg:order-1' : 'order-2 lg:order-2'}`}>
                    <h2
                      className="text-3xl md:text-4xl font-light mb-8"
                      style={{
                        fontFamily: '"Majesti Banner", serif',
                        color: '#1C1C1C',
                        fontWeight: 300
                      }}
                    >
                      {section.title}
                    </h2>
                    {section.paragraphs.map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        className="text-lg mb-6 [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:opacity-70 [&_a]:transition-opacity [&_strong]:font-medium"
                        style={{
                          fontFamily: '"Hanken Grotesk", sans-serif',
                          color: '#1C1C1C',
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
                    className="text-3xl md:text-4xl font-light mb-8"
                    style={{
                      fontFamily: '"Majesti Banner", serif',
                      color: '#1C1C1C',
                      fontWeight: 300
                    }}
                  >
                    {section.title}
                  </h2>
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-lg mb-6 [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:opacity-70 [&_a]:transition-opacity [&_strong]:font-medium"
                      style={{
                        fontFamily: '"Hanken Grotesk", sans-serif',
                        color: '#1C1C1C',
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
            className="text-3xl md:text-4xl font-light mb-12 text-center"
            style={{
              fontFamily: '"Majesti Banner", serif',
              color: '#1C1C1C',
              fontWeight: 300
            }}
          >
            Quick Checklist
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {frontmatter.checklist.map((group, gIndex) => (
              <div key={gIndex} className="p-6" style={{ backgroundColor: '#F5F5F5', borderRadius: '4px' }}>
                <h3
                  className="text-lg font-medium mb-4"
                  style={{
                    fontFamily: '"Hanken Grotesk", sans-serif',
                    color: '#1C1C1C',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontSize: '0.85rem'
                  }}
                >
                  {group.heading}
                </h3>
                <ul className="space-y-2" style={{ listStyleType: 'none', padding: 0 }}>
                  {group.items.map((item, iIndex) => (
                    <li
                      key={iIndex}
                      className="text-base flex items-start gap-2"
                      style={{
                        fontFamily: '"Hanken Grotesk", sans-serif',
                        color: '#444',
                        fontWeight: 300
                      }}
                    >
                      <span style={{ color: '#DFBC49', flexShrink: 0 }}>&#10003;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <p
            className="text-xl md:text-2xl [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:opacity-70 [&_a]:transition-opacity"
            style={{
              fontFamily: '"Majesti Banner", serif',
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
