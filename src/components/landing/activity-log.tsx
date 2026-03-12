import { motion } from 'motion/react'
import { useState, useEffect, useRef } from 'react'
import { itemVariants, systemLogEntries } from './constants'

export function ActivityLog() {
  const [entries, setEntries] = useState<Array<{ text: string; color: string; time: string }>>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const getTime = () => {
      const now = new Date()
      return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
    }

    const initial = systemLogEntries.slice(0, 4).map(e => ({
      ...e,
      time: getTime(),
    }))
    setEntries(initial)

    let index = 4
    const interval = setInterval(() => {
      const entry = systemLogEntries[index % systemLogEntries.length]
      setEntries(prev => {
        const next = [...prev, { ...entry, time: getTime() }]
        return next.slice(-8)
      })
      index++
    }, 3000 + Math.random() * 2000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [entries])

  return (
    <motion.div
      variants={itemVariants}
      className="col-span-2 lg:col-span-4 border border-border hover:border-foreground/30 hover:border-glow transition-all duration-200"
    >
      <div className="border-b border-border px-3 py-1 flex items-center justify-between bg-[var(--title-bar)]">
        <span className="text-[10px] text-muted-foreground">
          <span className="text-accent">$</span> tail -f /var/log/netko-labs.log
        </span>
        <motion.div
          className="flex items-center gap-1.5 text-[9px] text-accent text-glow-accent"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <span>&#9679;</span>
          <span>streaming</span>
        </motion.div>
      </div>
      <div ref={scrollRef} className="px-4 py-2 max-h-[120px] overflow-hidden">
        <div className="space-y-0.5">
          {entries.map((entry, i) => (
            <motion.div
              key={`${entry.text}-${i}`}
              className="text-[10px] leading-relaxed flex items-start gap-2"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
            >
              <span className="text-muted-foreground shrink-0 tabular-nums">{entry.time}</span>
              <span style={{ color: entry.color }}>{entry.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
