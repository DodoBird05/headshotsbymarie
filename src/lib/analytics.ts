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

// Scroll depth tracking (optional - can be enabled later)
export function trackScrollDepth(percentage: number, pagePath: string) {
  trackEvent('scroll_depth', {
    depth_percentage: percentage,
    page_path: pagePath
  })
}
