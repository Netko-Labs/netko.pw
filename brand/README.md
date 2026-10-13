# brand

Netko's identity: the **Term** mark, pixel wordmark, expressions, palette, type and voice. Every file under `kit/`, `guidelines/` and `01-logo/` is generated. Edit `scripts/`, rerun, and commit the outputs.

```bash
bun run brand          # kit + guidelines (~6s)
bun run brand:explore  # logo exploration sheets: concepts → variations
```

Open `guidelines/index.html` for the rules. It's the reference for anything that ships with the brand.

## Where to change things

| Change | Edit |
|---|---|
| Colors | `scripts/tokens.ts` → `PALETTE` |
| Tagline, version, URL | `scripts/tokens.ts` → `BRAND` |
| Mark geometry, expressions | `scripts/term.ts` |
| Favicon / banner pixels | `scripts/pixel-maps.ts` |
| Wordmark glyphs | `scripts/wordmark.ts` → `GLYPHS` (5 × 7 grid) |
| CLI banner layout | `scripts/ascii.ts` → `BANNER` |
| Kit files and sizes | `scripts/kit.ts` |
| Guidelines copy and sections | `scripts/guidelines/sections-*.ts` |
| Link preview card | `scripts/guidelines/og.ts` |

## Layout

| Path | What |
|---|---|
| `kit/logo` | mark (duo/mono × ink/paper) and lockups (horizontal, stacked, wordmark), SVG + PNG |
| `kit/expressions` | idle, happy, loading, error, sleep |
| `kit/favicon` | adaptive `favicon.svg`, 16/32/48 PNG + `.ico`, apple-touch, 512 |
| `kit/social` | `og-card.png` (1200 × 630), `github-avatar.png` |
| `kit/cli` | `banner.ansi` (truecolor) and `banner.txt` (plain) |
| `guidelines/` | single-file brand guidelines + full-page preview |
| `01-logo/` | exploration history: four concepts, then ten variations of A and B |
| `fonts/` | Departure Mono, M PLUS Rounded 1c (SIL OFL), with their licenses |

## Requirements

- Bun, plus the repo's `@resvg/resvg-js` devDependency, which renders every SVG → PNG.
- Playwright's Chromium for the HTML screenshots (OG card, previews): `bunx playwright install chromium`.
- ImageMagick (`magick`) for `favicon.ico`. It's optional; the build skips the `.ico` without it.
