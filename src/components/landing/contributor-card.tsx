import { motion } from 'motion/react'
import { useState, useEffect } from 'react'
import { itemVariants, smallCatAscii, smallCatBlinkAscii } from './constants'
import type { MainContributor } from '@/types'

interface ContributorCardProps {
  contributor: MainContributor | null
}

export function ContributorCard({ contributor }: ContributorCardProps) {
  const [catBlink, setCatBlink] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCatBlink(true)
      setTimeout(() => setCatBlink(false), 120)
    }, 4000 + Math.random() * 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.a
      variants={itemVariants}
      href={contributor?.url || 'https://github.com/pejedev'}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ x: 3 }}
      className="col-span-2 border border-border hover:border-foreground/30 hover:border-glow transition-all duration-200 group glitch-hover"
    >
      <div className="border-b border-border px-3 py-1 flex items-center justify-between bg-[var(--title-bar)]">
        <span className="text-[10px] text-muted-foreground">$ whoami</span>
        <span className="text-[9px] text-accent text-glow-accent opacity-0 group-hover:opacity-100 transition-opacity font-bold">
          VIEW &gt;
        </span>
      </div>

      <div className="px-4 py-3">
        {contributor ? (
          <div className="flex items-start gap-4">
            <pre
              className="text-foreground text-glow text-[7px] sm:text-[9px] leading-tight select-none shrink-0 hidden sm:block"
              aria-hidden="true"
            >
              {catBlink ? smallCatBlinkAscii : smallCatAscii}
            </pre>
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-foreground text-glow font-bold text-sm">{contributor.name}</span>
                <span className="text-[9px] text-accent text-glow-accent font-bold">&#9608; CREATOR</span>
              </div>
              <p className="text-muted-foreground text-[11px] line-clamp-1">
                <span className="text-[var(--info)]">// </span>
                {contributor.bio || 'Building cool stuff'}
              </p>
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                {contributor.location && (
                  <span>
                    <span className="text-[var(--info)]">loc:</span> {contributor.location}
                  </span>
                )}
                <span>
                  <span className="text-[var(--info)]">followers:</span> {contributor.followers}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <motion.span
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Loading user data...
              </motion.span>
              <span className="cursor-blink">█</span>
            </div>
          </div>
        )}
      </div>
    </motion.a>
  )
}
