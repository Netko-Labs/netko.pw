# Netko identity v2

Direction: evolve the cat · terminal-kawaii · code-only SVG ($0) · wordmark "netko".
Regenerate: `bun brand/scripts/build-logo.ts`

- [x] Step 1 — logo concepts (A Prompt · B Chat · C Ear-n · D Tokens) → `brand/01-logo/`
- [x] Step 1b — five variations each of A and B → `brand/01-logo/variations.html`
- [x] Winner: B5 Term — pixel wordmark, pixel-cut favicon, expressions → `brand/kit/`
- [ ] Step 2 — mascot: full character beyond face expressions (poses, illustration)
- [ ] Revamp netko.dev with the Term brand (this repo)
- [x] Step 3 — guidelines → `brand/guidelines/index.html` (`bun brand/scripts/build-guidelines.ts`)

Acceptance: every asset is pure-path SVG + PNG export, reproducible from `brand/scripts`.

## netko.dev revamp (branch site/term-revamp, stacked on #4)

- [x] Brand modules consumed via `@brand/*` (no copies)
- [x] Header · hero transcript (cat reflects GitHub fetch state) · status strip
- [x] Featured tools (mirin, CodeWhiskers, Anko, Washi, mizu, nukk) + live repo list
- [x] Principles · footer with CLI banner
- [x] System theme + toggle, no flash
- [x] `bun run brand` syncs favicons, OG card, /brand guidelines into public/
- [x] Build passes; screenshots light/dark, desktop/mobile
