import { useEffect, useRef } from 'react'

export default function DataCurve({ className = '' }) {
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

    const w = () => canvas.offsetWidth
    const h = () => canvas.offsetHeight
    let phase = 0

    let anim

    const draw = () => {
      ctx.clearRect(0, 0, w(), h())
      phase += 0.01

      const curves = [
        { color: 'rgba(59, 130, 246, 0.08)', amp: 20, freq: 0.02, yOff: 0.3 },
        { color: 'rgba(96, 165, 250, 0.06)', amp: 15, freq: 0.025, yOff: 0.5 },
        { color: 'rgba(59, 130, 246, 0.04)', amp: 12, freq: 0.015, yOff: 0.7 },
      ]

      for (const curve of curves) {
        ctx.beginPath()
        ctx.moveTo(0, h() * curve.yOff)

        for (let x = 0; x <= w(); x += 2) {
          const y =
            h() * curve.yOff +
            Math.sin(x * curve.freq + phase) * curve.amp +
            Math.sin(x * curve.freq * 2 + phase * 1.3) * (curve.amp * 0.5)
          ctx.lineTo(x, y)
        }

        ctx.strokeStyle = curve.color
        ctx.lineWidth = 1.5
        ctx.stroke()
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
    />
  )
}
