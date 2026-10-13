import type { CSSProperties } from 'react'
import { ANCHOR, BrandMark, GITHUB_ORG_URL, toHash } from '@/components/site'
import type { ExpressionKey } from '@/types'
import { PixelConfetti, ShootingStars } from './holo-candy'
import { PixelBox, PixelBubble, PixelKey, PixelSprite } from './pixel-kit'
import { CLOUD_SPRITE, SPARKLE_SPRITE } from './pixel-sprites'
import { KEYS, useCatKeyboard } from './sticker-keyboard'
import { FREDOKA } from './sticker-kit'

const BUBBLE: Record<ExpressionKey, string> = {
  sleep: 'z z z',
  idle: 'hi!',
  happy: '<3',
  loading: '...',
  error: 'x_x',
}
const SPARKLES = [
  'top-6 left-[46%] hidden sm:block',
  'top-28 right-[4%] [animation-delay:.4s] hidden sm:block',
  'bottom-24 left-[4%] [animation-delay:.9s] hidden lg:block',
]
const CTA = 'inline-flex min-h-12 items-center px-5 font-bold'
const pixelStep = (px: number) => ({ '--s': `${px}px` }) as CSSProperties

function statusText(typedCount: number, completions: number) {
  if (completions > 0) return `N E T K O × ${completions}. The cat is awake.`
  return typedCount === 0
    ? 'The cat is asleep. Type N E T K O to wake it.'
    : 'Keep going: N E T K O.'
}

export function HoloHero() {
  const { pressed, press, typedCount, progress, completions, face, isBlinking } = useCatKeyboard()

  return (
    <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pt-8 pb-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16 lg:pt-16 lg:pb-24">
      <ShootingStars />
      {SPARKLES.map((position) => (
        <PixelSprite
          className={`twinkle absolute text-[#6A3FD1] even:text-sakura dark:text-[#FFE38A] ${position}`}
          key={position}
          rows={SPARKLE_SPRITE}
          scale={5}
        />
      ))}
      <PixelSprite
        className="drift absolute top-0 left-[38%] hidden text-sumi/40 lg:block dark:hidden"
        rows={CLOUD_SPRITE}
        scale={4}
      />

      <div className="relative text-center lg:text-left">
        <p className="font-mono text-[11px] text-[var(--holo-muted)]">
          Netko Labs · open-source lab
        </p>
        <h1
          className="holo-text mx-auto mt-4 max-w-[14ch] bg-gradient-to-r from-[#C2185B] via-[#1F64B5] to-[#6A3FD1] bg-clip-text text-[2.6rem] text-transparent leading-[1.05] min-[400px]:text-5xl sm:text-6xl lg:mx-0 lg:text-7xl dark:from-[#FFB8D2] dark:via-[#9DD8FF] dark:to-[#FFE38A]"
          style={FREDOKA}
        >
          tools a cat would use, if the cat could code
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-[17px] text-[var(--holo-muted)] leading-relaxed lg:mx-0">
          Netko Labs builds open-source developer tools with LLMs, and for them: desktop apps in
          Bun, LLM code review, and a SQL client your agents can log into.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
          <a href={toHash(ANCHOR.tools)}>
            <PixelBox
              innerClassName={`${CTA} bg-[var(--holo-key-ink)] text-[var(--holo-key)]`}
              innerStyle={pixelStep(5)}
              isLifted
            >
              See the tools ↓
            </PixelBox>
          </a>
          <a href={GITHUB_ORG_URL} rel="noreferrer" target="_blank">
            <PixelBox
              innerClassName={`${CTA} bg-[var(--holo-key)] text-[var(--holo-key-ink)]`}
              innerStyle={pixelStep(5)}
              isLifted
            >
              GitHub ↗
            </PixelBox>
          </a>
        </div>
      </div>

      <div className="relative flex flex-col items-center">
        <div className="relative">
          <BrandMark
            className="w-44 min-[400px]:w-52 dark:drop-shadow-[0_0_28px_rgb(255_79_139/.55)] sm:w-64 [&_svg]:h-auto [&_svg]:w-full"
            expression={face}
            isBlinking={isBlinking}
            size={256}
          />
          <div className="absolute -top-6 right-0 sm:top-2 sm:-right-20">
            <PixelBubble isLarge text={BUBBLE[face]} />
          </div>
        </div>
        <div className="relative -mt-1">
          <PixelConfetti isActive={completions > 0} key={completions} />
          <PixelBox
            innerClassName="flex gap-1.5 bg-[#D9CCFF] px-3 pt-3 pb-5 min-[400px]:gap-2 sm:gap-3 sm:px-4 sm:pt-4 sm:pb-6 dark:bg-yoru"
            innerStyle={pixelStep(8)}
            isLifted
          >
            {KEYS.map((key, index) => (
              <PixelKey
                isLit={index < progress}
                isPressed={pressed === key}
                key={key}
                label={key}
                onPress={press}
              />
            ))}
          </PixelBox>
        </div>
        <p aria-live="polite" className="mt-8 text-center text-[var(--holo-muted)]">
          {statusText(typedCount, completions)}
        </p>
      </div>
    </section>
  )
}
