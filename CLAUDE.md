# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
bun run dev          # Start dev server (Turbopack)
bun run build        # Production build
bun run start        # Start production server
bun run format       # biome check --write ./app
bun run lint         # biome lint --write ./app
bun run db:generate  # Generate Drizzle migrations
bun run db:migrate   # Run Drizzle migrations
bun run db:seed      # Seed database (uses npx tsx, not bun — better-sqlite3 native bindings)
bun run db:studio    # Open Drizzle Studio GUI
```

**Always run `bun run format && bun run lint` before committing.** Build errors from biome are blocking.

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
- **Fonts**: Playfair Display (headings via `font-heading`), Geist Sans (body), Geist Mono (code).
- **State**: Zustand for client state, TanStack Query for server state, nuqs for URL state.
