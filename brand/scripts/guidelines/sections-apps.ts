import { BRAND, PALETTE } from '../tokens';
import { lockup, mark, pixelMark, sectionHead } from './art';
import { TAGLINE } from './sections-identity';
import { BANNER, toHtml } from '../ascii';

const asciiBlock = (html: string, label: string, isLight = false) => `
  <figure class="ascii-figure${isLight ? ' is-light' : ''}">
    <pre class="ascii" aria-label="${label}">${html}</pre>
    <figcaption class="caption">${label}</figcaption>
  </figure>`;

const KIT = [
  { path: 'kit/logo/netko-mark-*.svg|png', note: 'mark · duo/mono × ink/paper' },
  { path: 'kit/logo/netko-lockup-*.svg|png', note: 'horizontal, stacked, wordmark' },
  { path: 'kit/expressions/netko-*.svg|png', note: 'idle, happy, loading, error, sleep' },
  { path: 'kit/favicon/favicon.svg', note: 'pixel cut, adapts to light/dark tabs' },
  { path: 'kit/favicon/favicon-{16,32,48}.png · .ico', note: 'pixel cut on a sumi tile' },
  { path: 'kit/favicon/apple-touch-icon.png · icon-512.png', note: 'vector mark on sumi' },
  { path: 'kit/social/og-card.png', note: '1200 × 630 link preview' },
  { path: 'kit/cli/banner.{ansi,txt}', note: 'truecolor ANSI + plain text banner' },
  { path: 'kit/social/github-avatar.png', note: '500 × 500 org avatar' },
  { path: 'fonts/*.woff2', note: 'Departure Mono, M PLUS Rounded 1c (OFL)' },
  { path: 'scripts/build-guidelines.ts', note: 'regenerates all of the above' },
];

const browserTab = (dark: boolean) => `
  <div style="background:${dark ? PALETTE.sumi : '#DCD8E6'};padding:10px 10px 0;border-radius:6px 6px 0 0">
    <div style="display:inline-flex;align-items:center;gap:8px;background:${dark ? PALETTE.yoru : '#fff'};color:${dark ? PALETTE.kami : PALETTE.sumi};padding:8px 14px;border-radius:6px 6px 0 0;font-size:13px">
      ${pixelMark(dark ? 'paper' : 'ink', 16)}<span>netko · open-source tools</span>
    </div>
  </div>`;

export const appsSection = (ogCardDataUri: string) => `
  <section id="applications">
    ${sectionHead('in-the-wild/applications', 'Applications', 'Where the cat actually shows up. These mockups are the reference. Exported files live in the kit.')}

    <h3>GitHub org</h3>
    <div class="mock card" style="display:flex;gap:24px;align-items:center">
      <div style="background:${PALETTE.sumi};border-radius:6px;padding:14px;flex-shrink:0">${mark('paper', 'duo', 96)}</div>
      <div><p style="font-size:26px;font-weight:700">Netko Labs</p><p>${TAGLINE}</p><p class="caption">${BRAND.url.replace('https://', '')} · open source on GitHub</p></div>
    </div>

    <h3>Browser tab</h3>
    <div class="grid cols-2">${browserTab(false)}${browserTab(true)}</div>

    <h3>CLI banner</h3>
    <p class="lede">Half-block text art (<code>▀ ▄ █</code>) generated from the same pixel grids as the favicon and wordmark, so the cat in the terminal is the cat in the logo. Each character cell holds two square pixels. The body uses the terminal’s own foreground color, so it works on light and dark themes. Only the eye is truecolor sakura.</p>
    <div class="grid cols-2">
      ${asciiBlock(toHtml(BANNER.build('color')), `banner · ${BANNER.use}`)}
      ${asciiBlock(toHtml(BANNER.build('color')), 'banner · light terminal theme', true)}
    </div>
    ${asciiBlock(toHtml(BANNER.build('plain')), 'banner · plain, no color support: the eye becomes a cut-out, like the mono mark')}
    <pre class="term" style="margin-top:16px"><span class="p">$</span> cat brand/kit/cli/banner.ansi</pre>

    <h3>Link preview</h3>
    <img src="${ogCardDataUri}" alt="Netko link preview card" style="width:100%;border-radius:6px;display:block">

    <h3>Product endorsement</h3>
    <p class="lede">Products keep their own names and mascots (Mirin has Kome). Netko signs underneath, small and in the pixel cut.</p>
    <div class="grid cols-2">
      <div class="tile on-paper" style="min-height:180px;place-items:start;align-content:center;gap:10px">
        <span style="font:44px/1 var(--mono);letter-spacing:-.02em">mirin</span>
        <span style="display:flex;align-items:center;gap:8px;font:13px var(--mono);color:var(--fog)">${pixelMark('ink', 16)} a netko tool</span>
      </div>
      <div class="tile on-sumi" style="min-height:180px;place-items:start;align-content:center;gap:10px">
        <span style="font:44px/1 var(--mono);letter-spacing:-.02em">anko</span>
        <span style="display:flex;align-items:center;gap:8px;font:13px var(--mono);color:var(--fog)">${pixelMark('paper', 16)} a netko tool</span>
      </div>
    </div>

    <h3>README header</h3>
    <div class="tile on-paper" style="min-height:200px">${lockup('horizontal', 'ink', 360)}</div>
  </section>

  <section id="kit">
    ${sectionHead('kit', 'Kit', 'Everything is generated from code in <code>brand/scripts</code>. Edit the source, rerun the build, and every file updates together. Don’t hand-edit the exports.')}
    <ul class="kit">${KIT.map((k) => `<li><code>brand/${k.path}</code><span>${k.note}</span></li>`).join('')}</ul>
    <pre class="term" style="margin-top:24px"><span class="p">$</span> bun brand/scripts/build-guidelines.ts
<span class="ok">✓</span> <span class="m">kit + guidelines regenerated</span></pre>
  </section>`;
