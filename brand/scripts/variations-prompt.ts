import { block, CAT_EARS, chevron, dot, ear, outline } from './marks';
import type { Concept } from './types';

const HEAD = '<rect x="28" y="76" width="200" height="152" rx="48" stroke="none"/>';
const HEAD_OUTLINE =
  'M36 122 L58 30 L116 80 H140 L198 30 L220 122 V184 Q220 228 176 228 H80 Q36 228 36 184 Z';

const promptFace = (c: string) => chevron(c, '80,128 110,148 80,168') + dot(c, 128, 170);
const cursorEye = (c: string) => block(c, 146, 124, 32, 48);

export const PROMPT_VARIATIONS: Concept[] = [
  {
    key: 'a1-mochi',
    label: 'A1',
    name: 'Mochi',
    thesis: 'Rounder head, curved ears. Same joke, more plush. This is the one that leans hardest into kawaii.',
    readsAs: 'soft · sticker · friendly',
    risk: 'Softness costs some terminal edge. At 16px it’s a blob with ears.',
    isAccentBlinking: true,
    parts: {
      body:
        '<ellipse cx="128" cy="152" rx="102" ry="80" stroke="none"/>' +
        '<path d="M38 136 C34 84 44 46 60 30 C82 40 104 58 120 80Z" stroke-width="16" stroke-linejoin="round"/>' +
        '<path d="M218 136 C222 84 212 46 196 30 C174 40 152 58 136 80Z" stroke-width="16" stroke-linejoin="round"/>',
      features: (c) => chevron(c, '80,134 110,154 80,174') + dot(c, 128, 176),
      accent: (c) => block(c, 146, 130, 32, 48, 8),
    },
  },
  {
    key: 'a2-whiskers',
    label: 'A2',
    name: 'Whiskers',
    thesis:
      'Whiskers break the silhouette, so it can’t be mistaken for a generic squircle app icon. Reads as =>.▮= in ASCII.',
    readsAs: 'unmistakably cat · ASCII-native',
    risk: 'At favicon size the whiskers are 1px hairs. Needs a simplified cut for small sizes.',
    isAccentBlinking: true,
    parts: {
      body:
        HEAD +
        CAT_EARS +
        '<path d="M10 150 L44 158 M12 182 L44 172 M246 150 L212 158 M244 182 L212 172" fill="none" stroke-width="12" stroke-linecap="round"/>',
      features: promptFace,
      accent: cursorEye,
    },
  },
  {
    key: 'a3-underscore',
    label: 'A3',
    name: 'Underscore',
    thesis:
      'The face is literally the terminal icon >_ : closed eye, underscore eye. A cat mid-blink, mid-command.',
    readsAs: 'terminal first · instantly familiar',
    risk: 'Loses the open eye, so it reads sleepier and less “ready”. >_ is also a shared icon.',
    isAccentBlinking: true,
    parts: {
      body: HEAD + CAT_EARS,
      features: (c) => chevron(c, '74,124 108,146 74,168'),
      accent: (c) => block(c, 138, 158, 44, 14, 4),
    },
  },
  {
    key: 'a4-line',
    label: 'A4',
    name: 'Line',
    thesis:
      'Monoline outline. Draws like a glyph, so it can sit inline with code, in ASCII banners and on dark terminals.',
    readsAs: 'precise · technical · icon-set ready',
    risk: 'Strokes thin out at 16px, so favicons need a filled fallback.',
    isAccentBlinking: true,
    parts: {
      body: outline(HEAD_OUTLINE),
      features: (c) => chevron(c, '80,128 110,148 80,168', 16) + dot(c, 128, 170),
      accent: cursorEye,
      isFeatureFilled: true,
    },
  },
  {
    key: 'a5-fold',
    label: 'A5',
    name: 'Fold',
    thesis:
      'One ear folded: a scruffy, specific cat instead of a generic one. The mascot gets a trait built in.',
    readsAs: 'character · street cat · memorable',
    risk: 'The asymmetry fights grids and avatar crops, and at a glance it can read as damaged.',
    isAccentBlinking: true,
    parts: {
      body: HEAD + ear('40 116 L60 28 L120 84') + ear('136 84 L176 42 L224 60 L216 116'),
      features: promptFace,
      accent: cursorEye,
    },
  },
];
