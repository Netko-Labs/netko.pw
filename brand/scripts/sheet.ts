import { renderMark } from './marks';
import { PALETTE } from './tokens';
import type { Concept, MarkTone, MarkVariant, SheetFonts, SheetSection, SheetSpec } from './types';

const LADDER_SIZES = [64, 32, 16];

const mark = (concept: Concept, variant: MarkVariant, tone: MarkTone, size: number, slot: string) =>
  renderMark({ concept, variant, tone, uid: `${concept.key}-${variant}-${tone}-${slot}` }, size);

const ladder = (concept: Concept, tone: MarkTone) =>
  LADDER_SIZES.map((size) => mark(concept, 'mono', tone, size, `l${size}`)).join('');

const card = (concept: Concept, isRecommended: boolean) => `
  <article class="card${concept.isAccentBlinking ? ' is-blinking' : ''}">
    <header class="card-head">
      <span class="letter">${concept.label}</span>
      <h2>${concept.name}</h2>
      ${isRecommended ? '<span class="pick">my pick</span>' : ''}
    </header>
    <div class="tiles">
      <div class="tile on-kami">${mark(concept, 'duo', 'ink', 208, 'hero')}</div>
      <div class="tile on-sumi">${mark(concept, 'duo', 'paper', 208, 'hero')}</div>
    </div>
    <div class="ladders">
      <div class="ladder on-kami">${ladder(concept, 'ink')}</div>
      <div class="ladder on-sumi">${ladder(concept, 'paper')}</div>
    </div>
    <div class="lockup on-kami">${mark(concept, 'duo', 'ink', 72, 'lock')}<span class="wordmark">netko</span></div>
    <p class="thesis">${concept.thesis}</p>
    <dl class="meta">
      <dt>reads as</dt><dd>${concept.readsAs}</dd>
      <dt>risk</dt><dd>${concept.risk}</dd>
    </dl>
  </article>`;

const chips = Object.entries(PALETTE)
  .map(
    ([name, hex]) =>
      `<li><span class="chip" style="background:${hex}"></span><b>${name}</b><code>${hex}</code></li>`,
  )
  .join('');

const section = ({ heading, concepts }: SheetSection, recommended: string[]) => `
  ${heading ? `<h3 class="section-head">${heading}</h3>` : ''}
  <section class="grid" style="--columns:${concepts.length > 4 ? 3 : 2}">
    ${concepts.map((concept) => card(concept, recommended.includes(concept.key))).join('')}
  </section>`;

