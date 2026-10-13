import { renderMark } from './marks'
import { TERM } from './term'
import { TONE_FG } from './tokens'
import type { LockupKind, MarkTone, SvgArt } from './types'

const GLYPHS: Record<string, string[]> = {
  n: ['.....', '.....', '####.', '#...#', '#...#', '#...#', '#...#'],
  e: ['.....', '.....', '.###.', '#...#', '#####', '#....', '.####'],
  t: ['..#..', '..#..', '#####', '..#..', '..#..', '..#..', '...##'],
  k: ['#....', '#....', '#...#', '#..#.', '###..', '#..#.', '#...#'],
  o: ['.....', '.....', '.###.', '#...#', '#...#', '#...#', '.###.'],
}

const WORD = 'netko'
const GLYPH_COLS = 5
const GLYPH_ROWS = 7
const TRACKING = 1

export const WORDMARK_COLS = WORD.length * GLYPH_COLS + (WORD.length - 1) * TRACKING

export const wordmarkGrid = () =>
  Array.from({ length: GLYPH_ROWS }, (_, y) =>
    [...WORD].map((char) => GLYPHS[char][y]).join('.'.repeat(TRACKING)),
  )

const wordmarkPath = (unit: number, originX: number, originY: number) =>
  [...WORD]
    .flatMap((char, index) =>
      GLYPHS[char].flatMap((row, y) =>
        [...row.matchAll(/#+/g)].map((run) => {
          const x = originX + (index * (GLYPH_COLS + TRACKING) + run.index) * unit
          return `M${x} ${originY + y * unit}h${run[0].length * unit}v${unit}h${-run[0].length * unit}Z`
        }),
      ),
    )
    .join('')

const wrap = (width: number, height: number, inner: string, label: string): SvgArt => ({
  width,
  height,
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${label}">${inner}</svg>`,
})

const nestedMark = (tone: MarkTone, x: number, y: number, size: number, uid: string) =>
  renderMark({ concept: TERM, variant: 'duo', tone, uid }).replace(
    '<svg ',
    `<svg x="${x}" y="${y}" width="${size}" height="${size}" `,
  )

export const renderLockup = (kind: LockupKind, tone: MarkTone): SvgArt => {
  const fill = TONE_FG[tone]
  const uid = `lockup-${kind}-${tone}`
  if (kind === 'wordmark') {
    const unit = 16
    return wrap(
      WORDMARK_COLS * unit,
      GLYPH_ROWS * unit,
      `<path fill="${fill}" d="${wordmarkPath(unit, 0, 0)}"/>`,
      'netko',
    )
  }
  if (kind === 'horizontal') {
    const unit = 16
    const markX = -24
    const textX = 232 + 48 + markX
    const textY = 142 - (GLYPH_ROWS * unit) / 2
    return wrap(
      textX + WORDMARK_COLS * unit,
      256,
      nestedMark(tone, markX, 0, 256, uid) +
        `<path fill="${fill}" d="${wordmarkPath(unit, textX, textY)}"/>`,
      'netko',
    )
  }
  const unit = 10
  const width = WORDMARK_COLS * unit
  const textY = 256 + 24
  return wrap(
    width,
    textY + GLYPH_ROWS * unit,
    nestedMark(tone, (width - 256) / 2, 0, 256, uid) +
      `<path fill="${fill}" d="${wordmarkPath(unit, 0, textY)}"/>`,
    'netko',
  )
}
