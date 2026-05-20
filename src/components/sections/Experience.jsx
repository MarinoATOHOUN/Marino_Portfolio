import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { MapPin, ExternalLink, Award, Calendar } from 'lucide-react'
import { ScanLine } from '@/components/effects/ScanLines'
import { useTranslation } from 'react-i18next'
import { useLocalizedData } from '@/hooks/useLocalizedData'

export default function Experience() {
  const { t } = useTranslation()
  const [ref, isVisible] = useScrollAnimation()
  const { experiences } = useLocalizedData()

  return (
    <section
      id="experience"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden bg-black"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/3 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="section-label text-blue-400/70 mb-4 block">
            <span className="section-label-dot bg-blue-500" />
            {t('experience.sectionLabel')}
          </span>
          <h2 className="section-title text-foreground mb-4">
            {t('experience.title')}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            {t('experience.subtitle')}
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/30 to-transparent pointer-events-none" />

          <div className="space-y-6 sm:space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-14 sm:pl-16"
              >
                <div className="absolute left-[11px] top-1.5 w-[17px] h-[17px] rounded-full border-2 border-blue-500/40 bg-black z-10" />

                <div className="group relative p-5 sm:p-7 rounded-xl card-elevated overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ScanLine />
                  </div>

                  <div className="relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-foreground">{exp.role}</h3>
                        {exp.companyUrl ? (
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-blue-400/80 hover:text-blue-400 transition-colors mt-0.5"
                          >
                            {exp.company}
                            <ExternalLink size={11} />
                          </a>
                        ) : (
                          <p className="text-sm text-blue-400/70 mt-0.5">{exp.company}</p>
                        )}
                      </div>
                      <span className="inline-flex items-center gap-1.5 self-start px-3 py-1 text-xs font-medium text-blue-400/70 bg-blue-500/5 rounded-lg border border-blue-500/10 shrink-0">
                        <Calendar size={11} />
                        {exp.period}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 mb-3.5">
                      <MapPin size={11} className="text-muted-foreground/90" />
                      <span className="text-xs text-muted-foreground/90">{exp.location}</span>
                    </div>

                    <ul className="space-y-2 mb-4">
                      {exp.description.map((item, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm text-gray-400">
                          <span className="w-1 h-1 rounded-full bg-blue-500/50 mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap items-center gap-3 pt-3.5 border-t" style={{ borderColor: 'var(--theme-border-005)' }}>
                      <div className="flex items-center gap-1.5">
                        <Award size={12} className="text-blue-400/70" />
                        <span className="text-xs text-muted-foreground/90">{t('experience.impactLabel')}</span>
                        <span className="text-xs text-muted-foreground/80 font-medium">{exp.impact}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-[11px] font-medium text-gray-500 rounded-md border" style={{ backgroundColor: 'var(--theme-bg-004)', borderColor: 'var(--theme-border-006)' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
