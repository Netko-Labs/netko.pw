import { IconArrowUpRight, IconBrandGithub, IconPlayerPlay, IconTrophy } from '@tabler/icons-react'
import { ProfileSwitcher } from '@/components/landing/profile-switcher'
import { getDescription, getProductRepos, getStatus } from '@/components/landing/repository-utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { trackEvent } from '@/hooks/use-umami'
import type { DesignLayoutProps } from './design-layout-props'

const arcadeCabinet = `       __________________
      /  NETKO ARCADE   /|
     /_________________/ |
     |  /\\_/\\  READY |  |
     | ( o.o )  >_    |  |
     |  > ^ <         |  |
     |________________|  |
     |    [●]  [●]    | /
     |________________|/`

export function ArcadeLayout({
  profile,
  onProfileChange,
  githubData,
  contributor,
  error,
}: DesignLayoutProps) {
  const repos = getProductRepos(githubData.repos)

  return (
    <div className="arcade-shell">
      <header className="arcade-header">
        <a href="#arcade-start">
          <IconTrophy aria-hidden="true" />
          <strong>NETKO ASCII ARCADE</strong>
        </a>
        <span>PLAYER 1: {contributor.name.toUpperCase()}</span>
        <Button
          nativeButton={false}
          render={<a href={githubData.organization.url} rel="noreferrer" target="_blank" />}
          variant="outline"
        >
          <IconBrandGithub data-icon="inline-start" />
          GitHub
        </Button>
      </header>

      <ProfileSwitcher
        label="SELECT A CABINET"
        layout="tape"
        onChange={onProfileChange}
        profile={profile}
      />

      <main id="main-content">
        <section className="arcade-hero" id="arcade-start">
          <div className="arcade-hero__marquee">INSERT CURIOSITY</div>
          <div className="arcade-hero__copy">
            <p>10 PRINT “BUILD SOMETHING USEFUL”; 20 GOTO 10</p>
            <h1>
              DEV TOOLS
              <span>AFTER DARK</span>
            </h1>
            <p>
              Pick a project, chase a high score, and please do not tilt the local infrastructure.
            </p>
            <Button nativeButton={false} render={<a href="#high-scores" />}>
              <IconPlayerPlay data-icon="inline-start" />
              press start
            </Button>
          </div>
          <pre aria-hidden="true">{arcadeCabinet}</pre>
        </section>

        <section className="arcade-scores" id="high-scores">
          <header>
            <span>HIGH SCORES / PUBLIC REPOS</span>
            <span>{error ? 'LOCAL SAVE LOADED' : 'LIVE SCOREBOARD'}</span>
          </header>
          <div className="arcade-scores__head" aria-hidden="true">
            <span>RANK</span>
            <span>PLAYER</span>
            <span>CLASS</span>
            <span>STATE</span>
            <span>SCORE</span>
          </div>
          <div className="arcade-scores__list">
            {repos.map((repo, index) => (
              <a
                href={repo.url}
                key={repo.name}
                onClick={() =>
                  trackEvent('project-click', { name: repo.name, placement: 'ascii-arcade' })
                }
                rel="noreferrer"
                target="_blank"
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span>
                  <strong>{repo.name}</strong>
                  <small>{getDescription(repo)}</small>
                </span>
                <span>{repo.language ?? 'Config'}</span>
                <Badge variant="outline">{getStatus(repo)}</Badge>
                <span>{String((repos.length - index) * 1337).padStart(5, '0')}</span>
                <IconArrowUpRight aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>

        <footer className="arcade-footer">
          <span>CREDITS {githubData.publicRepos}</span>
          <span>COFFEE BONUS +100</span>
          <span>CONTINUE? Y/N</span>
        </footer>
      </main>
    </div>
  )
}
