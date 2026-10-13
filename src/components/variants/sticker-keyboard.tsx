import { useCallback, useEffect, useRef, useState } from 'react'
import type { ExpressionKey, KeyboardKeyProps } from '@/types'

const PRESS_MS = 220
const TYPING_TAGS = new Set(['INPUT', 'TEXTAREA', 'SELECT'])

export const KEYS = ['N', 'E', 'T', 'K', 'O']

export function KeyboardKey({ label, isPressed, onPress, className = '' }: KeyboardKeyProps) {
  return (
    <button
      aria-label={`Press ${label}`}
      className={`grid size-14 place-items-center rounded-2xl border-[3px] text-2xl transition-all sm:size-20 sm:text-4xl ${
        isPressed ? 'translate-y-1.5 shadow-none' : 'shadow-[0_6px_0_currentColor]'
      } ${className}`}
      onClick={() => onPress(label)}
      style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 600 }}
      type="button"
    >
      {label}
    </button>
  )
}

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
