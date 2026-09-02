import Link from 'next/link'
import TestimonialWithParallax from './TestimonialWithParallax'
import StickyImageWithText from './StickyImageWithText'
import AnimatedFAQ from './AnimatedFAQ'
import CTASection from './CTASection'
import Footer from './Footer'
import { getMobileSrc } from '@/lib/responsiveImage'
import { trackButtonClick } from '@/lib/analytics'
import useScrollReveal from '@/hooks/useScrollReveal'
import ScatteredEditorial from './ScatteredEditorial'
import CardStackCarousel from './CardStackCarousel'
import Section from './Section'

interface ContentSection {
  title: string
  imagePath?: string
  imageAlt?: string
  paragraphs: string[]
}

interface HomePageLayoutProps {
  frontmatter: {
    title: string
    heroTitle: string
    defaultHeroImage: string
    defaultHeroImageAlt: string
    mobileRevealText: string[]
    mobileRevealText2?: string[]
    mobileGallery: {
      src: string
      alt: string
      headingAbove?: string
      headingBelow?: string
      size?: 'XS' | 'S' | 'M' | 'L' | 'XL'
      align?: 'left' | 'center' | 'right'
      offsetLeft?: string
      marginBottom?: string
      link?: string
      tooltip?: { title?: string; text?: string }
    }[]
    mobileTestimonial?: {
      quote: string[]
      author: string
      rating: number
      source: string
    }
    mobileParallaxImages?: {
      src: string
      alt: string
    }[]
    mobileFAQ?: {
      question: string
      answer: string
      fromLeft: boolean
    }[]
    portraitSessionsHeading?: string
    homeStatementLine?: string
    homeContentSections?: ContentSection[]
    homeImageRow?: {
      src: string
      alt: string
    }[]
    homeImageRow2?: {
      src: string
      alt: string
    }[]
    testimonials?: {
      text: string
      author: string
      imagePath: string
      imageAlt: string
    }[]
    ctaHeading?: string
    ctaButtons?: {
      label: string
      href: string
      style: 'primary' | 'secondary'
    }[]
  }
}

