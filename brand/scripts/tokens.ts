export const PALETTE = {
  sumi: '#1B1724',
  yoru: '#2A2438',
  kami: '#F1EEF8',
  fog: '#8A84A0',
  sakura: '#FF4F8B',
  matcha: '#7FCB6F',
} as const;

export const BRAND = {
  tagline: 'Open-source tools, hacked together with LLMs.',
  version: 'v0.1',
  url: 'https://netko.pw',
} as const;

export const TONE_FG = {
  ink: PALETTE.sumi,
  paper: PALETTE.kami,
} as const;

export const FONT_FILES = {
  display: 'DepartureMono-Regular.woff2',
  body: 'MPlusRounded1c-400.woff2',
  bodyBold: 'MPlusRounded1c-700.woff2',
} as const;
