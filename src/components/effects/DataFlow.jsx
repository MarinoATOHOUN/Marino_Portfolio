import { useEffect, useRef } from 'react'

export function DataFlow({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1)
      canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1)
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1)
    }

    resize()
    window.addEventListener('resize', resize)

    const drops = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      speed: 0.2 + Math.random() * 0.4,
      length: 5 + Math.random() * 15,
      alpha: 0.1 + Math.random() * 0.15,
    }))

    let anim

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      for (const drop of drops) {
        drop.y += drop.speed
        if (drop.y > canvas.offsetHeight) {
          drop.y = -drop.length
          drop.x = Math.random() * canvas.offsetWidth
        }

        const gradient = ctx.createLinearGradient(
          drop.x, drop.y - drop.length,
          drop.x, drop.y
        )
        gradient.addColorStop(0, `rgba(59, 130, 246, 0)`)
        gradient.addColorStop(1, `rgba(59, 130, 246, ${drop.alpha})`)

        ctx.fillStyle = gradient
        ctx.fillRect(drop.x, drop.y - drop.length, 1, drop.length)
      }

      anim = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      if (anim) cancelAnimationFrame(anim)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity: 0.4 }}
    />
  )
}
