import type { CSSProperties } from 'react'
import { PALETTE } from '@/generated/brand-art'
import type { PixelBoxProps, PixelBubbleProps, PixelKeyProps, PixelSpriteProps } from '@/types'

const FILL: Record<string, string> = { '#': 'currentColor', a: PALETTE.sakura, w: '#FFFFFF' }

export function PixelSprite({ rows, scale, className, label }: PixelSpriteProps) {
  const width = rows[0].length
  const runs = rows.flatMap((row, y) =>
    [...row.matchAll(/(#+|a+|w+)/g)].map((match) => ({
      x: match.index,
      y,
      width: match[0].length,
      fill: FILL[match[0][0]],
    })),
  )
  return (
    <svg
      aria-hidden={label ? undefined : true}
      aria-label={label}
      className={className}
      height={rows.length * scale}
      role={label ? 'img' : undefined}
      shapeRendering="crispEdges"
      viewBox={`0 0 ${width} ${rows.length}`}
      width={width * scale}
    >
      {runs.map((run) => (
        <rect
          fill={run.fill}
          height={1}
          key={`${run.x}-${run.y}`}
          width={run.width}
          x={run.x}
          y={run.y}
        />
      ))}
    </svg>
  )
}

export function PixelBox({
  children,
  className = '',
  innerClassName = '',
  style,
  innerStyle,
  isLifted,
}: PixelBoxProps) {
  return (
    <div
      className={`${isLifted ? 'pixel-lift' : 'pixel-outline'} ${className}`}
      style={{ '--outline': 'var(--holo-outline)', ...style } as CSSProperties}
    >
      <div className={`pixel-corners ${innerClassName}`} style={innerStyle}>
        {children}
      </div>
    </div>
  )
}

export function PixelKey({ label, isPressed, onPress }: PixelKeyProps) {
  return (
    <button
      aria-label={`Press ${label}`}
      className={`transition-transform ${isPressed ? 'translate-y-1.5' : ''}`}
      onClick={() => onPress(label)}
      type="button"
    >
      <PixelBox
        innerClassName={`grid size-14 place-items-center font-mono text-2xl sm:size-[4.5rem] sm:text-3xl ${
          isPressed ? 'bg-sakura text-sumi' : 'bg-[var(--holo-key)] text-[var(--holo-key-ink)]'
        }`}
        innerStyle={{ '--s': '5px' } as CSSProperties}
        isLifted={!isPressed}
      >
        {label}
      </PixelBox>
    </button>
  )
}

export function PixelBubble({ text }: PixelBubbleProps) {
  return (
    <PixelBox
      className="relative"
      innerClassName="bg-[var(--holo-key)] px-3 py-1.5 font-mono text-[var(--holo-key-ink)] text-sm"
      innerStyle={{ '--s': '4px' } as CSSProperties}
    >
      {text}
    </PixelBox>
  )
}
