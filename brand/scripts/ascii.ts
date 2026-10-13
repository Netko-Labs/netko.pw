import { FAVICON_MAP, SPLASH_MAP } from './pixel-maps';
import { BRAND, PALETTE } from './tokens';
import type { AsciiBanner, AsciiCell, AsciiMode, AsciiText } from './types';
import { wordmarkGrid } from './wordmark';

const META = `${BRAND.version} · ${BRAND.url}`;
const ESC = '\x1b[';

const blank = (width: number, height: number) =>
  Array.from({ length: height }, () => Array<string>(width).fill('.'));

const stamp = (canvas: string[][], grid: string[], x: number, y: number) => {
  grid.forEach((row, r) => {
    [...row].forEach((pixel, c) => {
      if (pixel === '#' || pixel === 'a') canvas[y + r][x + c] = pixel;
    });
  });
};

// Body pixels take the terminal's default foreground so the cat works on light and dark themes.
// Mixed body/accent cells keep body in the glyph and paint the accent as background.
const cellFor = (top: string, bottom: string, mode: AsciiMode): AsciiCell => {
  const t = mode === 'plain' && top === 'a' ? '.' : top;
  const b = mode === 'plain' && bottom === 'a' ? '.' : bottom;
  const accent = PALETTE.sakura;
  if (t === '.' && b === '.') return { char: ' ' };
  if (t === b) return { char: '█', fg: t === 'a' ? accent : undefined };
  if (b === '.') return { char: '▀', fg: t === 'a' ? accent : undefined };
  if (t === '.') return { char: '▄', fg: b === 'a' ? accent : undefined };
  return t === '#' ? { char: '▀', bg: accent } : { char: '▄', bg: accent };
};

const toCells = (canvas: string[][], mode: AsciiMode) =>
  Array.from({ length: Math.ceil(canvas.length / 2) }, (_, row) =>
    canvas[row * 2].map((top, x) => cellFor(top, canvas[row * 2 + 1]?.[x] ?? '.', mode)),
  );

const writeText = (lines: AsciiCell[][], col: number, { row, text, color }: AsciiText) => {
  const line = lines[row];
  while (line.length < col) line.push({ char: ' ' });
  line.splice(col, text.length, ...[...text].map((char) => ({ char, fg: color })));
};

const compose = (cat: string[], gap: number, wordmarkY: number, texts: AsciiText[], mode: AsciiMode) => {
  const wordmark = wordmarkGrid();
  const wordmarkX = cat[0].length + gap;
  const canvas = blank(wordmarkX + wordmark[0].length, cat.length);
  stamp(canvas, cat, 0, 0);
  stamp(canvas, wordmark, wordmarkX, wordmarkY);
  const lines = toCells(canvas, mode);
  for (const text of texts) writeText(lines, wordmarkX, text);
  return lines;
};

export const BANNERS: AsciiBanner[] = [
  {
    key: 'banner',
    name: 'Banner',
    use: 'Printed when a CLI starts. 7 lines, fits 80 columns.',
    build: (mode) =>
      compose(
        FAVICON_MAP.slice(0, 14),
        3,
        2,
        [
          { row: 5, text: BRAND.tagline },
          { row: 6, text: META, color: PALETTE.fog },
        ],
        mode,
      ),
  },
  {
    key: 'splash',
    name: 'Splash',
    use: 'First run, --version, and READMEs. 14 lines, built from the 32px pixel cut.',
    build: (mode) =>
      compose(
        SPLASH_MAP,
        4,
        8,
        [
          { row: 9, text: 'Open-source tools,' },
          { row: 10, text: 'hacked together with LLMs.' },
          { row: 12, text: META, color: PALETTE.fog },
        ],
        mode,
      ),
  },
];

const rgb = (hex: string) => [1, 3, 5].map((i) => Number.parseInt(hex.slice(i, i + 2), 16)).join(';');

export const toAnsi = (lines: AsciiCell[][]) =>
  lines
    .map((line) => {
      let out = '';
      let state = '';
      for (const { char, fg, bg } of line) {
        const next = `${fg ? `${ESC}38;2;${rgb(fg)}m` : ''}${bg ? `${ESC}48;2;${rgb(bg)}m` : ''}`;
        if (next !== state) out += `${ESC}0m${next}`;
        state = next;
        out += char;
      }
      return `${out}${ESC}0m`.replace(/ +(\x1b\[0m)$/, '$1');
    })
    .join('\n');

export const toPlain = (lines: AsciiCell[][]) =>
  lines.map((line) => line.map((cell) => cell.char).join('').trimEnd()).join('\n');

const escapeHtml = (text: string) =>
  text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

const HALVES: Record<string, [boolean, boolean]> = { '█': [true, true], '▀': [true, false], '▄': [false, true] };

const pixelCell = ({ char, fg, bg }: AsciiCell) => {
  const [top, bottom] = HALVES[char];
  const ink = fg ?? 'var(--ink)';
  const fill = bg ?? 'transparent';
  return `<span class="px" style="background:linear-gradient(${top ? ink : fill} 50%, ${bottom ? ink : fill} 50%)">${char}</span>`;
};

// Block cells render as exact 1ch × 2ch boxes so the preview tiles like a terminal grid, whatever the font.
export const toHtml = (lines: AsciiCell[][]) =>
  lines
    .map((line) =>
      line
        .map((cell) => {
          if (cell.char in HALVES) return pixelCell(cell);
          return cell.fg ? `<span style="color:${cell.fg}">${escapeHtml(cell.char)}</span>` : escapeHtml(cell.char);
        })
        .join('')
        .trimEnd(),
    )
    .join('\n');
