import { AsciiSignalTicker } from './effects'

export function AsciiDaemonBar() {
  return (
    <div className="ascii-daemon-bar" data-slot="ascii-daemon-bar">
      <span className="ascii-daemon-bar__identity">
        <span aria-hidden="true" className="ascii-daemon-bar__pulse">
          *
        </span>{' '}
        COFFEE_DAEMON :: AFTER_HOURS
      </span>

      <AsciiSignalTicker />

      <span className="ascii-daemon-bar__session">
        <span aria-hidden="true" className="ascii-daemon-bar__spinner">
          <span>{'|/-\\'}</span>
        </span>{' '}
        tty7
        <span aria-hidden="true" className="ascii-daemon-bar__cursor">
          _
        </span>
      </span>
    </div>
  )
}
