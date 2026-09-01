import { useState, useRef, useMemo, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  PythonIcon, DjangoIcon, ReactIcon, PyTorchIcon, PostgresIcon, DockerIcon, FastApiIcon,
  JavaScriptIcon, TypeScriptIcon, TailwindIcon, TensorFlowIcon, RedisIcon,
  OllamaIcon, HuggingFaceIcon, GitIcon, LinuxIcon,
} from '@/components/icons/TechIcons'
import { BrainCircuit, FileCode, Workflow } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const iconMap = {
  python: PythonIcon, django: DjangoIcon, react: ReactIcon,
  pytorch: PyTorchIcon, postgres: PostgresIcon, docker: DockerIcon,
  fastapi: FastApiIcon, brain: BrainCircuit, workflow: Workflow, filecode: FileCode,
  javascript: JavaScriptIcon, typescript: TypeScriptIcon, tailwind: TailwindIcon,
  tensorflow: TensorFlowIcon, redis: RedisIcon, ollama: OllamaIcon,
  huggingface: HuggingFaceIcon, git: GitIcon, linux: LinuxIcon,
}

const ICON_SIZE = 12
const NODE_R = 4
const HIT_R = 5.5
const LAYER_TOP = 18
const LAYER_BOTTOM = 78
const X_MARGIN = 13.5

function layerLabel(index, total) {
  if (index === 0) return 'Entrée'
  if (index === total - 1) return 'Sortie'
  return 'Cachée'
}

