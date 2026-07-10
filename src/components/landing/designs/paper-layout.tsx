import { IconArrowUpRight, IconBrandGithub, IconMapPin, IconPencil } from '@tabler/icons-react'
import { AsciiMark } from '@/components/landing/ascii-mark'
import { ProfileSwitcher } from '@/components/landing/profile-switcher'
import {
  formatDate,
  getDescription,
  getProductRepos,
  getStatus,
} from '@/components/landing/repository-utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { trackEvent } from '@/hooks/use-umami'
import type { DesignLayoutProps } from './design-layout-props'

export function PaperLayout({
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
    <div className="paper-shell">
      <header className="paper-header">
        <a className="paper-header__brand" href="#paper-top">
          <span>NL</span>
          <div>
            <strong>NETKO LABS</strong>
            <small>SYSTEM DRAWING</small>
          </div>
        </a>
        <dl>
          <div>
            <dt>DRAWING</dt>
            <dd>NL-OS-005</dd>
          </div>
          <div>
            <dt>REVISION</dt>
            <dd>{latest ? formatDate(latest.pushedAt) : 'CURRENT'}</dd>
          </div>
          <div>
            <dt>SCALE</dt>
            <dd>1:PUBLIC</dd>
          </div>
        </dl>
        <Button
          render={<a href={githubData.organization.url} rel="noreferrer" target="_blank" />}
          variant="outline"
        >
          <IconBrandGithub data-icon="inline-start" />
          Source
        </Button>
      </header>

      <ProfileSwitcher
        label="DRAWING SET"
        layout="tape"
        onChange={onProfileChange}
        profile={profile}
      />

      <main id="main-content">
        <section className="paper-intro" id="paper-top">
          <div className="paper-intro__copy">
            <p>OPEN-SOURCE TOOLING / GENERAL ARRANGEMENT</p>
            <h1>
              A map of
              <br />
              <span>small machines.</span>
            </h1>
            <p className="paper-intro__lede">
              Desktop runtimes, local infrastructure, data tools, and error monitors—drawn, built,
              and shipped from Bogotá.
            </p>
            <AsciiMark className="paper-intro__ascii" variant="paper" />
            <div className="paper-intro__legend">
              <span>
                <i /> active module
              </span>
              <span>
                <i /> public source
              </span>
              <span>{githubData.publicRepos} repositories indexed</span>
            </div>
          </div>

          <div className="plotter-diagram">
            <svg aria-hidden="true" viewBox="0 0 720 520">
              <path d="M360 260 L135 105 M360 260 L585 105 M360 260 L90 395 M360 260 L360 445 M360 260 L630 395" />
              <circle cx="360" cy="260" r="116" />
              <circle cx="360" cy="260" r="64" />
              <path d="M330 260h60M360 230v60" />
            </svg>
            <div className="plotter-diagram__core">
              <span>NETKO</span>
              <strong>LABS</strong>
              <small>{loading ? 'SYNC' : 'ONLINE'}</small>
            </div>
            {repos.slice(0, 5).map((repo, index) => (
              <a
                className="plotter-node"
                data-node={index + 1}
                href={repo.url}
                key={repo.name}
                onClick={() =>
                  trackEvent('project-click', { name: repo.name, placement: 'paper-diagram' })
                }
                rel="noreferrer"
                target="_blank"
              >
                <span>0{index + 1}</span>
                <strong>{repo.name}</strong>
                <small>{repo.language ?? 'Config'}</small>
              </a>
            ))}
          </div>
        </section>

        <section className="paper-ledger" id="paper-projects">
          <div className="paper-section-heading">
            <span>DETAIL SCHEDULE / A</span>
            <h2>Module register</h2>
            <p>Live organization inventory</p>
          </div>
          <div className="paper-ledger__head" aria-hidden="true">
            <span>REF</span>
            <span>MODULE / DESCRIPTION</span>
            <span>MATERIAL</span>
            <span>STATUS</span>
            <span>REV.</span>
          </div>
          <div className="paper-ledger__rows">
            {repos.map((repo, index) => (
              <a
                href={repo.url}
                key={repo.name}
                onClick={() =>
                  trackEvent('project-click', { name: repo.name, placement: 'paper-ledger' })
                }
                rel="noreferrer"
                target="_blank"
              >
                <span>A-{String(index + 1).padStart(2, '0')}</span>
                <span>
                  <strong>{repo.name}</strong>
                  <small>{getDescription(repo)}</small>
                </span>
                <span>{repo.language ?? 'Config'}</span>
                <span>
                  <Badge variant="outline">{getStatus(repo)}</Badge>
                </span>
                <span>{formatDate(repo.pushedAt)}</span>
                <IconArrowUpRight aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>

        <section className="paper-signoff">
          <div className="paper-signoff__stamp" aria-hidden="true">
            <span>APPROVED</span>
            <strong>OPEN SOURCE</strong>
            <small>NETKO LABS</small>
          </div>
          <div className="paper-signoff__copy">
            <p>DRAWN &amp; CHECKED BY</p>
            <h2>{contributor.name}</h2>
            <span>{contributor.bio}</span>
            <p>
              <IconMapPin aria-hidden="true" /> {contributor.location}
            </p>
          </div>
          <Button
            render={<a href={contributor.url} rel="noreferrer" target="_blank" />}
            variant="outline"
          >
            <IconPencil data-icon="inline-start" />
            Inspect signature
            <IconArrowUpRight data-icon="inline-end" />
          </Button>
        </section>

        {error ? (
          <p className="paper-error">
            NOTE: Drawing uses the latest locally approved data revision.
          </p>
        ) : null}
      </main>

      <footer className="paper-footer">
        <span>NETKO LABS</span>
        <span>NL-OS-005</span>
        <span>{new Date().getFullYear()}</span>
      </footer>
    </div>
  )
}
