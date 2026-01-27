import { motion } from 'motion/react'
import { IconCode, IconStar } from '@tabler/icons-react'
import { itemVariants } from './constants'
import type { GitHubData } from '@/types'

interface StatsCardsProps {
  githubData: GitHubData | null
  loading: boolean
}

export function StatsCards({ githubData, loading }: StatsCardsProps) {
  return (
    <>
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        className="p-4 rounded-2xl bg-card border border-border relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative z-10">
          <div className="flex items-center gap-1.5 text-muted-foreground mb-2">
            <IconCode size={14} />
            <span className="text-[10px] font-medium uppercase tracking-wider">Repos</span>
          </div>
          <motion.p
            className="text-3xl font-bold text-primary"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
          >
            {loading ? (
              <span className="inline-block w-8 h-8 bg-muted/50 rounded animate-pulse" />
            ) : (
              githubData?.publicRepos ?? 2
            )}
          </motion.p>
          <p className="text-muted-foreground text-[10px] mt-0.5">public projects</p>
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        className="p-4 rounded-2xl bg-card border border-border relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative z-10">
          <div className="flex items-center gap-1.5 text-muted-foreground mb-2">
            <IconStar size={14} className="text-yellow-500" />
            <span className="text-[10px] font-medium uppercase tracking-wider">Stars</span>
          </div>
          <motion.p
            className="text-3xl font-bold text-yellow-500"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
          >
            {loading ? (
              <span className="inline-block w-8 h-8 bg-muted/50 rounded animate-pulse" />
            ) : (
              githubData?.totalStars ?? 0
            )}
          </motion.p>
          <p className="text-muted-foreground text-[10px] mt-0.5">total stars</p>
        </div>
      </motion.div>
    </>
  )
}
