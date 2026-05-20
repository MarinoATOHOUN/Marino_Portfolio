import { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { Mail, Github, Linkedin, MapPin, Send, ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Contact() {
  const { t } = useTranslation()
  const [ref, isVisible] = useScrollAnimation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Message de ${name} depuis votre portfolio`)
    const body = encodeURIComponent(
      `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )
    window.location.href = `mailto:marinoatohoun@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden bg-black"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/3 to-black pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="section-label text-blue-400/70 mb-4 block">
            <span className="section-label-dot bg-blue-500" />
            {t('contact.sectionLabel')}
          </span>
          <h2 className="section-title text-foreground mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 sm:space-y-8"
          >
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{t('contact.heading')}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {t('contact.description')}
              </p>
            </div>

            <div className="space-y-4">
              {t('contact.info', { returnObjects: true }).map((item, i) => {
                const infoIcons = [Mail, MapPin]
                const Icon = infoIcons[i]
                const href = i === 0 ? `mailto:${item.value}` : null
                return (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">{item.label}</p>
                      {href ? (
                        <a href={href} className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm text-gray-400">{item.value}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div>
              <p className="text-xs text-gray-600 mb-3">{t('contact.socialHeading')}</p>
              <div className="flex gap-2">
                {[
                  { icon: Github, href: 'https://github.com/MarinoATOHOUN', key: 'github' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/marino-atohoun', key: 'linkedin' },
                ].map(({ icon: Icon, href, key }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-4 py-2.5 rounded-lg card-elevated text-sm text-gray-500 hover:text-blue-400"
                  >
                    <Icon size={15} />
                    {t(`contact.socialLinks.${key}`)}
                    <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 sm:p-7 rounded-xl card-elevated"
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">{t('contact.form.nameLabel')}</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder={t('contact.form.namePlaceholder')}
                  className="w-full px-4 py-2.5 text-sm rounded-lg text-muted-foreground/80 placeholder-gray-700 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all border" style={{ backgroundColor: 'var(--theme-bg-004)', borderColor: 'var(--theme-border-01)' }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">{t('contact.form.emailLabel')}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder={t('contact.form.emailPlaceholder')}
                  className="w-full px-4 py-2.5 text-sm rounded-lg text-muted-foreground/80 placeholder-gray-700 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all border" style={{ backgroundColor: 'var(--theme-bg-004)', borderColor: 'var(--theme-border-01)' }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">{t('contact.form.messageLabel')}</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder={t('contact.form.messagePlaceholder')}
                  className="w-full px-4 py-2.5 text-sm rounded-lg text-muted-foreground/80 placeholder-gray-700 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all border resize-none" style={{ backgroundColor: 'var(--theme-bg-004)', borderColor: 'var(--theme-border-01)' }}
                />
              </div>
              <button
                type="submit"
                className="group w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg transition-all duration-200 text-sm hover:opacity-90"
              >
                <Send size={13} />
                {t('contact.form.submitButton')}
              </button>
              <p className="text-[11px] text-muted-foreground/70 text-center">
                {t('contact.form.directEmail')}{' '}
                <a href="mailto:marinoatohoun@gmail.com" className="text-blue-500/60 hover:text-blue-400">
                  marinoatohoun@gmail.com
                </a>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
