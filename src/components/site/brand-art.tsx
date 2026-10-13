import { renderMark } from '@brand/marks'
import { EXPRESSIONS, renderPixelMark } from '@brand/term'
import { TONE_FG } from '@brand/tokens'
import { renderLockup } from '@brand/wordmark'
import { useId } from 'react'
import { cn } from '@/lib/utils'
import type { BrandMarkProps, PixelMarkProps, WordmarkProps } from '@/types'
import { RawMarkup } from './raw-markup'

const [IDLE] = EXPRESSIONS
const EXPRESSION_BY_KEY = new Map(EXPRESSIONS.map((expression) => [expression.key, expression]))

const themeable = (svg: string) => svg.replaceAll(TONE_FG.ink, 'currentColor')

const WORDMARK = renderLockup('wordmark', 'ink')

export function BrandMark({ expression = 'idle', size, isBlinking, className }: BrandMarkProps) {
  const uid = useId().replaceAll(':', '')
  const concept = EXPRESSION_BY_KEY.get(expression) ?? IDLE
  const svg = renderMark({ concept, variant: 'duo', tone: 'ink', uid }, size)
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
      html={themeable(renderPixelMark('ink', 'duo', size))}
    />
  )
}

export function Wordmark({ width, className }: WordmarkProps) {
  const height = Math.round((WORDMARK.height * width) / WORDMARK.width)
  const svg = WORDMARK.svg.replace(
    `width="${WORDMARK.width}" height="${WORDMARK.height}"`,
    `width="${width}" height="${height}"`,
  )
  return <RawMarkup className={cn('brand-art', className)} html={themeable(svg)} />
}
