import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { VSCodeIcon, DockerIcon, GitIcon, LinuxIcon, OpenAiIcon, LLamaIcon } from '@/components/icons/TechIcons'
import { Terminal, Globe, Server, BookOpen, Smile, Workflow, Presentation, Table, Gauge, ChartBar, Cpu, Timer, Waypoints, Zap, Sparkles, Code2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const iconMap = {
  vscode: VSCodeIcon, docker: DockerIcon, git: GitIcon, linux: LinuxIcon,
  terminal: Terminal, globe: Globe, server: Server,
  notebook: BookOpen, llama: LLamaIcon, huggingface: Smile,
  workflow: Workflow, presentation: Presentation, table: Table,
  gauge: Gauge, chart: ChartBar, tf: Cpu, cpu: Cpu,
  tracking: Timer, pipeline: Waypoints, zap: Zap, sparkles: Sparkles, openai: OpenAiIcon,
}

function ToolCard({ tool, index }) {
  const Icon = iconMap[tool.icon] || Code2
  return (
    <div className="group relative flex-shrink-0 w-[220px] sm:w-[250px] p-4 sm:p-5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-purple-500/30 transition-all duration-300 cursor-default">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/0 via-transparent to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2.5">
          <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
            <Icon size={20} className="text-purple-400" />
          </div>
          <h3 className="text-sm font-semibold text-foreground whitespace-nowrap">{tool.name}</h3>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{tool.description}</p>
      </div>
    </div>
  )
}

function ScrollingRow({ tools, speed = 30, reverse = false }) {
  const doubled = [...tools, ...tools]
  return (
    <div className="relative">
      <motion.div
        className="flex gap-3 sm:gap-4 w-max"
        animate={reverse ? { x: ['-50%', '0%'] } : { x: ['0%', '-50%'] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {doubled.map((tool, i) => (
          <ToolCard key={`${tool.name}-${i}`} tool={tool} index={i} />
        ))}
      </motion.div>
    </div>
  )
}

export default function Tools() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isVisible = useInView(ref, { once: true, margin: '-100px' })
  const tools = t('tools.list', { returnObjects: true })

  const mid = Math.ceil(tools.length / 2)
  const row1 = tools.slice(0, mid)
  const row2 = tools.slice(mid)

  return (
    <section
      id="tools"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden bg-black"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/3 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="section-label text-purple-400/70 mb-4 block">
            <span className="section-label-dot bg-purple-500" />
            {t('tools.sectionLabel')}
          </span>
          <h2 className="section-title text-foreground mb-4">
            {t('tools.title')}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            {t('tools.subtitle')}
          </p>
        </motion.div>
      </div>

      {isVisible && (
        <div className="relative">
          {/* Edge gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          <div className="space-y-4 sm:space-y-5">
            <ScrollingRow tools={row1} speed={35} reverse={false} />
            <ScrollingRow tools={row2} speed={40} reverse={true} />
          </div>
        </div>
      )}

      {/* Bottom content spacer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-xs text-gray-600"
        >
          {tools.length} outils &mdash; survolez pour mettre en pause
        </motion.p>
      </div>
    </section>
  )
}
