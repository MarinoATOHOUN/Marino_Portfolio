import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { Cpu, Code, Rocket, Users, Quote, ArrowRight, Sparkles, ChevronRight, Terminal, Binary, MapPin, Calendar, Award, Eye, Zap } from 'lucide-react'
import DataCurve from '@/components/effects/DataCurve'
import ProcessDiagram from '@/components/ui/ProcessDiagram'
import profilePicture from '@/assets/marino.png'
import { useTranslation } from 'react-i18next'

const highlightIcons = [Cpu, Code, Rocket, Users]

function GlowOrb({ className }) {
  return (
    <div
      className={`absolute rounded-full blur-[150px] pointer-events-none ${className}`}
      style={{ backgroundColor: 'rgba(59,130,246,0.07)' }}
    />
  )
}

function AnimatedNumber({ value, isVisible }) {
  const [count, setCount] = useState(0)
  const num = value.replace('+', '')
  const suffix = value.includes('+') ? '+' : ''

  return (
    <motion.span
      onViewportEnter={() => {
        if (!count) {
          const target = parseInt(num)
          let current = 0
          const interval = setInterval(() => {
            current += Math.ceil(target / 30)
            if (current >= target) {
              current = target
              clearInterval(interval)
            }
            setCount(current)
          }, 50)
        }
      }}
      className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-blue-300"
    >
      {count}{suffix}
    </motion.span>
  )
}

