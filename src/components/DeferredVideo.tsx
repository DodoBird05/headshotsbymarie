import { useEffect, useRef, type CSSProperties } from 'react'

// A muted, looping background video that waits for the page to finish
// loading before it downloads. `autoPlay` makes browsers ignore
// preload="none" and fetch the whole file while the page is still loading
// (758 KB on the /pricing/ hero, 2 MB on the /the-studio/ timelapse), so the
// video is started from code once the load event has fired. The poster shows
// until then; the video looks and loops exactly as before.
type Source = { src: string; type: string }

export default function DeferredVideo({
  sources,
  poster,
  className,
  style,
}: {
  sources: Source[]
  poster: string
  className?: string
  style?: CSSProperties
}) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const play = () => {
      video.preload = 'auto'
      video.play().catch(() => {
        // Autoplay refused (e.g. power saving mode): the poster stays.
      })
    }
    if (document.readyState === 'complete') {
      play()
      return
    }
    window.addEventListener('load', play, { once: true })
    return () => window.removeEventListener('load', play)
  }, [])

  return (
    <video ref={ref} className={className} style={style} muted loop playsInline preload="none" poster={poster}>
      {sources.map((s) => (
        <source key={s.src} src={s.src} type={s.type} />
      ))}
      Your browser does not support the video tag.
    </video>
  )
}
