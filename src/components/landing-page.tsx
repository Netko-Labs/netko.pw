import type { ComponentType } from 'react'
import { useGitHubData } from '@/hooks/use-github-data'
import { useTheme } from '@/hooks/use-theme'
import type { ExpressionKey, VariantMeta, VariantProps } from '@/types'
import {
  FEATURED_TOOLS,
  Hero,
  Principles,
  RepoList,
  SiteFooter,
  SiteHeader,
  StatusStrip,
  ToolsSection,
} from './site'
import { ANCHOR, toHash } from './site/anchors'
import {
  StickerCandyVariant,
  StickerClubVariant,
  StickerGachaVariant,
  StickerHoloVariant,
  StickerLaptopVariant,
  StickerScrapbookVariant,
  VariantSwitcher,
} from './variants'

function heroExpression(isLoading: boolean, hasError: boolean): ExpressionKey {
  if (isLoading) return 'loading'
  return hasError ? 'sleep' : 'idle'
}

const VARIANT_COMPONENTS: Record<string, ComponentType<VariantProps>> = {
  '2': StickerClubVariant,
  '2a': StickerLaptopVariant,
  '2b': StickerGachaVariant,
  '2c': StickerScrapbookVariant,
  '2d': StickerCandyVariant,
  '2e': StickerHoloVariant,
}

const VARIANTS: VariantMeta[] = [
  { id: '0', name: 'Current' },
  { id: '2', name: 'Sticker Club' },
  { id: '2a', name: 'Laptop Lid' },
  { id: '2b', name: 'Gacha' },
  { id: '2c', name: 'Scrapbook' },
  { id: '2d', name: 'Candy' },
  { id: '2e', name: 'Holo' },
]

const currentVariant = () => new URLSearchParams(window.location.search).get('v') ?? '0'

export function LandingPage() {
  const { theme, toggleTheme } = useTheme()
  const { githubData, loading, error } = useGitHubData()
  const hasError = Boolean(error)
  const variant = currentVariant()
  const Variant = VARIANT_COMPONENTS[variant]

  if (Variant) {
    return (
      <>
        <Variant
          data={githubData}
          expression={heroExpression(loading, hasError)}
          hasError={hasError}
          isLoading={loading}
          onToggleTheme={toggleTheme}
          theme={theme}
        />
        <VariantSwitcher current={variant} variants={VARIANTS} />
      </>
    )
  }

  return (
    <div className="min-h-dvh" id={ANCHOR.top}>
      <a className="skip-link" href={toHash(ANCHOR.main)}>
        Skip to content
      </a>
      <SiteHeader onToggleTheme={toggleTheme} theme={theme} />
      <main id={ANCHOR.main}>
        <Hero expression={heroExpression(loading, hasError)} />
        <StatusStrip
          data={githubData}
          hasError={hasError}
          isLoading={loading}
          toolCount={FEATURED_TOOLS.length}
        />
        <ToolsSection repos={githubData.repos} />
        <RepoList repos={githubData.repos} />
        <Principles />
      </main>
      <SiteFooter />
      <VariantSwitcher current="0" variants={VARIANTS} />
    </div>
  )
}