function StatCard({ stat, i, isVisible }) {
  const icons = [Award, Code, Rocket, Users]
  const Icon = icons[i]
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative group"
    >
      <div className="absolute -inset-2 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
      <div className="relative p-4 sm:p-5 rounded-xl border border-white/[0.04] bg-white/[0.015] backdrop-blur-sm">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/5 flex items-center justify-center shrink-0">
            <Icon className="w-4 h-4 text-blue-400" />
          </div>
          <div className="min-w-0">
            <AnimatedNumber value={stat.value} isVisible={isVisible} />
            <div className="text-[10px] sm:text-[11px] text-gray-600 font-medium tracking-wide mt-0.5">
              {stat.label}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function StoryBlock({ text, index, isVisible, total, type }) {
  const variants = {
    hidden: { opacity: 0, x: index % 2 === 0 ? -20 : 20, y: 20 },
    visible: { opacity: 1, x: 0, y: 0 },
  }

  if (type === 'hero') {
    return (
      <motion.div
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={variants}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <div className="flex items-start gap-4">
          <div className="hidden sm:flex flex-col items-center gap-1 pt-1">
            <div className="w-2 h-2 rounded-full bg-blue-500/40 ring-2 ring-blue-500/10" />
            <div className="w-[1px] h-16 bg-gradient-to-b from-blue-500/30 to-transparent" />
          </div>
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/8 border border-blue-500/15 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-[10px] font-medium text-blue-400/80 uppercase tracking-wider">01 · Introduction</span>
            </div>
            <p className="text-lg sm:text-xl text-muted-foreground/80 font-medium leading-relaxed">
              <span className="text-blue-400/50 font-mono text-sm">{'<'}</span>
              {' '}{text}{' '}
              <span className="text-blue-400/50 font-mono text-sm">{'/>'}</span>
            </p>
          </div>
        </div>
      </motion.div>
    )
  }

  if (type === 'ai') {
    return (
      <motion.div
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={variants}
        transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <div className="flex items-start gap-4">
          <div className="hidden sm:flex flex-col items-center gap-1 pt-1">
            <div className="w-2 h-2 rounded-full bg-emerald-500/40 ring-2 ring-emerald-500/10" />
            <div className="w-[1px] h-16 bg-gradient-to-b from-emerald-500/30 to-transparent" />
          </div>
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/8 border border-emerald-500/15 mb-3">
              <Terminal size={10} className="text-emerald-400" />
              <span className="text-[10px] font-medium text-emerald-400/80 uppercase tracking-wider">04 · Augmented Development</span>
            </div>
            <div className="p-4 sm:p-5 rounded-xl border border-emerald-500/10 bg-gradient-to-br from-emerald-500/[0.03] to-blue-500/[0.02] group hover:border-emerald-500/20 transition-all duration-300">
              <div className="flex items-start gap-3">
                <Terminal size={16} className="text-emerald-400/60 mt-0.5 shrink-0" />
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <div className="flex items-start gap-4">
        <div className="hidden sm:flex flex-col items-center gap-1 pt-1">
          <div className="w-2 h-2 rounded-full bg-blue-500/20 ring-2 ring-blue-500/5 group-hover:bg-blue-500/40 group-hover:ring-blue-500/15 transition-all duration-300" />
          <div className="w-[1px] h-full bg-gradient-to-b from-blue-500/10 to-transparent" />
        </div>
        <div className="flex-1 group">
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
            {text}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function PhotoReveal({ isVisible }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-24"
    >
      <div className="group relative max-w-[380px] mx-auto">
        {/* Decorative rings */}
        <div className="absolute -inset-8 bg-gradient-to-b from-blue-500/10 via-transparent to-purple-500/10 rounded-[32px] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="absolute -inset-4 rounded-[28px] border border-blue-500/5 group-hover:border-blue-500/15 transition-all duration-500" />

        {/* Main frame */}
        <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] group-hover:border-blue-500/25 transition-all duration-500">
          {/* Scan line overlay */}
          <div className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <motion.div
              className="absolute left-0 right-0 h-[1px]"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)',
                boxShadow: '0 0 10px rgba(59,130,246,0.15)',
              }}
              animate={{ top: ['-5%', '105%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          <div className="aspect-[4/5] overflow-hidden bg-gradient-to-br from-gray-900 to-black">
            <img
              src={profilePicture}
              loading="lazy"
              decoding="async"
              alt="Mahouli Marino ATOHOUN"
              className="w-full h-full object-cover object-top scale-100 group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            />
          </div>

          {/* Gradient bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="absolute bottom-4 left-4 right-4 flex items-center justify-between"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/[0.06]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-[10px] font-medium text-emerald-400/80">Disponible</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/[0.06]">
              <MapPin size={10} className="text-gray-500" />
              <span className="text-[10px] text-gray-400">Cotonou, Bénin</span>
            </div>
          </motion.div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/0 group-hover:border-blue-500/30 rounded-tl transition-all duration-500 pointer-events-none" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500/0 group-hover:border-blue-500/30 rounded-tr transition-all duration-500 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-500/0 group-hover:border-blue-500/30 rounded-bl transition-all duration-500 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/0 group-hover:border-blue-500/30 rounded-br transition-all duration-500 pointer-events-none" />
      </div>
    </motion.div>
  )
}

function HolographicGrid() {
  return (
    <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
      }}
    />
  )
}

export default function About() {
  const { t } = useTranslation()
  const [ref, isVisible] = useScrollAnimation()

  const rawHighlights = t('about.highlights', { returnObjects: true })
  const highlights = rawHighlights.map((h, i) => ({
    ...h,
    icon: highlightIcons[i],
    desc: h.desc || h.description,
  }))
  const journey = t('about.journey', { returnObjects: true })
  const paragraphs = t('about.paragraphs', { returnObjects: true })

  const stats = [
    { value: '3+', label: 'Années d\'expérience' },
    { value: '15+', label: 'Projets livrés' },
    { value: '4', label: 'Produits fondés' },
    { value: '100+', label: 'Étudiants formés' },
  ]

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden bg-black"
    >
      <GlowOrb className="top-1/4 -left-32 w-[500px] h-[500px]" />
      <GlowOrb className="bottom-1/3 -right-32 w-[400px] h-[400px]" />
      <HolographicGrid />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/2 to-transparent pointer-events-none" />
      <DataCurve />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="section-label text-blue-400/70 mb-4 block">
            <span className="section-label-dot bg-blue-500" />
            {t('about.sectionLabel')}
          </span>
          <h2 className="section-title text-foreground mb-4">
            {t('about.title')}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-balance">
            {t('about.subtitle')}
          </p>
        </motion.div>

        {/* Photo + Story + Stats */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-20 sm:mb-28">
          {/* Photo - left */}
          <div className="lg:col-span-5">
            <PhotoReveal isVisible={isVisible} />
          </div>

          {/* Content - right */}
          <div className="lg:col-span-7 space-y-8">
            {/* Story blocks with timeline connector */}
            <div className="space-y-6">
              {paragraphs.map((p, idx) => {
                if (idx === 0) {
                  return <StoryBlock key={idx} text={p} index={idx} isVisible={isVisible} type="hero" />
                }
                if (idx === paragraphs.length - 1) {
                  return <StoryBlock key={idx} text={p} index={idx} isVisible={isVisible} type="ai" />
                }
                return <StoryBlock key={idx} text={p} index={idx} isVisible={isVisible} total={paragraphs.length} />
              })}
            </div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isVisible ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="origin-left"
            >
              <div className="flex items-center gap-3">
                <span className="h-px flex-1 bg-gradient-to-r from-blue-500/20 to-transparent" />
                <Sparkles size={12} className="text-blue-400/30" />
                <span className="text-[10px] font-semibold text-blue-400/50 tracking-widest uppercase">Mesures</span>
                <Sparkles size={12} className="text-blue-400/30" />
                <span className="h-px flex-1 bg-gradient-to-l from-blue-500/20 to-transparent" />
              </div>
            </motion.div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {stats.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} i={i} isVisible={isVisible} />
              ))}
            </div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isVisible ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="origin-left"
            >
              <div className="flex items-center gap-3">
                <span className="h-px flex-1 bg-gradient-to-r from-blue-500/20 to-transparent" />
                <Sparkles size={12} className="text-blue-400/30" />
                <span className="text-[10px] font-semibold text-blue-400/50 tracking-widest uppercase">Domaines</span>
                <Sparkles size={12} className="text-blue-400/30" />
                <span className="h-px flex-1 bg-gradient-to-l from-blue-500/20 to-transparent" />
              </div>
            </motion.div>

            {/* Highlights grid */}
            <div className="grid sm:grid-cols-2 gap-3">
              {highlights.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.65 + i * 0.08 }}
                    className="group relative"
                  >
                    <div className="relative p-4 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:border-blue-500/15 hover:bg-blue-500/[0.02] transition-all duration-300 h-full">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/5 flex items-center justify-center shrink-0 group-hover:from-blue-500/20 group-hover:to-blue-600/10 transition-all duration-300">
                          <Icon className="w-4 h-4 text-blue-400" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-xs font-semibold text-foreground mb-0.5 group-hover:text-blue-300 transition-colors duration-300">
                            {item.label}
                          </h3>
                          <p className="text-[11px] text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Journey Timeline */}
        <ProcessDiagram
          items={journey}
          title={t('about.journeyTitle')}
          detailLabel={t('about.detailLabel')}
        />
      </div>
    </section>
  )
}
