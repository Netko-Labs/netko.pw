import {
  IconArrowUpRight,
  IconBrandGithub,
  IconCoffee,
  IconGitBranch,
  IconPointFilled,
  IconTerminal2,
} from '@tabler/icons-react'
import { ProfileSwitcher } from '@/components/landing/profile-switcher'
import {
  formatDate,
  getDescription,
  getFeaturedRepo,
  getProductRepos,
  getStatus,
} from '@/components/landing/repository-utils'
import { type TerminalProfile, terminalIterations } from '@/components/landing/terminal-iterations'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { trackEvent } from '@/hooks/use-umami'
import type { RepoData } from '@/types'
import type { DesignLayoutProps } from './design-layout-props'

interface TerminalFamilyLayoutProps extends Omit<DesignLayoutProps, 'profile'> {
  profile: TerminalProfile
}

interface PaneTitleProps {
  index: string
  name: string
  detail: string
}

function PaneTitle({ index, name, detail }: PaneTitleProps) {
  return (
    <div className="terminal-family__pane-title">
      <span>
        {index}:{name}
      </span>
      <span>{detail}</span>
    </div>
  )
}

interface RepositoryListProps {
  repos: RepoData[]
}

function RepositoryList({ repos }: RepositoryListProps) {
  return (
    <div className="terminal-family__repo-list">
      {repos.map((repo, index) => (
        <a
          href={repo.url}
          key={repo.name}
          onClick={() =>
            trackEvent('project-click', { name: repo.name, placement: 'terminal-family' })
          }
          rel="noreferrer"
          target="_blank"
        >
          <span aria-hidden="true">{index === repos.length - 1 ? '└──' : '├──'}</span>
          <strong>{repo.name}/</strong>
          <span>{repo.language ?? 'config'}</span>
          <Badge variant="outline">{getStatus(repo)}</Badge>
        </a>
      ))}
    </div>
  )
}

export function TerminalFamilyLayout({
  profile,
  onProfileChange,
  githubData,
  contributor,
  loading,
  error,
}: TerminalFamilyLayoutProps) {
  const iteration = terminalIterations[profile]
  const repos = getProductRepos(githubData.repos)
  const featured = getFeaturedRepo(githubData.repos)
  const latest = repos[0]

  return (
    <div className="terminal-family" data-iteration={profile}>
      <header className="terminal-family__titlebar">
        <div className="terminal-family__identity">
          <span className="terminal-family__lights" aria-hidden="true">
            ● ● ●
          </span>
          <IconTerminal2 aria-hidden="true" />
          <strong>netko@labs</strong>
          <span>: {iteration.cwd}</span>
        </div>
        <div className="terminal-family__presence">
          <IconPointFilled aria-hidden="true" />
          {loading ? 'checking the wires...' : `${githubData.source} data / online-ish`}
        </div>
      </header>

      <ProfileSwitcher
        label="CHOOSE YOUR TERMINAL MOOD"
        layout="tabs"
        onChange={onProfileChange}
        profile={profile}
      />

      <main className="terminal-family__workspace" id="main-content">
        <section className="terminal-family__pane terminal-family__hero">
          <PaneTitle detail={iteration.cwd} index="0" name={`${iteration.handle}*`} />
          <div className="terminal-family__hero-body">
            <div className="terminal-family__intro">
              <p className="terminal-family__command">
                <span>❯</span> {iteration.command}
              </p>
              <p className="terminal-family__output">{iteration.response}</p>
              <h1>
                {iteration.headline[0]}
                <br />
                <em>{iteration.headline[1]}</em>
              </h1>
              <p className="terminal-family__lede">{iteration.lede}</p>
              <div className="terminal-family__actions">
                <Button nativeButton={false} render={<a href="#projects" />}>
                  peek at the repos
                </Button>
                <Button
                  nativeButton={false}
                  render={<a href={githubData.organization.url} rel="noreferrer" target="_blank" />}
                  variant="outline"
                >
                  <IconBrandGithub data-icon="inline-start" />
                  open GitHub
                </Button>
              </div>
            </div>

            <figure className="terminal-family__scene">
              <figcaption>{iteration.sceneLabel}</figcaption>
              <pre aria-hidden="true">{iteration.scene}</pre>
            </figure>
          </div>
        </section>

        <section className="terminal-family__pane terminal-family__projects" id="projects">
          <PaneTitle detail={`${repos.length} little things`} index="1" name="projects" />
          <p className="terminal-family__path">~/netko-labs/</p>
          <RepositoryList repos={repos} />
        </section>

        <section className="terminal-family__pane terminal-family__featured">
          <PaneTitle detail="currently poking at" index="2" name="readme" />
          {featured ? (
            <div className="terminal-family__featured-body">
              <p className="terminal-family__output"># today’s side quest</p>
              <h2>{featured.name}</h2>
              <p>{getDescription(featured)}</p>
              <div>
                <Badge>{getStatus(featured)}</Badge>
                {featured.language ? <Badge variant="outline">{featured.language}</Badge> : null}
              </div>
              <Button
                nativeButton={false}
                onClick={() =>
                  trackEvent('project-click', {
                    name: featured.name,
                    placement: 'terminal-feature',
                  })
                }
                render={<a href={featured.url} rel="noreferrer" target="_blank" />}
                variant="outline"
              >
                open the rabbit hole
                <IconArrowUpRight data-icon="inline-end" />
              </Button>
            </div>
          ) : null}
        </section>

        <section className="terminal-family__pane terminal-family__logs">
          <PaneTitle detail="no panic" index="3" name="build.log" />
          <div className="terminal-family__log-body">
            {iteration.logs.map((log, index) => (
              <p key={log}>
                <span>
                  {String(index + 1).padStart(2, '0')}:{16 + index * 7}
                </span>
                <i>{index === iteration.logs.length - 1 ? 'done' : 'ok'}</i>
                {log}
              </p>
            ))}
          </div>
        </section>

        <section className="terminal-family__pane terminal-family__operator">
          <PaneTitle detail="mostly human" index="4" name="whoami" />
          <div className="terminal-family__operator-body">
            <img alt="" src={contributor.avatar} />
            <div>
              <strong>{contributor.name}</strong>
              <p>{contributor.bio}</p>
              <span>{contributor.location}</span>
            </div>
          </div>
        </section>

        <section className="terminal-family__pane terminal-family__stats">
          <PaneTitle detail="tiny dashboard" index="5" name="status" />
          <dl>
            <div>
              <dt>public repos</dt>
              <dd>{githubData.publicRepos}</dd>
            </div>
            <div>
              <dt>latest push</dt>
              <dd>{latest ? formatDate(latest.pushedAt) : 'soon'}</dd>
            </div>
            <div>
              <dt>coffee</dt>
              <dd>
                <IconCoffee aria-hidden="true" /> probably
              </dd>
            </div>
          </dl>
        </section>

        {error ? (
          <p className="terminal-family__error" role="status">
            network took a break — showing the saved repo snapshot.
          </p>
        ) : null}
      </main>

      <footer className="terminal-family__statusbar">
        <span>
          <b>0:{iteration.handle}</b> 1:projects 2:readme 3:logs 4:whoami
        </span>
        <span>
          <IconGitBranch aria-hidden="true" /> main, probably
        </span>
        <span>{iteration.signoff}</span>
      </footer>
    </div>
  )
}
