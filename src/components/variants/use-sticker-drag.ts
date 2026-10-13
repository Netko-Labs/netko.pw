import { type PointerEvent, useEffect, useRef, useState } from 'react'
import type { StickerDrag, StickerPosition } from '@/types'

const STORAGE_KEY = 'netko-laptop-stickers'
const DRAG_THRESHOLD_PX = 5

const LAYOUT: StickerPosition[] = [
  { x: 6, y: 10 },
  { x: 52, y: 6 },
  { x: 26, y: 46 },
  { x: 62, y: 42 },
  { x: 4, y: 64 },
  { x: 44, y: 70 },
]

function readStored(): StickerPosition[] | null {
  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? 'null')
    return Array.isArray(stored) && stored.length === LAYOUT.length ? stored : null
  } catch {
    return null
  }
}

export function useStickerDrag(onTap: (index: number) => void) {
  const [positions, setPositions] = useState<StickerPosition[]>(() => readStored() ?? LAYOUT)
  const lidRef = useRef<HTMLDivElement>(null)
  const drag = useRef<StickerDrag | null>(null)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(positions))
  }, [positions])

  const onPointerDown = (index: number) => (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    drag.current = {
      index,
      pointerX: event.clientX,
      pointerY: event.clientY,
      origin: positions[index],
      hasMoved: false,
    }
  }

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    const current = drag.current
    const lid = lidRef.current
    if (!current || !lid) return
    const dx = event.clientX - current.pointerX
    const dy = event.clientY - current.pointerY
    if (!current.hasMoved && Math.hypot(dx, dy) < DRAG_THRESHOLD_PX) return
    current.hasMoved = true
    const rect = lid.getBoundingClientRect()
    const next = {
      x: Math.min(78, Math.max(-4, current.origin.x + (dx / rect.width) * 100)),
      y: Math.min(80, Math.max(-6, current.origin.y + (dy / rect.height) * 100)),
    }
    setPositions((all) => all.map((position, index) => (index === current.index ? next : position)))
  }

  const onPointerUp = () => {
    const current = drag.current
    drag.current = null
    if (current && !current.hasMoved) onTap(current.index)
  }

  const reset = () => setPositions(LAYOUT)

  return { lidRef, positions, onPointerDown, onPointerMove, onPointerUp, reset }
}
