import type { SiteHeaderProps, ThemeToggleProps } from '@/types'
import { ANCHOR, toHash } from './anchors'
import { PixelMark, Wordmark } from './brand-art'
import { GITHUB_ORG_URL } from './featured'

const NAV_LINKS = [
  { label: 'tools', href: toHash(ANCHOR.tools) },
  { label: 'repos', href: toHash(ANCHOR.repos) },
]

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const next = theme === 'dark' ? 'kami' : 'sumi'
  return (
    <button
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className="flex items-center gap-2 rounded-brand border border-line px-2.5 py-1.5 font-mono text-xs transition-colors hover:border-sakura"
      onClick={onToggle}
      type="button"
    >
      <span className="size-3 rounded-[2px] border border-line bg-fg" />
      {next}
    </button>
  )
}

export function SiteHeader({ theme, onToggleTheme }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-line border-b bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5 sm:px-8">
        <a aria-label="netko home" className="flex items-center gap-3" href={toHash(ANCHOR.top)}>
          <PixelMark size={32} />
          <Wordmark className="hidden sm:block" width={84} />
        </a>
        <nav aria-label="Main" className="ml-auto flex items-center gap-5 font-mono text-sm">
          {NAV_LINKS.map((link) => (
            <a
              className="hidden decoration-sakura underline-offset-4 hover:underline md:block"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          ))}
          <a
            className="decoration-sakura underline-offset-4 hover:underline"
            href={GITHUB_ORG_URL}
            rel="noreferrer"
            target="_blank"
          >
            github ↗
          </a>
          <ThemeToggle onToggle={onToggleTheme} theme={theme} />
        </nav>
      </div>
    </header>
  )
}
