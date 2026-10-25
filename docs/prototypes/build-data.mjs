// Build the data + images bundle for the category and model mockups from the repo content.
// Usage (from the repo root): node docs/prototypes/build-data.mjs . docs/prototypes && python3 docs/prototypes/build.py
import fs from 'node:fs';
import { createRequire } from 'node:module';
import YAML from '/workspaces/dwtxs-latam/node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/index.js';

const [, , REPO, OUT] = process.argv;
const sharp = createRequire(fs.realpathSync(`${REPO}/node_modules/astro/package.json`))('sharp');

// Labels: evaluate the `catalogPt` object literal from ui.ts (plain data, no TS syntax inside).
const ui = fs.readFileSync(`${REPO}/src/i18n/ui.ts`, 'utf8');
const lit = ui.match(/const catalogPt: CatalogLabels = (\{[\s\S]*?\n\});/)[1];
const labels = Function(`return (${lit});`)();
const uiPt = Function(`return (${ui.match(/const uiPt = (\{[\s\S]*?\n\});/)[1]});`)();

const nf = new Intl.NumberFormat('pt-BR');
const unitJoin = (u) => (u === '°' ? '' : ' ');
function fmt(row) {
  if (row.valueKey) return labels.values[row.valueKey];
  const v = row.value;
  let s;
  if (typeof v === 'number') s = nf.format(v);
  else if (typeof v === 'string') s = v;
  else if (v.range) s = `${nf.format(v.range[0])}–${nf.format(v.range[1])}`;
  else if (v.list) s = v.list.map((n) => nf.format(n)).join(v.sep === ',' ? ', ' : ` ${v.sep} `);
  return row.unit ? `${s}${unitJoin(row.unit)}${row.unit}` : s;
}

const models = [];
for (const f of fs.readdirSync(`${REPO}/src/content/models`)) {
  const slug = f.replace('.yaml', '');
  const d = YAML.parse(fs.readFileSync(`${REPO}/src/content/models/${f}`, 'utf8'));
  models.push({
    slug, code: d.code, cat: d.category, order: d.order, featured: d.featured,
    name: d.i18n.pt.name, summary: d.i18n.pt.summary, description: d.i18n.pt.description,
    keySpecs: d.keySpecs.map((k) => ({ key: k.key, label: labels.keySpecs[k.key], value: k.value, text: fmt(k) })),
    sheet: d.specSheet.map((s) => ({ section: labels.sections[s.section], rows: s.rows.map((r) => ({ label: labels.keys[r.key], text: fmt(r) })) })),
    images: d.images.length,
  });
}
const catOrder = { conventional: 0, 'maxi-rig': 1, 'all-terrain': 2 };
models.sort((a, b) => catOrder[a.cat] - catOrder[b.cat] || a.order - b.order);

const at = fs.readFileSync(`${REPO}/src/content/pages/all-terrain.pt.md`, 'utf8').split('---').slice(2).join('---').trim();

// Images: a card photo for every model, the full gallery for the model shown in detail.
const img = {};
const webp = async (file, w, q = 64) => 'data:image/webp;base64,' + (await sharp(file).resize({ width: w, withoutEnlargement: true }).webp({ quality: q }).toBuffer()).toString('base64');
for (const m of models) img[`card_${m.slug}`] = await webp(`${REPO}/src/assets/images/models/${m.slug}/${m.slug}-1.jpg`, 900, 60);
const DETAIL = 'ddw55-27';
for (let n = 1; n <= 7; n++) img[`gal_${n}`] = await webp(`${REPO}/src/assets/images/models/${DETAIL}/${DETAIL}-${n}.jpg`, 1500, 66);
for (let n = 1; n <= 7; n++) img[`thumb_${n}`] = await webp(`${REPO}/src/assets/images/models/${DETAIL}/${DETAIL}-${n}.jpg`, 240, 55);
img.field = await webp(`${REPO}/src/assets/images/general/home-6.jpg`, 1600, 62);

// Home pictures (lines, company, services, mud system).
const homeImg = {};
const HOME = { line_conventional: 'models/ddw36-15se/ddw36-15se-1.jpg', line_maxi: 'models/ddw360-130/ddw360-130-1.jpg', line_at: 'models/ddw35-15at/ddw35-15at-1.jpg', recycler: 'accessories/mud-recycler/mud-recycler-1.jpg', mixer: 'accessories/mud-mixer/mud-mixer-1.jpg', company: 'general/about-8.jpg', service: 'general/home-4.jpg' };
for (const [k, f] of Object.entries(HOME)) homeImg[k] = await webp(`${REPO}/src/assets/images/${f}`, 1300, 62);
fs.writeFileSync(`${OUT}/home-images.json`, JSON.stringify(homeImg));

fs.writeFileSync(`${OUT}/data.json`, JSON.stringify({ models, labels: { categories: labels.categories, specNote: uiPt['model.specNote'] }, allTerrain: at, detail: DETAIL }));
fs.writeFileSync(`${OUT}/images.json`, JSON.stringify(img));
const d = models.find((m) => m.slug === DETAIL);
console.log(models.length, 'models;', d.sheet.reduce((a, s) => a + s.rows.length, 0), 'rows in', DETAIL, '; images', (Object.values(img).join('').length / 1e6).toFixed(1), 'MB');
console.log(d.keySpecs.map((k) => `${k.label}: ${k.text}`).join(' | '));
console.log(d.sheet.slice(0, 2).map((s) => s.section + ': ' + s.rows.map((r) => r.label + '=' + r.text).join('; ')).join('\n'));
