import type { CSSProperties, PointerEvent } from 'react'
import {
  BrandMark,
  GITHUB_ORG_URL,
  otherRepos,
  PixelMark,
  PRINCIPLES,
  STATUS_LABEL,
  ThemeToggle,
  toolLinks,
} from '@/components/site'
import { useGoogleFonts } from '@/hooks/use-google-fonts'
import type { ExpressionKey, HoloStickerProps, VariantProps } from '@/types'
import { PixelConfetti, PixelWalker, ShootingStars } from './holo-candy'
import { PixelBox, PixelBubble, PixelKey, PixelSprite } from './pixel-kit'
import { CLOUD_SPRITE, HEART_SPRITE, SPARKLE_SPRITE, TOOL_SPRITES } from './pixel-sprites'
import { KEYS, useCatKeyboard } from './sticker-keyboard'
import { FREDOKA, FREDOKA_FONTS, PRINCIPLE_FACES, STICKERS } from './sticker-kit'

const MAX_TILT_DEG = 10
const BUBBLE: Record<ExpressionKey, string> = {
  sleep: 'z z z',
  idle: 'hi!',
  happy: '<3',
  loading: '...',
  error: 'x_x',
}
const SPARKLES = [
  'top-8 left-[9%] hidden sm:block',
  'top-36 right-[11%] [animation-delay:.4s] hidden sm:block',
  'top-[22rem] left-[18%] [animation-delay:.9s]',
  'top-[30rem] right-[20%] [animation-delay:1.2s]',
]
const pixelStep = (px: number) => ({ '--s': `${px}px` }) as CSSProperties

function tilt(event: PointerEvent<HTMLElement>) {
  const node = event.currentTarget
  const rect = node.getBoundingClientRect()
  const x = (event.clientX - rect.left) / rect.width
  const y = (event.clientY - rect.top) / rect.height
  node.style.setProperty('--mx', `${x * 100}%`)
  node.style.setProperty('--my', `${y * 100}%`)
  node.style.setProperty('--rx', `${(0.5 - y) * MAX_TILT_DEG}deg`)
  node.style.setProperty('--ry', `${(x - 0.5) * MAX_TILT_DEG}deg`)
}

function settle(event: PointerEvent<HTMLElement>) {
  for (const property of ['--mx', '--my', '--rx', '--ry']) {
    event.currentTarget.style.removeProperty(property)
  }
}

function HoloSticker({ sticker }: HoloStickerProps) {
  const { tool } = sticker
  return (
    <article
      className="group holo-tilt relative [filter:drop-shadow(0_0_22px_var(--holo-glow))]"
      onPointerLeave={settle}
      onPointerMove={tilt}
    >
      <PixelBox
        innerClassName="holo-shine flex h-full flex-col p-6 text-sumi"
        innerStyle={{ background: sticker.color, ...pixelStep(8) }}
        isLifted
      >
        <div className="flex items-start justify-between gap-3">
          <PixelSprite
            className="text-sumi"
            label={`${tool.name} icon`}
            rows={TOOL_SPRITES[tool.name]}
            scale={4}
          />
          <span className="bg-white px-2 py-1 font-mono text-[11px] text-sumi">
            {STATUS_LABEL[tool.status]}
          </span>
        </div>
        <h3 className="mt-4 text-3xl" style={FREDOKA}>
          {tool.name}
        </h3>
        <p className="mt-1 font-bold">{tool.tagline}</p>
        <p className="mt-2 text-[15px] text-sumi/80 leading-relaxed">{tool.description}</p>
        <p className="mt-auto flex flex-wrap gap-2 pt-5">
          {toolLinks(tool).length ? (
            toolLinks(tool).map((link) => (
              <a
                className="bg-white px-2.5 py-1.5 font-mono text-[11px] text-sumi hover:bg-sumi hover:text-white"
                href={link.href}
                key={link.kind}
              >
                {link.label} →
              </a>
            ))
          ) : (
            <span className="bg-white/80 px-2.5 py-1.5 font-mono text-[11px]">in the lab</span>
          )}
        </p>
      </PixelBox>
      <span className="pointer-events-none absolute -top-4 -right-4 opacity-0 transition-opacity group-hover:opacity-100">
        <PixelSprite className="twinkle text-sakura" rows={SPARKLE_SPRITE} scale={5} />
      </span>
      <span className="pointer-events-none absolute -bottom-4 -left-4 opacity-0 transition-opacity group-hover:opacity-100">
        <PixelSprite
          className="twinkle text-[#6A3FD1] [animation-delay:.5s] dark:text-[#FFE38A]"
          rows={SPARKLE_SPRITE}
          scale={4}
        />
      </span>
    </article>
  )
}

