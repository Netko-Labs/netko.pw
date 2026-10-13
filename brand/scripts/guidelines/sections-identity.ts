import { lockup, mark, sectionHead } from './art';

export const TAGLINE = 'Open-source tools, hacked together with LLMs.';

export const heroSection = () => `
  <header class="hero">
    <div class="hero-mark blink">${mark('paper', 'duo', 300)}</div>
    <div>
      <p class="meta">brand guidelines · v0.1 · october 2026</p>
      <h1 aria-label="netko">${lockup('wordmark', 'paper', 420)}</h1>
      <p class="tagline">${TAGLINE}</p>
    </div>
  </header>`;

const TRAITS = [
  {
    name: 'Curious',
    line: 'We poke at models to see what they really do, then build the tool we wished existed.',
  },
  {
    name: 'Playful',
    line: 'Our cat walks across the keyboard sometimes. We call those features. Fun is the reason we start.',
  },
  {
    name: 'Precise',
    line: 'Fun is no excuse for flaky. Typed end to end, documented, and shipped one commit at a time.',
  },
];

export const essenceSection = () => `
  <section id="essence">
    ${sectionHead(
      'essence',
      'A cat with a terminal',
      'Netko is an open-source lab. We hack on LLMs for fun and ship the cool tools that come out of it, including desktop frameworks, SQL clients, self-hosting platforms and chat playgrounds. The brand should feel like the place those experiments happen: a terminal at 2am with a cat on the desk.',
    )}
    <div class="grid cols-3">
      ${TRAITS.map((t) => `<div class="card"><h3 style="margin-top:0">${t.name}</h3><p>${t.line}</p></div>`).join('')}
    </div>
    <h3>The mark, in one breath</h3>
    <p class="lede">The cat is the conversation: a chat bubble with ears, drawn the way a terminal would draw it. Square corners, a tail that steps down in pixels, a <code>&gt;</code> for the eye that’s typing and a pink square for the eye that’s watching.</p>
  </section>`;
