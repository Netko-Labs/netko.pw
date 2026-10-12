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
  letter: string;
  name: string;
  thesis: string;
  readsAs: string;
  risk: string;
  parts: MarkParts;
}

export interface MarkRequest {
  concept: Concept;
  variant: MarkVariant;
  tone: MarkTone;
  uid: string;
}
