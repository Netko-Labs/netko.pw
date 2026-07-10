import { trackEvent } from '@/hooks/use-umami'
import type { DesignLayoutProps } from '../designs/design-layout-props'
import { getDescription, getProductRepos, getStatus } from '../repository-utils'
import { asciiModes } from './modes'
import { AsciiAction, AsciiArt, AsciiBadge, AsciiFrame, AsciiRule } from './primitives'

export function AsciiZineBoard({ githubData, contributor, profile }: DesignLayoutProps) {
  const mode = asciiModes[profile]
  const repos = getProductRepos(githubData.repos)

  return (
    <div className="ascii-zine-board">
      <AsciiFrame
        className="ascii-zine-cover"
        headingLevel="span"
        meta="issue_06.txt"
        title="CLI_ZINE"
      >
        <div className="ascii-zine-cover__stamp">[ CUT / PASTE / COMPILE ]</div>
        <div className="ascii-zine-cover__layout">
          <div>
            <p>OPEN SOURCE :: BOGOTA :: NO GLOSSY PAPER</p>
            <h1>
              CTRL+C
              <span>CTRL+MAKE</span>
            </h1>
            <p>{mode.lede}</p>
          </div>
          <AsciiArt label="art director / cat">{mode.art}</AsciiArt>
        </div>
        <AsciiRule character="=" />
        <p className="ascii-zine-cover__note">
          {'<<'} tiny software for annoying problems :: {githubData.publicRepos} repos inside {'>>'}
        </p>
      </AsciiFrame>

      <section className="ascii-zine-index" id="ascii-projects">
        <div className="ascii-section-label">
          <span>[ tear_out_project_index ]</span>
          <span>stuff made instead of another planning doc</span>
        </div>
        <div className="ascii-zine-index__grid">
          {repos.map((repo, index) => (
            <AsciiFrame
              as="article"
              className="ascii-zine-card"
              headingLevel="h3"
              key={repo.name}
              meta={`clip_${String(index + 1).padStart(2, '0')}`}
              title={repo.name}
            >
              <p>{getDescription(repo)}</p>
              <div>
                <AsciiBadge>{repo.language ?? 'config'}</AsciiBadge>
                <AsciiBadge>{getStatus(repo)}</AsciiBadge>
              </div>
              <a
                href={repo.url}
                onClick={() =>
                  trackEvent('project-click', { name: repo.name, placement: 'full-ascii-zine' })
                }
                rel="noreferrer"
                target="_blank"
              >
                [ open_scrap -&gt; ]
              </a>
            </AsciiFrame>
          ))}
        </div>
      </section>

      <AsciiFrame className="ascii-zine-colophon" meta="cat approved" title="COLOPHON">
        <div>
          <p>words + code + coffee :: {contributor.name}</p>
          <p>{contributor.bio}</p>
        </div>
        <pre aria-hidden="true">{'[x] source open\n[x] edges rough\n[x] ship anyway'}</pre>
        <AsciiAction href="#ascii-projects">flip back</AsciiAction>
      </AsciiFrame>
    </div>
  )
}
