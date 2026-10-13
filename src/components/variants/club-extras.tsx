import { BrandMark, otherRepos, PRINCIPLES } from '@/components/site'
import type { ClubExtrasProps } from '@/types'
import { FREDOKA, PRINCIPLE_FACES } from './sticker-kit'

export function ClubExtras({ repos }: ClubExtrasProps) {
  return (
    <>
      <section className="mx-auto grid max-w-5xl gap-6 px-5 pb-20 md:grid-cols-3">
        {PRINCIPLES.map((principle, index) => (
          <div className="flex items-start gap-3" key={principle.name}>
            <BrandMark className="w-14 shrink-0" expression={PRINCIPLE_FACES[index]} size={56} />
            <div className="rounded-3xl rounded-tl-md border-[3px] border-sumi bg-white p-4 text-sumi">
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
          {otherRepos(repos).map((repo) => (
            <a
              className="rounded-full border-2 border-sumi bg-white px-4 py-2 font-mono text-sm text-sumi hover:bg-[#FFE38A]"
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
    </>
  )
}
