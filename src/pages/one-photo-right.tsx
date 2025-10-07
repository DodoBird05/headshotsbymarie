import Layout from '@/components/Layout'
import Image from 'next/image'

export default function OnePhotoRight() {
  return (
    <Layout title="One Photo Right" description="One Photo Right page">
      <section className="min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 md:h-screen">
          {/* Left Column - Text */}
          <div className="flex flex-col justify-center md:justify-end items-start px-8 md:px-16 py-16 md:pb-16 md:py-0">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-light mb-6"
              style={{
                fontFamily: '"Hanken Grotesk", sans-serif',
                fontWeight: 300,
                lineHeight: 1.2,
                color: '#1C1C1C'
              }}
            >
              Placeholder For Title
            </h2>
            <p
              className="text-lg md:text-xl"
              style={{
                fontFamily: '"Hanken Grotesk", sans-serif',
                fontWeight: 300,
                color: '#1C1C1C'
              }}
            >
              Placeholder for paragraph
            </p>
          </div>

          {/* Right Column - Image */}
          <div className="relative h-screen md:h-full w-full">
            <Image
              src="/images/good photos/Dave.webp"
              alt="One Photo"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </Layout>
  )
}
