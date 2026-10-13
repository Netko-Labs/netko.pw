import { useCallback, useState } from 'react'
import {
  BrandMark,
  FEATURED_TOOLS,
  GITHUB_ORG_URL,
  otherRepos,
  PRINCIPLES,
  ThemeToggle,
  toolLinks,
} from '@/components/site'
import { useGoogleFonts } from '@/hooks/use-google-fonts'
import type { ExpressionKey, SparkleProps, StickerTool, VariantProps } from '@/types'
import { KeyboardKey, usePressedKeys } from './sticker-keyboard'

const KEYS = ['N', 'E', 'T', 'K', 'O']
const FREDOKA = { fontFamily: "'Fredoka', sans-serif", fontWeight: 600 }
const STICKER_COLORS = ['#FFE38A', '#B9E8A8', '#9DD8FF', '#FFB8D2', '#D9CCFF', '#FFD2A6']
const TILTS = [-4, 3, -2, 5, -5, 2]
const PRINCIPLE_FACES: ExpressionKey[] = ['loading', 'happy', 'idle']

const STICKERS: StickerTool[] = FEATURED_TOOLS.map((tool, index) => ({
  tool,
  color: STICKER_COLORS[index],
  tilt: TILTS[index],
}))

function Sparkle({ className }: SparkleProps) {
  return (
    <svg aria-hidden className={`absolute ${className}`} viewBox="0 0 24 24" width="28" height="28">
      <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" fill="currentColor" />
    </svg>
  )
}

export function StickerClubVariant({ data, theme, onToggleTheme }: VariantProps) {
  useGoogleFonts('family=Fredoka:wght@500;600;700')
  const [typedCount, setTypedCount] = useState(0)
  const onType = useCallback(() => setTypedCount((count) => count + 1), [])
  const { pressed, press } = usePressedKeys(KEYS, onType)

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
            expression={pressed ? 'happy' : typedCount > 0 ? 'idle' : 'sleep'}
            isBlinking={!pressed && typedCount > 0}
            size={288}
          />
          <div className="-mt-2 flex gap-2 rounded-[28px] border-[3px] border-sumi bg-[#D9CCFF] p-3 shadow-[0_10px_0_var(--sumi)] sm:gap-3 sm:p-4">
            {KEYS.map((key) => (
              <KeyboardKey isPressed={pressed === key} key={key} label={key} onPress={press} />
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
          {STICKERS.map(({ tool, color, tilt }) => {
            const [primary] = toolLinks(tool)
            return (
              <a
                className="block rounded-[32px] border-[3px] border-sumi p-6 shadow-[0_0_0_8px_white,0_14px_24px_-8px_rgb(27_23_36/.35)] transition-transform duration-200 hover:-translate-y-2 hover:rotate-0"
                href={primary?.href ?? GITHUB_ORG_URL}
                key={tool.name}
                style={{ background: color, transform: `rotate(${tilt}deg)` }}
              >
                <span className="text-3xl" style={FREDOKA}>
                  {tool.name}
                </span>
                <span className="mt-2 block font-bold">{tool.tagline}</span>
                <span className="mt-3 block text-sm opacity-80">{tool.description}</span>
                <span className="mt-4 inline-block rounded-full bg-white px-3 py-1 font-mono text-xs">
                  {primary ? `${primary.label} →` : 'coming soon'}
                </span>
              </a>
            )
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-5 pb-20 md:grid-cols-3">
        {PRINCIPLES.map((principle, index) => (
          <div className="flex items-start gap-3" key={principle.name}>
            <BrandMark className="w-14 shrink-0" expression={PRINCIPLE_FACES[index]} size={56} />
            <div className="rounded-3xl rounded-tl-md border-[3px] border-sumi bg-white p-4">
              <p className="text-xl" style={FREDOKA}>
                {principle.name}!
              </p>
              <p className="mt-1 text-sm">{principle.line}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-16 text-center">
        <p className="text-2xl" style={FREDOKA}>
          more stickers in the drawer
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          {otherRepos(data.repos).map((repo) => (
            <a
              className="rounded-full border-2 border-sumi bg-white px-4 py-2 font-mono text-sm hover:bg-[#FFE38A]"
              href={repo.url}
              key={repo.name}
            >
              {repo.name}
            </a>
          ))}
        </div>
      </section>

      <footer className="flex flex-col items-center gap-3 pb-14">
        <BrandMark className="w-20" expression="sleep" size={80} />
        <p className="text-xl" style={FREDOKA}>
          zzz… see you on github
        </p>
        <p className="font-mono text-xs opacity-70">© 2026 Netko Labs</p>
      </footer>
    </div>
  )
}
