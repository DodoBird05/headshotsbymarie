import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import '@/styles/globals.css'
import { useScrollDepth } from '@/lib/analytics'

const GA_MEASUREMENT_ID = 'G-2S399CP634'

export default function App({ Component, pageProps }: AppProps) {
  useScrollDepth()
  const router = useRouter()

  // page_view on in-site navigation. gtag('config') below sends the page_view
  // for the landing page only; Next.js changes pages client-side, so without
  // this every later page in a visit went uncounted (GA4 Enhanced measurement,
  // which used to send these from browser history changes, is off and stays
  // off so the site's own scroll tracking isn't doubled). page_location must
  // be passed explicitly, or GA4 files the event under the landing page.
  // Same-page #anchor jumps don't fire routeChangeComplete, so aren't counted.
  useEffect(() => {
    let previousUrl = window.location.href
    let previousTitle = document.title
    let cancelPending: (() => void) | null = null

    const onRouteChangeComplete = () => {
      const url = window.location.href
      if (url === previousUrl) return
      cancelPending?.()

      // next/head commits the new <title> just after routeChangeComplete, so
      // reading it immediately can still return the previous page's title.
      // Send once the title has changed, or after 500ms for the rare page
      // whose title is the same as the one before.
      let sent = false
      const send = () => {
        if (sent) return
        sent = true
        observer.disconnect()
        clearTimeout(fallback)
        window.gtag?.('event', 'page_view', {
          page_location: url,
          page_referrer: previousUrl,
          page_title: document.title
        })
        previousUrl = url
        previousTitle = document.title
        cancelPending = null
      }
      const observer = new MutationObserver(() => {
        if (document.title !== previousTitle) send()
      })
      observer.observe(document.head, { subtree: true, childList: true, characterData: true })
      const fallback = setTimeout(send, 500)
      if (document.title !== previousTitle) send()
      // A second navigation before this one resolved: flush this page's view now.
      cancelPending = send
    }

    router.events.on('routeChangeComplete', onRouteChangeComplete)
    return () => {
      cancelPending?.()
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router.events])

  // Defer GA loading: stub gtag immediately so events queue in dataLayer,
  // but only load the actual script on first user interaction or after 3.5s.
  // This keeps gtag.js out of Lighthouse's "unused JavaScript" metric.
  useEffect(() => {
    // Skip analytics on localhost / private networks so dev traffic
    // (e.g. /scott/ component previews) doesn't pollute GA4.
    const host = window.location.hostname
    const isLocal =
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host.endsWith('.local') ||
      /^192\.168\.|^10\.|^172\.(1[6-9]|2\d|3[01])\./.test(host)
    if (isLocal) {
      // Provide a no-op stub so trackEvent() calls don't error.
      window.dataLayer = window.dataLayer || []
      window.gtag = function () {}
      return
    }

    window.dataLayer = window.dataLayer || []
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', GA_MEASUREMENT_ID)

    let loaded = false
    const loadScript = () => {
      if (loaded) return
      loaded = true
      const script = document.createElement('script')
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
      script.async = true
      document.head.appendChild(script)
    }

    const events: (keyof WindowEventMap)[] = ['scroll', 'click', 'touchstart']
    events.forEach((e) =>
      window.addEventListener(e, loadScript, { once: true, passive: true })
    )
    const timer = setTimeout(loadScript, 3500)

    return () => {
      clearTimeout(timer)
      events.forEach((e) => window.removeEventListener(e, loadScript))
    }
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Built by scripts/generate-favicons.js from media-originals/favicon-source.png */}
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/icon-192.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <main>
        <Component {...pageProps} />
      </main>
    </>
  )
}