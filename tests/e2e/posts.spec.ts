import { expect, test } from "@playwright/test";

test.describe("posts", () => {
	test("GET /api/posts returns the 5 seeded posts", async ({ request }) => {
		const res = await request.get("/api/posts");
		expect(res.status()).toBe(200);
		const body = (await res.json()) as { title: string }[];
		expect(body).toHaveLength(5);
		expect(body.some((p) => p.title.includes("Next.js"))).toBe(true);
	});

	test("POST /api/posts creates a post, then GET /:id retrieves it", async ({
		request,
	}) => {
		const created = await request.post("/api/posts", {
			data: { title: "E2E Post", content: "hello from playwright" },
		});
		expect(created.status()).toBe(201);
		const { id } = (await created.json()) as { id: number };

		const fetched = await request.get(`/api/posts/${id}`);
		expect(fetched.status()).toBe(200);
		const body = (await fetched.json()) as { title: string };
		expect(body.title).toBe("E2E Post");

		// clean up so retries are idempotent
		await request.delete(`/api/posts/${id}`);
	});

	test("/data/client-fetch renders the seeded posts", async ({ page }) => {
		await page.goto("/data/client-fetch");
		// TanStack Query fetches client-side; wait for one of the seeded titles
		await expect(
			page.getByText(/Getting Started with Next\.js 16/),
		).toBeVisible();
	});
});
