# Next.js Learning Hub

Interactive Next.js 16 feature showcase — 41 demos covering every major feature with live examples, syntax-highlighted code, and bilingual support (zh-TW / English).

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.4 + React 19 + TypeScript |
| UI | shadcn/ui (base-nova) + Tailwind CSS v4 + lucide-react |
| API | Hono + @hono/zod-validator |
| Database | Drizzle ORM + better-sqlite3 (SQLite) |
| State | Zustand (client) · TanStack Query (server) · nuqs (URL) |
| i18n | next-intl (zh-TW / en, cookie-based) |
| Testing | Vitest (unit) + Playwright (E2E) |
| Code Highlighting | Shiki (dual theme) |
| Forms | react-hook-form + zod |
| Theme | next-themes (dark/light/system) |
| Fonts | Playfair Display (headings) + Geist (body/mono) |
| Animation | motion |
| Linter/Formatter | Biome |
| Package Manager | Bun |

## Getting Started

```bash
# Install dependencies
bun install

# Set up database
bun run db:migrate
bun run db:seed

# Start dev server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo Categories

| Category | Demos | Features |
|---|---|---|
| **Routing** | 7 | Dynamic routes, catch-all, route groups, parallel routes, intercepting routes, error pages |
| **Rendering** | 4 | Server/Client components, composition pattern, Zustand state |
| **Data** | 6 | Server fetch, TanStack Query, caching, revalidation, server actions, streaming |
| **UI & Assets** | 6 | CSS, images, fonts, metadata/SEO, animations, themes |
| **Advanced** | 10 | Proxy, i18n, auth, draft mode, edge runtime, error handling, MDX, instrumentation, PWA, dates |
| **Config** | 4 | Env variables, redirects/rewrites, headers/CSP, bundle analyzer |
| **API (Hono)** | 4 | Hello, CRUD posts, OG image generation, streaming response |

## Project Structure

```
app/
├── page.tsx                    Home dashboard
├── (learn)/                    Demo pages (sidebar layout)
│   ├── routing/                7 routing demos
│   ├── rendering/              4 rendering demos
│   ├── data/                   6 data demos
│   ├── ui/                     6 UI demos
│   ├── advanced/               10 advanced demos
│   ├── config/                 4 config demos
│   └── api-docs/               4 API demos
├── (api-demo)/api/[...route]/  Hono catch-all handler
│
proxy.ts                        Root proxy (formerly middleware.ts)
│
lib/
├── api/                        Hono app + routes
├── db/                         Drizzle schema + connection + seed
├── shiki.ts                    Code highlighting
│
messages/                       i18n translations (zh-TW, en)
├── sections/                   Per-category translation files
│
i18n/
├── request.ts                  next-intl request config
├── routing.ts                  Locale routing
└── merge.ts                    Deep-merge helper for translation files
│
components/
├── demo-page.tsx               Shared demo layout components
├── app-sidebar.tsx             Navigation sidebar
└── ui/                         shadcn components
│
tests/
├── unit/                       Vitest (node env, :memory: DB)
└── e2e/                        Playwright (port 3100, test.db)
```

## Scripts

```bash
bun run dev            # Dev server (Turbopack)
bun run build          # Production build
bun run analyze        # Bundle analyzer build
bun run start          # Start production server
bun run format         # Biome format + fix
bun run lint           # Biome lint
bun run db:generate    # Generate migrations
bun run db:migrate     # Run migrations
bun run db:seed        # Seed sample data
bun run db:studio      # Drizzle Studio GUI
bun run test           # Unit + E2E (chained)
bun run test:unit      # Vitest (in-memory DB)
bun run test:unit:watch # Vitest watch mode
bun run test:e2e       # Playwright (uses bun run dev)
bun run test:e2e:ui    # Playwright UI mode
bun run test:e2e:build # Playwright with build+start (CI mode)
```

## Testing

- **Unit** — Vitest in node env with `DATABASE_URL=":memory:"`. Hono routes are tested by calling `app.request()` directly.
- **E2E** — Playwright against a dedicated server on port 3100 with a seeded `test.db`.
  - Local default: reuses `bun run dev` (stop any running dev server first — Next 16 allows only one `next dev` per project).
  - `CI=1` mode: builds and starts for isolation from local dev.
