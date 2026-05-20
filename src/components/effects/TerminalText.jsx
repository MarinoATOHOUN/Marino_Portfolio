import { motion } from 'framer-motion'

const lines = [
  { text: '$ system.init --mode=portfolio', delay: 0.2 },
  { text: '$ loading profile: marino_atohoun', delay: 0.6 },
  { text: '$ status: building_african_ai', delay: 1.0 },
  { text: '$ system.ready', delay: 1.4 },
]

export default function TerminalText({ className = '' }) {
  return (
    <div className={`font-mono text-xs leading-relaxed ${className}`}>
      <div className="flex items-center gap-1.5 mb-2">
        <span className="w-2 h-2 rounded-full bg-red-500/60" />
        <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
        <span className="w-2 h-2 rounded-full bg-green-500/60" />
      </div>
      {lines.map((line) => (
        <motion.div
          key={line.text}
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: line.delay }}
          className="text-gray-600"
        >
          <span className="text-green-500/50">{line.text.split(' ')[0]}</span>{' '}
          {line.text.split(' ').slice(1).join(' ')}
        </motion.div>
      ))}
    </div>
  )
}
