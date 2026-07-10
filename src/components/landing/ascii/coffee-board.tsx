import {
  formatDate,
  getDescription,
  getProductRepos,
  getStatus,
} from '@/components/landing/repository-utils'
import { trackEvent } from '@/hooks/use-umami'
import type { DesignLayoutProps } from '../designs/design-layout-props'
import { AsciiBeanStream, AsciiSignalTicker, AsciiWaveform } from './effects'
import { asciiModes } from './modes'
import { AsciiAction, AsciiArt, AsciiBadge, AsciiFrame, AsciiRule, AsciiStat } from './primitives'

const COFFEE_DAEMON_ART = `        .-----------------.
       /  BREW DAEMON 1.0  \\
      |  [||||||||||] 100%  |
      |                     |==]
      |      .--------.     |
      |      |        |]    |
      |      |  NETKO |     |
      |      '--------'     |
       \\___________________/
          /_/         \\_\\`

export function AsciiCoffeeBoard({ githubData, contributor, profile }: DesignLayoutProps) {
  const mode = asciiModes[profile]
  const repos = getProductRepos(githubData.repos)
  const latest = repos[0]

  return (
    <div className="ascii-coffee-board">
      <AsciiFrame
        className="ascii-coffee-hero"
        headingLevel="span"
        meta="pid 0xc0ffee :: happily over-caffeinated"
        title="COFFEE_DAEMON"
      >
        <AsciiSignalTicker />
        <div className="ascii-coffee-hero__copy">
          <p className="ascii-coffee-kicker">
            <AsciiBadge>brew online</AsciiBadge>
            <span>small tools / strong coffee / zero meetings before compile</span>
          </p>
          <h1>
            First we brew.
            <span>Then we make useful little things.</span>
          </h1>
          <p>
            Open-source experiments from Bogota, served warm with practical defaults and a
            suspicious number of side quests. Pull up a chair; the dev server is already running.
          </p>
          <div className="ascii-actions">
            <AsciiAction href="#coffee-menu">read today&apos;s menu</AsciiAction>
            <AsciiAction external href={githubData.organization.url}>
              visit the source counter
            </AsciiAction>
          </div>
        </div>

        <div className="ascii-coffee-machine">
          <div aria-hidden="true" className="ascii-coffee-steam">
            <span>(</span>
            <span>)</span>
            <span>~</span>
          </div>
          <AsciiArt label="a terminal-powered coffee machine">{COFFEE_DAEMON_ART}</AsciiArt>
          <AsciiBeanStream />
          <AsciiWaveform />
          <p>
            <AsciiBadge>hot</AsciiBadge> beans compiled :: mug mounted at /dev/cup
          </p>
        </div>

        <AsciiRule character="=" />
        <p className="ascii-coffee-hero__ticker">
          ++ fresh ideas poured continuously ++ refills are free ++ bugs cost one pastry each ++
        </p>
      </AsciiFrame>

      <AsciiFrame
        className="ascii-coffee-log"
        meta="tail -f /var/log/brew-build.log"
        title="BREW + BUILD LOG"
      >
        <div className="ascii-coffee-log__command">
          <span aria-hidden="true">$ </span>
          <code>{mode.command}</code>
          <p>
            <span aria-hidden="true">{'-> '}</span>
            {mode.output}
          </p>
        </div>
        <ol>
          {mode.statusLines.map((line, index) => (
            <li key={line}>
              <time>{`0${8 + index}:${String(12 + index * 9).padStart(2, '0')}`}</time>
              <AsciiBadge>
                {index === mode.statusLines.length - 1 ? 'served' : 'brewing'}
              </AsciiBadge>
              <span>{line}</span>
            </li>
          ))}
        </ol>
        <AsciiRule character="." />
        <p>barista note :: {mode.signoff}. no need to make it weirdly formal.</p>
      </AsciiFrame>

      <AsciiFrame
        className="ascii-coffee-menu"
        meta={`${repos.length} fresh batches available`}
        title="TODAY'S REPO MENU"
      >
        <div className="ascii-coffee-menu__heading" id="coffee-menu">
          <span>ITEM</span>
          <span>ROAST / NOTES</span>
          <span>STATUS</span>
        </div>
        <div className="ascii-coffee-menu__list">
          {repos.map((repo, index) => (
            <article key={repo.name}>
              <div className="ascii-coffee-menu__item">
                <span>{String(index + 1).padStart(2, '0')}.</span>
                <div>
                  <h2>{repo.name}</h2>
                  <p>{getDescription(repo)}</p>
                </div>
                <div>
                  <AsciiBadge>{repo.language ?? 'house blend'}</AsciiBadge>
                  <AsciiBadge>{getStatus(repo)}</AsciiBadge>
                </div>
              </div>
              <a
                href={repo.url}
                onClick={() =>
                  trackEvent('project-click', { name: repo.name, placement: 'ascii-coffee-menu' })
                }
                rel="noreferrer"
                target="_blank"
              >
                [ order source -&gt; ]
              </a>
            </article>
          ))}
        </div>
      </AsciiFrame>

      <AsciiFrame
        className="ascii-coffee-stats"
        meta="values may jitter near deadlines"
        title="OPERATOR / CAFFEINE TELEMETRY"
      >
        <dl>
          <AsciiStat label="operator" value={`@${contributor.login}`} />
          <AsciiStat label="caffeine" value="87% and rising" />
          <AsciiStat label="repos_on_menu" value={githubData.publicRepos} />
          <AsciiStat
            label="latest_batch"
            value={latest ? formatDate(latest.pushedAt) : 'soon-ish'}
          />
        </dl>
        <AsciiRule character="-" />
        <div className="ascii-coffee-stats__operator">
          <AsciiArt>{`  /\\_/\\   [ mug supervisor ]
 ( o.o )  says: ship when useful
  > ^ <         nap when done`}</AsciiArt>
          <div>
            <p>{contributor.name}</p>
            <p>{contributor.bio}</p>
            <p>currently operating from {contributor.location}</p>
          </div>
        </div>
      </AsciiFrame>
    </div>
  )
}
