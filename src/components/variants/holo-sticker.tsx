import { type CSSProperties, type PointerEvent, useRef } from 'react'
import { STATUS_LABEL, toolLinks } from '@/components/site'
import { useSeenOnce } from '@/hooks/use-seen-once'
import type { HoloStickerProps, ToolLink } from '@/types'
import { PixelBox, PixelSprite } from './pixel-kit'
import { SPARKLE_SPRITE, TOOL_SPRITES } from './pixel-sprites'

const MAX_TILT_DEG = 10
const TILT_PROPERTIES = ['--mx', '--my', '--rx', '--ry']
const STATUS_DOT = { 'open-source': 'bg-matcha', live: 'bg-sakura', building: 'bg-fog' } as const
const LINK_NOUN: Record<ToolLink['kind'], string> = {
  repo: 'on GitHub',
  docs: 'docs',
  site: 'live site',
}

function useHoloTilt() {
  const rect = useRef<DOMRect | null>(null)
  const frame = useRef(0)

  const onPointerEnter = (event: PointerEvent<HTMLElement>) => {
    rect.current = event.currentTarget.getBoundingClientRect()
  }

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse') return
    const node = event.currentTarget
    const { clientX, clientY } = event
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      const box = rect.current ?? node.getBoundingClientRect()
      const x = (clientX - box.left) / box.width
      const y = (clientY - box.top) / box.height
      node.style.setProperty('--mx', `${x * 100}%`)
      node.style.setProperty('--my', `${y * 100}%`)
      node.style.setProperty('--rx', `${(0.5 - y) * MAX_TILT_DEG}deg`)
      node.style.setProperty('--ry', `${(x - 0.5) * MAX_TILT_DEG}deg`)
    })
  }

  const onPointerLeave = (event: PointerEvent<HTMLElement>) => {
    cancelAnimationFrame(frame.current)
    rect.current = null
    for (const property of TILT_PROPERTIES) event.currentTarget.style.removeProperty(property)
  }

  return { onPointerEnter, onPointerMove, onPointerLeave }
}

export function HoloSticker({ sticker, repo }: HoloStickerProps) {
  const { tool } = sticker
  const cardRef = useRef<HTMLElement>(null)
  const isSeen = useSeenOnce(cardRef)
  const tilt = useHoloTilt()
  const links = toolLinks(tool)

  return (
    <article
      className={`group holo-tilt relative ${isSeen ? 'is-seen' : ''}`}
      ref={cardRef}
      style={{ '--sticker': sticker.color } as CSSProperties}
      {...tilt}
    >
      <PixelBox
        innerClassName="holo-shine flex h-full flex-col bg-[var(--sticker)] p-6 text-sumi dark:bg-yoru dark:text-kami"
        innerStyle={{ '--s': '8px' } as CSSProperties}
        isLifted
        style={{ '--outline': 'var(--card-outline)' } as CSSProperties}
      >
        <div className="flex items-start justify-between gap-3">
          <PixelSprite
            className="text-sumi dark:text-[var(--sticker)]"
            rows={TOOL_SPRITES[tool.name]}
            scale={4}
          />
          <span className="flex items-center gap-1.5 font-mono text-[11px]">
            <i className={`size-2.5 border border-current ${STATUS_DOT[tool.status]}`} />
            {STATUS_LABEL[tool.status]}
            {repo ? ` · ★ ${repo.stars}` : ''}
          </span>
        </div>
        <h3 className="mt-5 font-mono text-[22px] leading-tight">{tool.name}</h3>
        <p className="mt-2 font-bold leading-snug">{tool.tagline}</p>
        <p className="mt-2 text-[15px] leading-relaxed opacity-80">{tool.description}</p>
        <p className="mt-auto flex flex-wrap gap-3 pt-5">
          {links.length ? (
            links.map((link) => (
              <a
                aria-label={`${tool.name} ${LINK_NOUN[link.kind]}`}
                className="inline-flex min-h-10 items-center bg-white px-3 font-mono text-[11px] text-sumi hover:bg-sumi hover:text-white focus-visible:bg-sumi focus-visible:text-white dark:bg-[var(--sticker)] dark:focus-visible:bg-sumi dark:focus-visible:text-[var(--sticker)] dark:hover:bg-sumi dark:hover:text-[var(--sticker)]"
                href={link.href}
                key={link.kind}
              >
                {link.label}
                <span aria-hidden>&nbsp;→</span>
              </a>
            ))
          ) : (
            <span className="font-mono text-[11px] opacity-70">private repo</span>
          )}
        </p>
      </PixelBox>
      <span className="hover-sparkle pointer-events-none absolute -top-4 -right-4">
        <PixelSprite className="twinkle text-sakura" rows={SPARKLE_SPRITE} scale={5} />
      </span>
      <span className="hover-sparkle pointer-events-none absolute -bottom-4 -left-4">
        <PixelSprite
          className="twinkle text-[#6A3FD1] [animation-delay:.5s] dark:text-[#FFE38A]"
          rows={SPARKLE_SPRITE}
          scale={4}
        />
      </span>
    </article>
  )
}
