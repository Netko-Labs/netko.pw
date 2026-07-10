import { IconArrowUpRight, IconGitFork, IconStar } from '@tabler/icons-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { trackEvent } from '@/hooks/use-umami'
import type { RepoData } from '@/types'
import {
  formatDate,
  getDescription,
  getFeaturedRepo,
  getProductRepos,
  getStatus,
} from './repository-utils'

interface RepositoryIndexProps {
  repos: RepoData[]
}

function RepositoryRow({ repo, index }: { repo: RepoData; index: number }) {
  return (
    <a
      className="repository-row"
      href={repo.url}
      onClick={() => trackEvent('project-click', { name: repo.name, placement: 'index' })}
      rel="noreferrer"
      target="_blank"
    >
      <span className="repository-row__index">{String(index).padStart(2, '0')}</span>
      <span className="repository-row__body">
        <strong>{repo.name}</strong>
        <span>{getDescription(repo)}</span>
      </span>
      <span className="repository-row__meta">
        <span>{repo.language ?? 'Config'}</span>
        <span>{getStatus(repo)}</span>
        <time dateTime={repo.pushedAt}>{formatDate(repo.pushedAt)}</time>
      </span>
      <IconArrowUpRight aria-hidden="true" />
    </a>
  )
}

export function RepositoryIndex({ repos }: RepositoryIndexProps) {
  const productRepos = getProductRepos(repos)
  const featured = getFeaturedRepo(repos)
  const indexedRepos = productRepos.filter((repo) => repo.name !== featured?.name)

  return (
    <section className="repository-index" id="source-map">
      <div className="section-heading">
        <div>
          <span className="section-heading__index">01</span>
          <div>
            <p>SOURCE MAP</p>
            <h2>What is shipping.</h2>
          </div>
        </div>
        <p>Sorted by last push / UTC</p>
      </div>

      {featured ? (
        <article className="featured-repository">
          <div className="featured-repository__signal" aria-hidden="true">
            <span>FEATURED MODULE</span>
            <strong>001</strong>
          </div>
          <div className="featured-repository__body">
            <div className="featured-repository__badges">
              <Badge>{getStatus(featured).toUpperCase()}</Badge>
              {featured.language ? <Badge variant="outline">{featured.language}</Badge> : null}
              {featured.license ? <Badge variant="outline">{featured.license}</Badge> : null}
            </div>
            <h3>{featured.name}</h3>
            <p>{getDescription(featured)}</p>
            <div className="featured-repository__topics">
              {featured.topics.slice(0, 5).map((topic) => (
                <span key={topic}>#{topic}</span>
              ))}
            </div>
          </div>
          <div className="featured-repository__meta">
            <dl>
              <div>
                <dt>last_push</dt>
                <dd>{formatDate(featured.pushedAt)}</dd>
              </div>
              <div>
                <dt>signals</dt>
                <dd>
                  <IconStar aria-hidden="true" /> {featured.stars}
                  <IconGitFork aria-hidden="true" /> {featured.forks}
                </dd>
              </div>
            </dl>
            <Button
              onClick={() =>
                trackEvent('project-click', { name: featured.name, placement: 'featured' })
              }
              render={<a href={featured.url} rel="noreferrer" target="_blank" />}
            >
              Open repository
              <IconArrowUpRight data-icon="inline-end" />
            </Button>
          </div>
        </article>
      ) : null}

      <Separator />

      <div className="repository-list">
        {indexedRepos.map((repo, index) => (
          <RepositoryRow index={index + 2} key={repo.name} repo={repo} />
        ))}
      </div>
    </section>
  )
}
