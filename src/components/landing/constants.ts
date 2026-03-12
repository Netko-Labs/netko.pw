import type { TechStackItem, FunnyMetric } from '@/types'

// Animation variants
export const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

export const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: [0.25, 0.4, 0.25, 1] as const }
  },
}

// Language colors for GitHub
export const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Rust: '#dea584',
  Python: '#3572A5',
  Go: '#00ADD8',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
}

// Tech stack data
export const techStack: TechStackItem[] = [
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'React', color: '#61dafb' },
  { name: 'Rust', color: '#dea584' },
  { name: 'Electrobun', color: '#f59e0b' },
  { name: 'Tailwind', color: '#38bdf8' },
  { name: 'SQLite', color: '#38bdf8' },
]

// Funny metrics data
export const funnyMetrics: FunnyMetric[] = [
  { value: '80085', label: 'cups_of_coffee', color: 'var(--soft)' },
  { value: '420', label: 'energy_drinks', color: 'var(--foreground)' },
  { value: '69', label: 'sleepless_nights', color: 'var(--danger)' },
  { value: '9999', label: 'bugs_created', color: 'var(--magenta)' },
]

// Projects configuration
export interface ProjectConfig {
  name: string
  fallbackDescription: string
  fallbackTags: string[]
}

export const projects: Record<string, ProjectConfig> = {
  covenote: {
    name: 'CoveNote',
    fallbackDescription: 'Your second brain, but it actually thinks',
    fallbackTags: ['AI', 'Life OS'],
  },
  anko: {
    name: 'Anko',
    fallbackDescription: 'SQL editor that doesn\'t make you cry',
    fallbackTags: ['SQL', 'Dev Tools'],
  },
  'code-whiskers': {
    name: 'Code-Whiskers',
    fallbackDescription: 'Sentry-like error monitoring, but cuter',
    fallbackTags: ['Monitoring'],
  },
  mizu: {
    name: 'Mizu',
    fallbackDescription: 'Vercel/Heroku for your Mac mini homelab',
    fallbackTags: ['macOS', 'PaaS'],
  },
}

// ── ASCII Art ──────────────────────────────────────

export const catAscii = `    /\\_____/\\
   /  o   o  \\
  ( ==  ^  == )
   )  ~~~~~  (
  (           )
 ( (  )   (  ) )
(__(__)___(__)__)`

export const catBlinkAscii = `    /\\_____/\\
   /  -   -  \\
  ( ==  ^  == )
   )  ~~~~~  (
  (           )
 ( (  )   (  ) )
(__(__)___(__)__)`

export const smallCatAscii = ` /\\_/\\
( o.o )
 > ^ <`

export const smallCatBlinkAscii = ` /\\_/\\
( -.- )
 > ^ <`

export const labsLogo = `
 ███▄    █ ▓█████▄▄▄█████▓ ██ ▄█▀ ▒█████
 ██ ▀█   █ ▓█   ▀▓  ██▒ ▓▒ ██▄█▒ ▒██▒  ██▒
▓██  ▀█ ██▒▒███  ▒ ▓██░ ▒░▓███▄░ ▒██░  ██▒
▓██▒  ▐▌██▒▒▓█  ▄░ ▓██▓ ░ ▓██ █▄ ▒██   ██░
▒██░   ▓██░░▒████▒ ▒██▒ ░ ▒██▒ █▄░ ████▓▒░
░ ▒░   ▒ ▒ ░░ ▒░ ░ ▒ ░░   ▒ ▒▒ ▓▒░ ▒░▒░▒░
  ░   ░ ░  ░ ░  ░   ░    ░ ░▒ ▒░  ░ ▒ ▒░
        ░    ░    ░      ░ ░░ ░ ░ ░ ░ ▒
             ░  ░            ░ ░       ░`

export const pawPrint = '🐾'

// Boot sequence messages
export const bootMessages = [
  { text: 'NETKO LABS BIOS v4.2.0', color: 'var(--accent)', delay: 0 },
  { text: 'Initializing kernel modules...', color: 'var(--foreground)', delay: 200 },
  { text: 'Loading cat_ascii.ko ............... [OK]', color: 'var(--foreground)', delay: 400 },
  { text: 'Loading hack_tools.ko .............. [OK]', color: 'var(--foreground)', delay: 550 },
  { text: 'Loading caffeine_driver.ko ......... [OK]', color: 'var(--foreground)', delay: 700 },
  { text: 'Mounting /dev/projects ............. [OK]', color: 'var(--foreground)', delay: 850 },
  { text: 'Starting github_sync daemon ........ [OK]', color: 'var(--foreground)', delay: 1000 },
  { text: 'Checking vibes ..................... [IMMACULATE]', color: 'var(--accent)', delay: 1150 },
  { text: '', color: 'var(--foreground)', delay: 1300 },
  { text: 'All systems operational. Welcome to Netko Labs.', color: 'var(--accent)', delay: 1400 },
]

// System log entries (for live activity feed)
export const systemLogEntries = [
  { text: '[git] pushed 3 commits to main', color: 'var(--foreground)' },
  { text: '[ci] build #847 passed ✓', color: 'var(--foreground)' },
  { text: '[deploy] production updated', color: 'var(--accent)' },
  { text: '[coffee] mug refilled (count: ∞)', color: 'var(--accent)' },
  { text: '[cat] keyboard occupied again', color: 'var(--magenta)' },
  { text: '[bug] squashed #4201', color: 'var(--danger)' },
  { text: '[pr] #42 merged by pejedev', color: 'var(--foreground)' },
  { text: '[monitor] all services green', color: 'var(--foreground)' },
  { text: '[cat] demands attention. priority: CRITICAL', color: 'var(--magenta)' },
  { text: '[deps] 0 vulnerabilities found', color: 'var(--accent)' },
  { text: '[test] 147 tests passed, 0 failed', color: 'var(--foreground)' },
  { text: '[cat] walked across keyboard: "asdfjkl;"', color: 'var(--accent)' },
  { text: '[perf] response time: 12ms', color: 'var(--foreground)' },
  { text: '[uptime] 99.99% this month', color: 'var(--accent)' },
  { text: '[cat] napping on server rack', color: 'var(--magenta)' },
]
