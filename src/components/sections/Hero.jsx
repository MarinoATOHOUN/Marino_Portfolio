import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, MapPin, ExternalLink, Terminal, Cpu, Database, Layers, Zap, BrainCircuit, MessageCircle, Phone } from 'lucide-react'
import NeuralNetwork from '@/components/canvas/NeuralNetwork'
import TypeWriter from '@/components/effects/TypeWriter'
import { DataFlow } from '@/components/effects/DataFlow'
import { useTranslation } from 'react-i18next'

const stagger = {
  initial: {},
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
}

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

function HeroTerminal() {
  const [phase, setPhase] = useState(0)
  const [cursor, setCursor] = useState(true)
  const metricsRef = useRef({ loss: 4.82, acc: 0.12, val_loss: 5.01, val_acc: 0.09, ppl: 12450 })
  const epochRef = useRef(-1)
  const [epochMetrics, setEpochMetrics] = useState([])

  const totalEpochs = 8

  useEffect(() => {
    const t = setInterval(() => setPhase((p) => Math.min(p + 1, 16)), 1100)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (phase < 8) return
    const epochIndex = phase - 8
    if (epochIndex < totalEpochs && epochIndex > epochRef.current) {
      epochRef.current = epochIndex
      const prev = metricsRef.current
      const m = {
        loss: +(prev.loss - 0.28 - Math.random() * 0.18).toFixed(4),
        acc: +(prev.acc + 0.04 + Math.random() * 0.03).toFixed(4),
        val_loss: +(prev.val_loss - 0.25 - Math.random() * 0.15).toFixed(4),
        val_acc: +(prev.val_acc + 0.035 + Math.random() * 0.035).toFixed(4),
        ppl: +(prev.ppl - 800 - Math.random() * 600).toFixed(1),
      }
      metricsRef.current = m
      setEpochMetrics((prev) => {
        const arr = [...prev]
        arr[epochIndex] = m
        return arr
      })
    }
  }, [phase])

  useEffect(() => {
    const blink = setInterval(() => setCursor((c) => !c), 530)
    return () => clearInterval(blink)
  }, [])

  const lines = [
    { type: 'cmd', content: 'python train.py --model african-gpt-175b --epochs 8 --batch-size 512 --lr 1.2e-4' },
    { type: 'info', content: 'Loading dataset: african_multilingual_corpus_v4...' },
    { type: 'info', content: 'Dataset loaded: 8.7B samples | 142 languages | 4.2T tokens' },
    { type: 'config', label: 'Model Architecture', items: [
      'Parameters: 175,284,301,056',
      'Layers: 96 | Hidden dim: 12,288 | Heads: 96',
      'Vocab size: 256,000 | Context: 8,192 tokens',
      'Precision: bfloat16 | Gradient checkpointing: ON',
    ]},
    { type: 'config', label: 'Training Setup', items: [
      'Optimizer: AdamW (β₁=0.9, β₂=0.95, ε=1e-8)',
      'Scheduler: Cosine decay w/ warmup (2,000 steps)',
      'Weight decay: 0.1 | Gradient clipping: 1.0',
      'Distributed: 512× H100 80GB | Parallelism: TP+PP+DP',
    ]},
    { type: 'info', content: 'Initializing distributed training on 512 GPUs...' },
    { type: 'info', content: 'Hardware ready — beginning training loop' },
    { type: 'divider' },
    ...Array.from({ length: totalEpochs }, (_, i) => ({
      type: 'epoch',
      epoch: i + 1,
    })),
    { type: 'divider' },
    { type: 'result' },
    { type: 'cmd', content: 'system.ready — african-gpt-175b trained | awaiting deployment' },
  ]

  const isComplete = phase >= lines.length

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-4xl mx-auto mb-8 sm:mb-12"
    >
      {/* Glow behind terminal */}
      <div className="absolute -inset-8 bg-gradient-to-r from-blue-600/10 via-emerald-500/10 to-purple-600/10 rounded-3xl blur-3xl pointer-events-none" />
      <div className="absolute -inset-4 bg-gradient-to-b from-blue-500/5 via-transparent to-emerald-500/5 rounded-2xl blur-2xl pointer-events-none" />

      <div
        className="relative font-mono text-[10px] sm:text-[11px] md:text-xs leading-relaxed rounded-2xl border overflow-hidden backdrop-blur-sm"
        style={{
          backgroundColor: 'rgba(2, 6, 12, 0.92)',
          borderColor: 'rgba(59, 130, 246, 0.15)',
          boxShadow: '0 0 40px rgba(59,130,246,0.05), 0 0 80px rgba(16,185,129,0.03), inset 0 1px 0 rgba(255,255,255,0.03)',
        }}
      >
        {/* Scan line */}
        <motion.div
          className="absolute left-0 right-0 h-[1px] z-20 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), rgba(16,185,129,0.3), transparent)',
            boxShadow: '0 0 12px rgba(59,130,246,0.1), 0 0 30px rgba(16,185,129,0.05)',
          }}
          animate={{ top: ['-2%', '102%'] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', delay: 1 }}
        />

        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 sm:px-5 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/60" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/60" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/60" />
          <span className="text-muted-foreground/50 ml-2 text-[9px] sm:text-[10px] md:text-[11px] tracking-wider flex items-center gap-1.5 uppercase">
            <Terminal size={11} className="text-blue-400/40" />
            <span className="hidden sm:inline">african-gpt-175b — distributed_training.sh</span>
            <span className="sm:hidden">training.sh</span>
          </span>
          <span className="ml-auto flex items-center gap-1.5 text-[9px] text-muted-foreground/30">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
            </span>
            LIVE
          </span>
        </div>

        {/* Terminal body */}
        <div className="p-4 sm:p-5 md:p-6 space-y-0.5 max-h-[460px] sm:max-h-[500px] overflow-y-auto">
          {lines.map((line, i) => {
            if (i >= phase) return null

            if (line.type === 'cmd') {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-2 py-0.5"
                >
                  <span className="text-emerald-400/60 shrink-0 mt-0.5">$</span>
                  <span className="text-gray-300 break-all">{line.content}</span>
                </motion.div>
              )
            }

            if (line.type === 'config') {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="py-1"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-4 h-[1px] bg-gradient-to-r from-blue-400/40 to-transparent" />
                    <span className="text-[9px] uppercase tracking-[0.15em] text-blue-400/50 font-semibold">{line.label}</span>
                    <span className="flex-1 h-[1px] bg-gradient-to-r from-blue-400/40 to-transparent" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                    {line.items.map((item, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25, delay: j * 0.08 }}
                        className="text-gray-500 flex items-center gap-2 text-[10px] sm:text-[11px]"
                      >
                        <span className="text-blue-400/30 shrink-0">▸</span>
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )
            }

            if (line.type === 'divider') {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-0.5"
                >
                  <div className="h-[1px] bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
                </motion.div>
              )
            }

            if (line.type === 'epoch') {
              const isCurrent = i === phase - 1
              const e = line.epoch
              const m = epochMetrics[e - 1] || metricsRef.current
              const progress = (e / totalEpochs) * 100
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`py-1.5 ${isCurrent ? 'bg-gradient-to-r from-blue-500/[0.04] via-emerald-500/[0.02] to-transparent -mx-4 sm:-mx-5 md:-mx-6 px-4 sm:px-5 md:px-6' : ''}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-semibold ${isCurrent ? 'text-emerald-400' : 'text-gray-500'}`}>
                      Epoch {String(e).padStart(2, '0')}/{totalEpochs}
                    </span>
                    <div className="flex-1 max-w-[120px] h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[10px] sm:text-[11px]">
                    <span className="flex items-center gap-1">
                      <span className="text-gray-600">loss</span>
                      <span className={isCurrent ? 'text-blue-400' : 'text-gray-400'}>{m.loss.toFixed(4)}</span>
                    </span>
                    <span className="text-gray-700">|</span>
                    <span className="flex items-center gap-1">
                      <span className="text-gray-600">acc</span>
                      <span className={isCurrent ? 'text-emerald-400' : 'text-gray-400'}>{m.acc.toFixed(4)}</span>
                    </span>
                    <span className="text-gray-700">|</span>
                    <span className="flex items-center gap-1">
                      <span className="text-gray-600">val_loss</span>
                      <span className={isCurrent ? 'text-orange-400' : 'text-gray-400'}>{m.val_loss.toFixed(4)}</span>
                    </span>
                    <span className="text-gray-700">|</span>
                    <span className="flex items-center gap-1">
                      <span className="text-gray-600">val_acc</span>
                      <span className={isCurrent ? 'text-green-400' : 'text-gray-400'}>{m.val_acc.toFixed(4)}</span>
                    </span>
                    <span className="text-gray-700">|</span>
                    <span className="flex items-center gap-1">
                      <span className="text-gray-600">ppl</span>
                      <span className={isCurrent ? 'text-purple-400' : 'text-gray-400'}>{m.ppl.toFixed(1)}</span>
                    </span>
                    {isCurrent && (
                      <motion.span
                        animate={{ opacity: [1, 0.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                        className="w-1.5 h-3.5 bg-emerald-400/80 inline-block ml-1"
                      />
                    )}
                  </div>
                </motion.div>
              )
            }

            if (line.type === 'result') {
              const last = epochMetrics[totalEpochs - 1]
              if (!last) return null
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="py-2"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <BrainCircuit size={14} className="text-emerald-400/60" />
                    <span className="text-emerald-400/80 font-semibold text-[11px] uppercase tracking-wider">Training Complete</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { label: 'Final Loss', value: last.loss.toFixed(4), color: 'text-blue-400' },
                      { label: 'Final Accuracy', value: `${(last.acc * 100).toFixed(2)}%`, color: 'text-emerald-400' },
                      { label: 'Best Val Loss', value: last.val_loss.toFixed(4), color: 'text-orange-400' },
                      { label: 'Best Val Acc', value: `${(last.val_acc * 100).toFixed(2)}%`, color: 'text-green-400' },
                    ].map((stat, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + j * 0.08 }}
                        className="text-center p-2 rounded-lg"
                        style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.04)' }}
                      >
                        <div className={`text-xs sm:text-sm font-bold ${stat.color}`}>{stat.value}</div>
                        <div className="text-[9px] text-gray-600 mt-0.5">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )
            }

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="py-0.5"
              >
                <span className="text-gray-500 break-all">  {line.content}</span>
              </motion.div>
            )
          })}

          {isComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2 pt-1"
            >
              <span className="text-emerald-400/60 shrink-0">$</span>
              <span className={`inline-block w-2 h-4 bg-emerald-400/80 ${cursor ? 'opacity-100' : 'opacity-0'}`} />
            </motion.div>
          )}
        </div>

        {/* Bottom glow */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-blue-500/5 to-transparent pointer-events-none" />
      </div>
    </motion.div>
  )
}

