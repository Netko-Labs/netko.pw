import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type {
  AsciiActionProps,
  AsciiArtProps,
  AsciiBadgeProps,
  AsciiFlipbookProps,
  AsciiFrameProps,
  AsciiPromptProps,
  AsciiRuleProps,
  AsciiStatProps,
} from '@/types'

const FRAME_EDGE = '-'.repeat(320)
const FRAME_RAIL = Array.from({ length: 240 }, () => '|').join('\n')
const RULE_LENGTH = 320

export function AsciiFrame({
  title,
  meta,
  header,
  className,
  children,
  as = 'section',
  headingLevel = 'h2',
}: AsciiFrameProps) {
  const Element = as
  const Heading = headingLevel

  return (
    <Element className={cn('ascii-frame', className)} data-slot="ascii-frame">
      <div aria-hidden="true" className="ascii-frame__edge ascii-frame__edge--top">
        <span>+</span>
        <span className="ascii-frame__edge-line">{FRAME_EDGE}</span>
        <span>+</span>
      </div>

      <div className="ascii-frame__body">
        <pre aria-hidden="true" className="ascii-frame__rail ascii-frame__rail--left">
          {FRAME_RAIL}
        </pre>

        <div className="ascii-frame__interior">
          <header className={cn('ascii-frame__header', header && 'ascii-frame__header--custom')}>
            {header ?? (
              <>
                <Heading>
                  <span aria-hidden="true">[ </span>
                  {title}
                  <span aria-hidden="true"> ]</span>
                </Heading>
                {meta !== undefined ? (
                  <p>
                    <span aria-hidden="true">&lt; </span>
                    {meta}
                    <span aria-hidden="true"> &gt;</span>
                  </p>
                ) : null}
              </>
            )}
          </header>
          <div className="ascii-frame__content">{children}</div>
        </div>

        <pre aria-hidden="true" className="ascii-frame__rail ascii-frame__rail--right">
          {FRAME_RAIL}
        </pre>
      </div>

      <div aria-hidden="true" className="ascii-frame__edge ascii-frame__edge--bottom">
        <span>+</span>
        <span className="ascii-frame__edge-line">{FRAME_EDGE}</span>
        <span>+</span>
      </div>
    </Element>
  )
}

export function AsciiRule({ character = '-' }: AsciiRuleProps) {
  return (
    <div aria-hidden="true" className="ascii-rule" data-slot="ascii-rule">
      {character.repeat(RULE_LENGTH)}
    </div>
  )
}

export function AsciiArt({ children, label }: AsciiArtProps) {
  if (label) {
    return (
      <pre aria-label={label} className="ascii-art" data-slot="ascii-art" role="img">
        {children}
      </pre>
    )
  }

  return (
    <pre aria-hidden="true" className="ascii-art" data-slot="ascii-art">
      {children}
    </pre>
  )
}

export function AsciiFlipbook({ frames, label, className }: AsciiFlipbookProps) {
  return (
    <div
      aria-label={label}
      className={cn('ascii-flipbook', className)}
      data-slot="ascii-flipbook"
      role="img"
    >
      {frames.map((frame, index) => (
        <pre aria-hidden="true" className="ascii-flipbook__frame" key={`${index}-${frame}`}>
          {frame}
        </pre>
      ))}
    </div>
  )
}

export function AsciiBadge({ children }: AsciiBadgeProps) {
  return (
    <span className="ascii-badge" data-slot="ascii-badge">
      <span aria-hidden="true">{'{'}</span>
      <span className="ascii-badge__label">{children}</span>
      <span aria-hidden="true">{'}'}</span>
    </span>
  )
}

export function AsciiAction({ href, external = false, children }: AsciiActionProps) {
  return (
    <Button
      className="ascii-action"
      nativeButton={false}
      render={
        <a
          href={href}
          rel={external ? 'noreferrer' : undefined}
          target={external ? '_blank' : undefined}
        />
      }
      role="link"
      size="sm"
      variant="ghost"
    >
      <span aria-hidden="true">[</span>
      <span className="ascii-action__label">{children}</span>
      <span aria-hidden="true">]</span>
    </Button>
  )
}

export function AsciiPrompt({ command, output }: AsciiPromptProps) {
  return (
    <div className="ascii-prompt" data-slot="ascii-prompt">
      <p className="ascii-prompt__command">
        <span aria-hidden="true">$ </span>
        <code>{command}</code>
      </p>
      {output !== undefined ? (
        <p className="ascii-prompt__output">
          <span aria-hidden="true">{'-> '}</span>
          <span>{output}</span>
        </p>
      ) : null}
    </div>
  )
}

export function AsciiStat({ label, value }: AsciiStatProps) {
  return (
    <div className="ascii-stat" data-slot="ascii-stat">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}
