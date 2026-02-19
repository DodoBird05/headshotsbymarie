import Head from 'next/head'

export default function CorporateRedirect() {
  return (
    <>
      <Head>
        <meta httpEquiv="refresh" content="0;url=/executive-headshots/" />
        <link rel="canonical" href="https://headshotsbymarie.com/executive-headshots" />
        <title>Redirecting to Executive Headshots</title>
      </Head>
      <p>
        This page has moved. If you are not redirected automatically,{' '}
        <a href="/executive-headshots/">click here</a>.
      </p>
      <script dangerouslySetInnerHTML={{ __html: 'window.location.replace("/executive-headshots/")' }} />
    </>
  )
}
