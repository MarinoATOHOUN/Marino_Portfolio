import { useEffect, useRef, useState } from 'react'

export function useScrollAnimation(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const rect = element.getBoundingClientRect()
    const alreadyInView = rect.top < window.innerHeight - 50 && rect.bottom > 50
    if (alreadyInView) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (!options.repeat) {
            observer.unobserve(element)
          }
        } else if (options.repeat) {
          setIsVisible(false)
        }
      },
      {
        threshold: 0,
        rootMargin: options.rootMargin || '0px',
      }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [options.rootMargin, options.repeat])

  return [ref, isVisible]
}
