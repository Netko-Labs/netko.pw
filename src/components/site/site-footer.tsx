import { BANNER_HTML } from '@/generated/brand-art'
import { ANCHOR, toHash } from './anchors'
import { GITHUB_ORG_URL } from './featured'
import { RawMarkup } from './raw-markup'

const FOOTER_LINKS = [
  { label: 'github.com/Netko-Labs', href: GITHUB_ORG_URL, isExternal: true },
  { label: 'back to top', href: toHash(ANCHOR.top), isExternal: false },
]

export function SiteFooter() {
  return (
    <footer className="border-line border-t">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[auto_1fr] lg:items-end">
        <RawMarkup as="pre" className="ascii" html={BANNER_HTML} />
        <ul className="space-y-2 font-mono text-sm lg:justify-self-end lg:text-right">
          {FOOTER_LINKS.map((link) => (
            <li key={link.href}>
              <a
                className="underline decoration-line underline-offset-4 hover:decoration-sakura"
                href={link.href}
                {...(link.isExternal ? { rel: 'noreferrer', target: '_blank' } : {})}
              >
                {link.label}
                {link.isExternal ? ' ↗' : ''}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="mx-auto max-w-6xl px-5 pb-10 font-mono text-muted text-xs sm:px-8">
        © 2026 Netko Labs · the cat walks across the keyboard sometimes. we call those features.
      </p>
    </footer>
  )
}
