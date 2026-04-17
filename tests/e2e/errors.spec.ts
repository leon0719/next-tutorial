import { expect, test } from "@playwright/test";

test.describe("errors", () => {
	test("unknown route renders not-found page", async ({ page }) => {
		const res = await page.goto("/this-route-definitely-does-not-exist");
		expect(res?.status()).toBe(404);
	});

	test("unknown /api/posts/:id returns JSON 404", async ({ request }) => {
		const res = await request.get("/api/posts/999999");
		expect(res.status()).toBe(404);
		const body = (await res.json()) as { error: string };
		expect(body.error).toMatch(/not found/i);
	});
});
