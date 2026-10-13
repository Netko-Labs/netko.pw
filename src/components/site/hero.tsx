import { useState } from 'react'
import { BRAND } from '@/generated/brand-art'
import { useTypewriter } from '@/hooks/use-typewriter'
import type { ExpressionKey, HeroProps } from '@/types'
import { ANCHOR, toHash } from './anchors'
import { BrandMark, Wordmark } from './brand-art'
import { GITHUB_ORG_URL } from './featured'

const PET_MS = 1600

export function Hero({ expression }: HeroProps) {
  const [petExpression, setPetExpression] = useState<ExpressionKey | null>(null)
  const { typed, isDone } = useTypewriter(BRAND.tagline)

  const petTheCat = () => {
    setPetExpression('happy')
    window.setTimeout(() => setPetExpression(null), PET_MS)
  }

  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pt-14 pb-16 sm:px-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16 md:pt-24 md:pb-24">
      <button
        aria-label="Pet the cat"
        className="group mx-auto w-full max-w-[220px] cursor-pointer md:max-w-[380px]"
        onClick={petTheCat}
        title="pet the cat"
        type="button"
      >
        <BrandMark
          className="block w-full transition-transform duration-200 group-active:scale-[0.97] [&_svg]:h-auto [&_svg]:w-full"
          expression={petExpression ?? expression}
          isBlinking={!petExpression && expression === 'idle'}
          size={380}
        />
      </button>

      <div>
        <h1 className="sr-only">netko: {BRAND.tagline}</h1>
        <Wordmark
          className="block w-full max-w-[520px] [&_svg]:h-auto [&_svg]:w-full"
          width={520}
        />

        <div aria-hidden className="mt-10 space-y-3">
          <p className="font-mono text-muted text-sm">
            <span className="text-sakura">&gt;</span> what is netko?
          </p>
          <p className="min-h-[2.6em] max-w-[24ch] text-2xl leading-snug sm:text-3xl">
            {typed}
            <span className={`caret ${isDone ? 'is-idle' : ''}`} />
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 font-mono text-sm">
          <a
            className="rounded-brand bg-fg px-4 py-2.5 text-bg transition-opacity hover:opacity-85"
            href={toHash(ANCHOR.tools)}
          >
            browse tools ↓
          </a>
          <a
            className="rounded-brand border border-line px-4 py-2.5 transition-colors hover:border-sakura"
            href={GITHUB_ORG_URL}
            rel="noreferrer"
            target="_blank"
          >
            github.com/Netko-Labs ↗
          </a>
        </div>
      </div>
    </section>
  )
}