export default function Hero({ onNavClick }) {
  const { t } = useTranslation()
  const [scrollY, setScrollY] = useState(0)

  const typingRoles = t('hero.typedStrings', { returnObjects: true })
  const stats = t('hero.stats', { returnObjects: true })

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-black"
    >
      <NeuralNetwork scrollFactor={scrollY} />
      <DataFlow />

      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-[1]" />

      {/* Blue glow orbs only */}
      <div className="absolute top-1/5 left-1/4 w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-[150px] animate-pulse-glow pointer-events-none z-[1]" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] animate-pulse-glow pointer-events-none z-[1]" style={{ animationDelay: '2s' }} />

      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none z-[1]" />

      {/* Main content wrapper */}
      <div className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 xl:gap-12 pt-20 px-4 sm:px-6 lg:px-8">

        {/* Profile content - left side on desktop */}
        <div className="w-full lg:w-1/2 xl:w-[45%] flex flex-col items-center lg:items-start text-center lg:text-left pb-12">
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-green-500/15 bg-green-500/5 mb-6 sm:mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          <span className="text-xs sm:text-sm font-medium text-green-400/90">
            {t('hero.status')}
          </span>
        </motion.div>

        <motion.div variants={fadeUp} className="mb-2 sm:mb-3">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-tight leading-[0.85]">
            <span className="text-foreground/90">{t('hero.name')}</span>
            <br />
            <span className="text-gradient-blue">{t('hero.lastName')}</span>
          </h1>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="w-full"
        >
          <motion.div variants={fadeUp} className="h-8 sm:h-10 flex items-center justify-center lg:justify-start mb-4">
            <TypeWriter
              strings={typingRoles}
              className="text-base sm:text-lg md:text-xl text-gray-400 font-medium"
              speed={70}
              deleteSpeed={25}
              pauseAfter={2200}
              pauseBeforeDelete={600}
            />
          </motion.div>

        <motion.p
          variants={fadeUp}
          className="text-base sm:text-lg md:text-xl text-gray-500 max-w-3xl mx-auto mb-2 font-light leading-relaxed"
        >
          {t('hero.tagline')}
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-10"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-14"
        >
          <button
            onClick={() => onNavClick('projects')}
            className="group relative px-7 py-3.5 bg-blue-600 text-white font-semibold rounded-xl transition-all duration-300 overflow-hidden hover:bg-blue-500"
          >
            <span className="relative z-10 flex items-center gap-2">
              {t('hero.exploreWork')}
              <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
            </span>
          </button>

          <button
            onClick={() => onNavClick('contact')}
            className="group px-7 py-3.5 border text-gray-400 hover:text-foreground font-medium rounded-xl transition-all duration-300 hover:border-foreground/20 hover:bg-accent" style={{ borderColor: 'var(--theme-border-01)' }}
          >
            <span className="flex items-center gap-2">
              {t('hero.collaborate')}
              <ExternalLink size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </span>
          </button>

          <a
            href="https://drive.google.com/file/d/1pBYwFen9hsZHiS94CHSvmQso2cDLeLKf/view"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 border text-gray-500 hover:text-muted-foreground/80 font-medium rounded-xl transition-all duration-300 hover:border-foreground/15" style={{ borderColor: 'var(--theme-border-01)' }}
          >
            {t('hero.resume')}
          </a>
        </motion.div>

        <motion.div variants={fadeUp} className="flex items-center justify-center gap-8 sm:gap-12 md:gap-16 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <motion.div
                className="text-xl sm:text-2xl font-bold text-foreground/80"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-xs text-muted-foreground/90 mt-0.5 tracking-wide">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-muted-foreground/90"
        >
          <div className="flex items-center gap-2">
            <MapPin size={13} className="text-blue-500/60" />
            <span>{t('hero.location')}</span>
          </div>
          <div className="hidden sm:block w-px h-3 bg-white/8" />
          <div className="flex items-center gap-2">
            {[
              { icon: Mail, href: 'mailto:marinoatohoun@gmail.com', key: 'email' },
              { icon: Github, href: 'https://github.com/MarinoATOHOUN', key: 'github' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/marino-atohoun', key: 'linkedin' },
              { icon: MessageCircle, href: 'https://wa.me/22959037170', key: 'whatsapp' },
              { icon: Phone, href: 'tel:+2290159037170', key: 'phone' },
            ].map(({ icon: Icon, href, key }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 text-gray-500 hover:text-blue-400 transition-all duration-200 rounded-lg hover:bg-blue-500/5"
                aria-label={t(`hero.socialLinks.${key}`)}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
      </div>

        {/* Terminal - right side on desktop */}
        <div className="w-full lg:w-1/2 xl:w-[55%] flex justify-center lg:justify-start">
          <div className="w-full max-w-2xl xl:max-w-3xl">
            <HeroTerminal />
          </div>
        </div>
      </div>

      <motion.button
        onClick={() => onNavClick('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/90 hover:text-gray-400 transition-colors z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  )
}
