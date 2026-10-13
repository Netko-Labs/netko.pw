import { PALETTE } from './tokens';
import type { ContrastPair } from './types';

const channel = (value: number) => {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

const luminance = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => channel(Number.parseInt(hex.slice(i, i + 2), 16)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export const contrastRatio = ({ fg, bg }: ContrastPair) => {
  const [hi, lo] = [luminance(PALETTE[fg]), luminance(PALETTE[bg])].sort((a, b) => b - a);
  return (hi + 0.05) / (lo + 0.05);
};

export const wcagGrade = (ratio: number) => {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3) return 'AA large';
  return 'graphics only';
};
