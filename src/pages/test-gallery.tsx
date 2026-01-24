import ScatteredImageGallery from '@/components/ScatteredImageGallery'

// Pattern: R1:S left, R2:M right, R3:L, R4:S right, R5:M left, R6:L, R7:S left, R8:M left, R9:S right, R10:L
const testImages = [
  // R1: S left
  {
    src: '/images/Good Photos/Professional-Headshot-of-Scott-By-Marie-Feutrier.webp',
    alt: 'Professional headshot of Scott',
    headingAbove: 'LinkedIn Profile',
    size: 'S' as const,
    align: 'left' as const
  },
  // R2: M right
  {
    src: '/images/Good Photos/Acting-Headshot-of-Martha-By-Marie-Feutrier.webp',
    alt: 'Acting headshot of Martha',
    headingAbove: 'Actor Headshots',
    size: 'M' as const,
    align: 'right' as const
  },
  // R3: L
  {
    src: '/images/Good Photos/Executive-Portrait-of-Kyle-Wright-By-Marie-Feutrier.webp',
    alt: 'Executive portrait of Kyle',
    headingAbove: 'Executive Portraits',
    size: 'L' as const,
    align: 'center' as const
  },
  // R4: S left
  {
    src: '/images/Good Photos/Personal-Branding-Photography-of-Jaime-By-Marie-Feutrier.webp',
    alt: 'Personal branding of Jaime',
    headingAbove: 'Personal Branding',
    size: 'S' as const,
    align: 'left' as const
  },
  // R5: M right
  {
    src: '/images/Good Photos/Professional-Headshot-of-Natalie-By-Marie-Feutrier.webp',
    alt: 'Professional headshot of Natalie',
    headingAbove: 'Editorial',
    size: 'M' as const,
    align: 'right' as const
  },
  // R6: L
  {
    src: '/images/Good Photos/Actor-Portrait-of-Johnny-By-Marie-Feutrier.webp',
    alt: 'Actor portrait of Johnny',
    headingAbove: 'Creative',
    size: 'L' as const,
    align: 'center' as const
  },
  // R7: S left
  {
    src: '/images/Good Photos/Professional-Headshot-of-Laura-Hanish-By-Marie-Feutrier.webp',
    alt: 'Professional headshot of Laura',
    headingAbove: 'Professional',
    size: 'S' as const,
    align: 'left' as const
  },
  // R8: M left
  {
    src: '/images/Good Photos/Theatrical-Headshot-of-Kristen-By-Marie-Feutrier.webp',
    alt: 'Theatrical headshot of Kristen',
    headingAbove: 'Theatrical',
    size: 'M' as const,
    align: 'left' as const
  },
  // R9: S right
  {
    src: '/images/Good Photos/Professional-Headshot-of-Erich-By-Marie-Feutrier.webp',
    alt: 'Professional headshot of Erich',
    headingAbove: 'Corporate',
    size: 'S' as const,
    align: 'right' as const
  },
  // R10: L
  {
    src: '/images/Good Photos/Professional-Headshot-of-Tommy-By-Marie-Feutrier.webp',
    alt: 'Professional headshot of Tommy',
    headingAbove: 'Lifestyle',
    size: 'L' as const,
    align: 'center' as const
  }
]

export default function TestGalleryPage() {
  return (
    <div className="bg-white min-h-screen relative">
      <ScatteredImageGallery images={testImages} topOffset="40px" />
    </div>
  )
}
