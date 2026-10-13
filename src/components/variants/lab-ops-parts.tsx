import { timeAgo } from '@/lib/format'
import type { FlapCounterProps, TickerProps } from '@/types'

const FLAP_WIDTH = 3

export function FlapCounter({ label, value }: FlapCounterProps) {
  const digits = String(Math.min(value, 999)).padStart(FLAP_WIDTH, '0').split('')
  return (
    <div className="rounded-brand border border-line bg-surface p-4">
      <div aria-hidden className="flex gap-1.5">
        {digits.map((digit, index) => (
          <span
            className="flap"
            key={`${label}-${index}`}
            style={{ animationDelay: `${index * 90 + 200}ms` }}
          >
            {digit}
          </span>
        ))}
      </div>
      <p className="mt-3 font-mono text-muted text-xs">
        <span className="sr-only">{value} </span>
        {label}
      </p>
    </div>
  )
}

export function Ticker({ repos }: TickerProps) {
  const items = repos.map(
    (repo) => `${repo.name} ★${repo.stars} · pushed ${timeAgo(repo.pushedAt)}`,
  )
  return (
    <div className="overflow-hidden border-line border-b bg-sumi text-kami">
      <div className="ticker flex w-max gap-10 py-2 font-mono text-xs">
        {[...items, ...items].map((item, index) => (
          <span
            aria-hidden={index >= items.length}
            className="whitespace-nowrap"
            key={`${item}-${index}`}
          >
            <span className="text-sakura">▪</span> {item}
          </span>
        ))}
      </div>
    </div>
  )
}
