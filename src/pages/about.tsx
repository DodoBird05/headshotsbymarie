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
                "Where artistry meets authenticity"
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
                    <div>Probably editing your headshots right now</div>
                  </div>
                  <div>
                    <strong style={{ color: '#C9956E' }}>📍 Location:</strong>
                    <div>Gilbert, Arizona</div>
                  </div>
                  <div>
                    <strong style={{ color: '#C9956E' }}>Mood:</strong>
                    <div>💡 Inspired</div>
                  </div>
                  <div>
                    <strong style={{ color: '#C9956E' }}>Status:</strong>
                    <div>Making professionals look like themselves (but better)</div>
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
                  I'm Marie, and I help people stop hating how they look in photos.
                </p>
                <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#333', marginTop: '12px' }}>
                  Here's the deal: I trained with some of the best portrait photographers in the world—Chris Buck, Peter Hurley, Ivan Weiss. I work with the same professional Broncolor lighting you'd find in New York or London studios. I've photographed SAG actors whose headshots are on IMDB, Bachelor contestants, executives, and professionals who need their image to actually work for them.
                </p>
                <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#333', marginTop: '12px' }}>
                  But mostly? I just really love helping people see themselves clearly—confident, compelling, entirely real. No awkward 20-minute rush jobs. No stiff corporate poses. Just unlimited time, hand-painted backdrops, and actual coaching until we get it right.
                </p>
                <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#333', marginTop: '12px' }}>
                  I run my studio in Gilbert with the philosophy that perfect is forgettable and authentic is what makes people stop scrolling.
                </p>
                <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#333', marginTop: '16px', fontWeight: 'bold' }}>
                  80+ five-star Google reviews ⭐⭐⭐⭐⭐<br/>
                  President Distinguished Award - Gilbert Toastmasters<br/>
                  Best Speaker of the Evening - Because I also apparently can't stop talking
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
                  Professionals who know their image matters. Actors building careers. Executives whose presence needs to arrive before they do. Anyone tired of looking like a cardboard cutout version of "professional."
                </p>
                <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#333', marginTop: '12px' }}>
                  If you want quick and cheap, I'm not your person. If you want artistry that competes with Chicago or LA—let's work together.
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
                <div style={{ fontSize: '13px', lineHeight: '1.8', color: '#333' }}>
                  <div style={{ marginBottom: '12px' }}>
                    <strong style={{ color: '#C9956E' }}>General:</strong> Portrait photography, hand-painting backdrops, perfecting lighting setups, Toastmasters speaking, teaching workshops on social media storytelling, Local First Arizona networking, convincing people they look better than they think they do
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <strong style={{ color: '#C9956E' }}>Music:</strong> [Add your actual music preferences!]
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <strong style={{ color: '#C9956E' }}>Books:</strong> [Add your photography/business books or current reads!]
                  </div>
                  <div>
                    <strong style={{ color: '#C9956E' }}>Heroes:</strong> Chris Buck, Peter Hurley, Ivan Weiss, Michael Schacht, good natural light, honest conversations, anyone who shows up authentically
                  </div>
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
                  {[
                    { name: 'Chris Buck', subtitle: 'Mentor, New York' },
                    { name: 'Peter Hurley', subtitle: 'Headshot Legend' },
                    { name: 'Ivan Weiss', subtitle: 'Master of Light' },
                    { name: 'Michael Schacht', subtitle: 'Chicago Mentor' },
                    { name: 'Broncolor Lighting', subtitle: 'My Actual Best Friend' },
                    { name: 'Hand-Painted Backdrops', subtitle: 'I Make These Myself' },
                    { name: 'My Toastmasters Club', subtitle: 'Where I Practice Not Talking About Photography' },
                    { name: 'YOU', subtitle: '(Seriously, Book a Session)' }
                  ].map((friend, idx) => (
                    <div key={idx} style={{
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
                        fontSize: '11px',
                        color: '#999',
                        padding: '5px'
                      }}>
                        Photo
                      </div>
                      <div style={{
                        fontSize: '13px',
                        fontWeight: 'bold',
                        color: '#333',
                        marginBottom: '4px'
                      }}>
                        {friend.name}
                      </div>
                      <div style={{
                        fontSize: '11px',
                        color: '#666',
                        fontStyle: 'italic'
                      }}>
                        {friend.subtitle}
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
                    <strong style={{ color: '#C9956E' }}>Studio:</strong> Professional Broncolor lighting, hand-painted backdrops, unlimited time
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong style={{ color: '#C9956E' }}>Sessions:</strong> $200 (unlimited time + outfits) | $95 per edited image with full usage rights
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong style={{ color: '#C9956E' }}>Approach:</strong> No rushing. Real coaching. Authenticity over perfection.
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong style={{ color: '#C9956E' }}>Reviews:</strong> 100% five-star across 80+ Google reviews
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong style={{ color: '#C9956E' }}>Notable Clients:</strong> SAG actors (John Barbolla - check IMDB), Pascal from The Bachelor, LinkedIn professionals, corporate teams, anyone who needs to look like themselves
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
                  Want to Work Together?
                </h2>
                <p style={{ fontSize: '13px', marginBottom: '20px', lineHeight: '1.6' }}>
                  Ready to create something amazing together?
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
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
                  <div style={{ fontSize: '13px', color: 'white' }}>
                    <a
                      href="/"
                      style={{
                        color: 'white',
                        textDecoration: 'underline',
                        marginRight: '15px'
                      }}
                    >
                      View My Work
                    </a>
                    {' | '}
                    <a
                      href="#reviews"
                      style={{
                        color: 'white',
                        textDecoration: 'underline',
                        marginLeft: '15px'
                      }}
                    >
                      Read What Clients Say
                    </a>
                  </div>
                </div>
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
