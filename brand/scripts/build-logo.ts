import { mkdir, rm } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import { renderMark } from './marks';
import { renderSheet } from './sheet';
import { SHEETS } from './sheets';
import { FONT_FILES } from './tokens';
import type { MarkTone, MarkVariant, SheetFonts } from './types';

const BRAND_DIR = resolve(import.meta.dir, '..');
const OUT_DIR = join(BRAND_DIR, '01-logo');
const PNG_SIZE = 1024;
const VARIANTS: MarkVariant[] = ['mono', 'duo'];
const TONES: MarkTone[] = ['ink', 'paper'];

const fontDataUri = async (file: string) => {
  const bytes = await Bun.file(join(BRAND_DIR, 'fonts', file)).arrayBuffer();
  return `data:font/woff2;base64,${Buffer.from(bytes).toString('base64')}`;
};

const screenshotSheet = async (sheetPath: string, pngPath: string) => {
  await rm(pngPath, { force: true });
  const proc = Bun.spawn(
    [
      'bunx',
      'playwright',
      'screenshot',
      '--full-page',
      '--viewport-size=1440,900',
      `file://${sheetPath}?still`,
      pngPath,
    ],
    { stdout: 'ignore', stderr: 'pipe' },
  );
  await proc.exited;
  if (!(await Bun.file(pngPath).exists())) {
    throw new Error(`Sheet screenshot failed: ${await new Response(proc.stderr).text()}`);
  }
};

const exportMarks = async () => {
  const concepts = SHEETS.flatMap((sheet) => sheet.sections.flatMap((s) => s.concepts));
  const jobs = concepts.flatMap((concept) =>
    VARIANTS.flatMap((variant) =>
      TONES.map((tone) => ({ concept, variant, tone, name: `${concept.key}-${variant}-${tone}` })),
    ),
  );
  await Promise.all(
    jobs.map(async ({ name, ...request }) => {
      const svg = renderMark({ ...request, uid: name });
      const png = new Resvg(svg, { fitTo: { mode: 'width', value: PNG_SIZE } }).render().asPng();
      await Bun.write(join(OUT_DIR, 'marks', `${name}.svg`), svg);
      await Bun.write(join(OUT_DIR, 'png', `${name}.png`), png);
    }),
  );
  return jobs.length;
};

const main = async () => {
  await Promise.all(['marks', 'png'].map((dir) => mkdir(join(OUT_DIR, dir), { recursive: true })));
  const markCount = await exportMarks();

  const fonts: SheetFonts = {
    display: await fontDataUri(FONT_FILES.display),
    body: await fontDataUri(FONT_FILES.body),
    bodyBold: await fontDataUri(FONT_FILES.bodyBold),
  };
  for (const sheet of SHEETS) {
    const sheetPath = join(OUT_DIR, `${sheet.slug}.html`);
    await Bun.write(sheetPath, renderSheet(sheet, fonts));
    await screenshotSheet(sheetPath, join(OUT_DIR, `${sheet.slug}.png`));
  }
  console.log(`✓ ${markCount} marks, ${SHEETS.length} sheets → ${OUT_DIR}`);
};

await main();
