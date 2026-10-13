import { contrastRatio, wcagGrade } from '../contrast';
import { PALETTE } from '../tokens';
import type { ContrastPair, PaletteKey } from '../types';
import { sectionHead } from './art';

const SWATCHES: { key: PaletteKey; role: string; text: string }[] = [
  { key: 'sumi', role: 'Ink. Primary text, dark surfaces, the cat’s body.', text: PALETTE.kami },
  { key: 'kami', role: 'Paper. Light surfaces. A cool lilac white, never cream.', text: PALETTE.sumi },
  { key: 'sakura', role: 'The eye. One pink thing per view, nothing more.', text: PALETTE.sumi },
  { key: 'yoru', role: 'Night. Raised surfaces on dark: panels, code blocks.', text: PALETTE.kami },
  { key: 'fog', role: 'Muted labels, rules, metadata. Not for body text.', text: PALETTE.sumi },
  { key: 'matcha', role: 'exit 0. Success states only.', text: PALETTE.sumi },
];

const RATIO = [
  { key: 'sumi', share: 50 },
  { key: 'kami', share: 32 },
  { key: 'yoru', share: 10 },
  { key: 'fog', share: 4 },
  { key: 'sakura', share: 3 },
  { key: 'matcha', share: 1 },
] as const;

const PAIRS: ContrastPair[] = [
  { fg: 'kami', bg: 'sumi' },
  { fg: 'sakura', bg: 'sumi' },
  { fg: 'matcha', bg: 'sumi' },
  { fg: 'fog', bg: 'sumi' },
  { fg: 'kami', bg: 'yoru' },
  { fg: 'sakura', bg: 'yoru' },
  { fg: 'sumi', bg: 'kami' },
  { fg: 'sumi', bg: 'sakura' },
  { fg: 'fog', bg: 'kami' },
  { fg: 'sakura', bg: 'kami' },
];

const contrastRow = (pair: ContrastPair) => {
  const ratio = contrastRatio(pair);
  return `<tr>
    <td><span class="sample" style="color:${PALETTE[pair.fg]};background:${PALETTE[pair.bg]}">${pair.fg} on ${pair.bg}</span></td>
    <td class="mono">${ratio.toFixed(2)} : 1</td>
    <td>${wcagGrade(ratio)}</td>
  </tr>`;
};

export const colorSection = () => `
  <section id="color">
    ${sectionHead('system/color', 'Color', 'Six colors, and most of the time only three are on screen: sumi, kami and one sakura eye. Contrast ratios below are calculated from the hex values, not eyeballed.')}
    <div class="grid cols-3">
      ${SWATCHES.map(
        (s) => `
        <div class="swatch">
          <div class="chip" style="background:${PALETTE[s.key]};color:${s.text};${s.key === 'kami' ? 'box-shadow:inset 0 0 0 1px rgb(27 23 36 / .1)' : ''}">${PALETTE[s.key]}</div>
          <div class="info"><b>${s.key}</b>${s.role}</div>
        </div>`,
      ).join('')}
    </div>
    <h3>Proportion</h3>
    <div class="ratio-bar">${RATIO.map((r) => `<div style="flex:${r.share};background:${PALETTE[r.key]}" title="${r.key} ${r.share}%"></div>`).join('')}</div>
    <p class="caption" style="margin-top:8px">${RATIO.map((r) => `${r.key} ${r.share}%`).join(' · ')}</p>
    <h3>Contrast</h3>
    <table>
      <thead><tr><th>pair</th><th>ratio</th><th>use for</th></tr></thead>
      <tbody>${PAIRS.map(contrastRow).join('')}</tbody>
    </table>
  </section>`;
