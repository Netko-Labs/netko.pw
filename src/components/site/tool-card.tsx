import { trackEvent } from '@/hooks/use-umami'
import { timeAgo } from '@/lib/format'
import type { StatusBadgeProps, ToolCardProps } from '@/types'
import { toolLinks } from './data'
import { STATUS_LABEL } from './featured'

const STATUS_DOT = {
  'open-source': 'bg-matcha',
  live: 'bg-sakura',
  building: 'bg-fog',
} as const

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className="flex shrink-0 items-center gap-1.5 font-mono text-muted text-xs">
      <span className={`size-2 ${STATUS_DOT[status]}`} />
      {STATUS_LABEL[status]}
    </span>
  )
}

export function ToolCard({ tool, repo }: ToolCardProps) {
  const links = toolLinks(tool)
  return (
    <article className="group flex flex-col rounded-brand border border-line bg-surface p-6 transition-colors hover:border-sakura">
      <header className="flex items-baseline justify-between gap-4">
        <h3 className="font-mono text-2xl">
          <span aria-hidden className="mr-2 text-muted transition-colors group-hover:text-sakura">
            &gt;
          </span>
          {tool.name}
        </h3>
        <StatusBadge status={tool.status} />
      </header>
      <p className="mt-4 font-bold text-lg leading-snug">{tool.tagline}</p>
      <p className="mt-2 text-[15px] text-muted leading-relaxed">{tool.description}</p>
      <p className="mt-4 font-mono text-muted text-xs">{tool.stack.join(' · ')}</p>
      <footer className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6 font-mono text-sm">
        <span className="text-muted text-xs">
          {repo ? `★ ${repo.stars} · pushed ${timeAgo(repo.pushedAt)}` : 'private repo'}
        </span>
        <span className="flex gap-4">
          {links.map((link) => (
            <a
              className="underline decoration-line underline-offset-4 hover:decoration-sakura"
              href={link.href}
              key={link.kind}
              onClick={() => trackEvent('tool-link', { tool: tool.name, kind: link.kind })}
              rel="noreferrer"
              target="_blank"
            >
              {link.label} ↗
            </a>
          ))}
        </span>
      </footer>
    </article>
  )
}
