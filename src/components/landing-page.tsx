import { useGitHubData } from '@/hooks/use-github-data'
import { useTheme } from '@/hooks/use-theme'
import type { ExpressionKey } from '@/types'
import {
  FEATURED_TOOLS,
  Hero,
  Principles,
  RepoList,
  SiteFooter,
  SiteHeader,
  StatusStrip,
  ToolsSection,
} from './site'
import { ANCHOR, toHash } from './site/anchors'

function heroExpression(isLoading: boolean, hasError: boolean): ExpressionKey {
  if (isLoading) return 'loading'
  return hasError ? 'sleep' : 'idle'
}

export function LandingPage() {
  const { theme, toggleTheme } = useTheme()
  const { githubData, loading, error } = useGitHubData()
  const hasError = Boolean(error)

  return (
    <div className="min-h-dvh" id={ANCHOR.top}>
      <a className="skip-link" href={toHash(ANCHOR.main)}>
        Skip to content
      </a>
      <SiteHeader onToggleTheme={toggleTheme} theme={theme} />
      <main id={ANCHOR.main}>
        <Hero expression={heroExpression(loading, hasError)} />
        <StatusStrip
          data={githubData}
          hasError={hasError}
          isLoading={loading}
          toolCount={FEATURED_TOOLS.length}
        />
        <ToolsSection repos={githubData.repos} />
        <RepoList repos={githubData.repos} />
        <Principles />
      </main>
      <SiteFooter />
    </div>
  )
}
