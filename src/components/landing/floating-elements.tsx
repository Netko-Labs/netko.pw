import { motion } from 'motion/react'
import { floatVariants, pulseVariants, rotateVariants } from './constants'

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <motion.div
        variants={floatVariants}
        initial="initial"
        animate="animate"
        className="absolute top-20 left-[10%] w-3 h-3 rounded-full bg-primary/40"
      />
      <motion.div
        variants={floatVariants}
        initial="initial"
        animate="animate"
        style={{ animationDelay: '0.5s' }}
        className="absolute top-40 right-[15%] w-2 h-2 rounded-full bg-accent/50"
      />
      <motion.div
        variants={rotateVariants}
        initial="initial"
        animate="animate"
        className="absolute bottom-32 left-[20%] w-8 h-8 border border-primary/20 rounded-lg"
      />
      <motion.div
        variants={pulseVariants}
        initial="initial"
        animate="animate"
        className="absolute top-1/3 right-[8%] w-4 h-4 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-sm"
      />
      <motion.div
        variants={floatVariants}
        initial="initial"
        animate="animate"
        className="absolute bottom-20 right-[25%] text-2xl opacity-20"
      >
        ✦
      </motion.div>
    </div>
  )
}
