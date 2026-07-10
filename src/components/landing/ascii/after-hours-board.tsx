import {
  formatDate,
  getAfterHoursRepos,
  getAfterHoursStatus,
  getDescription,
} from '@/components/landing/repository-utils'
import type { DesignLayoutProps } from '@/components/landing/designs/design-layout-props'
import { trackEvent } from '@/hooks/use-umami'
import { AsciiContributorsBooth } from './contributors-booth'
import { AsciiDaemonBar } from './daemon-bar'
import { AsciiRain } from './effects'
import { asciiModes } from './modes'
import {
  AsciiBadge,
  AsciiFlipbook,
  AsciiFrame,
  AsciiRule,
  AsciiStat,
} from './primitives'

const NIGHT_CAFE_FRAMES = [
  `       |     .--------------------.     |
    .  |     | C O F F E E  [ON] |     |  .
       |  .  '--------------------'  .  |
       |       /\\_/\\       (          |
   .   |      ( o.o )       )    .     |
       |  ____ > ^ < ____ .---.        |
  _____|_|______________|_'---'________|`,
  `   .   |     .--------------------.     |
       |     | C O F F E E  [ON] |  .  |
       |     '--------------------'     |
    .  |       /\\_/\\        )          |
       |      ( o.o )       (      .   |
       |  ____ > ^ < ____ .---.        |
  _____|_|______________|_'---'________|`,
  `       |  .  .--------------------.     |
   .   |     | C O F F E E  [--] |     |
       |     '--------------------'  .  |
       |       /\\_/\\       ~          |
       |   .  ( -.- )       )          |
    .  |  ____ > ^ < ____ .---.        |
  _____|_|______________|_'---'________|`,
  `  .    |     .--------------------.  .  |
       |     | C O F F E E  [ON] |     |
   .   |     '--------------------'     |
       |       /\\_/\\       (       .  |
       |      ( o.o )       (          |
       |  ____ > ^ < ____ .---.        |
  _____|_|______________|_'---'________|`,
] as const

const REPO_QUEUE_FRAMES = [
  'jobs :: o----o----o  [ scanning ]',
  'jobs :: -o----o----  [ checking ]',
  'jobs :: --o----o---  [ building ]',
  'jobs :: ---o----o--  [ serving  ]',
] as const

const NIGHT_LOG_LINES = [
  ['00:42', 'tiny idea promoted to real repository'],
  ['01:17', 'built the tool we wanted yesterday'],
  ['01:53', 'opened the source before naming it'],
  ['02:26', 'nukk kept its source private for now'],
  ['03:08', 'suzagi.dev queued for open source'],
  ['03:43', 'cat approved the fun-sized release'],
] as const

const LAB_TRACE_FRAMES = [
  'lab.bus :: [idea]--o------[code]------[ship]',
  'lab.bus :: [idea]-----o---[code]------[ship]',
  'lab.bus :: [idea]---------[code]--o---[ship]',
  'lab.bus :: [idea]---------[code]------[ship]*',
] as const

export function AsciiAfterHoursBoard({ githubData, contributor, profile }: DesignLayoutProps) {
  const mode = asciiModes[profile]
  const repos = getAfterHoursRepos(githubData.repos)
  const latest = repos[0]

  return (
    <div className="ascii-night-board">
      <AsciiFrame className="ascii-night-hero" header={<AsciiDaemonBar />}>
        <AsciiRain />
        <div className="ascii-night-grid">
          <div className="ascii-night-copy">
            <p className="ascii-night-sign">[ OSS, MOSTLY FOR FUN ]</p>
            <h1>
              {mode.headline[0]}
              <span>{mode.headline[1]}</span>
            </h1>
            <p>{mode.lede}</p>
            <div className="ascii-night-command">
              <span>$ {mode.command}</span>
              <span>{'->'} {mode.output}</span>
            </div>
          </div>
          <div className="ascii-night-scene">
            <AsciiFlipbook frames={NIGHT_CAFE_FRAMES} label="A rainy late-night terminal cafe with a cat" />
            <p>rain.service :: active</p>
          </div>
        </div>
      </AsciiFrame>

      <AsciiFrame
        className="ascii-night-menu"
        meta={`${repos.length} jobs / source flags`}
        title="LAB PROCESSES"
      >
        <div className="ascii-night-menu__activity">
          <AsciiFlipbook frames={REPO_QUEUE_FRAMES} label="Repository queue moving toward service" />
        </div>
        <div className="ascii-night-menu__list" id="night-menu">
          {repos.map((repo, index) => (
            <a
              href={repo.url}
              key={repo.name}
              onClick={() =>
                trackEvent('project-click', { name: repo.name, placement: 'ascii-after-hours' })
              }
              rel="noreferrer"
              target="_blank"
            >
              <span className="ascii-night-menu__index">
                <span aria-hidden="true" className="ascii-night-menu__led">
                  {index % 2 === 0 ? '*' : '+'}
                </span>
                {String(index + 1).padStart(2, '0')}:
              </span>
              <div>
                <strong>{repo.name}</strong>
                <small>{getDescription(repo)}</small>
              </div>
              <AsciiBadge>{repo.language ?? 'night roast'}</AsciiBadge>
              <AsciiBadge>{getAfterHoursStatus(repo)}</AsciiBadge>
            </a>
          ))}
        </div>
      </AsciiFrame>

      <AsciiFrame className="ascii-night-log" meta="tail -f lab.log" title="NIGHT LOG">
        <div className="ascii-night-log__feed">
          {NIGHT_LOG_LINES.map(([time, line]) => (
            <p key={time}>
              <time>{time}</time>
              <span>{line}</span>
            </p>
          ))}
        </div>
        <div className="ascii-night-log__trace">
          <AsciiFlipbook frames={LAB_TRACE_FRAMES} label="An idea moving through the Netko Labs build bus" />
        </div>
        <div aria-label="Live lab telemetry" className="ascii-night-log__meters">
          <p>
            <span>source.mix</span>
            <code>[#####+]</code>
            <strong>5+1</strong>
          </p>
          <p>
            <span>fun.level</span>
            <code>[######]</code>
            <strong>max</strong>
          </p>
          <p>
            <span>cat.review</span>
            <code>[#####-]</code>
            <strong>pass</strong>
          </p>
        </div>
        <AsciiRule character="." />
        <dl>
          <AsciiStat label="closer" value={`@${contributor.login}`} />
          <AsciiStat label="latest_pour" value={latest ? formatDate(latest.pushedAt) : 'tonight'} />
          <AsciiStat label="lights_on" value="one" />
        </dl>
        <div className="ascii-night-log__motd">
          <span>[ motd ]</span>
          <p>Side quests are the roadmap. Useful software is the happy accident.</p>
        </div>
      </AsciiFrame>

      <AsciiContributorsBooth contributor={contributor} />
    </div>
  )
}
