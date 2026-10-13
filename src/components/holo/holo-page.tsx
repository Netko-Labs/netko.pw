import type { CSSProperties } from 'react'
import {
  ANCHOR,
  BrandMark,
  GITHUB_ORG_URL,
  otherRepos,
  PixelMark,
  PRINCIPLES,
  repoFor,
  ThemeToggle,
  toHash,
} from '@/components/site'
import type { HoloPageProps } from '@/types'
import { PixelWalker } from './holo-candy'
import { HoloHero } from './holo-hero'
import { HoloSticker } from './holo-sticker'
import { PixelBox, PixelSprite } from './pixel-kit'
import { HEART_SPRITE } from './pixel-sprites'
import { FREDOKA, PRINCIPLE_FACES, STICKERS } from './sticker-kit'

const SECTION = 'mx-auto max-w-6xl px-5'
const pixelStep = (px: number) => ({ '--s': `${px}px` }) as CSSProperties

export function HoloPage({ data, theme, onToggleTheme }: HoloPageProps) {
  return (
    <div className="holo-page min-h-dvh overflow-hidden" id={ANCHOR.top}>
      <a className="skip-link" href={toHash(ANCHOR.main)}>
        Skip to content
      </a>
      <header className={`${SECTION} flex items-center justify-between gap-3 py-5`}>
        <a
          aria-label="Netko Labs home"
          className="flex items-center gap-3"
          href={toHash(ANCHOR.top)}
        >
          <PixelMark size={32} />
          <span className="text-xl sm:text-2xl" style={FREDOKA}>
            Netko Labs
          </span>
        </a>
        <span className="flex items-center gap-3 sm:gap-4">
          <a
            className="hidden font-bold underline decoration-2 underline-offset-4 sm:inline"
            href={GITHUB_ORG_URL}
            rel="noreferrer"
            target="_blank"
          >
            GitHub ↗
          </a>
          <ThemeToggle onToggle={onToggleTheme} theme={theme} />
        </span>
      </header>

      <main id={ANCHOR.main}>
        <HoloHero />
        <PixelWalker />
        <div className="dither-edge" />

        <section className={`${SECTION} scroll-mt-6 pt-12 pb-20`} id={ANCHOR.tools}>
          <h2 className="text-4xl sm:text-5xl" style={FREDOKA}>
            Tools
          </h2>
          <p className="mt-3 max-w-xl text-[var(--holo-muted)]">
            Open source unless marked private. Stars are live from GitHub.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
            {STICKERS.map((sticker) => (
              <HoloSticker
                key={sticker.tool.name}
                repo={repoFor(sticker.tool, data.repos)}
                sticker={sticker}
              />
            ))}
          </div>
        </section>

        <section className={`${SECTION} pb-20`}>
          <h2 className="text-3xl sm:text-4xl" style={FREDOKA}>
            How we build
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {PRINCIPLES.map((principle, index) => (
              <div className="flex items-start gap-3" key={principle.name}>
                <BrandMark
                  className="w-14 shrink-0"
                  expression={PRINCIPLE_FACES[index]}
                  size={56}
                />
                <PixelBox
                  className="flex-1"
                  innerClassName="bg-[var(--holo-key)] p-4 text-[var(--holo-key-ink)]"
                  innerStyle={pixelStep(5)}
                >
                  <h3 className="font-mono text-[22px] capitalize">{principle.name}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed">{principle.line}</p>
                </PixelBox>
              </div>
            ))}
          </div>
        </section>

        <section className={`${SECTION} pb-16`}>
          <h2 className="text-3xl sm:text-4xl" style={FREDOKA}>
            Other repos
          </h2>
          <ul className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {otherRepos(data.repos).map((repo) => (
              <li key={repo.name}>
                <a
                  className="break-all font-mono text-[11px] underline decoration-2 decoration-sakura underline-offset-4"
                  href={repo.url}
                >
                  {repo.name}
                </a>
                <p className="mt-1 text-[15px] text-[var(--holo-muted)]">
                  {repo.description ?? 'No description yet.'}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="flex flex-col items-center gap-3 pb-14">
        <div aria-hidden className="flex items-end gap-2">
          <PixelMark size={64} />
          <PixelSprite className="mb-10 text-sumi dark:text-kami" rows={HEART_SPRITE} scale={4} />
        </div>
        <a
          className="text-xl underline decoration-2 decoration-sakura underline-offset-4"
          href={GITHUB_ORG_URL}
          rel="noreferrer"
          style={FREDOKA}
          target="_blank"
        >
          See you on GitHub ↗
        </a>
        <p className="font-mono text-[11px] text-[var(--holo-muted)]">© 2026 Netko Labs</p>
      </footer>
    </div>
  )
}
