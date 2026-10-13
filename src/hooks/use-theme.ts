import { PALETTE } from '@brand/tokens'
import { useCallback, useEffect, useState } from 'react'
import type { Theme } from '@/types'

const STORAGE_KEY = 'netko-theme'
const DARK_QUERY = '(prefers-color-scheme: dark)'
const THEME_COLOR: Record<Theme, string> = { light: PALETTE.kami, dark: PALETTE.sumi }

function readStoredTheme(): Theme | null {
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return stored === 'light' || stored === 'dark' ? stored : null
}

function readSystemTheme(): Theme {
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => readStoredTheme() ?? readSystemTheme())

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme
    root.style.colorScheme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme])
  }, [theme])

  useEffect(() => {
    const media = window.matchMedia(DARK_QUERY)
    const followSystem = () => {
      if (!readStoredTheme()) setTheme(readSystemTheme())
    }
    media.addEventListener('change', followSystem)
    return () => media.removeEventListener('change', followSystem)
  }, [])

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    window.localStorage.setItem(STORAGE_KEY, next)
    setTheme(next)
  }, [theme])

  return { theme, toggleTheme }
}
