import { motion } from 'motion/react'
import { IconDeviceGamepad2, IconLock } from '@tabler/icons-react'
import { itemVariants } from './constants'

export function GlitchCoveCard() {
  return (
    <motion.div
      variants={itemVariants}
      className="col-span-2 p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 via-card to-pink-500/10 border border-purple-500/30 relative overflow-hidden group"
    >
      <div className="absolute top-2 right-2">
        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 text-[9px] font-bold uppercase">
          <IconLock size={10} />
          Closed Source
        </span>
      </div>
      <div className="relative z-10 flex items-start gap-3">
        <motion.div
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/20 border border-purple-500/30 flex items-center justify-center shrink-0"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <IconDeviceGamepad2 className="text-purple-400" size={20} />
        </motion.div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold tracking-tight">GlitchCove</h2>
            <motion.span
              className="px-1.5 py-0.5 rounded bg-yellow-500/20 text-yellow-400 text-[9px] font-bold"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              WIP
            </motion.span>
          </div>
          <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
            A video game brewed with chaos and passion. Coming soon™
          </p>
          <div className="mt-2 flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 text-[10px] font-medium">Game</span>
            <span className="px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-400 text-[10px] font-medium">Indie</span>
            <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px] font-medium">Secret</span>
          </div>
        </div>
      </div>
      <motion.div
        className="absolute -bottom-4 -right-4 text-4xl opacity-20"
        animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        🎮
      </motion.div>
    </motion.div>
  )
}
