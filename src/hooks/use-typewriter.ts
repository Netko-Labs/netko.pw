import { useEffect, useState } from 'react'

const START_DELAY_MS = 450

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useTypewriter(text: string, msPerChar = 26) {
  const [count, setCount] = useState(() => (prefersReducedMotion() ? text.length : 0))

  useEffect(() => {
    if (count >= text.length) return
    const delay = count === 0 ? START_DELAY_MS : msPerChar
    const timer = window.setTimeout(() => setCount((current) => current + 1), delay)
    return () => window.clearTimeout(timer)
  }, [count, text.length, msPerChar])

  return { typed: text.slice(0, count), isDone: count >= text.length }
}
