import { useEffect, useState } from 'react'
import type { KeyboardKeyProps } from '@/types'

const PRESS_MS = 220

export function KeyboardKey({ label, isPressed, onPress }: KeyboardKeyProps) {
  return (
    <button
      aria-label={`Press ${label}`}
      className={`grid size-14 place-items-center rounded-2xl border-[3px] border-sumi bg-white text-2xl text-sumi transition-all sm:size-20 sm:text-4xl ${
        isPressed ? 'translate-y-1.5 shadow-[0_0_0_var(--sumi)]' : 'shadow-[0_6px_0_var(--sumi)]'
      }`}
      onClick={() => onPress(label)}
      style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 600 }}
      type="button"
    >
      {label}
    </button>
  )
}

export function usePressedKeys(keys: string[], onType: () => void) {
  const [pressed, setPressed] = useState<string | null>(null)

  const press = (label: string) => {
    setPressed(label)
    onType()
    window.setTimeout(() => setPressed((current) => (current === label ? null : current)), PRESS_MS)
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const label = event.key.toUpperCase()
      if (!keys.includes(label) || event.target instanceof HTMLInputElement) return
      setPressed(label)
      onType()
      window.setTimeout(() => setPressed(null), PRESS_MS)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [keys, onType])

  return { pressed, press }
}
