import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { Resvg } from '@resvg/resvg-js'
import { renderMark } from './marks'
import { BRAND_DIR, loadFonts, screenshot } from './render'
import { renderSheet } from './sheet'
import { SHEETS } from './sheets'
import type { MarkTone, MarkVariant } from './types'

const OUT_DIR = join(BRAND_DIR, '01-logo')
const PNG_SIZE = 1024
const VARIANTS: MarkVariant[] = ['mono', 'duo']
const TONES: MarkTone[] = ['ink', 'paper']

const exportMarks = async () => {
  const concepts = SHEETS.flatMap((sheet) => sheet.sections.flatMap((s) => s.concepts))
  const jobs = concepts.flatMap((concept) =>
    VARIANTS.flatMap((variant) =>
      TONES.map((tone) => ({ concept, variant, tone, name: `${concept.key}-${variant}-${tone}` })),
    ),
  )
  await Promise.all(
    jobs.map(async ({ name, ...request }) => {
      const svg = renderMark({ ...request, uid: name })
      const png = new Resvg(svg, { fitTo: { mode: 'width', value: PNG_SIZE } }).render().asPng()
      await Bun.write(join(OUT_DIR, 'marks', `${name}.svg`), svg)
      await Bun.write(join(OUT_DIR, 'png', `${name}.png`), png)
    }),
  )
  return jobs.length
}

const main = async () => {
  await Promise.all(['marks', 'png'].map((dir) => mkdir(join(OUT_DIR, dir), { recursive: true })))
  const markCount = await exportMarks()

  const fonts = await loadFonts()
  for (const sheet of SHEETS) {
    const sheetPath = join(OUT_DIR, `${sheet.slug}.html`)
    await Bun.write(sheetPath, renderSheet(sheet, fonts))
    await screenshot(`file://${sheetPath}?still`, join(OUT_DIR, `${sheet.slug}.png`), '1440,900')
  }
  console.log(`✓ ${markCount} marks, ${SHEETS.length} sheets → ${OUT_DIR}`)
}

await main()
