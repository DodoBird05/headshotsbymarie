import Layout from '@/components/Layout'
import Image from 'next/image'

export default function TestPage() {
  return (
    <Layout title="Test Page" description="Test page for new components">
      <div className="min-h-screen bg-black">
        {/* 3 Rows of Photos */}
        <div className="space-y-4 px-8 py-8" style={{ transform: 'rotate(-10deg) scale(0.5) translateX(50%)', transformOrigin: 'center' }}>
          {/* Row 1 */}
          <div className="grid grid-cols-8 gap-4">
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden group cursor-pointer" style={{ transform: 'rotate(10deg) translateY(-8px)' }}>
              <Image src="/images/good photos/Dave.webp" alt="Portfolio 1" fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="relative aspect-[5/4] rounded-lg overflow-hidden group cursor-pointer col-span-2" style={{ transform: 'rotate(10deg) translateY(12px)' }}>
              <Image src="/images/good photos/Acting-Headshot-of-DeShawn-By-Marie-Feutrier.webp" alt="Portfolio 2" fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div></div>
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden group cursor-pointer" style={{ transform: 'rotate(10deg) translateY(-5px)' }}>
              <Image src="/images/good photos/Erich.webp" alt="Portfolio 3" fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden group cursor-pointer" style={{ transform: 'rotate(10deg) translateY(10px)' }}>
              <Image src="/images/good photos/Guacy.webp" alt="Portfolio 4" fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="relative aspect-[5/4] rounded-lg overflow-hidden group cursor-pointer col-span-2" style={{ transform: 'rotate(10deg) translateY(-3px)' }}>
              <Image src="/images/good photos/Jaime-800.webp" alt="Portfolio 5" fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-8 gap-4">
            <div className="relative aspect-[5/4] rounded-lg overflow-hidden group cursor-pointer col-span-2" style={{ transform: 'rotate(10deg) translateY(8px)' }}>
              <Image src="/images/good photos/Janelle.webp" alt="Portfolio 6" fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden group cursor-pointer" style={{ transform: 'rotate(10deg) translateY(-10px)' }}>
              <Image src="/images/good photos/Janine.webp" alt="Portfolio 7" fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div></div>
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden group cursor-pointer" style={{ transform: 'rotate(10deg) translateY(15px)' }}>
              <Image src="/images/good photos/Johnny.webp" alt="Portfolio 8" fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden group cursor-pointer" style={{ transform: 'rotate(10deg) translateY(-6px)' }}>
              <Image src="/images/good photos/Kasia.webp" alt="Portfolio 9" fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden group cursor-pointer" style={{ transform: 'rotate(10deg) translateY(7px)' }}>
              <Image src="/images/good photos/Theatrical-Headshot-of-Kristen-By-Marie-Feutrier.webp" alt="Portfolio 10" fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div></div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-8 gap-4">
            <div></div>
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden group cursor-pointer" style={{ transform: 'rotate(10deg) translateY(-12px)' }}>
              <Image src="/images/good photos/Executive-Portrait-of-Kyle-Wright-By-Marie-Feutrier.webp" alt="Portfolio 11" fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="relative aspect-[5/4] rounded-lg overflow-hidden group cursor-pointer col-span-2" style={{ transform: 'rotate(10deg) translateY(5px)' }}>
              <Image src="/images/good photos/Professional-Headshot-of-Laura-Hanish-By-Marie-Feutrier.webp" alt="Portfolio 12" fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden group cursor-pointer" style={{ transform: 'rotate(10deg) translateY(-8px)' }}>
              <Image src="/images/good photos/Mallory.webp" alt="Portfolio 13" fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div></div>
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden group cursor-pointer" style={{ transform: 'rotate(10deg) translateY(10px)' }}>
              <Image src="/images/good photos/Martha.webp" alt="Portfolio 14" fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden group cursor-pointer" style={{ transform: 'rotate(10deg) translateY(-4px)' }}>
              <Image src="/images/good photos/Natalie .webp" alt="Portfolio 15" fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
