import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'

export default function Navbar({ activeSection, onNavClick }) {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = [
    { id: 'hero', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'expertise', label: t('nav.expertise') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'experience', label: t('nav.experience') },
    { id: 'certifications', label: t('nav.certifications') },
    { id: 'vision', label: t('nav.vision') },
    { id: 'contact', label: t('nav.contact') },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#060608]/80 backdrop-blur-xl border-b border-white/[0.04]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <button
            onClick={() => onNavClick('hero')}
            className="text-xl font-bold tracking-tight"
          >
<span className="text-white/90">MA</span><span className="text-blue-400">.</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavClick(item.id)}
                className={`relative px-3.5 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                  activeSection === item.id
                    ? 'text-white'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-white/[0.06] rounded-lg"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
            <div className="ml-2 pl-2 border-l border-white/[0.06]">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile toggle + language */}
          <div className="flex items-center gap-1 md:hidden">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-gray-500 hover:text-white transition-colors"
              aria-label={t('nav.menuAriaLabel')}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/[0.04] bg-[#060608]/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-3 space-y-0.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavClick(item.id)
                    setMobileOpen(false)
                  }}
                  className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'text-white bg-white/[0.06]'
                      : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.03]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
