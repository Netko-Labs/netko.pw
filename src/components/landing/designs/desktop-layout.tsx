import {
  IconArrowUpRight,
  IconBrandGithub,
  IconFolder,
  IconMaximize,
  IconMinus,
  IconTerminal2,
  IconX,
} from '@tabler/icons-react'
import { ProfileSwitcher } from '@/components/landing/profile-switcher'
import {
  getDescription,
  getFeaturedRepo,
  getProductRepos,
  getStatus,
} from '@/components/landing/repository-utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { trackEvent } from '@/hooks/use-umami'
import type { DesignLayoutProps } from './design-layout-props'

interface WindowBarProps {
  icon: 'folder' | 'terminal'
  title: string
}

function WindowBar({ icon, title }: WindowBarProps) {
  const Icon = icon === 'folder' ? IconFolder : IconTerminal2

  return (
    <div className="desktop-window__bar">
      <span>
        <Icon aria-hidden="true" /> {title}
      </span>
      <span aria-hidden="true">
        <IconMinus /> <IconMaximize /> <IconX />
      </span>
    </div>
  )
}

export function DesktopLayout({
  profile,
  onProfileChange,
  githubData,
  contributor,
  error,
}: DesignLayoutProps) {
  const repos = getProductRepos(githubData.repos)
  const featured = getFeaturedRepo(githubData.repos)

  return (
    <div className="desktop-shell">
      <header className="desktop-topbar">
        <a href="#desktop-stage">
          <span>NL</span>
          <strong>WORKSPACE_09</strong>
        </a>
        <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </header>

      <ProfileSwitcher
        label="WORKSPACE SWITCHER"
        layout="grid"
        onChange={onProfileChange}
        profile={profile}
      />

      <main className="desktop-stage" id="main-content">
        <section className="desktop-window desktop-window--terminal" id="desktop-stage">
          <WindowBar icon="terminal" title="juan@netko: ~/hello" />
          <div className="desktop-terminal">
            <p>
              <span>$</span> whoami --casual
            </p>
            <h1>
              We make small tools
              <em>for people with terminals open.</em>
            </h1>
            <p>
              Desktop runtimes, local infrastructure, and data experiments. Nothing enterprise-y
              unless you count the coffee machine.
            </p>
            <pre aria-hidden="true">
              {' /\\_/\\  [ dev server ]\n( o.o )   running nicely\n > ^ <    for once'}
            </pre>
            <Button
              nativeButton={false}
              render={<a href={githubData.organization.url} rel="noreferrer" target="_blank" />}
            >
              <IconBrandGithub data-icon="inline-start" />
              open source folder
            </Button>
          </div>
        </section>

        <section className="desktop-window desktop-window--files">
          <WindowBar icon="folder" title="projects/" />
          <div className="desktop-files">
            {repos.map((repo) => (
              <a
                href={repo.url}
                key={repo.name}
                onClick={() =>
                  trackEvent('project-click', { name: repo.name, placement: 'wm-desktop' })
                }
                rel="noreferrer"
                target="_blank"
              >
                <IconFolder aria-hidden="true" />
                <span>
                  <strong>{repo.name}</strong>
                  <small>{repo.language ?? 'Config'}</small>
                </span>
                <Badge variant="outline">{getStatus(repo)}</Badge>
              </a>
            ))}
          </div>
        </section>

        <section className="desktop-window desktop-window--readme">
          <WindowBar icon="terminal" title={`${featured?.name ?? 'project'}/README.md`} />
          <div>
            <span>CURRENTLY OPEN</span>
            <h2>{featured?.name ?? 'something new'}</h2>
            <p>{featured ? getDescription(featured) : 'Still deciding what to build next.'}</p>
            {featured ? (
              <a href={featured.url} rel="noreferrer" target="_blank">
                read more <IconArrowUpRight aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </section>

        <aside className="desktop-note">
          <span>STICKY NOTE</span>
          <p>remember to push</p>
          <p>remember why</p>
          <strong>— {contributor.name.split(' ')[0]}</strong>
        </aside>

        <footer className="desktop-dock">
          <span>● netko</span>
          <span>{githubData.publicRepos} folders</span>
          <span>{error ? 'offline-ish' : 'online-ish'}</span>
        </footer>
      </main>
    </div>
  )
}
