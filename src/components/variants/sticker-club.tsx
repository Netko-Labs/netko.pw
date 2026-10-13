import { BrandMark, GITHUB_ORG_URL, ThemeToggle } from '@/components/site'
import { useGoogleFonts } from '@/hooks/use-google-fonts'
import type { VariantProps } from '@/types'
import { ClubExtras } from './club-extras'
import { KEYS, KeyboardKey, useCatKeyboard } from './sticker-keyboard'
import { FREDOKA, FREDOKA_FONTS, primaryHref, Sparkle, STICKERS, StickerBody } from './sticker-kit'

export function StickerClubVariant({ data, theme, onToggleTheme }: VariantProps) {
  useGoogleFonts(FREDOKA_FONTS)
  const { pressed, press, typedCount, face, isBlinking } = useCatKeyboard()

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

      <section className="relative mx-auto max-w-6xl px-5 pt-6 pb-20 text-center">
        <Sparkle className="top-10 left-[8%] animate-bounce text-[#FFC94D]" />
        <Sparkle className="top-40 right-[10%] animate-pulse text-sakura" />
        <Sparkle className="bottom-24 left-[16%] animate-pulse text-[#7CC4FF]" />
        <h1 className="mx-auto max-w-[14ch] text-5xl leading-[1.05] sm:text-7xl" style={FREDOKA}>
          tools a cat would use, if the cat could code
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg">
          Open-source tools, hacked together with LLMs. Try the keyboard.
        </p>
        <div className="mt-10 flex flex-col items-center">
          <BrandMark
            className="w-56 transition-transform duration-150 sm:w-72 [&_svg]:h-auto [&_svg]:w-full"
            expression={face}
            isBlinking={isBlinking}
            size={288}
          />
          <div className="-mt-2 flex gap-2 rounded-[28px] border-[3px] border-sumi bg-[#D9CCFF] p-3 shadow-[0_10px_0_var(--sumi)] sm:gap-3 sm:p-4">
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
          <p className="mt-6 font-mono text-sm">
            {typedCount === 0
              ? 'the cat is asleep. press N E T K O'
              : `${typedCount} keystrokes. the cat approves.`}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <h2 className="text-center text-4xl sm:text-5xl" style={FREDOKA}>
          the sticker sheet
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {STICKERS.map((sticker) => (
            <a
              className="block rounded-[32px] border-[3px] border-sumi p-6 shadow-[0_0_0_8px_white,0_14px_24px_-8px_rgb(27_23_36/.35)] transition-transform duration-200 hover:-translate-y-2 hover:rotate-0"
              href={primaryHref(sticker)}
              key={sticker.tool.name}
              style={{ background: sticker.color, transform: `rotate(${sticker.tilt}deg)` }}
            >
              <StickerBody sticker={sticker} />
            </a>
          ))}
        </div>
      </section>

      <ClubExtras repos={data.repos} />
    </div>
  )
}
