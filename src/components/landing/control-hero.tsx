import { IconArrowDown, IconBolt, IconBrandGithub, IconPointFilled } from '@tabler/icons-react'
import { motion } from 'motion/react'
import { AsciiMark } from '@/components/landing/ascii-mark'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import type { GitHubData, InterfaceProfileConfig } from '@/types'

interface ControlHeroProps {
  githubData: GitHubData
  loading: boolean
  activeProfile: InterfaceProfileConfig
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'UTC',
  })
    .format(new Date(date))
    .replaceAll('/', '.')
}

export function ControlHero({ githubData, loading, activeProfile }: ControlHeroProps) {
  const latestRepo = [...githubData.repos]
    .filter((repo) => repo.name !== '.github')
    .sort((a, b) => Date.parse(b.pushedAt) - Date.parse(a.pushedAt))[0]

  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="control-hero"
      initial={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="control-hero__main">
        <div className="eyebrow">
          <IconPointFilled aria-hidden="true" />
          <span>INDEPENDENT SOFTWARE STUDIO</span>
          <span className="eyebrow__path">BOGOTÁ / GITHUB</span>
        </div>

        <h1 className="display-title">
          SMALL TOOLS.
          <br />
          <span>SHARP EDGES.</span>
        </h1>

        <p className="control-hero__lede">
          Netko Labs builds open-source developer tools for desktop apps, local infrastructure,
          data, and the strange machinery in between.
        </p>

        <div className="control-hero__actions">
          <Button render={<a href="#source-map" />}>
            Inspect projects
            <IconArrowDown data-icon="inline-end" />
          </Button>
          <Button
            render={<a href={githubData.organization.url} rel="noreferrer" target="_blank" />}
            variant="outline"
          >
            <IconBrandGithub data-icon="inline-start" />
            Follow the source
          </Button>
        </div>
      </div>

      <aside className="runtime-panel" aria-label="Live repository readout">
        <div className="runtime-panel__topline">
          <span>netko://runtime</span>
          <Badge variant="outline">
            {loading ? 'SYNCING' : `${githubData.source.toUpperCase()} DATA`}
          </Badge>
        </div>

        <div className="runtime-panel__cat">
          <AsciiMark variant={activeProfile.id} />
        </div>

        <Separator />

        <dl className="runtime-list">
          <div>
            <dt>public_repos</dt>
            <dd>{githubData.publicRepos.toString().padStart(2, '0')}</dd>
          </div>
          <div>
            <dt>latest_push</dt>
            <dd>{latestRepo ? formatDate(latestRepo.pushedAt) : '—'}</dd>
          </div>
          <div>
            <dt>active_thread</dt>
            <dd>{latestRepo?.name ?? 'syncing'}</dd>
          </div>
          <div>
            <dt>primary_stack</dt>
            <dd>{githubData.languages.join(' + ') || 'TypeScript + Rust'}</dd>
          </div>
        </dl>

        <div className="runtime-panel__status">
          <IconBolt aria-hidden="true" />
          <span>Build signal detected</span>
          <span className="runtime-panel__pulse" aria-hidden="true" />
        </div>
      </aside>
    </motion.section>
  )
}
