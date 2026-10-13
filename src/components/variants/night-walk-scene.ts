import { PALETTE } from '@/generated/brand-art'
import type { PixelGrid, SceneFrame, SceneShop, ToolStatus } from '@/types'

export const VIEW_HEIGHT = 200
export const GROUND_Y = 168
export const SHOP_GAP = 150
export const FIRST_SHOP_X = 220
export const CAT_SCREEN_RATIO = 0.32
const CAT_PIXEL = 2
// The bubble body on the 16px grid; backing it keeps the face cut-outs reading as ink, not windows.
const CAT_FACE_BACKING = { x: 1, y: 4, width: 14, height: 8 }

const NEON: Record<ToolStatus, string> = {
  'open-source': PALETTE.matcha,
  live: PALETTE.sakura,
  building: '#6FE7FF',
}

const FACADES = ['#2A2438', '#241E36', '#30283F', '#221B33', '#2E2440', '#272036']

const seeded = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

export const worldWidth = (shopCount: number) => FIRST_SHOP_X + shopCount * SHOP_GAP + 260

export const shopCenter = (index: number) => FIRST_SHOP_X + index * SHOP_GAP + 50

function drawSky(ctx: CanvasRenderingContext2D, width: number, time: number) {
  const sky = ctx.createLinearGradient(0, 0, 0, GROUND_Y)
  sky.addColorStop(0, '#0B0916')
  sky.addColorStop(1, '#1B1530')
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, width, VIEW_HEIGHT)
  for (let i = 0; i < 70; i++) {
    const twinkle = 0.4 + 0.6 * Math.abs(Math.sin(time / 900 + i))
    ctx.fillStyle = `rgba(241, 238, 248, ${twinkle * seeded(i + 3)})`
    ctx.fillRect(Math.floor(seeded(i) * width), Math.floor(seeded(i + 100) * 90), 1, 1)
  }
  ctx.fillStyle = PALETTE.kami
  ctx.fillRect(width - 60, 22, 10, 10)
  ctx.fillRect(width - 61, 24, 12, 6)
}

function drawSkyline(ctx: CanvasRenderingContext2D, camX: number) {
  const offset = camX * 0.25
  for (let i = 0; i < 60; i++) {
    const x = i * 34 - (offset % 34) - 34
    const index = i + Math.floor(offset / 34)
    const height = 40 + Math.floor(seeded(index) * 50)
    ctx.fillStyle = '#17122A'
    ctx.fillRect(Math.floor(x), GROUND_Y - height, 30, height)
    ctx.fillStyle = 'rgba(255, 214, 107, 0.35)'
    for (let w = 0; w < 4; w++) {
      if (seeded(index * 7 + w) > 0.55)
        ctx.fillRect(Math.floor(x) + 5 + w * 6, GROUND_Y - height + 8, 2, 2)
    }
  }
}

function drawShop(
  ctx: CanvasRenderingContext2D,
  shop: SceneShop,
  index: number,
  x: number,
  isActive: boolean,
) {
  const height = 70 + Math.floor(seeded(index + 40) * 25)
  const top = GROUND_Y - height
  ctx.fillStyle = FACADES[index % FACADES.length]
  ctx.fillRect(x, top, 100, height)
  ctx.fillStyle = 'rgba(255, 214, 107, 0.85)'
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 4; col++) {
      if (seeded(index * 13 + row * 4 + col) > 0.35)
        ctx.fillRect(x + 10 + col * 22, top + 12 + row * 16, 10, 8)
    }
  }
  ctx.fillStyle = '#120E1F'
  ctx.fillRect(x + 40, GROUND_Y - 26, 20, 26)
  ctx.fillStyle = isActive ? 'rgba(255, 214, 107, 0.9)' : 'rgba(255, 214, 107, 0.25)'
  ctx.fillRect(x + 42, GROUND_Y - 24, 16, 24)

  const neon = NEON[shop.status]
  ctx.font = '10px "Departure Mono", monospace'
  ctx.textAlign = 'center'
  ctx.shadowColor = neon
  ctx.shadowBlur = isActive ? 12 : 3
  ctx.fillStyle = isActive ? neon : `${neon}99`
  ctx.fillText(shop.name, x + 50, top - 8)
  ctx.shadowBlur = 0
}

function drawStreet(ctx: CanvasRenderingContext2D, width: number, camX: number) {
  ctx.fillStyle = '#100C1C'
  ctx.fillRect(0, GROUND_Y, width, VIEW_HEIGHT - GROUND_Y)
  ctx.fillStyle = '#2A2438'
  ctx.fillRect(0, GROUND_Y, width, 2)
  ctx.fillStyle = 'rgba(138, 132, 160, 0.4)'
  for (let x = -(camX % 24); x < width; x += 24) ctx.fillRect(Math.floor(x), GROUND_Y + 16, 12, 1)
}

function drawCat(ctx: CanvasRenderingContext2D, cat: PixelGrid, x: number, bob: number) {
  const top = GROUND_Y - cat.size * CAT_PIXEL + 6 - bob
  ctx.fillStyle = PALETTE.sumi
  ctx.fillRect(
    Math.floor(x + CAT_FACE_BACKING.x * CAT_PIXEL),
    Math.floor(top + CAT_FACE_BACKING.y * CAT_PIXEL),
    CAT_FACE_BACKING.width * CAT_PIXEL,
    CAT_FACE_BACKING.height * CAT_PIXEL,
  )
  for (const cell of cat.cells) {
    ctx.fillStyle = cell.isAccent ? PALETTE.sakura : PALETTE.kami
    ctx.fillRect(
      Math.floor(x + cell.x * CAT_PIXEL),
      Math.floor(top + cell.y * CAT_PIXEL),
      CAT_PIXEL,
      CAT_PIXEL,
    )
  }
}

export function drawScene(ctx: CanvasRenderingContext2D, frame: SceneFrame) {
  const { width, progress, time, isMoving, activeIndex, shops, cat } = frame
  const camX = progress * (worldWidth(shops.length) - width)
  drawSky(ctx, width, time)
  drawSkyline(ctx, camX)
  shops.forEach((shop, index) => {
    const x = Math.floor(FIRST_SHOP_X + index * SHOP_GAP - camX)
    if (x > -120 && x < width + 20) drawShop(ctx, shop, index, x, index === activeIndex)
  })
  drawStreet(ctx, width, camX)
  const bob = isMoving && Math.floor(time / 140) % 2 === 0 ? 1 : 0
  drawCat(ctx, cat, Math.floor(width * CAT_SCREEN_RATIO), bob)
}

export function activeShop(progress: number, width: number, shopCount: number) {
  const catWorldX = progress * (worldWidth(shopCount) - width) + width * CAT_SCREEN_RATIO + 16
  let best = -1
  let bestDistance = 60
  for (let index = 0; index < shopCount; index++) {
    const distance = Math.abs(shopCenter(index) - catWorldX)
    if (distance < bestDistance) {
      best = index
      bestDistance = distance
    }
  }
  return best
}
