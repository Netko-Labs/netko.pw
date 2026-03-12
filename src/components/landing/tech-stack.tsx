import { motion } from 'motion/react'
import { itemVariants, techStack } from './constants'

export function TechStack() {
  return (
    <motion.div
      variants={itemVariants}
      className="col-span-2 border border-border hover:border-foreground/30 hover:border-glow transition-all duration-200"
    >
      <div className="border-b border-border px-3 py-1 flex items-center justify-between bg-[var(--title-bar)]">
        <span className="text-[10px] text-muted-foreground">
          <span className="text-accent">$</span> cat stack.conf
        </span>
        <motion.div
          className="flex items-center gap-1.5 text-[9px]"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="w-1.5 h-1.5 bg-foreground" />
          <span className="text-foreground text-glow">shipping</span>
        </motion.div>
      </div>
      <div className="px-4 py-3">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.06 }}
              whileHover={{ y: -2, scale: 1.05 }}
              className="flex flex-col items-center gap-1.5 p-2 border border-border/30 hover:border-foreground/20 transition-all cursor-default group/tech"
            >
              <span
                className="w-2.5 h-2.5 transition-shadow"
                style={{
                  backgroundColor: tech.color,
                  boxShadow: `0 0 4px ${tech.color}40`,
                }}
              />
              <span className="text-[9px] text-muted-foreground group-hover/tech:text-foreground transition-colors">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
