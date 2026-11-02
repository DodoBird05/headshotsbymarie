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
    revealText: string[]
    splitTitle: string[]
    splitText: string
    storyHeading: string
    storyParagraphs: string[]
    behindTheLensHeading: string
    behindTheLensText: string
    behindTheLensCta: string
    darkGallery: { imagePath: string; imageAlt: string; title: string; text: string }[]
    notForEveryoneHeading: string
    notForEveryoneParagraphs: string[]
    calloutImage: string
    calloutImageAlt: string
    calloutQuote: string
    calloutAuthor: string
    calloutSource: string
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

// "Headshot Photographer" kicker + the "An Experience Worth Showing Up For"
// heading under the hero. One definition for both the mobile and desktop
// branches so their typography can't drift; only sizes are passed in. The
// wording lives in content/home.md (revealText).
function IntroHeading({ as: Tag, lines, kickerSize, kickerGap, headingSize }: {
  as: 'h2' | 'div'; lines: string[]; kickerSize: string; kickerGap: string; headingSize: string
}) {
  return (
    <>
      <div
        style={{
          fontFamily: '"Romie", serif',
          fontWeight: 300,
          fontSize: kickerSize,
          letterSpacing: '0.25em',
          color: '#1C1C1C',
          marginBottom: kickerGap
        }}
      >
        Headshot Photographer
      </div>
      <Tag
        style={{
          fontFamily: '"Romie", serif',
          fontWeight: 300,
          color: '#1C1C1C',
          lineHeight: 1.2,
          fontSize: headingSize,
          letterSpacing: '0.02em',
          margin: 0
        }}
      >
        {lines.map((line, index) => (
          <span key={index}>
            <span dangerouslySetInnerHTML={{ __html: line }} />
            {index < lines.length - 1 && <br />}
          </span>
        ))}
      </Tag>
    </>
  )
}

// The homepage hero headline. Rendered in both the mobile and desktop branches
// from this one definition so the typography is identical everywhere; only the
// size is passed in.
function HeroHeadline({ as: Tag, fontSize }: { as: 'h1' | 'p'; fontSize: string }) {
  return (
    <Tag
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
        fontSize,
        margin: 0
      }}
    >
      {/* "Kind of" never splits, so a narrow screen can't strand "OF" alone. */}
      <span style={{ textTransform: 'uppercase' }}>A Different <span style={{ whiteSpace: 'nowrap' }}>Kind of</span></span>
      <br />
      <em style={{ fontStyle: 'italic' }}>
        <span style={{ textTransform: 'uppercase' }}>Headshot</span> Experience
      </em>
    </Tag>
  )
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
          {/* Static hero image with H1. Both this block and the desktop block below
              are always in the DOM (only display differs), and a display:none <img>
              still downloads — so each branch must resolve to the SAME file at a
              given viewport or the page fetches two heroes. Identical <picture>
              markup in both branches guarantees that: one URL, one download.
              Same idiom as LocationPageTemplate's fullbleed hero. */}
          <Section name="hero" index={0}>
          <div className="relative w-full" style={{ height: '100vh' }}>
            <picture>
              <source media="(max-width: 768px)" srcSet={getMobileSrc(frontmatter.defaultHeroImage)} />
              <img
                src={frontmatter.defaultHeroImage}
                alt={frontmatter.defaultHeroImageAlt}
                className="absolute inset-0 w-full h-full object-cover"
                fetchPriority="high"
              />
            </picture>
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
              {/* Same headline as desktop (one component, so the two can't drift);
                  only the size differs. A <p> here because the desktop copy is
                  the page's single <h1>. */}
              <HeroHeadline as="p" fontSize="clamp(2.2rem, 9vw, 3.5rem)" />
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
              <IntroHeading as="div" lines={frontmatter.revealText} kickerSize="0.7rem" kickerGap="1.5rem" headingSize="7vw" />
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
            <picture>
              <source media="(max-width: 768px)" srcSet={getMobileSrc(frontmatter.defaultHeroImage)} />
              <img
                src={frontmatter.defaultHeroImage}
                alt={frontmatter.defaultHeroImageAlt}
                className="w-full h-full object-cover"
                fetchPriority="high"
              />
            </picture>
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
              <HeroHeadline as="h1" fontSize="clamp(2.5rem, 5vw, 4.5rem)" />
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
              <IntroHeading as="h2" lines={frontmatter.revealText} kickerSize="0.85rem" kickerGap="2rem" headingSize="clamp(2rem, 3.5vw, 3.5rem)" />
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
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#D4A843'; e.currentTarget.style.borderColor = '#D4A843'; e.currentTarget.style.color = '#1C1C1C' }}
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
                  {frontmatter.splitTitle.map((line, i) => (
                    <span key={i}>
                      {i > 0 && <br />}
                      <span dangerouslySetInnerHTML={{ __html: line }} />
                    </span>
                  ))}
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
                        {frontmatter.splitText}
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
                        {frontmatter.storyHeading}
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-reveal data-reveal-delay="200">
                      {frontmatter.storyParagraphs.map((p, i) => (
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
                    {frontmatter.behindTheLensHeading}
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
                    {frontmatter.behindTheLensText}
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
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#D4A843'; e.currentTarget.style.borderColor = '#D4A843'; e.currentTarget.style.color = '#1C1C1C' }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = '#F5F0EB'; e.currentTarget.style.color = '#F5F0EB' }}
                    onClick={() => trackButtonClick(frontmatter.behindTheLensCta, 'homepage_experience_cta', '/pricing')}
                  >
                    {frontmatter.behindTheLensCta}
                  </Link>
                </div>

                {/* Editorial gallery on dark background with 4 text blocks per image */}
                <ScatteredEditorial
                  background="transparent"
                  dark={true}
                  location="home_editorial_dark"
                  items={frontmatter.darkGallery}
                />
              </Section>

              {/* ===== This Is Not for Everyone — closing grid ===== */}
              <Section name="not_for_everyone" index={9} as="section" className="py-20 md:py-28 md:-mt-48" style={{ backgroundColor: 'transparent', position: 'relative', zIndex: 1 }}>
                <div className="max-w-6xl mx-auto px-8">
                  <div className="grid grid-cols-1 md:grid-cols-[35%_1fr] gap-12">
                    <div data-reveal>
                      <h2 style={{ fontFamily: '"Romie", serif', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 300, color: '#F5F0EB',  letterSpacing: '0.03em', lineHeight: 1.1 }}>
                        {frontmatter.notForEveryoneHeading}
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-reveal data-reveal-delay="200">
                      {frontmatter.notForEveryoneParagraphs.map((p, i) => (
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
                        src={frontmatter.calloutImage}
                        alt={frontmatter.calloutImageAlt}
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
                      
                        dangerouslySetInnerHTML={{ __html: frontmatter.calloutQuote }}
                      />
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
                        {frontmatter.calloutAuthor} &nbsp;·&nbsp; {frontmatter.calloutSource}
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
