import { PALETTE } from '../tokens'
import { lockup, mark, pixelMark, sectionHead } from './art'

const GRID_LINES = Array.from({ length: 17 }, (_, i) => i * 16)
  .map((p) => `<path d="M${p} 0V256M0 ${p}H256"/>`)
  .join('')

const construction = () => `
  <svg viewBox="-8 -8 272 272" width="420" height="420" role="img" aria-label="Construction grid">
    <g stroke="${PALETTE.fog}" stroke-opacity=".22" stroke-width=".75">${GRID_LINES}</g>
    <g opacity=".9">${mark('ink', 'duo', 256).replace('<svg ', '<svg x="0" y="0" ')}</g>
    <g fill="none" stroke="${PALETTE.sakura}" stroke-width="1.5" stroke-dasharray="4 3">
      <rect x="24" y="72" width="208" height="140"/>
      <rect x="145" y="123" width="44" height="44"/>
      <path d="M56 24V72M200 24V72M56 204V240M104 204V222"/>
    </g>
  </svg>`

const CONSTRUCTION_NOTES = [
  'Body: 208 × 140 on a 256 grid, corner radius 14. Corners stay nearly square, never pill-shaped.',
  'Ears: apex 48 units above the body, with only 6 units of rounding. Sharp enough to read at 16px.',
  'Eye: a 30-unit square ring with a 14-unit stroke. That stroke is the brand’s “pixel”.',
  'Tail: two 18-unit steps, left-aligned at x = 56. It steps, it never curves.',
  'Face: 18-unit strokes with square caps and miter joins. No rounded ends anywhere in the mark.',
]

const clearSpace = () => `
  <svg viewBox="-48 -48 352 352" width="300" height="300" role="img" aria-label="Clear space">
    <rect x="-6" y="-9" width="268" height="279" fill="none" stroke="${PALETTE.sakura}" stroke-dasharray="5 4" stroke-width="1.5"/>
    <rect x="24" y="21" width="208" height="219" fill="none" stroke="${PALETTE.fog}" stroke-opacity=".5" stroke-width="1"/>
    ${mark('ink', 'duo', 256).replace('<svg ', '<svg x="0" y="0" ')}
    <rect x="-6" y="-9" width="30" height="30" fill="${PALETTE.sakura}" fill-opacity=".25"/>
  </svg>`

const VERSIONS = [
  { cls: 'on-paper', svg: () => mark('ink', 'duo'), label: 'primary · duo ink on kami' },
  { cls: 'on-sumi', svg: () => mark('paper', 'duo'), label: 'primary · duo kami on sumi' },
  { cls: 'on-yoru', svg: () => mark('paper', 'duo'), label: 'duo kami on yoru' },
  { cls: 'on-paper', svg: () => mark('ink', 'mono'), label: 'mono sumi · one-color print' },
  { cls: 'on-sumi', svg: () => mark('paper', 'mono'), label: 'mono kami · dark one-color' },
  { cls: 'on-sakura', svg: () => mark('ink', 'mono'), label: 'mono sumi on sakura · stickers' },
]

const MISUSE = [
  { style: 'transform:rotate(-14deg)', svg: () => mark('ink'), label: 'don’t rotate or tilt' },
  { style: 'transform:scaleX(1.45)', svg: () => mark('ink'), label: 'don’t stretch' },
  {
    style: '',
    svg: () => mark('ink').replaceAll(PALETTE.sakura, PALETTE.matcha),
    label: 'don’t recolor the eye',
  },
  {
    style: 'filter:drop-shadow(10px 12px 4px rgb(27 23 36 / .45))',
    svg: () => mark('ink'),
    label: 'no shadows, glows or bevels',
  },
  { style: '', svg: () => mark('paper'), label: 'don’t drop contrast' },
  {
    style: '',
    svg: () => mark('ink'),
    label: 'don’t place it on busy patterns',
    bg: `background:repeating-linear-gradient(45deg, ${PALETTE.sakura} 0 14px, ${PALETTE.matcha} 14px 28px)`,
  },
]

