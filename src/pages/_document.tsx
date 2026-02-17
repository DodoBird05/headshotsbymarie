import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preload critical fonts for faster rendering */}
        <link
          rel="preload"
          href="/fonts/hanken-grotesk.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/majesti-banner-300.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/majesti-banner-400.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Inlined font-face declarations (eliminates fonts.css from critical chain) */}
        <style dangerouslySetInnerHTML={{ __html: `
          @font-face {
            font-family: 'Hanken Grotesk';
            font-style: normal;
            font-weight: 300 700;
            font-display: swap;
            src: url('/fonts/hanken-grotesk.woff2') format('woff2');
          }
          @font-face {
            font-family: 'Majesti Banner';
            font-style: normal;
            font-weight: 300;
            font-display: swap;
            src: url('/fonts/majesti-banner-300.woff2') format('woff2');
          }
          @font-face {
            font-family: 'Majesti Banner';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url('/fonts/majesti-banner-400.woff2') format('woff2');
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
