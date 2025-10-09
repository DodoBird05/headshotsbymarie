import { GridMotion } from "@/components/ui/grid-motion"

export default function Gallery() {
  const items = [
    '/images/Good Photos/Dave.webp',
    '/images/Good Photos/DeShawn.webp',
    '/images/Good Photos/Erich.webp',
    '/images/Good Photos/Guacy.webp',
    '/images/Good Photos/Jaime-800.webp',
    '/images/Good Photos/Janelle.webp',
    '/images/Good Photos/Janine.webp',
    '/images/Good Photos/Johnny.webp',
    '/images/Good Photos/Kasia.webp',
    '/images/Good Photos/Kristen-actor-headshot.webp',
    '/images/Good Photos/Kyle Wright 05 For Web Use.webp',
    '/images/Good Photos/Laura Hanish 02 For Web Use.webp',
    '/images/Good Photos/Mallory.webp',
    '/images/Good Photos/Martha.webp',
    '/images/Good Photos/Natalie .webp',
    '/images/Good Photos/Natalie.webp',
    '/images/Good Photos/Russell-800.webp',
    '/images/Good Photos/Shannon.webp',
    '/images/Good Photos/Sien-Short Depth of field.webp',
    '/images/Good Photos/Suzanne 2-800.webp',
    '/images/Good Photos/Dave.webp',
    '/images/Good Photos/DeShawn.webp',
    '/images/Good Photos/Erich.webp',
    '/images/Good Photos/Guacy.webp',
    '/images/Good Photos/Jaime-800.webp',
    '/images/Good Photos/Janelle.webp',
    '/images/Good Photos/Janine.webp',
    '/images/Good Photos/Johnny.webp',
  ]

  return (
    <div className="relative">
      {/* Top Shadow */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />

      {/* Default grid with system-generated items */}
      <div className="h-screen w-full bg-dark">
        <GridMotion items={items} gradientColor="transparent" />
      </div>

      {/* Bottom Shadow */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
    </div>
  )
}
