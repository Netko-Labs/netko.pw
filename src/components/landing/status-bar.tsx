import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { itemVariants } from './constants'

export function StatusBar() {
  const [time, setTime] = useState(new Date())
  const [uptime, setUptime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
      setUptime(u => u + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatUptime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}m${String(sec).padStart(2, '0')}s`
  }

  const timeStr = `${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}:${String(time.getSeconds()).padStart(2, '0')}`

  return (
    <motion.div
      variants={itemVariants}
      className="fixed bottom-0 left-0 right-0 z-[100] border-t border-border bg-[var(--title-bar)]"
    >
      <div className="flex items-center justify-between px-4 py-1 text-[10px]">
        <div className="flex items-center gap-3">
          <span className="text-[var(--primary-foreground)] bg-foreground px-1.5 font-bold">0:bash</span>
          <span className="text-muted-foreground">netko-labs</span>
          <span className="text-muted-foreground">|</span>
          <motion.span
            className="flex items-center gap-1 text-foreground"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="w-1 h-1 bg-foreground" />
            ALL SYSTEMS GO
          </motion.span>
        </div>

        <div className="flex items-center gap-3 text-muted-foreground">
          <span>
            <span className="text-[var(--info)]">up:</span> {formatUptime(uptime)}
          </span>
          <span className="text-muted-foreground">|</span>
          <span>
            <span className="text-[var(--info)]">mem:</span> 42MB
          </span>
          <span className="text-muted-foreground">|</span>
          <span className="text-accent text-glow-accent tabular-nums">{timeStr}</span>
        </div>
      </div>
    </motion.div>
  )
}
