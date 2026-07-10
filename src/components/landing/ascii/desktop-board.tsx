import { trackEvent } from '@/hooks/use-umami'
import type { DesignLayoutProps } from '../designs/design-layout-props'
import { getDescription, getFeaturedRepo, getProductRepos, getStatus } from '../repository-utils'
import { asciiModes } from './modes'
import { AsciiAction, AsciiArt, AsciiBadge, AsciiFrame, AsciiPrompt } from './primitives'

export function AsciiDesktopBoard({ githubData, contributor, profile }: DesignLayoutProps) {
  const mode = asciiModes[profile]
  const repos = getProductRepos(githubData.repos)
  const featured = getFeaturedRepo(githubData.repos)

  return (
    <div className="ascii-desktop-board">
      <div className="ascii-desktop-menu">
        <span>[*] window_party.os</span>
        <span>[t] terminal</span>
        <span>[p] projects</span>
        <span>[r] readme</span>
        <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>

      <div aria-hidden="true" className="ascii-desktop-toast">
        [ notification ] focus has left the building _
      </div>

      <AsciiFrame
        className="ascii-desktop-terminal"
        headingLevel="span"
        meta="[_][^][x]"
        title="juan@netko:~/window-party"
      >
        <AsciiPrompt command={mode.command} output={mode.output} />
        <h1>
          {mode.headline[0]}
          <span>{mode.headline[1]}</span>
        </h1>
        <p>{mode.lede}</p>
        <AsciiArt>{mode.art}</AsciiArt>
        <AsciiAction external href={githubData.organization.url}>
          open_source_folder
        </AsciiAction>
      </AsciiFrame>

      <AsciiFrame className="ascii-desktop-files" meta="[_][^][x]" title="projects/">
        <div>
          {repos.map((repo, index) => (
            <a
              href={repo.url}
              key={repo.name}
              onClick={() =>
                trackEvent('project-click', { name: repo.name, placement: 'full-ascii-desktop' })
              }
              rel="noreferrer"
              target="_blank"
            >
              <span aria-hidden="true">{index === repos.length - 1 ? '`--' : '|--'} [DIR]</span>
              <strong>{repo.name}</strong>
              <AsciiBadge>{getStatus(repo)}</AsciiBadge>
            </a>
          ))}
        </div>
      </AsciiFrame>

      <AsciiFrame className="ascii-desktop-readme" meta="[_][^][x]" title="README.md">
        <span># CURRENTLY_OPEN</span>
        <h2>{featured?.name ?? 'something new'}</h2>
        <p>{featured ? getDescription(featured) : 'Still deciding what to build next.'}</p>
        {featured ? (
          <AsciiAction external href={featured.url}>
            read_more
          </AsciiAction>
        ) : null}
      </AsciiFrame>

      <AsciiFrame
        as="aside"
        className="ascii-desktop-note"
        headingLevel="h3"
        meta="unsaved"
        title="sticky_note.txt"
      >
        <p>[ ] remember which tab had the answer</p>
        <p>[x] invite the cat to standup</p>
        <p>[~] call this a workflow</p>
        <strong>-- {contributor.name.split(' ')[0]}</strong>
      </AsciiFrame>

      <div className="ascii-desktop-taskbar">
        <span>[ netko ]</span>
        <span>[ {githubData.publicRepos} folders ]</span>
        <span>[ online-ish ]</span>
      </div>
    </div>
  )
}
