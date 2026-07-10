import { IconActivity, IconArrowUpRight, IconBrandGithub, IconCpu } from '@tabler/icons-react'
import { ProfileSwitcher } from '@/components/landing/profile-switcher'
import { getDescription, getProductRepos, getStatus } from '@/components/landing/repository-utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { trackEvent } from '@/hooks/use-umami'
import type { DesignLayoutProps } from './design-layout-props'

const antennaCat = `   /\\_/\\
  ( o.o )  ))
   > ^ <  )))
  /|___|\\  ))
 signal: curious`

export function CircuitLayout({
  profile,
  onProfileChange,
  githubData,
  contributor,
  loading,
  error,
}: DesignLayoutProps) {
  const repos = getProductRepos(githubData.repos).slice(0, 6)

  return (
    <div className="circuit-shell">
      <header className="circuit-header">
        <a href="#circuit-map">
          <IconCpu aria-hidden="true" />
          <strong>NETKO TOPOLOGY</strong>
          <span>repos talking to repos</span>
        </a>
        <div>
          <span>
            <IconActivity aria-hidden="true" /> {loading ? 'tracing...' : 'signal stable enough'}
          </span>
          <Button
            nativeButton={false}
            render={<a href={githubData.organization.url} rel="noreferrer" target="_blank" />}
            variant="outline"
          >
            <IconBrandGithub data-icon="inline-start" />
            source
          </Button>
        </div>
      </header>

      <ProfileSwitcher
        label="ROUTE TO ANOTHER DESIGN"
        layout="tabs"
        onChange={onProfileChange}
        profile={profile}
      />

      <main id="main-content">
        <section className="circuit-map" id="circuit-map">
          <svg aria-hidden="true" viewBox="0 0 1200 760">
            <path d="M600 380 190 145M600 380 600 105M600 380 1010 145M600 380 190 615M600 380 600 655M600 380 1010 615" />
            <circle cx="600" cy="380" r="180" />
            <circle cx="600" cy="380" r="245" />
          </svg>

          <div className="circuit-core">
            <pre aria-hidden="true">{antennaCat}</pre>
            <h1>
              a small network
              <span>of useful side quests.</span>
            </h1>
            <p>Pick a node. Follow the wire. See what we have been tinkering with.</p>
          </div>

          {repos.map((repo, index) => (
            <a
              className="circuit-node"
              data-circuit-node={index + 1}
              href={repo.url}
              key={repo.name}
              onClick={() =>
                trackEvent('project-click', { name: repo.name, placement: 'circuit-map' })
              }
              rel="noreferrer"
              target="_blank"
            >
              <span>NODE 0{index + 1}</span>
              <h2>{repo.name}</h2>
              <p>{getDescription(repo)}</p>
              <footer>
                <Badge variant="outline">{repo.language ?? 'Config'}</Badge>
                <Badge>{getStatus(repo)}</Badge>
                <IconArrowUpRight aria-hidden="true" />
              </footer>
            </a>
          ))}
        </section>

        <section className="circuit-footer">
          <span>OPERATOR / {contributor.name}</span>
          <span>{githubData.publicRepos} TOTAL ENDPOINTS</span>
          <span>{error ? 'LOCAL ROUTE ACTIVE' : 'PUBLIC ROUTE ACTIVE'}</span>
        </section>
      </main>
    </div>
  )
}
