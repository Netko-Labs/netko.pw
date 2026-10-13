import {
  FEATURED_TOOLS,
  GITHUB_ORG_URL,
  otherRepos,
  PRINCIPLES,
  repoFor,
  STATUS_LABEL,
  toolLinks,
} from '@/components/site'
import { BRAND } from '@/generated/brand-art'
import { useGoogleFonts } from '@/hooks/use-google-fonts'
import { timeAgo } from '@/lib/format'
import type { VariantProps } from '@/types'
import { VoxelCat } from './voxel-cat'

const INTER = { fontFamily: "'Inter Tight', system-ui, sans-serif" }
const RULE = 'border-[#E4E1EC]'

export function VoxelVariant({ data }: VariantProps) {
  useGoogleFonts('family=Inter+Tight:wght@400;600;800;900')

  return (
    <div className="min-h-dvh bg-white text-sumi" style={INTER}>
      <header className={`grid grid-cols-2 border-b ${RULE} font-mono text-xs md:grid-cols-6`}>
        {[
          'netko',
          'open-source lab',
          `${FEATURED_TOOLS.length} tools`,
          `${data.publicRepos} public repos`,
          'netko.dev',
        ].map((label, index) => (
          <span
            className={`border-r ${RULE} px-4 py-3 ${index > 1 ? 'hidden md:block' : ''}`}
            key={label}
          >
            {label}
          </span>
        ))}
        <a className="px-4 py-3 text-sakura" href={GITHUB_ORG_URL}>
          github ↗
        </a>
      </header>

      <section className={`grid border-b ${RULE} md:grid-cols-12`}>
        <div
          className={`flex flex-col justify-between border-b ${RULE} p-6 md:col-span-7 md:border-r md:border-b-0 md:p-10`}
        >
          <h1 className="font-black text-[24vw] leading-[0.8] tracking-[-0.07em] md:text-[15vw]">
            netko
          </h1>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <p className="font-semibold text-2xl leading-tight tracking-[-0.02em]">
              {BRAND.tagline}
            </p>
            <p className="text-sm text-sumi/60 leading-relaxed">
              Six tools and counting, built in the open by a small lab. Every one began as an
              experiment with a model.
            </p>
          </div>
        </div>
        <figure className="flex flex-col p-6 md:col-span-5 md:p-10">
          <VoxelCat className="cursor-grab" />
          <figcaption className="mt-4 flex justify-between font-mono text-sumi/50 text-xs">
            <span>fig. 1 — term, 16 × 16 × 2 voxels</span>
            <span>move to rotate</span>
          </figcaption>
        </figure>
      </section>

      <section className={`border-b ${RULE}`}>
        <div
          className={`grid grid-cols-12 border-b ${RULE} px-6 py-3 font-mono text-sumi/50 text-xs md:px-10`}
        >
          <span className="col-span-2 md:col-span-1">no.</span>
          <span className="col-span-10 md:col-span-3">tool</span>
          <span className="hidden md:col-span-5 md:block">what it does</span>
          <span className="hidden md:col-span-3 md:block">status · links</span>
        </div>
        {FEATURED_TOOLS.map((tool, index) => {
          const repo = repoFor(tool, data.repos)
          return (
            <div
              className={`group grid grid-cols-12 items-baseline gap-y-2 border-b ${RULE} px-6 py-6 last:border-b-0 hover:bg-[#FFF5F9] md:px-10`}
              key={tool.name}
            >
              <span className="col-span-2 font-mono text-sakura md:col-span-1">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="col-span-10 font-extrabold text-4xl tracking-[-0.04em] md:col-span-3">
                {tool.name}
              </span>
              <span className="col-span-12 md:col-span-5">
                <span className="font-semibold">{tool.tagline}</span>
                <span className="block text-sm text-sumi/60">{tool.description}</span>
              </span>
              <span className="col-span-12 flex flex-wrap gap-x-4 font-mono text-xs md:col-span-3">
                <span className="text-sumi/50">
                  {STATUS_LABEL[tool.status]}
                  {repo ? ` · ${timeAgo(repo.pushedAt)}` : ''}
                </span>
                {toolLinks(tool).map((link) => (
                  <a
                    className="underline decoration-sakura underline-offset-4"
                    href={link.href}
                    key={link.kind}
                  >
                    {link.label} ↗
                  </a>
                ))}
              </span>
            </div>
          )
        })}
      </section>

      <section className={`grid border-b ${RULE} md:grid-cols-3`}>
        {PRINCIPLES.map((principle, index) => (
          <div
            className={`border-b ${RULE} p-6 md:border-r md:border-b-0 md:p-10 md:last:border-r-0`}
            key={principle.name}
          >
            <p className="font-black text-8xl text-sakura leading-none tracking-[-0.06em]">
              {index + 1}
            </p>
            <h3 className="mt-6 font-extrabold text-2xl capitalize tracking-[-0.03em]">
              {principle.name}
            </h3>
            <p className="mt-2 text-sumi/60">{principle.line}</p>
          </div>
        ))}
      </section>

      <footer className="grid gap-6 p-6 font-mono text-xs md:grid-cols-12 md:p-10">
        <p className="text-sumi/50 md:col-span-3">also on github</p>
        <ul className="space-y-1 md:col-span-6">
          {otherRepos(data.repos).map((repo) => (
            <li key={repo.name}>
              <a className="hover:text-sakura" href={repo.url}>
                {repo.name}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-sumi/50 md:col-span-3 md:text-right">© 2026 Netko Labs</p>
      </footer>
    </div>
  )
}
