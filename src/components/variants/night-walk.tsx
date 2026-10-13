import { useEffect, useRef, useState } from 'react'
import {
  FEATURED_TOOLS,
  GITHUB_ORG_URL,
  otherRepos,
  STATUS_LABEL,
  toolLinks,
} from '@/components/site'
import { PIXEL_CAT } from '@/lib/pixel-grid'
import type { NightWalkCardProps, VariantProps } from '@/types'
import { activeShop, drawScene, VIEW_HEIGHT } from './night-walk-scene'

const SHOPS = FEATURED_TOOLS.map((tool) => ({ name: tool.name, status: tool.status }))

function NightWalkCard({ tool }: NightWalkCardProps) {
  if (!tool) return null
  return (
    <div className="pointer-events-auto mx-auto w-[min(92vw,30rem)] rounded-md border border-[#6FE7FF]/40 bg-[#0B0916]/85 p-5 font-mono text-kami shadow-[0_0_40px_-10px_#6FE7FF] backdrop-blur">
      <p className="text-fog text-xs">{STATUS_LABEL[tool.status]} · storefront</p>
      <p className="mt-1 text-2xl">{tool.name}</p>
      <p className="mt-2 font-sans">{tool.tagline}</p>
      <p className="mt-3 flex gap-4 text-sm">
        {toolLinks(tool).map((link) => (
          <a
            className="text-[#6FE7FF] underline underline-offset-4"
            href={link.href}
            key={link.kind}
          >
            {link.label} ↗
          </a>
        ))}
      </p>
    </div>
  )
}

export function NightWalkVariant({ data }: VariantProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [scene, setScene] = useState({ active: -1, progress: 0 })

  useEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!section || !canvas || !ctx) return
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    let lastProgress = -1
    let lastMoveAt = 0

    const render = (time: number) => {
      const rect = section.getBoundingClientRect()
      const progress = Math.min(1, Math.max(0, -rect.top / (rect.height - window.innerHeight)))
      const cssWidth = canvas.clientWidth
      const cssHeight = canvas.clientHeight
      const scale = cssHeight / VIEW_HEIGHT
      const dpr = window.devicePixelRatio || 1
      if (canvas.width !== Math.round(cssWidth * dpr)) {
        canvas.width = Math.round(cssWidth * dpr)
        canvas.height = Math.round(cssHeight * dpr)
      }
      if (progress !== lastProgress) lastMoveAt = time
      const width = cssWidth / scale
      const active = activeShop(progress, width, SHOPS.length)
      ctx.setTransform(scale * dpr, 0, 0, scale * dpr, 0, 0)
      ctx.imageSmoothingEnabled = false
      drawScene(ctx, {
        width,
        progress,
        time: isReduced ? 0 : time,
        isMoving: !isReduced && time - lastMoveAt < 160,
        activeIndex: active,
        shops: SHOPS,
        cat: PIXEL_CAT,
      })
      setScene((current) =>
        current.active === active && Math.abs(current.progress - progress) < 0.01
          ? current
          : { active, progress },
      )
      lastProgress = progress
      frame = requestAnimationFrame(render)
    }
    frame = requestAnimationFrame(render)
    return () => cancelAnimationFrame(frame)
  }, [])

  const activeTool = scene.active >= 0 ? FEATURED_TOOLS[scene.active] : null

  return (
    <div className="bg-[#0B0916] text-kami">
      <section className="relative h-[700vh]" ref={sectionRef}>
        <div className="sticky top-0 h-dvh overflow-hidden">
          <canvas
            aria-label="A pixel cat walking down a neon street of Netko tools"
            className="absolute inset-0 h-full w-full"
            ref={canvasRef}
            role="img"
          />
          <header className="absolute inset-x-0 top-0 flex items-start justify-between p-5 font-mono">
            <div>
              <p className="text-sm text-fog">netko.dev · night walk</p>
              <h1
                className="mt-2 max-w-[18ch] text-3xl leading-tight sm:text-5xl"
                style={{ opacity: 1 - scene.progress * 6 }}
              >
                Open-source tools, hacked together with LLMs.
              </h1>
              <p
                className="mt-3 text-[#6FE7FF] text-sm"
                style={{ opacity: 1 - scene.progress * 10 }}
              >
                scroll to walk →
              </p>
            </div>
            <a className="text-sm underline underline-offset-4" href={GITHUB_ORG_URL}>
              github ↗
            </a>
          </header>
          <div className="pointer-events-none absolute inset-x-0 bottom-[30%] px-4">
            <NightWalkCard tool={activeTool} />
          </div>
          <div aria-hidden className="absolute right-5 bottom-5 left-5 h-1 bg-yoru">
            <div className="h-full bg-sakura" style={{ width: `${scene.progress * 100}%` }} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-24 font-mono">
        <p className="text-fog text-sm">end of the street</p>
        <h2 className="mt-3 text-4xl">The rest of the block</h2>
        <ul className="mt-8 space-y-3">
          {otherRepos(data.repos).map((repo) => (
            <li key={repo.name}>
              <a className="text-[#6FE7FF] underline underline-offset-4" href={repo.url}>
                {repo.name}
              </a>
              <span className="ml-3 font-sans text-fog">{repo.description ?? ''}</span>
            </li>
          ))}
        </ul>
        <p className="mt-16 text-fog text-xs">© 2026 Netko Labs · the cat walks home</p>
      </section>
    </div>
  )
}
