import { useId } from 'react'
import { EXPRESSION_SVG, INK, MARK_UID, PIXEL_MARK_SVG } from '@/generated/brand-art'
import { cn } from '@/lib/utils'
import type { BrandMarkProps, PixelMarkProps } from '@/types'
import { RawMarkup } from './raw-markup'

const themeable = (svg: string) => svg.replaceAll(INK, 'currentColor')

const withSize = (svg: string, width: number, height: number) =>
  svg
    .replace(/ width="[\d.]+" height="[\d.]+"/, '')
    .replace('<svg ', `<svg width="${width}" height="${height}" `)

export function BrandMark({ expression = 'idle', size, isBlinking, className }: BrandMarkProps) {
  const uid = useId().replaceAll(':', '')
  const svg = withSize(EXPRESSION_SVG[expression].replaceAll(MARK_UID, uid), size, size)
  return (
    <RawMarkup
      className={cn('brand-art', isBlinking && 'is-blinking', className)}
      html={themeable(svg)}
    />
  )
}

export function PixelMark({ size, className }: PixelMarkProps) {
  return (
    <RawMarkup
      className={cn('brand-art', className)}
      html={themeable(withSize(PIXEL_MARK_SVG, size, size))}
    />
  )
}
