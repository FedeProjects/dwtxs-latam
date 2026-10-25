# PROJECT_SPEC — DWTXS LATAM website

> Living document. Update it when a decision changes. Last update: 2026-10-25.

## 1. Overview

Static, bilingual (pt-BR / es) corporate website for **DW Máquinas** (Brazil-registered distributor) presenting the horizontal directional drilling (HDD) machines made by DWTXS (China, http://www.dwtxs.cn/).

- Client: Trader MAC (US importer, https://tradermacusa.com/).
- Domain: `dwtxslatam.com` (owned by the client).
- The site operates as a **Brazilian** business until the client resolves a legal matter in Argentina. All company/legal data shown must be DW Máquinas (Brazil).
- Possible future: merge into the Trader MAC USA site (out of scope, to be discussed).
- Budget: ARS 300.000 (fixed). Scope control matters.

## 2. Goals & Non-goals

**Goals**
- Present the company and the full machine catalog (15 models) clearly and professionally.
- Generate leads: contact form + floating WhatsApp button on every page.
- Rank for HDD machine searches in Brazil and Spanish-speaking LATAM.
- Fast, accessible, responsive; near-zero hosting cost and maintenance.

**Non-goals (MVP)**
- No CMS or admin panel (content is fixed; changes are done by the developer).
- No e-commerce, prices, cart, login or client area.
- No blog.
- No backend or database owned by us.
- No analytics/cookie banner unless the client asks for it [TBD].

## 3. Audience

Contractors and companies doing utility installation (fiber, gas, water, power) that need trenchless drilling machines. Technical buyers: they compare specs (thrust/pullback, torque, max bore diameter and length, engine power). Mostly mobile visits from the field; desktop for spec comparison.

## 4. Functional requirements

Source: client document "Web DWTXS LATAM".

| ID | Page | Content |
|----|------|---------|
| FR-01 | Home | Intro text, general photos, featured machines, contact form, WhatsApp |
| FR-02 | Catalog: Conventional | 7 models: DDW10/04, DDW22/08SE, DDW36/15SE, DDW45/22, DDW55/27, DDW80/40, DDW120/50 |
| FR-03 | Catalog: Maxi-Rig | 4 models: DDW240/70L, DDW360/130, DDW500/180, DDW800/240 |
| FR-04 | Catalog: All Terrain | "What is All Terrain technology?" section + 4 models: DDW20/10AT, DDW35/15AT, DDW50/30AT, DDW75/40AT |
| FR-05 | Model detail | One page per model: photo gallery, key specs table, short description, CTA (form / WhatsApp with model prefilled) |
| FR-06 | Accessories | Mud recyclers and mud mixers: what they are + key data |
| FR-07 | About us | DWTXS history and reputation; DW Máquinas info (Brazilian distributor) |
| FR-08 | Contact | Form, email, WhatsApp, address |
| FR-09 | Global | Floating WhatsApp button (`wa.me` link, localized prefilled message) |
| FR-10 | Global | Language switcher pt-BR ↔ es that keeps the equivalent page |

**Contact form fields** (aligned with tradermacusa.com): name, email, company, phone, inquiry reason (select: machine / accessories / other), message, hidden `model` when sent from a model page. Submissions go by email to the client address [TBD].

## 5. Non-functional requirements

- **Performance:** Lighthouse ≥ 95 in all categories (mobile). Zero client JS except form handling, mobile menu, language switch, theme toggle (D-13) and the small motion script of D-12.
- **SEO:** per-page title/description, `hreflang` pt-BR/es + `x-default`, canonical URLs, `sitemap.xml`, `robots.txt`, Open Graph images, JSON-LD (`Organization`, `Product` per model, `BreadcrumbList`).
- **Accessibility:** WCAG 2.2 AA: semantic HTML, keyboard navigation, visible focus, alt text in both languages, contrast ≥ 4.5:1.
- **Responsive:** mobile-first; check at 375px, 768px and 1440px.
- **i18n:** every visible string exists in both languages; build fails if a key is missing.
- **Images:** optimized at build (AVIF/WebP, responsive `srcset`, lazy loading below the fold).
- **Portability:** static output only, so it can be hosted anywhere and later merged into another site.

## 6. Architecture

### 6.1 Stack

| Concern | Choice |
|---------|--------|
| Framework | Astro (latest stable, pinned), static output (`output: 'static'`) |
| Language | TypeScript, strict |
| Styling | Tailwind CSS v4 |
| Content | Astro Content Collections (YAML/MD in repo, Zod schemas) |
| i18n | Astro built-in i18n routing + typed UI dictionaries |
| Images | `astro:assets` (`<Image>` / `<Picture>`) |
| Form | Third-party form endpoint (Web3Forms or Formspree) [decide in Phase 3] + honeypot + Cloudflare Turnstile |
| SEO | `@astrojs/sitemap`, custom `<SEO>` component |
| Package manager | pnpm |
| Runtime | Node LTS inside the Dev Container |
| Quality | ESLint + Prettier + `astro check` |
| CI | GitHub Actions: install, check, lint, build on every PR |
| Hosting | Vercel (preview on Hobby now, Pro before going public) (D-05) |

### 6.2 Routes

Default locale `pt` served at root; Spanish under `/es`. Model slugs are language-neutral. URLs have no trailing slash (D-10).

| Page | pt-BR | es |
|------|-------|----|
| Home | `/` | `/es` |
| Category | `/maquinas/{convencional\|maxi-rig\|all-terrain}` | `/es/maquinas/{...}` |
| Model | `/maquinas/{category}/{ddw10-04}` | `/es/maquinas/{category}/{ddw10-04}` |
| Accessories | `/acessorios` | `/es/accesorios` |
| About | `/sobre-nos` | `/es/sobre-nosotros` |
| Contact | `/contato` | `/es/contacto` |

### 6.3 Folder structure

```
src/
  assets/images/{models,accessories,general}/
  components/        # UI: Header, Footer, LanguageSwitcher, WhatsAppButton, ContactForm, SpecsTable, ModelCard, SEO
  content/
    models/          # one YAML per model (ddw10-04.yaml, ...)
    accessories/     # one YAML per accessory
    pages/           # long texts, one Markdown per page and language (about.pt.md, ...)
    specs.ts         # whitelists: spec sections, row keys, translatable values, key specs
  content.config.ts  # collection schemas (Zod)
  i18n/
    ui.ts            # UI strings { pt: {...}, es: {...} }
    routes.ts        # localized route segments
    utils.ts         # getLangFromUrl, t(), localizePath()
  layouts/BaseLayout.astro
  pages/             # pt at root, es/ mirrors it
public/              # favicon, robots.txt, og defaults, video/ (D-12)
docs/prototypes/     # approved HTML prototypes, Phase 2 visual reference (D-11)
```

### 6.4 Content model

Specs are numbers shared by both languages; only text is localized. Spec labels come from the i18n dictionary, so adding a spec key requires a translation.

```yaml
# src/content/models/ddw10-04.yaml  (file name = slug)
code: DDW10/04
category: conventional      # conventional | maxi-rig | all-terrain
order: 1
featured: false
images:                     # first = main photo, then up to 6 gallery photos
  - ../../assets/images/models/ddw10-04/ddw10-04-1.jpg
keySpecs:                   # cards and comparison (KEY_SPECS whitelist)
  - { key: thrustPullback, value: 90, unit: kN }
  - { key: rotaryTorque, value: 4000, unit: N·m }
specSheet:                  # full manufacturer sheet, by section (SPEC_SECTIONS / SPEC_KEYS)
  - section: engine
    rows:
      - { key: engineMake, value: Cummins }                 # raw string, not translated
      - { key: ratedPower, value: 64.1, unit: kW }          # number, formatted per locale
      - { key: entryAngle, value: { range: [13, 19] }, unit: ° }
      - { key: rotaryTorque, value: { list: [7000, 4500, 2500], sep: / }, unit: N·m }
      - { key: track, valueKey: rubberTrack }               # translated text (SPEC_VALUE_KEYS)
reviewNotes: []             # source conflicts for the client review; not rendered
i18n:
  pt: { name: "...", summary: "...", description: "..." }
  es: { name: "...", summary: "...", description: "..." }
```

Every spec section, row key and text value needs a label in both languages in `src/i18n/ui.ts`; `astro check` fails if one is missing.

## 7. Decisions

**D-01 — Astro static site.**
Alternatives: Next.js SSG; Astro/Next + headless CMS; WordPress/Webflow.
Reason: fixed content, no dynamic features, SEO and performance are priorities. Astro ships zero JS by default and outputs plain static files. CMS rejected: nobody edits content after delivery. WordPress rejected: maintenance, security updates and hosting cost with no benefit.

**D-02 — Content in repo as typed collections.**
Reason: 15 models + 2 accessories fit easily in files; Zod validation catches missing fields and translations at build time; no external dependency.

**D-03 — pt-BR as default locale at root, es under `/es/`.**
Reason: the business operates from Brazil for now. Alternative (both prefixed, root redirect) rejected for MVP: adds a redirect with no clear benefit. Revisit if the Argentine market opens.

**D-04 — Form via third-party endpoint, not our own backend.**
Alternatives: Cloudflare Pages Function + email API (Resend); PHP on the client's hosting; `mailto:`.
Reason: hosting-agnostic and zero maintenance. Revisit if the free tier limits are exceeded or the client requires data to stay on their infrastructure.

**D-05 — Static output, hosting-agnostic.**
Reason: the client may migrate the site into Trader MAC USA. Static files deploy to Cloudflare Pages, any CDN or shared hosting.
Update 2026-10-25: hosting is **Vercel**, where the developer already has an account. Previews run on the Hobby plan; Hobby is non-commercial, so the project moves to **Pro before the site is public or shared widely**. `main` deploys to the production `*.vercel.app` URL used as the client demo; every PR gets its own preview URL. The site keeps `noindex` until launch.

**D-06 — Specs as key specs + full spec sheet (2026-10-24).**
Alternative: only 6–10 numeric key specs.
Reason: technical buyers compare the full sheet (~45 fields per model, grouped like the manufacturer's sheet). `keySpecs` feed cards and comparisons; `specSheet` keeps every row. The planned `maxBoreLength` was dropped: the manufacturer does not publish it.

**D-07 — Spec source: dwtxs.cn web spec sheet (2026-10-24).**
The web sheet and the PDF brochure disagree for several models (e.g. DDW360/130, DDW36/15SE, DDW50/30AT). The web sheet is used; every conflict is listed in the model's `reviewNotes` for the client to validate.

**D-08 — Long texts in a `pages` collection (2026-10-24).**
Alternative: paragraphs as keys in `ui.ts`.
Reason: About and All Terrain texts are long and formatted; Markdown per page and language is easier to edit and is validated like the other collections.

**D-09 — Photos and client review (2026-10-24).**
Photos come from dwtxs.cn (selection recorded in the photo selection sheet): one main + max 6 gallery photos per model, converted to sRGB JPEG ≤ 2400 px. Montage banners and photos with third-party dealer branding (FARCO, DWTXS.RU) are excluded. No separate content draft: the client reviews texts and specs on the Phase 2 preview site.

**D-10 — URLs without trailing slash (2026-10-24).**
`trailingSlash: 'never'` + `build.format: 'file'`: pages are generated as `maquinas/convencional.html` and served as `/maquinas/convencional`, so static hosts (Cloudflare Pages) do not add a redirect to the slash version.
On Vercel this needs `vercel.json` with `cleanUrls: true` (serves `es.html` at `/es` and redirects `/es.html` to `/es`) and `trailingSlash: false`; without it every page except `/` returns 404.

**D-11 — Visual direction "Obra" (2026-10-25).**
Alternatives: "Chapa" (machine nameplate, industrial) and "Corporativo" (classic distributor); three more versions made with the taste-skill design skill were rejected by the developer.
Chosen: documentary jobsite look. Tokens (colours replaced by D-14 "Acero"; layout, type and motion still apply): concrete `#ebe9e4` (ground), asphalt `#232220` (ink), machine red `#b3121b` (actions), jobsite sky `#c9d6de` (one field per page), white `#fbfaf8` (cards); type **Schibsted Grotesk** 400/500/700/900; pill buttons and chips; square photos. Motion: headings rise word by word from a mask, blocks rise once when they enter, pictures open like shutters, figures count up, red bars draw, hover zoom that follows the pointer, scroll-linked hero drift; everything off with `prefers-reduced-motion` and hover effects only for fine pointers.
The approved prototypes are the reference for Phase 2: `docs/prototypes/` (Home structured like tradermacusa.com, category grid, model page), see its README.
Logo: "DWTXS LATAM" wordmark until the client provides one [TBD].
The font is self-hosted with Astro's built-in Fonts API (Google provider, downloaded at build time): no third-party request at runtime and no extra dependency.

**D-12 — Client JS and video exceptions (2026-10-25).**
- One small vanilla script (~40 lines, no library) for reveal-on-enter, masked words, count-up and hover pan, plus the interactive bits of the prototypes (category tabs/sort, gallery, spec-sheet filter). Content is visible without JS (`html.js` gate).
- Two AI-generated ambient videos in `public/video/` (Home hero `rig.mp4`, trenchless band `drone.mp4`; ping-pong loops, muted, ~2 MB each). The hero clip shows a garbled brand ("DWTKS DDW-7540 AT"): never caption them as real jobs or machines; the client must approve them, and the hero clip should be regenerated without text before launch [TBD].

**D-13 — Light and dark theme (2026-10-25).**
Alternatives: light only (the approved prototypes); `dark:` classes on every component.
Chosen: both themes, following the system preference by default, plus a toggle in the header that stores the pick in `localStorage` (a tiny inline script in `<head>` applies it before the first paint, so there is no flash). Without JS the theme follows the system. The D-11 color tokens are redefined for dark in `global.css`, so components use the same utilities (`bg-concrete`, `text-asphalt`…) in both themes; text over photos and video uses the fixed `on-media` tokens, and small red text uses `red-ink` (lighter in dark for ≥ 4.5:1 contrast). A `dark:` Tailwind variant matching the same rules exists for the rare case a component needs it.

**D-14 — Palette "Acero" (2026-10-25).**
Alternative: keep the D-11 "Obra" palette (git tag `palette-obra` to roll back).
Reason: the logo is assumed to be "DWTXS LATAM" in white, which needs a dark surface wherever it appears; with "Obra" the solid header and the footer were light in light mode. Dark mode in "Obra" was also close to a colour swap.
Chosen by the developer for the client demo: sand ground `#e6e1d6`, blue-graphite ink `#1b2026`, cards `#f7f4ee`, red `#c1121f` for actions, and a dark steel chassis `#1b2026` (header, footer, enquiry band) that carries the white logo in both themes. Dark: deep steel ground `#151a1f`, raised cards `#1f262d`, darker chassis `#0d1013`, brighter red `#d61f2a`. Revisit when the client provides the real logo and colours.

## 8. Phases

Each task should fit one Claude Code session.

### Phase 0 — Setup
Goal: reproducible environment and empty site deployed in preview.
- [x] Create GitHub repo `dwtxs-latam` (private), `main` protected
- [x] `.devcontainer/` with Node LTS + pnpm, VS Code extensions (Astro, Tailwind, ESLint, Prettier)
- [x] Scaffold Astro (minimal template), TypeScript strict, Tailwind v4
- [x] ESLint + Prettier + `astro check`; scripts `dev`, `build`, `check`, `lint`, `format`
- [x] GitHub Actions CI (check + lint + build)
- [x] `.env.example`, `README.md`, `CLAUDE.md`, this spec
- [ ] Connect to ~~Cloudflare Pages~~ Vercel: production on `main`, preview per PR (D-05) → done with the Home in Phase 2

**Done when:** `pnpm build` passes in CI and a "hello" page is live on a preview URL.

### Phase 1 — Content model & data
Goal: all content in the repo, validated.
- [x] Define spec keys from manufacturer data; write `content.config.ts` schemas
- [x] i18n setup: `ui.ts`, `routes.ts`, `utils.ts`; Astro i18n config
- [x] Load 15 model YAMLs (specs + pt/es texts, AI-assisted translation)
- [x] Load 2 accessory YAMLs; About and All Terrain texts
- [x] Collect, rename and place images (`src/assets/images/...`)
- [ ] ~~Send content draft to client for validation~~ → client reviews the Phase 2 preview (D-09)

**Done when:** `astro check` passes with all 15 models + 2 accessories in both languages, and the client has the draft for review.

### Phase 2 — Layout & pages
Goal: every page navigable in both languages.
- [x] Visual direction and prototypes (D-11, `docs/prototypes/`)
- [x] Design tokens in Tailwind v4 `@theme` from D-11
- [x] `BaseLayout`, `Header` (nav + mobile menu), `Footer`, `LanguageSwitcher`
- [x] `WhatsAppButton` (floating, localized message, model prefill)
- [x] Home
- [x] Light/dark theme for every page (D-13)
- [ ] Category pages (3) with `ModelCard` grid; All Terrain explainer
- [ ] Model detail page (`getStaticPaths`), `SpecsTable`, gallery, CTAs
- [ ] Accessories, About, Contact pages (form UI only)
- [ ] 404 page in both languages

**Done when:** all routes in §6.2 render in pt and es, language switch keeps the equivalent page, layout checked at 375/768/1440px.

**Next step (start here in a new session):** after the Home PR is merged and Vercel is connected, build the **category pages** (3) following `docs/prototypes/category.src.html`: reuse `ModelCard`, line tabs and sort (D-12 script), All Terrain explainer from the `pages` collection. Then the model page (`model.src.html`). Nav and footer already link to every route of §6.2; until those pages exist they return 404 on the preview.

### Phase 3 — Contact form
Goal: leads reach the client's inbox.
- [ ] Choose provider (Web3Forms vs Formspree) after checking current limits [verify]
- [ ] Wire `ContactForm`: client validation, honeypot, Turnstile, success/error states in both languages
- [ ] Prefill `model` from model pages
- [ ] Test end to end with the client email

**Done when:** a test submission from pt and es arrives at the client email with all fields, and spam protection is active.

### Phase 4 — SEO, performance, accessibility
- [ ] `SEO` component: title, description, canonical, hreflang, OG
- [ ] JSON-LD: Organization, Product, BreadcrumbList
- [ ] Sitemap + robots.txt
- [ ] Lighthouse audit (mobile) and fixes; axe accessibility check
- [ ] OG images (default + per category)

**Done when:** Lighthouse ≥ 95 on Home, a category and a model page; no axe errors; sitemap includes both languages.

### Phase 5 — Launch & handoff
- [ ] Client review round (max. 2 rounds included in budget [confirm with client])
- [ ] Production deploy; point `dwtxslatam.com` DNS; HTTPS
- [ ] Submit sitemap to Google Search Console
- [ ] Handoff doc: how to change content, deploy, renew domain

**Done when:** site live on `dwtxslatam.com`, form tested in production, client sign-off received.

## 9. Risks

| Risk | Mitigation |
|------|------------|
| Image rights: photos taken from dwtxs.cn | Client confirms written authorization from DWTXS, or provides official photos |
| Spec data quality (translated from manufacturer site) | Client validates every spec table before launch |
| Scope creep on a fixed budget | This spec is the scope; extra pages or rounds are quoted separately |
| Legal sensitivity (Argentina) | Show only DW Máquinas (Brazil) company data; client validates About and Contact texts |
| Third-party form limits/outage | Provider swap is isolated in `ContactForm`; email and WhatsApp remain as fallbacks |

## 10. Open questions

- [TBD] Destination email for the form.
- [TBD] WhatsApp business number (with country code) and default prefilled message.
- [TBD] DW Máquinas legal data: name, CNPJ (if shown), address, phone.
- [TBD] Where tradermacusa.com is hosted, and whether DNS for `dwtxslatam.com` can be managed by us (needed for Cloudflare Pages).
- [TBD] Logo for DW Máquinas / DWTXS LATAM (colours decided in D-11; a logo may adjust them).
- [TBD] Years in business: tradermacusa.com says "+20 años" (home), "más de 50" (nosotros) and "desde 1966" (history). The site uses "50+".
- [TBD] Does DW Máquinas sell DWTXS spare parts and tools in Brazil? (Home services block)
- [TBD] Authorization to use DWTXS photos and texts.
- [TBD] Is analytics needed (GA4 / Cloudflare Web Analytics)?
- [TBD] Confirm default language pt-BR, and who the Spanish version targets.
- [TBD] Number of client review rounds included.
