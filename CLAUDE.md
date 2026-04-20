# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
bun run dev          # Start dev server (Turbopack default in Next 16)
bun run build        # Production build
bun run analyze      # ANALYZE=true next build --webpack (bundle analyzer)
bun run start        # Start production server
bun run format       # biome check --write . (entire repo)
bun run lint         # biome lint --write . (entire repo)
bun run db:generate  # Generate Drizzle migrations
bun run db:migrate   # Run Drizzle migrations
bun run db:seed      # Seed database (uses npx tsx, not bun — better-sqlite3 native bindings)
bun run db:studio    # Open Drizzle Studio GUI
bun run test         # Unit + E2E (chains test:unit then test:e2e)
bun run test:unit    # npx vitest run — node env, :memory: DB
bun run test:e2e     # Playwright — local uses bun run dev (see caveat)
bun run test:e2e:build # Escape hatch — CI=1 forces build+start (use when dev is occupied)
```

**Unit tests** use an in-memory SQLite via `DATABASE_URL=":memory:"` (set by `vitest.config.ts`). `tests/unit/setup.ts` migrates + clears the `posts` table between tests. Hono routes are tested by calling `app.request()` directly — no server needed.

**E2E tests** (Playwright) spin up a dedicated server on port 3100 against `test.db` (seeded by `tests/e2e/global-setup.ts`). `drizzle.config.ts` honors `DATABASE_URL`. Two modes:
- **Local (default)**: `bun run dev`. Caveat — Next 16 only allows one `next dev` per project; stop any running dev server before `bun run test:e2e`, or use `bun run test:e2e:build`.
- **CI (`CI=1`)**: `bun run build && bun run start`. Slower but isolated from any dev process.

**Pre-commit hook** (`simple-git-hooks` + `lint-staged`) runs `biome check --write` on staged `.{ts,tsx,js,jsx,json,css}` files automatically. Run `bunx simple-git-hooks` once after fresh clone to install. Biome errors still block commits.

### i18n loading

`i18n/request.ts` iterates the `SECTIONS` array to load per-category translation files in parallel. To add a new category, drop `messages/sections/{name}.{zh-TW,en}.json` and append `name` to `SECTIONS`. `extras.*.json` stays separate — it's deep-merged because it patches existing namespaces (e.g. `rendering.*`, `routing.*`).

## Architecture

This is a **Next.js 16.2.4 Learning Hub** — an interactive showcase where each route demonstrates a Next.js feature with live demos, code examples, and i18n (zh-TW/en).

### Route Groups

- `app/(learn)/` — All demo pages, wrapped in sidebar layout (`layout.tsx` with `SidebarProvider`)
- `app/(api-demo)/api/[...route]/` — Hono catch-all route handler for all `/api/*` endpoints
- `app/page.tsx` — Home dashboard (no sidebar)

### Demo Page Pattern

Every demo page follows this structure using shared components from `components/demo-page.tsx`:

```tsx
import { getTranslations } from "next-intl/server";
import { CodeBlock, DemoBox, DemoPage, FileTree, Section } from "@/components/demo-page";

export default async function Page() {
  const t = await getTranslations("category.pageName");
  return (
    <DemoPage title={t("title")} description={t("description")}>
      <Section title={t("sectionTitle")}>
        <CodeBlock filename="example.tsx" language="tsx">{`// code stays in English`}</CodeBlock>
      </Section>
    </DemoPage>
  );
}
```

- `CodeBlock` is async (uses shiki server-side). `children` must be a string. **Never translate code block content.**
- `FileTree` children are plain strings. **Never translate file trees.**
- Client components use `useTranslations("category.pageName")` from `next-intl`.

### i18n

- **Locales**: zh-TW (default), en. Config in `i18n/routing.ts`.
- **Locale detection**: Cookie-based (`NEXT_LOCALE`), no URL prefix for default locale.
- **Translation files**: `messages/zh-TW.json` + `messages/en.json` (base), `messages/sections/*.{zh-TW,en}.json` (per category).
- **Loading**: `i18n/request.ts` merges base + all section files.
- **ICU format**: Translation strings must NOT contain raw `<` or `>`. Use plain text (`Link component` not `<Link> component`).
- Server: `getTranslations()` from `next-intl/server`. Client: `useTranslations()` from `next-intl`.
- `NextIntlClientProvider` is in `app/layout.tsx` (root).

### Proxy (formerly Middleware)

- Root-level `proxy.ts` (renamed from `middleware.ts` in Next 16) sets security headers (X-Frame-Options, X-Content-Type-Options, X-DNS-Prefetch-Control, Referrer-Policy) and logs requests in dev only. Matcher excludes `api/*`, `_next/*`, `favicon.ico`, and image files. Migrate legacy `middleware.ts` with `npx @next/codemod@canary middleware-to-proxy .`.

### Hono API

- Entry: `lib/api/index.ts` — Hono app with basePath `/api`, global logger middleware.
- Routes: `lib/api/routes/{hello,posts,og,stream}.ts(x)` mounted at `/api/{hello,posts,og,stream}`.
- Catch-all handler: `app/(api-demo)/api/[...route]/route.ts` exports `GET/POST/PUT/DELETE` via `handle(app)` from `hono/vercel`.
- Posts route uses Drizzle + Zod validation (`@hono/zod-validator`).

### Database

- **Drizzle ORM** + `better-sqlite3`, file: `local.db` (gitignored).
- Schema: `lib/db/schema.ts` — single `posts` table.
- Connection: `lib/db/index.ts` — WAL mode enabled.
- **Note**: `bun` cannot run better-sqlite3 directly. Seed uses `npx tsx`.

### Shiki Code Highlighting

- Config: `lib/shiki.ts` — dual theme (github-dark/github-light), `defaultColor: false`.
- Loaded langs: tsx, typescript, jsx, javascript, json, bash, css, html, mdx, yaml, markdown, text.
- Unknown languages fall back to `text` automatically.
- CSS variables for theme switching in `app/globals.css` (`.shiki` / `.dark .shiki`).

### Key Conventions

- **Next.js 16 breaking change**: `params` and `searchParams` are `Promise` — must `await` in server components.
- **shadcn/ui**: base-nova style. `SidebarMenuButton` uses `render` prop for Link composition (not `asChild`). `Button` does NOT support `render` with non-button elements.
- **Biome**: Tabs, double quotes, recommended rules, Tailwind CSS directives enabled.
- **Styling**: Tailwind CSS v4 (`@import "tailwindcss"` syntax), CSS variables for theming.
- **Fonts**: Geist Sans (body, `--font-geist-sans`), Geist Mono (code, `--font-geist-mono`), Space Mono (accents, `--font-space-mono`). Loaded via `next/font/google` in `app/layout.tsx`.
- **State**: Zustand for client state, TanStack Query for server state, nuqs for URL state.
