import { trackEvent } from '@/hooks/use-umami'
import type { DesignLayoutProps } from '../designs/design-layout-props'
import { formatDate, getDescription, getProductRepos, getStatus } from '../repository-utils'
import { asciiModes } from './modes'
import { AsciiAction, AsciiArt, AsciiBadge, AsciiFrame, AsciiRule } from './primitives'

export function AsciiLogbookBoard({ githubData, contributor, profile }: DesignLayoutProps) {
  const mode = asciiModes[profile]
  const repos = getProductRepos(githubData.repos)

  return (
    <div className="ascii-logbook-board">
      <AsciiFrame
        className="ascii-logbook-hero"
        headingLevel="span"
        meta="HEAD -> main-ish"
        title="git log --human"
      >
        <div>
          <p>$ {mode.command}</p>
          <h1>
            Notes from a<span>very public workbench.</span>
          </h1>
          <p>{mode.lede}</p>
          <AsciiAction external href={githubData.organization.url}>
            browse full history
          </AsciiAction>
        </div>
        <AsciiArt label="tracked beverage">{mode.art}</AsciiArt>
      </AsciiFrame>

      <AsciiFrame
        className="ascii-logbook-history"
        meta={`${repos.length} commits`}
        title="HISTORY"
      >
        <ol>
          {repos.map((repo, index) => (
            <li key={repo.name}>
              <div className="ascii-commit-rail" aria-hidden="true">
                <span>*</span>
                <span>|</span>
                <span>|</span>
              </div>
              <article>
                <header>
                  <code>{`a${(index + 3) * 173}f${index}`}</code>
                  <span>{formatDate(repo.pushedAt)}</span>
                  <AsciiBadge>{getStatus(repo)}</AsciiBadge>
                </header>
                <h2>{repo.name}</h2>
                <p>{getDescription(repo)}</p>
                <AsciiRule character="." />
                <footer>
                  <span>author: {contributor.name}</span>
                  <span>message: "okay, this is useful now"</span>
                  <a
                    href={repo.url}
                    onClick={() =>
                      trackEvent('project-click', { name: repo.name, placement: 'full-ascii-log' })
                    }
                    rel="noreferrer"
                    target="_blank"
                  >
                    [ inspect_diff -&gt; ]
                  </a>
                </footer>
              </article>
            </li>
          ))}
        </ol>
      </AsciiFrame>
    </div>
  )
}