export const renderSheet = (spec: SheetSpec, fonts: SheetFonts) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Netko · ${spec.title}</title>
<style>
@font-face { font-family: 'Departure Mono'; src: url(${fonts.display}) format('woff2'); }
@font-face { font-family: 'M PLUS Rounded 1c'; src: url(${fonts.body}) format('woff2'); font-weight: 400; }
@font-face { font-family: 'M PLUS Rounded 1c'; src: url(${fonts.bodyBold}) format('woff2'); font-weight: 700; }
:root {
  --sumi: ${PALETTE.sumi}; --yoru: ${PALETTE.yoru}; --kami: ${PALETTE.kami};
  --fog: ${PALETTE.fog}; --sakura: ${PALETTE.sakura}; --matcha: ${PALETTE.matcha};
  --mono: 'Departure Mono', ui-monospace, monospace;
  --round: 'M PLUS Rounded 1c', ui-rounded, system-ui, sans-serif;
}
* { box-sizing: border-box; margin: 0; }
body { background: var(--kami); color: var(--sumi); font-family: var(--round); line-height: 1.55; }
main { max-width: 1440px; margin: 0 auto; padding: 72px 64px 96px; }
.eyebrow { font-family: var(--mono); color: var(--fog); font-size: 15px; letter-spacing: .04em; }
.eyebrow b { color: var(--sakura); font-weight: 400; }
h1 { font-family: var(--mono); font-weight: 400; font-size: 96px; line-height: 1; letter-spacing: -.02em; margin: 20px 0 24px; }
h1 .caret { display: inline-block; width: .5em; height: .9em; background: var(--sakura); vertical-align: -.08em; margin-left: .08em; }
.lede { max-width: 62ch; font-size: 19px; }
.palette { display: flex; flex-wrap: wrap; gap: 28px; list-style: none; padding: 0; margin: 40px 0 64px; font-size: 13px; }
.palette li { display: grid; grid-template-columns: 28px auto; column-gap: 10px; align-items: center; }
.chip { grid-row: span 2; width: 28px; height: 28px; border-radius: 8px; box-shadow: inset 0 0 0 1px rgb(27 23 36 / .12); }
.palette code { font-family: var(--mono); color: var(--fog); }
.grid { display: grid; grid-template-columns: repeat(var(--columns), minmax(0, 1fr)); gap: 28px; }
.section-head { font-family: var(--mono); font-weight: 400; font-size: 22px; margin: 56px 0 20px; }
.section-head:first-of-type { margin-top: 0; }
.card { background: #fff; border-radius: 28px; padding: 28px; box-shadow: 0 1px 0 rgb(27 23 36 / .06), 0 12px 32px -18px rgb(27 23 36 / .25); }
.card-head { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
.letter { font-family: var(--mono); min-width: 36px; padding: 0 8px; height: 36px; display: grid; place-items: center; border-radius: 10px; background: var(--sumi); color: var(--kami); font-size: 18px; }
.card-head h2 { font-family: var(--mono); font-weight: 400; font-size: 30px; }
.pick { margin-left: auto; font-family: var(--mono); font-size: 13px; color: var(--sumi); background: var(--matcha); padding: 4px 10px; border-radius: 999px; }
.tiles, .ladders { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.tile { aspect-ratio: 1; border-radius: 20px; display: grid; place-items: center; }
.tile svg { width: 76%; height: auto; }
.ladder svg:first-child { flex-shrink: 0; }
.ladders { margin-top: 12px; }
.ladder { min-width: 0; border-radius: 14px; padding: 14px 12px; display: flex; align-items: center; justify-content: space-evenly; gap: 12px; }
.on-kami { background: var(--kami); }
.on-sumi { background: var(--sumi); }
.lockup { margin-top: 12px; border-radius: 14px; padding: 18px 22px; display: flex; align-items: center; gap: 16px; }
.wordmark { font-family: var(--mono); font-size: 64px; line-height: 1; letter-spacing: -.03em; }
.thesis { margin-top: 20px; font-size: 17px; }
.meta { display: grid; grid-template-columns: 80px 1fr; gap: 4px 12px; margin-top: 14px; font-size: 14px; }
.meta dt { font-family: var(--mono); color: var(--fog); }
.next { margin-top: 64px; font-family: var(--mono); font-size: 18px; color: var(--fog); }
.next b { color: var(--sumi); font-weight: 400; }
.is-blinking .cursor, h1 .caret { animation: blink 1.1s steps(1) infinite; }
.still .cursor, .still h1 .caret { animation: none !important; }
@keyframes blink { 50% { opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .cursor, h1 .caret { animation: none; } }
@media (max-width: 1200px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 960px) {
  main { padding: 40px 20px 64px; }
  h1 { font-size: 56px; }
  .grid { grid-template-columns: 1fr; }
}
</style>
</head>
<body>
<script>if (location.search.includes('still')) document.body.classList.add('still');</script>
<main>
  <p class="eyebrow">${spec.eyebrow}</p>
  <h1>${spec.title}<span class="caret"></span></h1>
  <p class="lede">${spec.lede}</p>
  <ul class="palette">${chips}</ul>
  ${spec.sections.map((s) => section(s, spec.recommended ?? [])).join('')}
  <p class="next">${spec.next}</p>
</main>
</body>
</html>`;
