import { useCallback, useEffect, useState } from 'react'
import type { GitHubData, MainContributor, RepoData } from '@/types'

const ORG_NAME = 'Netko-Labs'
const MAIN_CONTRIBUTOR = 'pejedev'
const CACHE_KEY = 'netko-github-data-v2'
const CACHE_MAX_AGE = 15 * 60 * 1000

interface CachedGitHubData {
  data: GitHubData
  contributor: MainContributor
}

const fallbackRepos: RepoData[] = [
  {
    name: 'Anko',
    description: 'SQL tooling in active development.',
    url: 'https://github.com/Netko-Labs/Anko',
    homepage: null,
    stars: 0,
    forks: 0,
    language: 'TypeScript',
    topics: ['sql', 'developer-tools'],
    archived: false,
    fork: false,
    pushedAt: '2026-07-09T01:16:22Z',
    updatedAt: '2026-07-09T01:16:26Z',
    license: null,
  },
  {
    name: 'mirin',
    description:
      'Build desktop apps with Bun, TypeScript, and Chromium. The Bun-native Electron alternative.',
    url: 'https://github.com/Netko-Labs/mirin',
    homepage: null,
    stars: 0,
    forks: 0,
    language: 'Rust',
    topics: [
      'bun',
      'cef',
      'chromium',
      'desktop',
      'electron-alternative',
      'macos',
      'rust',
      'typescript',
    ],
    archived: false,
    fork: false,
    pushedAt: '2026-07-08T05:23:17Z',
    updatedAt: '2026-07-08T05:23:19Z',
    license: 'MIT',
  },
  {
    name: 'netko.pw',
    description: 'Source for the Netko Labs site.',
    url: 'https://github.com/Netko-Labs/netko.pw',
    homepage: 'https://netko.dev',
    stars: 0,
    forks: 0,
    language: 'TypeScript',
    topics: [],
    archived: false,
    fork: false,
    pushedAt: '2026-04-07T05:17:20Z',
    updatedAt: '2026-06-15T03:53:29Z',
    license: null,
  },
  {
    name: 'mizu',
    description: 'Local-first deployment tooling for a Mac mini homelab.',
    url: 'https://github.com/Netko-Labs/mizu',
    homepage: null,
    stars: 0,
    forks: 0,
    language: 'TypeScript',
    topics: ['macos', 'paas'],
    archived: false,
    fork: false,
    pushedAt: '2026-03-24T05:52:51Z',
    updatedAt: '2026-03-24T05:52:56Z',
    license: null,
  },
  {
    name: '.github',
    description: 'Organization profile and shared GitHub configuration.',
    url: 'https://github.com/Netko-Labs/.github',
    homepage: null,
    stars: 0,
    forks: 0,
    language: null,
    topics: [],
    archived: false,
    fork: false,
    pushedAt: '2026-03-13T01:27:40Z',
    updatedAt: '2026-03-13T01:27:44Z',
    license: null,
  },
  {
    name: 'code-whiskers',
    description:
      'Self-hosted code analysis and error tracking for JavaScript and TypeScript developers.',
    url: 'https://github.com/Netko-Labs/code-whiskers',
    homepage: 'https://whiskers.netko.pw',
    stars: 0,
    forks: 0,
    language: 'TypeScript',
    topics: ['monitoring', 'self-hosted'],
    archived: false,
    fork: false,
    pushedAt: '2024-09-18T04:12:49Z',
    updatedAt: '2026-03-05T04:47:30Z',
    license: 'MIT',
  },
  {
    name: 'trpc-ws-hono-bun-adapter',
    description: 'tRPC WebSocket adapter for Hono and Bun.',
    url: 'https://github.com/Netko-Labs/trpc-ws-hono-bun-adapter',
    homepage: null,
    stars: 0,
    forks: 0,
    language: 'TypeScript',
    topics: ['bun', 'hono', 'trpc'],
    archived: false,
    fork: false,
    pushedAt: '2025-07-13T02:22:26Z',
    updatedAt: '2025-07-13T02:21:51Z',
    license: 'MIT',
  },
]

const fallbackContributor: MainContributor = {
  login: 'PejeDev',
  name: 'Juan Castañeda',
  bio: 'Software Engineer | Game developer',
  avatar: 'https://avatars.githubusercontent.com/u/19750831?v=4',
  location: 'Bogota DC',
  followers: 5,
  publicRepos: 16,
  url: 'https://github.com/PejeDev',
  website: 'https://peje.dev',
}

const fallbackData: GitHubData = {
  organization: {
    name: 'Netko Labs',
    description: 'Netko | Open-source Tools',
    url: 'https://github.com/Netko-Labs',
    publicRepos: 7,
    followers: 1,
  },
  repos: fallbackRepos,
  totalStars: 0,
  publicRepos: 7,
  contributors: [],
  languages: ['TypeScript', 'Rust'],
  fetchedAt: '2026-07-09T15:00:00Z',
  source: 'snapshot',
}

function readCache(): CachedGitHubData | null {
  if (typeof window === 'undefined') return null

  try {
    const rawCache = window.localStorage.getItem(CACHE_KEY)
    if (!rawCache) return null

    const cache = JSON.parse(rawCache) as CachedGitHubData
    const isFresh = Date.now() - Date.parse(cache.data.fetchedAt) < CACHE_MAX_AGE
    if (!isFresh) return null

    return {
      ...cache,
      data: { ...cache.data, source: 'cache' },
    }
  } catch {
    return null
  }
}

