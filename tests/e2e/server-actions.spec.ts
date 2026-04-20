import { expect, type Locator, test } from "@playwright/test";

const PAGE = "/data/server-actions";

// Parse N from "Posts (N)" (zh-TW: "文章（N）"). Matches either locale's parens.
async function readPostCount(heading: Locator) {
	const text = (await heading.textContent()) ?? "";
	const match = text.match(/[(（](\d+)[)）]/);
	if (!match) throw new Error(`could not parse post count from "${text}"`);
	return Number(match[1]);
}

test.describe("server actions demo", () => {
	test("renders seeded posts", async ({ page }) => {
		await page.goto(PAGE);

		const heading = page.getByText(/^(文章（\d+）|Posts \(\d+\))$/);
		await expect(heading).toBeVisible();

		const count = await readPostCount(heading);
		expect(count).toBeGreaterThan(0);

		await expect(
			page.getByText("Getting Started with Next.js 16", { exact: true }),
		).toBeVisible();
	});

	test("blocks submission when required fields are empty", async ({ page }) => {
		await page.goto(PAGE);

		const heading = page.getByText(/^(文章（\d+）|Posts \(\d+\))$/);
		const before = await readPostCount(heading);

		await page.getByRole("button", { name: "建立文章", exact: true }).click();

		// Browser-native `required` blocks the submit; stay on page, count unchanged.
		await expect(page).toHaveURL(new RegExp(`${PAGE}$`));
		await expect(heading).toHaveText(new RegExp(`${before}`));
	});

	// Tests 3 & 4 share state: create a post, then optimistically delete it.
	// Serial mode guarantees test 4 sees the post created in test 3.
	test.describe
		.serial("create + optimistic delete", () => {
			const uniqueTitle = `E2E Shell ${Date.now()}`;

			test("creates a post and surfaces a success message", async ({
				page,
			}) => {
				await page.goto(PAGE);

				const heading = page.getByText(/^(文章（\d+）|Posts \(\d+\))$/);
				const before = await readPostCount(heading);

				await page.getByLabel("標題").fill(uniqueTitle);
				await page.getByLabel("內容").fill("content from playwright");
				await page.getByLabel("作者").fill("tester");

				await page
					.getByRole("button", { name: "建立文章", exact: true })
					.click();

				await expect(page.getByText(/created!|建立了/)).toBeVisible();
				await expect(
					page.getByText(uniqueTitle, { exact: true }),
				).toBeVisible();

				const after = await readPostCount(heading);
				expect(after).toBe(before + 1);
			});

			test("optimistically removes the post on delete", async ({ page }) => {
				await page.goto(PAGE);

				// Innermost div containing both the unique title and a button — the row.
				const row = page
					.locator("div")
					.filter({ hasText: uniqueTitle })
					.filter({ has: page.getByRole("button") })
					.last();

				await row.getByRole("button").click();

				await expect(page.getByText(uniqueTitle, { exact: true })).toBeHidden();

				// Persistence: reload and confirm the row is still gone.
				await page.reload();
				await expect(page.getByText(uniqueTitle, { exact: true })).toBeHidden();
			});
		});
});
