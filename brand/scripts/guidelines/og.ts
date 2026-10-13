import { BRAND, PALETTE } from '../tokens';
import type { SheetFonts } from '../types';
import { lockup, mark } from './art';
import { TAGLINE } from './sections-identity';

export const OG_SIZE = { width: 1200, height: 630 };

export const renderOgCard = (fonts: SheetFonts) => `<!doctype html>
<html><head><meta charset="utf-8"><style>
@font-face { font-family: 'Departure Mono'; src: url(${fonts.display}) format('woff2'); }
@font-face { font-family: 'M PLUS Rounded 1c'; src: url(${fonts.body}) format('woff2'); }
* { margin: 0; box-sizing: border-box; }
body { width: ${OG_SIZE.width}px; height: ${OG_SIZE.height}px; background: ${PALETTE.sumi}; color: ${PALETTE.kami};
  display: grid; grid-template-columns: 360px 1fr; align-items: center; gap: 56px; padding: 0 88px; overflow: hidden; }
.mark svg { display: block; }
p { font: 40px/1.3 'M PLUS Rounded 1c', sans-serif; margin-top: 36px; max-width: 18ch; }
small { position: absolute; left: 88px; bottom: 44px; font: 22px 'Departure Mono', monospace; color: ${PALETTE.fog}; }
small b { color: ${PALETTE.sakura}; font-weight: 400; }
</style></head>
<body>
  <div class="mark">${mark('paper', 'duo', 360)}</div>
  <div>${lockup('wordmark', 'paper', 480)}<p>${TAGLINE}</p></div>
  <small><b>$</b> open ${BRAND.url}</small>
</body></html>`;