export function StickerHoloVariant({ data, theme, onToggleTheme }: VariantProps) {
  useGoogleFonts(FREDOKA_FONTS)
  const { pressed, press, typedCount, face, isBlinking } = useCatKeyboard()

  return (
    <div className="holo-page min-h-dvh overflow-hidden">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <span className="flex items-center gap-3">
          <PixelMark size={32} />
          <span className="text-2xl" style={FREDOKA}>
            netko
          </span>
          <span className="hidden font-mono text-[var(--holo-muted)] text-xs sm:inline">
            ✦ holo
          </span>
        </span>
        <span className="flex items-center gap-3 sm:gap-4">
          <a href={GITHUB_ORG_URL}>
            <PixelBubble text="github ↗" />
          </a>
          <ThemeToggle onToggle={onToggleTheme} theme={theme} />
        </span>
      </header>

      <section className="relative mx-auto max-w-6xl px-5 pt-8 pb-16 text-center">
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
          className="drift absolute top-4 left-[4%] hidden text-sumi/40 sm:block dark:hidden"
          rows={CLOUD_SPRITE}
          scale={5}
        />
        <PixelSprite
          className="drift absolute top-52 right-[2%] hidden text-sumi/40 [animation-delay:-12s] sm:block dark:hidden"
          rows={CLOUD_SPRITE}
          scale={4}
        />

        <h1
          className="holo-text relative mx-auto max-w-[14ch] bg-gradient-to-r from-[#C2185B] via-[#1F64B5] to-[#6A3FD1] bg-clip-text text-[2.6rem] text-transparent leading-[1.05] min-[400px]:text-5xl sm:text-7xl dark:from-[#FFB8D2] dark:via-[#9DD8FF] dark:to-[#FFE38A]"
          style={FREDOKA}
        >
          tools a cat would use, if the cat could code
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[var(--holo-muted)] text-base sm:text-lg">
          Open-source tools, hacked together with LLMs. Collect the shiny ones.
        </p>

        <div className="mt-12 flex flex-col items-center">
          <div className="relative">
            <BrandMark
              className="w-48 min-[400px]:w-56 dark:drop-shadow-[0_0_28px_rgb(255_79_139/.55)] sm:w-72 [&_svg]:h-auto [&_svg]:w-full"
              expression={face}
              isBlinking={isBlinking}
              size={288}
            />
            <div className="absolute -top-8 right-0 sm:top-2 sm:-right-20">
              <PixelBubble isLarge text={BUBBLE[face]} />
            </div>
          </div>
          <div className="relative -mt-1">
            <PixelConfetti burstKey={Math.floor(typedCount / KEYS.length)} />
            <PixelBox
              innerClassName="flex gap-1.5 bg-[#D9CCFF] px-3 pt-3 pb-5 min-[400px]:gap-2 sm:gap-3 sm:px-4 sm:pt-4 sm:pb-6 dark:bg-yoru"
              innerStyle={pixelStep(8)}
              isLifted
            >
              {KEYS.map((key) => (
                <PixelKey isPressed={pressed === key} key={key} label={key} onPress={press} />
              ))}
            </PixelBox>
          </div>
          <p aria-live="polite" className="mt-8 text-[var(--holo-muted)] text-base">
            {typedCount === 0
              ? 'The cat is asleep. Type N E T K O to wake it.'
              : typedCount % KEYS.length === 0
                ? 'N E T K O! Shiny.'
                : `${typedCount} keystrokes. Keep going.`}
          </p>
        </div>
      </section>

      <PixelWalker />
      <div className="dither-edge" />

      <section className="mx-auto max-w-6xl px-5 pt-12 pb-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-4xl sm:text-5xl" style={FREDOKA}>
            holo sheet
          </h2>
          <p className="text-[var(--holo-muted)] text-base">Move over a sticker ✦</p>
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
          {STICKERS.map((sticker) => (
            <HoloSticker key={sticker.tool.name} sticker={sticker} />
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-8 px-5 pb-20 md:grid-cols-3">
        {PRINCIPLES.map((principle, index) => (
          <div className="flex items-start gap-3" key={principle.name}>
            <BrandMark className="w-14 shrink-0" expression={PRINCIPLE_FACES[index]} size={56} />
            <PixelBox
              innerClassName="bg-[var(--holo-key)] p-4 text-[var(--holo-key-ink)]"
              innerStyle={pixelStep(5)}
            >
              <p className="text-xl" style={FREDOKA}>
                {principle.name}!
              </p>
              <p className="mt-1 text-[15px] leading-relaxed">{principle.line}</p>
            </PixelBox>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-16 text-center">
        <p className="text-2xl" style={FREDOKA}>
          more in the drawer
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {otherRepos(data.repos).map((repo) => (
            <a href={repo.url} key={repo.name}>
              <PixelBubble text={repo.name} />
            </a>
          ))}
        </div>
      </section>

      <footer className="flex flex-col items-center gap-3 pb-14">
        <div className="flex items-end gap-2">
          <PixelMark size={64} />
          <PixelSprite className="mb-10 text-sumi dark:text-kami" rows={HEART_SPRITE} scale={4} />
        </div>
        <p className="text-xl" style={FREDOKA}>
          see you on github
        </p>
        <p className="font-mono text-[11px] text-[var(--holo-muted)]">© 2026 Netko Labs</p>
      </footer>
    </div>
  )
}
