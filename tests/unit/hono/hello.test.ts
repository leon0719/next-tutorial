import { describe, expect, it } from "vitest";
import app from "@/lib/api";

describe("GET /api/hello", () => {
	it("returns message + ISO timestamp", async () => {
		const res = await app.request("/api/hello");
		expect(res.status).toBe(200);
		const body = (await res.json()) as { message: string; timestamp: string };
		expect(body.message).toMatch(/Hello/);
		expect(new Date(body.timestamp).toString()).not.toBe("Invalid Date");
	});
});
