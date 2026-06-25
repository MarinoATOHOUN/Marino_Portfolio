import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const stepIcons = [
  <svg key="0" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  <svg key="1" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>,
  <svg key="2" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/><line x1="12" y1="22" x2="12" y2="15.5"/><line x1="22" y1="8.5" x2="12" y2="15.5"/><line x1="2" y1="8.5" x2="12" y2="15.5"/></svg>,
  <svg key="3" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  <svg key="4" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
]

export default function ProcessDiagram({ items, title, detailLabel, subtitle, className }) {
  return (
    <div className={cn('relative w-full py-24 sm:py-32 overflow-hidden', className)}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.015] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16 sm:mb-20"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto text-balance">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}

        {/* Desktop: Alternating */}
        <div className="hidden lg:block relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-blue-500/40 via-blue-500/15 to-transparent" />

          <div className="space-y-16">
            {items.map((item, i) => {
              const isLeft = i % 2 === 0
              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative flex items-start group"
                >
                  {/* Connecting line */}
                  <div
                    className={cn(
                      'absolute top-6 h-[2px] w-[calc(50%-2rem)] bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0',
                      isLeft ? 'left-0' : 'right-0'
                    )}
                  />

                  {/* Card */}
                  <div
                    className={cn(
                      'w-[calc(50%-2.5rem)]',
                      isLeft ? 'text-right' : 'ml-auto'
                    )}
                  >
                    <div
                      className={cn(
                        'group/card relative overflow-hidden p-6 rounded-xl border bg-black/50 backdrop-blur-sm',
                        'border-white/[0.06]',
                        'hover:border-blue-500/30 hover:bg-black/80',
                        'transition-all duration-500 ease-out',
                        'hover:scale-[1.02] hover:shadow-[0_0_60px_-12px_rgba(59,130,246,0.18)]',
                        'text-left cursor-default'
                      )}
                    >
                      {/* Top border glow */}
                      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-500/0 to-transparent group-hover/card:via-blue-500/40 transition-all duration-500" />

                      {/* Icon + Year */}
                      <div className="flex items-center gap-2.5 mb-3">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 group-hover/card:bg-blue-500/20 group-hover/card:text-blue-300 transition-all duration-300">
                          {stepIcons[i % stepIcons.length]}
                        </span>
                        <span className="text-xs font-bold tracking-widest text-blue-400/70 bg-blue-500/10 px-3 py-1 rounded-full uppercase group-hover/card:text-blue-300 group-hover/card:bg-blue-500/20 transition-all duration-300">
                          {item.year}
                        </span>
                      </div>

                      {/* Event summary */}
                      <p className="text-sm text-gray-400 leading-relaxed group-hover/card:text-gray-200 transition-all duration-500">
                        {item.event}
                      </p>

                      {/* Detail section - expands on hover */}
                      {item.detail && (
                        <div className="grid grid-rows-[0fr] group-hover/card:grid-rows-[1fr] transition-all duration-500 ease-out">
                          <div className="overflow-hidden">
                            <div className="flex items-center gap-2 pt-4 pb-2">
                              <span className="h-px flex-1 bg-gradient-to-r from-blue-500/30 to-transparent" />
                              {detailLabel && (
                                <span className="text-[10px] font-semibold text-blue-400/50 tracking-wider uppercase flex-shrink-0">
                                  {detailLabel}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed group-hover/card:text-gray-400 transition-all duration-500">
                              {item.detail}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Central node */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-10 mt-[18px]">
                    <div className="relative">
                      <div className="w-[13px] h-[13px] rounded-full bg-blue-500 ring-[4px] ring-blue-500/20 group-hover:ring-blue-500/40 group-hover:scale-125 transition-all duration-300" />
                      <div className="absolute inset-0 rounded-full bg-blue-400/20 blur-md group-hover:blur-lg group-hover:bg-blue-400/30 transition-all duration-300" />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mobile: Left-aligned */}
        <div className="lg:hidden relative">
          <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-blue-500/40 via-blue-500/15 to-transparent" />

          <div className="space-y-8">
            {items.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="relative flex gap-5 group"
              >
                {/* Node */}
                <div className="relative z-10 mt-[3px] flex-shrink-0 w-6 flex justify-center">
                  <div className="w-[11px] h-[11px] rounded-full bg-blue-500 ring-[3px] ring-blue-500/20 group-hover:ring-blue-500/40 group-hover:scale-125 transition-all duration-300" />
                </div>

                {/* Card */}
                <div className="group/card relative overflow-hidden flex-1 min-w-0 p-4 rounded-xl border border-white/[0.06] bg-black/40 backdrop-blur-sm hover:border-blue-500/25 hover:bg-black/60 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-blue-500/10 text-blue-400">
                      {stepIcons[i % stepIcons.length]}
                    </span>
                    <span className="text-[10px] font-bold tracking-widest text-blue-400/70 bg-blue-500/10 px-2 py-0.5 rounded-full uppercase">
                      {item.year}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed group-hover/card:text-gray-200 transition-all duration-500">
                    {item.event}
                  </p>

                  {/* Mobile detail */}
                  {item.detail && (
                    <div className="grid grid-rows-[0fr] group-hover/card:grid-rows-[1fr] transition-all duration-500 ease-out">
                      <div className="overflow-hidden">
                        <div className="flex items-center gap-2 pt-3 pb-1.5">
                          <span className="h-px flex-1 bg-gradient-to-r from-blue-500/30 to-transparent" />
                          {detailLabel && (
                            <span className="text-[9px] font-semibold text-blue-400/50 tracking-wider uppercase flex-shrink-0">
                              {detailLabel}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed group-hover/card:text-gray-400 transition-all duration-500">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
