import { useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { projects, techProjects } from '@/data/projects'
import { experiences } from '@/data/experience'
import { skillCategories, expertise } from '@/data/skills'

function buildSiteContext(t) {
  const certs = t('certifications.list', { returnObjects: true })
  const certsText = Array.isArray(certs)
    ? certs.map((c) => `- ${c.title} (${c.issuer}, ${c.date})`).join('\n')
    : ''

  const projText = projects
    .map((p) => `- ${p.title} (${p.category}): ${p.description} | Stack: ${p.stack.join(', ')} | Status: ${p.status} | Role: ${p.role}`)
    .join('\n')

  const techProjText = techProjects
    .map((p) => `- ${p.title}: ${p.description} | Stack: ${p.stack.join(', ')}`)
    .join('\n')

  const expText = experiences
    .map(
      (e) =>
        `- ${e.role} @ ${e.company} (${e.period}, ${e.location})\n  ${e.description.map((d) => `• ${d}`).join('\n  ')}\n  Impact: ${e.impact}`
    )
    .join('\n')

  const skillsText = skillCategories
    .map((c) => `${c.title}: ${c.skills.join(', ')}`)
    .join('\n')

  const expertiseText = expertise
    .map((e) => `${e.area}: ${e.description}`)
    .join('\n')

  return `
## Site Data — Portfolio de Marino

### Projets
${projText}

### Projets techniques
${techProjText}

### Expérience
${expText}

### Compétences
${skillsText}

### Domaines d'expertise
${expertiseText}

### Certifications
${certsText}
`
}

export default function ChatBot() {
  const { t } = useTranslation()
  const siteContext = useMemo(() => buildSiteContext(t), [t])
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: t('chat.initialMessage') },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMsg = { role: 'user', content: input.trim() }
    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(({ role, content }) => ({ role, content })),
          siteData: siteContext,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || data.detail || `Server error (${res.status})`)
      }
      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: t('chat.errorMessage', { error: err.message }) },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/25 hover:bg-blue-400 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={t('chat.buttonAriaLabel')}
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl border border-white/[0.06] bg-[#0a0a0f] shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3 bg-[#060608]">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10">
                <Bot size={16} className="text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium">{t('chat.headerTitle')}</p>
                <p className="text-[11px] text-gray-500">{t('chat.headerSubtitle')}</p>
              </div>
            </div>

            <div className="h-[400px] overflow-y-auto px-4 py-4 space-y-3 scroll-smooth">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`flex items-start gap-2 max-w-[85%] ${
                      msg.role === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                        msg.role === 'user'
                          ? 'bg-blue-500/10 text-blue-400'
                          : 'bg-white/5 text-gray-400'
                      }`}
                    >
                      {msg.role === 'user' ? <User size={13} /> : <Bot size={13} />}
                    </div>
                    <div
                      className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-blue-500/10 text-gray-200'
                          : 'bg-white/[0.04] text-gray-300'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2 max-w-[85%]">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/5 text-gray-400">
                      <Bot size={13} />
                    </div>
                    <div className="rounded-2xl bg-white/[0.04] px-4 py-3">
                      <div className="flex gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="h-1.5 w-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="h-1.5 w-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-white/[0.06] p-3 bg-[#060608]">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t('chat.inputPlaceholder')}
                  disabled={loading}
                  className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all disabled:opacity-50"
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500 text-white hover:bg-blue-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
