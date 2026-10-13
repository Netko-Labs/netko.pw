import {
  BrandMark,
  GITHUB_ORG_URL,
  otherRepos,
  PRINCIPLES,
  STATUS_LABEL,
  ThemeToggle,
  toolLinks,
} from '@/components/site'
import { useGoogleFonts } from '@/hooks/use-google-fonts'
import type { VariantProps } from '@/types'
import { DoodleArrow, DoodleCheck, DoodleStar, WashiTape, WavyUnderline } from './doodles'
import { KEYS, KeyboardKey, useCatKeyboard } from './sticker-keyboard'
import { STICKERS } from './sticker-kit'

const CAVEAT = { fontFamily: "'Caveat', cursive", fontWeight: 700 }
const PAPER = {
  backgroundColor: '#FFFFFF',
  backgroundImage:
    'linear-gradient(90deg, transparent 71px, #FFB8D2 71px, #FFB8D2 73px, transparent 73px), repeating-linear-gradient(transparent 0 35px, #DCE6F4 35px 36px)',
}
const KEY_TILTS = [-3, 2, -1, 3, -2]
const EXPRESSIONS_BY_TOOL = ['idle', 'happy', 'loading', 'idle', 'sleep', 'happy'] as const

export function StickerScrapbookVariant({ data, theme, onToggleTheme }: VariantProps) {
  useGoogleFonts('family=Caveat:wght@500;700&family=Fredoka:wght@600')
  const { pressed, press, typedCount, face, isBlinking } = useCatKeyboard()

  return (
    <div className="min-h-dvh text-sumi" style={PAPER}>
      <header className="mx-auto flex max-w-5xl items-center justify-between py-5 pr-5 pl-24">
        <span className="text-3xl" style={CAVEAT}>
          netko’s notebook
        </span>
        <span className="flex items-center gap-4 text-2xl" style={CAVEAT}>
          <a
            className="underline decoration-sakura decoration-wavy underline-offset-4"
            href={GITHUB_ORG_URL}
          >
            github
          </a>
          <ThemeToggle onToggle={onToggleTheme} theme={theme} />
        </span>
      </header>

      <section className="relative mx-auto grid max-w-5xl items-center gap-10 pt-10 pr-5 pb-20 pl-24 md:grid-cols-[1fr_auto]">
        <div>
          <p className="text-2xl text-sumi/60" style={CAVEAT}>
            page 1 · what we’re doing here
          </p>
          <h1 className="mt-2 text-6xl leading-[0.95] sm:text-8xl" style={CAVEAT}>
            open-source tools, hacked together with LLMs
          </h1>
          <WavyUnderline className="mt-2 h-5 w-72 text-sakura" />
          <p className="mt-6 max-w-md text-lg">
            Notes, experiments and the occasional working tool. The cat sleeps on the keyboard, so
            wake it up first.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            {KEYS.map((key, index) => (
              <span key={key} style={{ transform: `rotate(${KEY_TILTS[index]}deg)` }}>
                <KeyboardKey
                  className="border-sumi bg-white text-sumi"
                  isPressed={pressed === key}
                  label={key}
                  onPress={press}
                />
              </span>
            ))}
            <span className="ml-2 hidden items-center gap-1 sm:flex">
              <DoodleArrow className="h-10 w-20 -scale-x-100 rotate-12 text-sumi/70" />
              <span className="w-32 text-xl leading-tight" style={CAVEAT}>
                {typedCount ? `${typedCount} taps! it’s awake` : 'press these!'}
              </span>
            </span>
          </div>
        </div>
        <figure className="relative mx-auto w-60 rotate-3 bg-white p-3 pb-12 shadow-[0_10px_24px_-10px_rgb(27_23_36/.45)]">
          <WashiTape className="-top-3 left-16 -rotate-6" color="#B9E8A8" />
          <div className="grid aspect-square place-items-center bg-[#F6F1FF]">
            <BrandMark className="w-40" expression={face} isBlinking={isBlinking} size={160} />
          </div>
          <figcaption className="absolute inset-x-0 bottom-2 text-center text-2xl" style={CAVEAT}>
            term, our cat
          </figcaption>
        </figure>
      </section>

      <section className="mx-auto max-w-5xl pr-5 pb-20 pl-24">
        <h2 className="flex items-center gap-3 text-5xl" style={CAVEAT}>
          things we made <DoodleStar className="size-10 text-[#FFC94D]" />
        </h2>
        <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {STICKERS.map((sticker, index) => (
            <article
              className="relative bg-white p-3 pb-5 shadow-[0_10px_24px_-10px_rgb(27_23_36/.45)] transition-transform hover:rotate-0"
              key={sticker.tool.name}
              style={{ transform: `rotate(${sticker.tilt * 0.6}deg)` }}
            >
              <WashiTape
                className="-top-3 left-1/2 -translate-x-1/2 rotate-2"
                color={sticker.color}
              />
              <div
                className="flex aspect-[4/3] flex-col items-center justify-center gap-2"
                style={{ background: sticker.color }}
              >
                <BrandMark className="w-16" expression={EXPRESSIONS_BY_TOOL[index]} size={64} />
                <span className="font-mono text-xs">{sticker.tool.stack.join(' · ')}</span>
              </div>
              <h3 className="mt-3 text-4xl" style={CAVEAT}>
                {sticker.tool.name}
              </h3>
              <p className="font-bold">{sticker.tool.tagline}</p>
              <p className="mt-1 text-sm text-sumi/70">{sticker.tool.description}</p>
              <p className="mt-3 flex flex-wrap gap-x-4 text-xl" style={CAVEAT}>
                <span className="text-sumi/50">{STATUS_LABEL[sticker.tool.status]}</span>
                {toolLinks(sticker.tool).map((link) => (
                  <a
                    className="underline decoration-sakura underline-offset-4"
                    href={link.href}
                    key={link.kind}
                  >
                    {link.label} →
                  </a>
                ))}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl pr-5 pb-16 pl-24">
        <h2 className="text-5xl" style={CAVEAT}>
          house rules
        </h2>
        <ul className="mt-6 space-y-5">
          {PRINCIPLES.map((principle) => (
            <li className="flex items-start gap-4" key={principle.name}>
              <DoodleCheck className="mt-1 size-9 shrink-0 text-sumi" />
              <p className="text-lg">
                <span className="text-3xl" style={CAVEAT}>
                  {principle.name}
                </span>{' '}
                — {principle.line}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-14 text-3xl" style={CAVEAT}>
          also scribbled in the margins:
        </p>
        <p className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-2xl" style={CAVEAT}>
          {otherRepos(data.repos).map((repo) => (
            <a
              className="underline decoration-[#9DD8FF] decoration-2 underline-offset-4"
              href={repo.url}
              key={repo.name}
            >
              {repo.name}
            </a>
          ))}
        </p>
        <p className="mt-16 text-right text-3xl" style={CAVEAT}>
          — term ✎ · © 2026 Netko Labs
        </p>
      </section>
    </div>
  )
}
