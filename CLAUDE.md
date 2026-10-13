# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run dev      # Start dev server (Vite)
bun run build    # Type-check and build for production
bun run lint     # Run ESLint
bun run preview  # Preview production build
bun run cf:dev   # Build and serve dist/ through workerd (local Workers runtime)
bun run deploy   # Build and deploy to Cloudflare Workers
```

## Deploy

Cloudflare Workers static assets, no Worker script. `wrangler.jsonc` serves `dist/` with SPA fallback; `public/_headers` sets security headers and immutable caching for hashed `/assets/*`. Workers Builds: build command `bun run build`, deploy command `bunx wrangler deploy`.

## Brand

Brand source is internal and lives in the private `Netko-Labs/brand-assets` repo (`netko/`). This repo only receives generated output, by running `bun run netko:sync ../netko.pw` from brand-assets: favicons and `og-card.png` in `public/`, and `brand.css`, `brand-art.ts` and `fonts/` in `src/generated/`. Never edit `src/generated/`, and never add brand source here.

## Architecture

This is a React SPA for the Netko organization landing page, built with:
- **Vite** - Build tool with HMR
- **React 19** - UI framework
- **TypeScript** - Strict mode enabled
- **Tailwind CSS v4** - Styling via `@tailwindcss/vite` plugin
- **Tabler Icons** - Icon library

### Project Structure

```
src/
├── components/
│   ├── landing-page.tsx       # Page composition: header → hero → status → tools → repos → principles → footer
│   ├── site/                  # netko.dev sections (barrel: index.ts)
│   │   ├── brand-art.tsx      # BrandMark / PixelMark / Wordmark from src/generated/brand-art.ts
│   │   ├── raw-markup.tsx     # The one place generated brand markup is injected
│   │   ├── featured.ts        # Curated tools (FEATURED_TOOLS), status labels, org URL
│   │   ├── anchors.ts         # Section ids shared by nav links and sections
│   │   └── ...                # hero, site-header, status-strip, tool-card, sections, site-footer
│   └── ui/                    # shadcn primitives (currently unused)
├── generated/                 # Synced from brand-assets: brand.css, brand-art.ts, fonts/ (never edit)
├── hooks/                     # use-github-data, use-theme (system + toggle), use-typewriter, use-umami
├── lib/                       # cn(), timeAgo()
├── types/index.ts             # All shared types
└── index.css                  # Tailwind v4 theme on top of the brand palette
```

### Key Patterns

**Path Alias:** Use `@/*` for imports from `src/`
```typescript
import { cn } from '@/lib/utils'
import { useGitHubData } from '@/hooks/use-github-data'
import type { RepoData } from '@/types'
```

**Theme:** `data-theme="light|dark"` on `<html>`, set before paint by the inline script in `index.html` and kept in sync by `useTheme`. Semantic tokens (`bg`, `fg`, `surface`, `line`, `muted`) live in `src/index.css`; raw palette vars come from `src/generated/brand.css`. Sakura is never text on kami (2.72:1), only graphics.

**Animations:** CSS only (blink, caret, typewriter hook). Always respect `prefers-reduced-motion`.

## Code Style Rules

From `/init` configuration:
- **No inline types** - Put interfaces/types in `src/types/index.ts`
- **Max 350 lines per component** - Split into sub-components when approaching limit
- **Max ~5 hooks per component** - Extract to custom hooks in `src/hooks/`
- **Path aliases** - Always use `@/*` instead of relative paths
- **Strict TypeScript** - No `any`, unused imports/vars are errors
- **Single quotes** - Use single quotes for strings in TypeScript files
