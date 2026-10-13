import { CAT_EARS, chevron, dot, ear, outline, ring } from './marks'
import type { Concept } from './types'

const BUBBLE = '<rect x="24" y="72" width="208" height="140" rx="44" stroke="none"/>'
const BUBBLE_OUTLINE =
  'M24 116 L60 28 L118 72 H138 L196 28 L232 116 V168 Q232 212 188 212 H112 L48 242 L66 212 Q24 212 24 168 Z'

const chatFace = (c: string, width = 18) =>
  chevron(c, '74,124 104,144 74,164', width) + dot(c, 128, 162)
const ringEye = (c: string) => ring(c, 166, 144)

export const CHAT_VARIATIONS: Concept[] = [
  {
    key: 'b1-tail',
    label: 'B1',
    name: 'Tail',
    thesis: 'The bubble’s pointer becomes a curled cat tail: chat and cat in one stroke.',
    readsAs: 'chat · cat · playful',
    risk: 'The tail curl turns to mush below 32px.',
    parts: {
      body:
        BUBBLE +
        CAT_EARS +
        '<path d="M84 204 C80 244 30 250 24 226" fill="none" stroke-width="18" stroke-linecap="round"/>',
      features: chatFace,
      accent: ringEye,
    },
  },
  {
    key: 'b2-orb',
    label: 'B2',
    name: 'Orb',
    thesis: 'Round bubble: compact and sticker-shaped, and it drops perfectly into avatar circles.',
    readsAs: 'compact · avatar-friendly',
    risk: 'Of the five, this is the closest to a generic chat-app icon.',
    parts: {
      body:
        '<circle cx="128" cy="142" r="92" stroke="none"/>' +
        ear('44 118 L62 34 L112 64') +
        ear('212 118 L194 34 L144 64') +
        ear('70 210 L42 244 L108 224', 16),
      features: (c) => chevron(c, '76,124 106,144 76,164') + dot(c, 130, 162),
      accent: (c) => ring(c, 168, 144),
    },
  },
  {
    key: 'b3-heritage',
    label: 'B3',
    name: 'Heritage',
    thesis:
      'Rebuilds the old kaomoji in full, >.o over > w <, whiskers and w mouth included. Maximum continuity with today’s logo.',
    readsAs: 'the old logo, grown up',
    risk: 'Busy: five face parts compete for space at small sizes.',
    parts: {
      body:
        '<rect x="24" y="64" width="208" height="152" rx="44" stroke="none"/>' +
        ear('40 108 L60 22 L120 76') +
        ear('216 108 L196 22 L136 76') +
        ear('66 200 L46 244 L114 208', 16),
      features: (c) =>
        chevron(c, '78,110 104,127 78,144', 15) +
        dot(c, 126, 140, 6) +
        chevron(c, '108,166 118,178 128,168 138,178 148,166', 10) +
        chevron(c, '50,160 70,172 50,184', 10) +
        chevron(c, '206,160 186,172 206,184', 10),
      accent: (c) => ring(c, 164, 128, 15, 13),
    },
  },
  {
    key: 'b4-line',
    label: 'B4',
    name: 'Line',
    thesis: 'Monoline bubble. Reads as UI, pairs cleanly with type, and works as an inline glyph.',
    readsAs: 'interface · precise',
    risk: 'Strokes thin out at 16px, so favicons need a filled fallback.',
    parts: {
      body: outline(BUBBLE_OUTLINE),
      features: (c) => chatFace(c, 16),
      accent: ringEye,
      isFeatureFilled: true,
    },
  },
  {
    key: 'b5-term',
    label: 'B5',
    name: 'Term',
    thesis:
      'Square corners, a stepped pixel tail and a square o. A chat bubble as a terminal would render it.',
    readsAs: 'terminal · crisp · retro',
    risk: 'Hard edges feel colder and less kawaii.',
    parts: {
      body:
        '<rect x="24" y="72" width="208" height="140" rx="14" stroke="none"/>' +
        ear('32 112 L56 24 L116 72', 6) +
        ear('224 112 L200 24 L140 72', 6) +
        '<path d="M56 204 H104 V222 H86 V240 H56Z" stroke="none"/>',
      features: (c) =>
        `<polyline points="74,124 104,144 74,164" fill="none" stroke="${c}" stroke-width="18" stroke-linecap="square" stroke-linejoin="miter"/>` +
        `<rect x="122" y="156" width="12" height="12" fill="${c}" stroke="none"/>`,
      accent: (c) =>
        `<rect x="152" y="130" width="30" height="30" fill="none" stroke="${c}" stroke-width="14"/>`,
    },
  },
]
