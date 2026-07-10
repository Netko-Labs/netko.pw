import type { AsciiShellProps } from '@/types'
import { asciiModes } from './modes'
import { AsciiFlipbook, AsciiRule } from './primitives'

const CLOSING_SHIFT_FRAMES = [
  'cat.close() :: /\\_/\\  tail ----  [ saving session   ]',
  'cat.close() :: /\\_/\\  tail  ---  [ saving session.  ]',
  'cat.close() :: /\\_-\\  tail   --  [ saving session.. ]',
  'cat.close() :: /\\_/\\  tail ----  [ session saved    ]',
] as const

export function AsciiShell({ profile, error, children }: AsciiShellProps) {
  const mode = asciiModes[profile]

  return (
    <div className="ascii-site" data-ascii-mode={profile}>
      <header className="ascii-site__header">
        <AsciiRule character="=" />
        <div className="ascii-site__masthead">
          <a aria-label="Netko Labs home" className="ascii-site__logo" href="#main-content">
            <pre aria-hidden="true" className="ascii-site__logo-cat">
              {' /\\_/\\\n( o.o )\n > ^ <'}
            </pre>
            <span className="ascii-site__logo-type">
              <strong>NETKO::LABS</strong>
              <small>small_tools / sharp_edges</small>
            </span>
          </a>
          <span className="ascii-site__mode">
            <span aria-hidden="true" className="ascii-site__mode-pulse">
              *
            </span>
            [ mode: {mode.slug} ]
            <span aria-hidden="true" className="ascii-site__mode-cursor">
              _
            </span>
          </span>
          <a
            aria-label="Netko Labs organization on GitHub"
            className="ascii-site__org-link"
            href="https://github.com/Netko-Labs"
            rel="noreferrer"
            target="_blank"
          >
            <span aria-hidden="true" className="ascii-site__org-packet">
              o---&gt;
            </span>
            <span>[ github::Netko-Labs / OSS ]</span>
          </a>
        </div>
        <AsciiRule character="=" />
      </header>

      <main className="ascii-site__main" id="main-content">
        {children}
      </main>

      {error ? (
        <p className="ascii-site__error" role="status">
          !! network wandered off :: rendering saved repository snapshot !!
        </p>
      ) : null}

      <footer className="ascii-site__footer">
        <AsciiRule character="-" />
        <div className="ascii-site__footer-line">
          <AsciiFlipbook
            className="ascii-footer-flipbook"
            frames={CLOSING_SHIFT_FRAMES}
            label="The cafe cat saving the terminal session before closing"
          />
          <span>{mode.signoff}</span>
          <a href="#top">[^ back_to_top]</a>
        </div>
        <AsciiRule character="-" />
      </footer>
    </div>
  )
}
