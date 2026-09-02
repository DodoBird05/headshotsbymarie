import Layout from '@/components/Layout'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

export default function BioPage() {
  return (
    <>
      <Head>
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

      <Layout title="Marie Feutrier Bio | Headshots by Marie" description="The full story of Marie Feutrier: a French photographer from a village in the Alps, an economics master's in Grenoble, training with Chris Buck, Peter Hurley, and Ivan Weiss, and the unhurried private studio she built in Gilbert, Arizona." canonicalPath="/bio/">
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '60px 20px',
          fontFamily: '"Romie", serif'
        }}>
          {/* Back Link */}
          <Link
            href="/about/"
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
            fontFamily: '"Romie", serif'
          }}>
            Marie Feutrier
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
                I'm a French photographer based in Gilbert, Arizona. I grew up where nothing good is rushed, and I run my studio the same way. A portrait should make you feel confident, not uncomfortable, and that takes a little time.
              </p>

              <h2 style={{
                fontSize: '28px',
                fontWeight: 400,
                marginTop: '24px',
                marginBottom: '24px',
                color: '#1C1C1C',
                fontFamily: '"Romie", serif'
              }}>
                how I got here
              </h2>

              <p style={{ marginBottom: '24px' }}>
                I did not start with a camera. My family is from Saint-Bonnet-en-Champsaur, a small village in the French Alps where my grandparents ran the grocery store. It was never the biggest shop. It was the one people trusted, because my grandparents believed how you treat someone matters as much as what you sell them. My grandmother Madeleine had a quiet rule about presentation, too: nothing fancy, just good quality, worn with pride, even in a village where everyone already knew your name.
              </p>

              <p style={{ marginBottom: '24px' }}>
                I studied economics and earned a master's degree at the Université Pierre Mendès France in Grenoble before I understood that what I really wanted to do was make portraits. The analytical training did not go to waste. Reading people, understanding what a business actually needs, planning a session with intent: all of that started there.
              </p>

              <p style={{ marginBottom: '24px' }}>
                There is one more piece of family history that shaped how I see this work. In 1959, a nanny named Vivian Maier passed through my grandparents' village with her camera and photographed my grandmother Madeleine holding Mirou, the family dog. Nobody knew Vivian was an artist. Her work was only discovered decades later, after her death, and now it hangs in museums. For most of my life I had just one photo of my grandmother when she was young, stiff and posed. Vivian gave me the other one: Madeleine warm, present, entirely herself. That is the photograph I chase in my own work. I wrote the whole story in <Link href="/news/vivian-maier-photographed-my-family" style={{ color: '#1C1C1C', textDecoration: 'underline' }}>When Vivian Maier Photographed My Family in the French Alps</Link>.
              </p>

              <p style={{ marginBottom: '24px' }}>
                When I decided to do this professionally, I trained with photographers I deeply admire: Chris Buck, Peter Hurley, and Ivan Weiss. Buck taught me the editorial eye, Hurley the art of connecting with a subject, Weiss the technical precision. But the skill I care about most is the one none of them could hand me directly: knowing how to work with someone who is convinced they are not photogenic.
              </p>

              <h2 style={{
                fontSize: '28px',
                fontWeight: 400,
                marginTop: '24px',
                marginBottom: '24px',
                color: '#1C1C1C',
                fontFamily: '"Romie", serif'
              }}>
                my approach
              </h2>

              <p style={{ marginBottom: '24px' }}>
                I work with professional Broncolor lighting and hand-painted backdrops in my Gilbert studio. The technical side matters, lighting, positioning, expression, but what matters more is building a room where you feel comfortable enough to let your personality show.
              </p>

              <p style={{ marginBottom: '0' }}>
                Sessions are not rushed. There are no arbitrary time limits and no outfit restrictions. We take the time it takes to get images you will actually want to use. That phrase, "actually want to use," is important to me. I have heard too many stories about people paying for portraits they never look at again, because the photos do not feel like them. The goal is the opposite: images you would be proud to print, display, or give as a gift.
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
                fontFamily: '"Romie", serif'
              }}>
                beyond the camera
              </h2>

              <p style={{ marginBottom: '24px' }}>
                I am active in Toastmasters District 3, where I serve as Public Relations Manager for the 2025 to 2026 term, running social media for the entire district. Public speaking and photography have more in common than you might think. Both are about clear communication, and both are about helping someone feel at ease in a situation that usually makes people nervous.
              </p>

              <p style={{ marginBottom: '24px' }}>
                That skill, putting a nervous person at ease, is the one my clients hire me for. I have photographed SAG actors, Bachelor contestants, executives, entrepreneurs, and professionals across many industries. My work appears on IMDb, corporate websites, LinkedIn profiles, and casting submissions. Some clients come back every year to update their images as their careers grow.
              </p>

              <h2 style={{
                fontSize: '28px',
                fontWeight: 400,
                marginTop: '24px',
                marginBottom: '24px',
                color: '#1C1C1C',
                fontFamily: '"Romie", serif'
              }}>
                the studio experience
              </h2>

              <p style={{ marginBottom: '24px' }}>
                My studio is in Gilbert, and I serve the whole Phoenix metro area: Gilbert, Mesa, Chandler, Scottsdale, and Tempe. I also bring the full studio setup to offices for team sessions.
              </p>

              <p style={{ marginBottom: '0' }}>
                Every session includes unlimited time, outfit changes, and backgrounds. You see the images on a monitor as we shoot, so there are no surprises. I will guide you through posing and help you choose which frames work best where, since a LinkedIn photo needs different energy than a personal branding image or an actor headshot.
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
              fontFamily: '"Romie", serif'
            }}>
              what drives this work
            </h2>

            <p style={{ marginBottom: '24px' }}>
              The best moment in this job is when a client leaves saying the experience was genuinely pleasant, not only that they like the photos, but that they enjoyed the hour. When someone tells me they have used their portrait for everything from LinkedIn to their holiday cards, or that they finally have a picture they are proud to share, that is when I know the session worked.
            </p>

            <p style={{ marginBottom: '24px' }}>
              A good portrait is not about making you look like someone else. It is about catching you at your best: confident, polished, and unmistakably yourself. That is the same thing Vivian saw in my grandmother, and it is what I grew up watching my family offer across a grocery counter. Care, taste, and time.
            </p>

            <p style={{ marginBottom: '48px' }}>
              If that sounds like the kind of portrait you want, let's talk.
            </p>

            {/* CTA Button */}
            <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '60px' }}>
              <Link
                href="/contact/"
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
