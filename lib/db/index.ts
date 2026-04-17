import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

// DATABASE_URL is read at module import time. Test runners (vitest, Playwright
// global-setup) must set it before any code imports `@/lib/db`.
const dbPath = process.env.DATABASE_URL || "local.db";
const sqlite = new Database(dbPath);
// WAL is unsupported for :memory:
if (dbPath !== ":memory:") sqlite.pragma("journal_mode = WAL");

export const db = drizzle(sqlite, { schema });
