import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'

interface GalleryItem {
  name: string
  text: string
  image: string
  link?: string
  linkText?: string
}

interface HorizontalScrollGalleryProps {
  title: string
  columns: GalleryItem[][]
}

export default function HorizontalScrollGallery({ title, columns }: HorizontalScrollGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = (scrollTop / docHeight) * 100
      setScrollProgress(scrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .horizontal-scroll-gallery .white-column { display: none !important; }
          .horizontal-scroll-gallery .horizontal-scroll { display: none !important; }
          .horizontal-scroll-gallery .mobile-stack { display: block !important; }
        }

        @media (min-width: 769px) {
          .horizontal-scroll-gallery .white-column { display: flex !important; }
          .horizontal-scroll-gallery .horizontal-scroll { display: block !important; }
          .horizontal-scroll-gallery .mobile-stack { display: none !important; }
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          overflow-x: hidden;
        }
      `}</style>

      <div className="horizontal-scroll-gallery" style={{ display: 'flex', flex: 1 }}>
        {/* White Column with Vertical Title */}
        <div className="white-column" style={{
          width: '250px',
          background: '#ffffff',
          flexShrink: 0,
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-end'
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            fontFamily: '"Majesti Banner", serif',
            color: '#000',
            margin: 0,
            lineHeight: '1',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            position: 'absolute',
            right: '10px',
            top: '50px'
          }}>
            {title}
          </h1>
        </div>

        {/* Main Content Area */}
        <div style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Horizontal Scroll Container - Desktop only */}
          <div
            className="horizontal-scroll"
            ref={containerRef}
            style={{
              position: 'relative',
              width: '100%',
              height: `${columns.length * 100}vh`,
              overflow: 'visible',
              background: '#f5f5f5'
            }}
          >
            <div style={{
              position: 'sticky',
              top: 0,
              height: '100vh',
              overflow: 'hidden'
            }}>
              <div style={{
                display: 'flex',
                height: '100%',
                transform: `translateX(-${scrollProgress * (columns.length - 1)}%)`,
                transition: 'transform 0.1s ease-out',
                gap: '20px',
                paddingTop: '0px',
                paddingLeft: '40px'
              }}>
                {columns.map((column, columnIndex) => (
                  <div
                    key={columnIndex}
                    style={{
                      minWidth: '300px',
                      maxWidth: '300px',
                      height: '100vh',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0px',
                      padding: '0px',
                      paddingTop: '20px',
                      overflowY: 'auto'
                    }}
                  >
                    {column.map((item, itemIndex) => (
                      <div key={itemIndex} style={{ marginBottom: '0px' }}>
                        {/* Item Image */}
                        <div style={{
                          width: '100%',
                          height: '300px',
                          position: 'relative',
                          marginBottom: '20px',
                          border: '5px solid white',
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}>
                          <Image
                            src={item.image}
                            alt={`Photo by ${item.name}`}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        </div>

                        {/* Item Name */}
                        <h2 style={{
                          fontSize: '18px',
                          color: '#000',
                          fontFamily: '"Majesti Banner", serif',
                          margin: '0 0 15px 0',
                          lineHeight: '1.1'
                        }}>
                          {item.name === 'Platon' ? (
                            <span style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Platon</span>
                          ) : (
                            <>
                              <span style={{ fontWeight: 'normal', textTransform: 'capitalize' }}>
                                {item.name.split(' ')[0].toLowerCase()}
                              </span>
                              {' '}
                              <span style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                                {item.name.split(' ')[1]}
                              </span>
                            </>
                          )}
                        </h2>

                        {/* Item Text */}
                        <p style={{
                          fontSize: '12px',
                          lineHeight: '1.6',
                          color: '#333',
                          margin: '0 0 20px 0'
                        }}>
                          {item.text}
                          {item.link && (
                            <>
                              {' '}
                              <a
                                href={item.link}
                                style={{
                                  color: '#000',
                                  textDecoration: 'underline',
                                  fontWeight: 'bold'
                                }}
                              >
                                {item.linkText}
                              </a>
                            </>
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Stack - Mobile only */}
          <div className="mobile-stack" style={{
            background: '#f5f5f5',
            padding: '20px',
            display: 'none'
          }}>
            {columns.flat().map((item, index) => (
              <div key={index} style={{ marginBottom: '40px' }}>
                {/* Item Image */}
                <div style={{
                  width: '100%',
                  height: '300px',
                  position: 'relative',
                  marginBottom: '20px',
                  border: '5px solid white',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <Image
                    src={item.image}
                    alt={`Photo by ${item.name}`}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                {/* Item Name */}
                <h2 style={{
                  fontSize: '18px',
                  color: '#000',
                  fontFamily: '"Majesti Banner", serif',
                  margin: '0 0 15px 0',
                  lineHeight: '1.1'
                }}>
                  {item.name === 'Platon' ? (
                    <span style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Platon</span>
                  ) : (
                    <>
                      <span style={{ fontWeight: 'normal', textTransform: 'capitalize' }}>
                        {item.name.split(' ')[0].toLowerCase()}
                      </span>
                      {' '}
                      <span style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                        {item.name.split(' ')[1]}
                      </span>
                    </>
                  )}
                </h2>

                {/* Item Text */}
                <p style={{
                  fontSize: '12px',
                  lineHeight: '1.6',
                  color: '#333',
                  margin: '0 0 20px 0'
                }}>
                  {item.text}
                  {item.link && (
                    <>
                      {' '}
                      <a
                        href={item.link}
                        style={{
                          color: '#000',
                          textDecoration: 'underline',
                          fontWeight: 'bold'
                        }}
                      >
                        {item.linkText}
                      </a>
                    </>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
