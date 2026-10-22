# CLAUDE.md

@PROJECT_SPEC.md

## Environment
- Runs inside the Dev Container (WSL2 + Docker). NEVER install tools on the Windows host.
- Package manager: pnpm only. Do not use npm or yarn.
- Commands: `pnpm dev` | `pnpm build` | `pnpm check` (astro check) | `pnpm lint` | `pnpm format`

## Conventions
- Code, file names, components, comments and commits in English. Visible content in pt-BR and es only.
- Never hardcode visible text in components: use `t()` from `src/i18n/` or content collections.
- Every new UI string or spec key MUST be added to both `pt` and `es`.
- Images go through `astro:assets` (`<Image>`/`<Picture>`), never raw `<img>` for local files. Alt text required in both languages.
- Static output only. No SSR adapter, no server endpoints.
- Tailwind utilities; no extra CSS frameworks or UI libraries.
- Commits: Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`).

## Rules
- Ask before adding a dependency, changing the content schema or changing routes.
- Small, focused changes. No unrelated refactors.
- Before finishing a task: `pnpm check && pnpm lint && pnpm build` must pass.
- Do not invent specs, company data, emails or phone numbers. Use `[TBD]` placeholders.
- When a decision in PROJECT_SPEC.md changes, update its Decisions section.

## Communication
- Reply in Spanish. Be brief: plan first for multi-file tasks, then the diff summary.
- The developer is learning Astro (knows React, Java). When a task introduces an Astro concept (islands, frontmatter, content collections, `getStaticPaths`, `astro:assets`, i18n routing, etc.), add a short "How it works" note (2-4 lines), comparing with React when useful. Explain each concept once, not every time.
