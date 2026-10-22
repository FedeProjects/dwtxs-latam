# PROJECT_SPEC — DWTXS LATAM website

> Living document. Update it when a decision changes. Last update: 2026-10-22.

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

- **Performance:** Lighthouse ≥ 95 in all categories (mobile). Zero client JS except form handling, mobile menu and language switch.
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
| Hosting | Cloudflare Pages (recommended) or client's current hosting [TBD] |

### 6.2 Routes

Default locale `pt` served at root; Spanish under `/es/`. Model slugs are language-neutral.

| Page | pt-BR | es |
|------|-------|----|
| Home | `/` | `/es/` |
| Category | `/maquinas/{convencional\|maxi-rig\|all-terrain}/` | `/es/maquinas/{...}/` |
| Model | `/maquinas/{category}/{ddw10-04}/` | `/es/maquinas/{category}/{ddw10-04}/` |
| Accessories | `/acessorios/` | `/es/accesorios/` |
| About | `/sobre-nos/` | `/es/sobre-nosotros/` |
| Contact | `/contato/` | `/es/contacto/` |

### 6.3 Folder structure

```
src/
  assets/images/{models,accessories,general}/
  components/        # UI: Header, Footer, LanguageSwitcher, WhatsAppButton, ContactForm, SpecsTable, ModelCard, SEO
  content/
    models/          # one YAML per model (ddw10-04.yaml, ...)
    accessories/     # one YAML per accessory
  content.config.ts  # collection schemas (Zod)
  i18n/
    ui.ts            # UI strings { pt: {...}, es: {...} }
    routes.ts        # localized route segments
    utils.ts         # getLangFromUrl, t(), localizePath()
  layouts/BaseLayout.astro
  pages/             # pt at root, es/ mirrors it
public/              # favicon, robots.txt, og defaults
```

### 6.4 Content model

Specs are numbers shared by both languages; only text is localized. Spec labels come from the i18n dictionary, so adding a spec key requires a translation.

```yaml
# src/content/models/ddw10-04.yaml
code: DDW10/04
slug: ddw10-04
category: conventional      # conventional | maxi-rig | all-terrain
order: 1
featured: true
images: [./ddw10-04-1.jpg, ./ddw10-04-2.jpg]
specs:                      # keys validated against a whitelist
  - { key: thrustPullback, value: 100, unit: kN }
  - { key: maxTorque, value: 4000, unit: Nm }
  - { key: enginePower, value: 75, unit: kW }
  - { key: maxBoreDiameter, value: 400, unit: mm }
  - { key: maxBoreLength, value: 150, unit: m }
  - { key: weight, value: 3500, unit: kg }
i18n:
  pt: { name: "...", summary: "...", description: "..." }
  es: { name: "...", summary: "...", description: "..." }
```

Values above are placeholders. The final spec keys are defined in Phase 1 from the manufacturer's data.

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
Reason: the client may migrate the site into Trader MAC USA. Static files deploy to Cloudflare Pages, any CDN or shared hosting. Note: Vercel Hobby plan is non-commercial, so it is not used.

## 8. Phases

Each task should fit one Claude Code session.

### Phase 0 — Setup
Goal: reproducible environment and empty site deployed in preview.
- [ ] Create GitHub repo `dwtxs-latam` (private), `main` protected
- [ ] `.devcontainer/` with Node LTS + pnpm, VS Code extensions (Astro, Tailwind, ESLint, Prettier)
- [ ] Scaffold Astro (minimal template), TypeScript strict, Tailwind v4
- [ ] ESLint + Prettier + `astro check`; scripts `dev`, `build`, `check`, `lint`, `format`
- [ ] GitHub Actions CI (check + lint + build)
- [ ] `.env.example`, `README.md`, `CLAUDE.md`, this spec
- [ ] Connect to Cloudflare Pages: preview deploy per PR

**Done when:** `pnpm build` passes in CI and a "hello" page is live on a preview URL.

### Phase 1 — Content model & data
Goal: all content in the repo, validated.
- [ ] Define spec keys from manufacturer data; write `content.config.ts` schemas
- [ ] i18n setup: `ui.ts`, `routes.ts`, `utils.ts`; Astro i18n config
- [ ] Load 15 model YAMLs (specs + pt/es texts, AI-assisted translation)
- [ ] Load 2 accessory YAMLs; About and All Terrain texts
- [ ] Collect, rename and place images (`src/assets/images/...`)
- [ ] Send content draft to client for validation

**Done when:** `astro check` passes with all 15 models + 2 accessories in both languages, and the client has the draft for review.

### Phase 2 — Layout & pages
Goal: every page navigable in both languages.
- [ ] Design tokens (colors, typography) from client logo/brand [TBD]
- [ ] `BaseLayout`, `Header` (nav + mobile menu), `Footer`, `LanguageSwitcher`
- [ ] `WhatsAppButton` (floating, localized message, model prefill)
- [ ] Home
- [ ] Category pages (3) with `ModelCard` grid; All Terrain explainer
- [ ] Model detail page (`getStaticPaths`), `SpecsTable`, gallery, CTAs
- [ ] Accessories, About, Contact pages (form UI only)
- [ ] 404 page in both languages

**Done when:** all routes in §6.2 render in pt and es, language switch keeps the equivalent page, layout checked at 375/768/1440px.

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
- [TBD] Logo and brand colors for DW Máquinas / DWTXS LATAM.
- [TBD] Authorization to use DWTXS photos and texts.
- [TBD] Is analytics needed (GA4 / Cloudflare Web Analytics)?
- [TBD] Confirm default language pt-BR, and who the Spanish version targets.
- [TBD] Number of client review rounds included.
