import { defineConfig } from "vitest/config";

export default defineConfig({
	resolve: {
		tsconfigPaths: true,
	},
	test: {
		environment: "node",
		include: ["tests/unit/**/*.test.ts"],
		setupFiles: ["tests/unit/setup.ts"],
		env: {
			DATABASE_URL: ":memory:",
			NODE_ENV: "test",
		},
	},
});
