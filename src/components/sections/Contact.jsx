import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { Mail, Github, Linkedin, MapPin, Send, MessageCircle, Phone, Sparkles, Terminal, ChevronRight, Heart, ArrowUpRight, Copy, Check, Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const socials = [
  { icon: Github, href: 'https://github.com/MarinoATOHOUN', key: 'github', color: 'hover:border-gray-500/40 hover:text-gray-300' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/marino-atohoun', key: 'linkedin', color: 'hover:border-blue-500/40 hover:text-blue-400' },
  { icon: MessageCircle, href: 'https://wa.me/22959037170', key: 'whatsapp', color: 'hover:border-green-500/40 hover:text-green-400' },
  { icon: Globe, href: 'https://www.marinoatohoun.tech/', key: 'website', color: 'hover:border-purple-500/40 hover:text-purple-400' },
]

function StatusPulse() {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/8 border border-emerald-500/15">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
      </span>
      <span className="text-[11px] font-medium text-emerald-400/80">Disponible</span>
    </div>
  )
}

function TerminalLines() {
  const [lines, setLines] = useState([])
  const [phase, setPhase] = useState(0)

  const script = [
    { type: 'prompt', content: 'connect --target marinoatohoun' },
    { type: 'output', content: 'Scanning availability...', delay: 500 },
    { type: 'output', content: 'Status: ACTIVE | Mode: OPEN_TO_WORK', delay: 800 },
    { type: 'prompt', content: 'send --message "hello"' },
    { type: 'output', content: 'Message channel established.', delay: 600 },
    { type: 'prompt', content: 'get --info contact' },
    { type: 'output', content: 'Email: marinoatohoun@gmail.com', delay: 400 },
    { type: 'output', content: 'Location: Cotonou, Benin', delay: 400 },
    { type: 'output', content: 'Response time: ~2-4 hours', delay: 500 },
    { type: 'prompt', content: 'connect --protocol collaborator' },
    { type: 'typing', content: 'Ready to build something amazing together...', delay: 1200 },
  ]

  useEffect(() => {
    if (phase >= script.length) return
    const timer = setTimeout(() => {
      setLines((prev) => [...prev, phase])
      setPhase((p) => p + 1)
    }, script[phase].delay || 300)
    return () => clearTimeout(timer)
  }, [phase, script])

  return (
    <div className="font-mono text-[11px] sm:text-xs leading-relaxed">
      <div className="flex items-center gap-1.5 mb-3 pb-3 border-b border-white/[0.04]">
        <span className="w-2 h-2 rounded-full bg-red-500/50" />
        <span className="w-2 h-2 rounded-full bg-yellow-500/50" />
        <span className="w-2 h-2 rounded-full bg-green-500/50" />
        <span className="text-gray-600 ml-2 text-[10px]">contact.sh</span>
      </div>
      <div className="space-y-1 min-h-[220px]">
        {lines.map((lineIdx, i) => {
          const line = script[lineIdx]
          if (line.type === 'prompt') {
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-2"
              >
                <span className="text-emerald-500/60 shrink-0 mt-0.5">$</span>
                <span className="text-gray-300">{line.content}</span>
              </motion.div>
            )
          }
          if (line.type === 'typing') {
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-emerald-400/60"
              >
                <ChevronRight size={10} className="shrink-0" />
                <span className="typing-animate">{line.content}</span>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-1.5 h-3 bg-emerald-400/70 inline-block"
                />
              </motion.div>
            )
          }
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 4 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-gray-500 pl-4"
            >
              {line.content.includes('ACTIVE') ? (
                <span>
                  <span className="text-gray-500">Status: </span>
                  <span className="text-emerald-400 font-semibold">ACTIVE</span>
                  <span className="text-gray-500"> | Mode: </span>
                  <span className="text-blue-400">OPEN_TO_WORK</span>
                </span>
              ) : (
                line.content
              )}
            </motion.div>
          )
        })}
        {phase >= script.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 pt-2"
          >
            <span className="text-emerald-500/60 shrink-0">$</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="w-1.5 h-3 bg-emerald-400/70 inline-block"
            />
          </motion.div>
        )}
      </div>
    </div>
  )
}

