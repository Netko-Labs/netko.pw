import type { SectionHeadProps } from '@/types'

export function SectionHead({ path, title, lede }: SectionHeadProps) {
  return (
    <header className="max-w-2xl">
      <p className="font-mono text-muted text-sm">
        netko.dev/<span className="text-fg">{path}</span>
        <span aria-hidden className="text-sakura">
          _
        </span>
      </p>
      <h2 className="mt-3 font-mono text-4xl leading-[1.05] tracking-tight sm:text-5xl">{title}</h2>
      <p className="mt-4 text-lg text-muted">{lede}</p>
    </header>
  )
}
