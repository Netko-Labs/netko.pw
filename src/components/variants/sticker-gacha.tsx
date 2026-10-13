import { useEffect, useRef } from 'react'
import { BrandMark, GITHUB_ORG_URL, ThemeToggle } from '@/components/site'
import { useGoogleFonts } from '@/hooks/use-google-fonts'
import type { GachaMachineProps, VariantProps } from '@/types'
import { ClubExtras } from './club-extras'
import { KEYS, KeyboardKey, useCatKeyboard } from './sticker-keyboard'
import { FREDOKA, FREDOKA_FONTS, primaryHref, Sparkle, STICKERS, StickerBody } from './sticker-kit'
import { useGacha } from './use-gacha'

const CAPSULE_SPOTS = [
  [22, 58],
  [44, 66],
  [66, 56],
  [32, 36],
  [56, 34],
  [76, 72],
  [18, 78],
  [50, 82],
]

function GachaMachine({ isDropping, onTurn }: GachaMachineProps) {
  return (
    <div className="relative mx-auto w-[300px]">
      <div className="relative mx-auto size-[260px] overflow-hidden rounded-full border-4 border-sumi bg-white/70 shadow-[inset_-18px_-14px_0_rgb(27_23_36/.06)]">
        {CAPSULE_SPOTS.map(([left, top], index) => {
          const color = STICKERS[index % STICKERS.length].color
          return (
            <span
              aria-hidden
              className="absolute size-14 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-[3px] border-sumi"
              key={`${left}-${top}`}
              style={{
                left: `${left}%`,
                top: `${top}%`,
                background: `linear-gradient(${color} 50%, white 50%)`,
              }}
            />
          )
        })}
        <span
          aria-hidden
          className="absolute top-6 left-10 h-16 w-6 rotate-[30deg] rounded-full bg-white/80"
        />
      </div>
      <div className="relative -mt-3 rounded-[36px] border-4 border-sumi bg-sakura px-6 pt-8 pb-6">
        <div className="flex items-center justify-between">
          <span className="rounded-xl border-[3px] border-sumi bg-white px-3 py-1 font-mono text-xs">
            1 pet = 1 tool
          </span>
          <button
            aria-label="Turn the knob"
            className="gacha-wobble grid size-20 cursor-pointer place-items-center rounded-full border-4 border-sumi bg-[#FFE38A] shadow-[0_6px_0_var(--sumi)] active:translate-y-1.5 active:shadow-none"
            onClick={onTurn}
            type="button"
          >
            <span className="h-3 w-12 rounded-full bg-sumi" />
          </button>
        </div>
        <div className="mx-auto mt-6 h-14 w-24 rounded-t-2xl border-4 border-sumi border-b-0 bg-sumi" />
      </div>
      {isDropping ? (
        <span
          aria-hidden
          className="gacha-drop absolute top-[120px] left-1/2 size-16 rounded-full border-[3px] border-sumi"
          style={{ background: 'linear-gradient(#FFE38A 50%, white 50%)' }}
        />
      ) : null}
    </div>
  )
}

export function StickerGachaVariant({ data, theme, onToggleTheme }: VariantProps) {
  useGoogleFonts(FREDOKA_FONTS)
  const { pressed, press, completions, face, isBlinking } = useCatKeyboard()
  const { collected, latest, isDropping, isSoldOut, turn, collectAll } = useGacha(STICKERS.length)

  const handledCompletions = useRef(0)

  useEffect(() => {
    if (completions <= handledCompletions.current) return
    handledCompletions.current = completions
    turn()
  }, [completions, turn])

  const prize = latest === null ? null : STICKERS[latest]

  return (
    <div className="min-h-dvh overflow-hidden bg-[#F6F1FF] text-sumi">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <span className="text-2xl" style={FREDOKA}>
          netko ✿ gacha
        </span>
        <span className="flex items-center gap-3 font-mono text-sm">
          <a
            className="rounded-full border-2 border-sumi bg-white px-4 py-1.5"
            href={GITHUB_ORG_URL}
          >
            github
          </a>
          <ThemeToggle onToggle={onToggleTheme} theme={theme} />
        </span>
      </header>

      <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pt-4 pb-16 lg:grid-cols-2">
        <Sparkle className="top-4 right-[8%] animate-bounce text-[#FFC94D]" />
        <div>
          <h1 className="max-w-[12ch] text-5xl leading-[1.05] sm:text-6xl" style={FREDOKA}>
            one pet, one open-source tool
          </h1>
          <p className="mt-4 max-w-md text-lg">
            Turn the knob, or type N E T K O to drop a coin. Every capsule holds a tool we hacked
            together with LLMs. Collect all six.
          </p>
          <div className="mt-8 min-h-[260px]">
            {prize ? (
              <a
                className="gacha-pop block max-w-sm rounded-[32px] border-[3px] border-sumi p-6 shadow-[0_0_0_8px_white,0_14px_24px_-8px_rgb(27_23_36/.35)]"
                href={primaryHref(prize)}
                key={prize.tool.name}
                style={{ background: prize.color, transform: `rotate(${prize.tilt}deg)` }}
              >
                <StickerBody sticker={prize} />
              </a>
            ) : (
              <div className="flex max-w-sm items-center gap-4 rounded-[32px] border-[3px] border-sumi border-dashed p-6">
                <BrandMark
                  className="w-16 shrink-0"
                  expression={face}
                  isBlinking={isBlinking}
                  size={64}
                />
                <p style={FREDOKA}>the cat is guarding the machine. give it a pet.</p>
              </div>
            )}
          </div>
        </div>
        <div>
          <GachaMachine isDropping={isDropping} onTurn={turn} />
          <div className="mt-8 flex justify-center gap-2">
            {KEYS.map((key) => (
              <KeyboardKey
                className="border-sumi bg-white text-sumi"
                isPressed={pressed === key}
                key={key}
                label={key}
                onPress={press}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-4xl" style={FREDOKA}>
            your collection · {collected.length}/{STICKERS.length}
          </h2>
          {isSoldOut ? (
            <p className="font-mono text-sm">sold out. you got them all ✿</p>
          ) : (
            <button
              className="font-mono text-sm underline underline-offset-4"
              onClick={collectAll}
              type="button"
            >
              or just show me everything
            </button>
          )}
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STICKERS.map((sticker, index) =>
            collected.includes(index) ? (
              <a
                className="gacha-pop block rounded-[28px] border-[3px] border-sumi p-5 shadow-[0_0_0_6px_white]"
                href={primaryHref(sticker)}
                key={sticker.tool.name}
                style={{ background: sticker.color }}
              >
                <StickerBody isCompact sticker={sticker} />
              </a>
            ) : (
              <div
                className="grid min-h-40 place-items-center rounded-[28px] border-[3px] border-sumi/30 border-dashed text-5xl text-sumi/25"
                key={sticker.tool.name}
                style={FREDOKA}
              >
                ?
              </div>
            ),
          )}
        </div>
      </section>

      <ClubExtras repos={data.repos} />
    </div>
  )
}
