import { CAT_EARS } from './marks'
import type { Concept, MarkParts } from './types'

const promptParts: MarkParts = {
  body: `<rect x="28" y="76" width="200" height="152" rx="48" stroke="none"/>${CAT_EARS}`,
  features: (c) =>
    `<polyline points="80,128 110,148 80,168" fill="none" stroke="${c}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<circle cx="128" cy="170" r="7" fill="${c}" stroke="none"/>`,
  accent: (c) => `<rect x="146" y="124" width="32" height="48" rx="5" fill="${c}" stroke="none"/>`,
}

const chatParts: MarkParts = {
  body:
    `<rect x="24" y="72" width="208" height="140" rx="44" stroke="none"/>${CAT_EARS}` +
    `<path d="M66 196 L46 240 L114 204Z" stroke-width="16" stroke-linejoin="round"/>`,
  features: (c) =>
    `<polyline points="74,124 104,144 74,164" fill="none" stroke="${c}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<circle cx="128" cy="162" r="7" fill="${c}" stroke="none"/>`,
  accent: (c) => `<circle cx="166" cy="144" r="18" fill="none" stroke="${c}" stroke-width="16"/>`,
}

const earNParts: MarkParts = {
  body:
    `<path d="M76 220 V140 A52 52 0 0 1 180 140 V220" fill="none" stroke-width="44" stroke-linecap="round"/>` +
    `<path d="M64 128 L72 52 L112 86Z" stroke-width="14" stroke-linejoin="round"/>` +
    `<path d="M192 128 L184 52 L144 86Z" stroke-width="14" stroke-linejoin="round"/>`,
  features: (c) =>
    `<polyline points="106,150 120,160 106,170" fill="none" stroke="${c}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>`,
  accent: (c) => `<rect x="136" y="146" width="14" height="28" rx="3" fill="${c}" stroke="none"/>`,
  isFeatureFilled: true,
}

const TOKEN_MAP = [
  '#.........#',
  '##.......##',
  '###.....###',
  '###########',
  '##.#####*##',
  '###.####*##',
  '##.##.##*##',
  '###########',
  '###########',
  '.#########.',
]

const TOKEN_SIZE = 20
const TOKEN_PITCH = 22
const TOKEN_ORIGIN = { x: 8, y: 19 }

const tokenCells = (glyph: string, fill: string) =>
  TOKEN_MAP.flatMap((row, y) =>
    [...row].map((cell, x) =>
      cell === glyph
        ? `<rect x="${TOKEN_ORIGIN.x + x * TOKEN_PITCH}" y="${TOKEN_ORIGIN.y + y * TOKEN_PITCH}" width="${TOKEN_SIZE}" height="${TOKEN_SIZE}" rx="5" fill="${fill}" stroke="none"/>`
        : '',
    ),
  ).join('')

const tokenParts: MarkParts = {
  body: tokenCells('#', '#fff') + tokenCells('*', '#fff'),
  features: () => '',
  accent: (c) => tokenCells('*', c),
}

export const CONCEPTS: Concept[] = [
  {
    key: 'prompt',
    isAccentBlinking: true,
    label: 'A',
    name: 'Prompt',
    thesis:
      'The wink is a shell prompt. The closed eye is ">", where you type. The open eye is a block cursor waiting for input.',
    readsAs: 'cat · terminal · ready for you',
    risk: 'Without the accent color the cursor reads as just an eye. That’s fine, but the joke gets quieter.',
    parts: promptParts,
  },
  {
    key: 'chat',
    label: 'B',
    name: 'Chat',
    thesis:
      'Today’s >.o face moved into a chat bubble with ears. Every Netko tool is a conversation with a model.',
    readsAs: 'cat · LLM chat · continuity with the old logo',
    risk: 'AI branding is already full of chat bubbles. The ears have to do all the differentiating.',
    parts: chatParts,
  },
  {
    key: 'ear-n',
    isAccentBlinking: true,
    label: 'C',
    name: 'Ear-n',
    thesis:
      'A lowercase n with ears and a face hiding in its counter. Built wordmark-first, so it can grow into a full type system.',
    readsAs: 'letter n · sitting cat · type-led',
    risk: 'Below 32px the face disappears and it reads as an n with horns.',
    parts: earNParts,
  },
  {
    key: 'tokens',
    isAccentBlinking: true,
    label: 'D',
    name: 'Tokens',
    thesis:
      'The cat assembled from tokens on a grid: what a model actually sees. Pixel-native, and a cousin to nukk.',
    readsAs: 'cat · tokens · pixel craft',
    risk: 'Pixel grids read as retro game before they read as LLM.',
    parts: tokenParts,
  },
]
