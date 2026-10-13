import {
  BrandMark,
  FEATURED_TOOLS,
  GITHUB_ORG_URL,
  PRINCIPLES,
  recentActivity,
  repoFor,
  STATUS_LABEL,
  ThemeToggle,
  toolLinks,
  Wordmark,
} from '@/components/site'
import type { VariantProps } from '@/types'

const entryNumber = (index: number) => `E-${String(index + 1).padStart(2, '0')}`

export function FieldNotesVariant({ data, theme, onToggleTheme, expression }: VariantProps) {
  const changelog = recentActivity(data).slice(0, 6)

  return (
    <div className="min-h-dvh">
      <header className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-6 font-mono text-sm sm:px-8">
        <span>netko · field notes</span>
        <a className="ml-auto underline decoration-line underline-offset-4" href={GITHUB_ORG_URL}>
          github ↗
        </a>
        <ThemeToggle onToggle={onToggleTheme} theme={theme} />
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pt-16 pb-24 sm:px-8 md:grid-cols-[1fr_auto] md:pt-28">
        <h1 className="max-w-[16ch] font-bold text-5xl leading-[1.08] tracking-tight sm:text-7xl">
          We hack on language models for fun, and ship the tools that fall out.
        </h1>
        <BrandMark
          className="w-40 md:w-56"
          expression={expression}
          isBlinking={expression === 'idle'}
          size={224}
        />
      </section>

      <section className="border-line border-y">
        <div className="mx-auto flex max-w-6xl snap-x overflow-x-auto sm:px-8">
          {PRINCIPLES.map((principle, index) => (
            <div
              className="min-w-[78%] snap-start border-line border-r px-5 py-10 last:border-r-0 sm:min-w-0 sm:flex-1 sm:px-8"
              key={principle.name}
            >
              <p className="font-mono text-muted text-sm">0{index + 1}</p>
              <h2 className="mt-6 font-mono text-3xl">{principle.name}</h2>
              <p className="mt-4 max-w-[30ch] text-lg text-muted leading-relaxed">
                {principle.line}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <p className="font-mono text-muted text-sm">experiments index</p>
        <ol className="mt-8 border-line border-t">
          {FEATURED_TOOLS.map((tool, index) => {
            const repo = repoFor(tool, data.repos)
            return (
              <li
                className="group grid gap-2 border-line border-b py-6 md:grid-cols-[5rem_minmax(0,1fr)_minmax(0,1.4fr)_10rem] md:items-baseline md:gap-8"
                key={tool.name}
              >
                <span className="font-mono text-muted text-sm">{entryNumber(index)}</span>
                <h3 className="font-mono text-3xl transition-colors group-hover:text-sakura">
                  {tool.name}
                </h3>
                <p className="text-muted">
                  <span className="font-bold text-fg">{tool.tagline}</span> {tool.description}
                </p>
                <p className="flex flex-col gap-1 font-mono text-xs md:items-end">
                  <span className="text-muted">
                    {STATUS_LABEL[tool.status]}
                    {repo ? ` · ${repo.pushedAt.slice(0, 10)}` : ''}
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
                </p>
              </li>
            )
          })}
        </ol>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-24 sm:px-8 md:grid-cols-[1fr_2fr]">
        <div>
          <p className="font-mono text-muted text-sm">changelog</p>
          <p className="mt-4 max-w-[24ch] text-2xl leading-snug">
            Latest pushes across the org, straight from GitHub.
          </p>
        </div>
        <ul className="font-mono text-sm">
          {changelog.map((repo) => (
            <li className="flex gap-6 border-line border-b py-3" key={repo.name}>
              <time className="shrink-0 text-muted" dateTime={repo.pushedAt}>
                {repo.pushedAt.slice(0, 10)}
              </time>
              <a className="truncate underline decoration-line underline-offset-4" href={repo.url}>
                {repo.name}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <footer className="overflow-hidden px-3 pb-6">
        <Wordmark className="block w-full [&_svg]:h-auto [&_svg]:w-full" width={1400} />
        <p className="mt-4 flex justify-between px-2 font-mono text-muted text-xs">
          <span>© 2026 Netko Labs</span>
          <span>netko.dev</span>
        </p>
      </footer>
    </div>
  )
}
