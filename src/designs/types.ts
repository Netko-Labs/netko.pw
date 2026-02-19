export type DesignId = 'original' | 'brutalist' | 'terminal' | 'artdeco' | 'editorial'

export interface DesignDef {
  id: DesignId
  label: string
  emoji: string
  description: string
}

export const DESIGNS: DesignDef[] = [
  { id: 'original',   label: 'Original',   emoji: '✦',  description: 'Default' },
  { id: 'brutalist',  label: 'Brutalist',  emoji: '⬛',  description: 'Raw & Confrontational' },
  { id: 'terminal',   label: 'Terminal',   emoji: '⌨️',  description: 'Hacker CLI' },
  { id: 'artdeco',    label: 'Art Deco',   emoji: '◆',  description: 'Luxury & Ornate' },
  { id: 'editorial',  label: 'Editorial',  emoji: '📰',  description: 'Swiss Magazine' },
]

const STORAGE_KEY = 'netko-design'

export function getSavedDesign(): DesignId {
  return (localStorage.getItem(STORAGE_KEY) as DesignId | null) ?? 'original'
}

export function saveDesign(id: DesignId) {
  localStorage.setItem(STORAGE_KEY, id)
}
