# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run dev      # Start dev server (Vite)
bun run build    # Type-check and build for production
bun run lint     # Run ESLint
bun run preview  # Preview production build
bun run brand          # Regenerate brand kit + guidelines (brand/kit, brand/guidelines)
bun run brand:explore  # Regenerate logo exploration sheets (brand/01-logo)
```

## Brand

`brand/` holds the Netko identity: the **Term** mark (chat-bubble cat, square corners, pink eye), a pixel-grid wordmark, expressions, palette, and type. Everything there is generated from `brand/scripts/*.ts`. Edit the source, rerun, and never hand-edit exports. `brand/guidelines/index.html` is the reference; `brand/README.md` maps every edit to its source file.

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
│   │   ├── brand-art.tsx      # BrandMark / PixelMark / Wordmark, rendered from @brand/* (no copied SVGs)
│   │   ├── raw-markup.tsx     # The one place generated brand markup is injected
│   │   ├── featured.ts        # Curated tools (FEATURED_TOOLS), status labels, org URL
│   │   ├── anchors.ts         # Section ids shared by nav links and sections
│   │   └── ...                # hero, site-header, status-strip, tool-card, sections, site-footer
│   └── ui/                    # shadcn primitives (currently unused)
├── generated/brand.css        # Palette vars, written by `bun run brand`, never edit
├── hooks/                     # use-github-data, use-theme (system + toggle), use-typewriter, use-umami
├── lib/                       # cn(), timeAgo()
├── types/index.ts             # All shared types
└── index.css                  # Tailwind v4 theme on top of the brand palette
brand/                         # Identity source of truth; see brand/README.md
```

### Key Patterns

**Brand modules:** `@brand/*` → `brand/scripts/*`. Only the pure modules (`ascii`, `marks`, `pixel-maps`, `term`, `tokens`, `types`, `wordmark`) are in `tsconfig.app.json`; never import the Bun-only build scripts from `src`.

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
