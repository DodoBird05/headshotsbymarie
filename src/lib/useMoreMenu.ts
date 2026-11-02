import { useEffect, useRef, useState } from 'react'

// The "More" dropdown on the blog/studio pages: closes on a click outside it
// and on its own after 10 seconds. Was written out identically in 14 files.
export function useMoreMenu() {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)
  const moreMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isMoreMenuOpen) return
    const handleClickOutside = (event: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setIsMoreMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    const timer = setTimeout(() => setIsMoreMenuOpen(false), 10000)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      clearTimeout(timer)
    }
  }, [isMoreMenuOpen])

  return { isMoreMenuOpen, setIsMoreMenuOpen, moreMenuRef }
}
