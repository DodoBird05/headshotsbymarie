import { useEffect } from 'react'

/**
 * Lightweight scroll-reveal hook using Intersection Observer.
 * Elements with `data-reveal` start invisible and animate in when they enter the viewport.
 *
 * Attributes:
 *   data-reveal          — enables reveal (required)
 *   data-reveal-delay    — delay in ms (optional, e.g. "200")
 *   data-reveal-direction — "up" (default), "left", "right", "none" (fade only)
 *
 * Picks up elements added after mount (e.g. branch switches on isDesktop) via MutationObserver.
 */
export default function useScrollReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const tracked = new WeakSet<HTMLElement>()

    const applyInitial = (htmlEl: HTMLElement) => {
      if (tracked.has(htmlEl)) return
      tracked.add(htmlEl)

      const direction = htmlEl.dataset.revealDirection || 'up'
      const delay = htmlEl.dataset.revealDelay || '0'

      htmlEl.style.opacity = '0'
      htmlEl.style.transition = `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`

      switch (direction) {
        case 'left':
          htmlEl.style.transform = 'translateX(-30px)'
          break
        case 'right':
          htmlEl.style.transform = 'translateX(30px)'
          break
        case 'none':
          htmlEl.style.transform = 'none'
          break
        default: // 'up'
          htmlEl.style.transform = 'translateY(30px)'
      }

      observer.observe(htmlEl)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const htmlEl = entry.target as HTMLElement
            htmlEl.style.opacity = '1'
            htmlEl.style.transform = 'translate(0, 0)'
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach(applyInitial)

    const mutationObserver = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return
          if (node.matches('[data-reveal]')) applyInitial(node)
          node.querySelectorAll<HTMLElement>('[data-reveal]').forEach(applyInitial)
        })
      }
    })
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])
}
