import { IconArrowUpRight, IconBrandGithub, IconTerminal2 } from '@tabler/icons-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { trackEvent } from '@/hooks/use-umami'

export function SiteHeader() {
  return (
    <header className="site-header">
      <a aria-label="Netko Labs home" className="site-mark" href="#top">
        <span className="site-mark__icon" aria-hidden="true">
          <IconTerminal2 />
        </span>
        <span>
          <strong>NETKO</strong>
          <span className="site-mark__slash">{'//'}</span>
          <span>LABS</span>
        </span>
      </a>

      <nav aria-label="Primary navigation" className="site-nav">
        <a href="#source-map">Projects</a>
        <a href="#operator">Operator</a>
        <Badge variant="outline">OPEN SOURCE</Badge>
      </nav>

      <Button
        onClick={() => trackEvent('github-link-click', { placement: 'header' })}
        render={<a href="https://github.com/Netko-Labs" rel="noreferrer" target="_blank" />}
        variant="outline"
      >
        <IconBrandGithub data-icon="inline-start" />
        Source
        <IconArrowUpRight data-icon="inline-end" />
      </Button>
    </header>
  )
}
