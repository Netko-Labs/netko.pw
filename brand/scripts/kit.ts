import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { Resvg } from '@resvg/resvg-js'
import { BANNER, toAnsi, toPlain } from './ascii'
import { renderMark } from './marks'
import { EXPRESSIONS, renderPixelMark, TERM } from './term'
import { PALETTE } from './tokens'
import type { LockupKind, MarkSource, MarkTone, MarkVariant } from './types'
import { renderLockup } from './wordmark'

const TONES: MarkTone[] = ['ink', 'paper']
const VARIANTS: MarkVariant[] = ['duo', 'mono']
const LOCKUPS: LockupKind[] = ['horizontal', 'stacked', 'wordmark']
const FAVICON_SIZES = [16, 32, 48]

const toPng = (svg: string, width: number) =>
  new Resvg(svg, { fitTo: { mode: 'width', value: width } }).render().asPng()

const writePair = async (dir: string, name: string, svg: string, pngWidth: number) => {
  await Bun.write(join(dir, `${name}.svg`), svg)
  await Bun.write(join(dir, `${name}.png`), toPng(svg, pngWidth))
}

const markSvg = (source: MarkSource, variant: MarkVariant, tone: MarkTone, uid: string) =>
  renderMark({ concept: source, variant, tone, uid })

const adaptiveFavicon = () =>
  renderPixelMark('ink', 'duo')
    .replace(/ width="16" height="16"/, '')
    .replace(
      '>',
      `><style>.b{fill:${PALETTE.sumi}}@media (prefers-color-scheme:dark){.b{fill:${PALETTE.kami}}}</style>`,
    )
    .replaceAll(`fill="${PALETTE.sumi}"`, 'class="b"')

const pixelTile = () =>
  renderPixelMark('paper', 'duo').replace(
    /(<svg[^>]*>)/,
    `$1<rect width="16" height="16" rx="3" fill="${PALETTE.sumi}"/>`,
  )

const iconTile = (size: number, padding: number) => {
  const inner = size - padding * 2
  const nested = markSvg(TERM, 'duo', 'paper', `icon-${size}`).replace(
    '<svg ',
    `<svg x="${padding}" y="${padding}" width="${inner}" height="${inner}" `,
  )
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}"><rect width="${size}" height="${size}" fill="${PALETTE.sumi}"/>${nested}</svg>`
}

const writeIco = async (dir: string) => {
  const sources = FAVICON_SIZES.map((size) => join(dir, `favicon-${size}.png`))
  const proc = Bun.spawn(['magick', ...sources, join(dir, 'favicon.ico')], { stderr: 'ignore' })
  return (await proc.exited) === 0
}

export const buildKit = async (kitDir: string) => {
  const dirs = ['logo', 'expressions', 'favicon', 'social', 'cli'].map((d) => join(kitDir, d))
  await Promise.all(dirs.map((d) => mkdir(d, { recursive: true })))
  const [logoDir, expressionDir, faviconDir, socialDir, cliDir] = dirs

  await Bun.write(join(cliDir, 'banner.ansi'), `${toAnsi(BANNER.build('color'))}\n`)
  await Bun.write(join(cliDir, 'banner.txt'), `${toPlain(BANNER.build('plain'))}\n`)

  for (const variant of VARIANTS) {
    for (const tone of TONES) {
      await writePair(
        logoDir,
        `netko-mark-${variant}-${tone}`,
        markSvg(TERM, variant, tone, `${variant}-${tone}`),
        1024,
      )
    }
  }
  for (const kind of LOCKUPS) {
    for (const tone of TONES) {
      const { svg, width } = renderLockup(kind, tone)
      await writePair(logoDir, `netko-lockup-${kind}-${tone}`, svg, width * 2)
    }
  }
  for (const expression of EXPRESSIONS) {
    for (const tone of TONES) {
      await writePair(
        expressionDir,
        `netko-${expression.key}-${tone}`,
        markSvg(expression, 'duo', tone, expression.key),
        512,
      )
    }
  }

  await Bun.write(join(faviconDir, 'favicon.svg'), adaptiveFavicon())
  for (const size of FAVICON_SIZES) {
    await Bun.write(join(faviconDir, `favicon-${size}.png`), toPng(pixelTile(), size))
  }
  const hasIco = await writeIco(faviconDir)
  await Bun.write(join(faviconDir, 'apple-touch-icon.png'), toPng(iconTile(180, 22), 180))
  await Bun.write(join(faviconDir, 'icon-512.png'), toPng(iconTile(512, 64), 512))
  await Bun.write(join(socialDir, 'github-avatar.png'), toPng(iconTile(500, 70), 500))
  return { hasIco, socialDir }
}
