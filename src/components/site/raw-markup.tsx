import type { RawMarkupProps } from '@/types'

export function RawMarkup({ html, className, as: Tag = 'span' }: RawMarkupProps) {
  return (
    <Tag
      aria-hidden
      className={className}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: markup comes from brand/scripts at build time, never from user input
      // biome-ignore lint/style/useNamingConvention: React's required key
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
