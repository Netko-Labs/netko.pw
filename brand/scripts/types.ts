import type { PALETTE } from './tokens';

export type MarkVariant = 'mono' | 'duo';

export type MarkTone = 'ink' | 'paper';

export interface MarkParts {
  body: string;
  features: (color: string) => string;
  accent: (color: string) => string;
  isFeatureFilled?: boolean;
}

export interface Concept {
  key: string;
  label: string;
  name: string;
  thesis: string;
  readsAs: string;
  risk: string;
  parts: MarkParts;
  isAccentBlinking?: boolean;
}

export interface SheetSection {
  heading?: string;
  concepts: Concept[];
}

export interface SheetSpec {
  slug: string;
  eyebrow: string;
  title: string;
  lede: string;
  sections: SheetSection[];
  recommended?: string[];
  next: string;
}

export type SheetFonts = Record<'display' | 'body' | 'bodyBold', string>;

export type MarkSource = Pick<Concept, 'name' | 'parts'>;

export interface MarkRequest {
  concept: MarkSource;
  variant: MarkVariant;
  tone: MarkTone;
  uid: string;
}

export interface Expression extends MarkSource {
  key: string;
  face: string;
  use: string;
}

export type LockupKind = 'horizontal' | 'stacked' | 'wordmark';

export interface SvgArt {
  svg: string;
  width: number;
  height: number;
}

export type PaletteKey = keyof typeof PALETTE;

export interface ContrastPair {
  fg: PaletteKey;
  bg: PaletteKey;
}
