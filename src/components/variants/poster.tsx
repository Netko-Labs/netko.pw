import {
  ANCHOR,
  BrandMark,
  FEATURED_TOOLS,
  GITHUB_ORG_URL,
  otherRepos,
  PRINCIPLES,
  ThemeToggle,
  toHash,
  toolLinks,
} from '@/components/site'
import { useGoogleFonts } from '@/hooks/use-google-fonts'
import type { VariantProps } from '@/types'

const MARQUEE = 'OPEN-SOURCE TOOLS ✦ HACKED TOGETHER WITH LLMS ✦ SHIPPED BY A CAT ✦ '
const ANTON = { fontFamily: "'Anton', Impact, sans-serif" }

export function PosterVariant({ data, theme, onToggleTheme }: VariantProps) {
  useGoogleFonts('family=Anton')

  return (
    <div className="min-h-dvh bg-sakura text-sumi">
      <div className="overflow-hidden border-sumi border-b-4 bg-sumi text-sakura">
        <p
          className="ticker flex w-max whitespace-nowrap py-2 text-2xl tracking-wide"
          style={ANTON}
        >
          {MARQUEE.repeat(6)}
        </p>
      </div>

      <header className="flex items-center justify-between border-sumi border-b-4 px-5 py-3 font-mono text-sm">
        <span>NETKO.DEV / OSS LAB / {FEATURED_TOOLS.length} TOOLS</span>
        <span className="flex items-center gap-4">
          <a className="underline underline-offset-4" href={GITHUB_ORG_URL}>
            GITHUB ↗
          </a>
          <ThemeToggle onToggle={onToggleTheme} theme={theme} />
        </span>
      </header>

      <section className="relative overflow-hidden border-sumi border-b-4 px-4 pt-10 pb-6">
        <h1
          className="select-none text-[29vw] uppercase leading-[0.8] tracking-tight"
          style={ANTON}
        >
          Netko
        </h1>
        <BrandMark
          className="absolute top-[8%] right-[6%] w-[30vw] max-w-[420px] rotate-[-8deg] drop-shadow-[10px_10px_0_var(--sumi)] [&_svg]:h-auto [&_svg]:w-full"
          size={420}
        />
        <div className="mt-8 grid gap-6 font-mono text-sm md:grid-cols-3">
          <p className="text-2xl leading-tight md:col-span-2" style={ANTON}>
            OPEN-SOURCE TOOLS, HACKED TOGETHER WITH LLMS. WE POKE AT MODELS UNTIL SOMETHING USEFUL
            FALLS OUT.
          </p>
          <a
            className="self-end justify-self-start border-4 border-sumi bg-sumi px-5 py-3 text-sakura transition-transform hover:-translate-y-1 md:justify-self-end"
            href={toHash(ANCHOR.tools)}
          >
            SEE THE TOOLS ↓
          </a>
        </div>
      </section>

      <section className="bg-sumi text-kami" id={ANCHOR.tools}>
        {FEATURED_TOOLS.map((tool, index) => {
          const [primary] = toolLinks(tool)
          return (
            <a
              className="group grid grid-cols-[auto_1fr] items-baseline gap-x-6 border-yoru border-b-4 px-5 py-4 transition-colors hover:bg-sakura hover:text-sumi md:grid-cols-[6rem_1fr_minmax(0,22rem)]"
              href={primary?.href ?? GITHUB_ORG_URL}
              key={tool.name}
            >
              <span className="font-mono text-sm opacity-70">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-[13vw] uppercase leading-none md:text-[9vw]" style={ANTON}>
                {tool.name}
              </span>
              <span className="col-span-2 font-mono text-sm md:col-span-1 md:text-right">
                {tool.tagline}
                <span className="block opacity-60">{tool.stack.join(' / ')}</span>
              </span>
            </a>
          )
        })}
      </section>

      <section className="grid border-sumi border-b-4 bg-kami md:grid-cols-3">
        {PRINCIPLES.map((principle, index) => (
          <div
            className="border-sumi border-b-4 p-6 md:border-r-4 md:border-b-0 md:last:border-r-0"
            key={principle.name}
          >
            <p
              className={`text-7xl uppercase leading-none lg:text-8xl ${index === 1 ? 'text-transparent [-webkit-text-stroke:2px_var(--sumi)]' : ''}`}
              style={ANTON}
            >
              {principle.name}.
            </p>
            <p className="mt-4 max-w-[30ch] font-bold text-lg">{principle.line}</p>
          </div>
        ))}
      </section>

      <div className="overflow-hidden border-sumi border-b-4 bg-kami py-3">
        <p className="ticker flex w-max gap-10 whitespace-nowrap font-mono text-sm">
          {[...otherRepos(data.repos), ...otherRepos(data.repos)].map((repo, index) => (
            <a href={repo.url} key={`${repo.name}-${index}`}>
              ✦ {repo.name}
            </a>
          ))}
        </p>
      </div>

      <footer className="px-5 py-12">
        <a
          className="block text-[15vw] uppercase leading-[0.85] hover:underline"
          href={GITHUB_ORG_URL}
          style={ANTON}
        >
          Say hi on GitHub →
        </a>
        <p className="mt-6 font-mono text-sm">
          © 2026 NETKO LABS · THE CAT WALKS ACROSS THE KEYBOARD SOMETIMES
        </p>
      </footer>
    </div>
  )
}
