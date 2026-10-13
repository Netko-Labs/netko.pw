import {
  ANCHOR,
  BrandMark,
  FEATURED_TOOLS,
  GITHUB_ORG_URL,
  PixelMark,
  PRINCIPLES,
  recentActivity,
  repoFor,
  SiteFooter,
  StatusBadge,
  ThemeToggle,
  toolLinks,
  Wordmark,
} from '@/components/site'
import { BRAND } from '@/generated/brand-art'
import { daysSince, timeAgo } from '@/lib/format'
import type { FeaturedTool, RepoData, VariantProps } from '@/types'
import { FlapCounter, Ticker } from './lab-ops-parts'

const TILE_SPAN = [
  'lg:col-span-2 lg:row-span-2',
  'lg:col-span-2',
  '',
  '',
  'lg:col-span-2',
  'lg:col-span-2',
]

function byActivity(repos: RepoData[]) {
  const pushedAt = (tool: FeaturedTool) => repoFor(tool, repos)?.pushedAt ?? ''
  return [...FEATURED_TOOLS].sort((a, b) => pushedAt(b).localeCompare(pushedAt(a)))
}

export function LabOpsVariant({ data, theme, onToggleTheme, expression, isLoading }: VariantProps) {
  const activity = recentActivity(data)
  const lastPush = activity[0]?.pushedAt
  const counters = [
    { label: 'tools shipped', value: FEATURED_TOOLS.length },
    { label: 'public repos', value: data.publicRepos },
    { label: 'stars', value: data.totalStars },
    { label: 'days since a push', value: lastPush ? daysSince(lastPush) : 0 },
  ]

  return (
    <div className="min-h-dvh">
      <Ticker repos={activity} />
      <header className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-4 font-mono text-sm sm:px-8">
        <PixelMark size={32} />
        <span>netko/ops</span>
        <span className="ml-auto hidden text-muted sm:inline">
          sysop: term · {isLoading ? 'syncing' : 'online'}
        </span>
        <a className="underline decoration-line underline-offset-4" href={GITHUB_ORG_URL}>
          github ↗
        </a>
        <ThemeToggle onToggle={onToggleTheme} theme={theme} />
      </header>

      <section className="mx-auto grid max-w-7xl items-end gap-8 px-5 pt-10 pb-8 sm:px-8 lg:grid-cols-[1fr_auto]">
        <div>
          <Wordmark
            className="block w-full max-w-[640px] [&_svg]:h-auto [&_svg]:w-full"
            width={640}
          />
          <p className="mt-6 max-w-xl text-2xl leading-snug">{BRAND.tagline}</p>
        </div>
        <div className="flex items-end gap-4">
          <div className="text-right font-mono text-muted text-xs leading-relaxed">
            <p>face: {expression}</p>
            <p>repos: {data.repos.length}</p>
          </div>
          <BrandMark className="w-28" expression={expression} isBlinking size={112} />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-5 sm:px-8 lg:grid-cols-4">
        {counters.map((counter) => (
          <FlapCounter key={counter.label} {...counter} />
        ))}
      </section>

      <section
        className="mx-auto grid max-w-7xl auto-rows-[minmax(11rem,auto)] gap-3 px-5 py-10 sm:px-8 md:grid-cols-2 lg:grid-cols-4"
        id={ANCHOR.tools}
      >
        {byActivity(data.repos).map((tool, index) => {
          const repo = repoFor(tool, data.repos)
          return (
            <article
              className={`group flex flex-col rounded-brand border border-line bg-surface p-5 transition-colors hover:border-sakura ${TILE_SPAN[index] ?? ''}`}
              key={tool.name}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className={`font-mono ${index === 0 ? 'text-5xl' : 'text-2xl'}`}>
                  {tool.name}
                </h3>
                <StatusBadge status={tool.status} />
              </div>
              <p className={`mt-3 font-bold leading-snug ${index === 0 ? 'text-2xl' : ''}`}>
                {tool.tagline}
              </p>
              {index === 0 ? <p className="mt-3 max-w-md text-muted">{tool.description}</p> : null}
              <div className="mt-auto flex flex-wrap items-end justify-between gap-2 pt-5 font-mono text-xs">
                <span className="text-muted">
                  {repo ? `pushed ${timeAgo(repo.pushedAt)} · ★ ${repo.stars}` : 'private'}
                </span>
                <span className="flex gap-3">
                  {toolLinks(tool).map((link) => (
                    <a
                      className="underline decoration-line underline-offset-4 hover:decoration-sakura"
                      href={link.href}
                      key={link.kind}
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </span>
              </div>
            </article>
          )
        })}
      </section>

      <section className="mx-auto grid max-w-7xl gap-3 px-5 pb-16 sm:px-8 lg:grid-cols-[3fr_2fr]">
        <div className="rounded-brand border border-line bg-surface p-5">
          <p className="font-mono text-muted text-xs">tail -f activity.log</p>
          <ul className="mt-4 space-y-2 font-mono text-sm">
            {activity.slice(0, 8).map((repo) => (
              <li className="flex gap-4" key={repo.name}>
                <span className="w-24 shrink-0 text-muted">{timeAgo(repo.pushedAt)}</span>
                <span className="text-matcha">push</span>
                <span className="truncate">{repo.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-brand bg-sumi p-5 font-mono text-kami text-sm">
          <p className="text-fog text-xs">cat ~/.netkorc</p>
          {PRINCIPLES.map((principle) => (
            <p className="mt-4" key={principle.name}>
              <span className="text-sakura">{principle.name}</span> = true
              <span className="mt-1 block text-fog text-xs"># {principle.line}</span>
            </p>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  )
}
