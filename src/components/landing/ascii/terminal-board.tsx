import {
  formatDate,
  getDescription,
  getFeaturedRepo,
  getProductRepos,
  getStatus,
} from '@/components/landing/repository-utils'
import { trackEvent } from '@/hooks/use-umami'
import type { DesignLayoutProps } from '../designs/design-layout-props'
import { AsciiBurst, AsciiRain, AsciiSignalTicker } from './effects'
import { asciiModes } from './modes'
import {
  AsciiAction,
  AsciiArt,
  AsciiBadge,
  AsciiFrame,
  AsciiPrompt,
  AsciiRule,
  AsciiStat,
} from './primitives'

export function AsciiTerminalBoard({ profile, githubData, contributor }: DesignLayoutProps) {
  const mode = asciiModes[profile]
  const repos = getProductRepos(githubData.repos)
  const featured = getFeaturedRepo(githubData.repos)
  const latest = repos[0]

  return (
    <div className="ascii-terminal-board" data-terminal-mode={profile}>
      <AsciiFrame
        className="ascii-terminal-board__hero"
        headingLevel="span"
        meta="~/netko-labs"
        title={`0:${mode.slug}*`}
      >
        <AsciiRain />
        <AsciiSignalTicker />
        <div className="ascii-hero-grid">
          <div className="ascii-hero-grid__copy">
            <AsciiPrompt command={mode.command} output={mode.output} />
            <h1>
              {mode.headline[0]}
              <span>{mode.headline[1]}</span>
            </h1>
            <p>{mode.lede}</p>
            <div className="ascii-actions">
              <AsciiAction href="#ascii-projects">list projects</AsciiAction>
              <AsciiAction external href={githubData.organization.url}>
                open github
              </AsciiAction>
            </div>
          </div>
          <div className="ascii-terminal-art">
            <AsciiBurst />
            <AsciiArt label={`resident process :: ${mode.label}`}>{mode.art}</AsciiArt>
          </div>
        </div>
      </AsciiFrame>

      <AsciiFrame
        className="ascii-terminal-board__projects"
        meta={`${repos.length} entries`}
        title="1:projects"
      >
        <div className="ascii-project-list" id="ascii-projects">
          <p>~/netko-labs/</p>
          {repos.map((repo, index) => (
            <a
              href={repo.url}
              key={repo.name}
              onClick={() =>
                trackEvent('project-click', { name: repo.name, placement: 'full-ascii-terminal' })
              }
              rel="noreferrer"
              target="_blank"
            >
              <span aria-hidden="true">{index === repos.length - 1 ? '`--' : '|--'}</span>
              <strong>{repo.name}/</strong>
              <span>{repo.language ?? 'config'}</span>
              <AsciiBadge>{getStatus(repo)}</AsciiBadge>
            </a>
          ))}
        </div>
      </AsciiFrame>

      <AsciiFrame className="ascii-terminal-board__log" meta="tail -f" title="2:build.log">
        <div className="ascii-log-lines">
          {mode.statusLines.map((line, index) => (
            <p key={line}>
              <span>
                {String(index + 1).padStart(2, '0')}:{17 + index * 11}
              </span>
              <AsciiBadge>{index === mode.statusLines.length - 1 ? 'done' : 'ok'}</AsciiBadge>
              <span>{line}</span>
            </p>
          ))}
        </div>
      </AsciiFrame>

      <AsciiFrame
        className="ascii-terminal-board__readme"
        meta="currently poking at"
        title="3:readme"
      >
        {featured ? (
          <div className="ascii-featured">
            <span># side_quest</span>
            <h2>{featured.name}</h2>
            <p>{getDescription(featured)}</p>
            <div>
              <AsciiBadge>{featured.language ?? 'config'}</AsciiBadge>
              <AsciiBadge>{getStatus(featured)}</AsciiBadge>
            </div>
            <AsciiAction external href={featured.url}>
              inspect rabbit hole
            </AsciiAction>
          </div>
        ) : null}
      </AsciiFrame>

      <AsciiFrame className="ascii-terminal-board__who" meta="mostly human" title="4:whoami">
        <div className="ascii-whoami">
          <pre aria-hidden="true">{'  .----.\n / o  o \\\n|   --   |\n \\______//'}</pre>
          <div>
            <p>user :: {contributor.name}</p>
            <p>role :: {contributor.bio}</p>
            <p>loc&nbsp; :: {contributor.location}</p>
          </div>
        </div>
      </AsciiFrame>

      <AsciiFrame className="ascii-terminal-board__stats" meta="live-ish" title="5:status">
        <dl className="ascii-stats">
          <AsciiStat label="public_repos" value={githubData.publicRepos} />
          <AsciiStat label="latest_push" value={latest ? formatDate(latest.pushedAt) : 'soon'} />
          <AsciiStat label="languages" value={githubData.languages.join(' + ')} />
        </dl>
        <AsciiRule character="." />
        <p className="ascii-idle-prompt">
          $ <span aria-hidden="true">_</span>
        </p>
      </AsciiFrame>
    </div>
  )
}
