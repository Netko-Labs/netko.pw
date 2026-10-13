import { useCallback, useEffect, useState } from 'react'
import type { ExpressionKey, KeyboardKeyProps } from '@/types'

const PRESS_MS = 220

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

export function useCatKeyboard() {
  const [pressed, setPressed] = useState<string | null>(null)
  const [typedCount, setTypedCount] = useState(0)

  const press = useCallback((label: string) => {
    setPressed(label)
    setTypedCount((count) => count + 1)
    window.setTimeout(() => setPressed((current) => (current === label ? null : current)), PRESS_MS)
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const label = event.key.toUpperCase()
      if (!KEYS.includes(label) || event.target instanceof HTMLInputElement) return
      press(label)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [press])

  const face: ExpressionKey = pressed ? 'happy' : typedCount > 0 ? 'idle' : 'sleep'
  return { pressed, press, typedCount, face, isBlinking: !pressed && typedCount > 0 }
}
