import { useState, useEffect } from 'react'

export type ThemeId = 'dark' | 'light' | 'cyberpunk' | 'forest' | 'terminal'

export interface ThemeDef {
  id: ThemeId
  label: string
  emoji: string
  dark: boolean // whether to also apply .dark class for tailwind dark: variants
}

export const THEMES: ThemeDef[] = [
  { id: 'dark',      label: 'Dark',      emoji: '🌑', dark: true  },
  { id: 'light',     label: 'Light',     emoji: '☀️',  dark: false },
  { id: 'cyberpunk', label: 'Cyberpunk', emoji: '🟣', dark: true  },
  { id: 'forest',    label: 'Forest',    emoji: '🌿', dark: true  },
  { id: 'terminal',  label: 'Terminal',  emoji: '💻', dark: true  },
]

const STORAGE_KEY = 'netko-theme'
const DEFAULT: ThemeId = 'dark'

function applyTheme(id: ThemeId) {
  const def = THEMES.find(t => t.id === id) ?? THEMES[0]
  document.documentElement.setAttribute('data-theme', id)
  document.documentElement.classList.toggle('dark', def.dark)
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    return (localStorage.getItem(STORAGE_KEY) as ThemeId | null) ?? DEFAULT
  })

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const setTheme = (id: ThemeId) => {
    localStorage.setItem(STORAGE_KEY, id)
    setThemeState(id)
  }

  return { theme, setTheme, themes: THEMES }
}
