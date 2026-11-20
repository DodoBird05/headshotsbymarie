import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export interface GalleryPhoto {
  imagePath: string
  imageAlt: string
}

interface ExampleGalleryProps {
  title: string
  photos: GalleryPhoto[]
  onClose: () => void
}

// Full-screen gallery of example photos for one client-portal option.
// Photos are shown whole (no cropping) in a masonry layout, so Marie's own crops stay as she made them.
// Portalled to <body> so it sits above the sticky nav; Escape, the close button or a click outside closes it.
export default function ExampleGallery({ title, photos, onClose }: ExampleGalleryProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} examples`}
      className="fixed inset-0 overflow-y-auto"
      style={{ zIndex: 2000, backgroundColor: '#1C1C1C' }}
      onClick={onClose}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-20 pb-16" onClick={(e) => e.stopPropagation()}>
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close"
          className="fixed top-5 right-5 md:top-8 md:right-8 text-white p-2 rounded-full hover:text-[#D4A843] transition-colors"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <h2
          className="text-center text-3xl md:text-5xl mb-5"
          style={{ fontFamily: '"Romie", serif', fontWeight: 300, color: '#FFFFFF' }}
        >
          {title}
        </h2>
        <div className="mx-auto mb-12" style={{ width: '60px', height: '2px', backgroundColor: '#D4A843' }} />

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {photos.map((photo) => (
            // Plain <img>: the masonry needs each photo's natural aspect ratio
            <img
              key={photo.imagePath}
              src={photo.imagePath}
              alt={photo.imageAlt}
              loading="lazy"
              className="w-full h-auto mb-6 break-inside-avoid block"
            />
          ))}
        </div>
      </div>
    </div>,
    document.body
  )
}
