import { motion } from 'motion/react'
import { useState, useEffect } from 'react'
import { itemVariants } from './constants'
import type { GitHubData } from '@/types'

interface StatsCardsProps {
  githubData: GitHubData | null
  loading: boolean
}

function AnimatedNumber({ value, loading }: { value: number; loading: boolean }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (loading || value === 0) return
    let current = 0
    const step = Math.max(1, Math.floor(value / 20))
    const interval = setInterval(() => {
      current = Math.min(current + step, value)
      setDisplay(current)
      if (current >= value) clearInterval(interval)
    }, 40)
    return () => clearInterval(interval)
  }, [value, loading])

  if (loading) return <span className="text-muted-foreground cursor-blink">_</span>
  return <>{display}</>
}

export function StatsCards({ githubData, loading }: StatsCardsProps) {
  return (
    <>
      <motion.div
        variants={itemVariants}
        whileHover={{ x: 3 }}
        className="border border-border hover:border-foreground/30 hover:border-glow transition-all duration-200 glitch-hover"
      >
        <div className="border-b border-border px-3 py-1 bg-[var(--title-bar)]">
          <span className="text-[10px] text-muted-foreground">repos.count</span>
        </div>
        <div className="px-4 py-3">
          <div className="text-[9px] text-muted-foreground mb-1.5">
            <span className="text-accent">$</span> wc -l repos/
          </div>
          <p className="text-2xl font-bold text-foreground text-glow tabular-nums">
            <AnimatedNumber value={githubData?.publicRepos ?? 2} loading={loading} />
          </p>
          <p className="text-[9px] text-muted-foreground mt-1">public_repos</p>
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        whileHover={{ x: 3 }}
        className="border border-border hover:border-foreground/30 hover:border-glow transition-all duration-200 glitch-hover"
      >
        <div className="border-b border-border px-3 py-1 bg-[var(--title-bar)]">
          <span className="text-[10px] text-muted-foreground">stars.total</span>
        </div>
        <div className="px-4 py-3">
          <div className="text-[9px] text-muted-foreground mb-1.5">
            <span className="text-accent">$</span> gh api /stars
          </div>
          <p className="text-2xl font-bold text-accent text-glow-accent tabular-nums">
            <AnimatedNumber value={githubData?.totalStars ?? 0} loading={loading} />
          </p>
          <p className="text-[9px] text-muted-foreground mt-1">total_stars</p>
        </div>
      </motion.div>
    </>
  )
}
