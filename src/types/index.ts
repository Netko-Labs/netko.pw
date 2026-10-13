import type { ReactNode } from 'react'

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

export interface WordmarkProps {
  width: number
  className?: string
}

export interface HeroProps {
  expression: ExpressionKey
}

export interface StatusStripProps {
  data: GitHubData
  isLoading: boolean
  hasError: boolean
  toolCount: number
}

export interface ToolCardProps {
  tool: FeaturedTool
  repo?: RepoData
}

export interface ToolsSectionProps {
  repos: RepoData[]
}

export interface RepoListProps {
  repos: RepoData[]
}

export interface ThemeToggleProps {
  theme: Theme
  onToggle: () => void
}

export interface SiteHeaderProps {
  theme: Theme
  onToggleTheme: () => void
}

export interface RawMarkupProps {
  html: string
  className?: string
  as?: 'span' | 'pre'
}

export interface StatusBadgeProps {
  status: ToolStatus
}

export interface SectionHeadProps {
  path: string
  title: string
  lede: string
}

export interface VariantProps {
  data: GitHubData
  isLoading: boolean
  hasError: boolean
  theme: Theme
  onToggleTheme: () => void
  expression: ExpressionKey
}

export interface VariantMeta {
  id: number
  name: string
}

export interface VariantSwitcherProps {
  current: number
  variants: VariantMeta[]
}

export interface PixelCell {
  x: number
  y: number
  isAccent: boolean
}

export interface PixelGrid {
  size: number
  cells: PixelCell[]
}

export interface StickerTool {
  tool: FeaturedTool
  color: string
  tilt: number
}

export interface KeyboardKeyProps {
  label: string
  isPressed: boolean
  onPress: (label: string) => void
}

export interface NightWalkCardProps {
  tool: FeaturedTool | null
}

export interface VoxelCatProps {
  className?: string
}

export interface RevealProps {
  children: ReactNode
  delayMs?: number
  className?: string
}

export interface SceneShop {
  name: string
  status: ToolStatus
}

export interface SceneFrame {
  width: number
  progress: number
  time: number
  isMoving: boolean
  activeIndex: number
  shops: SceneShop[]
  cat: PixelGrid
}

export interface SparkleProps {
  className: string
}

export interface Vec3 {
  x: number
  y: number
  z: number
}

export interface VoxelFace {
  corners: Vec3[]
  normal: Vec3
  isAccent: boolean
}

export interface VoxelPose {
  yaw: number
  pitch: number
}
