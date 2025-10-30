import Layout from '@/components/Layout'
import Head from 'next/head'
import Image from 'next/image'

export default function ThreeResponsiveImages() {
  return (
    <>
      <Head>
        <title>3 Responsive Images - Portraits By Marie</title>
        <meta name="description" content="Three responsive images component" />
      </Head>

      <Layout title="3 Responsive Images" description="Three responsive images component">
        <div style={{
          width: '100%',
          margin: '0 auto',
          padding: '20px'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            3 Responsive Images
          </h1>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '8px',
            width: '100%',
            height: 'clamp(300px, 40vw, 600px)'
          }}>
            {/* Large Image - Left */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              borderRadius: '4px'
            }}>
              <div style={{
                background: '#ddd',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999',
                fontSize: '18px'
              }}>
                Large Image
              </div>
            </div>

            {/* Two Small Images - Right Column */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              height: '100%'
            }}>
              {/* Top Small Image */}
              <div style={{
                position: 'relative',
                width: '100%',
                flex: '1',
                overflow: 'hidden',
                borderRadius: '4px'
              }}>
                <div style={{
                  background: '#ddd',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#999',
                  fontSize: '18px'
                }}>
                  Small Image 1
                </div>
              </div>

              {/* Bottom Small Image */}
              <div style={{
                position: 'relative',
                width: '100%',
                flex: '1',
                overflow: 'hidden',
                borderRadius: '4px'
              }}>
                <div style={{
                  background: '#ddd',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#999',
                  fontSize: '18px'
                }}>
                  Small Image 2
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
