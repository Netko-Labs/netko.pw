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
  id: string
  name: string
}

export interface VariantSwitcherProps {
  current: string
  variants: VariantMeta[]
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
  className?: string
}

export interface StickerBodyProps {
  sticker: StickerTool
  isCompact?: boolean
}

export interface StickerPosition {
  x: number
  y: number
}

export interface HoloStickerProps {
  sticker: StickerTool
}

export interface GachaMachineProps {
  isDropping: boolean
  onTurn: () => void
}

export interface SparkleProps {
  className: string
}

export interface StickerDrag {
  index: number
  pointerX: number
  pointerY: number
  origin: StickerPosition
  hasMoved: boolean
}

export interface ClubExtrasProps {
  repos: RepoData[]
}

export interface StickerDetailProps {
  sticker: StickerTool
}

export interface DoodleProps {
  className?: string
}

export interface WashiTapeProps {
  color: string
  className?: string
}

export interface PixelSpriteProps {
  rows: string[]
  scale: number
  className?: string
  label?: string
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
  onPress: (label: string) => void
}

export interface PixelBubbleProps {
  text: string
}
