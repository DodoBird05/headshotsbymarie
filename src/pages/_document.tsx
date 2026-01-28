import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preconnect to font providers */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />

        {/* Google Fonts - Hanken Grotesk only */}
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;700&display=swap"
          rel="stylesheet"
        />

        {/* Fontshare - Majesti Banner */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=majesti-banner@300,400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
