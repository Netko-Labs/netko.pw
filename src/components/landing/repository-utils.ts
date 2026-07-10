import type { RepoData } from '@/types'

const AFTER_HOURS_TOOL_NAMES = [
  'anko',
  'mirin',
  'nukk',
  'mizu',
  'suzagi',
  'trpc-ws-hono-bun-adapter',
] as const

const afterHoursPrivateTools: RepoData[] = [
  {
    name: 'nukk',
    description: 'Pixel-art social game with shared rooms, chat, and furniture.',
    url: 'https://nukk.app',
    homepage: 'https://nukk.app',
    stars: 0,
    forks: 0,
    language: 'TypeScript',
    topics: ['social-game', 'pixel-art'],
    archived: false,
    fork: false,
    pushedAt: '2026-07-10T00:00:00Z',
    updatedAt: '2026-07-10T00:00:00Z',
    license: null,
  },
  {
    name: 'suzagi',
    description: 'A new Netko tool warming up before its public source release.',
    url: 'https://suzagi.dev',
    homepage: 'https://suzagi.dev',
    stars: 0,
    forks: 0,
    language: null,
    topics: ['incubating'],
    archived: false,
    fork: false,
    pushedAt: '2026-07-10T00:00:00Z',
    updatedAt: '2026-07-10T00:00:00Z',
    license: null,
  },
]

const repositoryFallbacks: Record<string, string> = {
  anko: 'SQL tooling in active development.',
  mizu: 'Local-first deployment tooling for a Mac mini homelab.',
  'netko.pw': 'The source for this signal.',
}

export function getDescription(repo: RepoData) {
  return (
    repo.description?.trim() ||
    repositoryFallbacks[repo.name.toLowerCase()] ||
    'Source available. Documentation in progress.'
  )
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'UTC',
  }).format(new Date(date))
}

export function formatMonth(date: string) {
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  })
    .format(new Date(date))
    .toUpperCase()
}

export function getStatus(repo: RepoData) {
  if (repo.archived) return 'archived'

  const ageInDays = (Date.now() - Date.parse(repo.pushedAt)) / 86_400_000
  if (ageInDays <= 30) return 'shipping'
  if (ageInDays <= 180) return 'active'
  if (ageInDays <= 545) return 'quiet'
  return 'cold storage'
}

export function getAfterHoursStatus(repo: RepoData) {
  const name = repo.name.toLowerCase()
  if (name === 'nukk') return 'closed_source'
  if (name === 'suzagi') return 'soon_oss'
  return getStatus(repo)
}

export function getProductRepos(repos: RepoData[]) {
  return [...repos]
    .filter((repo) => repo.name !== '.github')
    .sort((a, b) => Date.parse(b.pushedAt) - Date.parse(a.pushedAt))
}

export function getAfterHoursRepos(repos: RepoData[]) {
  const roster = [...getProductRepos(repos), ...afterHoursPrivateTools].filter(
    (repo) => repo.name.toLowerCase() !== 'netko.pw',
  )

  return AFTER_HOURS_TOOL_NAMES.flatMap((name) => {
    const repo = roster.find((candidate) => candidate.name.toLowerCase() === name)
    return repo ? [repo] : []
  })
}

export function getFeaturedRepo(repos: RepoData[]) {
  const products = getProductRepos(repos)
  return products.find((repo) => repo.name.toLowerCase() === 'mirin') ?? products[0]
}