function AnimatedGlow({ children, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500/20 via-emerald-500/20 to-purple-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500/10 via-emerald-500/10 to-purple-500/10 rounded-xl blur-md group-hover:animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative">{children}</div>
    </div>
  )
}

export default function Contact() {
  const { t } = useTranslation()
  const [ref, isVisible] = useScrollAnimation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [copied, setCopied] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Message de ${name} depuis votre portfolio`)
    const body = encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)
    const link = document.createElement('a')
    link.href = `mailto:marinoatohoun@gmail.com?subject=${subject}&body=${body}`
    link.click()
  }

  const copyEmail = () => {
    navigator.clipboard.writeText('marinoatohoun@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden bg-black"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/3 to-black pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

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

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Left - Interactive Terminal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 lg:order-1"
          >
            <div className="h-full p-5 sm:p-6 rounded-xl border backdrop-blur-sm" style={{ backgroundColor: 'rgba(2, 6, 12, 0.85)', borderColor: 'rgba(59, 130, 246, 0.1)' }}>
              <TerminalLines />

              {/* Quick actions */}
              <div className="mt-4 pt-4 border-t border-white/[0.04]">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={copyEmail}
                    className="group relative flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-medium text-gray-500 hover:text-emerald-400 border border-white/[0.06] hover:border-emerald-500/30 transition-all duration-200"
                  >
                    {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    {copied ? 'Copié !' : 'Copier l\'email'}
                  </button>
                  <a
                    href="mailto:marinoatohoun@gmail.com"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-medium text-gray-500 hover:text-blue-400 border border-white/[0.06] hover:border-blue-500/30 transition-all duration-200"
                  >
                    <Mail size={12} />
                    Envoyer un email
                  </a>
                  <span className="text-[10px] text-gray-700 ml-auto hidden sm:block">~2-4h de réponse</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Modern Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2"
          >
            <div className="h-full p-6 sm:p-8 rounded-xl border backdrop-blur-sm relative group" style={{ backgroundColor: 'rgba(10, 10, 20, 0.7)', borderColor: 'rgba(59, 130, 246, 0.08)' }}>
              {/* Header row */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    {t('contact.heading')}
                    <Sparkles size={14} className="text-blue-400/60" />
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{t('contact.description')}</p>
                </div>
                <StatusPulse />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-[11px] font-medium text-gray-600 mb-1.5">{t('contact.form.nameLabel')}</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      placeholder={t('contact.form.namePlaceholder')}
                      className="w-full px-4 py-2.5 text-sm rounded-lg bg-white/[0.03] border text-gray-300 placeholder-gray-700 focus:outline-none transition-all duration-200"
                      style={{ borderColor: focusedField === 'name' ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.06)' }}
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-[11px] font-medium text-gray-600 mb-1.5">{t('contact.form.emailLabel')}</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      placeholder={t('contact.form.emailPlaceholder')}
                      className="w-full px-4 py-2.5 text-sm rounded-lg bg-white/[0.03] border text-gray-300 placeholder-gray-700 focus:outline-none transition-all duration-200"
                      style={{ borderColor: focusedField === 'email' ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.06)' }}
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-[11px] font-medium text-gray-600 mb-1.5">{t('contact.form.messageLabel')}</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    placeholder={t('contact.form.messagePlaceholder')}
                    className="w-full px-4 py-2.5 text-sm rounded-lg bg-white/[0.03] border text-gray-300 placeholder-gray-700 focus:outline-none transition-all duration-200 resize-none"
                    style={{ borderColor: focusedField === 'message' ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.06)' }}
                  />
                </div>

                <button
                  type="submit"
                  className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:from-blue-500 hover:to-blue-400 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Send size={13} />
                    {t('contact.form.submitButton')}
                  </span>
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/[0.04]" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 text-[10px] text-gray-700 bg-[#0a0a14]">ou directement</span>
                </div>
              </div>

              {/* Social links */}
              <div className="flex flex-wrap gap-2">
                {socials.map(({ icon: Icon, href, key, color }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-2 px-3.5 py-2 rounded-lg border border-white/[0.06] text-xs text-gray-500 transition-all duration-200 ${color}`}
                  >
                    <Icon size={14} />
                    <span className="hidden sm:inline">{t(`contact.socialLinks.${key}`)}</span>
                    <ArrowUpRight size={10} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
