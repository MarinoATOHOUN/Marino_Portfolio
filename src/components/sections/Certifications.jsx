import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { ExternalLink, Award } from 'lucide-react'
import { CardHoverGlow, ScanOverlay } from '@/components/effects/ScanLines'
import { useTranslation } from 'react-i18next'

export default function Certifications() {
  const { t } = useTranslation()
  const [ref, isVisible] = useScrollAnimation()

  const certifications = t('certifications.list', { returnObjects: true })

  const issuerColors = {
    LinkedIn: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    Sololearn: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
    FreeCodeCamp: 'text-green-400 bg-green-500/10 border-green-500/20',
    OpenClassrooms: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    DataCamp: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    'Microsoft et LinkedIn': 'text-sky-400 bg-sky-500/10 border-sky-500/20',
  }

  return (
    <section
      id="certifications"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden bg-black"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/3 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="section-label text-emerald-400/70 mb-4 block">
            <span className="section-label-dot bg-emerald-500" />
            {t('certifications.sectionLabel')}
          </span>
          <h2 className="section-title text-foreground mb-4">
            {t('certifications.title')}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            {t('certifications.subtitle')}
          </p>
        </motion.div>

        <ScanOverlay active={isVisible}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {certifications.map((cert, i) => (
              <CardHoverGlow key={i}>
                <motion.a
                  href={cert.link || '#'}
                  target={cert.link ? '_blank' : undefined}
                  rel={cert.link ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.04 }}
                  className={`group block p-5 rounded-xl card-elevated ${!cert.link ? 'cursor-default' : ''}`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <Award size={18} className="text-emerald-400/70 mt-0.5 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-foreground group-hover:text-emerald-400 transition-colors leading-snug">
                        {cert.title}
                      </h3>
                    </div>
                    {cert.link && (
                      <ExternalLink size={12} className="text-gray-600 mt-1 shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md border ${
                        issuerColors[cert.issuer] || 'text-gray-400 bg-gray-500/10 border-gray-500/20'
                      }`}
                    >
                      {cert.issuer}
                    </span>
                    <span className="text-[11px] text-gray-600">{cert.date}</span>
                  </div>
                </motion.a>
              </CardHoverGlow>
            ))}
          </div>
        </ScanOverlay>
      </div>
    </section>
  )
}
