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

export interface MarkRequest {
  concept: Concept;
  variant: MarkVariant;
  tone: MarkTone;
  uid: string;
}
