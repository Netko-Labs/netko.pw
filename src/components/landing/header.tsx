import { motion } from 'motion/react'
import { IconBrandGithub, IconStar } from '@tabler/icons-react'
import LogoSvg from '@/assets/logo.svg?react'
import { itemVariants } from './constants'
import type { GitHubData } from '@/types'
import { ThemeSwitcher } from '@/components/ui/theme-switcher'

interface HeaderProps {
  githubData: GitHubData | null
}

export function Header({ githubData }: HeaderProps) {
  return (
    <motion.header variants={itemVariants} className="flex items-center justify-between mb-6">
      <motion.div
        className="flex items-center gap-2.5"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <LogoSvg className="w-9 h-9 text-foreground" />
        <span className="font-semibold text-lg tracking-tight">Netko</span>
        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
          oss
        </span>
      </motion.div>

      <div className="flex items-center gap-2">
        <ThemeSwitcher />
        <motion.a
          href="https://github.com/n3tko"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors duration-300"
        >
          <IconBrandGithub size={16} />
          <span className="text-sm font-medium">GitHub</span>
          {githubData && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <IconStar size={12} className="text-yellow-500" />
              {githubData.totalStars}
            </span>
          )}
        </motion.a>
      </div>
    </motion.header>
  )
}
