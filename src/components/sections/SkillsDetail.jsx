import { useState, useRef, useMemo, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { PythonIcon, DjangoIcon, ReactIcon, PyTorchIcon, PostgresIcon, DockerIcon, FastApiIcon } from '@/components/icons/TechIcons'
import { BrainCircuit, FileCode, Workflow } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const iconMap = {
  python: PythonIcon, django: DjangoIcon, react: ReactIcon,
  pytorch: PyTorchIcon, postgres: PostgresIcon, docker: DockerIcon,
  fastapi: FastApiIcon, brain: BrainCircuit, workflow: Workflow, filecode: FileCode,
}

const NODE_SIZE = 56
const NODE_RADIUS = 28

export default function SkillsDetail() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isVisible = useInView(ref, { once: true, margin: '-50px' })
  const [hoveredId, setHoveredId] = useState(null)
  const skills = t('skillsDetail.list', { returnObjects: true })
  const containerRef = useRef(null)

  const nodes = useMemo(() => {
    if (!skills.length) return []
    const count = skills.length
    return skills.map((skill, i) => {
      const angle = (i / count) * Math.PI * 2 - Math.PI / 2
      const rx = 38
      const ry = 30
      const cx = 50 + rx * Math.cos(angle)
      const cy = 50 + ry * Math.sin(angle)
      const Icon = iconMap[skill.icon] || FileCode
      return { ...skill, id: i, cx, cy, angle, Icon }
    })
  }, [skills])

  const connections = useMemo(() => {
    const conns = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = Math.sqrt((nodes[i].cx - nodes[j].cx) ** 2 + (nodes[i].cy - nodes[j].cy) ** 2)
        if (dist < 55) {
          conns.push({ from: i, to: j, strength: Math.max(0, 1 - dist / 55) })
        }
      }
    }
    if (conns.length < nodes.length - 1) {
      const sorted = [...nodes].map((n, i) => ({ i, angle: n.angle })).sort((a, b) => a.angle - b.angle)
      for (let k = 0; k < sorted.length; k++) {
        const next = (k + 1) % sorted.length
        if (!conns.some(c => (c.from === sorted[k].i && c.to === sorted[next].i) || (c.from === sorted[next].i && c.to === sorted[k].i))) {
          conns.push({ from: sorted[k].i, to: sorted[next].i, strength: 0.4 })
        }
      }
    }
    return conns
  }, [nodes])

  const isConnected = useCallback((id) => {
    return connections.filter(c => c.from === id || c.to === id).map(c => c.from === id ? c.to : c.from)
  }, [connections])

  if (!skills.length) return null

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-20 sm:py-28 overflow-hidden bg-black"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/3 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <span className="section-label text-emerald-400/70 mb-3 block">
            <span className="section-label-dot bg-emerald-500" />
            {t('skillsDetail.sectionLabel')}
          </span>
          <h2 className="section-title text-foreground mb-2">
            {t('skillsDetail.title')}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            {t('skillsDetail.subtitle')}
          </p>
        </motion.div>
      </div>

      <div ref={containerRef} className="relative max-w-4xl mx-auto px-4">
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full"
            style={{ aspectRatio: '1.3 / 1', maxHeight: '520px' }}
          >
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              style={{ filter: 'drop-shadow(0 0 6px rgba(16,185,129,0.06))' }}
            >
              <defs>
                <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(16,185,129,0.15)" />
                  <stop offset="100%" stopColor="rgba(16,185,129,0)" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="glowStrong">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* Connections */}
              {connections.map((conn, i) => {
                const from = nodes[conn.from]
                const to = nodes[conn.to]
                const active = hoveredId !== null && (hoveredId === conn.from || hoveredId === conn.to)
                const neighborHovered = hoveredId !== null && isConnected(hoveredId).includes(conn.from) && isConnected(hoveredId).includes(conn.to)
                return (
                  <g key={`conn-${i}`}>
                    <line
                      x1={from.cx} y1={from.cy} x2={to.cx} y2={to.cy}
                      stroke={active ? 'rgba(16,185,129,0.35)' : 'rgba(16,185,129,0.08)'}
                      strokeWidth={active ? 1.2 : 0.5}
                      className="transition-all duration-500"
                    />
                    {/* Animated pulse along connection */}
                    {active && (
                      <motion.circle
                        r="1.5" fill="#34d399"
                        initial={{ offsetDistance: '0%' }}
                        animate={{ offsetDistance: '100%' }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        style={{ offsetPath: `path("M ${from.cx} ${from.cy} L ${to.cx} ${to.cy}")` }}
                      />
                    )}
                  </g>
                )
              })}

              {/* Glow circles behind nodes */}
              {nodes.map((node) => (
                <circle
                  key={`glow-${node.id}`}
                  cx={node.cx} cy={node.cy} r="12"
                  fill="url(#nodeGlow)"
                  className="transition-all duration-500"
                  style={{ opacity: hoveredId === null || hoveredId === node.id ? 1 : 0.2 }}
                />
              ))}

              {/* Nodes */}
              {nodes.map((node) => {
                const active = hoveredId === node.id
                const neighborActive = hoveredId !== null && isConnected(hoveredId).includes(node.id)
                const dimmed = hoveredId !== null && !active && !neighborActive
                return (
                  <g key={node.id} className="transition-all duration-500" style={{ opacity: dimmed ? 0.25 : 1 }}>
                    <motion.circle
                      cx={node.cx} cy={node.cy} r={NODE_RADIUS / 3}
                      fill="rgba(16,185,129,0.06)"
                      stroke="rgba(16,185,129,0.2)"
                      strokeWidth="0.4"
                      animate={active ? { r: NODE_RADIUS / 2.5, strokeWidth: 1 } : { r: NODE_RADIUS / 3, strokeWidth: 0.4 }}
                      transition={{ duration: 0.3 }}
                    />
                    <circle
                      cx={node.cx} cy={node.cy} r={NODE_RADIUS / 3.5}
                      fill="rgba(16,185,129,0.1)"
                      stroke={active ? 'rgba(16,185,129,0.5)' : 'rgba(16,185,129,0.15)'}
                      strokeWidth={active ? 1 : 0.5}
                      filter={active ? 'url(#glowStrong)' : 'none'}
                      className="transition-all duration-300"
                    />
                    <foreignObject
                      x={node.cx - NODE_RADIUS / 3}
                      y={node.cy - NODE_RADIUS / 3}
                      width={NODE_RADIUS / 1.5}
                      height={NODE_RADIUS / 1.5}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <node.Icon size={14} className={active ? 'text-emerald-300' : 'text-emerald-400/70'} />
                      </div>
                    </foreignObject>
                  </g>
                )
              })}

              {/* Labels */}
              {nodes.map((node) => {
                const active = hoveredId === node.id
                const neighborActive = hoveredId !== null && isConnected(hoveredId).includes(node.id)
                const dimmed = hoveredId !== null && !active && !neighborActive
                return (
                  <g key={`label-${node.id}`} style={{ opacity: dimmed ? 0.15 : 1 }} className="transition-all duration-500">
                    <text
                      x={node.cx} y={node.cy + NODE_RADIUS / 2.2}
                      textAnchor="middle"
                      fill={active ? '#6ee7b7' : '#6b7280'}
                      fontSize="2.8"
                      fontWeight={active ? '700' : '500'}
                      className="transition-all duration-300"
                      style={{ fontFamily: 'system-ui, sans-serif' }}
                    >
                      {node.name}
                    </text>
                    {active && (
                      <text
                        x={node.cx} y={node.cy + NODE_RADIUS / 1.6}
                        textAnchor="middle"
                        fill="#6b7280"
                        fontSize="1.8"
                        style={{ fontFamily: 'system-ui, sans-serif' }}
                      >
                        {node.description.length > 35 ? node.description.slice(0, 35) + '...' : node.description}
                      </text>
                    )}
                  </g>
                )
              })}

              {/* Invisible hit areas for hover */}
              {nodes.map((node) => (
                <circle
                  key={`hit-${node.id}`}
                  cx={node.cx} cy={node.cy} r="8"
                  fill="transparent"
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredId(node.id)}
                  onMouseLeave={() => setHoveredId(null)}
                />
              ))}
            </svg>
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center text-xs text-gray-600 mt-4"
        >
          Survolez un n&oelig;ud pour voir les connexions &mdash; {skills.length} technologies interconnect&eacute;es
        </motion.p>
      </div>
    </section>
  )
}