export default function HomePageLayout({
  frontmatter
}: HomePageLayoutProps) {
  useScrollReveal()

  // Mobile/desktop branching is pure CSS (md: breakpoint) so the static HTML
  // contains BOTH branches and the correct one shows on first paint. The old
  // isDesktop useState-in-effect approach rendered only the mobile branch at
  // build time, so desktop visitors saw the mobile layout until hydration
  // (~0.5-1.5s slower LCP + a full layout swap).
  const sections = frontmatter.homeContentSections || []
  const imageRow = frontmatter.homeImageRow || []

  return (
    <>
      {/* ==================== MOBILE: Static hero + reveal text ==================== */}
      <div className="md:hidden" style={{ overflow: 'hidden' }}>
          {/* Static hero image with H1 — real <img> (mobile variant), not a CSS
              background + hidden full-size img (which double-downloaded) */}
          <Section name="hero" index={0}>
          <div className="relative w-full" style={{ height: '100vh' }}>
            <img
              src={getMobileSrc(frontmatter.defaultHeroImage)}
              alt={frontmatter.defaultHeroImageAlt}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute bottom-[25vh] left-0 right-0 text-center px-8">
              <div
                style={{
                  fontFamily: '"Romie", serif',
                  fontWeight: 400,
                  fontSize: '0.8rem',
                  letterSpacing: '0.3em',
                  color: '#ffffff',
                  marginBottom: '1.5rem',
                  opacity: 0.9
                }}
              >
                Headshots by Marie
              </div>
              <p
                style={{
                  fontFamily: '"Romie", serif',
                  fontWeight: 300,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  color: '#ffffff',
                  lineHeight: 0.95,
                  fontSize: 'clamp(2.2rem, 9vw, 3.5rem)',
                  margin: 0
                }}
              >
                A Different
                <br />
                Kind of
                <br />
                <em style={{ fontStyle: 'italic' }}>Headshot Experience</em>
              </p>
            </div>
          </div>
          </Section>

          {/* Warm white section: reveal text + editorial with gold line */}
          <Section name="editorial_gallery_1" index={1}>
          <div className="relative" style={{ backgroundColor: '#F5F0EB' }}>
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1200 4000" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M900 0 C700 300 800 600 600 900 C400 1200 200 1400 400 1700 C600 2000 900 2200 700 2500 C500 2800 200 3000 400 3300 C600 3600 800 3800 600 4000" stroke="#D4A843" strokeWidth="1" fill="none" />
            </svg>
            <div className="relative text-center px-8 pt-16 pb-16" style={{ zIndex: 1 }}>
              <div
                style={{
                  fontFamily: '"Romie", serif',
                  fontWeight: 300,
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  color: '#1C1C1C',
                  marginBottom: '1.5rem'
                }}
              >
                Headshot Photographer
              </div>
              <div
                style={{
                  fontFamily: '"Romie", serif',
                  fontWeight: 300,
                  color: '#1C1C1C',
                  lineHeight: 1.3,
                  fontSize: '7vw'
                }}
              >
                {frontmatter.mobileRevealText.map((line, index) => (
                  <span key={index}>
                    <span dangerouslySetInnerHTML={{ __html: line }} />
                    {index < frontmatter.mobileRevealText.length - 1 && <br />}
                  </span>
                ))}
              </div>
            </div>
            <ScatteredEditorial
              background="transparent"
              location="home_editorial_mobile"
              items={frontmatter.mobileGallery.map(image => ({
                imagePath: image.src,
                imageAlt: image.alt,
                title: image.headingAbove || '',
                text: image.tooltip?.text,
                link: image.link
              }))}
            />
          </div>
          </Section>
      </div>

      {/* ==================== DESKTOP: Static hero ==================== */}
      <div className="hidden md:block">
          {/* Full-width hero image with brand kicker + H1 overlay */}
          <Section name="hero" index={0}>
          <div className="relative w-full" style={{ height: '100vh' }}>
            <img
              src={frontmatter.defaultHeroImage}
              alt={frontmatter.defaultHeroImageAlt}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-[20vh] left-0 right-0 text-center px-8">
              <div
                style={{
                  fontFamily: '"Romie", serif',
                  fontWeight: 400,
                  fontSize: '0.9rem',
                  letterSpacing: '0.3em',
                  color: '#ffffff',
                  marginBottom: '1.75rem',
                  opacity: 0.9
                }}
              >
                Headshots by Marie
              </div>
              <h1
                style={{
                  fontFamily: '"Romie", serif',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  /* ss03 = swash A, ss05 = swash R. Together they give the
                     Romie italic display treatment used on the hero. */
                  fontFeatureSettings: '"ss03", "ss05"',
                  letterSpacing: '0.04em',
                  color: '#ffffff',
                  lineHeight: 0.95,
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  margin: 0
                }}
              >
                <span style={{ textTransform: 'uppercase' }}>A Different Kind of</span>
                <br />
                <em style={{ fontStyle: 'italic' }}>
                  <span style={{ textTransform: 'uppercase' }}>Headshot</span> Experience
                </em>
              </h1>
            </div>
          </div>
          </Section>

          {/* Warm white section: H1 + editorial gallery with gold line */}
          <Section name="editorial_gallery_1" index={1}>
          <div className="relative" style={{ backgroundColor: '#F5F0EB' }}>
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1200 4000" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M900 0 C700 300 800 600 600 900 C400 1200 200 1400 400 1700 C600 2000 900 2200 700 2500 C500 2800 200 3000 400 3300 C600 3600 800 3800 600 4000" stroke="#D4A843" strokeWidth="1" fill="none" />
            </svg>
            <div className="relative text-center px-8" style={{ paddingTop: '5rem', paddingBottom: '5rem', zIndex: 1 }}>
              <div
                style={{
                  fontFamily: '"Romie", serif',
                  fontWeight: 300,
                  fontSize: '0.85rem',
                  letterSpacing: '0.25em',
                  color: '#1C1C1C',
                  marginBottom: '2rem'
                }}
              >
                Headshot Photographer
              </div>
              <h2
                style={{
                  fontFamily: '"Romie", serif',
                  fontWeight: 300,
                  color: '#1C1C1C',
                  lineHeight: 1.2,
                  fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
                  
                  letterSpacing: '0.02em'
                }}
              >
                An Experience
                <br />
                Worth <em style={{ fontStyle: 'italic' }}>Showing Up</em> For.
                <br />
                Portraits Worth
                <br />
                <em style={{ fontStyle: 'italic' }}>Showing Off</em>.
              </h2>
            </div>
            <ScatteredEditorial
              background="transparent"
              location="home_editorial_desktop"
              items={frontmatter.mobileGallery.map(image => ({
                imagePath: image.src,
                imageAlt: image.alt,
                title: image.headingAbove || '',
                text: image.tooltip?.text,
                link: image.link
              }))}
            />
          </div>
          </Section>
      </div>

      {/* ==================== CARD STACK CAROUSEL ==================== */}
      {imageRow.length > 0 && (
        <Section name="card_stack_carousel" index={2}>
        <CardStackCarousel
          heading={<>For People Who <em style={{ fontStyle: 'italic' }}>Want To Be Seen</em></>}
          uppercaseHeading={false}
          subtext="At Headshots by Marie, a portrait is never just a picture. It's a story worth telling, a presence worth meeting, a strategy worth building."
          heroImage={imageRow[0]}
          carouselImages={imageRow.slice(1, 5)}
        />
        </Section>
      )}

      {/* ==================== CONTENT SECTIONS ==================== */}
      <div
        style={{
          position: 'relative',
          zIndex: 20
        }}
      >
          {/* Testimonial with Parallax */}
          {frontmatter.mobileTestimonial && frontmatter.mobileParallaxImages && (
            <TestimonialWithParallax
              quote={frontmatter.mobileTestimonial.quote}
              author={frontmatter.mobileTestimonial.author}
              rating={frontmatter.mobileTestimonial.rating}
              source={frontmatter.mobileTestimonial.source}
              parallaxImages={frontmatter.mobileParallaxImages}
              theme="dark"
            >
              {/* ===== Intro paragraph — top left, corporate-page style ===== */}
              {sections.length >= 1 && (
                <Section name="intro_paragraph" index={3} as="section" className="pt-16 pb-1" style={{ backgroundColor: '#F5F0EB' }}>
                  <div className="w-full px-6 lg:px-0">
                    <div className="lg:w-[40%] lg:ml-[2vh]" data-reveal>
                      <h2
                        className="mb-6"
                        style={{
                          fontFamily: "'Romie', serif",
                          fontSize: '1.1rem',
                          fontWeight: 300,
                          
                          letterSpacing: '0.05em',
                          color: '#1C1C1C'
                        }}
                      >
                        {sections[0].title}
                      </h2>
                      {sections[0].paragraphs.slice(0, 2).map((paragraph, index) => (
                        <p
                          key={index}
                          className="text-base lg:text-[0.95rem] last:mb-0"
                          style={{ fontFamily: '"Romie", serif', color: '#1C1C1C', fontWeight: 300, lineHeight: 1.75 }}
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </Section>
              )}

              {/* ===== A: StickyImageWithText — Sections 1 & 2 ===== */}
              {sections.length >= 2 && (
                <Section name="sticky_image_text" index={4}>
                <StickyImageWithText
                  background="#F5F0EB"
                  textColor="#1C1C1C"
                  location="home_sticky"
                  stickyContent={
                    <>
                      <h2
                        data-reveal
                        style={{
                          fontFamily: "'Romie', serif",
                          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                          fontWeight: 300,
                          
                          letterSpacing: '0.03em',
                          lineHeight: 0.95,
                          color: '#1C1C1C',
                          marginBottom: '2.5rem'
                        }}
                      >
                        {frontmatter.portraitSessionsHeading || 'Portrait Sessions Without Limits'}
                      </h2>
                      <Link
                        href="/pricing/"
                        className="inline-block text-lg font-medium transition-all duration-300 px-8 py-3"
                        style={{
                          fontFamily: '"Romie", serif',
                          backgroundColor: 'transparent',
                          color: '#1C1C1C',
                          border: '1px solid #1C1C1C',
                          borderRadius: '9999px'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#D4A843'; e.currentTarget.style.borderColor = '#D4A843'; e.currentTarget.style.color = '#FFFFFF' }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = '#1C1C1C'; e.currentTarget.style.color = '#1C1C1C' }}
                        onClick={() => trackButtonClick('Start Here', 'homepage_intro_cta')}
                      >
                        Start Here
                      </Link>
                    </>
                  }
                  images={[
                    {
                      src: sections[0].imagePath || '',
                      alt: sections[0].imageAlt || '',
                      paragraphs: sections[0].paragraphs.slice(2),
                      textColor: '#1C1C1C'
                    },
                    {
                      src: sections[1].imagePath || '',
                      alt: sections[1].imageAlt || '',
                      paragraphs: [sections[1].paragraphs[0]],
                      textColor: '#1C1C1C'
                    }
                  ]}
                />
                </Section>
              )}

              {/* ===== Split Title + Image with Text ===== */}
              <Section name="split_title_image" index={5} as="section" style={{ backgroundColor: '#F5F0EB' }}>
                {/* Heading — overlaps image on desktop, stacked on mobile */}
                <h2
                  data-reveal
                  className="px-6 pt-12 pb-6 md:px-[4vw] md:pt-12 md:pb-0 md:-mb-8"
                  style={{
                    fontFamily: '"Romie", serif',
                    fontWeight: 300,
                    fontSize: 'clamp(2rem, 5vw, 4rem)',
                    
                    letterSpacing: '0.04em',
                    lineHeight: 1.05,
                    color: '#1C1C1C',
                    position: 'relative',
                    zIndex: 2
                  }}
                >
                  Everything A Headshot Was
                  <br />
                  Never <em style={{ fontStyle: 'italic' }}>Meant To Be</em>
                </h2>

                {/* Image + text: stacked on mobile, side-by-side on desktop */}
                <div className="flex flex-col md:flex-row md:items-start">
                  <div className="w-full md:w-[60%] md:flex-shrink-0" data-reveal data-reveal-delay="200">
                      <picture>
                        <source media="(max-width: 768px)" srcSet="/images/Corporate/Jennifer-Speaker-Portrait-By-Marie-Feutrier-mobile.webp" />
                        <img
                          src="/images/Corporate/Jennifer-Speaker-Portrait-By-Marie-Feutrier.webp"
                          alt="Jennifer, speaker portrait in red top with bright smile against wood slat backdrop by Marie Feutrier"
                          width={1200}
                          height={1500}
                          style={{ width: '100%', objectFit: 'cover' }}
                          loading="lazy"
                        />
                      </picture>
                    </div>
                    <div
                      className="w-full md:w-[40%] px-6 pt-8 pb-12 md:pt-[15vh] md:pr-[4vw] md:pb-12 md:pl-[3vw] md:px-0"
                      data-reveal
                      data-reveal-delay="400"
                    >
                      <p
                        style={{
                          fontFamily: '"Romie", serif',
                          fontWeight: 300,
                          fontSize: '0.95rem',
                          lineHeight: 1.7,
                          color: '#1C1C1C'
                        }}
                      >
                        This is what happens when you stop following the formula. Portraits that feel alive, that carry weight, that make people look twice. Not because they're polished. Because they're real.
                      </p>
                    </div>
                </div>
              </Section>

              {/* ===== Marie Feutrier — Photographer (grid style) ===== */}
              <Section name="marie_feutrier_grid" index={6} as="section" className="py-20 md:py-28" style={{ backgroundColor: '#F5F0EB' }}>
                <div className="max-w-6xl mx-auto px-8">
                  <div className="grid grid-cols-1 md:grid-cols-[35%_1fr] gap-12">
                    <div data-reveal>
                      <h2 style={{ fontFamily: '"Romie", serif', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 300, color: '#1C1C1C',  letterSpacing: '0.03em', lineHeight: 1.1 }}>
                        Marie Feutrier — Photographer
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-reveal data-reveal-delay="200">
                      {[
                        'My grandparents ran a small grocery store in a village where everyone knew your name. It was never about being the biggest. It was about being the one people trusted.',
                        'They believed keeping a client was worth more than finding a new one. They worked hard not because someone was watching, but because doing less felt wrong.',
                        "That's where this comes from. Not from a business plan or a trend. From people who believed how you treat someone matters as much as what you deliver.",
                        'I built this the same way they built theirs. With pride, with care, and with the belief that the work should speak for itself.'
                      ].map((p, i) => (
                        <div key={i}>
                          <p className="text-sm" style={{ fontFamily: '"Romie", serif', color: '#555', fontWeight: 300, lineHeight: 1.7 }}>{p}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Section>

              {/* ===== Full-bleed transition image ===== */}
              <Section name="full_bleed_portrait" index={7} as="section" style={{ backgroundColor: '#1C1C1C' }}>
                <picture>
                  <source media="(max-width: 768px)" srcSet="/images/Corporate/John-Meade-Full-Bleed-By-Marie-Feutrier-mobile.webp" />
                  <img
                    src="/images/Corporate/John-Meade-Full-Bleed-By-Marie-Feutrier.webp"
                    alt="John Meade, cinematic portrait in navy blazer against dark backdrop by Marie Feutrier"
                    style={{ width: '100%', display: 'block', objectFit: 'cover' }}
                    loading="lazy"
                  />
                </picture>
              </Section>

              {/* ===== Dark section wrapper with gold line ===== */}
              <div style={{ position: 'relative', backgroundColor: '#1C1C1C' }}>
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  preserveAspectRatio="none"
                  viewBox="0 0 1200 4000"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ zIndex: 0 }}
                >
                  <path d="M400 0 C600 400 300 800 500 1200 C700 1600 400 2000 600 2400 C800 2800 500 3200 700 3600 C800 3800 600 4000 700 4000" stroke="#D4A843" strokeWidth="1" fill="none" />
                </svg>

              {/* ===== Curious What Happens Behind the Lens — dark editorial ===== */}
              <Section name="behind_the_lens" index={8} as="section" style={{ backgroundColor: 'transparent', position: 'relative', zIndex: 1 }} className="py-20 md:py-28">
                {/* Intro heading + body + CTA */}
                <div className="max-w-3xl mx-auto px-8 text-center" data-reveal>
                  <h2
                    style={{
                      fontFamily: '"Romie", serif',
                      fontWeight: 300,
                      fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                      
                      letterSpacing: '0.04em',
                      lineHeight: 1.1,
                      color: '#F5F0EB',
                      marginBottom: '2rem'
                    }}
                  >
                    Curious What Happens Behind The Lens
                  </h2>
                  <p
                    style={{
                      fontFamily: '"Romie", serif',
                      fontWeight: 300,
                      fontSize: '1rem',
                      lineHeight: 1.8,
                      color: '#F5F0EB',
                      opacity: 0.85,
                      marginBottom: '2.5rem'
                    }}
                  >
                    Every session is built from the ground up, around you. No templates, no shortcuts. There's a reason people remember this long after they leave.
                  </p>
                  <Link
                    href="/pricing/"
                    className="inline-block text-lg font-medium transition-all duration-300 px-8 py-3"
                    style={{
                      fontFamily: '"Romie", serif',
                      backgroundColor: 'transparent',
                      color: '#F5F0EB',
                      border: '1px solid #F5F0EB',
                      borderRadius: '9999px'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#D4A843'; e.currentTarget.style.borderColor = '#D4A843'; e.currentTarget.style.color = '#FFFFFF' }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = '#F5F0EB'; e.currentTarget.style.color = '#F5F0EB' }}
                    onClick={() => trackButtonClick('See the full experience', 'homepage_experience_cta', '/pricing')}
                  >
                    See the full experience
                  </Link>
                </div>

                {/* Editorial gallery on dark background with 4 text blocks per image */}
                <ScatteredEditorial
                  background="transparent"
                  dark={true}
                  location="home_editorial_dark"
                  items={[
                    {
                      imagePath: '/images/Corporate/Jan-Walsh-Portrait-By-Marie-Feutrier.webp',
                      imageAlt: 'Jan Walsh, natural portrait with silver hair and warm smile against light backdrop by Marie Feutrier',
                      title: 'Confidence, Not Performance',
                      text: "Confidence isn't something you fake. It's something that shows up when you're in the right hands. That's the difference between posing and being photographed."
                    },
                    {
                      imagePath: '/images/Corporate/Rupesh-Parbhoo-Portrait-By-Marie-Feutrier.webp',
                      imageAlt: 'Rupesh Parbhoo, editorial portrait seated on stool in dark suit against cream backdrop by Marie Feutrier',
                      title: 'Unmistakably You',
                      text: 'Some people walk in knowing exactly what they want. Others have no idea. Both leave with images that feel unmistakably them.'
                    },
                    {
                      imagePath: '/images/Actors/Sydney-Schutz-Portrait-By-Marie-Feutrier.webp',
                      imageAlt: 'Sydney Schutz, actor portrait with long blonde hair and bright smile against dark backdrop by Marie Feutrier',
                      title: 'Looking Like Yourself',
                      text: "The goal is never to make you look like someone else. It's to make you look like yourself on the day everything aligned."
                    },
                    {
                      imagePath: '/images/Corporate/Lora-Hebert-Portrait-By-Marie-Feutrier.webp',
                      imageAlt: 'Lora Hebert, relaxed portrait seated cross-legged in white tee against warm textured backdrop by Marie Feutrier',
                      title: 'The Photo They Put Everywhere',
                      text: `These are the images people put everywhere. The ones that make colleagues ask "where did you get that done?" That's when you know.`
                    }
                  ]}
                />
              </Section>

              {/* ===== This Is Not for Everyone — closing grid ===== */}
              <Section name="not_for_everyone" index={9} as="section" className="py-20 md:py-28 md:-mt-48" style={{ backgroundColor: 'transparent', position: 'relative', zIndex: 1 }}>
                <div className="max-w-6xl mx-auto px-8">
                  <div className="grid grid-cols-1 md:grid-cols-[35%_1fr] gap-12">
                    <div data-reveal>
                      <h2 style={{ fontFamily: '"Romie", serif', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 300, color: '#F5F0EB',  letterSpacing: '0.03em', lineHeight: 1.1 }}>
                        This Is Not For Everyone
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-reveal data-reveal-delay="200">
                      {[
                        'This experience is for people who take their image seriously. Who understand that how you present yourself shapes how people respond to you.',
                        "It's for the person who's done settling. Who wants their portrait to feel as considered as everything else they put their name on.",
                        "It's not about vanity. It's about alignment. When the outside finally matches what you know about yourself on the inside, people feel it. You feel it.",
                        "If that sounds like you, you're in the right place. Book a session at Headshots by Marie and find out what it feels like to have someone see you clearly."
                      ].map((p, i) => (
                        <div key={i}>
                          <p className="text-sm" style={{ fontFamily: '"Romie", serif', color: '#CCCCCC', fontWeight: 300, lineHeight: 1.7 }}>{p}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Section>
              </div>


              {/* ===== Magazine-style testimonial callout before FAQ ===== */}
              <Section name="testimonial_callout" index={10} as="section" className="py-20 md:py-28" style={{ backgroundColor: '#F5F0EB' }}>
                <div className="max-w-6xl mx-auto px-8">
                  <div className="grid grid-cols-1 md:grid-cols-[40%_1fr] gap-10 md:gap-16 items-center">
                    <div data-reveal data-reveal-direction="left">
                      <img
                        src="/images/testimonials/Professional-Headshot-Ali-H-Phoenix-Arizona-By-Marie-Feutrier.webp"
                        alt="Ali H, natural portrait with bright smile against light backdrop by Marie Feutrier"
                        style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover' }}
                        loading="lazy"
                      />
                    </div>
                    <div data-reveal data-reveal-delay="200">
                      <div
                        aria-hidden="true"
                        style={{
                          fontFamily: '"Romie", serif',
                          fontSize: '5rem',
                          lineHeight: 0.5,
                          color: '#D4A843',
                          marginBottom: '1.5rem'
                        }}
                      >
                        &ldquo;
                      </div>
                      <blockquote
                        style={{
                          fontFamily: '"Romie", serif',
                          fontWeight: 300,
                          fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                          lineHeight: 1.3,
                          color: '#1C1C1C',
                          marginBottom: '2rem'
                        }}
                      >
                        Marie is <em style={{ fontStyle: 'italic' }}>magical</em>. She&apos;s calm and confident, which instills calmness and confidence in her subjects.
                      </blockquote>
                      <div
                        style={{
                          fontFamily: '"Romie", serif',
                          fontSize: '0.75rem',
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          color: '#555',
                          fontWeight: 400
                        }}
                      >
                        Ali H &nbsp;·&nbsp; Google Review
                      </div>
                    </div>
                  </div>
                </div>
              </Section>

              {/* Animated FAQ (fires section_view="faq" internally) */}
              {frontmatter.mobileFAQ && frontmatter.mobileFAQ.length > 0 && (
                <div style={{ backgroundColor: '#1C1C1C' }}>
                  <AnimatedFAQ
                    items={frontmatter.mobileFAQ}
                    scrollProgress={1}
                    theme="dark"
                  />
                </div>
              )}

              {/* CTA Section (fires section_view="cta" internally) */}
              {frontmatter.ctaButtons && (
                <CTASection buttons={frontmatter.ctaButtons} />
              )}

              {/* Footer (fires section_view="footer" internally) */}
              <Footer />
            </TestimonialWithParallax>
          )}
        </div>
    </>
  )
}
