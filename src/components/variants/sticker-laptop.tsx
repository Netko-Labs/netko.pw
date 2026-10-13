import { useState } from 'react'
import { BrandMark, GITHUB_ORG_URL, ThemeToggle } from '@/components/site'
import { useGoogleFonts } from '@/hooks/use-google-fonts'
import type { StickerDetailProps, VariantProps } from '@/types'
import { ClubExtras } from './club-extras'
import { KEYS, KeyboardKey, useCatKeyboard } from './sticker-keyboard'
import { FREDOKA, FREDOKA_FONTS, primaryHref, Sparkle, STICKERS, StickerBody } from './sticker-kit'
import { useStickerDrag } from './use-sticker-drag'

function StickerDetail({ sticker }: StickerDetailProps) {
  return (
    <a
      className="block rounded-[28px] border-[3px] border-sumi p-6 shadow-[0_0_0_8px_white,0_14px_24px_-8px_rgb(27_23_36/.35)]"
      href={primaryHref(sticker)}
      style={{ background: sticker.color }}
    >
      <StickerBody sticker={sticker} />
    </a>
  )
}

export function StickerLaptopVariant({ data, theme, onToggleTheme }: VariantProps) {
  useGoogleFonts(FREDOKA_FONTS)
  const [selected, setSelected] = useState(0)
  const { pressed, press, face, isBlinking } = useCatKeyboard()
  const { lidRef, positions, onPointerDown, onPointerMove, onPointerUp, reset } =
    useStickerDrag(setSelected)

  return (
    <div className="min-h-dvh overflow-hidden bg-[#F6F1FF] text-sumi">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <span className="text-2xl" style={FREDOKA}>
          netko ✿
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

      <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pt-6 pb-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <Sparkle className="top-6 left-[46%] animate-pulse text-sakura" />
        <div>
          <h1 className="max-w-[12ch] text-5xl leading-[1.05] sm:text-6xl" style={FREDOKA}>
            stick a tool on it
          </h1>
          <p className="mt-4 max-w-sm text-lg">
            Open-source tools, hacked together with LLMs. Drag the stickers around the lid, tap one
            to read it.
          </p>
          <div className="mt-8 max-w-sm">
            <StickerDetail sticker={STICKERS[selected]} />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[640px] pt-[100px]">
          <BrandMark
            className="absolute top-0 left-1/2 z-0 w-36 -translate-x-1/2 [&_svg]:h-auto [&_svg]:w-full"
            expression={face}
            isBlinking={isBlinking}
            size={144}
          />
          <div
            className="relative z-10 aspect-[16/10] touch-none rounded-[28px] border-4 border-sumi bg-[#3A3448] shadow-[0_18px_0_-6px_var(--sumi)]"
            ref={lidRef}
          >
            <BrandMark
              className="absolute top-1/2 left-1/2 w-16 -translate-x-1/2 -translate-y-1/2 text-[#5B5470] [&_svg]:h-auto [&_svg]:w-full"
              size={64}
            />
            {STICKERS.map((sticker, index) => (
              <button
                aria-label={`${sticker.tool.name} sticker`}
                className={`absolute cursor-grab rounded-[22px] border-[3px] border-sumi px-4 py-3 text-left shadow-[0_0_0_5px_white,0_8px_14px_-6px_rgb(0_0_0/.5)] transition-shadow active:cursor-grabbing ${selected === index ? 'z-20 ring-4 ring-sakura ring-offset-4 ring-offset-white' : 'z-10'}`}
                key={sticker.tool.name}
                onPointerDown={onPointerDown(index)}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                style={{
                  background: sticker.color,
                  left: `${positions[index].x}%`,
                  top: `${positions[index].y}%`,
                  transform: `rotate(${sticker.tilt * 1.6}deg)`,
                }}
                type="button"
              >
                <span className="text-lg sm:text-2xl" style={FREDOKA}>
                  {sticker.tool.name}
                </span>
              </button>
            ))}
          </div>
          <div className="relative mx-[-4%] flex justify-center gap-2 rounded-b-[32px] rounded-t-md border-4 border-sumi bg-[#D9CCFF] px-4 pt-5 pb-6 sm:gap-3">
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
          <button
            className="mt-4 font-mono text-xs underline underline-offset-4"
            onClick={reset}
            type="button"
          >
            tidy the lid
          </button>
        </div>
      </section>

      <ClubExtras repos={data.repos} />
    </div>
  )
}
