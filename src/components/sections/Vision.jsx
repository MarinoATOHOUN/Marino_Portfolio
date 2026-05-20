import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { Globe, Cpu, Lightbulb, Heart, Quote, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const pillarIcons = [Cpu, Globe, Lightbulb, Heart]

export default function Vision() {
  const { t } = useTranslation()
  const [ref, isVisible] = useScrollAnimation()

  const rawPillars = t('vision.pillars', { returnObjects: true })
  const pillars = rawPillars.map((p, i) => ({
    ...p,
    icon: pillarIcons[i],
    desc: p.desc || p.description,
  }))

  return (
    <section
      id="vision"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden bg-black"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl aspect-square bg-blue-500/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="section-label text-blue-400/70 mb-4 block">
            <span className="section-label-dot bg-blue-500" />
            {t('vision.sectionLabel')}
          </span>
          <h2 className="section-title text-white mb-4">
            {t('vision.title')}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            {t('vision.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto mb-16 sm:mb-20 text-center"
        >
          <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500/20 mx-auto mb-6" />
          <blockquote className="text-2xl sm:text-3xl lg:text-4xl text-gray-300 font-light leading-relaxed text-balance">
            {t('vision.quote')}
          </blockquote>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 max-w-5xl mx-auto">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative p-6 sm:p-7 rounded-xl card-elevated overflow-hidden"
              >
                <div className="relative z-10">
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400 mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2.5">{pillar.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{pillar.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="text-center mt-16 sm:mt-20"
        >
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto mb-6">
            {t('vision.ctaText')}
          </p>
          <a
            href="mailto:marinoatohoun@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 font-medium rounded-xl border border-blue-500/20 hover:border-blue-500/30 transition-all duration-200 text-sm"
          >
            {t('vision.ctaButton')}
            <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
