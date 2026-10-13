import { type RefObject, useEffect, useState } from 'react'

export function useSeenOnce(ref: RefObject<HTMLElement | null>, threshold = 0.5) {
  const [isSeen, setIsSeen] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || isSeen) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setIsSeen(true)
        observer.disconnect()
      },
      { threshold },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [ref, threshold, isSeen])

  return isSeen
}
