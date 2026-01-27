import { motion } from 'motion/react'
import { IconMapPin, IconUsers } from '@tabler/icons-react'
import { itemVariants } from './constants'
import type { MainContributor } from '@/types'

interface ContributorCardProps {
  contributor: MainContributor | null
}

export function ContributorCard({ contributor }: ContributorCardProps) {
  return (
    <motion.a
      variants={itemVariants}
      href={contributor?.url || 'https://github.com/pejedev'}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="col-span-2 p-4 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10 flex items-center gap-3">
        {contributor ? (
          <>
            <motion.img
              src={contributor.avatar}
              alt={contributor.name}
              className="w-12 h-12 rounded-xl border border-border"
              whileHover={{ scale: 1.1 }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold tracking-tight text-sm">{contributor.name}</h3>
                <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[9px] font-bold uppercase">Creator</span>
              </div>
              <p className="text-muted-foreground text-xs mt-0.5 line-clamp-1">
                {contributor.bio || 'Building cool stuff'}
              </p>
              <div className="flex items-center gap-3 mt-1.5 text-[10px] text-muted-foreground">
                {contributor.location && (
                  <span className="flex items-center gap-1">
                    <IconMapPin size={10} />
                    {contributor.location}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <IconUsers size={10} />
                  {contributor.followers} followers
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-3 animate-pulse">
            <div className="w-12 h-12 rounded-xl bg-muted" />
            <div className="flex-1">
              <div className="h-4 w-24 bg-muted rounded" />
              <div className="h-3 w-32 bg-muted rounded mt-2" />
            </div>
          </div>
        )}
      </div>
    </motion.a>
  )
}
