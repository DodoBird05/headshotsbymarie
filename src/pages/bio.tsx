import Layout from '@/components/Layout'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

export default function BioPage() {
  return (
    <>
      <Head>
        <title>About Marie - Headshots by Marie</title>
        <meta name="description" content="Learn more about Marie Feutrier, professional portrait photographer in Gilbert, Arizona." />
        <style>{`
          .bio-section {
            display: flex;
            flex-direction: column;
            gap: 40px;
            margin-bottom: 48px;
          }
          .bio-section-reverse {
            display: flex;
            flex-direction: column;
            gap: 40px;
            margin-bottom: 48px;
          }
          .bio-image {
            width: 100%;
            border-radius: 4px;
            overflow: hidden;
          }
          .bio-text {
            flex: 1;
          }
          @media (min-width: 768px) {
            .bio-section {
              flex-direction: row;
              align-items: flex-start;
            }
            .bio-section-reverse {
              flex-direction: row-reverse;
              align-items: flex-start;
            }
            .bio-image {
              width: 320px;
              flex-shrink: 0;
            }
            .bio-text {
              flex: 1;
            }
          }
        `}</style>
      </Head>

      <Layout title="About Marie" description="Professional Portrait Photographer in Gilbert, Arizona">
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '60px 20px',
          fontFamily: '"Hanken Grotesk", sans-serif'
        }}>
          {/* Back Link */}
          <Link
            href="/about"
            style={{
              display: 'inline-block',
              marginBottom: '40px',
              color: '#666',
              textDecoration: 'none',
              fontSize: '14px'
            }}
          >
            ← Back to About
          </Link>

          <h1 style={{
            fontSize: '42px',
            fontWeight: 300,
            marginBottom: '40px',
            color: '#1C1C1C',
            fontFamily: '"Majesti Banner", serif'
          }}>
            About Marie
          </h1>

          {/* First Section - Desktop: Image Left, Text Right */}
          <div className="bio-section">
            <div className="bio-image">
              <Image
                src="/images/About Marie/Marie-Feutrier-Phoenix-Bio.webp"
                alt="Marie Feutrier, professional portrait photographer based in Gilbert Arizona"
                width={800}
                height={1067}
                style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                priority
              />
            </div>
            <div className="bio-text" style={{
              fontSize: '18px',
              lineHeight: '1.8',
              color: '#333'
            }}>
              <p style={{ marginBottom: '24px' }}>
                I'm a portrait photographer based in Gilbert, Arizona, and I've built my career around a simple belief: professional photography should make you feel confident, not uncomfortable.
              </p>

              <h2 style={{
                fontSize: '28px',
                fontWeight: 400,
                marginTop: '24px',
                marginBottom: '24px',
                color: '#1C1C1C',
                fontFamily: '"Majesti Banner", serif'
              }}>
                How I Got Here
              </h2>

              <p style={{ marginBottom: '24px' }}>
                My path to photography wasn't traditional. I studied economics and earned a master's degree in the field before discovering my passion for portrait photography. That analytical background turned out to be surprisingly useful—understanding business needs, reading people, and approaching each session with strategic thinking has shaped how I work with clients.
              </p>

              <p style={{ marginBottom: '24px' }}>
                I knew I wanted to do this professionally, so I invested in training with some of the best portrait photographers in the industry: Chris Buck, Peter Hurley, and Ivan Weiss. Each of them taught me different aspects of the craft—Buck's editorial approach, Hurley's method for connecting with subjects, and Weiss's technical precision. But the real skill I've developed is knowing how to work with people who don't think they're photogenic.
              </p>

              <h2 style={{
                fontSize: '28px',
                fontWeight: 400,
                marginTop: '24px',
                marginBottom: '24px',
                color: '#1C1C1C',
                fontFamily: '"Majesti Banner", serif'
              }}>
                My Approach
              </h2>

              <p style={{ marginBottom: '24px' }}>
                I work with professional Broncolor lighting equipment and hand-painted backdrops in my Gilbert studio. The technical side matters—lighting, positioning, expression—but what matters more is creating an environment where you feel comfortable enough to let your personality come through.
              </p>

              <p style={{ marginBottom: '0' }}>
                Sessions aren't rushed. There are no arbitrary time limits or outfit restrictions. We take the time needed to get images you'll actually want to use. That phrase—"actually want to use"—is important to me. I've heard too many stories about people getting professional photos they never look at again because they don't feel like themselves. The goal is creating images you'd be proud to print, display, or give as a gift.
              </p>
            </div>
          </div>

          {/* Second Section - Desktop: Text Left, Image Right */}
          <div className="bio-section-reverse">
            <div className="bio-image">
              <Image
                src="/images/About Marie/Marie-Feutrier-Arizona-Desert.webp"
                alt="Marie Feutrier, portrait photographer, with Arizona Desert Landscaping"
                width={800}
                height={1423}
                style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
              />
            </div>
            <div className="bio-text" style={{
              fontSize: '18px',
              lineHeight: '1.8',
              color: '#333'
            }}>
              <h2 style={{
                fontSize: '28px',
                fontWeight: 400,
                marginTop: '0',
                marginBottom: '24px',
                color: '#1C1C1C',
                fontFamily: '"Majesti Banner", serif'
              }}>
                Beyond the Camera
              </h2>

              <p style={{ marginBottom: '24px' }}>
                I'm active in Toastmasters District 3, where I serve as the Public Relations Manager for the 2025-2026 term, managing social media for the entire district. Public speaking and photography have more in common than you might think—both are about clear communication and making people feel comfortable in potentially uncomfortable situations.
              </p>

              <p style={{ marginBottom: '24px' }}>
                I've photographed SAG actors, Bachelor contestants, executives, entrepreneurs, and professionals across industries. My work appears on IMDB, corporate websites, LinkedIn profiles, and casting submissions. Some clients come back every year to update their images as their careers evolve.
              </p>

              <h2 style={{
                fontSize: '28px',
                fontWeight: 400,
                marginTop: '24px',
                marginBottom: '24px',
                color: '#1C1C1C',
                fontFamily: '"Majesti Banner", serif'
              }}>
                The Studio Experience
              </h2>

              <p style={{ marginBottom: '24px' }}>
                My studio is in Gilbert, but I serve the entire Phoenix metro area—Gilbert, Mesa, Chandler, Scottsdale, Tempe. I also bring my complete studio setup to offices for team photography sessions.
              </p>

              <p style={{ marginBottom: '0' }}>
                Every session includes unlimited time, outfit changes, and backgrounds. You'll see images immediately on a monitor as we shoot, so there are no surprises. I'll guide you through posing and help you choose which photos work best for different platforms—LinkedIn photos need different energy than personal branding images or actor headshots.
              </p>
            </div>
          </div>

          {/* Final Section */}
          <div style={{
            fontSize: '18px',
            lineHeight: '1.8',
            color: '#333'
          }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 400,
              marginTop: '0',
              marginBottom: '24px',
              color: '#1C1C1C',
              fontFamily: '"Majesti Banner", serif'
            }}>
              What Drives This Work
            </h2>

            <p style={{ marginBottom: '24px' }}>
              The best part of what I do is when clients leave saying the experience was actually pleasant—not just that they like their photos, but that they enjoyed the process. When someone tells me they've used their headshot for everything from LinkedIn to their holiday cards, or that they finally have a photo they're proud to share, that's when I know the session worked.
            </p>

            <p style={{ marginBottom: '24px' }}>
              Professional photography isn't about making you look like someone else. It's about capturing you at your best—confident, polished, and genuinely yourself.
            </p>

            <p style={{ marginBottom: '48px' }}>
              If you're ready to create images that work for you, let's talk.
            </p>

            {/* CTA Button */}
            <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '60px' }}>
              <Link
                href="/contact"
                style={{
                  display: 'inline-block',
                  background: '#000',
                  color: 'white',
                  padding: '16px 40px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: 500,
                  transition: 'all 0.2s'
                }}
              >
                Get in Touch
              </Link>
            </div>
          </div>

        </div>
      </Layout>
    </>
  )
}
