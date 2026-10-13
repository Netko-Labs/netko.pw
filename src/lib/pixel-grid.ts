import { INK, PIXEL_MARK_SVG } from '@/generated/brand-art'
import type { PixelCell, PixelGrid } from '@/types'

const RUN = /<rect x="(\d+)" y="(\d+)" width="(\d+)" height="1" fill="([^"]+)"\/>/g

export function parsePixelMark(svg = PIXEL_MARK_SVG): PixelGrid {
  const cells: PixelCell[] = []
  for (const [, x, y, width, fill] of svg.matchAll(RUN)) {
    for (let offset = 0; offset < Number(width); offset++) {
      cells.push({ x: Number(x) + offset, y: Number(y), isAccent: fill !== INK })
    }
  }
  return { size: 16, cells }
}

export const PIXEL_CAT = parsePixelMark()
