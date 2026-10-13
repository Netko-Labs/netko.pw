import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { OG_SIZE, renderOgCard } from './guidelines/og'
import { renderGuidelines } from './guidelines/page'
import { buildKit } from './kit'
import { BRAND_DIR, loadFonts, screenshot } from './render'

const GUIDE_DIR = join(BRAND_DIR, 'guidelines')
const KIT_DIR = join(BRAND_DIR, 'kit')

const main = async () => {
  await mkdir(GUIDE_DIR, { recursive: true })
  const { hasIco, socialDir } = await buildKit(KIT_DIR)
  const fonts = await loadFonts()

  const ogHtml = join(GUIDE_DIR, 'og-card.html')
  const ogPng = join(socialDir, 'og-card.png')
  await Bun.write(ogHtml, renderOgCard(fonts))
  await screenshot(`file://${ogHtml}`, ogPng, `${OG_SIZE.width},${OG_SIZE.height}`, false)
  const ogDataUri = `data:image/png;base64,${Buffer.from(await Bun.file(ogPng).arrayBuffer()).toString('base64')}`

  const pagePath = join(GUIDE_DIR, 'index.html')
  await Bun.write(pagePath, renderGuidelines(fonts, ogDataUri))
  await screenshot(`file://${pagePath}`, join(GUIDE_DIR, 'preview.png'), '1440,900')
  console.log(`✓ kit → ${KIT_DIR}${hasIco ? '' : ' (no favicon.ico: magick missing)'}`)
  console.log(`✓ guidelines → ${pagePath}`)
}

await main()
