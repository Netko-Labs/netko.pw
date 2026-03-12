import { useEffect, useState } from 'react'
import type { GitHubData, MainContributor, RepoData } from '@/types'

const ORG_NAME = 'Netko-Labs'
const MAIN_CONTRIBUTOR = 'pejedev'

export function useGitHubData() {
  const [githubData, setGithubData] = useState<GitHubData | null>(null)
  const [mainContributor, setMainContributor] = useState<MainContributor | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const [orgRes, reposRes, userRes] = await Promise.all([
          fetch(`https://api.github.com/orgs/${ORG_NAME}`),
          fetch(`https://api.github.com/orgs/${ORG_NAME}/repos?sort=stars&per_page=10`),
          fetch(`https://api.github.com/users/${MAIN_CONTRIBUTOR}`)
        ])

        if (!orgRes.ok || !reposRes.ok) {
          throw new Error('Failed to fetch GitHub data')
        }

        const orgData = await orgRes.json()
        const reposData = await reposRes.json()

        const repos: RepoData[] = reposData.map((repo: any) => ({
          name: repo.name,
          description: repo.description,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language,
          topics: repo.topics || [],
          url: repo.html_url,
        }))

        const totalStars = repos.reduce((acc, repo) => acc + repo.stars, 0)
        const languages = [...new Set(repos.map(r => r.language).filter(Boolean))] as string[]

        setGithubData({
          repos,
          totalStars,
          publicRepos: orgData.public_repos,
          contributors: [],
          languages,
        })

        if (userRes.ok) {
          const userData = await userRes.json()
          setMainContributor({
            name: userData.name || userData.login,
            bio: userData.bio,
            avatar: userData.avatar_url,
            location: userData.location,
            followers: userData.followers,
            url: userData.html_url,
          })
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'))
        console.error('Failed to fetch GitHub data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [])

  const getRepo = (name: string) =>
    githubData?.repos.find(r => r.name.toLowerCase() === name.toLowerCase())

  return {
    githubData,
    mainContributor,
    loading,
    error,
    getRepo,
  }
}
