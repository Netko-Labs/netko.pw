import type { ReactNode } from 'react'

export type InterfaceProfile =
  | 'void'
  | 'phosphor'
  | 'amber'
  | 'ultraviolet'
  | 'paper'
  | 'zine'
  | 'logbook'
  | 'circuit'
  | 'desktop'
  | 'arcade'

export interface InterfaceProfileConfig {
  id: InterfaceProfile
  index: string
  name: string
  note: string
  accent: string
  dark: boolean
}

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

export interface TechStackItem {
  name: string
  color: string
}

export interface FunnyMetric {
  value: string
  label: string
  color: string
}

export interface AsciiFrameBaseProps {
  className?: string
  children: ReactNode
  as?: 'section' | 'article' | 'aside' | 'div' | 'nav'
}

export interface AsciiTitledFrameProps extends AsciiFrameBaseProps {
  title: ReactNode
  meta?: ReactNode
  header?: never
  headingLevel?: 'h2' | 'h3' | 'p' | 'span'
}

export interface AsciiCustomHeaderFrameProps extends AsciiFrameBaseProps {
  header: ReactNode
  title?: never
  meta?: never
  headingLevel?: never
}

export type AsciiFrameProps = AsciiTitledFrameProps | AsciiCustomHeaderFrameProps

export interface AsciiRuleProps {
  character?: string
}

export interface AsciiArtProps {
  children: string
  label?: string
}

export interface AsciiFlipbookProps {
  frames: readonly [string, string, string, string]
  label: string
  className?: string
}

export interface AsciiBadgeProps {
  children: ReactNode
}

export interface AsciiActionProps {
  href: string
  external?: boolean
  children: ReactNode
}

export interface AsciiPromptProps {
  command: string
  output?: ReactNode
}

export interface AsciiStatProps {
  label: ReactNode
  value: ReactNode
}

export interface AsciiProfileSwitcherProps {
  profile: InterfaceProfile
  onChange: (profile: InterfaceProfile) => void
}

export interface AsciiShellProps {
  profile: InterfaceProfile
  onProfileChange: (profile: InterfaceProfile) => void
  error: Error | null
  children: ReactNode
}

export interface AsciiContributorsBoothProps {
  contributor: MainContributor
}

export type AsciiBootPhase = 'loading' | 'exiting'

export interface AsciiBootScreenProps {
  phase: AsciiBootPhase
}

export interface AsciiMode {
  id: InterfaceProfile
  label: string
  slug: string
  command: string
  output: string
  headline: [string, string]
  lede: string
  art: string
  statusLines: [string, string, string]
  signoff: string
}
