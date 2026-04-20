import { expect, test } from "@playwright/test";

const PAGE = "/rendering/url-state";

test.describe("url state (nuqs)", () => {
	test("typing in the search input syncs to ?q= and survives reload", async ({
		page,
	}) => {
		await page.goto(PAGE);

		await page.getByPlaceholder("Type to update ?q= param").fill("hello");

		await expect(page).toHaveURL(/\?q=hello/);

		await page.reload();
		await expect(page.getByPlaceholder("Type to update ?q= param")).toHaveValue(
			"hello",
		);
	});

	test("Next / Prev / sort update the URL; Reset All clears it", async ({
		page,
	}) => {
		await page.goto(PAGE);

		await page.getByRole("button", { name: "Next", exact: true }).click();
		await page.getByRole("button", { name: "popular", exact: true }).click();

		await expect(page).toHaveURL(/page=2/);
		await expect(page).toHaveURL(/sort=popular/);

		await page.getByRole("button", { name: "Reset All", exact: true }).click();

		await expect(page).toHaveURL(new RegExp(`${PAGE}$`));
	});
});
