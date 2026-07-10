import {
  formatDate,
  getDescription,
  getProductRepos,
  getStatus,
} from '@/components/landing/repository-utils'
import type { DesignLayoutProps } from '@/components/landing/designs/design-layout-props'
import { trackEvent } from '@/hooks/use-umami'
import { AsciiWaveform } from './effects'
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

const BIOS_BREW_FRAMES = [
  `        .----------------.
        | BREWER POST    |
        | [..........]   |
        |       (        |
        |      .---.     |
        |      '---'     |
        '----------------'`,
  `        .----------------.
        | BREWER POST    |
        | [|||.......]   |
        |       )        |
        |      .---.     |
        |      '---'     |
        '----------------'`,
  `        .----------------.
        | BREWER POST    |
        | [|||||||...]   |
        |       ~        |
        |      .---.     |
        |      '---'     |
        '----------------'`,
  `        .----------------.
        | BREWER POST    |
        | [||||||||||]   |
        |      ( )       |
        |      .---.     |
        |      '---'     |
        '----------------'`,
] as const

export function AsciiBrewBiosBoard({ githubData, contributor, profile }: DesignLayoutProps) {
  const mode = asciiModes[profile]
  const repos = getProductRepos(githubData.repos).slice(0, 6)
  const latest = repos[0]

  return (
    <div className="ascii-bios-board">
      <AsciiFrame
        className="ascii-bios-hero"
        headingLevel="span"
        meta="NETKO-BIOS v0.C0FFEE"
        title="POWER-ON POUR TEST"
      >
        <div aria-hidden="true" className="ascii-bios-scanline" />
        <div className="ascii-bios-copy">
          <p className="ascii-bios-memory">640K OF CREMA SHOULD BE ENOUGH FOR ANYONE</p>
          <AsciiPrompt command={mode.command} output={mode.output} />
          <h1>
            {mode.headline[0]}
            <span>{mode.headline[1]}</span>
          </h1>
          <p>{mode.lede}</p>
          <div className="ascii-actions">
            <AsciiAction href="#bios-devices">inspect boot devices</AsciiAction>
            <AsciiAction external href={githubData.organization.url}>
              enter source setup
            </AsciiAction>
          </div>
        </div>
        <div className="ascii-bios-machine">
          <AsciiFlipbook frames={BIOS_BREW_FRAMES} label="Coffee brewer completing its BIOS test" />
          <AsciiWaveform />
          <p>PRESS DEL FOR DECAF SETUP</p>
        </div>
      </AsciiFrame>

      <AsciiFrame className="ascii-bios-diagnostics" meta="all very normal" title="POST.LOG">
        <ol>
          {mode.statusLines.map((line, index) => (
            <li key={line}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <span>{line}</span>
              <AsciiBadge>{index === 2 ? 'READY' : 'OK'}</AsciiBadge>
            </li>
          ))}
        </ol>
        <AsciiRule character="." />
        <dl>
          <AsciiStat label="operator" value={`@${contributor.login}`} />
          <AsciiStat label="coffee_memory" value="64 mugs" />
          <AsciiStat label="latest_boot" value={latest ? formatDate(latest.pushedAt) : 'pending'} />
        </dl>
      </AsciiFrame>

      <AsciiFrame
        className="ascii-bios-devices"
        meta={`${repos.length} bootable repositories`}
        title="BOOT DEVICE PRIORITY"
      >
        <div className="ascii-bios-device-head" id="bios-devices">
          <span>BUS</span>
          <span>DEVICE</span>
          <span>NOTES</span>
          <span>STATE</span>
        </div>
        <div className="ascii-bios-device-list">
          {repos.map((repo, index) => (
            <a
              href={repo.url}
              key={repo.name}
              onClick={() =>
                trackEvent('project-click', { name: repo.name, placement: 'ascii-brew-bios' })
              }
              rel="noreferrer"
              target="_blank"
            >
              <span>{`0${index}:`}</span>
              <strong>{repo.name}</strong>
              <span>{getDescription(repo)}</span>
              <AsciiBadge>{getStatus(repo)}</AsciiBadge>
            </a>
          ))}
        </div>
      </AsciiFrame>
    </div>
  )
}
