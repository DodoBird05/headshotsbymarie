// Google Analytics 4 Event Tracking Utility

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
  }
}

type EventParams = {
  [key: string]: string | number | boolean | undefined
}

// Core tracking function
export function trackEvent(eventName: string, params?: EventParams) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params)
  }
}

// Navigation tracking
export function trackNavClick(linkText: string, destination: string, location: string) {
  trackEvent('nav_click', {
    link_text: linkText,
    destination: destination,
    nav_location: location // 'header', 'footer', 'mobile_nav', 'hero'
  })
}

// Button tracking
export function trackButtonClick(buttonText: string, buttonLocation: string, action?: string) {
  trackEvent('button_click', {
    button_text: buttonText,
    button_location: buttonLocation,
    action: action || 'click'
  })
}

// Photo/Image tracking
export function trackPhotoView(photoSrc: string, photoAlt: string, location: string) {
  // Extract filename from path for cleaner reporting
  const filename = photoSrc.split('/').pop() || photoSrc
  trackEvent('photo_view', {
    photo_name: filename,
    photo_alt: photoAlt,
    photo_location: location // 'gallery', 'hero', 'about', etc.
  })
}

export function trackPhotoClick(photoSrc: string, photoAlt: string, location: string) {
  const filename = photoSrc.split('/').pop() || photoSrc
  trackEvent('photo_click', {
    photo_name: filename,
    photo_alt: photoAlt,
    photo_location: location
  })
}

// Photo engagement time tracking (how long users look at expanded photos)
export function trackPhotoEngagement(photoSrc: string, photoAlt: string, location: string, durationMs: number) {
  const durationSeconds = Math.round(durationMs / 1000)
  if (durationSeconds < 1) return // discard accidental clicks
  const filename = photoSrc.split('/').pop() || photoSrc
  trackEvent('photo_engagement', {
    photo_name: filename,
    photo_alt: photoAlt,
    photo_location: location,
    engagement_duration_sec: durationSeconds
  })
}

// Photo viewport visibility tracking (how long photos are visible on screen)
export function trackPhotoViewTime(photoSrc: string, photoAlt: string, location: string, durationMs: number) {
  const durationSeconds = Math.round(durationMs / 1000)
  if (durationSeconds < 2) return // discard scroll-past
  const filename = photoSrc.split('/').pop() || photoSrc
  trackEvent('photo_view_time', {
    photo_name: filename,
    photo_alt: photoAlt,
    photo_location: location,
    view_duration_sec: durationSeconds
  })
}

// External link tracking
export function trackExternalLink(url: string, linkText: string, platform?: string) {
  trackEvent('external_link_click', {
    url: url,
    link_text: linkText,
    platform: platform || 'unknown' // 'instagram', 'linkedin', 'pinterest', 'email'
  })
}

// Contact action tracking
export function trackContactAction(action: string, method: string) {
  trackEvent('contact_action', {
    action: action, // 'copy_email', 'call', 'email_click'
    method: method
  })
}

// Service/pricing interest tracking
export function trackServiceInterest(serviceName: string, action: string) {
  trackEvent('service_interest', {
    service_name: serviceName,
    action: action // 'hover', 'click', 'view_pricing'
  })
}

// FAQ tracking
export function trackFaqInteraction(question: string, action: 'open' | 'close') {
  trackEvent('faq_interaction', {
    question: question.substring(0, 100), // Truncate long questions
    action: action
  })
}

// Scroll depth tracking
export function trackScrollDepth(percentage: number, pagePath: string) {
  trackEvent('scroll_depth', {
    depth_percentage: percentage,
    page_path: pagePath
  })
}

// Scroll depth hook - fires at 25%, 50%, 75%, 100% thresholds once per page load
import { useEffect, useRef, type RefObject } from 'react'
import { useRouter } from 'next/router'

export function useScrollDepth() {
  const firedRef = useRef<Set<number>>(new Set())
  const router = useRouter()

  useEffect(() => {
    firedRef.current.clear()

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) return
      const percentage = (window.scrollY / scrollHeight) * 100

      const thresholds = [25, 50, 75, 100]
      for (const threshold of thresholds) {
        if (percentage >= threshold && !firedRef.current.has(threshold)) {
          firedRef.current.add(threshold)
          trackScrollDepth(threshold, router.asPath)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [router.asPath])
}

// Photo viewport visibility hook - tracks how long a photo is visible on screen
export function usePhotoViewTracking(
  ref: RefObject<HTMLElement | null>,
  photoSrc: string,
  photoAlt: string,
  location: string
) {
  const visibleStartRef = useRef<number | null>(null)
  const accumulatedRef = useRef<number>(0)
  const photoSrcRef = useRef(photoSrc)
  const photoAltRef = useRef(photoAlt)
  const locationRef = useRef(location)

  useEffect(() => {
    photoSrcRef.current = photoSrc
    photoAltRef.current = photoAlt
    locationRef.current = location
  }, [photoSrc, photoAlt, location])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    accumulatedRef.current = 0
    visibleStartRef.current = null

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleStartRef.current = Date.now()
          } else {
            if (visibleStartRef.current !== null) {
              accumulatedRef.current += Date.now() - visibleStartRef.current
              visibleStartRef.current = null
            }
          }
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      if (visibleStartRef.current !== null) {
        accumulatedRef.current += Date.now() - visibleStartRef.current
        visibleStartRef.current = null
      }
      if (accumulatedRef.current > 0) {
        trackPhotoViewTime(
          photoSrcRef.current,
          photoAltRef.current,
          locationRef.current,
          accumulatedRef.current
        )
      }
    }
  }, [ref])
}
