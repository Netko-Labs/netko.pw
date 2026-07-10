import { ControlHero } from '@/components/landing/control-hero'
import { PageFooter } from '@/components/landing/page-footer'
import { ProfileSwitcher } from '@/components/landing/profile-switcher'
import { interfaceProfiles } from '@/components/landing/profiles'
import { RepositoryIndex } from '@/components/landing/repository-index'
import { SiteHeader } from '@/components/landing/site-header'
import { StudioReadout } from '@/components/landing/studio-readout'
import type { DesignLayoutProps } from './design-layout-props'

export function VoidLayout({
  profile,
  onProfileChange,
  githubData,
  contributor,
  loading,
  error,
}: DesignLayoutProps) {
  const activeProfile =
    interfaceProfiles.find((item) => item.id === profile) ?? interfaceProfiles[0]

  return (
    <div className="interface-shell">
      <div className="interface-grid" aria-hidden="true" />
      <div className="signal-sweep" aria-hidden="true" />

      <main className="site-frame" id="main-content">
        <SiteHeader />
        <ProfileSwitcher onChange={onProfileChange} profile={profile} />
        <ControlHero activeProfile={activeProfile} githubData={githubData} loading={loading} />
        {error ? (
          <p className="data-notice" role="status">
            Live sync is unavailable. Showing the latest saved repository snapshot.
          </p>
        ) : null}
        <RepositoryIndex repos={githubData.repos} />
        <StudioReadout contributor={contributor} githubData={githubData} />
        <PageFooter />
      </main>
    </div>
  )
}
