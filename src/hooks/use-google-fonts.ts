import { useEffect } from 'react'

const loaded = new Set<string>()

export function useGoogleFonts(families: string) {
  useEffect(() => {
    if (loaded.has(families)) return
    loaded.add(families)
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `https://fonts.googleapis.com/css2?${families}&display=swap`
    document.head.append(link)
  }, [families])
}
