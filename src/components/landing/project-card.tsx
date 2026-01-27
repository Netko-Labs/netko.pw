import { motion } from 'motion/react'
import { IconArrowUpRight, IconStar, IconGitFork } from '@tabler/icons-react'
import { itemVariants, languageColors } from './constants'
import type { RepoData } from '@/types'

type ProjectColor = 'primary' | 'accent' | 'red' | 'cyan'

interface ProjectCardProps {
  repo: RepoData | undefined
  fallbackUrl: string
  fallbackDescription: string
  fallbackTags: string[]
  icon: React.ReactNode
  color: ProjectColor
  size?: 'large' | 'small'
}

const colorClasses: Record<ProjectColor, {
  border: string
  gradient: string
  tag: string
  iconBg: string
  iconBorder: string
}> = {
  primary: {
    border: 'hover:border-primary/50',
    gradient: 'from-primary/5',
    tag: 'bg-primary/10 text-primary',
    iconBg: 'from-primary/20 to-primary/5',
    iconBorder: 'border-primary/20',
  },
  accent: {
    border: 'hover:border-accent/50',
    gradient: 'from-accent/5',
    tag: 'bg-accent/10 text-accent',
    iconBg: 'from-accent/20 to-accent/5',
    iconBorder: 'border-accent/20',
  },
  red: {
    border: 'hover:border-red-500/50',
    gradient: 'from-red-500/5',
    tag: 'bg-red-500/10 text-red-400',
    iconBg: 'from-red-500/20 to-red-500/5',
    iconBorder: 'border-red-500/20',
  },
  cyan: {
    border: 'hover:border-cyan-500/50',
    gradient: 'from-cyan-500/5',
    tag: 'bg-cyan-500/10 text-cyan-400',
    iconBg: 'from-cyan-500/20 to-cyan-500/5',
    iconBorder: 'border-cyan-500/20',
  },
}

export function ProjectCard({
  repo,
  fallbackUrl,
  fallbackDescription,
  fallbackTags,
  icon,
  color,
  size = 'large',
}: ProjectCardProps) {
  const colors = colorClasses[color]
  const isSmall = size === 'small'

  if (isSmall) {
    return (
      <motion.a
        variants={itemVariants}
        href={repo?.url || fallbackUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
        className={`col-span-2 lg:col-span-1 p-4 rounded-2xl bg-card border border-border ${colors.border} transition-all duration-300 group relative overflow-hidden`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <motion.div
              className={`w-8 h-8 rounded-lg bg-gradient-to-br ${colors.iconBg} border ${colors.iconBorder} flex items-center justify-center`}
              whileHover={{ rotate: 5 }}
            >
              {icon}
            </motion.div>
            <IconArrowUpRight size={12} className="text-muted-foreground group-hover:text-current transition-all" />
          </div>
          <h2 className="font-semibold tracking-tight text-sm">{repo?.name || fallbackUrl.split('/').pop()}</h2>
          <p className="text-muted-foreground text-[10px] mt-1 leading-relaxed line-clamp-2">
            {repo?.description || fallbackDescription}
          </p>
          <div className="mt-2 flex items-center gap-1.5">
            {fallbackTags.map(tag => (
              <span key={tag} className={`px-1.5 py-0.5 rounded-full ${colors.tag} text-[9px] font-medium`}>
                {tag}
              </span>
            ))}
            {repo && (
              <span className="flex items-center gap-0.5 text-[9px] text-muted-foreground">
                <IconStar size={9} className="text-yellow-500" />
                {repo.stars}
              </span>
            )}
          </div>
        </div>
      </motion.a>
    )
  }

  return (
    <motion.a
      variants={itemVariants}
      href={repo?.url || fallbackUrl}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`col-span-2 p-4 rounded-2xl bg-card border border-border ${colors.border} transition-all duration-300 group relative overflow-hidden`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
      <div className="relative z-10 flex items-start gap-3">
        <motion.div
          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colors.iconBg} border ${colors.iconBorder} flex items-center justify-center shrink-0`}
          whileHover={{ rotate: color === 'accent' ? -5 : 5 }}
        >
          {icon}
        </motion.div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold tracking-tight">{repo?.name || fallbackUrl.split('/').pop()}</h2>
              {repo && (
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-0.5">
                    <IconStar size={10} className="text-yellow-500" />
                    {repo.stars}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <IconGitFork size={10} />
                    {repo.forks}
                  </span>
                </div>
              )}
            </div>
            <IconArrowUpRight size={14} className="text-muted-foreground group-hover:text-current group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
          <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
            {repo?.description || fallbackDescription}
          </p>
          <div className="mt-2 flex items-center gap-1.5 flex-wrap">
            {repo?.language && (
              <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${colors.tag} text-[10px] font-medium`}>
                <span className={`w-1.5 h-1.5 rounded-full ${languageColors[repo.language] || 'bg-gray-500'}`} />
                {repo.language}
              </span>
            )}
            {repo?.topics?.slice(0, 2).map(topic => (
              <span key={topic} className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px] font-medium">
                {topic}
              </span>
            ))}
            {!repo && fallbackTags.map(tag => (
              <span key={tag} className={`px-2 py-0.5 rounded-full ${colors.tag} text-[10px] font-medium`}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.a>
  )
}
