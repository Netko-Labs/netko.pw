import { motion } from 'motion/react'
import { itemVariants, funnyMetrics } from './constants'

export function FunnyMetrics() {
  return (
    <motion.div
      variants={itemVariants}
      className="col-span-2 border border-border hover:border-foreground/30 hover:border-glow transition-all duration-200"
    >
      <div className="border-b border-border px-3 py-1 bg-[var(--title-bar)]">
        <span className="text-[10px] text-muted-foreground">
          <span className="text-accent">$</span> cat /dev/human/metrics
        </span>
      </div>
      <div className="px-4 py-3">
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
          {funnyMetrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              className="flex items-center justify-between text-[11px] py-0.5 border-b border-border/30 last:border-0"
            >
              <span className="text-muted-foreground">{metric.label}</span>
              <motion.span
                className="font-bold tabular-nums"
                style={{ color: metric.color, textShadow: `0 0 6px ${metric.color}40` }}
                whileHover={{ scale: 1.2 }}
              >
                {metric.value}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
