import { useEffect, useRef } from 'react'
import { useMousePosition } from '@/hooks/useMousePosition'

export default function NeuralNetwork({ scrollFactor = 0 }) {
  const canvasRef = useRef(null)
  const mouse = useMousePosition()
  const nodesRef = useRef([])
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    const count = 70
    const w = () => canvas.offsetWidth
    const h = () => canvas.offsetHeight

    nodesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * w(),
      y: Math.random() * h(),
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      radius: Math.random() * 1.8 + 0.3,
      pulse: Math.random() * Math.PI * 2,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, w(), h())

      const nodes = nodesRef.current
      const cw = w()
      const ch = h()
      const scrollPush = (scrollFactor || 0) * 0.3

      for (const node of nodes) {
        node.x += node.vx + Math.sin(Date.now() * 0.001 + node.pulse) * 0.02
        node.y += node.vy + scrollPush * 0.01
        node.pulse += 0.005

        if (node.x < 0 || node.x > cw) node.vx *= -1
        if (node.y < 0 || node.y > ch) node.vy *= -1

        node.x = Math.max(0, Math.min(cw, node.x))
        node.y = Math.max(0, Math.min(ch, node.y))
      }

      // Draw connections
      const connectionDist = 140
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.2 * (0.8 + scrollPush * 0.02)
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`
            ctx.lineWidth = 0.4
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      const mx = mouse.x * (window.devicePixelRatio || 1)
      const my = mouse.y * (window.devicePixelRatio || 1)

      for (const node of nodes) {
        const dx = node.x - mx
        const dy = node.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        const glow = Math.max(0, 1 - dist / 180)
        const pulseSize = Math.sin(node.pulse) * 0.2 + 1

        if (glow > 0) {
          ctx.beginPath()
          ctx.arc(node.x, node.y, (node.radius + glow * 4) * pulseSize, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(59, 130, 246, ${0.15 + glow * 0.5})`
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius * pulseSize, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${0.12 + glow * 0.3})`
        ctx.fill()
      }

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [mouse, scrollFactor])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.5 }}
    />
  )
}
