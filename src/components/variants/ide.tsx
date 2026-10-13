import { useState } from 'react'
import {
  BrandMark,
  FEATURED_TOOLS,
  otherRepos,
  PRINCIPLES,
  repoFor,
  StatusBadge,
  ThemeToggle,
  toolLinks,
  Wordmark,
} from '@/components/site'
import { BRAND } from '@/generated/brand-art'
import { timeAgo } from '@/lib/format'
import type { ExpressionKey, IdeFile, IdePaneProps, VariantProps } from '@/types'
import { IdeTerminal } from './ide-terminal'

const toolPath = (name: string) => `tools/${name.toLowerCase()}.md`

const FILES: IdeFile[] = [
  { path: 'README.md', label: 'README.md', depth: 0 },
  { path: 'tools/', label: 'tools/', depth: 0 },
  ...FEATURED_TOOLS.map((tool) => ({
    path: toolPath(tool.name),
    label: `${tool.name.toLowerCase()}.md`,
    depth: 1,
  })),
  { path: 'repos.md', label: 'repos.md', depth: 0 },
  { path: 'principles.md', label: 'principles.md', depth: 0 },
]

const OPENABLE = FILES.filter((file) => file.path.endsWith('.md'))

function IdePane({ path, data, expression }: IdePaneProps) {
  const tool = FEATURED_TOOLS.find((item) => toolPath(item.name) === path)
  if (tool) {
    const repo = repoFor(tool, data.repos)
    return (
      <article className="max-w-2xl">
        <p className="font-mono text-muted text-sm"># {tool.name}</p>
        <h1 className="mt-2 font-mono text-4xl">{tool.tagline}</h1>
        <div className="mt-4">
          <StatusBadge status={tool.status} />
        </div>
        <p className="mt-6 text-lg leading-relaxed">{tool.description}</p>
        <p className="mt-6 font-mono text-muted text-sm">stack: {tool.stack.join(' · ')}</p>
        {repo ? (
          <p className="mt-1 font-mono text-muted text-sm">
            ★ {repo.stars} · pushed {timeAgo(repo.pushedAt)}
          </p>
        ) : null}
        <p className="mt-6 flex gap-4 font-mono text-sm">
          {toolLinks(tool).map((link) => (
            <a
              className="underline decoration-sakura underline-offset-4"
              href={link.href}
              key={link.kind}
            >
              {link.label} ↗
            </a>
          ))}
        </p>
      </article>
    )
  }
  if (path === 'repos.md') {
    return (
      <article className="max-w-2xl font-mono text-sm">
        <p className="text-muted"># everything else</p>
        <ul className="mt-6 space-y-3">
          {otherRepos(data.repos).map((repo) => (
            <li key={repo.name}>
              -{' '}
              <a className="underline decoration-line underline-offset-4" href={repo.url}>
                {repo.name}
              </a>
              <span className="block pl-3 font-sans text-muted">
                {repo.description ?? 'No description yet.'}
              </span>
            </li>
          ))}
        </ul>
      </article>
    )
  }
  if (path === 'principles.md') {
    return (
      <article className="max-w-2xl">
        <p className="font-mono text-muted text-sm"># how we build</p>
        {PRINCIPLES.map((principle) => (
          <section className="mt-6" key={principle.name}>
            <h2 className="font-mono text-2xl">## {principle.name}</h2>
            <p className="mt-2 text-lg text-muted">{principle.line}</p>
          </section>
        ))}
      </article>
    )
  }
  return (
    <article className="grid max-w-3xl items-center gap-8 md:grid-cols-[auto_1fr]">
      <BrandMark
        className="mx-auto w-40"
        expression={expression}
        isBlinking={expression === 'idle'}
        size={160}
      />
      <div>
        <Wordmark
          className="block w-full max-w-[360px] [&_svg]:h-auto [&_svg]:w-full"
          width={360}
        />
        <p className="mt-5 text-2xl leading-snug">{BRAND.tagline}</p>
        <p className="mt-4 font-mono text-muted text-sm">
          open a file on the left, or type <span className="text-fg">help</span> below.
        </p>
      </div>
    </article>
  )
}

export function IdeVariant({ data, theme, onToggleTheme, expression }: VariantProps) {
  const [openPath, setOpenPath] = useState('README.md')
  const [petFace, setPetFace] = useState<ExpressionKey | null>(null)

  const pet = () => {
    setPetFace('happy')
    window.setTimeout(() => setPetFace(null), 1600)
  }

  return (
    <div className="flex h-dvh flex-col p-2 sm:p-4">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-brand border border-line bg-surface">
        <header className="flex items-center gap-3 border-line border-b px-4 py-2 font-mono text-xs">
          <span aria-hidden className="flex gap-1.5">
            <i className="size-2.5 bg-sakura" />
            <i className="size-2.5 bg-fog" />
            <i className="size-2.5 bg-matcha" />
          </span>
          <span className="text-muted">~/netko/{openPath}</span>
          <span className="ml-auto">
            <ThemeToggle onToggle={onToggleTheme} theme={theme} />
          </span>
        </header>
        <div className="grid min-h-0 flex-1 md:grid-cols-[220px_1fr]">
          <nav
            aria-label="Files"
            className="flex gap-1 overflow-x-auto border-line border-b p-3 font-mono text-sm md:flex-col md:border-r md:border-b-0"
          >
            {FILES.map((file) =>
              file.path.endsWith('/') ? (
                <span className="hidden px-2 py-1 text-muted md:block" key={file.path}>
                  {file.label}
                </span>
              ) : (
                <button
                  className={`whitespace-nowrap rounded-[3px] px-2 py-1 text-left ${file.depth ? 'md:ml-4' : ''} ${openPath === file.path ? 'bg-fg text-bg' : 'hover:bg-line'}`}
                  key={file.path}
                  onClick={() => setOpenPath(file.path)}
                  type="button"
                >
                  {file.label}
                </button>
              ),
            )}
          </nav>
          <main className="min-h-0 overflow-y-auto p-6 sm:p-10">
            <IdePane data={data} expression={petFace ?? expression} path={openPath} />
          </main>
        </div>
        <div className="h-48 shrink-0 border-line border-t sm:h-56">
          <IdeTerminal
            files={OPENABLE}
            onOpen={setOpenPath}
            onPet={pet}
            onToggleTheme={onToggleTheme}
          />
        </div>
        <footer className="flex gap-4 border-line border-t bg-sumi px-4 py-1 font-mono text-[11px] text-fog">
          <span>⎇ main</span>
          <span>
            {data.repos.length} repos · ★ {data.totalStars}
          </span>
          <span className="ml-auto">netko.dev</span>
        </footer>
      </div>
    </div>
  )
}
