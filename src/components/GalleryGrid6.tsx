import Image from 'next/image'
import { useState } from 'react'
import { X } from 'lucide-react'

export default function GalleryGrid6() {
  const [showPetsModal, setShowPetsModal] = useState(false)
  const [showAwardModal, setShowAwardModal] = useState(false)
  const [showToastmastersModal, setShowToastmastersModal] = useState(false)
  const [showHikesModal, setShowHikesModal] = useState(false)

  return (
    <>
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
          >
            <Image
              src="/images/About Marie/Marie-Penny.webp"
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
          <div style={{
            position: 'relative',
            aspectRatio: '4/3',
            overflow: 'hidden',
            borderRadius: '4px'
          }}>
            <Image
              src="/images/About Marie/Cappuccino.webp"
              alt="Cappuccino"
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
              Cappuccinos and Espressos
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div className="photo-column" style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <div style={{
            position: 'relative',
            aspectRatio: '4/3',
            overflow: 'hidden',
            borderRadius: '4px'
          }}>
            <Image
              src="/images/About Marie/Watercolor-painting.webp"
              alt="Watercolors"
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
              Watercolors
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
            onClick={() => setShowHikesModal(true)}
          >
            <Image
              src="/images/About Marie/Lac-Petarel.webp"
              alt="Lake of Pétarel"
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
              Hikes
            </div>
          </div>
        </div>

        {/* Column 3 */}
        <div className="photo-column column-3" style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <div
            style={{
              position: 'relative',
              aspectRatio: '4/3',
              overflow: 'hidden',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            onClick={() => setShowAwardModal(true)}
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
          <div
            style={{
              position: 'relative',
              aspectRatio: '4/3',
              overflow: 'hidden',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            onClick={() => setShowToastmastersModal(true)}
          >
            <Image
              src="/images/About Marie/PRM-Badge.webp"
              alt="Toastmasters"
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
              Toastmasters
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
                src="/images/About Marie/Copper.webp"
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
                src="/images/About Marie/Marie-Penny.webp"
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

      {/* Toastmasters Modal */}
      {showToastmastersModal && (
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
          onClick={() => setShowToastmastersModal(false)}
          onMouseLeave={() => setShowToastmastersModal(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setShowToastmastersModal(false)}
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

          {/* Speech Image with Text */}
          <div
            style={{
              maxWidth: '500px',
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
                src="/images/About Marie/Marie-Best-Speaker.webp"
                alt="Best Speaker"
                fill
                style={{ objectFit: 'contain' }}
              />
              {/* Text Overlay on Modal Image */}
              <div style={{
                position: 'absolute',
                bottom: '40px',
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'white',
                fontSize: '20px',
                fontWeight: 'bold',
                textAlign: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                padding: '15px 30px',
                borderRadius: '8px',
                letterSpacing: '1px'
              }}>
                member of Gilbert Toastmasters<br />and ProjectMasters
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hikes Modal */}
      {showHikesModal && (
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
          onClick={() => setShowHikesModal(false)}
          onMouseLeave={() => setShowHikesModal(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setShowHikesModal(false)}
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

          {/* Hiking Images - Grand Canyon and Marie */}
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
            {/* Grand Canyon */}
            <div style={{
              position: 'relative',
              aspectRatio: '3/4',
              overflow: 'hidden',
              borderRadius: '8px'
            }}>
              <Image
                src="/images/About Marie/Grand-Canyon.webp"
                alt="Grand Canyon"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>

            {/* Marie Hiking */}
            <div style={{
              position: 'relative',
              aspectRatio: '3/4',
              overflow: 'hidden',
              borderRadius: '8px'
            }}>
              <Image
                src="/images/About Marie/Marie-hiking.webp"
                alt="Marie Hiking"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
