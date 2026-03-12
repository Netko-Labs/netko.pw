export interface RepoData {
  name: string
  description: string
  stars: number
  forks: number
  language: string
  topics: string[]
  url: string
}

export interface ContributorData {
  login: string
  avatar: string
  url: string
  contributions: number
}

export interface GitHubData {
  repos: RepoData[]
  totalStars: number
  publicRepos: number
  contributors: ContributorData[]
  languages: string[]
}

export interface MainContributor {
  name: string
  bio: string
  avatar: string
  location: string
  followers: number
  url: string
}

export interface TechStackItem {
  name: string
  color: string
}

export interface FunnyMetric {
  value: string
  label: string
  color: string
}
