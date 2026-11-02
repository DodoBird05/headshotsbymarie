import type { CSSProperties } from 'react'
import { getMobileSrc } from '@/lib/responsiveImage'

// An <img> that serves the pre-generated "-mobile" variant on phones
// (max-width 768px, the site-wide mobile breakpoint) and the full file on
// larger screens. For photos shown small on phones: carousels, grids, the
// footer. The variant must exist next to the original; the build's image
// check fails if it does not. Don't use it where the photo is shown
// full-width on a phone and the variant is narrower than ~3x that width.
export default function MobileAwareImg({
  src,
  alt,
  className,
  style,
  loading = 'lazy',
}: {
  src: string
  alt: string
  className?: string
  style?: CSSProperties
  loading?: 'lazy' | 'eager'
}) {
  return (
    <picture>
      <source media="(max-width: 768px)" srcSet={getMobileSrc(src)} />
      <img src={src} alt={alt} className={className} style={style} loading={loading} decoding="async" />
    </picture>
  )
}
