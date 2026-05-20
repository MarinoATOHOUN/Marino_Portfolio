import { useEffect, useRef } from 'react'

export function useScrollVelocity() {
  const velocityRef = useRef(0)
  const lastYRef = useRef(0)

  useEffect(() => {
    let ticking = false

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY
          velocityRef.current = Math.abs(currentY - lastYRef.current)
          lastYRef.current = currentY
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return velocityRef
}
