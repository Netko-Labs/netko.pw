import { EXPRESSIONS } from '../term';
import { PALETTE } from '../tokens';
import { mark, pixelMark, sectionHead } from './art';

const PIXEL_GRID = Array.from({ length: 17 }, (_, i) => `<path d="M${i} 0V16M0 ${i}H16"/>`).join('');

export const characterSections = () => `
  <section id="expressions">
    ${sectionHead('character/expressions', 'Expressions', 'The mark is also the mascot. Swapping the face turns it into UI: toasts, empty states, CLI output, error pages. The pink eye always carries the emotion.')}
    <div class="grid cols-5">
      ${EXPRESSIONS.map(
        (e) => `
        <div class="card" style="padding:18px">
          <div class="tile on-paper" style="min-height:0;padding:18px">${mark('ink', 'duo', 120, e)}</div>
          <h3 style="margin:14px 0 2px;font-size:18px">${e.name} <span class="caption">${e.face}</span></h3>
          <p style="font-size:14px">${e.use}</p>
        </div>`,
      ).join('')}
    </div>
    <ul class="rules">
      <li>Only one expression on screen at a time. The cat has one mood.</li>
      <li>Never invent a face outside this set without adding it here first.</li>
      <li>Error always comes with plain text that says what broke and how to fix it.</li>
    </ul>
  </section>

  <section id="pixel">
    ${sectionHead('character/pixel-cut', 'Pixel cut', 'Below 48px, vector curves turn to mush. The pixel cut is the same cat placed by hand on a 16 × 16 grid. Scale it only in whole multiples (16, 32, 64) so every pixel stays crisp.')}
    <div class="grid cols-3" style="align-items:stretch">
      <div class="tile on-kami">
        <svg viewBox="0 0 16 16" width="240" height="240" shape-rendering="crispEdges" role="img" aria-label="Pixel cut on grid">
          ${pixelMark('ink', 16).replace('<svg ', '<svg x="0" y="0" ')}
          <g stroke="${PALETTE.fog}" stroke-opacity=".35" stroke-width=".04">${PIXEL_GRID}</g>
        </svg>
        <span class="label">16 × 16 · zoomed 15×</span>
      </div>
      <div class="tile on-paper"><div style="display:flex;gap:20px;align-items:flex-end">${pixelMark('ink', 16)}${pixelMark('ink', 32)}${pixelMark('ink', 64)}</div><span class="label">1× · 2× · 4×</span></div>
      <div class="tile on-sumi"><div style="display:flex;gap:20px;align-items:flex-end">${pixelMark('paper', 16)}${pixelMark('paper', 32)}${pixelMark('paper', 64)}</div><span class="label">on sumi</span></div>
    </div>
  </section>`;
