import { IconArrowUpRight, IconBrandGithub, IconMapPin, IconWorld } from '@tabler/icons-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import type { GitHubData, MainContributor } from '@/types'

interface StudioReadoutProps {
  contributor: MainContributor
  githubData: GitHubData
}

const stackCandidates = ['TypeScript', 'Rust', 'Bun', 'Chromium', 'CEF', 'Hono', 'tRPC']

export function StudioReadout({ contributor, githubData }: StudioReadoutProps) {
  const repositorySignal = githubData.repos
    .flatMap((repo) => [repo.language, repo.description, ...repo.topics])
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
  const activeStack = stackCandidates.filter((item) =>
    repositorySignal.includes(item.toLowerCase()),
  )

  return (
    <section className="studio-readout" id="operator">
      <div className="section-heading">
        <div>
          <span className="section-heading__index">02</span>
          <div>
            <p>OPERATOR NOTES</p>
            <h2>Human at the terminal.</h2>
          </div>
        </div>
        <p>Independent / open source</p>
      </div>

      <div className="studio-readout__grid">
        <article className="operator-card">
          <div className="operator-card__portrait">
            <img alt="" src={contributor.avatar} />
            <span aria-hidden="true" />
          </div>
          <div className="operator-card__copy">
            <p className="operator-card__label">PRIMARY OPERATOR</p>
            <h3>{contributor.name}</h3>
            <p>{contributor.bio}</p>
            <div className="operator-card__location">
              <IconMapPin aria-hidden="true" />
              <span>{contributor.location}</span>
              <span>/</span>
              <span>@{contributor.login}</span>
            </div>
            <div className="operator-card__actions">
              <Button
                render={<a href={contributor.url} rel="noreferrer" target="_blank" />}
                variant="outline"
              >
                <IconBrandGithub data-icon="inline-start" />
                GitHub
              </Button>
              {contributor.website ? (
                <Button
                  render={<a href={contributor.website} rel="noreferrer" target="_blank" />}
                  variant="outline"
                >
                  <IconWorld data-icon="inline-start" />
                  peje.dev
                  <IconArrowUpRight data-icon="inline-end" />
                </Button>
              ) : null}
            </div>
          </div>
        </article>

        <article className="stack-readout">
          <div className="stack-readout__topline">
            <span>$ rg --stats ./netko-labs</span>
            <Badge variant="outline">LIVE INDEX</Badge>
          </div>
          <Separator />
          <div className="stack-readout__body">
            <p>Current repository signals</p>
            <div className="stack-readout__tags">
              {activeStack.map((item) => (
                <Badge key={item} variant="outline">
                  {item}
                </Badge>
              ))}
            </div>
            <dl>
              <div>
                <dt>source policy</dt>
                <dd>public by default</dd>
              </div>
              <div>
                <dt>tool bias</dt>
                <dd>local-first / developer-owned</dd>
              </div>
              <div>
                <dt>organization</dt>
                <dd>{githubData.publicRepos} public repositories</dd>
              </div>
              <div>
                <dt>status</dt>
                <dd>still shipping</dd>
              </div>
            </dl>
          </div>
        </article>
      </div>
    </section>
  )
}
