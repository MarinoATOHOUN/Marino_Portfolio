import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { ExternalLink, Github, ChevronRight, Sparkles } from 'lucide-react'
import { CardHoverGlow, ScanOverlay } from '@/components/effects/ScanLines'
import { useTranslation } from 'react-i18next'
import { useLocalizedData } from '@/hooks/useLocalizedData'

export default function Projects() {
  const { t } = useTranslation()
  const [ref, isVisible] = useScrollAnimation()
  const [activeFilter, setActiveFilter] = useState('all')
  const [expandedId, setExpandedId] = useState(null)

  const { projects, techProjects } = useLocalizedData()
  const filtersConfig = t('projects.filters', { returnObjects: true })
  const labels = t('projects.expandedLabels', { returnObjects: true })
  const filterKeys = Object.keys(filtersConfig)

  const filtered = projects.filter(
    (p) => activeFilter === 'all' || p.category === activeFilter
  )

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden bg-black"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/3 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="section-label text-blue-400/70 mb-4 block">
            <span className="section-label-dot bg-blue-500" />
            {t('projects.sectionLabel')}
          </span>
          <h2 className="section-title text-foreground mb-4">
            {t('projects.title')}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex items-center justify-center gap-2 mb-10 sm:mb-12"
        >
          {filterKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeFilter === key
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  : 'text-gray-500 hover:text-muted-foreground/80 border border-transparent'
              }`}
            >
              {filtersConfig[key]}
            </button>
          ))}
        </motion.div>

        {/* Main projects */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <ScanOverlay active={isVisible}>
              {filtered.map((project, i) => {
                const isOpen = expandedId === project.id
                return (
                  <CardHoverGlow key={project.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={isVisible ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }}
                      className={`rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                        isOpen
                          ? 'border-blue-500/25 bg-blue-500/[0.03]'
                          : 'card-elevated'
                      }`}
                      onClick={() => setExpandedId(isOpen ? null : project.id)}
                    >
                      <div className="p-5 sm:p-7">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2.5 mb-1.5">
                              <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                                {project.title}
                              </h3>
                              {project.category === 'flagship' && (
                                <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 rounded-md border border-blue-500/20">
                                  <Sparkles size={10} />
                                  {t('projects.featuredBadge')}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-blue-400/70 font-medium mb-2">{project.tagline}</p>
                            <p className="text-sm text-gray-500 leading-relaxed">
                              {isOpen && project.fullDescription
                                ? project.fullDescription
                                : project.description}
                            </p>
                          </div>
                          <ChevronRight
                            size={16}
                            className={`text-gray-600 mt-1.5 shrink-0 transition-transform duration-200 ${
                              isOpen ? 'rotate-90' : ''
                            }`}
                          />
                        </div>

                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {(isOpen ? project.stack : project.stack.slice(0, 5)).map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 text-xs font-medium text-gray-500 rounded-md border" style={{ backgroundColor: 'var(--theme-bg-004)', borderColor: 'var(--theme-border-006)' }}
                            >
                              {tech}
                            </span>
                          ))}
                          {!isOpen && project.stack.length > 5 && (
                            <span className="px-2.5 py-1 text-xs text-gray-600">
                              +{project.stack.length - 5}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Expanded content */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 sm:px-7 pb-6 sm:pb-7 border-t" style={{ borderColor: 'var(--theme-border-005)' }}>
                              <div className="grid sm:grid-cols-2 gap-6 pt-5">
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/90 mb-1">{labels.problem}</h4>
                                    <p className="text-sm text-gray-400">{project.problem}</p>
                                  </div>
                                  <div>
                                    <h4 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/90 mb-1">{labels.solution}</h4>
                                    <p className="text-sm text-gray-400">{project.solution}</p>
                                  </div>
                                  <div>
                                    <h4 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/90 mb-1">{labels.impact}</h4>
                                    <p className="text-sm text-gray-400">{project.impact}</p>
                                  </div>
                                </div>
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/90 mb-1">{labels.myRole}</h4>
                                    <p className="text-sm text-muted-foreground/80">{project.role}</p>
                                  </div>
                                  <div>
                                    <h4 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/90 mb-1">{labels.vision}</h4>
                                    <p className="text-sm text-gray-500 italic">"{project.vision}"</p>
                                  </div>
                                  <div className="flex items-center gap-3 pt-1">
                                    {project.links.github && (
                                      <a
                                        href={project.links.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                                      >
                                        <Github size={13} />
                                        {labels.source}
                                      </a>
                                    )}
                                  </div>
                                  {project.metrics && (
                                    <div className="grid grid-cols-3 gap-2 pt-1">
                                      {project.metrics.map((m) => (
                                        <div key={m.label} className="text-center p-2.5 rounded-lg border" style={{ backgroundColor: 'var(--theme-bg-003)', borderColor: 'var(--theme-border-005)' }}>
                                          <div className="text-xs font-semibold text-foreground">{m.value}</div>
                                          <div className="text-[10px] text-muted-foreground/90 mt-0.5">{m.label}</div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </CardHoverGlow>
                )
              })}
            </ScanOverlay>
          </motion.div>
        </AnimatePresence>

        {/* Tech projects */}
        {activeFilter !== 'flagship' && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-center mt-16 sm:mt-20 mb-8"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                {t('projects.moreTitle')}
              </h3>
              <p className="text-sm text-gray-500 mt-2">{t('projects.moreSubtitle')}</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {techProjects.map((p, i) => (
                <motion.a
                  key={p.title}
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.45 + i * 0.04 }}
                  className="group p-5 rounded-xl card-elevated"
                >
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <h4 className="text-sm font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                      {p.title}
                    </h4>
                    <ExternalLink size={12} className="text-gray-600 mt-0.5 shrink-0" />
                  </div>
                  <p className="text-xs text-gray-500 mb-3 leading-relaxed line-clamp-2">{p.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {p.stack.map((tech) => (
                      <span key={tech} className="px-2 py-0.5 text-[10px] font-medium text-muted-foreground/90 rounded" style={{ backgroundColor: 'var(--theme-bg-004)' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.a>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
