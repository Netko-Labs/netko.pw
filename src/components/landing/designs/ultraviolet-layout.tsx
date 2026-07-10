import {
  IconActivity,
  IconAperture,
  IconArrowUpRight,
  IconBrandGithub,
  IconSparkles,
} from '@tabler/icons-react'
import { AsciiMark } from '@/components/landing/ascii-mark'
import { ProfileSwitcher } from '@/components/landing/profile-switcher'
import {
  formatMonth,
  getDescription,
  getProductRepos,
  getStatus,
} from '@/components/landing/repository-utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { trackEvent } from '@/hooks/use-umami'
import type { DesignLayoutProps } from './design-layout-props'

export function UltravioletLayout({
  profile,
  onProfileChange,
  githubData,
  contributor,
  loading,
  error,
}: DesignLayoutProps) {
  const repos = getProductRepos(githubData.repos)
  const latest = repos[0]

  return (
    <div className="uv-shell">
      <div className="uv-radar" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>

      <header className="uv-header">
        <a href="#uv-top" className="uv-header__brand">
          <IconAperture aria-hidden="true" />
          <strong>NETKO/OS</strong>
          <span>signal deck</span>
        </a>
        <div className="uv-header__telemetry">
          <span>{loading ? 'CALIBRATING' : 'SIGNAL LOCKED'}</span>
          <span>{githubData.publicRepos.toString().padStart(2, '0')} MODULES</span>
          <span>{latest ? formatMonth(latest.pushedAt) : 'CURRENT'}</span>
        </div>
        <Button
          render={<a href={githubData.organization.url} rel="noreferrer" target="_blank" />}
          variant="outline"
        >
          <IconBrandGithub data-icon="inline-start" />
          GitHub
          <IconArrowUpRight data-icon="inline-end" />
        </Button>
      </header>

      <ProfileSwitcher
        label="DECK CONFIGURATION"
        layout="tabs"
        onChange={onProfileChange}
        profile={profile}
      />

      <main id="main-content">
        <section className="uv-hero" id="uv-top">
          <div className="uv-hero__copy">
            <p>
              <IconActivity aria-hidden="true" /> INDEPENDENT BUILD SIGNAL / BOGOTÁ
            </p>
            <h1>
              BUILD<span>{'//'}</span>
              <br />
              BREAK<span>{'//'}</span>
              <br />
              SHIP<span>.</span>
            </h1>
          </div>

          <div className="uv-hero__manifesto">
            <div className="uv-crosshair" aria-hidden="true">
              <IconAperture />
              <AsciiMark variant="ultraviolet" />
            </div>
            <p>
              Developer software with a pulse: desktop runtimes, local clouds, data tools, and error
              monitors built in public.
            </p>
            <Button render={<a href="#uv-projects" />}>
              Enter module field
              <IconArrowUpRight data-icon="inline-end" />
            </Button>
          </div>

          <div className="uv-hero__ticker">
            <span>NOW TRANSMITTING</span>
            <strong>{latest?.name ?? 'Netko Labs'}</strong>
            <span>{latest ? getStatus(latest) : 'online'}</span>
            <span>{githubData.languages.join(' + ')}</span>
          </div>
        </section>

        <section className="uv-project-field" id="uv-projects">
          <div className="uv-section-title">
            <span>MODULE FIELD / {repos.length.toString().padStart(2, '0')}</span>
            <h2>Choose a signal.</h2>
            <p>Each tile is a live repository endpoint.</p>
          </div>

          <div className="uv-module-grid">
            {repos.map((repo, index) => (
              <a
                className="uv-module"
                data-rank={index + 1}
                href={repo.url}
                key={repo.name}
                onClick={() =>
                  trackEvent('project-click', { name: repo.name, placement: 'uv-deck' })
                }
                rel="noreferrer"
                target="_blank"
              >
                <div className="uv-module__topline">
                  <span>0{index + 1}</span>
                  <Badge variant="outline">{getStatus(repo)}</Badge>
                </div>
                <h3>{repo.name}</h3>
                <p>{getDescription(repo)}</p>
                <div className="uv-module__footer">
                  <span>{repo.language ?? 'Config'}</span>
                  <span>{formatMonth(repo.pushedAt)}</span>
                  <IconArrowUpRight aria-hidden="true" />
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="uv-operator">
          <div className="uv-operator__image">
            <img alt="" src={contributor.avatar} />
          </div>
          <div className="uv-operator__copy">
            <p>
              <IconSparkles aria-hidden="true" /> HUMAN SIGNAL
            </p>
            <h2>{contributor.name}</h2>
            <span>
              {contributor.bio} / {contributor.location}
            </span>
          </div>
          <Button
            render={<a href={contributor.url} rel="noreferrer" target="_blank" />}
            variant="outline"
          >
            inspect operator
            <IconArrowUpRight data-icon="inline-end" />
          </Button>
        </section>

        {error ? <p className="uv-error">SIGNAL DEGRADED — cached module field active.</p> : null}
      </main>

      <footer className="uv-footer">
        <span>NETKO LABS / OPEN SOURCE</span>
        <span>{new Date().getFullYear()} / ALL RIGHTS REVERSED</span>
      </footer>
    </div>
  )
}
