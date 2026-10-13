import { PALETTE } from '../tokens'
import type { SheetFonts } from '../types'

export const renderStyles = (fonts: SheetFonts) => `
@font-face { font-family: 'Departure Mono'; src: url(${fonts.display}) format('woff2'); }
@font-face { font-family: 'M PLUS Rounded 1c'; src: url(${fonts.body}) format('woff2'); font-weight: 400; }
@font-face { font-family: 'M PLUS Rounded 1c'; src: url(${fonts.bodyBold}) format('woff2'); font-weight: 700; }
:root {
  --sumi: ${PALETTE.sumi}; --yoru: ${PALETTE.yoru}; --kami: ${PALETTE.kami};
  --fog: ${PALETTE.fog}; --sakura: ${PALETTE.sakura}; --matcha: ${PALETTE.matcha};
  --mono: 'Departure Mono', ui-monospace, monospace;
  --round: 'M PLUS Rounded 1c', ui-rounded, system-ui, sans-serif;
  --edge: 6px;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { background: var(--kami); color: var(--sumi); font: 17px/1.6 var(--round); }
a { color: inherit; text-underline-offset: 3px; }
a:focus-visible, button:focus-visible { outline: 2px solid var(--sakura); outline-offset: 3px; }
code, .mono { font-family: var(--mono); }
.layout { display: grid; grid-template-columns: 240px minmax(0, 1fr); max-width: 1360px; margin: 0 auto; }
nav { position: sticky; top: 0; align-self: start; height: 100vh; overflow: auto; padding: 40px 28px; font-family: var(--mono); font-size: 14px; }
nav .brand { display: flex; align-items: center; gap: 10px; margin-bottom: 36px; text-decoration: none; font-size: 18px; }
nav h4 { font-weight: 400; color: var(--fog); margin: 22px 0 8px; font-size: 13px; }
nav ul { list-style: none; }
nav li a { display: block; padding: 3px 0; text-decoration: none; }
nav li a:hover { color: var(--sakura); }
main { padding: 40px 56px 120px; min-width: 0; }
.hero { background: var(--sumi); color: var(--kami); border-radius: var(--edge); padding: 56px; display: grid; grid-template-columns: 300px 1fr; gap: 48px; align-items: center; }
.hero .meta { font-family: var(--mono); color: var(--fog); font-size: 14px; }
.hero h1 { margin: 18px 0 20px; }
.hero h1 svg { width: min(100%, 420px); height: auto; display: block; }
.hero p.tagline { font-size: 24px; line-height: 1.4; max-width: 24ch; }
.hero-mark svg { width: 100%; height: auto; display: block; }
.blink .cursor { transform-box: fill-box; transform-origin: center; animation: blink 4.2s steps(1) infinite; }
@keyframes blink { 0%, 92% { transform: none; } 93%, 97% { transform: scaleY(.18); } }
section { padding-top: 88px; }
.path { font-family: var(--mono); font-size: 14px; color: var(--fog); }
.path b { color: var(--sakura); font-weight: 400; }
h2 { font-family: var(--mono); font-weight: 400; font-size: 48px; line-height: 1.05; letter-spacing: -.02em; margin: 10px 0 18px; }
h3 { font-family: var(--mono); font-weight: 400; font-size: 22px; margin: 40px 0 14px; }
.lede { max-width: 64ch; }
.grid { display: grid; gap: 16px; margin-top: 24px; }
.cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
.tile { border-radius: var(--edge); padding: 28px 28px 44px; display: grid; place-items: center; min-height: 220px; position: relative; }
.tile svg { max-width: 100%; height: auto; }
.tile .label, .caption { font-family: var(--mono); font-size: 13px; color: var(--fog); }
.tile .label { position: absolute; left: 14px; bottom: 10px; }
.on-kami { background: #fff; }
.on-paper { background: var(--kami); box-shadow: inset 0 0 0 1px rgb(27 23 36 / .1); }
.on-sumi { background: var(--sumi); color: var(--kami); }
.on-yoru { background: var(--yoru); color: var(--kami); }
.on-sakura { background: var(--sakura); }
.on-sakura .label { color: var(--sumi); }
.card { background: #fff; border-radius: var(--edge); padding: 24px; }
.card p { font-size: 15px; }
.rules { list-style: none; display: grid; gap: 10px; margin-top: 18px; max-width: 70ch; }
.rules li { padding-left: 28px; position: relative; }
.rules li::before { content: '>'; font-family: var(--mono); color: var(--sakura); position: absolute; left: 4px; }
.dont { position: relative; }
.dont::after { content: 'no'; position: absolute; top: 10px; right: 12px; font-family: var(--mono); font-size: 13px; background: var(--sakura); color: var(--sumi); padding: 1px 8px; border-radius: 3px; }
.swatch { border-radius: var(--edge); overflow: hidden; background: #fff; }
.swatch .chip { height: 120px; display: flex; align-items: flex-end; padding: 12px; font-family: var(--mono); font-size: 13px; }
.swatch .info { padding: 14px 16px 18px; font-size: 14px; }
.swatch .info b { font-family: var(--mono); font-weight: 400; font-size: 18px; display: block; }
.ratio-bar { box-shadow: inset 0 0 0 1px rgb(27 23 36 / .12); display: flex; height: 56px; border-radius: var(--edge); overflow: hidden; margin-top: 16px; }
table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 15px; }
th, td { text-align: left; padding: 10px 12px; border-bottom: 1px solid rgb(27 23 36 / .1); }
th { font-family: var(--mono); font-weight: 400; color: var(--fog); font-size: 13px; }
.sample { display: inline-block; padding: 2px 10px; border-radius: 3px; font-family: var(--mono); }
.card .specimen { font-family: var(--mono); font-size: 72px; line-height: 1; letter-spacing: -.02em; }
.card .specimen.round { font-family: var(--round); font-weight: 700; letter-spacing: -.01em; }
.scale { display: grid; gap: 14px; margin-top: 16px; }
.scale div { display: grid; grid-template-columns: 120px 1fr; align-items: baseline; gap: 16px; }
.pair { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 16px; }
.pair .card h4 { font-family: var(--mono); font-weight: 400; font-size: 13px; margin-bottom: 8px; }
.pair .do h4 { color: #3f8f33; }
.pair .dont-say h4 { color: #c7255f; }
pre.term { background: var(--sumi); color: var(--kami); border-radius: var(--edge); padding: 28px 32px; font: 17px/1.35 var(--mono); overflow: auto; }
pre.term .p { color: var(--sakura); }
pre.term .m { color: var(--fog); }
pre.term .ok { color: var(--matcha); }
.ascii-figure { margin-top: 16px; min-width: 0; }
.ascii { --ink: var(--kami); background: var(--sumi); color: var(--ink); border-radius: var(--edge); padding: 28px 32px; font: calc(110px / 7) var(--mono); line-height: 2ch; letter-spacing: 0; overflow-x: auto; }
.ascii .px { display: inline-block; width: 1ch; height: 2ch; vertical-align: top; color: transparent; }
.ascii .px::selection { color: inherit; }
.is-light .ascii { --ink: var(--sumi); background: #fff; box-shadow: inset 0 0 0 1px rgb(27 23 36 / .1); }
.ascii-figure .caption { margin-top: 8px; }
.mock { border-radius: var(--edge); overflow: hidden; background: #fff; }
.kit { list-style: none; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px 32px; margin-top: 16px; font-size: 15px; }
.kit code { font-size: 14px; }
.kit span { color: var(--fog); font-size: 14px; display: block; }
footer { margin-top: 96px; font-family: var(--mono); color: var(--fog); font-size: 14px; }
@media (prefers-reduced-motion: reduce) { .blink .cursor { animation: none; } html { scroll-behavior: auto; } }
@media (max-width: 1080px) {
  .layout { grid-template-columns: 1fr; }
  nav { position: static; height: auto; padding: 24px 20px 0; }
  nav ul, nav h4 { display: none; }
  main { padding: 24px 20px 80px; }
  .hero { grid-template-columns: 1fr; padding: 32px; }
  .cols-3, .cols-5 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 640px) {
  .cols-2, .cols-3, .cols-5, .pair, .kit { grid-template-columns: 1fr; }
  h2 { font-size: 34px; }
  .card .specimen { font-size: 48px; }
}
`
