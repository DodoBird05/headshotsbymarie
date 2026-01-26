import Image from 'next/image'

interface ServiceHeroProps {
  heroImage: string
  heroImageAlt: string
  heroTitle: string
  heroSubtitle: string
  pageTitle: string
  textColor?: 'light' | 'dark'
}

export default function ServiceHero({
  heroImage,
  heroImageAlt,
  heroTitle,
  heroSubtitle,
  pageTitle,
  textColor = 'light'
}: ServiceHeroProps) {
  const color = textColor === 'light' ? '#FAFAFA' : '#1C1C1C'

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Hero Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={heroImage}
          alt={heroImageAlt}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex">
        {/* Desktop: 3 Column Layout */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-8 md:min-h-screen md:w-full px-8">
          {/* First Column - Hero Title */}
          <div className="text-left space-y-4 flex flex-col justify-center">
            <div className="text-2xl" style={{ color }}>
              {heroTitle.split(' ').map((word, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: '"Hanken Grotesk", sans-serif',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}
                >
                  {word}{i < heroTitle.split(' ').length - 1 ? ' ' : ''}
                </span>
              ))}
            </div>
          </div>

          {/* Middle Column - Empty */}
          <div></div>

          {/* Third Column - Page Title & Subtitle at bottom */}
          <div className="flex flex-col justify-end items-start pb-16">
            <div className="text-left">
              <h1
                className="text-lg font-light mb-2"
                style={{
                  fontFamily: '"Hanken Grotesk", sans-serif',
                  color,
                  fontWeight: 300,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}
              >
                {pageTitle}
              </h1>
              <div
                className="text-4xl font-light"
                style={{
                  fontFamily: '"Hanken Grotesk", sans-serif',
                  color,
                  fontWeight: 300
                }}
              >
                {heroSubtitle}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Stacked Layout at Bottom */}
        <div className="md:hidden flex flex-col justify-end min-h-screen w-full py-20 px-8">
          <div className="text-left pb-8">
            {/* Page Title */}
            <h1
              className="text-sm font-light mb-2"
              style={{
                fontFamily: '"Hanken Grotesk", sans-serif',
                color,
                fontWeight: 300,
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}
            >
              {pageTitle}
            </h1>

            {/* Hero Title */}
            <div className="text-base mb-6" style={{ color }}>
              {heroTitle.split(' ').map((word, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: '"Hanken Grotesk", sans-serif',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}
                >
                  {word}{i < heroTitle.split(' ').length - 1 ? ' ' : ''}
                </span>
              ))}
            </div>

            {/* Subtitle */}
            <div
              className="text-xl font-light"
              style={{
                fontFamily: '"Hanken Grotesk", sans-serif',
                color,
                fontWeight: 300
              }}
            >
              {heroSubtitle}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
