import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { Music, Film, Dumbbell, Plane, Headphones, Camera, Gamepad, Book } from 'lucide-react'
import { CardHoverGlow } from '@/components/effects/ScanLines'
import { useTranslation } from 'react-i18next'

const iconMap = {
  music: Music,
  film: Film,
  sport: Dumbbell,
  travel: Plane,
  headphones: Headphones,
  camera: Camera,
  gamepad: Gamepad,
  book: Book,
}

export default function Hobbies() {
  const { t } = useTranslation()
  const [ref, isVisible] = useScrollAnimation()
  const hobbies = t('hobbies.list', { returnObjects: true })

  return (
    <section
      id="hobbies"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden bg-black"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/3 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="section-label text-pink-400/70 mb-4 block">
            <span className="section-label-dot bg-pink-500" />
            {t('hobbies.sectionLabel')}
          </span>
          <h2 className="section-title text-foreground mb-4">
            {t('hobbies.title')}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            {t('hobbies.subtitle')}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {hobbies.map((hobby, i) => {
            const Icon = iconMap[hobby.icon] || Music
            return (
              <CardHoverGlow key={hobby.name}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
                  className="relative p-6 sm:p-8 rounded-xl card-elevated text-center"
                  style={{ minWidth: 140 }}
                >
                  <div className="w-14 h-14 rounded-full bg-pink-500/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-7 h-7 text-pink-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{hobby.name}</h3>
                </motion.div>
              </CardHoverGlow>
            )
          })}
        </div>
      </div>
    </section>
  )
}
