import { motion } from 'motion/react'
import { itemVariants, funnyMetrics } from './constants'

export function FunnyMetrics() {
  return (
    <motion.div
      variants={itemVariants}
      className="col-span-2 p-4 rounded-2xl bg-card border border-border relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Made with</span>
          <motion.span
            animate={{ rotate: [0, 14, -8, 14, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
          >
            🫠
          </motion.span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {funnyMetrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 p-2 rounded-xl bg-muted/30"
            >
              <motion.div
                animate={metric.label === 'cups of coffee' ? { rotate: [0, -10, 10, 0] } : {}}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              >
                <metric.icon size={16} className={metric.color} />
              </motion.div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-bold ${metric.color}`}>{metric.value}</p>
                <p className="text-[9px] text-muted-foreground truncate">{metric.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
