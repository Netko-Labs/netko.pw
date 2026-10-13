import { FEATURED_TOOLS } from '@/components/site'
import type { ExpressionKey, StickerTool } from '@/types'

export const FREDOKA = { fontFamily: "'Fredoka', sans-serif", fontWeight: 600 }
export const PRINCIPLE_FACES: ExpressionKey[] = ['loading', 'happy', 'idle']

const PASTELS = ['#FFE38A', '#B9E8A8', '#9DD8FF', '#FFB8D2', '#D9CCFF', '#FFD2A6']
const TILTS = [-4, 3, -2, 5, -5, 2]

export const STICKERS: StickerTool[] = FEATURED_TOOLS.map((tool, index) => ({
  tool,
  color: PASTELS[index],
  tilt: TILTS[index],
}))
