import { motion } from 'motion/react'
import { IconRocket } from '@tabler/icons-react'
import { itemVariants, pulseVariants } from './constants'

export function Hero() {
  return (
    <motion.div
      variants={itemVariants}
      className="col-span-2 row-span-2 p-5 sm:p-6 rounded-2xl bg-card border border-border relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <motion.div
        className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-2xl"
        variants={pulseVariants}
        initial="initial"
        animate="animate"
      />
      <div className="relative z-10 h-full flex flex-col justify-between min-h-[200px]">
        <div>
          <motion.div
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <IconRocket size={12} />
            <span>Building in public</span>
          </motion.div>
          <h1 className="text-3xl sm:text-4xl font-bold leading-[1.1] tracking-tight">
            We ship
            <br />
            <span className="text-primary relative">
              cool stuff
              <motion.span
                className="absolute -right-6 -top-1 text-lg"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              >
                ✨
              </motion.span>
            </span>
          </h1>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
          A bunch of devs making tools we actually want to use. No corporate vibes, just good software.
        </p>
      </div>
    </motion.div>
  )
}
