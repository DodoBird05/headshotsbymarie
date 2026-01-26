import Image from 'next/image'

interface ServiceHeroProps {
  heroImage: string
  heroImageAlt: string
  pageTitle: string
  subtitle?: string
  textColor?: 'light' | 'dark'
}

export default function ServiceHero({
  heroImage,
  heroImageAlt,
  pageTitle,
  subtitle,
  textColor = 'light'
}: ServiceHeroProps) {
  const color = textColor === 'light' ? '#ffffff' : '#1C1C1C'

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

      {/* Centered H1 at bottom - matching home page style */}
      <h1
        className="absolute bottom-[15vh] left-0 right-0 text-center text-2xl md:text-4xl z-10"
        style={{
          fontFamily: '"Hanken Grotesk", sans-serif',
          fontWeight: 400,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color,
          lineHeight: 1.1
        }}
      >
        {pageTitle}
        {subtitle && (
          <>
            <br />
            <span
              className="text-lg md:text-2xl"
              style={{
                fontFamily: '"Hanken Grotesk", sans-serif',
                fontWeight: 400,
                letterSpacing: '0.1em'
              }}
            >
              {subtitle}
            </span>
          </>
        )}
      </h1>
    </section>
  )
}