export const logoSections = () => `
  <section id="mark">
    ${sectionHead('logo/mark', 'The mark', 'One mark, two colors. Sumi or kami for the body, sakura for the eye. The pink eye is the only part that ever changes: it blinks, it reacts, and it stays pink.')}
    <div class="grid cols-2">
      <div class="tile on-paper" style="min-height:360px">${mark('ink', 'duo', 260)}<span class="label">term · duo · ink</span></div>
      <div class="tile on-sumi blink" style="min-height:360px">${mark('paper', 'duo', 260)}<span class="label">term · duo · paper · blinking</span></div>
    </div>
  </section>

  <section id="lockups">
    ${sectionHead('logo/lockups', 'Lockups', 'The wordmark is drawn on a 5 × 7 pixel grid, not typed. Its stroke matches the face strokes, so mark and word read as one object. Always write it lowercase: <code>netko</code>.')}
    <div class="grid">
      <div class="tile on-paper" style="min-height:260px">${lockup('horizontal', 'ink', 560)}<span class="label">horizontal · default</span></div>
    </div>
    <div class="grid cols-2">
      <div class="tile on-sumi" style="min-height:320px">${lockup('stacked', 'paper', 220)}<span class="label">stacked · square spaces</span></div>
      <div class="tile on-paper" style="min-height:320px">${lockup('wordmark', 'ink', 300)}<span class="label">wordmark · when the cat is already on screen</span></div>
    </div>
  </section>

  <section id="construction">
    ${sectionHead('logo/construction', 'Construction', 'Everything sits on a 256-unit grid in 16-unit steps. When the mark needs adjusting, adjust it here first. Never redraw it by eye.')}
    <div class="grid cols-2" style="align-items:center">
      <div class="tile on-kami">${construction()}</div>
      <ul class="rules">${CONSTRUCTION_NOTES.map((n) => `<li>${n}</li>`).join('')}</ul>
    </div>
  </section>

  <section id="space">
    ${sectionHead('logo/space-and-size', 'Clear space & minimum size', 'Clear space equals one eye (30 units, about ⅛ of the mark) on every side. Nothing else enters that box, not even other logos.')}
    <div class="grid cols-2" style="align-items:center">
      <div class="tile on-kami">${clearSpace()}<span class="label">pink square = one eye = clear space</span></div>
      <div class="card">
        <h3 style="margin-top:0">Minimum sizes</h3>
        <div style="display:flex;align-items:flex-end;gap:28px;margin:16px 0 20px">
          <div>${pixelMark('ink', 16)}<p class="caption">16px</p></div>
          <div>${pixelMark('ink', 32)}<p class="caption">32px</p></div>
          <div>${mark('ink', 'duo', 48)}<p class="caption">48px</p></div>
          <div>${lockup('horizontal', 'ink', 120)}<p class="caption">lockup 120px</p></div>
        </div>
        <ul class="rules">
          <li>At 32px and below, use the pixel cut (see <a href="#pixel">pixel cut</a>). It’s hand-placed on a 16 × 16 grid.</li>
          <li>From 48px up, use the vector mark.</li>
          <li>The horizontal lockup never goes narrower than 120px. Below that, use the mark on its own.</li>
        </ul>
      </div>
    </div>
  </section>

  <section id="versions">
    ${sectionHead('logo/versions', 'Color versions', 'Duo is the default. Mono exists for one-color print, embroidery, and places where pink isn’t possible.')}
    <div class="grid cols-3">
      ${VERSIONS.map((v) => `<div class="tile ${v.cls}">${v.svg()}<span class="label">${v.label}</span></div>`).join('')}
    </div>
  </section>

  <section id="misuse">
    ${sectionHead('logo/misuse', 'Don’ts', 'The cat is scrappy, but the mark isn’t. Six ways to break it:')}
    <div class="grid cols-3">
      ${MISUSE.map((m) => `<div class="tile on-paper dont" style="${m.bg ?? ''}"><div style="${m.style}">${m.svg()}</div><span class="label" style="${m.bg ? `background:${PALETTE.kami};padding:0 6px` : ''}">${m.label}</span></div>`).join('')}
    </div>
  </section>`