function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === 'object' && value !== null ? (value as Record<string, unknown>) : {}
}

function readString(record: Record<string, unknown>, key: string, fallback = '') {
  const value = record[key]
  return typeof value === 'string' ? value : fallback
}

function readNullableString(record: Record<string, unknown>, key: string) {
  const value = record[key]
  return typeof value === 'string' && value.length > 0 ? value : null
}

function readNumber(record: Record<string, unknown>, key: string) {
  const value = record[key]
  return typeof value === 'number' ? value : 0
}

function readBoolean(record: Record<string, unknown>, key: string) {
  return record[key] === true
}

function mapRepository(value: unknown): RepoData {
  const repo = asRecord(value)
  const license = asRecord(repo.license)
  const topics = Array.isArray(repo.topics)
    ? repo.topics.filter((topic): topic is string => typeof topic === 'string')
    : []

  return {
    name: readString(repo, 'name', 'untitled'),
    description: readNullableString(repo, 'description'),
    stars: readNumber(repo, 'stargazers_count'),
    forks: readNumber(repo, 'forks_count'),
    language: readNullableString(repo, 'language'),
    topics,
    url: readString(repo, 'html_url', 'https://github.com/Netko-Labs'),
    homepage: readNullableString(repo, 'homepage'),
    archived: readBoolean(repo, 'archived'),
    fork: readBoolean(repo, 'fork'),
    pushedAt: readString(repo, 'pushed_at', new Date(0).toISOString()),
    updatedAt: readString(repo, 'updated_at', new Date(0).toISOString()),
    license: readNullableString(license, 'spdx_id'),
  }
}

export function useGitHubData() {
  const [initialState] = useState(() => {
    const cached = readCache()
    return {
      data: cached?.data ?? fallbackData,
      contributor: cached?.contributor ?? fallbackContributor,
    }
  })
  const [githubData, setGithubData] = useState<GitHubData>(initialState.data)
  const [mainContributor, setMainContributor] = useState<MainContributor>(initialState.contributor)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchGitHubData() {
      try {
        const headers = { Accept: 'application/vnd.github+json' }
        const [orgRes, reposRes, userRes] = await Promise.all([
          fetch(`https://api.github.com/orgs/${ORG_NAME}`, { headers, signal: controller.signal }),
          fetch(
            `https://api.github.com/orgs/${ORG_NAME}/repos?sort=updated&direction=desc&per_page=100`,
            {
              headers,
              signal: controller.signal,
            },
          ),
          fetch(`https://api.github.com/users/${MAIN_CONTRIBUTOR}`, {
            headers,
            signal: controller.signal,
          }),
        ])

        if (!orgRes.ok || !reposRes.ok || !userRes.ok) {
          throw new Error('GitHub did not return a complete Netko snapshot')
        }

        const org = asRecord((await orgRes.json()) as unknown)
        const reposJson = (await reposRes.json()) as unknown
        const apiRepos = Array.isArray(reposJson) ? reposJson : []
        const user = asRecord((await userRes.json()) as unknown)
        const repos = apiRepos.map(mapRepository).filter((repo) => !repo.fork)
        const languages = [
          ...new Set(repos.flatMap((repo) => (repo.language ? [repo.language] : []))),
        ]
        const fetchedAt = new Date().toISOString()

        const nextData: GitHubData = {
          organization: {
            name: readString(org, 'name', 'Netko Labs'),
            description: readString(org, 'description', 'Open-source tools'),
            url: readString(org, 'html_url', 'https://github.com/Netko-Labs'),
            publicRepos: readNumber(org, 'public_repos'),
            followers: readNumber(org, 'followers'),
          },
          repos,
          totalStars: repos.reduce((total, repo) => total + repo.stars, 0),
          publicRepos: readNumber(org, 'public_repos'),
          contributors: [],
          languages,
          fetchedAt,
          source: 'network',
        }

        const nextContributor: MainContributor = {
          login: readString(user, 'login', 'PejeDev'),
          name: readString(user, 'name', readString(user, 'login', 'PejeDev')),
          bio: readString(user, 'bio', 'Software engineer'),
          avatar: readString(user, 'avatar_url', fallbackContributor.avatar),
          location: readString(user, 'location', 'Bogota DC'),
          followers: readNumber(user, 'followers'),
          publicRepos: readNumber(user, 'public_repos'),
          url: readString(user, 'html_url', fallbackContributor.url),
          website: readString(user, 'blog'),
        }

        setGithubData(nextData)
        setMainContributor(nextContributor)
        window.localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data: nextData, contributor: nextContributor }),
        )
      } catch (caughtError) {
        if (controller.signal.aborted) return
        setError(caughtError instanceof Error ? caughtError : new Error('Unknown GitHub error'))
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    void fetchGitHubData()
    return () => controller.abort()
  }, [])

  const getRepo = useCallback(
    (name: string) =>
      githubData.repos.find((repo) => repo.name.toLowerCase() === name.toLowerCase()),
    [githubData.repos],
  )

  return {
    githubData,
    mainContributor,
    loading,
    error,
    getRepo,
  }
}
