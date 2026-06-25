import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function Timeline({ items, title, className }) {
  return (
    <div className={cn('rounded-xl card-elevated p-5 sm:p-6', className)}>
      {title && (
        <h3 className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-5">
          {title}
        </h3>
      )}
      <div className="relative">
        <div className="absolute left-[9px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-blue-500/40 via-blue-500/20 to-transparent" />

        <div className="space-y-1">
          {items.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className="relative flex gap-4 pb-5 last:pb-0"
            >
              <div className="relative z-10 mt-[7px] flex-shrink-0 w-5 flex justify-center">
                <div className="w-[10px] h-[10px] rounded-full bg-blue-500 ring-[3px] ring-blue-500/20" />
              </div>

              <div className="flex-1 min-w-0 pt-0">
                <span className="inline-block text-[10px] font-bold tracking-wider text-blue-400/80 bg-blue-500/10 px-2 py-0.5 rounded-full mb-1 uppercase">
                  {item.year}
                </span>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {item.event}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
