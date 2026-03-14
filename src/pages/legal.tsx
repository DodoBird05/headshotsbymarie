import Head from 'next/head'
import Footer from '@/components/Footer'
import MobileBottomNav from '@/components/MobileBottomNav'
import StickyNavigation from '@/components/StickyNavigation'

export default function Legal() {
  const sections = [
    { id: 'terms', label: 'Terms of Use' },
    { id: 'privacy', label: 'Privacy Policy' },
    { id: 'copyright', label: 'Copyright Notice' },
    { id: 'disclaimer', label: 'Disclaimer' },
    { id: 'accessibility', label: 'Accessibility' },
  ]

  return (
    <>
      <Head>
        <title>Legal | Headshots by Marie</title>
        <meta name="description" content="Terms of use, privacy policy, copyright notice, disclaimer, and accessibility statement for headshotsbymarie.com." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://headshotsbymarie.com/legal/" />
        <meta property="og:title" content="Legal | Headshots by Marie" />
        <meta property="og:description" content="Terms of use, privacy policy, copyright notice, disclaimer, and accessibility statement." />
        <meta property="og:url" content="https://headshotsbymarie.com/legal/" />
        <meta property="og:image" content="https://headshotsbymarie.com/images/Hero/Headshot-Photographer-Phoenix-Arizona-Marie-Feutrier.webp" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Headshots by Marie" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Legal | Headshots by Marie" />
        <meta name="twitter:description" content="Terms of use, privacy policy, copyright notice, disclaimer, and accessibility statement." />
        <meta name="twitter:image" content="https://headshotsbymarie.com/images/Hero/Headshot-Photographer-Phoenix-Arizona-Marie-Feutrier.webp" />
      </Head>

      <StickyNavigation lightBackground />

      <div className="min-h-screen" style={{ backgroundColor: '#fafafa' }}>
        <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
          <h1
            className="text-4xl md:text-5xl mb-8"
            style={{
              fontFamily: '"Majesti Banner", serif',
              fontWeight: 300,
              color: '#1C1C1C',
              letterSpacing: '-0.02em'
            }}
          >
            Legal
          </h1>

          {/* Jump links */}
          <nav className="mb-16 pb-8 border-b" style={{ borderColor: '#e5e5e5' }}>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="hover:underline"
                    style={{
                      fontFamily: '"Hanken Grotesk", sans-serif',
                      fontSize: '0.95rem',
                      color: '#555'
                    }}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Terms of Use */}
          <section id="terms" className="mb-20 scroll-mt-24">
            <h2 className="legal-heading">Terms of Use</h2>
            <p className="legal-meta">Last Updated: March 14, 2026</p>

            <h3 className="legal-subheading">Acceptance of Terms</h3>
            <p className="legal-text">By accessing and using this website (headshotsbymarie.com), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this website.</p>

            <h3 className="legal-subheading">Website Viewing License</h3>
            <p className="legal-text">You are granted permission to view this website and its text content for personal informational purposes only. This permission does not extend to downloading, copying, or reproducing any images, photographs, or other visual content. Under this limited viewing license you may not:</p>
            <ul className="legal-list">
              <li>Download, save, or copy any photographs or images from this website</li>
              <li>Use any website content for commercial purposes</li>
              <li>Reproduce or distribute any materials from this website</li>
              <li>Remove any copyright or other proprietary notations</li>
              <li>Scrape, crawl, or use automated tools to extract content from this website</li>
            </ul>

            <h3 className="legal-subheading">Image Copyright & Usage</h3>
            <ul className="legal-list">
              <li>All photographs displayed on this website are protected by United States copyright law (17 U.S.C. et seq.)</li>
              <li>Images may not be downloaded, copied, reproduced, or used without express written permission</li>
              <li>Unauthorized use of our images may result in legal action and statutory damages under the Copyright Act</li>
              <li>Portfolio images are shown with permission from clients or models where applicable</li>
              <li>Any use of our images for AI training, machine learning, generative AI systems, or other automated data extraction is strictly prohibited</li>
            </ul>

            <h3 className="legal-subheading">Website Content</h3>
            <p className="legal-text">The materials on our website are provided on an &quot;as is&quot; basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties including implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.</p>

            <h3 className="legal-subheading">Accuracy of Materials</h3>
            <p className="legal-text">The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials are accurate, complete, or current. Pricing and availability information is subject to change without notice.</p>

            <h3 className="legal-subheading">Links to Third-Party Sites</h3>
            <p className="legal-text">Our website may contain links to third-party websites for your convenience. We do not endorse or assume responsibility for the content, privacy practices, or policies of these external sites.</p>

            <h3 className="legal-subheading">Contact Form & Inquiries</h3>
            <ul className="legal-list">
              <li>Information submitted through contact forms is used solely for business communication</li>
              <li>We respond to inquiries within 48 hours during business days</li>
              <li>Submission of an inquiry does not guarantee booking availability</li>
              <li>Pricing information provided in responses is subject to change based on specific project requirements</li>
            </ul>

            <h3 className="legal-subheading">Indemnification</h3>
            <p className="legal-text">You agree to indemnify, defend, and hold harmless Riemagine Studio LLC, its owner, and affiliates from any claims, damages, losses, or expenses arising from your use of this website or violation of these terms.</p>

            <h3 className="legal-subheading">Severability</h3>
            <p className="legal-text">If any provision of these terms is found to be unenforceable, the remaining provisions will continue in full force and effect.</p>

            <h3 className="legal-subheading">Modifications</h3>
            <p className="legal-text">We may revise these terms of use at any time without notice. By continuing to use this website after changes are posted, you agree to be bound by the updated terms.</p>

            <h3 className="legal-subheading">Governing Law</h3>
            <p className="legal-text">These terms are governed by the laws of the State of Arizona. Any disputes arising under these terms shall be resolved exclusively in the state or federal courts located in Maricopa County, Arizona.</p>
          </section>

          {/* Privacy Policy */}
          <section id="privacy" className="mb-20 scroll-mt-24">
            <h2 className="legal-heading">Privacy Policy</h2>
            <p className="legal-meta">Effective Date: March 14, 2026</p>
            <p className="legal-text">This privacy policy describes how Riemagine Studio LLC d/b/a Headshots by Marie (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, and protects your personal information when you visit headshotsbymarie.com or use our services.</p>

            <h3 className="legal-subheading">Information Collection</h3>
            <p className="legal-text">We collect information through various methods:</p>

            <h4 className="legal-sub-subheading">Information You Provide</h4>
            <ul className="legal-list">
              <li>Contact forms and inquiry submissions</li>
              <li>Scheduling platform bookings (Acuity Scheduling)</li>
              <li>Email communications</li>
              <li>Payment information (processed securely through third-party payment processors)</li>
            </ul>

            <h4 className="legal-sub-subheading">Information Collected Automatically</h4>
            <ul className="legal-list">
              <li>Website usage data through Google Analytics 4 (GA4)</li>
              <li>IP address and browser information</li>
              <li>Device type (mobile, desktop) and operating system</li>
              <li>Pages visited, interaction patterns, and referral sources</li>
              <li>Google Search Console data (search queries, click-through rates)</li>
            </ul>

            <h4 className="legal-sub-subheading">Information We Collect</h4>
            <ul className="legal-list">
              <li>Name and contact information (email, phone)</li>
              <li>Business details and photography project requirements</li>
              <li>Booking preferences and scheduling information</li>
              <li>Payment and billing information (processed by third-party payment processors — we do not store credit card numbers)</li>
              <li>Communication preferences and history</li>
            </ul>

            <h3 className="legal-subheading">How We Use Your Information</h3>
            <ul className="legal-list">
              <li>Respond to inquiries and provide photography services</li>
              <li>Schedule and manage appointments</li>
              <li>Send requested information about our services</li>
              <li>Improve our website and service offerings</li>
              <li>Analyze website performance and user experience</li>
              <li>Comply with legal obligations</li>
              <li>Protect our business interests</li>
            </ul>

            <h3 className="legal-subheading">Information Sharing</h3>
            <p className="legal-text">We do not sell, trade, or rent your personal information to third parties. We do not share your personal information for cross-context behavioral advertising.</p>
            <p className="legal-text">We may share information with trusted service providers who assist in our business operations:</p>

            <h4 className="legal-sub-subheading">Third-Party Services We Use</h4>
            <ul className="legal-list">
              <li><strong>Acuity Scheduling:</strong> For appointment booking and calendar management</li>
              <li><strong>Payment Processors (e.g., Stripe, Square):</strong> For secure payment processing — we do not store credit card information</li>
              <li><strong>Gmail:</strong> For client communication</li>
              <li><strong>Google Analytics 4:</strong> For website performance and visitor insights — data is anonymized and aggregated</li>
              <li><strong>Amazon Web Services (AWS S3 + CloudFront):</strong> For website hosting, delivery, and security</li>
              <li><strong>WeTransfer:</strong> For secure client image delivery</li>
            </ul>
            <p className="legal-text">All third-party providers are bound by their own privacy policies and security standards. We select providers that maintain appropriate data protection measures.</p>
            <p className="legal-text">We may also share information with:</p>
            <ul className="legal-list">
              <li>Legal authorities when required by law or to protect our rights</li>
              <li>Professional advisors (accountants, attorneys) as needed for business operations</li>
            </ul>

            <h3 className="legal-subheading">Website Analytics</h3>
            <p className="legal-text">We use Google Analytics 4 to understand website usage:</p>
            <ul className="legal-list">
              <li>Pages visited and time spent on site</li>
              <li>Geographic location (general area, not specific address)</li>
              <li>Device and browser information</li>
              <li>Referral sources and search queries</li>
              <li>User interactions (clicks, scrolls, form submissions)</li>
            </ul>
            <p className="legal-text">Google Analytics uses cookies and collects data in accordance with Google&apos;s Privacy Policy. You can opt out of Google Analytics tracking by installing the Google Analytics Opt-Out Browser Add-On or by adjusting your browser cookie settings.</p>

            <h3 className="legal-subheading">Cookies</h3>
            <p className="legal-text">Our website uses cookies to:</p>
            <ul className="legal-list">
              <li>Analyze website traffic and usage via Google Analytics</li>
              <li>Improve user experience and website performance</li>
            </ul>
            <p className="legal-text">You can disable cookies through your browser settings, though some website features may not function properly. Most modern browsers also support &quot;Do Not Track&quot; signals.</p>

            <h3 className="legal-subheading">Image Usage & Model Rights</h3>
            <ul className="legal-list">
              <li>Portfolio images are displayed with appropriate permissions</li>
              <li>Client images used for marketing purposes only with written consent</li>
              <li>Model releases obtained for recognizable individuals in commercial contexts</li>
              <li>Clients may request removal of their images from our portfolio at any time by contacting us</li>
            </ul>

            <h3 className="legal-subheading">Data Security</h3>
            <p className="legal-text">We implement reasonable security measures to protect your information:</p>
            <ul className="legal-list">
              <li>SSL/TLS encryption for all website traffic</li>
              <li>Secure hosting on AWS infrastructure with regular security monitoring</li>
              <li>Limited access to personal information</li>
              <li>Regular software security updates</li>
              <li>Secure disposal of data when no longer needed</li>
            </ul>
            <p className="legal-text">However, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security of your information.</p>

            <h3 className="legal-subheading">Your Rights</h3>
            <p className="legal-text">You have the right to:</p>
            <ul className="legal-list">
              <li>Access the personal information we have about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt out of marketing communications</li>
              <li>Withdraw consent for data processing</li>
              <li>Request a copy of your data in a portable format</li>
            </ul>
            <p className="legal-text">To exercise any of these rights, contact us using the information below. We will respond to your request within 30 days.</p>

            <h3 className="legal-subheading">California Residents (CCPA/CPRA)</h3>
            <p className="legal-text">If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA):</p>
            <ul className="legal-list">
              <li>Right to know what personal information we collect and how it is used</li>
              <li>Right to delete your personal information</li>
              <li>Right to opt out of the sale or sharing of your personal information — we do not sell or share your personal information</li>
              <li>Right to non-discrimination for exercising your privacy rights</li>
              <li>Right to correct inaccurate personal information</li>
              <li>Right to limit use of sensitive personal information</li>
            </ul>
            <p className="legal-text">To exercise these rights, contact us at marie@headshotsbymarie.com or call (480) 524-0741. We will verify your identity before processing your request.</p>

            <h3 className="legal-subheading">Data Retention</h3>
            <ul className="legal-list">
              <li>Inquiry information retained for 2 years for business purposes</li>
              <li>Client information retained for 7 years as required for tax and business records</li>
              <li>Website analytics data retained for 14 months (Google Analytics default)</li>
              <li>Information deleted upon verified request where legally permissible</li>
            </ul>

            <h3 className="legal-subheading">Children&apos;s Privacy</h3>
            <p className="legal-text">Our services are not directed to individuals under 18. We do not knowingly collect personal information from children under 18. If we learn that we have collected personal information from a child under 18, we will delete that information promptly.</p>

            <h3 className="legal-subheading">Changes to Privacy Policy</h3>
            <p className="legal-text">We may update this policy periodically. Material changes will be posted on this page with an updated effective date. Your continued use of the website after changes are posted constitutes acceptance of the updated policy.</p>

            <h3 className="legal-subheading">Contact Us</h3>
            <p className="legal-text">For privacy-related questions or requests, contact us at:</p>
            <p className="legal-text">
              Headshots by Marie (Riemagine Studio LLC)<br />
              Email: marie@headshotsbymarie.com<br />
              Phone: (480) 524-0741<br />
              Address: 880 W Kroll Ave, Gilbert, AZ 85233
            </p>
          </section>

          {/* Copyright Notice */}
          <section id="copyright" className="mb-20 scroll-mt-24">
            <h2 className="legal-heading">Copyright Notice</h2>

            <h3 className="legal-subheading">All Content Protected</h3>
            <p className="legal-text">Copyright &copy; 2025–2026 Riemagine Studio LLC. All rights reserved.</p>
            <p className="legal-text">All photographs, graphics, text, and other materials on this website are protected by United States copyright law (17 U.S.C. et seq.) and international copyright treaties, and are the exclusive property of Riemagine Studio LLC or used with permission from copyright holders.</p>

            <h3 className="legal-subheading">Prohibited Uses</h3>
            <ul className="legal-list">
              <li>Downloading, copying, or reproducing images without written permission</li>
              <li>Use of images for any commercial purpose without a license</li>
              <li>Modification, alteration, or creation of derivative works from copyrighted materials</li>
              <li>Use in social media, websites, or marketing materials without a license</li>
              <li>Incorporation into AI training datasets, machine learning models, or generative AI systems</li>
              <li>Scraping, crawling, or automated extraction of images or content</li>
            </ul>

            <h3 className="legal-subheading">Requesting Usage Rights</h3>
            <p className="legal-text">To request permission to use any images from this website:</p>
            <ul className="legal-list">
              <li>Contact us at marie@headshotsbymarie.com with specific images and intended use</li>
              <li>Commercial licensing available for an appropriate fee</li>
              <li>Attribution requirements will be specified in the licensing agreement</li>
              <li>Usage rights are non-transferable and project-specific</li>
            </ul>

            <h3 className="legal-subheading">DMCA Compliance</h3>
            <p className="legal-text">We comply with the Digital Millennium Copyright Act (17 U.S.C. Section 512). If you believe material on our website infringes your copyright, please send a written notice to marie@headshotsbymarie.com containing:</p>
            <ul className="legal-list">
              <li>Identification of the copyrighted work claimed to be infringed</li>
              <li>Identification and location of the allegedly infringing material on our site</li>
              <li>Your contact information (name, address, phone, email)</li>
              <li>A statement that you have a good faith belief that use of the material is not authorized by the copyright owner, its agent, or the law</li>
              <li>A statement, under penalty of perjury, that the information in the notice is accurate and that you are the copyright owner or authorized to act on the owner&apos;s behalf</li>
              <li>Your physical or electronic signature</li>
            </ul>

            <h3 className="legal-subheading">Portfolio Image Notice</h3>
            <p className="legal-text">Portfolio images are displayed as examples of our work quality and style. Featured clients and subjects have provided appropriate permissions. Images may not be used to represent other businesses or individuals.</p>
          </section>

          {/* Disclaimer */}
          <section id="disclaimer" className="mb-20 scroll-mt-24">
            <h2 className="legal-heading">Disclaimer</h2>

            <h3 className="legal-subheading">Service Availability</h3>
            <ul className="legal-list">
              <li>Information on this website is for general informational purposes only</li>
              <li>Pricing, packages, and availability are subject to change without notice</li>
              <li>Website content does not constitute a binding contract or offer</li>
              <li>Formal written agreements are required for all photography services</li>
            </ul>

            <h3 className="legal-subheading">Portfolio Representation</h3>
            <ul className="legal-list">
              <li>Portfolio images represent our style and capabilities</li>
              <li>Actual results may vary based on lighting, location, wardrobe, and other conditions</li>
              <li>Images shown may be from various time periods</li>
              <li>Images have been professionally edited as part of our standard workflow</li>
            </ul>

            <h3 className="legal-subheading">Technical Limitations</h3>
            <ul className="legal-list">
              <li>Website functionality depends on your internet connection and device capabilities</li>
              <li>We are not responsible for technical issues preventing website access</li>
              <li>Contact forms and email may experience occasional delays</li>
              <li>Browser compatibility may vary</li>
            </ul>

            <h3 className="legal-subheading">Professional Advice</h3>
            <p className="legal-text">Information on this website, including blog posts and guides, is provided for general informational purposes and is not intended as professional advice specific to your situation. Consultation is required for project-specific recommendations.</p>

            <h3 className="legal-subheading">Limitation of Liability</h3>
            <p className="legal-text">To the maximum extent permitted by applicable law, Riemagine Studio LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of this website, reliance on any information provided, or service inquiries.</p>
          </section>

          {/* Accessibility */}
          <section id="accessibility" className="mb-20 scroll-mt-24">
            <h2 className="legal-heading">Accessibility</h2>

            <h3 className="legal-subheading">Accessibility Commitment</h3>
            <p className="legal-text">We are committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards, including guidelines from the Web Content Accessibility Guidelines (WCAG) 2.1.</p>

            <h3 className="legal-subheading">Current Efforts</h3>
            <ul className="legal-list">
              <li>Descriptive alt text for portfolio and content images</li>
              <li>Keyboard navigation compatibility</li>
              <li>Sufficient color contrast for text readability</li>
              <li>Clear heading structure and semantic HTML</li>
              <li>Responsive design for all screen sizes and devices</li>
              <li>Accessible navigation and interactive elements</li>
            </ul>

            <h3 className="legal-subheading">Known Limitations</h3>
            <p className="legal-text">We recognize that some areas of our website may not yet be fully accessible. We are actively working to identify and resolve accessibility barriers.</p>

            <h3 className="legal-subheading">Feedback</h3>
            <p className="legal-text">If you encounter accessibility barriers on our website, please contact us at marie@headshotsbymarie.com. We welcome your feedback and will make reasonable efforts to address reported issues promptly.</p>

            <h3 className="legal-subheading">Third-Party Content</h3>
            <p className="legal-text">Our website may link to or embed content from third-party services (such as scheduling platforms or social media). We cannot guarantee the accessibility of third-party content but select providers that demonstrate commitment to accessibility standards.</p>
          </section>
        </div>
      </div>

      <style jsx>{`
        .legal-heading {
          font-family: "Majesti Banner", serif;
          font-size: 2rem;
          font-weight: 300;
          color: #1C1C1C;
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #e5e5e5;
        }
        .legal-meta {
          font-family: "Hanken Grotesk", sans-serif;
          font-size: 0.85rem;
          color: #888;
          margin-bottom: 2rem;
        }
        .legal-subheading {
          font-family: "Hanken Grotesk", sans-serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: #1C1C1C;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }
        .legal-sub-subheading {
          font-family: "Hanken Grotesk", sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: #444;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .legal-text {
          font-family: "Hanken Grotesk", sans-serif;
          font-size: 0.95rem;
          line-height: 1.7;
          color: #333;
          margin-bottom: 1rem;
        }
        .legal-list {
          font-family: "Hanken Grotesk", sans-serif;
          font-size: 0.95rem;
          line-height: 1.7;
          color: #333;
          margin-bottom: 1rem;
          padding-left: 1.5rem;
          list-style-type: disc;
        }
        .legal-list li {
          margin-bottom: 0.4rem;
        }
      `}</style>

      <Footer />
      <MobileBottomNav />
    </>
  )
}
