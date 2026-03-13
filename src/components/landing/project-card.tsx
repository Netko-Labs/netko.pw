import { motion } from 'motion/react'
import { itemVariants, languageColors } from './constants'
import { trackEvent } from '@/hooks/use-umami'
import type { RepoData } from '@/types'

interface ProjectCardProps {
  repo: RepoData | undefined
  fallbackUrl: string
  fallbackDescription: string
  fallbackTags: string[]
  size?: 'large' | 'small'
}

export function ProjectCard({
  repo,
  fallbackUrl,
  fallbackDescription,
  fallbackTags,
  size = 'large',
}: ProjectCardProps) {
  const name = repo?.name || fallbackUrl.split('/').pop() || 'unknown'
  const description = repo?.description || fallbackDescription
  const isSmall = size === 'small'

  return (
    <motion.a
      variants={itemVariants}
      href={repo?.url || fallbackUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('project-click', { name, stars: repo?.stars ?? 0 })}
      whileHover={{ x: 3 }}
      className={`${isSmall ? 'col-span-2 lg:col-span-1' : 'col-span-2'} border border-border hover:border-foreground/30 hover:border-glow transition-all duration-200 group relative overflow-hidden glitch-hover`}
    >
      <div className="border-b border-border px-3 py-1 flex items-center justify-between bg-[var(--title-bar)]">
        <span className="text-[10px] text-muted-foreground">
          Netko-Labs/{name}
        </span>
        <div className="flex items-center gap-2">
          {repo?.language && (
            <span className="flex items-center gap-1 text-[9px] text-muted-foreground">
              <span
                className="w-1.5 h-1.5 rounded-full inline-block"
                style={{ backgroundColor: languageColors[repo.language] || '#666', boxShadow: `0 0 4px ${languageColors[repo.language] || '#666'}50` }}
              />
              {repo.language}
            </span>
          )}
          <span className="text-[9px] text-accent text-glow-accent opacity-0 group-hover:opacity-100 transition-opacity font-bold">
            OPEN &gt;
          </span>
        </div>
      </div>

      <div className={`${isSmall ? 'p-3' : 'px-4 py-3'} relative`}>
        <div className="flex items-start gap-2">
          <span className="text-accent text-glow-accent shrink-0 text-[10px] mt-0.5">&gt;</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-bold text-foreground text-glow text-sm tracking-tight">{name}</h2>
              {repo && (
                <span className="text-[9px] text-accent/80">
                  {repo.stars}&#9733; {repo.forks}&#9095;
                </span>
              )}
            </div>
            <p className={`text-muted-foreground ${isSmall ? 'text-[10px]' : 'text-[11px]'} mt-1 leading-relaxed line-clamp-2`}>
              {description}
            </p>
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              {(repo?.topics?.slice(0, 3) || fallbackTags).map(tag => (
                <span key={tag} className="text-[9px] text-accent text-glow-accent">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  )
}
