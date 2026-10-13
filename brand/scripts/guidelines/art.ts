import { renderMark } from '../marks'
import { renderPixelMark, TERM } from '../term'
import type { MarkSource, MarkTone, MarkVariant } from '../types'
import { renderLockup } from '../wordmark'

let uidCounter = 0

export const mark = (
  tone: MarkTone,
  variant: MarkVariant = 'duo',
  size = 160,
  source: MarkSource = TERM,
) => renderMark({ concept: source, variant, tone, uid: `g${uidCounter++}` }, size)

export const pixelMark = (tone: MarkTone, size: number, variant: MarkVariant = 'duo') =>
  renderPixelMark(tone, variant, size)

export const lockup = (kind: Parameters<typeof renderLockup>[0], tone: MarkTone, width: number) => {
  const { svg, height, width: native } = renderLockup(kind, tone)
  const scaled = Math.round((height * width) / native)
  return svg
    .replace(/width="\d+(\.\d+)?" height="\d+(\.\d+)?"/, `width="${width}" height="${scaled}"`)
    .replaceAll('id="m-lockup', `id="m-g${uidCounter}-lockup`)
    .replaceAll('url(#m-lockup', `url(#m-g${uidCounter++}-lockup`)
}

export const sectionHead = (path: string, title: string, lede: string) => `
  <p class="path">netko/brand/<b>${path}</b></p>
  <h2>${title}</h2>
  <p class="lede">${lede}</p>`
