import { timeAgo } from '@/lib/format'
import type { RepoListProps, ToolsSectionProps } from '@/types'
import { ANCHOR } from './anchors'
import { FEATURED_REPOS, FEATURED_TOOLS, HIDDEN_REPOS } from './featured'
import { SectionHead } from './section-head'
import { ToolCard } from './tool-card'

const PRINCIPLES = [
  {
    name: 'curious',
    line: 'We poke at models to see what they really do, then build the tool we wished existed.',
  },
  {
    name: 'playful',
    line: 'Fun is the reason we start. The cat walks across the keyboard sometimes, and we keep the good typos.',
  },
  {
    name: 'precise',
    line: 'Fun is no excuse for flaky. Typed end to end, documented, shipped one commit at a time.',
  },
]

export function ToolsSection({ repos }: ToolsSectionProps) {
  const repoByName = new Map(repos.map((repo) => [repo.name.toLowerCase(), repo]))
  return (
    <section className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8" id={ANCHOR.tools}>
      <SectionHead
        lede="Things we built because we wanted them. Most started as a weekend poke at a model."
        path="tools"
        title="The tools"
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {FEATURED_TOOLS.map((tool) => (
          <ToolCard
            key={tool.name}
            repo={tool.repo ? repoByName.get(tool.repo.toLowerCase()) : undefined}
            tool={tool}
          />
        ))}
      </div>
    </section>
  )
}

export function RepoList({ repos }: RepoListProps) {
  const rest = repos
    .filter((repo) => !repo.fork && !repo.archived)
    .filter((repo) => !FEATURED_REPOS.has(repo.name.toLowerCase()))
    .filter((repo) => !HIDDEN_REPOS.has(repo.name))
    .sort((a, b) => b.pushedAt.localeCompare(a.pushedAt))

  return (
    <section className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8" id={ANCHOR.repos}>
      <SectionHead
        lede="Templates, adapters and experiments, pulled live from the org."
        path="repos"
        title="Everything else"
      />
      <ul className="mt-10 border-line border-t">
        {rest.map((repo) => (
          <li
            className="grid gap-1 border-line border-b py-4 sm:grid-cols-[minmax(0,20rem)_minmax(0,1fr)_auto] sm:items-baseline sm:gap-6"
            key={repo.name}
          >
            <a
              className="break-all font-mono underline decoration-line underline-offset-4 hover:decoration-sakura"
              href={repo.url}
              rel="noreferrer"
              target="_blank"
            >
              {repo.name}
            </a>
            <span className="text-[15px] text-muted">
              {repo.description ?? 'No description yet.'}
            </span>
            <span className="font-mono text-muted text-xs">
              {[repo.language, `★ ${repo.stars}`, timeAgo(repo.pushedAt)]
                .filter(Boolean)
                .join(' · ')}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function Principles() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <SectionHead
        lede="A lab, not a company. Three rules decide what ships."
        path="how"
        title="How we build"
      />
      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {PRINCIPLES.map((principle) => (
          <div className="border-sakura border-l-2 pl-5" key={principle.name}>
            <h3 className="font-mono text-xl">{principle.name}</h3>
            <p className="mt-2 text-muted leading-relaxed">{principle.line}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
