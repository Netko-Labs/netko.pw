import { useCallback, useEffect, useRef, useState } from 'react'
import type { ExpressionKey } from '@/types'

const PRESS_MS = 220
const TYPING_TAGS = new Set(['INPUT', 'TEXTAREA', 'SELECT'])

export const KEYS = ['N', 'E', 'T', 'K', 'O']

function isTypingTarget(target: EventTarget | null) {
  return (
    target instanceof HTMLElement && (target.isContentEditable || TYPING_TAGS.has(target.tagName))
  )
}

export function useCatKeyboard() {
  const [pressed, setPressed] = useState<string | null>(null)
  const [typedCount, setTypedCount] = useState(0)
  const [progress, setProgress] = useState(0)
  const [completions, setCompletions] = useState(0)
  const progressRef = useRef(0)
  const releaseTimer = useRef(0)

  const press = useCallback((label: string) => {
    const current = progressRef.current
    const next = label === KEYS[current] ? current + 1 : label === KEYS[0] ? 1 : 0
    const isComplete = next === KEYS.length
    progressRef.current = isComplete ? 0 : next
    setProgress(progressRef.current)
    if (isComplete) setCompletions((count) => count + 1)
    setTypedCount((count) => count + 1)
    setPressed(label)
    window.clearTimeout(releaseTimer.current)
    releaseTimer.current = window.setTimeout(() => setPressed(null), PRESS_MS)
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.repeat || event.metaKey || event.ctrlKey || event.altKey) return
      if (isTypingTarget(event.target)) return
      const label = event.key.toUpperCase()
      if (KEYS.includes(label)) press(label)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      window.clearTimeout(releaseTimer.current)
    }
  }, [press])

  const face: ExpressionKey = pressed ? 'happy' : typedCount > 0 ? 'idle' : 'sleep'
  return {
    pressed,
    press,
    typedCount,
    progress,
    completions,
    face,
    isBlinking: !pressed && typedCount > 0,
  }
}
