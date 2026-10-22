# DWTXS LATAM

Static bilingual (pt-BR / es) website for DW Máquinas, distributor of DWTXS HDD machines.
See [PROJECT_SPEC.md](PROJECT_SPEC.md) for scope and decisions, and [CLAUDE.md](CLAUDE.md) for conventions.

## Stack

Astro (static output) · TypeScript strict · Tailwind CSS v4 · ESLint · Prettier · pnpm

## Setup

1. Open the repo in VS Code and choose **Reopen in Container** (Node 24).
2. Enable pnpm: `corepack enable` (version pinned in `package.json` → `packageManager`).
3. Install dependencies: `pnpm install`
4. Copy `.env.example` to `.env` if needed.
5. Start the dev server: `pnpm dev` → http://localhost:4321

## Scripts

| Command        | Description                             |
| -------------- | --------------------------------------- |
| `pnpm dev`     | Dev server (`--host`, for container)    |
| `pnpm build`   | Build static site to `dist/`            |
| `pnpm preview` | Preview the production build            |
| `pnpm check`   | Type and template check (`astro check`) |
| `pnpm lint`    | ESLint                                  |
| `pnpm format`  | Prettier (write)                        |

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs install, check, lint and build on every push and PR to `main`.
