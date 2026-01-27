import { motion } from 'motion/react'
import { itemVariants, techStack } from './constants'

export function TechStack() {
  return (
    <motion.div
      variants={itemVariants}
      className="col-span-2 p-4 rounded-2xl bg-card border border-border relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Powered by</span>
          <motion.div
            className="flex items-center gap-1 text-[10px] text-green-500"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span>shipping</span>
          </motion.div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-default"
            >
              <tech.icon size={20} className={tech.color} />
              <span className="text-[10px] font-medium text-muted-foreground">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
