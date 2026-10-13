import type { FeaturedTool, ToolStatus } from '@/types'

export const GITHUB_ORG_URL = 'https://github.com/Netko-Labs'

export const FEATURED_TOOLS: FeaturedTool[] = [
  {
    name: 'mirin',
    tagline: 'Desktop apps, brewed in Bun.',
    description:
      'An Electron-style framework where the main process is Bun and the UI is real Chromium on every platform. Rust underneath.',
    stack: ['bun', 'rust', 'cef'],
    status: 'open-source',
    repo: 'mirin',
    docs: 'https://mirin.netko.dev',
  },
  {
    name: 'CodeWhiskers',
    tagline: 'Reviews, errors and logs for teams who ship.',
    description:
      'An LLM reviews every pull request with your own key, next to Sentry-compatible error tracking and logs.',
    stack: ['llm review', 'byok', 'sentry api'],
    status: 'open-source',
    repo: 'code-whiskers',
  },
  {
    name: 'Anko',
    tagline: 'A SQL client your agents can use too.',
    description:
      'Desktop client for PostgreSQL, MySQL and SQLite, built on Mirin, with authenticated MCP access for local coding agents.',
    stack: ['mirin', 'sql', 'mcp'],
    status: 'open-source',
    repo: 'Anko',
  },
  {
    name: 'Washi',
    tagline: 'A knowledge base agents write in.',
    description:
      'Notes are JSX documents that people and agents edit side by side. Desktop app on Mirin, or one Bun server for a team.',
    stack: ['wsx', 'agents', 'mirin'],
    status: 'building',
  },
  {
    name: 'mizu',
    tagline: 'Self-hosting for a Mac home lab.',
    description:
      'Canvas-based deploy management that runs on your Mac: Coolify-style control without renting a server.',
    stack: ['macos', 'paas', 'canvas'],
    status: 'open-source',
    repo: 'mizu',
  },
  {
    name: 'nukk',
    tagline: 'A pixel hotel to hang out in.',
    description:
      'An isometric social game: walk around shared rooms, chat and decorate with furniture. Runs a 20 Hz realtime loop.',
    stack: ['pixi.js', 'trpc ws', 'pixel art'],
    status: 'live',
    site: 'https://nukk.app',
  },
]

export const STATUS_LABEL: Record<ToolStatus, string> = {
  'open-source': 'open source',
  live: 'live',
  building: 'in development',
}

export const FEATURED_REPOS = new Set(
  FEATURED_TOOLS.flatMap((tool) => (tool.repo ? [tool.repo.toLowerCase()] : [])),
)

export const HIDDEN_REPOS = new Set(['.github'])
