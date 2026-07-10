import {
  getDescription,
  getProductRepos,
  getStatus,
} from '@/components/landing/repository-utils'
import type { DesignLayoutProps } from '@/components/landing/designs/design-layout-props'
import { trackEvent } from '@/hooks/use-umami'
import { AsciiSignalTicker, AsciiWaveform } from './effects'
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

const CAFE_CAT_FRAMES = [
  `     /\\_/\\       (  (
    ( o.o )       )  )
     > ^ <     .--------.
    /     \\    | NETKO |]
   /__|_|__\\   '--------'
      tail: ----`,
  `     /\\_/\\       )  )
    ( o.o )       (  (
     > ^ <     .--------.
    /     \\    | NETKO |]
   /__|_|__\\   '--------'
      tail:  ---`,
  `     /\\_/\\       ~  (
    ( -.- )       )  )
     > ^ <     .--------.
    /     \\    | NETKO |]
   /__|_|__\\   '--------'
      tail:   --`,
  `     /\\_/\\       (  ~
    ( o.o )       (  (
     > ^ <     .--------.
    /     \\    | NETKO |]
   /__|_|__\\   '--------'
      tail: ----`,
] as const

export function AsciiCafeTmuxBoard({ githubData, contributor, profile }: DesignLayoutProps) {
  const mode = asciiModes[profile]
  const repos = getProductRepos(githubData.repos).slice(0, 5)

  return (
    <div className="ascii-tmux-board">
      <AsciiFrame
        className="ascii-tmux-shell"
        headingLevel="span"
        meta="session: cafe / attached"
        title="tmux :: coffee-daemon"
      >
        <AsciiSignalTicker />
        <div className="ascii-tmux-grid">
          <section className="ascii-tmux-pane ascii-tmux-pane--intro">
            <header>[0:bash*] ~/netko/cafe</header>
            <div>
              <AsciiPrompt command={mode.command} output={mode.output} />
              <h1>
                {mode.headline[0]}
                <span>{mode.headline[1]}</span>
              </h1>
              <p>{mode.lede}</p>
              <AsciiAction external href={githubData.organization.url}>
                open the source tab
              </AsciiAction>
            </div>
          </section>

          <section className="ascii-tmux-pane ascii-tmux-pane--cafe">
            <header>[1:cafe] counter / seat 04</header>
            <div>
              <AsciiFlipbook frames={CAFE_CAT_FRAMES} label="A cat beside a steaming cafe mug" />
              <AsciiWaveform />
              <p>barista@netko: cat has focus; please wait _</p>
            </div>
          </section>

          <section className="ascii-tmux-pane ascii-tmux-pane--repos" id="tmux-repos">
            <header>[2:repos] ls -la ./today</header>
            <div className="ascii-tmux-repo-list">
              {repos.map((repo, index) => (
                <a
                  href={repo.url}
                  key={repo.name}
                  onClick={() =>
                    trackEvent('project-click', { name: repo.name, placement: 'ascii-cafe-tmux' })
                  }
                  rel="noreferrer"
                  target="_blank"
                >
                  <span>{index === repos.length - 1 ? '`--' : '|--'}</span>
                  <strong>{repo.name}</strong>
                  <AsciiBadge>{getStatus(repo)}</AsciiBadge>
                  <small>{getDescription(repo)}</small>
                </a>
              ))}
            </div>
          </section>

          <section className="ascii-tmux-pane ascii-tmux-pane--chat">
            <header>[3:staff] tail -f cafe.log</header>
            <div className="ascii-tmux-chat">
              {mode.statusLines.map((line, index) => (
                <p key={line}>
                  <span>{index % 2 === 0 ? 'barista' : 'daemon'}:</span> {line}
                </p>
              ))}
              <p>
                <span>{contributor.login}:</span> okay, ship the small one
              </p>
              <p className="ascii-tmux-cursor">guest: _</p>
            </div>
          </section>
        </div>
        <div className="ascii-tmux-status">
          <span>[coffee-daemon]</span>
          <span>0:bash* 1:cafe 2:repos 3:staff</span>
          <span>"casual mode" 09:42</span>
        </div>
      </AsciiFrame>

      <AsciiFrame className="ascii-tmux-readout" meta="session will persist" title="CAFE READOUT">
        <dl>
          <AsciiStat label="operator" value={`@${contributor.login}`} />
          <AsciiStat label="open_panes" value="4" />
          <AsciiStat label="public_repos" value={githubData.publicRepos} />
          <AsciiStat label="cups_shared" value="∞" />
        </dl>
        <AsciiRule character="-" />
        <p>ctrl+b c makes another table available. nobody has to network.</p>
      </AsciiFrame>
    </div>
  )
}
