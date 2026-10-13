import type { CSSProperties, ReactNode } from 'react'

export interface RepoData {
  name: string
  description: string | null
  stars: number
  forks: number
  language: string | null
  topics: string[]
  url: string
  homepage: string | null
  archived: boolean
  fork: boolean
  pushedAt: string
  updatedAt: string
  license: string | null
}

export interface ContributorData {
  login: string
  avatar: string
  url: string
  contributions: number
}

export interface OrganizationData {
  name: string
  description: string
  url: string
  publicRepos: number
  followers: number
}

export type GitHubDataSource = 'network' | 'cache' | 'snapshot'

export interface GitHubData {
  organization: OrganizationData
  repos: RepoData[]
  totalStars: number
  publicRepos: number
  contributors: ContributorData[]
  languages: string[]
  fetchedAt: string
  source: GitHubDataSource
}

export interface MainContributor {
  login: string
  name: string
  bio: string
  avatar: string
  location: string
  followers: number
  publicRepos: number
  url: string
  website: string
}

export type Theme = 'light' | 'dark'

export type ExpressionKey = 'idle' | 'happy' | 'loading' | 'error' | 'sleep'

export type ToolStatus = 'open-source' | 'live' | 'building'

export interface FeaturedTool {
  name: string
  tagline: string
  description: string
  stack: string[]
  status: ToolStatus
  repo?: string
  site?: string
  docs?: string
}

export interface ToolLink {
  label: string
  href: string
  kind: 'repo' | 'site' | 'docs'
}

export interface BrandMarkProps {
  expression?: ExpressionKey
  size: number
  isBlinking?: boolean
  className?: string
}

export interface PixelMarkProps {
  size: number
  className?: string
}

export interface ThemeToggleProps {
  theme: Theme
  onToggle: () => void
}

export interface RawMarkupProps {
  html: string
  className?: string
  as?: 'span' | 'pre'
}

export interface HoloPageProps {
  data: GitHubData
  theme: Theme
  onToggleTheme: () => void
}

export interface StickerTool {
  tool: FeaturedTool
  color: string
  tilt: number
}

export interface HoloStickerProps {
  sticker: StickerTool
  repo?: RepoData
}

export interface PixelSpriteProps {
  rows: string[]
  scale: number
  className?: string
  label?: string
  style?: CSSProperties
}

export interface PixelBoxProps {
  children: ReactNode
  className?: string
  innerClassName?: string
  style?: CSSProperties
  innerStyle?: CSSProperties
  isLifted?: boolean
}

export interface PixelKeyProps {
  label: string
  isPressed: boolean
  isLit?: boolean
  onPress: (label: string) => void
}

export interface PixelBubbleProps {
  text: string
  isLarge?: boolean
}

export interface PixelConfettiProps {
  isActive: boolean
}
