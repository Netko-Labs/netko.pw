import { trackEvent } from '@/hooks/use-umami'
import type { DesignLayoutProps } from '../designs/design-layout-props'
import { getDescription, getProductRepos, getStatus } from '../repository-utils'
import { AsciiBurst } from './effects'
import { asciiModes } from './modes'
import { AsciiAction, AsciiArt, AsciiBadge, AsciiFrame, AsciiRule } from './primitives'

export function AsciiArcadeBoard({ githubData, contributor, profile }: DesignLayoutProps) {
  const mode = asciiModes[profile]
  const repos = getProductRepos(githubData.repos)

  return (
    <div className="ascii-arcade-board">
      <AsciiFrame
        className="ascii-arcade-marquee"
        headingLevel="span"
        meta="credits: coffee"
        title="NETKO_ASCII_ARCADE"
      >
        <p>*** INSERT CURIOSITY // NO REFUNDS AFTER DEPLOY ***</p>
        <div>
          <div>
            <p>10 PRINT "BUILD SOMETHING USEFUL"</p>
            <p>20 IF PROD_BUG THEN GOTO 10</p>
            <h1>
              FINAL BOSS
              <span>PROD-ONLY BUG.</span>
            </h1>
            <p>{mode.lede}</p>
            <AsciiAction href="#ascii-high-scores">player_one_start</AsciiAction>
          </div>
          <div className="ascii-arcade-cabinet">
            <AsciiBurst />
            <AsciiArt label="Netko arcade cabinet facing a production-only bug">
              {mode.art}
            </AsciiArt>
          </div>
        </div>
      </AsciiFrame>

      <AsciiFrame
        className="ascii-arcade-scores"
        meta={`player_1: ${contributor.name}`}
        title="HIGH_SCORES.DAT"
      >
        <div className="ascii-score-head" aria-hidden="true">
          <span>RANK</span>
          <span>PLAYER</span>
          <span>CLASS</span>
          <span>STATE</span>
          <span>SCORE</span>
        </div>
        <AsciiRule character="=" />
        <div className="ascii-score-list" id="ascii-high-scores">
          {repos.map((repo, index) => (
            <a
              href={repo.url}
              key={repo.name}
              onClick={() =>
                trackEvent('project-click', { name: repo.name, placement: 'full-ascii-arcade' })
              }
              rel="noreferrer"
              target="_blank"
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <span>
                <strong>{repo.name}</strong>
                <small>{getDescription(repo)}</small>
              </span>
              <span>{repo.language ?? 'config'}</span>
              <AsciiBadge>{getStatus(repo)}</AsciiBadge>
              <span>{String((repos.length - index) * 1337).padStart(5, '0')}</span>
            </a>
          ))}
        </div>
      </AsciiFrame>

      <div className="ascii-arcade-credits">
        <span>[ CREDITS {githubData.publicRepos} ]</span>
        <span>[ COFFEE BONUS +100 ]</span>
        <span>[ CONTINUE? Y/N ]</span>
      </div>
    </div>
  )
}
