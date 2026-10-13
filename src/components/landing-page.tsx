import { HoloPage } from '@/components/holo'
import { useGitHubData } from '@/hooks/use-github-data'
import { useTheme } from '@/hooks/use-theme'

export function LandingPage() {
  const { theme, toggleTheme } = useTheme()
  const { githubData } = useGitHubData()

  return <HoloPage data={githubData} onToggleTheme={toggleTheme} theme={theme} />
}
