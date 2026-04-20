import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import '@/styles/globals.css'
import { useScrollDepth } from '@/lib/analytics'

const GA_MEASUREMENT_ID = 'G-2S399CP634'

export default function App({ Component, pageProps }: AppProps) {
  useScrollDepth()

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
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </Head>

      <main>
        <Component {...pageProps} />
      </main>
    </>
  )
}