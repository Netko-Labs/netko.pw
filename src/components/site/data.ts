import type { FeaturedTool, GitHubData, RepoData, ToolLink } from '@/types'
import { FEATURED_REPOS, GITHUB_ORG_URL, HIDDEN_REPOS } from './featured'

export const PRINCIPLES = [
  {
    name: 'curious',
    line: 'We poke at models to see what they really do, then build the tool we wished existed.',
  },
  {
    name: 'playful',
    line: 'Fun is why we start. Tested is when we ship.',
  },
  {
    name: 'precise',
    line: 'Fun is no excuse for flaky. Typed end to end, documented, shipped one commit at a time.',
  },
]

export function otherRepos(repos: RepoData[]) {
  return repos
    .filter((repo) => !repo.fork && !repo.archived)
    .filter((repo) => !FEATURED_REPOS.has(repo.name.toLowerCase()))
    .filter((repo) => !HIDDEN_REPOS.has(repo.name))
    .sort((a, b) => b.pushedAt.localeCompare(a.pushedAt))
}

export function repoFor(tool: FeaturedTool, repos: RepoData[]) {
  if (!tool.repo) return undefined
  const name = tool.repo.toLowerCase()
  return repos.find((repo) => repo.name.toLowerCase() === name)
}

export function toolLinks(tool: FeaturedTool): ToolLink[] {
  return [
    tool.repo ? { label: 'github', href: `${GITHUB_ORG_URL}/${tool.repo}`, kind: 'repo' } : null,
    tool.site ? { label: tool.site.replace('https://', ''), href: tool.site, kind: 'site' } : null,
    tool.docs ? { label: 'docs', href: tool.docs, kind: 'docs' } : null,
  ].filter((link): link is ToolLink => link !== null)
}

export function recentActivity(data: GitHubData) {
  return [...data.repos]
    .filter((repo) => !HIDDEN_REPOS.has(repo.name))
    .sort((a, b) => b.pushedAt.localeCompare(a.pushedAt))
}
