import { IconArrowUpRight, IconBrandGithub, IconScissors } from '@tabler/icons-react'
import { ProfileSwitcher } from '@/components/landing/profile-switcher'
import { getDescription, getProductRepos, getStatus } from '@/components/landing/repository-utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { trackEvent } from '@/hooks/use-umami'
import type { DesignLayoutProps } from './design-layout-props'

const zineCat = ` /\\_/\\       __________________
( o.o )     / README, BUT LOUD /
 > ^ <     /__________________/
  /|\\        ctrl+c / ctrl+make`

export function ZineLayout({
  profile,
  onProfileChange,
  githubData,
  contributor,
  error,
}: DesignLayoutProps) {
  const repos = getProductRepos(githubData.repos)

  return (
    <div className="zine-shell">
      <header className="zine-header">
        <a href="#zine-cover">
          <span>NL</span>
          <strong>NETKO CLI ZINE</strong>
          <small>ISSUE 06 / PRINTED BY A TERMINAL</small>
        </a>
        <Button
          nativeButton={false}
          render={<a href={githubData.organization.url} rel="noreferrer" target="_blank" />}
          variant="outline"
        >
          <IconBrandGithub data-icon="inline-start" />
          source pile
        </Button>
      </header>

      <ProfileSwitcher
        label="PICK AN ISSUE"
        layout="tape"
        onChange={onProfileChange}
        profile={profile}
      />

      <main id="main-content">
        <section className="zine-cover" id="zine-cover">
          <div className="zine-cover__number">06</div>
          <div className="zine-cover__copy">
            <p>OPEN SOURCE / BOGOTÁ / NO GLOSSY PAPER</p>
            <h1>
              CTRL+C
              <span>CTRL+MAKE</span>
            </h1>
            <p>
              Tiny software for annoying problems. Cut, pasted, compiled, and occasionally
              documented.
            </p>
          </div>
          <div className="zine-cover__ascii">
            <pre aria-hidden="true">{zineCat}</pre>
            <p>Our art director has knocked the keyboard off the desk twice.</p>
          </div>
          <aside className="zine-cover__sticker">
            <IconScissors aria-hidden="true" />
            <strong>KEEP YOUR TOOLS WEIRD</strong>
            <span>{githubData.publicRepos} public repos inside</span>
          </aside>
        </section>

        <section className="zine-projects" id="zine-projects">
          <header>
            <span>TEAR-OUT PROJECT INDEX</span>
            <p>Stuff we made instead of opening another planning doc.</p>
          </header>
          <div className="zine-projects__grid">
            {repos.map((repo, index) => (
              <a
                data-zine-card={index + 1}
                href={repo.url}
                key={repo.name}
                onClick={() =>
                  trackEvent('project-click', { name: repo.name, placement: 'cli-zine' })
                }
                rel="noreferrer"
                target="_blank"
              >
                <span>0{index + 1}</span>
                <h2>{repo.name}</h2>
                <p>{getDescription(repo)}</p>
                <div>
                  <Badge variant="outline">{repo.language ?? 'config'}</Badge>
                  <Badge>{getStatus(repo)}</Badge>
                  <IconArrowUpRight aria-hidden="true" />
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="zine-colophon">
          <div>
            <span>WORDS / CODE / COFFEE</span>
            <h2>{contributor.name}</h2>
            <p>{contributor.bio}</p>
          </div>
          <pre aria-hidden="true">{'[x] source open\n[x] edges rough\n[x] cat approved'}</pre>
          <Button nativeButton={false} render={<a href="#zine-projects" />}>
            flip back to projects
          </Button>
        </section>

        {error ? (
          <p className="zine-error">THE NETWORK PAGE FELL OUT. USING THE SAVED ONE.</p>
        ) : null}
      </main>
    </div>
  )
}
