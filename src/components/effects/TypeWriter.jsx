import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function TypeWriter({
  strings = [],
  className = '',
  cursorClassName = '',
  speed = 60,
  deleteSpeed = 30,
  pauseAfter = 2000,
  pauseBeforeDelete = 500,
}) {
  const [displayed, setDisplayed] = useState('')
  const [mode, setMode] = useState('typing')
  const [index, setIndex] = useState(0)
  const [cursor, setCursor] = useState(true)
  const [ready, setReady] = useState(false)

  // Cursor blink
  useEffect(() => {
    const blink = setInterval(() => setCursor((c) => !c), 530)
    return () => clearInterval(blink)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 600)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!ready || !strings.length) return

    const current = strings[index % strings.length]

    if (mode === 'typing') {
      if (displayed.length < current.length) {
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1))
        }, speed + Math.random() * 40)
        return () => clearTimeout(t)
      }
      const t = setTimeout(() => setMode('pause'), pauseAfter)
      return () => clearTimeout(t)
    }

    if (mode === 'pause') {
      const t = setTimeout(() => setMode('deleting'), pauseBeforeDelete)
      return () => clearTimeout(t)
    }

    if (mode === 'deleting') {
      if (displayed.length > 0) {
        const t = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1))
        }, deleteSpeed + Math.random() * 20)
        return () => clearTimeout(t)
      }
      setMode('typing')
      setIndex((i) => (i + 1) % strings.length)
    }
  }, [mode, displayed, index, strings, ready, speed, deleteSpeed, pauseAfter, pauseBeforeDelete])

  if (!strings.length) return null

  return (
    <span className={`inline-flex items-center ${className}`}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={displayed}
          initial={{ opacity: 0, filter: 'blur(4px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(4px)' }}
          transition={{ duration: 0.2 }}
          className="inline-block"
        >
          {displayed}
        </motion.span>
      </AnimatePresence>
      <span
        className={`inline-block w-[2px] h-[1em] ml-0.5 -mb-0.5 bg-blue-400 transition-opacity duration-100 ${
          cursor ? 'opacity-100' : 'opacity-0'
        } ${cursorClassName}`}
      />
    </span>
  )
}
