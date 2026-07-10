import {
  IconArrowUpRight,
  IconBrandGithub,
  IconGitBranch,
  IconPointFilled,
  IconTerminal2,
} from '@tabler/icons-react'
import { AsciiMark } from '@/components/landing/ascii-mark'
import { ProfileSwitcher } from '@/components/landing/profile-switcher'
import {
  formatDate,
  getDescription,
  getFeaturedRepo,
  getProductRepos,
  getStatus,
} from '@/components/landing/repository-utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { trackEvent } from '@/hooks/use-umami'
import type { DesignLayoutProps } from './design-layout-props'

export function PhosphorLayout({
  profile,
  onProfileChange,
  githubData,
  contributor,
  loading,
  error,
}: DesignLayoutProps) {
  const repos = getProductRepos(githubData.repos)
  const featured = getFeaturedRepo(githubData.repos)
  const latest = repos[0]

  return (
    <div className="phosphor-shell">
      <header className="phosphor-titlebar">
        <div className="phosphor-titlebar__brand">
          <span className="phosphor-window-controls" aria-hidden="true">
            ● ● ●
          </span>
          <IconTerminal2 aria-hidden="true" />
          <strong>netko@labs</strong>
          <span>: ~/public</span>
        </div>
        <div className="phosphor-titlebar__status">
          <IconPointFilled aria-hidden="true" />
          {loading ? 'SYNCING' : `${githubData.source.toUpperCase()} / ONLINE`}
        </div>
      </header>

      <ProfileSwitcher
        label="TMUX WORKSPACE"
        layout="tabs"
        onChange={onProfileChange}
        profile={profile}
      />

      <main className="phosphor-workspace" id="main-content">
        <section className="terminal-pane phosphor-console">
          <div className="terminal-pane__title">
            <span>0:zsh*</span>
            <span>~/netko-labs</span>
          </div>
          <div className="phosphor-console__body">
            <p className="terminal-command">
              <span>❯</span> netko init --public --no-committee
            </p>
            <p className="terminal-output">Resolving studio manifest... done</p>
            <AsciiMark className="phosphor-console__ascii" variant="phosphor" />
            <h1>
              Tools for the part
              <br />
              between <em>works</em> and <em>ships.</em>
            </h1>
            <p className="terminal-output phosphor-console__lede">
              Open-source desktop, infrastructure, and data tooling from Bogotá. Small surface area.
              Sharp defaults. Source included.
            </p>
            <dl className="terminal-table">
              <div>
                <dt>public_repos</dt>
                <dd>{githubData.publicRepos}</dd>
              </div>
              <div>
                <dt>latest_push</dt>
                <dd>{latest ? formatDate(latest.pushedAt) : '—'}</dd>
              </div>
              <div>
                <dt>languages</dt>
                <dd>{githubData.languages.join(', ')}</dd>
              </div>
            </dl>
            <div className="terminal-actions">
              <Button render={<a href="#phosphor-repos" />}>$ ls projects/</Button>
              <Button
                render={<a href={githubData.organization.url} rel="noreferrer" target="_blank" />}
                variant="outline"
              >
                <IconBrandGithub data-icon="inline-start" />
                clone source
              </Button>
            </div>
            <p className="terminal-command terminal-command--idle">
              <span>❯</span> <i aria-hidden="true" />
            </p>
          </div>
        </section>

        <section className="terminal-pane phosphor-tree" id="phosphor-repos">
          <div className="terminal-pane__title">
            <span>1:projects</span>
            <span>{repos.length} entries</span>
          </div>
          <div className="phosphor-tree__path">netko-labs/</div>
          <div className="phosphor-tree__list">
            {repos.map((repo, index) => (
              <a
                href={repo.url}
                key={repo.name}
                onClick={() =>
                  trackEvent('project-click', { name: repo.name, placement: 'phosphor-tree' })
                }
                rel="noreferrer"
                target="_blank"
              >
                <span aria-hidden="true">{index === repos.length - 1 ? '└──' : '├──'}</span>
                <strong>{repo.name}/</strong>
                <span>{repo.language ?? 'config'}</span>
                <span>{getStatus(repo)}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="terminal-pane phosphor-readme">
          <div className="terminal-pane__title">
            <span>2:less</span>
            <span>{featured?.name ?? 'README'}/README.md</span>
          </div>
          {featured ? (
            <div className="phosphor-readme__body">
              <p className="terminal-output"># FEATURED_BUILD</p>
              <h2>{featured.name}</h2>
              <p>{getDescription(featured)}</p>
              <div className="phosphor-readme__meta">
                <Badge>{getStatus(featured).toUpperCase()}</Badge>
                {featured.language ? <Badge variant="outline">{featured.language}</Badge> : null}
                {featured.license ? <Badge variant="outline">{featured.license}</Badge> : null}
              </div>
              <Separator />
              <Button
                onClick={() =>
                  trackEvent('project-click', { name: featured.name, placement: 'phosphor-readme' })
                }
                render={<a href={featured.url} rel="noreferrer" target="_blank" />}
                variant="outline"
              >
                open README
                <IconArrowUpRight data-icon="inline-end" />
              </Button>
            </div>
          ) : null}
        </section>

        <section className="terminal-pane phosphor-whoami">
          <div className="terminal-pane__title">
            <span>3:whoami</span>
            <span>tty0</span>
          </div>
          <div className="phosphor-whoami__body">
            <AsciiMark variant="phosphor" />
            <div>
              <p>
                <span>user:</span> {contributor.name}
              </p>
              <p>
                <span>role:</span> {contributor.bio}
              </p>
              <p>
                <span>location:</span> {contributor.location}
              </p>
            </div>
          </div>
        </section>

        {error ? (
          <p className="phosphor-error">
            stderr: live sync unavailable; snapshot mounted read-only.
          </p>
        ) : null}
      </main>

      <footer className="phosphor-statusbar">
        <span>
          <b>0:zsh</b> 1:projects 2:less 3:whoami
        </span>
        <span>
          <IconGitBranch aria-hidden="true" /> main
        </span>
        <span>netko-labs • {new Date().getFullYear()}</span>
      </footer>
    </div>
  )
}
