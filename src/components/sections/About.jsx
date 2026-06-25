import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { Cpu, Code, Rocket, Users } from 'lucide-react'
import { ScanOverlay } from '@/components/effects/ScanLines'
import DataCurve from '@/components/effects/DataCurve'
import ProcessDiagram from '@/components/ui/ProcessDiagram'
import profilePicture from '@/assets/profile_picture.jpg'
import { useTranslation } from 'react-i18next'

const highlightIcons = [Cpu, Code, Rocket, Users]

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

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden bg-black"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/3 to-transparent pointer-events-none" />
      <DataCurve />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left - Narrative (3 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3"
          >
            <div className="space-y-5 text-gray-400 leading-relaxed text-[15px] sm:text-base">
              {paragraphs.map((p, idx) => (
                <p key={idx} className={
                  idx === 0
                    ? 'text-lg text-muted-foreground/80 font-medium leading-relaxed'
                    : idx === paragraphs.length - 1
                      ? 'text-muted-foreground/80 font-medium pt-2'
                      : ''
                }>
                  {p}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Right - Photo + Highlights + Journey (2 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 space-y-6 sm:space-y-8"
          >
            {/* Profile photo with premium frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group relative w-full max-w-[320px] mx-auto"
            >
              {/* Glow behind */}
              <div className="absolute -inset-4 bg-gradient-to-b from-blue-500/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Frame */}
              <div className="relative rounded-xl overflow-hidden border group-hover:border-blue-500/30 transition-all duration-500" style={{ borderColor: 'var(--theme-border-01)' }}>
                {/* Scan line on hover */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                  <motion.div
                    className="absolute left-0 right-0 h-[1px]"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent)',
                      boxShadow: '0 0 12px rgba(59,130,246,0.2)',
                    }}
                    animate={{ top: ['-5%', '105%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                  />
                </div>

                {/* Image */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={profilePicture}
                    alt={t('about.imageAlt')}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Bottom gradient overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              </div>

              {/* Corner accents */}
              <div className="absolute -top-[1px] -left-[1px] w-8 h-8 border-t-2 border-l-2 border-blue-500/0 group-hover:border-blue-500/40 rounded-tl-xl transition-all duration-500 pointer-events-none" />
              <div className="absolute -top-[1px] -right-[1px] w-8 h-8 border-t-2 border-r-2 border-blue-500/0 group-hover:border-blue-500/40 rounded-tr-xl transition-all duration-500 pointer-events-none" />
              <div className="absolute -bottom-[1px] -left-[1px] w-8 h-8 border-b-2 border-l-2 border-blue-500/0 group-hover:border-blue-500/40 rounded-bl-xl transition-all duration-500 pointer-events-none" />
              <div className="absolute -bottom-[1px] -right-[1px] w-8 h-8 border-b-2 border-r-2 border-blue-500/0 group-hover:border-blue-500/40 rounded-br-xl transition-all duration-500 pointer-events-none" />
            </motion.div>

            {/* Highlights */}
            <ScanOverlay active={isVisible}>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {highlights.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.35 + i * 0.08 }}
                    className="group p-4 sm:p-5 rounded-xl card-elevated"
                  >
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 mb-2.5" />
                    <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-1">{item.label}</h3>
                    <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </ScanOverlay>

          </motion.div>
        </div>

        {/* Full-width Process Diagram */}
        <ProcessDiagram
          items={journey}
          title={t('about.journeyTitle')}
          detailLabel={t('about.detailLabel')}
        />
      </div>
    </section>
  )
}
