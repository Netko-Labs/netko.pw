import { sectionHead } from './art'

const SCALE = [
  {
    label: 'display · 72',
    style: 'font:72px/1 var(--mono);letter-spacing:-.02em',
    text: 'hack the model',
  },
  {
    label: 'h2 · 48',
    style: 'font:48px/1.05 var(--mono);letter-spacing:-.02em',
    text: 'Desktop apps, in Bun',
  },
  { label: 'h3 · 22', style: 'font:22px var(--mono)', text: 'Install mirin' },
  {
    label: 'body · 17',
    style: 'font:17px/1.6 var(--round)',
    text: 'Mirin is a desktop framework built natively around Bun.',
  },
  {
    label: 'label · 13',
    style: 'font:13px var(--mono);color:var(--fog)',
    text: 'v0.4.2 · MIT · 2 min read',
  },
]

export const typeSection = () => `
  <section id="type">
    ${sectionHead('system/type', 'Type', 'Two faces: a pixel mono that talks like a terminal, and a rounded sans that keeps the long reads friendly. Both are free and open-license (SIL OFL) and ship in the kit.')}
    <div class="grid cols-2">
      <div class="card">
        <p class="caption">display · labels · code</p>
        <p class="specimen" style="margin:14px 0">Departure<br>Mono &gt;_</p>
        <p>Headlines, UI labels, numbers, code, CLI output. Use it sparingly at large sizes, where it gets loud.</p>
      </div>
      <div class="card">
        <p class="caption">body · long reads</p>
        <p class="specimen round" style="margin:14px 0">M PLUS<br>Rounded 1c</p>
        <p>Paragraphs, docs and descriptions. Its soft terminals are the kawaii half of the brand. Regular for body text, Bold for emphasis.</p>
      </div>
    </div>
    <h3>Scale</h3>
    <div class="scale card">
      ${SCALE.map((s) => `<div><span class="caption">${s.label}</span><span style="${s.style}">${s.text}</span></div>`).join('')}
    </div>
    <ul class="rules">
      <li>The wordmark is artwork. Never type “netko” in Departure Mono as a stand-in for it.</li>
      <li>Sentence case everywhere. Lowercase is reserved for the wordmark and for product names in code.</li>
      <li>Never use Departure Mono for paragraphs longer than two lines.</li>
    </ul>
  </section>`

const VOICE_PAIRS = [
  {
    rule: 'Talk like a README, not a press release.',
    good: 'Mirin builds desktop apps with Bun and Chromium.',
    bad: 'Mirin revolutionizes the future of desktop development.',
  },
  {
    rule: 'Say what broke and how to fix it.',
    good: 'Port 5432 is taken. Stop the other Postgres or set DB_PORT.',
    bad: 'Oops! Something went wrong 😿',
  },
  {
    rule: 'One joke per page. The cat is a seasoning.',
    good: 'Shipped one commit at a time, unless the cat hits enter early.',
    bad: 'Purr-fectly paw-some tools for your meow-chine!',
  },
  {
    rule: 'Be honest about LLMs.',
    good: 'Drafts the SQL with an LLM. You review it before anything runs.',
    bad: 'AI-powered magic that just works.',
  },
]

export const voiceSection = () => `
  <section id="voice">
    ${sectionHead('system/voice', 'Voice', 'Curious, playful, precise. We sound like a friend explaining a hack they’re proud of: specific, a little funny, never selling.')}
    ${VOICE_PAIRS.map(
      (p) => `
      <h3>${p.rule}</h3>
      <div class="pair">
        <div class="card do"><h4>say</h4><p>${p.good}</p></div>
        <div class="card dont-say"><h4>don’t say</h4><p>${p.bad}</p></div>
      </div>`,
    ).join('')}
  </section>`
