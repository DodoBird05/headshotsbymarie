import Layout from '@/components/Layout'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { X } from 'lucide-react'

export default function GalleryGrid6() {
  const [showPetsModal, setShowPetsModal] = useState(false)
  const [showAwardModal, setShowAwardModal] = useState(false)

  return (
    <>
      <Head>
        <title>Gallery Grid 6 - Portraits By Marie</title>
        <meta name="description" content="6-image gallery in 3 columns" />
        <style>{`
          /* Responsive layout for mobile devices */
          @media (max-width: 768px) {
            .photo-column {
              gap: 8px !important;
            }
            .gallery-grid-6 {
              grid-template-columns: repeat(2, 1fr) !important;
            }
            .column-3 {
              grid-column: 1 / -1;
              flex-direction: row !important;
            }
            .column-3 > div {
              flex: 1;
              min-width: 0;
            }
          }
        `}</style>
      </Head>

      <Layout title="Gallery Grid 6" description="6-image gallery component">
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '40px 20px'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            Gallery Grid 6
          </h1>

          {/* 3 Columns with 2 Photos Each */}
          <div className="gallery-grid-6" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
            marginLeft: '2%',
            marginRight: '2%',
            minWidth: 0
          }}>

            {/* Column 1 */}
            <div className="photo-column" style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '4/3',
                  overflow: 'hidden',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                onClick={() => setShowPetsModal(true)}
                onMouseEnter={() => setShowPetsModal(true)}
              >
                <Image
                  src="/images/About Marie/Marie et Penny 01 For Web Use.jpg"
                  alt="Marie and Penny"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                />
                {/* Text Overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  letterSpacing: '1px',
                  pointerEvents: 'none'
                }}>
                  Pets
                </div>
              </div>
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '4/3',
                  overflow: 'hidden',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                onClick={() => setShowAwardModal(true)}
                onMouseEnter={() => setShowAwardModal(true)}
              >
                <Image
                  src="/images/About Marie/Portraitist.webp"
                  alt="Portraitist Award"
                  fill
                  style={{ objectFit: 'cover' }}
                />
                {/* Text Overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  letterSpacing: '1px',
                  pointerEvents: 'none'
                }}>
                  Portraitist Award
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="photo-column" style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <div style={{
                background: '#ddd',
                aspectRatio: '4/3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999',
                fontSize: '14px'
              }}>
                Photo 3
              </div>
              <div style={{
                background: '#ddd',
                aspectRatio: '4/3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999',
                fontSize: '14px'
              }}>
                Photo 4
              </div>
            </div>

            {/* Column 3 */}
            <div className="photo-column column-3" style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <div style={{
                background: '#ddd',
                aspectRatio: '4/3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999',
                fontSize: '14px'
              }}>
                Photo 5
              </div>
              <div style={{
                background: '#ddd',
                aspectRatio: '4/3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999',
                fontSize: '14px'
              }}>
                Photo 6
              </div>
            </div>

          </div>
        </div>

        {/* Pets Modal */}
        {showPetsModal && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '20px'
            }}
            onClick={() => setShowPetsModal(false)}
            onMouseLeave={() => setShowPetsModal(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowPetsModal(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 1001
              }}
            >
              <X className="h-6 w-6" />
            </button>

            {/* Pet Images - Copper and Penny */}
            <div
              style={{
                maxWidth: '1200px',
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '8px'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Copper */}
              <div style={{
                position: 'relative',
                aspectRatio: '3/4',
                overflow: 'hidden',
                borderRadius: '8px'
              }}>
                <Image
                  src="/images/About Marie/Copper.jpg"
                  alt="Copper"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>

              {/* Penny */}
              <div style={{
                position: 'relative',
                aspectRatio: '3/4',
                overflow: 'hidden',
                borderRadius: '8px'
              }}>
                <Image
                  src="/images/About Marie/Marie et Penny 01 For Web Use.jpg"
                  alt="Penny"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Portraitist Award Modal */}
        {showAwardModal && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '20px'
            }}
            onClick={() => setShowAwardModal(false)}
            onMouseLeave={() => setShowAwardModal(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowAwardModal(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 1001
              }}
            >
              <X className="h-6 w-6" />
            </button>

            {/* Award Image */}
            <div
              style={{
                maxWidth: '800px',
                width: '100%'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{
                position: 'relative',
                aspectRatio: '3/4',
                overflow: 'hidden',
                borderRadius: '8px'
              }}>
                <Image
                  src="/images/About Marie/Portraitist.webp"
                  alt="Portraitist Award"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        )}
      </Layout>
    </>
  )
}
