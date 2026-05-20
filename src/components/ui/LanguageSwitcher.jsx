import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'

const languages = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
]

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0]

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const switchLang = (code) => {
    i18n.changeLanguage(code)
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold tracking-wider rounded-lg text-gray-500 hover:text-gray-300 transition-colors"
        aria-label={t('nav.switchLanguage')}
      >
        <Globe size={13} />
        <span>{currentLang.label}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-full mt-1.5 min-w-[130px] overflow-hidden rounded-lg border border-white/[0.06] bg-[#060608]/95 backdrop-blur-xl shadow-xl"
          >
            {languages.map((lang, i) => (
              <button
                key={lang.code}
                onClick={() => switchLang(lang.code)}
                className={`flex w-full items-center gap-2.5 px-3.5 py-2 text-xs font-medium transition-colors ${
                  lang.code === i18n.language
                    ? 'text-white bg-white/[0.06]'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.03]'
                } ${i > 0 ? 'border-t border-white/[0.04]' : ''}`}
              >
                <span
                  className={`text-sm ${
                    lang.code === i18n.language ? 'text-blue-400' : 'text-gray-600'
                  }`}
                >
                  {lang.label}
                </span>
                <span className="text-gray-500">{t(`languages.${lang.code}`)}</span>
                {lang.code === i18n.language && (
                  <span className="ml-auto w-1 h-1 rounded-full bg-blue-400" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
