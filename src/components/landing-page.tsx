import { useCallback } from 'react'
import { AsciiExperience } from '@/components/landing/ascii/ascii-experience'
import type { DesignLayoutProps } from '@/components/landing/designs/design-layout-props'
import { useGitHubData } from '@/hooks/use-github-data'
import { useTheme } from '@/hooks/use-theme'
import type { InterfaceProfile } from '@/types'

function DesignLayout(props: DesignLayoutProps) {
  return <AsciiExperience {...props} />
}

export function LandingPage() {
  const { profile, setProfile } = useTheme()
  const { githubData, mainContributor, loading, error } = useGitHubData()

  const handleProfileChange = useCallback(
    (nextProfile: InterfaceProfile) => {
      setProfile(nextProfile)
    },
    [setProfile],
  )

  return (
    <div className="design-root" data-design={profile} id="top">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <DesignLayout
        contributor={mainContributor}
        error={error}
        githubData={githubData}
        loading={loading}
        onProfileChange={handleProfileChange}
        profile={profile}
      />
    </div>
  )
}
