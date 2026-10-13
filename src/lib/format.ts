const RELATIVE = new Intl.RelativeTimeFormat('en', { numeric: 'auto', style: 'short' })

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 365 * 24 * 3600],
  ['month', 30 * 24 * 3600],
  ['week', 7 * 24 * 3600],
  ['day', 24 * 3600],
  ['hour', 3600],
  ['minute', 60],
]

export function timeAgo(iso: string, now = Date.now()) {
  const seconds = (Date.parse(iso) - now) / 1000
  for (const [unit, size] of UNITS) {
    if (Math.abs(seconds) >= size) return RELATIVE.format(Math.round(seconds / size), unit)
  }
  return 'just now'
}

export function latestPush(isoDates: string[]) {
  return isoDates.reduce((latest, iso) => (iso > latest ? iso : latest), '')
}
