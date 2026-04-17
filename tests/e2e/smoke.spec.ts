import { expect, test } from "@playwright/test";

test.describe("smoke", () => {
	test("home page renders", async ({ page }) => {
		await page.goto("/");
		// h1 exists and body is non-empty
		await expect(page.locator("h1").first()).toBeVisible();
	});

	test("injects security headers from proxy", async ({ request }) => {
		const res = await request.get("/");
		expect(res.headers()["x-frame-options"]).toBe("DENY");
		expect(res.headers()["x-content-type-options"]).toBe("nosniff");
		expect(res.headers()["referrer-policy"]).toBe(
			"strict-origin-when-cross-origin",
		);
	});

	test("can navigate to a demo page", async ({ page }) => {
		await page.goto("/data/client-fetch");
		await expect(page.locator("h1").first()).toBeVisible();
	});

	test("locale cookie controls translated nav label", async ({
		page,
		context,
	}) => {
		await context.addCookies([
			{ name: "NEXT_LOCALE", value: "zh-TW", url: "http://localhost:3100" },
		]);
		await page.goto("/data/client-fetch");
		await expect(page.getByRole("button", { name: "路由" })).toBeVisible();

		await context.clearCookies();
		await context.addCookies([
			{ name: "NEXT_LOCALE", value: "en", url: "http://localhost:3100" },
		]);
		await page.goto("/data/client-fetch");
		await expect(page.getByRole("button", { name: "Routing" })).toBeVisible();
	});
});
