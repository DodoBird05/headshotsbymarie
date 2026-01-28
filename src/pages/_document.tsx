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

        {/* Self-hosted fonts CSS */}
        <link rel="stylesheet" href="/fonts/fonts.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
