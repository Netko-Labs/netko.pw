const RAIN_COLUMNS = [
  "|\n.\n:\n'\n|\n.\n:\n|",
  ".\n|\n'\n:\n.\n|\n.\n'",
  ":\n.\n|\n'\n.\n:\n|\n.",
  "'\n|\n.\n:\n|\n.\n'\n|",
  ".\n:\n|\n.\n'\n|\n.\n:",
  "|\n'\n.\n|\n:\n.\n|\n'",
  ":\n|\n.\n'\n|\n.\n:\n.",
  "'\n.\n|\n:\n.\n|\n'\n.",
  "|\n:\n.\n|\n'\n.\n|\n:",
  ".\n'\n|\n.\n:\n|\n.\n'",
  ":\n.\n|\n'\n.\n|\n:\n.",
  "|\n.\n'\n:\n|\n.\n|\n'",
] as const

const SIGNAL_COPY =
  'root@netko:/srv/lab# ./sidequest --watch :: [ OSS:on ] [ FUN:first ] [ USEFUL:maybe ] [ CAT:root ] [ BUILDS:hot ] // '

const BURST_GLYPHS = ['+', '*', '+', '*', '+', '+', '*', '+', '*', '+', '+', '*'] as const
const BEANS = ['o', 'O', 'o', '.', 'o', 'O', '.', 'o', 'o'] as const
const WAVE = ['_', '.', '/', '|', '\\', '|', '/', '.', '_', '.', '/', '|'] as const

export function AsciiRain() {
  return (
    <div aria-hidden="true" className="ascii-rain" data-slot="ascii-rain">
      {RAIN_COLUMNS.map((column, index) => (
        <pre className="ascii-rain__column" key={`${index}-${column}`}>
          {column}
        </pre>
      ))}
    </div>
  )
}

export function AsciiSignalTicker() {
  return (
    <div aria-hidden="true" className="ascii-ticker" data-slot="ascii-signal-ticker">
      <div className="ascii-ticker__track">
        <span>{SIGNAL_COPY}</span>
        <span>{SIGNAL_COPY}</span>
      </div>
    </div>
  )
}

export function AsciiBurst() {
  return (
    <span aria-hidden="true" className="ascii-burst" data-slot="ascii-burst">
      {BURST_GLYPHS.map((glyph, index) => (
        <span className="ascii-burst__ray" key={`${glyph}-${index}`}>
          {glyph}
        </span>
      ))}
    </span>
  )
}

export function AsciiBeanStream() {
  return (
    <div aria-hidden="true" className="ascii-bean-stream" data-slot="ascii-bean-stream">
      {BEANS.map((bean, index) => (
        <span key={`${bean}-${index}`}>{bean}</span>
      ))}
    </div>
  )
}

export function AsciiWaveform() {
  return (
    <div aria-hidden="true" className="ascii-waveform" data-slot="ascii-waveform">
      {WAVE.map((glyph, index) => (
        <span key={`${glyph}-${index}`}>{glyph}</span>
      ))}
    </div>
  )
}