export default function SkillsDetail() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isVisible = useInView(ref, { once: true, margin: '-50px' })
  const [hoveredId, setHoveredId] = useState(null)
  const skills = t('skillsDetail.list', { returnObjects: true })

  const { nodes, connections, numLayers } = useMemo(() => {
    if (!skills.length) return { nodes: [], connections: [], numLayers: 0 }
    const grouped = {}
    skills.forEach((s, i) => {
      const layer = typeof s.layer === 'number' ? s.layer : 0
      ;(grouped[layer] = grouped[layer] || []).push({ ...s, index: i })
    })
    const layerIds = Object.keys(grouped).map(Number).sort((a, b) => a - b)

    const nodes = []
    layerIds.forEach((lid, li) => {
      const list = grouped[lid]
      const n = list.length
      const x = X_MARGIN + (layerIds.length === 1 ? 0 : (li * (100 - 2 * X_MARGIN)) / (layerIds.length - 1))
      list.forEach((skill, i) => {
        const y = n === 1 ? 50 : LAYER_TOP + (i * (LAYER_BOTTOM - LAYER_TOP)) / (n - 1)
        const Icon = iconMap[skill.icon] || FileCode
        nodes.push({ ...skill, id: skill.index, layer: li, cx: x, cy: y, Icon })
      })
    })

    const byLayer = layerIds.map((_, li) => nodes.filter((nd) => nd.layer === li))
    const connections = []
    for (let li = 0; li < byLayer.length - 1; li++) {
      for (const a of byLayer[li]) {
        for (const b of byLayer[li + 1]) {
          connections.push({ from: a.id, to: b.id })
        }
      }
    }
    return { nodes, connections, numLayers: layerIds.length }
  }, [skills])

  const nodeById = useMemo(() => Object.fromEntries(nodes.map((nd) => [nd.id, nd])), [nodes])

  const edgesByNode = useMemo(() => {
    const m = {}
    connections.forEach((c) => {
      ;(m[c.from] = m[c.from] || []).push(c)
      ;(m[c.to] = m[c.to] || []).push(c)
    })
    return m
  }, [connections])

  const isHoverNeighbor = useCallback((id) => {
    if (hoveredId === null || hoveredId === id) return false
    return (edgesByNode[hoveredId] || []).some((c) => c.from === id || c.to === id)
  }, [hoveredId, edgesByNode])

  if (!nodes.length) return null

  const layerXs = [...new Set(nodes.map((nd) => nd.cx))]
  const hoveredNode = nodeById[hoveredId]

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

      <div className="relative max-w-4xl mx-auto px-4">
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full"
            style={{ aspectRatio: '1 / 1', maxHeight: '560px' }}
          >
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              style={{ filter: 'drop-shadow(0 0 8px rgba(16,185,129,0.08))' }}
            >
              <defs>
                <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(16,185,129,0.22)" />
                  <stop offset="60%" stopColor="rgba(16,185,129,0.06)" />
                  <stop offset="100%" stopColor="rgba(16,185,129,0)" />
                </radialGradient>
                <radialGradient id="auraGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(16,185,129,0.08)" />
                  <stop offset="55%" stopColor="rgba(56,189,248,0.05)" />
                  <stop offset="100%" stopColor="rgba(16,185,129,0)" />
                </radialGradient>
                <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(16,185,129,0.7)" />
                  <stop offset="100%" stopColor="rgba(56,189,248,0.55)" />
                </linearGradient>
                <filter id="glowStrong">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <style>{`
                  @keyframes dashflow { to { stroke-dashoffset: -2.5; } }
                `}</style>
              </defs>

              {/* Ambient aura */}
              <circle cx="50" cy="50" r="46" fill="url(#auraGrad)" className="pointer-events-none" />

              {/* Layer guide lines */}
              {layerXs.map((x, li) => (
                <g key={`layer-${li}`} className="pointer-events-none">
                  <line
                    x1={x} y1={LAYER_TOP - 2} x2={x} y2={LAYER_BOTTOM + 2}
                    stroke="rgba(148,163,184,0.07)"
                    strokeDasharray="1 2"
                    strokeWidth="0.3"
                  />
                  <text
                    x={x} y="91.5"
                    textAnchor="middle"
                    fill={hoveredNode && hoveredNode.layer === li ? '#6ee7b7' : 'rgba(148,163,184,0.45)'}
                    fontSize="2.6"
                    fontWeight="600"
                    className="transition-all duration-300"
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  >
                    {layerLabel(li, numLayers)}
                  </text>
                </g>
              ))}

              {/* Connections (dense between adjacent layers) */}
              {connections.map((conn, i) => {
                const from = nodeById[conn.from]
                const to = nodeById[conn.to]
                const active = hoveredId === conn.from || hoveredId === conn.to
                const neighborEdge = hoveredId !== null &&
                  isHoverNeighbor(conn.from) && isHoverNeighbor(conn.to)
                const dimmed = hoveredId !== null && !active && !neighborEdge
                return (
                  <g key={`conn-${i}`}>
                    <path
                      d={`M ${from.cx} ${from.cy} L ${to.cx} ${to.cy}`}
                      stroke="url(#edgeGrad)"
                      strokeWidth={active ? 1.4 : 0.6}
                      strokeLinecap="round"
                      fill="none"
                      className="transition-all duration-500"
                      opacity={active ? 0.9 : neighborEdge ? 0.4 : dimmed ? 0.05 : 0.16}
                    />
                    <path
                      d={`M ${from.cx} ${from.cy} L ${to.cx} ${to.cy}`}
                      stroke="#34d399"
                      strokeWidth={active ? 1.1 : 0.6}
                      strokeLinecap="round"
                      fill="none"
                      strokeDasharray="0.5 2"
                      className="transition-all duration-500"
                      style={{
                        animation: `dashflow ${1.3 + (i % 6) * 0.35}s linear infinite`,
                        animationDelay: `${(i % 9) * -0.3}s`,
                        opacity: active ? 0.75 : neighborEdge ? 0.3 : dimmed ? 0.02 : 0.18,
                      }}
                    />
                  </g>
                )
              })}

              {/* Node glow */}
              {nodes.map((node) => (
                <circle
                  key={`glow-${node.id}`}
                  cx={node.cx} cy={node.cy} r="5.5"
                  fill="url(#nodeGlow)"
                  className="transition-all duration-300"
                  style={{ opacity: hoveredId === null || hoveredId === node.id ? 1 : 0.25 }}
                />
              ))}

              {/* Pulsing ripple on hovered node */}
              {hoveredNode && (
                <motion.circle
                  cx={hoveredNode.cx} cy={hoveredNode.cy}
                  fill="none"
                  stroke="rgba(16,185,129,0.5)"
                  strokeWidth="0.35"
                  initial={{ r: NODE_R, opacity: 0.7 }}
                  animate={{ r: NODE_R + 7, opacity: 0 }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                  className="pointer-events-none"
                />
              )}

              {/* Nodes */}
              {nodes.map((node) => {
                const active = hoveredId === node.id
                const neighbor = isHoverNeighbor(node.id)
                const dimmed = hoveredId !== null && !active && !neighbor
                return (
                  <g
                    key={node.id}
                    className="transition-all duration-300"
                    style={{ opacity: dimmed ? 0.3 : 1 }}
                  >
                    <circle
                      cx={node.cx} cy={node.cy} r={NODE_R}
                      fill="rgba(16,185,129,0.1)"
                      stroke={active ? 'rgba(16,185,129,0.85)' : neighbor ? 'rgba(16,185,129,0.5)' : 'rgba(16,185,129,0.22)'}
                      strokeWidth={active ? 1 : 0.5}
                      filter={active ? 'url(#glowStrong)' : 'none'}
                      className="transition-all duration-300"
                    />
                    <foreignObject
                      x={node.cx - NODE_R}
                      y={node.cy - NODE_R}
                      width={NODE_R * 2}
                      height={NODE_R * 2}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <node.Icon size={ICON_SIZE} className={active ? 'text-emerald-200' : 'text-emerald-300/80'} />
                      </div>
                    </foreignObject>
                    <circle
                      cx={node.cx} cy={node.cy} r={HIT_R}
                      fill="transparent"
                      style={{ cursor: 'pointer' }}
                      onMouseEnter={() => setHoveredId(node.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    />
                  </g>
                )
              })}
            </svg>

            {/* Hover tooltip (HTML overlay) */}
            {hoveredNode && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="absolute z-20 w-52 -translate-x-1/2 pointer-events-none"
                style={{
                  left: `${hoveredNode.cx}%`,
                  top: hoveredNode.cy > 45 ? `${hoveredNode.cy - 20}%` : `${hoveredNode.cy + 10}%`,
                }}
              >
                <div className="rounded-xl border border-emerald-500/20 bg-black/85 backdrop-blur-md px-3.5 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-semibold text-emerald-200">{hoveredNode.name}</span>
                  </div>
                  <p className="text-[10px] leading-relaxed text-gray-400">
                    {hoveredNode.description}
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center text-xs text-gray-600 mt-4"
        >
          Survolez un n&oelig;ud pour explorer la synapse &mdash; {nodes.length} technologies dans {numLayers} couches interconnect&eacute;es
        </motion.p>
      </div>
    </section>
  )
}