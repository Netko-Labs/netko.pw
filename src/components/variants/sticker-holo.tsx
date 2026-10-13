import type { CSSProperties, PointerEvent } from 'react'
import { BrandMark, GITHUB_ORG_URL, ThemeToggle } from '@/components/site'
import { useGoogleFonts } from '@/hooks/use-google-fonts'
import type { HoloStickerProps, VariantProps } from '@/types'
import { ClubExtras } from './club-extras'
import { KEYS, KeyboardKey, useCatKeyboard } from './sticker-keyboard'
import { FREDOKA, FREDOKA_FONTS, primaryHref, Sparkle, STICKERS, StickerBody } from './sticker-kit'

const MAX_TILT_DEG = 10

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
  const node = event.currentTarget
  for (const property of ['--mx', '--my', '--rx', '--ry']) node.style.removeProperty(property)
}

function HoloSticker({ sticker }: HoloStickerProps) {
  return (
    <a
      className="holo block overflow-hidden rounded-[32px] border-[3px] border-white/80 p-6 text-sumi shadow-[0_0_0_6px_rgb(255_255_255/.08),0_0_40px_-8px_var(--glow)]"
      href={primaryHref(sticker)}
      onPointerLeave={settle}
      onPointerMove={tilt}
      style={{ background: sticker.color, '--glow': sticker.color } as CSSProperties}
    >
      <StickerBody sticker={sticker} />
    </a>
  )
}

export function StickerHoloVariant({ data, theme, onToggleTheme }: VariantProps) {
  useGoogleFonts(FREDOKA_FONTS)
  const { pressed, press, typedCount, face, isBlinking } = useCatKeyboard()

  return (
    <div className="night-sky min-h-dvh overflow-hidden text-kami">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <span className="text-2xl" style={FREDOKA}>
          netko ✦ holo
        </span>
        <span className="flex items-center gap-3 font-mono text-sm">
          <a
            className="rounded-full border-2 border-kami/60 px-4 py-1.5 hover:border-sakura"
            href={GITHUB_ORG_URL}
          >
            github
          </a>
          <ThemeToggle onToggle={onToggleTheme} theme={theme} />
        </span>
      </header>

      <section className="relative mx-auto max-w-6xl px-5 pt-6 pb-20 text-center">
        <Sparkle className="top-10 left-[10%] animate-pulse text-[#6FE7FF]" />
        <Sparkle className="top-44 right-[12%] animate-pulse text-sakura" />
        <h1
          className="mx-auto max-w-[14ch] bg-gradient-to-r from-[#FFB8D2] via-[#9DD8FF] to-[#FFE38A] bg-clip-text text-5xl text-transparent leading-[1.05] sm:text-7xl"
          style={FREDOKA}
        >
          tools a cat would use, if the cat could code
        </h1>
        <p className="mx-auto mt-5 max-w-md text-kami/75 text-lg">
          Open-source tools, hacked together with LLMs. Collect the shiny ones.
        </p>
        <div className="mt-10 flex flex-col items-center">
          <BrandMark
            className="w-56 text-kami drop-shadow-[0_0_28px_rgb(255_79_139/.55)] sm:w-72 [&_svg]:h-auto [&_svg]:w-full"
            expression={face}
            isBlinking={isBlinking}
            size={288}
          />
          <div className="-mt-2 flex gap-2 rounded-[28px] border-2 border-kami/30 bg-yoru/80 p-3 shadow-[0_0_50px_-12px_#9DD8FF] backdrop-blur sm:gap-3 sm:p-4">
            {KEYS.map((key) => (
              <KeyboardKey
                className={`border-kami/70 text-kami ${pressed === key ? 'bg-sakura text-sumi' : 'bg-sumi'}`}
                isPressed={pressed === key}
                key={key}
                label={key}
                onPress={press}
              />
            ))}
          </div>
          <p className="mt-6 font-mono text-kami/70 text-sm">
            {typedCount === 0
              ? 'the cat is asleep. press N E T K O'
              : `${typedCount} keystrokes. shiny.`}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <h2 className="text-center text-4xl sm:text-5xl" style={FREDOKA}>
          holo sheet ✦ move over them
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {STICKERS.map((sticker) => (
            <HoloSticker key={sticker.tool.name} sticker={sticker} />
          ))}
        </div>
      </section>

      <ClubExtras repos={data.repos} />
    </div>
  )
}
