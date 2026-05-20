import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function ScanLine({ className = '' }) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <motion.div
        className="absolute left-0 right-0 h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)',
          boxShadow: '0 0 8px rgba(59,130,246,0.15), 0 0 20px rgba(59,130,246,0.05)',
        }}
        initial={{ top: '0%' }}
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

export function ScanOverlay({ children, active = true, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { threshold: 0.1, once: false })

  if (!active) return <>{children}</>

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 pointer-events-none z-10"
      >
        <motion.div
          className="absolute left-0 right-0 h-[2px]"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.2), rgba(96,165,250,0.15), transparent)',
            boxShadow: '0 0 10px rgba(59,130,246,0.08)',
            filter: 'blur(1px)',
          }}
          animate={inView ? { top: ['-5%', '105%'] } : { top: '-5%' }}
          transition={{ duration: 3, repeat: inView ? Infinity : 0, ease: 'linear', delay: 0.5 }}
        />
      </motion.div>
      <div className="relative z-0">{children}</div>
    </div>
  )
}

export function CardHoverGlow({ children, className = '' }) {
  return (
    <div className={`group relative ${className}`}>
      <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 group-hover:from-blue-500/10 group-hover:via-blue-500/5 group-hover:to-blue-500/10 transition-all duration-500 blur-sm pointer-events-none" />
      <div className="absolute inset-0 rounded-xl bg-[conic-gradient(from_0deg,transparent,transparent,transparent,transparent)] group-hover:bg-[conic-gradient(from_0deg,transparent,rgba(59,130,246,0.03),transparent,rgba(59,130,246,0.03),transparent)] transition-all duration-700 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
