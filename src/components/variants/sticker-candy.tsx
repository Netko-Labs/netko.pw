import { BrandMark, GITHUB_ORG_URL, otherRepos, PRINCIPLES, ThemeToggle } from '@/components/site'
import { useGoogleFonts } from '@/hooks/use-google-fonts'
import type { VariantProps } from '@/types'
import { KEYS, KeyboardKey, useCatKeyboard } from './sticker-keyboard'
import {
  FREDOKA,
  FREDOKA_FONTS,
  PRINCIPLE_FACES,
  primaryHref,
  STICKERS,
  StickerBody,
} from './sticker-kit'

const CANDY = ['#FF922B', '#69DB7C', '#FFD43B', '#FF4F8B', '#9775FA', '#4DABF7']
const HARD_SHADOW = 'shadow-[10px_10px_0_var(--sumi)]'
const BOLD = { ...FREDOKA, fontWeight: 700 }

export function StickerCandyVariant({ data, theme, onToggleTheme }: VariantProps) {
  useGoogleFonts(FREDOKA_FONTS)
  const { pressed, press, typedCount, face, isBlinking } = useCatKeyboard()

  return (
    <div className="min-h-dvh text-sumi">
      <div className="bg-[#FFD43B]">
        <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <span className="text-3xl" style={BOLD}>
            netko!
          </span>
          <span className="flex items-center gap-3 font-mono text-sm">
            <a
              className={
                'rounded-full border-4 border-sumi bg-white px-4 py-1.5 shadow-[4px_4px_0_var(--sumi)]'
              }
              href={GITHUB_ORG_URL}
            >
              github
            </a>
            <ThemeToggle onToggle={onToggleTheme} theme={theme} />
          </span>
        </header>

        <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pt-6 pb-24 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div>
            <h1
              className="text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.9] tracking-tight"
              style={BOLD}
            >
              tools a cat would use
            </h1>
            <p className="mt-6 max-w-md font-bold text-xl">
              Open-source tools, hacked together with LLMs. Smash the keys.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <BrandMark
              className="w-64 drop-shadow-[10px_10px_0_var(--sumi)] sm:w-80 [&_svg]:h-auto [&_svg]:w-full"
              expression={face}
              isBlinking={isBlinking}
              size={320}
            />
            <div
              className={`mt-4 flex gap-2 rounded-[28px] border-4 border-sumi bg-[#9775FA] p-4 sm:gap-3 ${HARD_SHADOW}`}
            >
              {KEYS.map((key) => (
                <KeyboardKey
                  className="border-4 border-sumi bg-white text-sumi"
                  isPressed={pressed === key}
                  key={key}
                  label={key}
                  onPress={press}
                />
              ))}
            </div>
            <p className="mt-5 font-bold font-mono text-sm">
              {typedCount ? `${typedCount} smashes` : 'the cat is napping'}
            </p>
          </div>
        </section>
      </div>

      <section className="border-sumi border-y-4 bg-[#4DABF7] px-5 py-20">
        <h2 className="mx-auto max-w-6xl text-6xl sm:text-7xl" style={BOLD}>
          the stickers
        </h2>
        <div className="mx-auto mt-12 grid max-w-6xl gap-10 md:grid-cols-2">
          {STICKERS.map((sticker, index) => (
            <a
              className={`block rounded-[40px] border-4 border-sumi p-8 text-lg transition-all hover:translate-x-1.5 hover:translate-y-1.5 hover:shadow-[4px_4px_0_var(--sumi)] ${HARD_SHADOW}`}
              href={primaryHref(sticker)}
              key={sticker.tool.name}
              style={{ background: CANDY[index], rotate: `${sticker.tilt * 0.5}deg` }}
            >
              <StickerBody sticker={sticker} />
            </a>
          ))}
        </div>
      </section>

      <section className="border-sumi border-b-4 bg-sakura px-5 py-20">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          {PRINCIPLES.map((principle, index) => (
            <div
              className={`rounded-[32px] border-4 border-sumi bg-white p-6 ${HARD_SHADOW}`}
              key={principle.name}
            >
              <BrandMark className="w-16" expression={PRINCIPLE_FACES[index]} size={64} />
              <p className="mt-3 text-4xl" style={BOLD}>
                {principle.name}!
              </p>
              <p className="mt-2">{principle.line}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-sumi border-b-4 bg-[#69DB7C] px-5 py-14 text-center">
        <p className="text-4xl" style={BOLD}>
          more in the jar
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {otherRepos(data.repos).map((repo) => (
            <a
              className="rounded-full border-4 border-sumi bg-white px-5 py-2 font-bold font-mono text-sm hover:bg-[#FFD43B]"
              href={repo.url}
              key={repo.name}
            >
              {repo.name}
            </a>
          ))}
        </div>
      </section>

      <footer className="bg-sumi px-5 py-16 text-center text-[#FFD43B]">
        <a
          className="text-[clamp(2.5rem,8vw,6rem)] leading-none hover:underline"
          href={GITHUB_ORG_URL}
          style={BOLD}
        >
          see you on github →
        </a>
        <p className="mt-6 font-mono text-kami/70 text-xs">© 2026 Netko Labs</p>
      </footer>
    </div>
  )
}
