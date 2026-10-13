export const ANCHOR = {
  top: 'top',
  main: 'main-content',
  tools: 'tools',
  repos: 'repos',
} as const

export const toHash = (anchor: string) => `#${anchor}`
