import {
  IconCoffee,
  IconBolt,
  IconMoon,
  IconBug,
  IconBrandReact,
  IconBrandRust,
  IconBrandTypescript,
  IconBrandTailwind,
  IconAppWindow,
  IconDatabase,
} from '@tabler/icons-react'
import type { TechStackItem, FunnyMetric } from '@/types'

// Animation variants
export const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
}

export const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1] as const }
  },
}

export const floatVariants = {
  initial: { y: 0 },
  animate: {
    y: [-4, 4, -4],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const }
  }
}

export const pulseVariants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const }
  }
}

export const rotateVariants = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: { duration: 20, repeat: Infinity, ease: 'linear' as const }
  }
}

// Language colors for GitHub
export const languageColors: Record<string, string> = {
  TypeScript: 'bg-blue-500',
  JavaScript: 'bg-yellow-400',
  Rust: 'bg-orange-500',
  Python: 'bg-green-500',
  Go: 'bg-cyan-500',
  HTML: 'bg-red-500',
  CSS: 'bg-purple-500',
  Swift: 'bg-orange-400',
  Kotlin: 'bg-violet-500',
}

// Tech stack data
export const techStack: TechStackItem[] = [
  { name: 'TypeScript', icon: IconBrandTypescript, color: 'text-blue-400' },
  { name: 'React', icon: IconBrandReact, color: 'text-cyan-400' },
  { name: 'Rust', icon: IconBrandRust, color: 'text-orange-400' },
  { name: 'Tauri', icon: IconAppWindow, color: 'text-yellow-400' },
  { name: 'Tailwind', icon: IconBrandTailwind, color: 'text-teal-400' },
  { name: 'SQLite', icon: IconDatabase, color: 'text-blue-300' },
]

// Funny metrics data
export const funnyMetrics: FunnyMetric[] = [
  { icon: IconCoffee, value: '∞', label: 'cups of coffee', color: 'text-amber-500' },
  { icon: IconBolt, value: '420', label: 'energy drinks', color: 'text-yellow-400' },
  { icon: IconMoon, value: '69', label: 'sleepless nights', color: 'text-indigo-400' },
  { icon: IconBug, value: '9999', label: 'bugs created', color: 'text-red-400' },
]

// Projects configuration
export interface ProjectConfig {
  name: string
  fallbackDescription: string
  fallbackTags: string[]
  color: string
}

export const projects: Record<string, ProjectConfig> = {
  covenote: {
    name: 'CoveNote',
    fallbackDescription: 'Your second brain, but it actually thinks',
    fallbackTags: ['AI', 'Life OS'],
    color: 'primary',
  },
  anko: {
    name: 'Anko',
    fallbackDescription: 'SQL editor that doesn\'t make you cry',
    fallbackTags: ['SQL', 'Dev Tools'],
    color: 'accent',
  },
  'code-whiskers': {
    name: 'Code-Whiskers',
    fallbackDescription: 'Sentry-like error monitoring, but cuter',
    fallbackTags: ['Monitoring'],
    color: 'red',
  },
  mizu: {
    name: 'Mizu',
    fallbackDescription: 'Vercel/Heroku for your Mac mini homelab',
    fallbackTags: ['macOS', 'PaaS'],
    color: 'cyan',
  },
}
