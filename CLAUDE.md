# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run dev      # Start dev server (Vite)
bun run build    # Type-check and build for production
bun run lint     # Run ESLint
bun run preview  # Preview production build
```

## Architecture

This is a React SPA for the Netko organization landing page, built with:
- **Vite** - Build tool with HMR
- **React 19** - UI framework
- **TypeScript** - Strict mode enabled
- **Tailwind CSS v4** - Styling via `@tailwindcss/vite` plugin
- **Motion** - Animations (formerly Framer Motion)
- **Tabler Icons** - Icon library

### Project Structure

```
src/
├── components/
│   ├── landing-page.tsx       # Main landing page (uses sub-components)
│   ├── landing/               # Landing page sub-components
│   │   ├── index.ts           # Barrel exports
│   │   ├── constants.ts       # Animation variants, data, configs
│   │   ├── floating-elements.tsx
│   │   ├── header.tsx
│   │   ├── hero.tsx
│   │   ├── project-card.tsx
│   │   ├── glitchcove-card.tsx
│   │   ├── contributor-card.tsx
│   │   ├── stats-cards.tsx
│   │   ├── tech-stack.tsx
│   │   ├── funny-metrics.tsx
│   │   └── footer.tsx
│   └── ui/                    # Reusable UI components (shadcn-style)
├── hooks/
│   └── use-github-data.ts     # GitHub API data fetching hook
├── types/
│   └── index.ts               # Shared TypeScript interfaces
├── assets/                    # Static assets (SVGs imported as React components)
├── lib/utils.ts               # Utility functions (cn for class merging)
├── index.css                  # Global styles, CSS variables, Tailwind config
├── App.tsx                    # Root component
└── main.tsx                   # Entry point
```

### Key Patterns

**Path Alias:** Use `@/*` for imports from `src/`
```typescript
import { cn } from '@/lib/utils'
import { useGitHubData } from '@/hooks/use-github-data'
import type { RepoData } from '@/types'
```

**SVG as React Components:** Import with `?react` suffix
```typescript
import LogoSvg from '@/assets/logo.svg?react'
```

**CSS Variables:** Theme colors defined in `src/index.css` using OKLCH color space with light/dark mode support via `.dark` class.

**Animations:** Use Motion library variants for staggered animations and hover effects. Animation variants are centralized in `src/components/landing/constants.ts`.

## Code Style Rules

From `/init` configuration:
- **No inline types** - Put interfaces/types in `src/types/index.ts`
- **Max 350 lines per component** - Split into sub-components when approaching limit
- **Max ~5 hooks per component** - Extract to custom hooks in `src/hooks/`
- **Path aliases** - Always use `@/*` instead of relative paths
- **Strict TypeScript** - No `any`, unused imports/vars are errors
- **Single quotes** - Use single quotes for strings in TypeScript files
