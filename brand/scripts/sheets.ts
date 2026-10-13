import { CONCEPTS } from './concepts';
import type { SheetSpec } from './types';
import { CHAT_VARIATIONS } from './variations-chat';
import { PROMPT_VARIATIONS } from './variations-prompt';

const EYEBROW = (detail: string) =>
  `netko/brand · <b>step 1 of 3</b> · logo → mascot → identity · ${detail}`;

export const SHEETS: SheetSpec[] = [
  {
    slug: 'concepts',
    eyebrow: EYEBROW('concepts'),
    title: 'Four ways to wink',
    lede: 'Every concept here comes from today’s <code>&gt;.o</code> kaomoji. The thread running through all four is the pink block: a cursor that doubles as the cat’s open eye. Each card shows the mark on paper and on ink, a size check down to 16px, and a lockup with the wordmark.',
    sections: [{ concepts: CONCEPTS }],
    recommended: ['prompt'],
    next: '<b>Your move:</b> pick a letter or remix two (e.g. “A’s face in B’s bubble”). Step 2 builds the mascot from the winner.',
  },
  {
    slug: 'variations',
    eyebrow: EYEBROW('variations'),
    title: 'A vs B, five takes each',
    lede: 'Each variation pushes one axis: softness, silhouette, face, line weight, or character. Everything else stays fixed, so the differences you notice come from that one change. The A series keeps the blinking cursor eye. The B series keeps the bubble and the ring eye.',
    sections: [
      { heading: 'A · Prompt — the wink is a shell prompt', concepts: PROMPT_VARIATIONS },
      { heading: 'B · Chat — the cat is the conversation', concepts: CHAT_VARIATIONS },
    ],
    recommended: ['a2-whiskers', 'b3-heritage'],
    next: '<b>Your move:</b> lock one, or mix traits (e.g. “A2 whiskers on A1’s head”). Then I refine the winner: optical fixes, favicon cut, outlined wordmark.',
  },
];
