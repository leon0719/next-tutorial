import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { beforeAll, beforeEach } from "vitest";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";

beforeAll(() => {
	migrate(db, { migrationsFolder: "./drizzle" });
});

beforeEach(() => {
	db.delete(posts).run();
});
