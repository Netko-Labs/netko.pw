import { trackEvent } from '@/hooks/use-umami'
import type { DesignLayoutProps } from '../designs/design-layout-props'
import { getDescription, getProductRepos, getStatus } from '../repository-utils'
import { AsciiBurst, AsciiSignalTicker } from './effects'
import { asciiModes } from './modes'
import { AsciiArt, AsciiBadge, AsciiFrame, AsciiRule, AsciiStat } from './primitives'

export function AsciiCircuitBoard({ githubData, contributor, profile }: DesignLayoutProps) {
  const mode = asciiModes[profile]
  const repos = getProductRepos(githubData.repos).slice(0, 6)

  return (
    <div className="ascii-circuit-board">
      <AsciiFrame
        className="ascii-circuit-core"
        headingLevel="span"
        meta="signal stable enough"
        title="NETKO_TOPOLOGY"
      >
        <AsciiSignalTicker />
        <div className="ascii-circuit-transmitter">
          <AsciiBurst />
          <AsciiArt label="packet radio transmitter and connected repository nodes">
            {mode.art}
          </AsciiArt>
        </div>
        <h1>
          {mode.headline[0]}
          <span>{mode.headline[1]}</span>
        </h1>
        <p>
          Tune until something crackles. Pick a node, follow the wire, and see what answers back.
        </p>
        <AsciiRule character="~" />
        <dl>
          <AsciiStat label="operator" value={contributor.name} />
          <AsciiStat label="endpoints" value={githubData.publicRepos} />
          <AsciiStat label="route" value="public-ish" />
        </dl>
      </AsciiFrame>

      <div className="ascii-circuit-wire" aria-hidden="true">
        <span className="ascii-circuit-packet ascii-circuit-packet--one">o</span>
        <span className="ascii-circuit-packet ascii-circuit-packet--two">*</span>
        <span className="ascii-circuit-packet ascii-circuit-packet--three">+</span>
        <span>{'+------[ packets / coffee / questionable ideas ]------+'}</span>
      </div>

      <section className="ascii-circuit-nodes" id="ascii-projects">
        {repos.map((repo, index) => (
          <AsciiFrame
            as="article"
            className="ascii-circuit-node"
            headingLevel="h3"
            key={repo.name}
            meta={repo.language ?? 'config'}
            title={`NODE_0${index + 1}`}
          >
            <h2>{repo.name}</h2>
            <p>{getDescription(repo)}</p>
            <AsciiBadge>{getStatus(repo)}</AsciiBadge>
            <a
              href={repo.url}
              onClick={() =>
                trackEvent('project-click', { name: repo.name, placement: 'full-ascii-circuit' })
              }
              rel="noreferrer"
              target="_blank"
            >
              {'< route_to_repo >'}
            </a>
          </AsciiFrame>
        ))}
      </section>
    </div>
  )
}
