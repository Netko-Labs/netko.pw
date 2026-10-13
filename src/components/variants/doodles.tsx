import type { DoodleProps, WashiTapeProps } from '@/types'

const STROKE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeWidth: 3,
} as const

export function WavyUnderline({ className }: DoodleProps) {
  return (
    <svg aria-hidden className={className} viewBox="0 0 300 20" preserveAspectRatio="none">
      <path d="M4 12 C 40 2, 70 20, 110 10 S 180 2, 220 12 S 280 18, 296 8" {...STROKE} />
    </svg>
  )
}

export function DoodleArrow({ className }: DoodleProps) {
  return (
    <svg aria-hidden className={className} viewBox="0 0 120 60">
      <path d="M110 8 C 80 10, 40 18, 14 48" {...STROKE} />
      <path d="M12 30 L 14 48 L 32 46" {...STROKE} />
    </svg>
  )
}

export function DoodleStar({ className }: DoodleProps) {
  return (
    <svg aria-hidden className={className} viewBox="0 0 60 60">
      <path d="M30 6 L36 24 L54 24 L40 35 L46 53 L30 42 L14 53 L20 35 L6 24 L24 24 Z" {...STROKE} />
    </svg>
  )
}

export function DoodleCheck({ className }: DoodleProps) {
  return (
    <svg aria-hidden className={className} viewBox="0 0 40 40">
      <path d="M6 8 L34 6 L35 34 L7 35 Z" {...STROKE} strokeWidth={2.5} />
      <path d="M10 20 L18 28 L34 4" {...STROKE} strokeWidth={4} />
    </svg>
  )
}

export function WashiTape({ color, className = '' }: WashiTapeProps) {
  return (
    <span
      aria-hidden
      className={`absolute h-7 w-24 opacity-80 ${className}`}
      style={{
        background: `repeating-linear-gradient(45deg, ${color} 0 8px, color-mix(in oklab, ${color} 70%, white) 8px 16px)`,
      }}
    />
  )
}
