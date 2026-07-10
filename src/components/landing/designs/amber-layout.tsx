import { IconArrowUpRight, IconBrandGithub, IconCommand, IconMapPin } from '@tabler/icons-react'
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
import { Separator } from '@/components/ui/separator'
import { trackEvent } from '@/hooks/use-umami'
import type { DesignLayoutProps } from './design-layout-props'

export function AmberLayout({
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
    <div className="amber-shell">
      <aside className="amber-rail">
        <a className="amber-rail__brand" href="#amber-name">
          <span>N/L</span>
          <strong>NETKO LABS</strong>
          <small>FIELD MANUAL</small>
        </a>

        <ProfileSwitcher
          label="MANUAL EDITION"
          layout="rail"
          onChange={onProfileChange}
          profile={profile}
        />

        <nav aria-label="Manual contents" className="amber-contents">
          <p>CONTENTS</p>
          <a href="#amber-name">
            <span>01</span> NAME
          </a>
          <a href="#amber-synopsis">
            <span>02</span> SYNOPSIS
          </a>
          <a href="#amber-projects">
            <span>03</span> PROJECTS
          </a>
          <a href="#amber-author">
            <span>04</span> AUTHOR
          </a>
        </nav>

        <p className="amber-rail__edition">
          REV. {latest ? formatDate(latest.pushedAt) : 'CURRENT'}
          <br />
          BOGOTÁ / CO
        </p>
      </aside>

      <main className="amber-manual" id="main-content">
        <header className="amber-running-head">
          <span>NETKO(1)</span>
          <span>Developer Commands</span>
          <span>NETKO(1)</span>
        </header>

        <article>
          <section className="amber-name" id="amber-name">
            <p className="amber-section-label">NAME</p>
            <h1>
              NETKO<span>(1)</span>
            </h1>
            <AsciiMark className="amber-name__ascii" variant="amber" />
            <p>
              netko — an independent open-source studio building small tools for desktop software,
              local infrastructure, and data.
            </p>
            <div className="amber-name__status">
              <Badge>{loading ? 'READING INDEX' : 'MANUAL CURRENT'}</Badge>
              <span>{githubData.publicRepos} public repositories</span>
              <span>{githubData.languages.join(' / ')}</span>
            </div>
          </section>

          <Separator />

          <section className="amber-synopsis" id="amber-synopsis">
            <p className="amber-section-label">SYNOPSIS</p>
            <div className="amber-indented">
              <code>netko [--build] [--publish] [--own-your-tools]</code>
              <p>
                Work in public. Keep the interface sharp. Prefer a useful tool over a committee
                discussing one.
              </p>
              <Button
                render={<a href={githubData.organization.url} rel="noreferrer" target="_blank" />}
                variant="outline"
              >
                <IconBrandGithub data-icon="inline-start" />
                Browse source
                <IconArrowUpRight data-icon="inline-end" />
              </Button>
            </div>
          </section>

          <section className="amber-projects" id="amber-projects">
            <p className="amber-section-label">PROJECTS</p>
            <div className="amber-options">
              {repos.map((repo) => (
                <a
                  href={repo.url}
                  key={repo.name}
                  onClick={() =>
                    trackEvent('project-click', { name: repo.name, placement: 'amber-manual' })
                  }
                  rel="noreferrer"
                  target="_blank"
                >
                  <div className="amber-options__flag">
                    <code>--{repo.name.toLowerCase()}</code>
                    <Badge variant="outline">{getStatus(repo)}</Badge>
                  </div>
                  <div className="amber-options__copy">
                    <p>{getDescription(repo)}</p>
                    <span>
                      {repo.language ?? 'Config'} · pushed {formatDate(repo.pushedAt)}
                    </span>
                  </div>
                  <IconArrowUpRight aria-hidden="true" />
                </a>
              ))}
            </div>
          </section>

          <section className="amber-author" id="amber-author">
            <p className="amber-section-label">AUTHOR</p>
            <div className="amber-author__body">
              <div className="amber-author__avatar">
                <img alt="" src={contributor.avatar} />
              </div>
              <div>
                <h2>{contributor.name}</h2>
                <p>{contributor.bio}</p>
                <p>
                  <IconMapPin aria-hidden="true" /> {contributor.location}
                </p>
                <Button
                  render={<a href={contributor.url} rel="noreferrer" target="_blank" />}
                  variant="outline"
                >
                  <IconCommand data-icon="inline-start" />
                  whoami
                </Button>
              </div>
            </div>
          </section>

          {error ? (
            <p className="amber-warning" role="status">
              DIAGNOSTIC: network index unavailable; displaying the installed manual snapshot.
            </p>
          ) : null}
        </article>

        <footer className="amber-running-foot">
          <span>Netko Labs</span>
          <span>{new Date().getFullYear()}</span>
          <span>NETKO(1)</span>
        </footer>
      </main>
    </div>
  )
}
