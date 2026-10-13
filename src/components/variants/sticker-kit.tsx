import { FEATURED_TOOLS, GITHUB_ORG_URL, toolLinks } from '@/components/site'
import type { ExpressionKey, SparkleProps, StickerBodyProps, StickerTool } from '@/types'

export const FREDOKA = { fontFamily: "'Fredoka', sans-serif", fontWeight: 600 }
export const FREDOKA_FONTS = 'family=Fredoka:wght@500;600;700'
export const PRINCIPLE_FACES: ExpressionKey[] = ['loading', 'happy', 'idle']

const PASTELS = ['#FFE38A', '#B9E8A8', '#9DD8FF', '#FFB8D2', '#D9CCFF', '#FFD2A6']
const TILTS = [-4, 3, -2, 5, -5, 2]

export const STICKERS: StickerTool[] = FEATURED_TOOLS.map((tool, index) => ({
  tool,
  color: PASTELS[index],
  tilt: TILTS[index],
}))

export const primaryHref = (sticker: StickerTool) =>
  toolLinks(sticker.tool)[0]?.href ?? GITHUB_ORG_URL

export function Sparkle({ className }: SparkleProps) {
  return (
    <svg aria-hidden className={`absolute ${className}`} viewBox="0 0 24 24" width="28" height="28">
      <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" fill="currentColor" />
    </svg>
  )
}

export function StickerBody({ sticker, isCompact }: StickerBodyProps) {
  const [primary] = toolLinks(sticker.tool)
  return (
    <>
      <span className={isCompact ? 'text-2xl' : 'text-3xl'} style={FREDOKA}>
        {sticker.tool.name}
      </span>
      <span className="mt-2 block font-bold">{sticker.tool.tagline}</span>
      {isCompact ? null : (
        <span className="mt-3 block text-sm opacity-80">{sticker.tool.description}</span>
      )}
      <span className="mt-4 inline-block rounded-full bg-white px-3 py-1 font-mono text-sumi text-xs">
        {primary ? `${primary.label} →` : 'coming soon'}
      </span>
    </>
  )
}
