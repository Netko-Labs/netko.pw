import { motion } from 'motion/react'
import { itemVariants } from './constants'
import { trackEvent } from '@/hooks/use-umami'

export function Footer() {
  return (
    <motion.footer variants={itemVariants} className="pt-2 pb-8 mt-auto">
      <div className="border border-border px-3 py-1.5 flex flex-col sm:flex-row items-center justify-between gap-1.5 text-[10px] text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <span className="text-accent text-glow-accent">$</span>
          <span>echo &quot;(c) {new Date().getFullYear()} Netko Labs&quot;</span>
          <span className="text-border">|</span>
          <span>brewed with caffeine &amp; chaos</span>
          <span className="text-border">|</span>
          <span className="text-[var(--info)]">all rights reversed</span>
        </div>
        <div className="flex items-center gap-3">
          <motion.a
            href="https://github.com/Netko-Labs"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors text-glow"
            whileHover={{ x: 2 }}
            onClick={() => trackEvent('footer-link', { target: 'github' })}
          >
            [github]
          </motion.a>
          <motion.a
            href="https://x.com/pejedev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors text-glow"
            whileHover={{ x: 2 }}
            onClick={() => trackEvent('footer-link', { target: 'twitter' })}
          >
            [@pejedev]
          </motion.a>
        </div>
      </div>
    </motion.footer>
  )
}
