import {
  getDescription,
  getProductRepos,
  getStatus,
} from '@/components/landing/repository-utils'
import type { DesignLayoutProps } from '@/components/landing/designs/design-layout-props'
import { trackEvent } from '@/hooks/use-umami'
import { AsciiBeanStream, AsciiBurst, AsciiWaveform } from './effects'
import { asciiModes } from './modes'
import {
  AsciiAction,
  AsciiBadge,
  AsciiFlipbook,
  AsciiFrame,
  AsciiPrompt,
  AsciiRule,
  AsciiStat,
} from './primitives'

const ROASTER_FRAMES = [
  `      .----------------------.
      | ROASTER_01    196 C   |
      |   .--------.     /    |
      |  / o  o  o \\   /     |
      |  \\  o  o  /   /      |
      |   '--------'    FAN   |
      '----------------------'`,
  `      .----------------------.
      | ROASTER_01    198 C   |
      |   .--------.     -    |
      |  /  o  o  o\\    -    |
      |  \\ o  o   /     -    |
      |   '--------'    FAN   |
      '----------------------'`,
  `      .----------------------.
      | ROASTER_01    201 C   |
      |   .--------.     \\    |
      |  / o   o  o\\     \\   |
      |  \\  o  o  /      \\   |
      |   '--------'    FAN   |
      '----------------------'`,
  `      .----------------------.
      | ROASTER_01  1ST CRACK |
      |   .--------.     |    |
      |  /  o * o  \\    |    |
      |  \\ o  o  o /    |    |
      |   '--------'    FAN   |
      '----------------------'`,
] as const

export function AsciiRoasterRackBoard({ githubData, contributor, profile }: DesignLayoutProps) {
  const mode = asciiModes[profile]
  const repos = getProductRepos(githubData.repos).slice(0, 6)

  return (
    <div className="ascii-roaster-board">
      <AsciiFrame
        className="ascii-roaster-hero"
        headingLevel="span"
        meta="rack 0 / thermal console"
        title="NETKO SMALL-BATCH ROASTER"
      >
        <div className="ascii-roaster-copy">
          <p className="ascii-roaster-kicker">[ AIRFLOW: GOOD ] [ VIBES: MEDIUM-HIGH ]</p>
          <AsciiPrompt command={mode.command} output={mode.output} />
          <h1>
            {mode.headline[0]}
            <span>{mode.headline[1]}</span>
          </h1>
          <p>{mode.lede}</p>
          <AsciiAction href="#roast-batches">open batch drawer</AsciiAction>
        </div>
        <div className="ascii-roaster-machine">
          <AsciiBurst />
          <AsciiFlipbook frames={ROASTER_FRAMES} label="A rack-mounted coffee roaster spinning" />
          <AsciiBeanStream />
          <AsciiWaveform />
        </div>
        <div className="ascii-roaster-heat" aria-hidden="true">
          <span>HEAT</span>
          <span>[||||||||||||||||||||......]</span>
          <span>201 C</span>
        </div>
      </AsciiFrame>

      <AsciiFrame
        className="ascii-roaster-batches"
        meta={`${repos.length} trays cooling`}
        title="ACTIVE ROAST BATCHES"
      >
        <div className="ascii-roaster-batch-grid" id="roast-batches">
          {repos.map((repo, index) => (
            <article className="ascii-roaster-batch" key={repo.name}>
              <div className="ascii-roaster-batch__dial" aria-hidden="true">
                {`[${String(index + 1).padStart(2, '0')}]`}
                <span>{index % 2 === 0 ? '/---\\' : '\\---/'}</span>
              </div>
              <h2>{repo.name}</h2>
              <p>{getDescription(repo)}</p>
              <div>
                <AsciiBadge>{repo.language ?? 'mixed roast'}</AsciiBadge>
                <AsciiBadge>{getStatus(repo)}</AsciiBadge>
              </div>
              <a
                href={repo.url}
                onClick={() =>
                  trackEvent('project-click', {
                    name: repo.name,
                    placement: 'ascii-roaster-rack',
                  })
                }
                rel="noreferrer"
                target="_blank"
              >
                [ pull batch -&gt; ]
              </a>
            </article>
          ))}
        </div>
      </AsciiFrame>

      <AsciiFrame className="ascii-roaster-console" meta="operator nearby" title="RACK TELEMETRY">
        <dl>
          <AsciiStat label="roaster" value={contributor.name} />
          <AsciiStat label="public_batches" value={githubData.publicRepos} />
          <AsciiStat label="airflow" value="steady-ish" />
          <AsciiStat label="next_drop" value="when it smells right" />
        </dl>
        <AsciiRule character="~" />
        <div className="ascii-roaster-console__log">
          {mode.statusLines.map((line, index) => (
            <p key={line}>
              <span>{`thermistor.0${index}`}</span>
              <span>{line}</span>
            </p>
          ))}
        </div>
      </AsciiFrame>
    </div>
  )
}
