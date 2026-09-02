import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preload critical fonts for faster rendering */}
        <link
          rel="preload"
          href="/fonts/romie-regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Inlined font-face declarations (eliminates fonts.css from critical chain) */}
        <style dangerouslySetInnerHTML={{ __html: `
          /* Romie — licensed (ML Type Foundry, "Romie Essentials"). Sole typeface as of
             2026-08-28: it replaced Majesti Banner as the display face and Hanken Grotesk
             as the text face, so the site no longer loads a sans at all.

             Romie Essentials ships three weights (400/500/700) but the site asks for
             200, 300, 400, 500, 600 and 700. The ranges below map every requested
             weight onto a real file so nothing is synthetically emboldened:
               100-449 -> Regular   450-649 -> Medium   650-900 -> Bold
             Note 300 is by far the most-used weight on the site and now renders as
             Romie Regular, so text sits heavier than it did in Hanken Grotesk Light. */
          @font-face {
            font-family: 'Romie';
            font-style: normal;
            font-weight: 100 449;
            font-display: swap;
            src: url('/fonts/romie-regular.woff2') format('woff2');
          }
          @font-face {
            font-family: 'Romie';
            font-style: italic;
            font-weight: 100 449;
            font-display: swap;
            src: url('/fonts/romie-italic.woff2') format('woff2');
          }
          @font-face {
            font-family: 'Romie';
            font-style: normal;
            font-weight: 450 649;
            font-display: swap;
            src: url('/fonts/romie-medium.woff2') format('woff2');
          }
          @font-face {
            font-family: 'Romie';
            font-style: italic;
            font-weight: 450 649;
            font-display: swap;
            src: url('/fonts/romie-medium-italic.woff2') format('woff2');
          }
          @font-face {
            font-family: 'Romie';
            font-style: normal;
            font-weight: 650 900;
            font-display: swap;
            src: url('/fonts/romie-bold.woff2') format('woff2');
          }
          @font-face {
            font-family: 'Romie';
            font-style: italic;
            font-weight: 650 900;
            font-display: swap;
            src: url('/fonts/romie-bold-italic.woff2') format('woff2');
          }
        `}} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
