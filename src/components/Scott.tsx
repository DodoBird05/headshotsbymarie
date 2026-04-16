'use client'

import CardStackCarousel from './CardStackCarousel'

export default function Scott() {
  return (
    <>
      <CardStackCarousel
        heading="For people who want to be seen"
        subtext="At Headshots by Marie we think that a portrait is more than a picture, it's a story to tell, people to meet, a strategy to build."
        heroImage={{
          src: "/images/Corporate/Business-Portrait-Matt-Corporate-Headshot-Phoenix-Arizona-By-Marie-Feutrier.webp",
          alt: "Professional business portrait of Matt"
        }}
        carouselImages={[
          { src: "/images/Corporate/Professional-Headshot-Andrea-Business-Owner-Phoenix-Arizona-By-Marie-Feutrier.webp", alt: "Professional headshot of Andrea" },
          { src: "/images/Corporate/Corporate-Headshot-Arjun-Phoenix-Arizona-By-Marie-Feutrier.webp", alt: "Corporate headshot of Arjun" },
          { src: "/images/Corporate/Professional-Headshot-Brenda-Careaga-Corporate-Portrait-Phoenix-Arizona-By-Marie-Feutrier.webp", alt: "Professional headshot of Brenda Careaga" },
          { src: "/images/Corporate/Creative-Business-Portrait-Kyle-Professional-Headshot-Phoenix-Arizona-By-Marie-Feutrier.webp", alt: "Creative business portrait of Kyle" },
        ]}
      />

      {/* Test section */}
      <div style={{ backgroundColor: '#F5F0EB', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ fontFamily: '"Majesti Banner", serif', fontSize: '3rem', fontWeight: 300, color: '#1C1C1C' }}>
          Next section starts here
        </h2>
      </div>
    </>
  )
}
