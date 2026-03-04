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
 * Uses only opacity + transform for GPU-accelerated performance.
 */
export default function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]')
    if (!elements.length) return

    // Apply initial hidden state
    elements.forEach((el) => {
      const htmlEl = el as HTMLElement
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
    })

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

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}
