import { GridMotion } from "@/components/ui/grid-motion"

interface GalleryProps {
  images: { src: string; alt: string }[]
}

export default function Gallery({ images }: GalleryProps) {
  // Extract just the src paths for GridMotion (which expects string[])
  const items = images.map(img => img.src)

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
