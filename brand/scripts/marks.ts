import { PALETTE, TONE_FG } from './tokens'
import type { MarkRequest } from './types'

const VIEWBOX = 256

export const ear = (points: string, strokeWidth = 20) =>
  `<path d="M${points}Z" stroke-width="${strokeWidth}" stroke-linejoin="round"/>`

export const CAT_EARS = ear('40 116 L60 28 L120 84') + ear('216 116 L196 28 L136 84')

export const chevron = (c: string, points: string, width = 18) =>
  `<polyline points="${points}" fill="none" stroke="${c}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`

export const dot = (c: string, cx: number, cy: number, r = 7) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c}" stroke="none"/>`

export const block = (c: string, x: number, y: number, w: number, h: number, rx = 5) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${c}" stroke="none"/>`

export const ring = (c: string, cx: number, cy: number, r = 18, width = 16) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${c}" stroke-width="${width}"/>`

export const outline = (d: string, width = 16) =>
  `<path d="${d}" fill="none" stroke-width="${width}" stroke-linejoin="round" stroke-linecap="round"/>`

export const renderMark = ({ concept, variant, tone, uid }: MarkRequest, size?: number) => {
  const fg = TONE_FG[tone]
  const { body, features, accent, isFeatureFilled } = concept.parts
  const maskId = `m-${uid}`
  const featureColor = isFeatureFilled ? '#fff' : '#000'
  const cutouts = features(featureColor) + (variant === 'mono' ? accent(featureColor) : '')
  const overlay = variant === 'duo' ? accent(PALETTE.sakura) : ''
  const dims = size ? ` width="${size}" height="${size}"` : ''
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEWBOX} ${VIEWBOX}"${dims} role="img" aria-label="Netko ${concept.name} mark">` +
    `<defs><mask id="${maskId}" maskUnits="userSpaceOnUse" x="0" y="0" width="${VIEWBOX}" height="${VIEWBOX}">` +
    `<g fill="#fff" stroke="#fff">${body}</g>${cutouts}</mask></defs>` +
    `<rect width="${VIEWBOX}" height="${VIEWBOX}" fill="${fg}" mask="url(#${maskId})"/>` +
    `<g class="cursor">${overlay}</g></svg>`
  )
}
