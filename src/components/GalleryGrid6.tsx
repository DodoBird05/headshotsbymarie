import Image from 'next/image'
import { useState } from 'react'
import { X } from 'lucide-react'

interface GalleryGrid6Props {
  // Column 1
  petsImage: string
  petsImageAlt: string
  petsLabel: string
  coffeeImage: string
  coffeeImageAlt: string
  coffeeLabel: string

  // Column 2
  watercolorImage: string
  watercolorImageAlt: string
  watercolorLabel: string
  hikesImage: string
  hikesImageAlt: string
  hikesLabel: string

  // Column 3
  awardImage: string
  awardImageAlt: string
  awardLabel: string
  toastmastersImage: string
  toastmastersImageAlt: string
  toastmastersLabel: string

  // Modal Images
  petsModalImage1: string
  petsModalImage1Alt: string
  petsModalImage1Text: string
  petsModalImage2: string
  petsModalImage2Alt: string
  petsModalImage2Text: string

  awardModalImage: string
  awardModalImageAlt: string

  toastmastersModalImage: string
  toastmastersModalImageAlt: string
  toastmastersModalText: string

  hikesModalImage1: string
  hikesModalImage1Alt: string
  hikesModalImage2: string
  hikesModalImage2Alt: string

  watercolorModalImage1: string
  watercolorModalImage1Alt: string
  watercolorModalImage2: string
  watercolorModalImage2Alt: string
}

