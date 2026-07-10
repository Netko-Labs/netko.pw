import { IconArrowUpRight, IconBrandGithub, IconGitCommit, IconMapPin } from '@tabler/icons-react'
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

const coffeeLog = `    ( (
     ) )
  .------.
  |      |]
  '------'
 coffee: tracked`

export function LogbookLayout({
  profile,
  onProfileChange,
  githubData,
  contributor,
  error,
}: DesignLayoutProps) {
  const repos = getProductRepos(githubData.repos)

  return (
    <div className="logbook-shell">
      <aside className="logbook-rail">
        <a className="logbook-rail__brand" href="#logbook-top">
          <IconGitCommit aria-hidden="true" />
          <strong>NETKO / GIT LOG</strong>
          <span>everything is a work in progress</span>
        </a>
        <ProfileSwitcher
          label="CHECKOUT DESIGN"
          layout="rail"
          onChange={onProfileChange}
          profile={profile}
        />
        <pre aria-hidden="true">{coffeeLog}</pre>
      </aside>

      <main className="logbook-main" id="main-content">
        <header className="logbook-hero" id="logbook-top">
          <div>
            <p>git log --all --human</p>
            <h1>
              Notes from a<span>very public workbench.</span>
            </h1>
          </div>
          <div className="logbook-hero__note">
            <span>HEAD → main-ish</span>
            <p>
              We build small dev tools, leave useful commit messages, and try not to force-push
              before coffee.
            </p>
            <Button
              nativeButton={false}
              render={<a href={githubData.organization.url} rel="noreferrer" target="_blank" />}
              variant="outline"
            >
              <IconBrandGithub data-icon="inline-start" />
              browse the whole history
            </Button>
          </div>
        </header>

        <section className="logbook-timeline" aria-label="Repository activity log">
          {repos.map((repo, index) => (
            <article key={repo.name}>
              <div className="logbook-timeline__rail" aria-hidden="true">
                <i />
                <span>{`a${(index + 3) * 173}f${index}`}</span>
              </div>
              <div className="logbook-timeline__entry">
                <header>
                  <span>{formatDate(repo.pushedAt)}</span>
                  <Badge variant="outline">{getStatus(repo)}</Badge>
                </header>
                <h2>{repo.name}</h2>
                <p>{getDescription(repo)}</p>
                <footer>
                  <span>{repo.language ?? 'Config'}</span>
                  <span>commit message: “okay, this is useful now”</span>
                  <a
                    href={repo.url}
                    onClick={() =>
                      trackEvent('project-click', { name: repo.name, placement: 'git-log' })
                    }
                    rel="noreferrer"
                    target="_blank"
                  >
                    inspect diff <IconArrowUpRight aria-hidden="true" />
                  </a>
                </footer>
              </div>
            </article>
          ))}
        </section>

        <section className="logbook-author">
          <img alt="" src={contributor.avatar} />
          <div>
            <span>AUTHOR</span>
            <h2>{contributor.name}</h2>
            <p>{contributor.bio}</p>
            <small>
              <IconMapPin aria-hidden="true" /> {contributor.location}
            </small>
          </div>
          <p>{githubData.publicRepos} public repos · still adding notes</p>
        </section>

        {error ? (
          <p className="logbook-error">offline branch checked out from local cache.</p>
        ) : null}
      </main>
    </div>
  )
}
