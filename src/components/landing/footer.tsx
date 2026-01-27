import { motion } from 'motion/react'
import { IconBrandGithub, IconBrandX } from '@tabler/icons-react'
import { itemVariants } from './constants'

export function Footer() {
  return (
    <motion.footer variants={itemVariants} className="pt-6 pb-4 mt-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-muted-foreground text-xs">
        <p className="flex items-center gap-1">
          © {new Date().getFullYear()} Netko · Made with
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1 }}
          >
            ☕
          </motion.span>
          &
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 2 }}
          >
            🎮
          </motion.span>
        </p>
        <div className="flex items-center gap-4">
          <motion.a
            href="https://github.com/n3tko"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-primary transition-colors"
            whileHover={{ y: -2 }}
          >
            <IconBrandGithub size={14} />
            <span>GitHub</span>
          </motion.a>
          <motion.a
            href="https://x.com/pejedev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-primary transition-colors"
            whileHover={{ y: -2 }}
          >
            <IconBrandX size={14} />
            <span>@pejedev</span>
          </motion.a>
        </div>
      </div>
    </motion.footer>
  )
}
