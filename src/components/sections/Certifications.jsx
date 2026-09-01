import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { ExternalLink, Award, X, ScrollText } from 'lucide-react'
import { CardHoverGlow, ScanOverlay } from '@/components/effects/ScanLines'
import { useTranslation } from 'react-i18next'

const accent = {
  LinkedIn: { chip: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  Sololearn: { chip: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' },
  FreeCodeCamp: { chip: 'text-green-400 bg-green-500/10 border-green-500/20' },
  OpenClassrooms: { chip: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
  DataCamp: { chip: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  'Microsoft et LinkedIn': { chip: 'text-sky-400 bg-sky-500/10 border-sky-500/20' },
}
const fallbackAccent = { chip: 'text-gray-400 bg-gray-500/10 border-gray-500/20' }

function CertificatePreview({ cert }) {
  return (
    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
      <img
        src={cert.image}
        alt={cert.title}
        loading="lazy"
        className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,rgba(255,255,255,0.04),transparent_60%)]" />
    </div>
  )
}

function NoPreviewPanel({ cert }) {
  return (
    <div className="relative flex aspect-[3/2] w-full flex-col items-center justify-center gap-2 rounded-lg border border-white/5 bg-gradient-to-br from-zinc-900 to-black">
      <Award size={26} className="text-gray-600" />
      <span className="px-3 text-center text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-500">
        {cert.issuer}
      </span>
    </div>
  )
}

export default function Certifications() {
  const { t } = useTranslation()
  const [ref, isVisible] = useScrollAnimation()
  const [selected, setSelected] = useState(null)

  const certifications = t('certifications.list', { returnObjects: true })

  useEffect(() => {
    if (!selected) return
    const onKey = (e) => e.key === 'Escape' && setSelected(null)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [selected])

  const selectedAccent = selected ? accent[selected.issuer] || fallbackAccent : fallbackAccent

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
            {certifications.map((cert, i) => {
              const a = accent[cert.issuer] || fallbackAccent
              const clickable = !!cert.image
              return (
                <CardHoverGlow key={i}>
                  <motion.button
                    type="button"
                    onClick={() => clickable && setSelected(cert)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.04 }}
                    className={`group block w-full text-left rounded-xl card-elevated overflow-hidden ${!clickable ? 'cursor-default' : ''}`}
                  >
                    {cert.image ? (
                      <CertificatePreview cert={cert} />
                    ) : (
                      <NoPreviewPanel cert={cert} />
                    )}
                    <div className="flex items-start gap-3 p-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold text-foreground group-hover:text-emerald-400 transition-colors leading-snug">
                          {cert.title}
                        </h3>
                        <div className="flex items-center justify-between gap-2 mt-2">
                          <span className={`px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md border ${a.chip}`}>
                            {cert.issuer}
                          </span>
                          <span className="text-[11px] text-gray-600 shrink-0">{cert.date}</span>
                        </div>
                      </div>
                      {cert.link && (
                        <span className="mt-0.5 shrink-0 flex items-center gap-1 text-[10px] font-medium text-gray-500 group-hover:text-emerald-400 transition-colors">
                          <ScrollText size={12} />
                          {t('certifications.viewCta')}
                        </span>
                      )}
                    </div>
                  </motion.button>
                </CardHoverGlow>
              )
            })}
          </div>
        </ScanOverlay>
      </div>

      <AnimatePresence>
        {selected && selected.image && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelected(null)} />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={selected.title}
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl border border-white/10 bg-zinc-950 p-5 sm:p-7 shadow-2xl"
            >
              <button
                type="button"
                aria-label="Close"
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/40 text-gray-400 hover:text-white hover:border-white/20 transition-colors"
              >
                <X size={15} />
              </button>

              <div className="mb-4 max-w-xs">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-emerald-400/70 mb-1">
                  {t('certifications.sectionLabel')}
                </p>
                <h3 className="text-lg font-semibold text-white leading-snug">
                  {selected.title}
                </h3>
              </div>

              <div className="overflow-hidden rounded-lg border border-white/10 bg-black/50">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="mx-auto max-h-[58vh] w-auto object-contain p-2"
                />
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-md border ${selectedAccent.chip}`}>
                    {selected.issuer}
                  </span>
                  <span className="text-xs text-gray-500">{selected.date}</span>
                </div>
                {selected.link && (
                  <a
                    href={selected.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/25 px-4 py-2 text-sm font-medium text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                  >
                    <ExternalLink size={14} />
                    {t('certifications.viewCta')}
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}