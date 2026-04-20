import { expect, test } from "@playwright/test";

// All shell tests run inside the (learn) layout, which owns sidebar + command
// palette + breadcrumb. `/routing/basics` leaves the Data group initially
// collapsed (activeGroup logic keys off pathname), which lets us observe
// collapse toggling in test 1.
const INSIDE_LEARN = "/routing/basics";

test.describe("shell", () => {
	test("sidebar group collapses and expands", async ({ page }) => {
		await page.goto(INSIDE_LEARN);

		const dataGroup = page.getByText("資料處理", { exact: true });
		const serverActionsLink = page.getByRole("link", {
			name: "Server Actions",
			exact: true,
		});

		await expect(serverActionsLink).toBeHidden();

		await dataGroup.click();
		await expect(serverActionsLink).toBeVisible();

		await dataGroup.click();
		await expect(serverActionsLink).toBeHidden();
	});

	test("sidebar link navigates to the demo page", async ({ page }) => {
		await page.goto(INSIDE_LEARN);

		await page.getByText("資料處理", { exact: true }).click();
		await page
			.getByRole("link", { name: "Server Actions", exact: true })
			.click();

		await expect(page).toHaveURL(/\/data\/server-actions$/);
		await expect(page.locator("h1").first()).toBeVisible();
	});

	test("command palette opens with ⌘K, searches, and navigates", async ({
		page,
	}) => {
		await page.goto(INSIDE_LEARN);

		await page.keyboard.press("Meta+K");

		const input = page.getByPlaceholder("Type to search pages...");
		await expect(input).toBeVisible();

		await input.fill("URL State");
		await page.keyboard.press("Enter");

		await expect(page).toHaveURL(/\/rendering\/url-state$/);
	});

	test("theme toggle flips the <html> class and fires a toast", async ({
		page,
	}) => {
		await page.goto(INSIDE_LEARN);

		const html = page.locator("html");
		const before = (await html.getAttribute("class")) ?? "";
		const startedDark = before.includes("dark");

		await page.getByRole("button", { name: "Toggle theme" }).click();

		await expect(html).toHaveClass(
			startedDark ? /(^|\s)light(\s|$)/ : /(^|\s)dark(\s|$)/,
		);
		await expect(
			page.getByText(startedDark ? "Light mode" : "Dark mode", { exact: true }),
		).toBeVisible();
	});

	test("locale switcher swaps nav labels and cookie", async ({
		page,
		context,
	}) => {
		await context.addCookies([
			{ name: "NEXT_LOCALE", value: "zh-TW", url: "http://localhost:3100" },
		]);
		await page.goto(INSIDE_LEARN);

		await expect(page.getByText("資料處理", { exact: true })).toBeVisible();

		await page.getByRole("button", { name: "中文", exact: true }).click();

		await expect(page.getByText("Data", { exact: true })).toBeVisible();
		await expect(page.getByText("資料處理", { exact: true })).toBeHidden();

		const cookies = await context.cookies();
		const next = cookies.find((c) => c.name === "NEXT_LOCALE");
		expect(next?.value).toBe("en");
	});

	test("breadcrumb reflects the current route", async ({ page }) => {
		await page.goto("/data/server-actions");

		const breadcrumb = page.getByRole("navigation", { name: "breadcrumb" });
		await expect(breadcrumb.getByText("Data", { exact: true })).toBeVisible();
		await expect(
			breadcrumb.getByText("Server Actions", { exact: true }),
		).toBeVisible();
	});
});
