import { useRef, useCallback } from 'react'

export function useMagnetic({ strength = 0.3, radius = 200 } = {}) {
  const ref = useRef(null)

  const onMouseMove = useCallback(
    (e) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distX = e.clientX - centerX
      const distY = e.clientY - centerY
      const dist = Math.sqrt(distX * distX + distY * distY)

      if (dist < radius) {
        const power = (1 - dist / radius) * strength
        el.style.transform = `translate(${distX * power}px, ${distY * power}px)`
      }
    },
    [strength, radius]
  )

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0px, 0px)'
  }, [])

  return [ref, { onMouseMove, onMouseLeave }]
}
