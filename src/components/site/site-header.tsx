import type { ThemeToggleProps } from '@/types'

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const next = theme === 'dark' ? 'light' : 'dark'
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
