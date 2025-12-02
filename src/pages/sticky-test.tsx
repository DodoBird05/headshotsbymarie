import Layout from '@/components/Layout'
import Head from 'next/head'
import StickyTextToPhotos from '@/components/StickyTextToPhotos'

export default function StickyTestPage() {
  return (
    <>
      <Head>
        <title>Sticky Component Test - Portraits By Marie</title>
        <meta name="description" content="Testing sticky text to photos component" />
      </Head>

      <Layout title="Sticky Component Test" description="Testing sticky text to photos component">
        {/* Test the StickyTextToPhotos Component */}
        <StickyTextToPhotos
          text="Where artistry meets authenticity"
          images={[
            {
              src: "/images/Home page Gallery/Professional-Headshot-of-James-By-Marie-Feutrier.webp",
              alt: "Professional headshot James"
            },
            {
              src: "/images/Good Photos/Guacy.webp",
              alt: "Professional headshot Guacy"
            },
            {
              src: "/images/Good Photos/Erich.webp",
              alt: "Professional headshot Erich",
              className: "photo-erich"
            }
          ]}
        />

        {/* Some content after to allow scrolling */}
        <section style={{ backgroundColor: '#f5f5f5', padding: '80px', minHeight: '50vh' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>
              Test Content Below
            </h2>
            <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
              This is additional content to demonstrate the sticky scroll effect.
              Scroll up to see the component in action.
            </p>
          </div>
        </section>
      </Layout>
    </>
  )
}
