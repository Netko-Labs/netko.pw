import { useCallback, useState } from 'react'

const DROP_MS = 900

export function useGacha(total: number) {
  const [collected, setCollected] = useState<number[]>([])
  const [isDropping, setIsDropping] = useState(false)

  const turn = useCallback(() => {
    const remaining = Array.from({ length: total }, (_, index) => index).filter(
      (index) => !collected.includes(index),
    )
    if (isDropping || remaining.length === 0) return
    const pick = remaining[Math.floor(Math.random() * remaining.length)]
    setIsDropping(true)
    window.setTimeout(() => {
      setCollected((current) => (current.includes(pick) ? current : [...current, pick]))
      setIsDropping(false)
    }, DROP_MS)
  }, [collected, isDropping, total])

  const collectAll = () => setCollected(Array.from({ length: total }, (_, index) => index))

  return {
    collected,
    latest: collected.at(-1) ?? null,
    isDropping,
    isSoldOut: collected.length === total,
    turn,
    collectAll,
  }
}
