import { latestPush, timeAgo } from '@/lib/format'
import type { StatusStripProps } from '@/types'
import { PixelMark } from './brand-art'

function statusText({ data, isLoading, hasError, toolCount }: StatusStripProps) {
  if (isLoading) return 'fetching github…'
  const lastPush = latestPush(data.repos.map((repo) => repo.pushedAt))
  const facts = [
    `${toolCount} tools`,
    `${data.publicRepos} public repos`,
    `★ ${data.totalStars}`,
    lastPush ? `last push ${timeAgo(lastPush)}` : null,
  ].filter(Boolean)
  const source = hasError
    ? `github unreachable, showing a snapshot from ${data.fetchedAt.slice(0, 10)}`
    : 'live from github'
  return [...facts, source].join(' · ')
}

export function StatusStrip(props: StatusStripProps) {
  return (
    <div className="border-line border-y">
      <p
        aria-live="polite"
        className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-3 font-mono text-muted text-xs sm:px-8 sm:text-sm"
      >
        <PixelMark className="shrink-0" size={16} />
        <span>{statusText(props)}</span>
      </p>
    </div>
  )
}
