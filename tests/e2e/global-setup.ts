import { execFileSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";

const TEST_DB = "test.db";

export default async function globalSetup() {
	for (const f of [TEST_DB, `${TEST_DB}-wal`, `${TEST_DB}-shm`]) {
		if (existsSync(f)) rmSync(f);
	}

	// Migrate + seed via existing scripts, pointed at the test DB.
	// `npx tsx` is required because better-sqlite3 doesn't load under bun.
	const env = { ...process.env, DATABASE_URL: TEST_DB };
	execFileSync("npx", ["drizzle-kit", "migrate"], { env, stdio: "inherit" });
	execFileSync("npx", ["tsx", "lib/db/seed.ts"], { env, stdio: "inherit" });
}
