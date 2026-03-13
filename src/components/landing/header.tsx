import { motion } from 'motion/react'
import { itemVariants } from './constants'
import { trackEvent } from '@/hooks/use-umami'
import type { GitHubData } from '@/types'

interface HeaderProps {
  githubData: GitHubData | null
  onToggleTheme: () => void
  theme: 'dark' | 'light'
}

export function Header({ githubData, onToggleTheme, theme }: HeaderProps) {
  return (
    <motion.header variants={itemVariants} className="border border-border border-glow mb-1">
      <div className="flex items-center justify-between px-3 py-1.5" style={{ backgroundColor: 'var(--title-bar)' }}>
        <div className="flex items-center gap-1.5 text-[11px]">
          <span className="text-accent text-glow-accent font-bold">&#9619;&#9619;</span>
          <span className="text-foreground text-glow font-bold tracking-wide">NETKO LABS</span>
          <span className="text-muted-foreground mx-1">|</span>
          <span className="text-muted-foreground">v4.2.0</span>
          <span className="text-muted-foreground mx-1">|</span>
          <motion.span
            className="text-accent text-glow-accent text-[10px]"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            OPEN SOURCE
          </motion.span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => { onToggleTheme(); trackEvent('theme-toggle', { to: theme === 'dark' ? 'light' : 'dark' }) }}
            className="text-[10px] text-muted-foreground hover:text-foreground transition-colors"
          >
            [{theme === 'dark' ? 'LIGHT' : 'DARK'}]
          </button>
          <motion.a
            href="https://github.com/Netko-Labs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[10px] text-muted-foreground hover:text-foreground transition-colors glitch-hover"
            whileHover={{ x: 2 }}
            onClick={() => trackEvent('github-link-click')}
          >
            <span>github.com/Netko-Labs</span>
            {githubData && (
              <span className="text-accent text-glow-accent font-bold">
                {githubData.totalStars}&#9733;
              </span>
            )}
          </motion.a>
        </div>
      </div>
    </motion.header>
  )
}
