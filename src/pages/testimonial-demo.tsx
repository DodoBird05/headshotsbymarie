import TestimonialCarousel from '@/components/TestimonialCarousel'

export default function TestimonialDemo() {
  const testimonials = [
    {
      text: '"This is my second time using Marie, she is a delight to work with"',
      author: 'Rachel S',
      imagePath: '/images/testimonials/Professional-Women-Headshots-Phoenix-Arizona-By-Marie-Feutrier.webp',
      imageAlt: 'Professional Women Headshots Phoenix Arizona'
    },
    {
      text: '"Marie is exceptional and the photos are quite possibly the best that have ever been captured of me."',
      author: 'Aleta W',
      imagePath: '/images/testimonials/Professional-Blonde-Woman-Black-Blazer-Portrait-Marie-Feutrier.webp',
      imageAlt: 'Professional blonde woman in elegant black pinstripe blazer with confident expression against dark backdrop'
    }
  ] as [any, any]

  return (
    <div>
      {/* Spacer to allow scrolling */}
      <section style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: '"Hanken Grotesk", sans-serif', fontSize: '48px', marginBottom: '20px' }}>
            Testimonial Carousel Demo
          </h1>
          <p style={{ fontFamily: '"Hanken Grotesk", sans-serif', fontSize: '24px', color: '#666' }}>
            Scroll down to see the animation
          </p>
        </div>
      </section>

      {/* Testimonial Carousel */}
      <TestimonialCarousel testimonials={testimonials} transitionDelay={3000} />

      {/* Bottom spacer */}
      <section style={{ minHeight: '50vh', backgroundColor: '#f5f5f5' }} />
    </div>
  )
}
