import { rm } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { FONT_FILES } from './tokens'
import type { SheetFonts } from './types'

export const BRAND_DIR = resolve(import.meta.dir, '..')

const fontDataUri = async (file: string) => {
  const bytes = await Bun.file(join(BRAND_DIR, 'fonts', file)).arrayBuffer()
  return `data:font/woff2;base64,${Buffer.from(bytes).toString('base64')}`
}

export const loadFonts = async (): Promise<SheetFonts> => ({
  display: await fontDataUri(FONT_FILES.display),
  body: await fontDataUri(FONT_FILES.body),
  bodyBold: await fontDataUri(FONT_FILES.bodyBold),
})

export const screenshot = async (
  url: string,
  pngPath: string,
  viewport: string,
  isFullPage = true,
) => {
  await rm(pngPath, { force: true })
  const flags = isFullPage ? ['--full-page'] : []
  const proc = Bun.spawn(
    ['bunx', 'playwright', 'screenshot', ...flags, `--viewport-size=${viewport}`, url, pngPath],
    { stdout: 'ignore', stderr: 'pipe' },
  )
  await proc.exited
  if (!(await Bun.file(pngPath).exists())) {
    throw new Error(`Screenshot failed for ${url}: ${await new Response(proc.stderr).text()}`)
  }
}
