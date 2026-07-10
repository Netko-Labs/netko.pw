import type { GitHubData, InterfaceProfile, MainContributor } from '@/types'

export interface DesignLayoutProps {
  profile: InterfaceProfile
  onProfileChange: (profile: InterfaceProfile) => void
  githubData: GitHubData
  contributor: MainContributor
  loading: boolean
  error: Error | null
}
