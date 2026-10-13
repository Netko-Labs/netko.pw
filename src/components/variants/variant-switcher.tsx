import type { VariantSwitcherProps } from '@/types'

export function VariantSwitcher({ current, variants }: VariantSwitcherProps) {
  return (
    <nav
      aria-label="Layout variants"
      className="fixed right-3 bottom-3 z-50 flex items-center gap-1 rounded-brand border border-line bg-surface/95 p-1 font-mono text-xs shadow-lg backdrop-blur"
    >
      {variants.map((variant) => (
        <a
          aria-current={variant.id === current ? 'page' : undefined}
          className={`rounded-[3px] px-2 py-1 ${variant.id === current ? 'bg-fg text-bg' : 'hover:bg-line'}`}
          href={`?v=${variant.id}`}
          key={variant.id}
          title={variant.name}
        >
          v{variant.id}
        </a>
      ))}
    </nav>
  )
}
