import {
  ANCHOR,
  BrandMark,
  FEATURED_TOOLS,
  GITHUB_ORG_URL,
  otherRepos,
  PRINCIPLES,
  recentActivity,
  repoFor,
  STATUS_LABEL,
  toHash,
  toolLinks,
} from '@/components/site'
import { BRAND } from '@/generated/brand-art'
import { useGoogleFonts } from '@/hooks/use-google-fonts'
import { timeAgo } from '@/lib/format'
import type { VariantProps } from '@/types'
import { Reveal } from './reveal'

const GEIST = { fontFamily: "'Geist', system-ui, sans-serif" }
const GEIST_MONO = { fontFamily: "'Geist Mono', ui-monospace, monospace" }

export function ObsidianVariant({ data, expression }: VariantProps) {
  useGoogleFonts('family=Geist:wght@300;400;500;600&family=Geist+Mono:wght@400')
  const lastPush = recentActivity(data)[0]?.pushedAt
  const stats = [
    { label: 'Tools', value: String(FEATURED_TOOLS.length) },
    { label: 'Public repos', value: String(data.publicRepos) },
    { label: 'Stars', value: String(data.totalStars) },
    { label: 'Last push', value: lastPush ? timeAgo(lastPush) : '—' },
  ]

  return (
    <div className="min-h-dvh bg-[#08080A] text-[#F4F3F7] antialiased" style={GEIST}>
      <header className="sticky top-0 z-10 border-white/[0.06] border-b bg-[#08080A]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-8 px-6 text-[13px] text-white/60">
          <span className="flex items-center gap-2.5 text-white">
            <BrandMark className="w-6 text-white" isBlinking size={24} />
            netko
          </span>
          <a className="hover:text-white" href={toHash(ANCHOR.tools)}>
            Tools
          </a>
          <a className="hover:text-white" href={toHash(ANCHOR.principles)}>
            Principles
          </a>
          <a
            className="ml-auto rounded-full bg-white px-3.5 py-1.5 font-medium text-black hover:bg-white/90"
            href={GITHUB_ORG_URL}
          >
            GitHub
          </a>
        </div>
      </header>

      <section className="relative mx-auto max-w-6xl px-6 pt-32 pb-28 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-24 mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-white/25 to-transparent"
        />
        <Reveal>
          <p className="text-[13px] text-white/50" style={GEIST_MONO}>
            An open-source lab
          </p>
          <h1 className="mx-auto mt-6 max-w-4xl bg-gradient-to-b from-white to-white/55 bg-clip-text font-medium text-5xl text-transparent leading-[1.02] tracking-[-0.04em] sm:text-7xl">
            {BRAND.tagline}
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lg text-white/55 leading-relaxed">
            We poke at language models until something useful falls out, then we polish it and give
            it away.
          </p>
          <div className="mt-10 flex justify-center gap-3 text-sm">
            <a
              className="rounded-full bg-white px-5 py-2.5 font-medium text-black"
              href={toHash(ANCHOR.tools)}
            >
              Explore tools
            </a>
            <a
              className="rounded-full border border-white/15 px-5 py-2.5 text-white/80 hover:border-white/30"
              href={GITHUB_ORG_URL}
            >
              View on GitHub
            </a>
          </div>
        </Reveal>
        <Reveal className="mt-24" delayMs={150}>
          <BrandMark
            className="mx-auto block w-28 text-white/90"
            expression={expression}
            isBlinking={expression === 'idle'}
            size={112}
          />
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-28" id={ANCHOR.tools}>
        <Reveal>
          <h2 className="text-[13px] text-white/50" style={GEIST_MONO}>
            Tools
          </h2>
        </Reveal>
        <ul className="mt-6 border-white/[0.06] border-t">
          {FEATURED_TOOLS.map((tool, index) => {
            const repo = repoFor(tool, data.repos)
            return (
              <li className="border-white/[0.06] border-b" key={tool.name}>
                <Reveal
                  className="group grid gap-2 py-7 transition-colors hover:bg-white/[0.02] md:grid-cols-[14rem_1fr_auto] md:items-center md:gap-10 md:px-4"
                  delayMs={index * 60}
                >
                  <span className="font-medium text-2xl tracking-[-0.03em]">{tool.name}</span>
                  <span className="text-white/55">
                    <span className="text-white/90">{tool.tagline}</span> {tool.description}
                  </span>
                  <span
                    className="flex items-center gap-5 text-[13px] text-white/45"
                    style={GEIST_MONO}
                  >
                    <span>
                      {STATUS_LABEL[tool.status]}
                      {repo ? ` · ★ ${repo.stars}` : ''}
                    </span>
                    {toolLinks(tool).map((link) => (
                      <a
                        className="text-white/70 hover:text-white"
                        href={link.href}
                        key={link.kind}
                      >
                        {link.label} ↗
                      </a>
                    ))}
                  </span>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="mx-auto grid max-w-6xl gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.06] sm:grid-cols-4">
        {stats.map((stat) => (
          <div className="bg-[#08080A] p-8" key={stat.label}>
            <p className="font-medium text-4xl tabular-nums tracking-[-0.04em]">{stat.value}</p>
            <p className="mt-2 text-[13px] text-white/45" style={GEIST_MONO}>
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      <section
        className="mx-auto grid max-w-6xl gap-12 px-6 py-28 md:grid-cols-3"
        id={ANCHOR.principles}
      >
        {PRINCIPLES.map((principle, index) => (
          <Reveal delayMs={index * 100} key={principle.name}>
            <p className="text-[13px] text-white/40" style={GEIST_MONO}>
              0{index + 1}
            </p>
            <h3 className="mt-4 font-medium text-xl capitalize tracking-[-0.02em]">
              {principle.name}
            </h3>
            <p className="mt-3 text-white/55 leading-relaxed">{principle.line}</p>
          </Reveal>
        ))}
      </section>

      <footer className="border-white/[0.06] border-t">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-6 px-6 py-10 text-[13px] text-white/45">
          <span>© 2026 Netko Labs</span>
          {otherRepos(data.repos).map((repo) => (
            <a className="hover:text-white" href={repo.url} key={repo.name}>
              {repo.name}
            </a>
          ))}
          <span className="ml-auto inline-flex size-2 bg-sakura" />
        </div>
      </footer>
    </div>
  )
}
