import type { CSSProperties } from 'react'
import { PixelMark } from '@/components/site'
import type { PixelConfettiProps } from '@/types'
import { PixelSprite } from './pixel-kit'
import { SPARKLE_SPRITE } from './pixel-sprites'

const BITS = 16
const COLORS = [
  'text-sakura',
  'text-[#6A3FD1] dark:text-[#9DD8FF]',
  'text-[#C98A00] dark:text-[#FFE38A]',
]

const spread = (index: number) => {
  const angle = (index / BITS) * Math.PI * 2 + (index % 3) * 0.2
  const distance = 90 + (index % 4) * 28
  return {
    '--dx': `${Math.cos(angle) * distance}px`,
    '--dy': `${Math.sin(angle) * distance - 40}px`,
    '--r': `${(index % 2 ? 1 : -1) * (90 + index * 12)}deg`,
  } as CSSProperties
}

export function PixelConfetti({ burstKey }: PixelConfettiProps) {
  if (burstKey === 0) return null
  return (
    <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2" key={burstKey}>
      {Array.from({ length: BITS }, (_, index) => (
        <PixelSprite
          className={`confetti-bit absolute ${COLORS[index % COLORS.length]}`}
          key={`${burstKey}-${index}`}
          rows={SPARKLE_SPRITE}
          scale={index % 3 === 0 ? 4 : 3}
          style={spread(index)}
        />
      ))}
    </div>
  )
}

export function PixelWalker() {
  return (
    <div aria-hidden className="relative h-10 overflow-hidden">
      <div className="walker absolute bottom-1">
        <div className="walker-bob">
          <PixelMark size={32} />
        </div>
      </div>
    </div>
  )
}

export function ShootingStars() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden overflow-hidden dark:block"
    >
      <span className="shooting-star top-[12%] left-[62%]" />
      <span className="shooting-star top-[30%] left-[18%] [animation-delay:4.5s]" />
    </div>
  )
}
