import { useState } from 'react'
import {
  FEATURED_TOOLS,
  GITHUB_ORG_URL,
  otherRepos,
  PixelMark,
  recentActivity,
  SiteFooter,
  ThemeToggle,
  toolLinks,
  Wordmark,
} from '@/components/site'
import { BRAND } from '@/generated/brand-art'
import type { BuildingFloor, FeaturedTool, VariantProps } from '@/types'

const FLOOR_PX = 72

const ROOMS: Record<string, Omit<BuildingFloor, 'tool'>> = {
  nukk: { level: 'R', room: 'arcade', scene: '[o] [o]  :D' },
  Washi: { level: '5F', room: 'library', scene: '|||| |||| _/' },
  CodeWhiskers: { level: '4F', room: 'review room', scene: '[+] [-] [?]' },
  Anko: { level: '3F', room: 'vault', scene: '[$] [$] [$]' },
  mirin: { level: '2F', room: 'workshop', scene: '{=} <> {=}' },
  mizu: { level: 'B1', room: 'server closet', scene: '|=| |=| ~~' },
}

const FLOORS: BuildingFloor[] = ['nukk', 'Washi', 'CodeWhiskers', 'Anko', 'mirin', 'mizu'].map(
  (name) => ({
    ...ROOMS[name],
    tool: FEATURED_TOOLS.find((tool) => tool.name === name) as FeaturedTool,
  }),
)

const shelfId = (tool: FeaturedTool) => `shelf-${tool.name.toLowerCase()}`

export function BuildingVariant({ data, theme, onToggleTheme }: VariantProps) {
  const [activeFloor, setActiveFloor] = useState(4)

  return (
    <div className="min-h-dvh">
      <header className="mx-auto flex max-w-6xl items-center gap-5 px-5 py-5 font-mono text-sm sm:px-8">
        <PixelMark size={32} />
        <span>
          netko lab<span className="hidden sm:inline"> · building directory</span>
        </span>
        <a className="ml-auto underline decoration-line underline-offset-4" href={GITHUB_ORG_URL}>
          github ↗
        </a>
        <ThemeToggle onToggle={onToggleTheme} theme={theme} />
      </header>

      <section className="mx-auto grid max-w-6xl items-end gap-12 px-5 pt-10 pb-20 sm:px-8 grid-cols-[minmax(0,1fr)] md:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        <div className="relative pl-14">
          <div
            aria-hidden
            className="absolute top-0 left-0 w-10 border-line border-r-2 border-dashed"
            style={{ height: FLOORS.length * FLOOR_PX + 28 }}
          />
          <div aria-hidden className="mx-6 flex h-7 items-end justify-center gap-1">
            {[3, 5, 7, 5, 3].map((height, index) => (
              <span
                className="w-6 bg-fg"
                key={`${height}-${index}`}
                style={{ height: height * 3 }}
              />
            ))}
          </div>
          <ol className="overflow-hidden rounded-brand border-2 border-fg">
            {FLOORS.map((floor, index) => (
              <li key={floor.tool.name}>
                <a
                  className={`flex items-center gap-4 border-fg border-b-2 px-4 font-mono transition-colors last:border-b-0 ${activeFloor === index ? 'bg-fg text-bg' : 'bg-surface'}`}
                  href={`#${shelfId(floor.tool)}`}
                  onFocus={() => setActiveFloor(index)}
                  onMouseEnter={() => setActiveFloor(index)}
                  style={{ height: FLOOR_PX }}
                >
                  <span className="w-7 text-xs opacity-70">{floor.level}</span>
                  <span aria-hidden className="flex gap-1">
                    {[0, 1, 2].map((window) => (
                      <i
                        className={`size-3 ${activeFloor === index ? 'bg-sakura' : 'bg-line'}`}
                        key={window}
                      />
                    ))}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate">{floor.tool.name}</span>
                    <span className="block truncate text-xs opacity-70">
                      {floor.room} {floor.scene}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
          <div
            aria-hidden
            className="mt-1 h-2 bg-[repeating-linear-gradient(90deg,var(--fg)_0_12px,transparent_12px_20px)]"
          />
          <span
            aria-hidden
            className="absolute left-0 transition-transform duration-500 ease-out"
            style={{ top: 0, transform: `translateY(${28 + activeFloor * FLOOR_PX + 16}px)` }}
          >
            <PixelMark size={40} />
          </span>
        </div>

        <div className="pb-6">
          <Wordmark
            className="block w-full max-w-[480px] [&_svg]:h-auto [&_svg]:w-full"
            width={480}
          />
          <p className="mt-6 max-w-md text-2xl leading-snug">{BRAND.tagline}</p>
          <p className="mt-4 font-mono text-muted text-sm">
            one floor per tool. hover a floor and term takes the stairs. click to visit.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <p className="font-mono text-muted text-sm">[ TOOLS ]</p>
        <div className="mt-8 space-y-6">
          {FLOORS.map((floor, index) => (
            <article
              className={`grid scroll-mt-8 items-center gap-6 md:grid-cols-2 ${index % 2 ? 'md:[&>*:first-child]:order-2' : ''}`}
              id={shelfId(floor.tool)}
              key={floor.tool.name}
            >
              <div className="dither grid aspect-[16/9] place-items-center rounded-brand border border-line">
                <span className="bg-bg px-4 py-1 font-mono text-4xl sm:text-5xl">
                  {floor.tool.name}
                </span>
              </div>
              <div>
                <p className="font-mono text-muted text-xs">
                  {floor.level} · {floor.room}
                </p>
                <h3 className="mt-2 font-bold text-2xl">{floor.tool.tagline}</h3>
                <p className="mt-3 text-muted leading-relaxed">{floor.tool.description}</p>
                <p className="mt-4 flex gap-4 font-mono text-sm">
                  {toolLinks(floor.tool).map((link) => (
                    <a
                      className="underline decoration-sakura underline-offset-4"
                      href={link.href}
                      key={link.kind}
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <p className="font-mono text-muted text-sm">[ RECENT PUSHES ]</p>
        <div className="mt-6 flex flex-wrap gap-2 font-mono text-xs">
          {recentActivity(data)
            .slice(0, 6)
            .map((repo) => (
              <span className="rounded-brand border border-line px-3 py-1.5" key={repo.name}>
                {repo.name} <span className="text-muted">· {repo.pushedAt.slice(0, 10)}</span>
              </span>
            ))}
        </div>
        <p className="mt-14 font-mono text-muted text-sm">[ OPEN SOURCE, EVERYTHING ELSE ]</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {otherRepos(data.repos).map((repo) => (
            <a
              className="rounded-brand border border-line bg-surface p-4 hover:border-sakura"
              href={repo.url}
              key={repo.name}
            >
              <span className="font-mono">{repo.name}</span>
              <span className="mt-1 block text-muted text-sm">
                {repo.description ?? 'No description yet.'}
              </span>
            </a>
          ))}
        </div>
      </section>
      <div
        aria-hidden
        className="h-3 bg-[repeating-linear-gradient(90deg,var(--line)_0_24px,transparent_24px_36px)]"
      />
      <SiteFooter />
    </div>
  )
}
