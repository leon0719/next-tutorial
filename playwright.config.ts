import { defineConfig, devices } from "@playwright/test";

const isCI = !!process.env.CI;
const PORT = 3100;
const baseURL = `http://localhost:${PORT}`;

// Dedicated test DB (never touches local.db). Seeded by global-setup.
const TEST_DB = "test.db";

export default defineConfig({
	testDir: "./tests/e2e",
	globalSetup: "./tests/e2e/global-setup.ts",
	fullyParallel: false, // single webServer → single DB → serialize
	forbidOnly: isCI,
	retries: isCI ? 1 : 0,
	workers: 1,
	reporter: isCI ? "github" : "list",
	use: {
		baseURL,
		trace: "on-first-retry",
	},
	projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
	webServer: {
		// DATABASE_URL / PORT are passed via `env:` (cross-platform); keep commands plain.
		command: isCI ? "bun run start" : "bun run dev",
		url: baseURL,
		// Always spawn a fresh server so we never reuse one bound to local.db.
		reuseExistingServer: false,
		timeout: isCI ? 180_000 : 60_000,
		env: { DATABASE_URL: TEST_DB, PORT: String(PORT) },
	},
});