export default function GalleryGrid6(props: GalleryGrid6Props) {
  const [showPetsModal, setShowPetsModal] = useState(false)
  const [showAwardModal, setShowAwardModal] = useState(false)
  const [showToastmastersModal, setShowToastmastersModal] = useState(false)
  const [showHikesModal, setShowHikesModal] = useState(false)
  const [showWatercolorModal, setShowWatercolorModal] = useState(false)

  return (
    <>
      <style>{`
        /* Desktop: 3 columns x 2 rows */
        .gallery-grid-6 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .gallery-label {
          font-size: 24px;
        }

        /* Mobile: 2 columns x 3 rows */
        @media (max-width: 768px) {
          .gallery-grid-6 {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          /* Reorder items for mobile */
          .grid-item-1 { order: 1; }  /* Pets */
          .grid-item-2 { order: 3; }  /* Cappuccino */
          .grid-item-3 { order: 5; }  /* Portraitist */
          .grid-item-4 { order: 2; }  /* Watercolors */
          .grid-item-5 { order: 4; }  /* Hikes */
          .grid-item-6 { order: 6; }  /* Toastmasters */

          /* Smaller font size for mobile */
          .gallery-label {
            font-size: 16px !important;
          }
        }
      `}</style>

      {/* 6 Individual Grid Items */}
      <div className="gallery-grid-6" style={{
        marginLeft: '2%',
        marginRight: '2%',
        minWidth: 0
      }}>

        {/* Item 1 - Pets */}
        <div className="grid-item-1">
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
              src={props.petsImage}
              alt={props.petsImageAlt}
              fill
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
            />
            {/* Text Overlay */}
            <div className="gallery-label" style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              color: 'white',
              fontWeight: 'bold',
              letterSpacing: '1px',
              pointerEvents: 'none'
            }}>
              {props.petsLabel}
            </div>
          </div>
        </div>

        {/* Item 2 - Cappuccino */}
        <div className="grid-item-2">
          <div style={{
            position: 'relative',
            aspectRatio: '4/3',
            overflow: 'hidden',
            borderRadius: '4px'
          }}>
            <Image
              src={props.coffeeImage}
              alt={props.coffeeImageAlt}
              fill
              style={{ objectFit: 'cover' }}
            />
            {/* Text Overlay */}
            <div className="gallery-label" style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              color: 'white',
              fontWeight: 'bold',
              letterSpacing: '1px',
              pointerEvents: 'none'
            }}>
              {props.coffeeLabel}
            </div>
          </div>
        </div>

        {/* Item 3 - Portraitist Award */}
        <div className="grid-item-3">
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
              src={props.awardImage}
              alt={props.awardImageAlt}
              fill
              style={{ objectFit: 'cover' }}
            />
            {/* Text Overlay */}
            <div className="gallery-label" style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              color: 'white',
              fontWeight: 'bold',
              letterSpacing: '1px',
              pointerEvents: 'none'
            }}>
              {props.awardLabel}
            </div>
          </div>
        </div>

        {/* Item 4 - Watercolors */}
        <div className="grid-item-4">
          <div
            style={{
              position: 'relative',
              aspectRatio: '4/3',
              overflow: 'hidden',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            onClick={() => setShowWatercolorModal(true)}
          >
            <Image
              src={props.watercolorImage}
              alt={props.watercolorImageAlt}
              fill
              style={{ objectFit: 'cover' }}
            />
            {/* Text Overlay */}
            <div className="gallery-label" style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              color: 'white',
              fontWeight: 'bold',
              letterSpacing: '1px',
              pointerEvents: 'none'
            }}>
              {props.watercolorLabel}
            </div>
          </div>
        </div>

        {/* Item 5 - Hikes */}
        <div className="grid-item-5">
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
              src={props.hikesImage}
              alt={props.hikesImageAlt}
              fill
              style={{ objectFit: 'cover' }}
            />
            {/* Text Overlay */}
            <div className="gallery-label" style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              color: 'white',
              fontWeight: 'bold',
              letterSpacing: '1px',
              pointerEvents: 'none'
            }}>
              {props.hikesLabel}
            </div>
          </div>
        </div>

        {/* Item 6 - Toastmasters */}
        <div className="grid-item-6">
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
              src={props.toastmastersImage}
              alt={props.toastmastersImageAlt}
              fill
              style={{ objectFit: 'cover' }}
            />
            {/* Text Overlay */}
            <div className="gallery-label" style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              color: 'white',
              fontWeight: 'bold',
              letterSpacing: '1px',
              pointerEvents: 'none'
            }}>
              {props.toastmastersLabel}
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
            {/* Pet 1 */}
            <div style={{
              position: 'relative',
              aspectRatio: '3/4',
              overflow: 'hidden',
              borderRadius: '8px'
            }}>
              <Image
                src={props.petsModalImage1}
                alt={props.petsModalImage1Alt}
                fill
                style={{ objectFit: 'cover' }}
              />
              {/* Text Overlay */}
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
                {props.petsModalImage1Text}
              </div>
            </div>

            {/* Pet 2 */}
            <div style={{
              position: 'relative',
              aspectRatio: '3/4',
              overflow: 'hidden',
              borderRadius: '8px'
            }}>
              <Image
                src={props.petsModalImage2}
                alt={props.petsModalImage2Alt}
                fill
                style={{ objectFit: 'cover' }}
              />
              {/* Text Overlay */}
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
                {props.petsModalImage2Text}
              </div>
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
                src={props.awardModalImage}
                alt={props.awardModalImageAlt}
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
                src={props.toastmastersModalImage}
                alt={props.toastmastersModalImageAlt}
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
              }}
              dangerouslySetInnerHTML={{ __html: props.toastmastersModalText }}
              />
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

          {/* Hiking Images */}
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
            {/* Hike 1 */}
            <div style={{
              position: 'relative',
              aspectRatio: '3/4',
              overflow: 'hidden',
              borderRadius: '8px'
            }}>
              <Image
                src={props.hikesModalImage1}
                alt={props.hikesModalImage1Alt}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>

            {/* Hike 2 */}
            <div style={{
              position: 'relative',
              aspectRatio: '3/4',
              overflow: 'hidden',
              borderRadius: '8px'
            }}>
              <Image
                src={props.hikesModalImage2}
                alt={props.hikesModalImage2Alt}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Watercolor Modal */}
      {showWatercolorModal && (
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
          onClick={() => setShowWatercolorModal(false)}
          onMouseLeave={() => setShowWatercolorModal(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setShowWatercolorModal(false)}
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

          {/* Watercolor Images */}
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
            {/* Watercolor 1 */}
            <div style={{
              position: 'relative',
              aspectRatio: '3/4',
              overflow: 'hidden',
              borderRadius: '8px'
            }}>
              <Image
                src={props.watercolorModalImage1}
                alt={props.watercolorModalImage1Alt}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>

            {/* Watercolor 2 */}
            <div style={{
              position: 'relative',
              aspectRatio: '3/4',
              overflow: 'hidden',
              borderRadius: '8px'
            }}>
              <Image
                src={props.watercolorModalImage2}
                alt={props.watercolorModalImage2Alt}
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
