import Layout from '@/components/Layout'
import Head from 'next/head'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>Marie's Profile - Portraits By Marie</title>
        <meta name="description" content="About Marie - Phoenix Portrait Photographer" />
      </Head>

      <Layout title="About Marie" description="Phoenix Portrait Photographer">
        {/* MySpace-style gradient background */}
        <div style={{
          background: 'linear-gradient(to bottom, #D4A574 0%, #C9956E 100%)',
          minHeight: '100vh',
          padding: '40px 20px',
          fontFamily: 'Verdana, Arial, sans-serif'
        }}>

          {/* Main white container */}
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}>

            {/* Header Section */}
            <div style={{
              background: 'linear-gradient(to right, #D4A574, #C9956E)',
              padding: '30px',
              color: 'white',
              textAlign: 'center'
            }}>
              <h1 style={{
                fontSize: '32px',
                margin: '0 0 10px 0',
                fontFamily: 'Verdana, Arial, sans-serif',
                fontWeight: 'bold'
              }}>
                Marie
              </h1>
              <p style={{
                fontSize: '14px',
                margin: 0,
                fontStyle: 'italic'
              }}>
                "Capturing authentic moments since 2005"
              </p>
            </div>

            {/* Content Container */}
            <div style={{ padding: '30px' }}>

              {/* Profile Stats */}
              <div style={{
                background: '#f5f5f5',
                padding: '20px',
                borderRadius: '6px',
                marginBottom: '30px',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '15px',
                  fontSize: '13px'
                }}>
                  <div>
                    <strong style={{ color: '#C9956E' }}>Last Login:</strong>
                    <div>Just Now</div>
                  </div>
                  <div>
                    <strong style={{ color: '#C9956E' }}>Location:</strong>
                    <div>Phoenix, AZ</div>
                  </div>
                  <div>
                    <strong style={{ color: '#C9956E' }}>Mood:</strong>
                    <div>📸 Creative</div>
                  </div>
                  <div>
                    <strong style={{ color: '#C9956E' }}>Status:</strong>
                    <div>Booking for 2025!</div>
                  </div>
                </div>
              </div>

              {/* Profile Photo Placeholder */}
              <div style={{
                width: '200px',
                height: '200px',
                background: '#f0f0f0',
                border: '3px solid #D4A574',
                borderRadius: '4px',
                margin: '0 auto 30px auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                color: '#999',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                Profile Photo
              </div>

              {/* About Me Section */}
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{
                  fontSize: '18px',
                  color: '#C9956E',
                  borderBottom: '2px solid #D4A574',
                  paddingBottom: '8px',
                  marginBottom: '15px',
                  fontFamily: 'Verdana, Arial, sans-serif'
                }}>
                  About Me
                </h2>
                <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#333' }}>
                  Hey there! I'm Marie, a portrait photographer based in Phoenix, Arizona.
                  I've been capturing authentic moments and creating timeless portraits since 2005.
                  My passion is helping people see themselves the way others see them – confident,
                  beautiful, and uniquely themselves.
                </p>
                <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#333', marginTop: '12px' }}>
                  When I'm not behind the camera, you'll find me exploring new coffee shops,
                  perfecting my lighting setups, or planning the next creative shoot. I believe
                  every person has a story worth telling, and I love being the one to help tell it
                  through imagery.
                </p>
              </div>

              {/* Who I'd Like to Meet */}
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{
                  fontSize: '18px',
                  color: '#C9956E',
                  borderBottom: '2px solid #D4A574',
                  paddingBottom: '8px',
                  marginBottom: '15px',
                  fontFamily: 'Verdana, Arial, sans-serif'
                }}>
                  Who I'd Like to Meet
                </h2>
                <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#333' }}>
                  Anyone who's looking to capture their authentic self! Whether you're updating
                  your LinkedIn profile, building your personal brand, stepping into acting, or
                  just want beautiful portraits that make you feel confident – I'd love to work
                  with you. I specialize in making people feel comfortable in front of the camera,
                  so even if you think you're "not photogenic" (spoiler: you are!), we'll create
                  something amazing together.
                </p>
              </div>

              {/* Interests */}
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{
                  fontSize: '18px',
                  color: '#C9956E',
                  borderBottom: '2px solid #D4A574',
                  paddingBottom: '8px',
                  marginBottom: '15px',
                  fontFamily: 'Verdana, Arial, sans-serif'
                }}>
                  Interests
                </h2>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px',
                  fontSize: '13px'
                }}>
                  <span style={{
                    background: '#f5f5f5',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    border: '1px solid #e0e0e0'
                  }}>Photography</span>
                  <span style={{
                    background: '#f5f5f5',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    border: '1px solid #e0e0e0'
                  }}>Lighting Design</span>
                  <span style={{
                    background: '#f5f5f5',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    border: '1px solid #e0e0e0'
                  }}>Portrait Art</span>
                  <span style={{
                    background: '#f5f5f5',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    border: '1px solid #e0e0e0'
                  }}>Coffee</span>
                  <span style={{
                    background: '#f5f5f5',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    border: '1px solid #e0e0e0'
                  }}>Creative Direction</span>
                  <span style={{
                    background: '#f5f5f5',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    border: '1px solid #e0e0e0'
                  }}>Phoenix Vibes</span>
                </div>
              </div>

              {/* Top 8 Friends */}
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{
                  fontSize: '18px',
                  color: '#C9956E',
                  borderBottom: '2px solid #D4A574',
                  paddingBottom: '8px',
                  marginBottom: '15px',
                  fontFamily: 'Verdana, Arial, sans-serif'
                }}>
                  Marie's Top 8
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '20px'
                }}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <div key={num} style={{
                      background: '#f5f5f5',
                      border: '2px solid #D4A574',
                      borderRadius: '6px',
                      padding: '15px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      <div style={{
                        width: '100px',
                        height: '100px',
                        background: '#e0e0e0',
                        borderRadius: '4px',
                        margin: '0 auto 10px auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        color: '#999'
                      }}>
                        Friend #{num}
                      </div>
                      <div style={{
                        fontSize: '13px',
                        fontWeight: 'bold',
                        color: '#333'
                      }}>
                        Friend Name
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Details Section */}
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{
                  fontSize: '18px',
                  color: '#C9956E',
                  borderBottom: '2px solid #D4A574',
                  paddingBottom: '8px',
                  marginBottom: '15px',
                  fontFamily: 'Verdana, Arial, sans-serif'
                }}>
                  Details
                </h2>
                <div style={{ fontSize: '13px', lineHeight: '1.8', color: '#333' }}>
                  <div style={{ marginBottom: '8px' }}>
                    <strong style={{ color: '#C9956E' }}>Location:</strong> Phoenix, Arizona
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong style={{ color: '#C9956E' }}>Profession:</strong> Portrait Photographer
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong style={{ color: '#C9956E' }}>Specialties:</strong> Corporate Headshots, Personal Branding, Actor Headshots, LinkedIn Photos
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong style={{ color: '#C9956E' }}>Years Experience:</strong> 20+ Years
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong style={{ color: '#C9956E' }}>Website:</strong>{' '}
                    <a
                      href="/"
                      style={{
                        color: '#0066CC',
                        textDecoration: 'none'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
                      onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
                    >
                      portraitsbymarie.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Section */}
              <div style={{
                background: 'linear-gradient(to right, #D4A574, #C9956E)',
                padding: '25px',
                borderRadius: '6px',
                textAlign: 'center',
                color: 'white'
              }}>
                <h2 style={{
                  fontSize: '18px',
                  marginBottom: '15px',
                  fontFamily: 'Verdana, Arial, sans-serif'
                }}>
                  Let's Connect!
                </h2>
                <p style={{ fontSize: '13px', marginBottom: '20px', lineHeight: '1.6' }}>
                  Ready to create something amazing together? Get in touch and let's schedule your session!
                </p>
                <a
                  href="/book"
                  style={{
                    display: 'inline-block',
                    background: 'white',
                    color: '#C9956E',
                    padding: '12px 30px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    transition: 'all 0.2s',
                    border: '2px solid white',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'white'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'white'
                    e.currentTarget.style.color = '#C9956E'
                  }}
                >
                  Book Your Session
                </a>
              </div>

            </div>
          </div>

          {/* Nostalgic footer text */}
          <div style={{
            maxWidth: '900px',
            margin: '20px auto 0 auto',
            textAlign: 'center',
            fontSize: '11px',
            color: 'rgba(255,255,255,0.8)',
            fontStyle: 'italic'
          }}>
            © 2025 Marie's Profile • Proudly made with modern code but nostalgic vibes
          </div>

        </div>
      </Layout>
    </>
  )
}
