import {
  getDescription,
  getProductRepos,
  getStatus,
} from '@/components/landing/repository-utils'
import type { DesignLayoutProps } from '@/components/landing/designs/design-layout-props'
import { trackEvent } from '@/hooks/use-umami'
import { AsciiBeanStream, AsciiWaveform } from './effects'
import { asciiModes } from './modes'
import {
  AsciiAction,
  AsciiBadge,
  AsciiFlipbook,
  AsciiFrame,
  AsciiRule,
  AsciiStat,
} from './primitives'

const PIPE_FRAMES = [
  ` [ HOPPER ]                          [ CUP ]
     \\ o /                              .-.
      \\o/     +----+     +--------+     (   )
       |  o----|SORT|-----|  BREW  |---- \\_/
       +-------+----+     +--------+       |
            pressure: [|||||.....]       READY`,
  ` [ HOPPER ]                          [ CUP ]
     \\o  /                              .-.
      \\ /     +----+     +--------+     (   )
       |   o---|SORT|-----|  BREW  |---- \\_/
       +-------+----+     +--------+       |
            pressure: [||||||....]       READY`,
  ` [ HOPPER ]                          [ CUP ]
     \\  o/                              .-.
      \\ /     +----+     +--------+     (   )
       |    o--|SORT|-----|  BREW  |---- \\_/
       +-------+----+     +--------+       |
            pressure: [||||||||..]       READY`,
  ` [ HOPPER ]                          [ CUP ]
     \\ o /                              .-.
      \\ /     +----+     +--------+     (   )
       |     o-|SORT|-----|  BREW  |---- \\_/
       +-------+----+     +--------+       |
            pressure: [||||||||||]       POUR`,
] as const

export function AsciiBeanPipeBoard({ githubData, contributor, profile }: DesignLayoutProps) {
  const mode = asciiModes[profile]
  const repos = getProductRepos(githubData.repos).slice(0, 6)

  return (
    <div className="ascii-pipe-board">
      <AsciiFrame
        className="ascii-pipe-hero"
        headingLevel="span"
        meta="flow controller / line 01"
        title="BEAN-TO-BUILD PIPELINE"
      >
        <div className="ascii-pipe-copy">
          <p>[ INLET: CURIOUS ] [ OUTLET: USEFUL-ISH ]</p>
          <h1>
            {mode.headline[0]}
            <span>{mode.headline[1]}</span>
          </h1>
          <p>{mode.lede}</p>
          <div className="ascii-actions">
            <AsciiAction href="#pipe-manifold">inspect manifold</AsciiAction>
            <AsciiAction external href={githubData.organization.url}>
              bypass to github
            </AsciiAction>
          </div>
        </div>
        <div className="ascii-pipe-machine">
          <AsciiFlipbook frames={PIPE_FRAMES} label="Beans moving through a software brew pipeline" />
          <AsciiBeanStream />
          <AsciiWaveform />
        </div>
        <AsciiRule character="=" />
        <div className="ascii-pipe-command">
          <span>$ {mode.command}</span>
          <span>{'->'} {mode.output}</span>
        </div>
      </AsciiFrame>

      <section className="ascii-pipe-manifold" id="pipe-manifold">
        {repos.map((repo, index) => (
          <AsciiFrame
            as="article"
            className="ascii-pipe-node"
            headingLevel="h3"
            key={repo.name}
            meta={getStatus(repo)}
            title={`VALVE_0${index + 1}`}
          >
            <div className="ascii-pipe-valve" aria-hidden="true">
              <span>{index % 2 === 0 ? '--o--' : '--O--'}</span>
              <span>{index % 2 === 0 ? '/ | \\' : '\\ | /'}</span>
            </div>
            <h2>{repo.name}</h2>
            <p>{getDescription(repo)}</p>
            <div>
              <AsciiBadge>{repo.language ?? 'house blend'}</AsciiBadge>
              <AsciiBadge>{getStatus(repo)}</AsciiBadge>
            </div>
            <a
              href={repo.url}
              onClick={() =>
                trackEvent('project-click', { name: repo.name, placement: 'ascii-bean-pipe' })
              }
              rel="noreferrer"
              target="_blank"
            >
              {'< open_valve >'}
            </a>
          </AsciiFrame>
        ))}
      </section>

      <AsciiFrame className="ascii-pipe-telemetry" meta="pressure nominal-ish" title="FLOW TELEMETRY">
        <dl>
          <AsciiStat label="operator" value={contributor.name} />
          <AsciiStat label="lines_open" value={repos.length} />
          <AsciiStat label="public_output" value={githubData.publicRepos} />
          <AsciiStat label="backpressure" value="mostly emotional" />
        </dl>
        <div className="ascii-pipe-log">
          {mode.statusLines.map((line) => (
            <p key={line}>+ {line}</p>
          ))}
        </div>
      </AsciiFrame>
    </div>
  )
}
