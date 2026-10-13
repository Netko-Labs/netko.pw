import { ear } from './marks';
import { FAVICON_MAP } from './pixel-maps';
import { PALETTE, TONE_FG } from './tokens';
import type { Expression, MarkParts, MarkTone, MarkVariant } from './types';

const TERM_BODY =
  '<rect x="24" y="72" width="208" height="140" rx="14" stroke="none"/>' +
  ear('32 112 L56 24 L116 72', 6) +
  ear('224 112 L200 24 L140 72', 6) +
  '<path d="M56 204 H104 V222 H86 V240 H56Z" stroke="none"/>';

const square = (c: string, points: string, width = 18) =>
  `<polyline points="${points}" fill="none" stroke="${c}" stroke-width="${width}" stroke-linecap="square" stroke-linejoin="miter"/>`;

const cross = (c: string, x: number) =>
  `<path d="M${x} 128 L${x + 30} 158 M${x + 30} 128 L${x} 158" fill="none" stroke="${c}" stroke-width="14" stroke-linecap="square"/>`;

const box = (c: string, x: number, y: number, w: number, h: number) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}" stroke="none"/>`;

const nose = (c: string) => box(c, 122, 156, 12, 12);

const face = (features: MarkParts['features'], accent: MarkParts['accent']): MarkParts => ({
  body: TERM_BODY,
  features,
  accent,
});

export const TERM = {
  name: 'Term',
  parts: face(
    (c) => square(c, '74,124 104,144 74,164') + nose(c),
    (c) => `<rect x="152" y="130" width="30" height="30" fill="none" stroke="${c}" stroke-width="14"/>`,
  ),
};

export const EXPRESSIONS: Expression[] = [
  { ...TERM, key: 'idle', name: 'Idle', face: '>.□', use: 'Default. Logo, avatars, anything not reacting.' },
  {
    key: 'happy',
    name: 'Happy',
    face: '^.^',
    use: 'Success, a merged PR, a new release.',
    parts: face(
      (c) => square(c, '72,154 90,136 108,154') + nose(c),
      (c) => square(c, '148,154 166,136 184,154'),
    ),
  },
  {
    key: 'loading',
    name: 'Loading',
    face: '...',
    use: 'Waiting on a model or a build. The pink token steps through.',
    parts: face(
      (c) => box(c, 70, 136, 18, 18) + box(c, 119, 136, 18, 18),
      (c) => box(c, 168, 136, 18, 18),
    ),
  },
  {
    key: 'error',
    name: 'Error',
    face: 'x.x',
    use: 'Something broke. Always next to text that says what broke and how to fix it.',
    parts: face(
      (c) => cross(c, 74) + nose(c),
      (c) => cross(c, 152),
    ),
  },
  {
    key: 'sleep',
    name: 'Sleep',
    face: '-.-',
    use: 'Empty states, offline, nothing here yet.',
    parts: face(
      (c) => box(c, 70, 140, 36, 14) + nose(c),
      (c) => box(c, 150, 140, 36, 14),
    ),
  },
];


const runs = (row: string, glyph: string) =>
  [...row.matchAll(new RegExp(`${glyph}+`, 'g'))].map((m) => ({ x: m.index, w: m[0].length }));

export const renderPixelMark = (tone: MarkTone, variant: MarkVariant, size = 16) => {
  const cells = (glyph: string, fill: string) =>
    FAVICON_MAP.flatMap((row, y) =>
      runs(row, glyph).map(({ x, w }) => `<rect x="${x}" y="${y}" width="${w}" height="1" fill="${fill}"/>`),
    ).join('');
  const accent = variant === 'duo' ? cells('a', PALETTE.sakura) : '';
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="${size}" height="${size}" shape-rendering="crispEdges" role="img" aria-label="Netko">` +
    `${cells('#', TONE_FG[tone])}${accent}</svg>`
  );
};
