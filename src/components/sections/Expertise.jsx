import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { Brain, Code, Rocket, Target, Cpu, Globe, Cloud } from 'lucide-react'
import { CardHoverGlow } from '@/components/effects/ScanLines'
import { useTranslation } from 'react-i18next'
import { useLocalizedData } from '@/hooks/useLocalizedData'

const iconMap = {
  brain: Brain,
  code: Code,
  rocket: Rocket,
  target: Target,
  cpu: Cpu,
  globe: Globe,
  cloud: Cloud,
}

const expertiseIcons = [Cpu, Globe, Rocket, Cloud]

export default function Expertise() {
  const { t } = useTranslation()
  const [ref, isVisible] = useScrollAnimation()
  const { skillCategories: rawSkillCategories, expertise: rawExpertise } = useLocalizedData()

  const skillCategories = rawSkillCategories.map((cat) => ({
    ...cat,
    icon: iconMap[cat.icon] || Rocket,
    gradient: 'from-blue-500/15 to-blue-500/5',
  }))

  const expertise = rawExpertise.map((item, i) => ({
    ...item,
    icon: expertiseIcons[i],
    desc: item.description,
  }))

  return (
    <section
      id="expertise"
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
            {t('expertise.sectionLabel')}
          </span>
          <h2 className="section-title text-foreground mb-4">
            {t('expertise.title')}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            {t('expertise.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-5 mb-16 sm:mb-24">
          {skillCategories.map((cat, i) => {
            const Icon = cat.icon
            return (
              <CardHoverGlow key={cat.title}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative p-6 sm:p-7 rounded-xl card-elevated overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">{cat.title}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1.5 text-xs font-medium text-gray-400 rounded-lg border" style={{ backgroundColor: 'var(--theme-bg-004)', borderColor: 'var(--theme-border-006)' }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </CardHoverGlow>
            )
          })}
        </div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mb-10"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
              {t('expertise.areasTitle')}
            </h3>
            <p className="text-sm text-gray-500">{t('expertise.areasSubtitle')}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {expertise.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.area}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                  className="group p-5 rounded-xl card-elevated flex items-start gap-4"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4.5 h-4.5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">{item.area}</h4>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
