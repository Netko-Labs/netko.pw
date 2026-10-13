import { useGitHubData } from '@/hooks/use-github-data'
import { useTheme } from '@/hooks/use-theme'
import { HoloPage } from './holo'

export function LandingPage() {
  const { theme, toggleTheme } = useTheme()
  const { githubData } = useGitHubData()

  return <HoloPage data={githubData} onToggleTheme={toggleTheme} theme={theme} />
}
