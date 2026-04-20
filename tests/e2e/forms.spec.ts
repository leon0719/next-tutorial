import { expect, test } from "@playwright/test";

const PAGE = "/data/forms";

test.describe("forms (react-hook-form + zod)", () => {
	test("submitting empty form surfaces all zod error messages", async ({
		page,
	}) => {
		await page.goto(PAGE);

		await page.getByRole("button", { name: "送出", exact: true }).click();

		// Error messages are hardcoded English in the schema, regardless of locale.
		// `exact: true` avoids collisions with the same strings inside the code examples below.
		await expect(
			page.getByText("Name must be at least 2 characters", { exact: true }),
		).toBeVisible();
		await expect(
			page.getByText("Invalid email address", { exact: true }),
		).toBeVisible();
		await expect(
			page.getByText("Subject is required", { exact: true }),
		).toBeVisible();
		await expect(
			page.getByText("Message must be at least 10 characters", { exact: true }),
		).toBeVisible();
	});

	test("valid submission renders the result panel", async ({ page }) => {
		await page.goto(PAGE);

		await page.getByPlaceholder("姓名").fill("Alice");
		await page.getByPlaceholder("Email").fill("alice@example.com");
		await page.getByPlaceholder("主旨").fill("Hi");
		await page
			.getByPlaceholder("訊息內容")
			.fill("This is a long enough message.");

		await page.getByRole("button", { name: "送出", exact: true }).click();

		// Before submit the result panel shows "填寫表單並送出查看結果。"; after it shows the data.
		await expect(page.getByText("填寫表單並送出查看結果。")).toBeHidden();
		await expect(page.getByText("alice@example.com")).toBeVisible();
		await expect(
			page.getByText("This is a long enough message."),
		).toBeVisible();
	});
});
